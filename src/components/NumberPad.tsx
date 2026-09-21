/**
 * Teclado numerico proprio, em vez do teclado do sistema: num tablet o teclado nativo cobre
 * metade da tela e demora a abrir, o que sujaria a medicao de tempo de resposta — que e
 * exatamente o que o modulo de jogo mede.
 */

interface Props {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  disabled?: boolean
  maxLength?: number
}

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'apagar', '0', 'ok']

export function NumberPad({ value, onChange, onSubmit, disabled, maxLength = 5 }: Props) {
  const press = (key: string) => {
    if (disabled) return
    if (key === 'ok') {
      if (value.length) onSubmit()
      return
    }
    if (key === 'apagar') {
      onChange(value.slice(0, -1))
      return
    }
    if (value.length < maxLength) onChange(value + key)
  }

  return (
    <div className="numpad">
      {KEYS.map((key) => (
        <button
          key={key}
          type="button"
          className={`numpad-key ${key === 'ok' ? 'numpad-ok' : ''} ${key === 'apagar' ? 'numpad-del' : ''}`}
          disabled={disabled || (key === 'ok' && !value.length)}
          onClick={() => press(key)}
        >
          {key === 'apagar' ? '⌫' : key === 'ok' ? 'OK' : key}
        </button>
      ))}
    </div>
  )
}
