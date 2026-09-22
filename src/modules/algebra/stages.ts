import type { QuizExercise } from '../shared/quiz'
import type { Stage } from '../types'

/**
 * Modulo 3 — Algebra, 6o ao 9o ano. As etapas estao declaradas com a progressao da BNCC para
 * que o plano apareca na navegacao por serie, mas os exercicios ainda nao foram escritos:
 * as etapas 4 e 6 dependem de um plano cartesiano interativo com sliders de coeficiente
 * (reta e parabola se transformando em tempo real) e a etapa 2 de uma balanca de equilibrio.
 * Cada um desses e um componente de porte, nao conteudo.
 */
export const algebraStages: Stage<QuizExercise>[] = [
  {
    id: 'etapa-1',
    title: 'Variavel e expressoes algebricas',
    curriculum: 'base do 6o ano — BNCC',
    years: [6],
    exercises: [],
  },
  {
    id: 'etapa-2',
    title: 'Equacoes do 1o grau na balanca',
    curriculum: 'base do 7o ano — BNCC',
    years: [7],
    exercises: [],
  },
  {
    id: 'etapa-3',
    title: 'Sistemas do 1o grau e plano cartesiano',
    curriculum: 'base do 8o ano — BNCC',
    years: [8],
    exercises: [],
  },
  {
    id: 'etapa-4',
    title: 'Funcao afim com sliders de coeficiente',
    curriculum: 'base do 8o e 9o ano — BNCC',
    years: [8, 9],
    exercises: [],
  },
  {
    id: 'etapa-5',
    title: 'Fatoracao e produtos notaveis',
    curriculum: 'base do 8o e 9o ano — BNCC',
    years: [8, 9],
    exercises: [],
  },
  {
    id: 'etapa-6',
    title: 'Equacao do 2o grau e a parabola',
    curriculum: 'base do 9o ano — BNCC',
    years: [9],
    exercises: [],
  },
]
