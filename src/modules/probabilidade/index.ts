import { QuizExerciseView } from '../shared/QuizExerciseView'
import type { QuizExercise } from '../shared/quiz'
import type { ContentModule } from '../types'
import { probabilidadeStages } from './stages'

export const probabilidadeModule: ContentModule<QuizExercise> = {
  id: 'probabilidade',
  title: 'Probabilidade e Estatistica',
  tagline: 'Graficos, chance, media e leitura de dados.',
  status: 'ready',
  accent: '#5aa9e6',
  category: 'conteudo',
  stages: probabilidadeStages,
  ExerciseView: QuizExerciseView,
}
