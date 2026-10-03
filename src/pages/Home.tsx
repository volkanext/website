import { Hero } from '@/features/hero/Hero'
import { StatsSection } from '@/features/stats/StatsSection'
import { Services } from '@/features/services/Services'
import { Portfolio } from '@/features/portfolio/Portfolio'
import { Calculator } from '@/features/calculator/Calculator'
import { Testimonials } from '@/features/testimonials/Testimonials'
import { Faq } from '@/features/faq/Faq'
import { Contact } from '@/features/contact/Contact'

export function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <Services />
      <Portfolio />
      <Calculator />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  )
}