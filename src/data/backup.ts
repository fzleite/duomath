import { getDB } from './db'
import { getSettings } from './repo'
import type { Attempt, BackupFile, Profile, StageProgress } from './types'

export const BACKUP_VERSION = 1

/**
 * O backup e um JSON unico (nao um .zip): o DuoMath nao guarda blobs, so dados estruturados.
 * Convencao a manter ao evoluir o formato: todo campo novo entra opcional e e lido com
 * fallback vazio, para que um backup gerado antes daquela feature continue restaurando.
 */
export async function exportWorkspace(): Promise<BackupFile> {
  const db = await getDB()
  const [profiles, progress, attempts, settings] = await Promise.all([
    db.getAll('profiles'),
    db.getAll('progress'),
    db.getAll('attempts'),
    getSettings(),
  ])

  return {
    format: 'duomath-backup',
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    profiles,
    progress,
    attempts,
    settings: { pizinhoEnabled: settings.pizinhoEnabled },
  }
}

export function backupFilename(now = new Date()): string {
  const stamp = now.toISOString().slice(0, 16).replace(/[:T]/g, '-')
  return `duomath-backup-${stamp}.json`
}

/**
 * Tenta o share sheet do SO (manda direto pro Drive/e-mail) e cai pro download simples.
 * navigator.share() pode falhar com NotAllowedError mesmo sem o usuario negar nada: a API so
 * vale dentro da janela curta de ativacao do clique, e ler todas as stores pode estourar ela.
 * Por isso qualquer erro que nao seja AbortError (usuario cancelou) vira fallback, sem tentar
 * discriminar por tipo.
 */
export async function shareOrDownloadBackup(backup: BackupFile): Promise<'shared' | 'downloaded' | 'cancelled'> {
  const filename = backupFilename()
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
  const file = new File([blob], filename, { type: 'application/json' })

  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: 'Backup do DuoMath' })
      return 'shared'
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return 'cancelled'
      // qualquer outra falha: cai pro download
    }
  }

  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
  return 'downloaded'
}

function assertBackup(data: unknown): BackupFile {
  const candidate = data as Partial<BackupFile>
  if (!candidate || candidate.format !== 'duomath-backup') {
    throw new Error('Arquivo não parece um backup do DuoMath.')
  }
  if (typeof candidate.version !== 'number' || candidate.version > BACKUP_VERSION) {
    throw new Error('Este backup foi gerado por uma versão mais nova do DuoMath.')
  }
  return {
    format: 'duomath-backup',
    version: candidate.version,
    exportedAt: candidate.exportedAt ?? new Date().toISOString(),
    profiles: (candidate.profiles ?? []) as Profile[],
    progress: (candidate.progress ?? []) as StageProgress[],
    attempts: (candidate.attempts ?? []) as Attempt[],
    settings: candidate.settings ?? {},
  }
}

export interface ImportResult {
  profiles: number
  progress: number
  attempts: number
}

/**
 * `mode: 'replace'` limpa o workspace antes (restaurar um backup inteiro);
 * `mode: 'merge'` sobrescreve por id e mantem o resto (trazer um perfil de outro dispositivo).
 *
 * O arquivo e lido e parseado ANTES de abrir a transacao — file.text() nao e request IDB e
 * fecharia a transacao no meio (ver o mesmo gotcha em repo.recordAnswer).
 */
export async function importWorkspace(file: File, mode: 'replace' | 'merge'): Promise<ImportResult> {
  const backup = assertBackup(JSON.parse(await file.text()))
  const db = await getDB()
  // activeProfileId e proposital nao restaurado: quem escolhe o perfil e o dispositivo atual
  const mergedSettings = { ...(await getSettings()), ...backup.settings, activeProfileId: null }

  const tx = db.transaction(['profiles', 'progress', 'attempts', 'settings'], 'readwrite')
  if (mode === 'replace') {
    tx.objectStore('profiles').clear()
    tx.objectStore('progress').clear()
    tx.objectStore('attempts').clear()
  }
  for (const profile of backup.profiles) tx.objectStore('profiles').put(profile)
  for (const progress of backup.progress) tx.objectStore('progress').put(progress)
  for (const attempt of backup.attempts) tx.objectStore('attempts').put(attempt)
  tx.objectStore('settings').put(mergedSettings, 'app')
  await tx.done

  return {
    profiles: backup.profiles.length,
    progress: backup.progress.length,
    attempts: backup.attempts.length,
  }
}
