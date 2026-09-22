import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { computeModuleMetrics, formatPercent, formatSeconds, gameStats } from '../data/metrics'
import type { Attempt, StageProgress } from '../data/types'
import { SCHOOL_YEARS, contentModules, gameModules, stagesOfYear } from '../modules/registry'
import type { ExerciseBase } from '../modules/types'
import { useActiveProfile, useApp } from '../state/store'

type View = 'serie' | 'assunto'

export function ModuleHub() {
  const navigate = useNavigate()
  const profile = useActiveProfile()
  const attempts = useApp((s) => s.attempts)
  const progress = useApp((s) => s.progress)

  const [view, setView] = useState<View>('serie')
  // comeca no 1o ano: previsivel. Um dia o ano escolar pode virar campo do perfil
  const [year, setYear] = useState(1)

  if (!profile) return null

  return (
    <main className="screen">
      <div className="hub-switch" role="tablist" aria-label="Forma de navegar">
        <button
          type="button"
          role="tab"
          aria-selected={view === 'serie'}
          className={`switch-tab ${view === 'serie' ? 'switch-tab-on' : ''}`}
          onClick={() => setView('serie')}
        >
          Por serie
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={view === 'assunto'}
          className={`switch-tab ${view === 'assunto' ? 'switch-tab-on' : ''}`}
          onClick={() => setView('assunto')}
        >
          Por assunto
        </button>
      </div>

      {view === 'serie' ? (
        <YearTabs year={year} onYear={setYear} />
      ) : (
        <SubjectList attempts={attempts} progress={progress} onOpen={(id) => navigate(`/modulo/${id}`)} />
      )}

      {view === 'assunto' && (
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
      )}
    </main>
  )
}

/** Progressao por serie: a sequencia da BNCC, ano por ano. */
function YearTabs({ year, onYear }: { year: number; onYear: (year: number) => void }) {
  const navigate = useNavigate()
  const progress = useApp((s) => s.progress)
  const stages = stagesOfYear(year)

  return (
    <>
      <div className="year-tabs" role="tablist" aria-label="Ano escolar">
        {SCHOOL_YEARS.map((option) => (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={option === year}
            className={`year-tab ${option === year ? 'year-tab-on' : ''}`}
            onClick={() => onYear(option)}
          >
            {option}º
          </button>
        ))}
      </div>

      <p className="muted small">
        {stages.length} etapa(s) previstas para o {year}º ano do Ensino Fundamental.
      </p>

      <ol className="stage-path">
        {stages.map(({ module, stage }) => {
          const cleared =
            progress.find((p) => p.moduleId === module.id && p.stageId === stage.id)?.clearedExerciseIds.length ?? 0
          const total = stage.exercises.length
          const vazia = total === 0
          const done = !vazia && cleared >= total

          return (
            <li key={`${module.id}-${stage.id}`} className={`stage-item ${done ? 'stage-done' : ''}`}>
              <button
                type="button"
                className="stage-button"
                disabled={vazia}
                onClick={() => navigate(`/modulo/${module.id}/${stage.id}`)}
              >
                <span className="stage-marker" style={{ background: done ? module.accent : undefined }}>
                  {done ? '✓' : '·'}
                </span>
                <span className="stage-body">
                  <strong>{stage.title}</strong>
                  <small>
                    {module.title} · {stage.curriculum}
                  </small>
                  <span className="stage-kpi">
                    {vazia ? 'conteudo em preparacao' : `${cleared}/${total} exercicios`}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </>
  )
}

/** Acesso direto por tematica, sem depender da progressao linear por serie. */
function SubjectList({
  attempts,
  progress,
  onOpen,
}: {
  attempts: Attempt[]
  progress: StageProgress[]
  onOpen: (moduleId: string) => void
}) {
  return (
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
              onClick={() => onOpen(module.id)}
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
  )
}
