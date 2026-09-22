import { useMemo } from 'react'

import { Visual } from '../../components/Visual'
import type { ExerciseViewProps } from '../types'
import type { QuizExercise } from './quiz'

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/**
 * View compartilhada dos modulos de quiz. O ExercisePlayer monta com key={exercise.id},
 * entao trocar de exercicio remonta o componente e reembaralha as alternativas.
 */
export function QuizExerciseView({ exercise, locked, onAnswer }: ExerciseViewProps<QuizExercise>) {
  const order = useMemo(
    () => shuffle(Array.from({ length: exercise.options.length }, (_, i) => i)),
    [exercise.options.length],
  )

  // alternativas longas (frases) ficam melhores empilhadas do que em grade
  const longas = exercise.options.some((option) => option.length > 18)

  return (
    <>
      {exercise.visual && (
        <div className="exercise-visual">
          <Visual spec={exercise.visual} />
        </div>
      )}

      <div className={`options ${longas ? 'options-stacked' : ''}`}>
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
