import type { MaterialApoio } from '../shared/apoio'

export const algebraApoio: MaterialApoio[] = [
  {
    stageId: 'etapa-1',
    titulo: 'Variável e expressões algébricas',
    resumo: 'A letra guarda o lugar de um número que ainda não se sabe.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'De onde vem a álgebra',
        corpo: 'A palavra álgebra vem do árabe al-jabr, do título de uma obra do matemático al-Khwarizmi, ' +
          'no século IX, sobre como reorganizar equações para encontrar o valor desconhecido. A ideia ' +
          'central é essa: dar um nome ao que não se sabe e trabalhar com ele como se fosse um número.\n\n' +
          'Por isso 3x significa "três vezes esse número, qualquer que ele seja". A letra não é um ' +
          'enfeite: é o que permite escrever uma regra geral em vez de um caso particular.',
      },
      {
        tipo: 'texto',
        titulo: 'Substituir e calcular',
        corpo: 'Calcular o valor numérico de uma expressão é trocar a letra pelo número e respeitar a ordem ' +
          'das operações: multiplicação antes de soma. Em 2x + 7 com x igual a 5, faz-se 2 vezes 5 ' +
          'primeiro, e só depois soma 7.',
      },
      {
        tipo: 'video',
        titulo: 'Expressões algébricas e valor numérico',
        fonteId: 'khan',
        url: 'https://pt.khanacademy.org/search?page_search_query=express%C3%B5es%20alg%C3%A9bricas%20valor%20num%C3%A9rico',
        motivo: 'Faz a substituição passo a passo em várias expressões, reforçando a ordem das operações.',
      },
    ],
  },
  {
    stageId: 'etapa-2',
    titulo: 'Equações do 1º grau na balança',
    resumo: 'A igualdade é um equilíbrio: o que se faz de um lado, faz-se do outro.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'A balança como modelo',
        corpo: 'Uma equação é uma balança em equilíbrio. Os blocos x e os pesos soltos de cada prato valem ' +
          'o mesmo total. Resolver é descobrir o peso de um bloco sem desequilibrar a balança — e a ' +
          'única regra é: qualquer coisa retirada ou acrescentada de um lado precisa acontecer também ' +
          'no outro.\n\n' +
          'Daí a ordem natural: primeiro tirar os pesos soltos dos dois lados (isolar os blocos) e ' +
          'depois dividir pelo número de blocos.',
      },
      {
        tipo: 'texto',
        titulo: 'Por que isso importa depois',
        corpo: 'Essa mesma disciplina de "fazer nos dois lados" vale para toda a matemática que vem: ' +
          'sistemas, equações do segundo grau, e até manipulação de fórmulas em física.',
      },
      {
        tipo: 'video',
        titulo: 'Equações do primeiro grau com a balança',
        fonteId: 'khan',
        url: 'https://pt.khanacademy.org/search?page_search_query=equa%C3%A7%C3%B5es%20do%20primeiro%20grau%20balan%C3%A7a',
        motivo: 'Usa a mesma metáfora da balança em animação, mostrando cada passo da manipulação.',
      },
    ],
  },
  {
    stageId: 'etapa-3',
    titulo: 'Sistemas do 1º grau e plano cartesiano',
    resumo: 'Duas condições ao mesmo tempo, e o ponto onde elas se encontram.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'O plano de Descartes',
        corpo: 'O plano cartesiano leva o nome de René Descartes, que no século XVII uniu álgebra e ' +
          'geometria: cada par de números passou a ser um ponto, e cada equação, uma linha. Foi uma ' +
          'das ideias mais produtivas da matemática — é o que permite "ver" uma equação.\n\n' +
          'Num sistema de duas equações, cada uma é uma reta. A solução é o ponto onde elas se cruzam: ' +
          'o único par de valores que satisfaz as duas ao mesmo tempo.',
      },
      {
        tipo: 'texto',
        titulo: 'Quando não há solução',
        corpo: 'Se as retas são paralelas, não existe ponto de encontro — o sistema não tem solução. Se as ' +
          'duas equações descrevem a mesma reta, há infinitas soluções. O gráfico responde isso antes ' +
          'de qualquer conta.',
      },
      {
        tipo: 'video',
        titulo: 'Sistemas de equações e interpretação gráfica',
        fonteId: 'khan',
        url: 'https://pt.khanacademy.org/search?page_search_query=sistemas%20de%20equa%C3%A7%C3%B5es%20gr%C3%A1fico',
        motivo: 'Resolve o mesmo sistema pelos dois caminhos, algébrico e gráfico, lado a lado.',
      },
    ],
  },
  {
    stageId: 'etapa-4',
    titulo: 'Função afim com sliders de coeficiente',
    resumo: 'a inclina a reta; b sobe e desce a reta.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'O que é uma função',
        corpo: 'Função é uma relação de dependência: para cada valor de x existe um único valor de y. A ' +
          'função afim, y = ax + b, é a mais simples e a mais presente no dia a dia — preço fixo mais ' +
          'preço por unidade, taxa de corrida, conta de luz.\n\n' +
          'No gráfico, o a é a inclinação (quanto y muda quando x anda um) e o b é onde a reta corta o ' +
          'eixo vertical, ou seja, o valor de y quando x é zero. Mexer nos controles e ver a reta girar ' +
          'e subir é a forma mais rápida de fixar isso.',
      },
      {
        tipo: 'video',
        titulo: 'Coeficientes da função afim',
        fonteId: 'khan',
        url: 'https://pt.khanacademy.org/search?page_search_query=fun%C3%A7%C3%A3o%20afim%20coeficiente%20angular',
        motivo: 'Trata os coeficientes com outra notação, útil para reconhecer o mesmo conceito na escola.',
      },
      {
        tipo: 'texto',
        titulo: 'A raiz da função',
        corpo: 'O valor de x que faz y valer zero é onde a reta cruza o eixo horizontal. Em contexto, é a ' +
          'resposta de perguntas como "a partir de quantos quilômetros a corrida passa de 20 reais".',
      },
    ],
  },
  {
    stageId: 'etapa-5',
    titulo: 'Fatoração e produtos notáveis',
    resumo: 'Reescrever uma expressão como multiplicação encurta o caminho.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'Notáveis porque aparecem sempre',
        corpo: 'Três padrões se repetem tanto que ganharam nome: o quadrado da soma, o quadrado da ' +
          'diferença e o produto da soma pela diferença. Reconhecê-los evita multiplicar termo a termo ' +
          'toda vez.\n\n' +
          'O produto da soma pela diferença é o mais útil: (x + 3)(x - 3) dá x² - 9, porque os termos ' +
          'do meio se cancelam. Esse atalho serve até para conta de cabeça: 21 ao quadrado é ' +
          '400 + 40 + 1, ou seja 441.',
      },
      {
        tipo: 'texto',
        titulo: 'Fatorar é o caminho de volta',
        corpo: 'Fatorar é escrever a expressão como um produto. Serve para simplificar frações algébricas e, ' +
          'principalmente, para resolver equações: se um produto é zero, um dos fatores é zero — que é ' +
          'a base da próxima etapa.',
      },
      {
        tipo: 'video',
        titulo: 'Produtos notáveis e fatoração',
        fonteId: 'khan',
        url: 'https://pt.khanacademy.org/search?page_search_query=produtos%20not%C3%A1veis%20fatora%C3%A7%C3%A3o',
        motivo: 'Mostra a verificação geométrica do quadrado da soma, com áreas — outra abordagem.',
      },
    ],
  },
  {
    stageId: 'etapa-6',
    titulo: 'Equação do 2º grau e a parábola',
    resumo: 'De onde vem a fórmula de Bhaskara e o que ela resolve.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'O que a fórmula resolve',
        corpo: 'Uma equação do segundo grau, ax² + bx + c = 0, pergunta quais valores de x anulam a ' +
          'expressão. Geometricamente: em que pontos a parábola cruza o eixo horizontal. Ela aparece ' +
          'em trajetória de bola, área de terreno com perímetro fixo, e em qualquer situação em que a ' +
          'grandeza depende do quadrado de outra.',
      },
      {
        tipo: 'texto',
        titulo: 'De onde vem a fórmula',
        corpo: 'A fórmula que no Brasil se chama de Bhaskara não foi inventada por ele: métodos para ' +
          'resolver equações quadráticas existiam na Babilônia, e a solução geral foi desenvolvida por ' +
          'matemáticos indianos e árabes ao longo de séculos — al-Khwarizmi descreveu o procedimento no ' +
          'século IX. O nome pegou apenas no ensino brasileiro.\n\n' +
          'A fórmula é o resultado de completar o quadrado: reescreve-se a equação como um quadrado ' +
          'perfeito mais um resto, e aí basta extrair a raiz. O discriminante (b² - 4ac) diz quantas ' +
          'raízes existem: duas se for positivo, uma se for zero, nenhuma real se for negativo — e no ' +
          'gráfico isso é a parábola cortando, encostando ou passando longe do eixo x.',
      },
      {
        tipo: 'video',
        titulo: 'Equação do segundo grau e o discriminante',
        fonteId: 'khan',
        url: 'https://pt.khanacademy.org/search?page_search_query=equa%C3%A7%C3%A3o%20do%20segundo%20grau%20discriminante',
        motivo: 'Liga o valor do discriminante ao desenho da parábola, que é o ponto que costuma travar.',
      },
      {
        tipo: 'citacao',
        corpo: 'Resolver e elaborar problemas que possam ser representados por equações polinomiais de 2º ' +
          'grau é habilidade prevista para o 9º ano do Ensino Fundamental.',
        fonteId: 'bncc',
        url: 'https://basenacionalcomum.mec.gov.br/abase/',
      },
    ],
  },
]
