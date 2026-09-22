import { CartesianPlane, type PlanePoint } from './CartesianPlane'
import { Balanca, GraficoBarras, GraficoPizza, Sorteio, Urna, type Bola } from './Estatistica'
import { AngulosParalelas, CirculoTrig, Construcao, Solido } from './Geometria'
import { FractionShape, type ShapeKind } from './FractionShape'
import { DotArray, GroupSum } from './DotArray'

/**
 * Catalogo de apoios visuais compartilhado pelos modulos de quiz. Concentrar aqui significa
 * que um modulo novo costuma ser APENAS um arquivo de dados: ele referencia um visual pelo
 * nome em vez de trazer a propria view.
 */
export type VisualSpec =
  /** Arranjo retangular: fileiras x colunas (multiplicacao). */
  | { kind: 'array'; rows: number; cols: number }
  /** Soma de parcelas iguais, em grupos coloridos. */
  | { kind: 'soma'; groups: number; perGroup: number }
  /** Fracao em pizza, retangulo ou barra. */
  | { kind: 'fracao'; shape: ShapeKind; n: number; d: number; showCount?: boolean }
  /** Grade de cem quadrados — a representacao canonica de porcentagem. */
  | { kind: 'centena'; filled: number }
  /** Objetos soltos para contar. */
  | { kind: 'contagem'; count: number }
  /** Reta numerica de 0 a max, com pontos marcados. */
  | { kind: 'reta'; max: number; marks: number[] }
  /** Grade de area: quantos quadradinhos cabem na figura. */
  | { kind: 'grade-area'; rows: number; cols: number }
  /** Contorno de um retangulo, para perimetro (lados rotulados). */
  | { kind: 'contorno'; largura: number; altura: number }
  /** Bloco 3D em projecao isometrica, para volume. */
  | { kind: 'blocos'; x: number; y: number; z: number }
  /** Dois triangulos em escala, para semelhanca. */
  | { kind: 'triangulos'; base: number; altura: number; fator: number }
  /** Conjunto de dados como barras rotuladas, para estatistica. */
  | { kind: 'dados'; valores: number[] }
  /** Poligono regular com os vertices marcados. */
  | { kind: 'poligono'; lados: number }
  /** Plano cartesiano de leitura (pontos e, opcionalmente, o poligono que eles formam). */
  | { kind: 'plano'; pontos: PlanePoint[]; poligono?: boolean }
  /** Prisma ou piramide com vertices marcados, para contar vertices, faces e arestas. */
  | { kind: 'solido'; tipo: 'prisma' | 'piramide'; base: number }
  /** Duas paralelas cortadas por transversal, com um angulo dado. */
  | { kind: 'angulos'; angulo: number }
  /** Ilustracao de construcao classica com regua e compasso. */
  | { kind: 'construcao'; tipo: 'mediatriz' | 'bissetriz' | 'angulo-60' }
  /** Circulo trigonometrico com o triangulo do angulo e as tres razoes. */
  | { kind: 'trig'; angulo: number }
  /** Grafico de barras ou de pizza, para leitura. */
  | { kind: 'grafico'; tipo: 'barras' | 'pizza'; dados: { label: string; valor: number }[] }
  /** Urna com a composicao visivel. */
  | { kind: 'urna'; bolas: Bola[] }
  /** Urna com sorteio simulado: a crianca sorteia e a contagem acumula. */
  | { kind: 'sorteio'; bolas: Bola[] }
  /** Balanca de equilibrio: os dois lados de uma equacao do 1o grau. */
  | { kind: 'balanca'; esquerda: { x: number; c: number }; direita: { x: number; c: number } }

const AZUL = '#3b7ba0'
const AZUL_CLARO = '#48bfe3'
const VERDE = '#1a936f'
const VAZIO = '#e6eef0'

export function Visual({ spec }: { spec: VisualSpec }) {
  switch (spec.kind) {
    case 'array':
      return <DotArray rows={spec.rows} cols={spec.cols} />
    case 'soma':
      return <GroupSum groups={spec.groups} perGroup={spec.perGroup} />
    case 'fracao':
      return (
        <FractionShape
          kind={spec.shape}
          numerator={spec.n}
          denominator={spec.d}
          showCount={spec.showCount}
          size={180}
        />
      )
    case 'centena':
      return <Centena filled={spec.filled} />
    case 'contagem':
      return <Contagem count={spec.count} />
    case 'reta':
      return <Reta max={spec.max} marks={spec.marks} />
    case 'grade-area':
      return <GradeArea rows={spec.rows} cols={spec.cols} />
    case 'contorno':
      return <Contorno largura={spec.largura} altura={spec.altura} />
    case 'blocos':
      return <Blocos x={spec.x} y={spec.y} z={spec.z} />
    case 'triangulos':
      return <Triangulos base={spec.base} altura={spec.altura} fator={spec.fator} />
    case 'dados':
      return <Dados valores={spec.valores} />
    case 'poligono':
      return <Poligono lados={spec.lados} />
    case 'plano':
      return <CartesianPlane points={spec.pontos} polygon={spec.poligono} />
    case 'solido':
      return <Solido tipo={spec.tipo} base={spec.base} />
    case 'angulos':
      return <AngulosParalelas angulo={spec.angulo} />
    case 'construcao':
      return <Construcao tipo={spec.tipo} />
    case 'trig':
      return <CirculoTrig angulo={spec.angulo} />
    case 'grafico':
      return spec.tipo === 'barras' ? <GraficoBarras dados={spec.dados} /> : <GraficoPizza dados={spec.dados} />
    case 'urna':
      return <Urna bolas={spec.bolas} />
    case 'sorteio':
      return <Sorteio bolas={spec.bolas} />
    case 'balanca':
      return <Balanca esquerda={spec.esquerda} direita={spec.direita} />
  }
}

/** 10x10 quadrados: o quanto de cem esta pintado e a propria definicao de por cento. */
function Centena({ filled }: { filled: number }) {
  const size = 200
  const cell = size / 10
  const pintados = Math.max(0, Math.min(100, filled))

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${pintados} de 100`}>
      {Array.from({ length: 100 }, (_, i) => (
        <rect
          key={i}
          x={(i % 10) * cell}
          y={Math.floor(i / 10) * cell}
          width={cell}
          height={cell}
          fill={i < pintados ? AZUL_CLARO : VAZIO}
          stroke="#fff"
          strokeWidth={1.5}
        />
      ))}
    </svg>
  )
}

function Contagem({ count }: { count: number }) {
  // ate 10 por fileira: a crianca conta de 10 em 10 sem se perder
  const perRow = Math.min(count, 10)
  return (
    <div className="contagem" style={{ gridTemplateColumns: `repeat(${perRow}, 1fr)` }} aria-label={`${count} objetos`}>
      {Array.from({ length: count }, (_, i) => (
        <span className="contagem-item" key={i} style={{ background: i % 2 ? VERDE : AZUL }} />
      ))}
    </div>
  )
}

function Reta({ max, marks }: { max: number; marks: number[] }) {
  const width = 280
  const height = 60
  const pad = 16
  const x = (value: number) => pad + (value / max) * (width - pad * 2)

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="chart" role="img" aria-label={`reta numerica de 0 a ${max}`}>
      <line x1={pad} y1={26} x2={width - pad} y2={26} stroke={AZUL} strokeWidth={2} />
      {Array.from({ length: max + 1 }, (_, value) => (
        <g key={value}>
          <line x1={x(value)} y1={20} x2={x(value)} y2={32} stroke={AZUL} strokeWidth={1.5} />
          <text x={x(value)} y={48} textAnchor="middle" className="chart-label">
            {value}
          </text>
        </g>
      ))}
      {marks.map((value) => (
        <circle key={value} cx={x(value)} cy={26} r={7} fill={VERDE} />
      ))}
    </svg>
  )
}

function GradeArea({ rows, cols }: { rows: number; cols: number }) {
  const cell = 26
  const width = cols * cell
  const height = rows * cell

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="dot-array"
      style={{ maxWidth: `${Math.min(width * 1.4, 280)}px` }}
      role="img"
      aria-label={`figura de ${cols} por ${rows} quadradinhos`}
    >
      {Array.from({ length: rows * cols }, (_, i) => (
        <rect
          key={i}
          x={(i % cols) * cell}
          y={Math.floor(i / cols) * cell}
          width={cell}
          height={cell}
          fill={AZUL_CLARO}
          stroke="#fff"
          strokeWidth={2}
        />
      ))}
    </svg>
  )
}

function Contorno({ largura, altura }: { largura: number; altura: number }) {
  const width = 240
  const height = 150
  const pad = 30

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="chart" role="img" aria-label={`retangulo ${largura} por ${altura}`}>
      <rect
        x={pad}
        y={pad}
        width={width - pad * 2}
        height={height - pad * 2}
        fill="none"
        stroke={VERDE}
        strokeWidth={4}
      />
      <text x={width / 2} y={pad - 10} textAnchor="middle" className="chart-dim">
        {largura}
      </text>
      <text x={width / 2} y={height - 10} textAnchor="middle" className="chart-dim">
        {largura}
      </text>
      <text x={12} y={height / 2} className="chart-dim">
        {altura}
      </text>
      <text x={width - 20} y={height / 2} className="chart-dim">
        {altura}
      </text>
    </svg>
  )
}

/** Projecao isometrica simples: mostra que volume e "quantos cubinhos cabem dentro". */
function Blocos({ x, y, z }: { x: number; y: number; z: number }) {
  const unit = 22
  const dx = unit * 0.5
  const dy = unit * 0.28
  const width = (x + z) * unit
  const height = (y + z) * unit

  const cubes: { px: number; py: number; depth: number }[] = []
  for (let cz = z - 1; cz >= 0; cz--) {
    for (let cy = 0; cy < y; cy++) {
      for (let cx = 0; cx < x; cx++) {
        cubes.push({
          px: cx * unit + cz * dx + 10,
          py: (y - 1 - cy) * unit - cz * dy + z * dy + 10,
          depth: cz,
        })
      }
    }
  }

  return (
    <svg
      viewBox={`0 0 ${width + 20} ${height + 20}`}
      className="dot-array"
      style={{ maxWidth: '260px' }}
      role="img"
      aria-label={`bloco de ${x} por ${y} por ${z}`}
    >
      {cubes.map((cube, index) => (
        <g key={index}>
          <rect x={cube.px} y={cube.py} width={unit} height={unit} fill={AZUL_CLARO} stroke="#fff" strokeWidth={1.5} />
          <polygon
            points={`${cube.px},${cube.py} ${cube.px + dx},${cube.py - dy} ${cube.px + unit + dx},${cube.py - dy} ${cube.px + unit},${cube.py}`}
            fill={AZUL}
            stroke="#fff"
            strokeWidth={1.5}
          />
        </g>
      ))}
    </svg>
  )
}

/** Dois triangulos retangulos com o mesmo formato e tamanhos diferentes: semelhanca a olho. */
function Triangulos({ base, altura, fator }: { base: number; altura: number; fator: number }) {
  const escala = 14
  const w1 = base * escala
  const h1 = altura * escala
  const w2 = w1 * fator
  const h2 = h1 * fator
  const width = w1 + w2 + 40
  const height = Math.max(h1, h2) + 30

  const tri = (x: number, w: number, h: number, cor: string, b: number, a: number) => (
    <g>
      <polygon
        points={`${x},${height - 20} ${x + w},${height - 20} ${x},${height - 20 - h}`}
        fill={cor}
        fillOpacity={0.3}
        stroke={cor}
        strokeWidth={2.5}
      />
      <text x={x + w / 2} y={height - 6} textAnchor="middle" className="chart-dim">
        {b}
      </text>
      <text x={x - 12} y={height - 20 - h / 2} className="chart-dim">
        {a}
      </text>
    </g>
  )

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="dot-array"
      style={{ maxWidth: '280px' }}
      role="img"
      aria-label={`triangulos semelhantes de razao ${fator}`}
    >
      {tri(16, w1, h1, VERDE, base, altura)}
      {tri(w1 + 34, w2, h2, AZUL, base * fator, altura * fator)}
    </svg>
  )
}

/** Barras rotuladas com o valor: le-se o conjunto sem precisar de tabela. */
function Dados({ valores }: { valores: number[] }) {
  const max = Math.max(...valores, 1)
  return (
    <div className="dados">
      {valores.map((valor, index) => (
        <div className="dado-col" key={index}>
          <span className="dado-valor">{valor}</span>
          <div className="dado-barra" style={{ height: `${(valor / max) * 90 + 10}px` }} />
        </div>
      ))}
    </div>
  )
}

function Poligono({ lados }: { lados: number }) {
  const size = 180
  const r = size / 2 - 16
  const pontos = Array.from({ length: lados }, (_, i) => {
    const angulo = (i / lados) * 2 * Math.PI - Math.PI / 2
    return [size / 2 + r * Math.cos(angulo), size / 2 + r * Math.sin(angulo)] as const
  })

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`poligono de ${lados} lados`}>
      <polygon
        points={pontos.map(([x, y]) => `${x},${y}`).join(' ')}
        fill={AZUL_CLARO}
        fillOpacity={0.35}
        stroke={AZUL}
        strokeWidth={3}
      />
      {pontos.map(([x, y], index) => (
        <circle key={index} cx={x} cy={y} r={4.5} fill={VERDE} />
      ))}
    </svg>
  )
}
