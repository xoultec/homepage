'use client'

import Link from 'next/link'
import { ShieldCheck, ArrowRight } from 'lucide-react'
import { useLanguage } from '~/lib/i18n'

export function PrivacyBanner() {
  const { t } = useLanguage()

  return (
    <div className="fixed top-0 w-full z-[60] bg-primary text-white h-10 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-center gap-2 text-xs sm:text-sm">
        <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
        <span className="hidden sm:inline text-white/90">
          {t('Tu privacidad es importante.', 'Your privacy matters.')}
        </span>
        <Link
          href="/politica-de-proteccion-de-datos"
          className="inline-flex items-center gap-1 font-semibold text-secondary hover:text-yellow-400 transition underline-offset-2 hover:underline whitespace-nowrap"
        >
          {t('Política de Protección de Datos', 'Data Protection Policy')}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
