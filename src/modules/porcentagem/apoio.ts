import type { MaterialApoio } from '../shared/apoio'

export const porcentagemApoio: MaterialApoio[] = [
  {
    stageId: 'etapa-1',
    titulo: 'Porcentagens simples e a ponte com frações',
    resumo: 'Por cento significa, literalmente, "de cada cem".',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'A origem da palavra',
        corpo: 'Por cento vem do latim per centum: por cada cem. A porcentagem foi adotada no comércio ' +
          'porque comparar partes fica fácil quando todas são medidas sobre o mesmo total de 100 — ' +
          'seja o total 40 figurinhas ou 40 mil reais.\n\n' +
          'Por isso a grade de cem quadradinhos é a imagem certa: 25% é simplesmente 25 dos 100 ' +
          'quadradinhos pintados. Não há regra nova para decorar, só um inteiro sempre dividido em cem.',
      },
      {
        tipo: 'texto',
        titulo: 'Fração, decimal e porcentagem',
        corpo: 'Cada porcentagem simples tem uma fração gêmea: 50% é 1/2, 25% é 1/4, 10% é 1/10, 75% é 3/4. ' +
          'Quem já passou pelo módulo de Frações não está aprendendo um assunto novo — está trocando a ' +
          'notação de algo que já sabe.',
      },
      {
        tipo: 'video',
        titulo: 'Introdução a porcentagem',
        fonteId: 'khan',
        url: 'https://pt.khanacademy.org/search?page_search_query=introdu%C3%A7%C3%A3o%20a%20porcentagem',
        motivo: 'Liga porcentagem, fração e decimal na mesma tela, reforçando a equivalência.',
      },
      {
        tipo: 'citacao',
        corpo: 'A associação entre a representação fracionária, a decimal e a percentual de um mesmo número ' +
          'racional é habilidade prevista a partir do 5º ano.',
        fonteId: 'bncc',
        url: 'https://basenacionalcomum.mec.gov.br/abase/',
      },
    ],
  },
  {
    stageId: 'etapa-2',
    titulo: 'Porcentagem de uma quantidade',
    resumo: 'Como calcular de cabeça, sem regra de três.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'Os três apoios do cálculo mental',
        corpo: 'Três porcentagens abrem quase todas as outras: 10% (divide por 10), 50% (metade) e 1% ' +
          '(divide por 100). Com elas, monta-se o resto por soma: 20% é o dobro de 10%; 15% é 10% mais ' +
          'metade de 10%; 70% é sete vezes 10%.\n\n' +
          'Esse caminho é mais rápido e mais transparente que a regra de três, e deixa a criança ' +
          'estimar antes de calcular — o que ajuda a perceber resposta absurda.',
      },
      {
        tipo: 'video',
        titulo: 'Cálculo de porcentagem de um número',
        fonteId: 'khan',
        url: 'https://pt.khanacademy.org/search?page_search_query=porcentagem%20de%20um%20n%C3%BAmero',
        motivo: 'Resolve vários exemplos seguidos, bom para ver o padrão do procedimento.',
      },
    ],
  },
  {
    stageId: 'etapa-3',
    titulo: 'Acréscimos e descontos',
    resumo: 'Onde a porcentagem encontra o dinheiro — e onde a intuição falha.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'Desconto e aumento',
        corpo: 'Um desconto de 10% em 80 reais significa calcular 10% (8 reais) e tirar do preço: paga-se 72. ' +
          'Um aumento de 25% em 200 é calcular 50 e somar: 250. O erro comum é confundir o valor do ' +
          'desconto com o valor a pagar.',
      },
      {
        tipo: 'texto',
        titulo: 'A pegadinha que vale a vida inteira',
        corpo: 'Subir 10% e depois cair 10% Não volta ao preço original. Um produto de 100 reais sobe para ' +
          '110; a queda de 10% é calculada sobre 110, não sobre 100, e tira 11 — sobra 99.\n\n' +
          'A razão é que a porcentagem sempre se refere a um total, e esse total mudou no meio do ' +
          'caminho. Entender isso é o que separa quem lê uma promoção de quem acredita nela.',
      },
      {
        tipo: 'video',
        titulo: 'Aumentos e descontos sucessivos',
        fonteId: 'khan',
        url: 'https://pt.khanacademy.org/search?page_search_query=aumento%20e%20desconto%20percentual',
        motivo: 'Trata justamente o caso dos percentuais sucessivos, com exemplos de preço.',
      },
    ],
  },
]
