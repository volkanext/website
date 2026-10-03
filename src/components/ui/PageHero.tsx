interface PageHeroProps {
  eyebrow: string
  title: string
  description: string
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section aria-labelledby="page-hero-heading" className="relative overflow-hidden pt-32 pb-16">
      <div className="pointer-events-none absolute top-0 left-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/10 blur-[120px]"></div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <span className="mb-4 block text-xs font-bold tracking-widest text-brand-orange uppercase">
          {eyebrow}
        </span>
        <h1 id="page-hero-heading" className="mb-6 font-heading text-4xl leading-[1.15] font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto max-w-3xl text-base leading-relaxed text-brand-light-text sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  )
}