# Promo email — Captación a "clientes de mis clientes" (prospectos maeclientes)

**Público:** los negocios en los `maeclientes` de los tenants (farmacias/clínicas/hospitales de RD) que **NO** son clientes de XoulTec todavía. (Los clientes actuales de Rubén quedan FUERA.)
**Objetivo:** promo de captación por email → demo → cliente.
**Lista:** `data/promo-email-lista.csv` (ICP salud con correo válido, deduplicado por email).
**⚠️ Envío:** NO enviar sin OK de Rubén. Ver "Nota de envío" abajo (dominio/opt-out) — es envío masivo a lista fría.

---

## Variante A — Farmacias / distribuidoras
**Asunto:** ¿Tu farmacia al día con el e-CF de la DGII? PVenta lo hace fácil 🧾
**Preheader:** Facturación electrónica, inventario y POS — 1er mes gratis.

Hola,

En **XoulTec** ayudamos a farmacias y distribuidoras de RD a vender más rápido y cumplir con la DGII sin dolores de cabeza. Con **PVenta**:

- 🧾 **Facturación electrónica (e-CF)** validada y en regla con la DGII, automático.
- 📦 **Inventario** con control de lotes y vencimientos.
- 💊 **POS** ágil + reportes de venta al instante.
- 👥 Nómina (TSS) y 🌐 portal de autogestión, si los necesitas — todo en una sola contabilidad.

🎁 **Primer mes GRATIS.**

👉 Escríbenos al **WhatsApp (809) 252-4007** o responde este correo y te hacemos una **demo sin compromiso**.

🌱 Más digital, menos papel.

— Equipo XoulTec · xoultec.com
_¿No deseas recibir estos correos? Responde "BAJA" y no te escribimos más._

---

## Variante B — Clínicas / hospitales / centros médicos
**Asunto:** Gestiona tu clínica: pacientes, seguros y e-CF en un solo sistema 🩺
**Preheader:** eClinic + facturación DGII. 1er mes gratis.

Hola,

En **XoulTec** digitalizamos clínicas y centros médicos de RD para que dediquen menos tiempo al papeleo y más a sus pacientes:

- 🩺 **eClinic** — agenda de citas, expediente del paciente, seguros/autorizaciones.
- 🧾 **Facturación e-CF** integrada y en regla con la DGII.
- 💊 **PVenta** para tu farmacia interna / insumos, con la misma contabilidad.

Sin migraciones ni doble digitación.

🎁 **Primer mes GRATIS.**

👉 **WhatsApp (809) 252-4007** o responde este correo para una **demo sin compromiso**.

🌱 Menos papel, más planeta.

— Equipo XoulTec · xoultec.com
_¿No deseas recibir estos correos? Responde "BAJA" y no te escribimos más._

---

## Nota de envío (importante, para no quemar el dominio)
- Es una **lista fría masiva** → NO enviar desde SMTP crudo de xoultec.com (arruina la reputación → los correos caen en spam).
- Usar un **ESP** (Brevo/Mailchimp/Zoho Campaigns) con dominio verificado (SPF/DKIM), **opt-out** obligatorio, y **calentar** enviando por lotes.
- Segmentar: Variante A a farmacias, Variante B a clínicas/hospitales.
- Cumplimiento (Ley 172-13): incluir baja + identificar remitente. Estos correos vienen de carteras de tus clientes → enviar como XoulTec sin mencionar la fuente.
