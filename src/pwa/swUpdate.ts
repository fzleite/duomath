/**
 * Segunda metade do problema de atualizacao do PWA.
 *
 * registerType: 'autoUpdate' faz o service worker NOVO chamar skipWaiting()+clientsClaim()
 * assim que instala, mas nada escuta o 'controllerchange' resultante — uma aba deixada aberta
 * (o normal num PWA instalado) segue rodando o JS antigo depois de um deploy, o que faz
 * correcoes recem-publicadas parecerem "nao funcionar".
 */

const UPDATE_CHECK_INTERVAL_MS = 60 * 60 * 1000

export function initServiceWorkerAutoUpdate(): void {
  if (!('serviceWorker' in navigator)) return

  let reloading = false
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (reloading) return // controllerchange pode disparar mais de uma vez; evita loop de reload
    reloading = true
    window.location.reload()
  })

  navigator.serviceWorker.ready.then((registration) => {
    // navegadores so checam por SW novo em navegacao ou ~1x/24h; um check explicito pega deploy novo
    setInterval(() => void registration.update(), UPDATE_CHECK_INTERVAL_MS)
  })
}
