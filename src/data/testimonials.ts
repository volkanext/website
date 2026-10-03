export interface Testimonial {
  quote: string
  initials: string
  name: string
  role: string
  avatarClass: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'VOLKANEXT transformó por completo nuestra infraestructura web. La velocidad de carga mejoró un 300% y las conversiones de clientes aumentaron significativamente.',
    initials: 'AD',
    name: 'Aaron Daniel',
    role: 'CTO en FinTech Solutions',
    avatarClass: 'bg-brand-orange/10 border-brand-orange text-brand-orange',
  },
  {
    quote:
      'Su capacidad técnica para construir aplicaciones móviles complejas con sincronización en tiempo real es impresionante. Cumplieron los plazos al 100%.',
    initials: 'VC',
    name: 'Valeria Castro',
    role: 'Product Lead en LogiNext',
    avatarClass: 'bg-blue-500/30 border-blue-500 text-blue-400',
  },
  {
    quote:
      'Profesionalismo, código limpio e impecable diseño UI/UX. No solo escriben software, entienden la estrategia del negocio.',
    initials: 'MR',
    name: 'Mateo Ramos',
    role: 'Founder en CommerceX',
    avatarClass: 'bg-purple-500/30 border-purple-500 text-purple-400',
  },
]