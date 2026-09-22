/**
 * Verificador do conteudo pedagogico. Roda com `npm run check:content`, e o `npm run build`
 * o chama antes do Vite.
 *
 * Existe porque erro de aritmetica num app de matematica e o pior tipo de bug: passa no
 * build, passa no lint e ensina a coisa errada. Confere o que da para conferir por regra.
 *
 * Node 24 executa .ts/.mts direto (type-stripping nativo), entao nao precisa de test runner.
 * Importa APENAS arquivos de dados: os modulos guardam etapas em `exercises.ts`/`stages.ts`
 * justamente para nao arrastar componentes React para ca (o executor nao processa JSX).
 */

import { fractionStages } from '../src/modules/fractions/exercises.ts'
import { grandezasStages } from '../src/modules/grandezas/exercises.ts'
import { porcentagemStages } from '../src/modules/porcentagem/exercises.ts'
import { primeirosNumerosStages } from '../src/modules/primeiros-numeros/exercises.ts'
import { studyStages } from '../src/modules/tabuada-estudo/exercises.ts'
import { algebraStages } from '../src/modules/algebra/stages.ts'
import { geometriaStages } from '../src/modules/geometria/stages.ts'
import { probabilidadeStages } from '../src/modules/probabilidade/stages.ts'

type AnyStage = { id: string; title: string; years: number[]; exercises: any[] }

/** Modulos no formato comum (QuizExercise): validados por completo. */
const quizModules: [string, AnyStage[]][] = [
  ['primeiros-numeros', primeirosNumerosStages as AnyStage[]],
  ['tabuada-estudo', studyStages as AnyStage[]],
  ['porcentagem', porcentagemStages as AnyStage[]],
  ['grandezas', grandezasStages as AnyStage[]],
  ['algebra', algebraStages as AnyStage[]],
  ['geometria', geometriaStages as AnyStage[]],
  ['probabilidade', probabilidadeStages as AnyStage[]],
]

const BLOOM = ['lembrar', 'entender', 'aplicar', 'analisar', 'avaliar']
const PLANE_RANGE = 6 // tem que casar com o default de CartesianPlane

let problemas = 0
const falha = (ctx: string, msg: string) => {
  console.log(`  FALHA ${ctx} - ${msg}`)
  problemas++
}

const ids = new Set<string>()
let total = 0

/**
 * Avaliador de expressao aritmetica restrito, para conferir enunciados do tipo
 * "Se x vale 4, quanto vale 2x + 7?". Aceita digitos, x, + - * / e parenteses, e trata
 * multiplicacao implicita (3x -> 3*x). Nada de eval: parser proprio de tokens.
 */
function avaliar(expr: string, x: number): number | null {
  const limpo = expr
    .replace(/\s/g, '')
    .replace(/(\d)x/g, '$1*x')
    .replace(/x/g, String(x))
  if (!/^[-+*/().\d]+$/.test(limpo)) return null

  let pos = 0
  const peek = () => limpo[pos]
  const numero = (): number => {
    if (peek() === '(') {
      pos++
      const valor = soma()
      pos++ // fecha parentese
      return valor
    }
    if (peek() === '-') {
      pos++
      return -numero()
    }
    let texto = ''
    while (pos < limpo.length && /[\d.]/.test(limpo[pos])) texto += limpo[pos++]
    return Number(texto)
  }
  const produto = (): number => {
    let valor = numero()
    while (peek() === '*' || peek() === '/') {
      const op = limpo[pos++]
      const direita = numero()
      valor = op === '*' ? valor * direita : valor / direita
    }
    return valor
  }
  const soma = (): number => {
    let valor = produto()
    while (peek() === '+' || peek() === '-') {
      const op = limpo[pos++]
      const direita = produto()
      valor = op === '+' ? valor + direita : valor - direita
    }
    return valor
  }

  const resultado = soma()
  return pos === limpo.length && Number.isFinite(resultado) ? resultado : null
}

const media = (v: number[]) => v.reduce((s, n) => s + n, 0) / v.length
const mediana = (v: number[]) => {
  const ord = [...v].sort((a, b) => a - b)
  const meio = Math.floor(ord.length / 2)
  return ord.length % 2 ? ord[meio] : (ord[meio - 1] + ord[meio]) / 2
}
const moda = (v: number[]) => {
  const contagem = new Map<number, number>()
  for (const n of v) contagem.set(n, (contagem.get(n) ?? 0) + 1)
  return [...contagem.entries()].sort((a, b) => b[1] - a[1])[0][0]
}
const amplitude = (v: number[]) => Math.max(...v) - Math.min(...v)

/** Checagens que valem para todo exercicio do formato comum. */
function checarQuiz(ctx: string, ex: any) {
  const temEscolha = Array.isArray(ex.options)
  const temInput = Boolean(ex.input)

  if (temEscolha === temInput) falha(ctx, 'precisa de options OU input, nunca os dois nem nenhum')
  if (!ex.hint?.trim()) falha(ctx, 'sem dica do Pizinho')
  if (!ex.prompt?.trim()) falha(ctx, 'sem enunciado')

  if (temEscolha) {
    if (ex.answerIndex !== 0) falha(ctx, 'convencao: a resposta certa fica em options[0]')
    if (new Set(ex.options).size !== ex.options.length) falha(ctx, 'alternativa repetida')
    if (ex.options.length < 3) falha(ctx, 'menos de 3 alternativas')
    checarAritmeticaEscolha(ctx, ex)
  }

  if (temInput) checarInput(ctx, ex)
  checarVisual(ctx, ex)
}

function checarAritmeticaEscolha(ctx: string, ex: any) {
  const certa: string = ex.options[0]

  const mult = ex.prompt.match(/Quanto e (\d+) x (\d+)/)
  if (mult && certa !== String(+mult[1] * +mult[2])) {
    falha(ctx, `${mult[1]}x${mult[2]} deveria ser ${+mult[1] * +mult[2]}, esta ${certa}`)
  }

  const soma = ex.prompt.match(/Quanto e ((?:\d+ \+ )+\d+)\?/)
  if (soma) {
    const esperado = String(soma[1].split('+').reduce((s: number, n: string) => s + Number(n), 0))
    if (certa !== esperado) falha(ctx, `${soma[1]} deveria ser ${esperado}, esta ${certa}`)
  }

  const sub = ex.prompt.match(/Quanto e (\d+) - (\d+)\?/)
  if (sub && certa !== String(+sub[1] - +sub[2])) {
    falha(ctx, `${sub[1]}-${sub[2]} deveria ser ${+sub[1] - +sub[2]}, esta ${certa}`)
  }
}

function checarInput(ctx: string, ex: any) {
  const input = ex.input

  if (input.mode === 'numero') {
    if (typeof input.answer !== 'number' || !Number.isFinite(input.answer)) {
      falha(ctx, 'resposta numerica invalida')
    }
    if (input.answer < 0 && !input.negativo) falha(ctx, 'resposta negativa sem habilitar o sinal no teclado')
    if (!Number.isInteger(input.answer) && !input.decimal) {
      falha(ctx, 'resposta decimal sem habilitar a virgula no teclado')
    }

    // "Se x vale N, quanto vale <expr>?" — confere avaliando a expressao
    const expr = ex.prompt.match(/Se x vale (-?\d+), quanto vale ([^?]+)\?/)
    if (expr) {
      const esperado = avaliar(expr[2], Number(expr[1]))
      if (esperado !== null && esperado !== input.answer) {
        falha(ctx, `com x=${expr[1]}, ${expr[2].trim()} da ${esperado}, nao ${input.answer}`)
      }
    }

    // sistema do tipo "x + y = A e x - y = B"
    const sistema = ex.prompt.match(/x \+ y = (\d+) e x - y = (\d+)/)
    if (sistema) {
      const a = Number(sistema[1])
      const b = Number(sistema[2])
      const esperado = /vale x/.test(ex.prompt) ? (a + b) / 2 : (a - b) / 2
      if (esperado !== input.answer) falha(ctx, `no sistema, esperado ${esperado}, esta ${input.answer}`)
    }

    // "x² - bx + c = 0" com a maior/menor raiz
    const quadratica = ex.prompt.match(/x² ([-+]) (\d+)x ([-+]) (\d+) = 0/)
    if (quadratica) {
      const b = (quadratica[1] === '-' ? -1 : 1) * Number(quadratica[2])
      const c = (quadratica[3] === '-' ? -1 : 1) * Number(quadratica[4])
      const disc = b * b - 4 * c
      if (disc >= 0 && /raiz/.test(ex.prompt) && !/quantas/i.test(ex.prompt)) {
        const r1 = (-b + Math.sqrt(disc)) / 2
        const r2 = (-b - Math.sqrt(disc)) / 2
        const esperado = /maior/.test(ex.prompt) ? Math.max(r1, r2) : Math.min(r1, r2)
        if (Math.abs(esperado - input.answer) > 1e-9) {
          falha(ctx, `raizes ${r1} e ${r2}: esperado ${esperado}, esta ${input.answer}`)
        }
      }
    }

    // estatistica sobre o conjunto desenhado
    if (ex.visual?.kind === 'dados') {
      const v: number[] = ex.visual.valores
      // ordem importa e as bordas de palavra tambem: "media" casa dentro de "mediana"
      const alvo = /mediana/i.test(ex.prompt)
        ? mediana(v)
        : /moda/i.test(ex.prompt)
          ? moda(v)
          : /amplitude/i.test(ex.prompt)
            ? amplitude(v)
            : /media/i.test(ex.prompt)
              ? media(v)
              : null
      if (alvo !== null && Math.abs(alvo - input.answer) > 1e-9) {
        falha(ctx, `sobre [${v.join(', ')}] o esperado e ${alvo}, esta ${input.answer}`)
      }
    }

    // "quantos vertices/lados" com poligono desenhado
    if (ex.visual?.kind === 'poligono' && /vertices|lados/.test(ex.prompt) && input.answer !== ex.visual.lados) {
      falha(ctx, `poligono de ${ex.visual.lados} lados, resposta ${input.answer}`)
    }
  }

  if (input.mode === 'ajuste') {
    if (!input.controls?.length) falha(ctx, 'ajuste sem controles')
    for (const c of input.controls) {
      if (c.target < c.min || c.target > c.max) falha(ctx, `alvo de ${c.id} fora da faixa do slider`)
    }
    const esperados = input.preview === 'quadratica' ? ['a', 'b', 'c'] : ['a', 'b']
    const dados = input.controls.map((c: any) => c.id)
    if (esperados.some((id) => !dados.includes(id))) {
      falha(ctx, `previa '${input.preview}' precisa dos controles ${esperados.join(', ')}`)
    }
  }

  if (input.mode === 'ponto') {
    if (input.em === 'plano') {
      const { x, y } = input.target
      if (x === undefined || y === undefined) falha(ctx, 'ponto no plano sem x e y')
      else if (Math.abs(x) > PLANE_RANGE || Math.abs(y) > PLANE_RANGE) falha(ctx, 'ponto fora do quadro do plano')
      // o enunciado normalmente cita o par: confere que bate com o alvo
      const par = ex.prompt.match(/\((-?\d+),\s*(-?\d+)\)/)
      if (par && (Number(par[1]) !== x || Number(par[2]) !== y)) {
        falha(ctx, `enunciado pede (${par[1]}, ${par[2]}) mas o alvo e (${x}, ${y})`)
      }
    } else {
      const { value } = input.target
      const max = input.max ?? 10
      if (value === undefined || value < 0 || value > max) falha(ctx, 'alvo fora da reta')
    }
  }
}

function checarVisual(ctx: string, ex: any) {
  const v = ex.visual
  if (!v) return
  const certa: string | undefined = ex.options?.[0]

  if (v.kind === 'array' && /Quantos pontos/.test(ex.prompt) && certa !== String(v.rows * v.cols)) {
    falha(ctx, `arranjo ${v.rows}x${v.cols} nao bate com a resposta ${certa}`)
  }
  if (v.kind === 'array' && /Que multiplicacao/.test(ex.prompt) && certa !== `${v.rows} x ${v.cols}`) {
    falha(ctx, `arranjo mostra ${v.rows} x ${v.cols}, resposta marcada e ${certa}`)
  }
  if (v.kind === 'grade-area' && /quadradinhos/i.test(ex.prompt) && certa && certa !== String(v.rows * v.cols)) {
    falha(ctx, `grade ${v.rows}x${v.cols} nao bate com a resposta ${certa}`)
  }
  if (v.kind === 'blocos' && /Quantos cubinhos/.test(ex.prompt) && certa !== String(v.x * v.y * v.z)) {
    falha(ctx, `bloco ${v.x}x${v.y}x${v.z} nao bate com a resposta ${certa}`)
  }
  if (v.kind === 'centena' && (v.filled < 0 || v.filled > 100)) falha(ctx, 'centena fora de 0..100')
  if (v.kind === 'contagem' && /Quantas bolinhas/.test(ex.prompt) && certa !== String(v.count)) {
    falha(ctx, `contagem de ${v.count} nao bate com a resposta ${certa}`)
  }
  if (v.kind === 'reta' && v.marks.some((m: number) => m > v.max)) falha(ctx, 'marca fora da reta')
  if (v.kind === 'fracao' && /quantos por cento/i.test(ex.prompt)) {
    const esperado = `${Math.round((v.n / v.d) * 100)}%`
    if (certa !== esperado) falha(ctx, `fracao ${v.n}/${v.d} = ${esperado}, esta ${certa}`)
  }
  if (v.kind === 'poligono' && v.lados < 3) falha(ctx, 'poligono com menos de 3 lados')
  if (v.kind === 'poligono' && /Quantos lados/.test(ex.prompt) && certa && certa !== String(v.lados)) {
    falha(ctx, `poligono de ${v.lados} lados, resposta ${certa}`)
  }
  if (v.kind === 'triangulos' && v.fator <= 0) falha(ctx, 'razao de semelhanca invalida')
  if (v.kind === 'dados' && v.valores.length < 3) falha(ctx, 'conjunto de dados muito pequeno')
  if (v.kind === 'plano' && v.pontos.some((p: any) => Math.abs(p.x) > PLANE_RANGE || Math.abs(p.y) > PLANE_RANGE)) {
    falha(ctx, 'ponto do poligono fora do quadro')
  }
}

/** Fracoes tem tipos proprios de exercicio; cada um com a sua regra. */
function checarFracao(ctx: string, ex: any) {
  if (!ex.hint?.trim()) falha(ctx, 'sem dica do Pizinho')

  if (ex.kind === 'identify') {
    const certa = ex.options[0]
    if (certa.n !== ex.value.n || certa.d !== ex.value.d) {
      falha(ctx, `desenho mostra ${ex.value.n}/${ex.value.d} mas options[0] e ${certa.n}/${certa.d}`)
    }
  }
  if (ex.kind === 'choice' && ex.answerIndex !== 0) falha(ctx, 'convencao: resposta certa em options[0]')
  if (ex.kind === 'build' && (ex.target.n > ex.target.d || ex.target.d > ex.maxDenominator)) {
    falha(ctx, 'alvo do slider impossivel de montar')
  }
  if (ex.kind === 'reta' && (ex.target.n < 0 || ex.target.n > ex.target.d)) falha(ctx, 'alvo fora da reta 0..1')
  if (ex.kind === 'compare' && ex.left.d === 0) falha(ctx, 'denominador zero')
  if (ex.kind === 'operar') {
    if (ex.left.d !== ex.right.d) falha(ctx, 'operacao visual exige o mesmo denominador')
    const esperado = ex.op === '+' ? ex.left.n + ex.right.n : ex.left.n - ex.right.n
    const certa = ex.options[0]
    if (certa.n !== esperado || certa.d !== ex.left.d) {
      falha(ctx, `${ex.left.n}/${ex.left.d} ${ex.op} ${ex.right.n}/${ex.right.d} da ${esperado}/${ex.left.d}, options[0] e ${certa.n}/${certa.d}`)
    }
  }
}

// ---------------------------------------------------------------------------

for (const [nome, stages] of quizModules) {
  let doModulo = 0

  for (const stage of stages) {
    const niveis = stage.exercises.map((e) => BLOOM.indexOf(e.bloom))
    if (niveis.some((n) => n < 0)) falha(`${nome}/${stage.id}`, 'nivel de Bloom invalido')
    if (!niveis.every((n, i) => i === 0 || n >= niveis[i - 1])) {
      falha(`${nome}/${stage.id}`, `Bloom fora de ordem: ${stage.exercises.map((e) => e.bloom).join(' -> ')}`)
    }

    for (const ex of stage.exercises) {
      total++
      doModulo++
      const ctx = `${nome}/${ex.id}`
      if (ids.has(ex.id)) falha(ctx, 'id duplicado no app')
      ids.add(ex.id)
      checarQuiz(ctx, ex)
    }
  }

  const prontas = stages.filter((s) => s.exercises.length > 0).length
  console.log(`${nome.padEnd(18)} ${prontas}/${stages.length} etapas com conteudo, ${doModulo} exercicios`)
}

for (const stage of fractionStages as unknown as AnyStage[]) {
  const niveis = stage.exercises.map((e) => BLOOM.indexOf(e.bloom))
  if (!niveis.every((n, i) => i === 0 || n >= niveis[i - 1])) {
    falha(`fracoes/${stage.id}`, `Bloom fora de ordem: ${stage.exercises.map((e) => e.bloom).join(' -> ')}`)
  }
  for (const ex of stage.exercises) {
    total++
    const ctx = `fracoes/${ex.id}`
    if (ids.has(ex.id)) falha(ctx, 'id duplicado no app')
    ids.add(ex.id)
    checarFracao(ctx, ex)
  }
}
console.log(
  `${'fracoes'.padEnd(18)} ${fractionStages.length}/${fractionStages.length} etapas com conteudo, ` +
    `${fractionStages.reduce((s, e) => s + e.exercises.length, 0)} exercicios`,
)

const todasStages = [...quizModules.flatMap(([, s]) => s), ...(fractionStages as unknown as AnyStage[])]
for (const stage of todasStages) {
  if (!Array.isArray(stage.years) || stage.years.length === 0) falha(stage.id, 'etapa sem years')
  if (stage.years.some((y) => y < 1 || y > 9)) falha(stage.id, 'ano fora de 1..9')
}

console.log('\ncobertura da navegacao por serie:')
for (let year = 1; year <= 9; year++) {
  const doAno = todasStages.filter((s) => s.years.includes(year))
  const comConteudo = doAno.filter((s) => s.exercises.length > 0).length
  if (doAno.length === 0) falha(`${year}o ano`, 'nenhuma etapa mapeada — a aba ficaria vazia')
  console.log(`  ${year}o ano: ${String(doAno.length).padStart(2)} etapas, ${comConteudo} com conteudo`)
}

console.log(`\n${total} exercicios verificados, ${problemas} problema(s).`)
process.exit(problemas ? 1 : 0)
