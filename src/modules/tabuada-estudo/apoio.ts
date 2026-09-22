import type { MaterialApoio } from '../shared/apoio'

export const tabuadaEstudoApoio: MaterialApoio[] = [
  {
    stageId: 'etapa-1',
    titulo: 'Multiplicação como soma de parcelas iguais',
    resumo: 'Multiplicar e um atalho para somar várias vezes o mesmo número.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'Por que a multiplicação existe',
        corpo: 'Multiplicar não e uma operação nova: é uma forma curta de escrever uma soma repetida. ' +
          '3 vezes 4 é o mesmo que 4 mais 4 mais 4. A multiplicação foi criada porque somar dez vezes ' +
          'o mesmo número e trabalhoso e da erro.\n\n' +
          'O arranjo retangular — fileiras de pontos — e a melhor imagem disso: conta-se uma fileira e ' +
          'repete-se. Ele também prepara área, que é o mesmo desenho com outro nome.',
      },
      {
        tipo: 'texto',
        titulo: 'Decorar depois, entender antes',
        corpo: 'A tabuada memorizada e útil, mas só depois que a criança sabe reconstruir o resultado. Quem ' +
          'entende que 6 vezes 7 e "seis grupos de sete" pode recuperar o valor esquecido; quem só ' +
          'decorou fica travado.',
      },
      {
        tipo: 'video',
        titulo: 'Multiplicação como adição de parcelas iguais',
        fonteId: 'khan',
        url: 'https://pt.khanacademy.org/search?page_search_query=multiplica%C3%A7%C3%A3o%20como%20adi%C3%A7%C3%A3o%20repetida',
        motivo: 'Constrói o arranjo retangular na tela, com narração do passo a passo.',
      },
    ],
  },
  {
    stageId: 'etapa-2',
    titulo: 'Memória das tabuadas de 1 a 10',
    resumo: 'Estratégias que substituem a força da memória.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'Atalhos que funcionam',
        corpo: 'Cada tabuada tem um truque. Por 10, acrescenta-se um zero. Por 9, faz-se a de 10 e tira-se ' +
          'uma vez o número (10 vezes 6 dá 60, menos 6 dá 54). Por 4, dobra-se duas vezes. Por 5, ' +
          'metade da tabuada do 10.\n\n' +
          'Esses atalhos importam mais que a repetição: eles transformam a tabuada numa rede de ' +
          'relacoes, e quem esquece um resultado chega nele por outro caminho.',
      },
      {
        tipo: 'texto',
        titulo: 'Velocidade e consequência, não objetivo',
        corpo: 'O treino cronometrado do DuoMath existe para automatizar o que já foi entendido. Se a criança ' +
          'estiver contando nos dedos, o caminho e voltar ao arranjo visual, e não apertar o tempo.',
      },
      {
        tipo: 'video',
        titulo: 'Padrões e truques da tabuada',
        fonteId: 'manual-do-mundo',
        url: 'https://www.youtube.com/@ManualdoMundo/search?query=tabuada',
        motivo: 'Aborda os truques de forma lúdica, com experimentos — outro formato do mesmo conteúdo.',
      },
    ],
  },
  {
    stageId: 'etapa-3',
    titulo: 'Problemas, padrões e tabuadas maiores',
    resumo: 'Comutatividade e decomposição: como chegar longe sem decorar mais.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'A ordem dos fatores',
        corpo: 'Trocar a ordem não muda o resultado: 6 vezes 8 e 8 vezes 6. No arranjo retangular isso fica ' +
          'óbvio — é a mesma figura vista de lado. A consequência prática e grande: a tabuada que ' +
          'parecia ter cem resultados tem, na verdade, quase metade disso.',
      },
      {
        tipo: 'texto',
        titulo: 'Quebrar para conquistar',
        corpo: 'Para multiplicar números maiores, decompõe-se: 15 vezes 6 e (10 vezes 6) mais (5 vezes 6), ' +
          'ou seja 60 mais 30. Essa propriedade — a distributiva — é a mesma que sustenta a conta ' +
          'armada e, mais tarde, a multiplicação de expressões algébricas.',
      },
      {
        tipo: 'video',
        titulo: 'Propriedade distributiva na multiplicação',
        fonteId: 'khan',
        url: 'https://pt.khanacademy.org/search?page_search_query=propriedade%20distributiva%20multiplica%C3%A7%C3%A3o',
        motivo: 'Mostra a decomposição em dezenas e unidades com apoio visual.',
      },
    ],
  },
]
