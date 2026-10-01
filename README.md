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

Todo el SEO se genera en build por el plugin `seo()` de `plugins/seo.ts`, usando
`plugins/seo.config.ts` como **única fuente de verdad**. No hay que editar
`index.html` a mano para cambiar títulos, URLs o redes sociales.

| Archivo | Qué genera |
| --- | --- |
| `plugins/seo.config.ts` | Dominio, título, descripción, imagen social, geo y datos de contacto |
| `plugins/seo.ts` | `<head>` completo + `robots.txt` + `sitemap.xml` |
| `public/og-image.png` | Imagen 1200×630 para Open Graph / Twitter Card |
| `public/site.webmanifest` | Manifiesto PWA (icons, colores) |

### Qué inyecta en `<head>`

- `<title>` y `<meta name="description">`
- `canonical`, `hreflang` (`es-PE` + `x-default`) y `link rel="sitemap"`
- `meta robots` explícito: `index, follow, max-image-preview:large`
- Open Graph y Twitter Card (imagen, título, descripción, `og:locale`)
- `theme-color`, favicons, `apple-touch-icon` y el manifest
- Metadatos `geo.*` / `ICBM` (Arequipa, Perú)
- JSON-LD `Organization` + `WebSite` + `FAQPage` con `hasOfferCatalog`

### Archivos para buscadores

- **`robots.txt`** — permite rastrear todo (el sitio es público) y declara el
  `Sitemap:`. Los comentarios van en ASCII a propósito: no es HTML y algunos
  rastreadores no decodifican UTF-8 en ese archivo.
- **`sitemap.xml`** — una sola URL. Las secciones (`#servicios`, `#proyectos`…)
  son fragmentos del mismo documento, no páginas distintas, así que **no** se
  listan como entradas independientes.

Ambos se regeneran en cada `pnpm build` con el `lastmod` del día, y también se
sirven en `pnpm dev` para poder probarlos con `curl`.

### Verificar

```bash
pnpm build
curl -s http://localhost:4173/robots.txt
curl -s http://localhost:4173/sitemap.xml
```

> `index.html` ya **no** lleva `<title>` ni `<meta name="description">` a
> propósito: se inyectan en build para que no puedan desincronizarse de los
> datos estructurados. Si alguna vez falta el título, revisa que `seo()` siga
> registrado en `vite.config.ts`.

