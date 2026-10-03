export interface SocialLink {
  icon: string
  href: string
  label: string
}

export const contact = {
  email: 'volkanext@hotmail.com',
  phone: '+51 981 658 221',
  phoneHref: 'tel:+51981658221',
  location: 'Arequipa, Perú — Alcance Global',
}

export const socials: SocialLink[] = [
  { icon: 'fa-brands fa-github', href: 'https://github.com/volkanext', label: 'GitHub' },
  { icon: 'fa-brands fa-linkedin', href: 'https://www.linkedin.com/company/volkanext/', label: 'LinkedIn' },
  { icon: 'fa-brands fa-x-twitter', href: 'https://x.com/volkanext', label: 'X' },
  { icon: 'fa-brands fa-instagram', href: 'https://www.instagram.com/volkanext/', label: 'Instagram' },
]