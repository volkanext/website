import { PageHero } from '@/components/ui/PageHero'
import { projects } from '@/data/projects'
import { ProjectCard } from '@/features/portfolio/ProjectCard'

export function Projects() {
  return (
    <>
      <PageHero
        eyebrow="Portafolio"
        title="Proyectos en Desarrollo"
        description="Desarrollos web en curso para clientes reales: landing pages corporativas y aplicativos a medida, construidos con React, TypeScript y Tailwind CSS."
      />

      <section aria-label="Lista de proyectos" className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}