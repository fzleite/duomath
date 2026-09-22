import type { MaterialApoio } from '../shared/apoio'

export const probabilidadeApoio: MaterialApoio[] = [
  {
    stageId: 'etapa-1',
    titulo: 'Ler tabelas e gráficos simples',
    resumo: 'Antes de calcular, saber o que o desenho está dizendo.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'Cada gráfico responde uma pergunta',
        corpo: 'O gráfico de barras serve para comparar quantidades: a barra mais alta é o maior valor, e a ' +
          'diferença de altura é a diferença entre os números. O gráfico de pizza serve para mostrar ' +
          'partes de um total: cada fatia é a parcela de um inteiro.\n\n' +
          'Ler um gráfico é responder três perguntas: qual é o maior, qual é o menor, e quanto dá o ' +
          'total. Quem consegue isso já interpreta a maior parte dos gráficos que aparecem em jornal.',
      },
      {
        tipo: 'video',
        titulo: 'Leitura de gráficos de barras',
        fonteId: 'khan',
        url: 'https://pt.khanacademy.org/search?page_search_query=ler%20gr%C3%A1fico%20de%20barras',
        motivo: 'Faz a leitura em voz alta, mostrando onde olhar primeiro.',
      },
      {
        tipo: 'texto',
        titulo: 'Onde a leitura falha',
        corpo: 'Um gráfico de barras cujo eixo não começa do zero exagera as diferenças. Vale reparar nisso ' +
          'desde cedo: é a forma mais comum de um gráfico honesto nos números ficar desonesto na ' +
          'impressão que causa.',
      },
    ],
  },
  {
    stageId: 'etapa-2',
    titulo: 'Construir gráficos e tabelas',
    resumo: 'Montar o gráfico ensina mais que escolher o certo.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'Dos dados ao desenho',
        corpo: 'Construir um gráfico exige três decisões: o que vai em cada eixo, qual a escala, e que tipo ' +
          'de gráfico representa melhor a pergunta. Comparar alturas de colegas pede barras; mostrar a ' +
          'divisão de votos entre três sabores pede pizza.\n\n' +
          'Montar barra por barra, como nesta etapa, deixa claro o que a escala faz: mudar o máximo do ' +
          'eixo muda a impressão visual sem mudar nenhum dado.',
      },
      {
        tipo: 'video',
        titulo: 'Construção de gráficos a partir de dados',
        fonteId: 'nova-escola',
        url: 'https://novaescola.org.br/busca?term=gr%C3%A1ficos',
        motivo: 'Planos de aula com atividades de construção de gráficos alinhadas à BNCC.',
      },
    ],
  },
  {
    stageId: 'etapa-3',
    titulo: 'Chance de um evento',
    resumo: 'A chance calculada é a tendência, não a promessa.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'Como se calcula a chance',
        corpo: 'A probabilidade de um evento é a razão entre os casos favoráveis e os casos possíveis. Numa ' +
          'urna com 4 bolas, sendo 1 verde, a chance de sair verde é 1 em 4, ou seja 1/4, ou 25%.\n\n' +
          'A ideia nasceu no século XVII, de uma troca de cartas entre Pascal e Fermat sobre jogos de ' +
          'azar — e virou a base da estatística moderna, dos seguros à previsão do tempo.',
      },
      {
        tipo: 'texto',
        titulo: 'O que o sorteio simulado mostra',
        corpo: 'Sortear dez vezes numa urna meio a meio não dá exatamente cinco de cada. Mas quanto mais ' +
          'sorteios, mais a proporção observada se aproxima da chance calculada. Esse é o ponto que ' +
          'apertar o botão várias vezes ensina melhor do que qualquer explicação: a chance descreve o ' +
          'longo prazo, não a próxima tentativa.',
      },
      {
        tipo: 'video',
        titulo: 'Probabilidade básica e experimentos aleatórios',
        fonteId: 'khan',
        url: 'https://pt.khanacademy.org/search?page_search_query=probabilidade%20b%C3%A1sica',
        motivo: 'Simula muitos lançamentos e mostra a frequência se estabilizando.',
      },
    ],
  },
  {
    stageId: 'etapa-4',
    titulo: 'Média, moda, mediana e amplitude',
    resumo: 'Quatro formas de resumir um conjunto — e quando cada uma engana.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'O que cada medida diz',
        corpo: 'Média é o valor que todos teriam se o total fosse repartido igualmente. Mediana é o valor do ' +
          'meio, com os dados em ordem. Moda é o valor que mais aparece. Amplitude é a distância entre ' +
          'o maior e o menor.\n\n' +
          'Elas respondem perguntas diferentes, e escolher a errada distorce a conclusão.',
      },
      {
        tipo: 'texto',
        titulo: 'Quando a média mente',
        corpo: 'Num conjunto 6, 6, 6, 6 e 10, a média é 6,8 — acima do que quase todos tiraram. Um valor ' +
          'muito fora da faixa (um outlier) arrasta a média, mas quase não move a mediana, que só olha ' +
          'a posição central.\n\n' +
          'É por isso que notícias sobre salário costumam usar mediana: a média é inflada por poucos ' +
          'valores muito altos.',
      },
      {
        tipo: 'video',
        titulo: 'Média, mediana e moda',
        fonteId: 'khan',
        url: 'https://pt.khanacademy.org/search?page_search_query=m%C3%A9dia%20mediana%20moda',
        motivo: 'Compara as três medidas no mesmo conjunto e mostra o efeito de um valor extremo.',
      },
    ],
  },
  {
    stageId: 'etapa-5',
    titulo: 'Planejar uma pesquisa e comunicar resultados',
    resumo: 'Uma pergunta boa e uma amostra justa valem mais que muitos dados.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'Amostra e viés',
        corpo: 'Quando não dá para perguntar a todos, pergunta-se a uma parte — a amostra. Para que ela ' +
          'represente o grupo, todos precisam ter a mesma chance de ser escolhidos; sortear alunos de ' +
          'todas as turmas cumpre isso.\n\n' +
          'Perguntar o esporte preferido apenas ao time de futebol produz um resultado enviesado: a ' +
          'amostra já foi escolhida por uma característica ligada à pergunta. Viés não se corrige ' +
          'aumentando o número de respostas.',
      },
      {
        tipo: 'texto',
        titulo: 'Comunicar com honestidade',
        corpo: 'Ao apresentar o resultado, três informações não podem faltar: quantas pessoas responderam, ' +
          'como foram escolhidas e qual era exatamente a pergunta. Sem isso, o número sozinho não ' +
          'permite julgar nada.\n\n' +
          'E cuidado com a conclusão: liderar uma votação com 20 de 50 votos não é ter a preferência da ' +
          'maioria — é ter mais votos que os outros, o que é diferente.',
      },
      {
        tipo: 'video',
        titulo: 'Pesquisa amostral e viés',
        fonteId: 'nova-escola',
        url: 'https://novaescola.org.br/busca?term=pesquisa%20amostral',
        motivo: 'Planos de aula sobre coleta de dados e amostragem no Ensino Fundamental.',
      },
    ],
  },
]
