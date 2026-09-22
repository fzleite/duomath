/**
 * Plano cartesiano: eixos, grade e (opcionalmente) o grafico de uma funcao, pontos marcados e
 * escolha de ponto por clique. E o componente que o spec pede em Algebra (reta e parabola se
 * transformando com sliders) e em Geometria (pares ordenados e vertices de poligonos).
 */

const VERDE = '#1a936f'
const AZUL = '#3b7ba0'
const LINHA = '#dbe6ea'
const EIXO = '#9db4bd'

export interface PlanePoint {
  x: number
  y: number
  label?: string
}

interface Props {
  /** Faixa simetrica dos dois eixos. */
  range?: number
  /** Funcao a desenhar; recebe x e devolve y. */
  fn?: (x: number) => number
  points?: PlanePoint[]
  /** Ponto destacado (escolha da crianca, ou alvo revelado no feedback). */
  selected?: PlanePoint | null
  /** Habilita escolher um ponto de coordenadas inteiras por clique. */
  onPick?: (x: number, y: number) => void
  size?: number
  /** Liga os pontos em poligono fechado. */
  polygon?: boolean
}

export function CartesianPlane({ range = 6, fn, points, selected, onPick, size = 280, polygon }: Props) {
  const unit = size / (range * 2)
  const px = (x: number) => size / 2 + x * unit
  const py = (y: number) => size / 2 - y * unit

  const ticks = Array.from({ length: range * 2 + 1 }, (_, i) => i - range)

  /** Amostra fina o bastante para a parabola nao ficar facetada. */
  const curva = () => {
    if (!fn) return null
    const passos = range * 40
    const pontos: string[] = []
    for (let i = 0; i <= passos; i++) {
      const x = -range + (i / passos) * range * 2
      const y = fn(x)
      // corta o que sai do quadro em vez de esticar a linha ate a borda
      if (!Number.isFinite(y) || y < -range - 1 || y > range + 1) {
        pontos.push('')
        continue
      }
      pontos.push(`${px(x).toFixed(2)},${py(y).toFixed(2)}`)
    }
    return pontos
      .join(' ')
      .split(/\s{2,}/)
      .map((trecho) => trecho.trim())
      .filter((trecho) => trecho.includes(','))
  }

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    if (!onPick) return
    const rect = event.currentTarget.getBoundingClientRect()
    // o SVG e escalado pelo CSS: converte pela proporcao, nao pelo tamanho nominal
    const x = ((event.clientX - rect.left) / rect.width) * size
    const y = ((event.clientY - rect.top) / rect.height) * size
    const gx = Math.round((x - size / 2) / unit)
    const gy = Math.round((size / 2 - y) / unit)
    if (Math.abs(gx) <= range && Math.abs(gy) <= range) onPick(gx, gy)
  }

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={`plane ${onPick ? 'plane-clickable' : ''}`}
      role="img"
      aria-label="plano cartesiano"
      onClick={handleClick}
    >
      {ticks.map((t) => (
        <g key={t}>
          <line x1={px(t)} y1={0} x2={px(t)} y2={size} stroke={LINHA} strokeWidth={1} />
          <line x1={0} y1={py(t)} x2={size} y2={py(t)} stroke={LINHA} strokeWidth={1} />
        </g>
      ))}

      <line x1={0} y1={py(0)} x2={size} y2={py(0)} stroke={EIXO} strokeWidth={2} />
      <line x1={px(0)} y1={0} x2={px(0)} y2={size} stroke={EIXO} strokeWidth={2} />

      {[-range, -Math.round(range / 2), Math.round(range / 2), range].map((t) => (
        <text key={`rx${t}`} x={px(t)} y={py(0) + 14} textAnchor="middle" className="chart-label">
          {t}
        </text>
      ))}

      {curva()?.map((trecho, index) => (
        <polyline key={index} points={trecho} fill="none" stroke={VERDE} strokeWidth={3} strokeLinecap="round" />
      ))}

      {polygon && points && points.length > 2 && (
        <polygon
          points={points.map((p) => `${px(p.x)},${py(p.y)}`).join(' ')}
          fill="rgb(72 191 227 / 25%)"
          stroke={AZUL}
          strokeWidth={2.5}
        />
      )}

      {points?.map((p) => (
        <g key={`${p.x},${p.y}`}>
          <circle cx={px(p.x)} cy={py(p.y)} r={5} fill={AZUL} />
          {p.label && (
            <text x={px(p.x) + 8} y={py(p.y) - 8} className="chart-dim">
              {p.label}
            </text>
          )}
        </g>
      ))}

      {selected && (
        <circle cx={px(selected.x)} cy={py(selected.y)} r={8} fill="none" stroke={VERDE} strokeWidth={3} />
      )}
    </svg>
  )
}

/** Reta numerica clicavel — o "marcar o ponto" que faltava para fracoes e para contagem. */
export function NumberLinePicker({
  max,
  step = 1,
  marks,
  selected,
  onPick,
  labelFor,
}: {
  max: number
  step?: number
  marks?: number[]
  selected?: number | null
  onPick?: (value: number) => void
  labelFor?: (value: number) => string
}) {
  const width = 300
  const height = 70
  const pad = 18
  const x = (value: number) => pad + (value / max) * (width - pad * 2)
  const valores = Array.from({ length: Math.round(max / step) + 1 }, (_, i) => i * step)

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`chart ${onPick ? 'plane-clickable' : ''}`}
      role="img"
      aria-label={`reta numerica de 0 a ${max}`}
    >
      <line x1={pad} y1={30} x2={width - pad} y2={30} stroke={AZUL} strokeWidth={2} />

      {valores.map((value) => (
        <g key={value} onClick={onPick ? () => onPick(value) : undefined}>
          {/* alvo de toque generoso: dedo de crianca em tablet */}
          {onPick && <rect x={x(value) - 12} y={10} width={24} height={40} fill="transparent" />}
          <line x1={x(value)} y1={24} x2={x(value)} y2={36} stroke={AZUL} strokeWidth={1.5} />
          <text x={x(value)} y={56} textAnchor="middle" className="chart-label">
            {labelFor ? labelFor(value) : value}
          </text>
        </g>
      ))}

      {marks?.map((value) => (
        <circle key={`m${value}`} cx={x(value)} cy={30} r={7} fill={VERDE} />
      ))}

      {selected !== null && selected !== undefined && (
        <circle cx={x(selected)} cy={30} r={9} fill="none" stroke={VERDE} strokeWidth={3} />
      )}
    </svg>
  )
}
