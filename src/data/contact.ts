export interface SocialLink {
  icon: string
  href: string
  label: string
  /**
   * `false` lo excluye del `sameAs` del JSON-LD. El `sameAs` identifica
   * perfiles de la misma entidad; un enlace de contacto por WhatsApp no lo es
   * y Schema.org no lo acepta como tal.
   */
  sameAs?: boolean
}

export const contact = {
  email: 'volkanext@hotmail.com',
  phone: '+51 981 658 221',
  phoneHref: 'tel:+51921671101',
  location: 'Arequipa, Perú — Alcance Global',
}

const whatsappNumber = contact.phoneHref.replace('tel:+', '')

export const socials: SocialLink[] = [
  {
    icon: 'fa-brands fa-github',
    href: 'https://github.com/volkanext',
    label: 'GitHub',
  },
  {
    icon: 'fa-brands fa-linkedin',
    href: 'https://www.linkedin.com/company/volkanext/',
    label: 'LinkedIn',
  },
  {
    icon: 'fa-brands fa-x-twitter',
    href: 'https://x.com/volkanext',
    label: 'X',
  },
  {
    icon: 'fa-brands fa-instagram',
    href: 'https://www.instagram.com/volkanext/',
    label: 'Instagram',
  },
  {
    icon: 'fa-brands fa-whatsapp',
    href: `https://wa.me/${whatsappNumber}?text=Hola%20VOLKANEXT%2C%20quiero%20cotizar%20un%20proyecto.`,
    label: 'WhatsApp',
    sameAs: false,
  },
]
