'use client'

import { useState, useEffect, useCallback } from 'react'
import { useLanguage } from '~/lib/i18n'
import type { Promo } from '~/lib/promos'
import { ChevronLeft, ChevronRight, ShoppingBag, Zap, Code, Tag } from 'lucide-react'

const typeIcons: Record<Promo['type'], React.ComponentType<{ className?: string }>> = {
  'cross-sell': Zap,
  marketplace: ShoppingBag,
  service: Code,
  offer: Tag,
}

export function PromoCarousel({ promos }: { promos: Promo[] }) {
  const { t } = useLanguage()
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % promos.length)
  }, [promos.length])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + promos.length) % promos.length)
  }, [promos.length])

  useEffect(() => {
    if (promos.length <= 1) return
    const interval = setInterval(next, 6000)
    return () => clearInterval(interval)
  }, [next, promos.length])

  if (promos.length === 0) return null

  const promo = promos[current]
  const Icon = typeIcons[promo.type]

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 w-full border border-white/20 transition-all duration-500">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
            {promo.type === 'cross-sell' && t('Producto XoulTec', 'XoulTec Product')}
            {promo.type === 'marketplace' && t('Tienda', 'Store')}
            {promo.type === 'service' && t('Servicio', 'Service')}
            {promo.type === 'offer' && t('Oferta', 'Offer')}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-2xl font-bold text-white">
            {t(promo.titleEs, promo.titleEn)}
          </h3>
          {promo.market === 'rd' && (
            <span className="badge-rd">
              <img src="https://flagcdn.com/16x12/do.png" alt="RD" className="inline align-middle mr-0.5" />
              RD
            </span>
          )}
          {promo.market === 'usa' && (
            <span className="badge-usa">
              USA
              <img src="https://flagcdn.com/16x12/us.png" alt="USA" className="inline align-middle ml-0.5" />
            </span>
          )}
          {promo.market === 'both' && (
            <span className="badge-both">
              <img src="https://flagcdn.com/16x12/do.png" alt="RD" className="inline align-middle mr-0.5" />
              RD + USA
              <img src="https://flagcdn.com/16x12/us.png" alt="USA" className="inline align-middle ml-0.5" />
            </span>
          )}
        </div>
        <p className="text-white/70 text-sm leading-relaxed mb-6">
          {t(promo.descEs, promo.descEn)}
        </p>

        <a
          href={promo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-medium px-5 py-2.5 rounded-lg transition-colors text-sm"
        >
          {t(promo.ctaEs, promo.ctaEn)}
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>

      {promos.length > 1 && (
        <div className="flex items-center gap-4">
          <button
            onClick={prev}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>

          <div className="flex gap-2">
            {promos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? 'bg-white w-6' : 'bg-white/40'
                }`}
                aria-label={`Promo ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
      )}
    </div>
  )
}
