import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const OUT_DIR = fileURLToPath(new URL('../public/', import.meta.url))
const OUT_FILE = `${OUT_DIR}og-image.png`

const WIDTH = 1200
const HEIGHT = 630

const BRAND_DARK = '#0b0c14'
const BRAND_ORANGE = '#ff3722'
const BRAND_LIGHT = '#9ca3af'
const FONT_HEADING = 'Space Grotesk'
const FONT_BODY = 'Inter'

const escapeXml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

/** Fondo con el mismo glow naranja que usa la web, para que la tarjeta pegue con el sitio. */
function backgroundSvg() {
  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <radialGradient id="glow" cx="82%" cy="88%" r="70%">
      <stop offset="0%" stop-color="${BRAND_ORANGE}" stop-opacity="0.30" />
      <stop offset="55%" stop-color="${BRAND_ORANGE}" stop-opacity="0.06" />
      <stop offset="100%" stop-color="${BRAND_ORANGE}" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="edge" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#15172a" />
      <stop offset="100%" stop-color="${BRAND_DARK}" />
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${BRAND_DARK}" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#edge)" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)" />
</svg>
`)
}

/** Tipografía. Se rasteriza como SVG porque sharp no expone un motor de texto. */
function textSvg({ title, subtitle, tagline }) {
  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <style>
      .heading { font-family: '${FONT_HEADING}', sans-serif; font-weight: 700; fill: #ffffff; }
      .sub     { font-family: '${FONT_HEADING}', sans-serif; font-weight: 600; fill: ${BRAND_ORANGE}; letter-spacing: 2px; }
      .tag     { font-family: '${FONT_BODY}', sans-serif; font-weight: 400; fill: ${BRAND_LIGHT}; }
    </style>
  </defs>
  <text x="${WIDTH / 2}" y="430" text-anchor="middle" class="sub" font-size="26">${escapeXml(subtitle.toUpperCase())}</text>
  <text x="${WIDTH / 2}" y="486" text-anchor="middle" class="heading" font-size="54">${escapeXml(title)}</text>
  <text x="${WIDTH / 2}" y="534" text-anchor="middle" class="tag" font-size="25">${escapeXml(tagline)}</text>
</svg>
`)
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })

  // logoNameLeft.svg es un banner horizontal de 2400x450, el que mejor se
  // adapta a una tarjeta 1200x630. Los otros logos son cuadrados o verticales.
  const logoSource = fileURLToPath(
    new URL('../src/assets/logo/logoNameLeft.svg', import.meta.url),
  )
  const logo = await sharp(logoSource)
    .resize({ width: 560 })
    .png()
    .toBuffer()
  const logoMeta = await sharp(logo).metadata()

  await sharp(backgroundSvg())
    .composite([
      {
        input: logo,
        top: Math.round((HEIGHT - logoMeta.height) / 2 - 78),
        left: Math.round((WIDTH - logoMeta.width) / 2),
      },
      {
        input: textSvg({
          title: 'Desarrollo Web y Software a Medida',
          subtitle: 'Arequipa, Perú',
          tagline: 'SaaS · Aplicaciones Móviles · ERPs · Cloud & DevOps',
        }),
        top: 0,
        left: 0,
      },
    ])
    .png({ quality: 92, compressionLevel: 9 })
    .toFile(OUT_FILE)

  const written = await sharp(OUT_FILE).metadata()
  console.log(
    `og-image generado: public/og-image.png (${written.width}x${written.height} ${written.format})`,
  )

  if (written.width !== WIDTH || written.height !== HEIGHT) {
    throw new Error(
      `Dimensiones inesperadas: ${written.width}x${written.height}, se esperaban ${WIDTH}x${HEIGHT}`,
    )
  }
}

await main()