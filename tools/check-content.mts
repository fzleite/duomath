/**
 * Verificador do conteudo pedagogico. Roda com `npm run check:content`.
 *
 * Existe porque erro de aritmetica num app de matematica e o pior tipo de bug: passa no
 * build, passa no lint e ensina a coisa errada. Confere o que da para conferir por regra —
 * aritmetica das alternativas, visual batendo com o enunciado, convencao de dados, ids unicos,
 * progressao de Bloom e cobertura da navegacao por serie.
 *
 * Node 24 executa .ts/.mts direto (type-stripping nativo), entao nao precisa de test runner.
 * Importa APENAS arquivos de dados: os modulos declarados guardam as etapas em `stages.ts`
 * justamente para nao arrastar componentes React para ca.
 */

import { fractionStages } from '../src/modules/fractions/exercises.ts'
import { grandezasStages } from '../src/modules/grandezas/exercises.ts'
import { porcentagemStages } from '../src/modules/porcentagem/exercises.ts'
import { primeirosNumerosStages } from '../src/modules/primeiros-numeros/exercises.ts'
import { studyStages } from '../src/modules/tabuada-estudo/exercises.ts'
import { algebraStages } from '../src/modules/algebra/stages.ts'
import { geometriaStages } from '../src/modules/geometria/stages.ts'
import { probabilidadeStages } from '../src/modules/probabilidade/stages.ts'

type AnyStage = { id: string; years: number[]; exercises: any[] }

const quizModules: [string, AnyStage[]][] = [
  ['primeiros-numeros', primeirosNumerosStages as AnyStage[]],
  ['tabuada-estudo', studyStages as AnyStage[]],
  ['porcentagem', porcentagemStages as AnyStage[]],
  ['grandezas', grandezasStages as AnyStage[]],
]

const declaredOnly: [string, AnyStage[]][] = [
  ['algebra', algebraStages as AnyStage[]],
  ['geometria', geometriaStages as AnyStage[]],
  ['probabilidade', probabilidadeStages as AnyStage[]],
]

const BLOOM = ['lembrar', 'entender', 'aplicar', 'analisar', 'avaliar']

let problemas = 0
const falha = (ctx: string, msg: string) => {
  console.log(`  FALHA ${ctx} - ${msg}`)
  problemas++
}

const ids = new Set<string>()
let total = 0

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
      if (ex.answerIndex !== 0) falha(ctx, 'convencao: a resposta certa fica em options[0]')
      if (new Set(ex.options).size !== ex.options.length) falha(ctx, 'alternativa repetida')
      if (ex.options.length < 3) falha(ctx, 'menos de 3 alternativas')
      if (!ex.hint?.trim()) falha(ctx, 'sem dica do Pizinho')

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

      const v = ex.visual
      if (v?.kind === 'array' && /Quantos pontos/.test(ex.prompt) && certa !== String(v.rows * v.cols)) {
        falha(ctx, `arranjo ${v.rows}x${v.cols} nao bate com a resposta ${certa}`)
      }
      if (v?.kind === 'array' && /Que multiplicacao/.test(ex.prompt) && certa !== `${v.rows} x ${v.cols}`) {
        falha(ctx, `arranjo mostra ${v.rows} x ${v.cols}, resposta marcada e ${certa}`)
      }
      if (v?.kind === 'grade-area' && /quadradinhos/i.test(ex.prompt) && certa !== String(v.rows * v.cols)) {
        falha(ctx, `grade ${v.rows}x${v.cols} nao bate com a resposta ${certa}`)
      }
      if (v?.kind === 'blocos' && /Quantos cubinhos/.test(ex.prompt) && certa !== String(v.x * v.y * v.z)) {
        falha(ctx, `bloco ${v.x}x${v.y}x${v.z} nao bate com a resposta ${certa}`)
      }
      if (v?.kind === 'centena' && (v.filled < 0 || v.filled > 100)) falha(ctx, 'centena fora de 0..100')
      if (v?.kind === 'contagem' && /Quantas bolinhas/.test(ex.prompt) && certa !== String(v.count)) {
        falha(ctx, `contagem de ${v.count} nao bate com a resposta ${certa}`)
      }
      if (v?.kind === 'reta' && v.marks.some((m: number) => m > v.max)) falha(ctx, 'marca fora da reta')
      if (v?.kind === 'fracao' && /quantos por cento/i.test(ex.prompt)) {
        const esperado = `${Math.round((v.n / v.d) * 100)}%`
        if (certa !== esperado) falha(ctx, `fracao ${v.n}/${v.d} = ${esperado}, esta ${certa}`)
      }
    }
  }

  console.log(`${nome.padEnd(18)} ${stages.length} etapas, ${doModulo} exercicios`)
}

// Fracoes tem tipos de exercicio proprios (comparar, montar com slider): so o basico aqui
for (const stage of fractionStages as unknown as AnyStage[]) {
  for (const ex of stage.exercises) {
    total++
    if (ids.has(ex.id)) falha(`fracoes/${ex.id}`, 'id duplicado no app')
    ids.add(ex.id)
    if (!ex.hint?.trim()) falha(`fracoes/${ex.id}`, 'sem dica do Pizinho')
  }
}
console.log(`${'fracoes'.padEnd(18)} ${fractionStages.length} etapas, ${fractionStages.reduce((s, e) => s + e.exercises.length, 0)} exercicios`)

for (const [nome, stages] of declaredOnly) {
  const comConteudo = stages.filter((s) => s.exercises.length > 0).length
  console.log(`${nome.padEnd(18)} ${stages.length} etapas declaradas, ${comConteudo} com conteudo`)
}

// toda etapa precisa de years, senao nao aparece na navegacao por serie
const todasStages = [...quizModules, ...declaredOnly].flatMap(([, s]) => s).concat(fractionStages as unknown as AnyStage[])
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
