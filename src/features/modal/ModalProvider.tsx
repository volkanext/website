import { useCallback, useMemo, useState, type ReactNode } from 'react'
import {
  ModalContext,
  type ModalContextValue,
  type ModalPayload,
} from './modal-context'
import { legalDocs, type LegalDoc } from '@/data/legal'
import { prefersReducedMotion } from '@/lib/motion'

export function ModalProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ModalPayload>(null)

  const openService = useCallback((serviceKey: string) => {
    setContent({ kind: 'service', serviceKey })
  }, [])

  const openProject = useCallback((projectId: number) => {
    setContent({ kind: 'project', projectId })
  }, [])

  const alert = useCallback((title: string, text: string) => {
    setContent({ kind: 'alert', title, text })
  }, [])

  const openLegal = useCallback((key: LegalDoc['key']) => {
    setContent({ kind: 'legal', doc: legalDocs[key] })
  }, [])

  const close = useCallback(() => setContent(null), [])

  const scrollToContact = useCallback(() => {
    document
      .getElementById('contacto')
      ?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }, [])

  const value = useMemo<ModalContextValue>(
    () => ({
      content,
      openService,
      openProject,
      alert,
      openLegal,
      close,
      scrollToContact,
    }),
    [content, openService, openProject, alert, openLegal, close, scrollToContact],
  )

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
