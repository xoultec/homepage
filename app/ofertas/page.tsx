'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import * as icons from 'lucide-react'
import { Phone, MessageCircle } from 'lucide-react'
import { useLanguage } from '~/lib/i18n'
import { products } from '~/lib/products'
import { promos } from '~/lib/promos'
import { MarketBadge } from '~/components/MarketBadge'
import { LeadForm } from './LeadForm'

export default function OfertasPage() {
  const { t, lang, toggleLanguage } = useLanguage()

  // Honor ?lang= from the QR URL (the pventa login passes the user's language).
  useEffect(() => {
    const qp = new URLSearchParams(window.location.search).get('lang')
    if (qp === 'en' && lang === 'es') toggleLanguage()
    if (qp === 'es' && lang === 'en') toggleLanguage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const topPromos = [...promos].sort((a, b) => a.priority - b.priority).slice(0, 4)

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="hero-gradient text-white px-4 py-10 text-center">
        <h1 className="text-2xl font-extrabold mb-2">{t('Descubre XoulTec', 'Discover XoulTec')}</h1>
        <p className="text-white/80 text-sm max-w-md mx-auto">
          {t(
            'Software empresarial para hacer crecer tu negocio. Mira nuestras soluciones y aprovecha un descuento exclusivo.',
            'Business software to grow your company. Explore our solutions and claim an exclusive discount.',
          )}
        </p>
      </section>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-10">
        <LeadForm />

        {topPromos.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-dark mb-4">{t('Ofertas', 'Offers')}</h2>
            <div className="space-y-3">
              {topPromos.map(promo => (
                <Link
                  key={promo.id}
                  href={promo.url}
                  className="product-card block bg-white rounded-xl p-4 shadow-sm"
                >
                  <h3 className="font-semibold text-dark">{t(promo.titleEs, promo.titleEn)}</h3>
                  <p className="text-gray-600 text-sm mt-1">{t(promo.descEs, promo.descEn)}</p>
                  <span className="text-secondary text-sm font-semibold mt-2 inline-block">
                    {t(promo.ctaEs, promo.ctaEn)} →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-lg font-bold text-dark mb-4">{t('Nuestros productos', 'Our products')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map(product => {
              const Icon = (icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
                product.icon
              ]
              return (
                <Link
                  key={product.slug}
                  href={product.landingPath ?? `/productos/${product.slug}`}
                  className="product-card block bg-white rounded-2xl p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`feature-icon bg-${product.color}-100 text-${product.color}-600`}>
                      {Icon && <Icon className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-dark">
                        {product.name}
                        {product.nameAccent && (
                          <span className={`text-${product.color}-600`}> {product.nameAccent}</span>
                        )}
                      </h3>
                      <MarketBadge market={product.market} />
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{t(product.cardDescEs, product.cardDescEn)}</p>
                </Link>
              )
            })}
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-lg font-bold text-dark mb-3">{t('¿Hablamos?', "Let's talk")}</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/18092524007"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 bg-green-600 text-white font-semibold rounded-xl hover:opacity-90 transition"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp RD
            </a>
            <a
              href="tel:+19134136583"
              className="flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white font-semibold rounded-xl hover:opacity-90 transition"
            >
              <Phone className="w-5 h-5" /> USA (913) 413-6583
            </a>
          </div>
          <p className="text-gray-400 text-xs mt-4">xoultec.com</p>
        </section>
      </div>
    </main>
  )
}
