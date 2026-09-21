import { openDB, type DBSchema, type IDBPDatabase } from 'idb'

import type { Attempt, Profile, StageProgress } from './types'

/**
 * ATENCAO ao adicionar uma object store nova depois que o app ja esta instalado em algum
 * dispositivo: o bloco `if (!contains(...)) createObjectStore(...)` NAO roda sozinho — e
 * obrigatorio subir DB_VERSION no mesmo commit, senao quem ja tem o app instalado nunca
 * recebe a store nova. Indices tambem precisam ser criados no mesmo bloco da store.
 */
export const DB_NAME = 'duomath'
export const DB_VERSION = 1

interface DuomathDB extends DBSchema {
  profiles: { key: string; value: Profile }
  progress: {
    key: string
    value: StageProgress
    indexes: { profileId: string }
  }
  attempts: {
    key: string
    value: Attempt
    indexes: { profileId: string; profileExercise: [string, string] }
  }
  settings: { key: string; value: unknown }
}

let dbPromise: Promise<IDBPDatabase<DuomathDB>> | null = null

export function getDB(): Promise<IDBPDatabase<DuomathDB>> {
  dbPromise ??= openDB<DuomathDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('profiles')) {
        db.createObjectStore('profiles', { keyPath: 'id' })
      }
      if (!db.objectStoreNames.contains('progress')) {
        const store = db.createObjectStore('progress', { keyPath: 'id' })
        store.createIndex('profileId', 'profileId')
      }
      if (!db.objectStoreNames.contains('attempts')) {
        const store = db.createObjectStore('attempts', { keyPath: 'id' })
        store.createIndex('profileId', 'profileId')
        store.createIndex('profileExercise', ['profileId', 'exerciseId'])
      }
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings')
      }
    },
  })
  return dbPromise
}
