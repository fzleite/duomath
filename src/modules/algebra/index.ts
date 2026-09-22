import { QuizExerciseView } from '../shared/QuizExerciseView'
import type { QuizExercise } from '../shared/quiz'
import type { ContentModule } from '../types'
import { algebraStages } from './stages'
import { algebraApoio } from './apoio'

export const algebraModule: ContentModule<QuizExercise> = {
  id: 'algebra',
  title: 'Álgebra',
  tagline: 'Letras no lugar de números, equações e funções.',
  status: 'ready',
  accent: '#48bfe3',
  category: 'conteudo',
  stages: algebraStages,
  apoio: algebraApoio,
  ExerciseView: QuizExerciseView,
}
