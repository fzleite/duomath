import type { QuizExercise } from '../shared/quiz'
import type { Stage } from '../types'

/**
 * Modulo 4 — Geometria e Trigonometria, 6o ao 9o ano. E o modulo em que o Pizinho e
 * formalmente apresentado como referencia ao numero Pi.
 *
 * Etapas 1 e 5 com conteudo. Seguem declaradas: a 2 (precisa de solidos 3D com contagem de
 * vertices, faces e arestas), a 3 (angulos em paralelas), a 4 (instrumentos de desenho
 * simulados) e a 6 (circulo trigonometrico interativo).
 */
export const geometriaStages: Stage<QuizExercise>[] = [
  {
    id: 'etapa-1',
    title: 'Poligonos e pontos no plano cartesiano',
    curriculum: 'base do 6o ano — BNCC',
    years: [6],
    exercises: [
      {
        id: 'ge1-01',
        bloom: 'lembrar',
        prompt: 'Quantos lados tem este poligono?',
        hint: 'Conte os vertices marcados: cada um liga dois lados.',
        visual: { kind: 'poligono', lados: 5 },
        options: ['5', '4', '6', '10'],
        answerIndex: 0,
      },
      {
        id: 'ge1-02',
        bloom: 'lembrar',
        prompt: 'Um poligono com todos os lados e angulos iguais e chamado de...',
        hint: 'Se tudo nele e igual, ele segue uma regra — e por isso recebe esse nome.',
        options: ['Regular', 'Irregular', 'Simetrico', 'Retangular'],
        answerIndex: 0,
      },
      {
        id: 'ge1-03',
        bloom: 'entender',
        prompt: 'Este poligono tem quantos vertices?',
        hint: 'Num poligono, o numero de vertices e igual ao numero de lados.',
        visual: { kind: 'poligono', lados: 6 },
        input: { mode: 'numero', answer: 6 },
      },
      {
        id: 'ge1-04',
        bloom: 'aplicar',
        prompt: 'Toque no ponto de coordenadas (3, 2).',
        hint: 'Ande 3 para a direita e 2 para cima, partindo do centro.',
        input: { mode: 'ponto', em: 'plano', target: { x: 3, y: 2 } },
      },
      {
        id: 'ge1-05',
        bloom: 'aplicar',
        prompt: 'Toque no ponto (-2, 3).',
        hint: 'O primeiro numero e negativo: ande para a esquerda, e depois suba.',
        input: { mode: 'ponto', em: 'plano', target: { x: -2, y: 3 } },
      },
      {
        id: 'ge1-06',
        bloom: 'analisar',
        prompt: 'Que figura os vertices deste plano formam?',
        hint: 'Sao quatro vertices, com os quatro lados do mesmo tamanho.',
        visual: {
          kind: 'plano',
          poligono: true,
          pontos: [
            { x: -2, y: -2 },
            { x: 2, y: -2 },
            { x: 2, y: 2 },
            { x: -2, y: 2 },
          ],
        },
        options: ['Um quadrado', 'Um triangulo', 'Um pentagono', 'Um circulo'],
        answerIndex: 0,
      },
    ],
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
    exercises: [
      {
        id: 'ge5-01',
        bloom: 'entender',
        prompt: 'Dois triangulos semelhantes tem o que em comum?',
        hint: 'Olhe os dois desenhos: o formato e o mesmo, o tamanho nao.',
        visual: { kind: 'triangulos', base: 3, altura: 4, fator: 1.6 },
        options: [
          'Os mesmos angulos, com lados proporcionais',
          'O mesmo tamanho exato',
          'A mesma area',
          'Nada em comum',
        ],
        answerIndex: 0,
      },
      {
        id: 'ge5-02',
        bloom: 'entender',
        prompt: 'Um triangulo de base 3 virou um de base 6. Qual foi a razao de semelhanca?',
        hint: 'Quantas vezes a base aumentou?',
        visual: { kind: 'triangulos', base: 3, altura: 4, fator: 2 },
        input: { mode: 'numero', answer: 2 },
      },
      {
        id: 'ge5-03',
        bloom: 'aplicar',
        prompt: 'Na razao 2, se a altura do menor e 4, quanto vale a altura do maior?',
        hint: 'Na semelhanca, todos os lados crescem na mesma proporcao.',
        input: { mode: 'numero', answer: 8 },
      },
      {
        id: 'ge5-04',
        bloom: 'aplicar',
        prompt: 'Um poste projeta sombra de 6 m; um bastao de 1 m projeta 2 m. Qual a altura do poste?',
        hint: 'Os dois triangulos sao semelhantes: a sombra do poste e 3 vezes a do bastao.',
        input: { mode: 'numero', answer: 3, unit: 'metros' },
      },
      {
        id: 'ge5-05',
        bloom: 'analisar',
        prompt: 'Se a razao de semelhanca entre dois triangulos e 3, a razao entre as areas e...',
        hint: 'Area tem duas dimensoes: a razao aparece duas vezes, uma vez em cada.',
        input: { mode: 'numero', answer: 9 },
      },
      {
        id: 'ge5-06',
        bloom: 'avaliar',
        prompt: 'Dois triangulos com dois angulos iguais entre si sao sempre semelhantes?',
        hint: 'Se dois angulos sao iguais, o terceiro tambem e — a soma sempre da 180 graus.',
        options: [
          'Sim, porque o terceiro angulo tambem sera igual',
          'Nao, precisa dos tres angulos dados',
          'Nao, precisa ter a mesma area',
          'So se forem retangulos',
        ],
        answerIndex: 0,
      },
    ],
  },
  {
    id: 'etapa-6',
    title: 'Seno, cosseno e tangente no triangulo retangulo',
    curriculum: 'base do 9o ano — BNCC',
    years: [9],
    exercises: [],
  },
]
