# Sitio: agregar Soporte Remoto y la unidad de Videojuegos

**Notas para actualizar xoultec.com** (Rubén, 14-nov-2026: "toma notas para que
actualicen la página de xoultec incluyendo esos servicios"). El sitio todavía
no muestra nada de esto. Los links de cobro ya existen en Stripe y funcionan
sin cambios de backend, como los de [cobro-stripe-payment-links.md](cobro-stripe-payment-links.md).

---

## 1. Qué hay que publicar

### Soporte técnico remoto (Ingeniería)

Se trabaja en la PC del cliente a distancia, con un kit de acceso **temporal**
que el propio cliente instala y que se retira al terminar. Para el texto del sitio:

- **Siempre con autorización expresa del cliente**, que se da antes de entrar al equipo.
- El cliente instala el acceso con doble clic y lo retira al terminar con otro doble clic.
  El equipo queda como estaba: no se crean cuentas, no se abren puertos a la red
  y no queda ningún programa nuestro.
- **Se paga por adelantado**, con un link de Stripe en dólares.
- Mínimo 1 hora; después, bloques de 30 minutos.

| Servicio | Horario laboral | Fuera de horario / emergencia |
|---|---|---|
| Empresa (RD) | US$40 / hora · US$20 cada 30 min | US$75 / hora · US$37.50 cada 30 min |
| Business (EE. UU.) | US$75 / hour · US$37.50 per 30 min | US$110 / hour · US$55 per 30 min |

### Unidad de Videojuegos (nueva, 14-nov-2026)

Un tercer departamento, al lado de Soporte de Aplicaciones e Ingeniería. Atiende
por los dos WhatsApp: **809-252-4007** y **+1 (913) 413-6583**.

- Soporte técnico gamer: PC gamer, consolas (PlayStation, Xbox, Switch), mandos,
  drivers, rendimiento, lag y conexión online.
- Venta y asesoría: equipos, consolas, juegos y accesorios. Se cotiza por WhatsApp.
- Cuentas y tiendas: Steam, PlayStation Network, Xbox, Epic. En el sitio debe
  quedar claro que **XoulTec nunca pide ni maneja contraseñas**.
- Desarrollo de juegos a medida: **a cotizar**, igual que el Enterprise de e-CF
  ("Habla con ventas").

| Videojuegos | Horario laboral | Fuera de horario |
|---|---|---|
| Soporte remoto | US$60 / hora · US$30 cada 30 min | US$90 / hora · US$45 cada 30 min |

### Horario (vale para todo el sitio)

**Lunes a viernes 8:00 a.m.–6:00 p.m. y sábados 8:00 a.m.–2:00 p.m. (hora RD).**
Aplica a Aplicaciones, Ingeniería y Videojuegos. Ingeniería **ya no es 24/7**: si
algún texto, el ChatWidget o el prompt del chat (`src/lib/chat-prompt.ts`) dice
24/7, hay que cambiarlo.

---

## 2. Los links de Stripe (ya creados, cuenta XoulTec, LLC, live)

El listado oficial está en `C:\Data\4Claude\MonitorWA\stripe-links.tsv`, con
producto, precio y URL. Se sugieren estas claves para `src/lib/checkout.ts`:

| Clave sugerida | Precio | URL |
|---|---|---|
| `remoto-rd-1h` | US$40 | https://pay.xoultec.com/b/8x2dR8bs99uOahpcKR1kA01 |
| `remoto-rd-30` | US$20 | https://pay.xoultec.com/b/00wfZg53L22m75d3ah1kA02 |
| `remoto-rd-1h-fuera` | US$75 | https://pay.xoultec.com/b/aFa00i1Rz0Yi0GPdOV1kA0d |
| `remoto-rd-30-fuera` | US$37.50 | https://pay.xoultec.com/b/6oU9AS8fX6iC1KTfX31kA0e |
| `remote-us-1h` | US$75 | https://pay.xoultec.com/b/dRm14m7bT5ey3T18uB1kA05 |
| `remote-us-30` | US$37.50 | https://pay.xoultec.com/b/dRm9ASao56iC2OXcKR1kA06 |
| `remote-us-1h-after` | US$110 | https://pay.xoultec.com/b/28E5kC3ZH6iC89h8uB1kA07 |
| `remote-us-30-after` | US$55 | https://pay.xoultec.com/b/4gM5kCgMt22mexFdOV1kA08 |
| `gaming-1h` | US$60 | https://pay.xoultec.com/b/4gM28qbs94augFNaCJ1kA09 |
| `gaming-30` | US$30 | https://pay.xoultec.com/b/9B614mgMtayScpx4el1kA0a |
| `gaming-1h-after` | US$90 | https://pay.xoultec.com/b/28E28q2VDcH089hcKR1kA0b |
| `gaming-30-after` | US$45 | https://pay.xoultec.com/b/dRmaEW8fX0YidtB1291kA0c |

Así están configurados los links:

- **Cantidad:** el cliente la elige (1 a 99 bloques).
- **Datos que piden:** el nombre siempre; el de empresa, solo en los de Empresa/Business.
- **Impuestos:** **sin impuesto automático**, igual que el resto de productos de
  la cuenta (no hay registro de impuestos).
- **Idioma:** los de EE. UU. están en inglés y los de Videojuegos son bilingües.
- **After payment:** quedó en la confirmación de Stripe, **sin redirect**. Si el
  sitio quiere una página de "pago recibido" para estos servicios, hay que
  agregar el redirect en cada link (Edit → After payment).

---

## 3. Sugerencia de estructura

- Una página **`/servicios`** (o `/soporte`) con dos tarjetas:
  - Soporte remoto, con la tabla RD / EE. UU. y el toggle de idioma que ya usa el sitio.
  - Videojuegos, con su tabla y la lista de lo que cubre.
- Cada tarjeta lleva **"Pagar 1 hora"** con `CheckoutButton`. Los bloques de
  30 minutos **no van como botón público**: se mandan por WhatsApp cuando el
  trabajo se alarga.
- Un **botón de WhatsApp** al lado: primero se escribe y se autoriza el acceso,
  después se paga. El sitio no debe sugerir que pagar ya da acceso.
- Agregar Videojuegos y Soporte remoto en `HomePage.tsx`, el Navbar, `sitemap.ts`
  y `chat-prompt.ts` (para que el chat sepa precios y horario).
- Todo el texto con `t('…', '…')`.

---

## 4. Antes de publicar: decisiones de Rubén

1. **Tarifas fuera de horario en el sitio:** a los clientes actuales todavía no
   se les habla de cargos extra (eso es la fase 2 del plan de límites de
   soporte). Publicar las tarifas "fuera de horario" en el sitio lo anuncia de
   hecho. Opciones: publicar solo las de horario laboral hasta la fase 2, o
   publicarlas todas.
2. **ITBIS:** no se cobra. Todo va por Stripe, a nombre de XoulTec, LLC, en USD (Rubén, 14-nov-2026).
3. **Desarrollo de juegos:** confirmar si sale en el sitio desde ya o cuando haya portafolio.

No nombrar clientes en el código ni en los textos del sitio.
