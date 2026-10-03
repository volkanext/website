import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <section aria-labelledby="notfound-heading" className="flex min-h-[70vh] items-center justify-center py-32">
      <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
        <p className="mb-4 font-heading text-7xl font-bold text-brand-orange">
          404
        </p>
        <h1 id="notfound-heading" className="mb-4 font-heading text-2xl font-bold text-white sm:text-3xl">
          No encontramos esta página
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-brand-light-text">
          El enlace que seguiste no existe o cambió de dirección. Volvé al inicio
          o mirá nuestros servicios.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="flex items-center justify-center gap-3 rounded-xl bg-brand-orange-deep px-8 py-4 font-bold text-white transition-all hover:bg-brand-orange-deep-hover"
          >
            <i aria-hidden="true" className="fa-solid fa-house"></i>
            Ir al inicio
          </Link>
          <Link
            to="/servicios/"
            className="flex items-center justify-center gap-3 rounded-xl border border-brand-border px-8 py-4 font-bold text-white transition-all hover:border-brand-orange"
          >
            <i aria-hidden="true" className="fa-solid fa-layer-group"></i>
            Ver servicios
          </Link>
        </div>
      </div>
    </section>
  )
}