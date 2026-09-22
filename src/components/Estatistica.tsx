import { useState } from 'react'

/**
 * Apoios visuais de probabilidade e estatistica.
 *
 * O sorteio simulado tem estado proprio de proposito: a crianca aperta, ve o resultado sair e
 * a contagem subir. Isso e exploracao, nao resposta — a pergunta do exercício continua sendo
 * verificavel (a chance teorica), e o simulador serve para ela perceber que o resultado real
 * oscila em volta dessa chance.
 */

const CORES: Record<string, string> = {
  azul: '#3b7ba0',
  verde: '#1a936f',
  claro: '#48bfe3',
  cinza: '#b9ccd3',
}

export interface Bola {
  cor: keyof typeof CORES | string
  qtd: number
}

const PIZZA_CORES = ['#1a936f', '#3b7ba0', '#48bfe3', '#2a9d8f', '#4c9f70', '#5aa9e6']

export function GraficoBarras({ dados }: { dados: { label: string; valor: number }[] }) {
  const max = Math.max(...dados.map((d) => d.valor), 1)
  return (
    <div className="grafico-barras">
      {dados.map((d) => (
        <div className="gb-col" key={d.label}>
          <span className="gb-valor">{d.valor}</span>
          <div className="gb-barra" style={{ height: `${(d.valor / max) * 100 + 10}px` }} />
          <span className="gb-label">{d.label}</span>
        </div>
      ))}
    </div>
  )
}

export function GraficoPizza({ dados }: { dados: { label: string; valor: number }[] }) {
  const size = 190
  const total = dados.reduce((s, d) => s + d.valor, 0) || 1
  const r = size / 2 - 4

  const ponto = (fracao: number) => {
    const a = fracao * 2 * Math.PI - Math.PI / 2
    return [size / 2 + r * Math.cos(a), size / 2 + r * Math.sin(a)] as const
  }

  // offsets calculados sem acumulador mutavel: nada de estado escondido no meio do render
  const fatias = dados.map((d, i) => {
    const anterior = dados.slice(0, i).reduce((s, x) => s + x.valor, 0)
    return { ...d, inicio: anterior / total, fim: (anterior + d.valor) / total }
  })

  return (
    <div className="grafico-pizza">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="grafico de pizza">
        {fatias.map((d, i) => {
          const [x1, y1] = ponto(d.inicio)
          const [x2, y2] = ponto(d.fim)
          const grande = d.fim - d.inicio > 0.5 ? 1 : 0
          return (
            <path
              key={d.label}
              d={`M ${size / 2} ${size / 2} L ${x1} ${y1} A ${r} ${r} 0 ${grande} 1 ${x2} ${y2} Z`}
              fill={PIZZA_CORES[i % PIZZA_CORES.length]}
              stroke="#fff"
              strokeWidth={2}
            />
          )
        })}
      </svg>
      <ul className="legenda">
        {dados.map((d, i) => (
          <li key={d.label}>
            <span className="legenda-cor" style={{ background: PIZZA_CORES[i % PIZZA_CORES.length] }} />
            {d.label}: {d.valor}
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Urna com a composicao visivel: a chance de cada cor se le contando as bolas. */
export function Urna({ bolas }: { bolas: Bola[] }) {
  return (
    <div className="urna">
      {bolas.flatMap((bola, grupo) =>
        Array.from({ length: bola.qtd }, (_, i) => (
          <span
            className="urna-bola"
            key={`${grupo}-${i}`}
            style={{ background: CORES[bola.cor] ?? bola.cor }}
            aria-label={bola.cor}
          />
        )),
      )}
    </div>
  )
}

/** Sorteio simulado: aperta, sai uma bola, a contagem acumula. */
export function Sorteio({ bolas }: { bolas: Bola[] }) {
  const [ultima, setÚltima] = useState<string | null>(null)
  const [contagem, setContagem] = useState<Record<string, number>>({})

  const total = bolas.reduce((s, b) => s + b.qtd, 0)
  const sortear = () => {
    let n = Math.floor(Math.random() * total)
    for (const bola of bolas) {
      if (n < bola.qtd) {
        setÚltima(bola.cor)
        setContagem((atual) => ({ ...atual, [bola.cor]: (atual[bola.cor] ?? 0) + 1 }))
        return
      }
      n -= bola.qtd
    }
  }

  const sorteios = Object.values(contagem).reduce((s, n) => s + n, 0)

  return (
    <div className="sorteio">
      <Urna bolas={bolas} />

      <button type="button" className="btn btn-ghost" onClick={sortear}>
        Sortear uma bola
      </button>

      {ultima && (
        <p className="sorteio-ultima">
          Saiu: <span className="urna-bola" style={{ background: CORES[ultima] ?? ultima }} /> {ultima}
        </p>
      )}

      {sorteios > 0 && (
        <ul className="legenda">
          {bolas.map((bola) => (
            <li key={bola.cor}>
              <span className="legenda-cor" style={{ background: CORES[bola.cor] ?? bola.cor }} />
              {bola.cor}: {contagem[bola.cor] ?? 0} de {sorteios}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/**
 * Balanca de equilibrio: os dois pratos de uma equacao do 1o grau. Cada bloco 'x' e uma
 * incognita e cada peso e um numero — o que a crianca ve antes de fazer a conta.
 */
export function Balanca({
  esquerda,
  direita,
}: {
  esquerda: { x: number; c: number }
  direita: { x: number; c: number }
}) {
  const prato = (lado: { x: number; c: number }, titulo: string) => (
    <div className="prato">
      <div className="prato-itens">
        {Array.from({ length: lado.x }, (_, i) => (
          <span className="peca-x" key={`x${i}`}>
            x
          </span>
        ))}
        {Array.from({ length: Math.abs(lado.c) }, (_, i) => (
          <span className={`peca-n ${lado.c < 0 ? 'peca-neg' : ''}`} key={`n${i}`}>
            {lado.c < 0 ? '-1' : '1'}
          </span>
        ))}
      </div>
      <div className="prato-base" />
      <span className="prato-label">{titulo}</span>
    </div>
  )

  const texto = (lado: { x: number; c: number }) => {
    const xs = lado.x === 0 ? '' : lado.x === 1 ? 'x' : `${lado.x}x`
    if (lado.c === 0) return xs || '0'
    if (!xs) return String(lado.c)
    return `${xs} ${lado.c < 0 ? '-' : '+'} ${Math.abs(lado.c)}`
  }

  return (
    <div className="balanca">
      <div className="balanca-pratos">
        {prato(esquerda, texto(esquerda))}
        <span className="balanca-igual">=</span>
        {prato(direita, texto(direita))}
      </div>
      <div className="balanca-haste" />
    </div>
  )
}
