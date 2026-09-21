import { Link, useNavigate } from 'react-router-dom'

import { PizinhoFace } from '../components/Pizinho'
import { computeModuleMetrics, formatPercent } from '../data/metrics'
import { modules } from '../modules/registry'
import { useActiveProfile, useApp } from '../state/store'

export function ModuleHub() {
  const navigate = useNavigate()
  const profile = useActiveProfile()
  const attempts = useApp((s) => s.attempts)
  const progress = useApp((s) => s.progress)

  if (!profile) return null

  return (
    <main className="screen">
      <header className="topbar">
        <div className="topbar-id">
          <span className="profile-initial profile-initial-sm" style={{ background: profile.color }}>
            {profile.name.slice(0, 1).toUpperCase()}
          </span>
          <div>
            <strong>Ola, {profile.name}!</strong>
            <small>Escolha um assunto para treinar</small>
          </div>
        </div>
        <Link className="link-quiet" to="/perfis">
          Trocar perfil
        </Link>
      </header>

      <div className="module-grid">
        {modules.map((module) => {
          const stages = module.stages.map((stage) => ({
            id: stage.id,
            exerciseIds: stage.exercises.map((exercise) => exercise.id),
          }))
          const metrics = computeModuleMetrics(module.id, stages, attempts, progress)
          const soon = module.status === 'soon'

          return (
            <button
              key={module.id}
              type="button"
              className={`module-card ${soon ? 'module-card-soon' : ''}`}
              style={{ borderColor: module.accent }}
              disabled={soon}
              onClick={() => navigate(`/modulo/${module.id}`)}
            >
              <div className="module-card-head">
                <h2>{module.title}</h2>
                {soon ? <span className="badge">em breve</span> : null}
              </div>
              <p>{module.tagline}</p>

              {!soon && (
                <>
                  <div className="bar-track" aria-hidden>
                    <div
                      className="bar-fill"
                      style={{ width: `${Math.round(metrics.completion * 100)}%`, background: module.accent }}
                    />
                  </div>
                  <div className="kpi-row">
                    <span>
                      <strong>{formatPercent(metrics.completion)}</strong> do modulo
                    </span>
                    <span>
                      <strong>{formatPercent(metrics.firstTryAccuracy)}</strong> de acerto de primeira
                    </span>
                  </div>
                </>
              )}
            </button>
          )
        })}
      </div>

      <footer className="hub-footer">
        <PizinhoFace mood="neutro" size={40} />
        <span>O Pizinho aparece durante os exercicios para dar dicas.</span>
      </footer>
    </main>
  )
}
