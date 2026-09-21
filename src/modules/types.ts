import type { ComponentType } from 'react'

/** Niveis da Taxonomia de Bloom — cada etapa progride por eles. */
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
  exercises: E[]
}

export interface ExerciseViewProps<E extends ExerciseBase> {
  exercise: E
  /** Trava a interacao enquanto o feedback da resposta esta na tela. */
  locked: boolean
  onAnswer: (correct: boolean) => void
}

/**
 * Um modulo e autocontido: declara suas etapas/exercicios e sabe renderizar os seus proprios
 * tipos de exercicio. O motor (ExercisePlayer) cuida de tempo, tentativas, progresso, KPIs e
 * Pizinho — nada disso precisa ser reimplementado por modulo novo.
 *
 * Para adicionar um modulo: crie src/modules/<nome>/index.ts exportando um MathModule e
 * registre em src/modules/registry.ts. Nada mais no app precisa mudar.
 */
export interface MathModule<E extends ExerciseBase = ExerciseBase> {
  id: string
  title: string
  tagline: string
  /** 'soon' aparece no hub como card desabilitado (roadmap visivel, sem codigo morto). */
  status: 'ready' | 'soon'
  accent: string
  stages: Stage<E>[]
  ExerciseView: ComponentType<ExerciseViewProps<E>>
}

/**
 * Tipo do modulo visto pelo app (hub, player, painel). O `any` e proposital: cada modulo tem
 * seu proprio uniao de tipos de exercicio, e o motor so precisa da forma comum (ExerciseBase)
 * mais a capacidade de renderizar o que aquele modulo declarou.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyMathModule = MathModule<any>
