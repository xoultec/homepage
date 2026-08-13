# Plan — Motor de boca en boca vía FIRMA en email + WhatsApp

> La jugada priorizada. Cada mensaje que un tenant envía a su cliente (factura, cotización, estado de cuenta, recordatorio de reorden) lleva la **firma de XoulTec**. Es recomendación implícita de un proveedor de confianza → **boca en boca a escala, legítimo**. El Reorden Predictivo multiplica el volumen y la calidad de esos toques.

**Orden de prioridad = mayor impacto / menor esfuerzo primero.**

---

## 🥇 P1 — Optimizar la firma que YA sale (rápido · repo xoultec-website)
El footer ya se anexa **server-side a TODO correo** de PVenta (`email/service.go`). No hay que construir el canal — ya existe y llega a toda la cartera activa. Solo hay que **volverlo un CTA de boca en boca**, no solo branding.
- **Rediseñar el banner** (`public/email/campana-{es,en}.png`, ya swappeable, fuente en `marketing/email-banner-src/`): mensaje claro tipo *"¿Tu negocio necesita un sistema como este? Conoce XoulTec · 1er mes gratis"* + look confiable.
- **Link con referido + tracking:** apuntar el banner/links del footer a **`/r`** (referido) con **UTM** para atribuir leads/visitas que vengan de la firma.
- **Bilingüe** (ya lo es: es/en).
- **Esfuerzo:** bajo (imagen + 1 link en `service.go`). **Impacto:** inmediato, en cada factura/cotización/estado de cuenta que HOY se envía. 👈 empezar aquí.

## 🥈 P2 — Firma en WhatsApp (dev pequeño · pventa-repo)
**Arquitectura real (confirmada en el código):** PVenta NO tiene servicio server-side de WhatsApp — usa **client-side** (`navigator.share` / `wa.me?text=`), el mensaje se compone como texto y se abre en el WhatsApp del usuario. → La firma va en el **texto del mensaje**, con un **helper central** que la anexe siempre.

**Ya existe la atribución de referidos** (`apps/web/src/routes/m.referir.tsx`): el link `https://xoultec.com/r?t={RNC}&u={userId}&utm_source=pventa_ref` **atribuye el registro al tenant + vendedor**. → La firma de WhatsApp puede usar ese link → el tenant queda **atribuido automáticamente** (P4 ya resuelto a nivel de atribución).

**Implementación:**
1. **Helper único** `whatsappSignature(lang, rnc)` en `apps/web/src/lib/` → devuelve, bilingüe + verde:
   > `\n\n— Enviado con PVenta, el ERP de XoulTec 🌱`
   > `¿Quieres uno así? https://xoultec.com/r?t={rnc}&utm_source=pventa&utm_medium=whatsapp`
2. **Utilidad central** `openWhatsApp(phone, text, lang, rnc)` que **SIEMPRE** anexa la firma antes de abrir `wa.me`/Web Share. Usarla en todos los puntos de mensaje a cliente (Reorden y donde aplique).
3. **Aplicar** en los recordatorios de Reorden (WhatsApp) primero.
4. **Verde:** el 🌱 / "menos papel" va en la firma (consistente con `enfoque-verde.md`).

**Honestidad (límite real) + la solución:** si la firma va como **texto**, el usuario la ve antes de enviar y **podría borrarla**. **Solución (idea de Rubén):** generar el recordatorio como **IMAGEN (.PNG) con la firma incrustada** → **no se puede borrar.** Y PVenta **ya comparte imágenes por WhatsApp** (flujo "Pendientes de Cobro" comparte un PNG vía Web Share) → el mecanismo existe.

**Enfoque óptimo = imagen + caption:**
- **Imagen (.PNG):** la tarjeta del recordatorio (productos + cantidades) con la **firma XoulTec incrustada** en el pie (logo + "PVenta, el ERP de XoulTec" + 🌱 verde + "¿Quieres uno así? xoultec.com · 1er mes gratis"). Blindada.
- **Caption de texto** que acompaña la imagen: el **link `/r?t={rnc}` clickeable** (los links dentro de la imagen no son tappables). Editable, pero la firma visual ya va segura en la imagen.
- **Elementos de la tarjeta (validados en la maqueta):** encabezado del tenant · lista de productos + cantidades · CTA · **contactos del tenant** (tel + WhatsApp, para reordenar) · **firma XoulTec** incrustada (logo + PVenta + 🌱 verde) · **números XoulTec con banderas** 🇩🇴/🇺🇸 (vía **flagcdn.com**, no emoji) · **QR** que apunta a `xoultec.com/r?t={rnc}` (escaneable = resuelve la no-clickeabilidad de la imagen, atribuido al tenant).
- **Generación:** server-side (Go, como los PDF de `exports/pdf/*`) o render HTML→PNG; QR con la librería `qrcode` (ya usada en `m.referir`). **Plantilla/preview:** `data/reorden-tarjeta-plantilla.html` + `data/reorden-tarjeta-preview.png`.

- **Esfuerzo:** medio (helper + refactor de los puntos de composición). **Impacto:** alto (canal #1 de RD + atribución de referido).

## 🥉 P3 — Reorden Predictivo (dev grande · amplifica todo)
- Genera **más toques** (recordatorios) = más impresiones de firma, y de **alto valor** (se leen porque ayudan). + la **herramienta del vendedor** (cada WhatsApp del rep firma).
- Ya especificado en `docs/spec-reorden-predictivo.md`.
- **Esfuerzo:** alto. **Impacto:** muy alto (volumen + intención + fuerza de ventas).

## 🔁 P4 — Cerrar el ciclo: referido + atribución (continuo)
- El CTA de la firma apunta a **`/r`** → atribuir conversiones; el tenant referidor podría recibir **crédito** (mes gratis) → de exposición pasiva a **referido activo**.
- **Métricas:** impresiones (correos/WhatsApp enviados), clics a la firma (UTM), leads, conversiones, referidos atribuidos.

---

## ▶️ Arranque recomendado
**P1 ya** (está en este repo, esfuerzo bajo, reach inmediato): rediseñar el banner del footer como CTA de referido + tracking. Es el quick-win que enciende el boca en boca sin esperar dev del ERP.
Luego P2 (WhatsApp) → P3 (Reorden) → P4 (atribución) en paralelo continuo.
