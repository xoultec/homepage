'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '~/lib/i18n'
import type { PlanId } from '~/lib/checkout'

type FormState = {
  companyName: string
  country: 'DO' | 'US'
  taxId: string
  archetype: 'comercial' | 'clinica'
  usState: string
  contactName: string
  contactEmail: string
  contactPhone: string
}

// Field contract mirrors the operator portal's public POST /api/signup
// (xoultec-operator/signup.go handleCapture): companyName + country (DO/US) are
// required upstream; archetype defaults to "comercial" unless "clinica".
export function SignupForm() {
  const { t } = useLanguage()
  const [form, setForm] = useState<FormState>({
    companyName: '',
    country: 'DO',
    taxId: '',
    archetype: 'comercial',
    usState: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [errMsg, setErrMsg] = useState('')

  // El que llega con ?paid=1 viene del checkout de Stripe: ya pagó y este
  // formulario es el segundo paso, no el primero (cobrar primero, aprovisionar
  // después). Se lee en el cliente para no romper la hidratación del SSR.
  const [paidPlan, setPaidPlan] = useState<PlanId | 'unknown' | null>(null)
  useEffect(() => {
    const qp = new URLSearchParams(window.location.search)
    if (qp.get('paid') !== '1') return
    const plan = qp.get('plan')
    setPaidPlan(
      plan === 'emprendedor' || plan === 'todo-incluido' || plan === 'nomina' ? plan : 'unknown',
    )
  }, [])

  const planLabel: Record<PlanId, string> = {
    emprendedor: t('Emprendedor', 'Starter'),
    'todo-incluido': t('Todo Incluido', 'All Included'),
    nomina: t('XoulTec Nómina', 'XoulTec Payroll'),
  }

  const set =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [k]: e.target.value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.companyName.trim() || !form.contactEmail.trim()) return
    setStatus('sending')
    setErrMsg('')
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: form.companyName,
          country: form.country,
          taxId: form.taxId,
          archetype: form.archetype,
          usState: form.country === 'US' ? form.usState : '',
          contactName: form.contactName,
          contactEmail: form.contactEmail,
          contactPhone: form.contactPhone,
        }),
      })
      if (res.ok) {
        setStatus('done')
      } else {
        const data = await res.json().catch(() => ({}))
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
        <h3 className="font-bold text-xl text-dark mb-2">
          {t('¡Solicitud recibida! 🎉', 'Request received! 🎉')}
        </h3>
        <p className="text-gray-600 text-sm">
          {paidPlan
            ? t(
                'Tu pago ya está registrado. Nuestro equipo activa tu empresa y te escribe al correo que nos dejaste.',
                'Your payment is on file. Our team will set up your company and write to the email you gave us.',
              )
            : t(
                'Nuestro equipo revisará tu solicitud y te contactará para activar tu empresa en PVenta.',
                'Our team will review your request and contact you to activate your company in PVenta.',
              )}
        </p>
      </div>
    )
  }

  const inputCls =
    'w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-secondary focus:outline-none'

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl p-6 shadow-md space-y-3">
      {paidPlan && (
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3">
          <p className="text-emerald-800 text-sm font-semibold">
            {paidPlan === 'unknown'
              ? t('Pago recibido ✅', 'Payment received ✅')
              : t(
                  `Pago recibido ✅ · Plan ${planLabel[paidPlan]}`,
                  `Payment received ✅ · ${planLabel[paidPlan]} plan`,
                )}
          </p>
          <p className="text-emerald-700 text-xs mt-1">
            {t(
              'Último paso: cuéntanos de tu empresa con el MISMO correo con el que pagaste, y la activamos.',
              'Last step: tell us about your company using the SAME email you paid with, and we’ll activate it.',
            )}
          </p>
        </div>
      )}

      <h3 className="font-bold text-xl text-dark">{t('Solicitar apertura', 'Request onboarding')}</h3>
      <p className="text-gray-600 text-sm">
        {paidPlan
          ? t(
              'Ya pagaste. Solo faltan los datos de tu empresa para dejarte lista para facturar.',
              'You’ve paid. We just need your company details to get you ready to invoice.',
            )
          : t(
              'Cuéntanos de tu empresa y te dejamos lista para facturar.',
              "Tell us about your company and we'll get you ready to invoice.",
            )}
      </p>

      <input
        required
        value={form.companyName}
        onChange={set('companyName')}
        placeholder={t('Nombre de la empresa', 'Company name')}
        className={inputCls}
      />

      <div className="flex gap-2">
        <select value={form.country} onChange={set('country')} className={`${inputCls} bg-white`}>
          <option value="DO">{t('República Dominicana', 'Dominican Republic')}</option>
          <option value="US">{t('Estados Unidos', 'United States')}</option>
        </select>
        {form.country === 'US' && (
          <input
            value={form.usState}
            onChange={set('usState')}
            maxLength={2}
            placeholder={t('Estado (ej. NJ)', 'State (e.g. NJ)')}
            className={inputCls}
          />
        )}
      </div>

      <input
        value={form.taxId}
        onChange={set('taxId')}
        placeholder={
          form.country === 'US'
            ? t('EIN (si ya lo tienes)', 'EIN (if you have one)')
            : t('RNC (si ya lo tienes)', 'RNC (if you have one)')
        }
        className={inputCls}
      />

      <select value={form.archetype} onChange={set('archetype')} className={`${inputCls} bg-white`}>
        <option value="comercial">{t('Negocio comercial', 'Commercial business')}</option>
        <option value="clinica">{t('Clínica / salud', 'Clinic / healthcare')}</option>
      </select>

      <input
        value={form.contactName}
        onChange={set('contactName')}
        placeholder={t('Nombre de contacto', 'Contact name')}
        className={inputCls}
      />
      <input
        required
        type="email"
        value={form.contactEmail}
        onChange={set('contactEmail')}
        placeholder={t('Correo', 'Email')}
        className={inputCls}
      />
      <input
        value={form.contactPhone}
        onChange={set('contactPhone')}
        placeholder={t('Teléfono', 'Phone')}
        className={inputCls}
      />

      {status === 'error' && <p className="text-red-600 text-xs">{errMsg}</p>}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full py-2.5 bg-secondary text-white font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50"
      >
        {status === 'sending' ? t('Enviando...', 'Sending...') : t('Enviar solicitud', 'Submit request')}
      </button>
    </form>
  )
}
