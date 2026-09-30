import { useEffect } from 'react'
import { services } from '@/data/services'
import { projects } from '@/data/projects'
import { useModal } from './useModal'

export function Modal() {
  const { content, close, scrollToContact } = useModal()

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [close])

  if (!content) return null

  const handleRequest = () => {
    close()
    setTimeout(scrollToContact, 50)
  }

  const renderContent = () => {
    if (content.kind === 'service') {
      const service = services.find((s) => s.key === content.serviceKey)
      if (!service) return null

      return (
        <>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-brand-orange/40 bg-brand-orange/20 text-2xl text-brand-orange">
            <i className={`${service.icon} font-bold`}></i>
          </div>
          <h3 className="mb-3 font-heading text-2xl font-bold text-white">
            {service.modalTitle}
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-brand-light-text">
            {service.modalDesc}
          </p>
          <div className="mb-6">
            <div className="mb-2 text-xs font-semibold text-gray-400 uppercase">
              Tecnologías recomendadas:
            </div>
            <div className="flex flex-wrap gap-2">
              {service.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg bg-white/10 px-3 py-1 text-xs font-medium text-white"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={handleRequest}
            className="w-full rounded-xl bg-brand-orange-deep py-3.5 text-sm font-bold text-white shadow-magma"
          >
            Solicitar Propuesta para este Servicio
          </button>
        </>
      )
    }

    if (content.kind === 'project') {
      const project = projects.find((p) => p.id === content.projectId)
      if (!project) return null

      return (
        <>
          <span className="text-xs font-bold tracking-widest text-brand-orange uppercase">
            {project.client}
          </span>
          <h3 className="mt-1 mb-4 font-heading text-2xl font-bold text-white">
            {project.modalTitle}
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-brand-light-text">
            {project.modalDesc}
          </p>
          <div className="mb-6 rounded-xl border border-brand-orange/30 bg-brand-orange/10 p-4">
            <span className="mb-1 block text-xs font-bold text-brand-orange uppercase">
              Impacto de Negocio:
            </span>
            <span className="text-sm font-semibold text-white">
              {project.impact}
            </span>
          </div>
          <button
            onClick={close}
className="w-full rounded-xl bg-brand-orange-deep py-3 text-sm font-bold text-white shadow-magma"
          >
            Cerrar Detalle
          </button>
        </>
      )
    }

    if (content.kind === 'legal') {
      return (
        <>
          <span className="text-xs font-bold tracking-widest text-brand-orange uppercase">
            Documento Legal
          </span>
          <h3 className="mt-1 mb-1 font-heading text-2xl font-bold text-white">
            {content.doc.title}
          </h3>
          <p className="mb-4 text-xs text-gray-400">{content.doc.updatedAt}</p>
          <div className="max-h-[55vh] space-y-5 overflow-y-auto pr-1">
            {content.doc.sections.map((section) => (
              <div key={section.heading}>
                <h4 className="mb-2 font-heading text-sm font-bold text-white">
                  {section.heading}
                </h4>
                <p className="text-sm leading-relaxed text-brand-light-text">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={close}
            className="mt-6 w-full rounded-xl bg-brand-orange-deep py-3 text-sm font-bold text-white shadow-magma"
          >
            Aceptar
          </button>
        </>
      )
    }

    return (
      <>
        <h3 className="mb-3 font-heading text-2xl font-bold text-white">
          {content.title}
        </h3>
        <p className="mb-6 text-sm text-brand-light-text">{content.text}</p>
        <button
          onClick={close}
          className="w-full rounded-xl bg-brand-orange-deep py-3 text-sm font-bold text-white shadow-magma"
        >
          Aceptar
        </button>
      </>
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md transition-all"
      onClick={close}
    >
      <div
        className="glass-card relative w-full max-w-2xl animate-float rounded-2xl border border-brand-orange/40 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="Cerrar modal"
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <i className="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
        {renderContent()}
      </div>
    </div>
  )
}
