'use client'

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
