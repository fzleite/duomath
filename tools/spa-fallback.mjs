/**
 * Fallback de SPA no GitHub Pages.
 *
 * O Pages e hospedagem estatica pura: nao tem rewrite (o papel que o mod_rewrite do
 * .htaccess faz no Apache). Sem isso, abrir/recarregar direto em /duomath/modulo/fracoes
 * devolve a pagina de erro do GitHub, porque nao existe esse arquivo.
 *
 * O truque padrao: servir uma copia do index.html como 404.html. O Pages entrega esse
 * arquivo para qualquer caminho inexistente, o React Router assume no cliente e a rota
 * funciona. O status HTTP e 404, o que nao afeta o app (o navegador renderiza o HTML
 * normalmente), e o service worker cobre o caso offline via navigateFallback.
 */

import { copyFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const dist = join(import.meta.dirname, '..', 'dist')
const index = join(dist, 'index.html')

if (!existsSync(index)) {
  console.error('dist/index.html nao existe — rode o build antes.')
  process.exit(1)
}

copyFileSync(index, join(dist, '404.html'))
console.log('dist/404.html criado (fallback de SPA do GitHub Pages)')
