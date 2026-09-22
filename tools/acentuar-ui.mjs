/**
 * Acentuacao dos textos de interface (screens/, components/, data/).
 *
 * Separado de `acentuar.mjs` porque aqui nao ha chave de texto para ancorar: sao textos em
 * JSX e literais soltos, misturados com nome de classe CSS e id. Entao a troca e por par
 * literal, revisado a mao — nenhuma regra automatica por palavra.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const PARES = [
  ['Nome da crianca', 'Nome da criança'],
  ['Responsavel', 'Responsável'],
  ['Painel do responsavel', 'Painel do responsável'],
  ['Backup e transferencia', 'Backup e transferência'],
  ['Os dados ficam so neste navegador', 'Os dados ficam só neste navegador'],
  ['Preferencias', 'Preferências'],
  ['Pizinho dando dicas durante os exercicios', 'Pizinho dando dicas durante os exercícios'],
  ['responsavel: ', 'responsável: '],
  ['Repeticoes de exercicio ja acertado', 'Repetições de exercício já acertado'],
  ['exercicios', 'exercícios'],
  ['exercicio', 'exercício'],
  ['O Pizinho aparece durante os exercícios para dar dicas.', 'O Pizinho aparece durante os exercícios para dar dicas.'],
  ['Por serie', 'Por série'],
  ['Conteudo', 'Conteúdo'],
  ['do que esta disponivel', 'do que está disponível'],
  ['etapas disponiveis', 'etapas disponíveis'],
  ['conteudo em preparacao', 'conteúdo em preparação'],
  ['Ir aos exercícios', 'Ir aos exercícios'],
  ['Material em preparacao para este modulo.', 'Material em preparação para este módulo.'],
  ['Fazer os exercícios desta etapa', 'Fazer os exercícios desta etapa'],
  ['Etapa concluida!', 'Etapa concluída!'],
  [' esta completa.', ' está completa.'],
  ['Ver minhas estatisticas', 'Ver minhas estatísticas'],
  ['Minhas estatisticas', 'Minhas estatísticas'],
  [
    'Responda o mais rapido que conseguir. O tempo de cada pergunta e cronometrado.',
    'Responda o mais rápido que conseguir. O tempo de cada pergunta é cronometrado.',
  ],
  [' acertos no nivel anterior com media abaixo de', ' acertos no nível anterior com média abaixo de'],
  [' — sua media esta em ', ' — sua média está em '],
  ['media ', 'média '],
  ['de media', 'de média'],
  ['Voce acertou ', 'Você acertou '],
  ['Proxima', 'Próxima'],
  ['Vamos de novo na proxima!', 'Vamos de novo na próxima!'],
  ['Evolucao do tempo', 'Evolução do tempo'],
  ['Media a cada 10 respostas certas', 'Média a cada 10 respostas certas'],
  ['Da mais demorada para a mais rapida. A mais lenta agora e a ', 'Da mais demorada para a mais rápida. A mais lenta agora é a '],
  [', e a mais rapida e a ', ', e a mais rápida é a '],
  ['Historico por tabuada', 'Histórico por tabuada'],
  [
    'Ainda nao ha respostas registradas. Jogue uma rodada para comecar a medir.',
    'Ainda não há respostas registradas. Jogue uma rodada para começar a medir.',
  ],
  ['Ultima', 'Última'],
  ['>Media<', '>Média<'],
  ['Concluido', 'Concluído'],
  ['Voltar para o inicio', 'Voltar para o início'],
  ['refletindo a versao da BNCC', 'refletindo a versão da BNCC'],
  ['Ola, ', 'Olá, '],
  ['Pedacos pintados', 'Pedaços pintados'],
  ['Total de pedacos', 'Total de pedaços'],
  ['As duas sao iguais', 'As duas são iguais'],
  ['Monte a fracao', 'Monte a fração'],
  ['nao existe', 'não existe'],
  ['Angulo (graus)', 'Ângulo (graus)'],
  ['Inclinacao (a)', 'Inclinação (a)'],
  ['Deslocamento (b)', 'Deslocamento (b)'],
  ['Onde corta o eixo y (b)', 'Onde corta o eixo y (b)'],
  ['Abertura (a)', 'Abertura (a)'],
  ['Nenhum perfil ativo.', 'Nenhum perfil ativo.'],
  ['nao parece um backup', 'não parece um backup'],
  ['uma versao mais nova', 'uma versão mais nova'],
  ['Matematica visual e interativa, um modulo por vez.', 'Matemática visual e interativa, um módulo por vez.'],
]

function arquivos(dir) {
  return readdirSync(dir).flatMap((nome) => {
    const caminho = join(dir, nome)
    if (statSync(caminho).isDirectory()) return arquivos(caminho)
    return /\.(ts|tsx)$/.test(nome) ? [caminho] : []
  })
}

let alterados = 0
for (const caminho of [...arquivos('src/screens'), ...arquivos('src/components'), ...arquivos('src/data')]) {
  const antes = readFileSync(caminho, 'utf8')
  let depois = antes
  for (const [de, para] of PARES) {
    if (de !== para) depois = depois.split(de).join(para)
  }
  if (antes !== depois) {
    writeFileSync(caminho, depois, 'utf8')
    alterados++
  }
}
console.log(`${alterados} arquivo(s) de interface acentuado(s)`)
