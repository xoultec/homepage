'use client'

import { useState } from 'react'
import { useLanguage } from '~/lib/i18n'
import { products } from '~/lib/products'

type FormState = {
  nombre: string
  email: string
  telefono: string
  empresa: string
  productoInteres: string
}

interface LeadFormProps {
  // Lead attribution when the visitor arrives without a ?utm_source (a utm_source
  // in the URL always wins). Defaults to "ofertas" so the /ofertas page is unchanged.
  defaultSource?: string
  // Preselect the product of interest (e.g. "pventa" on the e-CF campaign landing).
  defaultProducto?: string
  // Optional copy overrides so a campaign landing can tune the form heading/CTA.
  titleEs?: string
  titleEn?: string
  subtitleEs?: string
  subtitleEn?: string
  ctaEs?: string
  ctaEn?: string
}

export function LeadForm({
  defaultSource = 'ofertas',
  defaultProducto = '',
  titleEs = 'Regístrate y obtén un descuento',
  titleEn = 'Sign up and get a discount',
  subtitleEs = 'Déjanos tus datos y recibe un código de descuento único.',
  subtitleEn = 'Leave your details and get a unique discount code.',
  ctaEs = 'Obtener mi descuento',
  ctaEn = 'Get my discount',
}: LeadFormProps = {}) {
  const { t, lang } = useLanguage()
  const [form, setForm] = useState<FormState>({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    productoInteres: defaultProducto,
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [code, setCode] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const set =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [k]: e.target.value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.nombre.trim() || !form.email.trim()) return
    setStatus('sending')
    setErrMsg('')
    // Track the channel that brought the visitor: utm_source from the QR
    // (pventa_login) or from social links (instagram/facebook). Falls back to the
    // page's defaultSource for direct visits.
    const source = new URLSearchParams(window.location.search).get('utm_source') || defaultSource
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source, lang }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.codigo) {
        setCode(data.codigo)
        setStatus('done')
      } else {
        setStatus('error')
        setErrMsg(
          data.message ||
            data.error ||
            t('No se pudo enviar. Intenta de nuevo.', 'Could not submit. Please try again.'),
        )
      }
    } catch {
      setStatus('error')
      setErrMsg(t('Error de conexión.', 'Connection error.'))
    }
  }

  if (status === 'done') {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-md text-center">
        <h3 className="font-bold text-xl text-dark mb-2">{t('¡Listo! 🎉', 'All set! 🎉')}</h3>
        <p className="text-gray-600 text-sm mb-4">
          {t(
            'Este es tu código de descuento. También te lo enviamos por correo.',
            'Here is your discount code. We also emailed it to you.',
          )}
        </p>
        <div className="text-2xl font-extrabold tracking-widest text-secondary bg-secondary/10 rounded-xl py-3">
          {code}
        </div>
        <p className="text-gray-500 text-xs mt-4">
          {t('Preséntalo cuando contactes a nuestro equipo.', 'Show it when you contact our team.')}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl p-6 shadow-md space-y-3">
      <h3 className="font-bold text-xl text-dark">{t(titleEs, titleEn)}</h3>
      <p className="text-gray-600 text-sm">{t(subtitleEs, subtitleEn)}</p>
      <input
        required
        value={form.nombre}
        onChange={set('nombre')}
        placeholder={t('Nombre', 'Name')}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-secondary focus:outline-none"
      />
      <input
        required
        type="email"
        value={form.email}
        onChange={set('email')}
        placeholder={t('Correo', 'Email')}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-secondary focus:outline-none"
      />
      <input
        value={form.telefono}
        onChange={set('telefono')}
        placeholder={t('Teléfono', 'Phone')}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-secondary focus:outline-none"
      />
      <input
        value={form.empresa}
        onChange={set('empresa')}
        placeholder={t('Empresa', 'Company')}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-secondary focus:outline-none"
      />
      <select
        value={form.productoInteres}
        onChange={set('productoInteres')}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white focus:border-secondary focus:outline-none"
      >
        <option value="">{t('Producto de interés (opcional)', 'Product of interest (optional)')}</option>
        {products.map(p => (
          <option key={p.slug} value={p.slug}>
            {p.name}
            {p.nameAccent ? ' ' + p.nameAccent : ''}
          </option>
        ))}
      </select>
      {status === 'error' && <p className="text-red-600 text-xs">{errMsg}</p>}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full py-2.5 bg-secondary text-white font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50"
      >
        {status === 'sending' ? t('Enviando...', 'Sending...') : t(ctaEs, ctaEn)}
      </button>
    </form>
  )
}
