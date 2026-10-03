import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from '../App'
import { headHtml, routeMeta, routes, SITE_URL_IS_PLACEHOLDER } from '../data/seo'

export interface RenderResult {
  html: string
  head: string
  route: string
}

/**
 * Renderiza una ruta a HTML estático para el prerender.
 *
 * El mismo App que se hidrata en el cliente se ejecuta acá con StaticRouter,
 * que es idéntico a BrowserRouter salvo que no toca el historial. Esa
 * equivalencia es la condición para que la hidratación no genere warnings:
 * el HTML prerenderizado y el primer render del cliente tienen que coincidir.
 *
 * Se usa createElement en lugar de JSX a propósito: así el archivo queda como
 * .ts y no lo toma la regla react-refresh/only-export-components, que exige que
 * un módulo de componentes exporte solo componentes.
 *
 * Devuelve también el head de la ruta para que el script de prerender lo
 * inyecte en el HTML antes de escribirlo en disco.
 */
export function render(url: string): RenderResult {
  const meta = routeMeta(url)

  const html = renderToString(
    createElement(
      StaticRouter,
      { location: url },
      createElement(App),
    ),
  )

  return { html, head: headHtml(meta), route: meta.path }
}

/**
 * Renderiza la página 404 a través del router real, en vez de duplicar su HTML
 * a mano en el script de prerender.
 *
 * La copia manual se desincronizó del componente: la 404 servida decía
 * "Casos que comparten nuestro trabajo" mientras el componente ya decía otra
 * cosa. Al pasar por el mismo App, la ruta `*` cae en NotFound y no hay dos
 * versiones que mantener.
 *
 * No lleva head: la 404 va marcada como noindex y sin canonical, así que solo
 * necesita el <title>.
 */
export function renderNotFound(): RenderResult {
  const html = renderToString(
    createElement(
      StaticRouter,
      { location: '/404' },
      createElement(App),
    ),
  )

  return {
    html,
    head: `<title>Página no encontrada (404) | VOLKANEXT</title>
    <meta name="robots" content="noindex, follow" />`,
    route: '/404',
  }
}

/**
 * Se reexportan desde acá porque scripts/prerender.mjs corre en Node y no
 * compila TypeScript: toma las rutas y los metadatos del mismo bundle SSR,
 * con lo que no puede desincronizarse de lo que la app realmente enruta.
 */
export { routes, SITE_URL_IS_PLACEHOLDER }