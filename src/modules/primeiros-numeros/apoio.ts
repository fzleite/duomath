import type { MaterialApoio } from '../shared/apoio'

/**
 * Material de apoio do Modulo 0. Linguagem pensada para o adulto ler junto com a crianca:
 * nesta faixa quem consulta o material normalmente e o responsavel.
 */
export const primeirosNumerosApoio: MaterialApoio[] = [
  {
    stageId: 'etapa-1',
    titulo: 'Contar, ler e comparar números',
    resumo: 'Por que contar de um em um vem antes de qualquer conta.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'De onde vem a ideia de número',
        corpo: 'Antes de somar ou multiplicar, a criança precisa construir a ideia de quantidade: ' +
          'que cada objeto contado corresponde a um número, na ordem, e que o último número dito ' +
          'representa o total do grupo. Isso se chama correspondência um a um, e é a base de tudo ' +
          'o que vem depois.\n\n' +
          'Contar não e recitar números de memória. Uma criança pode saber dizer "um, dois, três..." ' +
          'e ainda não entender que, ao apontar seis bolinhas, o "seis" e a resposta para quantas são.',
      },
      {
        tipo: 'texto',
        titulo: 'A reta numérica como primeiro mapa',
        corpo: 'A reta numérica coloca os números numa ordem visível: quanto mais para a direita, maior. ' +
          'Isso transforma comparar números num gesto — olhar qual esta mais adiante — em vez de uma ' +
          'regra para decorar. E o mesmo desenho volta muito mais tarde, com frações e com números ' +
          'negativos, por isso vale investir nele desde o inicio.',
      },
      {
        tipo: 'video',
        titulo: 'Contagem e comparação de números',
        fonteId: 'khan',
        url: 'https://pt.khanacademy.org/search?page_search_query=contagem%20e%20compara%C3%A7%C3%A3o%20de%20n%C3%BAmeros',
        motivo: 'Traz a mesma ideia com animação e narração, útil para quem aprende melhor ouvindo.',
      },
      {
        tipo: 'citacao',
        corpo: 'A unidade temática Números, no 1º ano, prioriza a contagem, a leitura, a escrita e a ' +
          'comparação de quantidades, sempre apoiadas em material concreto e em representações visuais.',
        fonteId: 'bncc',
        url: 'https://basenacionalcomum.mec.gov.br/abase/',
      },
    ],
  },
  {
    stageId: 'etapa-2',
    titulo: 'Juntar, separar e o valor de cada casa',
    resumo: 'O que muda quando o mesmo algarismo troca de lugar.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'Por que 47 e diferente de 74',
        corpo: 'Nosso sistema de numeração e decimal e posicional: o valor de um algarismo depende da casa ' +
          'em que ele esta. No 47, o 4 não vale quatro, vale quarenta, porque ocupa a casa das dezenas. ' +
          'Essa e a ideia que separa "saber escrever números" de "entender números".\n\n' +
          'Agrupar de dez em dez e o exercício central aqui. Quando a criança vê que dez unidades ' +
          'soltas podem ser trocadas por uma dezena, ela esta construindo a regra que vai usar em ' +
          'toda conta com números grandes.',
      },
      {
        tipo: 'texto',
        titulo: 'O papel do zero',
        corpo: 'O zero não e "nada": ele guarda uma casa vazia. No número 20 não sobrou nenhuma unidade ' +
          'solta, e o zero e o que avisa isso. Sem ele, não daria para distinguir 2 de 20.',
      },
      {
        tipo: 'video',
        titulo: 'Valor posicional: dezenas e unidades',
        fonteId: 'khan',
        url: 'https://pt.khanacademy.org/search?page_search_query=valor%20posicional%20dezenas%20e%20unidades',
        motivo: 'Mostra a troca de dez unidades por uma dezena com material manipulável.',
      },
      {
        tipo: 'citacao',
        corpo: 'Compor e decompor números, reconhecendo o valor posicional dos algarismos no sistema de ' +
          'numeração decimal, é habilidade prevista para os anos iniciais do Ensino Fundamental.',
        fonteId: 'sedu-es',
        url: 'https://curriculo.sedu.es.gov.br/curriculo/wp-content/uploads/2021/10/MAPA-DE-PROGRESSAO-DAS-HABILIDADES-MATEMATICA-EF.pdf',
      },
    ],
  },
  {
    stageId: 'etapa-3',
    titulo: 'Somar e subtrair',
    resumo: 'Duas operações que são uma só, vista de dois lados.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'Somar e juntar; subtrair e desfazer',
        corpo: 'Adição e subtração são operações inversas: se 8 mais 5 dá 13, entao 13 menos 5 volta ao 8. ' +
          'Perceber isso poupa metade do esforço de memorização — cada soma aprendida já entrega a ' +
          'subtração correspondente de graca.\n\n' +
          'A estratégia mais útil nesta fase e completar o dez. Para 7 mais 5, a criança faz 7 mais 3 ' +
          'para fechar 10 e depois acrescenta os 2 que sobraram. Fica mais rápido e mais seguro que ' +
          'contar de um em um nos dedos.',
      },
      {
        tipo: 'video',
        titulo: 'Estratégias de cálculo mental para somar',
        fonteId: 'khan',
        url: 'https://pt.khanacademy.org/search?page_search_query=estrat%C3%A9gias%20de%20adi%C3%A7%C3%A3o%20completar%20dez',
        motivo: 'Apresenta a estratégia de completar o dez passo a passo, num ritmo mais lento.',
      },
      {
        tipo: 'texto',
        titulo: 'Problemas antes de contas',
        corpo: 'Sempre que possível, a conta deve nascer de uma situação: tinha, ganhou, deu, sobrou. ' +
          'A criança que entende a história escolhe sozinha a operação; a que só decora sinais fica ' +
          'perdida quando o enunciado muda de forma.',
      },
    ],
  },
  {
    stageId: 'etapa-4',
    titulo: 'Padrões, formas e primeiros gráficos',
    resumo: 'Enxergar regularidade e o começo do raciocínio algébrico.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'Padrão: a porta de entrada da álgebra',
        corpo: 'Continuar a sequência 2, 4, 6, 8 parece simples, mas é onde começa a álgebra: a criança ' +
          'descobre a regra que gera os próximos termos. Anos depois, essa mesma regra vira uma ' +
          'expressão com letra — e quem treinou padrões chega lá sem susto.',
      },
      {
        tipo: 'texto',
        titulo: 'Formas e leitura de dados',
        corpo: 'Reconhecer triângulo, quadrado e círculo pelo número de lados e cantos prepara a geometria ' +
          'formal. E ler uma tabela simples — qual dia teve mais estrelas — prepara a estatística: ' +
          'comparar números dentro de um contexto, e não no vazio.',
      },
      {
        tipo: 'video',
        titulo: 'Formas geométricas no dia a dia',
        fonteId: 'manual-do-mundo',
        url: 'https://www.youtube.com/@ManualdoMundo/search?query=formas%20geom%C3%A9tricas',
        motivo: 'Aborda as formas por experimentos concretos, com outra linguagem que a da escola.',
      },
    ],
  },
]
