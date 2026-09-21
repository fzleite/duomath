export interface Profile {
  id: string
  name: string
  /** Responsavel que administra este perfil — agrupa irmaos e, no futuro, colegas de classe. */
  guardian: string
  /** Cor de identificacao do perfil na tela de selecao. */
  color: string
  createdAt: string
}

/** Uma etapa concluida (ou em andamento) de um modulo, por perfil. */
export interface StageProgress {
  /** `${profileId}:${moduleId}:${stageId}` */
  id: string
  profileId: string
  moduleId: string
  stageId: string
  /** Ids dos exercicios ja resolvidos corretamente pelo menos uma vez. */
  clearedExerciseIds: string[]
  completedAt: string | null
  updatedAt: string
}

/**
 * Log append-only de cada resposta dada. E a fonte de verdade das metricas:
 * taxa de acerto na primeira tentativa e numero de tentativas por exercicio
 * (incluindo repeticoes depois de errar).
 */
export interface Attempt {
  id: string
  profileId: string
  moduleId: string
  stageId: string
  exerciseId: string
  /** 1 na primeira vez que este perfil responde este exercicio, 2 na segunda, etc. */
  attemptNo: number
  correct: boolean
  /** Ms entre a exibicao do exercicio e a resposta — ajuda a distinguir dominio de chute. */
  elapsedMs: number
  answeredAt: string
  /**
   * Agrupador do item sorteado em modulos de jogo (ex: "8" para uma pergunta da tabuada do 8).
   * Opcional: modulos de conteudo tem exercicio fixo e nao precisam dele. E o que permite
   * comparar desempenho por tabuada mesmo com o sorteio aleatorio.
   */
  tag?: string
}

export interface Settings {
  activeProfileId: string | null
  pizinhoEnabled: boolean
}

export interface BackupFile {
  format: 'duomath-backup'
  version: number
  exportedAt: string
  profiles: Profile[]
  progress: StageProgress[]
  attempts: Attempt[]
  settings?: Partial<Settings>
}
