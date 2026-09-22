import type { ComponentType } from 'react'

import type { MaterialApoio } from './shared/apoio'

/** Niveis da Taxonomia de Bloom — cada etapa de modulo de conteudo progride por eles. */
export type BloomLevel = 'lembrar' | 'entender' | 'aplicar' | 'analisar' | 'avaliar'

export interface ExerciseBase {
  id: string
  bloom: BloomLevel
  prompt: string
  /** Dica que o Pizinho oferece quando a crianca erra ou pede ajuda. */
  hint: string
}

export interface Stage<E extends ExerciseBase> {
  id: string
  title: string
  /** Referencia curricular da etapa (ex: "base do 4o ano — BNCC"). */
  curriculum: string
  /**
   * Anos do Ensino Fundamental a que a etapa pertence, na sequencia da BNCC. E o que alimenta
   * a navegacao por serie (abas) — a mesma etapa pode aparecer em mais de um ano.
   */
  years: number[]
  exercises: E[]
}

export interface ExerciseViewProps<E extends ExerciseBase> {
  exercise: E
  /** Trava a interacao enquanto o feedback da resposta esta na tela. */
  locked: boolean
  onAnswer: (correct: boolean) => void
}

interface ModuleBase {
  id: string
  title: string
  tagline: string
  /** 'soon' aparece no hub como card desabilitado (roadmap visivel, sem codigo morto). */
  status: 'ready' | 'soon'
  accent: string
}

/**
 * Modulo de conteudo: exercicios DECLARADOS em etapas, progresso por exercicio resolvido,
 * trilha com desbloqueio sequencial. O motor (ExercisePlayer) cuida de tempo, tentativas,
 * progresso, KPIs e Pizinho — um modulo novo so declara exercicios e sabe renderiza-los.
 */
export interface ContentModule<E extends ExerciseBase = ExerciseBase> extends ModuleBase {
  category: 'conteudo'
  stages: Stage<E>[]
  ExerciseView: ComponentType<ExerciseViewProps<E>>
  /**
   * Modulo de jogo que treina o mesmo assunto (ex: Tabuada estudo -> Tabuada treino).
   * A trilha de etapas oferece o atalho, sem obrigar a passar por ela.
   */
  companionGameId?: string
  /**
   * Material de apoio por etapa. Consultavel dentro do exercicio e tambem fora dele, pela
   * sub-opcao do menu por assunto — o spec e explicito em que nao pode depender de estar
   * respondendo exercicio naquele momento.
   */
  apoio?: MaterialApoio[]
}

/**
 * Modulo de jogo: perguntas SORTEADAS (conjunto infinito, sem ids fixos), progressao por
 * criterio de desempenho cronometrado e acesso livre a qualquer momento — nao depende da vez
 * daquele conteudo no plano de estudo. Traz a propria tela porque a mecanica (cronometro por
 * pergunta, sessao, estatisticas por item sorteado) nao cabe no motor de etapas.
 */
export interface GameModule extends ModuleBase {
  category: 'jogo'
  levels: GameLevel[]
  GameView: ComponentType
}

export interface GameLevel {
  id: string
  title: string
  description: string
  /** null = liberado desde o inicio. */
  unlock: UnlockCriteria | null
}

/**
 * Criterio de desbloqueio medido sobre as respostas do nivel anterior. O spec pede
 * "tempo medio de resposta abaixo de um limite alvo"; acerto minimo entra junto para
 * que responder rapido e errado nao destrave nada.
 */
export interface UnlockCriteria {
  /** Nivel cujas respostas sao avaliadas. */
  fromLevelId: string
  minCorrect: number
  maxAvgMs: number
  minAccuracy: number
}

export type AnyMathModule = ContentModule<any> | GameModule // eslint-disable-line @typescript-eslint/no-explicit-any

export function isContentModule(module: AnyMathModule): module is ContentModule<any> {
  return module.category === 'conteudo'
}

export function isGameModule(module: AnyMathModule): module is GameModule {
  return module.category === 'jogo'
}
