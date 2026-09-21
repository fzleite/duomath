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

export function formatSeconds(ms: number | null): string {
  return ms === null ? '—' : `${(ms / 1000).toFixed(1)}s`
}

// ---------------------------------------------------------------------------
// Modulos de jogo (perguntas sorteadas, desempenho cronometrado)
// ---------------------------------------------------------------------------

export interface TimedStats {
  answered: number
  correct: number
  accuracy: number | null
  /** Media de tempo considerando SO as respostas certas — errar rapido nao e ser rapido. */
  avgMs: number | null
  bestMs: number | null
}

function timedStats(attempts: Attempt[]): TimedStats {
  const correct = attempts.filter((a) => a.correct)
  const times = correct.map((a) => a.elapsedMs)
  return {
    answered: attempts.length,
    correct: correct.length,
    accuracy: attempts.length ? correct.length / attempts.length : null,
    avgMs: times.length ? times.reduce((sum, ms) => sum + ms, 0) / times.length : null,
    bestMs: times.length ? Math.min(...times) : null,
  }
}

export function levelStats(attempts: Attempt[], moduleId: string, levelId: string): TimedStats {
  return timedStats(attempts.filter((a) => a.moduleId === moduleId && a.stageId === levelId))
}

/** Desempenho do modulo de jogo inteiro, somando todos os niveis. */
export function gameStats(attempts: Attempt[], moduleId: string): TimedStats {
  return timedStats(attempts.filter((a) => a.moduleId === moduleId))
}

export interface UnlockStatus {
  unlocked: boolean
  /** Falta o que para destravar — usado para mostrar o alvo em vez de um cadeado mudo. */
  missing: { correct: number; avgMs: number | null; accuracy: number | null }
}

export function unlockStatus(
  criteria: { fromLevelId: string; minCorrect: number; maxAvgMs: number; minAccuracy: number } | null,
  attempts: Attempt[],
  moduleId: string,
): UnlockStatus {
  if (!criteria) return { unlocked: true, missing: { correct: 0, avgMs: null, accuracy: null } }

  const stats = levelStats(attempts, moduleId, criteria.fromLevelId)
  const unlocked =
    stats.correct >= criteria.minCorrect &&
    stats.avgMs !== null &&
    stats.avgMs <= criteria.maxAvgMs &&
    stats.accuracy !== null &&
    stats.accuracy >= criteria.minAccuracy

  return {
    unlocked,
    missing: {
      correct: Math.max(0, criteria.minCorrect - stats.correct),
      avgMs: stats.avgMs,
      accuracy: stats.accuracy,
    },
  }
}

export interface TagStats extends TimedStats {
  tag: string
  /** Tempo da resposta certa mais recente — comparavel com avgMs para ver se melhorou. */
  lastMs: number | null
}

/** Desempenho por item sorteado (ex: tabuada do 8), agregando todos os niveis do modulo. */
export function statsByTag(attempts: Attempt[], moduleId: string): TagStats[] {
  const grouped = new Map<string, Attempt[]>()
  for (const attempt of attempts) {
    if (attempt.moduleId !== moduleId || !attempt.tag) continue
    const list = grouped.get(attempt.tag)
    if (list) list.push(attempt)
    else grouped.set(attempt.tag, [attempt])
  }

  return [...grouped.entries()]
    .map(([tag, list]) => {
      const chronological = [...list].sort((a, b) => a.answeredAt.localeCompare(b.answeredAt))
      const lastCorrect = [...chronological].reverse().find((a) => a.correct)
      return { tag, ...timedStats(list), lastMs: lastCorrect?.elapsedMs ?? null }
    })
    .sort((a, b) => (b.avgMs ?? 0) - (a.avgMs ?? 0))
}

/**
 * Evolucao do tempo ao longo do tempo: media por bloco de N respostas certas, em ordem
 * cronologica. Blocos (e nao por dia) porque a crianca pode treinar varias vezes no mesmo dia
 * ou passar dias sem treinar — o que interessa e a curva de aprendizado, nao o calendario.
 */
export function evolutionSeries(attempts: Attempt[], moduleId: string, blockSize = 10): number[] {
  const correct = attempts
    .filter((a) => a.moduleId === moduleId && a.correct)
    .sort((a, b) => a.answeredAt.localeCompare(b.answeredAt))

  const series: number[] = []
  for (let i = 0; i + blockSize <= correct.length; i += blockSize) {
    const block = correct.slice(i, i + blockSize)
    series.push(block.reduce((sum, a) => sum + a.elapsedMs, 0) / blockSize)
  }
  return series
}
