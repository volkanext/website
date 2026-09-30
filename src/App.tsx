import { ModalProvider } from '@/features/modal/ModalProvider'
import { Modal } from '@/features/modal/Modal'
import { Navbar } from '@/components/layout/Navbar/Navbar'
import { Hero } from '@/features/hero/Hero'
import { StatsSection } from '@/features/stats/StatsSection'
import { Services } from '@/features/services/Services'
import { Portfolio } from '@/features/portfolio/Portfolio'
import { Calculator } from '@/features/calculator/Calculator'
import { Testimonials } from '@/features/testimonials/Testimonials'
import { Faq } from '@/features/faq/Faq'
import { Contact } from '@/features/contact/Contact'
import { Footer } from '@/components/layout/Footer/Footer'

function App() {
  return (
    <ModalProvider>
      <a
        href="#contenido"
        className="sr-only rounded-lg bg-brand-orange-deep px-4 py-2 font-bold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido">
        <Hero />
        <StatsSection />
        <Services />
        <Portfolio />
        <Calculator />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <Modal />
    </ModalProvider>
  )
}

export default App
