// Los canales de contacto de XoulTec, en UN solo sitio.
//
// Por qué existe este archivo: el número de WhatsApp estaba copiado a mano en
// ContactForm, ChatWidget y DmCta. Cuando los números cambiaron, dos se
// actualizaron y uno no — el formulario de la portada y el widget de chat se
// quedaron apuntando a +1 (816) 919-3349, un número de febrero de 2024 que ya
// está MUERTO. Sobrevivió intacto a las migraciones Remix → TanStack → Next.js
// y estuvo mandando al vacío los mensajes de los dos caminos de contacto más
// visibles del sitio. Un dato de contacto duplicado es un dato que se va a
// desincronizar; aquí hay uno solo y se importa.
//
// Si un número cambia, se cambia AQUÍ y en ningún otro lado.

/** WhatsApp República Dominicana. */
export const WA_RD = '18092524007'
/** WhatsApp Estados Unidos. Solo WhatsApp: no recibe llamadas. */
export const WA_USA = '19134136583'

export const WA_RD_DISPLAY = '(809) 252-4007'
export const WA_USA_DISPLAY = '(913) 413-6583'

export const SALES_EMAIL = 'sales@xoultec.com'

/** Enlace de WhatsApp con el mensaje ya escrito. */
export function waLink(phone: string, text: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}
