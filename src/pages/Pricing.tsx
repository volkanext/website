import { Link } from 'react-router-dom'
import { PageHero } from '@/components/ui/PageHero'
import { presupuestoOptions, projectTypeOptions } from '@/data/calculator'

export function Pricing() {
  return (
    <>
      <PageHero
        eyebrow="Costos"
        title="Precios de Desarrollo Web y Software"
        description="Trabajamos con cotizaciones a medida en soles (S/.). El precio depende del alcance, la tecnología y los plazos: estas son las franjas de referencia con las que ordenamos un proyecto antes de cotizar."
      />

      <section aria-labelledby="precios-franjas-heading" className="pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 id="precios-franjas-heading" className="mb-6 text-center font-heading text-2xl font-bold text-white">
            Franjas de inversión
          </h2>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {presupuestoOptions
              .filter((option) => option.value !== 'unknown')
              .map((option) => (
                <li
                  key={option.value}
                  className="glass-card rounded-2xl border border-brand-border p-6 text-center"
                >
                  <p className="font-heading text-2xl font-bold text-brand-orange">
                    {option.label}
                  </p>
                </li>
              ))}
          </ul>

          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-brand-light-text">
            Si aún no defines un monto, el configurador igual te sirve: nos
            sirve para dimensionar el proyecto y preparar una propuesta.
          </p>
        </div>
      </section>

      <section aria-labelledby="precios-tipos-heading" className="pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 id="precios-tipos-heading" className="mb-6 text-center font-heading text-2xl font-bold text-white">
            Tipos de proyecto que cotizamos
          </h2>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projectTypeOptions.map((option) => (
              <li
                key={option.type}
                className="glass-card rounded-xl border border-brand-border p-5"
              >
                <i
                  aria-hidden="true"
                  className={`mb-3 block text-xl ${option.icon} text-brand-orange`}
                ></i>
                <h3 className="mb-1 font-heading text-sm font-bold text-white">
                  {option.title}
                </h3>
                <p className="text-xs leading-relaxed text-brand-light-text">
                  {option.desc}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-14 text-center">
            <Link
              to="/#calculadora"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-brand-orange-deep px-8 py-4 font-bold text-white shadow-magma-lg transition-all hover:bg-brand-orange-deep-hover"
            >
              <i aria-hidden="true" className="fa-solid fa-calculator"></i>
              Configurar mi proyecto gratis
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}