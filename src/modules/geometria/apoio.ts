import type { MaterialApoio } from '../shared/apoio'

export const geometriaApoio: MaterialApoio[] = [
  {
    stageId: 'etapa-1',
    titulo: 'Polígonos e pontos no plano cartesiano',
    resumo: 'Nomear as formas pelo que elas têm, não pela aparência.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'Polígono: muitos ângulos',
        corpo: 'Polígono vem do grego poly (muitos) e gonia (ângulo). O nome de cada um diz o número de ' +
          'lados: triângulo, quadrilátero, pentágono, hexágono. Num polígono, o número de lados, de ' +
          'vértices e de ângulos é sempre o mesmo.\n\n' +
          'Regular é o polígono em que todos os lados e todos os ângulos são iguais. Um retângulo ' +
          'comprido tem ângulos iguais mas lados diferentes — não é regular.',
      },
      {
        tipo: 'texto',
        titulo: 'Localizar com dois números',
        corpo: 'No plano cartesiano, o par ordenado (3, 2) significa andar 3 na horizontal e 2 na vertical. ' +
          'A ordem importa: (3, 2) e (2, 3) são pontos diferentes. Marcar os vértices de um polígono no ' +
          'plano é o começo da geometria analítica.',
      },
      {
        tipo: 'video',
        titulo: 'Polígonos e coordenadas no plano',
        fonteId: 'khan',
        url: 'https://pt.khanacademy.org/search?page_search_query=pol%C3%ADgonos%20plano%20cartesiano',
        motivo: 'Marca pontos e constrói figuras no plano, reforçando a ordem do par.',
      },
    ],
  },
  {
    stageId: 'etapa-2',
    titulo: 'Vértices, faces e arestas de prismas e pirâmides',
    resumo: 'Contar em três dimensões, com uma regra que nunca falha.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'Prisma e pirâmide',
        corpo: 'O prisma tem duas bases iguais e paralelas, ligadas por faces laterais. A pirâmide tem uma ' +
          'base e um vértice no topo, para onde todas as faces laterais convergem.\n\n' +
          'Isso dá regras diretas a partir do número de lados da base. Num prisma de base com n lados: ' +
          '2n vértices, n + 2 faces e 3n arestas. Numa pirâmide: n + 1 vértices, n + 1 faces e ' +
          '2n arestas.',
      },
      {
        tipo: 'texto',
        titulo: 'A relação de Euler',
        corpo: 'Em qualquer poliedro convexo, vértices menos arestas mais faces dá sempre 2. Vale para o ' +
          'cubo (8 - 12 + 6), para a pirâmide de base quadrada (5 - 8 + 5) e para todos os outros. É ' +
          'uma das relações mais elegantes da geometria, descoberta por Leonhard Euler no século XVIII, ' +
          'e serve como conferência: se a conta não dá 2, alguma contagem está errada.',
      },
      {
        tipo: 'video',
        titulo: 'Poliedros: vértices, faces e arestas',
        fonteId: 'khan',
        url: 'https://pt.khanacademy.org/search?page_search_query=poliedros%20v%C3%A9rtices%20faces%20arestas',
        motivo: 'Gira os sólidos na tela, o que ajuda a contar o que o desenho estático esconde.',
      },
    ],
  },
  {
    stageId: 'etapa-3',
    titulo: 'Ângulos em retas paralelas cortadas por transversal',
    resumo: 'O paralelismo é o que garante as igualdades.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'Os nomes dos ângulos',
        corpo: 'Quando uma transversal corta duas paralelas, formam-se oito ângulos, e eles se organizam em ' +
          'pares com nomes próprios. Correspondentes ocupam a mesma posição nas duas retas e são ' +
          'iguais. Alternos internos ficam em lados opostos da transversal, entre as paralelas, e ' +
          'também são iguais. Colaterais internos ficam do mesmo lado, entre as paralelas, e somam 180 ' +
          'graus.\n\n' +
          'A regra prática: ou o ângulo é igual ao dado, ou é o seu suplementar. Não existe terceira ' +
          'possibilidade.',
      },
      {
        tipo: 'texto',
        titulo: 'Verificar antes de demonstrar',
        corpo: 'A BNCC pede primeiro verificar essas relações (medindo, observando) e só depois demonstrá-las. ' +
          'Faz diferença: a criança que mediu e viu a igualdade acredita na demonstração; a que só ' +
          'recebeu a regra decora.',
      },
      {
        tipo: 'video',
        titulo: 'Ângulos entre paralelas e transversal',
        fonteId: 'khan',
        url: 'https://pt.khanacademy.org/search?page_search_query=%C3%A2ngulos%20retas%20paralelas%20transversal',
        motivo: 'Move a transversal e mostra os pares se mantendo iguais — o que um desenho fixo não faz.',
      },
    ],
  },
  {
    stageId: 'etapa-4',
    titulo: 'Construções geométricas',
    resumo: 'Régua e compasso: construir em vez de medir.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'Por que construir sem medir',
        corpo: 'A geometria grega construía figuras apenas com régua não graduada e compasso. A razão não é ' +
          'nostalgia: uma construção garante a propriedade exatamente, enquanto uma medida sempre tem ' +
          'erro. A mediatriz construída com dois arcos de mesma abertura passa exatamente pelo meio do ' +
          'segmento — não "aproximadamente no meio".\n\n' +
          'Mediatriz é o conjunto dos pontos que ficam à mesma distância de duas pontas, e cruza o ' +
          'segmento formando ângulo reto. Bissetriz divide um ângulo em duas partes iguais.',
      },
      {
        tipo: 'texto',
        titulo: 'De onde saem os ângulos notáveis',
        corpo: 'O triângulo equilátero se constrói com dois arcos e entrega o ângulo de 60 graus. A bissetriz ' +
          'desse ângulo dá 30; a bissetriz do ângulo reto dá 45. Assim, sem transferidor, chega-se aos ' +
          'ângulos que a trigonometria vai usar depois.',
      },
      {
        tipo: 'video',
        titulo: 'Construções com régua e compasso',
        fonteId: 'm3-unicamp',
        url: 'https://m3.ime.unicamp.br/',
        motivo: 'Acervo do IMECC/Unicamp com recursos de geometria dinâmica para construções.',
      },
    ],
  },
  {
    stageId: 'etapa-5',
    titulo: 'Semelhança de triângulos',
    resumo: 'Mesma forma, tamanho diferente — e o que isso permite medir.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'O critério que basta',
        corpo: 'Dois triângulos são semelhantes quando têm os mesmos ângulos e os lados proporcionais. Na ' +
          'prática, basta verificar dois ângulos iguais: como a soma dos três é sempre 180 graus, o ' +
          'terceiro fica igual automaticamente.\n\n' +
          'A razão de semelhança é o número que multiplica todos os lados. Um detalhe que engana: se a ' +
          'razão entre lados é 3, a razão entre áreas é 9 — porque área tem duas dimensões.',
      },
      {
        tipo: 'texto',
        titulo: 'Medir o que não se alcança',
        corpo: 'A semelhança é o que permite descobrir a altura de um poste pela sombra, ou a largura de um ' +
          'rio sem atravessá-lo. Conta a lenda que Tales de Mileto mediu a altura da pirâmide de Quéops ' +
          'assim, comparando sua sombra com a de um bastão.',
      },
      {
        tipo: 'video',
        titulo: 'Semelhança de triângulos e aplicações',
        fonteId: 'khan',
        url: 'https://pt.khanacademy.org/search?page_search_query=semelhan%C3%A7a%20de%20tri%C3%A2ngulos',
        motivo: 'Resolve problemas de sombra e altura, o uso mais concreto do conceito.',
      },
    ],
  },
  {
    stageId: 'etapa-6',
    titulo: 'Seno, cosseno e tangente no triângulo retângulo',
    resumo: 'Três razões que transformam ângulo em comprimento.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'Por que as razões existem',
        corpo: 'Em triângulos retângulos semelhantes, a razão entre dois lados depende apenas do ângulo — ' +
          'não do tamanho do triângulo. É esse fato que dá sentido à trigonometria: para cada ângulo, ' +
          'existe um número fixo chamado seno (cateto oposto sobre hipotenusa), outro chamado cosseno ' +
          '(cateto adjacente sobre hipotenusa) e outro chamado tangente (oposto sobre adjacente).\n\n' +
          'A palavra seno vem de uma tradução: o termo sânscrito para "meia corda" passou ao árabe e, ' +
          'depois, ao latim sinus. O nome é acidente histórico; a ideia é a razão.',
      },
      {
        tipo: 'texto',
        titulo: 'O que observar no círculo',
        corpo: 'Movendo o ângulo no círculo, três coisas ficam visíveis: em 45 graus, seno e cosseno se ' +
          'igualam (os catetos ficam do mesmo tamanho); em 30 graus, o seno vale exatamente 0,5; e ' +
          'quando o ângulo chega a 90 graus, o cosseno vai a zero e a tangente deixa de existir, porque ' +
          'a divisão por zero não é definida.',
      },
      {
        tipo: 'video',
        titulo: 'Razões trigonométricas no triângulo retângulo',
        fonteId: 'khan',
        url: 'https://pt.khanacademy.org/search?page_search_query=seno%20cosseno%20tangente%20tri%C3%A2ngulo%20ret%C3%A2ngulo',
        motivo: 'Aplica as três razões em problemas de rampa e escada, com os passos completos.',
      },
    ],
  },
]
