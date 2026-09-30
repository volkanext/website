import { useEffect } from 'react'
import { navLinks } from '@/data/navLinks'
import { useMobileMenu } from './useMobileMenu'
import { Logo } from '@/components/ui/Logo'

export function Navbar() {
  const { isOpen, toggle, close } = useMobileMenu()

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:px-6 lg:px-16">
        <div className="flex w-full max-w-7xl items-center justify-between gap-3 rounded-2xl border border-white/10 bg-brand-dark/85 px-4 py-4 shadow-magma backdrop-blur-md transition-all duration-300 sm:px-5 lg:gap-4 lg:px-8">
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
                  href={link.href}
                  className="flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-medium whitespace-nowrap text-gray-300 transition-colors hover:bg-white/5 hover:text-white lg:px-4"
                >
                  {link.label}
                  {link.badge && (
                    <span className="rounded border border-brand-orange/40 bg-brand-orange/10 px-1.5 py-0.5 text-[10px] font-semibold text-brand-orange">
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
                  href={link.href}
                  className="hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl border-2 border-brand-orange px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-brand-orange hover:text-black md:inline-flex lg:gap-2 lg:px-4 lg:py-2 lg:text-sm"
                >
                  {link.label}
                  {link.badge && (
                    <span className="rounded border border-brand-orange/40 bg-brand-orange/10 px-1.5 py-0.5 text-[10px] font-semibold text-brand-orange">
                      {link.badge}
                    </span>
                  )}
                </a>
              ))}

            <button
              onClick={toggle}
              aria-label="Menú"
              aria-expanded={isOpen}
              className="p-2.5 text-gray-300 hover:text-white md:hidden"
            >
              <i
                className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-lg`}
              ></i>
            </button>
          </div>
        </div>
      </header>

      {isOpen && (
        <div className="fixed top-[6.75rem] left-1/2 z-40 w-[calc(100vw-3rem)] max-w-7xl -translate-x-1/2 animate-fade-in rounded-2xl border border-white/10 bg-brand-dark/85 px-6 py-5 shadow-magma backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-3 font-medium text-gray-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                className="flex items-center gap-2 rounded-xl px-2 py-2 transition-colors hover:bg-white/5 hover:text-brand-orange"
              >
                {link.label}
                {link.badge && (
                  <span className="rounded border border-brand-orange/40 bg-brand-orange/10 px-1.5 py-0.5 text-[10px] font-semibold text-brand-orange">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={close}
              className="mt-2 inline-flex justify-center rounded-xl bg-brand-orange-deep py-3 text-center font-semibold text-white shadow-magma hover:bg-brand-orange-deep-hover"
            >
              Cotizar Ahora
            </a>
          </div>
        </div>
      )}
    </>
  )
}
