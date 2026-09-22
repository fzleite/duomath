/**
 * Material de apoio por etapa: explicacao do conceito, com video e citacao INTERCALADOS no
 * texto (nao em secao separada), como o spec pede.
 *
 * Regra de proveniencia: todo link precisa vir de uma fonte da lista de confiaveis abaixo, e o
 * `check:content` reprova qualquer bloco que aponte para fora dela. A curadoria e manual — quem
 * aprova uma fonte nova edita `FONTES_CONFIAVEIS`, e nada mais no app precisa mudar.
 */

export interface FonteConfiavel {
  id: string
  nome: string
  /** Dominio que a URL do bloco precisa ter. */
  dominio: string
  tipo: 'oficial' | 'instituicao' | 'canal'
  /** Por que esta fonte e confiavel — fica visivel ao responsavel na tela do material. */
  nota: string
}

/**
 * Fontes aprovadas. `oficial` = orgao publico de educacao; `instituicao` = entidade de ensino
 * ou projeto academico reconhecido; `canal` = canal educativo (o spec cita o Manual do Mundo
 * como exemplo do tipo de canal aceitavel).
 *
 * Fernando pretende consultar a professora da filha para indicar canais que cubram os temas de
 * forma consistente. Quando isso acontecer, o caminho e acrescentar a fonte aqui e trocar os
 * links de busca por links diretos dos videos escolhidos.
 */
export const FONTES_CONFIAVEIS: FonteConfiavel[] = [
  {
    id: 'bncc',
    nome: 'BNCC — Ministério da Educação',
    dominio: 'basenacionalcomum.mec.gov.br',
    tipo: 'oficial',
    nota: 'Texto oficial da Base Nacional Comum Curricular.',
  },
  {
    id: 'mec',
    nome: 'Ministério da Educação',
    dominio: 'www.gov.br',
    tipo: 'oficial',
    nota: 'Portal oficial do governo federal.',
  },
  {
    id: 'sedu-es',
    nome: 'Currículo e Mapa de Progressão — SEDU-ES',
    dominio: 'curriculo.sedu.es.gov.br',
    tipo: 'oficial',
    nota: 'Secretaria de Educação do Espírito Santo: mapa de progressão das habilidades.',
  },
  {
    id: 'efape',
    nome: 'EFAPE / Currículo Paulista',
    dominio: 'efape.educacao.sp.gov.br',
    tipo: 'oficial',
    nota: 'Escola de Formação da Secretaria de Educação de São Paulo.',
  },
  {
    id: 'nova-escola',
    nome: 'Nova Escola',
    dominio: 'novaescola.org.br',
    tipo: 'instituicao',
    nota: 'Planos de aula alinhados a BNCC, revisados por especialistas.',
  },
  {
    id: 'khan',
    nome: 'Khan Academy Brasil',
    dominio: 'pt.khanacademy.org',
    tipo: 'instituicao',
    nota: 'Organização sem fins lucrativos, conteúdo de matemática por ano escolar.',
  },
  {
    id: 'm3-unicamp',
    nome: 'Matemática Multimídia — Unicamp',
    dominio: 'm3.ime.unicamp.br',
    tipo: 'instituicao',
    nota: 'Acervo de recursos educacionais do IMECC/Unicamp.',
  },
  {
    id: 'obmep',
    nome: 'OBMEP / IMPA',
    dominio: 'obmep.org.br',
    tipo: 'instituicao',
    nota: 'Olimpíada Brasileira de Matemática das Escolas Públicas.',
  },
  {
    id: 'manual-do-mundo',
    nome: 'Manual do Mundo',
    dominio: 'www.youtube.com',
    tipo: 'canal',
    nota: 'Canal educativo citado no próprio spec como exemplo de fonte aceitavel.',
  },
]

export function fonteDe(id: string): FonteConfiavel | undefined {
  return FONTES_CONFIAVEIS.find((fonte) => fonte.id === id)
}

/** Paragrafo de explicacao. O primeiro bloco de um material e sempre um destes. */
export interface BlocoTexto {
  tipo: 'texto'
  titulo?: string
  corpo: string
}

/**
 * Sugestao de video, posicionada no ponto do texto em que faz sentido.
 *
 * `url` aponta para a busca do tema dentro do canal/site confiavel, e nao para um video
 * especifico: um id de video inventado seria informacao falsa, e link direto sem curadoria
 * humana envelhece mal. A troca por link direto e o passo manual previsto no spec.
 */
export interface BlocoVideo {
  tipo: 'video'
  titulo: string
  /** Id de uma fonte de FONTES_CONFIAVEIS. */
  fonteId: string
  url: string
  /** Por que este video entra aqui (ex: traz outra abordagem do mesmo conceito). */
  motivo: string
}

/** Trecho de material de referencia, com a fonte sempre visivel. */
export interface BlocoCitacao {
  tipo: 'citacao'
  corpo: string
  fonteId: string
  url: string
}

export type BlocoApoio = BlocoTexto | BlocoVideo | BlocoCitacao

export interface MaterialApoio {
  /** Etapa a que o material pertence — casa com `Stage.id`. */
  stageId: string
  titulo: string
  /** Uma linha: o que a crianca vai entender depois de ler. */
  resumo: string
  /** Ordem de leitura; videos e citacoes ficam intercalados entre os paragrafos. */
  blocos: BlocoApoio[]
}
