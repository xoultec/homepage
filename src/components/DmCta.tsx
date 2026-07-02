'use client'

import { useState } from 'react'
import { Instagram, Check } from 'lucide-react'
import { useLanguage } from '~/lib/i18n'

const IG_DM = 'https://ig.me/m/xoultec'

// Puente temporal de captura de leads: los forms de /ofertas y /r hacen POST a
// /api/leads, que está deshabilitado hasta que se configure LEADS_API_KEY en
// Vercel. Mientras tanto enviamos al prospecto por Instagram DM (canal que se
// monitorea) — WhatsApp como respaldo. El referido (vendedor/RNC) va embebido en
// un mensaje copiable para que la venta se pueda acreditar. Al volver el flujo
// automático, /ofertas y /r vuelven a usar <LeadForm />.
export function DmCta({
  referrerUser = '',
  referrerRnc = '',
}: {
  referrerUser?: string
  referrerRnc?: string
}) {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)

  const ref = (referrerUser || referrerRnc).trim()
  const message = ref
    ? `Hola XoulTec 👋 Quiero mi primer mes GRATIS de PVenta. Vengo referido por: ${ref}. (MES GRATIS)`
    : 'Hola XoulTec 👋 Quiero mi primer mes GRATIS. (MES GRATIS)'

  async function copyAndOpen() {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
    } catch {
      /* clipboard bloqueado — el mensaje se muestra abajo para copiarlo a mano */
    }
    window.open(IG_DM, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md text-center space-y-4">
      <h3 className="font-bold text-xl text-dark">
        {t('🎁 Reclama tu primer mes GRATIS', '🎁 Claim your first month FREE')}
      </h3>
      <p className="text-gray-600 text-sm">
        {t(
          'Escríbenos por Instagram con el mensaje de abajo y activamos tu beneficio.',
          'Message us on Instagram with the text below and we’ll activate your benefit.',
        )}
      </p>

      <button
        onClick={copyAndOpen}
        className="w-full flex items-center justify-center gap-2 py-3 bg-secondary text-white font-bold rounded-xl hover:opacity-90 transition"
      >
        <Instagram className="w-5 h-5" />
        {t('Copiar mensaje y escribir por DM', 'Copy message & open DM')}
      </button>

      {copied && (
        <p className="text-green-600 text-xs flex items-center justify-center gap-1">
          <Check className="w-4 h-4" />
          {t('Copiado — pégalo en el DM', 'Copied — paste it in the DM')}
        </p>
      )}

      <p className="text-gray-500 text-xs bg-gray-50 rounded-lg p-3 select-all">{message}</p>

      <p className="text-gray-400 text-xs">
        {t('O por WhatsApp:', 'Or WhatsApp:')}{' '}
        <a
          className="text-secondary font-semibold"
          href="https://wa.me/18092524007"
          target="_blank"
          rel="noopener noreferrer"
        >
          +1 (809) 252-4007
        </a>
      </p>
    </div>
  )
}
