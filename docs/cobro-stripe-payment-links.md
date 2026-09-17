# Cobrar en el sitio — Stripe Payment Links

**Por qué existe esto:** el 16-sep-2026 alguien intentó comprar la membresía y no
pudo pagar. Hasta ese día el sitio no tenía **ningún** botón de compra: las
tarjetas de precio eran texto y el único camino era el formulario de
`/solicitar-apertura`, que espera aprobación manual y no toca dinero.

La cuenta de Stripe ya existía (el portal de cliente `pay.xoultec.com` está en el
Navbar desde hace tiempo) y de hecho **ya se cobra con ella desde PVenta**: en
`pventa-repo/apps/api/internal/portal/stripe/handlers.go` hay un Checkout
completo, con webhook, donde *XoulTec es el merchant of record* y retiene 1.5%
de comisión. Las llaves (`STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`,
`STRIPE_WEBHOOK_SECRET`) viven en la config de ese repo. Lo único que faltaba
era el **checkout de autoservicio del sitio**. Se resolvió con **Payment Links**: se crean en el dashboard, no
necesitan backend, ni webhook, ni `STRIPE_SECRET_KEY` en Vercel.

**Orden acordado (Rubén, 17-sep-2026): se cobra primero y se aprovisiona
después.** El cliente paga en Stripe y, al terminar, Stripe lo devuelve al
formulario de apertura para que nos deje los datos de su empresa.

---

## Lo que ya está en el código

| Archivo | Qué hace |
|---|---|
| `src/lib/checkout.ts` | Los tres links, en un solo sitio. **Aquí es donde se pegan.** |
| `src/components/CheckoutButton.tsx` | El botón de la tarjeta. Si el link está vacío, baja al formulario en vez de prometer un pago que no existe. |
| `app/facturacion-electronica/EcfLanding.tsx` | Botón en Emprendedor y en Todo Incluido. Enterprise se queda en "Habla con ventas" — es a cotizar. |
| `app/nomina/NominaLanding.tsx` | Botón en la tarjeta de US$4/empleado. |
| `app/solicitar-apertura/SignupForm.tsx` | Con `?paid=1` muestra "Pago recibido ✅" y le pide el **mismo correo** con el que pagó. |

**Mientras `PAYMENT_LINKS` esté vacío no se rompe nada**: los botones llevan al
formulario, igual que antes. El sitio se puede deployar antes o después de crear
los links, en cualquier orden.

## Los tres links que hay que crear

En el dashboard de Stripe: **Product catalog → + Add product** (una vez por plan) y
después **Payment links → + New**.

| Plan | Precio | Modelo | Clave en `checkout.ts` |
|---|---|---|---|
| Emprendedor | US$19 / mes | Recurring · monthly | `emprendedor` |
| Todo Incluido | US$49 / mes | Recurring · monthly | `todo-incluido` |
| XoulTec Nómina | US$4 / mes | Recurring · monthly, **cantidad ajustable** | `nomina` |

Ojo con dos cosas de los precios que ya están publicados en el sitio:

- **Todo Incluido incluye 2 usuarios y cada usuario extra son +US$3, hasta 8.** El
  Payment Link cobra los US$49 base; los usuarios extra se facturan aparte hasta
  que exista un checkout con línea de cantidad.
- **Nómina es por empleado.** En el link hay que activar *"Let customers adjust
  quantity"* y poner el mínimo en 1, o todos pagarán US$4 fijos.

## La configuración que importa en cada link

1. **After payment → Don't show confirmation page → Redirect to your website**, con
   la URL del plan:
   - `https://xoultec.com/solicitar-apertura?paid=1&plan=emprendedor`
   - `https://xoultec.com/solicitar-apertura?paid=1&plan=todo-incluido`
   - `https://xoultec.com/solicitar-apertura?paid=1&plan=nomina`

   Esto es lo que hace que "cobrar primero" funcione: sin el redirect, el que
   paga se queda en la pantalla de Stripe y nunca nos deja el RNC.
2. **Collect customer's phone number:** activado (nos ahorra perseguirlo).
3. **Tax:** si tienes Stripe Tax encendido, decide si el precio es *tax inclusive*
   antes de publicar. Cambiarlo después obliga a rehacer el precio.
4. Copia la URL `https://buy.stripe.com/...` y pégala en `PAYMENT_LINKS` en
   `src/lib/checkout.ts`.

## Cómo se cruza el pago con la solicitud

Stripe te manda el correo del pago; el formulario te manda la solicitud al portal
de operador. **El puente entre los dos es el correo del cliente** — por eso el
banner le insiste en usar el mismo.

**Pendiente (otro repo, `xoultec-operator`):** el POST de `/api/signup` no lleva el
plan, porque el contrato de `handleCapture` es fijo y meterle un campo que el
portal no espera puede tumbar el único camino de leads que hay. Cuando el portal
acepte `plan` y `paid`, se agregan aquí en `SignupForm.tsx` y la solicitud llega
al operador ya marcada como pagada, sin cruzar correos a mano.

## Si algún día se quiere el checkout integrado

Ya no habría que empezar de cero ni buscar credenciales:

- La **cuenta y las llaves ya existen** (mismo Stripe de PVenta). Para el sitio
  conviene emitir una **restricted key** propia en vez de reusar la del API —
  son dos aplicaciones distintas y una llave filtrada no debería tumbar las dos.
- El **patrón ya está escrito y funcionando** en `pventa-repo`: crear la sesión,
  redirigir, y verificar con `?session_id=` al volver. Es el mismo flujo que
  necesitaría `/api/checkout` aquí.
- ⚠️ En esa cuenta el grueso del dinero es **de los clientes de los tenants**
  (XoulTec cobra como merchant of record y liquida aparte). Las suscripciones
  propias de XoulTec conviene marcarlas con su propio producto/metadata para que
  el reporte de ingresos no mezcle lo que es nuestro con lo que es de paso.
- **Esto NO se toca desde el repo del sitio.** `pventa-repo` se trabaja aparte.

## Lo que esto NO resuelve

- **No hay webhook**, así que un pago no activa nada solo: sigues abriendo el
  tenant a mano. Lo que cambia es que el dinero ya entró cuando lo haces.
- **Cobrar antes de validar** significa que si un caso no aplica (RNC que no
  cuadra, país que no atendemos), toca **reembolsar desde Stripe**. Es el costo
  acordado de que nadie se quede sin poder pagar.
- Las cancelaciones y cambios de tarjeta los hace el cliente solo en
  `pay.xoultec.com`, que ya está en el Navbar.
