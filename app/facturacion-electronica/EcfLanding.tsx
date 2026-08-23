'use client'

import { useEffect } from 'react'
import { Check, AlertTriangle, MessageCircle, ShieldCheck, FilePlus2, Send, QrCode, Award, Smartphone, Bell, Activity, Megaphone, Headset } from 'lucide-react'
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
    // Esta tarjeta salió un rato: repetía el cintillo del hero palabra por palabra.
    // Vuelve porque el cintillo pasó a ser el Agente de Marketing, así que ya no hay
    // duplicado — y la promesa de que el trámite lo hacemos nosotros no se puede perder.
    // Sin "gratis" ni "sin costo": lo que vende es que lo hacemos, no que no se cobre.
    icon: 'Award',
    titleEs: 'Te dejamos listo ante la DGII',
    titleEn: 'We get you ready with DGII',
    descEs: 'Hacemos por ti todo el proceso de certificación como emisor electrónico ante la DGII. Tú solo gestionas tu firma digital.',
    descEn: 'We handle the entire electronic-issuer certification process before DGII for you. You only manage your own digital signature.',
    highlight: true,
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
        {/* El hero abría por e-CF y "todo tu negocio en un sistema", que es lo que dice
            cualquier ERP. Rubén (23-ago-2026): "lo que ha funcionado es el Agente de
            Marketing, eso es lo que hay que resaltar… ningún ERP tiene eso, probado".
            El e-CF se queda en el h1 porque es la razón por la que la gente llega a esta
            página (Ley 32-23, plazo legal, y es el término por el que se busca), pero la
            promesa pasa a ser el Agente. */}
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 max-w-3xl mx-auto leading-tight">
          {t(
            'Factura e-CF ante la DGII — y un ERP que además sale a trabajar tu cartera',
            'DGII e-CF invoicing — and an ERP that also goes out and works your customer list',
          )}
        </h1>
        <p className="text-white font-semibold text-lg max-w-2xl mx-auto mb-8">
          {t(
            'Cumples con la Ley 32-23 y el sistema no se queda esperando: sale a buscarte la venta.',
            'You comply with Law 32-23 and the system does not sit and wait: it goes out after the sale.',
          )}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#registro"
            className="cta-pulse inline-flex items-center justify-center px-6 py-3 bg-secondary text-white font-bold rounded-xl hover:opacity-90 transition"
          >
            {/* Sin "y descuento" (Rubén, 23-ago-2026): el descuento quedó huérfano al
                retirar la promo, y la página no lo explicaba en ninguna parte. */}
            {t('Solicita tu demo', 'Request your demo')}
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

        {/* Este cintillo llevaba la certificación DGII. Ahora lleva el Agente: es el sitio
            de más peso de la página —justo debajo de los botones— y es lo que diferencia.
            La certificación volvió a la parrilla de capacidades, donde estaba antes de que
            la quitara por duplicada. */}
        <div className="mt-7 max-w-2xl mx-auto inline-flex items-start gap-3 bg-white/10 border border-accent/40 rounded-xl px-5 py-3 text-left">
          <Megaphone className="w-7 h-7 text-accent shrink-0" />
          <p className="text-sm text-white/90">
            {/* Decía "Ningún otro ERP hace esto". Fuera (Rubén, 23-ago-2026): es una
                afirmación comparativa pública, discutible por cualquiera y que habría que
                venir a cambiar el día que un competidor saque algo parecido. La frase
                ahora habla de lo que hace ESTE producto, que es igual de fuerte y no
                depende de lo que hagan los demás. */}
            <b className="text-accent">{t('No solo factura: ', 'It does not just invoice: ')}</b>
            {t(
              'el Agente de Marketing le escribe a cada cliente cuándo le toca reordenar, persigue los cobros vencidos y, cuando hace falta una llamada, arma la cola y dice por qué llamar.',
              'the Marketing Agent writes to each customer when it is time to reorder, chases overdue payments and, when a call is needed, builds the queue and says why to call.',
            )}
          </p>
        </div>
      </section>

      {/* Esta franja era la del plazo de la DGII: obligación, fecha límite y multas de 5 a
          50 salarios mínimos. Fuera (Rubén, 23-ago-2026): "la DGII ha insistido mucho con
          los clientes; lo nuestro es hacerles saber que nuestros productos tienen la
          capacidad para trabajar en eso, pero no dedicarle una franja entera".
          El cliente ya llega asustado — repetirle la amenaza no aporta y gasta el mejor
          sitio de la página en el argumento de otro. La capacidad de e-CF sigue dicha
          donde toca: la insignia de Ley 32-23 en el hero, el h1, y la parrilla completa
          de capacidades más abajo. Esta franja pasa a ser del Agente de Marketing. */}
      <section className="bg-primary/5 border-y border-primary/20 px-4 py-5">
        <p className="max-w-3xl mx-auto text-center text-dark">
          <b>
            {t(
              'Tu cartera es más grande de lo que tus vendedores alcanzan a atender.',
              'Your customer list is bigger than your reps can cover.',
            )}
          </b>{' '}
          <span className="text-gray-600">
            {t(
              'El Agente de Marketing se ocupa de la diferencia.',
              'The Marketing Agent takes care of the difference.',
            )}
          </span>
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-14 space-y-16">
        {/* Pricing */}
        <section>
          <h2 className="text-2xl font-bold text-dark text-center mb-4">
            {t('Precios claros, sin letra chica', 'Clear pricing, no fine print')}
          </h2>
          {/* Aquí vivía el banner "🔥 Promo de lanzamiento: 1 mes gratis. Migra antes
              del 15 de noviembre de 2026." Se quitó el 23-ago-2026: el mes gratis ya se
              probó como incentivo y no dio resultado, así que salió también de /r y de
              /ofertas. Además chocaba con el título de esta misma sección — "Precios
              claros, sin letra chica" y justo debajo una promo con fecha de vencimiento.
              La fecha del 15-nov-2026 que sigue en la página NO es de promoción: es el
              plazo legal de la Ley 32-23, y eso se queda. */}
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
              {/* Iba "PRECIO DE LANZAMIENTO" sobre los US$49. Fuera (Rubén, 23-ago-2026):
                  insinuar que el precio va a subir es el mismo empujón de urgencia que
                  el mes gratis, y esta sección se titula "Precios claros, sin letra chica". */}
              <div className="mt-4 mb-1">
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
          <div className="max-w-3xl mx-auto mt-8 bg-primary/5 border border-primary/20 rounded-2xl px-6 py-5 flex items-start gap-3">
            <Smartphone className="w-7 h-7 text-primary shrink-0 hidden sm:block" />
            <p className="text-sm text-dark">
              {/* Decía solo "toman pedidos y cotizaciones desde el celular", que se
                  queda corto (Rubén, 23-ago-2026). Son 48 pantallas en el móvil
                  (apps/web/src/routes/m.*), agrupadas en vender / cobrar / crecer /
                  cuenta. Lo que se nombra aquí está verificado: m.facturar, m.cobros,
                  m.depositar + "efectivo en la calle", m.inventario-fisico, m.visitar,
                  y m.compra.tsx, que lee la factura de compra DE UNA FOTO y crea la CxP
                  guardando la imagen como respaldo. */}
              {/* Sin "— incluida" (Rubén, 23-ago-2026): misma línea que el mes gratis y
                  el "sin costo" de la DGII — lo que vende es lo que la app hace, no que
                  venga sin cobrar. */}
              <b>{t('App para tu fuerza de ventas.', 'Sales-force app.')}</b>{' '}
              {t(
                'No es solo tomar pedidos: tus vendedores facturan, cobran y depositan el efectivo de la calle, hacen inventario físico, registran la visita y hasta cargan una factura de compra con una foto. Todo desde el celular, sin volver a la oficina.',
                'It is not just taking orders: your reps invoice, collect and deposit street cash, run physical counts, log the visit and even upload a purchase invoice from a photo. All from the phone, without going back to the office.',
              )}
            </p>
          </div>
        </section>

        {/* Agente de Marketing — la punta de lanza (Rubén, 23-ago-2026): es lo que
            diferencia a PVenta de cualquier ERP y no aparecía en esta página.
            Cada afirmación de aquí está verificada contra pventa-repo:
            - reorden predictivo por historial + recordatorio por correo/WhatsApp
              (modules/sales/reorder/service.go, plantilla `reorden_recordatorio`)
            - CxC: recordatorios +7/+15 y estado de cuenta consolidado, uno por
              cliente y no uno por factura (cxcreminder.go, cxcstatement.go:1-8)
            - winback por segmento: dormido / nuevo / con saldo (winback.go:16-42)
            - redes: imagen + texto generados con IA (social.go:424, clave Anthropic)
            - enriquecer: WhatsApp/correo desde la web + validación de RNC (enrich.go)
            ⚠️ DOS LÍMITES A TENER PRESENTES:
            1. Publicación automática: social.go:19-23 todavía dice "manual bridge… No
               platform API is used yet" — hoy genera la pieza y la publica una persona.
               Rubén confirmó el 23-ago-2026 que **eso está en desarrollo**: una vez
               programada la campaña habrá publicación y monitoreo de redes. Por eso el
               texto NO dice "tú les das publicar" (se quedaría corto en cuanto salga)
               pero TAMPOCO dice "publica por ti" (sería falso hoy): dice que tú
               programas la campaña y él genera la pieza, que es cierto en los dos
               estados. Cuando la publicación esté viva, aquí se puede prometer
               publicar y monitorear — y conviene añadirlo, porque es diferencial.
            2. NO va incluido en la mensualidad: se cobra por uso contra un monedero
               de crédito (credit.go). Callarlo en una página titulada "Precios claros,
               sin letra chica" sería crear justo la letra chica que dice no tener. */}
        <section>
          <h2 className="text-2xl font-bold text-dark text-center mb-2">
            {/* Mismo motivo que el cintillo: iba "Y algo que ningún ERP hace". */}
            {t('El Agente de Marketing: tu cartera completa, atendida', 'The Marketing Agent: your whole customer list, handled')}
          </h2>
          <p className="text-gray-600 text-center text-sm mb-6">
            {t(
              'Un vendedor alcanza a llamar a diez clientes al día. El Agente de Marketing los atiende a todos.',
              'A rep can call ten customers a day. The Marketing Agent handles all of them.',
            )}
          </p>

          <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: Bell,
                titulo: t('Sabe cuándo toca reordenar', 'It knows when to reorder'),
                texto: t(
                  'Aprende el ritmo de compra de cada cliente y le recuerda por correo o WhatsApp antes de que se le acabe.',
                  'It learns each customer’s buying rhythm and reminds them by email or WhatsApp before they run out.',
                ),
              },
              {
                icon: MessageCircle,
                titulo: t('Persigue los cobros', 'It chases collections'),
                texto: t(
                  'Recordatorios de facturas vencidas y estado de cuenta consolidado: uno por cliente, no uno por factura.',
                  'Overdue-invoice reminders and a consolidated statement: one per customer, not one per invoice.',
                ),
              },
              {
                icon: Activity,
                titulo: t('Recupera al que dejó de comprar', 'It wins back who stopped buying'),
                texto: t(
                  'Detecta al cliente dormido, al nuevo que nunca compró y al que quedó con saldo, y le escribe según su caso.',
                  'It spots the dormant customer, the new one who never bought and the one left with a balance, and writes to each accordingly.',
                ),
              },
              {
                icon: Megaphone,
                titulo: t('Te arma las piezas para redes con IA', 'It builds your social posts with AI'),
                texto: t(
                  'Programas la campaña y él genera imagen y texto, con tu logo y tu rubro.',
                  'You schedule the campaign and it generates image and caption, with your logo and your industry.',
                ),
              },
            ].map(f => (
              <div key={f.titulo} className="bg-white border border-gray-200 rounded-2xl p-5 flex items-start gap-3">
                <f.icon className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-dark text-sm mb-1">{f.titulo}</h3>
                  <p className="text-gray-600 text-sm">{f.texto}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Call center — verificado en pventa-repo:
              - El Agente levanta la cola y ASIGNA EL CANAL: correo/WhatsApp si puede
                alcanzar al cliente él mismo, teléfono cuando hace falta una persona
                (database/schema.go:1090-1095).
              - `reason` guarda QUÉ señal puso ahí a ese cliente, "so the screen can
                explain the call instead of showing a bare phone list" (schema.go:1094).
              - route_gap_calls: una fila por LLAMADA — quién marcó, cuándo, por qué
                canal y cómo fue (schema.go:1119-1125).
              - Atribución: resulted_invoice / resulted_receipt enlazan la factura y el
                cobro que entraron detrás de la gestión.
              - Marcador por gestora con meta sacada del ritmo real de cada una +10%
                (reports/operatorboard/callcenter.go:16-46).
              ⚠️ La telefonía NO está conectada: `call_ref` y `duration_sec` son ganchos
              para softphone/PBX y hoy quedan vacíos — la gestora marca y registra el
              desenlace a mano (schema.go:1122-1125). NO decir que llama solo. */}
          <div className="max-w-3xl mx-auto mt-6 bg-primary/5 border border-primary/20 rounded-2xl px-6 py-5 flex items-start gap-3">
            <Headset className="w-7 h-7 text-primary shrink-0 hidden sm:block" />
            <div>
              <h3 className="font-bold text-dark text-sm mb-1">
                {t('Y cuando hace falta una llamada, arma la cola', 'And when a call is needed, it builds the queue')}
              </h3>
              <p className="text-sm text-gray-700">
                {t(
                  'No todo se resuelve por correo. Cuando el cliente no tiene WhatsApp ni correo, o el caso pide voz, el Agente lo pasa a la cola del call center — y la pantalla dice por qué hay que llamarlo, no solo el teléfono. Cada intento queda registrado, y la factura o el cobro que entra después queda enlazado a la gestión que lo trajo. El supervisor ve el marcador por gestora, con metas sacadas del ritmo real de cada una.',
                  'Not everything gets solved by email. When the customer has no WhatsApp or email, or the case needs a voice, the Agent moves them into the call-center queue — and the screen says why they must be called, not just the phone number. Every attempt is logged, and the invoice or payment that comes in afterwards is linked to the follow-up that brought it. Supervisors get a per-operator scoreboard, with targets drawn from each person’s real pace.',
                )}
              </p>
            </div>
          </div>

          <p className="max-w-3xl mx-auto mt-5 text-center text-gray-500 text-xs">
            {t(
              'El Agente se activa aparte y se cobra por uso: no va incluido en la mensualidad. Lo enciendes cuando quieras y ves en pantalla lo que consume.',
              'The Agent is activated separately and billed per use: it is not part of the monthly plan. Turn it on whenever you want and watch what it spends on screen.',
            )}
          </p>
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
            <ComparisonRow
              label={t('App móvil de ventas', 'Mobile sales app')}
              alegra={t('App general', 'General app')}
              pventa={t('Para tu fuerza de ventas · incluida', 'For your sales force · included')}
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
            titleEs="Solicita tu demo"
            titleEn="Request your demo"
            subtitleEs="Déjanos tus datos y te contactamos para mostrarte PVenta."
            subtitleEn="Leave your details and we’ll reach out to show you PVenta."
            ctaEs="Quiero cumplir con e-CF"
            ctaEn="I want to comply with e-CF"
          />
        </section>
      </div>
    </>
  )
}
