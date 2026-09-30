import { useState, type FormEvent } from 'react'
import { contact, socials } from '@/data/contact'

const inputClass =
  'w-full bg-brand-dark/80 border border-brand-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-orange transition-colors'

const labelClass =
  'block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2'

export function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [sent, setSent] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', phone: '', message: '' })
    window.setTimeout(() => setSent(false), 6000)
  }

  return (
    <section
      id="contacto"
      className="relative border-t border-brand-border bg-brand-card/20 py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-bold tracking-widest text-brand-orange uppercase">
              Hablemos de tu Proyecto
            </span>
            <h2 className="mt-3 mb-6 font-heading text-3xl font-bold tracking-tight sm:text-5xl">
              ¿Listo para escalar tu negocio digital?
            </h2>
            <p className="mb-8 text-base leading-relaxed text-brand-light-text">
              Cuéntanos tu idea o requerimiento técnico. Te responderemos en
              menos de 24 horas con una propuesta clara y sin compromiso.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-orange/30 bg-brand-orange/10 text-xl text-brand-orange shadow-glow">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <div className="text-xs tracking-wider text-brand-light-text uppercase">
                    Correo Electrónico
                  </div>
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-heading font-bold text-white transition-colors hover:text-brand-orange"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-orange/30 bg-brand-orange/10 text-xl text-brand-orange shadow-glow">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div>
                  <div className="text-xs tracking-wider text-brand-light-text uppercase">
                    Teléfono / WhatsApp
                  </div>
                  <a
                    href={contact.phoneHref}
                    className="font-heading font-bold text-white transition-colors hover:text-brand-orange"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-orange/30 bg-brand-orange/10 text-xl text-brand-orange shadow-glow">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div>
                  <div className="text-xs tracking-wider text-brand-light-text uppercase">
                    Ubicación
                  </div>
                  <div className="font-heading font-bold text-white">
                    {contact.location}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              {socials.map((social) => (
              // TODO: reemplazar href="#" por la URL real de cada red en src/data/contact.ts
              <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card flex h-10 w-10 items-center justify-center rounded-lg text-gray-300 transition-all hover:border-brand-orange hover:text-brand-orange"
                >
                  <i className={social.icon} aria-hidden="true"></i>
                </a>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-3xl border border-brand-border p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={labelClass}>Nombre Completo *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ej: Carlos Mendoza"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Correo Corporativo *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="carlos@empresa.com"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Teléfono / WhatsApp</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+51 900 000 000"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Detalles del Proyecto *</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Describe brevemente tus requerimientos o idea de software..."
                  className={`${inputClass} resize-none`}
                ></textarea>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange-deep py-4 font-bold text-white shadow-magma transition-all hover:bg-brand-orange-deep-hover"
              >
                <span>Enviar Solicitud</span>{' '}
                <i className="fa-solid fa-paper-plane text-xs"></i>
              </button>
            </form>

            {sent && (
              <div className="mt-4 rounded-xl border border-green-500/40 bg-green-500/20 p-4 text-center text-sm font-semibold text-green-400">
                ¡Mensaje enviado con éxito! Un especialista de VOLKANEXT se
                pondrá en contacto en breve.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
