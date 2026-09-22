import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// O GitHub Pages serve de https://<usuario>.github.io/<repo>/, ou seja, de um SUBCAMINHO —
// dai o base com o nome do repositorio. start_url, scope, navigateFallback e o basename do
// router derivam daqui (import.meta.env.BASE_URL), entao mudar de host e mudar so esta linha:
// raiz de dominio (Apache local, Netlify, Cloudflare) volta a ser '/'.
const BASE = '/duomath/'

export default defineConfig({
  base: BASE,
  plugins: [
    react(),
    VitePWA({
      strategies: 'generateSW',
      registerType: 'autoUpdate',
      includeAssets: ['icons/apple-touch-icon.png', 'icons/favicon-32.png'],
      manifest: {
        name: 'DuoMath',
        short_name: 'DuoMath',
        description: 'Matematica visual e interativa, um modulo por vez.',
        lang: 'pt-BR',
        start_url: BASE,
        scope: BASE,
        display: 'standalone',
        orientation: 'any',
        background_color: '#ffffff',
        theme_color: '#1a936f',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          // maskable separado: arte em ~80% do canvas, senao a mascara do Android corta as bordas
          { src: 'icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // 'webmanifest' nao entra no subset default do plugin
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,webmanifest}'],
        // default e 2MB e arquivos maiores sao silenciosamente pulados do precache
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        // obrigatorio com roteamento client-side: deep link/refresh offline daria 404
        navigateFallback: `${BASE}index.html`,
      },
    }),
  ],
  server: {
    host: true,
    watch: {
      // arquivos temporarios de editor de imagem travados no Windows derrubam o dev server (EBUSY)
      ignored: ['**/*.pdnSave', '**/*.xcf~', '**/~$*', '**/assets-src/**'],
    },
  },
})
