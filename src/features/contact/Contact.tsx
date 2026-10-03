import { useState, type FormEvent } from 'react'
import { contact, socials } from '@/data/contact'
import {
  NO_ENDPOINT_MESSAGE,
  submitForm,
  type SubmitState,
} from '@/lib/web3forms'

const inputClass =
  'w-full bg-brand-dark/80 border border-brand-border rounded-xl px-4 py-3 text-sm text-white transition-colors focus:border-brand-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange'

const labelClass =
  'block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2'

export function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [status, setStatus] = useState<SubmitState>('idle')
  const sending = status === 'sending'

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    // Cualquier edición después de un error permite reintentar sin recargar.
    if (status === 'error') setStatus('idle')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (sending) return
    setStatus('sending')

    const next = await submitForm({
      nombre: form.name,
      email: form.email,
      telefono: form.phone,
      mensaje: form.message,
      origen: 'formulario_contacto',
      fecha: new Date().toISOString(),
      from_name: form.name,
      subject: 'Nuevo mensaje desde el formulario de contacto',
    })

    setStatus(next)
    // Solo se borra lo que el visitante escribió si hubo un envío confirmado:
    // ante un fallo, vaciar el formulario le hace perder el mensaje completo.
    if (next === 'sent') setForm({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <section
      id="contacto"
      aria-labelledby="contacto-heading"
      className="relative border-t border-brand-border bg-brand-card/20 py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-bold tracking-widest text-brand-orange uppercase">
              Hablemos de tu Proyecto
            </span>
            <h2
              id="contacto-heading"
              className="mt-3 mb-6 font-heading text-3xl font-bold tracking-tight sm:text-5xl"
            >
              ¿Listo para escalar tu negocio digital?
            </h2>
            <p className="mb-8 text-base leading-relaxed text-brand-light-text">
              Cuéntanos tu idea o requerimiento técnico. Te responderemos en
              menos de 24 horas con una propuesta clara y sin compromiso.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-orange/30 bg-brand-orange/10 text-xl text-brand-orange shadow-glow">
                  <i aria-hidden="true" className="fa-solid fa-envelope"></i>
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
                  <i aria-hidden="true" className="fa-solid fa-phone"></i>
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
                  <i aria-hidden="true" className="fa-solid fa-location-dot"></i>
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
                <label htmlFor="contact-name" className={labelClass}>
                  Nombre Completo *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ej: Carlos Mendoza"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-email" className={labelClass}>
                    Correo Corporativo *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="carlos@empresa.com"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className={labelClass}>
                    Teléfono / WhatsApp
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+51 900 000 000"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className={labelClass}>
                  Detalles del Proyecto *
                </label>
                <textarea
                  id="contact-message"
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
                disabled={sending}
                aria-disabled={sending}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange-deep py-4 font-bold text-white shadow-magma transition-all hover:bg-brand-orange-deep-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span>{sending ? 'Enviando...' : 'Enviar Solicitud'}</span>{' '}
                <i
                  aria-hidden="true"
                  className={`fa-solid ${sending ? 'fa-spinner fa-spin' : 'fa-paper-plane'} text-xs`}
                ></i>
              </button>
            </form>

            {/*
              role="status" + aria-live: este bloque aparece por concatenación
              después de enviar. Sin una región viva, un usuario de lector de
              pantalla no se entera de que el envío funcionó.

              El error va en role="alert" y no en la región anterior a propósito:
              un fallo necesita anunciarse de inmediato porque la acción del
              visitante no se completó. Con los dos en la misma región polite, un
              lector de pantalla esperaría a que el resto de la página terminara
              de leerse antes de enterarse de que su mensaje no se envió.
            */}
            <div role="status" aria-live="polite">
              {status === 'sent' && (
                <div className="mt-4 rounded-xl border border-green-500/40 bg-green-500/20 p-4 text-center text-sm font-semibold text-green-400">
                  ¡Mensaje enviado con éxito! Un especialista de VOLKANEXT se
                  pondrá en contacto en breve.
                </div>
              )}
            </div>
            <div role="alert">
              {status === 'error' && (
                <div className="mt-4 rounded-xl border border-red-500/40 bg-red-500/20 p-4 text-center text-sm font-semibold text-red-400">
                  {NO_ENDPOINT_MESSAGE}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
