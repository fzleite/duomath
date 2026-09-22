import { QuizExerciseView } from '../shared/QuizExerciseView'
import type { QuizExercise } from '../shared/quiz'
import type { ContentModule } from '../types'
import { grandezasStages } from './exercises'
import { grandezasApoio } from './apoio'

export const grandezasModule: ContentModule<QuizExercise> = {
  id: 'grandezas',
  title: 'Grandezas e Medidas',
  tagline: 'Comprimento, área, volume, conversão de unidades e escala.',
  status: 'ready',
  accent: '#2a9d8f',
  category: 'conteudo',
  stages: grandezasStages,
  apoio: grandezasApoio,
  ExerciseView: QuizExerciseView,
}
