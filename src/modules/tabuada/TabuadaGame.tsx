import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { NumberPad } from '../../components/NumberPad'
import { Pizinho, type PizinhoMood } from '../../components/Pizinho'
import { formatPercent, formatSeconds, levelStats, unlockStatus } from '../../data/metrics'
import { useApp } from '../../state/store'
import { TabuadaStats } from './TabuadaStats'
import { SESSION_SIZE, drawQuestion, tabuadaLevels, type TabuadaQuestion } from './questions'

const MODULE_ID = 'tabuada'

type Screen = 'menu' | 'quiz' | 'resumo' | 'estatisticas'

interface SessionAnswer {
  question: TabuadaQuestion
  correct: boolean
  elapsedMs: number
}

export function TabuadaGame() {
  const attempts = useApp((s) => s.attempts)
  const [screen, setScreen] = useState<Screen>('menu')
  const [levelId, setLevelId] = useState<string>('facil')
  const [session, setSession] = useState<SessionAnswer[]>([])

  const start = (id: string) => {
    setLevelId(id)
    setSession([])
    setScreen('quiz')
  }

  if (screen === 'quiz') {
    return (
      <QuizSession
        levelId={levelId}
        onQuit={() => setScreen('menu')}
        onFinish={(answers) => {
          setSession(answers)
          setScreen('resumo')
        }}
      />
    )
  }

  if (screen === 'resumo') {
    return <SessionSummary answers={session} onAgain={() => start(levelId)} onMenu={() => setScreen('menu')} />
  }

  if (screen === 'estatisticas') {
    return <TabuadaStats onBack={() => setScreen('menu')} />
  }

  return (
    <main className="screen">
      <header className="topbar">
        <Link className="link-quiet" to="/">
          Voltar
        </Link>
        <strong>Tabuada</strong>
      </header>

      <p className="muted">Responda o mais rapido que conseguir. O tempo de cada pergunta e cronometrado.</p>

      <div className="level-list">
        {tabuadaLevels.map((level) => {
          const status = unlockStatus(level.unlock, attempts, MODULE_ID)
          const stats = levelStats(attempts, MODULE_ID, level.id)

          return (
            <button
              key={level.id}
              type="button"
              className={`level-card ${status.unlocked ? '' : 'level-locked'}`}
              disabled={!status.unlocked}
              onClick={() => start(level.id)}
            >
              <div className="level-head">
                <strong>{level.title}</strong>
                {status.unlocked ? null : <span className="badge">bloqueado</span>}
              </div>
              <p>{level.description}</p>

              {status.unlocked ? (
                stats.answered > 0 && (
                  <span className="level-kpi">
                    {stats.answered} respostas · {formatPercent(stats.accuracy)} de acerto ·{' '}
                    media {formatSeconds(stats.avgMs)}
                  </span>
                )
              ) : (
                // mostra o alvo em vez de um cadeado mudo: a crianca sabe o que falta
                <span className="level-kpi">
                  Para abrir: {level.unlock?.minCorrect} acertos no nivel anterior com media abaixo de{' '}
                  {formatSeconds(level.unlock?.maxAvgMs ?? null)}
                  {status.missing.correct > 0 && ` — faltam ${status.missing.correct} acertos`}
                  {status.missing.correct === 0 &&
                    status.missing.avgMs !== null &&
                    ` — sua media esta em ${formatSeconds(status.missing.avgMs)}`}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <button type="button" className="btn btn-ghost" onClick={() => setScreen('estatisticas')}>
        Ver minhas estatisticas
      </button>
    </main>
  )
}

function QuizSession({
  levelId,
  onFinish,
  onQuit,
}: {
  levelId: string
  onFinish: (answers: SessionAnswer[]) => void
  onQuit: () => void
}) {
  const answerGame = useApp((s) => s.answerGame)
  const pizinhoEnabled = useApp((s) => s.settings.pizinhoEnabled)

  const [question, setQuestion] = useState<TabuadaQuestion>(() => drawQuestion(levelId))
  const [typed, setTyped] = useState('')
  const [answers, setAnswers] = useState<SessionAnswer[]>([])
  const [feedback, setFeedback] = useState<{ correct: boolean; mood: PizinhoMood; message: string } | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const shownAt = useRef(0)

  /*
   * Cronometro da pergunta atual; congela enquanto o feedback esta na tela.
   * O inicio e marcado aqui, e nao no render nem no clique de "proxima": o tempo tem que
   * contar a partir do momento em que a pergunta aparece de fato na tela.
   */
  useEffect(() => {
    if (feedback) return
    shownAt.current = Date.now()
    const timer = setInterval(() => setElapsed(Date.now() - shownAt.current), 100)
    return () => clearInterval(timer)
  }, [feedback, question.id])

  const submit = async () => {
    if (feedback || !typed.length) return
    const elapsedMs = Date.now() - shownAt.current
    const correct = Number(typed) === question.answer

    await answerGame({
      moduleId: MODULE_ID,
      levelId,
      questionId: question.id,
      tag: question.tag,
      correct,
      elapsedMs,
    })

    setAnswers((current) => [...current, { question, correct, elapsedMs }])
    setFeedback({
      correct,
      mood: correct ? 'festa' : 'apoio',
      message: correct
        ? `Certo em ${formatSeconds(elapsedMs)}!`
        : `${question.label} = ${question.answer}. Vamos de novo na proxima!`,
    })
  }

  const next = () => {
    const done = [...answers]
    if (done.length >= SESSION_SIZE) {
      onFinish(done)
      return
    }
    setQuestion(drawQuestion(levelId, question.id))
    setTyped('')
    setFeedback(null)
    // zerado aqui, no evento que troca a pergunta, para nao piscar o tempo da anterior
    setElapsed(0)
  }

  return (
    <main className="screen">
      <header className="topbar">
        <button type="button" className="link-quiet link-button" onClick={onQuit}>
          Sair
        </button>
        <span className="quiz-counter">
          {Math.min(answers.length + 1, SESSION_SIZE)}/{SESSION_SIZE}
        </span>
        <span className="quiz-timer">{formatSeconds(feedback ? answers.at(-1)!.elapsedMs : elapsed)}</span>
      </header>

      <section className="quiz">
        <p className="quiz-question">{question.label}</p>
        <p className={`quiz-answer ${feedback ? (feedback.correct ? 'quiz-ok' : 'quiz-bad') : ''}`}>
          {typed || '?'}
        </p>
        <NumberPad value={typed} onChange={setTyped} onSubmit={() => void submit()} disabled={Boolean(feedback)} />
      </section>

      {pizinhoEnabled && feedback && <Pizinho mood={feedback.mood} message={feedback.message} size={56} />}

      <footer className="exercise-footer">
        {feedback && (
          <button type="button" className="btn btn-primary" onClick={next} autoFocus>
            {answers.length >= SESSION_SIZE ? 'Ver resultado' : 'Proxima'}
          </button>
        )}
      </footer>
    </main>
  )
}

function SessionSummary({
  answers,
  onAgain,
  onMenu,
}: {
  answers: SessionAnswer[]
  onAgain: () => void
  onMenu: () => void
}) {
  const correct = answers.filter((a) => a.correct)
  const avgMs = correct.length ? correct.reduce((sum, a) => sum + a.elapsedMs, 0) / correct.length : null
  const slowest = [...correct].sort((a, b) => b.elapsedMs - a.elapsedMs)[0]

  return (
    <main className="screen screen-center">
      <Pizinho
        mood={correct.length === answers.length ? 'festa' : 'neutro'}
        message={
          correct.length === answers.length
            ? 'Rodada perfeita! Nenhum erro.'
            : `Voce acertou ${correct.length} de ${answers.length}.`
        }
        size={96}
      />

      <div className="kpi-row kpi-row-lg">
        <span>
          <strong>{formatSeconds(avgMs)}</strong> de media
        </span>
        <span>
          <strong>{formatPercent(answers.length ? correct.length / answers.length : null)}</strong> de acerto
        </span>
      </div>

      {slowest && (
        <p className="muted small">
          A que mais demorou: {slowest.question.label} ({formatSeconds(slowest.elapsedMs)})
        </p>
      )}

      <ul className="answer-list">
        {answers.map((answer, index) => (
          <li key={index} className={answer.correct ? 'answer-ok' : 'answer-bad'}>
            <span>
              {answer.question.label} = {answer.question.answer}
            </span>
            <span>{formatSeconds(answer.elapsedMs)}</span>
          </li>
        ))}
      </ul>

      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onMenu}>
          Voltar
        </button>
        <button type="button" className="btn btn-primary" onClick={onAgain}>
          Jogar de novo
        </button>
      </div>
    </main>
  )
}
