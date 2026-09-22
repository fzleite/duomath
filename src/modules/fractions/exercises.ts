import type { ShapeKind } from '../../components/FractionShape'
import type { ExerciseBase, Stage } from '../types'

export interface Fraction {
  n: number
  d: number
}

/** Mostra um desenho e pergunta qual fracao ele representa. */
export interface IdentifyExercise extends ExerciseBase {
  kind: 'identify'
  shape: ShapeKind
  value: Fraction
  options: Fraction[]
  showCount?: boolean
}

/** Dois desenhos lado a lado: qual fracao e maior (ou sao iguais). */
export interface CompareExercise extends ExerciseBase {
  kind: 'compare'
  shape: ShapeKind
  left: Fraction
  right: Fraction
}

/** Sliders de numerador e denominador: montar a fracao alvo e ver o desenho mudar ao vivo. */
export interface BuildExercise extends ExerciseBase {
  kind: 'build'
  shape: ShapeKind
  target: Fraction
  maxDenominator: number
}

/** Pergunta de texto com alternativas de texto e desenho opcional de apoio. */
export interface ChoiceExercise extends ExerciseBase {
  kind: 'choice'
  options: string[]
  answerIndex: number
  visual?: { shape: ShapeKind; value: Fraction }
}

export type FractionExercise = IdentifyExercise | CompareExercise | BuildExercise | ChoiceExercise

export const fractionStages: Stage<FractionExercise>[] = [
  {
    id: 'etapa-1',
    title: 'Percepcao visual e comparacao simples',
    curriculum: 'base do 4o ano — BNCC',
    years: [4],
    exercises: [
      {
        id: 'e1-01',
        kind: 'identify',
        bloom: 'lembrar',
        prompt: 'Que fracao da pizza esta pintada?',
        hint: 'Conte primeiro em quantos pedacos iguais a pizza foi dividida. Esse numero fica embaixo.',
        shape: 'pizza',
        value: { n: 1, d: 2 },
        options: [
          { n: 1, d: 2 },
          { n: 2, d: 1 },
          { n: 1, d: 4 },
        ],
        showCount: true,
      },
      {
        id: 'e1-02',
        kind: 'identify',
        bloom: 'lembrar',
        prompt: 'Que fracao do retangulo esta pintada?',
        hint: 'Sao 8 partes iguais no total. Conte quantas estao com cor.',
        shape: 'rect',
        value: { n: 3, d: 8 },
        options: [
          { n: 3, d: 8 },
          { n: 8, d: 3 },
          { n: 3, d: 5 },
        ],
        showCount: true,
      },
      {
        id: 'e1-03',
        kind: 'identify',
        bloom: 'entender',
        prompt: 'A mesma fracao pode ter desenhos diferentes. Que fracao da barra esta pintada?',
        hint: 'O desenho mudou de forma, mas a ideia e a mesma: partes pintadas sobre partes totais.',
        shape: 'bar',
        value: { n: 2, d: 6 },
        options: [
          { n: 2, d: 6 },
          { n: 4, d: 6 },
          { n: 6, d: 2 },
        ],
      },
      {
        id: 'e1-04',
        kind: 'compare',
        bloom: 'entender',
        prompt: 'Qual pedaco e maior?',
        hint: 'Quando o numero de cima e igual, quem tem MENOS pedacos no total tem cada pedaco maior.',
        shape: 'pizza',
        left: { n: 1, d: 3 },
        right: { n: 1, d: 6 },
      },
      {
        id: 'e1-05',
        kind: 'compare',
        bloom: 'analisar',
        prompt: 'Qual fracao e maior?',
        hint: 'Olhe quanto falta para completar o inteiro em cada desenho.',
        shape: 'bar',
        left: { n: 3, d: 4 },
        right: { n: 2, d: 3 },
      },
      {
        id: 'e1-06',
        kind: 'build',
        bloom: 'aplicar',
        prompt: 'Monte a fracao tres quartos usando os controles.',
        hint: 'Primeiro ajuste o total de pedacos (embaixo), depois quantos pintar (em cima).',
        shape: 'pizza',
        target: { n: 3, d: 4 },
        maxDenominator: 10,
      },
    ],
  },
  {
    id: 'etapa-2',
    title: 'Equivalencia, decimais e porcentagem',
    curriculum: 'base do 5o ano — BNCC',
    years: [5],
    exercises: [
      {
        id: 'e2-01',
        kind: 'identify',
        bloom: 'entender',
        prompt: 'Esta barra mostra a mesma quantidade que 1/2. Que fracao ela representa?',
        hint: 'Duas fracoes diferentes podem pintar exatamente o mesmo tanto — essas sao equivalentes.',
        shape: 'bar',
        value: { n: 4, d: 8 },
        options: [
          { n: 4, d: 8 },
          { n: 3, d: 8 },
          { n: 8, d: 4 },
        ],
      },
      {
        id: 'e2-02',
        kind: 'choice',
        bloom: 'aplicar',
        prompt: 'Qual destas fracoes e equivalente a 2/3?',
        hint: 'Multiplique o numero de cima e o de baixo pelo mesmo valor: 2x2 e 3x2.',
        options: ['4/6', '3/4', '2/6', '4/3'],
        answerIndex: 0,
        visual: { shape: 'pizza', value: { n: 2, d: 3 } },
      },
      {
        id: 'e2-03',
        kind: 'choice',
        bloom: 'entender',
        prompt: 'A decima parte de um inteiro, 1/10, corresponde a quantos por cento?',
        hint: 'Cem por cento e o inteiro todo. Divida esse inteiro em 10 partes iguais.',
        options: ['10%', '1%', '100%', '20%'],
        answerIndex: 0,
        visual: { shape: 'rect', value: { n: 1, d: 10 } },
      },
      {
        id: 'e2-04',
        kind: 'choice',
        bloom: 'aplicar',
        prompt: 'Qual numero decimal representa 3/4?',
        hint: 'Metade e 0,5. Tres quartos e mais que metade, mas menos que o inteiro.',
        options: ['0,75', '0,34', '3,4', '0,25'],
        answerIndex: 0,
        visual: { shape: 'bar', value: { n: 3, d: 4 } },
      },
      {
        id: 'e2-05',
        kind: 'choice',
        bloom: 'analisar',
        prompt: 'Coloque em ordem, da menor para a maior: 1/2, 1/4, 3/4.',
        hint: 'Todas tem o mesmo inteiro dividido. Compare quantos pedacos estao pintados.',
        options: ['1/4, 1/2, 3/4', '1/2, 1/4, 3/4', '3/4, 1/2, 1/4', '1/4, 3/4, 1/2'],
        answerIndex: 0,
      },
      {
        id: 'e2-06',
        kind: 'build',
        bloom: 'avaliar',
        prompt: 'Monte uma fracao equivalente a 1/2 usando 10 pedacos no total.',
        hint: 'Se o total e 10, quantos pedacos pintados cobrem exatamente a metade?',
        shape: 'rect',
        target: { n: 5, d: 10 },
        maxDenominator: 12,
      },
    ],
  },
  {
    id: 'etapa-3',
    title: 'Operacoes e fracao de quantidades',
    curriculum: 'base do 6o ano — BNCC',
    years: [6],
    exercises: [
      {
        id: 'e3-01',
        kind: 'choice',
        bloom: 'entender',
        prompt: 'A fracao 12/4 tambem e o resultado de uma divisao. Quanto vale?',
        hint: 'Leia a fracao como "12 dividido por 4".',
        options: ['3', '4', '8', '12'],
        answerIndex: 0,
      },
      {
        id: 'e3-02',
        kind: 'choice',
        bloom: 'aplicar',
        prompt: 'Quanto e 3/4 de 12 figurinhas?',
        hint: 'Divida 12 em 4 partes iguais (isso da 1/4) e depois pegue 3 dessas partes.',
        options: ['9', '4', '3', '16'],
        answerIndex: 0,
        visual: { shape: 'rect', value: { n: 3, d: 4 } },
      },
      {
        id: 'e3-03',
        kind: 'choice',
        bloom: 'aplicar',
        prompt: 'Uma receita usa 2/5 de um pacote de 20 balas. Quantas balas sao?',
        hint: 'Cada quinto de 20 e 20 dividido por 5.',
        options: ['8', '4', '10', '5'],
        answerIndex: 0,
      },
      {
        id: 'e3-04',
        kind: 'choice',
        bloom: 'aplicar',
        prompt: 'Quanto e 1/5 + 2/5?',
        hint: 'O total de pedacos (embaixo) e o mesmo nas duas: basta somar os pedacos de cima.',
        options: ['3/5', '3/10', '2/5', '1/10'],
        answerIndex: 0,
        visual: { shape: 'bar', value: { n: 3, d: 5 } },
      },
      {
        id: 'e3-05',
        kind: 'choice',
        bloom: 'aplicar',
        prompt: 'Quanto e 5/8 - 2/8?',
        hint: 'Comece com 5 pedacos pintados de 8 e apague 2 deles.',
        options: ['3/8', '7/8', '3/16', '2/8'],
        answerIndex: 0,
        visual: { shape: 'pizza', value: { n: 3, d: 8 } },
      },
      {
        id: 'e3-06',
        kind: 'choice',
        bloom: 'avaliar',
        prompt: 'Luiza comeu 1/2 de uma pizza e Ana comeu 2/4 da pizza dela, do mesmo tamanho. Quem comeu mais?',
        hint: 'Desenhe as duas: 2/4 pinta o mesmo tanto que 1/2?',
        options: ['As duas comeram igual', 'Luiza', 'Ana', 'Nao da para saber'],
        answerIndex: 0,
      },
    ],
  },
]
