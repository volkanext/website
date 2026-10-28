import { testimonials } from '@/data/testimonials'

export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="border-y border-brand-border bg-brand-card/30 py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 block text-xs font-bold tracking-widest text-brand-orange uppercase">
            Testimonios
          </span>
          <h2
            id="testimonials-heading"
            className="font-heading text-3xl font-bold sm:text-4xl"
          >
            Un ejemplo del estándar que entregamos
          </h2>
          <p
            role="note"
            className="mx-auto mt-5 rounded-xl border border-brand-border bg-white/5 px-5 py-4 text-left text-sm leading-relaxed text-brand-light-text"
          >
            <i
              aria-hidden="true"
              className="fa-solid fa-circle-info mr-2 text-brand-orange"
            ></i>
            <strong className="text-white">Testimonio ilustrativo.</strong>{' '}
            Describe el tipo de valoración y de resultados que buscamos en un
            proyecto; no es una cita literal de un cliente. Si quieres
            referencias verificables de trabajos entregados, escríbenos y las
            compartimos.
          </p>
        </div>

        <div
          className={
            testimonials.length === 1
              ? 'mx-auto grid max-w-2xl grid-cols-1 gap-8'
              : 'grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'
          }
        >
          {testimonials.map((t) => (
            <div
              key={t.initials}
              className="glass-card relative flex flex-col rounded-2xl p-8"
            >
              <div
                role="img"
                aria-label="Valoración ilustrativa: 5 de 5 estrellas"
                className="mb-4 flex items-center gap-1 text-sm text-yellow-400"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <i
                    key={i}
                    aria-hidden="true"
                    className="fa-solid fa-star"
                  ></i>
                ))}
              </div>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-300 italic">
                {t.quote}
              </p>
              <div className="mt-auto flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border font-bold ${t.avatarClass}`}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-heading text-sm font-bold text-white">
                    {t.name}
                  </div>
                  <div className="text-xs text-brand-light-text">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
