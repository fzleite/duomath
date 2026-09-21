import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

import { computeModuleMetrics, formatPercent } from '../data/metrics'
import { getContentModule } from '../modules/registry'
import { useApp } from '../state/store'

export function StageList() {
  const { moduleId } = useParams()
  const navigate = useNavigate()
  const module = getContentModule(moduleId)
  const attempts = useApp((s) => s.attempts)
  const progress = useApp((s) => s.progress)

  if (!module || module.status === 'soon') return <Navigate to="/" replace />

  const stages = module.stages.map((stage) => ({
    id: stage.id,
    exerciseIds: stage.exercises.map((exercise: { id: string }) => exercise.id),
  }))
  const metrics = computeModuleMetrics(module.id, stages, attempts, progress)

  return (
    <main className="screen">
      <header className="topbar">
        <Link className="link-quiet" to="/">
          Voltar
        </Link>
        <strong>{module.title}</strong>
      </header>

      <ol className="stage-path">
        {module.stages.map((stage, index) => {
          const stageMetrics = metrics.stages[index]
          const done = stageMetrics.clearedExercises >= stageMetrics.totalExercises
          // etapa destravada quando a anterior foi concluida — progressao estilo trilha
          const unlocked = index === 0 || metrics.stages[index - 1].clearedExercises >= metrics.stages[index - 1].totalExercises

          return (
            <li key={stage.id} className={`stage-item ${done ? 'stage-done' : ''} ${unlocked ? '' : 'stage-locked'}`}>
              <button
                type="button"
                className="stage-button"
                disabled={!unlocked}
                onClick={() => navigate(`/modulo/${module.id}/${stage.id}`)}
              >
                <span className="stage-marker" style={{ background: done ? module.accent : undefined }}>
                  {done ? '✓' : index + 1}
                </span>
                <span className="stage-body">
                  <strong>{stage.title}</strong>
                  <small>{stage.curriculum}</small>
                  <span className="stage-kpi">
                    {stageMetrics.clearedExercises}/{stageMetrics.totalExercises} exercicios ·{' '}
                    {formatPercent(stageMetrics.firstTryAccuracy)} de primeira
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>

      {/* as duas metades do mesmo assunto: estudo aqui, treino cronometrado no jogo */}
      {module.companionGameId && (
        <Link className="companion-link" to={`/jogo/${module.companionGameId}`}>
          Treinar no jogo cronometrado →
        </Link>
      )}
    </main>
  )
}
