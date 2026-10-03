import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = fileURLToPath(new URL('../', import.meta.url))
const DIST = join(ROOT, 'dist')

// El bundle SSR toma el nombre de su entry: src/ssr/prerender.ts.
const SSR_ENTRY = join(ROOT, 'dist-ssr', 'prerender.js')

const TEMPLATE_PATH = join(DIST, 'index.html')
const NOT_FOUND_PATH = join(DIST, '404.html')

/** Marcadores que escribe el plugin `volkanext-seo` en vite.config.ts. */
const HEAD_START = '<!-- seo-head:start -->'
const HEAD_END = '<!-- seo-head:end -->'

const HEAD_BLOCK = new RegExp(
  `${HEAD_START.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${HEAD_END.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`,
)

const HOME_ROUTE = '/'
const EMPTY_ROOT = '<div id="root"></div>'

async function main() {
  // pathToFileURL es obligatorio en Windows: import() con una ruta absoluta
  // "F:\..." se interpreta como un esquema ESM desconocido y revienta con
  // ERR_UNSUPPORTED_ESM_URL_SCHEME.
  const { render, renderNotFound, routes, SITE_URL_IS_PLACEHOLDER } =
    await import(pathToFileURL(SSR_ENTRY).href)

  const template = await readFile(TEMPLATE_PATH, 'utf8')

  if (!template.includes(EMPTY_ROOT)) {
    throw new Error(
      'El template de dist/index.html no tiene un #root vacío. El prerender no puede inyectar el HTML.',
    )
  }

  if (!template.includes(HEAD_START)) {
    throw new Error(
      'El template de dist/index.html no tiene los marcadores del plugin seo. Revisá que volkanext-seo siga registrado en vite.config.ts.',
    )
  }

  if (SITE_URL_IS_PLACEHOLDER) {
    console.warn(
      '[prerender] SITE_URL sigue siendo un placeholder: canonical, og:url y JSON-LD apuntan a un dominio inexistente.',
    )
  }

  // Se saca el head de la home del template: cada ruta escribe el suyo. La
  // home también se rerenderiza, porque es la página que más importa y sin
  // esto seguiría siendo la única que dependería de que el visitante ejecute
  // JS para ver su contenido.
  const shell = template.replace(HEAD_BLOCK, '')

  const written = []

  for (const route of routes) {
    const { html, head } = render(route.path)

    const page = shell
      .replace(
        '</head>',
        `    ${HEAD_START}\n    ${head.split('\n').join('\n    ')}\n    ${HEAD_END}\n  </head>`,
      )
      .replace(EMPTY_ROOT, `<div id="root">${html}</div>`)

    if (route.path === HOME_ROUTE) {
      await writeFile(TEMPLATE_PATH, page, 'utf8')
      written.push('/')
      continue
    }

    const outDir = join(DIST, route.path.replace(/^\/|\/$/g, ''))
    await mkdir(outDir, { recursive: true })
    await writeFile(join(outDir, 'index.html'), page, 'utf8')
    written.push(route.path)
  }

  // La 404 la sirve el host para URLs desconocidas. Se marca noindex para que
  // nunca entre al índice, y no lleva canonical: canonical aquí apuntaría a la
  // home y le diría a Google que la URL inexistente es duplicada de la home.
  // El cuerpo sale de renderNotFound(), que pasa por el router real.
  const notFound = renderNotFound()
  await writeFile(
    NOT_FOUND_PATH,
    shell
      .replace(
        '</head>',
        `    ${HEAD_START}\n    ${notFound.head.split('\n').join('\n    ')}\n    ${HEAD_END}\n  </head>`,
      )
      .replace(EMPTY_ROOT, `<div id="root">${notFound.html}</div>`),
    'utf8',
  )

  console.log(
    `[prerender] ${written.length} rutas prerenderizadas + 404.html: ${written.join(' ')}`,
  )
}

await main()