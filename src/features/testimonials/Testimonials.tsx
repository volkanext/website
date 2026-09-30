import { testimonials } from '@/data/testimonials'

export function Testimonials() {
  return (
    <section className="border-y border-brand-border bg-brand-card/30 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 block text-xs font-bold tracking-widest text-brand-orange uppercase">
            Testimonios
          </span>
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.initials}
              className="glass-card relative flex flex-col rounded-2xl p-8"
            >
              <div className="mb-4 flex items-center gap-1 text-sm text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <i key={i} className="fa-solid fa-star"></i>
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
