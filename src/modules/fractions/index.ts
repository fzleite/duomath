import type { MathModule } from '../types'
import { FractionExerciseView } from './FractionExerciseView'
import { fractionStages, type FractionExercise } from './exercises'

export const fractionsModule: MathModule<FractionExercise> = {
  id: 'fracoes',
  title: 'Fracoes',
  tagline: 'Partes de um todo, equivalencia e operacoes.',
  status: 'ready',
  accent: '#1a936f',
  stages: fractionStages,
  ExerciseView: FractionExerciseView,
}
