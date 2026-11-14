'use client'

import { useEffect, type ReactNode } from 'react'
import { Check, Clock, LifeBuoy, Mail, MessageCircle } from 'lucide-react'
import { useLanguage } from '~/lib/i18n'

// Alcance del soporte de PVenta: la versión para clientes del documento aprobado por el
// dueño ("Versión para clientes (web)"). El español va PALABRA POR PALABRA como está en
// el documento: no reescribir, acortar ni agregar promesas aquí sin que cambie el
// documento primero. El inglés es su traducción.

// Fecha desde la que rige este alcance (AAAA-MM-DD). Con null, la frase "Vigente desde…"
// no se muestra y el resto de la introducción queda igual.
export const EFFECTIVE_DATE: string | null = '2026-11-14'

const MONTHS_ES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// Formato a mano (sin Intl ni Date) para que servidor y navegador den siempre el mismo
// texto, sin desfases de zona horaria.
function effectiveSentence(iso: string, lang: 'es' | 'en'): string {
  const [y, m, d] = iso.split('-').map(Number)
  return lang === 'es'
    ? `Vigente desde el ${d} de ${MONTHS_ES[m - 1]} de ${y}.`
    : `Effective ${MONTHS_EN[m - 1]} ${d}, ${y}.`
}

const WA_URL = 'https://wa.me/18092524007'
const WA_URL_US = 'https://wa.me/19134136583'
const SUPPORT_EMAIL = 'support@xoultec.com'

// Los dos números de WhatsApp del Help Desk: 809 (RD) y 913 (EE. UU.).
function WaLink() {
  const cls = 'font-semibold text-primary underline underline-offset-2 hover:text-secondary'
  return (
    <>
      <a href={WA_URL} target="_blank" rel="noopener noreferrer" className={cls}>
        809-252-4007
      </a>{' '}
      (RD) ·{' '}
      <a href={WA_URL_US} target="_blank" rel="noopener noreferrer" className={cls}>
        +1 913-413-6583
      </a>{' '}
      (USA)
    </>
  )
}

function MailLink() {
  return (
    <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-primary underline underline-offset-2 hover:text-secondary">
      {SUPPORT_EMAIL}
    </a>
  )
}

function SectionLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="text-primary underline underline-offset-2 hover:text-secondary">
      {children}
    </a>
  )
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32">
      <h2 className="text-2xl font-bold text-dark mb-4">{title}</h2>
      <div className="space-y-4 text-gray-700 leading-relaxed">{children}</div>
    </section>
  )
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <Check className="w-4 h-4 mt-1 shrink-0 text-emerald-600" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

// Tabla con scroll horizontal DENTRO de su caja: en el celular la página no se desborda.
function Table({
  head,
  rows,
  firstColBold = false,
  wide = false,
}: {
  head: ReactNode[]
  rows: ReactNode[][]
  firstColBold?: boolean
  wide?: boolean
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
      <table className={`w-full text-sm text-left ${wide ? 'min-w-[44rem]' : ''}`}>
        <thead className="bg-primary text-white">
          <tr>
            {head.map((h, i) => (
              <th key={i} scope="col" className="px-4 py-3 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row, r) => (
            <tr key={r} className="even:bg-gray-50">
              {row.map((cell, c) =>
                c === 0 ? (
                  <th key={c} scope="row" className={`px-4 py-3 text-dark align-top ${firstColBold ? 'font-semibold' : 'font-medium'}`}>
                    {cell}
                  </th>
                ) : (
                  <td key={c} className="px-4 py-3 align-top">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function SoportePVentaLanding() {
  const { t, lang, toggleLanguage } = useLanguage()

  useEffect(() => {
    const qp = new URLSearchParams(window.location.search).get('lang')
    if (qp === 'en' && lang === 'es') toggleLanguage()
    if (qp === 'es' && lang === 'en') toggleLanguage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const yes = (
    <span className="inline-flex text-emerald-600">
      <Check className="w-5 h-5" aria-hidden="true" />
      <span className="sr-only">{t('Incluido', 'Included')}</span>
    </span>
  )
  const no = <span className="text-gray-300" aria-hidden="true">–</span>
  const b = (s: string) => <b className="text-dark">{s}</b>

  const unlimited = t('Sin límite', 'Unlimited')
  const hours = t(
    'Lunes a viernes, 8:00 a. m. a 6:00 p. m.; sábados, 8:00 a. m. a 2:00 p. m.',
    'Monday to Friday, 8:00 a.m. to 6:00 p.m.; Saturdays, 8:00 a.m. to 2:00 p.m.',
  )
  // El 913 y los teléfonos de WhatsApp están en hora Central de EE. UU. En invierno (CST) es RD − 2 h;
  // del 8-mar al 1-nov (CDT) es RD − 1 h, por eso la nota de abajo.
  const hoursCT = t(
    'Lunes a viernes, 6:00 a. m. a 4:00 p. m.; sábados, 6:00 a. m. a 12:00 p. m.',
    'Monday to Friday, 6:00 a.m. to 4:00 p.m.; Saturdays, 6:00 a.m. to 12:00 p.m.',
  )
  const toContact = <SectionLink href="#horario">{t('ver Horario y canales de contacto', 'see Hours and contact channels')}</SectionLink>
  const toServices = <SectionLink href="#servicios-adicionales">{t('ver Servicios adicionales', 'see Additional services')}</SectionLink>

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient text-white px-4 pt-24 pb-14 text-center">
        <span className="inline-flex items-center gap-2 bg-accent/20 text-accent font-semibold text-xs px-3 py-1 rounded-full mb-4">
          <LifeBuoy className="w-4 h-4" />
          PVenta
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 max-w-3xl mx-auto leading-tight">
          {t('Alcance del soporte de PVenta', 'PVenta support scope')}
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto">
          {EFFECTIVE_DATE && <>{effectiveSentence(EFFECTIVE_DATE, lang)} </>}
          {t(
            'Esta página explica qué cubre el soporte incluido en su plan de PVenta y qué se ofrece como servicio aparte.',
            'This page explains what the support included in your PVenta plan covers and what is offered as a separate service.',
          )}
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-14 space-y-14">
        {/* Planes */}
        <Section id="planes" title={t('Elija el plan que le conviene', 'Choose the plan that suits you')}>
          <p>
            {t(
              'Cada plan incluye sus módulos y sus horas de acompañamiento. Puede cambiar a un plan mayor cuando quiera, sin perder sus datos.',
              'Each plan includes its own modules and guided support hours. You can move up to a larger plan whenever you like, without losing your data.',
            )}
          </p>
          <Table
            wide
            head={[
              <span key="x" className="sr-only">{t('Plan', 'Plan')}</span>,
              t('Emprendedor', 'Starter'),
              t('Comercial', 'Commercial'),
              t('Todo Incluido', 'All Included'),
              'Enterprise',
            ]}
            rows={[
              [b(t('Precio al mes', 'Price per month')), 'US$19', 'US$59', 'US$125', t('Desde US$249', 'From US$249')],
              [b(t('Usuarios', 'Users')), '1', '3', t('3 incluidos (+US$4 c/u, hasta 8)', '3 included (+US$4 each, up to 8)'), t('Ilimitados', 'Unlimited')],
              [
                b(t('Ideal para', 'Ideal for')),
                t('Solo facturar', 'Invoicing only'),
                t('Vender, cobrar y llevar inventario', 'Selling, collecting payments and keeping inventory'),
                t('Llevar toda la empresa en PVenta', 'Running the whole company in PVenta'),
                t('Varias sucursales o alto volumen', 'Multiple branches or high volume'),
              ],
              [t('Facturación electrónica e-CF', 'e-CF electronic invoicing'), yes, yes, yes, yes],
              [t('Ventas, clientes y productos', 'Sales, customers and products'), yes, yes, yes, yes],
              [t('Cotizaciones, cobros y cuentas por cobrar', 'Quotations, collections and accounts receivable'), no, yes, yes, yes],
              [t('Cajas y punto de venta (POS)', 'Cash registers and point of sale (POS)'), no, yes, yes, yes],
              [t('Inventario', 'Inventory'), no, t('1 bodega', '1 warehouse'), t('Hasta 3 bodegas', 'Up to 3 warehouses'), t('Ilimitado', 'Unlimited')],
              [t('Vendedores, comisiones y app móvil', 'Sales reps, commissions and mobile app'), no, yes, yes, yes],
              [t('Cuentas por pagar y compras', 'Accounts payable and purchasing'), no, no, yes, yes],
              [t('Bancos y conciliación', 'Banking and reconciliation'), no, no, yes, yes],
              [t('Contabilidad general', 'General accounting'), no, no, yes, yes],
              [t('Varias sucursales', 'Multiple branches'), no, no, no, yes],
              [b(t('Preguntas cortas por chat', 'Short questions via chat')), unlimited, unlimited, unlimited, unlimited],
              [b(t('Acompañamiento al mes', 'Guided support per month')), '1 h', '2 h', '3 h', '8 h'],
              [b(t('Capacitación inicial', 'Initial training')), '1 h', '3 h', '6 h', t('A medida', 'Tailored')],
              [
                b(t('Atención', 'Service level')),
                t('Normal', 'Standard'),
                t('Normal', 'Standard'),
                t('Prioritaria', 'Priority'),
                t('Contacto dedicado', 'Dedicated contact'),
              ],
            ]}
          />
          <p>
            {b(t('La app de vendedores', 'The sales rep app'))}{' '}
            {t(
              'viene incluida desde el plan Comercial: sus vendedores atienden clientes, cotizan, toman pedidos, facturan, cobran y llevan su ruta desde el celular.',
              'is included starting with the Commercial plan: your sales reps serve customers, prepare quotes, take orders, invoice, collect payments and manage their route from their phone.',
            )}
          </p>

          <p>{b(t('Opcionales, en cualquier plan:', 'Optional add-ons, on any plan:'))}</p>
          <Table
            head={[t('Opcional', 'Add-on'), t('Qué hace', 'What it does'), t('Costo', 'Cost')]}
            firstColBold
            rows={[
              [
                t('Agente de Marketing', 'Marketing Agent'),
                t(
                  'Escribe a sus clientes, sugiere a quién llamar y da seguimiento a prospectos',
                  'Writes to your customers, suggests whom to call and follows up on prospects',
                ),
                t(
                  'Por uso, con crédito prepagado que usted recarga y ve en pantalla',
                  'Pay per use, with prepaid credit that you top up and can see on screen',
                ),
              ],
              [
                t('Mapa GPS de vendedores', 'Sales rep GPS map'),
                t('Recorrido y ubicación de su equipo en un mapa', "Your team's routes and locations on a map"),
                t('US$40 al mes', 'US$40 per month'),
              ],
            ]}
          />

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <p className="font-semibold text-dark mb-3">{t('En todos los planes:', 'On all plans:')}</p>
            <Bullets
              items={[
                <>
                  {b(t('Fallas del sistema:', 'System failures:'))}{' '}
                  {t(
                    'se corrigen sin costo y sin límite. Nuestro equipo revisa cada caso y le confirma si es una falla del sistema o una consulta de uso.',
                    'fixed at no cost and without limit. Our team reviews each case and confirms whether it is a system failure or a usage question.',
                  )}
                </>,
                <>
                  {b(t('Actualizaciones y DGII:', 'Updates and DGII:'))}{' '}
                  {t(
                    'PVenta se mantiene al día, incluida la facturación electrónica y los cambios que exija la DGII.',
                    'PVenta is kept up to date, including electronic invoicing and the changes required by the DGII.',
                  )}
                </>,
                <>
                  {b(t('Preguntas cortas', 'Short questions'))}{' '}
                  {t(
                    '(menos de 10 minutos, como "¿dónde anulo una factura?") no descuentan horas. Las horas de acompañamiento son para sesiones guiadas: enseñarle un proceso paso a paso o revisar un caso con usted.',
                    '(under 10 minutes, such as "where do I void an invoice?") do not use up hours. Guided support hours are for guided sessions: teaching you a process step by step or reviewing a case with you.',
                  )}
                </>,
                <>
                  {b(t('Manuales en línea y Help Desk:', 'Online manuals and Help Desk:'))}{' '}
                  {t(
                    'los manuales están dentro del mismo PVenta, en la opción Ayuda, disponibles en todo momento. Si necesita más, nuestro Help Desk le atiende por WhatsApp, tickets o correo',
                    'the manuals are built into PVenta itself, under the Help option, available at all times. If you need more, our Help Desk assists you by WhatsApp, tickets or email',
                  )}{' '}
                  ({toContact}).
                </>,
              ]}
            />
          </div>
        </Section>

        {/* Qué no incluye */}
        <Section id="no-incluye" title={t('Qué no incluye', 'What is not included')}>
          <p>
            {t(
              'Algunas tareas son propias de su empresa o de su contador, aunque se hagan dentro de PVenta. No están en la mensualidad, pero podemos hacerlas como servicio aparte.',
              'Some tasks belong to your company or your accountant, even when they are done inside PVenta. They are not part of the monthly fee, but we can do them as a separate service.',
            )}
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              {t(
                'Hacer el trabajo diario de su empresa en el sistema: crear productos, registrar asientos, corregir registros, cargar datos o hacer cuadres.',
                "Doing your company's day-to-day work in the system: creating products, recording journal entries, correcting records, loading data or balancing accounts.",
              )}
            </li>
            <li>{t('Enseñar contabilidad, impuestos o costos.', 'Teaching accounting, taxes or costing.')}</li>
            <li>{t('Revisar hojas de cálculo o archivos que no son de PVenta.', 'Reviewing spreadsheets or files that are not from PVenta.')}</li>
            <li>{t('Capacitar a cada empleado nuevo que entre a su empresa.', 'Training every new employee who joins your company.')}</li>
            <li>
              {t(
                'Equipos, redes, impresoras y Windows. Esto lo atiende nuestro Departamento de Ingeniería, con su propia tarifa.',
                'Computers, networks, printers and Windows. These are handled by our Engineering Department, at its own rate.',
              )}
            </li>
          </ul>
          <p className="bg-secondary/10 border border-secondary/30 rounded-xl px-4 py-3">
            {t(
              'Una forma fácil de saberlo: si la pregunta es "¿dónde se hace esto en PVenta?", está incluida. Si es "¿cómo se contabiliza?" o "¿me lo hacen?", es un servicio aparte.',
              'An easy way to tell: if the question is "where do I do this in PVenta?", it is included. If it is "how is this accounted for?" or "can you do it for me?", it is a separate service.',
            )}
          </p>
        </Section>

        {/* Asesoría */}
        <Section id="asesoria" title={t('Asesoría financiera y contable', 'Financial and accounting advisory')}>
          <p>
            {t(
              'XoulTec ofrece asesoría financiera y contable como un servicio aparte. No forma parte de ningún plan de software y se contrata por separado.',
              'XoulTec offers financial and accounting advisory as a separate service. It is not part of any software plan and is contracted separately.',
            )}
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t('El soporte de su plan le muestra cómo registrar algo en PVenta.', "Your plan's support shows you how to record something in PVenta.")}</li>
            <li>
              {t(
                'Decidir cómo se contabiliza, qué cuenta usar o cuánto impuesto corresponde lo hace su contador, o nuestro servicio de Asesoría Financiera si usted lo contrata.',
                'Deciding how something is accounted for, which account to use or how much tax applies is done by your accountant, or by our Financial Advisory service if you hire it.',
              )}
            </li>
            <li>
              {t(
                'Su empresa es responsable de sus registros, declaraciones y pagos de impuestos.',
                'Your company is responsible for its records, tax returns and tax payments.',
              )}
            </li>
          </ul>
          <p>
            {t('¿Le interesa? Escríbanos y le enviamos una cotización: WhatsApp', 'Interested? Write to us and we will send you a quote: WhatsApp')} <WaLink />.
          </p>
        </Section>

        {/* Servicios adicionales */}
        <Section id="servicios-adicionales" title={t('Servicios adicionales', 'Additional services')}>
          <p>
            {t(
              'Antes de empezar cualquier servicio con costo, le enviamos el precio y esperamos su aprobación por escrito.',
              'Before starting any paid service, we send you the price and wait for your written approval.',
            )}
          </p>
          <Table
            head={[t('Servicio', 'Service'), t('Precio', 'Price')]}
            rows={[
              [
                t('Acompañamiento o capacitación adicional (usuarios nuevos, repasos)', 'Additional guided support or training (new users, refreshers)'),
                t('US$25 por hora', 'US$25 per hour'),
              ],
              [t('Asesoría financiera y contable', 'Financial and accounting advisory'), t('Según cotización', 'By quote')],
              [t('Carga o limpieza de datos (productos, clientes, catálogo)', 'Data loading or cleanup (products, customers, catalog)'), t('Según cantidad', 'Based on volume')],
              [t('Puesta en marcha de contabilidad o inventario', 'Accounting or inventory setup'), t('Según cotización', 'By quote')],
              [
                t('Corrección de registros que el sistema no permite revertir', 'Correcting records that the system does not allow to be reversed'),
                t('US$25 por caso (hasta 1 hora)', 'US$25 per case (up to 1 hour)'),
              ],
              [t('Atención fuera de horario (Aplicaciones o Ingeniería)', 'After-hours service (Applications or Engineering)'), t('US$75 por hora', 'US$75 per hour')],
              [t('Departamento de Ingeniería (equipos y redes)', 'Engineering Department (computers and networks)'), t('Según tarifa de Ingeniería', 'At Engineering rates')],
            ]}
          />
          <p>
            {t('Si necesita acompañamiento con frecuencia, le conviene un', 'If you need guided support often, a')}{' '}
            {b(t('paquete de horas prepagado', 'prepaid hour package'))}
            {t(
              ', que sale más barato que la hora suelta y vence a los 12 meses:',
              ' is a better fit: it costs less than individual hours and expires after 12 months:',
            )}
          </p>
          <Table
            head={[t('Paquete', 'Package'), t('Precio', 'Price'), t('Ahorro', 'Savings')]}
            firstColBold
            rows={[
              [t('5 horas', '5 hours'), 'US$110', '12%'],
              [t('10 horas', '10 hours'), 'US$200', '20%'],
              [t('25 horas', '25 hours'), 'US$450', '28%'],
            ]}
          />
        </Section>

        {/* Personas de contacto */}
        <Section id="personas-de-contacto" title={t('Personas de contacto', 'Contact persons')}>
          <p>
            {t(
              'Cada empresa nombra hasta 2 personas de contacto. El soporte incluido en su plan se da a estas personas.',
              'Each company appoints up to 2 contact persons. The support included in your plan is provided to these people.',
            )}
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t('Ellas reciben la capacitación inicial y son quienes escriben a soporte.', 'They receive the initial training and are the ones who contact support.')}</li>
            <li>
              {t(
                'Cuando entra un empleado nuevo, lo entrena su persona de contacto. Si prefiere que lo entrenemos nosotros, es una sesión con costo.',
                'When a new employee joins, your contact person trains them. If you would rather we train them, it is a paid session.',
              )}
            </li>
            <li>{t('Puede cambiar sus personas de contacto avisándonos por escrito.', 'You can change your contact persons by notifying us in writing.')}</li>
            <li>{t('Las fallas del sistema las puede reportar cualquier persona de su empresa.', 'System failures can be reported by anyone in your company.')}</li>
          </ul>
        </Section>

        {/* Sesiones con costo */}
        <Section id="sesiones" title={t('Sesiones con costo', 'Paid sessions')}>
          <p>{t('Las sesiones de capacitación o asesoría se agendan como una cita.', 'Training or advisory sessions are scheduled as an appointment.')}</p>
          <ol className="space-y-3">
            {[
              t(
                'Usted nos dice qué necesita. Le enviamos el tema, la duración estimada y el precio.',
                'You tell us what you need. We send you the topic, the estimated duration and the price.',
              ),
              t('Empezamos cuando usted lo aprueba por escrito.', 'We start once you approve it in writing.'),
              t(
                'Se cobra por bloques de 30 minutos. Si la sesión necesita más tiempo, le avisamos antes de pasarnos.',
                'Billing is in 30-minute blocks. If the session needs more time, we let you know before going over.',
              ),
              t(
                'Puede cancelar o mover la sesión sin costo avisando con 24 horas de anticipación. Si no se presenta y no avisa, se cobra la mitad del tiempo agendado.',
                'You can cancel or reschedule the session at no cost by letting us know 24 hours in advance. If you do not show up and do not let us know, half of the scheduled time is charged.',
              ),
              t(
                'Al terminar le enviamos un resumen de lo visto, para que pueda usarlo con su equipo.',
                'When we finish, we send you a summary of what was covered, so you can use it with your team.',
              ),
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="inline-flex w-7 h-7 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </Section>

        {/* Horario y canales */}
        <Section id="horario" title={t('Horario y canales de contacto', 'Hours and contact channels')}>
          <Table
            head={[
              t('Departamento', 'Department'),
              t('Horario (hora de República Dominicana)', 'Hours (Dominican Republic time)'),
              t('Horario (hora Central de EE. UU.)', 'Hours (US Central Time)'),
            ]}
            rows={[
              [t('Soporte de Aplicaciones', 'Applications Support'), hours, hoursCT],
              [t('Departamento de Ingeniería (equipos, redes, servidores)', 'Engineering Department (computers, networks, servers)'), hours, hoursCT],
            ]}
          />
          <p className="text-xs text-gray-500">
            {t(
              'Del segundo domingo de marzo al primer domingo de noviembre (horario de verano en EE. UU.), la hora Central es 1 hora menos que RD: lunes a viernes 7:00 a. m. a 5:00 p. m. y sábados 7:00 a. m. a 1:00 p. m.',
              'From the second Sunday in March to the first Sunday in November (US daylight saving time), Central Time is 1 hour behind the DR: Monday to Friday 7:00 a.m. to 5:00 p.m. and Saturdays 7:00 a.m. to 1:00 p.m.',
            )}
          </p>
          <p>
            {t(
              'Fuera de este horario también le atendemos, con un cargo adicional por hora',
              'We also assist you outside these hours, with an additional hourly charge',
            )}{' '}
            ({toServices}). {t('Esto aplica a los dos departamentos.', 'This applies to both departments.')}
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <MessageCircle className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
              <span>
                {b('WhatsApp:')} <WaLink />
              </span>
            </li>
            <li className="flex items-start gap-2">
              <LifeBuoy className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
              <span>
                {b(t('Tickets de soporte:', 'Support tickets:'))}{' '}
                {t(
                  'desde PVenta, con el botón Soporte que está abajo a la derecha en todas las pantallas. Puede adjuntar una captura de la pantalla.',
                  'from PVenta, using the Support button at the bottom right of every screen. You can attach a screenshot.',
                )}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
              <span>
                {b(t('Correo:', 'Email:'))} <MailLink />
              </span>
            </li>
          </ul>
          <p className="inline-flex items-start gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3">
            <Clock className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
            <span>
              {t(
                'Al llegar al 80% de sus horas de acompañamiento del mes, le avisamos para que pueda planificar.',
                "When you reach 80% of the month's guided support hours, we let you know so you can plan ahead.",
              )}
            </span>
          </p>
        </Section>

        {/* Compromiso */}
        <Section id="compromiso" title={t('Nuestro compromiso con usted', 'Our commitment to you')}>
          <p>
            {t(
              'Esto es lo que XoulTec le garantiza como proveedor de PVenta, en cualquier plan.',
              'This is what XoulTec guarantees you as the provider of PVenta, on any plan.',
            )}
          </p>
          <p>
            {b(t('Sus datos son suyos.', 'Your data is yours.'))}{' '}
            {t(
              'La información que registra en PVenta pertenece a su empresa. La guardamos de forma confidencial: la ve su personal y, solo cuando usted pide ayuda o hay que corregir una falla, nuestro equipo de soporte. No la usamos para otra cosa ni la compartimos con nadie, salvo lo que la facturación electrónica envía a la DGII o lo que la ley nos obligue a entregar.',
              'The information you record in PVenta belongs to your company. We keep it confidential: it is seen by your staff and, only when you ask for help or a failure needs to be fixed, by our support team. We do not use it for anything else or share it with anyone, except what electronic invoicing sends to the DGII or what the law requires us to hand over.',
            )}
          </p>
          <p>
            {b(t('Respaldos.', 'Backups.'))}{' '}
            {t(
              'Respaldamos sus datos todos los días y guardamos cada copia por 30 días. Si se pierde información por una falla del sistema, la recuperamos sin costo. Si se borró por un error de uso, la recuperación se cotiza antes de hacerla.',
              'We back up your data every day and keep each copy for 30 days. If information is lost because of a system failure, we recover it at no cost. If it was deleted through a usage error, the recovery is quoted before it is done.',
            )}
          </p>
          <p>
            {b(t('Disponibilidad.', 'Availability.'))}{' '}
            {t(
              'PVenta funciona en la nube las 24 horas, con una meta de disponibilidad del 99.5% al mes (como máximo unas 3.6 horas sin servicio en todo el mes). Si una caída es de nuestro lado, la atendemos sin costo y le avisamos. Las actualizaciones se hacen fuera del horario de trabajo y, si alguna va a interrumpir el servicio, le avisamos antes.',
              'PVenta runs in the cloud 24 hours a day, with an availability target of 99.5% per month (at most about 3.6 hours without service in the whole month). If an outage is on our side, we handle it at no cost and let you know. Updates are done outside working hours and, if one is going to interrupt the service, we let you know in advance.',
            )}
          </p>
          <p>
            {b(t('Conexión a internet.', 'Internet connection.'))}{' '}
            {t(
              'PVenta necesita internet para trabajar: sin conexión no se puede facturar ni cobrar. La conexión de su empresa no depende de nosotros y no la podemos garantizar, por eso le pedimos:',
              "PVenta needs internet to work: without a connection you cannot invoice or collect payments. Your company's connection does not depend on us and we cannot guarantee it, so we ask you for:",
            )}
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t('Un servicio de internet estable, de al menos 10 Mbps.', 'A stable internet service of at least 10 Mbps.')}</li>
            <li>
              {t(
                'Una conexión de respaldo para no detener las ventas si se cae la principal: un segundo proveedor o, lo más sencillo, compartir los datos de un celular.',
                "A backup connection so sales do not stop if the main one goes down: a second provider or, most simply, sharing a phone's mobile data.",
              )}
            </li>
            <li>
              {t(
                'Si la intermitencia viene de su internet, de su red o de sus equipos, no la cubre el soporte de PVenta. La atiende nuestro Departamento de Ingeniería, con su tarifa.',
                'If the intermittent connection comes from your internet, your network or your equipment, it is not covered by PVenta support. It is handled by our Engineering Department, at its rate.',
              )}
            </li>
          </ul>
          <p>
            {t(
              'Cuando nos reporte que el sistema no responde, revisamos primero si nuestros servidores estuvieron funcionando y le decimos de qué lado está el problema.',
              'When you report that the system is not responding, we first check whether our servers were working and tell you which side the problem is on.',
            )}
          </p>
          <p>
            {b(t('Si algo falla, cuánto tardamos en atenderle', 'If something fails, how long we take to respond'))}{' '}
            {t('(dentro del horario de soporte):', '(within support hours):')}
          </p>
          <Table
            head={[t('Gravedad', 'Severity'), t('Ejemplo', 'Example'), t('Primera respuesta', 'First response')]}
            firstColBold
            rows={[
              [
                t('Urgente', 'Urgent'),
                t('No puede facturar, cobrar o entrar al sistema', 'You cannot invoice, collect payments or log in to the system'),
                t('Hasta 24 horas', 'Up to 24 hours'),
              ],
              [
                t('Importante', 'Important'),
                t('Un módulo o un reporte falla, pero puede seguir vendiendo', 'A module or a report fails, but you can keep selling'),
                t('Hasta 48 horas', 'Up to 48 hours'),
              ],
              [
                t('Normal', 'Normal'),
                t('Una duda o una mejora que usted propone', 'A question or an improvement you suggest'),
                t('Hasta 48 horas', 'Up to 48 hours'),
              ],
            ]}
          />
          <p>
            {t(
              'Es el plazo máximo; en la práctica, la mayoría de los casos se atienden en el momento.',
              'This is the maximum time; in practice, most cases are handled right away.',
            )}
          </p>
          <p>
            {b(t('Hasta dónde llega nuestra responsabilidad.', 'How far our responsibility goes.'))}{' '}
            {t(
              'Respondemos por el buen funcionamiento de PVenta: si una falla del sistema produce un dato incorrecto, la corregimos sin costo. Su empresa responde por lo que registra, por revisar sus documentos antes de enviarlos y por sus declaraciones y pagos a la DGII. XoulTec no responde por multas, recargos o pérdidas que vengan de datos mal registrados, de un uso distinto al indicado o de decisiones contables.',
              'We are responsible for PVenta working properly: if a system failure produces incorrect data, we correct it at no cost. Your company is responsible for what it records, for reviewing its documents before sending them, and for its tax returns and payments to the DGII. XoulTec is not liable for fines, surcharges or losses arising from incorrectly recorded data, from use other than as indicated, or from accounting decisions.',
            )}
          </p>
          <p>
            {b(t('Si cambia a un plan menor.', 'If you move to a smaller plan.'))}{' '}
            {t(
              'No pierde información. Los módulos que el plan nuevo no incluye quedan cerrados con sus datos guardados, y se abren otra vez si vuelve a un plan que los traiga.',
              'You do not lose any information. The modules the new plan does not include are closed with their data kept, and they open again if you return to a plan that includes them.',
            )}
          </p>
          <p>
            {b(t('Si se atrasa en el pago.', 'If you fall behind on payment.'))}{' '}
            {t(
              'La mensualidad se paga del 1 al 6 de cada mes. Si el pago no se ha recibido al día 6, el acceso al sistema se suspende hasta que se pague. Sus datos no se borran por un atraso.',
              'The monthly fee is paid from the 1st to the 6th of each month. If payment has not been received by the 6th, access to the system is suspended until it is paid. Your data is not deleted because of a late payment.',
            )}
          </p>
          <p>
            {b(t('Si decide dejar PVenta.', 'If you decide to leave PVenta.'))}{' '}
            {t(
              'Le entregamos una copia de sus datos principales (clientes, productos, facturas y cuentas por cobrar) en Excel, dentro de 15 días. Guardamos su información por 90 días después de la baja; luego se elimina.',
              'We give you a copy of your main data (customers, products, invoices and accounts receivable) in Excel, within 15 days. We keep your information for 90 days after cancellation; after that it is deleted.',
            )}
          </p>
          <p>
            {b(t('Cambios de precio.', 'Price changes.'))}{' '}
            {t('Se los avisamos por escrito con 30 días de anticipación.', 'We notify you in writing 30 days in advance.')}
          </p>
        </Section>

        {/* FAQ */}
        <Section id="preguntas-frecuentes" title={t('Preguntas frecuentes', 'Frequently asked questions')}>
          <div className="space-y-3">
            {[
              [
                t('¿Me cobran por reportar un error del sistema?', 'Do you charge me for reporting a system error?'),
                t('No. Las fallas de PVenta se atienden siempre, sin costo y sin límite.', 'No. PVenta failures are always handled, at no cost and without limit.'),
              ],
              [
                t('¿Qué hago si no sé dónde se hace algo en PVenta?', "What do I do if I don't know where to do something in PVenta?"),
                t(
                  'Escríbanos. Las preguntas cortas no tienen límite en ningún plan; si necesita una sesión guiada, usa las horas de acompañamiento de su plan. También puede consultar los manuales en la opción Ayuda, dentro de PVenta.',
                  "Write to us. Short questions are unlimited on every plan; if you need a guided session, it uses your plan's guided support hours. You can also check the manuals under the Help option, inside PVenta.",
                ),
              ],
              [
                t('¿Pueden ayudarme con un asiento contable?', 'Can you help me with a journal entry?'),
                t(
                  'Le mostramos dónde se registra en PVenta. Decidir cómo se contabiliza lo hace su contador, o nuestro servicio de Asesoría Financiera si lo contrata.',
                  'We show you where it is recorded in PVenta. Deciding how it is accounted for is done by your accountant, or by our Financial Advisory service if you hire it.',
                ),
              ],
              [
                t('No tengo contador. ¿Qué hago?', "I don't have an accountant. What should I do?"),
                t(
                  'Puede contratar nuestra Asesoría Financiera y Contable como servicio aparte. Se la cotizamos.',
                  'You can hire our Financial and Accounting Advisory as a separate service. We will send you a quote.',
                ),
              ],
              [
                t('Contraté a una persona nueva. ¿La capacitan?', 'I hired a new person. Will you train them?'),
                t(
                  'La entrena su persona de contacto. Si prefiere que lo hagamos nosotros, es una sesión con costo.',
                  'Your contact person trains them. If you would rather we do it, it is a paid session.',
                ),
              ],
              [
                t('¿Las horas que no uso pasan al mes siguiente?', 'Do the hours I do not use carry over to the next month?'),
                t(
                  'No. Las horas de acompañamiento de cada mes no se acumulan; si necesita más, un paquete prepagado le dura 12 meses.',
                  "No. Each month's guided support hours do not accumulate; if you need more, a prepaid package lasts you 12 months.",
                ),
              ],
              [
                t('¿Por qué tienen estas reglas?', 'Why do you have these rules?'),
                t(
                  'Para que el soporte llegue a tiempo a todos nuestros clientes y la mensualidad se mantenga accesible. El trabajo extra que algunas empresas necesitan se cobra aparte, y así no sube el precio para todos.',
                  'So that support reaches all our customers on time and the monthly fee stays affordable. The extra work some companies need is charged separately, so the price does not go up for everyone.',
                ),
              ],
            ].map(([q, a]) => (
              <div key={q} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
                <p className="font-semibold text-dark">{q}</p>
                <p className="mt-1">{a}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </>
  )
}
