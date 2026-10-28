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
      'La landing de TÚNIKA organiza el catálogo de vestuarios de graduación en categorías claras y deja a la vista cómo funciona el alquiler. El diseño prioriza la foto del producto y la navegación en móvil.',
    initials: 'T',
    name: 'Proyecto Túnika',
    role: 'Landing page',
    avatarClass: 'bg-brand-orange/10 border-brand-orange text-brand-orange',
  },
]
