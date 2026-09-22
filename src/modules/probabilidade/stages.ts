import type { QuizExercise } from '../shared/quiz'
import type { Stage } from '../types'

/**
 * Modulo 6 — Probabilidade e Estatistica ao longo do Fundamental.
 *
 * A etapa 2 usa o modo 'ajuste' com previa de barras: a crianca move os controles e monta o
 * grafico, em vez de escolher qual grafico esta certo. A etapa 3 usa o sorteio simulado — ela
 * aperta, ve a bola sair e a contagem acumular, o que faz a chance teorica virar algo
 * observavel. A etapa 5 e conceitual: planejar pesquisa nao tem resposta unica para validar,
 * entao o exercicio pergunta sobre as decisoes do planejamento.
 */
export const probabilidadeStages: Stage<QuizExercise>[] = [
  {
    id: 'etapa-1',
    title: 'Ler tabelas e graficos simples',
    curriculum: 'base do 3o e 4o ano — BNCC',
    years: [3, 4],
    exercises: [
      {
        id: 'pe1-01',
        bloom: 'lembrar',
        prompt: 'Em que dia foram lidas mais paginas?',
        hint: 'Procure a barra mais alta do grafico.',
        visual: {
          kind: 'grafico',
          tipo: 'barras',
          dados: [
            { label: 'seg', valor: 3 },
            { label: 'ter', valor: 5 },
            { label: 'qua', valor: 2 },
          ],
        },
        options: ['Terca', 'Segunda', 'Quarta', 'Foram iguais'],
        answerIndex: 0,
      },
      {
        id: 'pe1-02',
        bloom: 'lembrar',
        prompt: 'Quantas paginas foram lidas na quarta?',
        hint: 'O numero esta escrito em cima da barra da quarta.',
        visual: {
          kind: 'grafico',
          tipo: 'barras',
          dados: [
            { label: 'seg', valor: 3 },
            { label: 'ter', valor: 5 },
            { label: 'qua', valor: 2 },
          ],
        },
        input: { mode: 'numero', answer: 2 },
      },
      {
        id: 'pe1-03',
        bloom: 'entender',
        prompt: 'Quantas paginas foram lidas nos tres dias juntos?',
        hint: 'Some os tres numeros: 3, 5 e 2.',
        visual: {
          kind: 'grafico',
          tipo: 'barras',
          dados: [
            { label: 'seg', valor: 3 },
            { label: 'ter', valor: 5 },
            { label: 'qua', valor: 2 },
          ],
        },
        input: { mode: 'numero', answer: 10 },
      },
      {
        id: 'pe1-04',
        bloom: 'entender',
        prompt: 'Qual fruta foi a preferida da turma?',
        hint: 'No grafico de pizza, procure a fatia maior e veja a legenda.',
        visual: {
          kind: 'grafico',
          tipo: 'pizza',
          dados: [
            { label: 'banana', valor: 8 },
            { label: 'maca', valor: 5 },
            { label: 'uva', valor: 3 },
          ],
        },
        options: ['Banana', 'Maca', 'Uva', 'Todas empataram'],
        answerIndex: 0,
      },
      {
        id: 'pe1-05',
        bloom: 'aplicar',
        prompt: 'Quantas paginas a mais foram lidas na terca em relacao a quarta?',
        hint: 'Terca teve 5 e quarta teve 2. Quanto e a diferenca?',
        visual: {
          kind: 'grafico',
          tipo: 'barras',
          dados: [
            { label: 'seg', valor: 3 },
            { label: 'ter', valor: 5 },
            { label: 'qua', valor: 2 },
          ],
        },
        input: { mode: 'numero', answer: 3 },
      },
      {
        id: 'pe1-06',
        bloom: 'analisar',
        prompt: 'Quantos alunos responderam a pesquisa das frutas?',
        hint: 'Todos os votos juntos: 8 + 5 + 3.',
        visual: {
          kind: 'grafico',
          tipo: 'pizza',
          dados: [
            { label: 'banana', valor: 8 },
            { label: 'maca', valor: 5 },
            { label: 'uva', valor: 3 },
          ],
        },
        input: { mode: 'numero', answer: 16 },
      },
    ],
  },
  {
    id: 'etapa-2',
    title: 'Construir graficos e tabelas a partir de dados',
    curriculum: 'base do 5o e 6o ano — BNCC',
    years: [5, 6],
    exercises: [
      {
        id: 'pe2-01',
        bloom: 'entender',
        prompt: 'Monte o grafico: futebol teve 4 votos, volei 2 e natacao 5.',
        hint: 'Mova cada controle ate a altura do numero de votos daquele esporte.',
        input: {
          mode: 'ajuste',
          preview: 'barras',
          controls: [
            { id: 'futebol', label: 'futebol', min: 0, max: 8, target: 4 },
            { id: 'volei', label: 'volei', min: 0, max: 8, target: 2 },
            { id: 'natacao', label: 'natacao', min: 0, max: 8, target: 5 },
          ],
        },
      },
      {
        id: 'pe2-02',
        bloom: 'aplicar',
        prompt: 'Monte o grafico das notas: azul 6, verde 9, roxo 3.',
        hint: 'Um controle por cor. Confira o numero em cima de cada barra.',
        input: {
          mode: 'ajuste',
          preview: 'barras',
          controls: [
            { id: 'azul', label: 'azul', min: 0, max: 10, target: 6 },
            { id: 'verde', label: 'verde', min: 0, max: 10, target: 9 },
            { id: 'roxo', label: 'roxo', min: 0, max: 10, target: 3 },
          ],
        },
      },
      {
        id: 'pe2-03',
        bloom: 'aplicar',
        prompt: 'Numa tabela com 7, 4 e 9 votos, qual e o total de votos?',
        hint: 'Some os tres valores da tabela.',
        input: { mode: 'numero', answer: 20 },
      },
      {
        id: 'pe2-04',
        bloom: 'analisar',
        prompt: 'Que tipo de grafico mostra melhor quanto cada parte representa do total?',
        hint: 'Pense em qual deles mostra o inteiro dividido em fatias.',
        options: [
          'O grafico de pizza',
          'O grafico de barras',
          'A tabela de numeros',
          'Nenhum dos dois serve',
        ],
        answerIndex: 0,
      },
      {
        id: 'pe2-05',
        bloom: 'analisar',
        prompt: 'Num grafico de barras, o que acontece se as barras nao comecarem do zero?',
        hint: 'A altura da barra e o que a pessoa compara de olho.',
        options: [
          'As diferencas parecem maiores do que sao',
          'Nada muda na leitura',
          'O grafico fica mais preciso',
          'As barras viram fatias',
        ],
        answerIndex: 0,
      },
      {
        id: 'pe2-06',
        bloom: 'avaliar',
        prompt: 'Para comparar a altura de 5 colegas, qual representacao e a mais clara?',
        hint: 'Comparar valores lado a lado pede altura, nao fatia.',
        options: [
          'Grafico de barras, uma por colega',
          'Grafico de pizza',
          'Uma frase escrita com os cinco numeros',
          'Um desenho sem numeros',
        ],
        answerIndex: 0,
      },
    ],
  },
  {
    id: 'etapa-3',
    title: 'Chance de um evento, com sorteios simulados',
    curriculum: 'base do 6o e 7o ano — BNCC',
    years: [6, 7],
    exercises: [
      {
        id: 'pe3-01',
        bloom: 'entender',
        prompt: 'Sorteie algumas vezes. Qual cor tem mais chance de sair?',
        hint: 'Conte as bolas de cada cor na urna antes de sortear.',
        visual: {
          kind: 'sorteio',
          bolas: [
            { cor: 'azul', qtd: 3 },
            { cor: 'verde', qtd: 1 },
          ],
        },
        options: ['Azul', 'Verde', 'As duas tem a mesma chance', 'Nao da para saber'],
        answerIndex: 0,
      },
      {
        id: 'pe3-02',
        bloom: 'entender',
        prompt: 'Nesta urna, a chance de azul e igual a de verde?',
        hint: 'Sao duas de cada cor: mesma quantidade, mesma chance.',
        visual: {
          kind: 'urna',
          bolas: [
            { cor: 'azul', qtd: 2 },
            { cor: 'verde', qtd: 2 },
          ],
        },
        options: ['Sim, sao iguais', 'Nao, azul tem mais chance', 'Nao, verde tem mais chance', 'Depende do dia'],
        answerIndex: 0,
      },
      {
        id: 'pe3-03',
        bloom: 'aplicar',
        prompt: 'Numa urna com 4 bolas, sendo 1 verde, qual e a chance de sair verde?',
        hint: 'Uma bola favoravel entre quatro possiveis.',
        visual: {
          kind: 'urna',
          bolas: [
            { cor: 'azul', qtd: 3 },
            { cor: 'verde', qtd: 1 },
          ],
        },
        options: ['1/4', '1/3', '1/2', '4/1'],
        answerIndex: 0,
      },
      {
        id: 'pe3-04',
        bloom: 'aplicar',
        prompt: 'Numa urna com 2 bolas azuis e 3 claras, qual e a chance de sair azul, em porcentagem?',
        hint: '2 de 5 bolas. Duas quintas partes de 100.',
        visual: {
          kind: 'sorteio',
          bolas: [
            { cor: 'azul', qtd: 2 },
            { cor: 'claro', qtd: 3 },
          ],
        },
        input: { mode: 'numero', answer: 40, unit: '%' },
      },
      {
        id: 'pe3-05',
        bloom: 'analisar',
        prompt: 'Sorteando 10 vezes numa urna com metade azul, saem exatamente 5 azuis sempre?',
        hint: 'Sorteie 10 vezes e confira. A chance diz a tendencia, nao o resultado exato.',
        visual: {
          kind: 'sorteio',
          bolas: [
            { cor: 'azul', qtd: 2 },
            { cor: 'verde', qtd: 2 },
          ],
        },
        options: [
          'Nao, o resultado varia em volta da metade',
          'Sim, sempre da exatamente 5',
          'Nao, nunca da 5',
          'So da 5 se sortear devagar',
        ],
        answerIndex: 0,
      },
      {
        id: 'pe3-06',
        bloom: 'avaliar',
        prompt: 'Quanto mais vezes se sorteia, o que acontece com a proporcao observada?',
        hint: 'Sorteie muitas vezes seguidas e acompanhe a contagem de cada cor.',
        options: [
          'Vai chegando perto da chance calculada',
          'Vai se afastando da chance calculada',
          'Fica igual para sempre depois do primeiro sorteio',
          'Nao tem relacao com a chance',
        ],
        answerIndex: 0,
      },
    ],
  },
  {
    id: 'etapa-4',
    title: 'Media, moda, mediana e amplitude',
    curriculum: 'base do 7o e 8o ano — BNCC',
    years: [7, 8],
    exercises: [
      {
        id: 'pe4-01',
        bloom: 'entender',
        prompt: 'Qual e a moda deste conjunto de dados?',
        hint: 'Moda e o valor que mais aparece. Procure a barra repetida.',
        visual: { kind: 'dados', valores: [3, 7, 7, 2, 9] },
        input: { mode: 'numero', answer: 7 },
      },
      {
        id: 'pe4-02',
        bloom: 'aplicar',
        prompt: 'Qual e a media deste conjunto?',
        hint: 'Some todos os valores e divida pela quantidade de valores.',
        visual: { kind: 'dados', valores: [4, 6, 8, 10, 2] },
        input: { mode: 'numero', answer: 6 },
      },
      {
        id: 'pe4-03',
        bloom: 'aplicar',
        prompt: 'Qual e a mediana deste conjunto?',
        hint: 'Coloque os valores em ordem e pegue o do meio: 1, 3, 4, 8, 9.',
        visual: { kind: 'dados', valores: [8, 3, 4, 9, 1] },
        input: { mode: 'numero', answer: 4 },
      },
      {
        id: 'pe4-04',
        bloom: 'aplicar',
        prompt: 'Qual e a amplitude deste conjunto?',
        hint: 'Amplitude e a diferenca entre o maior e o menor valor.',
        visual: { kind: 'dados', valores: [5, 12, 7, 3, 9] },
        input: { mode: 'numero', answer: 9 },
      },
      {
        id: 'pe4-05',
        bloom: 'analisar',
        prompt: 'Num conjunto com um valor muito fora dos outros, qual medida sofre mais?',
        hint: 'A media soma todos os valores; a mediana so olha a posicao do meio.',
        options: ['A media', 'A mediana', 'A moda', 'A amplitude nao muda'],
        answerIndex: 0,
      },
      {
        id: 'pe4-06',
        bloom: 'avaliar',
        prompt: 'As notas de uma turma sao 6, 6, 6, 6 e 10. Que medida representa melhor a turma?',
        hint: 'A media sobe por causa do 10, mas quase todos tiraram 6.',
        options: [
          'A moda, porque quase todos tiraram a mesma nota',
          'A media, sempre',
          'A amplitude',
          'Nenhuma serve',
        ],
        answerIndex: 0,
      },
    ],
  },
  {
    id: 'etapa-5',
    title: 'Planejar uma pesquisa e comunicar resultados',
    curriculum: 'base do 8o e 9o ano — BNCC',
    years: [8, 9],
    exercises: [
      {
        id: 'pe5-01',
        bloom: 'entender',
        prompt: 'O que e uma amostra numa pesquisa?',
        hint: 'Quando nao da para perguntar a todos, pergunta-se a uma parte.',
        options: [
          'Uma parte do grupo, escolhida para representar o todo',
          'Todas as pessoas do grupo',
          'A pergunta da pesquisa',
          'O grafico do resultado',
        ],
        answerIndex: 0,
      },
      {
        id: 'pe5-02',
        bloom: 'entender',
        prompt: 'Para saber o esporte preferido da escola, perguntar so ao time de futebol traz problema?',
        hint: 'Quem foi escolhido para responder ja tem uma preferencia em comum.',
        options: [
          'Sim, a amostra fica enviesada para futebol',
          'Nao, qualquer grupo serve',
          'Sim, mas so se o time for pequeno',
          'Nao, desde que sejam muitas pessoas',
        ],
        answerIndex: 0,
      },
      {
        id: 'pe5-03',
        bloom: 'aplicar',
        prompt: 'Qual e a melhor forma de escolher quem responde a pesquisa da escola?',
        hint: 'Todo mundo precisa ter a mesma chance de ser escolhido.',
        options: [
          'Sortear alunos de todas as turmas',
          'Perguntar so aos colegas da sua turma',
          'Perguntar so a quem passa no corredor na hora do recreio',
          'Perguntar so aos que responderem primeiro',
        ],
        answerIndex: 0,
      },
      {
        id: 'pe5-04',
        bloom: 'aplicar',
        prompt: 'Numa pesquisa com 50 alunos, 20 escolheram chocolate. Quantos por cento sao?',
        hint: '20 de 50 e o mesmo que 40 de 100.',
        input: { mode: 'numero', answer: 40, unit: '%' },
      },
      {
        id: 'pe5-05',
        bloom: 'analisar',
        prompt: 'Com este resultado em maos, o que faz sentido concluir?',
        hint: 'Olhe o grafico: chocolate lidera, mas nao e a maioria absoluta.',
        visual: {
          kind: 'grafico',
          tipo: 'pizza',
          dados: [
            { label: 'chocolate', valor: 20 },
            { label: 'morango', valor: 18 },
            { label: 'creme', valor: 12 },
          ],
        },
        options: [
          'Chocolate e o mais votado, mas nao e a escolha da maioria',
          'Todos os alunos preferem chocolate',
          'Ninguem gosta de creme',
          'A pesquisa nao mostra nada',
        ],
        answerIndex: 0,
      },
      {
        id: 'pe5-06',
        bloom: 'avaliar',
        prompt: 'Ao comunicar os resultados, o que nao pode faltar?',
        hint: 'Quem le precisa saber de onde vieram os numeros para confiar neles.',
        options: [
          'Quantas pessoas responderam e como foram escolhidas',
          'Apenas o numero vencedor',
          'Um grafico bonito, sem numeros',
          'A opiniao de quem fez a pesquisa',
        ],
        answerIndex: 0,
      },
    ],
  },
]
