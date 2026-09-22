import type { ContentModule } from '../types'
import { FractionExerciseView } from './FractionExerciseView'
import { fractionStages, type FractionExercise } from './exercises'
import { fractionsApoio } from './apoio'

export const fractionsModule: ContentModule<FractionExercise> = {
  id: 'fracoes',
  title: 'Frações',
  tagline: 'Partes de um todo, equivalência e operações.',
  status: 'ready',
  accent: '#1a936f',
  category: 'conteudo',
  stages: fractionStages,
  apoio: fractionsApoio,
  ExerciseView: FractionExerciseView,
}
