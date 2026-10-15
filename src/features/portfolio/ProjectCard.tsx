import type { Project } from '@/data/projects'

interface ProjectCardProps {
  project: Project
}

/**
 * Card única del portafolio. Se usa tanto en la home (`Portfolio`) como en
 * `/proyectos/` (`Projects`): si el dato cambia, cambia en un solo sitio.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="glass-card group flex flex-col overflow-hidden rounded-2xl border border-brand-border">
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
        <img
          src={project.image}
          alt={project.alt}
          loading="lazy"
          className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-transparent"></div>
        <span className="absolute top-4 right-4 rounded-full bg-brand-orange-deep px-3 py-1 text-xs font-bold tracking-wider text-white uppercase backdrop-blur-md">
          {project.status}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="mb-3 self-start rounded-full border border-brand-border bg-white/5 px-3 py-1 text-xs text-brand-light-text">
          {project.category}
        </span>
        <h3 className="mb-2 font-heading text-xl font-bold text-white transition-colors group-hover:text-brand-orange">
          {project.title}
        </h3>
        <p className="mb-4 text-xs leading-relaxed text-brand-light-text">
          {project.desc}
        </p>
        <div className="mb-6 flex flex-wrap gap-2">
          {project.techs.map((tech) => (
            <span
              key={tech}
              className="rounded bg-white/5 px-2 py-1 text-xs text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
        <p className="mt-auto text-xs text-brand-light-text">{project.client}</p>
      </div>
    </article>
  )
}