import type { MaterialApoio } from '../shared/apoio'

export const grandezasApoio: MaterialApoio[] = [
  {
    stageId: 'etapa-1',
    titulo: 'Comprimento, massa, capacidade e tempo',
    resumo: 'Medir é comparar com uma unidade combinada.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'Por que as unidades foram padronizadas',
        corpo: 'Antes do sistema métrico, cada região media com o próprio pé, o próprio passo, o próprio ' +
          'punhado. Comerciar assim era confuso e injusto. O metro foi definido para que a medida ' +
          'fosse a mesma em qualquer lugar — e todas as outras unidades derivam dele por potências ' +
          'de dez.\n\n' +
          'Daí os prefixos: centi é a centésima parte (100 cm em 1 m) e quilo é mil vezes ' +
          '(1000 g em 1 kg). Quem entende o prefixo não precisa decorar tabela de conversão.',
      },
      {
        tipo: 'texto',
        titulo: 'Tempo é a exceção',
        corpo: 'Tempo não segue a base dez: 60 segundos no minuto, 60 minutos na hora. É por isso que ' +
          '14h30 mais 1h45 não dá "15h75" — os 75 minutos viram 1 hora e 15 minutos.',
      },
      {
        tipo: 'video',
        titulo: 'Sistema métrico e conversão de unidades',
        fonteId: 'khan',
        url: 'https://pt.khanacademy.org/search?page_search_query=convers%C3%A3o%20de%20unidades%20de%20medida',
        motivo: 'Mostra a conversão como deslocamento da vírgula, um apoio diferente do nosso.',
      },
    ],
  },
  {
    stageId: 'etapa-2',
    titulo: 'Perímetro de figuras planas',
    resumo: 'Perímetro é o caminho em volta da figura.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'A volta da figura',
        corpo: 'Perímetro vem do grego peri (em volta) e metron (medida): literalmente a medida da volta. ' +
          'Somar todos os lados é sempre o caminho seguro, em qualquer figura. As fórmulas (4 vezes o ' +
          'lado no quadrado, 2 vezes base mais 2 vezes altura no retângulo) são apenas atalhos dessa ' +
          'soma.\n\n' +
          'A imagem prática é a cerca: quantos metros de cerca para dar a volta no terreno.',
      },
      {
        tipo: 'texto',
        titulo: 'Perímetro igual não é área igual',
        corpo: 'Duas figuras podem ter o mesmo perímetro e áreas bem diferentes. Um retângulo 1 por 5 e um ' +
          'quadrado 3 por 3 têm perímetro 12, mas áreas 5 e 9. Essa confusão é uma das mais comuns, e ' +
          'vale desfazer aqui, antes de entrar em área.',
      },
      {
        tipo: 'video',
        titulo: 'Perímetro de polígonos',
        fonteId: 'khan',
        url: 'https://pt.khanacademy.org/search?page_search_query=per%C3%ADmetro',
        motivo: 'Refaz o cálculo em figuras irregulares, onde a fórmula não serve.',
      },
    ],
  },
  {
    stageId: 'etapa-3',
    titulo: 'Área de figuras planas',
    resumo: 'Área é quantos quadradinhos cabem dentro.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'Contar quadradinhos',
        corpo: 'Área é a quantidade de unidades de superfície que cobrem a figura. Na grade, basta contar os ' +
          'quadradinhos — e contar uma fileira e repetir é exatamente a multiplicação que a criança já ' +
          'treinou no arranjo retangular da tabuada.\n\n' +
          'O triângulo vem de graça: ele é metade do retângulo de mesma base e mesma altura. Por isso ' +
          'base vezes altura dividido por dois.',
      },
      {
        tipo: 'texto',
        titulo: 'O círculo e o Pizinho',
        corpo: 'A área do círculo usa o número Pi, que é a razão entre a volta do círculo e o seu diâmetro — ' +
          'o mesmo Pi que dá nome ao mascote. É um número que nunca termina, e por isso se usa 3,14 como ' +
          'aproximação.',
      },
      {
        tipo: 'video',
        titulo: 'Área do retângulo, do triângulo e do círculo',
        fonteId: 'khan',
        url: 'https://pt.khanacademy.org/search?page_search_query=%C3%A1rea%20de%20figuras%20planas',
        motivo: 'Deriva cada fórmula a partir do retângulo, mostrando de onde elas vêm.',
      },
    ],
  },
  {
    stageId: 'etapa-4',
    titulo: 'Volume de sólidos simples',
    resumo: 'Volume é quantos cubinhos cabem dentro.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'Da área para o volume',
        corpo: 'Área conta quadradinhos numa superfície; volume conta cubinhos num espaço. Um bloco de ' +
          '5 por 3 por 2 tem uma camada de 15 cubinhos, repetida duas vezes: 30 no total. É a mesma ' +
          'ideia de "contar uma fileira e repetir", agora em três dimensões.',
      },
      {
        tipo: 'texto',
        titulo: 'Dobrar a aresta não dobra o volume',
        corpo: 'Se todas as arestas de um cubo dobram, o volume fica oito vezes maior — porque a duplicação ' +
          'acontece nas três dimensões (2 vezes 2 vezes 2). Essa é a mesma lógica pela qual, na ' +
          'semelhança de triângulos, a razão entre áreas é o quadrado da razão entre lados.',
      },
      {
        tipo: 'video',
        titulo: 'Volume de blocos retangulares',
        fonteId: 'khan',
        url: 'https://pt.khanacademy.org/search?page_search_query=volume%20de%20blocos%20retangulares',
        motivo: 'Monta o bloco camada por camada, o que ajuda quem tem dificuldade com o desenho 3D.',
      },
    ],
  },
  {
    stageId: 'etapa-5',
    titulo: 'Escala e conversão em contextos práticos',
    resumo: 'Escala é a razão entre o desenho e o mundo.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'Como ler uma escala',
        corpo: 'Escala 1:50 significa que cada 1 unidade no desenho corresponde a 50 no real. Para ir do ' +
          'desenho ao mundo, multiplica-se; para ir do mundo ao desenho, divide-se. Mapas, plantas de ' +
          'casa e maquetes usam exatamente isso.\n\n' +
          'O cuidado é com a unidade: 6 cm numa escala 1:50 dão 300 cm, que são 3 metros. Errar a ' +
          'conversão no fim é o deslize mais comum.',
      },
      {
        tipo: 'texto',
        titulo: 'Proporção no dia a dia',
        corpo: 'Ajustar uma receita de 4 para 6 pessoas é o mesmo raciocínio: descobre-se quanto vai por ' +
          'pessoa e multiplica-se pelo novo número. Proporção é o assunto que costura escala, ' +
          'porcentagem e semelhança.',
      },
      {
        tipo: 'video',
        titulo: 'Escala em mapas e plantas',
        fonteId: 'khan',
        url: 'https://pt.khanacademy.org/search?page_search_query=escala%20e%20propor%C3%A7%C3%A3o',
        motivo: 'Aplica a escala em mapas reais, o que ancora o conceito fora da folha de exercício.',
      },
    ],
  },
]
