import type { MaterialApoio } from '../shared/apoio'

export const fractionsApoio: MaterialApoio[] = [
  {
    stageId: 'etapa-1',
    titulo: 'Fração como parte de um todo',
    resumo: 'O de baixo diz em quantas partes; o de cima, quantas você pegou.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'De onde vem a fração',
        corpo: 'A fração nasceu de um problema prático: repartir. Dividir uma terra, uma herança, um pão ' +
          'entre pessoas raramente dá um número inteiro, e foi preciso inventar uma forma de escrever ' +
          '"uma parte de um inteiro dividido em partes iguais".\n\n' +
          'Daí a leitura dos dois números: o denominador (embaixo) diz em quantas partes IGUAIS o ' +
          'inteiro foi dividido, e o numerador (em cima) diz quantas dessas partes estão sendo ' +
          'consideradas. A palavra "iguais" é a que mais se esquece — e sem ela a fração não vale.',
      },
      {
        tipo: 'texto',
        titulo: 'Por que a mesma fração aparece em desenhos diferentes',
        corpo: 'Pizza, retângulo e barra representam a mesma ideia. Trocar de forma de propósito evita que ' +
          'a criança associe fração a "pizza": o conceito é a relação entre parte e todo, não o desenho. ' +
          'Quando ela reconhece 3/4 numa barra e num círculo, o conceito está formado.',
      },
      {
        tipo: 'video',
        titulo: 'Introdução a frações',
        fonteId: 'khan',
        url: 'https://pt.khanacademy.org/search?page_search_query=introdu%C3%A7%C3%A3o%20a%20fra%C3%A7%C3%B5es',
        motivo: 'Refaz a ideia de parte-todo com outros exemplos visuais, no ritmo da criança.',
      },
      {
        tipo: 'citacao',
        corpo: 'No 4º ano, a unidade temática Números trata a fração associada a ideia de partes de um ' +
          'inteiro, com apoio de representações visuais e comparação de frações simples.',
        fonteId: 'bncc',
        url: 'https://basenacionalcomum.mec.gov.br/abase/',
      },
    ],
  },
  {
    stageId: 'etapa-2',
    titulo: 'Equivalência, decimais e porcentagem',
    resumo: 'Três roupas diferentes para a mesma quantidade.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'Frações equivalentes',
        corpo: 'Duas frações são equivalentes quando pintam exatamente o mesmo tanto do inteiro: 1/2, 2/4 e ' +
          '5/10 são a mesma quantidade escrita de três jeitos. Multiplicar numerador e denominador pelo ' +
          'mesmo número não muda o valor, porque se está cortando o inteiro em mais pedaços e, ao mesmo ' +
          'tempo, pegando mais pedaços na mesma proporção.',
      },
      {
        tipo: 'texto',
        titulo: 'A mesma quantidade, três notações',
        corpo: 'Fração, decimal e porcentagem são formas de escrever a mesma coisa: 3/4, 0,75 e 75% dizem o ' +
          'mesmo. Perceber isso agora é o que torna o módulo de Porcentagem quase uma continuação ' +
          'natural, e não um assunto novo.\n\n' +
          'A reta numérica ajuda aqui também: colocar 1/4, 1/2 e 3/4 na reta mostra a ordem sem precisar ' +
          'de regra de comparação.',
      },
      {
        tipo: 'video',
        titulo: 'Frações equivalentes e decimais',
        fonteId: 'khan',
        url: 'https://pt.khanacademy.org/search?page_search_query=fra%C3%A7%C3%B5es%20equivalentes',
        motivo: 'Mostra a equivalência em barras sobrepostas, um apoio diferente do nosso.',
      },
    ],
  },
  {
    stageId: 'etapa-3',
    titulo: 'Operações e fração de quantidades',
    resumo: 'Fração também é divisão, e também é operador.',
    blocos: [
      {
        tipo: 'texto',
        titulo: 'A fração como divisão',
        corpo: 'A barra da fração é um sinal de divisão: 12/4 é literalmente 12 dividido por 4, ou seja 3. ' +
          'Essa leitura desengana quem acha que fração é sempre "menor que um inteiro".',
      },
      {
        tipo: 'texto',
        titulo: 'Fração de uma quantidade',
        corpo: 'Calcular 3/4 de 12 tem um caminho seguro: divide-se pelo denominador (12 dividido por 4 dá 3, ' +
          'que é um quarto) e multiplica-se pelo numerador (3 vezes 3 dá 9). Primeiro achar a parte, ' +
          'depois pegar quantas partes precisa.\n\n' +
          'Somar e subtrair frações com o mesmo denominador é mais simples do que parece: o total de ' +
          'pedaços não muda, só muda quantos estão pintados. Por isso a soma acontece apenas em cima.',
      },
      {
        tipo: 'video',
        titulo: 'Fração de uma quantidade e soma de frações',
        fonteId: 'khan',
        url: 'https://pt.khanacademy.org/search?page_search_query=fra%C3%A7%C3%A3o%20de%20uma%20quantidade',
        motivo: 'Resolve problemas parecidos falando em voz alta o raciocínio, passo a passo.',
      },
      {
        tipo: 'citacao',
        corpo: 'Resolver e elaborar problemas envolvendo o cálculo da fração de uma quantidade, e adição e ' +
          'subtração de frações com denominadores iguais, são habilidades previstas para o 6º ano.',
        fonteId: 'nova-escola',
        url: 'https://novaescola.org.br/bncc/conteudo/33/compare-as-mudancas-dos-pcns-para-a-bncc-em-matematica',
      },
    ],
  },
]
