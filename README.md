# DuoMath

PWA de matemática visual e interativa — um "Duolingo da matemática" para uso doméstico,
alinhado à BNCC do 1º ao 9º ano: trilha de conteúdo por série ou por assunto, e treino
cronometrado de tabuada.
100% client-side: sem backend, sem autenticação, sem conta. Todo progresso fica no IndexedDB
do próprio navegador, com backup/restauração em JSON.

Especificação funcional: [`Duomath - Especificação do Projeto.md`](./Duomath%20-%20Especificação%20do%20Projeto.md)

## Stack

Vite + React + TypeScript · `vite-plugin-pwa` (generateSW/autoUpdate) · IndexedDB via `idb` ·
Zustand · React Router. Sem biblioteca de UI: CSS com tokens em `src/index.css`.

## Comandos

```bash
npm install
npm run dev             # dev server (host habilitado: acessível pela LAN)
npm run build           # tipos + verificação de conteúdo + vite build → dist/
npm run preview         # serve o dist/ buildado
npm run lint            # oxlint
npm run check:content   # aritmética, visuais, Bloom e cobertura por ano escolar
python tools/gen_icons.py   # regenera os ícones do PWA a partir de código
```

## Estrutura

```text
src/
  data/       IndexedDB (db, repo, backup JSON, métricas derivadas)
  modules/    um diretório por assunto + registry.ts (categorias: conteúdo e jogo)
              shared/  QuizExercise + view compartilhada
  screens/    perfis, hub, trilha, player, jogo, painel do responsável, sobre
  components/ AppShell (barra de título + navegação), Visual (catálogo de apoios
              visuais), FractionShape, DotArray, NumberPad, Pizinho (mascote)
  state/      store Zustand (perfil ativo, progresso do perfil em memória)
  pwa/        swUpdate.ts (recarrega aba antiga após deploy)
tools/        ícones, fallback de SPA e verificação de conteúdo
public/       ícones + .htaccess (vai para dist/)
```

## Navegação

Duas formas de chegar ao conteúdo, como o spec pede: **por série** (abas de 1º a 9º ano, na
sequência da BNCC — cada etapa declara os anos a que pertence em `Stage.years`) e **por
assunto** (barra lateral fixa no desktop, menu hambúrguer no celular). A barra de título é fixa
em todas as páginas.

## Módulos

O hub separa duas categorias, e o contrato de cada uma está em `src/modules/types.ts`:

- **Conteúdo** (`ContentModule`) — exercícios declarados em etapas, trilha com desbloqueio
  sequencial. Oito módulos, 40 etapas, 214 exercícios cobrindo 1º a 9º ano: **Primeiros
  Números**, **Frações**, **Tabuada (estudo)**, **Porcentagem**, **Grandezas e Medidas**,
  **Álgebra**, **Geometria e Trigonometria** e **Probabilidade e Estatística**. Para criar um
  do formato comum, basta um `exercises.ts` com `QuizExercise` e registrar em `registry.ts` —
  view, visuais e formas de resposta já são compartilhados.

  Quatro formas de responder: alternativas, entrada numérica pelo teclado do app, ajuste de
  coeficientes com prévia ao vivo (reta, parábola, círculo trigonométrico, gráfico de barras) e
  escolha de ponto na reta ou no plano cartesiano.
- **Jogo** (`GameModule`) — perguntas sorteadas, cronometradas, com níveis que abrem por
  desempenho e acesso livre a qualquer momento. Hoje: **Tabuada (treino)**. Traz a própria tela
  (`GameView`) e grava tentativas com `tag` para estatística por item sorteado.

A Tabuada existe nas duas categorias, como o spec pede: o estudo (`tabuada-estudo`) ensina a
multiplicação com apoio visual e progressão por Bloom; o treino (`tabuada`) automatiza o cálculo
mental contra o cronômetro. O estudo aponta para o treino por `companionGameId`.

Os módulos do roadmap (porcentagem, álgebra, geometria/trigonometria) já estão registrados
com `status: 'soon'` e aparecem como cards desabilitados.

## Deploy

Alvo principal: **GitHub Pages** (HTTPS, o que é o que permite instalar o app) — push na `main`
dispara [o workflow](./.github/workflows/deploy.yml). Passo a passo e validação:
[docs/deploy-github-pages.md](./docs/deploy-github-pages.md).

O repositório precisa se chamar `duomath`, porque o Pages serve de
`https://<usuário>.github.io/duomath/` e esse subcaminho é o `BASE` do
[vite.config.ts](./vite.config.ts). Para servir na raiz de um domínio (Apache local,
Netlify, Cloudflare), volte `BASE` para `/`: `start_url`, `scope`, `navigateFallback` e o
`basename` do router derivam dele.

Alternativa em rede doméstica (Apache): [docs/deploy-apache.md](./docs/deploy-apache.md) — exige
certificado local confiável, já que `http://` em IP de LAN não instala nem roda offline.
