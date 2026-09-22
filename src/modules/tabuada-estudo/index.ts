import { QuizExerciseView } from '../shared/QuizExerciseView'
import type { QuizExercise } from '../shared/quiz'
import type { ContentModule } from '../types'
import { studyStages } from './exercises'

/**
 * Modo de estudo da Tabuada — a metade pedagogica do assunto, com etapas por Bloom e apoio
 * visual. A outra metade e o modulo de jogo (`src/modules/tabuada`), que fica na secao Jogos.
 *
 * Os ids sao distintos de proposito: `tabuada` ja era o id do jogo e ja existem tentativas
 * gravadas com ele, entao o estudo entra como `tabuada-estudo` em vez de renomear o jogo e
 * orfanar o historico de quem ja treinou.
 */
export const tabuadaEstudoModule: ContentModule<QuizExercise> = {
  id: 'tabuada-estudo',
  title: 'Tabuada',
  tagline: 'Multiplicacao como soma de grupos iguais, memoria e padroes.',
  status: 'ready',
  accent: '#5aa9e6',
  category: 'conteudo',
  stages: studyStages,
  ExerciseView: QuizExerciseView,
  companionGameId: 'tabuada',
}
