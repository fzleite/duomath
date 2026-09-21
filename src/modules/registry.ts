import { fractionsModule } from './fractions'
import { tabuadaModule } from './tabuada'
import { tabuadaEstudoModule } from './tabuada-estudo'
import { isContentModule, isGameModule, type AnyMathModule, type ContentModule, type GameModule } from './types'

/**
 * Unico ponto de registro de modulos. Um modulo novo entra aqui e aparece no hub, no painel
 * do responsavel e nas metricas sem nenhuma outra mudanca no app.
 *
 * Duas categorias, que o hub separa em secoes:
 * - 'conteudo': trilha de etapas com desbloqueio sequencial (Fracoes, e o roadmap futuro).
 * - 'jogo': treino livre, sempre acessivel, com progressao por desempenho (Tabuada).
 *
 * Os modulos com status 'soon' sao o roadmap declarado — cards desabilitados, sem etapas.
 */
export const modules: AnyMathModule[] = [
  fractionsModule,
  // a Tabuada aparece nas duas secoes: estudo em Conteudo, treino cronometrado em Jogos
  tabuadaEstudoModule,
  tabuadaModule,
  {
    id: 'porcentagem',
    title: 'Porcentagem',
    tagline: 'Em breve: por cento como fracao de cem.',
    status: 'soon',
    accent: '#3b7ba0',
    category: 'conteudo',
    stages: [],
    ExerciseView: () => null,
  },
  {
    id: 'algebra',
    title: 'Algebra',
    tagline: 'Em breve: letras no lugar de numeros.',
    status: 'soon',
    accent: '#2a9d8f',
    category: 'conteudo',
    stages: [],
    ExerciseView: () => null,
  },
  {
    id: 'geometria',
    title: 'Geometria e trigonometria',
    tagline: 'Em breve: angulos, seno, cosseno e tangente — a casa do Pizinho.',
    status: 'soon',
    accent: '#4c9f70',
    category: 'conteudo',
    stages: [],
    ExerciseView: () => null,
  },
]

export function getModule(moduleId: string | undefined): AnyMathModule | undefined {
  return modules.find((module) => module.id === moduleId)
}

export function getContentModule(moduleId: string | undefined): ContentModule<any> | undefined {
  const module = getModule(moduleId)
  return module && isContentModule(module) ? module : undefined
}

export function getGameModule(moduleId: string | undefined): GameModule | undefined {
  const module = getModule(moduleId)
  return module && isGameModule(module) ? module : undefined
}

export function contentModules(): ContentModule<any>[] {
  return modules.filter(isContentModule)
}

export function gameModules(): GameModule[] {
  return modules.filter(isGameModule)
}

/** Modulos de conteudo jogaveis — base das metricas de progresso por etapa. */
export function readyContentModules(): ContentModule<any>[] {
  return contentModules().filter((module) => module.status === 'ready')
}

export function readyGameModules(): GameModule[] {
  return gameModules().filter((module) => module.status === 'ready')
}
