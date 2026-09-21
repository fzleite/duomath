# Duomath — notas de arquitetura

PWA standalone (receita `pwa-standalone:pwa-scaffold`). Fonte da verdade funcional:
`Duomath - Especificação do Projeto.md`.

## Invariantes do projeto

- **Sem backend, sem autenticação, sem rede.** Nada de fetch para servidor próprio; todo dado
  vive no IndexedDB do dispositivo. Portabilidade entre dispositivos é backup JSON manual,
  não sync.
- **Um módulo matemático é autocontido**: declara etapas/exercícios e renderiza os seus tipos
  de exercício; registra-se em `src/modules/registry.ts`. Progresso, KPIs, Pizinho e o painel
  do responsável são do motor (`ExercisePlayer`) e valem para qualquer módulo novo.
- **Tela da criança tem poucos controles e só os 2 KPIs essenciais** (progresso do módulo e
  taxa de acerto de primeira). Métrica detalhada é no painel do responsável.
- **`attempts` é append-only** — é a fonte de todas as métricas (taxa de primeira tentativa,
  tentativas por exercício, repetição de exercício já acertado). Nunca reescrever nem agregar
  destrutivamente: as agregações ficam em `src/data/metrics.ts`, derivadas em leitura.
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

## Pendências de conteúdo (decisões já tomadas, execução aberta)

- **Reta numérica** (posicionar fração na reta) aparece na Etapa 2 do spec, mas precisa de um
  tipo de exercício com interação própria (arrastar/marcar ponto) — hoje não existe.
- Soma/subtração de frações na Etapa 3 está como alternativa de texto; a versão visual
  (juntar dois desenhos) seria mais fiel à proposta do app.
- Etapas 2 e 3 têm 6 exercícios cada, suficiente para exercitar a mecânica — volume de
  conteúdo por etapa ainda vai crescer.
