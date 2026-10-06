import { useEffect, useRef, useState, type FormEvent } from 'react'
import {
  presupuestoOptions,
  projectTypeOptions,
  puntoPartidaOptions,
  urgenciaOptions,
} from '@/data/calculator'
import { NOT_SURE_EXTRA, useConfigurator } from './useConfigurator'
import { submitForm } from '@/lib/web3forms'

const configEndpoint = import.meta.env.VITE_CONFIG_ENDPOINT
const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

const steps = [
  'Tipo de proyecto',
  'Funcionalidades',
  'Punto de partida',
  'Presupuesto y urgencia',
  'Datos de contacto',
]

const inputClass =
  'w-full bg-brand-dark/80 border border-brand-border rounded-xl px-4 py-3 text-sm text-white transition-colors focus:border-brand-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange'

const labelClass =
  'block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2'

const focusRingClass =
  'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-orange'

/** Estilos para envolver un grupo de radios en <fieldset> sin alterar el diseño. */
const groupClass = 'm-0 min-w-0 border-0 p-0'
const srOnly = 'sr-only'

export function Calculator() {
  const {
    step,
    nextStep,
    prevStep,
    reset,
    projectType,
    selectProjectType,
    catalog,
    extras,
    toggleExtra,
    notSure,
    toggleNotSure,
    tipoTitle,
    puntoPartida,
    setPuntoPartida,
    presupuesto,
    setPresupuesto,
    urgencia,
    setUrgencia,
    contacto,
    updateContact,
    isStepValid,
  } = useConfigurator()

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  )
  const [errorMsg, setErrorMsg] = useState('')

  const successRef = useRef<HTMLDivElement>(null)
  const stepHeadingRef = useRef<HTMLHeadingElement>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (status === 'sent') {
      successRef.current?.focus({ preventScroll: true })
      if (!successRef.current) return
      // preventScroll evita el salto de página, pero hay que asegurar que el
      // elemento sea visible (caso borde: usuario envió el formulario scrolleado
      // hacia arriba). Un scrollIntoView suave no molesta y mejora la UX.
      successRef.current.scrollIntoView({
        behavior:
          typeof window !== 'undefined' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth',
        block: 'center',
      })
    } else {
      stepHeadingRef.current?.focus({ preventScroll: true })
    }

    return () => {
      isFirstRender.current = true
    }
  }, [status, step])

  const puntoTitle = (() => {
    if (!puntoPartida) return null
    return (
      puntoPartidaOptions.find((o) => o.value === puntoPartida)?.title ?? null
    )
  })()

  const presupuestoLabel = (() => {
    if (!presupuesto) return null
    return (
      presupuestoOptions.find((o) => o.value === presupuesto)?.label ?? null
    )
  })()

  const urgenciaTitle = (() => {
    if (!urgencia) return null
    return urgenciaOptions.find((o) => o.value === urgencia)?.title ?? null
  })()

  const summaryChips = [
    tipoTitle,
    ...(notSure ? [NOT_SURE_EXTRA] : extras),
    puntoTitle,
    presupuestoLabel,
    urgenciaTitle,
  ].filter((chip): chip is string => Boolean(chip))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!isStepValid || status === 'sending') return
    setErrorMsg('')

    const payload = {
      tipo: tipoTitle,
      tipo_id: projectType,
      incluidas: catalog?.incluidas ?? [],
      extras: notSure ? [NOT_SURE_EXTRA] : extras,
      punto_partida: puntoTitle,
      presupuesto: presupuestoLabel,
      urgencia: urgenciaTitle,
      nombre: contacto.nombre,
      email: contacto.email,
      whatsapp: contacto.whatsapp,
      mensaje: contacto.mensaje,
      origen: 'configurador_web',
      fecha: new Date().toISOString(),
      from_name: contacto.nombre,
      subject: 'Nueva solicitud de propuesta — Configurador de proyecto',
    }

    if (!configEndpoint || !web3FormsAccessKey) {
      if (import.meta.env.DEV) {
        setStatus('sending')
        await new Promise((r) => setTimeout(r, 900))
        setStatus('sent')
        return
      }
      setStatus('error')
      setErrorMsg(
        'No pudimos configurar el envío de solicitudes. Inténtalo de nuevo o escríbenos directamente por WhatsApp.',
      )
      return
    }

    setStatus('sending')
    // El envío vive en submitForm() y lo comparten el formulario de contacto y
    // el boletín del footer: los tres formularios usan el mismo endpoint y
    // deben informar el fallo de la misma manera.
    const result = await submitForm(payload)
    setStatus(result)
    if (result === 'error') {
      setErrorMsg(
        'No se pudo enviar tu solicitud en este momento. Revisa tu conexión e inténtalo de nuevo: tus datos siguen guardados.',
      )
    }
  }

  return (
    <section
      id="calculadora"
      aria-labelledby="calculadora-heading"
      className="relative overflow-hidden py-24"
    >
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/10 blur-[160px]"></div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="rounded-full border border-brand-orange/40 bg-brand-orange/10 px-3 py-1 text-xs font-semibold tracking-wider text-brand-orange uppercase">
            Configurador de proyecto
          </span>
          <h2
            id="calculadora-heading"
            className="mt-4 mb-3 font-heading text-3xl font-bold tracking-tight sm:text-5xl"
          >
            Cuéntanos tu idea. Nosotros la ponemos en números.
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-brand-light-text sm:text-base">
            Selecciona las opciones que se ajustan a tu proyecto. Uno de
            nuestros desarrolladores lo revisará personalmente y te responderá
            en menos de 24 horas.
          </p>
        </div>

        <div className="glass-card rounded-3xl border border-brand-orange/30 p-6 shadow-magma-lg sm:p-10">
          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between text-xs font-semibold tracking-wider uppercase">
              <span className="text-white">Paso {step} de 5</span>
              <span className="text-gray-400">{steps[step - 1]}</span>
            </div>
            {/* role="progressbar" + aria-valuetext: el texto solo cambia el
                porcentaje, no dice qué paso es. Un lector de pantalla oye
                "50%" en lugar de "Paso 3 de 5: Punto de partida". */}
            <div
              role="progressbar"
              aria-label="Avance del configurador"
              aria-valuemin={1}
              aria-valuemax={steps.length}
              aria-valuenow={step}
              aria-valuetext={`Paso ${step} de ${steps.length}: ${steps[step - 1]}`}
              className="flex gap-2"
            >
              {steps.map((_, index) => (
                <div
                  key={index}
                  aria-hidden="true"
                  className={`h-1.5 flex-1 rounded-full transition-colors duration-300 motion-reduce:transition-none ${
                    index < step ? 'bg-brand-orange' : 'bg-white/10'
                  }`}
                ></div>
              ))}
            </div>
            {/* Región viva persistente: anuncia el cambio de paso sin robar foco. */}
            <p className={srOnly} role="status" aria-live="polite">
              Paso {step} de {steps.length}: {steps[step - 1]}
            </p>
          </div>

          {status === 'sent' ? (
            <div
              ref={successRef}
              tabIndex={-1}
              role="status"
              className="py-10 text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-green-500/40 bg-green-500/20 text-3xl text-green-400">
                <i className="fa-solid fa-check" aria-hidden="true"></i>
              </div>
              <h3 className="mb-3 font-heading text-2xl font-bold text-white">
                ¡Recibido, {contacto.nombre}!
              </h3>
              <p className="mx-auto max-w-md text-sm text-brand-light-text">
                Te enviaremos tu propuesta a{' '}
                <span className="font-semibold text-white">
                  {contacto.email}
                </span>{' '}
                en menos de 24 horas.
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-8 rounded-xl border border-brand-border px-5 py-3 text-xs font-semibold text-gray-300 transition-all hover:bg-white/5 hover:text-white motion-reduce:transition-none"
              >
                <i
                  className="fa-solid fa-rotate-left mr-2"
                  aria-hidden="true"
                ></i>
                Realizar otra configuración
              </button>
            </div>
          ) : (
            <>
              {step === 1 && (
                <div>
                  <h3
                    ref={stepHeadingRef}
                    tabIndex={-1}
                    className="mb-4 font-heading text-lg font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
                  >
                    ¿Qué tipo de solución digital deseas construir?
                  </h3>
                  <fieldset className={groupClass}>
                    <legend className={srOnly}>Tipo de solución digital</legend>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {projectTypeOptions.map((option) => (
                        <label
                          key={option.type}
                          className={`glass-card group flex cursor-pointer flex-col items-center rounded-xl border p-5 text-center transition-all motion-reduce:transition-none ${focusRingClass} ${
                            projectType === option.type
                              ? 'border-brand-orange'
                              : 'border-brand-border hover:border-brand-orange'
                          }`}
                        >
                          <input
                            type="radio"
                            name="project_type"
                            value={option.type}
                            className="sr-only"
                            checked={projectType === option.type}
                            onChange={() => selectProjectType(option.type)}
                          />
                          <i
                            aria-hidden="true"
                            className={`${option.icon} mb-3 text-3xl text-brand-orange transition-transform group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100`}
                          ></i>
                          <span className="font-heading text-sm font-bold text-white">
                            {option.title}
                          </span>
                          <span className="mt-1 text-xs text-brand-light-text">
                            {option.desc}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>
              )}

              {step === 2 && projectType && catalog && (
                <div>
                  <h3
                    ref={stepHeadingRef}
                    tabIndex={-1}
                    className="mb-2 font-heading text-lg font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
                  >
                    Configura tu proyecto: {tipoTitle}
                  </h3>
                  {catalog.nota && (
                    <div className="mb-6 flex items-start gap-3 rounded-xl border border-brand-orange/30 bg-brand-orange/10 p-4 text-sm text-brand-light-text">
                      <i
                        aria-hidden="true"
                        className="fa-solid fa-circle-info mt-0.5 text-brand-orange"
                      ></i>
                      <span>{catalog.nota}</span>
                    </div>
                  )}

                  <div className="mb-8">
                    <div className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                      Ya incluido en este tipo de proyecto
                    </div>
                    <ul className="flex flex-wrap gap-2">
                      {catalog.incluidas.map((feature) => (
                        <li
                          key={feature}
                          className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-400"
                        >
                          <i
                            aria-hidden="true"
                            className="fa-solid fa-check text-xs"
                          ></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div
                      id="extras-label"
                      className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase"
                    >
                      Extras opcionales (elige los que quieras)
                    </div>
                    <div
                      role="group"
                      aria-labelledby="extras-label"
                      className="flex flex-wrap gap-2"
                    >
                      {catalog.extras.map((extra) => {
                        const active = extras.includes(extra)
                        return (
                          <button
                            key={extra}
                            type="button"
                            aria-pressed={active}
                            onClick={() => toggleExtra(extra)}
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-200 motion-reduce:transition-none ${
                              active
                                ? 'border-brand-orange bg-brand-orange/20 text-white'
                                : 'border-brand-border bg-white/5 text-gray-300 hover:border-brand-orange hover:text-white'
                            }`}
                          >
                            {active ? (
                              <i
                                aria-hidden="true"
                                className="fa-solid fa-check text-xs text-brand-orange"
                              ></i>
                            ) : (
                              <i
                                aria-hidden="true"
                                className="fa-solid fa-plus text-xs"
                              ></i>
                            )}
                            {extra}
                          </button>
                        )
                      })}
                      <button
                        type="button"
                        aria-pressed={notSure}
                        onClick={toggleNotSure}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-200 motion-reduce:transition-none ${
                          notSure
                            ? 'border-brand-orange bg-brand-orange/20 text-white'
                            : 'border-brand-border bg-white/5 text-gray-300 hover:border-brand-orange hover:text-white'
                        }`}
                      >
                        {notSure ? (
                          <i
                            aria-hidden="true"
                            className="fa-solid fa-check text-xs text-brand-orange"
                          ></i>
                        ) : (
                          <i
                            aria-hidden="true"
                            className="fa-solid fa-plus text-xs"
                          ></i>
                        )}
                        {NOT_SURE_EXTRA}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3
                    ref={stepHeadingRef}
                    tabIndex={-1}
                    className="mb-4 font-heading text-lg font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
                  >
                    ¿En qué punto está tu proyecto hoy?
                  </h3>
                  <fieldset className={groupClass}>
                    <legend className={srOnly}>
                      Punto de partida del proyecto
                    </legend>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {puntoPartidaOptions.map((option) => (
                        <label
                          key={option.value}
                          className={`glass-card group flex cursor-pointer flex-col items-center rounded-xl border p-5 text-center transition-all motion-reduce:transition-none ${focusRingClass} ${
                            puntoPartida === option.value
                              ? 'border-brand-orange'
                              : 'border-brand-border hover:border-brand-orange'
                          }`}
                        >
                          <input
                            type="radio"
                            name="punto_partida"
                            value={option.value}
                            className="sr-only"
                            checked={puntoPartida === option.value}
                            onChange={() => setPuntoPartida(option.value)}
                          />
                          <i
                            aria-hidden="true"
                            className={`${option.icon} mb-3 text-2xl text-brand-orange`}
                          ></i>
                          <span className="font-heading text-sm font-bold text-white">
                            {option.title}
                          </span>
                          <span className="mt-1 text-xs text-brand-light-text">
                            {option.desc}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h3
                    ref={stepHeadingRef}
                    tabIndex={-1}
                    className="mb-2 font-heading text-lg font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
                  >
                    Presupuesto y urgencia
                  </h3>
                  <p className="mb-6 text-sm text-brand-light-text">
                    Ambas opciones son necesarias para dimensionar tu proyecto.
                  </p>

                  <div className="mb-8">
                    <div
                      id="presupuesto-label"
                      className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase"
                    >
                      Presupuesto (S/.)
                    </div>
                    <fieldset className={groupClass}>
                      <legend className={srOnly}>
                        Presupuesto estimado en soles
                      </legend>
                      <div
                        role="radiogroup"
                        aria-labelledby="presupuesto-label"
                        className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5"
                      >
                        {presupuestoOptions.map((option) => (
                          <label
                            key={option.value}
                            className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-3.5 text-center text-sm font-semibold transition-all motion-reduce:transition-none ${focusRingClass} ${
                              presupuesto === option.value
                                ? 'border-brand-orange bg-brand-orange/20 text-white'
                                : 'border-brand-border bg-white/5 text-gray-300 hover:border-brand-orange hover:text-white'
                            }`}
                          >
                            <input
                              type="radio"
                              name="presupuesto"
                              value={option.value}
                              className="sr-only"
                              checked={presupuesto === option.value}
                              onChange={() => setPresupuesto(option.value)}
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </div>

                  <div>
                    <div
                      id="urgencia-label"
                      className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase"
                    >
                      Urgencia
                    </div>
                    <fieldset className={groupClass}>
                      <legend className={srOnly}>
                        Nivel de urgencia del proyecto
                      </legend>
                      <div
                        role="radiogroup"
                        aria-labelledby="urgencia-label"
                        className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4"
                      >
                        {urgenciaOptions.map((option) => (
                          <label
                            key={option.value}
                            className={`cursor-pointer rounded-xl border p-4 transition-all motion-reduce:transition-none ${focusRingClass} ${
                              urgencia === option.value
                                ? 'border-brand-orange bg-brand-orange/20'
                                : 'border-brand-border bg-white/5 hover:border-brand-orange'
                            }`}
                          >
                            <input
                              type="radio"
                              name="urgencia"
                              value={option.value}
                              className="sr-only"
                              checked={urgencia === option.value}
                              onChange={() => setUrgencia(option.value)}
                            />
                            <div className="flex items-center gap-2">
                              <i
                                aria-hidden="true"
                                className={`${option.icon} text-brand-orange`}
                              ></i>
                              <span className="text-sm font-bold text-white">
                                {option.title}
                              </span>
                            </div>
                            <div className="mt-1 text-xs text-brand-light-text">
                              {option.desc}
                            </div>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                </div>
              )}

              {step === 5 && (
                <form
                  id="config-form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <h3
                    ref={stepHeadingRef}
                    tabIndex={-1}
                    className="font-heading text-lg font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
                  >
                    ¿Dónde te enviamos tu propuesta?
                  </h3>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cf-nombre" className={labelClass}>
                        Nombre *
                      </label>
                      <input
                        id="cf-nombre"
                        type="text"
                        name="nombre"
                        autoComplete="name"
                        required
                        value={contacto.nombre}
                        onChange={(e) =>
                          updateContact('nombre', e.target.value)
                        }
                        placeholder="Ej: María López"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="cf-email" className={labelClass}>
                        Email *
                      </label>
                      <input
                        id="cf-email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                        value={contacto.email}
                        onChange={(e) => updateContact('email', e.target.value)}
                        placeholder="maria@empresa.com"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="cf-whatsapp" className={labelClass}>
                      WhatsApp (opcional)
                    </label>
                    <input
                      id="cf-whatsapp"
                      type="tel"
                      name="whatsapp"
                      autoComplete="tel"
                      value={contacto.whatsapp}
                      onChange={(e) =>
                        updateContact('whatsapp', e.target.value)
                      }
                      placeholder="+51 900 000 000"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="cf-mensaje" className={labelClass}>
                      Mensaje (opcional)
                    </label>
                    <textarea
                      id="cf-mensaje"
                      name="mensaje"
                      rows={4}
                      value={contacto.mensaje}
                      onChange={(e) => updateContact('mensaje', e.target.value)}
                      placeholder="Cuéntanos cualquier detalle extra de tu proyecto..."
                      className={`${inputClass} resize-none`}
                    ></textarea>
                  </div>
                </form>
              )}

              {status === 'error' && errorMsg && (
                <div
                  role="alert"
                  className="mt-6 flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300"
                >
                  <i
                    aria-hidden="true"
                    className="fa-solid fa-triangle-exclamation mt-0.5"
                  ></i>
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="mt-8 border-t border-white/10 pt-6">
                <div className="mb-3 text-xs font-semibold tracking-wider text-brand-light-text uppercase">
                  Tu proyecto:
                </div>
                {summaryChips.length > 0 ? (
                  <ul className="flex flex-wrap gap-2">
                    {summaryChips.map((chip) => (
                      <li
                        key={chip}
                        className="inline-flex items-center gap-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-3 py-1.5 text-xs font-medium text-white"
                      >
                        <i
                          aria-hidden="true"
                          className="fa-solid fa-circle-check text-xs text-brand-orange"
                        ></i>
                        {chip}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400">
                    Aquí verás tu selección.
                  </p>
                )}
              </div>

              <div className="mt-6 flex w-full flex-col-reverse items-center gap-3 sm:flex-row sm:justify-between">
                <div>
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="rounded-xl border border-brand-border px-5 py-3 text-xs font-semibold text-gray-300 transition-all hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange motion-reduce:transition-none"
                    >
                      <i
                        aria-hidden="true"
                        className="fa-solid fa-arrow-left mr-2"
                      ></i>
                      Atrás
                    </button>
                  )}
                </div>
                {step < 5 ? (
                  <div className="flex w-full flex-col items-center sm:w-auto sm:flex-initial">
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!isStepValid}
                      aria-describedby={!isStepValid ? 'step-hint' : undefined}
                      className="w-full rounded-xl bg-brand-orange-deep px-6 py-3 text-xs font-bold text-white shadow-magma transition-all hover:bg-brand-orange-deep-hover disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none sm:w-auto"
                    >
                      Siguiente{' '}
                      <i
                        aria-hidden="true"
                        className="fa-solid fa-arrow-right ml-2"
                      ></i>
                    </button>
                    {!isStepValid && (
                      <p
                        id="step-hint"
                        className="mt-2 text-center text-xs text-gray-400"
                      >
                        {step === 1
                          ? 'Elige un tipo de proyecto para continuar.'
                          : 'Revisa las opciones obligatorias para continuar.'}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="flex w-full flex-col items-center sm:w-auto sm:flex-initial">
                    <button
                      type="submit"
                      form="config-form"
                      disabled={!isStepValid || status === 'sending'}
                      aria-describedby={
                        !isStepValid ? 'submit-hint' : undefined
                      }
                      className="w-full rounded-xl bg-brand-orange-deep px-6 py-3 text-xs font-bold text-white shadow-magma transition-all hover:bg-brand-orange-deep-hover disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none sm:w-auto"
                    >
                      {status === 'sending' ? (
                        <>
                          <i
                            aria-hidden="true"
                            className="fa-solid fa-circle-notch mr-2 animate-spin motion-reduce:animate-none"
                          ></i>
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar a los desarrolladores{' '}
                          <i
                            aria-hidden="true"
                            className="fa-solid fa-paper-plane ml-2"
                          ></i>
                        </>
                      )}
                    </button>
                    {!isStepValid && (
                      <p
                        id="submit-hint"
                        className="mt-2 text-center text-xs text-gray-400"
                      >
                        Completa tu nombre y email para enviar la solicitud.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Sin compromiso. Respuesta de personas reales.
        </p>
      </div>
    </section>
  )
}
