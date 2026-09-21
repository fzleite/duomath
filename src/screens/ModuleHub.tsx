import { Link, useNavigate } from 'react-router-dom'

import { PizinhoFace } from '../components/Pizinho'
import { computeModuleMetrics, formatPercent, formatSeconds, gameStats } from '../data/metrics'
import { contentModules, gameModules } from '../modules/registry'
import type { ExerciseBase } from '../modules/types'
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

      <section className="hub-section">
        <h2 className="hub-section-title">Conteudo</h2>
        <div className="module-grid">
          {contentModules().map((module) => {
            const stages = module.stages.map((stage: { id: string; exercises: ExerciseBase[] }) => ({
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
                  <h3>{module.title}</h3>
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
      </section>

      {/*
        Jogos ficam numa secao propria: sao treino livre, entram a qualquer momento e nao
        dependem da vez daquele conteudo no plano de estudo.
      */}
      <section className="hub-section">
        <h2 className="hub-section-title">Jogos</h2>
        <div className="module-grid">
          {gameModules().map((module) => {
            const overall = gameStats(attempts, module.id)

            return (
              <button
                key={module.id}
                type="button"
                className="module-card module-card-game"
                style={{ borderColor: module.accent }}
                onClick={() => navigate(`/jogo/${module.id}`)}
              >
                <div className="module-card-head">
                  <h3>{module.title}</h3>
                  <span className="badge badge-game">jogo</span>
                </div>
                <p>{module.tagline}</p>
                {overall.answered > 0 && (
                  <div className="kpi-row">
                    <span>
                      <strong>{formatSeconds(overall.avgMs)}</strong> de media
                    </span>
                    <span>
                      <strong>{formatPercent(overall.accuracy)}</strong> de acerto
                    </span>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </section>

      <footer className="hub-footer">
        <PizinhoFace mood="neutro" size={40} />
        <span>O Pizinho aparece durante os exercicios para dar dicas.</span>
      </footer>
    </main>
  )
}
