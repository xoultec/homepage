'use client'

import Link from 'next/link'
import { useParams, notFound } from 'next/navigation'
import { useLanguage } from '~/lib/i18n'
import { getProduct, products } from '~/lib/products'
import { ProductHero } from '~/components/ProductHero'
import { FeatureCard } from '~/components/FeatureCard'
import { ScreenshotSection } from '~/components/ScreenshotSection'
import { DashboardPreview } from '~/components/DashboardPreview'

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = getProduct(slug)
  const { t } = useLanguage()

  if (!product) {
    notFound()
  }

  return (
    <>
      <ProductHero
        name={product.name}
        nameAccent={product.nameAccent}
        descEs={product.descEs}
        descEn={product.descEn}
        market={product.market}
      />

      {product.slug === 'pventa' && <ScreenshotSection />}

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark mb-12 text-center fade-in visible">
            {t('Caracteristicas Principales', 'Key Features')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.features.map((feature, i) => (
              <FeatureCard key={i} feature={feature} color={product.color} />
            ))}
          </div>
        </div>
      </section>

      {product.slug === 'pventa' && <DashboardPreview />}

      {product.slug === 'pventa' && (
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-dark mb-3">{t('Planes y alcance del soporte', 'Plans and support scope')}</h2>
            <p className="text-gray-600 mb-6">
              {t(
                'Precios de cada plan, qué incluye el soporte, servicios adicionales, horario y nuestro compromiso con usted.',
                'Prices for each plan, what support includes, additional services, hours and our commitment to you.',
              )}
            </p>
            <Link href="/soporte-pventa" className="inline-block border-2 border-primary text-primary px-6 py-2.5 rounded-lg font-semibold hover:bg-primary hover:text-white transition">
              {t('Ver alcance del soporte de PVenta', 'See PVenta support scope')}
            </Link>
          </div>
        </section>
      )}

      <section className="py-16 hero-gradient">
        <div className="max-w-4xl mx-auto px-4 text-center fade-in visible">
          <h2 className="text-3xl font-bold text-white mb-4">{t(product.ctaEs, product.ctaEn)}</h2>
          <p className="text-gray-300 mb-8">
            {t(product.ctaSubEs, product.ctaSubEn)}
          </p>
          <a href="/#contacto" className="inline-block bg-secondary text-dark px-8 py-3 rounded-lg font-bold text-lg hover:bg-yellow-400 transition cta-pulse">
            {t('Contactar Ahora', 'Contact Now')}
          </a>
        </div>
      </section>
    </>
  )
}
