import { QuizExerciseView } from '../shared/QuizExerciseView'
import type { QuizExercise } from '../shared/quiz'
import type { ContentModule } from '../types'
import { geometriaStages } from './stages'

export const geometriaModule: ContentModule<QuizExercise> = {
  id: 'geometria',
  title: 'Geometria e Trigonometria',
  tagline: 'Formas, angulos e as razoes do triangulo — a casa do Pizinho.',
  status: 'soon',
  accent: '#1a936f',
  category: 'conteudo',
  stages: geometriaStages,
  ExerciseView: QuizExerciseView,
}
