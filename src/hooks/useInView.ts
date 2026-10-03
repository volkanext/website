import { useEffect, useRef, useState, type RefObject } from 'react'

export function useInView<T extends HTMLElement>(
  threshold = 0.3,
): {
  ref: RefObject<T | null>
  inView: boolean
} {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Sin IntersectionObserver (navegadores antiguos, algunos webviews
    // embebidos) hay que mostrar el contenido igual. Se difiere un tick porque
    // actualizar estado de forma síncrona dentro del efecto provoca renders en
    // cascada; además es lo mismo que ya hace el callback del observer.
    if (typeof IntersectionObserver === 'undefined') {
      const id = window.setTimeout(() => setInView(true), 0)
      return () => window.clearTimeout(id)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}