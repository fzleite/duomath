import { QuizExerciseView } from '../shared/QuizExerciseView'
import type { QuizExercise } from '../shared/quiz'
import type { ContentModule } from '../types'
import { porcentagemStages } from './exercises'

export const porcentagemModule: ContentModule<QuizExercise> = {
  id: 'porcentagem',
  title: 'Porcentagem',
  tagline: 'Por cento como parte de cem, de descontos a educacao financeira.',
  status: 'ready',
  accent: '#3b7ba0',
  category: 'conteudo',
  stages: porcentagemStages,
  ExerciseView: QuizExerciseView,
}
