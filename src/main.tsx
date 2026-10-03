import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

/**
 * hydrateRoot y no createRoot: cada página se sirve con el HTML ya renderizado
 * por el prerender, así que React necesita hidratar esa existente en lugar de
 * tirar todo y volver a pintar. Si el HTML y el primer render del cliente
 * difieren, React lo avisa por consola.
 */
hydrateRoot(
  rootElement,
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)