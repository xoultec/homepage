'use client'

import { useState } from 'react'
import { MessageCircle, Instagram, Check } from 'lucide-react'
import { track } from '@vercel/analytics'
import { useLanguage } from '~/lib/i18n'
import { WA_RD, WA_USA, WA_RD_DISPLAY, WA_USA_DISPLAY, waLink } from '~/lib/contact'

const IG_DM = 'https://ig.me/m/xoultec'

// Puente temporal de captura de leads: los forms de /ofertas y /r hacen POST a
// /api/leads, deshabilitado hasta configurar LEADS_API_KEY en Vercel. Mientras
// tanto ofrecemos varios canales para NO obligar a nadie a un solo medio:
// WhatsApp (universal, pre-carga el mensaje con el referido) como principal, e
// Instagram DM (canal monitoreado; IG no permite pre-cargar → botón que copia).
// El referido (vendedor/RNC) va embebido para acreditar la venta.
//
// SIN OFERTA POR DEFECTO (Rubén, 22-ago-2026): "sector software es difícil,
// vender con promoción... siempre ha sido por referimiento". El "primer mes
// GRATIS" era el titular de esta tarjeta y de /r, y no dio resultado. La CTA por
// defecto es CONTACTO, no promoción. `offer` lo vuelve a encender si algún día
// hace falta, pero no es el default.
//
// CADA CLIC SE REGISTRA en Vercel Analytics (`track`), porque la atribución no
// puede depender de que la persona mande el mensaje: antes, si borraba la línea
// del referido o solo escribía "hola", el referido se perdía sin dejar rastro y
// no había forma de saber si alguien había entrado siquiera.
export function DmCta({
  referrerUser = '',
  referrerRnc = '',
  offer = false,
}: {
  referrerUser?: string
  referrerRnc?: string
  offer?: boolean
}) {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)

  const ref = (referrerUser || referrerRnc).trim()

  const message = offer
    ? ref
      ? t(
          `Hola XoulTec 👋 Quiero mi primer mes GRATIS de PVenta. Vengo referido por: ${ref}.`,
          `Hi XoulTec 👋 I'd like my first month FREE of PVenta. I was referred by: ${ref}.`,
        )
      : t(
          'Hola XoulTec 👋 Quiero mi primer mes GRATIS de PVenta.',
          `Hi XoulTec 👋 I'd like my first month FREE of PVenta.`,
        )
    : ref
      ? t(
          `Hola XoulTec 👋 Vengo referido por: ${ref}. Me gustaría saber cómo PVenta le puede servir a mi negocio.`,
          `Hi XoulTec 👋 I was referred by: ${ref}. I'd like to know how PVenta could work for my business.`,
        )
      : t(
          'Hola XoulTec 👋 Me gustaría saber cómo PVenta le puede servir a mi negocio.',
          `Hi XoulTec 👋 I'd like to know how PVenta could work for my business.`,
        )

  const wa = (num: string) => waLink(num, message)

  // Deja rastro del contacto aunque la conversación nunca llegue a ocurrir.
  // Es best-effort a propósito: si el registro falla, el usuario igual pasa a
  // su canal — nunca se le bloquea el clic por un problema de analítica.
  function record(channel: 'whatsapp_rd' | 'whatsapp_usa' | 'instagram_dm') {
    try {
      track('contacto_referido', {
        channel,
        referrer: ref || 'directo',
        referrerRnc: referrerRnc || 'ninguno',
      })
    } catch {
      /* la analítica nunca debe estorbar el contacto */
    }
  }

  async function copyAndOpenIg() {
    record('instagram_dm')
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
        {offer
          ? t('🎁 Reclama tu primer mes GRATIS', '🎁 Claim your first month FREE')
          : t('Hablemos de tu negocio', "Let's talk about your business")}
      </h3>
      <p className="text-gray-600 text-sm">
        {t('Escríbenos por el canal que prefieras:', 'Reach us on your preferred channel:')}
      </p>

      {/* WhatsApp — principal (universal, pre-carga el mensaje) */}
      <a
        href={wa(WA_RD)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => record('whatsapp_rd')}
        className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 text-white font-bold rounded-xl hover:opacity-90 transition"
      >
        <MessageCircle className="w-5 h-5" /> WhatsApp RD · {WA_RD_DISPLAY}
      </a>
      <a
        href={wa(WA_USA)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => record('whatsapp_usa')}
        className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-700 text-white font-semibold rounded-xl hover:opacity-90 transition"
      >
        <MessageCircle className="w-5 h-5" /> WhatsApp USA · {WA_USA_DISPLAY}
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
