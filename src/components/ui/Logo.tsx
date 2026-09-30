import logoSmall from '@/assets/logo/logoSmall.svg'

interface LogoProps {
  size?: 'sm' | 'md'
  withTagline?: boolean
}

export function Logo({ size = 'md', withTagline = true }: LogoProps) {
  const imgHeight = size === 'sm' ? 'h-8 lg:h-9' : 'h-11'
  const textSize = size === 'sm' ? 'text-base lg:text-lg' : 'text-xl'

  return (
    <a
      href="#inicio"
      aria-label="VOLKANEXT — Inicio"
      className="group flex shrink-0 items-center gap-3 transition-transform duration-300 hover:scale-105"
      onClick={(e) => e.preventDefault()}
    >
      <img
        src={logoSmall}
        alt="VOLKANEXT"
        draggable={false}
        className={`${imgHeight} w-auto`}
      />
      <div>
        <div
          className={`flex items-center ${textSize} font-heading font-bold tracking-wider text-white`}
        >
          VOLKA<span className="text-brand-orange">NEXT</span>
        </div>
        {withTagline && (
          <span className="-mt-1 block text-[9px] font-medium tracking-widest text-brand-light-text uppercase">
            Software &amp; Web
          </span>
        )}
      </div>
    </a>
  )
}
