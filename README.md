# Website

## 🚀 Stack Tecnológico

- **React 19** + TypeScript
- **Vite 8** (con React Compiler habilitado)
- **Tailwind CSS v4** (tema personalizado con modo claro/oscuro)
- **ESLint** + TypeScript ESLint

## 📋 Scripts

```bash
# Instalar dependencias (usa el package manager del proyecto: pnpm)
pnpm install

# Desarrollo local
pnpm dev

# Build para producción
pnpm build

# Preview del build de producción
pnpm preview

# Linting
pnpm lint
```

## 🔍 SEO

Todo el SEO se genera en build y el sitio se sirve como **HTML estático
prerenderizado**: Google, Facebook, LinkedIn y WhatsApp leen contenido real sin
necesitar que el visitante ejecute JavaScript.

El render usa el mismo `App` de React (`src/ssr/prerender.ts`) que corre en el
navegador, así que no hay una segunda copia del sitio que pueda desincronizarse.

| Archivo | Qué genera |
| --- | --- |
| `src/data/seo.ts` | **Única fuente de verdad**: dominio, metadatos por ruta, JSON-LD, robots y sitemap |
| `src/ssr/prerender.ts` | Render SSR de las 13 rutas y del 404 |
| `scripts/prerender.mjs` | Escribe el HTML de cada ruta + `404.html` en `dist/` |
| `vite.config.ts` | Inyecta el `<head>` de la home y emite robots/sitemap |
| `public/og-image.png` | Imagen 1200×630 para Open Graph / Twitter Card |
| `public/site.webmanifest` | Manifiesto PWA (icons, colores) |

### Qué inyecta en `<head>`

- `<title>` y `<meta name="description">`, distintos en cada ruta
- `canonical` propio por ruta
- Open Graph y Twitter Card (imagen, título, descripción, `og:locale`)
- `theme-color`, favicons, `apple-touch-icon` y el manifest
- JSON-LD `ProfessionalService` (con `geo` de Arequipa), `WebSite`, `Service`
  y `FAQPage`

Las cifras de `src/data/stats.ts` y los testimonios quedan **fuera** del marcado
estructurado a propósito: no son auditables y declararlas sería una afirmación
que Google puede contrastar.

### Archivos para buscadores

- **`robots.txt`** — permite rastrear todo (el sitio es público) y declara el
  `Sitemap:`.
- **`sitemap.xml`** — las 13 rutas reales. Las secciones (`#servicios`,
  `#proyectos`…) son fragmentos de la home, no páginas distintas, así que no se
  listan como entradas independientes.
- **`404.html`** — se renderiza con el componente real y va en `noindex` sin
  canonical, para no declararla duplicada de la home.

Ambos se regeneran en cada `pnpm build` con el `lastmod` del día.

### Verificar

```bash
pnpm build
pnpm preview   # http://localhost:4173
curl -s http://localhost:4173/sitemap.xml
```

> `index.html` ya **no** lleva `<title>` ni `<meta name="description">` a
> propósito: se inyectan en build para que no puedan desincronizarse de los datos
> estructurados. Si alguna vez falta el título, revisa que `seoPlugin()` siga
> registrado en `vite.config.ts`.

> Para cambiar el dominio tocá `SITE_URL` en `src/data/seo.ts`: de ahí salen
> canonical, og:url, sitemap y JSON-LD.

## ♿ Accesibilidad

`scripts/check-a11y.mjs` corre **dentro de `pnpm build`** y falla el build si
algo se rompe, así que una regresión no llega a producción. Cubre el HTML
prerenderizado y también el código fuente, para detectar atributos mal formados
que un crawler estático nunca vería (asociaciones de `label`, `role="status"`
duplicado, `aria-modal` sin diálogo, `autocomplete` inválido).

```bash
pnpm check:a11y   # solo la auditoría
```

Verificado además con `tsc`, `eslint` y revisión manual del HTML generado.

## 🗂️ Estructura de rutas

El sitio es una SPA, pero **cada ruta real se prerenderiza** a
`dist/<ruta>/index.html`. Para que las URLs canónicas no se dupliquen, todas
terminan en barra final: el build escribe directorios, y el `canonical` solo
declara una forma.

Al publicar, el host debe servir `404.html` con status **404** real y redirigir
`/servicios/software-erp` → `/servicios/software-erp/`.
