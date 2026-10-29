import tunica from '@/assets/projects/tunica.webp'
import dental from '@/assets/projects/dental.webp'
import ccip from '@/assets/projects/ccip.webp'

export type ProjectCategory = 'web' | 'mobile' | 'enterprise'

export type ProjectStatus = 'En desarrollo' | 'finalizado'

export interface Project {
  slug: string
  category: ProjectCategory
  image: string
  alt: string
  title: string
  desc: string
  techs: string[]
  client: string
  status: ProjectStatus
}

export const projects: Project[] = [
  {
    slug: 'landing-tunika',
    category: 'web',
    image: tunica,
    alt: 'Vista previa de la Landing Page TÚNIKA',
    title: 'Landing Page TÚNIKA',
    desc: 'Sitio corporativo optimizado para la exposición de marca y presentación del catálogo exclusivo de vestuarios de graduación en alquiler.',
    techs: ['React', 'Tailwind CSS', 'TypeScript'],
    client: 'Túnica Graduaciones',
    status: 'En desarrollo',
  },
  {
    slug: 'aplicativo-odontologico',
    category: 'web',
    image: dental,
    alt: 'Vista previa del Aplicativo Web Odontológico',
    title: 'Aplicativo Web Odontológico',
    desc: 'Panel de control y dashboard interactivo especializado para la gestión integral de pacientes, citas y analíticas internas de clínicas dentales.',
    techs: ['React', 'Express', 'PostgreSQL', 'Prisma'],
    client: 'Consultorio Odontológico BryDentis',
    status: 'En desarrollo',
  },
  {
    slug: 'landing-ccip',
    category: 'enterprise',
    image: ccip,
    alt: 'Vista previa de la Landing Page CCIP',
    title: 'Landing Page CCIP',
    desc: 'Portal institucional enfocado en posicionamiento corporativo y captación de contratistas o proveedores para el abastecimiento de redes a nivel nacional.',
    techs: ['React', 'Tailwind CSS', 'TypeScript'],
    client: 'CCIP Corporación de contratistas y proveedores',
    status: 'En desarrollo',
  },
]
