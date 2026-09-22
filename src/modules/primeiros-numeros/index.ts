import { QuizExerciseView } from '../shared/QuizExerciseView'
import type { QuizExercise } from '../shared/quiz'
import type { ContentModule } from '../types'
import { primeirosNumerosStages } from './exercises'
import { primeirosNumerosApoio } from './apoio'

/**
 * Modulo 0 — existe para incluir a filha mais nova, que estava de fora por idade.
 * Primeiro da lista no hub de proposito: e a porta de entrada de quem esta no 1o ano.
 */
export const primeirosNumerosModule: ContentModule<QuizExercise> = {
  id: 'primeiros-numeros',
  title: 'Primeiros Números',
  tagline: 'Contar, comparar, somar e ver padrões. Do 1o ao 3º ano.',
  status: 'ready',
  accent: '#4c9f70',
  category: 'conteudo',
  stages: primeirosNumerosStages,
  apoio: primeirosNumerosApoio,
  ExerciseView: QuizExerciseView,
}
