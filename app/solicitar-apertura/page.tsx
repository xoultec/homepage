'use client'

import { useEffect } from 'react'
import { useLanguage } from '~/lib/i18n'
import { SignupForm } from './SignupForm'

export default function SolicitarAperturaPage() {
  const { t, lang, toggleLanguage } = useLanguage()

  // Honor ?lang= from an inbound link (keeps language consistent across the site).
  useEffect(() => {
    const qp = new URLSearchParams(window.location.search).get('lang')
    if (qp === 'en' && lang === 'es') toggleLanguage()
    if (qp === 'es' && lang === 'en') toggleLanguage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="hero-gradient text-white px-4 py-10 text-center">
        <h1 className="text-2xl font-extrabold mb-2">
          {t('Solicita la apertura de tu empresa', 'Request your company onboarding')}
        </h1>
        <p className="text-white/80 text-sm max-w-md mx-auto">
          {t(
            'Empieza a facturar con PVenta. Déjanos tus datos y nuestro equipo te activa, listo ante la DGII.',
            'Start invoicing with PVenta. Leave your details and our team gets you set up, ready with the DGII.',
          )}
        </p>
      </section>

      <div className="max-w-xl mx-auto px-4 py-8">
        <SignupForm />
        <p className="text-gray-400 text-xs mt-6 text-center">xoultec.com</p>
      </div>
    </main>
  )
}
