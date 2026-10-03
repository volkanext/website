import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

/**
 * Cuenta desde 0 hasta `target`, pero el valor inicial es `target` y no 0.
 *
 * El motivo es el prerender: en el HTML estático no se ejecuta ningún efecto,
 * así que si el estado inicial fuera 0 las cifras del HTML servido dirían
 * "0+ Proyectos Entregados" y "0% Satisfacción". Devolviendo `target` desde el
 * arranque, el HTML generado ya lleva los números reales y la animación ocurre
 * después, en el cliente, como mejora progresiva.
 *
 * Con movimiento reducido no hay animación: el número simplemente queda.
 */
export function useCountUp(target: number, active: boolean, speed = 30) {
  const [value, setValue] = useState(target)

  useEffect(() => {
    if (!active || prefersReducedMotion()) return

    const totalFrames = 30
    const duration = speed * totalFrames
    const startedAt = performance.now()
    let frame = 0

    // requestAnimationFrame en vez de setInterval: sigue el refresh real de la
    // pantalla y el setState queda dentro del callback, no en el cuerpo del
    // efecto, que es lo que evita los renders en cascada.
    const tick = (now: number) => {
      const elapsed = Math.min(1, (now - startedAt) / duration)
      // easeOutQuad: arranca rápido y frena al final, se lee mejor que lineal.
      const eased = 1 - (1 - elapsed) * (1 - elapsed)
      setValue(Math.ceil(target * eased))

      if (elapsed < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setValue(target)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, target, speed])

  return value
}