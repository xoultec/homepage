'use client'

import { useLanguage } from '~/lib/i18n'
import { checkoutHref, hasCheckout, type PlanId } from '~/lib/checkout'

// El botón de compra de una tarjeta de precio. Vive aparte porque lo usan dos
// landings (/facturacion-electronica y /nomina) y porque tiene una regla que no
// se puede duplicar a mano: si el Payment Link de ese plan todavía no está
// puesto en ~/lib/checkout, el botón NO promete un pago que no existe — baja al
// formulario de la propia página y cambia el texto.

type Props = {
  plan: PlanId
  /** A dónde cae si el plan aún no tiene Payment Link. */
  fallback?: string
  /** `solid` para el plan recomendado, `outline` para el resto. */
  variant?: 'solid' | 'outline'
}

export function CheckoutButton({ plan, fallback = '#registro', variant = 'outline' }: Props) {
  const { t } = useLanguage()
  const live = hasCheckout(plan)
  const href = checkoutHref(plan, fallback)

  const base = 'mt-5 block text-center text-sm font-semibold rounded-lg py-2.5 transition'
  const cls =
    variant === 'solid'
      ? `${base} bg-secondary text-white hover:opacity-90`
      : `${base} text-primary border border-primary hover:bg-primary hover:text-white`

  return (
    <a
      href={href}
      // El checkout de Stripe se abre en otra pestaña para no perder la página
      // de precios; el formulario de la misma página, no.
      {...(live ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cls}
    >
      {live
        ? t('Suscribirme', 'Subscribe')
        : t('Solicitar apertura', 'Request onboarding')}
    </a>
  )
}
