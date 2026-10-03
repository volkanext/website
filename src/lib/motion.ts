/**
 * Detecta la preferencia del sistema "reducir movimiento".
 *
 * Se consulta con `matchMedia` en el momento de usarse y no al cargar el módulo,
 * para que un cambio de ajuste en caliente (el usuario lo activa mientras navega)
 * se respete sin recargar.
 */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/** `true` si el ajuste está activo; carga perezosa para no leerlo sin necesidad. */
export function watchReducedMotion(onChange: (reduced: boolean) => void) {
  if (typeof window === 'undefined') return () => {}
  const query = window.matchMedia('(prefers-reduced-motion: reduce)')
  const handler = (e: MediaQueryListEvent) => onChange(e.matches)
  query.addEventListener('change', handler)
  return () => query.removeEventListener('change', handler)
}
