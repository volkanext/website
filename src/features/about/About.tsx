import { team } from '@/data/team'

export function About() {
  return (
    <section
      id="nosotros"
      aria-labelledby="nosotros-heading"
      className="relative py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 block text-xs font-bold tracking-widest text-brand-orange uppercase">
            Nosotros
          </span>
          <h2
            id="nosotros-heading"
            className="font-heading text-3xl font-bold sm:text-4xl"
          >
            Quiénes construyen tu proyecto
          </h2>
          <p className="mt-5 text-base leading-relaxed text-brand-light-text">
            Somos un equipo pequeño y técnico. Cada proyecto lo trabajamos
            directamente quienes lo diseñan y lo programan, sin intermediarios.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {team.map((member) => (
            <article
              key={member.initials}
              className="glass-card flex flex-col rounded-2xl p-8"
            >
              <div className="mb-6 flex items-center gap-4">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full border font-heading text-lg font-bold ${member.avatarClass}`}
                >
                  {member.initials}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm text-brand-orange">{member.role}</p>
                </div>
              </div>

              <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-300">
                {member.bio}
              </p>

              <ul className="flex flex-wrap gap-2">
                {member.techs.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-lg border border-brand-border px-3 py-1 text-xs font-medium text-brand-light-text"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
