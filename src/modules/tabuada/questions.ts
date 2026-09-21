import type { GameLevel } from '../types'

export interface TabuadaQuestion {
  /** Id estavel do item (ex: 'tab-8x7') — o mesmo item sorteado de novo reusa este id. */
  id: string
  /** Agrupador de estatistica: a tabuada sorteada (ex: '8'). Nas contas soltas, 'contas'. */
  tag: string
  a: number
  b: number
  answer: number
  label: string
}

export const SESSION_SIZE = 10

/**
 * Criterios de desbloqueio. O spec pede "tempo medio de resposta abaixo de um limite alvo" e
 * deixa o numero em aberto; estes valores sao o ponto de partida e estao todos aqui para
 * serem calibrados depois de ver a crianca jogando.
 */
export const tabuadaLevels: GameLevel[] = [
  {
    id: 'facil',
    title: 'Facil',
    description: 'Tabuadas de 1 a 10, sorteadas.',
    unlock: null,
  },
  {
    id: 'avancado',
    title: 'Avancado',
    description: 'Tabuadas de 1 a 100, sorteadas.',
    unlock: { fromLevelId: 'facil', minCorrect: 30, maxAvgMs: 5000, minAccuracy: 0.8 },
  },
  {
    id: 'contas',
    title: 'Contas aleatorias',
    description: 'Multiplicacoes soltas, como 25 x 8.',
    unlock: { fromLevelId: 'avancado', minCorrect: 30, maxAvgMs: 9000, minAccuracy: 0.75 },
  },
]

function randomInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1))
}

function build(a: number, b: number, tag: string): TabuadaQuestion {
  return { id: `tab-${a}x${b}`, tag, a, b, answer: a * b, label: `${a} x ${b}` }
}

/**
 * Sorteia a proxima pergunta do nivel. `avoidId` evita repetir a pergunta imediatamente
 * anterior, que na tabuada do 1 a 10 acontece com frequencia incomoda.
 */
export function drawQuestion(levelId: string, avoidId?: string): TabuadaQuestion {
  for (let tentativa = 0; tentativa < 8; tentativa++) {
    const question = drawOnce(levelId)
    if (question.id !== avoidId) return question
  }
  return drawOnce(levelId)
}

function drawOnce(levelId: string): TabuadaQuestion {
  if (levelId === 'avancado') {
    // a tabuada sorteada vai de 1 a 100; o multiplicador segue de 1 a 10
    const table = randomInt(1, 100)
    return build(table, randomInt(1, 10), String(table))
  }
  if (levelId === 'contas') {
    // conta solta: os dois fatores variam, entao a estatistica agrupa tudo como 'contas'
    return build(randomInt(11, 50), randomInt(2, 12), 'contas')
  }
  const table = randomInt(1, 10)
  return build(table, randomInt(1, 10), String(table))
}
