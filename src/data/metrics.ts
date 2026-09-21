import type { Attempt, StageProgress } from './types'

export interface ExerciseMetrics {
  exerciseId: string
  attempts: number
  firstTryCorrect: boolean
  cleared: boolean
  /** Respostas dadas depois do primeiro acerto — repeticao do exercicio ja dominado. */
  attemptsAfterCleared: number
}

export interface StageMetrics {
  stageId: string
  clearedExercises: number
  totalExercises: number
  completed: boolean
  firstTryAccuracy: number | null
  totalAttempts: number
  exercises: ExerciseMetrics[]
}

export interface ModuleMetrics {
  moduleId: string
  stages: StageMetrics[]
  clearedExercises: number
  totalExercises: number
  /** 0..1 — fracao dos exercicios do modulo ja resolvidos. */
  completion: number
  firstTryAccuracy: number | null
  totalAttempts: number
}

function byExercise(attempts: Attempt[]): Map<string, Attempt[]> {
  const map = new Map<string, Attempt[]>()
  for (const attempt of attempts) {
    const list = map.get(attempt.exerciseId)
    if (list) list.push(attempt)
    else map.set(attempt.exerciseId, [attempt])
  }
  for (const list of map.values()) list.sort((a, b) => a.attemptNo - b.attemptNo)
  return map
}

export interface StageShape {
  id: string
  exerciseIds: string[]
}

export function computeModuleMetrics(
  moduleId: string,
  stages: StageShape[],
  attempts: Attempt[],
  progress: StageProgress[],
): ModuleMetrics {
  const moduleAttempts = attempts.filter((a) => a.moduleId === moduleId)
  const grouped = byExercise(moduleAttempts)
  const progressByStage = new Map(progress.filter((p) => p.moduleId === moduleId).map((p) => [p.stageId, p]))

  const stageMetrics: StageMetrics[] = stages.map((stage) => {
    const exercises: ExerciseMetrics[] = stage.exerciseIds.map((exerciseId) => {
      const list = grouped.get(exerciseId) ?? []
      const firstCorrectIndex = list.findIndex((a) => a.correct)
      return {
        exerciseId,
        attempts: list.length,
        firstTryCorrect: list[0]?.correct === true,
        cleared: firstCorrectIndex >= 0,
        attemptsAfterCleared: firstCorrectIndex >= 0 ? list.length - firstCorrectIndex - 1 : 0,
      }
    })

    const answered = exercises.filter((e) => e.attempts > 0)
    return {
      stageId: stage.id,
      clearedExercises: exercises.filter((e) => e.cleared).length,
      totalExercises: stage.exerciseIds.length,
      completed: Boolean(progressByStage.get(stage.id)?.completedAt),
      firstTryAccuracy: answered.length
        ? answered.filter((e) => e.firstTryCorrect).length / answered.length
        : null,
      totalAttempts: exercises.reduce((sum, e) => sum + e.attempts, 0),
      exercises,
    }
  })

  const allExercises = stageMetrics.flatMap((s) => s.exercises)
  const answered = allExercises.filter((e) => e.attempts > 0)
  const totalExercises = stageMetrics.reduce((sum, s) => sum + s.totalExercises, 0)
  const clearedExercises = allExercises.filter((e) => e.cleared).length

  return {
    moduleId,
    stages: stageMetrics,
    clearedExercises,
    totalExercises,
    completion: totalExercises ? clearedExercises / totalExercises : 0,
    firstTryAccuracy: answered.length
      ? answered.filter((e) => e.firstTryCorrect).length / answered.length
      : null,
    totalAttempts: allExercises.reduce((sum, e) => sum + e.attempts, 0),
  }
}

export function formatPercent(value: number | null): string {
  return value === null ? '—' : `${Math.round(value * 100)}%`
}
