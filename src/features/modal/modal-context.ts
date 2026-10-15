import { createContext } from 'react'

import type { LegalDoc } from '@/data/legal'

export type ModalPayload =
  | { kind: 'service'; serviceKey: string }
  | { kind: 'alert'; title: string; text: string }
  | { kind: 'legal'; doc: LegalDoc }
  | null

export interface ModalContextValue {
  content: ModalPayload
  openService: (serviceKey: string) => void
  alert: (title: string, text: string) => void
  openLegal: (key: LegalDoc['key']) => void
  close: () => void
  scrollToContact: () => void
}

export const ModalContext = createContext<ModalContextValue | null>(null)
