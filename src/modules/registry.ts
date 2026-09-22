import { algebraModule } from './algebra'
import { fractionsModule } from './fractions'
import { geometriaModule } from './geometria'
import { grandezasModule } from './grandezas'
import { porcentagemModule } from './porcentagem'
import { primeirosNumerosModule } from './primeiros-numeros'
import { probabilidadeModule } from './probabilidade'
import { tabuadaModule } from './tabuada'
import { tabuadaEstudoModule } from './tabuada-estudo'
import { isContentModule, isGameModule, type AnyMathModule, type ContentModule, type GameModule } from './types'

/**
 * Unico ponto de registro de modulos. Um modulo novo entra aqui e aparece no hub, na
 * navegacao por assunto, nas abas por ano e no painel do responsavel sem nenhuma outra
 * mudanca no app.
 *
 * Duas categorias, que o hub separa:
 * - 'conteudo': trilha de etapas com desbloqueio sequencial.
 * - 'jogo': treino livre, sempre acessivel, com progressao por desempenho.
 *
 * A ordem aqui e a ordem do menu por assunto, seguindo a progressao escolar.
 * Modulos com status 'soon' tem as etapas declaradas (para o plano aparecer na navegacao por
 * serie) mas ainda sem exercicios escritos.
 */
export const modules: AnyMathModule[] = [
  primeirosNumerosModule,
  fractionsModule,
  tabuadaEstudoModule,
  porcentagemModule,
  grandezasModule,
  algebraModule,
  geometriaModule,
  probabilidadeModule,
  tabuadaModule,
]

/** Anos do Ensino Fundamental cobertos pela navegacao por serie. */
export const SCHOOL_YEARS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const

export function getModule(moduleId: string | undefined): AnyMathModule | undefined {
  return modules.find((module) => module.id === moduleId)
}

export function getContentModule(moduleId: string | undefined): ContentModule | undefined {
  const module = getModule(moduleId)
  return module && isContentModule(module) ? module : undefined
}

export function getGameModule(moduleId: string | undefined): GameModule | undefined {
  const module = getModule(moduleId)
  return module && isGameModule(module) ? module : undefined
}

export function contentModules(): ContentModule[] {
  return modules.filter(isContentModule)
}

export function gameModules(): GameModule[] {
  return modules.filter(isGameModule)
}

/** Modulos de conteudo com exercicios escritos — base das metricas de progresso. */
export function readyContentModules(): ContentModule[] {
  return contentModules().filter((module) => module.status === 'ready')
}

export function readyGameModules(): GameModule[] {
  return gameModules().filter((module) => module.status === 'ready')
}

export interface YearStage {
  module: ContentModule
  stage: ContentModule['stages'][number]
}

/** Etapas de um ano escolar, na ordem dos modulos — alimenta a navegacao por serie. */
export function stagesOfYear(year: number): YearStage[] {
  return contentModules().flatMap((module) =>
    module.stages.filter((stage) => stage.years.includes(year)).map((stage) => ({ module, stage })),
  )
}
