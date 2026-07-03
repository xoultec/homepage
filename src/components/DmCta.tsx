'use client'

import { useState } from 'react'
import { MessageCircle, Instagram, Check } from 'lucide-react'
import { useLanguage } from '~/lib/i18n'

const IG_DM = 'https://ig.me/m/xoultec'
const WA_RD = '18092524007'
const WA_USA = '19134136583'

// Puente temporal de captura de leads: los forms de /ofertas y /r hacen POST a
// /api/leads, deshabilitado hasta configurar LEADS_API_KEY en Vercel. Mientras
// tanto ofrecemos varios canales para NO obligar a nadie a un solo medio:
// WhatsApp (universal, pre-carga el mensaje con el referido) como principal, e
// Instagram DM (canal monitoreado; IG no permite pre-cargar → botón que copia).
// El referido (vendedor/RNC) va embebido para acreditar la venta. Al volver el
// flujo automático, /ofertas y /r vuelven a usar <LeadForm />.
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
  const wa = (num: string) => `https://wa.me/${num}?text=${encodeURIComponent(message)}`

  async function copyAndOpenIg() {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
    } catch {
      /* clipboard bloqueado — el mensaje se muestra abajo para copiarlo a mano */
    }
    window.open(IG_DM, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md text-center space-y-3">
      <h3 className="font-bold text-xl text-dark">
        {t('🎁 Reclama tu primer mes GRATIS', '🎁 Claim your first month FREE')}
      </h3>
      <p className="text-gray-600 text-sm">
        {t('Escríbenos por el canal que prefieras:', 'Reach us on your preferred channel:')}
      </p>

      {/* WhatsApp — principal (universal, pre-carga el mensaje) */}
      <a
        href={wa(WA_RD)}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 text-white font-bold rounded-xl hover:opacity-90 transition"
      >
        <MessageCircle className="w-5 h-5" /> WhatsApp RD · (809) 252-4007
      </a>
      <a
        href={wa(WA_USA)}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-700 text-white font-semibold rounded-xl hover:opacity-90 transition"
      >
        <MessageCircle className="w-5 h-5" /> WhatsApp USA · (913) 413-6583
      </a>

      {/* Instagram DM — opción (canal monitoreado) */}
      <button
        onClick={copyAndOpenIg}
        className="w-full flex items-center justify-center gap-2 py-2.5 border border-secondary text-secondary font-semibold rounded-xl hover:bg-amber-50 transition"
      >
        <Instagram className="w-5 h-5" />
        {t('O por Instagram DM (copia el mensaje)', 'Or via Instagram DM (copies the message)')}
      </button>
      {copied && (
        <p className="text-green-600 text-xs flex items-center justify-center gap-1">
          <Check className="w-4 h-4" />
          {t('Copiado — pégalo en el DM', 'Copied — paste it in the DM')}
        </p>
      )}

      <p className="text-gray-500 text-xs bg-gray-50 rounded-lg p-3 select-all">{message}</p>
    </div>
  )
}
