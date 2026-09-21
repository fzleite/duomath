# Duomath — notas de arquitetura

PWA standalone (receita `pwa-standalone:pwa-scaffold`). Fonte da verdade funcional:
`Duomath - Especificação do Projeto.md`.

## Invariantes do projeto

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

## Pendências de conteúdo (decisões já tomadas, execução aberta)

- **Reta numérica** (posicionar fração na reta) aparece na Etapa 2 do spec, mas precisa de um
  tipo de exercício com interação própria (arrastar/marcar ponto) — hoje não existe.
- Soma/subtração de frações na Etapa 3 está como alternativa de texto; a versão visual
  (juntar dois desenhos) seria mais fiel à proposta do app.
- Etapas 2 e 3 têm 6 exercícios cada, suficiente para exercitar a mecânica — volume de
  conteúdo por etapa ainda vai crescer.
