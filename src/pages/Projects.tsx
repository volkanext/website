import { PageHero } from '@/components/ui/PageHero'
import { projects } from '@/data/projects'

export function Projects() {
  return (
    <>
      <PageHero
        eyebrow="Portafolio"
        title="Proyectos Destacados"
        description="Una muestra del tipo de producto que construimos: plataformas de analítica financiera, aplicaciones móviles de rendimiento deportivo y sistemas ERP logísticos."
      />

      {/*
        Aviso de honestidad: estas piezas son proyectos de demostración, no
        trabajos entregados a empresas reales. Presentarlos como casos de
        clientes verificables sería publicidad engañosa, y Google puede tratar
        el contenido no confiable como una señal negativa.
      */}
      <section aria-labelledby="proyectos-lista-heading" className="pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p
            role="note"
            className="rounded-xl border border-brand-border bg-white/5 px-5 py-4 text-sm leading-relaxed text-brand-light-text"
          >
            <i
              aria-hidden="true"
              className="fa-solid fa-circle-info mr-2 text-brand-orange"
            ></i>
            <strong className="text-white">Portafolio de demostración.</strong>{' '}
            Los proyectos siguientes muestran capacidades técnicas y arquitectura
            de referencia; no corresponden a clientes reales. Si necesitas
            referencias verificables de proyectos entregados, escríbenos y las
            compartimos por solicitud.
          </p>
        </div>
      </section>

      <section aria-labelledby="proyectos-lista-heading" className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.id}
                className="glass-card flex flex-col overflow-hidden rounded-2xl border border-brand-border"
              >
                <img
                  src={project.image}
                  alt=""
                  loading="lazy"
                  className="h-48 w-full object-cover"
                />

                <div className="flex flex-1 flex-col p-6">
                  <span className="mb-3 self-start rounded-full border border-brand-border bg-white/5 px-3 py-1 text-xs text-brand-light-text">
                    {project.tag}
                  </span>
                  <h2 id="proyectos-lista-heading" className="mb-2 font-heading text-lg font-bold text-white">
                    {project.title}
                  </h2>
                  <p className="mb-4 text-sm leading-relaxed text-brand-light-text">
                    {project.desc}
                  </p>

                  <ul className="mb-5 flex flex-wrap gap-2">
                    {project.techs.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-md border border-brand-border bg-white/5 px-2.5 py-1 text-xs text-brand-light-text"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-auto space-y-3 border-t border-white/5 pt-4 text-xs">
                    <div>
                      <dt className="mb-1 font-bold text-brand-orange">
                        Alcance técnico
                      </dt>
                      <dd className="leading-relaxed text-brand-light-text">
                        {project.modalDesc}
                      </dd>
                    </div>
                    <div>
                      <dt className="mb-1 font-bold text-brand-orange">
                        Resultado de referencia
                      </dt>
                      <dd className="leading-relaxed text-brand-light-text">
                        {project.impact}
                      </dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}