# Changelog

## [1.21.0] - 2026-08-23
- feat(portada): **todo lo que decide la compra cabe en la primera pantalla** — de 843px a 699px hasta el final del bloque del Agente: titular, promesa, los dos protagonistas, los botones de WhatsApp, las seis capacidades y el call center, sin scroll
- feat(portada): la franja pasa a **tres columnas** — Agente, app móvil y **contacto**; quien se convence leyendo las dos primeras tiene los botones de WhatsApp al lado
- feat(portada): botones de WhatsApp de verdad (verde sólido) con la bandera del país y el **glifo real de WhatsApp** — se agrega `WhatsAppIcon`, porque lucide no trae iconos de marca y se venía usando un bocadillo genérico
- feat(portada): la lista del Agente suma las **dos capacidades que faltaban** — "te dice qué poner en oferta" y "completa los datos que faltan"; la consola tiene seis pestañas y la página contaba cuatro
- fix(portada): fuera los dos botones del hero, que competían entre sí justo encima de lo que hay que leer (uno de ellos parpadeando)
- fix(hero): **el titular quedaba parcialmente debajo de la barra de navegación** en `/`, `/ofertas`, `/r` y `/solicitar-apertura` — la navbar es fija y ocupa 104px, y el hero solo dejaba 80px de margen; tres de esas páginas ya venían rotas
- refactor(portada): el call center pasa de caja a una línea, y los textos de franja y tarjetas se aprietan a 3 y 2 líneas sin perder contenido

## [1.20.1] - 2026-08-23
- refactor(ecf): la sección del Agente de Marketing sube por encima de precios — se ve qué hace el sistema antes de ver cuánto cuesta, y encadena directo con la franja que plantea el problema

## [1.20.0] - 2026-08-23
- feat(ecf): **el Agente de Marketing pasa al frente** — el h1 deja de decir "y todo tu negocio en un sistema" (que dice cualquier ERP) y pasa a "y un ERP que además sale a trabajar tu cartera"; el cintillo del hero, que es el sitio de más peso, deja la certificación DGII y pasa al Agente
- feat(ecf): **la franja de la fecha límite se elimina entera** — obligación, plazo y multas de 5 a 50 salarios mínimos. La DGII ya insiste bastante con los clientes; esa franja ahora dice "Tu cartera es más grande de lo que tus vendedores alcanzan a atender"
- fix(ecf): fuera las afirmaciones comparativas públicas — "Ningún otro ERP hace esto" pasa a "No solo factura:"; la página habla de lo que hace este producto, no de lo que no hacen los demás
- fix(ecf): fuera "— incluida" de la app móvil, misma línea que el mes gratis
- fix(ecf): la certificación DGII vuelve a la parrilla de capacidades, donde ya no queda duplicada con el cintillo

## [1.19.0] - 2026-08-23
- feat(ecf): entra el **Agente de Marketing**, que no aparecía en la landing y es lo que diferencia a PVenta de cualquier ERP — reorden por historial, persecución de cobros, recuperación del cliente dormido, piezas de redes con IA y la **cola del call center**, donde el Agente asigna el canal y la pantalla explica por qué hay que llamar
- feat(ecf): se dice explícitamente que el Agente se cobra por uso y no va en la mensualidad
- fix(ecf): fuera el banner "Promo de lanzamiento: 1 mes gratis", que iba justo debajo del título "Precios claros, sin letra chica"
- fix(ecf): fuera "Te certificamos ante la DGII — gratis", su badge y el "sin costo"; el argumento es que el trámite lo hacemos nosotros
- fix(ecf): fuera "y descuento" del botón y del formulario, y la etiqueta "PRECIO DE LANZAMIENTO" sobre los US$49
- fix(ecf): se elimina el duplicado — la tarjeta "Te dejamos listo ante la DGII" repetía el cintillo del hero casi palabra por palabra
- fix(ecf): la app móvil estaba descrita como "toman pedidos y cotizaciones"; son 48 pantallas — facturar, cobrar, depositar el efectivo de la calle, inventario físico, visita y carga de factura de compra por foto
- chore(public): se eliminan cinco assets sobrantes de la plantilla original (dos hexágonos, una captura de "SIC - Accounts Payable" y dos duplicados)

## [1.18.0] - 2026-08-23
- fix(contacto): **el WhatsApp de la web apuntaba a un número muerto desde 2024** — el formulario de la portada y el traspaso a ventas del chat mandaban a un Google Voice que nunca pudo tener WhatsApp; quien pulsaba "escríbenos" veía "este número no está en WhatsApp"
- fix(contacto): los números viven ahora en `src/lib/contact.ts` en vez de copiados en tres componentes, que fue la causa de que uno se quedara dos años atrás
- feat(contacto): la persona **elige entre RD y USA**, y hay un camino directo de un toque sin llenar el formulario
- fix(contacto): se quita la redirección automática a `mailto:` que secuestraba la pantalla justo cuando WhatsApp intentaba abrir
- fix(marca): **el favicon era un hexágono de otra plantilla**, y la X del navbar y el footer era una letra en peso 700 en vez de la marca; ahora usan el PNG exacto del avatar de Instagram/WhatsApp
- feat(marca): se agrega la **imagen de enlace (Open Graph)**, que no existía — compartir xoultec.com por WhatsApp salía sin logo
- feat(cta): `/r` y `/ofertas` pasan de promoción a contacto ("Hablemos de tu negocio"); el "primer mes GRATIS" sale de las dos páginas
- feat(cta): cada clic de contacto registra canal y referidor en Vercel Analytics, para que la atribución no dependa de que la persona mande el mensaje
- fix(ofertas): se elimina la sección "Ofertas", que repetía los mismos productos de la parrilla de abajo
- docs(marketing): el enfoque pasa al motor de referidos e Instagram queda en mantenimiento; se agrega el paquete de envío de la Semana 1

## [1.17.0] - 2026-08-21
- feat(marketing): gráfica "El acuerdo que vive en la memoria de alguien"
- docs(marketing): publicado el carrusel verde de la segunda mitad (`DcTJmXlFk5o`) y el estado del WhatsApp 913; queda registrada la receta del **upload de imágenes locales a estados**, que sí se puede automatizar
- docs(marketing): el estado del 809 también salió — el bloqueo era la ventana de Chrome, no la sesión
- docs(marketing): chequeos de monitoreo del 21-ago — los cuatro buzones vacíos, cero comentarios nuevos desde el 6-jul y el carrusel del día sin engagement en sus primeras 2h
- docs(marketing): el HANDOFF ahora documenta los **dos** latidos del centinela (`--latido-ig` tras chequear, `--latido-post` tras publicar); solo estaba el primero, y eso disparó una falsa alarma de "lleva días sin publicar"
- chore(claude): permisos acumulados de la sesión en `settings.local.json`

## [1.16.0] - 2026-08-21
- feat(marketing): campaña **go green** completa — lanzamiento, pieza de referido y la serie "antes/hoy" (digitalizar = conservar), con guía de tono en `marketing/instagram/enfoque-verde.md`
- feat(marketing): tanda **fuerza de ventas** — comisiones, ruta del vendedor, TV simulado del GPS y la gráfica "Cartera que se apaga" con plazas simuladas
- feat(marketing): reel del GPS generado **desde el TV simulado**, sin grabar pantalla
- feat(marketing): sector **farma** — pieza de "lote que vence" y listas de prospección
- feat(marketing): lámina 6 de cierre verde en el carrusel e-CF
- feat(marketing): catálogo de WhatsApp con los 9 productos, cargado en los dos números (RD 809 y USA 913)
- feat(marketing): foto de perfil unificada entre Instagram y WhatsApp
- chore(claude): hook de `SessionStart`/`PostCompact` que reanuncia el monitoreo de Instagram cuando el loop muere con un `/clear` o `/compact`
- docs(marketing): registro continuo del monitoreo de @xoultec — bienvenidas, follows, chequeos y las reglas que salieron de ellos (verificar zona antes de seguir, distinguir cliente de prospecto, regla de corte tras una explicación clara, y el DM personalizado como default)

## [1.15.0] - 2026-08-09
- feat(analytics): integra Vercel Web Analytics para medir visitas por página (tráfico por URL, países, dispositivos y referrers)
- feat(facturacion-electronica): destaca la app móvil para la fuerza de ventas — callout "incluida" y nueva fila en la comparativa

## [1.14.0] - 2026-07-04
- feat(email): el banner del footer de los correos (factura, estado de cuenta, cotización) pasa de branding a **CTA de referido** — "¿Necesitas un ERP así? · 🌱 Digital, menos papel más planeta · 1er mes GRATIS" (ES/EN), enlazando a `/ofertas` con UTM. Enciende el motor de boca en boca (P1) en cada correo que ya envía la cartera activa.

## [1.13.2] - 2026-07-02
- fix(referidos): el título de `/r` ahora dice "…te recomendó **PVenta ERP**" (marca consistente con la campaña)

## [1.13.1] - 2026-07-02
- fix(leads): el CTA de `/r` y `/ofertas` ya no obliga a usar Instagram — ahora ofrece **WhatsApp RD + USA** (principal, con el mensaje/referido pre-cargado) e Instagram DM como opción, para no perder a quien no tenga IG

## [1.13.0] - 2026-07-02
- feat(leads): mientras el form de captura está fuera (falta `LEADS_API_KEY` en Vercel), `/r` (referido de la app móvil "Referir a cliente") y `/ofertas` redirigen al **DM de Instagram** (`ig.me/m/xoultec`) con un mensaje copiable que incluye al vendedor referidor, en vez del formulario roto — nuevo componente `DmCta`; WhatsApp como respaldo. Se revierte a `<LeadForm />` cuando se configure `LEADS_API_KEY`

## [1.12.0] - 2026-07-02
- fix(referidos): la landing `/r` ahora captura un **lead** (para que el equipo de ventas contacte al prospecto) en vez de una solicitud de apertura — así un referido no genera la apertura de una empresa sin negociación previa; el vendedor referidor viaja con el lead para su atribución

## [1.11.0] - 2026-07-02
- feat(referidos): landing `/r` que captura al vendedor referidor (t=RNC, u=usuario) del QR de la app móvil de PVenta y lo reenvía por el formulario de apertura para atribuir la comisión

## [1.10.1] - 2026-07-01
- chore: usar webpack en `next dev`; ignorar `Thumbs.db`; documentación de marketing (guías de WhatsApp, brief del banner de email y assets de campaña)

## [1.10.0] - 2026-07-01
- feat(email): banners de agradecimiento para el pie de los correos de PVenta (ES/EN), 1200×300 (~18 KB), en ubicación fija `public/email/campana-{es,en}.png` (servidos en `xoultec.com/email/`); incluye HTML fuente re-renderizable en `marketing/email-banner-src/`

## [1.9.0] - 2026-06-30
- feat(solicitar-apertura): nueva página pública `/solicitar-apertura` para que un prospecto solicite la apertura de su empresa (empresa, país DO/US, estado, RNC/EIN, tipo comercial/clínica, contacto), bilingüe es/en; proxy server-side `/api/signup` que reenvía la solicitud al portal operador (`OPERATOR_SIGNUP_URL`) para revisión/aprobación

## [1.8.2] - 2026-06-21
- feat(facturacion-electronica): plan Enterprise (a cotizar) para empresas grandes / alto volumen; Todo Incluido limitado a hasta 3 bodegas y hasta 8 usuarios (más → Enterprise); nueva sección con los módulos del ERP; hero más conciso para móvil

## [1.8.1] - 2026-06-21
- fix(landing): hero de la landing e-CF más conciso para móvil (titular más corto, sin el párrafo extra)

## [1.8.0] - 2026-06-21
- feat(facturacion-electronica): planes competitivos — Emprendedor US$19 (solo e-CF) y Todo Incluido US$49 (precio de lanzamiento) + US$3 por usuario adicional (2 incluidos), ERP completo, bodegas ilimitadas y sin tope de ingresos; banner "1 mes gratis" y comparativa actualizada (usuarios US$3, bodegas ilimitadas)
- feat(nomina): nueva landing de campaña `/nomina` (RD + USA, US$4 por empleado sin cuota base, comparativa por capacidad, cross-sell a PVenta) integrada al catálogo de productos vía `Product.landingPath`

## [1.7.0] - 2026-06-21
- feat(facturacion-electronica): nueva landing `/facturacion-electronica` (Ley 32-23 / e-CF) con hero de urgencia (15-nov-2026), precios (Emprendedor US$35 / Todo Abierto US$125 + US$6 por usuario), comparativa "una suscripción, no cuatro", cómo funciona, features e-CF reales y captura de leads (`source=ecf_campaign`); incluye el plus "certificación como emisor electrónico ante la DGII gratis"
- feat(home): la página de inicio ahora lidera con la landing e-CF (info + registro directo), conservando Productos, Nosotros y Contacto debajo
- fix(home): corrige anchors anidados en la tarjeta de PVenta (botones de tienda) que causaban error de hidratación

## [1.6.1] - 2026-06-18
- fix(ofertas): el formulario de leads registra el canal real (`utm_source`: pventa_login, instagram, facebook…) en vez de un valor fijo, para medir de dónde viene cada lead

## [1.6.0] - 2026-06-18
- feat(ofertas): mobile landing at /ofertas (products, offers, contact CTA) reachable from the QR on the PVenta login, with a lead-capture form that returns a unique discount code via the PVenta leads API

## [1.5.0] - 2026-04-25
- feat(home): add country flags and e-invoicing badge to hero

## [1.4.0] - 2026-04-25
- feat(privacy): add site-wide privacy banner and redesign policy page hero with multi-jurisdiction legal framework

## [1.3.0] - 2026-04-25
- feat(legal): add Política de Protección de Datos page and footer link

## [1.2.5] - 2026-03-07
- fix(chat): clarify both numbers available on WhatsApp

## [1.2.4] - 2026-03-07
- fix(chat): improve bot contact info with clickable links and correct WhatsApp label

## [1.2.3] - 2026-03-07
- fix(contact): label USA number as WhatsApp-only and simplify portal URL in chat prompt

## [1.2.2] - 2026-03-07
- fix(contact): update USA phone number to +1 (913) 413-6583

## [1.2.1] - 2026-03-07
- fix(auth): improve login page mobile layout and compact promo carousel

## [1.2.0] - 2026-03-07
- feat(promos): add promos API, data and carousel component
- feat(auth): add SSO login page with app-themed branding
- feat(chat): add CORS headers to chat API
- chore(deps): pin lucide-react and typescript versions

## [1.1.4] - 2026-03-02
- fix(contact): add missing eLoan and eClinic Dental to product dropdown

## [1.1.3] - 2026-03-02
- fix(footer): add missing eLoan and eClinic Dental products

## [1.1.2] - 2026-03-02
- fix(i18n): correct typo "Anos" → "Años" in homepage

## [1.1.1] - 2026-03-01
- ci: remove old Remix README causing Vercel framework misdetection

## [1.1.0] - 2026-03-01
- feat(seo): add Open Graph metadata, favicon, and title template

## [1.0.0] - 2026-03-01
- feat: migrate website from TanStack Start to Next.js 16
- Dynamic product routing with [slug] pattern (9 products)
- API route for AI chat (Groq)
- Bilingual (ES/EN) with custom i18n context
- Tailwind CSS v4
- Conventional commits and changelog workflow
- chore: remove legacy Remix files from remote history
- Vercel deployment ready
