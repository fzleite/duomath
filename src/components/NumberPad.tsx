/**
 * Teclado numerico proprio, em vez do teclado do sistema: num tablet o teclado nativo cobre
 * metade da tela e demora a abrir, o que sujaria a medicao de tempo de resposta do modulo de
 * jogo e atrapalha a crianca nos modulos de conteudo.
 */

interface Props {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  disabled?: boolean
  maxLength?: number
  /** Habilita a virgula decimal. */
  decimal?: boolean
  /** Habilita o sinal negativo — necessario em algebra. */
  negativo?: boolean
  submitLabel?: string
}

export function NumberPad({
  value,
  onChange,
  onSubmit,
  disabled,
  maxLength = 6,
  decimal,
  negativo,
  submitLabel = 'OK',
}: Props) {
  const extra = negativo ? '-' : decimal ? ',' : 'apagar'
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', extra, '0', 'ok']
  // com sinal E decimal, a virgula ganha uma quarta tecla na fileira de baixo
  const segunda = negativo && decimal ? [',', 'apagar'] : negativo ? ['apagar'] : []

  const press = (key: string) => {
    if (disabled) return

    if (key === 'ok') {
      if (value.length && value !== '-') onSubmit()
      return
    }
    if (key === 'apagar') {
      onChange(value.slice(0, -1))
      return
    }
    if (key === '-') {
      // o sinal alterna e vale para o numero inteiro, nao para um digito
      onChange(value.startsWith('-') ? value.slice(1) : `-${value}`)
      return
    }
    if (key === ',') {
      if (!value.includes(',') && value.length && value !== '-') onChange(`${value},`)
      return
    }
    if (value.replace(/[-,]/g, '').length < maxLength) onChange(value + key)
  }

  const label = (key: string) => (key === 'apagar' ? '⌫' : key === 'ok' ? submitLabel : key)
  const className = (key: string) =>
    `numpad-key ${key === 'ok' ? 'numpad-ok' : ''} ${key === 'apagar' || key === '-' || key === ',' ? 'numpad-aux' : ''}`

  return (
    <div className="numpad">
      {keys.map((key) => (
        <button
          key={key}
          type="button"
          className={className(key)}
          disabled={disabled || (key === 'ok' && (!value.length || value === '-'))}
          onClick={() => press(key)}
        >
          {label(key)}
        </button>
      ))}
      {segunda.map((key) => (
        <button key={key} type="button" className={className(key)} disabled={disabled} onClick={() => press(key)}>
          {label(key)}
        </button>
      ))}
    </div>
  )
}
