import { evolutionSeries, formatPercent, formatSeconds, statsByTag } from '../../data/metrics'
import { useApp } from '../../state/store'

const MODULE_ID = 'tabuada'
const VERDE = '#1a936f'
const AZUL = '#3b7ba0'

/** Nome legivel do agrupador: as contas soltas nao sao "a tabuada do contas". */
function tagLabel(tag: string): string {
  return tag === 'contas' ? 'Contas soltas' : `Tabuada do ${tag}`
}

export function TabuadaStats({ onBack }: { onBack: () => void }) {
  const attempts = useApp((s) => s.attempts)
  const tags = statsByTag(attempts, MODULE_ID)
  const series = evolutionSeries(attempts, MODULE_ID)

  if (!tags.length) {
    return (
      <main className="screen">
        <header className="topbar">
          <button type="button" className="link-quiet link-button" onClick={onBack}>
            Voltar
          </button>
          <strong>Minhas estatisticas</strong>
        </header>
        <p className="muted">Ainda nao ha respostas registradas. Jogue uma rodada para comecar a medir.</p>
      </main>
    )
  }

  const slowest = tags[0]
  const fastest = tags[tags.length - 1]

  return (
    <main className="screen">
      <header className="topbar">
        <button type="button" className="link-quiet link-button" onClick={onBack}>
          Voltar
        </button>
        <strong>Minhas estatisticas</strong>
      </header>

      <section className="card">
        <h2>Evolucao do tempo</h2>
        <p className="muted small">Media a cada 10 respostas certas, da mais antiga para a mais recente.</p>
        {series.length >= 2 ? (
          <EvolutionChart series={series} />
        ) : (
          <p className="muted small">Precisa de pelo menos 20 respostas certas para desenhar a curva.</p>
        )}
      </section>

      <section className="card">
        <h2>Comparativo por tabuada</h2>
        <p className="muted small">
          Da mais demorada para a mais rapida. A mais lenta agora e a {tagLabel(slowest.tag).toLowerCase()}
          {fastest !== slowest && `, e a mais rapida e a ${tagLabel(fastest.tag).toLowerCase()}`}.
        </p>
        <TagChart tags={tags} />
      </section>

      <section className="card">
        <h2>Historico por tabuada</h2>
        <table className="report-table">
          <thead>
            <tr>
              <th>Tabuada</th>
              <th>Respostas</th>
              <th>Acerto</th>
              <th>Media</th>
              <th>Melhor</th>
              <th>Ultima</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag) => (
              <tr key={tag.tag}>
                <td>{tagLabel(tag.tag)}</td>
                <td>{tag.answered}</td>
                <td>{formatPercent(tag.accuracy)}</td>
                <td>{formatSeconds(tag.avgMs)}</td>
                <td>{formatSeconds(tag.bestMs)}</td>
                <td>{formatSeconds(tag.lastMs)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}

function EvolutionChart({ series }: { series: number[] }) {
  const width = 300
  const height = 110
  const pad = 8
  const max = Math.max(...series)
  const min = Math.min(...series)
  const span = max - min || 1

  const points = series.map((value, index) => {
    const x = pad + (index / Math.max(1, series.length - 1)) * (width - pad * 2)
    const y = pad + (1 - (value - min) / span) * (height - pad * 2)
    return [x, y] as const
  })

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="chart" role="img" aria-label="Evolucao do tempo medio">
      <polyline
        points={points.map(([x, y]) => `${x},${y}`).join(' ')}
        fill="none"
        stroke={VERDE}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      {points.map(([x, y], index) => (
        <circle key={index} cx={x} cy={y} r={3} fill={VERDE} />
      ))}
      <text x={pad} y={height - 1} className="chart-label">
        {formatSeconds(series[0])}
      </text>
      <text x={width - pad} y={height - 1} textAnchor="end" className="chart-label">
        {formatSeconds(series[series.length - 1])}
      </text>
    </svg>
  )
}

function TagChart({ tags }: { tags: { tag: string; avgMs: number | null }[] }) {
  const max = Math.max(...tags.map((t) => t.avgMs ?? 0), 1)
  return (
    <div className="tag-bars">
      {tags.map((tag) => (
        <div className="tag-bar" key={tag.tag}>
          <span className="tag-bar-label">{tag.tag === 'contas' ? 'contas' : tag.tag}</span>
          <div className="bar-track">
            <div
              className="bar-fill"
              style={{ width: `${((tag.avgMs ?? 0) / max) * 100}%`, background: AZUL }}
            />
          </div>
          <span className="tag-bar-value">{formatSeconds(tag.avgMs)}</span>
        </div>
      ))}
    </div>
  )
}
