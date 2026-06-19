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

const EMPTY: FormState = { nombre: '', email: '', telefono: '', empresa: '', productoInteres: '' }

export function LeadForm() {
  const { t, lang } = useLanguage()
  const [form, setForm] = useState<FormState>(EMPTY)
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
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'pventa_login', lang }),
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
      <h3 className="font-bold text-xl text-dark">
        {t('Regístrate y obtén un descuento', 'Sign up and get a discount')}
      </h3>
      <p className="text-gray-600 text-sm">
        {t(
          'Déjanos tus datos y recibe un código de descuento único.',
          'Leave your details and get a unique discount code.',
        )}
      </p>
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
        {status === 'sending'
          ? t('Enviando...', 'Sending...')
          : t('Obtener mi descuento', 'Get my discount')}
      </button>
    </form>
  )
}
