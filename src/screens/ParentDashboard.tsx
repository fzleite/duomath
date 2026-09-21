import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { exportWorkspace, importWorkspace, shareOrDownloadBackup } from '../data/backup'
import { computeModuleMetrics, formatPercent, type ModuleMetrics } from '../data/metrics'
import { listAttempts, listProgress } from '../data/repo'
import type { Profile } from '../data/types'
import { getModule, readyModules } from '../modules/registry'
import type { ExerciseBase } from '../modules/types'
import { useApp } from '../state/store'

function moduleTitle(moduleId: string): string {
  return getModule(moduleId)?.title ?? moduleId
}

function stageTitle(moduleId: string, stageId: string): string {
  const stage = getModule(moduleId)?.stages.find((candidate: { id: string }) => candidate.id === stageId)
  return stage?.title ?? stageId
}

interface ProfileReport {
  profile: Profile
  modules: ModuleMetrics[]
  /** Exercicios respondidos de novo depois de ja terem sido acertados. */
  repeatsAfterCleared: number
}

async function buildReport(profile: Profile): Promise<ProfileReport> {
  const [attempts, progress] = await Promise.all([listAttempts(profile.id), listProgress(profile.id)])
  const modules = readyModules().map((module) =>
    computeModuleMetrics(
      module.id,
      module.stages.map((stage: { id: string; exercises: ExerciseBase[] }) => ({
        id: stage.id,
        exerciseIds: stage.exercises.map((exercise) => exercise.id),
      })),
      attempts,
      progress,
    ),
  )
  const repeatsAfterCleared = modules
    .flatMap((m) => m.stages)
    .flatMap((s) => s.exercises)
    .reduce((sum, e) => sum + e.attemptsAfterCleared, 0)

  return { profile, modules, repeatsAfterCleared }
}

export function ParentDashboard() {
  const profiles = useApp((s) => s.profiles)
  const init = useApp((s) => s.init)
  const pizinhoEnabled = useApp((s) => s.settings.pizinhoEnabled)
  const setPizinhoEnabled = useApp((s) => s.setPizinhoEnabled)
  const removeProfile = useApp((s) => s.removeProfile)

  const [reports, setReports] = useState<ProfileReport[]>([])
  const [status, setStatus] = useState<string | null>(null)
  const fileInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    void Promise.all(profiles.map(buildReport)).then(setReports)
  }, [profiles])

  const handleExport = async () => {
    const result = await shareOrDownloadBackup(await exportWorkspace())
    if (result !== 'cancelled') {
      setStatus(result === 'shared' ? 'Backup compartilhado.' : 'Backup baixado.')
    }
  }

  const handleImport = async (file: File, mode: 'replace' | 'merge') => {
    try {
      const result = await importWorkspace(file, mode)
      await init()
      setStatus(
        `Importado: ${result.profiles} perfis, ${result.progress} etapas, ${result.attempts} tentativas.`,
      )
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Falha ao importar o arquivo.')
    }
  }

  return (
    <main className="screen">
      <header className="topbar">
        <Link className="link-quiet" to="/perfis">
          Voltar
        </Link>
        <strong>Painel do responsavel</strong>
      </header>

      <section className="card">
        <h2>Backup e transferencia</h2>
        <p className="muted">
          Os dados ficam so neste navegador. O backup em JSON leva todos os perfis de uma vez, para
          guardar ou abrir em outro dispositivo.
        </p>
        <div className="form-actions form-actions-start">
          <button type="button" className="btn btn-primary" onClick={() => void handleExport()}>
            Exportar tudo (JSON)
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => fileInput.current?.click()}>
            Importar backup
          </button>
        </div>
        <input
          ref={fileInput}
          type="file"
          accept="application/json,.json"
          hidden
          onChange={(event) => {
            const file = event.target.files?.[0]
            event.target.value = ''
            if (!file) return
            const replace = window.confirm(
              'OK substitui todos os dados deste dispositivo pelo backup.\nCancelar apenas mescla os perfis do arquivo com os atuais.',
            )
            void handleImport(file, replace ? 'replace' : 'merge')
          }}
        />
        {status && <p className="status">{status}</p>}
      </section>

      <section className="card">
        <h2>Preferencias</h2>
        <label className="switch">
          <input
            type="checkbox"
            checked={pizinhoEnabled}
            onChange={(event) => void setPizinhoEnabled(event.target.checked)}
          />
          <span>Pizinho dando dicas durante os exercicios</span>
        </label>
      </section>

      {reports.map(({ profile, modules, repeatsAfterCleared }) => (
        <section className="card" key={profile.id}>
          <div className="report-head">
            <span className="profile-initial profile-initial-sm" style={{ background: profile.color }}>
              {profile.name.slice(0, 1).toUpperCase()}
            </span>
            <div>
              <h2>{profile.name}</h2>
              <small className="muted">responsavel: {profile.guardian}</small>
            </div>
          </div>

          {modules.map((moduleMetrics) => (
            <div className="report-module" key={moduleMetrics.moduleId}>
              <h3>{moduleTitle(moduleMetrics.moduleId)}</h3>
              <div className="kpi-row">
                <span>
                  <strong>
                    {moduleMetrics.clearedExercises}/{moduleMetrics.totalExercises}
                  </strong>{' '}
                  exercicios
                </span>
                <span>
                  <strong>{formatPercent(moduleMetrics.firstTryAccuracy)}</strong> de primeira
                </span>
                <span>
                  <strong>{moduleMetrics.totalAttempts}</strong> tentativas
                </span>
              </div>

              <table className="report-table">
                <thead>
                  <tr>
                    <th>Etapa</th>
                    <th>Concluido</th>
                    <th>1a tentativa</th>
                    <th>Tentativas</th>
                  </tr>
                </thead>
                <tbody>
                  {moduleMetrics.stages.map((stage) => (
                    <tr key={stage.stageId}>
                      <td>{stageTitle(moduleMetrics.moduleId, stage.stageId)}</td>
                      <td>
                        {stage.clearedExercises}/{stage.totalExercises}
                      </td>
                      <td>{formatPercent(stage.firstTryAccuracy)}</td>
                      <td>{stage.totalAttempts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          <p className="muted small">
            Repeticoes de exercicio ja acertado: <strong>{repeatsAfterCleared}</strong>
          </p>

          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              if (window.confirm(`Apagar o perfil de ${profile.name} e todo o progresso dele?`)) {
                void removeProfile(profile.id)
              }
            }}
          >
            Apagar perfil
          </button>
        </section>
      ))}
    </main>
  )
}
