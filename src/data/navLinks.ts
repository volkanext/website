export interface NavLink {
  label: string
  href: string
  badge?: string
  right?: boolean
}

export const navLinks: NavLink[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Cotización', href: '#calculadora', badge: 'Gratis' },
  { label: 'Contacto', href: '#contacto', right: true },
]