import { useParticleCanvas } from './useParticleCanvas'

export function Hero() {
  const canvasRef = useParticleCanvas()

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-28 pb-20" aria-labelledby="hero-heading">
      <canvas ref={canvasRef} id="hero-canvas"></canvas>

      <div className="pointer-events-none absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/15 blur-[140px]"></div>
      <div className="pointer-events-none absolute right-10 bottom-10 h-[300px] w-[300px] rounded-full bg-red-600/10 blur-[100px]"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="glass-card mb-8 inline-flex animate-float items-center gap-2 rounded-full border border-brand-orange/30 px-4 py-2 text-xs font-medium text-gray-200 shadow-glow sm:text-sm">
          <span className="h-2 w-2 animate-ping rounded-full bg-brand-orange"></span>
          <span>Agencia de Desarrollo de Software de Alto Rendimiento</span>
          <i aria-hidden="true" className="fa-solid fa-chevron-right text-xs text-brand-orange"></i>
        </div>

        <h1 id="hero-heading" className="mx-auto mb-6 max-w-5xl font-heading text-4xl leading-[1.1] font-bold tracking-tight sm:text-6xl md:text-7xl">
          Ideas que se convierten en <br className="hidden sm:inline" />
          <span className="gradient-text-orange">soluciones digitales.</span>
        </h1>

        <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed font-normal text-brand-light-text sm:text-xl">
          Diseñamos y desarrollamos software a medida, aplicaciones web
          complejas y plataformas móviles con arquitectura moderna, alta
          velocidad e impacto real de negocio.
        </p>

        <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <a
            href="#proyectos"
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-brand-orange-deep px-8 py-4 text-center font-bold text-white shadow-magma-lg transition-all hover:-translate-y-1 hover:bg-brand-orange-deep-hover sm:w-auto"
          >
            <i aria-hidden="true" className="fa-solid fa-rocket"></i> Ver Proyectos
          </a>
          <a
            href="#calculadora"
            className="glass-card flex w-full items-center justify-center gap-3 rounded-xl border border-brand-border px-8 py-4 text-center font-bold text-white transition-all hover:-translate-y-1 hover:bg-white/10 sm:w-auto"
          >
            <i aria-hidden="true" className="fa-solid fa-calculator text-brand-orange"></i> Cotizar
            Proyecto
          </a>
        </div>

        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-6 border-t border-white/10 pt-8 font-heading text-xs font-semibold tracking-widest text-gray-400 uppercase sm:gap-12 sm:text-sm">
          <span className="flex items-center gap-2">
            <i aria-hidden="true" className="fa-solid fa-lightbulb text-brand-orange"></i> IDEAS
          </span>
          <span className="text-brand-orange">•</span>
          <span className="flex items-center gap-2">
            <i aria-hidden="true" className="fa-solid fa-code text-brand-orange"></i> CODE
          </span>
          <span className="text-brand-orange">•</span>
          <span className="flex items-center gap-2">
            <i aria-hidden="true" className="fa-solid fa-chart-line text-brand-orange"></i> REAL
            IMPACT
          </span>
        </div>
      </div>
    </section>
  )
}
