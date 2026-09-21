import { create } from 'zustand'

import {
  createProfile,
  deleteProfile,
  getSettings,
  listAttempts,
  listProfiles,
  listProgress,
  patchSettings,
  recordAnswer,
  recordGameAttempt,
  type RecordAnswerInput,
  type RecordAnswerResult,
  type RecordGameAttemptInput,
} from '../data/repo'
import type { Attempt, Profile, Settings, StageProgress } from '../data/types'

interface AppState {
  ready: boolean
  profiles: Profile[]
  activeProfileId: string | null
  settings: Settings
  /** Tentativas e progresso do perfil ativo — recarregados a cada troca de perfil. */
  attempts: Attempt[]
  progress: StageProgress[]

  init: () => Promise<void>
  reloadProfiles: () => Promise<void>
  selectProfile: (profileId: string | null) => Promise<void>
  addProfile: (input: Pick<Profile, 'name' | 'guardian' | 'color'>) => Promise<Profile>
  removeProfile: (profileId: string) => Promise<void>
  answer: (input: Omit<RecordAnswerInput, 'profileId'>) => Promise<RecordAnswerResult>
  answerGame: (input: Omit<RecordGameAttemptInput, 'profileId'>) => Promise<Attempt>
  setPizinhoEnabled: (enabled: boolean) => Promise<void>
}

async function loadProfileData(profileId: string | null) {
  if (!profileId) return { attempts: [], progress: [] }
  const [attempts, progress] = await Promise.all([listAttempts(profileId), listProgress(profileId)])
  return { attempts, progress }
}

export const useApp = create<AppState>((set, get) => ({
  ready: false,
  profiles: [],
  activeProfileId: null,
  settings: { activeProfileId: null, pizinhoEnabled: true },
  attempts: [],
  progress: [],

  init: async () => {
    const [profiles, settings] = await Promise.all([listProfiles(), getSettings()])
    // um perfil salvo pode ter sido apagado em outro momento: nao confie no id gravado
    const activeProfileId = profiles.some((p) => p.id === settings.activeProfileId)
      ? settings.activeProfileId
      : null
    const data = await loadProfileData(activeProfileId)
    set({ ready: true, profiles, settings, activeProfileId, ...data })
  },

  reloadProfiles: async () => set({ profiles: await listProfiles() }),

  selectProfile: async (profileId) => {
    await patchSettings({ activeProfileId: profileId })
    const data = await loadProfileData(profileId)
    set({ activeProfileId: profileId, ...data })
  },

  addProfile: async (input) => {
    const profile = await createProfile(input)
    await get().reloadProfiles()
    return profile
  },

  removeProfile: async (profileId) => {
    await deleteProfile(profileId)
    if (get().activeProfileId === profileId) await get().selectProfile(null)
    await get().reloadProfiles()
  },

  answer: async (input) => {
    const profileId = get().activeProfileId
    if (!profileId) throw new Error('Nenhum perfil ativo.')
    const result = await recordAnswer({ ...input, profileId })
    set((state) => ({
      attempts: [...state.attempts, result.attempt],
      progress: [
        ...state.progress.filter((p) => p.id !== result.progress.id),
        result.progress,
      ],
    }))
    return result
  },

  answerGame: async (input) => {
    const profileId = get().activeProfileId
    if (!profileId) throw new Error('Nenhum perfil ativo.')
    const attempt = await recordGameAttempt({ ...input, profileId })
    set((state) => ({ attempts: [...state.attempts, attempt] }))
    return attempt
  },

  setPizinhoEnabled: async (enabled) => {
    set({ settings: await patchSettings({ pizinhoEnabled: enabled }) })
  },
}))

export function useActiveProfile(): Profile | null {
  return useApp((state) => state.profiles.find((p) => p.id === state.activeProfileId) ?? null)
}
