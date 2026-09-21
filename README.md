# Duomath

PWA de matemática visual e interativa — um "Duolingo da matemática" para uso doméstico:
trilha de conteúdo (Frações) e treino cronometrado (Tabuada).
100% client-side: sem backend, sem autenticação, sem conta. Todo progresso fica no IndexedDB
do próprio navegador, com backup/restauração em JSON.

Especificação funcional: [`Duomath - Especificação do Projeto.md`](./Duomath%20-%20Especificação%20do%20Projeto.md)

## Stack

Vite + React + TypeScript · `vite-plugin-pwa` (generateSW/autoUpdate) · IndexedDB via `idb` ·
Zustand · React Router. Sem biblioteca de UI: CSS com tokens em `src/index.css`.

## Comandos

```bash
npm install
npm run dev        # dev server (host habilitado: acessível pela LAN)
npm run build      # tsc -b && vite build  → dist/
npm run preview    # serve o dist/ buildado
npm run lint       # oxlint
python tools/gen_icons.py   # regenera os ícones do PWA a partir de código
```

## Estrutura

```text
src/
  data/       IndexedDB (db, repo, backup JSON, métricas derivadas)
  modules/    um diretório por assunto + registry.ts (categorias: conteúdo e jogo)
  screens/    seleção de perfil, hub, trilha de etapas, player, jogo, painel do responsável
  components/ FractionShape (pizza/retângulo/barra), NumberPad, Pizinho (mascote)
  state/      store Zustand (perfil ativo, progresso do perfil em memória)
  pwa/        swUpdate.ts (recarrega aba antiga após deploy)
tools/        geração de ícones + fallback de SPA do build
public/       ícones + .htaccess (vai para dist/)
```

## Módulos

O hub separa duas categorias, e o contrato de cada uma está em `src/modules/types.ts`:

- **Conteúdo** (`ContentModule`) — exercícios declarados em etapas, trilha com desbloqueio
  sequencial. Hoje: **Frações**. Para criar um: `src/modules/<nome>/` com `exercises.ts`
  (etapas + exercícios, cada um com `bloom` e `hint`) e uma view que renderize os tipos
  daquele módulo; registre em `registry.ts`. Hub, trilha, progresso, KPIs e Pizinho vêm do
  motor (`src/screens/ExercisePlayer.tsx`).
- **Jogo** (`GameModule`) — perguntas sorteadas, cronometradas, com níveis que abrem por
  desempenho e acesso livre a qualquer momento. Hoje: **Tabuada**. Traz a própria tela
  (`GameView`) e grava tentativas com `tag` para estatística por item sorteado.

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
