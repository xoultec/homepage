'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '~/lib/i18n'
import { MarketBadge } from './MarketBadge'
import type { Market } from '~/lib/products'

interface ProductHeroProps {
  name: string
  nameAccent?: string
  descEs: string
  descEn: string
  market: Market
}

export function ProductHero({ name, nameAccent, descEs, descEn, market }: ProductHeroProps) {
  const { t } = useLanguage()

  return (
    <section className="product-hero flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="fade-in visible">
          <Link href="/#productos" className="inline-flex items-center gap-1 text-gray-400 hover:text-white transition mb-6">
            <ArrowLeft className="w-4 h-4" />
            {t('Todos los productos', 'All products')}
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <MarketBadge market={market} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {name} {nameAccent && <span className="text-secondary">{nameAccent}</span>}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mb-8">
            {t(descEs, descEn)}
          </p>
          <a href="/#contacto" className="inline-block bg-secondary text-dark px-8 py-3 rounded-lg font-bold text-lg hover:bg-yellow-400 transition">
            {t('Solicitar Demo', 'Request Demo')}
          </a>
        </div>
      </div>
    </section>
  )
}
