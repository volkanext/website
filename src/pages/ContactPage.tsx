import { PageHero } from '@/components/ui/PageHero'
import { Contact } from '@/features/contact/Contact'

export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Hablemos"
        title="Contacto"
        description="Cuéntanos qué necesitas construir. Te respondemos en menos de 24 horas con una propuesta clara y sin compromiso."
      />
      <Contact />
    </>
  )
}