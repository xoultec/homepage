# Changelog

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
