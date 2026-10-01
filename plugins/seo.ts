import type { Plugin } from 'vite'
import {
  seoConfig as config,
  seoContact,
  seoFaqs,
  seoServices,
} from './seo.config.ts'

const START = '<!--seo:start-->'
const END = '<!--seo:end-->'

const absolute = (path: string) => `${config.siteUrl}${path}`

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

function buildJsonLd() {
  const graph = [
    {
      '@type': config.organization.type,
      '@id': `${absolute('/')}#organization`,
      additionalType: config.organization.additionalType,
      name: config.organization.name,
      url: absolute('/'),
      description: config.description,
      logo: {
        '@type': 'ImageObject',
        url: absolute(config.paths.icon512),
        width: 512,
        height: 512,
      },
      image: absolute(config.image.path),
      email: `mailto:${seoContact.email}`,
      telephone: seoContact.phoneDigits,
      address: {
        '@type': 'PostalAddress',
        addressLocality: seoContact.addressLocality,
        addressCountry: seoContact.addressCountry,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: Number(config.geo.coordinates.split(',')[0].trim()),
        longitude: Number(config.geo.coordinates.split(',')[1].trim()),
      },
      areaServed: config.organization.areaServed.map((name) => ({
        '@type': 'Place',
        name,
      })),
      knowsLanguage: config.organization.languages,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: seoContact.email,
        telephone: seoContact.phoneDigits,
        availableLanguage: config.organization.languages,
        areaServed: 'Global',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios de desarrollo de software',
        itemListElement: seoServices.map((service) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.name,
            description: service.description,
          },
        })),
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${absolute('/')}#website`,
      url: absolute('/'),
      name: config.organization.name,
      description: config.description,
      inLanguage: config.locale,
      publisher: { '@id': `${absolute('/')}#organization` },
    },
    {
      '@type': 'FAQPage',
      '@id': `${absolute('/')}#faq`,
      inLanguage: config.locale,
      mainEntity: seoFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ]

  const json = JSON.stringify(
    { '@context': 'https://schema.org', '@graph': graph },
    null,
    2,
  ).replace(/<\//g, '<\\/')

  return `    <script type="application/ld+json">\n${json}\n    </script>`
}

function buildHead() {
  const canonical = absolute('/')
  const image = absolute(config.image.path)
  const title = escapeHtml(config.title)
  const socialTitle = escapeHtml(config.socialTitle)
  const description = escapeHtml(config.description)
  const imageAlt = escapeHtml(config.image.alt)

  return [
    START,
    `    <title>${title}</title>`,
    `    <meta name="description" content="${description}" />`,
    ``,
    `    <meta name="theme-color" content="${config.themeColor}" />`,
    `    <link rel="icon" type="image/png" sizes="32x32" href="${config.paths.favicon32}" />`,
    `    <link rel="icon" type="image/png" sizes="16x16" href="${config.paths.favicon16}" />`,
    `    <link rel="apple-touch-icon" href="${config.paths.appleTouchIcon}" />`,
    `    <link rel="manifest" href="${config.paths.manifest}" />`,
    ``,
    `    <link rel="canonical" href="${canonical}" />`,
    `    <link rel="alternate" hreflang="${config.locale}" href="${canonical}" />`,
    `    <link rel="alternate" hreflang="x-default" href="${canonical}" />`,
    `    <link rel="sitemap" type="application/xml" href="/sitemap.xml" />`,
    ``,
    `    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `    <meta name="author" content="${escapeHtml(config.organization.name)}" />`,
    `    <meta name="geo.region" content="${config.geo.region}" />`,
    `    <meta name="geo.placename" content="${escapeHtml(config.geo.placename)}" />`,
    `    <meta name="ICBM" content="${config.geo.coordinates}" />`,
    ``,
    `    <meta property="og:type" content="website" />`,
    `    <meta property="og:site_name" content="${escapeHtml(config.organization.name)}" />`,
    `    <meta property="og:locale" content="${config.ogLocale}" />`,
    `    <meta property="og:url" content="${canonical}" />`,
    `    <meta property="og:title" content="${socialTitle}" />`,
    `    <meta property="og:description" content="${description}" />`,
    `    <meta property="og:image" content="${image}" />`,
    `    <meta property="og:image:type" content="image/png" />`,
    `    <meta property="og:image:secure_url" content="${image}" />`,
    `    <meta property="og:image:width" content="${config.image.width}" />`,
    `    <meta property="og:image:height" content="${config.image.height}" />`,
    `    <meta property="og:image:alt" content="${imageAlt}" />`,
    ``,
    `    <meta name="twitter:card" content="summary_large_image" />`,
    `    <meta name="twitter:title" content="${socialTitle}" />`,
    `    <meta name="twitter:description" content="${description}" />`,
    `    <meta name="twitter:image" content="${image}" />`,
    `    <meta name="twitter:image:alt" content="${imageAlt}" />`,
    ``,
    buildJsonLd(),
    END,
  ].join('\n')
}

function buildRobotsTxt() {
  // Comentarios en ASCII a proposito: robots.txt no es HTML y algunos parsers
  // de rastreadores antiguos no decodifican UTF-8 en este archivo.
  return `# robots.txt - ${config.organization.name}
# ${config.siteUrl}

# El sitio es 100% publico: no hay panel de administracion, back-office ni
# areas privadas que haya que ocultar, asi que se permite rastrear todo.
User-agent: *
Allow: /

# Este archivo es la via estandar para que los buscadores descubran las URLs
# del sitio. El sitemap.xml lo genera este mismo plugin en cada build.
Sitemap: ${absolute('/sitemap.xml')}

# Solo lo utiliza Yandex (Google y Bing lo ignoran). Declara cual es el host
# canonico para evitar que se indexen variantes como www o http.
Host: ${config.siteUrl}
`
}

function buildSitemap(lastmod: string) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generado por plugins/seo.ts en cada build. No editar a mano. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- El sitio es una SPA de una sola página: las secciones (#servicios,
       #proyectos, etc.) son fragmentos del mismo documento, no URLs distintas,
       y por eso no se listan como entradas independientes. -->
  <url>
    <loc>${absolute('/')}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`
}

const today = () => new Date().toISOString().slice(0, 10)

export function seo(): Plugin {
  return {
    name: 'volkanext-seo',

    transformIndexHtml: {
      // 'post' para que las etiquetas queden después de los <script>/<link>
      // que inyecta Vite, no antes.
      order: 'post',
      handler(html) {
        // Idempotente: en watch/HMR el HTML puede pasar varias veces por el
        // transformador, así que primero se limpia cualquier inyección previa
        // (y el <title>/description estáticos) antes de volver a insertar.
        const cleaned = html
          .replace(/\n?\s*<!--seo:start-->[\s\S]*?<!--seo:end-->/g, '')
          .replace(/\s*<title>[\s\S]*?<\/title>/i, '')
          .replace(/\s*<meta\s+name="description"[^>]*>/i, '')
          .replace(/<html lang="[^"]*"/, `<html lang="${config.locale}"`)

        return cleaned.replace('</head>', `${buildHead()}\n  </head>`)
      },
    },

    // En `vite dev` los archivos de /public se sirven, pero los generados por el
    // plugin solo existirían tras el build. Este middleware los expone también
    // en desarrollo para poder verificarlos con curl.
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = (req.url ?? '').split('?')[0]
        const routes: Record<string, [string, string]> = {
          '/robots.txt': ['text/plain; charset=utf-8', buildRobotsTxt()],
          '/sitemap.xml': ['application/xml; charset=utf-8', buildSitemap(today())],
        }
        const route = routes[path]

        if (!route) {
          next()
          return
        }

        res.setHeader('Content-Type', route[0])
        res.end(route[1])
      })
    },

    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: buildRobotsTxt(),
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: buildSitemap(today()),
      })
    },
  }
}
