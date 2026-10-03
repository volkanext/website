export interface TechItem {
  icon: string
  label: string
  iconClass: string
}

export const techStack: TechItem[] = [
  {
    icon: 'fa-brands fa-react',
    label: 'React / Next.js',
    iconClass: 'text-cyan-400',
  },
  {
    icon: 'fa-brands fa-node-js',
    label: 'Node.js',
    iconClass: 'text-green-500',
  },
  {
    icon: 'fa-brands fa-python',
    label: 'Python / FastAPI',
    iconClass: 'text-yellow-400',
  },
  {
    icon: 'fa-brands fa-aws',
    label: 'Cloud & AWS',
    iconClass: 'text-orange-400',
  },
  {
    icon: 'fa-brands fa-docker',
    label: 'Docker & DevOps',
    iconClass: 'text-blue-400',
  },
  {
    icon: 'fa-solid fa-mobile-screen',
    label: 'React Native / Flutter',
    iconClass: 'text-brand-orange',
  },
]