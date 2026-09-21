import { useMemo, useState } from 'react'

import { FractionLabel, FractionShape } from '../../components/FractionShape'
import type { ExerciseViewProps } from '../types'
import type { Fraction, FractionExercise } from './exercises'

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/**
 * Embaralha na montagem: a resposta certa esta sempre em primeiro lugar nos dados.
 * O ExercisePlayer monta a view com key={exercise.id}, entao trocar de exercicio
 * remonta o componente e reembaralha.
 */
function useShuffledIndexes(count: number): number[] {
  return useMemo(() => shuffle(Array.from({ length: count }, (_, i) => i)), [count])
}

const value = (f: Fraction) => f.n / f.d

export function FractionExerciseView({ exercise, locked, onAnswer }: ExerciseViewProps<FractionExercise>) {
  if (exercise.kind === 'identify') return <IdentifyView exercise={exercise} locked={locked} onAnswer={onAnswer} />
  if (exercise.kind === 'compare') return <CompareView exercise={exercise} locked={locked} onAnswer={onAnswer} />
  if (exercise.kind === 'build') return <BuildView exercise={exercise} locked={locked} onAnswer={onAnswer} />
  return <ChoiceView exercise={exercise} locked={locked} onAnswer={onAnswer} />
}

function IdentifyView({ exercise, locked, onAnswer }: ExerciseViewProps<Extract<FractionExercise, { kind: 'identify' }>>) {
  const order = useShuffledIndexes(exercise.options.length)
  return (
    <>
      <div className="exercise-visual">
        <FractionShape
          kind={exercise.shape}
          numerator={exercise.value.n}
          denominator={exercise.value.d}
          showCount={exercise.showCount}
          size={200}
        />
      </div>
      <div className="options options-fraction">
        {order.map((i) => {
          const option = exercise.options[i]
          return (
            <button
              key={i}
              type="button"
              className="option"
              disabled={locked}
              onClick={() => onAnswer(option.n === exercise.value.n && option.d === exercise.value.d)}
            >
              <FractionLabel numerator={option.n} denominator={option.d} />
            </button>
          )
        })}
      </div>
    </>
  )
}

function CompareView({ exercise, locked, onAnswer }: ExerciseViewProps<Extract<FractionExercise, { kind: 'compare' }>>) {
  const equal = value(exercise.left) === value(exercise.right)
  const sides = [
    { key: 'left' as const, fraction: exercise.left },
    { key: 'right' as const, fraction: exercise.right },
  ]
  const bigger = value(exercise.left) > value(exercise.right) ? 'left' : 'right'

  return (
    <>
      <div className="compare-pair">
        {sides.map(({ key, fraction }) => (
          <button
            key={key}
            type="button"
            className="compare-side"
            disabled={locked}
            onClick={() => onAnswer(!equal && bigger === key)}
          >
            <FractionShape kind={exercise.shape} numerator={fraction.n} denominator={fraction.d} size={150} />
            <FractionLabel numerator={fraction.n} denominator={fraction.d} />
          </button>
        ))}
      </div>
      <div className="options">
        <button type="button" className="option option-wide" disabled={locked} onClick={() => onAnswer(equal)}>
          As duas sao iguais
        </button>
      </div>
    </>
  )
}

function BuildView({ exercise, locked, onAnswer }: ExerciseViewProps<Extract<FractionExercise, { kind: 'build' }>>) {
  const [den, setDen] = useState(2)
  const [num, setNum] = useState(1)

  const setDenominator = (next: number) => {
    setDen(next)
    setNum((current) => Math.min(current, next))
  }

  return (
    <>
      <div className="exercise-visual">
        <FractionShape kind={exercise.shape} numerator={num} denominator={den} size={200} />
        <FractionLabel numerator={num} denominator={den} />
      </div>
      <div className="sliders">
        <label>
          <span>Pedacos pintados: {num}</span>
          <input
            type="range"
            min={0}
            max={den}
            value={num}
            disabled={locked}
            onChange={(event) => setNum(Number(event.target.value))}
          />
        </label>
        <label>
          <span>Total de pedacos: {den}</span>
          <input
            type="range"
            min={1}
            max={exercise.maxDenominator}
            value={den}
            disabled={locked}
            onChange={(event) => setDenominator(Number(event.target.value))}
          />
        </label>
      </div>
      <div className="options">
        <button
          type="button"
          className="option option-wide option-primary"
          disabled={locked}
          onClick={() => onAnswer(num === exercise.target.n && den === exercise.target.d)}
        >
          Conferir
        </button>
      </div>
    </>
  )
}

function ChoiceView({ exercise, locked, onAnswer }: ExerciseViewProps<Extract<FractionExercise, { kind: 'choice' }>>) {
  const order = useShuffledIndexes(exercise.options.length)
  return (
    <>
      {exercise.visual && (
        <div className="exercise-visual">
          <FractionShape
            kind={exercise.visual.shape}
            numerator={exercise.visual.value.n}
            denominator={exercise.visual.value.d}
            size={170}
          />
        </div>
      )}
      <div className="options">
        {order.map((i) => (
          <button
            key={i}
            type="button"
            className="option"
            disabled={locked}
            onClick={() => onAnswer(i === exercise.answerIndex)}
          >
            {exercise.options[i]}
          </button>
        ))}
      </div>
    </>
  )
}
