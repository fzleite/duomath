import { QuizExerciseView } from '../shared/QuizExerciseView'
import type { QuizExercise } from '../shared/quiz'
import type { ContentModule } from '../types'
import { geometriaStages } from './stages'
import { geometriaApoio } from './apoio'

export const geometriaModule: ContentModule<QuizExercise> = {
  id: 'geometria',
  title: 'Geometria e Trigonometria',
  tagline: 'Formas, ângulos e as razões do triângulo — a casa do Pizinho.',
  status: 'ready',
  accent: '#1a936f',
  category: 'conteudo',
  stages: geometriaStages,
  apoio: geometriaApoio,
  ExerciseView: QuizExerciseView,
}
