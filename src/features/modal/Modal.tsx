import { useEffect, useRef, type ReactNode } from 'react'
import { services } from '@/data/services'
import { projects } from '@/data/projects'
import { useModal } from './useModal'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

function getFocusable(node: HTMLElement | null): HTMLElement[] {
  if (!node) return []
  return Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.offsetParent !== null || el === document.activeElement,
  )
}

export function Modal() {
  const { content, close, scrollToContact } = useModal()
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  // Escape + trampa de foco. El foco queda confinado dentro del diálogo para
  // que un usuario de teclado no navegue al fondo de la página detrás del
  // overlay, que sigue siendo visible y legible.
  useEffect(() => {
    if (!content) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        return
      }
      if (e.key !== 'Tab') return

      const focusables = getFocusable(dialogRef.current)
      if (focusables.length === 0) {
        e.preventDefault()
        dialogRef.current?.focus()
        return
      }

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement

      if (e.shiftKey && (active === first || active === dialogRef.current)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [content, close])

  // Foco inicial + scroll lock + devolución del foco al elemento disparador.
  useEffect(() => {
    if (!content) return

    triggerRef.current = document.activeElement as HTMLElement | null

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusables = getFocusable(dialogRef.current)
    ;(focusables[0] ?? dialogRef.current)?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      triggerRef.current?.focus()
    }
  }, [content])

  if (!content) return null

  const handleRequest = () => {
    close()
    setTimeout(scrollToContact, 50)
  }

  const ctaClass =
    'w-full rounded-xl bg-brand-orange-deep py-3.5 text-sm font-bold text-white shadow-magma transition-colors hover:bg-brand-orange-deep-hover'

  const renderContent = (): { title: string; node: ReactNode } => {
    if (content.kind === 'service') {
      const service = services.find((s) => s.key === content.serviceKey)
      if (!service) return { title: 'Servicio', node: null }

      return {
        title: service.modalTitle,
        node: (
          <>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-brand-orange/40 bg-brand-orange/20 text-2xl text-brand-orange">
              <i aria-hidden="true" className={`${service.icon} font-bold`}></i>
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
            <button type="button" onClick={handleRequest} className={ctaClass}>
              Solicitar Propuesta para este Servicio
            </button>
          </>
        ),
      }
    }

    if (content.kind === 'project') {
      const project = projects.find((p) => p.id === content.projectId)
      if (!project) return { title: 'Proyecto', node: null }

      return {
        title: project.modalTitle,
        node: (
          <>
            <span className="text-xs font-bold tracking-widest text-brand-orange uppercase">
              {project.client}
            </span>
            <h3 className="mt-1 mb-4 font-heading text-2xl font-bold text-white">
              {project.modalTitle}
            </h3>
            {/*
              El proyecto es una demostración, así que el "impacto de negocio"
              del impacto mostrado es una estimación de referencia del alcance
              técnico, no un resultado medido en un cliente.
            */}
            <p
              role="note"
              className="mb-4 rounded-xl border border-brand-orange/30 bg-brand-orange/10 px-4 py-3 text-xs leading-relaxed text-brand-light-text"
            >
              <strong className="text-brand-orange uppercase">
                Proyecto de demostración.
              </strong>{' '}
              No corresponde a un cliente real. El impacto mostrado es una
              estimación de referencia del alcance técnico, no un resultado
              medido.
            </p>
            <p className="mb-4 text-sm leading-relaxed text-brand-light-text">
              {project.modalDesc}
            </p>
            <div className="mb-6 rounded-xl border border-brand-border bg-white/5 p-4">
              <span className="mb-1 block text-xs font-bold text-gray-400 uppercase">
                Impacto de Negocio (estimado):
              </span>
              <span className="text-sm font-semibold text-white">
                {project.impact}
              </span>
            </div>
            <button type="button" onClick={close} className={ctaClass}>
              Cerrar Detalle
            </button>
          </>
        ),
      }
    }

    if (content.kind === 'legal') {
      return {
        title: content.doc.title,
        node: (
          <>
            <span className="text-xs font-bold tracking-widest text-brand-orange uppercase">
              Documento Legal
            </span>
            <h3 className="mt-1 mb-1 font-heading text-2xl font-bold text-white">
              {content.doc.title}
            </h3>
            <p className="mb-4 text-xs text-gray-400">
              {content.doc.updatedAt}
            </p>
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
              type="button"
              onClick={close}
              className={`${ctaClass} mt-6`}
            >
              Aceptar
            </button>
          </>
        ),
      }
    }

    return {
      title: content.title,
      node: (
        <>
          <h3 className="mb-3 font-heading text-2xl font-bold text-white">
            {content.title}
          </h3>
          <p className="mb-6 text-sm text-brand-light-text">{content.text}</p>
          <button type="button" onClick={close} className={ctaClass}>
            Aceptar
          </button>
        </>
      ),
    }
  }

  const { title, node } = renderContent()

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md transition-all"
      onClick={close}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="glass-card relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-brand-orange/40 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Cerrar modal"
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
        >
          <i className="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
        {node}
      </div>
    </div>
  )
}
