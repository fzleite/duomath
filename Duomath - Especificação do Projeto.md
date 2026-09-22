# DuoMath - Especificação do Projeto

2026-09-19 · @Someone

## Visão geral e objetivo

O DuoMath é uma ferramenta web progressiva (PWA), em HTML e JavaScript, para ajudar a filha de Fernando a estudar conceitos de matemática de forma visual e interativa. O projeto nasce com o módulo de Frações, mas é desenhado como um hub extensível: novos módulos (porcentagem, álgebra, trigonometria - seno, cosseno, tangente, ângulos) serão adicionados conforme ela avança na escola.

a proposta é funcionar como um Duolingo da matemática: exercícios visuais, progresso acompanhável por etapas, e um mascote que guia e incentiva.

## Limites técnicos e arquitetura

Aplicativo estritamente client-side, sem backend nem autenticação. Hospedagem em servidor Apache local, na rede doméstica de Fernando, acessível por outros dispositivos (tablets, celulares) dentro dessa rede.

Construção como PWA, usando o plugin de desenvolvimento de PWA já utilizado por Fernando no Claude Code, permitindo instalação na tela inicial e uso em tela cheia nos dispositivos móveis.

Persistência de dados via IndexedDB, no próprio navegador, sem depender de servidor para armazenar progresso. Deve existir um mecanismo de exportação e importação de dados em JSON, permitindo backup, transferência entre dispositivos e organização manual dos perfis pelos pais.

Arquitetura modular: o menu principal deve permitir acesso a diferentes módulos matemáticos, cada um autocontido, para facilitar a adição de novos conceitos no futuro sem retrabalho na base do sistema.

## Sistema de perfis e progresso

Estrutura multi-perfil, organizada por responsável (pais), pensada para acomodar as duas filhas de Fernando e, eventualmente, colegas de classe. Cada perfil mantém seu próprio histórico e progresso, armazenados localmente via IndexedDB.

Tela inicial de seleção de perfil antes de entrar nos módulos.

Sistema de gamificação inspirado no Duolingo: marcadores de cumprimento de etapas por módulo, permitindo acompanhar a evolução de cada criança.

Métricas de acompanhamento por exercício:

- Número total de etapas da disciplina e progresso concluído.
- Taxa de acerto na primeira tentativa (indicador de domínio do conceito).
- Registro do número de tentativas por exercício, incluindo casos em que a criança repete o exercício após errar (inclusive tentativas de burlar o sistema).

Exportação e importação de dados em JSON, permitindo que os pais façam backup do progresso de todos os perfis (workspace completo) e o recarreguem em outro dispositivo.

## Identidade visual e UX

Interface visualmente limpa e minimalista, com foco no exercício e na visualização gráfica, evitando controles complexos que distraiam a criança. Apenas os KPIs essenciais ficam visíveis na tela da criança (progresso total do módulo e taxa de acerto).

Fundo branco como base neutra, com paleta de cores vivas em tons de azul e verde, remetendo a calma e paz. As cores também servem para separar visualmente os elementos das frações (por exemplo, cada parte de um todo com uma tonalidade diferente).

Representações visuais variadas para os conceitos matemáticos: gráficos de pizza (círculo dividido em fatias) e também outras formas geométricas, como retangulos e barras, permitindo generalizar o conceito de fração além de uma única representação. Slider interativo para ajustar numerador e denominador e ver a fração mudar visualmente em tempo real.

Nome do produto grafado como `DuoMath` (D e M maiúsculos, demais letras minúsculas), consistentemente em toda a interface, incluindo a barra de título.

Barra de título constante, fixa no topo da tela em todas as páginas do Duomath.

Navegação dupla para acessar o conteúdo, responsiva ao tamanho de tela: a progressão por série ou ano escolar (seguindo a sequência da BNCC) fica em estrutura de abas. O menu por assunto ou temática (Frações, Tabuada, Porcentagem, Álgebra, Geometria e Trigonometria, Grandezas e Medidas, Probabilidade e Estatística) fica oculto dentro de um menu hambúrguer em telas de celular, e exibido como uma barra lateral fixa em telas de computador, permitindo acessar um módulo específico diretamente, sem depender da progressão linear por série.

## Mascote: Pizinho

Pizinho é o mascote do Duomath, uma alusão ao número Pi, sugerido pela filha de Fernando. Ele é pensado para ser reaproveitado em módulos futuros de geometria.

O Pizinho não funciona como um guia ativo obrigatório em cada tela, mas como um acompanhante que aparece de forma contextual para:

- Dar dicas relevantes durante os exercícios.
- Comemorar quando a criança acerta ou completa uma etapa.
- Oferecer apoio e incentivo quando ela erra repetidamente o mesmo exercício.

## Módulo 1: Frações

Primeiro módulo do Duomath, cobrindo a progressão de frações do 4 ao 6 ano do ensino fundamental, alinhado à BNCC (Base Nacional Comum Curricular). Cada exercício deve seguir os níveis cognitivos da Taxonomia de Bloom (lembrar, entender, aplicar, analisar, avaliar), progredindo dentro de cada etapa.

### Etapa 1: Percepção visual e comparação simples (base do 4 ano)

Fração como parte de um todo, usando representações visuais (círculo, retangulo, barra). Comparação de frações simples e primeiras noções de fração na reta numérica.

### Etapa 2: Equivalência e reta numérica (base do 5 ano)

Identificação de frações equivalentes. Comparação e ordenação de números racionais positivos, nas representações fracionária e decimal, relacionando-os a pontos na reta numérica. Ligação entre fração e porcentagem (por exemplo, dez por cento como a décima parte de um todo).

### Etapa 3: Operações e fração de quantidades (base do 6 ano)

Compreensão, comparação e ordenação de frações associadas às ideias de partes de inteiros e resultado de divisão, identificando frações equivalentes. Resolução e elaboração de problemas envolvendo o cálculo da fração de uma quantidade, com resultado sendo um número natural. Introdução a adição e subtração de frações.

## Painel do responsável

Tela separada da experiência da criança, destinada ao responsável (Fernando). Apresenta as mesmas métricas disponíveis na tela da criança (progresso por módulo e etapa, taxa de acerto na primeira tentativa, número de tentativas por exercício), porém agregadas e organizadas por perfil, permitindo comparar a evolução de cada filha individualmente.

## Roadmap de módulos futuros

O Duomath deve ser estruturado para receber novos módulos matemáticos ao longo do tempo, conforme a filha de Fernando avança na escola. Próximos módulos previstos:

- Tabuada (multiplicação), com prática visual e progressiva das tabelas de multiplicar.
- Porcentagem.
- Álgebra.
- Geometria e trigonometria: ângulos, seno, cosseno, tangente (módulo em que o Pizinho será formalmente introduzido como referência ao número Pi).

### Módulo de Tabuada

A Tabuada tem duas partes complementares: um modo de estudo pedagógico, com progressão de etapas dentro do plano de aprendizado (como no módulo de Frações), e um modo de jogo de treino livre e cronometrado, detalhado mais abaixo.

### Modo de estudo (plano de aprendizado)

Segue a mesma lógica pedagógica dos demais módulos de conteúdo, com etapas organizadas pela Taxonomia de Bloom e representações visuais (por exemplo, agrupamentos e somas repetidas para ilustrar a multiplicação).

- Etapa 1 (lembrar/entender): introdução ao conceito de multiplicação como soma de parcelas iguais, com apoio visual (agrupamentos, arranjos retangulares). Tabuadas de 1 a 5.
- Etapa 2 (aplicar): memória e reconhecimento das tabuadas de 1 a 10, com exercícios guiados e apoio do Pizinho.
- Etapa 3 (analisar/avaliar): resolução de problemas aplicados usando a tabuada, identificação de padrões (por exemplo, comutatividade) e preparação para as tabuadas mais complexas, até 100.

Esse modo de estudo alimenta o mesmo sistema de progresso e KPIs dos demais módulos (etapas concluídas, taxa de acerto na primeira tentativa, número de tentativas), visível também no painel do responsável.

### Modo de jogo (treino livre cronometrado)

A Tabuada fica em uma categoria própria de Jogos no menu principal, separada dos módulos de conteúdo. Assim como os demais módulos, ela tem progressão com desbloqueio de níveis mais avançados. A diferença é que ela pode ser acessada livremente a qualquer momento, como um atalho rápido de treino, sem depender de estar na vez daquele conteúdo no plano de estudo. O foco é velocidade e automatização do cálculo mental.

Níveis de dificuldade e sorteio aleatório

- Nível fácil: sorteio aleatório de tabuadas de 1 a 10 (exemplo: pode sortear a tabuada do 8, depois a do 7, depois a do 3). Desbloqueado desde o início.
- Nível avançado: sorteio aleatório de tabuadas de 1 a 100. Desbloqueado ao atingir um critério de desempenho no nível fácil (por exemplo, um tempo médio de resposta abaixo de um limite alvo).
- Nível de contas aleatórias: operações soltas (exemplo: 25 vezes 8), no mesmo formato cronometrado. Desbloqueado ao atingir um critério de desempenho no nível avançado.

Mecânica do quiz:

- Cronômetro mede o tempo de resposta de cada pergunta individual (por exemplo, uma pergunta da tabuada do 8).
- Cada tentativa de resposta é registrada com seu tempo, permitindo comparar tentativas seguintes com as anteriores para medir progresso.

Estatísticas e histórico (mesmo em modo de sorteio aleatório, cada tempo registrado é associado à tabuada específica sorteada, por exemplo tabuada do 8, para permitir o comparativo por tabuada depois)

- Histórico completo de tentativas por tabuada especifica (quantas vezes tentou, tempos registrados em cada tentativa).
- Evolução do tempo de resposta ao longo do tempo, para visualizar se a criança está melhorando.
- Comparativo geral de desempenho entre diferentes tabuadas (por exemplo, comparar o desempenho na tabuada do 8 com a do 5 ou do 10).
- Tempo médio de resposta também aplicado às contas aleatórias do nível 3.

* Porcentagem.
* Álgebra.
* Geometria e trigonometria: ângulos, seno, cosseno, tangente (módulo em que o Pizinho será formalmente introduzido como referência ao número Pi).

## Módulo 2: Porcentagem

Alinhado à progressão da BNCC do 5 ao 8 ano, conectando com a base já construída em frações (a ligação entre fração e porcentagem já aparece na etapa 2 do módulo de Frações). Segue os mesmos ritos dos demais módulos: representações visuais e lúdicas (barras de progresso, círculos preenchidos, grades de cem quadrados), progressão por etapas seguindo a Taxonomia de Bloom, o Pizinho dando dicas e apoio contextual, e gamificação com desbloqueio de etapas.

- Etapa 1 (lembrar/entender): associação visual entre porcentagens simples (10 por cento, 25 por cento, 50 por cento, 75 por cento, 100 por cento) e a décima, quarta, metade e totalidade de um todo, retomando a conexão com frações já vista no módulo anterior.
- Etapa 2 (aplicar): cálculo de porcentagens de quantidades em contextos práticos do dia a dia.
- Etapa 3 (analisar/avaliar): problemas envolvendo acréscimos e decréscimos simples (por exemplo, desconto ou aumento de preço), no contexto de educação financeira, usando estratégias pessoais, cálculo mental e comparação de resultados.

## Módulo 3: Álgebra

Alinhado à progressão da BNCC do 6 ao 8 ano. Segue os mesmos ritos dos demais módulos: representações visuais e lúdicas (balanças de equilíbrio para ilustrar equações, blocos e caixas representando incógnitas), progressão por etapas seguindo a Taxonomia de Bloom, o Pizinho dando dicas e apoio contextual, e gamificação com desbloqueio de etapas.

- Etapa 1 (lembrar/entender): noção de variável e expressões algébricas simples, calculando o valor numérico de expressões usando as propriedades das operações.
- Etapa 2 (aplicar): resolução de equações do primeiro grau, representadas visualmente como uma balança em equilíbrio.
- Etapa 3 (analisar/avaliar): problemas representados por equações do primeiro grau e sistemas de equações do primeiro grau com duas incógnitas, incluindo interpretação gráfica no plano cartesiano.
- Etapa 4 (aplicar/analisar): funções como relações de dependência entre duas variáveis, com representação numérica, algébrica e gráfica. Plote dinâmico da função afim (f de x igual a a x mais b) no plano cartesiano, com sliders para os coeficientes a e b, mostrando a reta se transformando em tempo real.
- Etapa 5 (analisar/avaliar): fatoração de expressões algébricas e produtos notáveis, como base para equações do segundo grau.
- Etapa 6 (avaliar/criar): equações do segundo grau (a x ao quadrado mais b x mais c igual a zero), resolvidas por fatoração, completamento de quadrado e pela fórmula de Báskara. Plote dinâmico da função quadrática no plano cartesiano, com sliders para os coeficientes a, b e c, mostrando a parábola se transformando em tempo real e a relação entre as raízes da equação e os pontos onde a parábola cruza o eixo x.

## Módulo 4: Geometria e Trigonometria

Alinhado à progressão da BNCC do 6 ao 9 ano. Módulo em que o Pizinho é formalmente introduzido como referência ao número Pi. Segue os mesmos ritos dos demais módulos: representações visuais e lúdicas, progressão por etapas seguindo a Taxonomia de Bloom, apoio contextual do Pizinho, e gamificação com desbloqueio de etapas.

- Etapa 1 (lembrar/entender): reconhecimento, nomeação e comparação de polígonos, considerando lados, vértices e ângulos, classificando-os em regulares e não regulares. Localização de pontos no plano cartesiano associando pares ordenados a vértices de polígonos.
- Etapa 2 (aplicar): relações entre número de vértices, faces e arestas de prismas e pirâmides, com apoio visual tridimensional.
- Etapa 3 (analisar): ângulos formados por retas paralelas cortadas por uma transversal, verificando e depois demonstrando as relações entre eles.
- Etapa 4 (aplicar/criar): construções geométricas mais precisas (mediatriz, bissetriz, ângulos de 90, 60, 45 e 30 graus e polígonos regulares), simulando instrumentos de desenho ou geometria dinâmica na tela.
- Etapa 5 (analisar/avaliar): semelhança de triângulos, como base conceitual para a trigonometria.
- Etapa 6 (aplicar/analisar): relações trigonométricas no triângulo retângulo (seno, cosseno e tangente), com círculo trigonométrico interativo e triângulos manipuláveis, ligando o ângulo escolhido ao valor de cada razão em tempo real.

## Módulo 0: Primeiros Números (1 ao 3 ano)

Criado para incluir a filha mais nova de Fernando, que está no primeiro ano e se sentiu excluída por não conseguir usar o Duomath. Alinhado à progressão da BNCC do 1 ao 3 ano do Ensino Fundamental, com o mesmo perfil próprio dentro do sistema multi-perfil, visual lúdico, apoio do Pizinho e gamificação adaptados a essa idade.

- Etapa 1 (lembrar/entender): reconhecimento, leitura, escrita e comparação de números naturais, com apoio visual de contagem de objetos.
- Etapa 2 (aplicar): composição e decomposição de números, noções do sistema de numeração decimal (valor posicional e função do zero).
- Etapa 3 (aplicar/analisar): operações básicas de adição e subtração com números naturais, incluindo as relações inversas entre adição e subtração, resolvendo problemas práticos simples.
- Etapa 4 (analisar/avaliar): reconhecimento de padrões, primeiras noções geométricas básicas (formas, direita e esquerda, sentido) e leitura simples de tabelas e gráficos.

## Módulo 5: Grandezas e Medidas

Alinhado à progressão da BNCC do Ensino Fundamental. Segue os mesmos ritos dos demais módulos: representações visuais e lúdicas (réguas e trenas interativas, grades de área preenchível, sólidos tridimensionais manipuláveis), progressão por etapas seguindo a Taxonomia de Bloom, apoio contextual do Pizinho, e gamificação com desbloqueio de etapas. Útil também como revisão para Fernando.

- Etapa 1 (lembrar/entender): noções de comprimento, massa, capacidade e tempo, com conversão entre unidades de medida (por exemplo, metros e centímetros).
- Etapa 2 (aplicar): cálculo de perímetro de figuras planas, com apoio visual de contorno das figuras.
- Etapa 3 (aplicar/analisar): cálculo de área de figuras planas (quadrados, retângulos, triângulos e círculos), com apoio visual de grades preenchíveis.
- Etapa 4 (analisar/avaliar): cálculo de volume de sólidos geométricos simples (cubos e blocos retangulares), com apoio visual tridimensional.
- Etapa 5 (avaliar): problemas envolvendo escala (mapas e maquetes) e conversão entre unidades em contextos práticos.

* Grandezas e medidas: perímetro, área, volume, conversão de unidades e escala.
* Probabilidade e estatística: média, moda, mediana, leitura e construção de gráficos e tabelas.
* Proporção e razão como tema à parte (já tangenciado dentro de Porcentagem e Álgebra).

## Módulo 6: Probabilidade e Estatística

Alinhado à progressão da BNCC do Ensino Fundamental. Segue os mesmos ritos dos demais módulos: representações visuais e lúdicas (gráficos de barras e pizza interativos, urnas de sorteio simuladas, linhas do tempo de dados), progressão por etapas seguindo a Taxonomia de Bloom, apoio contextual do Pizinho, e gamificação com desbloqueio de etapas. Bom também como revisão de conceitos estatísticos para Fernando.

- Etapa 1 (lembrar/entender): leitura e interpretação de tabelas e gráficos simples (barras, colunas, pizza).
- Etapa 2 (aplicar): construção de gráficos e tabelas a partir de um conjunto de dados dado.
- Etapa 3 (aplicar/analisar): noções básicas de probabilidade (chance de um evento ocorrer), com simulações visuais de sorteios e resultados aleatórios.
- Etapa 4 (analisar/avaliar): medidas de tendência central, média, moda e mediana, e amplitude de um conjunto de dados.
- Etapa 5 (avaliar/criar): planejamento simples de uma pesquisa amostral, coleta de dados e comunicação dos resultados por meio de gráficos e relatórios.

* Logaritmo.
* Vetores.
* Matrizes e determinantes.
* Progressões aritméticas e geométricas.
* Ciclo trigonométrico completo (além do triângulo retângulo já coberto no Fundamental).
* Estatística aprofundada.

## Ajuda: metodologia e fontes

Esta seção reúne as referências metodológicas e curriculares usadas para estruturar o DuoMath, para permitir revisão e consulta posterior.

### Taxonomia de Bloom

Cada exercício dos módulos de conteúdo segue os níveis cognitivos da Taxonomia de Bloom (lembrar, entender, aplicar, analisar, avaliar, criar), progredindo em complexidade dentro de cada etapa de um módulo.

### BNCC (Base Nacional Comum Curricular)

A progressão de etapas de cada módulo foi alinhada às habilidades previstas na BNCC para o Ensino Fundamental, do 1 ao 9 ano, incluindo as unidades temáticas de Números, Álgebra, Geometria, Grandezas e Medidas, e Probabilidade e Estatística. Conceitos de Ensino Médio (logaritmo, vetores, matrizes, progressões, ciclo trigonométrico completo) foram identificados como fora do Ensino Fundamental e mantidos apenas como roadmap de longo prazo.

### Fontes consultadas

- [Base Nacional Comum Curricular - MEC](https://basenacionalcomum.mec.gov.br/abase/)
- [Habilidades da BNCC - Tudo Sala de Aula](https://www.tudosaladeaula.com/habilidades-da-bncc/)
- [Habilidades da BNCC de Matemática do 4 ano](https://www.tudosaladeaula.com/2019/04/habilidades-da-bncc-de-matematica-do-4-ano-do-ensino-fundamental/)
- [Habilidades da BNCC de Matemática do 5 ano](https://www.tudosaladeaula.com/2019/04/habilidades-da-bncc-de-matematica-do-5-ano-do-ensino-fundamental/)
- [Habilidades da BNCC de Matemática do 6 ano](https://www.tudosaladeaula.com/2019/04/habilidades-da-bncc-de-matematica-do-6-ano-do-ensino-fundamental/)
- [Habilidades da BNCC de Matemática do 7 ano](https://www.tudosaladeaula.com/2019/04/habilidades-da-bncc-de-matematica-do-7-ano-do-ensino-fundamental/)
- [Habilidades da BNCC de Matemática do 8 ano](https://www.tudosaladeaula.com/2019/04/habilidades-da-bncc-de-matematica-do-8-ano-do-ensino-fundamental/)
- [Habilidades da BNCC de Matemática do 9 ano](https://www.tudosaladeaula.com/2019/04/habilidades-da-bncc-de-matematica-do-9-ano-do-ensino-fundamental/)
- [Matemática 6 Ano BNCC - Matemática e Vida](https://matematicaevida.com.br/6-ano-matematica-bncc/)
- [Matemática 7 Ano BNCC - Matemática e Vida](https://matematicaevida.com.br/7o-ano-matematica-bncc/)
- [Matemática 8 Ano BNCC - Matemática e Vida](https://matematicaevida.com.br/8o-ano-matematica-bncc/)
- [Matemática 9 Ano BNCC - Matemática e Vida](https://matematicaevida.com.br/9o-ano-matematica-bncc/)
- [Habilidades essenciais - Anos Finais - Matemática (SEDU-ES)](https://efape.educacao.sp.gov.br/curriculopaulista/wp-content/uploads/download/habilidades-essenciais-anos-finais%202021/Habilidades%20essenciais%20_%20Anos%20Finais_Matem%C3%A1tica.pdf)
- [Mapa de Progressão das Habilidades - Matemática EF (SEDU-ES)](https://curriculo.sedu.es.gov.br/curriculo/wp-content/uploads/2021/10/MAPA-DE-PROGRESSAO-DAS-HABILIDADES-MATEMATICA-EF.pdf)
- [Compare as mudanças dos PCNs para a BNCC em Matemática - Nova Escola](https://novaescola.org.br/bncc/conteudo/33/compare-as-mudancas-dos-pcns-para-a-bncc-em-matematica)
- [Habilidades essenciais - Anos Iniciais - Matemática (SEDU-ES)](https://efape.educacao.sp.gov.br/curriculopaulista/wp-content/uploads/downloads/Anos%20iniciais%20EM/Habilidades%20essenciais_Anos%20Iniciais_Matem%C3%A1tica.pdf)

As fontes foram consultadas em setembro de 2026 e refletem a versão da BNCC vigente naquele momento; recomenda-se revisar periodicamente caso a base curricular seja atualizada.

## Sobre

O DuoMath foi idealizado por Fernando Zimmermann como uma ferramenta para acompanhar e apoiar o aprendizado de matemática de suas duas filhas, com carinho e dedicação.

Este projeto é dedicado a Isabella e Helena: que cada gráfico, cada exercício e cada conquista aqui dentro sirva de incentivo para que continuem curiosas e confiantes diante dos números.
