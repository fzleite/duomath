/**
 * Acentuacao dos textos visiveis ao usuario.
 *
 * Roda com `node tools/acentuar.mjs` (use `--check` para so listar pendencias).
 *
 * Por que existe: o conteudo foi escrito sem acento e isso aparece na tela da crianca. Uma
 * troca cega por palavra corromperia o codigo — `kind: 'construcao'`, `id: 'angulo'` e
 * `category: 'conteudo'` sao literais de TIPO e precisam ficar em ASCII. Entao a substituicao
 * e aplicada SO dentro do valor das chaves de texto conhecidas (e dos arrays `options`).
 *
 * Palavras curtas ambiguas (e/da/tem/as) nao entram no mapa: dependem de contexto e sao
 * tratadas por padroes de frase em FRASES.
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

/** Chaves cujo valor e texto lido por uma pessoa. */
const CHAVES_TEXTO = [
  'prompt',
  'hint',
  'title',
  'titulo',
  'tagline',
  'curriculum',
  'resumo',
  'corpo',
  'motivo',
  'label',
  'unit',
  'description',
  'nome',
  'nota',
  'submitLabel',
]

const MAPA = {
  acrescimos: 'acréscimos',
  adicao: 'adição',
  ai: 'aí',
  aleatorias: 'aleatórias',
  algebra: 'álgebra',
  algebricas: 'algébricas',
  algebrico: 'algébrico',
  angulo: 'ângulo',
  angulos: 'ângulos',
  animacao: 'animação',
  area: 'área',
  areas: 'áreas',
  associacao: 'associação',
  ate: 'até',
  avancado: 'avançado',
  balanca: 'balança',
  bastao: 'bastão',
  cabeca: 'cabeça',
  calculo: 'cálculo',
  centesima: 'centésima',
  centimetro: 'centímetro',
  centimetros: 'centímetros',
  chao: 'chão',
  circulo: 'círculo',
  comeca: 'começa',
  comecarem: 'começarem',
  comeco: 'começo',
  comercio: 'comércio',
  comodo: 'cômodo',
  comparacao: 'comparação',
  consequencia: 'consequência',
  constroi: 'constrói',
  construcao: 'construção',
  construcoes: 'construções',
  conteudo: 'conteúdo',
  conversao: 'conversão',
  correspondencia: 'correspondência',
  crianca: 'criança',
  cubico: 'cúbico',
  cubicos: 'cúbicos',
  curriculo: 'currículo',
  continuacao: 'continuação',
  dai: 'daí',
  dao: 'dão',
  decima: 'décima',
  decomposicao: 'decomposição',
  decompoe: 'decompõe',
  diametro: 'diâmetro',
  diferenca: 'diferença',
  diferencas: 'diferenças',
  dimensoes: 'dimensões',
  distancia: 'distância',
  divisao: 'divisão',
  educacao: 'educação',
  equacao: 'equação',
  equacoes: 'equações',
  equilatero: 'equilátero',
  equilibrio: 'equilíbrio',
  equivalencia: 'equivalência',
  esforco: 'esforço',
  espirito: 'espírito',
  estao: 'estão',
  estatistica: 'estatística',
  estrategia: 'estratégia',
  estrategias: 'estratégias',
  exercicio: 'exercício',
  exercicios: 'exercícios',
  expressao: 'expressão',
  expressoes: 'expressões',
  faca: 'faça',
  faceis: 'fáceis',
  facil: 'fácil',
  fatoracao: 'fatoração',
  favoravel: 'favorável',
  forca: 'força',
  formacao: 'formação',
  fracao: 'fração',
  fracionaria: 'fracionária',
  fracoes: 'frações',
  funcao: 'função',
  funcoes: 'funções',
  gemea: 'gêmea',
  geometricas: 'geométricas',
  grafico: 'gráfico',
  graficos: 'gráficos',
  ha: 'há',
  heranca: 'herança',
  historia: 'história',
  inclinacao: 'inclinação',
  introducao: 'introdução',
  intuicao: 'intuição',
  ja: 'já',
  la: 'lá',
  lapis: 'lápis',
  le: 'lê',
  ludica: 'lúdica',
  maca: 'maçã',
  manipulavel: 'manipulável',
  maos: 'mãos',
  matematica: 'matemática',
  media: 'média',
  memoria: 'memória',
  memorizacao: 'memorização',
  mes: 'mês',
  ministerio: 'ministério',
  modulo: 'módulo',
  multimidia: 'multimídia',
  multiplicacao: 'multiplicação',
  multiplicacoes: 'multiplicações',
  nao: 'não',
  narracao: 'narração',
  natacao: 'natação',
  ninguem: 'ninguém',
  notacao: 'notação',
  notacoes: 'notações',
  notaveis: 'notáveis',
  notavel: 'notável',
  numeracao: 'numeração',
  numerica: 'numérica',
  numero: 'número',
  numeros: 'números',
  obvio: 'óbvio',
  olimpiada: 'olimpíada',
  operacao: 'operação',
  operacoes: 'operações',
  opiniao: 'opinião',
  organizacao: 'organização',
  padrao: 'padrão',
  padroes: 'padrões',
  paginas: 'páginas',
  pao: 'pão',
  parabola: 'parábola',
  pe: 'pé',
  pedaco: 'pedaço',
  pedacos: 'pedaços',
  pentagono: 'pentágono',
  percepcao: 'percepção',
  perimetro: 'perímetro',
  piramide: 'pirâmide',
  piramides: 'pirâmides',
  poligono: 'polígono',
  poligonos: 'polígonos',
  posicao: 'posição',
  possiveis: 'possíveis',
  possivel: 'possível',
  pratica: 'prática',
  pratico: 'prático',
  praticos: 'práticos',
  preco: 'preço',
  preferencia: 'preferência',
  preparacao: 'preparação',
  progressao: 'progressão',
  promocao: 'promoção',
  proporcao: 'proporção',
  proposito: 'propósito',
  proprio: 'próprio',
  proximo: 'próximo',
  proximos: 'próximos',
  publicas: 'públicas',
  quilometro: 'quilômetro',
  quilometros: 'quilômetros',
  raciocinio: 'raciocínio',
  raizes: 'raízes',
  rapido: 'rápido',
  razao: 'razão',
  razoes: 'razões',
  recebera: 'receberá',
  reforcando: 'reforçando',
  relacao: 'relação',
  repeticao: 'repetição',
  representacao: 'representação',
  representacoes: 'representações',
  retangulo: 'retângulo',
  retangulos: 'retângulos',
  sao: 'são',
  semelhanca: 'semelhança',
  sequencia: 'sequência',
  sera: 'será',
  simetrico: 'simétrico',
  situacao: 'situação',
  so: 'só',
  solido: 'sólido',
  solidos: 'sólidos',
  solucao: 'solução',
  solucoes: 'soluções',
  subtracao: 'subtração',
  tambem: 'também',
  tematica: 'temática',
  tendencia: 'tendência',
  terca: 'terça',
  tracando: 'traçando',
  tres: 'três',
  triangulo: 'triângulo',
  triangulos: 'triângulos',
  ultimo: 'último',
  unico: 'único',
  util: 'útil',
  vao: 'vão',
  variavel: 'variável',
  varias: 'várias',
  varios: 'vários',
  ve: 'vê',
  vertice: 'vértice',
  vertices: 'vértices',
  virgula: 'vírgula',
  visivel: 'visível',
  voce: 'você',
  volei: 'vôlei',
}

/**
 * Palavras curtas que mudam de sentido com o acento. Resolvidas por frase, nao por palavra:
 * "Quanto e" é o verbo, "de 3 e 4" é conjunção; "quanto da" é o verbo, "da pizza" é preposição.
 */
const FRASES = [
  [/(\d)o ano/g, '$1º ano'],
  [/(\d)o grau/g, '$1º grau'],
  [/(\d)a tentativa/g, '$1ª tentativa'],
  [/\bQuanto e\b/g, 'Quanto é'],
  [/\bQual e\b/g, 'Qual é'],
  [/\bQuais e\b/g, 'Quais é'],
  [/\bO que e\b/g, 'O que é'],
  [/\bque e o\b/g, 'que é o'],
  [/\bque e a\b/g, 'que é a'],
  [/\bque e um\b/g, 'que é um'],
  [/\bque e uma\b/g, 'que é uma'],
  [/\bque e chamado\b/g, 'que é chamado'],
  [/\bque e texto\b/g, 'que é texto'],
  [/ e exatamente /g, ' é exatamente '],
  [/ e literalmente /g, ' é literalmente '],
  [/ e sempre /g, ' é sempre '],
  [/ e o mesmo que /g, ' é o mesmo que '],
  [/ e a mesma /g, ' é a mesma '],
  [/ e a medida /g, ' é a medida '],
  [/ e a base /g, ' é a base '],
  [/ e a soma /g, ' é a soma '],
  [/ e a diferença /g, ' é a diferença '],
  [/ e a metade /g, ' é a metade '],
  [/ e a quarta /g, ' é a quarta '],
  [/ e um sinal /g, ' é um sinal '],
  [/ e uma forma /g, ' é uma forma '],
  [/ e habilidade /g, ' é habilidade '],
  [/\bdá o mesmo\b/g, 'dá o mesmo'],
  [/ da (\d)/g, ' dá $1'],
  [/\bda ao todo\b/g, 'dá ao todo'],
  [/\bda certo\b/g, 'dá certo'],
  [/ nao da para /g, ' não dá para '],
  [/\bNao da para\b/g, 'Não dá para'],
  [/ da para /g, ' dá para '],
  [/ figuras tem /g, ' figuras têm '],
  [/ triangulos tem /g, ' triângulos têm '],
  [/ semelhantes tem /g, ' semelhantes têm '],
  [/ paralelas tem /g, ' paralelas têm '],
  [/\bas vezes\b/g, 'às vezes'],
]

/**
 * Reparos pontuais: casos em que a rodada por regra errou o sentido e o texto certo precisa
 * ser reposto literalmente. Aplicados depois das regras.
 */
const REPAROS = [
  ['região média com o próprio', 'região media com o próprio'],
  ['a resposta e negativa', 'a resposta é negativa'],
  ['9 e 3 ao quadrado e 6x e duas vezes 3x: e um quadrado perfeito', '9 é 3 ao quadrado e 6x é duas vezes 3x: é um quadrado perfeito'],
  ['esta pintada', 'está pintada'],
  ['Cem por cento e o inteiro todo', 'Cem por cento é o inteiro todo'],
  ['E onde a reta cruza', 'É onde a reta cruza'],
  ['E onde o Pizinho entra', 'É onde o Pizinho entra'],
  ['E uma diferença de quadrados: 25 e 5 ao quadrado', 'É uma diferença de quadrados: 25 é 5 ao quadrado'],
  ['E uma função afim', 'É uma função afim'],
  ['Metade e 0,5. Três quartos e mais que metade', 'Metade é 0,5. Três quartos é mais que metade'],
  ['qual e a maior raiz', 'qual é a maior raiz'],
  ['a chance de azul e igual a de verde', 'a chance de azul é igual à de verde'],
  ['de vértices e igual ao número', 'de vértices é igual ao número'],
  ['O a e a inclinação', 'O a é a inclinação'],
  ['a ideia e a mesma', 'a ideia é a mesma'],
  ['das retas e a solução: o x e a primeira coordenada', 'das retas é a solução: o x é a primeira coordenada'],
  ['O primeiro número e negativo', 'O primeiro número é negativo'],
  ['(embaixo) e o mesmo nas duas', '(embaixo) é o mesmo nas duas'],
  ['de pedaços e o mesmo nas duas', 'de pedaços é o mesmo nas duas'],
  ['mas não e a maioria absoluta', 'mas não é a maioria absoluta'],
  ['o formato e o mesmo', 'o formato é o mesmo'],
  ['qual e o primeiro passo', 'qual é o primeiro passo'],
  ['Qual desconto e melhor', 'Qual desconto é melhor'],
  ['frações e equivalente', 'frações é equivalente'],
  ['NÃO esta na tabuada', 'NÃO está na tabuada'],
  ['Qual fração e maior', 'Qual fração é maior'],
  ['esta faltando', 'está faltando'],
  ['Qual pedaço e maior', 'Qual pedaço é maior'],
  ['o conceito esta formado', 'o conceito está formado'],
  ['de cima e igual', 'de cima é igual'],
  ['coeficiente a e negativo', 'coeficiente a é negativo'],
  ['Se tudo nele e igual', 'Se tudo nele é igual'],
  ['uma regra — é por isso recebe', 'uma regra — e por isso recebe'],
  ['denominador e mais simples', 'denominador é mais simples'],
  ['quadrado 3x3 tem perímetro', 'quadrado 3x3 têm perímetro'],
  ['casa esta em 1:50', 'casa está em 1:50'],
  ['se esta cortando', 'se está cortando'],
  ['esta aprendendo', 'está aprendendo'],
  ['esta trocando', 'está trocando'],
  ['o x e a primeira', 'o x é a primeira'],
  ['dezena é o que sobra', 'dezena e o que sobra'],
  ['dinheiro — é onde a intuição falha', 'dinheiro — e onde a intuição falha'],
  ['Fração também e divisão, e também e operador', 'Fração também é divisão, e também é operador'],
  ['o conceito e a relação', 'o conceito é a relação'],
  ['A palavra "iguais" e a que mais se esquece', 'A palavra "iguais" é a que mais se esquece'],
  ['e sem ela a fração não vale', 'e sem ela a fração não vale'],
  ['raramente da um número inteiro', 'raramente dá um número inteiro'],
  ['A barra da fração é um sinal', 'A barra da fração é um sinal'],
  ['20% e o dobro de 10%', '20% é o dobro de 10%'],
  ['15% e 10% mais', '15% é 10% mais'],
  ['70% e sete vezes 10%', '70% é sete vezes 10%'],
  ['Esse caminho e mais rápido', 'Esse caminho é mais rápido'],
  ['a grade de cem quadradinhos e a imagem certa', 'a grade de cem quadradinhos é a imagem certa'],
  ['25% e simplesmente', '25% é simplesmente'],
  ['50% e 1/2, 25% e 1/4, 10% e 1/10, 75% e 3/4', '50% é 1/2, 25% é 1/4, 10% é 1/10, 75% é 3/4'],
  ['e habilidade prevista', 'é habilidade prevista'],
  ['O erro comum e confundir', 'O erro comum é confundir'],
  ['a queda de 10% e calculada', 'a queda de 10% é calculada'],
  ['A razão e que a porcentagem', 'A razão é que a porcentagem'],
  ['Entender isso e o que separa', 'Entender isso é o que separa'],
  ['200 e calcular 50 e somar', '200 é calcular 50 e somar'],
  ['o dobro de 8 e 16; o dobro de 16 e a resposta', 'o dobro de 8 é 16; o dobro de 16 é a resposta'],
  ['O dobro de 8 e 16; o dobro de 16 e a resposta', 'O dobro de 8 é 16; o dobro de 16 é a resposta'],
  ['Multiplicar e somar o mesmo número', 'Multiplicar é somar o mesmo número'],
  ['Multiplicar por 10 e só acrescentar', 'Multiplicar por 10 é só acrescentar'],
  ['E o mesmo que 2 x 4', 'É o mesmo que 2 x 4'],
  ['Dar embora e tirar', 'Dar embora é tirar'],
  ['Dezena e um grupo de 10', 'Dezena é um grupo de 10'],
  ['qual caminho da o resultado certo', 'qual caminho dá o resultado certo'],
  ['3 grupos de 10 dão 30', '3 grupos de 10 dão 30'],
]

const PALAVRA = new RegExp(`\\b(${Object.keys(MAPA).join('|')})\\b`, 'gi')

function preservaCaixa(original, acentuado) {
  // palavra inteira em maiuscula e enfase no enunciado (NAO esta na tabuada) — preserva
  if (original === original.toUpperCase() && original.length > 1) return acentuado.toUpperCase()
  if (original[0] === original[0].toUpperCase()) {
    return acentuado[0].toUpperCase() + acentuado.slice(1)
  }
  return acentuado
}

function acentuarTexto(texto) {
  let saida = texto.replace(PALAVRA, (match) => preservaCaixa(match, MAPA[match.toLowerCase()]))
  for (const [de, para] of FRASES) saida = saida.replace(de, para)
  for (const [de, para] of REPAROS) saida = saida.split(de).join(para)
  return saida
}

const CHAVE_RE = new RegExp(`\\b(${CHAVES_TEXTO.join('|')}):\\s*'([^']*)'`, 'g')
const CONCAT_RE = /^(\s+)'([^']*)'(\s*[+,]?)$/gm
const OPTIONS_RE = /(options:\s*\[)([^\]]*)(\])/gs

function acentuarArquivo(conteudo) {
  let saida = conteudo.replace(CHAVE_RE, (_m, chave, valor) => `${chave}: '${acentuarTexto(valor)}'`)
  // blocos de texto quebrados em varias linhas com concatenacao
  saida = saida.replace(CONCAT_RE, (_m, espaco, valor, fim) => `${espaco}'${acentuarTexto(valor)}'${fim}`)
  saida = saida.replace(OPTIONS_RE, (_m, abre, corpo, fecha) => {
    const novo = corpo.replace(/'([^']*)'/g, (_x, valor) => `'${acentuarTexto(valor)}'`)
    return `${abre}${novo}${fecha}`
  })
  return saida
}

function arquivos(dir) {
  return readdirSync(dir).flatMap((nome) => {
    const caminho = join(dir, nome)
    if (statSync(caminho).isDirectory()) return arquivos(caminho)
    return /\.(ts|tsx)$/.test(nome) && !nome.endsWith('.d.ts') ? [caminho] : []
  })
}

const checar = process.argv.includes('--check')
let alterados = 0

for (const caminho of arquivos('src/modules')) {
  const antes = readFileSync(caminho, 'utf8')
  const depois = acentuarArquivo(antes)
  if (antes !== depois) {
    alterados++
    if (checar) console.log(`pendente: ${caminho}`)
    else writeFileSync(caminho, depois, 'utf8')
  }
}

console.log(checar ? `${alterados} arquivo(s) com texto sem acento` : `${alterados} arquivo(s) acentuado(s)`)
process.exit(checar && alterados ? 1 : 0)
