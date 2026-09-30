import { services } from '@/data/services'
import { useModal } from '@/features/modal/useModal'

export function Services() {
  const { openService } = useModal()

  return (
    <section id="servicios" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-3 block text-xs font-bold tracking-widest text-brand-orange uppercase">
            Nuestras Capacidades
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight sm:text-5xl">
            Servicios Digitales de Alto Rendimiento
          </h2>
          <p className="text-base text-brand-light-text sm:text-lg">
            Ofrecemos soluciones end-to-end adaptadas a startups en crecimiento
            y empresas consolidadas.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <button
              type="button"
              key={service.key}
              onClick={() => openService(service.key)}
              className="glass-card group w-full cursor-pointer rounded-2xl p-8 text-left transition-all duration-300 hover:-translate-y-2"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-brand-orange/30 bg-brand-orange/10 text-2xl text-brand-orange shadow-glow transition-all group-hover:bg-brand-orange group-hover:text-white">
                <i className={service.icon}></i>
              </div>
              <h3 className="mb-3 font-heading text-xl font-bold text-white transition-colors group-hover:text-brand-orange">
                {service.title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-brand-light-text">
                {service.desc}
              </p>
              <div className="flex items-center text-xs font-semibold text-brand-orange transition-transform group-hover:translate-x-1">
                Saber más <i className="fa-solid fa-arrow-right ml-2"></i>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
