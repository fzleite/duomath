import type { QuizExercise } from '../shared/quiz'
import type { Stage } from '../types'

/**
 * Modulo 4 — Geometria e Trigonometria, 6o ao 9o ano. E o modulo em que o Pizinho e
 * formalmente apresentado como referencia ao numero Pi.
 *
 * Etapas declaradas, exercicios pendentes: a etapa 4 precisa de instrumentos de desenho
 * simulados (mediatriz, bissetriz, poligonos regulares) e a etapa 6 de um circulo
 * trigonometrico interativo ligado a um triangulo manipulavel — componentes de porte.
 */
export const geometriaStages: Stage<QuizExercise>[] = [
  {
    id: 'etapa-1',
    title: 'Poligonos e pontos no plano cartesiano',
    curriculum: 'base do 6o ano — BNCC',
    years: [6],
    exercises: [],
  },
  {
    id: 'etapa-2',
    title: 'Vertices, faces e arestas de prismas e piramides',
    curriculum: 'base do 6o e 7o ano — BNCC',
    years: [6, 7],
    exercises: [],
  },
  {
    id: 'etapa-3',
    title: 'Angulos em retas paralelas cortadas por transversal',
    curriculum: 'base do 7o ano — BNCC',
    years: [7],
    exercises: [],
  },
  {
    id: 'etapa-4',
    title: 'Construcoes geometricas: mediatriz, bissetriz e angulos',
    curriculum: 'base do 7o e 8o ano — BNCC',
    years: [7, 8],
    exercises: [],
  },
  {
    id: 'etapa-5',
    title: 'Semelhanca de triangulos',
    curriculum: 'base do 8o e 9o ano — BNCC',
    years: [8, 9],
    exercises: [],
  },
  {
    id: 'etapa-6',
    title: 'Seno, cosseno e tangente no triangulo retangulo',
    curriculum: 'base do 9o ano — BNCC',
    years: [9],
    exercises: [],
  },
]
