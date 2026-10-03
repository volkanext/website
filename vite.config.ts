import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig, type Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import {
  SITE_URL,
  SITE_URL_IS_PLACEHOLDER,
  headHtml,
  robotsTxt,
  routes,
  sitemapXml,
} from './src/data/seo.ts'

/**
 * Inyecta los metadatos y el JSON-LD de la home en index.html.
 *
 * Se hace en build y no desde React a propósito: como el resto del sitio se
 * prerenderiza, los crawlers sin JS (Facebook, LinkedIn, X, WhatsApp) leen
 * el HTML estático. El texto de los tags lo genera headHtml() en
 * src/data/seo.ts, el mismo que usa el prerender para las subpáginas, así
 * que no hay dos juegos de metadatos que puedan divergir.
 *
 * El bloque va entre marcadores porque scripts/prerender.mjs reutiliza este
 * mismo index.html como template de cada ruta: tiene que poder reemplazar el
 * head de la home por el de la ruta destino sin depender de un regex frágil.
 */
function seoPlugin(): Plugin {
  const home = routes[0]
  let isSsrBuild = false

  return {
    name: 'volkanext-seo',
    configResolved(config) {
      isSsrBuild = Boolean(config.build.ssr)
    },
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        const head = `    <!-- seo-head:start -->\n    ${headHtml(home)
          .split('\n')
          .join('\n    ')}\n    <!-- seo-head:end -->\n`
        return html.replace('</head>', `${head}  </head>`)
      },
    },
    // Se emiten acá y no como archivos en public/ para que robots.txt y
    // sitemap.xml contengan SITE_URL sin editar nada a mano.
    generateBundle() {
      // El build SSR no produce index.html, así que estos archivos solo
      // aparecerían duplicados dentro de dist-ssr.
      if (isSsrBuild) return

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: robotsTxt(),
      })

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: sitemapXml(new Date().toISOString().slice(0, 10)),
      })
    },
  }
}

if (SITE_URL_IS_PLACEHOLDER) {
  console.warn(
    '\n[seo] SITE_URL sigue siendo el placeholder "' +
      SITE_URL +
      '".\n[seo] canonical, og:url, sitemap.xml y JSON-LD apuntarán a un dominio\n' +
      '[seo] inexistente. Reemplazalo en src/data/seo.ts antes de publicar.\n',
  )
}

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    seoPlugin(),
  ],
})
