import { fractionsModule } from './fractions'
import type { AnyMathModule } from './types'

/**
 * Unico ponto de registro de modulos. Um modulo novo entra aqui e aparece no hub, no painel
 * do responsavel e nas metricas sem nenhuma outra mudanca no app.
 *
 * Os modulos com status 'soon' sao o roadmap declarado do projeto (porcentagem, algebra,
 * geometria/trigonometria) — aparecem como cards desabilitados, sem etapas.
 */
export const modules: AnyMathModule[] = [
  fractionsModule,
  {
    id: 'porcentagem',
    title: 'Porcentagem',
    tagline: 'Em breve: por cento como fracao de cem.',
    status: 'soon',
    accent: '#3b7ba0',
    stages: [],
    ExerciseView: () => null,
  },
  {
    id: 'algebra',
    title: 'Algebra',
    tagline: 'Em breve: letras no lugar de numeros.',
    status: 'soon',
    accent: '#48bfe3',
    stages: [],
    ExerciseView: () => null,
  },
  {
    id: 'geometria',
    title: 'Geometria e trigonometria',
    tagline: 'Em breve: angulos, seno, cosseno e tangente — a casa do Pizinho.',
    status: 'soon',
    accent: '#2a9d8f',
    stages: [],
    ExerciseView: () => null,
  },
]

export function getModule(moduleId: string | undefined): AnyMathModule | undefined {
  return modules.find((module) => module.id === moduleId)
}

export function readyModules(): AnyMathModule[] {
  return modules.filter((module) => module.status === 'ready')
}
