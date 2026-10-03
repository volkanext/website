import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { navLinks } from '@/data/navLinks'
import { contact, socials } from '@/data/contact'
import { Logo } from '@/components/ui/Logo'
import {
  NO_ENDPOINT_MESSAGE,
  submitForm,
  type SubmitState,
} from '@/lib/web3forms'

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
  const { pathname } = useLocation()
  const [subscribe, setSubscribe] = useState<SubmitState>('idle')

  const sectionHref = (href: string) =>
    pathname === '/' || !href.startsWith('#') ? href : `/${href}`

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (subscribe === 'sending') return

    const form = e.currentTarget
    const data = new FormData(form)
    const email = String(data.get('email') ?? '')

    setSubscribe('sending')
    const next = await submitForm({
      email,
      origen: 'boletin_footer',
      fecha: new Date().toISOString(),
      from_name: email,
      subject: 'Nueva suscripción al boletín de VOLKANEXT',
    })
    setSubscribe(next)
    // El campo solo se limpia si hubo un alta confirmada; si falló, el visitante
    // no tiene que volver a escribir el correo para reintentar.
    if (next === 'sent') form.reset()
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
            <div className="mt-6 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-border text-brand-light-text transition-all hover:border-brand-orange hover:text-brand-orange"
                >
                  <i className={social.icon} aria-hidden="true"></i>
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Navegación del pie de página">
            <h2 className="mb-4 font-heading text-xs font-bold tracking-wider text-white uppercase">
              Navegación
            </h2>
            <ul className="space-y-2 text-xs text-brand-light-text">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <a
                    href={sectionHref(link.href)}
                    className="transition-colors hover:text-brand-orange"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={sectionHref('#contacto')}
                  className="transition-colors hover:text-brand-orange"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </nav>

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
            {/*
              Un <form> de verdad: sin él, pulsar Enter dentro del campo no hace
              nada y el control queda medio muerto. onSubmit intercepta el envío
              para mostrar el aviso sin recargar la página.
            */}
            <form className="flex gap-2" onSubmit={handleSubscribe}>
              <label htmlFor="boletin-email" className="sr-only">
                Correo para el boletín de noticias
              </label>
              <input
                id="boletin-email"
                type="email"
                name="email"
                autoComplete="email"
                required
                placeholder="Tu correo..."
                className="flex-1 rounded-lg border border-brand-border bg-brand-card px-3 py-2 text-xs text-white transition-colors focus:border-brand-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
              />
              <button
                type="submit"
                disabled={subscribe === 'sending'}
                aria-label="Suscribirse al boletín"
                className="rounded-lg bg-brand-orange-deep px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-brand-orange-deep-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange disabled:cursor-not-allowed disabled:opacity-60"
              >
                <i
                  aria-hidden="true"
                  className={`fa-solid ${subscribe === 'sending' ? 'fa-spinner fa-spin' : 'fa-arrow-right'}`}
                ></i>
              </button>
            </form>

            {/*
              El aviso va en la misma región viva en ambos casos: el éxito y el
              error son respuestas al mismo gesto, y quien usa lector de
              pantalla necesita enterarse de cualquiera de los dos. Un
              window.alert no sirve acá: el diálogo modal del navegador no lo
              leen bien los lectores de pantalla y bloquea la página.
            */}
            <div role="status" aria-live="polite" className="mt-2">
              {subscribe === 'sent' && (
                <p className="text-xs text-green-400">
                  ¡Listo! Te avisamos cuando publiquemos algo nuevo.
                </p>
              )}
              {subscribe === 'error' && (
                <p className="text-xs text-red-400">{NO_ENDPOINT_MESSAGE}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between border-t border-white/5 pt-8 text-xs text-gray-400 sm:flex-row">
          <p>&copy; 2026 VOLKANEXT. Todos los derechos reservados.</p>
          <div className="mt-4 flex gap-6 sm:mt-0">
            {/*
              Enlaces reales y no botones que abran un modal: son páginas
              prerenderizadas, así que /privacidad y /terminos tienen URL propia,
              son indexables y se pueden compartir y enlazar.
            */}
            <Link
              to="/privacidad"
              className="transition-colors hover:text-white"
            >
              Privacidad
            </Link>
            <Link to="/terminos" className="transition-colors hover:text-white">
              Términos de Servicio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
