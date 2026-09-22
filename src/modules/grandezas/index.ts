import { QuizExerciseView } from '../shared/QuizExerciseView'
import type { QuizExercise } from '../shared/quiz'
import type { ContentModule } from '../types'
import { grandezasStages } from './exercises'

export const grandezasModule: ContentModule<QuizExercise> = {
  id: 'grandezas',
  title: 'Grandezas e Medidas',
  tagline: 'Comprimento, area, volume, conversao de unidades e escala.',
  status: 'ready',
  accent: '#2a9d8f',
  category: 'conteudo',
  stages: grandezasStages,
  ExerciseView: QuizExerciseView,
}
