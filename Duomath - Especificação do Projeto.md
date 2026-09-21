# Duomath - Especificação do Projeto

2026-09-19 · @Someone

## Visão geral e objetivo

O Duomath é uma ferramenta web progressiva (PWA), em HTML e JavaScript, para ajudar a filha de Fernando a estudar conceitos de matemática de forma visual e interativa. O projeto nasce com o módulo de Frações, mas é desenhado como um hub extensível: novos módulos (porcentagem, álgebra, trigonometria - seno, cosseno, tangente, ângulos) serão adicionados conforme ela avança na escola.

A proposta é funcionar como um Duolingo da matemática: exercícios visuais, progresso acompanhável por etapas, e um mascote que guia e incentiva.

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
