'use client'

import { useEffect } from 'react'
import { Check, AlertTriangle, MessageCircle, ShieldCheck, FilePlus2, Send, QrCode, Award } from 'lucide-react'
import { useLanguage } from '~/lib/i18n'
import type { Feature } from '~/lib/products'
import { FeatureCard } from '~/components/FeatureCard'
import { LeadForm } from '../ofertas/LeadForm'

// Real, verifiable e-CF capabilities of PVenta (matches the ecf module: 9 doc
// types, DGII signing/submission with polling, security code + QR, sequence
// management, RNC validation, demo mode).
const ecfFeatures: Feature[] = [
  {
    icon: 'FileCheck',
    titleEs: '9 tipos de comprobantes',
    titleEn: '9 e-CF document types',
    descEs: 'Factura de Crédito Fiscal (31), Consumo (32), Notas de Crédito/Débito (33/34), Compras (41), Gastos Menores (43), Regímenes Especiales (44), Gubernamental (45) y Exportación (46).',
    descEn: 'Tax Credit Invoice (31), Consumer (32), Credit/Debit Notes (33/34), Purchases (41), Minor Expenses (43), Special Regimes (44), Government (45) and Export (46).',
  },
  {
    icon: 'Send',
    titleEs: 'Firma y envío a la DGII',
    titleEn: 'Signing & DGII submission',
    descEs: 'Firma digital, envío automático y seguimiento del estado en la DGII en tiempo real: aceptado, rechazado o aceptado condicional.',
    descEn: 'Digital signature, automatic submission and real-time DGII status tracking: accepted, rejected or conditionally accepted.',
  },
  {
    icon: 'QrCode',
    titleEs: 'Código de seguridad + QR',
    titleEn: 'Security code + QR',
    descEs: 'Cada comprobante lleva su código de seguridad y QR de la DGII, listos en la representación impresa.',
    descEn: 'Every document carries its DGII security code and QR, ready on the printed representation.',
  },
  {
    icon: 'ListOrdered',
    titleEs: 'Secuencias NCF gestionadas',
    titleEn: 'Managed NCF sequences',
    descEs: 'Control de rangos autorizados, alerta de agotamiento y vencimiento, asignación atómica sin duplicados.',
    descEn: 'Authorized range control, exhaustion and expiry alerts, atomic allocation with no duplicates.',
  },
  {
    icon: 'BadgeCheck',
    titleEs: 'Validación de RNC',
    titleEn: 'RNC validation',
    descEs: 'Verificación del RNC contra la DGII (activo/suspendido) antes de emitir, para evitar rechazos.',
    descEn: 'RNC verification against DGII (active/suspended) before issuing, to avoid rejections.',
  },
  {
    icon: 'Award',
    titleEs: 'Te certificamos ante la DGII — gratis',
    titleEn: 'We certify you before DGII — free',
    descEs: 'Hacemos por ti todo el proceso de certificación como emisor electrónico ante la DGII, sin costo. Tú solo gestionas tu firma digital.',
    descEn: 'We handle the entire electronic-issuer certification process before DGII for you, at no cost. You only manage your own digital signature.',
    highlight: true,
    badge: 'Gratis',
  },
  {
    icon: 'FlaskConical',
    titleEs: 'Modo demo para probar',
    titleEn: 'Demo mode to try it',
    descEs: 'Prueba el flujo completo de e-CF sin enviar nada real a la DGII — ideal para conocer el sistema antes de migrar.',
    descEn: 'Try the full e-CF flow without sending anything real to DGII — perfect to explore before migrating.',
    highlight: true,
    badge: 'Demo',
  },
]

function ComparisonRow({
  label,
  alegra,
  pventa,
  pventaGood = true,
}: {
  label: string
  alegra: string
  pventa: string
  pventaGood?: boolean
}) {
  return (
    <div className="grid grid-cols-3 gap-2 px-4 py-3 border-t border-gray-100 text-sm">
      <div className="font-medium text-dark">{label}</div>
      <div className="text-gray-500">{alegra}</div>
      <div className={`flex items-start gap-1.5 font-medium ${pventaGood ? 'text-emerald-700' : 'text-gray-700'}`}>
        {pventaGood && <Check className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" />}
        <span>{pventa}</span>
      </div>
    </div>
  )
}

export function EcfLanding() {
  const { t, lang, toggleLanguage } = useLanguage()

  // Honor ?lang= from ad links / QR so the page opens in the visitor's language.
  useEffect(() => {
    const qp = new URLSearchParams(window.location.search).get('lang')
    if (qp === 'en' && lang === 'es') toggleLanguage()
    if (qp === 'es' && lang === 'en') toggleLanguage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient text-white px-4 py-16 text-center">
        <span className="inline-flex items-center gap-2 bg-secondary/20 text-secondary font-semibold text-xs px-3 py-1 rounded-full mb-4">
          <AlertTriangle className="w-4 h-4" />
          {t('Ley 32-23 · Fecha límite 15 de noviembre de 2026', 'Law 32-23 · Deadline November 15, 2026')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 max-w-3xl mx-auto leading-tight">
          {t(
            'Factura e-CF ante la DGII — y todo tu negocio en un sistema',
            'DGII e-CF invoicing — and your whole business in one system',
          )}
        </h1>
        <p className="text-white font-semibold text-lg max-w-2xl mx-auto mb-8">
          {t(
            'Factura en minutos. Tú creas la factura; PVenta hace el resto.',
            'Invoice in minutes. You create it; PVenta does the rest.',
          )}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#registro"
            className="cta-pulse inline-flex items-center justify-center px-6 py-3 bg-secondary text-white font-bold rounded-xl hover:opacity-90 transition"
          >
            {t('Solicita tu demo y descuento', 'Request your demo & discount')}
          </a>
          <a
            href="https://wa.me/18092524007"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition"
          >
            <MessageCircle className="w-5 h-5" /> {t('Habla con un asesor', 'Talk to an advisor')}
          </a>
        </div>

        <div className="mt-7 max-w-2xl mx-auto inline-flex items-start gap-3 bg-white/10 border border-accent/40 rounded-xl px-5 py-3 text-left">
          <Award className="w-7 h-7 text-accent shrink-0" />
          <p className="text-sm text-white/90">
            <b className="text-accent">{t('Gratis: ', 'Free: ')}</b>
            {t(
              'te dejamos listo ante la DGII — hacemos por ti todo el proceso de certificación como emisor electrónico.',
              'we get you ready with DGII — we handle your entire electronic-issuer certification process for you.',
            )}
          </p>
        </div>
      </section>

      {/* Deadline urgency strip */}
      <section className="bg-amber-50 border-y border-amber-200 px-4 py-4">
        <p className="max-w-3xl mx-auto text-center text-sm text-amber-900">
          {t(
            'Las micro, pequeñas empresas y contribuyentes no clasificados deben emitir e-CF antes del 15 de noviembre de 2026. Vencido el plazo, no cumplir conlleva multas de 5 a 50 salarios mínimos. No esperes al último día.',
            'Micro, small businesses and unclassified taxpayers must issue e-CF before November 15, 2026. After the deadline, non-compliance carries fines of 5 to 50 minimum wages. Don’t wait until the last day.',
          )}
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-14 space-y-16">
        {/* Pricing */}
        <section>
          <h2 className="text-2xl font-bold text-dark text-center mb-4">
            {t('Precios claros, sin letra chica', 'Clear pricing, no fine print')}
          </h2>
          <div className="max-w-3xl mx-auto mb-8 bg-secondary/15 border border-secondary/40 rounded-xl px-5 py-3 text-center">
            <p className="text-sm font-semibold text-dark">
              🔥 {t('Promo de lanzamiento: 1 mes gratis. Migra antes del 15 de noviembre de 2026.', 'Launch promo: 1 month free. Migrate before November 15, 2026.')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Emprendedor — solo e-CF */}
            <div className="pricing-card bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg text-dark">{t('Emprendedor', 'Starter')}</h3>
              <p className="text-gray-500 text-sm mt-1">
                {t('Solo necesitas facturar', 'You just need to invoice')}
              </p>
              <div className="mt-4 mb-5">
                <span className="text-3xl font-extrabold text-dark">US$19</span>
                <span className="text-gray-500 text-sm"> /{t('mes', 'mo')}</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  t('Facturación electrónica e-CF', 'e-CF electronic invoicing'),
                  t('Ventas y clientes', 'Sales and customers'),
                  t('1 usuario', '1 user'),
                  t('Soporte local', 'Local support'),
                ].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Todo Incluido — ERP completo (recomendado) */}
            <div className="pricing-card bg-white rounded-2xl p-7 shadow-md border-2 border-secondary relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full">
                {t('Recomendado', 'Recommended')}
              </span>
              <h3 className="font-bold text-lg text-dark">{t('Todo Incluido', 'All Included')}</h3>
              <p className="text-gray-500 text-sm mt-1">
                {t('Todo el ERP, sin límites', 'The full ERP, no limits')}
              </p>
              <p className="text-secondary text-xs font-bold uppercase tracking-wide mt-3">
                {t('Precio de lanzamiento', 'Launch price')}
              </p>
              <div className="mt-1 mb-1">
                <span className="text-3xl font-extrabold text-dark">US$49</span>
                <span className="text-gray-500 text-sm"> /{t('mes', 'mo')}</span>
              </div>
              <p className="text-gray-500 text-xs mb-5">
                {t('Incluye 2 usuarios · +US$3 c/u, hasta 8', 'Includes 2 users · +US$3 each, up to 8')}
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  t('Facturación electrónica e-CF', 'e-CF electronic invoicing'),
                  t('Inventario y POS · hasta 3 bodegas', 'Inventory & POS · up to 3 warehouses'),
                  t('Contabilidad y bancos', 'Accounting & banking'),
                  t('Cuentas por cobrar y pagar', 'Accounts receivable & payable'),
                  t('Sin tope de ingresos', 'No income cap'),
                ].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Enterprise — a cotizar */}
            <div className="pricing-card bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg text-dark">Enterprise</h3>
              <p className="text-gray-500 text-sm mt-1">
                {t('Para empresas grandes o alto volumen', 'For large or high-volume businesses')}
              </p>
              <div className="mt-4 mb-5">
                <span className="text-3xl font-extrabold text-dark">{t('A cotizar', 'Custom')}</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  t('Facturación electrónica e-CF', 'e-CF electronic invoicing'),
                  t('Todo el ERP completo', 'The complete ERP'),
                  t('Usuarios ilimitados', 'Unlimited users'),
                  t('Bodegas ilimitadas', 'Unlimited warehouses'),
                  t('Multi-sucursal', 'Multi-branch'),
                  t('Soporte dedicado', 'Dedicated support'),
                ].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" /> {item}
                  </li>
                ))}
              </ul>
              <a
                href="#registro"
                className="mt-5 block text-center text-sm font-semibold text-primary border border-primary rounded-lg py-2 hover:bg-primary hover:text-white transition"
              >
                {t('Habla con ventas', 'Talk to sales')}
              </a>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-6 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-accent" />
            {t(
              'Empieza con Emprendedor y crece a Todo Incluido sin migrar de sistema ni perder tus datos.',
              'Start with Starter and grow to All Included without switching systems or losing your data.',
            )}
          </p>
        </section>

        {/* What the ERP includes */}
        <section>
          <h2 className="text-2xl font-bold text-dark text-center mb-2">
            {t('Todo el ERP, en un solo sistema', 'The whole ERP, in one system')}
          </h2>
          <p className="text-gray-600 text-center text-sm mb-6">
            {t('Esto incluye el plan Todo Incluido:', "Here's what the All Included plan covers:")}
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {[
              t('Facturación e-CF', 'e-CF invoicing'),
              t('Ventas y cotizaciones', 'Sales & quotes'),
              t('Inventario', 'Inventory'),
              t('POS', 'POS'),
              t('Cuentas por cobrar', 'Accounts receivable'),
              t('Cuentas por pagar', 'Accounts payable'),
              t('Compras', 'Purchasing'),
              t('Contabilidad', 'Accounting'),
              t('Bancos', 'Banking'),
            ].map(m => (
              <span
                key={m}
                className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1.5 text-sm text-dark"
              >
                <Check className="w-3.5 h-3.5 text-emerald-600" /> {m}
              </span>
            ))}
          </div>
        </section>

        {/* Comparison: one subscription vs four */}
        <section>
          <h2 className="text-2xl font-bold text-dark text-center mb-2">
            {t('Una suscripción, no cuatro', 'One subscription, not four')}
          </h2>
          <p className="text-gray-600 text-center text-sm max-w-2xl mx-auto mb-8">
            {t(
              'En otros sistemas, cada módulo (facturación, contabilidad, POS, nómina) es una suscripción aparte que se suma — y cada plan tiene tope de ingresos. En PVenta todo está abierto en un solo lugar.',
              'In other systems each module (invoicing, accounting, POS, payroll) is a separate subscription that stacks — and every plan has an income cap. In PVenta everything is open in one place.',
            )}
          </p>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden max-w-3xl mx-auto">
            <div className="grid grid-cols-3 gap-2 px-4 py-3 bg-gray-50 text-xs font-bold uppercase tracking-wide text-gray-500">
              <div></div>
              <div>{t('Otros', 'Others')}</div>
              <div className="text-primary">PVenta XoulTec</div>
            </div>
            <ComparisonRow
              label={t('Modelo', 'Model')}
              alegra={t('Una suscripción por producto', 'One subscription per product')}
              pventa={t('Una sola, todo incluido', 'A single one, all included')}
            />
            <ComparisonRow
              label={t('Tope de ingresos', 'Income cap')}
              alegra={t('Sí — subes de plan al crecer', 'Yes — you move up tiers as you grow')}
              pventa={t('Sin tope', 'No cap')}
            />
            <ComparisonRow
              label={t('Usuarios', 'Users')}
              alegra={t('Incluidos por plan (1 a 8)', 'Bundled per tier (1 to 8)')}
              pventa={t('US$3 c/u (2 incluidos)', 'US$3 each (2 included)')}
            />
            <ComparisonRow
              label={t('e-CF DGII', 'DGII e-CF')}
              alegra={t('Incluido', 'Included')}
              pventa={t('Incluido e ilimitado', 'Included and unlimited')}
            />
            <ComparisonRow
              label={t('Inventario, CxC/CxP, bancos', 'Inventory, AR/AP, banking')}
              alegra={t('Según el plan / producto', 'Depends on plan / product')}
              pventa={t('Todo abierto', 'All open')}
            />
            <ComparisonRow
              label={t('Bodegas / almacenes', 'Warehouses')}
              alegra={t('Limitadas por plan (2/10/100)', 'Capped per tier (2/10/100)')}
              pventa={t('3 · ilimitadas en Enterprise', '3 · unlimited in Enterprise')}
            />
          </div>
        </section>

        {/* How it works — "you invoice, we handle the rest" */}
        <section>
          <h2 className="text-2xl font-bold text-dark text-center mb-8">
            {t('Tú facturas, nosotros nos encargamos del resto', 'You invoice, we handle the rest')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                Icon: FilePlus2,
                es: 'Creas tu factura',
                en: 'Create your invoice',
                dEs: 'Como siempre, en segundos.',
                dEn: 'As always, in seconds.',
              },
              {
                Icon: Send,
                es: 'La firmamos y enviamos a la DGII',
                en: 'We sign and submit it to DGII',
                dEs: 'Firma digital y validación en línea, automáticas.',
                dEn: 'Automatic digital signature and online validation.',
              },
              {
                Icon: QrCode,
                es: 'Recibes tu e-CF',
                en: 'You get your e-CF',
                dEs: 'Con código de seguridad y QR, listo para imprimir.',
                dEn: 'With security code and QR, ready to print.',
              },
            ].map((s, i) => (
              <div key={s.es} className="text-center">
                <div className="feature-icon bg-cyan-100 text-cyan-600 mx-auto mb-3">
                  <s.Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-dark mb-1">
                  {i + 1}. {t(s.es, s.en)}
                </h3>
                <p className="text-gray-600 text-sm">{t(s.dEs, s.dEn)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* e-CF features */}
        <section>
          <h2 className="text-2xl font-bold text-dark text-center mb-2">
            {t('Facturación electrónica de verdad', 'Real electronic invoicing')}
          </h2>
          <p className="text-gray-600 text-center text-sm max-w-2xl mx-auto mb-8">
            {t(
              'PVenta ya emite e-CF en producción, conectado a la DGII.',
              'PVenta already issues e-CF in production, connected to DGII.',
            )}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ecfFeatures.map(f => (
              <FeatureCard key={f.titleEs} feature={f} color="cyan" />
            ))}
          </div>
        </section>

        {/* Lead form */}
        <section id="registro" className="max-w-xl mx-auto scroll-mt-20">
          <LeadForm
            defaultSource="ecf_campaign"
            defaultProducto="pventa"
            titleEs="Solicita tu demo y descuento"
            titleEn="Request your demo & discount"
            subtitleEs="Déjanos tus datos y te contactamos para mostrarte PVenta y darte un código de descuento."
            subtitleEn="Leave your details and we’ll reach out to show you PVenta and give you a discount code."
            ctaEs="Quiero cumplir con e-CF"
            ctaEn="I want to comply with e-CF"
          />
        </section>
      </div>
    </>
  )
}
