import { Link, Navigate, useParams } from 'react-router-dom'
import { PageHero } from '@/components/ui/PageHero'
import { services } from '@/data/services'
import { servicePath, routeMeta } from '@/data/seo'

export function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>()
  const service = services.find((item) => item.slug === slug)

  // Si el slug no existe, el prerender no generó un HTML para él: que caiga
  // en la home en vez de dejar un 404 sinHTML para los crawlers.
  if (!service) return <Navigate to="/" replace />

  const path = servicePath(service)
  const meta = routeMeta(path)

  return (
    <>
      <PageHero
        eyebrow="Servicio"
        title={`${service.title} en Arequipa`}
        description={meta.description}
      />

      <section aria-labelledby="servicio-cta-heading" className="pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl border border-brand-border p-8 sm:p-12">
            <i
              aria-hidden="true"
              className={`mb-6 block text-4xl ${service.icon} text-brand-orange`}
            ></i>

            <h2 id="servicio-cta-heading" className="mb-4 font-heading text-2xl font-bold text-white">
              {service.modalTitle}
            </h2>
            <p className="mb-8 text-base leading-relaxed text-brand-light-text">
              {service.modalDesc}
            </p>

            <h3 className="mb-4 font-heading text-sm font-bold tracking-wider text-white uppercase">
              Tecnologías
            </h3>
            <ul className="mb-10 flex flex-wrap gap-2">
              {service.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-brand-border bg-white/5 px-3 py-1.5 text-xs text-brand-light-text"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                to="/contacto/"
                className="flex items-center justify-center gap-3 rounded-xl bg-brand-orange-deep px-8 py-4 font-bold text-white shadow-magma-lg transition-all hover:bg-brand-orange-deep-hover"
              >
                <i aria-hidden="true" className="fa-solid fa-paper-plane"></i>
                Solicitar cotización
              </Link>
              <Link
                to="/precios/"
                className="flex items-center justify-center gap-3 rounded-xl border border-brand-border px-8 py-4 font-bold text-white transition-all hover:border-brand-orange"
              >
                <i aria-hidden="true" className="fa-solid fa-calculator"></i>
                Configurar proyecto
              </Link>
            </div>
          </div>

          <nav aria-label="Otros servicios" className="mt-12">
            <h2 className="mb-4 font-heading text-sm font-bold tracking-wider text-white uppercase">
              Otros servicios
            </h2>
            <ul className="flex flex-wrap gap-3">
              {services
                .filter((item) => item.slug !== service.slug)
                .map((item) => (
                  <li key={item.key}>
                    <Link
                      to={servicePath(item)}
                      className="inline-flex items-center gap-2 rounded-lg border border-brand-border px-4 py-2 text-sm text-brand-light-text transition-colors hover:border-brand-orange hover:text-brand-orange"
                    >
                      <i aria-hidden="true" className={`${item.icon} text-xs`}></i>
                      {item.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </section>
    </>
  )
}