'use client'

import { useEffect } from 'react'
import { Check, MessageCircle, Globe } from 'lucide-react'
import { useLanguage } from '~/lib/i18n'
import type { Feature } from '~/lib/products'
import { FeatureCard } from '~/components/FeatureCard'
import { LeadForm } from '../ofertas/LeadForm'

// Real capabilities of XoulTec Nómina (from products.ts: multi-country RD+USA,
// configurable tax engine, severance, deductions, multi-currency).
const nominaFeatures: Feature[] = [
  {
    icon: 'Globe',
    titleEs: 'Multi-país: RD + USA',
    titleEn: 'Multi-country: DR + USA',
    descEs: 'Un solo sistema para procesar nómina en República Dominicana y Estados Unidos, con las reglas de cada país.',
    descEn: 'One system to run payroll in the Dominican Republic and the United States, with each country’s rules.',
    highlight: true,
    badge: 'RD + USA',
  },
  {
    icon: 'Calculator',
    titleEs: 'Impuestos automáticos',
    titleEn: 'Automatic taxes',
    descEs: 'ISR, TSS e INFOTEP para RD; Federal, State y FICA para USA. Escalas y tramos configurables, sin hojas de cálculo.',
    descEn: 'ISR, TSS and INFOTEP for DR; Federal, State and FICA for USA. Configurable scales and brackets, no spreadsheets.',
  },
  {
    icon: 'UserMinus',
    titleEs: 'Liquidaciones y prestaciones',
    titleEn: 'Severance & benefits',
    descEs: 'Reglas de liquidación configurables. Cálculo automático según tiempo de servicio y país.',
    descEn: 'Configurable severance rules. Automatic calculation based on tenure and country.',
  },
  {
    icon: 'Users',
    titleEs: 'Gestión de empleados',
    titleEn: 'Employee management',
    descEs: 'Departamentos, posiciones, historial salarial y documentos. Importación masiva de empleados.',
    descEn: 'Departments, positions, salary history and documents. Bulk employee import.',
  },
  {
    icon: 'FileMinus',
    titleEs: 'Deducciones flexibles',
    titleEn: 'Flexible deductions',
    descEs: 'Préstamos, seguros, aportes voluntarios y más. Cálculo automático en cada nómina.',
    descEn: 'Loans, insurance, voluntary contributions and more. Automatic calculation each payroll.',
  },
  {
    icon: 'Banknote',
    titleEs: 'Multi-moneda (DOP / USD)',
    titleEn: 'Multi-currency (DOP / USD)',
    descEs: 'Soporte completo para Peso Dominicano y Dólar, con formato regional automático.',
    descEn: 'Full support for Dominican Peso and US Dollar, with automatic regional formatting.',
  },
]

function CompareRow({ label, others, xoul }: { label: string; others: string; xoul: string }) {
  return (
    <div className="grid grid-cols-3 gap-2 px-4 py-3 border-t border-gray-100 text-sm">
      <div className="font-medium text-dark">{label}</div>
      <div className="text-gray-500">{others}</div>
      <div className="flex items-start gap-1.5 font-medium text-emerald-700">
        <Check className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" />
        <span>{xoul}</span>
      </div>
    </div>
  )
}

export function NominaLanding() {
  const { t, lang, toggleLanguage } = useLanguage()

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
        <span className="inline-flex items-center gap-2 bg-accent/20 text-accent font-semibold text-xs px-3 py-1 rounded-full mb-4">
          <Globe className="w-4 h-4" />
          {t('Nómina para RD y USA', 'Payroll for DR and USA')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 max-w-3xl mx-auto leading-tight">
          {t(
            'Tu nómina lista en minutos — RD y USA en un solo sistema',
            'Your payroll ready in minutes — DR and USA in one system',
          )}
        </h1>
        <p className="text-white font-semibold text-lg max-w-2xl mx-auto mb-3">
          {t(
            'Cálculo automático de ISR, TSS e INFOTEP. Sin errores, sin hojas de cálculo.',
            'Automatic ISR, TSS and INFOTEP calculation. No errors, no spreadsheets.',
          )}
        </p>
        <p className="text-white/80 max-w-2xl mx-auto mb-8">
          {t(
            'Procesa la nómina de tu empresa con las reglas fiscales de cada país. Liquidaciones, deducciones y reportes, listos.',
            'Run your company payroll with each country’s tax rules. Severance, deductions and reports, ready to go.',
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
      </section>

      <div className="max-w-5xl mx-auto px-4 py-14 space-y-16">
        {/* Pricing — simple, linear, no tiers */}
        <section>
          <h2 className="text-2xl font-bold text-dark text-center mb-8">
            {t('Precio simple y predecible', 'Simple, predictable pricing')}
          </h2>
          <div className="max-w-md mx-auto">
            <div className="pricing-card bg-white rounded-2xl p-8 shadow-md border-2 border-secondary text-center">
              <h3 className="font-bold text-lg text-dark">{t('XoulTec Nómina', 'XoulTec Payroll')}</h3>
              <div className="mt-4 mb-2">
                <span className="text-4xl font-extrabold text-dark">US$4</span>
                <span className="text-gray-500 text-sm"> /{t('empleado · mes', 'employee · mo')}</span>
              </div>
              <p className="text-gray-600 text-sm mb-5">
                {t('Sin cuota base. Pagas solo por tus empleados.', 'No base fee. You pay only for your employees.')}
              </p>
              <ul className="space-y-2 text-sm text-gray-700 text-left max-w-xs mx-auto">
                {[
                  t('Cálculo automático ISR, TSS, INFOTEP', 'Automatic ISR, TSS, INFOTEP'),
                  t('Liquidaciones y prestaciones', 'Severance & benefits'),
                  t('Nómina RD + USA', 'DR + USA payroll'),
                  t('Multi-moneda (DOP / USD)', 'Multi-currency (DOP / USD)'),
                  t('Soporte local', 'Local support'),
                ].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-center text-gray-500 text-sm mt-5">
              {t(
                'Precio lineal: pagas por los empleados que tienes, sin tiers ni saltos de plan al crecer.',
                'Linear pricing: you pay for the employees you have, with no tiers or plan jumps as you grow.',
              )}
            </p>
          </div>
        </section>

        {/* Why XoulTec Nómina — capability differentiators (not price) */}
        <section>
          <h2 className="text-2xl font-bold text-dark text-center mb-2">
            {t('Lo que otros (solo RD) no hacen', 'What RD-only systems can’t do')}
          </h2>
          <p className="text-gray-600 text-center text-sm max-w-2xl mx-auto mb-8">
            {t(
              'Si operas en RD y USA, o pagas en dos monedas, un solo sistema lo resuelve.',
              'If you operate in DR and USA, or pay in two currencies, one system handles it.',
            )}
          </p>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden max-w-3xl mx-auto">
            <div className="grid grid-cols-3 gap-2 px-4 py-3 bg-gray-50 text-xs font-bold uppercase tracking-wide text-gray-500">
              <div></div>
              <div>{t('Nómina solo RD', 'RD-only payroll')}</div>
              <div className="text-primary">XoulTec Nómina</div>
            </div>
            <CompareRow
              label={t('Países', 'Countries')}
              others={t('Solo RD', 'DR only')}
              xoul={t('RD + USA', 'DR + USA')}
            />
            <CompareRow
              label={t('Nómina en USA', 'USA payroll')}
              others={t('No', 'No')}
              xoul={t('Federal, State y FICA', 'Federal, State and FICA')}
            />
            <CompareRow
              label={t('Multi-moneda', 'Multi-currency')}
              others={t('No', 'No')}
              xoul={t('DOP y USD', 'DOP and USD')}
            />
            <CompareRow
              label={t('Motor fiscal', 'Tax engine')}
              others={t('Fijo por país', 'Fixed per country')}
              xoul={t('Configurable, agrega países', 'Configurable, add countries')}
            />
          </div>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-2xl font-bold text-dark text-center mb-8">
            {t('Todo lo que tu nómina necesita', 'Everything your payroll needs')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {nominaFeatures.map(f => (
              <FeatureCard key={f.titleEs} feature={f} color="amber" />
            ))}
          </div>
        </section>

        {/* Ecosystem cross-sell — ride the PVenta / e-CF wave */}
        <section>
          <div className="max-w-3xl mx-auto bg-primary/5 border border-primary/20 rounded-2xl px-6 py-5 flex items-start gap-3 text-center sm:text-left">
            <Globe className="w-7 h-7 text-primary shrink-0 hidden sm:block" />
            <p className="text-sm text-dark">
              <b>{t('¿Ya facturas con PVenta?', 'Already invoicing with PVenta?')}</b>{' '}
              {t(
                'Suma tu nómina con el mismo proveedor: facturación e-CF, operación y nómina en un solo lugar, con un solo soporte.',
                'Add payroll with the same provider: e-CF invoicing, operations and payroll in one place, with a single support team.',
              )}
            </p>
          </div>
        </section>

        {/* Lead form */}
        <section id="registro" className="max-w-xl mx-auto scroll-mt-20">
          <LeadForm
            defaultSource="nomina_campaign"
            defaultProducto="nomina"
            titleEs="Solicita tu demo de Nómina"
            titleEn="Request your Payroll demo"
            subtitleEs="Déjanos tus datos y te contactamos para mostrarte XoulTec Nómina y darte un código de descuento."
            subtitleEn="Leave your details and we’ll reach out to show you XoulTec Payroll and give you a discount code."
            ctaEs="Quiero simplificar mi nómina"
            ctaEn="I want to simplify my payroll"
          />
        </section>
      </div>
    </>
  )
}
