'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '~/lib/i18n'
import { DmCta } from '~/components/DmCta'

// Referral landing. A seller shares /r?t=<companyRNC>&u=<sellerUser> (QR from the
// PVenta mobile app). A referral has had NO sales negotiation yet, so this is a LEAD
// (sales follows up), NOT an apertura/provisioning request. The referrer is forwarded
// with the lead so a converted referral can be credited to the seller for commission.
export default function ReferralPage() {
  const { t, lang, toggleLanguage } = useLanguage()
  const [ref, setRef] = useState<{ rnc: string; user: string }>({ rnc: '', user: '' })

  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    setRef({ rnc: q.get('t') || '', user: q.get('u') || '' })
    const qp = q.get('lang')
    if (qp === 'en' && lang === 'es') toggleLanguage()
    if (qp === 'es' && lang === 'en') toggleLanguage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="hero-gradient text-white px-4 pt-20 pb-10 text-center">
        <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
          {t('Vienes recomendado 🎉', "You've been referred 🎉")}
        </span>
        <h1 className="text-2xl font-extrabold mb-2">
          {t('Un cliente de XoulTec te recomendó PVenta ERP', 'A XoulTec client recommended PVenta ERP to you')}
        </h1>
        <p className="text-white/80 text-sm max-w-md mx-auto">
          {t(
            'Escríbenos y conversamos sobre tu negocio — sin compromiso.',
            'Message us and we’ll talk about your business — no commitment.',
          )}
        </p>
      </section>

      <div className="max-w-xl mx-auto px-4 py-8">
        <DmCta referrerUser={ref.user} referrerRnc={ref.rnc} />
        <p className="text-gray-400 text-xs mt-6 text-center">xoultec.com</p>
      </div>
    </main>
  )
}
