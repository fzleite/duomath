# DuoMath — notas de arquitetura

PWA standalone (receita `pwa-standalone:pwa-scaffold`). Fonte da verdade funcional:
`Duomath - Especificação do Projeto.md` (nome do arquivo mantido como está).

## Invariantes do projeto

- **O nome do produto se escreve `DuoMath`** (D e M maiúsculos) em toda a interface. Os
  identificadores de DADOS ficam como estão e não devem ser "corrigidos": `DB_NAME = 'duomath'`,
  `format: 'duomath-backup'`, o prefixo do arquivo de backup e o `base` `/duomath/`. Mudar
  qualquer um deles orfana o IndexedDB instalado, quebra backups antigos ou derruba o deploy.

- **Sem backend, sem autenticação, sem rede.** Nada de fetch para servidor próprio; todo dado
  vive no IndexedDB do dispositivo. Portabilidade entre dispositivos é backup JSON manual,
  não sync.
- **Duas categorias de módulo**, ambas autocontidas e registradas em `src/modules/registry.ts`:
  - `'conteudo'` — exercícios **declarados** em etapas, progresso por exercício resolvido,
    trilha com desbloqueio sequencial. O motor (`ExercisePlayer`) cuida de tempo, tentativas,
    progresso, KPIs e Pizinho; o módulo só declara exercícios e sabe renderizá-los.
  - `'jogo'` — perguntas **sorteadas** (conjunto infinito, sem ids fixos), progressão por
    critério de desempenho cronometrado, acesso livre a qualquer momento. Traz a própria tela
    (`GameView`, rota `/jogo/:moduleId`) porque a mecânica não cabe no motor de etapas.
- **Barra de título fixa em todas as páginas** (`src/components/AppShell.tsx`), com navegação
  dupla: assunto na barra lateral (desktop) / hambúrguer (celular) — a mesma marcação, quem
  decide é o CSS — e séries em abas dentro do hub.
- **`Stage.years` é obrigatório** e é o que alimenta a navegação por série. Etapa sem `years`
  simplesmente não aparece na aba de nenhum ano; o `check:content` reprova.
- **Tela da criança tem poucos controles e só os 2 KPIs essenciais** (progresso do módulo e
  taxa de acerto de primeira). Métrica detalhada é no painel do responsável.
- **`attempts` é append-only** — é a fonte de todas as métricas (taxa de primeira tentativa,
  tentativas por exercício, repetição de exercício já acertado, tempo por pergunta nos jogos).
  Nunca reescrever nem agregar destrutivamente: as agregações ficam em `src/data/metrics.ts`,
  derivadas em leitura.
- **Módulo de jogo NÃO grava `progress`** (`recordGameAttempt`, não `recordAnswer`): acumular
  ids de perguntas sorteadas num `StageProgress` cresceria sem limite e não significaria nada.
  Desbloqueio de nível é derivado das tentativas em tempo de leitura.
- **`Attempt.tag` é o agrupador do item sorteado** (ex: `'8'` = tabuada do 8) — é o que permite
  comparar desempenho por tabuada apesar do sorteio aleatório. Campo opcional: módulos de
  conteúdo não usam.
- **Média de tempo considera só respostas certas** — errar rápido não é ser rápido, e o
  desbloqueio de nível exige acerto mínimo junto com o tempo alvo.
- Textos de UI e conteúdo dos exercícios em pt-BR. Identificadores e comentários em ASCII.

## Gotchas já resolvidos (não re-derivar)

- **Nunca dar `await` em algo que não seja request IDB com transação aberta** — a transação
  commita sozinha no próximo tick e quebra com "The transaction has finished.", de forma
  confiável só em CPU mobile. Leituras/parse antes, transação depois (padrão em
  `repo.recordAnswer` e `backup.importWorkspace`).
- **Store nova no IndexedDB exige subir `DB_VERSION`** no mesmo commit do
  `createObjectStore` — o check `contains()` engana: sem o bump, quem já tem o app instalado
  nunca recebe a store. Índices também precisam nascer no mesmo bloco.
- **Campo novo no backup entra opcional, lido com fallback vazio** — backup antigo tem que
  continuar restaurando.
- **`ExerciseView` recebe `key={exercise.id}`** no player; sem isso o estado local da view
  (sliders, ordem embaralhada das opções) vaza de um exercício para o próximo.
- **A resposta certa está sempre no índice 0 nos dados dos exercícios** e é embaralhada na
  renderização — ao escrever exercício novo, mantenha essa convenção.
- **`registerType: 'autoUpdate'` não recarrega aba já aberta**; quem faz isso é
  `src/pwa/swUpdate.ts`. Ao debugar "minha correção não apareceu", suspeite de service worker
  velho antes do código.
- **PWA em `http://` na LAN não instala nem roda offline** (origem insegura) — foi o que levou
  o deploy para o GitHub Pages (`docs/deploy-github-pages.md`); o Apache local com certificado
  confiável segue documentado em `docs/deploy-apache.md`.
- **O app vive em subcaminho no Pages** (`/duomath/`): `BASE` no `vite.config.ts` é a única
  fonte disso — `basename` do router, `start_url`, `scope` e `navigateFallback` derivam dele.
  Renomear o repositório exige mudar essa linha.
- **Fallback de SPA no Pages é `dist/404.html`** (gerado por `tools/spa-fallback.mjs` no build),
  não rewrite de servidor. Ele volta com status HTTP 404 por design e isso não afeta o app.
- Service worker/manifest só valem em build de produção; `npm run dev` não exercita isso.

## Módulo novo é (quase sempre) só um arquivo de dados

`QuizExercise` + `QuizExerciseView` (em `src/modules/shared/`) cobrem o formato "enunciado +
visual opcional + alternativas". Os visuais vivem num catálogo único
(`src/components/Visual.tsx`): arranjo, grupos, fração, grade de cem, contagem, reta numérica,
grade de área, contorno e blocos 3D. Um módulo novo desse tipo referencia o visual pelo nome e
não escreve componente nenhum. Frações é a exceção: tem interações próprias (comparar, montar
com slider), então mantém a própria view.

**Etapa declarada sem exercícios é intencional.** Os módulos de Álgebra, Geometria e
Probabilidade têm as etapas em `stages.ts` com a progressão da BNCC, `exercises: []`, e aparecem
na navegação como "conteúdo em preparação". Isso mantém o plano visível sem conteúdo inventado.
Regra que o código já respeita: etapa vazia nunca conta como concluída (senão destravaria a
seguinte de graça) e não é jogável.

## A Tabuada são dois módulos, de propósito

O spec pede duas partes complementares, e elas caem em categorias diferentes:

- `src/modules/tabuada-estudo/` — id **`tabuada-estudo`**, categoria `conteudo`, seção Conteúdo.
  3 etapas por Bloom com apoio visual (arranjo retangular e soma de grupos iguais). Alimenta o
  mesmo progresso/KPI dos demais módulos de conteúdo.
- `src/modules/tabuada/` — id **`tabuada`**, categoria `jogo`, seção Jogos. Treino cronometrado.

**Os ids não podem ser trocados**: `tabuada` já era o id do jogo quando o estudo foi criado, e
já existem tentativas gravadas com ele. Renomear o jogo orfanaria o histórico de quem já treinou
(`Attempt.moduleId` não é migrado). O estudo aponta para o jogo via `companionGameId`, que a
trilha de etapas usa para oferecer o atalho.

## Parâmetros do módulo de Tabuada (escolhidos por mim, feitos para calibrar)

O spec diz "por exemplo, um tempo médio de resposta abaixo de um limite alvo" e deixa os
números em aberto. Todos estão em `src/modules/tabuada/questions.ts`, num lugar só:

- Sessão de **10 perguntas** (`SESSION_SIZE`).
- **Avançado** abre com 30 acertos no fácil, média ≤ 5s e ≥ 80% de acerto.
- **Contas aleatórias** abre com 30 acertos no avançado, média ≤ 9s e ≥ 75% de acerto.
- Avançado sorteia tabuada de 1 a 100 × multiplicador de 1 a 10; contas soltas usam
  11–50 × 2–12, só multiplicação (o spec exemplifica "25 vezes 8").
- Entrada por **teclado numérico próprio**, não o do sistema: o nativo cobre metade da tela do
  tablet e demora a abrir, o que sujaria a medição de tempo — que é o que o módulo mede.

## Verificação de conteúdo é parte do build

`npm run check:content` (e o `npm run build`, que o chama antes do Vite) valida a aritmética das
alternativas, o visual batendo com o enunciado, ids únicos, a convenção `options[0]`, a
progressão de Bloom dentro da etapa e a cobertura por ano escolar. Erro de matemática passa por
build e lint sem reclamar — e ensina a coisa errada para uma criança. Ao escrever exercício
novo, rode isso antes de commitar.

Só importa arquivos de DADOS. É por isso que os módulos declarados guardam as etapas em
`stages.ts` e não no `index.ts`: `index.ts` importa componente React, e o executor de `.ts` do
Node não processa JSX.

## Pendências de conteúdo (decisões já tomadas, execução aberta)

Quatro componentes interativos que o spec pede e que são cada um um ciclo à parte — é o que
bloqueia o conteúdo de Álgebra, Geometria e Probabilidade:

1. **Plano cartesiano com sliders de coeficiente** (Álgebra 4 e 6): reta e parábola se
   transformando em tempo real, com as raízes ligadas aos cortes no eixo x.
2. **Balança de equilíbrio** (Álgebra 2): equação do 1º grau como os dois pratos.
3. **Círculo trigonométrico interativo + triângulo manipulável** (Geometria 6).
4. **Instrumentos de desenho simulados** (Geometria 4: mediatriz, bissetriz, polígonos
   regulares) e **construtor de gráficos** (Probabilidade 2, onde a criança monta o gráfico a
   partir dos dados em vez de escolher alternativa).

- **Reta numérica** (posicionar fração na reta) aparece na Etapa 2 do spec, mas precisa de um
  tipo de exercício com interação própria (arrastar/marcar ponto) — hoje só existe como visual
  de leitura, usado em Primeiros Números.
- Soma/subtração de frações na Etapa 3 está como alternativa de texto; a versão visual
  (juntar dois desenhos) seria mais fiel à proposta do app.
- Etapas 2 e 3 têm 6 exercícios cada, suficiente para exercitar a mecânica — volume de
  conteúdo por etapa ainda vai crescer.
