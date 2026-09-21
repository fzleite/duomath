import type { ContentModule } from '../types'
import { FractionExerciseView } from './FractionExerciseView'
import { fractionStages, type FractionExercise } from './exercises'

export const fractionsModule: ContentModule<FractionExercise> = {
  id: 'fracoes',
  title: 'Fracoes',
  tagline: 'Partes de um todo, equivalencia e operacoes.',
  status: 'ready',
  accent: '#1a936f',
  category: 'conteudo',
  stages: fractionStages,
  ExerciseView: FractionExerciseView,
}
