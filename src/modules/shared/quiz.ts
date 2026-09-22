import type { VisualSpec } from '../../components/Visual'
import type { ExerciseBase } from '../types'

/**
 * Entrada numerica: a crianca digita a resposta no teclado do app em vez de escolher entre
 * alternativas. Importa quando "reconhecer a resposta certa na lista" e mais facil que
 * produzi-la — o caso de avaliar expressao algebrica, media ou equacao.
 */
export interface NumeroInput {
  mode: 'numero'
  answer: number
  /** Sufixo exibido junto da resposta (ex: 'cm', 'reais'). */
  unit?: string
  /** Aceita virgula decimal no teclado. */
  decimal?: boolean
  /** Aceita sinal negativo — necessario em algebra. */
  negativo?: boolean
}

/**
 * Ajuste ate bater: sliders de coeficiente com previa ao vivo. E o "ver a reta se
 * transformando" que o spec pede, com a resposta sendo a configuracao correta.
 */
export interface AjusteInput {
  mode: 'ajuste'
  /**
   * Que previa desenhar enquanto a crianca mexe nos controles:
   * - 'afim' e 'quadratica' — reta e parabola no plano cartesiano (controles a, b, c)
   * - 'trigonometria' — circulo trigonometrico e triangulo (controle 'angulo')
   * - 'barras' — grafico de barras que a crianca monta (um controle por barra)
   */
  preview: 'afim' | 'quadratica' | 'trigonometria' | 'barras'
  controls: { id: string; label: string; min: number; max: number; target: number; step?: number }[]
}

/** Clicar no ponto certo — na reta numerica ou no plano cartesiano. */
export interface PontoInput {
  mode: 'ponto'
  em: 'reta' | 'plano'
  /** Reta: valor alvo (com `max` definindo a escala). Plano: par ordenado alvo. */
  target: { value?: number; x?: number; y?: number }
  max?: number
  /** Passo da reta/grade; 1 por padrao. */
  step?: number
}

export type QuizInput = NumeroInput | AjusteInput | PontoInput

/**
 * Exercicio do formato comum: enunciado + visual opcional + uma forma de responder.
 *
 * Por padrao a resposta e por alternativas (`options`), com a convencao de que a certa e
 * SEMPRE `options[0]` nos dados — a view embaralha na renderizacao, o que mantem os dados
 * legiveis e verificavel por script. Quando `input` esta presente, ele substitui as
 * alternativas. `options` e `input` sao mutuamente exclusivos (o check:content reprova os dois
 * juntos ou nenhum dos dois).
 */
export interface QuizExercise extends ExerciseBase {
  options?: string[]
  answerIndex?: number
  input?: QuizInput
  visual?: VisualSpec
}
