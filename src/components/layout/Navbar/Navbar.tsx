import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { navLinks } from '@/data/navLinks'
import { useMobileMenu } from './useMobileMenu'
import { Logo } from '@/components/ui/Logo'

const sectionIds = ['inicio', 'servicios', 'proyectos', 'calculadora', 'contacto']

export function Navbar() {
  const { isOpen, toggle, close } = useMobileMenu()
  const { pathname } = useLocation()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const wasOpen = useRef(false)

  /**
   * Los enlaces del menú apuntan a anclas de la home (#servicios, #contacto...).
   * Desde una subpágina esos ids no existen, así que hay que anteponer la barra:
   * "/#servicios" sí lleva a la sección. En la home se deja el ancla pelada
   * para que el scroll no dispare una navegación del router.
   */
  const sectionHref = (href: string) =>
    pathname === '/' || !href.startsWith('#') ? href : `/${href}`

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  /**
   * Escape cierra el panel y el foco vuelve al botón hamburguesa, para que un
   * usuario de teclado no quede con el foco en un nodo que ya no existe.
   */
  useEffect(() => {
    if (!isOpen) {
      if (wasOpen.current) toggleRef.current?.focus()
      wasOpen.current = false
      return
    }

    wasOpen.current = true
    panelRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, close])

  // Scroll-spy: marca la sección visible para que aria-current no sea decorativo.
  const activeSection = useActiveSection(pathname === '/')

  const isCurrent = (href: string) =>
    pathname === '/' && activeSection === href.replace('#', '')

  const linkClass =
    'flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-medium whitespace-nowrap text-gray-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange lg:px-4'

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:px-6 lg:px-16">
        <div className="flex w-full max-w-7xl items-center justify-between gap-3 rounded-2xl border border-white/10 bg-brand-dark/85 px-4 py-4 shadow-magma backdrop-blur-md transition-all duration-300 motion-reduce:transition-none sm:px-5 lg:gap-4 lg:px-8">
          <Logo size="sm" withTagline={false} />

          <nav
            aria-label="Navegación principal"
            className="hidden min-w-0 items-center gap-1 md:flex"
          >
            {navLinks
              .filter((link) => !link.right)
              .map((link) => (
                <a
                  key={link.href}
                  href={sectionHref(link.href)}
                  aria-current={isCurrent(link.href) ? 'location' : undefined}
                  className={linkClass}
                >
                  {link.label}
                  {link.badge && (
                    <span className="rounded border border-brand-orange/40 bg-brand-orange/10 px-1.5 py-0.5 text-xs font-semibold text-brand-orange">
                      {link.badge}
                    </span>
                  )}
                </a>
              ))}
          </nav>

          <div className="flex items-center gap-2">
            {navLinks
              .filter((link) => link.right)
              .map((link) => (
                <a
                  key={link.href}
                  href={sectionHref(link.href)}
                  aria-current={isCurrent(link.href) ? 'location' : undefined}
                  className="hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl border-2 border-brand-orange px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-brand-orange hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange md:inline-flex lg:gap-2 lg:px-4 lg:py-2 lg:text-sm"
                >
                  {link.label}
                  {link.badge && (
                    <span className="rounded border border-brand-orange/40 bg-brand-orange/10 px-1.5 py-0.5 text-xs font-semibold text-brand-orange">
                      {link.badge}
                    </span>
                  )}
                </a>
              ))}

            <button
              ref={toggleRef}
              type="button"
              onClick={toggle}
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isOpen}
              aria-controls="menu-movil"
              className="p-2.5 text-gray-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange md:hidden"
            >
              <i
                aria-hidden="true"
                className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-lg`}
              ></i>
            </button>
          </div>
        </div>
      </header>

      {isOpen && (
        <div
          ref={panelRef}
          id="menu-movil"
          className="fixed top-[6.75rem] left-1/2 z-40 w-[calc(100vw-3rem)] max-w-7xl -translate-x-1/2 animate-fade-in rounded-2xl border border-white/10 bg-brand-dark/85 px-6 py-5 shadow-magma backdrop-blur-md md:hidden"
        >
          <nav aria-label="Navegación principal (móvil)">
            <div className="flex flex-col gap-3 font-medium text-gray-300">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={sectionHref(link.href)}
                  onClick={close}
                  aria-current={isCurrent(link.href) ? 'location' : undefined}
                  className="flex items-center gap-2 rounded-xl px-2 py-2 transition-colors hover:bg-white/5 hover:text-brand-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                >
                  {link.label}
                  {link.badge && (
                    <span className="rounded border border-brand-orange/40 bg-brand-orange/10 px-1.5 py-0.5 text-xs font-semibold text-brand-orange">
                      {link.badge}
                    </span>
                  )}
                </a>
              ))}
              <a
                href={sectionHref('#contacto')}
                onClick={close}
                className="mt-2 inline-flex justify-center rounded-xl bg-brand-orange-deep py-3 text-center font-semibold text-white shadow-magma hover:bg-brand-orange-deep-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
              >
                Cotizar Ahora
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}

/**
 * Devuelve el id de la sección que ocupa el foco de lectura, o null fuera de la
 * home. Usa IntersectionObserver y degrada a null si no está disponible.
 */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') return

    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id
          if (entry.isIntersecting) visible.add(id)
          else visible.delete(id)
        }
        // Si varias se solapan, gana la primera en orden de documento.
        const first = sectionIds.find((id) => visible.has(id))
        setActive(first ?? null)
      },
      // rootMargin: la franja útil arranca bajo el header fijo, para no marcar
      // como activa una sección que quedó tapada por la barra de navegación.
      { rootMargin: '-20% 0px -70% 0px' },
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [enabled])

  return active
}
