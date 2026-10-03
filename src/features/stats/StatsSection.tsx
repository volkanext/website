import { stats } from '@/data/stats'
import { techStack } from '@/data/techStack'
import { useCountUp } from './useCountUp'
import { useInView } from '@/hooks/useInView'

function Counter({
  value,
  suffix = '',
  active,
  accent,
}: {
  value: number
  suffix?: string
  active: boolean
  accent?: boolean
}) {
  const count = useCountUp(value, active)
  return (
    <div
      className={`mb-2 flex items-center justify-center font-heading text-3xl font-bold sm:text-5xl ${
        accent ? 'text-brand-orange' : 'text-white'
      }`}
    >
      <span>{count}</span>
      {suffix}
    </div>
  )
}

export function StatsSection() {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section
      aria-label="VOLKANEXT en números"
      className="relative z-10 border-y border-brand-border bg-brand-card/40 py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="mb-16 grid grid-cols-2 gap-8 text-center md:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="p-4">
              <Counter
                value={stat.value}
                suffix={stat.suffix}
                accent={stat.accent}
                active={inView}
              />
              <p className="text-xs font-medium tracking-wider text-brand-light-text uppercase sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="mb-6 text-xs font-semibold tracking-widest text-brand-light-text uppercase">
            Tecnologías Principales con las que Construimos
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-gray-300 sm:gap-6">
            {techStack.map((tech) => (
              <span
                key={tech.label}
                className="glass-card flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium"
              >
                <i aria-hidden="true" className={`${tech.icon} ${tech.iconClass}`}></i>{' '}
                {tech.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
