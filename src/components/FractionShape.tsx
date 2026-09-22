/**
 * Representacao visual de uma fracao. Tres formas — pizza, retangulo e barra — para que a
 * crianca generalize o conceito em vez de amarra-lo a um unico desenho. Cada parte pintada
 * ganha uma tonalidade diferente da paleta, separando visualmente os pedacos do todo.
 */

export type ShapeKind = 'pizza' | 'rect' | 'bar'

const PART_COLORS = ['#1a936f', '#3b7ba0', '#48bfe3', '#2a9d8f', '#4c9f70', '#5aa9e6']
const EMPTY = '#e6eef0'
const STROKE = '#ffffff'

interface Props {
  kind: ShapeKind
  numerator: number
  denominator: number
  size?: number
  /** Numera as partes pintadas — ajuda na contagem nos primeiros exercícios. */
  showCount?: boolean
}

function polarPoint(cx: number, cy: number, r: number, angleDeg: number): [number, number] {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)]
}

function slicePath(cx: number, cy: number, r: number, from: number, to: number): string {
  const [x1, y1] = polarPoint(cx, cy, r, from)
  const [x2, y2] = polarPoint(cx, cy, r, to)
  const largeArc = to - from > 180 ? 1 : 0
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`
}

export function FractionShape({ kind, numerator, denominator, size = 180, showCount }: Props) {
  const parts = Math.max(1, denominator)
  const filled = Math.max(0, Math.min(numerator, parts))
  const color = (i: number) => (i < filled ? PART_COLORS[i % PART_COLORS.length] : EMPTY)

  if (kind === 'pizza') {
    const r = size / 2 - 2
    const step = 360 / parts
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${filled} de ${parts}`}>
        {Array.from({ length: parts }, (_, i) => (
          <path
            key={i}
            d={slicePath(size / 2, size / 2, r, i * step, (i + 1) * step)}
            fill={color(i)}
            stroke={STROKE}
            strokeWidth={parts > 12 ? 1 : 2}
          />
        ))}
        {showCount &&
          Array.from({ length: filled }, (_, i) => {
            const [tx, ty] = polarPoint(size / 2, size / 2, r * 0.62, i * step + step / 2)
            return (
              <text key={i} x={tx} y={ty} className="shape-count" textAnchor="middle" dominantBaseline="central">
                {i + 1}
              </text>
            )
          })}
      </svg>
    )
  }

  const isBar = kind === 'bar'
  const width = size
  const height = isBar ? Math.max(40, size / 4) : size
  // retangulo: divide em colunas ou grade; barra: sempre colunas horizontais
  const cols = isBar ? parts : parts % 2 === 0 && parts > 3 ? parts / 2 : parts
  const rows = isBar ? 1 : Math.ceil(parts / cols)
  const cellW = width / cols
  const cellH = height / rows

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${filled} de ${parts}`}>
      {Array.from({ length: parts }, (_, i) => {
        const col = i % cols
        const row = Math.floor(i / cols)
        return (
          <g key={i}>
            <rect
              x={col * cellW}
              y={row * cellH}
              width={cellW}
              height={cellH}
              fill={color(i)}
              stroke={STROKE}
              strokeWidth={2}
            />
            {showCount && i < filled && (
              <text
                x={col * cellW + cellW / 2}
                y={row * cellH + cellH / 2}
                className="shape-count"
                textAnchor="middle"
                dominantBaseline="central"
              >
                {i + 1}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

export function FractionLabel({ numerator, denominator }: { numerator: number; denominator: number }) {
  return (
    <span className="fraction" aria-label={`${numerator} sobre ${denominator}`}>
      <span className="fraction-num">{numerator}</span>
      <span className="fraction-den">{denominator}</span>
    </span>
  )
}
