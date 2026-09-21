/**
 * Apoio visual da multiplicacao: arranjo retangular (a fileiras de b) e soma de parcelas
 * iguais. Cada fileira/parcela ganha uma tonalidade diferente da paleta, para a crianca ver
 * os grupos antes de ver a conta — a mesma ideia de cor por parte usada nas fracoes.
 */

const ROW_COLORS = ['#1a936f', '#3b7ba0', '#48bfe3', '#2a9d8f', '#4c9f70', '#5aa9e6']

interface ArrayProps {
  /** Fileiras. */
  rows: number
  /** Pontos por fileira. */
  cols: number
  dot?: number
  gap?: number
}

export function DotArray({ rows, cols, dot = 16, gap = 8 }: ArrayProps) {
  const width = cols * dot + (cols - 1) * gap
  const height = rows * dot + (rows - 1) * gap

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="dot-array"
      style={{ maxWidth: `${Math.min(width * 1.6, 280)}px` }}
      role="img"
      aria-label={`${rows} fileiras de ${cols}`}
    >
      {Array.from({ length: rows }, (_, row) =>
        Array.from({ length: cols }, (_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={col * (dot + gap) + dot / 2}
            cy={row * (dot + gap) + dot / 2}
            r={dot / 2}
            fill={ROW_COLORS[row % ROW_COLORS.length]}
          />
        )),
      )}
    </svg>
  )
}

/** Soma de parcelas iguais: N grupos com a mesma quantidade, cada grupo de uma cor. */
export function GroupSum({ groups, perGroup }: { groups: number; perGroup: number }) {
  return (
    <div className="group-sum">
      {Array.from({ length: groups }, (_, group) => (
        <div className="group-chip" key={group}>
          {Array.from({ length: perGroup }, (_, item) => (
            <span
              className="group-dot"
              key={item}
              style={{ background: ROW_COLORS[group % ROW_COLORS.length] }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
