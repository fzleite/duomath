import { Link } from 'react-router-dom'

import { PizinhoFace } from '../components/Pizinho'

/**
 * Pagina Sobre: dedicatoria, alinhamento curricular e as fontes consultadas.
 *
 * A dedicatoria sai sem sobrenome de proposito — o site e publico e indexavel, e nomes de
 * crianca ligados a um sobrenome real nao precisam disso para a homenagem funcionar.
 */

const FONTES: { titulo: string; url: string }[] = [
  { titulo: 'Base Nacional Comum Curricular — MEC', url: 'https://basenacionalcomum.mec.gov.br/abase/' },
  { titulo: 'Habilidades da BNCC — Tudo Sala de Aula', url: 'https://www.tudosaladeaula.com/habilidades-da-bncc/' },
  {
    titulo: 'Habilidades de Matematica do 4o ao 9o ano — Tudo Sala de Aula',
    url: 'https://www.tudosaladeaula.com/2019/04/habilidades-da-bncc-de-matematica-do-4-ano-do-ensino-fundamental/',
  },
  { titulo: 'Matematica por ano (6o ao 9o) — Matematica e Vida', url: 'https://matematicaevida.com.br/6-ano-matematica-bncc/' },
  {
    titulo: 'Habilidades essenciais, Anos Finais — SEDU-ES',
    url: 'https://efape.educacao.sp.gov.br/curriculopaulista/wp-content/uploads/download/habilidades-essenciais-anos-finais%202021/Habilidades%20essenciais%20_%20Anos%20Finais_Matem%C3%A1tica.pdf',
  },
  {
    titulo: 'Mapa de progressao das habilidades, Matematica EF — SEDU-ES',
    url: 'https://curriculo.sedu.es.gov.br/curriculo/wp-content/uploads/2021/10/MAPA-DE-PROGRESSAO-DAS-HABILIDADES-MATEMATICA-EF.pdf',
  },
  {
    titulo: 'Dos PCNs para a BNCC em Matematica — Nova Escola',
    url: 'https://novaescola.org.br/bncc/conteudo/33/compare-as-mudancas-dos-pcns-para-a-bncc-em-matematica',
  },
  {
    titulo: 'Habilidades essenciais, Anos Iniciais — SEDU-ES',
    url: 'https://efape.educacao.sp.gov.br/curriculopaulista/wp-content/uploads/downloads/Anos%20iniciais%20EM/Habilidades%20essenciais_Anos%20Iniciais_Matem%C3%A1tica.pdf',
  },
]

export function Sobre() {
  return (
    <main className="screen">
      <section className="card sobre-card">
        <div className="sobre-head">
          <PizinhoFace mood="festa" size={72} />
          <h1>DuoMath</h1>
        </div>

        <p>
          O DuoMath foi idealizado por Fernando como uma ferramenta para acompanhar e apoiar o
          aprendizado de matematica de suas duas filhas, com carinho e dedicacao.
        </p>

        <p className="sobre-dedicatoria">
          Dedicado a Isabella e Helena: que cada grafico, cada exercicio e cada conquista aqui
          dentro sirva de incentivo para que continuem curiosas e confiantes diante dos numeros.
        </p>
      </section>

      <section className="card">
        <h2>BNCC</h2>
        <p className="muted">
          A progressao de etapas de cada modulo foi alinhada as habilidades previstas na Base
          Nacional Comum Curricular para o Ensino Fundamental, do 1o ao 9o ano, cobrindo as
          unidades tematicas de Numeros, Algebra, Geometria, Grandezas e Medidas, e Probabilidade
          e Estatistica.
        </p>
        <p className="muted">
          Conceitos de Ensino Medio — logaritmo, vetores, matrizes, progressoes e o ciclo
          trigonometrico completo — foram identificados como fora do Ensino Fundamental e ficam
          como roadmap de longo prazo.
        </p>
      </section>

      <section className="card">
        <h2>Fontes consultadas</h2>
        <ul className="fonte-list">
          {FONTES.map((fonte) => (
            <li key={fonte.url}>
              <a href={fonte.url} target="_blank" rel="noreferrer noopener">
                {fonte.titulo}
              </a>
            </li>
          ))}
        </ul>
        <p className="muted small">
          Consultadas em setembro de 2026, refletindo a versao da BNCC vigente naquele momento.
          Vale revisar se a base curricular for atualizada.
        </p>
      </section>

      <Link className="link-quiet" to="/">
        Voltar para o inicio
      </Link>
    </main>
  )
}
