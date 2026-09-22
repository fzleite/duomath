import { useMemo, useState } from 'react'

import { CartesianPlane, NumberLinePicker } from '../../components/CartesianPlane'
import { NumberPad } from '../../components/NumberPad'
import { Visual } from '../../components/Visual'
import type { ExerciseViewProps } from '../types'
import type { AjusteInput, NumeroInput, PontoInput, QuizExercise } from './quiz'

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/**
 * View compartilhada dos modulos de quiz. Despacha entre as formas de responder: alternativas
 * (padrao), entrada numerica, ajuste de coeficientes com previa ao vivo e escolha de ponto.
 * O ExercisePlayer monta com key={exercise.id}, entao trocar de exercicio remonta e zera o
 * estado local (valor digitado, sliders, ponto escolhido).
 */
export function QuizExerciseView({ exercise, locked, onAnswer }: ExerciseViewProps<QuizExercise>) {
  const visual = exercise.visual ? (
    <div className="exercise-visual">
      <Visual spec={exercise.visual} />
    </div>
  ) : null

  if (exercise.input?.mode === 'numero') {
    return (
      <>
        {visual}
        <NumeroAnswer input={exercise.input} locked={locked} onAnswer={onAnswer} />
      </>
    )
  }
  if (exercise.input?.mode === 'ajuste') {
    return <AjusteAnswer input={exercise.input} locked={locked} onAnswer={onAnswer} />
  }
  if (exercise.input?.mode === 'ponto') {
    return (
      <>
        {visual}
        <PontoAnswer input={exercise.input} locked={locked} onAnswer={onAnswer} />
      </>
    )
  }

  return (
    <>
      {visual}
      <EscolhaAnswer exercise={exercise} locked={locked} onAnswer={onAnswer} />
    </>
  )
}

function EscolhaAnswer({ exercise, locked, onAnswer }: ExerciseViewProps<QuizExercise>) {
  const options = exercise.options ?? []
  const order = useMemo(() => shuffle(Array.from({ length: options.length }, (_, i) => i)), [options.length])
  // alternativas longas (frases) ficam melhores empilhadas do que em grade
  const longas = options.some((option) => option.length > 18)

  return (
    <div className={`options ${longas ? 'options-stacked' : ''}`}>
      {order.map((i) => (
        <button
          key={i}
          type="button"
          className="option"
          disabled={locked}
          onClick={() => onAnswer(i === exercise.answerIndex)}
        >
          {options[i]}
        </button>
      ))}
    </div>
  )
}

function NumeroAnswer({
  input,
  locked,
  onAnswer,
}: {
  input: NumeroInput
  locked: boolean
  onAnswer: (correct: boolean) => void
}) {
  const [typed, setTyped] = useState('')

  const submit = () => {
    const valor = Number(typed.replace(',', '.'))
    onAnswer(Number.isFinite(valor) && Math.abs(valor - input.answer) < 1e-9)
  }

  return (
    <>
      <p className={`quiz-answer ${locked ? '' : 'quiz-answer-open'}`}>
        {typed || '?'}
        {input.unit && typed && <span className="quiz-unit"> {input.unit}</span>}
      </p>
      <NumberPad
        value={typed}
        onChange={setTyped}
        onSubmit={submit}
        disabled={locked}
        decimal={input.decimal}
        negativo={input.negativo}
        submitLabel="Conferir"
      />
    </>
  )
}

function AjusteAnswer({
  input,
  locked,
  onAnswer,
}: {
  input: AjusteInput
  locked: boolean
  onAnswer: (correct: boolean) => void
}) {
  const [valores, setValores] = useState<Record<string, number>>(() =>
    Object.fromEntries(input.controls.map((control) => [control.id, control.min])),
  )

  const alvo = Object.fromEntries(input.controls.map((c) => [c.id, c.target]))
  const fn =
    input.preview === 'afim'
      ? (x: number) => (valores.a ?? 0) * x + (valores.b ?? 0)
      : (x: number) => (valores.a ?? 0) * x * x + (valores.b ?? 0) * x + (valores.c ?? 0)

  const expressao =
    input.preview === 'afim'
      ? `y = ${valores.a ?? 0}x ${(valores.b ?? 0) < 0 ? '-' : '+'} ${Math.abs(valores.b ?? 0)}`
      : `y = ${valores.a ?? 0}x² ${(valores.b ?? 0) < 0 ? '-' : '+'} ${Math.abs(valores.b ?? 0)}x ${(valores.c ?? 0) < 0 ? '-' : '+'} ${Math.abs(valores.c ?? 0)}`

  return (
    <>
      <div className="exercise-visual">
        <CartesianPlane fn={fn} />
        <p className="expressao">{expressao}</p>
      </div>

      <div className="sliders">
        {input.controls.map((control) => (
          <label key={control.id}>
            <span>
              {control.label}: {valores[control.id]}
            </span>
            <input
              type="range"
              min={control.min}
              max={control.max}
              step={control.step ?? 1}
              value={valores[control.id]}
              disabled={locked}
              onChange={(event) =>
                setValores((current) => ({ ...current, [control.id]: Number(event.target.value) }))
              }
            />
          </label>
        ))}
      </div>

      <div className="options">
        <button
          type="button"
          className="option option-wide option-primary"
          disabled={locked}
          onClick={() => onAnswer(input.controls.every((c) => valores[c.id] === alvo[c.id]))}
        >
          Conferir
        </button>
      </div>
    </>
  )
}

function PontoAnswer({
  input,
  locked,
  onAnswer,
}: {
  input: PontoInput
  locked: boolean
  onAnswer: (correct: boolean) => void
}) {
  const [reta, setReta] = useState<number | null>(null)
  const [plano, setPlano] = useState<{ x: number; y: number } | null>(null)

  if (input.em === 'reta') {
    return (
      <>
        <div className="exercise-visual">
          <NumberLinePicker
            max={input.max ?? 10}
            step={input.step ?? 1}
            selected={reta}
            onPick={locked ? undefined : setReta}
          />
        </div>
        <div className="options">
          <button
            type="button"
            className="option option-wide option-primary"
            disabled={locked || reta === null}
            onClick={() => onAnswer(reta === input.target.value)}
          >
            Conferir
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="exercise-visual">
        <CartesianPlane selected={plano} onPick={locked ? undefined : (x, y) => setPlano({ x, y })} />
        <p className="expressao">{plano ? `(${plano.x}, ${plano.y})` : 'toque no plano'}</p>
      </div>
      <div className="options">
        <button
          type="button"
          className="option option-wide option-primary"
          disabled={locked || plano === null}
          onClick={() => onAnswer(plano?.x === input.target.x && plano?.y === input.target.y)}
        >
          Conferir
        </button>
      </div>
    </>
  )
}
