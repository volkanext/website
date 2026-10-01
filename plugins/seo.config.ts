import { contact } from '../src/data/contact.ts'
import { faqs } from '../src/data/faqs.ts'
import { services } from '../src/data/services.ts'

export interface SeoImage {
  path: string
  width: number
  height: number
  alt: string
}

export interface SeoConfig {
  /** Origen público del sitio. Sin barra final: se concatena con cada ruta. */
  siteUrl: string
  /** Código de idioma BCP-47 para <html lang> y hreflang. */
  locale: string
  /** Locales Open Graph, formato locale_TERRITORIO. */
  ogLocale: string
  themeColor: string
  title: string
  socialTitle: string
  description: string
  image: SeoImage
  geo: {
    region: string
    placename: string
    /** formato "lat, lon" para <meta name="ICBM">. */
    coordinates: string
  }
  organization: {
    name: string
    type: string
    additionalType: string
    areaServed: string[]
    languages: string[]
  }
  /** URLs que deben existir realmente en /public antes de referenciarlas. */
  paths: {
    favicon32: string
    favicon16: string
    appleTouchIcon: string
    manifest: string
    icon192: string
    icon512: string
  }
}

/**
 * Fuente única de verdad del SEO.
 *
 * Todo lo que se inyecta en <head>, en robots.txt y en sitemap.xml se deriva de
 * aquí, de modo que el dominio, el título o la imagen social no puedan quedar
 * desincronizados entre sí. Los datos de contacto, servicios y FAQs se importan
 * del código de la app para no duplicar el contenido.
 */
export const seoConfig: SeoConfig = {
  siteUrl: 'https://volkanext.com',
  locale: 'es-PE',
  ogLocale: 'es_PE',
  themeColor: '#0b0c14',
  title: 'VOLKANEXT | Agencia de Desarrollo de Software y Web',
  socialTitle: 'VOLKANEXT — Software & Web Development',
  description:
    'Agencia de software en Arequipa, Perú. Landing pages, apps web y móviles, ERPs a medida, cloud, UI/UX e IA. Alcance global.',
  image: {
    path: '/og-image.png',
    width: 1200,
    height: 630,
    alt: 'VOLKANEXT — Software & Web Development',
  },
  geo: {
    region: 'PE-ARE',
    placename: 'Arequipa',
    coordinates: '-16.4090, -71.5375',
  },
  organization: {
    name: 'VOLKANEXT',
    type: 'Organization',
    additionalType: 'https://schema.org/ProfessionalService',
    areaServed: ['Perú', 'Latinoamérica', 'Global'],
    languages: ['es'],
  },
  paths: {
    favicon32: '/favicon-32x32.png',
    favicon16: '/favicon-16x16.png',
    appleTouchIcon: '/apple-touch-icon.png',
    manifest: '/site.webmanifest',
    icon192: '/icon-192.png',
    icon512: '/icon-512.png',
  },
}

/** Datos de contacto tomados de la app para no duplicarlos. */
export const seoContact = {
  email: contact.email,
  phone: contact.phone,
  phoneDigits: contact.phoneHref.replace('tel:', ''),
  addressLocality: contact.location.split(',')[0].trim(),
  addressCountry: 'PE',
}

/** Catálogo de servicios para hasOfferCatalog. */
export const seoServices = services.map((service) => ({
  name: service.title,
  description: service.desc,
}))

/** Preguntas frecuentes para FAQPage. */
export const seoFaqs = faqs.map((faq) => ({
  question: faq.question,
  answer: faq.answer,
}))
