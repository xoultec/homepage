'use client'

import Link from 'next/link'
import { Code2, Database, Layers, ArrowRightLeft, Globe, Building2, Hexagon, Atom, Wind, Zap, CreditCard } from 'lucide-react'
import * as icons from 'lucide-react'
import { useLanguage } from '~/lib/i18n'
import { ContactForm } from '~/components/ContactForm'
import { MarketBadge } from '~/components/MarketBadge'
import { products } from '~/lib/products'

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <>
      {/* Hero */}
      <section id="inicio" className="hero-gradient h-screen flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="fade-in visible">
              <div className="inline-block bg-secondary/20 text-secondary px-4 py-1 rounded-full text-sm font-semibold mb-4">
                {t('Software Empresarial', 'Enterprise Software')}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                {t(
                  <>Soluciones de software que <span className="text-secondary">impulsan</span> tu negocio</>,
                  <>Software solutions that <span className="text-secondary">power</span> your business</>
                )}
              </h1>
              <p className="text-base text-gray-300 mb-6 max-w-lg">
                {t(
                  'Desarrollamos sistemas empresariales robustos para Republica Dominicana y Estados Unidos. Desde POS hasta nomina, tenemos la solucion perfecta para tu empresa.',
                  'We build robust enterprise systems for the Dominican Republic and the United States. From POS to payroll, we have the perfect solution for your business.'
                )}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#productos" className="bg-secondary text-dark px-7 py-2.5 rounded-lg font-bold hover:bg-yellow-400 transition cta-pulse">
                  {t('Ver Productos', 'View Products')}
                </a>
                <a href="#contacto" className="border-2 border-white text-white px-7 py-2.5 rounded-lg font-bold hover:bg-white hover:text-dark transition">
                  {t('Contactanos', 'Contact Us')}
                </a>
              </div>
            </div>

            <div className="fade-in visible hidden md:flex flex-col items-center gap-5">
              <div className="grid grid-cols-2 gap-6 w-72">
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">20+</div>
                  <div className="text-gray-400 text-sm">{t('Anos de Experiencia', 'Years of Experience')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">100%</div>
                  <div className="text-gray-400 text-sm">{t('Tecnologia Moderna', 'Modern Technology')}</div>
                </div>
              </div>
              <div className="relative">
                <div className="w-72 h-72 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 flex flex-col gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="space-y-2.5 flex-1">
                    <div className="h-3 bg-white/20 rounded w-3/4" />
                    <div className="h-3 bg-secondary/40 rounded w-1/2" />
                    <div className="h-3 bg-white/20 rounded w-5/6" />
                    <div className="h-7 bg-accent/30 rounded w-full mt-3" />
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      <div className="h-14 bg-white/10 rounded" />
                      <div className="h-14 bg-secondary/20 rounded" />
                      <div className="h-14 bg-white/10 rounded" />
                    </div>
                    <div className="h-3 bg-white/20 rounded w-2/3 mt-3" />
                    <div className="h-3 bg-white/15 rounded w-1/2" />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-secondary/20 rounded-xl backdrop-blur-sm border border-secondary/30 flex items-center justify-center">
                  <Code2 className="w-8 h-8 text-secondary" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-accent/20 rounded-xl backdrop-blur-sm border border-accent/30 flex items-center justify-center">
                  <Database className="w-7 h-7 text-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

              const card = (
                <div className={`product-card bg-white rounded-2xl p-6 shadow-md fade-in visible block ${isPVenta ? 'cursor-pointer' : ''}`} key={product.slug}>
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
                  {isPVenta ? (
                    <div className="flex flex-wrap gap-2">
                      <a href="https://play.google.com/store/apps/details?id=sim.cliente.pventa" target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-xs bg-gray-900 text-white px-2 py-1 rounded font-semibold hover:bg-gray-700 transition">▶ Google Play</a>
                      <a href="https://apps.apple.com/us/app/pventa-mobile/id6449156165" target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-xs bg-gray-900 text-white px-2 py-1 rounded font-semibold hover:bg-gray-700 transition"> App Store</a>
                    </div>
                  ) : (
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
                  )}
                </div>
              )

              return (
                <Link key={product.slug} href={`/productos/${product.slug}`} className="block">
                  {card}
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
