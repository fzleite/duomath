import { QuizExerciseView } from '../shared/QuizExerciseView'
import type { QuizExercise } from '../shared/quiz'
import type { ContentModule } from '../types'
import { probabilidadeStages } from './stages'
import { probabilidadeApoio } from './apoio'

export const probabilidadeModule: ContentModule<QuizExercise> = {
  id: 'probabilidade',
  title: 'Probabilidade e Estatística',
  tagline: 'Gráficos, chance, média e leitura de dados.',
  status: 'ready',
  accent: '#5aa9e6',
  category: 'conteudo',
  stages: probabilidadeStages,
  apoio: probabilidadeApoio,
  ExerciseView: QuizExerciseView,
}
