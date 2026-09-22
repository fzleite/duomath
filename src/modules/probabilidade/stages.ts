import type { QuizExercise } from '../shared/quiz'
import type { Stage } from '../types'

/**
 * Modulo 6 — Probabilidade e Estatistica ao longo do Fundamental.
 *
 * Etapas declaradas, exercicios pendentes: a etapa 2 pede um construtor de graficos (a
 * crianca monta o grafico a partir dos dados, nao escolhe alternativa), a 3 pede simulacao
 * visual de sorteio e a 5 um fluxo de pesquisa amostral — todos interativos, nao conteudo.
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
    exercises: [],
  },
  {
    id: 'etapa-5',
    title: 'Planejar uma pesquisa e comunicar resultados',
    curriculum: 'base do 8o e 9o ano — BNCC',
    years: [8, 9],
    exercises: [],
  },
]
