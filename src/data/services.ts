export type ServiceKey = 'web' | 'mobile' | 'software' | 'cloud' | 'uiux' | 'ai'

export interface Service {
  key: ServiceKey
  /** Segmento de URL de la página del servicio: /servicios/<slug> */
  slug: string
  icon: string
  title: string
  desc: string
  modalTitle: string
  modalDesc: string
  stack: string[]
}

export const services: Service[] = [
  {
    key: 'web',
    slug: 'desarrollo-web',
    icon: 'fa-solid fa-code',
    title: 'Desarrollo Web & Web Apps',
    desc: 'Plataformas SaaS, portales corporativos y aplicaciones web de alto impacto con Next.js y React. Optimizado para SEO y velocidad.',
    modalTitle: 'Desarrollo Web & Web Apps',
    modalDesc:
      'Desarrollamos experiencias digitales web optimizadas para máxima conversión, SEO impecable y código limpio con los frameworks más potentes.',
    stack: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Node.js'],
  },
  {
    key: 'mobile',
    slug: 'aplicaciones-moviles',
    icon: 'fa-solid fa-mobile-screen-button',
    title: 'Aplicaciones Móviles',
    desc: 'Desarrollo nativo e híbrido para iOS y Android. Aplicaciones fluidas con experiencia de usuario nativa y sincronización en tiempo real.',
    modalTitle: 'Aplicaciones Móviles Nativas e Híbridas',
    modalDesc:
      'Apps para iOS y Android creadas con React Native o Flutter, ofreciendo rendimiento fluido a 60fps, notificaciones push y diseño UX intuitivo.',
    stack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
  },
  {
    key: 'software',
    slug: 'software-erp',
    icon: 'fa-solid fa-gears',
    title: 'Software a Medida & ERPs',
    desc: 'Sistemas de gestión, automatización de procesos internos, dashboards analíticos y microservicios diseñados a la medida de tu empresa.',
    modalTitle: 'Software a Medida & ERPs',
    modalDesc:
      'Digitalizamos los procesos clave de tu empresa con software personalizado que elimina cuello de botella e incrementa la productividad.',
    stack: ['Python', 'PostgreSQL', 'Docker', 'FastAPI', 'Redis'],
  },
  {
    key: 'cloud',
    slug: 'cloud-devops',
    icon: 'fa-solid fa-cloud-arrow-up',
    title: 'Cloud & DevOps Deployment',
    desc: 'Arquitectura en la nube escalable, integración continua (CI/CD), contenedores Docker/Kubernetes y gestión de infraestructura segura.',
    modalTitle: 'Cloud & DevOps Infrastructure',
    modalDesc:
      'Diseño de arquitecturas tolerantes a fallos en AWS/GCP, automatización CI/CD, monitoreo de servidor y escalamiento automático.',
    stack: ['AWS', 'Docker', 'Kubernetes', 'GitHub Actions', 'Nginx'],
  },
  {
    key: 'uiux',
    slug: 'diseno-ui-ux',
    icon: 'fa-solid fa-palette',
    title: 'Diseño UI/UX Profesional',
    desc: 'Interfaces memorables, prototipos interactivos en Figma y diseño centrado en la conversión y la mejor usabilidad para tus usuarios.',
    modalTitle: 'Diseño de Experiencia UI/UX',
    modalDesc:
      'Creamos prototipos interactivos en Figma centrados en la usabilidad, arquitectura de información y estética Cyberpunk/Tech de vanguardia.',
    stack: ['Figma', 'Design Systems', 'User Research', 'Prototyping'],
  },
  {
    key: 'ai',
    slug: 'ia-y-bots',
    icon: 'fa-solid fa-brain',
    title: 'Integración de IA & Bots',
    desc: 'Potenciamos tus apps con modelos de Inteligencia Artificial (OpenAI, Claude, LLMs), automatización inteligente y procesamiento de datos.',
    modalTitle: 'Integración de Inteligencia Artificial',
    modalDesc:
      'Aprovecha la potencia de la IA generativa, embeddings vectoriales y chatbots avanzados entrenados con tus propios datos.',
    stack: ['OpenAI API', 'LangChain', 'Python', 'Vector DBs'],
  },
]