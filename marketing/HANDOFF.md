# HANDOFF — Continuidad del marketing de XoulTec (para otra PC)

Documento para que **otra computadora (siempre activa)** retome el trabajo de marketing de Instagram y el **monitoreo de comentarios** mientras Rubén viaja.

> Para el asistente (Claude) que abra este repo en la otra PC: **lee este archivo + `marketing/README.md` + `marketing/campana-sea-cual-sea-tu-negocio.md`** para cargar todo el contexto, y luego retoma el monitoreo (sección 4).

---

## 1. Qué es esto (resumen ultra-rápido)
Estamos llevando el Instagram **@xoultec** (cuenta Business) como canal de promoción de **XoulTec**, empresa de software de gestión (RD + área NY/NJ). Producto insignia: **PVenta ERP**. Campaña activa: **"Sea cual sea tu negocio"**.

Contexto completo y reutilizable ya en el repo:
- `marketing/README.md` — índice maestro (cartera de clientes + assets + posicionamiento).
- `marketing/campana-sea-cual-sea-tu-negocio.md` — la campaña con sus 5 mensajes.
- `marketing/plan-contenido-instagram.md` — plan editorial.
- `marketing/instagram/` — imágenes (.png), captions y testimonios.
- `marketing/instagram/banco-respuestas.md` — respuestas listas para comentarios/DMs.

## 2. Posicionamiento (5 mensajes clave)
1. **Versatilidad** — "Sea cual sea tu negocio" (sirve para cualquier sector).
2. **Confianza** — "Más de 30 años de experiencia. Hoy, XoulTec." (proyecto desde **1995**; marca ~3 años; cliente más fiel Nifarmed desde **1997**).
3. **Integración** — "Distintos módulos, una sola contabilidad" (PVenta es el hub; FRI/eLoan/eClinic se conectan; todo cae en un solo GL).
4. **Crecimiento** — "Empieza con PVenta y crece".
5. **Escalabilidad** — "De 1 a 1000 usuarios, el mismo XoulTec".
Extra: **Portal de Autogestión** — los clientes hacen sus pedidos/pagan/ven su cuenta solos, 24/7.

## 3. Estado actual (al 28-jun-2026)
**Posts programados en Meta Business Suite:**
- **Post #1** (intro de marca) → **28-jun 9:00 AM**.
- **Aniversario Nifarmed** (lealtad desde 1997) → **28-jun 6:00 PM**.

**Regla de permisos:** solo **@surprise_morning** requiere OK explícito antes de destacarlo (Collab pendiente de su respuesta). Todos los demás clientes se pueden destacar/etiquetar libremente.

**Pendientes:** activar testimonios ya autorizados (Nifarmed, Don Bululo, Galería Vitral, sector médico) espaciados; revisar resultados del Post #1 tras las 9am; respuesta de @surprise_morning.

## 4. MONITOREO — cómo retomarlo en esta PC
El monitoreo es un "loop": el asistente se despierta cada cierto tiempo, revisa comentarios/DMs nuevos en @xoultec y reporta a Rubén con respuestas redactadas.

**Requisitos en esta PC (always-on):**
1. Google Chrome con la **extensión de Claude (claude-in-chrome)** instalada y activa.
2. Chrome **logueado en la cuenta de Instagram / Meta Business Suite de XoulTec** (Rubén debe iniciar sesión aquí una vez; el asistente NO ingresa contraseñas).

**Instrucciones del loop (lo que debe hacer el asistente al despertar):**
> Verifica la hora. Si ya pasaron las horas de los posts (o en el chequeo diario), entra a instagram.com/xoultec, abre los posts y revisa comentarios/DMs nuevos. Si hay actividad nueva, reporta a Rubén con resumen + respuestas listas (usa `banco-respuestas.md`). Si no hay nada nuevo, no envíes reporte vacío: solo reprograma. Si Chrome NO está logueado en Instagram, avisa a Rubén. Cadencia: alrededor de 9am y 6pm, luego diario. Sigue reprogramando para mantener el monitoreo activo.

**Autorización de respuestas (Rubén, 28-jun-2026):** El asistente está autorizado a **responder solo** (sin pedir OK cada vez) los comentarios/DMs **positivos y las preguntas estándar ya guionadas** en `banco-respuestas.md` (precio→DM, ¿sirve para mi negocio?, app, DGII/e-CF, demo, ubicación, "me interesa", felicitaciones/emojis). Siempre deja registro de lo enviado.
> **Excepciones que SIEMPRE se escalan a Rubén (NO auto-enviar):**
> - **Comentarios negativos / críticas / quejas** → avisar de inmediato con el texto completo, extraer el aprendizaje (qué mejorar) y dejar borrador de respuesta calmada, pero **esperar el OK de Rubén**. Los negativos ayudan a mejorar: requieren su atención.
> - Fuera de guion: negociación de precios, temas legales, reclamos de clientes actuales, preguntas técnicas muy específicas, prensa/colaboraciones, o cualquier caso ambiguo.
> - DMs que avanzan al cierre de venta → llevar a WhatsApp/correo, donde Rubén cierra.

## 5. Cómo lo activa Rubén en la otra PC
1. `git pull` para traer este repo actualizado.
2. Asegurarse de tener Chrome con la extensión de Claude, **logueado en el Instagram de XoulTec**.
3. Abrir Claude Code en la carpeta del repo y decir:
   **"Lee `marketing/HANDOFF.md` y retoma el monitoreo de Instagram de XoulTec."**

## 6. Honestidad sobre límites (no es 100% automático)
- La otra PC **no se configura sola** del todo: alguien debe abrir Claude ahí y pedirle que lea este handoff una vez. A partir de ahí, sí se auto-organiza.
- El monitoreo depende de que **Chrome siga logueado**; si la sesión cae, el asistente lo avisa y hay que reabrirla.
- El asistente solo "vive" mientras esa sesión/loop esté activa en esa PC.
- El asistente **nunca publica, comenta ni envía DMs sin permiso de Rubén**.
