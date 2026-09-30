import { navLinks } from '@/data/navLinks'
import { contact } from '@/data/contact'
import { useModal } from '@/features/modal/useModal'
import { Logo } from '@/components/ui/Logo'

const footerNav: { label: string; href: string }[] = navLinks.filter(
  (link) => link.href !== '#contacto',
)

const specialties = [
  'Web Development',
  'Aplicaciones Móviles',
  'Software Empresarial',
  'Cloud & DevOps',
]

export function Footer() {
  const { alert, openLegal } = useModal()

  const handleSubscribe = () => {
    alert('Suscripción', '¡Gracias por suscribirte al boletín de VOLKANEXT!')
  }

  return (
    <footer className="border-t border-brand-border bg-brand-dark py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo size="sm" withTagline={false} />
            <p className="mt-4 text-xs leading-relaxed text-brand-light-text">
              Desarrollo web y de software de alto impacto visual y técnico.{' '}
              {contact.location}
            </p>
          </div>

          <div>
            <h2 className="mb-4 font-heading text-xs font-bold tracking-wider text-white uppercase">
              Navegación
            </h2>
            <ul className="space-y-2 text-xs text-brand-light-text">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-brand-orange"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contacto"
                  className="transition-colors hover:text-brand-orange"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-heading text-xs font-bold tracking-wider text-white uppercase">
              Especialidades
            </h2>
            <ul className="space-y-2 text-xs text-brand-light-text">
              {specialties.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-heading text-xs font-bold tracking-wider text-white uppercase">
              Mantente Conectado
            </h2>
            <p className="mb-3 text-xs text-brand-light-text">
              Recibe artículos sobre desarrollo e innovación tech.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                aria-label="Correo para el boletín de noticias"
                placeholder="Tu correo..."
                className="flex-1 rounded-lg border border-brand-border bg-brand-card px-3 py-2 text-xs text-white focus:border-brand-orange focus:outline-none"
              />
              <button
                onClick={handleSubscribe}
                aria-label="Suscribirse al boletín"
                className="rounded-lg bg-brand-orange-deep px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-brand-orange-deep-hover"
              >
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between border-t border-white/5 pt-8 text-xs text-gray-400 sm:flex-row">
          <p>&copy; 2026 VOLKANEXT. Todos los derechos reservados.</p>
          <div className="mt-4 flex gap-6 sm:mt-0">
            <button
              onClick={() => openLegal('privacy')}
              className="cursor-pointer transition-colors hover:text-white"
            >
              Privacidad
            </button>
            <button
              onClick={() => openLegal('terms')}
              className="cursor-pointer transition-colors hover:text-white"
            >
              Términos de Servicio
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
