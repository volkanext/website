import { useEffect } from 'react'
import { ModalProvider } from '@/features/modal/ModalProvider'
import { Modal } from '@/features/modal/Modal'
import { Navbar } from '@/components/layout/Navbar/Navbar'
import { Footer } from '@/components/layout/Footer/Footer'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Home } from '@/pages/Home'
import { ServicesIndex } from '@/pages/ServicesIndex'
import { ServiceDetail } from '@/pages/ServiceDetail'
import { Projects } from '@/pages/Projects'
import { Pricing } from '@/pages/Pricing'
import { LegalPage } from '@/pages/LegalPage'
import { ContactPage } from '@/pages/ContactPage'
import { NotFound } from '@/pages/NotFound'

/**
 * React Router no hace scroll al navegar, así que sin esto cada salto entre
 * páginas deja al usuario en medio del documento anterior.
 */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <ModalProvider>
      <ScrollToTop />
      <a
        href="#contenido"
        className="sr-only rounded-lg bg-brand-orange-deep px-4 py-2 font-bold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<ServicesIndex />} />
          <Route path="/servicios/:slug" element={<ServiceDetail />} />
          <Route path="/proyectos" element={<Projects />} />
          <Route path="/precios" element={<Pricing />} />
          <Route path="/privacidad" element={<LegalPage docKey="privacy" />} />
          <Route path="/terminos" element={<LegalPage docKey="terms" />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Modal />
    </ModalProvider>
  )
}

export default App