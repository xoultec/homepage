'use client'

import Link from 'next/link'
import { Database, Layers, ArrowRightLeft, Globe, Building2, Hexagon, Atom, Wind, Zap, CreditCard } from 'lucide-react'
import * as icons from 'lucide-react'
import { useLanguage } from '~/lib/i18n'
import { ContactForm } from '~/components/ContactForm'
import { MarketBadge } from '~/components/MarketBadge'
import { products } from '~/lib/products'
import { EcfLanding } from './facturacion-electronica/EcfLanding'

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <>
      {/* e-CF campaign landing leads the home: direct compliance pitch + signup,
          so visitors convert without hunting routes. */}
      <div id="inicio">
        <EcfLanding />
      </div>

      {/* Products */}
      <section id="productos" className="py-10 scroll-mt-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 fade-in visible">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-3">
              {t('Nuestros Productos', 'Our Products')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t(
                'Soluciones de software disenadas para resolver las necesidades reales de empresas en Republica Dominicana y Estados Unidos.',
                'Software solutions designed to solve real business needs in the Dominican Republic and the United States.'
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => {
              const Icon = (icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[product.icon]
              const isPVenta = product.slug === 'pventa'

              // The product image/title/description links to the product page.
              const head = (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`feature-icon bg-${product.color}-100 text-${product.color}-600`}>
                      {Icon && <Icon className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-dark">
                        {product.name} {product.nameAccent && <span className={`text-${product.color}-600`}>{product.nameAccent}</span>}
                      </h3>
                      <MarketBadge market={product.market} />
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {t(product.cardDescEs, product.cardDescEn)}
                  </p>
                </>
              )

              // PVenta has its own store links (anchors), so the card wrapper must
              // not be an anchor too — only the head links to the product page.
              if (isPVenta) {
                return (
                  <div key={product.slug} className="product-card bg-white rounded-2xl p-6 shadow-md fade-in visible">
                    <Link href={`/productos/${product.slug}`} className="block">{head}</Link>
                    <div className="flex flex-wrap gap-2">
                      <a href="https://play.google.com/store/apps/details?id=sim.cliente.pventa" target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-900 text-white px-2 py-1 rounded font-semibold hover:bg-gray-700 transition">▶ Google Play</a>
                      <a href="https://apps.apple.com/us/app/pventa-mobile/id6449156165" target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-900 text-white px-2 py-1 rounded font-semibold hover:bg-gray-700 transition"> App Store</a>
                    </div>
                  </div>
                )
              }

              return (
                <Link key={product.slug} href={`/productos/${product.slug}`} className="block">
                  <div className="product-card bg-white rounded-2xl p-6 shadow-md fade-in visible">
                    {head}
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, i) => (
                        <span key={i} className={`text-xs bg-${product.color}-50 text-${product.color}-600 px-2 py-1 rounded`}>
                          {t(tag.es, tag.en)}
                        </span>
                      ))}
                      {product.slug === 'eclinic' && (
                        <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded font-semibold">HIPAA</span>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why XoulTec */}
      <section id="nosotros" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in visible">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              {t('Por que XoulTec?', 'Why XoulTec?')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t(
                'Combinamos experiencia comprobada con tecnologia de vanguardia para ofrecer soluciones que realmente funcionan.',
                'We combine proven experience with cutting-edge technology to deliver solutions that truly work.'
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center fade-in visible">
              <div className="feature-icon bg-blue-100 text-blue-600 mx-auto mb-4"><Layers className="w-6 h-6" /></div>
              <h3 className="font-bold text-dark mb-2">{t('Stack Moderno', 'Modern Stack')}</h3>
              <p className="text-gray-600 text-sm">{t('Go + React + MySQL. Rendimiento, seguridad y escalabilidad en cada producto.', 'Go + React + MySQL. Performance, security and scalability in every product.')}</p>
            </div>
            <div className="text-center fade-in visible">
              <div className="feature-icon bg-emerald-100 text-emerald-600 mx-auto mb-4"><ArrowRightLeft className="w-6 h-6" /></div>
              <h3 className="font-bold text-dark mb-2">{t('Migracion sin Riesgo', 'Risk-free Migration')}</h3>
              <p className="text-gray-600 text-sm">{t('Modernizamos sistemas legacy a plataformas web manteniendo compatibilidad con tus datos existentes.', 'We modernize legacy systems to web platforms while maintaining compatibility with your existing data.')}</p>
            </div>
            <div className="text-center fade-in visible">
              <div className="feature-icon bg-amber-100 text-amber-600 mx-auto mb-4"><Globe className="w-6 h-6" /></div>
              <h3 className="font-bold text-dark mb-2">{t('RD y USA', 'DR & USA')}</h3>
              <p className="text-gray-600 text-sm">{t('Soluciones adaptadas a las regulaciones fiscales y laborales de cada pais.', 'Solutions adapted to the tax and labor regulations of each country.')}</p>
            </div>
            <div className="text-center fade-in visible">
              <div className="feature-icon bg-purple-100 text-purple-600 mx-auto mb-4"><Building2 className="w-6 h-6" /></div>
              <h3 className="font-bold text-dark mb-2">Multi-tenant</h3>
              <p className="text-gray-600 text-sm">{t('Arquitectura multi-inquilino. Una plataforma, multiples empresas, datos aislados y seguros.', 'Multi-tenant architecture. One platform, multiple businesses, isolated and secure data.')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-gray-400 fade-in visible">
            <div className="flex items-center gap-2"><Hexagon className="w-5 h-5 text-cyan-400" /><span className="font-semibold">Go</span></div>
            <div className="flex items-center gap-2"><Atom className="w-5 h-5 text-blue-400" /><span className="font-semibold">React</span></div>
            <div className="flex items-center gap-2"><Database className="w-5 h-5 text-orange-400" /><span className="font-semibold">MySQL</span></div>
            <div className="flex items-center gap-2"><Wind className="w-5 h-5 text-sky-400" /><span className="font-semibold">Tailwind</span></div>
            <div className="flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-400" /><span className="font-semibold">WebSocket</span></div>
            <div className="flex items-center gap-2"><CreditCard className="w-5 h-5 text-purple-400" /><span className="font-semibold">Stripe</span></div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <ContactForm />
    </>
  )
}
