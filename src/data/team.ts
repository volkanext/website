export interface TeamMember {
  initials: string
  name: string
  role: string
  bio: string
  techs: string[]
  avatarClass: string
}

export const team: TeamMember[] = [
  {
    initials: 'DR',
    name: 'Dante Rodríguez',
    role: 'Backend & Frontend',
    bio: 'Construye la lógica de servidor y las interfaces que la consumen. Le importa que cada flujo funcione igual de bien en el código y en pantalla.',
    techs: ['Node.js', 'Python / FastAPI', 'PostgreSQL', 'React'],
    avatarClass:
      'bg-brand-orange/10 border-brand-orange text-brand-orange',
  },
  {
    initials: 'AA',
    name: 'Aaron Apaza',
    role: 'Backend & Frontend',
    bio: 'Trabaja de punta a punta: modela los datos, expone la API y arma la experiencia de usuario con componentes reutilizables.',
    techs: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    avatarClass: 'bg-blue-500/30 border-blue-500 text-blue-400',
  },
]
