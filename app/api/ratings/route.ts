// Calificaciones del soporte para la sección "Lo que dicen nuestros clientes".
// Lee el resumen de PVenta (GET /api/public/ratings) con la misma clave que los leads, desde el
// servidor: la clave nunca llega al navegador. Se guarda una hora (Vercel la sirve de caché), así
// que una calificación nueva o un testimonio aprobado salen solos sin volver a publicar el sitio.
// Si PVenta no responde, devuelve 204 y la sección no se muestra.

const PVENTA_RATINGS_URL =
  process.env.PVENTA_RATINGS_URL || 'https://pventa.xoultec.com/api/public/ratings'
const LEADS_API_KEY = process.env.LEADS_API_KEY || ''

export const revalidate = 3600

export async function GET() {
  if (!LEADS_API_KEY) {
    return new Response(null, { status: 204 })
  }
  try {
    const resp = await fetch(PVENTA_RATINGS_URL, {
      headers: { 'X-Leads-Key': LEADS_API_KEY },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    })
    if (!resp.ok) {
      return new Response(null, { status: 204 })
    }
    const body = await resp.json()
    // PVenta envuelve la respuesta en { data } (httputil.OK); se acepta también sin envoltorio.
    const data = body && typeof body === 'object' && 'data' in body ? body.data : body
    return Response.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    })
  } catch {
    return new Response(null, { status: 204 })
  }
}
