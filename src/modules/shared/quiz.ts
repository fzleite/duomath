import type { VisualSpec } from '../../components/Visual'
import type { ExerciseBase } from '../types'

/**
 * Exercicio de alternativas com apoio visual opcional — a forma que cobre a maioria dos
 * modulos de conteudo. Um modulo novo desse tipo e so um arquivo de dados: declara etapas com
 * QuizExercise e usa a QuizExerciseView.
 *
 * Convencao: a resposta certa e SEMPRE options[0] nos dados (answerIndex 0); a view embaralha
 * na renderizacao. Isso mantem os dados legiveis e e verificado por script.
 */
export interface QuizExercise extends ExerciseBase {
  options: string[]
  answerIndex: number
  visual?: VisualSpec
}
