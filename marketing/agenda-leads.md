# Agenda de leads — Campaña "Primer mes gratis"

**⚠️ PIVOTE (2-jul-2026):** el form de `xoultec.com/ofertas` está caído (falta `LEADS_API_KEY` en Vercel;
sin acceso a Vercel ~2 semanas). Mientras tanto, el promo redirige a **Instagram DM** ("escríbenos DM: MES GRATIS")
+ WhatsApp para cerrar. **Canal de leads actual = DM/comentarios de @xoultec** (los captura el asistente en el loop).
La bio de IG ya se actualizó con ese CTA. En Fly, `LEADS_API_KEY` + `LEADS_NOTIFY_EMAIL=sales@` YA están (backend listo);
falta solo Vercel para reactivar el flujo automático a sales@.

**Backend verificado:** el código SÍ notifica a `LEADS_NOTIFY_EMAIL` al capturar (subject "Nuevo lead XoulTec: [nombre]").
SMTP configurado. El único faltante es el `LEADS_API_KEY` de **Vercel** (proyecto xoultec-homepage, cuenta bajo ruben_nunez@hotmail.com).

Leads (vía IG DM ahora; vía sales@ cuando Vercel esté listo). El asistente registra cada lead aquí,
responde con el banco, replica a nunezd.ruben@gmail.com y escala a Rubén. **El cierre lo hace Rubén (por WhatsApp).**

> Fuente autoritativa alterna: tabla `leads` en la BD maestra (columna `source` = instagram/facebook/pventa_login).
> `SELECT source, COUNT(*) FROM leads GROUP BY source;`

## Cómo contactar (orden sugerido)
1. **WhatsApp** (más rápido): +1 (809) 252-4007 (RD) · +1 (913) 413-6583 (USA).
2. **Correo**: sales@xoultec.com.
3. Mencionar su **código** y el **producto** que le interesa; ofrecer **demo sin compromiso**.

**Guion de primer contacto (borrador, Rubén ajusta/aprueba):**
> ¡Hola [nombre]! 👋 Gracias por registrarte en la oferta de XoulTec. Tu primer mes va **gratis**.
> Vi que te interesa [producto]. ¿Te coordino una **demo rápida sin compromiso** esta semana?
> Aquí estoy para lo que necesites. 🙂

## Prioridad
- 🔴 Alta: producto de alto ticket (ERP/eClinic/eLoan) o negocio claramente activo.
- 🟡 Media: retail/POS/servicios.
- 🟢 Baja: registros incompletos o dudosos → verificar antes.

## Acceso al buzón
- **Webmail:** Roundcube en `https://www.tecno-logica.org:2096/` (servidor HostGator de xoultec.com). Login `sales@xoultec.com`.
- ⚠️ `webmail.xoultec.com` / `mail.xoultec.com` NO resuelven bien (DNS del subdominio sin configurar). Usar el hostname del servidor.
- La sesión (token cpsess) expira; si se cae, Rubén debe re-loguear (el asistente no puede).
- **Estado 2026-07-02 ~17h:** acceso OK. Inbox, Junk y Archive **vacíos** (0% uso) — aún sin leads.

## Leads (por contactar)
| Fecha lead | Nombre | Negocio | Correo | Teléfono | Producto interés | Fuente | Código | Prioridad | Estado | Próximo contacto |
|------------|--------|---------|--------|----------|------------------|--------|--------|-----------|--------|------------------|
| _(inbox vacío al 2-jul ~17h; capturando cuando lleguen)_ | | | | | | | | | | |

## Contactados (registro)
| Fecha | Lead | Canal | Resultado | Siguiente paso |
|-------|------|-------|-----------|----------------|
