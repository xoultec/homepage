'use client'

import { useEffect } from 'react'
import { Check, Clock, Gamepad2, MessageCircle, Monitor, ShieldCheck } from 'lucide-react'
import { useLanguage } from '~/lib/i18n'
import { SERVICE_LINKS, type ServiceId } from '~/lib/checkout'

// Servicios por hora: soporte técnico remoto (Ingeniería) y la unidad de Videojuegos
// (desde 14-nov-2026). Todo se cobra por adelantado con un Payment Link de Stripe.
//
// Dos reglas que esta página no puede romper:
// 1. Primero se escribe por WhatsApp y el cliente AUTORIZA el acceso a su equipo;
//    después paga. Por eso el botón principal es WhatsApp y el de pago va segundo:
//    pagar no da acceso por sí solo.
// 2. Solo se publica la primera hora en horario laboral. Los bloques de 30 minutos y
//    las tarifas fuera de horario se mandan por WhatsApp cuando hacen falta.
// Precios y links: docs/servicios-soporte-remoto-y-videojuegos.md

const WA_RD = 'https://wa.me/18092524007'
const WA_USA = 'https://wa.me/19134136583'

function waLink(base: string, text: string) {
  return `${base}?text=${encodeURIComponent(text)}`
}

function PayButton({ service }: { service: ServiceId }) {
  const { t } = useLanguage()
  return (
    <a
      href={SERVICE_LINKS[service]}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 block text-center text-sm font-semibold rounded-lg py-2.5 transition text-primary border border-primary hover:bg-primary hover:text-white"
    >
      {t('Pagar 1 hora', 'Pay 1 hour')}
    </a>
  )
}

function WhatsAppButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold rounded-lg py-2.5 bg-secondary text-white hover:opacity-90 transition"
    >
      <MessageCircle className="w-4 h-4" /> {label}
    </a>
  )
}

function PriceCard({
  title,
  market,
  price,
  per,
  items,
  service,
  wa,
  waLabel,
  highlight = false,
}: {
  title: string
  market: string
  price: string
  per: string
  items: string[]
  service: ServiceId
  wa: string
  waLabel: string
  highlight?: boolean
}) {
  return (
    <div
      className={`pricing-card bg-white rounded-2xl p-7 shadow-md text-center ${highlight ? 'border-2 border-secondary' : 'border border-gray-200'}`}
    >
      <p className="text-xs font-bold uppercase tracking-wide text-gray-500">{market}</p>
      <h3 className="font-bold text-lg text-dark mt-1">{title}</h3>
      <div className="mt-4 mb-4">
        <span className="text-4xl font-extrabold text-dark">{price}</span>
        <span className="text-gray-500 text-sm"> /{per}</span>
      </div>
      <ul className="space-y-2 text-sm text-gray-700 text-left">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <Check className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" /> {item}
          </li>
        ))}
      </ul>
      <WhatsAppButton href={wa} label={waLabel} />
      <PayButton service={service} />
    </div>
  )
}

export function ServiciosLanding() {
  const { t, lang, toggleLanguage } = useLanguage()

  useEffect(() => {
    const qp = new URLSearchParams(window.location.search).get('lang')
    if (qp === 'en' && lang === 'es') toggleLanguage()
    if (qp === 'es' && lang === 'en') toggleLanguage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const minimo = t('Mínimo 1 hora; después, bloques de 30 minutos', 'Minimum 1 hour; then 30-minute blocks')
  const adelantado = t('Pago por adelantado con tarjeta (Stripe)', 'Paid in advance by card (Stripe)')

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient text-white px-4 py-16 text-center">
        <span className="inline-flex items-center gap-2 bg-accent/20 text-accent font-semibold text-xs px-3 py-1 rounded-full mb-4">
          <ShieldCheck className="w-4 h-4" />
          {t('Acceso temporal, autorizado por ti', 'Temporary access, authorized by you')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 max-w-3xl mx-auto leading-tight">
          {t('Soporte técnico remoto y Videojuegos', 'Remote tech support and Gaming')}
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto mb-8">
          {t(
            'Resolvemos a distancia lo que pasa en tu PC, tu red o tu consola. Nos escribes, autorizas el acceso, pagas la primera hora y empezamos.',
            'We fix what is going on with your PC, network or console remotely. Message us, authorize access, pay the first hour and we start.',
          )}
        </p>
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm">
          <Clock className="w-4 h-4" />
          {t(
            'Lunes a viernes 8:00 a.m.–6:00 p.m. · Sábados 8:00 a.m.–2:00 p.m. (hora RD)',
            'Monday to Friday 8:00 AM–6:00 PM · Saturday 8:00 AM–2:00 PM (Atlantic Time, UTC-4)',
          )}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-14 space-y-16">
        {/* How it works */}
        <section>
          <h2 className="text-2xl font-bold text-dark text-center mb-8">{t('Cómo funciona', 'How it works')}</h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            {[
              [
                t('Escríbenos', 'Message us'),
                t('Por WhatsApp nos cuentas qué pasa y en qué equipo.', 'Tell us on WhatsApp what is happening and on which device.'),
              ],
              [
                t('Autorizas el acceso', 'You authorize access'),
                t(
                  'Nunca entramos a tu equipo sin tu permiso expreso. Tú instalas el acceso temporal con un doble clic.',
                  'We never access your device without your express permission. You install the temporary access with a double click.',
                ),
              ],
              [
                t('Pagas la primera hora', 'You pay the first hour'),
                t('Con tarjeta, en el enlace seguro de Stripe.', 'By card, through the secure Stripe link.'),
              ],
              [
                t('Resolvemos y retiras el acceso', 'We fix it and you remove access'),
                t(
                  'Al terminar, otro doble clic deja tu equipo como estaba: sin cuentas nuevas ni programas nuestros.',
                  'When we finish, another double click leaves your device as it was: no new accounts, none of our software.',
                ),
              ],
            ].map(([title, desc], i) => (
              <li key={title} className="bg-white rounded-2xl p-5 shadow-sm">
                <span className="inline-flex w-7 h-7 items-center justify-center rounded-full bg-primary text-white text-xs font-bold mb-3">
                  {i + 1}
                </span>
                <p className="font-semibold text-dark">{title}</p>
                <p className="text-gray-600 mt-1">{desc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Remote support */}
        <section>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Monitor className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-dark">{t('Soporte técnico remoto', 'Remote tech support')}</h2>
          </div>
          <p className="text-gray-600 text-center text-sm max-w-2xl mx-auto mb-8">
            {t(
              'Para empresas: PCs, impresoras, redes, internet, Windows y conexión a tus sistemas.',
              'For businesses: PCs, printers, networks, internet, Windows and connection to your systems.',
            )}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <PriceCard
              market={t('República Dominicana', 'Dominican Republic')}
              title={t('Empresa', 'Business')}
              price="US$40"
              per={t('hora', 'hour')}
              items={[minimo, adelantado, t('Atención en español', 'Support in Spanish')]}
              service="remoto-rd-1h"
              wa={waLink(WA_RD, 'Hola, necesito soporte técnico remoto para mi empresa.')}
              waLabel={t('Escribir por WhatsApp', 'Message on WhatsApp')}
              highlight
            />
            <PriceCard
              market={t('Estados Unidos', 'United States')}
              title={t('Empresa', 'Business')}
              price="US$75"
              per={t('hora', 'hour')}
              items={[minimo, adelantado, t('Atención en español o inglés', 'Support in English or Spanish')]}
              service="remote-us-1h"
              wa={waLink(WA_USA, 'Hi, I need remote tech support for my business.')}
              waLabel={t('Escribir por WhatsApp', 'Message on WhatsApp')}
            />
          </div>
        </section>

        {/* Gaming */}
        <section>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Gamepad2 className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-dark">{t('Videojuegos', 'Gaming')}</h2>
          </div>
          <p className="text-gray-600 text-center text-sm max-w-2xl mx-auto mb-8">
            {t(
              'Nuestra unidad especialista en videojuegos, por WhatsApp en RD y Estados Unidos.',
              'Our gaming specialist unit, on WhatsApp in the DR and the United States.',
            )}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto items-start">
            <PriceCard
              market={t('RD y Estados Unidos', 'DR and United States')}
              title={t('Soporte gamer', 'Gamer support')}
              price="US$60"
              per={t('hora', 'hour')}
              items={[
                t('PC gamer, consolas (PlayStation, Xbox, Switch) y mandos', 'Gaming PCs, consoles (PlayStation, Xbox, Switch) and controllers'),
                t('Drivers, rendimiento, lag y conexión online', 'Drivers, performance, lag and online connection'),
                t('Cuentas y tiendas: Steam, PlayStation Network, Xbox, Epic', 'Accounts and stores: Steam, PlayStation Network, Xbox, Epic'),
                minimo,
              ]}
              service="gaming-1h"
              wa={waLink(WA_RD, 'Hola, necesito soporte de videojuegos.')}
              waLabel={t('Escribir por WhatsApp', 'Message on WhatsApp')}
              highlight
            />
            <div className="bg-white rounded-2xl p-7 shadow-md border border-gray-200 text-center">
              <h3 className="font-bold text-lg text-dark">{t('También te ayudamos con', 'We also help with')}</h3>
              <ul className="mt-4 space-y-3 text-sm text-gray-700 text-left">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" />
                  <span>
                    <b>{t('Asesoría y venta', 'Advice and sales')}:</b>{' '}
                    {t('equipos, consolas, juegos y accesorios. Te cotizamos por WhatsApp.', 'gear, consoles, games and accessories. We quote you on WhatsApp.')}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" />
                  <span>
                    <b>{t('Desarrollo de juegos a medida', 'Custom game development')}:</b> {t('a cotizar.', 'quoted per project.')}
                  </span>
                </li>
              </ul>
              <p className="mt-5 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
                {t(
                  'XoulTec nunca te pedirá tu contraseña. Si hace falta entrar a una cuenta, la escribes tú.',
                  'XoulTec will never ask for your password. If an account sign-in is needed, you type it yourself.',
                )}
              </p>
              <WhatsAppButton
                href={waLink(WA_USA, 'Hola, quiero una cotización de videojuegos.')}
                label={t('Pedir cotización', 'Request a quote')}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
