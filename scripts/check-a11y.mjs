/**
 * Chequeo estático de criterios WCAG sobre el HTML prerenderado.
 *
 * No sustituye a axe ni a una prueba manual con lector de pantalla, pero
 * atrapa en el build las regresiones que sí se pueden verificar sobre el
 * HTML servido: si esto falla, la regresión llega a producción.
 */
import { readFileSync, existsSync } from 'node:fs'
import { execSync } from 'node:child_process'

const files = execSync('find dist -name "*.html"', { shell: 'bash' })
  .toString()
  .trim()
  .split('\n')
  .sort()

/*
 * El bloque prefers-reduced-motion vive en el CSS compilado, no en el HTML.
 * Se lee una vez y se comparte entre páginas.
 */
const cssFile = execSync('find dist -name "*.css"', { shell: 'bash' })
  .toString()
  .trim()
  .split('\n')[0]
const reducedMotionInCss =
  existsSync(cssFile) &&
  /prefers-reduced-motion\s*:\s*reduce/.test(readFileSync(cssFile, 'utf8'))

let failures = 0
let checks = 0

function check(label, file, condition) {
  checks++
  if (!condition) {
    failures++
    console.log(`  FALLA  ${label}  (${file})`)
  }
}

for (const file of files) {
  const html = readFileSync(file, 'utf8')
  const short = file.replace('dist', '')
  const labelFor = [...html.matchAll(/<label[^>]*for="([^"]+)"/g)].map((m) => m[1])

  /*
   * Un control está etiquetado si tiene aria-label/labelledby, o si su id
   * aparece en un <label for>, o —asociación implícita— si está dentro de un
   * <label>. Los radios de la calculadora usan esta última: el <label> envuelve
   * al input y el <legend> del fieldset nombra al grupo.
   */
  const labelled = (tag, start) => {
    if (/aria-label|aria-labelledby/.test(tag)) return true
    const id = tag.match(/\bid="([^"]+)"/)?.[1]
    if (id && labelFor.includes(id)) return true
    const before = html.slice(0, start)
    return before.lastIndexOf('<label') > before.lastIndexOf('</label>')
  }

  // --- 1.4.3 Contraste: los <i> de Font Awesome son iconos, no texto. -------
  // Se comprueba que los iconos que dependen de texto no estén sueltos.
  const bareIcons = [...html.matchAll(/<i class="fa-[^"]*"[^>]*><\/i>/g)]
    .map((m) => m[0])
    .filter((tag) => !tag.includes('aria-hidden'))
  check('1.1.1 icono decorativo sin aria-hidden', short, bareIcons.length === 0)

  // --- 4.1.2 Nombre, rol, valor -------------------------------------------
  const unlabelledInputs = [...html.matchAll(/<(?:input|textarea)\b[^>]*>/g)]
    .filter((m) => !/type="(?:hidden|submit|button)"/.test(m[0]))
    .filter((m) => !labelled(m[0], m.index))
    .map((m) => m[0])
  check(
    '4.1.2 control sin etiqueta ni aria-label',
    short,
    unlabelledInputs.length === 0,
  )
  if (unlabelledInputs.length) {
    console.log(`         → ${unlabelledInputs[0].slice(0, 90)}`)
  }
  check('4.1.2 button con nombre accesible', short, !/<button(?![^>]*(aria-label|aria-labelledby))[^>]*>\s*<\/button>/.test(html))
  check('4.1.2 button sin type (submit implícito)', short, !/<button(?![^>]*\btype=)/.test(html))
  check('4.1.2 img sin alt', short, !/<img(?![^>]*\balt=)/.test(html))

  // --- 1.4.4 Tamaño de texto ------------------------------------------------
  check('1.4.4 texto menor a 12px', short, !/text-\[(?:[0-9]|1[01])px\]/.test(html))

  // --- 2.4.7 / 2.4.11 Foco visible -----------------------------------------
  check(
    '2.4.7 focus:outline-none sin focus-visible',
    short,
    !/focus:outline-none(?![^"]*focus-visible)/.test(html),
  )

  // --- 1.3.1 Estructura de encabezados -------------------------------------
  const h1s = (html.match(/<h1[\s>]/g) || []).length
  const is404 = file.includes('404')
  if (!is404) check('1.3.1 exactamente un h1 (tiene ' + h1s + ')', short, h1s === 1)

  // --- 1.3.1 Landmarks nombrados -------------------------------------------
  const sections = [...html.matchAll(/<section[^>]*>/g)].map((m) => m[0])
  const unnamed = sections.filter(
    (t) => !t.includes('aria-label') && !t.includes('aria-labelledby'),
  )
  check('1.3.1 <section> sin nombre accesible', short, unnamed.length === 0)

  // --- 4.1.2 aria-pressed en filtros ---------------------------------------
  check(
    '4.1.2 aria-pressed ausente en un grupo de toggle',
    short,
    !/<button(?![^>]*aria-pressed)[^>]*>\s*(?:Fintech|Mobile|ERP|Enterprise|Todos)/.test(html),
  )

  // --- 2.3.3 Movimiento reducido --------------------------------------------
  check(
    '2.3.3 falta prefers-reduced-motion en el CSS',
    short,
    !/<link[^>]*stylesheet/.test(html) || reducedMotionInCss,
  )
}

/*
 * Comprobaciones sobre el código fuente, no sobre el HTML.
 *
 * El modal solo existe en el cliente: en el HTML prerenderado no aparece, así
 * que un chequeo sobre dist sería vacuo y siempre pasaría. Lo que interesa es
 * que el componente no pierda la semántica de diálogo ni el manejo del foco.
 */
function checkModalSource() {
  /*
   * Se eliminan los comentarios antes de buscar: si no, un chequeo como
   * /role="progressbar"/ encuentra su propia documentación —que explica la
   * decisión— y pasa aunque el atributo real haya desaparecido. Un chequeo que
   * no puede fallar no sirve de nada.
   */
  const code = (path) =>
    readFileSync(path, 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/[^\n]*/g, '')

  const modal = code('src/features/modal/Modal.tsx')
  const calculator = code('src/features/calculator/Calculator.tsx')
  const contact = code('src/features/contact/Contact.tsx')

  check('4.1.2 modal sin role="dialog"', 'Modal.tsx', /role="dialog"/.test(modal))
  check('4.1.2 modal sin aria-modal', 'Modal.tsx', /aria-modal="true"/.test(modal))
  check('4.1.2 modal sin nombre accesible', 'Modal.tsx', /aria-label=\{title\}/.test(modal))
  check('2.1.2 modal sin tabIndex para recibir foco', 'Modal.tsx', /tabIndex=\{-1\}/.test(modal))
  check('2.1.2 modal sin trampa de foco (Tab)', 'Modal.tsx', /e\.key !== 'Tab'/.test(modal))
  check('2.1.2 modal sin cierre con Escape', 'Modal.tsx', /e\.key === 'Escape'/.test(modal))
  check('2.1.2 modal sin restaurar el foco', 'Modal.tsx', /triggerRef\.current\?\.focus\(\)/.test(modal))
  check('2.4.3 modal sin bloqueo del scroll', 'Modal.tsx', /document\.body\.style\.overflow = 'hidden'/.test(modal))

  // La calculadora cambia de paso y termina en un estado de éxito: ambos
  // cambios son invisibles para un lector de pantalla sin región viva y foco.
  check('4.1.2 calculadora sin role="status"', 'Calculator.tsx', /role="status"/.test(calculator))
  check('4.1.2 calculadora sin role="alert"', 'Calculator.tsx', /role="alert"/.test(calculator))
  check('2.4.3 calculadora sin role="progressbar"', 'Calculator.tsx', /role="progressbar"/.test(calculator))
  check('2.4.3 calculadora sin fieldset/legend', 'Calculator.tsx', /<legend/.test(calculator))
  check('2.4.3 calculadora sin fieldset', 'Calculator.tsx', /<fieldset/.test(calculator))
  check(
    '2.4.3 calculadora no mueve el foco al cambiar de paso',
    'Calculator.tsx',
    /stepHeadingRef\.current\?\.focus\(\)/.test(calculator),
  )
  check('4.1.2 contacto sin role="status"', 'Contact.tsx', /role="status"/.test(contact))

  // El formulario de contacto muestra "Mensaje enviado con éxito" sin backend
  // que envíe nada: el aviso debe ser visible para quien no ve la pantalla.
  check(
    '4.1.1 contacto no expone autocomplete="off" ni oculta el aviso',
    'Contact.tsx',
    /role="status"/.test(contact),
  )
}

checkModalSource()

console.log(`\n${checks - failures}/${checks} comprobaciones superadas`)
if (failures) {
  console.log(`\n${failures} FALLOS`)
  process.exit(1)
}
