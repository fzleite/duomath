import { getDB } from './db'
import type { Attempt, Profile, Settings, StageProgress } from './types'

const DEFAULT_SETTINGS: Settings = { activeProfileId: null, pizinhoEnabled: true }

function newId(): string {
  return crypto.randomUUID()
}

export async function listProfiles(): Promise<Profile[]> {
  const all = await (await getDB()).getAll('profiles')
  return all.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
}

export async function saveProfile(profile: Profile): Promise<void> {
  await (await getDB()).put('profiles', profile)
}

export async function createProfile(
  input: Pick<Profile, 'name' | 'guardian' | 'color'>,
): Promise<Profile> {
  const profile: Profile = { ...input, id: newId(), createdAt: new Date().toISOString() }
  await saveProfile(profile)
  return profile
}

/** Apaga o perfil e, em cascata, todo progresso e tentativas dele — nao deixa orfaos. */
export async function deleteProfile(profileId: string): Promise<void> {
  const db = await getDB()
  const progressKeys = await db.getAllKeysFromIndex('progress', 'profileId', profileId)
  const attemptKeys = await db.getAllKeysFromIndex('attempts', 'profileId', profileId)

  const tx = db.transaction(['profiles', 'progress', 'attempts'], 'readwrite')
  tx.objectStore('profiles').delete(profileId)
  for (const key of progressKeys) tx.objectStore('progress').delete(key)
  for (const key of attemptKeys) tx.objectStore('attempts').delete(key)
  await tx.done
}

export async function getSettings(): Promise<Settings> {
  const stored = (await (await getDB()).get('settings', 'app')) as Partial<Settings> | undefined
  return { ...DEFAULT_SETTINGS, ...stored }
}

export async function patchSettings(patch: Partial<Settings>): Promise<Settings> {
  const next = { ...(await getSettings()), ...patch }
  await (await getDB()).put('settings', next, 'app')
  return next
}

export function stageProgressId(profileId: string, moduleId: string, stageId: string): string {
  return `${profileId}:${moduleId}:${stageId}`
}

export async function listProgress(profileId: string): Promise<StageProgress[]> {
  return (await getDB()).getAllFromIndex('progress', 'profileId', profileId)
}

export async function listAttempts(profileId: string): Promise<Attempt[]> {
  return (await getDB()).getAllFromIndex('attempts', 'profileId', profileId)
}

async function countAttemptsFor(profileId: string, exerciseId: string): Promise<number> {
  return (await getDB()).countFromIndex('attempts', 'profileExercise', [profileId, exerciseId])
}

export interface RecordGameAttemptInput {
  profileId: string
  moduleId: string
  /** Nivel do jogo (ex: 'facil'), no lugar da etapa de um modulo de conteudo. */
  levelId: string
  /** Id estavel da pergunta sorteada (ex: 'tab-8x7') — permite contar repeticoes do mesmo item. */
  questionId: string
  /** Agrupador para estatistica (ex: '8' = tabuada do 8). */
  tag: string
  correct: boolean
  elapsedMs: number
}

/**
 * Modulo de jogo grava so a tentativa, sem tocar em `progress`: as perguntas sao sorteadas de
 * um conjunto infinito, entao acumular ids "resolvidos" num StageProgress cresceria sem limite
 * e nao significaria nada. O desbloqueio de nivel e derivado das tentativas em tempo de leitura.
 */
export async function recordGameAttempt(input: RecordGameAttemptInput): Promise<Attempt> {
  const db = await getDB()
  const previousCount = await countAttemptsFor(input.profileId, input.questionId)

  const attempt: Attempt = {
    id: newId(),
    profileId: input.profileId,
    moduleId: input.moduleId,
    stageId: input.levelId,
    exerciseId: input.questionId,
    attemptNo: previousCount + 1,
    correct: input.correct,
    elapsedMs: input.elapsedMs,
    answeredAt: new Date().toISOString(),
    tag: input.tag,
  }

  await db.put('attempts', attempt)
  return attempt
}

export interface RecordAnswerInput {
  profileId: string
  moduleId: string
  stageId: string
  exerciseId: string
  correct: boolean
  elapsedMs: number
  /** Total de exercícios da etapa — usado para marcar a etapa como concluida. */
  stageExerciseCount: number
}

export interface RecordAnswerResult {
  attempt: Attempt
  progress: StageProgress
  stageJustCompleted: boolean
}

/**
 * Grava a resposta e atualiza o progresso da etapa numa unica transacao.
 * Todas as leituras assincronas acontecem ANTES de abrir a transacao: dar await em algo
 * que nao seja request IDB com transacao aberta faz ela commitar sozinha no meio
 * ("The transaction has finished." — falha de forma confiavel em CPU mobile).
 */
export async function recordAnswer(input: RecordAnswerInput): Promise<RecordAnswerResult> {
  const db = await getDB()
  const id = stageProgressId(input.profileId, input.moduleId, input.stageId)

  const [previousCount, existing] = await Promise.all([
    countAttemptsFor(input.profileId, input.exerciseId),
    db.get('progress', id),
  ])

  const now = new Date().toISOString()
  const attempt: Attempt = {
    id: newId(),
    profileId: input.profileId,
    moduleId: input.moduleId,
    stageId: input.stageId,
    exerciseId: input.exerciseId,
    attemptNo: previousCount + 1,
    correct: input.correct,
    elapsedMs: input.elapsedMs,
    answeredAt: now,
  }

  const cleared = new Set(existing?.clearedExerciseIds ?? [])
  if (input.correct) cleared.add(input.exerciseId)
  const allCleared = cleared.size >= input.stageExerciseCount
  const wasCompleted = Boolean(existing?.completedAt)

  const progress: StageProgress = {
    id,
    profileId: input.profileId,
    moduleId: input.moduleId,
    stageId: input.stageId,
    clearedExerciseIds: [...cleared],
    completedAt: existing?.completedAt ?? (allCleared ? now : null),
    updatedAt: now,
  }

  const tx = db.transaction(['attempts', 'progress'], 'readwrite')
  tx.objectStore('attempts').put(attempt)
  tx.objectStore('progress').put(progress)
  await tx.done

  return { attempt, progress, stageJustCompleted: allCleared && !wasCompleted }
}
