# Especificación — Reorden Predictivo (Smart Replenishment) para PVenta

> Documento de diseño. La función vive en el **backend de PVenta** (no en xoultec-website). Validado por POC sobre 7 tenants (2026-07-04): ~470 clientes activos predecibles, 4,847 pares cliente-producto recurrentes. Ejemplo real: RAMISOL (NIFARMED).

## 1. Objetivo
Recordar automáticamente a cada cliente del tenant cuándo reabastecer sus productos habituales, según su historial de compras (modelo Sam's Club / reorden predictivo).

## 2. Valor (triple win)
- **Cliente del tenant:** menos quiebres de stock, compra a tiempo.
- **Tenant (dueño de PVenta):** ventas recurrentes, retención, **recuperación de clientes fríos**.
- **XoulTec:** el **footer de promo** (ya implementado) viaja en cada correo → llega legítimo a la cartera; diferencia a PVenta.

## 2b. Modelo: add-on con ACEPTACIÓN del cliente (formalidad)
La función se ofrece como **extra NO incluido en el paquete**, que XoulTec habilita **sin costo**, a cambio de la **firma XoulTec** en los mensajes. El tenant debe **aceptarla explícitamente** antes de que se active — así queda formal y consentido (footer/firma incluidos).

**Flujo:** en el admin de PVenta, "Reorden Predictivo" aparece **desactivado**, con botón "Activar". Al pulsarlo → pantalla de aceptación:

> **Activar Reorden Predictivo** 🔔
> Es una **función adicional, no incluida en tu paquete**, que XoulTec pone a tu disposición **sin costo extra**.
> **Te da:** 📈 más ventas recurrentes · 🤝 más presencia de tu negocio · ♻️ recuperas clientes fríos.
> **Salvedad:** los mensajes que se envíen con esta función (email y WhatsApp) incluyen la **firma de XoulTec**, como parte del servicio.
> ☑️ He leído y **acepto** activar esta función bajo estas condiciones.
> [ Activar función ]   [ Ahora no ]

**Registro de consentimiento (auditoría):** guardar RNC del tenant, usuario, fecha/hora y **versión de términos** aceptada (tabla `feature_acceptance` o campo en `portal_tenant_settings`). La función permanece **OFF** hasta que se acepte. Si cambian los términos → **re-aceptación** por versión.

## 3. Fuentes de datos (por tenant)
- `maeventa` — encabezado: `Cliente`, `Fecha`, `Anulada`, `Factura`.
- `infventa` — detalle: `Factura`, `Codigo`, `Cantidad`.
- `inventario` — producto: `Codigo`, `Descripcion`, `Existencia`, `Estatus`.
- `maeclientes` — contacto: `Correo_Electronico`, `Telefono01`, + (nuevo) flag opt-out.
- `maedevolucion`/`infdevolucion` — para descontar devoluciones (opcional fase 2).

## 4. Lógica de predicción (job batch por tenant)
Ventana: últimas **N compras** en **12–18 meses**, `Anulada<>1`.
Para cada par **(Cliente, Codigo)**:
1. Ordenar fechas de compra; calcular **intervalos** entre compras consecutivas.
2. Requerir **n ≥ MIN_COMPRAS** (config, def **4**).
3. **ciclo = mediana** de los intervalos (mediana > promedio: robusta a outliers).
4. **regularidad = coef. de variación** (desv/mediana) de los intervalos; predecible solo si **CV ≤ MAX_CV** (def **0.6**). Esto filtra compras erráticas/estacionales.
5. **cant_sugerida = mediana** de cantidad por compra.
6. **ultima_compra = MAX(Fecha)**; **proximo_reorden = ultima_compra + ciclo**.
7. **Estado:**
   - `por_vencer` si `proximo_reorden ∈ [hoy, hoy+LEAD_DAYS]` (def LEAD_DAYS=**5**)
   - `vencido` si `proximo_reorden < hoy` (→ recuperación)
   - `ok` en otro caso.
8. Excluir: producto con `Estatus` inactivo / `Existencia`=0 / descontinuado; cliente sin contacto (→ cola otro canal); grupos excluidos por config.

Persistir en tabla nueva **`reorder_prediction`** (Cliente, Codigo, ciclo, cant_sugerida, ultima_compra, proximo_reorden, estado, updated_at). Refresco **diario**. NO calcular on-the-fly (855K líneas por tenant).

> Nota técnica: MySQL **5.7** (sin window functions). Calcular intervalos/mediana/CV en la **capa de app** (traer fechas ordenadas por par con `GROUP_CONCAT(DATE ORDER BY Fecha)` y parsear) o con self-join. No usar `LAG()`.

## 5. Disparador y envío
- **Job diario por tenant** (respeta huso). Toma clientes con ≥1 ítem `por_vencer` o `vencido`.
- **Consolidar por cliente:** UN solo correo con todos sus ítems due (no uno por producto).
- **Tope de frecuencia:** máx 1 recordatorio por cliente cada **FREQ_DAYS** (def **14**) → no saturar.
- **Canal:** email (`Correo_Electronico`) si existe; si no → cola **WhatsApp** (fase 2) o marca para el vendedor.

## 6. Plantilla del correo
- Encabezado/branding del **tenant**.
- Lista: producto (`Descripcion`) + cantidad sugerida + "última compra" + (opcional) ítems vencidos aparte ("hace tiempo no pides").
- CTA: responder / llamar / link de pedido (portal de autogestión si aplica).
- **Footer XoulTec** (ya existe) con la promo.
- **Opt-out** obligatorio ("no recordarme").

## 6b. Firma XoulTec — automática y en TODOS los canales
Regla (Rubén): como es una **función extra del ERP**, cada mensaje que sale **firma XoulTec**, sin importar el canal. Nunca editable por el usuario.

**Email (YA EXISTE):** `apps/api/internal/modules/email/service.go` → `footerTextFor(lang)` (texto) + `footerHTMLFor(lang)` (HTML con **banner** `xoultec.com/email/campana-{es,en}.png`, 384px). Se anexa server-side en `buildMIMEMessage` **a todo correo**, siempre presente aunque editen el body; bilingüe por idioma del emisor. El banner se sirve del repo **xoultec-website** (`public/email/`) → swappeable sin tocar el ERP.
→ Los correos de reorden que usen `email.Service.Send()` **heredan el footer gratis**. Reusar ese servicio (ya trae rate-limit, pool SMTP, skip de tenants demo, log, From del tenant + auth de plataforma).

**WhatsApp (NUEVO — agregar):** texto plano; la firma se **anexa server-side** al final de cada mensaje de reorden, análoga a `footerTextFor`:
> `— Enviado con PVenta, el ERP de XoulTec · xoultec.com · IG @xoultec`
Opcional: mandar el **banner** (`campana-{lang}.png`) como **imagen adjunta** y el mensaje como caption → el banner también viaja por WhatsApp. Siempre presente, respetando idioma del tenant.

**Arquitectura sugerida:** extraer la firma a una fuente única (ej. `brandSignatureText(lang)` en un paquete compartido) y que **email y WhatsApp** la consuman → una sola verdad para la firma multicanal. Así, cualquier canal futuro (SMS, portal) también firma consistente.

## 7. Configuración (admin PVenta, por tenant)
- Activar/desactivar función.
- Parámetros: ventana histórica, MIN_COMPRAS, MAX_CV, LEAD_DAYS, FREQ_DAYS.
- Plantilla (asunto/cuerpo) editable.
- Exclusiones: productos/grupos no-recurrentes, clientes.
- Modo: **automático** o **manual** (el vendedor revisa y envía).

## 8. UI en PVenta (web Y mobile)
- **Panel "Reorden predictivo":** tabla de clientes/ítems due, con "enviar recordatorio" (manual) + toggle automático + log.
- **Ficha del cliente:** sección "próximos reordenes".
- **Log:** recordatorios enviados + resultado (abrió / reordenó) para medir conversión.
- **App mobile:** PVenta es PWA responsive → la opción (activar + ver "reordenes de hoy" + enviar) debe estar **también en las vistas móviles** (`apps/web/src/routes/m.*`), no solo en el admin de escritorio. En móvil, el vendedor/dueño ve la lista de clientes "por reordenar" y dispara el recordatorio desde el teléfono.

## 8b. Herramienta para el CUERPO DE VENTAS (vista por vendedor) ⭐
La misma predicción, vista **por vendedor**, es un tablero de **productividad para el equipo de ventas** — no solo correos automáticos. Este es un valor central de la función.
- **Datos:** `maeventa.Vendedor` / `maeclientes.Vendedor` + `Zona` → cada cliente tiene vendedor y zona.
- Cada vendedor ve **su lista priorizada de "clientes por reordenar"** (por vencer / vencido), ordenada por prioridad / ruta / zona, con: producto habitual + **cantidad sugerida** + última compra + contacto.
- **Acciones de un toque:** llamar · WhatsApp (con la **firma XoulTec**) · registrar visita/pedido.
- **En mobile especialmente** (`m.*`): el vendedor en la calle, con su teléfono, convierte la **cartera propia en una lista de oportunidades calientes diaria**.
- **Modos:** recordatorios automáticos **+** asistido por vendedor (el rep revisa, contacta personalmente y cierra).
- **Impacto:** el equipo pasa de **reactivo a proactivo**; nadie se olvida de un cliente que tocaba reordenar. Supervisión: el gerente ve cobertura por vendedor/zona.

## 9. Fases
- **Fase 0 — Validación:** POC ✅ (hecho).
- **Fase 1 — MVP:** cálculo + tabla `reorder_prediction` + panel + envío por **email** con footer. Piloto **1 tenant (NIFARMED)**. Modo manual primero.
- **Fase 2 — WhatsApp + captura de correos** + medición de conversión (reorder atribuido) + automático.
- **Fase 3 — cantidad inteligente**, roll-out multi-tenant, dashboard de impacto.

## 10. Métricas de éxito
- % de correos que resultan en reorden (**conversión**).
- Uplift de ventas recurrentes del tenant.
- **Clientes fríos recuperados** (estado `vencido` → compró).
- Clics al footer / leads XoulTec atribuidos.

## 11. Riesgos / notas
- **Cobertura de email parcial** (~1/3 de la cartera tiene correo) → WhatsApp es clave (fase 2) y/o capturar correos.
- **Compra B2B "grumosa":** priorizar clientes con patrón claro (CV bajo); no forzar a todos.
- **Frecuencia:** respetar tope para no quemar la relación.
- No mezclar con estados de cuenta (canal transaccional aparte).
