# Deploy no GitHub Pages

Por que aqui: o Pages dá HTTPS de graça, e **HTTPS é o que destrava o PWA** — service worker,
uso offline e "adicionar à tela inicial" só funcionam em origem segura. Na LAN em `http://`
o app abre mas não instala.

O que vai para o GitHub é só o código. **Nenhum dado das crianças sai do dispositivo**: perfis,
progresso e tentativas ficam no IndexedDB de cada navegador, e a única forma de mover dados é
o backup JSON manual no painel do responsável.

## 1. Criar o repositório

O repositório precisa se chamar **`duomath`** (minúsculo) — o Pages serve de
`https://<usuário>.github.io/duomath/`, e esse subcaminho é o `BASE` do `vite.config.ts`.
Nome diferente = ajustar aquela linha.

Crie vazio em <https://github.com/new>, **público** (Pages em conta gratuita só publica de
repositório público), sem README/gitignore/licença.

## 2. Publicar

O commit inicial já está feito localmente. Com o repositório criado:

```bash
git remote add origin https://github.com/<usuário>/duomath.git
git push -u origin main
```

## 3. Ligar o Pages — passo manual obrigatório

No repositório: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

**Esse clique não é opcional e tem que vir antes do primeiro deploy.** Sem ele, o workflow
falha no passo `actions/configure-pages` com "Get Pages site failed", mesmo com `npm ci`, lint
e build todos verdes — o que engana, porque parece problema de build. O input
`enablement: true` do `configure-pages@v5` existe justamente para criar o site pela API e
dispensar o clique, mas **não funcionou** neste repositório (usuário, público, `permissions:
pages: write` declarado no workflow): o passo continuou falhando e o log do job só é legível
com direitos de admin. Conclusão prática: trate o toggle como parte do setup, não como
fallback.

Não precisa escolher branch nem criar `gh-pages`: o workflow usa o deploy nativo de Pages.
Depois disso, todo push na `main` reconstrói e republica (acompanhe na aba **Actions**);
`workflow_dispatch` permite disparar à mão.

A URL final aparece no próprio job de deploy e em Settings → Pages.

## 4. Instalar nos dispositivos

- **Android/Chrome**: abra a URL → menu → "Instalar app" / "Adicionar à tela inicial".
- **iPad/iPhone (Safari)**: Compartilhar → "Adicionar à Tela de Início". No iOS isso **só**
  funciona no Safari, não no Chrome.
- **Desktop (Chrome/Edge)**: ícone de instalar na barra de endereço.

## 5. Checklist de validação

1. A URL abre com cadeado, sem alerta de certificado.
2. DevTools → Application → Service Workers: um worker `activated`.
3. Navegue até um exercício e dê F5: tem que continuar funcionando (valida o `dist/404.html`,
   que é o fallback de SPA — o Pages não tem rewrite).
4. Instale, abra em modo standalone (sem barra de endereço), ligue o modo avião e recarregue:
   app carrega e o progresso continua lá.
5. Painel do responsável → "Exportar tudo (JSON)" → importar em outro dispositivo.

## Gotchas

- **Progresso não migra de origem.** IndexedDB é isolado por origem, então o que foi treinado
  em `http://localhost:4173` não aparece em `github.io`. Se já houver progresso que importe,
  exporte o JSON antes e importe depois de publicar.
- **Deep link volta HTTP 404 mesmo funcionando.** O `404.html` é servido com status 404 por
  design do Pages; o app renderiza normalmente. Não é erro a ser corrigido.
- **Um deploy pode levar alguns minutos para propagar** na primeira vez que o Pages é ligado.
  Se a URL der 404 logo depois, confira se o job terminou verde em Actions antes de investigar
  qualquer outra coisa.
- **Depois de publicar uma correção, uma aba/app já aberto pode continuar com o código velho**
  por alguns instantes — `src/pwa/swUpdate.ts` recarrega quando o service worker novo assume.
  Ao testar, feche e reabra o app instalado antes de concluir que a correção não funcionou.
