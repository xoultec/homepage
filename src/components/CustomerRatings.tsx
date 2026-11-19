'use client'

import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
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

export function CustomerRatings({ className = 'bg-gray-50' }: { className?: string }) {
  const { t, lang } = useLanguage()
  const [data, setData] = useState<Summary | null>(null)

  useEffect(() => {
    let alive = true
    fetch('/api/ratings')
      .then((r) => (r.status === 200 ? r.json() : null))
      .then((d: Summary | null) => {
        if (alive && d && d.count > 0) setData(d)
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  if (!data) return null

  const avg = data.average.toLocaleString(lang === 'es' ? 'es-DO' : 'en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
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
