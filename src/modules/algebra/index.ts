import { QuizExerciseView } from '../shared/QuizExerciseView'
import type { QuizExercise } from '../shared/quiz'
import type { ContentModule } from '../types'
import { algebraStages } from './stages'

export const algebraModule: ContentModule<QuizExercise> = {
  id: 'algebra',
  title: 'Algebra',
  tagline: 'Letras no lugar de numeros, equacoes e funcoes.',
  status: 'ready',
  accent: '#48bfe3',
  category: 'conteudo',
  stages: algebraStages,
  ExerciseView: QuizExerciseView,
}
