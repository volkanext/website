import { Link } from 'react-router-dom'
import logoSmall from '@/assets/logo/logoSmall.svg'

interface LogoProps {
  size?: 'sm' | 'md'
  withTagline?: boolean
}

export function Logo({ size = 'md', withTagline = true }: LogoProps) {
  const imgHeight = size === 'sm' ? 'h-8 lg:h-9' : 'h-11'
  const textSize = size === 'sm' ? 'text-base lg:text-lg' : 'text-xl'

  /*
   * Antes era un <a href="#inicio"> con onClick preventDefault: un control que
   * parecía enlace y no hacía nada. Ahora es un Link real a la home, que es lo
   * que el aria-label promete y lo que un usuario de teclado esperaría.
   */
  return (
    <Link
      to="/"
      aria-label="VOLKANEXT — Inicio"
      className="group flex shrink-0 items-center gap-3 transition-transform duration-300 hover:scale-105 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
    >
      {/*
        alt vacío a propósito: el enlace ya se anuncia por su aria-label y el
        nombre "VOLKA NEXT" está inmediatamente al lado como texto. Repetirlo
        en el alt hace que un lector de pantalla lo lea dos veces.
      */}
      <img
        src={logoSmall}
        alt=""
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
          <span className="-mt-1 block text-xs font-medium tracking-widest text-brand-light-text uppercase">
            Software &amp; Web
          </span>
        )}
      </div>
    </Link>
  )
}
