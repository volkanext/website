import { projects } from '@/data/projects'
import { ProjectCard } from './ProjectCard'

export function Portfolio() {
  return (
    <section
      id="proyectos"
      className="border-t border-brand-border bg-brand-card/20 py-24"
      aria-labelledby="portfolio-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between md:flex-row md:items-end">
          <div>
            <span className="mb-3 block text-xs font-bold tracking-widest text-brand-orange uppercase">
              Portafolio
            </span>
            <h2
              id="portfolio-heading"
              className="font-heading text-3xl font-bold tracking-tight sm:text-5xl"
            >
              Proyectos en Desarrollo
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}