import { Link } from 'react-router-dom'
import { services } from '@/data/services'
import { servicePath } from '@/data/seo'

export function Services() {
  return (
    <section
      id="servicios"
      aria-labelledby="servicios-heading"
      className="relative py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-3 block text-xs font-bold tracking-widest text-brand-orange uppercase">
            Nuestras Capacidades
          </span>
          <h2
            id="servicios-heading"
            className="mb-4 font-heading text-3xl font-bold tracking-tight sm:text-5xl"
          >
            Servicios Digitales de Alto Rendimiento
          </h2>
          <p className="text-base text-brand-light-text sm:text-lg">
            Ofrecemos soluciones end-to-end adaptadas a startups en crecimiento
            y empresas consolidadas.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            /*
              Antes era un <button> que abría un modal y contenía un <h3> y un
              <p>. Eso es HTML inválido: <button> solo admite phrasing content, no
              encabezados ni párrafos. Ahora cada tarjeta enlaza a la página real
              del servicio, así que el HTML es válido, el enlace es un control
              nativo y cada servicio recibe su URL indexable y enlazable.
            */
            <Link
              key={service.key}
              to={servicePath(service)}
              className="glass-card group flex w-full flex-col rounded-2xl p-8 text-left transition-all duration-300 hover:-translate-y-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-brand-orange/30 bg-brand-orange/10 text-2xl text-brand-orange shadow-glow transition-all group-hover:bg-brand-orange group-hover:text-white motion-reduce:transition-none">
                <i aria-hidden="true" className={service.icon}></i>
              </div>
              <h3 className="mb-3 font-heading text-xl font-bold text-white transition-colors group-hover:text-brand-orange">
                {service.title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-brand-light-text">
                {service.desc}
              </p>
              <span className="mt-auto flex items-center text-xs font-semibold text-brand-orange transition-transform group-hover:translate-x-1 motion-reduce:transition-none">
                Saber más{' '}
                <i
                  aria-hidden="true"
                  className="fa-solid fa-arrow-right ml-2"
                ></i>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
