import type { QuizExercise } from '../shared/quiz'
import type { Stage } from '../types'

/**
 * Modulo 6 — Probabilidade e Estatistica ao longo do Fundamental.
 *
 * Etapa 4 com conteudo (media, moda, mediana e amplitude, com o conjunto de dados desenhado
 * em barras e resposta por entrada numerica — reconhecer a media numa lista de alternativas
 * seria bem mais facil que calcula-la).
 *
 * Seguem declaradas: a 1 e a 2 (precisam de graficos de barras/pizza para leitura e de um
 * construtor em que a crianca monta o grafico a partir dos dados), a 3 (simulacao visual de
 * sorteio) e a 5 (fluxo de pesquisa amostral).
 */
export const probabilidadeStages: Stage<QuizExercise>[] = [
  {
    id: 'etapa-1',
    title: 'Ler tabelas e graficos simples',
    curriculum: 'base do 3o e 4o ano — BNCC',
    years: [3, 4],
    exercises: [],
  },
  {
    id: 'etapa-2',
    title: 'Construir graficos e tabelas a partir de dados',
    curriculum: 'base do 5o e 6o ano — BNCC',
    years: [5, 6],
    exercises: [],
  },
  {
    id: 'etapa-3',
    title: 'Chance de um evento, com sorteios simulados',
    curriculum: 'base do 6o e 7o ano — BNCC',
    years: [6, 7],
    exercises: [],
  },
  {
    id: 'etapa-4',
    title: 'Media, moda, mediana e amplitude',
    curriculum: 'base do 7o e 8o ano — BNCC',
    years: [7, 8],
    exercises: [
      {
        id: 'pe4-01',
        bloom: 'entender',
        prompt: 'Qual e a moda deste conjunto de dados?',
        hint: 'Moda e o valor que mais aparece. Procure a barra repetida.',
        visual: { kind: 'dados', valores: [3, 7, 7, 2, 9] },
        input: { mode: 'numero', answer: 7 },
      },
      {
        id: 'pe4-02',
        bloom: 'aplicar',
        prompt: 'Qual e a media deste conjunto?',
        hint: 'Some todos os valores e divida pela quantidade de valores.',
        visual: { kind: 'dados', valores: [4, 6, 8, 10, 2] },
        input: { mode: 'numero', answer: 6 },
      },
      {
        id: 'pe4-03',
        bloom: 'aplicar',
        prompt: 'Qual e a mediana deste conjunto?',
        hint: 'Coloque os valores em ordem e pegue o do meio: 1, 3, 4, 8, 9.',
        visual: { kind: 'dados', valores: [8, 3, 4, 9, 1] },
        input: { mode: 'numero', answer: 4 },
      },
      {
        id: 'pe4-04',
        bloom: 'aplicar',
        prompt: 'Qual e a amplitude deste conjunto?',
        hint: 'Amplitude e a diferenca entre o maior e o menor valor.',
        visual: { kind: 'dados', valores: [5, 12, 7, 3, 9] },
        input: { mode: 'numero', answer: 9 },
      },
      {
        id: 'pe4-05',
        bloom: 'analisar',
        prompt: 'Num conjunto com um valor muito fora dos outros, qual medida sofre mais?',
        hint: 'A media soma todos os valores; a mediana so olha a posicao do meio.',
        options: ['A media', 'A mediana', 'A moda', 'A amplitude nao muda'],
        answerIndex: 0,
      },
      {
        id: 'pe4-06',
        bloom: 'avaliar',
        prompt: 'As notas de uma turma sao 6, 6, 6, 6 e 10. Que medida representa melhor a turma?',
        hint: 'A media sobe por causa do 10, mas quase todos tiraram 6.',
        options: [
          'A moda, porque quase todos tiraram a mesma nota',
          'A media, sempre',
          'A amplitude',
          'Nenhuma serve',
        ],
        answerIndex: 0,
      },
    ],
  },
  {
    id: 'etapa-5',
    title: 'Planejar uma pesquisa e comunicar resultados',
    curriculum: 'base do 8o e 9o ano — BNCC',
    years: [8, 9],
    exercises: [],
  },
]
