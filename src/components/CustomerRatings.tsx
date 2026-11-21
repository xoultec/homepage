'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { Star, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useLanguage } from '~/lib/i18n'

/**
 * "Lo que dicen nuestros clientes": la calificación del 1 al 5 que dan los clientes al cerrar
 * cada caso de soporte, leída en vivo de PVenta (/api/ratings, guardada una hora). Muestra el
 * promedio y la cantidad de todas las calificaciones y solo los testimonios que el cliente
 * permitió publicar y XoulTec aprobó, firmados con el nombre del negocio. Si no hay datos, no
 * se muestra nada.
 */

interface Testimonial {
  business: string
  score: number
  comment: string
  month: string
}

interface Summary {
  count: number
  average: number
  distribution: number[]
  testimonials: Testimonial[]
}

function Stars({ value, size = 'w-5 h-5' }: { value: number; size?: string }) {
  return (
    <span className="inline-flex" aria-hidden>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={`${size} ${n <= Math.round(value) ? 'fill-secondary text-secondary' : 'text-gray-300'}`} />
      ))}
    </span>
  )
}

// Una sola lectura de /api/ratings por visita, compartida por la insignia del hero y la sección.
let ratingsRequest: Promise<Summary | null> | null = null
function loadRatings(): Promise<Summary | null> {
  if (!ratingsRequest) {
    ratingsRequest = fetch('/api/ratings')
      .then((r) => (r.status === 200 ? r.json() : null))
      .then((d: Summary | null) => (d && d.count > 0 ? d : null))
      .catch(() => null)
  }
  return ratingsRequest
}

function useRatings(): Summary | null {
  const [data, setData] = useState<Summary | null>(null)
  useEffect(() => {
    let alive = true
    loadRatings().then((d) => {
      if (alive) setData(d)
    })
    return () => {
      alive = false
    }
  }, [])
  return data
}

function formatAverage(value: number, lang: string) {
  return value.toLocaleString(lang === 'es' ? 'es-DO' : 'en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
}

/**
 * Contenido del bloque de calificaciones: promedio + estrellas arriba y, debajo, los
 * testimonios aprobados desplazándose solos hacia arriba. Solo testimonios con comentario;
 * con uno solo no se mueve.
 */
function RatingsCardBody({ data, height = 'h-48', onClose }: { data: Summary; height?: string; onClose?: () => void }) {
  const { t, lang } = useLanguage()
  const avg = formatAverage(data.average, lang)
  const quotes = data.testimonials.filter((x) => x.comment.trim() !== '')
  const moving = quotes.length > 1
  const list = moving ? [...quotes, ...quotes] : quotes
  return (
    <>
      <div className="relative px-5 pt-4 pb-3 border-b border-gray-100">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 pr-6">
          {t('Lo que dicen nuestros clientes', 'What our clients say')}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-2xl font-bold">{avg}</span>
          <Stars value={data.average} size="w-5 h-5" />
        </div>
        <p className="text-xs text-gray-500">
          {t(
            `${data.count} ${data.count === 1 ? 'caso' : 'casos'} de soporte calificados, del 1 al 5`,
            `${data.count} rated support ${data.count === 1 ? 'case' : 'cases'}, 1 to 5`,
          )}
        </p>
        <p className="sr-only">{t(`${avg} de 5 estrellas`, `${avg} out of 5 stars`)}</p>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-2 right-2 p-1 rounded-full text-gray-400 hover:text-dark hover:bg-gray-100"
            aria-label={t('Minimizar', 'Minimize')}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {quotes.length > 0 && (
        <div className={`relative ${height} overflow-hidden`}>
          <ul
            className={moving ? 'ratings-scroll' : ''}
            style={moving ? ({ '--ratings-duration': `${quotes.length * 7}s` } as CSSProperties) : undefined}
          >
            {list.map((x, i) => (
              <li key={i} aria-hidden={i >= quotes.length} className="px-5 py-3 border-b border-gray-100">
                <Stars value={x.score} size="w-3.5 h-3.5" />
                <p className="mt-1 text-sm text-gray-700 leading-snug">“{x.comment}”</p>
                <p className="mt-1 text-xs font-semibold text-dark">{x.business}</p>
              </li>
            ))}
          </ul>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-white to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent" />
        </div>
      )}
    </>
  )
}

/**
 * Bloque a la derecha del hero de la portada (Rubén, 21-nov-2026: "no una página completa,
 * un bloque a la derecha, scrolleable auto"). Sin datos no se muestra.
 */
export function RatingsTicker() {
  const { t } = useLanguage()
  const data = useRatings()
  if (!data) return null
  return (
    <aside
      id="calificaciones"
      className="w-full max-w-sm mx-auto rounded-2xl bg-white text-left text-dark shadow-lg overflow-hidden"
      aria-label={t('Lo que dicen nuestros clientes', 'What our clients say')}
    >
      <RatingsCardBody data={data} height="h-36" />
    </aside>
  )
}

const FLOATING_KEY = 'xoultec-ratings-min'
const HERO_BLOCK_PATHS = ['/', '/facturacion-electronica']

/**
 * El mismo bloque, flotando en TODAS las páginas mientras el visitante se mueve por el sitio
 * (Rubén, 21-nov-2026: "los sistemas se venden por seguridad; si te mueves en la página web,
 * los clientes verán calificaciones, tienen más peso para tomar decisiones").
 * - En la portada y en /facturacion-electronica (que ya lo tienen en el hero) aparece al bajar
 *   500px, para no duplicarlo; en las demás páginas se ve desde que se entra.
 * - Siempre a la DERECHA, como el bloque del hero (Rubén, 21-nov-2026: "si muestras a la
 *   derecha, que sea siempre ahí"), encima del botón del chat (bottom-6, 56px de alto).
 * - Abierto es una COLUMNA de alto completo: arriba alineada con el inicio del contenido
 *   (debajo de la barra, top-32) y abajo encima del chat (Rubén, 21-nov-2026: "que coincida
 *   con el borde de los 3 cuadros y más alta").
 * - Abierto de entrada solo en pantallas de 1700px o más: ahí cabe al lado del contenido
 *   (max-w-7xl) sin taparlo. En pantallas más chicas y en móvil arranca como pastilla
 *   "5.0 ★ · N clientes" que se abre al tocarla.
 * - La X lo minimiza a la pastilla (se recuerda en esta pestaña); nunca desaparece del todo.
 */
export function FloatingRatings() {
  const { t, lang } = useLanguage()
  const pathname = usePathname()
  const data = useRatings()
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState<boolean | null>(null)

  useEffect(() => {
    let min = false
    try {
      min = sessionStorage.getItem(FLOATING_KEY) === '1'
    } catch {}
    setOpen(!min && window.matchMedia('(min-width: 1700px)').matches)
  }, [])

  useEffect(() => {
    // Las páginas con el bloque en el hero (portada y e-CF) lo muestran al bajar; las demás,
    // desde que se entra (Rubén, 21-nov-2026: en /servicios "falta aquí").
    const heroHasBlock = HERO_BLOCK_PATHS.includes(pathname)
    const onScroll = () => setVisible(!heroHasBlock || window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  if (!data || open === null) return null
  const setMin = (min: boolean) => {
    setOpen(!min)
    try {
      sessionStorage.setItem(FLOATING_KEY, min ? '1' : '0')
    } catch {}
  }
  const avg = formatAverage(data.average, lang)
  return (
    <div
      className={`fixed bottom-24 right-6 z-40 flex flex-col justify-end transition-all duration-300 ${open ? 'top-32' : ''} ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-hidden={!visible}
    >
      {open ? (
        <aside
          className="h-full w-72 max-w-[calc(100vw-2rem)] flex flex-col rounded-2xl bg-white text-left text-dark shadow-xl border border-gray-100 overflow-hidden"
          aria-label={t('Lo que dicen nuestros clientes', 'What our clients say')}
        >
          <RatingsCardBody data={data} height="flex-1 min-h-0" onClose={() => setMin(true)} />
        </aside>
      ) : (
        <button
          type="button"
          onClick={() => setMin(false)}
          className="flex items-center gap-2 rounded-full bg-white text-dark shadow-lg border border-gray-100 px-4 py-2 hover:bg-gray-50"
        >
          <Star className="w-4 h-4 fill-secondary text-secondary" />
          <span className="font-bold">{avg}</span>
          <span className="text-sm text-gray-600">
            {t(`· ${data.count} clientes calificaron`, `· ${data.count} clients rated us`)}
          </span>
        </button>
      )}
    </div>
  )
}

export function CustomerRatings({ className = 'bg-gray-50' }: { className?: string }) {
  const { t, lang } = useLanguage()
  const data = useRatings()
  if (!data) return null

  const avg = formatAverage(data.average, lang)
  const monthName = (m: string) => {
    const [y, mo] = m.split('-').map(Number)
    if (!y || !mo) return ''
    return new Date(y, mo - 1, 15).toLocaleDateString(lang === 'es' ? 'es-DO' : 'en-US', { month: 'long', year: 'numeric' })
  }

  return (
    <section id="calificaciones" className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            {t('Lo que dicen nuestros clientes', 'What our clients say')}
          </h2>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-dark">{avg}</span>
              <Stars value={data.average} size="w-7 h-7" />
            </div>
            <p className="text-gray-600">
              {t(
                `Calificación promedio de ${data.count} ${data.count === 1 ? 'caso' : 'casos'} de soporte cerrados, del 1 al 5.`,
                `Average rating from ${data.count} closed support ${data.count === 1 ? 'case' : 'cases'}, on a 1 to 5 scale.`,
              )}
            </p>
            <p className="sr-only">{t(`${avg} de 5 estrellas`, `${avg} out of 5 stars`)}</p>
          </div>
        </div>

        {data.testimonials.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6">
            {data.testimonials.map((x, i) => (
              <figure key={i} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-3">
                <Stars value={x.score} />
                {x.comment && <blockquote className="text-gray-700 leading-relaxed">“{x.comment}”</blockquote>}
                <figcaption className="mt-auto text-sm">
                  <span className="font-semibold text-dark">{x.business}</span>
                  {x.month && <span className="text-gray-500"> · {monthName(x.month)}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
