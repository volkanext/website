import { usePortfolioFilter } from './usePortfolioFilter'
import { useModal } from '@/features/modal/useModal'

const activeStyles = 'bg-brand-orange-deep text-white shadow-magma'
const inactiveStyles = 'glass-card text-gray-300 hover:text-white'

export function Portfolio() {
  const { filter, setFilter, filteredProjects, filters } = usePortfolioFilter()
  const { openProject } = useModal()

  return (
    <section
      id="proyectos"
      className="border-t border-brand-border bg-brand-card/20 py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between md:flex-row md:items-end">
          <div>
            <span className="mb-3 block text-xs font-bold tracking-widest text-brand-orange uppercase">
              Casos de Éxito
            </span>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-5xl">
              Proyectos Destacados
            </h2>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 md:mt-0">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                  filter === f.key ? activeStyles : inactiveStyles
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card group overflow-hidden rounded-2xl border border-brand-border"
            >
              <div className="relative h-52 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                <img
                  src={project.image}
                  alt={project.alt}
                  className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-transparent"></div>
                <span className="absolute top-4 left-4 rounded-full bg-brand-orange-deep px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase backdrop-blur-md">
                  {project.tag}
                </span>
              </div>
              <div className="p-6">
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
                      className="rounded bg-white/5 px-2 py-1 text-[11px] text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => openProject(project.id)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-brand-orange/40 py-2.5 text-xs font-semibold text-brand-orange transition-all hover:bg-brand-orange-deep hover:text-white"
                >
                  Ver Detalles{' '}
                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
