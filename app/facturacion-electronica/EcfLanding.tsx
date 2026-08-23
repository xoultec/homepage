'use client'

import { useEffect } from 'react'
import { Check, MessageCircle, ShieldCheck, FilePlus2, Send, QrCode, Award, Smartphone, Bell, Activity, Megaphone, Headset, Tag, Globe } from 'lucide-react'
import { useLanguage } from '~/lib/i18n'
import type { Feature } from '~/lib/products'
import { FeatureCard } from '~/components/FeatureCard'
import { LeadForm } from '../ofertas/LeadForm'
// Los números salen de ~/lib/contact y no se escriben a mano: fue por copiarlos que el
// formulario de la portada estuvo dos años apuntando a un número muerto.
import { WA_RD, WA_USA, WA_RD_DISPLAY, WA_USA_DISPLAY, waLink } from '~/lib/contact'
import { WhatsAppIcon } from '~/components/WhatsAppIcon'

// Real, verifiable e-CF capabilities of PVenta (matches the ecf module: 9 doc
// types, DGII signing/submission with polling, security code + QR, sequence
// management, RNC validation, demo mode).
const ecfFeatures: Feature[] = [
  {
    icon: 'FileCheck',
    titleEs: '9 tipos de comprobantes',
    titleEn: '9 e-CF document types',
    descEs: 'Los nueve que exige la DGII, del 31 al 46.',
    descEn: 'All nine DGII types, from 31 to 46.',
  },
  {
    icon: 'Send',
    titleEs: 'Firma y envío a la DGII',
    titleEn: 'Signing & DGII submission',
    descEs: 'Firma digital, envío automático y estado en tiempo real.',
    descEn: 'Digital signature, automatic submission, real-time status.',
  },
  {
    icon: 'QrCode',
    titleEs: 'Código de seguridad + QR',
    titleEn: 'Security code + QR',
    descEs: 'En cada comprobante, listos para imprimir.',
    descEn: 'On every document, ready to print.',
  },
  {
    icon: 'ListOrdered',
    titleEs: 'Secuencias NCF gestionadas',
    titleEn: 'Managed NCF sequences',
    descEs: 'Rangos, alertas de agotamiento y asignación sin duplicados.',
    descEn: 'Ranges, exhaustion alerts and allocation with no duplicates.',
  },
  {
    icon: 'BadgeCheck',
    titleEs: 'Validación de RNC',
    titleEn: 'RNC validation',
    descEs: 'Contra la DGII antes de emitir, para evitar rechazos.',
    descEn: 'Against DGII before issuing, to avoid rejections.',
  },
  {
    // Esta tarjeta salió un rato: repetía el cintillo del hero palabra por palabra.
    // Vuelve porque el cintillo pasó a ser el Agente de Marketing, así que ya no hay
    // duplicado — y la promesa de que el trámite lo hacemos nosotros no se puede perder.
    // Sin "gratis" ni "sin costo": lo que vende es que lo hacemos, no que no se cobre.
    icon: 'Award',
    titleEs: 'Te dejamos listo ante la DGII',
    titleEn: 'We get you ready with DGII',
    descEs: 'Hacemos el trámite completo por ti. Tú solo gestionas tu firma digital.',
    descEn: 'We do the whole process for you. You only manage your digital signature.',
    highlight: true,
  },
  {
    icon: 'FlaskConical',
    titleEs: 'Modo demo para probar',
    titleEn: 'Demo mode to try it',
    descEs: 'Prueba el flujo completo sin enviar nada real a la DGII.',
    descEn: 'Try the whole flow without sending anything real to DGII.',
    highlight: true,
    badge: 'Demo',
  },
]

// La columna de la izquierda se llamaba `alegra`. Nunca se mostró ese nombre —la
// cabecera siempre dijo "Otros"— pero el identificador viaja en el JavaScript que se
// sirve al navegador, así que quien inspeccionara el sitio veía contra quién se armó la
// comparación. Renombrado a `otros` el 23-ago-2026: la tabla compara contra la categoría,
// no contra una empresa con nombre y apellido.
function ComparisonRow({
  label,
  otros,
  pventa,
  pventaGood = true,
}: {
  label: string
  otros: string
  pventa: string
  pventaGood?: boolean
}) {
  return (
    <div className="grid grid-cols-3 gap-2 px-4 py-3 border-t border-gray-100 text-sm">
      <div className="font-medium text-dark">{label}</div>
      <div className="text-gray-500">{otros}</div>
      <div className={`flex items-start gap-1.5 font-medium ${pventaGood ? 'text-emerald-700' : 'text-gray-700'}`}>
        {pventaGood && <Check className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" />}
        <span>{pventa}</span>
      </div>
    </div>
  )
}

export function EcfLanding() {
  const { t, lang, toggleLanguage } = useLanguage()

  // Mensaje que llega ya escrito al abrir WhatsApp desde la franja.
  const waHola = t(
    'Hola XoulTec 👋 Vi lo del Agente de Marketing y me gustaría saber cómo funciona para mi negocio.',
    'Hi XoulTec 👋 I saw the Marketing Agent and I would like to know how it works for my business.',
  )

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
      {/* Alturas del hero, para que nadie las toque a ciegas:
          - `pt-20` (80px) NO es decorativo. El aviso de privacidad + la navbar son fijos y
            ocupan los primeros 104px; el layout solo aporta 40px de `pt-10`. Con menos de
            64px de padding aquí, la primera línea del titular queda DEBAJO de la barra —
            que es exactamente el bug que apareció al bajarlo a `py-10`.
          - `pb-6` es lo que queda de aire abajo tras quitar los botones. */}
      <section className="hero-gradient text-white px-4 pt-20 pb-5 text-center">
        {/* EL HERO ES DEL AGENTE, ENTERO (Rubén, 23-ago-2026): "el Agente de Marketing es
            la estrella" y "no me interesa Factura e-CF ante la DGII, ya eso es cliché".
            Se quitó de aquí:
            - la insignia "Ley 32-23 · Fecha límite 15 de noviembre de 2026" con triángulo
              de advertencia;
            - el h1 "Factura e-CF ante la DGII — y un ERP que además sale a trabajar tu
              cartera", que gastaba su primera mitad en la obligación y colgaba el
              diferenciador de un guion;
            - toda mención de e-CF en el subtítulo.
            Sobre el alcance del Agente, corregido por Rubén el 23-ago-2026: hace las dos
            cosas. Trabaja la cartera que ya existe (recompra, cobros, cola de llamadas)
            **y además arma las campañas de redes sociales**, que sí salen a buscar gente
            nueva (`reorder/social.go` genera imagen y caption para Facebook, Instagram,
            estados de WhatsApp y TikTok). Yo había escrito aquí que "NO prospecta ni
            busca clientes nuevos" y eso es falso — no reducir el Agente a la recompra.
            La capacidad de e-CF sigue dicha donde la busca quien llegó por eso: la lista
            compacta de capacidades técnicas, más abajo. (Los tres pasos "Tú facturas,
            nosotros nos encargamos del resto" se eliminaron por redundantes.) */}
        {/* `max-w-4xl` en vez de 3xl: el titular es largo y con más ancho baja de tres
            líneas a dos, que es alto de franja que se ahorra sin tocar el texto ni el
            tamaño de letra. */}
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 max-w-4xl mx-auto leading-tight">
          {t(
            'Facturar es lo mínimo. El Agente de Marketing hace que tus clientes vuelvan a comprar.',
            'Invoicing is the bare minimum. The Marketing Agent brings your customers back to buy.',
          )}
        </h1>
        {/* Sin `mb-8`: ese margen separaba el subtítulo de los botones, y los botones ya
            no están. Eran 32px de aire vacío al final de la franja. */}
        <p className="text-white font-semibold text-lg max-w-3xl mx-auto">
          {t(
            'Trabaja tu cartera completa y te arma las campañas para traer clientes nuevos.',
            'It works your whole customer list and builds the campaigns that bring new ones.',
          )}
        </p>
        {/* Aquí iban dos botones: "Solicita tu demo" (con animación `cta-pulse`) y "Habla
            con un asesor". Fuera el 23-ago-2026 — "te están haciendo ruido": dos llamados
            compitiendo en el hero, uno de ellos parpadeando, justo encima de la franja que
            es lo que de verdad hay que leer. El visitante no se queda sin salida: la
            navegación tiene "Cotizar" y "Contacto", el formulario está más abajo con su
            propio botón, y el chat flotante acompaña toda la página. */}

        {/* El cintillo del hero se eliminó: repetía al Agente justo encima de la franja.
            Los dos protagonistas —Agente de Marketing y app móvil— viven ahora juntos en
            la PRIMERA franja, para que se vean apenas se entra a la página
            (Rubén, 23-ago-2026). */}
      </section>

      {/* LA PRIMERA FRANJA — los dos protagonistas, visibles al entrar.
          Antes fue la del plazo de la DGII (obligación, fecha límite y multas de 5 a 50
          salarios mínimos); se quitó porque el cliente ya llega asustado y eso gastaba el
          mejor sitio de la página en el argumento de otro. Después fue solo del Agente.
          Ahora lleva Agente + app móvil, que es lo que hay que resaltar.
          El contenido de la app está verificado en pventa-repo: 48 pantallas móviles
          (apps/web/src/routes/m.*) en vender / cobrar / crecer / cuenta — m.facturar,
          m.cobros, m.depositar + "efectivo en la calle", m.inventario-fisico, m.visitar,
          y m.compra.tsx, que lee la factura de compra DE UNA FOTO y crea la CxP. */}
      <section className="bg-primary/5 border-y border-primary/20 px-4 py-4">
        {/* Tercera columna: el contacto (Rubén, 23-ago-2026) — "si deciden contactar, ahí
            tienen de una vez". Los botones grandes salieron del hero por ruidosos, pero
            quien ya se decidió leyendo las dos columnas de al lado no debería tener que
            buscar dónde escribir. Aquí va sin gritar: dos enlaces de WhatsApp. */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-5">
          <div className="flex items-start gap-3">
            <Megaphone className="w-7 h-7 text-primary shrink-0" />
            <p className="text-sm text-dark">
              <b>{t('El Agente de Marketing.', 'The Marketing Agent.')}</b>{' '}
              {t(
                'Avisa cuándo reordenar, persigue los cobros, arma la cola de llamadas y prepara tus campañas de redes.',
                'Tells customers when to reorder, chases payments, builds the call queue and prepares your campaigns.',
              )}
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Smartphone className="w-7 h-7 text-primary shrink-0" />
            <p className="text-sm text-dark">
              <b>{t('App para tu fuerza de ventas.', 'Sales-force app.')}</b>{' '}
              {t(
                'Facturan, cobran y depositan el efectivo de la calle, hacen inventario físico y cargan una factura de compra con una foto.',
                'They invoice, collect and deposit street cash, run counts and upload a purchase invoice from a photo.',
              )}
            </p>
          </div>
          {/* Bandera del país + logo de WhatsApp en cada enlace (Rubén, 23-ago-2026).
              Las banderas van por flagcdn y NO por emoji: en Windows las emoji de bandera
              salen como las dos letras del país ("DO", "US"). Está avisado en CLAUDE.md y
              aun así lo hice con emoji la primera vez — se vio en la captura.
              El icono es el glifo real de WhatsApp (WhatsAppIcon), no el bocadillo
              genérico de lucide, que no trae iconos de marca. */}
          <div className="flex items-start gap-3">
            <WhatsAppIcon className="w-7 h-7 text-green-600 shrink-0" />
            <div className="text-sm text-dark">
              {/* Sin encabezado (Rubén, 23-ago-2026): iba "¿Lo vemos con tus números?
                  Escríbenos y te lo enseñamos." Los botones ya dicen qué son — la bandera,
                  el logo de WhatsApp y el número — y una frase encima solo estorbaba.
                  Botones sólidos y no enlaces de texto: en verde sobre fondo claro "no
                  invitaban a clicar". Un enlace subrayado se lee como referencia; un botón
                  se lee como acción. */}
              <span className="flex flex-col gap-2">
                <a
                  href={waLink(WA_RD, waHola)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white font-bold rounded-lg shadow-sm hover:bg-green-700 transition"
                >
                  <img src="https://flagcdn.com/16x12/do.png" alt="RD" className="shrink-0" />
                  <WhatsAppIcon className="w-4 h-4 shrink-0" />
                  {WA_RD_DISPLAY}
                </a>
                <a
                  href={waLink(WA_USA, waHola)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white font-bold rounded-lg shadow-sm hover:bg-green-700 transition"
                >
                  <img src="https://flagcdn.com/16x12/us.png" alt="USA" className="shrink-0" />
                  <WhatsAppIcon className="w-4 h-4 shrink-0" />
                  {WA_USA_DISPLAY}
                </a>
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 pt-4 pb-8 space-y-8">
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
          {/* Encabezado en UNA línea, para que las seis capacidades entren en pantalla sin
              scroll (Rubén, 23-ago-2026). Iba un h2 —"El Agente de Marketing: tu cartera
              completa, atendida"— más un subtítulo con la frase del vendedor y los diez
              clientes: dos renglones y 84px para nombrar por TERCERA vez al Agente, que ya
              se nombra en el titular y en la franja de arriba.
              La frase que sí aportaba —"un vendedor alcanza a diez clientes al día"— se
              queda, pero incrustada aquí en vez de ocupar su propia línea. */}
          <h2 className="text-lg font-bold text-dark text-center mb-3">
            {t(
              'Un vendedor alcanza a diez clientes al día. El Agente los atiende a todos:',
              'A rep reaches ten customers a day. The Agent handles them all:',
            )}
          </h2>

          {/* 2 filas de 3 en vez de 3 filas de 2 (Rubén, 23-ago-2026): las seis
              capacidades entran de un vistazo y se ahorra una fila entera de scroll.
              En tablet siguen siendo 2 columnas y en móvil una. */}
          {/* En el teléfono: 2 columnas y SOLO el título; la descripción aparece de `sm`
              en adelante. Se probó con descripción en dos columnas y quedaba PEOR que en
              una sola — el texto rompe en columnas de 170px, cada tarjeta se va a nueve o
              diez líneas, no se ahorra alto y encima cuesta leerlo.
              Los seis títulos se explican solos ("Persigue los cobros", "Te dice qué poner
              en oferta"), así que en móvil funcionan como índice: las seis capacidades de
              un vistazo, y el detalle en pantallas más anchas. */}
          <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                icon: Bell,
                titulo: t('Sabe cuándo toca reordenar', 'It knows when to reorder'),
                texto: t(
                  'Aprende su ritmo y le avisa por correo o WhatsApp antes de que se le acabe.',
                  'It learns each customer’s buying rhythm and reminds them by email or WhatsApp before they run out.',
                ),
              },
              {
                icon: MessageCircle,
                titulo: t('Persigue los cobros', 'It chases collections'),
                texto: t(
                  'Estado de cuenta consolidado: uno por cliente, no uno por factura.',
                  'Overdue-invoice reminders and a consolidated statement: one per customer, not one per invoice.',
                ),
              },
              {
                icon: Activity,
                titulo: t('Recupera al que dejó de comprar', 'It wins back who stopped buying'),
                texto: t(
                  'Al dormido, al que nunca compró y al que quedó con saldo, según su caso.',
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
              // Estas dos faltaban: el Agente tiene SEIS pestañas en la consola (clientes,
              // seguimiento, ofertas, redes, completar datos, consumo) y la página solo
              // contaba cuatro capacidades. "Que se lea todo lo del Agente de Marketing,
              // es lo que ha dado resultado" (Rubén, 23-ago-2026).
              // Verificadas en pventa-repo: reorder/offers.go (ofertas de temporada +
              // sugerencias proactivas de qué poner en oferta) y reorder/enrich.go +
              // webenrich.go (busca contacto en la web, valida RNC contra la DGII y
              // comprueba que el correo exista).
              {
                icon: Tag,
                titulo: t('Te dice qué poner en oferta', 'It tells you what to put on sale'),
                texto: t(
                  'Sugiere qué mover según cómo se vende, y arma la oferta de temporada.',
                  'It suggests which products to move based on how they are selling, and builds the seasonal offer.',
                ),
              },
              {
                icon: Globe,
                titulo: t('Completa los datos que faltan', 'It fills in the missing data'),
                texto: t(
                  'Busca en la web el WhatsApp o el correo que te falta, y valida el RNC.',
                  'It finds the customer’s WhatsApp or email on the web, validates the RNC and checks the email actually exists.',
                ),
              },
            ].map(f => (
              <div key={f.titulo} className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
                <f.icon className="w-5 h-5 sm:w-6 sm:h-6 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-dark text-sm sm:mb-1">{f.titulo}</h3>
                  <p className="hidden sm:block text-gray-600 text-sm">{f.texto}</p>
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
          {/* De caja con título propio (110px, tres líneas) a UNA línea, para que el call
              center entre en la misma pantalla que las seis tarjetas (Rubén, 23-ago-2026).
              Se conserva lo único que de verdad diferencia —que la pantalla dice POR QUÉ
              llamar, y que la factura posterior queda enlazada a la gestión— y se suelta el
              rodeo de cuándo pasa a la cola, que se deduce. */}
          <p className="max-w-4xl mx-auto mt-4 flex items-start justify-center gap-2 text-sm text-gray-700">
            <Headset className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <span>
              <b className="text-dark">
                {t('Y si hace falta llamar, arma la cola:', 'And if a call is needed, it builds the queue:')}
              </b>{' '}
              {t(
                'dice por qué hay que llamar a cada cliente —no solo el teléfono—, registra cada intento y enlaza la factura o el cobro que entra después.',
                'it says why each customer must be called — not just the phone number — logs every attempt and links the invoice or payment that follows.',
              )}
            </span>
          </p>

          {/* El aviso de que el Agente se cobra aparte vivía aquí. Se movió a la sección
              de precios (Rubén, 23-ago-2026): al subir esta sección por encima de los
              planes, el lector leía "no va incluido en la mensualidad" antes de saber
              cuál era la mensualidad. Ahora está donde se habla de dinero. */}
        </section>

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
          {/* Este aviso estaba al pie de la sección del Agente, que ahora va ARRIBA de los
              precios: se leía "no va incluido en la mensualidad" antes de saber cuál era la
              mensualidad. Su sitio es aquí, donde se habla de dinero. */}
          <p className="max-w-3xl mx-auto mt-3 text-center text-gray-500 text-xs">
            {t(
              'El Agente de Marketing se activa aparte y se cobra por uso: no va incluido en la mensualidad. Lo enciendes cuando quieras y ves en pantalla lo que consume.',
              'The Marketing Agent is activated separately and billed per use: it is not part of the monthly plan. Turn it on whenever you want and watch what it spends on screen.',
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
              otros={t('Una suscripción por producto', 'One subscription per product')}
              pventa={t('Una sola, todo incluido', 'A single one, all included')}
            />
            <ComparisonRow
              label={t('Tope de ingresos', 'Income cap')}
              otros={t('Sí — subes de plan al crecer', 'Yes — you move up tiers as you grow')}
              pventa={t('Sin tope', 'No cap')}
            />
            {/* La tabla tenía 7 filas (526px). Se quedaron las 4 que de verdad separan.
                Salieron el 23-ago-2026, para acortar scroll:
                - "Usuarios": US$3 c/u contra "incluidos por plan" no se lee como ventaja.
                - "e-CF DGII": decía "Incluido" en las dos columnas. No diferencia nada.
                - "Bodegas": el matiz "3 · ilimitadas en Enterprise" ya lo dice la tabla
                  de precios, unas líneas más arriba. */}
            <ComparisonRow
              label={t('Inventario, CxC/CxP, bancos', 'Inventory, AR/AP, banking')}
              otros={t('Según el plan / producto', 'Depends on plan / product')}
              pventa={t('Todo abierto', 'All open')}
            />
            <ComparisonRow
              label={t('App móvil de ventas', 'Mobile sales app')}
              otros={t('App general', 'General app')}
              pventa={t('Para tu fuerza de ventas', 'For your sales force')}
            />
          </div>
        </section>

        {/* Aquí iban los tres pasos "Tú facturas, nosotros nos encargamos del resto"
            (1. creas tu factura · 2. la firmamos y enviamos · 3. recibes tu e-CF).
            Fuera el 23-ago-2026: 256px para decir lo que la lista de capacidades de
            abajo ya dice —firma, envío y código de seguridad + QR están ahí— y encima
            chocaba con el h1, que arranca diciendo que facturar es lo mínimo. */}

        {/* e-CF: de 7 tarjetas grandes (1.465px, un tercio de la página entera) a una lista
            compacta (Rubén, 23-ago-2026: "que toda la info se vea desde que abran, que haya
            que scrolear lo menos posible… las personas no les gusta perder tiempo").
            No se pierde ni una capacidad: están las siete, con el detalle debajo de cada
            una. Lo que se fue es el aire — icono grande, tarjeta y padding por cada punto,
            para algo que el propio Rubén considera cliché y que aquí solo tiene que
            demostrar que la casilla está cubierta. */}
        <section>
          <h2 className="text-2xl font-bold text-dark text-center mb-2">
            {t('Facturación electrónica de verdad', 'Real electronic invoicing')}
          </h2>
          <p className="text-gray-600 text-center text-sm max-w-2xl mx-auto mb-6">
            {t(
              'PVenta ya emite e-CF en producción, conectado a la DGII.',
              'PVenta already issues e-CF in production, connected to DGII.',
            )}
          </p>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 max-w-4xl mx-auto">
            {ecfFeatures.map(f => (
              <p key={f.titleEs} className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 mt-1 shrink-0 text-emerald-600" />
                <span>
                  <b className="text-dark">{t(f.titleEs, f.titleEn)}.</b>{' '}
                  <span className="text-gray-600">{t(f.descEs, f.descEn)}</span>
                </span>
              </p>
            ))}
          </div>
        </section>

        {/* Lead form.
            El botón decía "Quiero cumplir con e-CF", del enfoque anterior: chocaba con el
            botón del hero y con el título de este mismo formulario, que dicen "Solicita
            tu demo". Ahora cierra coherente. */}
        <section id="registro" className="max-w-xl mx-auto scroll-mt-20">
          <LeadForm
            defaultSource="ecf_campaign"
            defaultProducto="pventa"
            titleEs="Solicita tu demo"
            titleEn="Request your demo"
            subtitleEs="Déjanos tus datos y te contactamos para mostrarte PVenta."
            subtitleEn="Leave your details and we’ll reach out to show you PVenta."
            ctaEs="Quiero mi demo"
            ctaEn="I want my demo"
          />
        </section>
      </div>
    </>
  )
}
