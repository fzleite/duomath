/**
 * Apoios visuais de geometria e trigonometria.
 *
 * O circulo trigonometrico e o unico interativo por dentro (recebe o angulo de fora e
 * redesenha): e o "ligar o angulo escolhido ao valor de cada razao em tempo real" do spec.
 * Os demais sao ilustracoes — o exercicio pergunta sobre o que esta desenhado.
 */

const VERDE = '#1a936f'
const AZUL = '#3b7ba0'
const AZUL_CLARO = '#48bfe3'
const EIXO = '#9db4bd'
const LINHA = '#dbe6ea'

/** Circulo trigonometrico com o triangulo retangulo do angulo, e seno/cosseno/tangente. */
export function CirculoTrig({ angulo }: { angulo: number }) {
  const size = 260
  const cx = size * 0.42
  const cy = size * 0.58
  const r = size * 0.34
  const rad = (angulo * Math.PI) / 180

  const px = cx + r * Math.cos(rad)
  const py = cy - r * Math.sin(rad)

  const sen = Math.sin(rad)
  const cos = Math.cos(rad)
  const tan = Math.abs(cos) < 1e-6 ? null : sen / cos

  return (
    <div className="trig">
      <svg viewBox={`0 0 ${size} ${size}`} className="plane" role="img" aria-label={`angulo de ${angulo} graus`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={LINHA} strokeWidth={2} />
        <line x1={cx - r - 12} y1={cy} x2={cx + r + 12} y2={cy} stroke={EIXO} strokeWidth={1.5} />
        <line x1={cx} y1={cy + r + 12} x2={cx} y2={cy - r - 12} stroke={EIXO} strokeWidth={1.5} />

        {/* cateto horizontal = cosseno; vertical = seno */}
        <line x1={cx} y1={cy} x2={px} y2={cy} stroke={AZUL} strokeWidth={4} />
        <line x1={px} y1={cy} x2={px} y2={py} stroke={VERDE} strokeWidth={4} />
        <line x1={cx} y1={cy} x2={px} y2={py} stroke={AZUL_CLARO} strokeWidth={3} />

        <path
          d={`M ${cx + 22} ${cy} A 22 22 0 0 ${sen >= 0 ? 0 : 1} ${cx + 22 * Math.cos(rad)} ${cy - 22 * Math.sin(rad)}`}
          fill="none"
          stroke="#5a6a72"
          strokeWidth={1.5}
        />
        <text x={cx + 30} y={cy - 8} className="chart-dim">
          {angulo}°
        </text>
        <circle cx={px} cy={py} r={5} fill={AZUL_CLARO} />
      </svg>

      <div className="trig-valores">
        <span>
          seno <strong>{sen.toFixed(2)}</strong>
        </span>
        <span>
          cosseno <strong>{cos.toFixed(2)}</strong>
        </span>
        <span>
          tangente <strong>{tan === null ? 'nao existe' : tan.toFixed(2)}</strong>
        </span>
      </div>
    </div>
  )
}

/** Prisma ou piramide de base regular, com os vertices marcados para contagem. */
export function Solido({ tipo, base }: { tipo: 'prisma' | 'piramide'; base: number }) {
  const size = 220
  const cx = size / 2
  const rx = size * 0.3
  const ry = size * 0.12
  const topo = size * 0.22
  const chao = size * 0.74

  const baseP = Array.from({ length: base }, (_, i) => {
    const a = (i / base) * 2 * Math.PI + Math.PI / 6
    return [cx + rx * Math.cos(a), chao - ry * Math.sin(a)] as const
  })

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="plane" role="img" aria-label={`${tipo} de base com ${base} lados`}>
      <polygon
        points={baseP.map(([x, y]) => `${x},${y}`).join(' ')}
        fill={AZUL_CLARO}
        fillOpacity={0.25}
        stroke={AZUL}
        strokeWidth={2.5}
      />

      {tipo === 'prisma' ? (
        <>
          <polygon
            points={baseP.map(([x, y]) => `${x},${y - (chao - topo)}`).join(' ')}
            fill={AZUL_CLARO}
            fillOpacity={0.35}
            stroke={AZUL}
            strokeWidth={2.5}
          />
          {baseP.map(([x, y], i) => (
            <line key={i} x1={x} y1={y} x2={x} y2={y - (chao - topo)} stroke={AZUL} strokeWidth={2} />
          ))}
          {baseP.map(([x, y], i) => (
            <g key={`v${i}`}>
              <circle cx={x} cy={y} r={4} fill={VERDE} />
              <circle cx={x} cy={y - (chao - topo)} r={4} fill={VERDE} />
            </g>
          ))}
        </>
      ) : (
        <>
          {baseP.map(([x, y], i) => (
            <line key={i} x1={x} y1={y} x2={cx} y2={topo} stroke={AZUL} strokeWidth={2} />
          ))}
          {baseP.map(([x, y], i) => (
            <circle key={`v${i}`} cx={x} cy={y} r={4} fill={VERDE} />
          ))}
          <circle cx={cx} cy={topo} r={5} fill={VERDE} />
        </>
      )}
    </svg>
  )
}

/** Duas paralelas cortadas por uma transversal, com um angulo dado. */
export function AngulosParalelas({ angulo }: { angulo: number }) {
  const width = 260
  const height = 180
  const y1 = 50
  const y2 = 130
  // inclinacao da transversal derivada do angulo pedido
  const rad = (angulo * Math.PI) / 180
  const dx = (y2 - y1) / Math.tan(rad)

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="plane" role="img" aria-label={`paralelas com angulo de ${angulo} graus`}>
      <line x1={10} y1={y1} x2={width - 10} y2={y1} stroke={AZUL} strokeWidth={3} />
      <line x1={10} y1={y2} x2={width - 10} y2={y2} stroke={AZUL} strokeWidth={3} />
      <line x1={70 - dx * 0.6} y1={y1 - 30} x2={70 + dx * 1.6} y2={y2 + 30} stroke={VERDE} strokeWidth={3} />

      <text x={82} y={y1 - 8} className="chart-dim">
        {angulo}°
      </text>
      <text x={78 + dx} y={y2 + 22} className="chart-dim">
        ?
      </text>
      <text x={width - 44} y={y1 - 8} className="chart-label">
        reta r
      </text>
      <text x={width - 44} y={y2 + 20} className="chart-label">
        reta s
      </text>
    </svg>
  )
}

/** Ilustracao das construcoes classicas — o desenho pronto, para o exercicio raciocinar sobre. */
export function Construcao({ tipo }: { tipo: 'mediatriz' | 'bissetriz' | 'angulo-60' }) {
  const width = 240
  const height = 160

  if (tipo === 'mediatriz') {
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="plane" role="img" aria-label="mediatriz de um segmento">
        <line x1={40} y1={110} x2={200} y2={110} stroke={AZUL} strokeWidth={3} />
        <circle cx={40} cy={110} r={4} fill={AZUL} />
        <circle cx={200} cy={110} r={4} fill={AZUL} />
        <circle cx={40} cy={110} r={100} fill="none" stroke={LINHA} strokeWidth={1.5} />
        <circle cx={200} cy={110} r={100} fill="none" stroke={LINHA} strokeWidth={1.5} />
        <line x1={120} y1={16} x2={120} y2={150} stroke={VERDE} strokeWidth={3} strokeDasharray="6 4" />
        <text x={126} y={28} className="chart-dim">
          mediatriz
        </text>
      </svg>
    )
  }

  if (tipo === 'bissetriz') {
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="plane" role="img" aria-label="bissetriz de um angulo">
        <line x1={30} y1={140} x2={210} y2={140} stroke={AZUL} strokeWidth={3} />
        <line x1={30} y1={140} x2={170} y2={30} stroke={AZUL} strokeWidth={3} />
        <line x1={30} y1={140} x2={205} y2={78} stroke={VERDE} strokeWidth={3} strokeDasharray="6 4" />
        <path d="M 70 140 A 40 40 0 0 0 61 114" fill="none" stroke="#5a6a72" strokeWidth={1.5} />
        <text x={120} y={72} className="chart-dim">
          bissetriz
        </text>
      </svg>
    )
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="plane" role="img" aria-label="angulo de 60 graus">
      <polygon points="40,140 200,140 120,1" fill={AZUL_CLARO} fillOpacity={0.25} stroke={AZUL} strokeWidth={2.5} />
      <path d="M 70 140 A 30 30 0 0 0 55 114" fill="none" stroke={VERDE} strokeWidth={2} />
      <text x={74} y={132} className="chart-dim">
        60°
      </text>
      <text x={150} y={132} className="chart-label">
        triangulo equilatero
      </text>
    </svg>
  )
}
