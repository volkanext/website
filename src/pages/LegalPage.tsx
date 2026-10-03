import { PageHero } from '@/components/ui/PageHero'
import { legalDocs, type LegalDoc } from '@/data/legal'

export function LegalPage({ docKey }: { docKey: LegalDoc['key'] }) {
  const doc = legalDocs[docKey]

  return (
    <>
      <PageHero
        eyebrow="Documento legal"
        title={doc.title}
        description="Este documento forma parte de los términos de uso del sitio de VOLKANEXT."
      />

      <section aria-labelledby="legal-doc-heading" className="pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <article className="glass-card rounded-3xl border border-brand-border p-8 sm:p-12">
            <p className="mb-8 text-xs text-brand-light-text">{doc.updatedAt}</p>

            {doc.sections.map((section) => (
              <section aria-labelledby="legal-doc-heading" key={section.heading} className="mb-8 last:mb-0">
                <h2 id="legal-doc-heading" className="mb-3 font-heading text-lg font-bold text-white">
                  {section.heading}
                </h2>
                <p className="text-sm leading-relaxed text-brand-light-text">
                  {section.body}
                </p>
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  )
}