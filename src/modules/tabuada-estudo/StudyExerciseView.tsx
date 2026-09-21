import { useMemo } from 'react'

import { DotArray, GroupSum } from '../../components/DotArray'
import type { ExerciseViewProps } from '../types'
import type { StudyExercise } from './exercises'

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function StudyExerciseView({ exercise, locked, onAnswer }: ExerciseViewProps<StudyExercise>) {
  // o ExercisePlayer monta a view com key={exercise.id}, entao trocar de exercicio reembaralha
  const order = useMemo(
    () => shuffle(Array.from({ length: exercise.options.length }, (_, i) => i)),
    [exercise.options.length],
  )

  return (
    <>
      {exercise.visual && (
        <div className="exercise-visual">
          {exercise.visual.kind === 'array' ? (
            <DotArray rows={exercise.visual.rows} cols={exercise.visual.cols} />
          ) : (
            <GroupSum groups={exercise.visual.groups} perGroup={exercise.visual.perGroup} />
          )}
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
