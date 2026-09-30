import { faqs } from '@/data/faqs'
import { useFaq } from './useFaq'

export function Faq() {
  const { openIndex, toggleItem } = useFaq()

  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="mb-3 block text-xs font-bold tracking-widest text-brand-orange uppercase">
            Preguntas Frecuentes
          </span>
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Resolvemos tus dudas antes de comenzar
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={faq.question}
                className="glass-card overflow-hidden rounded-xl border border-brand-border"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left font-heading text-sm font-bold text-white transition-colors hover:text-brand-orange sm:text-base"
                >
                  <span>{faq.question}</span>
                  <i
                    className={`fa-solid fa-chevron-down text-brand-orange transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  ></i>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-xs leading-relaxed text-brand-light-text sm:text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
