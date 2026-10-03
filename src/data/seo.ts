// Extensiones explícitas porque src/data/seo.ts también lo compila
// tsconfig.node.json (moduleResolution nodenext), que las exige. TypeScript y
// esbuild resuelven "./contact.js" contra contact.ts al importarse desde un
// archivo .ts.
import { contact, socials } from './contact.js'
import { faqs } from './faqs.js'
import { services, type ServiceKey } from './services.js'

/**
 * TODO: reemplazar por el dominio real al registrarlo.
 *
 * Se usa `.example`, un TLD reservado por la IANA que nunca puede registrarse,
 * a propósito: si este valor llega a producción sin cambiar, un `canonical`
 * apuntando a `volkanext.com` (dominio que otro podría tener) desviaría todo
 * el posicionamiento en silencio. Con `.example` el fallo es evidente.
 * El build avisa por consola mientras el valor sea el placeholder.
 */
export const SITE_URL = 'https://volkanext.example'

/** Identifica si SITE_URL sigue siendo el placeholder de desarrollo. */
export const SITE_URL_IS_PLACEHOLDER = SITE_URL.includes('.example')

export const SITE_NAME = 'VOLKANEXT'

export const site = {
  title: 'VOLKANEXT | Desarrollo Web y Software a Medida en Arequipa',
  description:
    'Agencia de desarrollo web y software en Arequipa, Perú. Creamos plataformas SaaS, aplicaciones móviles, ERPs y soluciones en la nube con React, Next.js y Python.',
  locale: 'es_PE',
  lang: 'es',
  themeColor: '#0b0c14',
  ogImage: '/og-image.png',
  ogImageAlt: 'VOLKANEXT — Agencia de desarrollo web y software en Arequipa, Perú',
  twitterSite: '@volkanext',
} as const

export interface RouteMeta {
  /** Ruta interna, siempre con barra inicial y sin barra final (salvo "/"). */
  path: string
  title: string
  description: string
  changefreq: 'weekly' | 'monthly' | 'yearly'
  priority: number
  /** serviceKey si la ruta es la página de un servicio; define el schema Service. */
  serviceKey?: ServiceKey
}

/**
 * Ruta canónica de la página de un servicio, siempre con barra final.
 *
 * Existe como función y no como string suelto porque esa misma ruta se usa
 * para el prerender, el sitemap, el canonical, el breadcrumb y los <Link> del
 * sitio. Duplicarla en cada lugar es exactamente cómo una URL termina
 * apareciendo con y sin barra y Google las indexa como dos páginas distintas.
 *
 * La barra final no es estética: el prerender escribe
 * dist/servicios/<slug>/index.html, así que la URL pública es la del
 * directorio. Además el router matchea las dos formas, pero el canonical solo
 * declara una.
 */
export function servicePath(service: { slug: string }): string {
  return `/servicios/${service.slug}/`
}

const homeMeta: RouteMeta = {
  path: '/',
  title: site.title,
  description: site.description,
  changefreq: 'weekly',
  priority: 1.0,
}

/**
 * Descripciones por servicio, escritas para la intención de búsqueda
 * (contratar desarrollo X en Perú) y no solo para describir el producto.
 */
const serviceDescriptions: Record<ServiceKey, string> = {
  web: 'Desarrollo web a medida en Arequipa y Perú. Plataformas SaaS, portales corporativos y aplicaciones web con Next.js y React, optimizadas para SEO y velocidad.',
  mobile: 'Desarrollo de aplicaciones móviles iOS y Android en Perú. Apps nativas e híbridas con React Native y Flutter, sincronización en tiempo real y notificaciones push.',
  software: 'Software a medida y sistemas ERP para empresas en Perú. Automatización de procesos, dashboards analíticos y microservicios desarrollados a la medida de tu operación.',
  cloud: 'Cloud y DevOps en Perú. Arquitectura escalable en AWS y GCP, integración continua CI/CD, contenedores Docker y Kubernetes, monitoreo y despliegue automatizado.',
  uiux: 'Diseño UI/UX profesional en Perú. Interfaces y prototipos interactivos en Figma, investigación con usuarios y diseño centrado en la conversión y la usabilidad.',
  ai: 'Integración de inteligencia artificial y chatbots para empresas en Perú. IA generativa con OpenAI y Claude, embeddings vectoriales y automatización inteligente de procesos.',
}

const staticRoutes: RouteMeta[] = [
  homeMeta,
  {
    path: '/servicios/',
    title: 'Servicios de Desarrollo Web y Software en Arequipa | VOLKANEXT',
    description:
      'Desarrollo web, apps móviles, software a medida, cloud y DevOps, diseño UI/UX e integración de IA. Seis servicios de ingeniería de software desde Arequipa, Perú.',
    changefreq: 'monthly',
    priority: 0.9,
  },
  {
    path: '/proyectos/',
    title: 'Proyectos de Software y Desarrollo Web | VOLKANEXT',
    description:
      'Casos de demostración de VOLKANEXT: plataformas de analítica financiera, apps móviles de rendimiento deportivo y ERP logístico. Ejemplos de desarrollo de software en Perú.',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    path: '/precios/',
    title: 'Precios de Desarrollo Web y Software en Perú | VOLKANEXT',
    description:
      'Configura tu proyecto y obtén una cotización de desarrollo web y software en soles. Rangos de inversión, plazos y alcances para empresas en Arequipa y Perú.',
    changefreq: 'monthly',
    priority: 0.9,
  },
  {
    path: '/contacto/',
    title: 'Contacto | VOLKANEXT — Agencia de Software en Arequipa',
    description:
      'Escríbenos a volkanext@hotmail.com o llámanos al +51 981 658 221. Agencia de desarrollo web y software en Arequipa, Perú, con alcance global.',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/privacidad/',
    title: 'Política de Privacidad | VOLKANEXT',
    description:
      'Cómo VOLKANEXT recopila, usa y protege tus datos personales conforme a la Ley N.º 29733 de protección de datos personales del Perú.',
    changefreq: 'yearly',
    priority: 0.3,
  },
  {
    path: '/terminos/',
    title: 'Términos y Condiciones | VOLKANEXT',
    description:
      'Condiciones de uso, contratación, propiedad intelectual y responsabilidad de los servicios de desarrollo de software de VOLKANEXT.',
    changefreq: 'yearly',
    priority: 0.3,
  },
]

/**
 * Tabla de rutas: fuente de verdad del prerender, del sitemap y de los
 * metadatos por página. Agregar una entrada acá y la página queda
 * prerenderizada, incluida en el sitemap y con sus tags propios.
 */
export const routes: RouteMeta[] = [
  ...staticRoutes,
  ...services.map<RouteMeta>((service) => ({
    path: servicePath(service),
    title: `${service.title} en Arequipa | VOLKANEXT`,
    description: serviceDescriptions[service.key],
    changefreq: 'monthly',
    priority: 0.8,
    serviceKey: service.key,
  })),
]

/** Busca la metadata de una ruta interna. */
export function routeMeta(path: string): RouteMeta {
  const normalized = path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`
  const found = routes.find((route) => route.path === normalized)
  if (!found) {
    throw new Error(`Ruta sin metadata en seo.ts: "${path}"`)
  }
  return found
}

/** URL absoluta a partir de una ruta interna. */
export function absoluteUrl(path = '/'): string {
  return new URL(path, SITE_URL).toString()
}

/**
 * Organization / ProfessionalService.
 *
 * Solo se declaran datos verificables: identidad, contacto, ubicación y redes.
 * Las cifras de `stats.ts` (proyectos entregados, uptime, satisfacción) y los
 * testimonios quedan fuera del marcado estructurado a propósito: no son
 * auditables y presentarlos como datos estructurados sería una afirmación
 * explícita que Google puede contrastar.
 */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl('/og-image.png'),
    image: absoluteUrl('/og-image.png'),
    description: site.description,
    email: contact.email,
    telephone: contact.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Arequipa',
      addressRegion: 'Arequipa',
      addressCountry: 'PE',
    },
    areaServed: [
      { '@type': 'Country', name: 'Perú' },
      { '@type': 'Place', name: 'Latinoamérica' },
    ],
    knowsLanguage: ['es'],
    sameAs: socials.map((social) => social.href),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: contact.email,
        telephone: contact.phone,
        availableLanguage: ['es'],
        areaServed: 'Worldwide',
      },
    ],
  }
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: site.locale,
    publisher: { '@id': `${SITE_URL}/#organization` },
  }
}

/**
 * FAQPage. Solo es válido si las respuestas están presentes en el HTML
 * servido, por eso el acordeón las renderiza siempre y oculta con CSS.
 */
export function faqPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * BreadcrumbList de una ruta. La home queda con un solo nivel; las páginas
 * internas agregan "Inicio" y, en el caso de un servicio, el índice de
 * servicios como nivel intermedio.
 */
export function breadcrumbSchema(meta: RouteMeta) {
  const items: { name: string; path: string }[] = [
    { name: SITE_NAME, path: '/' },
  ]

  if (meta.path !== '/') {
    if (meta.serviceKey) {
      items.push({ name: 'Servicios', path: '/servicios/' })
      items.push({
        name:
          services.find((service) => service.key === meta.serviceKey)?.title ??
          meta.title,
        path: meta.path,
      })
    } else {
      items.push({ name: meta.title.split('|')[0].trim(), path: meta.path })
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

/** Schema Service para las páginas de servicio. */
export function serviceSchema(meta: RouteMeta) {
  if (!meta.serviceKey) return null

  const service = services.find((item) => item.key === meta.serviceKey)
  if (!service) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(meta.path)}#service`,
    name: service.title,
    serviceType: service.title,
    description: meta.description,
    url: absoluteUrl(meta.path),
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: [
      { '@type': 'Country', name: 'Perú' },
      { '@type': 'Place', name: 'Latinoamérica' },
    ],
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: absoluteUrl('/contacto/'),
      servicePhone: contact.phone,
      availableLanguage: ['es'],
    },
  }
}

/**
 * Los bloques que el sitio entero comparte. La home y las páginas que ya
 * incluyen el FAQ en su contenido reciben además el FAQPage aparte.
 */
export function allSchemas(meta: RouteMeta) {
  const schemas: Record<string, unknown>[] = [
    organizationSchema(),
    webSiteSchema(),
    breadcrumbSchema(meta),
  ]

  const service = serviceSchema(meta)
  if (service) schemas.push(service)

  return schemas
}

/** Solo la home renderiza el acordeón de preguntas frecuentes. */
export function faqSchemaFor(meta: RouteMeta) {
  return meta.path === '/' ? [faqPageSchema()] : []
}

/**
 * Genera sitemap.xml desde la tabla `routes`.
 *
 * Se emite en el build en lugar de vivir como archivo en public/ para que
 * herede SITE_URL automáticamente: si el dominio cambia, el sitemap cambia
 * solo. Con un sitemap estático habría que acordarse de editarlo a mano.
 */
export function sitemapXml(lastmod: string): string {
  const urls = routes
    .map(
      ({ path, changefreq, priority }) => `  <url>
    <loc>${absoluteUrl(path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

export function robotsTxt(): string {
  return `User-agent: *
Allow: /

Sitemap: ${absoluteUrl('/sitemap.xml')}
`
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Genera los meta tags y el JSON-LD de una ruta como HTML.
 *
 * Vive acá y no en vite.config.ts porque lo consumen dos consumidores: el
 * plugin de build (para el index.html raíz) y el prerender (para el resto de
 * las páginas). Si estuviera duplicado, los metadatos de las subpáginas
 * quedarían desincronizados de los de la home sin que nadie se entere.
 */
export function headHtml(meta: RouteMeta): string {
  const url = absoluteUrl(meta.path)
  const image = absoluteUrl(site.ogImage)

  const tags: string[] = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta name="theme-color" content="${site.themeColor}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="${site.locale}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtml(site.ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="${site.twitterSite}" />`,
    `<meta name="twitter:creator" content="${site.twitterSite}" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(site.ogImageAlt)}" />`,
  ]

  const schemas = [...allSchemas(meta), ...faqSchemaFor(meta)]
    .map(
      (schema) =>
        `<script type="application/ld+json">${JSON.stringify(schema).replace(
          /</g,
          '\\u003c',
        )}</script>`,
    )
    .join('\n')

  return `${tags.join('\n')}\n${schemas}`
}