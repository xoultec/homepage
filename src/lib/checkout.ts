// Los enlaces de pago de XoulTec (Stripe Payment Links), en UN solo sitio.
//
// Por qué existe este archivo: hasta el 17-sep-2026 el sitio NO tenía forma de
// cobrar. Las tarjetas de precios de /facturacion-electronica y /nomina eran
// texto sin botón, y el único camino era el formulario de /solicitar-apertura,
// que se queda esperando aprobación manual y no toca dinero. El 16-sep-2026
// alguien intentó comprar y no pudo pagar. Esto es lo que faltaba.
//
// Son Payment Links del dashboard de Stripe: URLs públicas, igual que el portal
// pay.xoultec.com que ya vive en el Navbar. NO son secretos y por eso están en
// el código y no en .env — quien tenga el link solo puede pagarnos.
//
// Mientras un enlace esté vacío, el botón cae al formulario (#registro): una
// tarjeta nunca queda con un botón muerto ni con un checkout roto.
//
// Cómo se crean los links (y a dónde deben redirigir después del pago):
// docs/cobro-stripe-payment-links.md

export type PlanId = 'emprendedor' | 'todo-incluido' | 'nomina'

/**
 * Pega aquí la URL que da Stripe al crear cada Payment Link
 * (https://buy.stripe.com/...). Si cambia un precio se cambia AQUÍ.
 */
export const PAYMENT_LINKS: Record<PlanId, string> = {
  emprendedor: '',
  'todo-incluido': '',
  nomina: '',
}

/** ¿Este plan ya se puede pagar solo, sin pasar por ventas? */
export function hasCheckout(plan: PlanId) {
  return PAYMENT_LINKS[plan].trim().length > 0
}

/**
 * A dónde manda el botón de la tarjeta: al checkout de Stripe si el link ya
 * está configurado, y si no, al formulario de la misma página.
 */
export function checkoutHref(plan: PlanId, fallback = '#registro') {
  return hasCheckout(plan) ? PAYMENT_LINKS[plan] : fallback
}
