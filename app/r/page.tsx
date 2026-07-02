'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '~/lib/i18n'
import { SignupForm } from '../solicitar-apertura/SignupForm'

// Referral landing. A seller shares /r?t=<companyRNC>&u=<sellerUser> (QR from the
// PVenta mobile app). We read the referrer from the query and forward it through the
// signup so a converted request can be credited to that seller for commission.
export default function ReferralPage() {
  const { t, lang, toggleLanguage } = useLanguage()
  const [ref, setRef] = useState<{ rnc: string; user: string }>({ rnc: '', user: '' })

  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    setRef({ rnc: q.get('t') || '', user: q.get('u') || '' })
    // Honor ?lang= from the inbound link.
    const qp = q.get('lang')
    if (qp === 'en' && lang === 'es') toggleLanguage()
    if (qp === 'es' && lang === 'en') toggleLanguage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="hero-gradient text-white px-4 py-10 text-center">
        <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
          {t('Vienes recomendado 🎉', "You've been referred 🎉")}
        </span>
        <h1 className="text-2xl font-extrabold mb-2">
          {t('Un cliente de XoulTec te recomendó PVenta', 'A XoulTec client recommended PVenta to you')}
        </h1>
        <p className="text-white/80 text-sm max-w-md mx-auto">
          {t(
            'Empieza a facturar con PVenta. Déjanos tus datos y nuestro equipo te activa, listo ante la DGII.',
            'Start invoicing with PVenta. Leave your details and our team gets you set up, ready with the DGII.',
          )}
        </p>
      </section>

      <div className="max-w-xl mx-auto px-4 py-8">
        <SignupForm referrerRnc={ref.rnc} referrerUser={ref.user} />
        <p className="text-gray-400 text-xs mt-6 text-center">xoultec.com</p>
      </div>
    </main>
  )
}
