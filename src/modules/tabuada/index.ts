import type { GameModule } from '../types'
import { TabuadaGame } from './TabuadaGame'
import { tabuadaLevels } from './questions'

export const tabuadaModule: GameModule = {
  id: 'tabuada',
  // titulo distingue do modulo de estudo, que cobre o mesmo assunto na secao Conteudo
  title: 'Tabuada - treino rápido',
  tagline: 'Treino cronometrado de multiplicação. Entre quando quiser.',
  status: 'ready',
  accent: '#48bfe3',
  category: 'jogo',
  levels: tabuadaLevels,
  GameView: TabuadaGame,
}
