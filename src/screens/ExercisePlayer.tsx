import { useMemo, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

import { Pizinho, type PizinhoMood } from '../components/Pizinho'
import { computeModuleMetrics, formatPercent } from '../data/metrics'
import { getContentModule } from '../modules/registry'
import type { ExerciseBase } from '../modules/types'
import { useApp } from '../state/store'

interface Feedback {
  correct: boolean
  mood: PizinhoMood
  message: string
}

const CHEERS = ['Isso! Voce pegou a ideia.', 'Perfeito!', 'Muito bem!', 'Acertou de novo!']

/**
 * Motor de exercicios, compartilhado por todos os modulos: cronometra a resposta, grava a
 * tentativa, atualiza o progresso da etapa e decide quando o Pizinho aparece. Um modulo novo
 * so precisa declarar exercicios e saber renderizar os seus tipos.
 */
export function ExercisePlayer() {
  const { moduleId, stageId } = useParams()
  const navigate = useNavigate()
  const module = getContentModule(moduleId)
  const stage = module?.stages.find((candidate: { id: string }) => candidate.id === stageId)

  const attempts = useApp((s) => s.attempts)
  const progress = useApp((s) => s.progress)
  const pizinhoEnabled = useApp((s) => s.settings.pizinhoEnabled)
  const answer = useApp((s) => s.answer)

  // fila inicial: exercicios ainda nao resolvidos; se a etapa ja acabou, e revisao de tudo
  const initialQueue = useMemo(() => {
    if (!stage) return []
    const cleared = new Set(
      progress.find((p) => p.moduleId === moduleId && p.stageId === stageId)?.clearedExerciseIds ?? [],
    )
    const pending = stage.exercises.filter((exercise: ExerciseBase) => !cleared.has(exercise.id))
    return (pending.length ? pending : stage.exercises).map((exercise: ExerciseBase) => exercise.id)
    // recalcular a fila a cada resposta tiraria o exercicio da tela no meio do feedback
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId, stageId])

  const [queue, setQueue] = useState<string[]>(initialQueue)
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [hintVisible, setHintVisible] = useState(false)
  const wrongStreak = useRef<Record<string, number>>({})
  const shownAt = useRef<number>(Date.now())

  if (!module || !stage) return <Navigate to="/" replace />

  const stages = module.stages.map((candidate: { id: string; exercises: ExerciseBase[] }) => ({
    id: candidate.id,
    exerciseIds: candidate.exercises.map((exercise) => exercise.id),
  }))
  const metrics = computeModuleMetrics(module.id, stages, attempts, progress)
  const stageMetrics = metrics.stages.find((s) => s.stageId === stage.id)!
  const exercise = stage.exercises.find((candidate: ExerciseBase) => candidate.id === queue[0])

  if (!exercise) {
    return (
      <main className="screen screen-center">
        <Pizinho mood="festa" message={`Etapa concluida! ${stage.title} esta completa.`} size={96} />
        <div className="kpi-row kpi-row-lg">
          <span>
            <strong>{stageMetrics.clearedExercises}/{stageMetrics.totalExercises}</strong> exercicios
          </span>
          <span>
            <strong>{formatPercent(stageMetrics.firstTryAccuracy)}</strong> de acerto de primeira
          </span>
        </div>
        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={() => setQueue(stage.exercises.map((e: ExerciseBase) => e.id))}>
            Treinar de novo
          </button>
          <button type="button" className="btn btn-primary" onClick={() => navigate(`/modulo/${module.id}`)}>
            Voltar para as etapas
          </button>
        </div>
      </main>
    )
  }

  const ExerciseView = module.ExerciseView

  const handleAnswer = async (correct: boolean) => {
    if (feedback) return
    const elapsedMs = Date.now() - shownAt.current
    await answer({
      moduleId: module.id,
      stageId: stage.id,
      exerciseId: exercise.id,
      correct,
      elapsedMs,
      stageExerciseCount: stage.exercises.length,
    })

    if (correct) {
      wrongStreak.current[exercise.id] = 0
      setFeedback({
        correct: true,
        mood: 'festa',
        message: CHEERS[Math.floor(Math.random() * CHEERS.length)],
      })
      return
    }

    const streak = (wrongStreak.current[exercise.id] ?? 0) + 1
    wrongStreak.current[exercise.id] = streak
    setFeedback({
      correct: false,
      // errar de novo o mesmo exercicio muda o tom: de dica para apoio
      mood: streak >= 2 ? 'apoio' : 'dica',
      message:
        streak >= 2
          ? `Calma, vamos juntos. ${exercise.hint}`
          : `Quase! ${exercise.hint}`,
    })
  }

  const next = () => {
    setHintVisible(false)
    shownAt.current = Date.now()
    setQueue((current) => {
      const [head, ...rest] = current
      // errou: o exercicio volta para o fim da fila em vez de travar a etapa
      return feedback?.correct ? rest : [...rest, head]
    })
    setFeedback(null)
  }

  const pizinhoMessage = feedback?.message ?? (hintVisible ? exercise.hint : undefined)
  const pizinhoMood: PizinhoMood = feedback?.mood ?? 'dica'

  return (
    <main className="screen">
      <header className="topbar">
        <Link className="link-quiet" to={`/modulo/${module.id}`}>
          Sair
        </Link>
        <div className="kpi-row kpi-row-sm">
          <span>
            <strong>{formatPercent(metrics.completion)}</strong> do modulo
          </span>
          <span>
            <strong>{formatPercent(metrics.firstTryAccuracy)}</strong> de primeira
          </span>
        </div>
      </header>

      <div className="bar-track" aria-hidden>
        <div
          className="bar-fill"
          style={{
            width: `${Math.round((stageMetrics.clearedExercises / stageMetrics.totalExercises) * 100)}%`,
            background: module.accent,
          }}
        />
      </div>

      <section className="exercise">
        <p className="exercise-prompt">{exercise.prompt}</p>
        {/* key por exercicio: remonta a view e zera estado local (sliders, ordem das opcoes) */}
        <ExerciseView key={exercise.id} exercise={exercise} locked={Boolean(feedback)} onAnswer={handleAnswer} />
      </section>

      {pizinhoEnabled && (
        <Pizinho
          mood={pizinhoMood}
          message={pizinhoMessage}
          onDismiss={feedback ? undefined : () => setHintVisible(false)}
        />
      )}

      <footer className="exercise-footer">
        {feedback ? (
          <button type="button" className="btn btn-primary" onClick={next} autoFocus>
            {feedback.correct ? 'Continuar' : 'Tentar outro'}
          </button>
        ) : (
          <button type="button" className="btn btn-ghost" onClick={() => setHintVisible(true)} disabled={hintVisible}>
            Pedir dica ao Pizinho
          </button>
        )}
      </footer>
    </main>
  )
}
