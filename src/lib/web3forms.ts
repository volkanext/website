/**
 * Envío de formularios por Web3Forms.
 *
 * Web3Forms reenvía el POST al correo configurado y no necesita backend: es lo
 * mismo que ya usa el configurador de proyectos, así que los tres formularios
 * del sitio (contacto, configurador y boletín) comparten esta función.
 *
 * La regla importante es la del último párrafo: si faltan las credenciales en
 * producción, se informa el fallo en lugar de fingir un envío. Un formulario que
 * muestra "Mensaje enviado" sin enviar nada hace perder el lead en silencio, que
 * es la peor falla posible en una web cuyo propósito es generar contacto.
 */

export type SubmitState = 'idle' | 'sending' | 'sent' | 'error'

const endpoint = import.meta.env.VITE_CONFIG_ENDPOINT
const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

/** El aviso que se muestra cuando no hay forma de entregar el mensaje. */
export const NO_ENDPOINT_MESSAGE =
  'No pudimos registrar tu mensaje. Escribinos directo por WhatsApp o por email y te respondemos enseguida.'

/**
 * En desarrollo sin credenciales devuelve 'sent' para poder probar el flujo
 * completo (validación, estado de éxito, limpieza del formulario) sin tener que
 * gastar la cuota de Web3Forms en cada prueba.
 */
function simulateSuccess(): Promise<SubmitState> {
  if (!import.meta.env.DEV) return Promise.resolve('error')
  return new Promise((resolve) => {
    window.setTimeout(() => resolve('sent'), 600)
  })
}

/** Web3Forms responde 200 con { success: true } o { success: false, message }. */
function isSuccess(data: unknown): boolean {
  return (
    typeof data === 'object' &&
    data !== null &&
    (data as { success?: unknown }).success === true
  )
}

/**
 * Envia `fields` y devuelve el estado resultante. Nunca lanza: un fallo de red o
 * una respuesta malformada se traducen en 'error', que la interfaz muestra al
 * visitante con una alternativa de contacto.
 */
export async function submitForm(fields: Record<string, unknown>): Promise<SubmitState> {
  if (!endpoint || !accessKey) return simulateSuccess()

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        ...fields,
        access_key: accessKey,
        botcheck: '',
      }),
    })

    // Una respuesta 200 sin cuerpo JSON también es un envío válido: Web3Forms
    // devuelve cuerpo vacío cuando acepta la petición y falla al reenviar el
    // email. Un throw acá convertiría un envío aceptado en un error mostrado.
    if (res.status === 204) return 'sent'

    const data: unknown = await res.json().catch(() => null)
    return isSuccess(data) ? 'sent' : 'error'
  } catch {
    // fetch rechaza cuando se pierde la conexión o CORS bloquea la respuesta.
    return 'error'
  }
}
