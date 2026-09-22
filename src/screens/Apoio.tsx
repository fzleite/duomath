import { Link, Navigate, useParams } from 'react-router-dom'

import { PizinhoFace } from '../components/Pizinho'
import { getContentModule } from '../modules/registry'
import { fonteDe, type BlocoApoio, type MaterialApoio } from '../modules/shared/apoio'

/**
 * Material de apoio: acessivel por dentro do exercício e, principalmente, por fora dele —
 * pela sub-opcao "Material de apoio" no menu por assunto. Da para abrir, voltar e revisar os
 * conceitos sem estar respondendo nada, que e o que o spec pede explicitamente.
 */

/** Lista dos materiais de um modulo: a porta de entrada da consulta independente. */
export function ApoioModulo() {
  const { moduleId } = useParams()
  const module = getContentModule(moduleId)

  if (!module) return <Navigate to="/" replace />

  const materiais = module.apoio ?? []

  return (
    <main className="screen">
      <header className="topbar">
        <Link className="link-quiet" to={`/modulo/${module.id}`}>
          Ir aos exercícios
        </Link>
        <strong>{module.title} · material de apoio</strong>
      </header>

      {materiais.length === 0 ? (
        <p className="muted">Material em preparação para este módulo.</p>
      ) : (
        <ol className="apoio-lista">
          {materiais.map((material, index) => {
            const stage = module.stages.find((s: { id: string }) => s.id === material.stageId)
            return (
              <li key={material.stageId}>
                <Link className="apoio-item" to={`/apoio/${module.id}/${material.stageId}`}>
                  <span className="apoio-num">{index + 1}</span>
                  <span className="stage-body">
                    <strong>{material.titulo}</strong>
                    <small>{stage?.curriculum}</small>
                    <span className="stage-kpi">{material.resumo}</span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>
      )}
    </main>
  )
}

/** O material de uma etapa. */
export function ApoioEtapa() {
  const { moduleId, stageId } = useParams()
  const module = getContentModule(moduleId)
  const material = module?.apoio?.find((m: MaterialApoio) => m.stageId === stageId)

  if (!module || !material) return <Navigate to="/" replace />

  const temExercicios =
    (module.stages.find((s: { id: string }) => s.id === stageId)?.exercises.length ?? 0) > 0

  return (
    <main className="screen">
      <header className="topbar">
        <Link className="link-quiet" to={`/apoio/${module.id}`}>
          Voltar
        </Link>
        <strong>{module.title}</strong>
      </header>

      <article className="apoio">
        <header className="apoio-head">
          <PizinhoFace mood="dica" size={48} />
          <div>
            <h1>{material.titulo}</h1>
            <p className="muted">{material.resumo}</p>
          </div>
        </header>

        {material.blocos.map((bloco, index) => (
          <Bloco key={index} bloco={bloco} />
        ))}
      </article>

      {temExercicios && (
        <Link className="btn btn-primary apoio-cta" to={`/modulo/${module.id}/${material.stageId}`}>
          Fazer os exercícios desta etapa
        </Link>
      )}
    </main>
  )
}

function Bloco({ bloco }: { bloco: BlocoApoio }) {
  if (bloco.tipo === 'texto') {
    return (
      <section className="apoio-texto">
        {bloco.titulo && <h2>{bloco.titulo}</h2>}
        {bloco.corpo.split('\n\n').map((paragrafo, index) => (
          <p key={index}>{paragrafo}</p>
        ))}
      </section>
    )
  }

  const fonte = fonteDe(bloco.fonteId)

  if (bloco.tipo === 'video') {
    return (
      <aside className="apoio-video">
        <span className="apoio-tag">video</span>
        <strong>{bloco.titulo}</strong>
        <p className="muted small">{bloco.motivo}</p>
        <a href={bloco.url} target="_blank" rel="noreferrer noopener">
          Abrir em {fonte?.nome ?? bloco.fonteId}
        </a>
        {fonte && <p className="apoio-fonte">{fonte.nota}</p>}
      </aside>
    )
  }

  return (
    <blockquote className="apoio-citacao">
      <p>{bloco.corpo}</p>
      <footer>
        <a href={bloco.url} target="_blank" rel="noreferrer noopener">
          {fonte?.nome ?? bloco.fonteId}
        </a>
      </footer>
    </blockquote>
  )
}
