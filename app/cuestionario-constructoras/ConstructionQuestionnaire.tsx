'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { Building2, CheckCircle2, Loader2, Mail, MessageCircle } from 'lucide-react'
import { useLanguage } from '~/lib/i18n'
import { INTRO_EN, INTRO_ES, SECTIONS, THANKS_EN, THANKS_ES, buildSummary, type Answers, type Field } from './questions'

// El cuestionario se guarda en PVenta por RNC. Para volver a abrir unas respuestas ya enviadas
// no basta el RNC (es público): hace falta la clave de edición que devuelve el primer envío.
// La guardamos en este navegador y PVenta la manda también por correo como enlace
// (?rnc=…&t=…), para seguir desde otro equipo. Lo que se va escribiendo se guarda solo en
// este navegador (borrador) hasta que se pulsa Enviar.

const STORE = 'xoultec-cuestionario-constructoras'
const tokenKey = (rnc: string) => `${STORE}:token:${rnc}`
const draftKey = (rnc: string) => `${STORE}:draft:${rnc}`
const LAST_RNC_KEY = `${STORE}:last-rnc`

const WA_URL = 'https://wa.me/18092524007'
const WA_URL_US = 'https://wa.me/19134136583'
const SALES_EMAIL = 'sales@xoultec.com'

const inputCls =
  'w-full px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white focus:border-secondary focus:outline-none'

type Contact = { name: string; email: string; phone: string }
type Draft = { company: string; contact: Contact; answers: Answers }
type Step = 'rnc' | 'form' | 'done'

function readStore(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}
function writeStore(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key)
    else localStorage.setItem(key, value)
  } catch {
    // Navegador sin almacenamiento (modo privado): se sigue sin borrador.
  }
}

async function call(action: string, payload: Record<string, unknown>) {
  try {
    const res = await fetch('/api/cuestionario-constructoras', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, ...payload }),
    })
    const data = await res.json().catch(() => ({}))
    return { status: res.status, data }
  } catch {
    return { status: 0, data: {} }
  }
}

const cleanRnc = (s: string) => s.replace(/\D/g, '')

export function ConstructionQuestionnaire() {
  const { t, lang, toggleLanguage } = useLanguage()

  const [step, setStep] = useState<Step>('rnc')
  const [rncInput, setRncInput] = useState('')
  const [rnc, setRnc] = useState('')
  const [company, setCompany] = useState('')
  const [companyLocked, setCompanyLocked] = useState(false)
  const [contact, setContact] = useState<Contact>({ name: '', email: '', phone: '' })
  const [answers, setAnswers] = useState<Answers>({})
  const [token, setToken] = useState('')
  const [updatedAt, setUpdatedAt] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [conflict, setConflict] = useState(false)
  const [created, setCreated] = useState(false)

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search)
    const qp = qs.get('lang')
    if (qp === 'en' && lang === 'es') toggleLanguage()
    if (qp === 'es' && lang === 'en') toggleLanguage()

    // Enlace del correo: ?rnc=…&t=… — guarda la clave y abre directamente.
    const linkRnc = cleanRnc(qs.get('rnc') ?? '')
    const linkToken = qs.get('t') ?? ''
    if (linkRnc && linkToken) {
      writeStore(tokenKey(linkRnc), linkToken)
      window.history.replaceState(null, '', window.location.pathname)
      setRncInput(linkRnc)
      void start(linkRnc)
      return
    }
    const last = readStore(LAST_RNC_KEY)
    if (last) setRncInput(last)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Borrador local mientras escriben: si se cierra la pestaña no se pierde nada.
  useEffect(() => {
    if (step !== 'form' || !rnc) return
    const draft: Draft = { company, contact, answers }
    writeStore(draftKey(rnc), JSON.stringify(draft))
  }, [step, rnc, company, contact, answers])

  async function start(value: string) {
    const r = cleanRnc(value)
    setError('')
    setInfo('')
    setConflict(false)
    if (r.length !== 9 && r.length !== 11) {
      setError(t('El RNC debe tener 9 dígitos (o 11 si es una cédula).', 'The RNC must have 9 digits (or 11 for a cédula).'))
      return
    }
    setBusy(true)

    const lookup = await call('lookup', { rnc: r })
    let name = ''
    let locked = false
    if (lookup.status === 200 && lookup.data?.nombre) {
      name = String(lookup.data.nombre)
      locked = true
    } else if (lookup.status === 404) {
      setBusy(false)
      setError(t('La DGII no tiene registrado ese RNC. Revise el número.', 'DGII has no record of that RNC. Please check the number.'))
      return
    } else if (lookup.status === 400) {
      setBusy(false)
      setError(t('El RNC debe tener 9 dígitos (o 11 si es una cédula).', 'The RNC must have 9 digits (or 11 for a cédula).'))
      return
    } else if (lookup.status === 429) {
      setBusy(false)
      setError(t('Demasiados intentos. Espere un minuto y vuelva a intentarlo.', 'Too many attempts. Wait a minute and try again.'))
      return
    }
    // Si la DGII no contesta (503) se sigue: el nombre se escribe a mano.

    let nextCompany = name
    let nextContact: Contact = { name: '', email: '', phone: '' }
    let nextAnswers: Answers = {}
    let nextToken = ''
    let nextUpdated = ''

    const saved = readStore(tokenKey(r))
    if (saved) {
      const loaded = await call('load', { rnc: r, token: saved })
      if (loaded.status === 200) {
        const d = loaded.data
        nextToken = saved
        nextCompany = name || String(d.companyName ?? '')
        nextContact = { name: d.contactName ?? '', email: d.contactEmail ?? '', phone: d.contactPhone ?? '' }
        nextAnswers = d.answers && typeof d.answers === 'object' ? d.answers : {}
        nextUpdated = String(d.updatedAt ?? '')
      } else if (loaded.status === 403) {
        writeStore(tokenKey(r), null) // clave vieja (se pidió un enlace nuevo)
      }
    }

    // Lo escrito aquí y no enviado todavía gana sobre lo guardado.
    const draftRaw = readStore(draftKey(r))
    if (draftRaw) {
      try {
        const d = JSON.parse(draftRaw) as Draft
        if (!locked && d.company) nextCompany = d.company
        if (d.contact) nextContact = { ...nextContact, ...d.contact }
        if (d.answers) nextAnswers = { ...nextAnswers, ...d.answers }
      } catch {
        writeStore(draftKey(r), null)
      }
    }

    writeStore(LAST_RNC_KEY, r)
    setRnc(r)
    setCompany(nextCompany)
    setCompanyLocked(locked)
    setContact(nextContact)
    setAnswers(nextAnswers)
    setToken(nextToken)
    setUpdatedAt(nextUpdated)
    setBusy(false)
    setStep('form')
    window.scrollTo({ top: 0 })
  }

  async function submit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setInfo('')
    setConflict(false)
    if (!company.trim() || !contact.name.trim() || !contact.email.includes('@')) {
      setError(t('Complete el nombre de la empresa, la persona de contacto y su correo.', 'Fill in the company name, the contact person and their email.'))
      return
    }
    setBusy(true)
    const res = await call('save', {
      rnc,
      token,
      companyName: company.trim(),
      contactName: contact.name.trim(),
      contactEmail: contact.email.trim(),
      contactPhone: contact.phone.trim(),
      answers,
      lang,
      summary: buildSummary(answers),
    })
    setBusy(false)
    if (res.status === 200 || res.status === 201) {
      const newToken = String(res.data?.token ?? token)
      if (newToken) writeStore(tokenKey(rnc), newToken)
      writeStore(draftKey(rnc), null)
      setToken(newToken)
      setUpdatedAt(String(res.data?.updatedAt ?? ''))
      setCreated(res.status === 201)
      setStep('done')
      window.scrollTo({ top: 0 })
      return
    }
    if (res.status === 409) {
      setConflict(true)
      return
    }
    if (res.status === 429) {
      setError(t('Demasiados intentos. Espere un minuto y vuelva a intentarlo.', 'Too many attempts. Wait a minute and try again.'))
      return
    }
    if (res.status === 400) {
      setError(t('Revise los datos de contacto: el correo no parece válido.', 'Check the contact details: the email does not look valid.'))
      return
    }
    setError(
      t(
        'No pudimos guardar sus respuestas. Sus respuestas siguen en este navegador; intente de nuevo en unos minutos.',
        'We could not save your answers. They are still in this browser; please try again in a few minutes.',
      ),
    )
  }

  async function resend() {
    setBusy(true)
    await call('resend', { rnc, lang })
    setBusy(false)
    setConflict(false)
    setInfo(
      t(
        'Si este RNC ya tiene un cuestionario, enviamos un enlace para editarlo al correo del contacto que lo llenó. Revise su bandeja (y la carpeta de spam).',
        'If this RNC already has a questionnaire, we sent a link to edit it to the email of the contact who filled it in. Check your inbox (and spam folder).',
      ),
    )
  }

  const setAnswer = (key: string, value: string | string[]) => setAnswers((prev) => ({ ...prev, [key]: value }))

  function renderField(f: Field, qn: number) {
    const id = `f-${f.key}`
    const label = f.es ? <span className="text-sm text-gray-700 font-medium">{t(f.es, f.en ?? f.es)}</span> : null

    if (f.type === 'radio') {
      const current = answers[f.key]
      return (
        <div key={f.key} className="space-y-2">
          {label}
          <div role="radiogroup" aria-label={f.es ? t(f.es, f.en ?? f.es) : `${qn}`} className="flex flex-wrap gap-2">
            {f.options.map((o) => {
              const on = current === o.value
              return (
                <label
                  key={o.value}
                  className={`cursor-pointer select-none rounded-lg border px-3 py-2 text-sm transition ${
                    on ? 'border-secondary bg-secondary/10 text-dark font-semibold' : 'border-gray-300 bg-white text-gray-700 hover:border-secondary'
                  }`}
                >
                  <input
                    type="radio"
                    name={id}
                    value={o.value}
                    checked={on}
                    onChange={() => setAnswer(f.key, o.value)}
                    onClick={() => on && setAnswer(f.key, '')}
                    className="sr-only"
                  />
                  {t(o.es, o.en)}
                </label>
              )
            })}
          </div>
        </div>
      )
    }

    if (f.type === 'checkbox') {
      const picked = Array.isArray(answers[f.key]) ? (answers[f.key] as string[]) : []
      const toggle = (v: string) =>
        setAnswer(f.key, picked.includes(v) ? picked.filter((x) => x !== v) : [...picked, v])
      return (
        <div key={f.key} className="space-y-2">
          {label}
          {f.options.map((o) => (
            <div key={o.value} className="flex flex-wrap items-center gap-2">
              <label className="flex items-start gap-2 cursor-pointer text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={picked.includes(o.value)}
                  onChange={() => toggle(o.value)}
                  className="mt-0.5 h-4 w-4 accent-[#f59e0b]"
                />
                <span>{t(o.es, o.en)}</span>
              </label>
              {o.value === 'otro' && f.otherKey && picked.includes('otro') && (
                <input
                  type="text"
                  value={String(answers[f.otherKey] ?? '')}
                  onChange={(e) => setAnswer(f.otherKey!, e.target.value)}
                  aria-label={t('Otro tipo de obra', 'Other project type')}
                  className={`${inputCls} sm:max-w-xs`}
                />
              )}
            </div>
          ))}
        </div>
      )
    }

    const value = typeof answers[f.key] === 'string' ? (answers[f.key] as string) : ''
    if (f.type === 'textarea') {
      return (
        <div key={f.key}>
          {label}
          <textarea id={id} rows={3} value={value} onChange={(e) => setAnswer(f.key, e.target.value)} className={inputCls} />
        </div>
      )
    }
    return (
      <label key={f.key} htmlFor={id} className={f.es ? 'flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3' : 'block'}>
        {f.es && <span className="text-sm text-gray-700 font-medium sm:w-44 shrink-0">{t(f.es, f.en ?? f.es)}</span>}
        <input id={id} type="text" value={value} onChange={(e) => setAnswer(f.key, e.target.value)} className={inputCls} />
      </label>
    )
  }

  const contactBlock = (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 text-sm text-gray-700 space-y-2">
      <p className="font-bold text-dark">XoulTec</p>
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <MessageCircle className="w-4 h-4 text-emerald-600" aria-hidden="true" />
        WhatsApp{' '}
        <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-2 hover:text-secondary">
          809-252-4007
        </a>{' '}
        {t('(RD) y', '(DR) and')}{' '}
        <a href={WA_URL_US} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-2 hover:text-secondary">
          +1 913-413-6583
        </a>{' '}
        {t('(EE. UU.)', '(US)')}
      </p>
      <p className="flex items-center gap-2">
        <Mail className="w-4 h-4 text-primary" aria-hidden="true" />
        <a href={`mailto:${SALES_EMAIL}`} className="font-semibold text-primary underline underline-offset-2 hover:text-secondary">
          {SALES_EMAIL}
        </a>
      </p>
    </div>
  )

  return (
    <>
      <section className="hero-gradient text-white px-4 pt-24 pb-14 text-center">
        <span className="inline-flex items-center gap-2 bg-accent/20 text-accent font-semibold text-xs px-3 py-1 rounded-full mb-4">
          <Building2 className="w-4 h-4" />
          {t('Constructoras', 'Construction companies')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 max-w-3xl mx-auto leading-tight">
          {t('Cuestionario para constructoras', 'Questionnaire for construction companies')}
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto">{t(INTRO_ES, INTRO_EN)}</p>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        {step === 'rnc' && (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              void start(rncInput)
            }}
            className="bg-white rounded-2xl p-6 shadow-md space-y-4"
          >
            <h2 className="font-bold text-xl text-dark">{t('Empecemos por su RNC', "Let's start with your RNC")}</h2>
            <p className="text-gray-600 text-sm">
              {t(
                'Con el RNC buscamos el nombre de su empresa en la DGII. Si ya llenó este cuestionario en este equipo, o abrió el enlace que le enviamos por correo, verá sus respuestas para actualizarlas.',
                'With the RNC we look up your company name at DGII. If you already filled in this questionnaire on this device, or opened the link we emailed you, you will see your answers so you can update them.',
              )}
            </p>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">RNC</span>
              <input
                inputMode="numeric"
                autoComplete="off"
                value={rncInput}
                onChange={(e) => setRncInput(e.target.value)}
                placeholder="1-01-00000-0"
                className={`${inputCls} mt-1 text-base`}
                autoFocus
              />
            </label>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className="w-full sm:w-auto px-6 py-2.5 bg-secondary text-white font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50 inline-flex items-center justify-center gap-2"
            >
              {busy && <Loader2 className="w-4 h-4 animate-spin" />}
              {t('Continuar', 'Continue')}
            </button>
          </form>
        )}

        {step === 'form' && (
          <form onSubmit={submit} className="space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-bold text-xl text-dark">{t('Datos de la empresa', 'Company details')}</h2>
                <button
                  type="button"
                  onClick={() => {
                    setStep('rnc')
                    setError('')
                    setInfo('')
                    setConflict(false)
                  }}
                  className="text-sm text-primary underline underline-offset-2 hover:text-secondary"
                >
                  {t('Cambiar RNC', 'Change RNC')}
                </button>
              </div>
              {token && updatedAt && (
                <p className="text-sm text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">
                  {t(
                    'Cargamos las respuestas que ya había enviado. Puede cambiarlas y volver a enviar.',
                    'We loaded the answers you already sent. You can change them and send again.',
                  )}
                </p>
              )}
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">RNC</span>
                  <input value={rnc} readOnly className={`${inputCls} mt-1 bg-gray-50 font-mono`} />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">{t('Empresa', 'Company')}</span>
                  <input
                    value={company}
                    readOnly={companyLocked}
                    onChange={(e) => setCompany(e.target.value)}
                    className={`${inputCls} mt-1 ${companyLocked ? 'bg-gray-50' : ''}`}
                    required
                  />
                  {!companyLocked && (
                    <span className="text-xs text-gray-500">
                      {t('No pudimos consultar la DGII; escriba el nombre de la empresa.', 'We could not reach DGII; type the company name.')}
                    </span>
                  )}
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">{t('Contacto', 'Contact')}</span>
                  <input
                    value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    autoComplete="name"
                    className={`${inputCls} mt-1`}
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">{t('Correo', 'Email')}</span>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    autoComplete="email"
                    className={`${inputCls} mt-1`}
                    required
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-sm font-medium text-gray-700">{t('Teléfono o WhatsApp', 'Phone or WhatsApp')}</span>
                  <input
                    type="tel"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    autoComplete="tel"
                    className={`${inputCls} mt-1`}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">
                {t(
                  'Lo que escribe se guarda en este navegador mientras llena el cuestionario. Nos llega cuando pulsa Enviar.',
                  'What you type is kept in this browser while you fill in the questionnaire. It reaches us when you press Send.',
                )}
              </p>
            </div>

            {SECTIONS.map((s) => (
              <section key={s.id} id={s.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-5 scroll-mt-28">
                <div>
                  <h2 className="text-xl font-bold text-dark">{t(s.es, s.en)}</h2>
                  {s.noteEs && <p className="text-sm italic text-gray-500 mt-1">{t(s.noteEs, s.noteEn ?? s.noteEs)}</p>}
                </div>
                {s.questions.map((q) => (
                  <div key={q.n} className="space-y-2">
                    <p className="font-semibold text-dark">
                      {q.n}. {t(q.es, q.en)}
                    </p>
                    <div className="space-y-3">{q.fields.map((f) => renderField(f, q.n))}</div>
                  </div>
                ))}
              </section>
            ))}

            <div className="bg-white rounded-2xl p-6 shadow-md space-y-3">
              {error && <p className="text-red-600 text-sm">{error}</p>}
              {info && <p className="text-emerald-700 text-sm">{info}</p>}
              {conflict && (
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-gray-700 space-y-3">
                  <p>
                    {t(
                      'Este RNC ya tiene un cuestionario guardado. Para editarlo use el enlace que enviamos al correo del contacto, o pida uno nuevo.',
                      'This RNC already has a saved questionnaire. To edit it, use the link we sent to the contact’s email, or ask for a new one.',
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={resend}
                    disabled={busy}
                    className="px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:opacity-90 disabled:opacity-50"
                  >
                    {t('Enviar el enlace al correo registrado', 'Send the link to the email on file')}
                  </button>
                </div>
              )}
              <button
                type="submit"
                disabled={busy}
                className="w-full py-3 bg-secondary text-white font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50 inline-flex items-center justify-center gap-2"
              >
                {busy && <Loader2 className="w-4 h-4 animate-spin" />}
                {token ? t('Enviar cambios', 'Send changes') : t('Enviar', 'Send')}
              </button>
            </div>
          </form>
        )}

        {step === 'done' && (
          <div className="bg-white rounded-2xl p-8 shadow-md text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" aria-hidden="true" />
            <h2 className="font-bold text-2xl text-dark">{t('Gracias.', 'Thank you.')}</h2>
            <p className="text-gray-700">{t(THANKS_ES, THANKS_EN)}</p>
            <p className="text-sm text-gray-500">
              {created
                ? t(
                    `Le enviamos a ${contact.email} un enlace para revisar o cambiar sus respuestas desde cualquier equipo. En este navegador basta con volver a escribir el RNC.`,
                    `We sent ${contact.email} a link to review or change your answers from any device. In this browser, just type the RNC again.`,
                  )
                : t(
                    'Guardamos sus cambios. Puede volver a cambiarlos con el mismo enlace o, en este navegador, escribiendo el RNC.',
                    'We saved your changes. You can change them again with the same link or, in this browser, by typing the RNC.',
                  )}
            </p>
            <button
              type="button"
              onClick={() => setStep('form')}
              className="text-sm text-primary underline underline-offset-2 hover:text-secondary"
            >
              {t('Ver o cambiar mis respuestas', 'View or change my answers')}
            </button>
          </div>
        )}

        {contactBlock}
      </div>
    </>
  )
}
