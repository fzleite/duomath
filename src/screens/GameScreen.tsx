import { Navigate, useParams } from 'react-router-dom'

import { getGameModule } from '../modules/registry'

/**
 * Modulo de jogo traz a propria tela: a mecanica (cronometro por pergunta, sorteio, sessao,
 * estatisticas por item) nao cabe no motor de etapas. Esta rota so resolve o modulo e delega.
 */
export function GameScreen() {
  const { moduleId } = useParams()
  const module = getGameModule(moduleId)

  if (!module || module.status !== 'ready') return <Navigate to="/" replace />

  const GameView = module.GameView
  return <GameView />
}
