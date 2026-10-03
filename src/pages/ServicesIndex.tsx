import { Link } from 'react-router-dom'
import { PageHero } from '@/components/ui/PageHero'
import { services } from '@/data/services'
import { servicePath } from '@/data/seo'

export function ServicesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Nuestras Capacidades"
        title="Servicios de Desarrollo Web y Software"
        description="Seis áreas de ingeniería de software desde Arequipa, Perú, con alcance global. Cada servicio tiene su propia página con el detalle de alcance y tecnologías."
      />

      <section aria-labelledby="servicios-lista-heading" className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.key}
                className="glass-card group flex flex-col rounded-2xl border border-brand-border p-8 transition-all duration-300 hover:-translate-y-2 hover:border-brand-orange/40"
              >
                <i
                  aria-hidden="true"
                  className={`mb-5 text-3xl ${service.icon} text-brand-orange`}
                ></i>
                <h2 id="servicios-lista-heading" className="mb-3 font-heading text-xl font-bold text-white">
                  {service.title}
                </h2>
                <p className="mb-6 text-sm leading-relaxed text-brand-light-text">
                  {service.desc}
                </p>

                <ul className="mb-6 flex flex-wrap gap-2">
                  {service.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-brand-border bg-white/5 px-2.5 py-1 text-xs text-brand-light-text"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <Link
                  to={servicePath(service)}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-brand-orange transition-colors hover:text-white"
                >
                  Ver servicio
                  <i aria-hidden="true" className="fa-solid fa-arrow-right text-xs"></i>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}