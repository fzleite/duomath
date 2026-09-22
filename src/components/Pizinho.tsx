/**
 * Pizinho — mascote do DuoMath, alusao ao numero Pi (sugerido pela filha do Fernando).
 * Nao e um guia obrigatorio em cada tela: aparece de forma contextual para dar dica,
 * comemorar um acerto/etapa e apoiar quando a crianca erra o mesmo exercício varias vezes.
 * Pensado para ser reaproveitado no futuro modulo de geometria.
 */

export type PizinhoMood = 'neutro' | 'dica' | 'festa' | 'apoio'

const FACE: Record<PizinhoMood, { body: string; mouth: string; eye: number }> = {
  neutro: { body: '#3b7ba0', mouth: 'M 26 44 Q 36 50 46 44', eye: 4 },
  dica: { body: '#48bfe3', mouth: 'M 26 44 Q 36 52 46 44', eye: 5 },
  festa: { body: '#1a936f', mouth: 'M 24 42 Q 36 58 48 42', eye: 5 },
  apoio: { body: '#2a9d8f', mouth: 'M 26 48 Q 36 42 46 48', eye: 4 },
}

interface Props {
  mood?: PizinhoMood
  message?: string
  size?: number
  onDismiss?: () => void
}

export function PizinhoFace({ mood = 'neutro', size = 72 }: { mood?: PizinhoMood; size?: number }) {
  const face = FACE[mood]
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" role="img" aria-label="Pizinho">
      <circle cx="36" cy="36" r="34" fill={face.body} />
      <circle cx="36" cy="36" r="34" fill="none" stroke="#ffffff" strokeWidth="3" />
      {/* as duas pernas e o traco do pi formam a "cara" do mascote */}
      <path d="M 18 22 H 54" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
      <path d="M 27 22 V 56" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" opacity="0.35" />
      <path d="M 45 22 V 56" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" opacity="0.35" />
      <circle cx="28" cy="34" r={face.eye} fill="#ffffff" />
      <circle cx="44" cy="34" r={face.eye} fill="#ffffff" />
      <path d={face.mouth} stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
      {mood === 'festa' && (
        <>
          <circle cx="8" cy="14" r="3" fill="#48bfe3" />
          <circle cx="64" cy="18" r="2.5" fill="#1a936f" />
          <circle cx="60" cy="6" r="2" fill="#3b7ba0" />
        </>
      )}
    </svg>
  )
}

export function Pizinho({ mood = 'neutro', message, size = 72, onDismiss }: Props) {
  if (!message) return null
  return (
    <div className={`pizinho pizinho-${mood}`} role="status">
      <PizinhoFace mood={mood} size={size} />
      <p className="pizinho-bubble">{message}</p>
      {onDismiss && (
        <button type="button" className="pizinho-close" onClick={onDismiss} aria-label="Fechar dica do Pizinho">
          ×
        </button>
      )}
    </div>
  )
}
