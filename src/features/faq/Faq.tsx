import { faqs } from '@/data/faqs'
import { useFaq } from './useFaq'

export function Faq() {
  const { openIndex, toggleItem } = useFaq()

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="mb-3 block text-xs font-bold tracking-widest text-brand-orange uppercase">
            Preguntas Frecuentes
          </span>
          <h2
            id="faq-heading"
            className="font-heading text-3xl font-bold sm:text-4xl"
          >
            Resolvemos tus dudas antes de comenzar
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            const buttonId = `faq-button-${index}`
            const panelId = `faq-panel-${index}`

            return (
              <div
                key={faq.question}
                className="glass-card overflow-hidden rounded-xl border border-brand-border"
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => toggleItem(index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between px-6 py-5 text-left font-heading text-sm font-bold text-white transition-colors hover:text-brand-orange focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-orange sm:text-base"
                  >
                    <span>{faq.question}</span>
                    <i
                      aria-hidden="true"
                      className={`fa-solid fa-chevron-down text-brand-orange transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    ></i>
                  </button>
                </h3>

                {/*
                  La respuesta queda siempre montada en el DOM y se colapsa con
                  grid-template-rows en lugar de con un condicional. Es lo que
                  permite que el FAQPage de JSON-LD sea válido: un accordion que
                  renderiza la respuesta solo al abrirse no expone nada en el
                  HTML servido, y Google marcaría el bloque como no coincidente.
                */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-5 text-xs leading-relaxed text-brand-light-text sm:text-sm">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
