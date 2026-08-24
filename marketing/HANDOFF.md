# HANDOFF — Continuidad del marketing de XoulTec (para otra PC)

Documento para que **otra computadora (siempre activa)** retome el trabajo de marketing de Instagram y el **monitoreo de comentarios** mientras Rubén viaja.

> Para el asistente (Claude) que abra este repo: **lee este archivo completo** (sobre todo la sección 3 "Estado actual") **+ `marketing/instagram/posts-programar.md` + `marketing/instagram/briefs-diseno.md` + los logs de estado** (`bienvenidas-enviadas.md`, `prospectos-follow.md`, `agenda-leads.md`). `CLAUDE.md` y `MEMORY.md` se cargan solos. Luego retoma el monitoreo (sección 4) y relanza el `/loop`.

---

## ⚠️ CAMBIO DE ENFOQUE (Rubén, 22-ago-2026) — leer antes que nada

**Instagram pasó a MANTENIMIENTO y el esfuerzo se movió al MOTOR DE REFERIDOS.**

Casi todo lo que este documento describe abajo (producir carruseles, programar posts, la
campaña "Sea cual sea tu negocio", la línea verde) **está en pausa**. Lo que sigue vivo de
la sección 4 es únicamente el **monitoreo de DMs y comentarios**, una vez al día.

Las dos cosas que Rubén dejó claras:
1. **El canal de Instagram no está funcionando** y **el carrusel verde tampoco.**
2. **Los likes se dan en WhatsApp, no en IG.** Un post con cero likes de Instagram está
   midiendo el canal muerto, **no la calidad de la pieza**. No diagnostiques contenido con
   ese número, y no propongas "mejorar el post" como respuesta a un cero.

**Lo que sí se trabaja:** el motor de referidos, que **ya está construido en PVenta** — no
hay que inventarlo. Enlace `xoultec.com/r?t=<RNC>&u=<usuario>` (lleva quién refirió), se
saca de la app móvil en `/m/referir`, viaja embebido en facturas, cotizaciones y estados de
cuenta que el cliente ya manda, y acredita una "referral star" en la tabla `referrals` del
master al provisionarse la empresa referida. Mandar a `xoultec.com/r` pelado **pierde la
atribución**.

⚠️ **Bloqueo:** no hay recompensa concreta documentada (ni monto, ni porcentaje, ni premio).
Publicar una cifra inventada crea una obligación con clientes. **La define Rubén.**

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

## 3. Estado actual (al 3-jul-2026)

### 3a. Pipeline de LEADS del promo "Primer mes gratis" (IMPORTANTE — cambió)
- El form automático de `/ofertas` y `/r` está **en pausa**: falta `LEADS_API_KEY` en Vercel y **no hay acceso a Vercel por ~2 semanas** (hasta ~mediados de julio). El backend de pventa (Fly) YA tiene sus secrets.
- **Pivote temporal (deployado, v1.13.2):** `/ofertas` y `/r` ahora muestran el componente **`DmCta`** → botones **WhatsApp RD/USA (principal) + Instagram DM**. El referido (vendedor/RNC) va embebido en el mensaje. Título de `/r`: "…te recomendó **PVenta ERP**".
- Bio de IG tiene CTA **"DM: MES GRATIS"**. **Leads por IG DM → los capturo yo** (banco → `agenda-leads.md` → replico a **nunezd.ruben@gmail.com** desde sales@ en Roundcube → escalo a Rubén para cerrar por WhatsApp). **Leads por WhatsApp → los maneja Rubén.**
- **Cuando vuelva Vercel:** poner `LEADS_API_KEY = d9231b47e169bdf6ddb929e1dc95124c3f028e1b9aaf681e28c53de77b53e702` y revertir `/r` y `/ofertas` a `<LeadForm />` (el archivo sigue intacto).

### 3b. Contenido de la semana (generado y listo)
- **8 imágenes generadas** en `marketing/instagram/`: `restaurantes.png`, `4julio.png`, `clinicas.png`, `ecf-1..5.png` (carrusel). **Cómo se hicieron:** HTML en `post-graphics-src/` (`4julio.html`, `ecf-carousel.html`, `sector.html`) → render a PNG con **Chrome headless** (`chrome.exe --headless=new --screenshot=out.png --window-size=1080,1350 file://...`). Editar el HTML y re-renderizar para cambios. (Nota: emojis de bandera 🇺🇸🇩🇴 NO renderizan en headless.)
- **Captions** (ES/EN + hashtags): `posts-programar.md`. **Briefs de diseño:** `briefs-diseno.md`.
- **Calendario:** Vie 3 Restaurantes 9am · Sáb 4 4-Julio 9am · Lun 6 Carrusel e-CF **12:15pm** · Mié 8 Reel PVenta app (VIDEO, lo graba Rubén) · Vie 10 Clínicas 9am.
- **Business Suite:** hay **2 borradores guardados** (Restaurantes + 4 de Julio, con caption). ⚠️ ~~El **upload de imágenes locales no se puede automatizar**~~ → **CORREGIDO el 21-ago-2026**: el `file_upload` de la extensión de Claude sí carga varias imágenes locales de una vez en el input del diálogo "Create new post" de **instagram.com** (sin Business Suite). Se publicó así el carrusel verde `DcTJmXlFk5o`. Lo único que hay que elegir a mano es el recorte **4:5** — IG entra en 1:1 y corta la lámina. Revisar que el borrador del 4-Jul no tenga "#photoshoot" colado.

### 3c. Estado del monitoreo IG
- **Bienvenidas** (`bienvenidas-enviadas.md`): 6 enviadas, cola vacía. Regla: **no saludar cuentas privadas**.
- **Follows** (`prospectos-follow.md`): RD primero, máx ~10-15/día, pausado, verificar pública/activa/negocio real.
- **Agenda leads** (`agenda-leads.md`): sin leads aún (CTA recién live).

**Regla de permisos:** solo **@surprise_morning** requiere OK explícito antes de destacarlo. Los demás clientes se pueden destacar/etiquetar libremente.

## 4. MONITOREO — cómo retomarlo en esta PC
El monitoreo es un "loop": el asistente se despierta cada cierto tiempo, revisa comentarios/DMs nuevos en @xoultec y reporta a Rubén con respuestas redactadas.

**Requisitos en esta PC (always-on):**
1. Google Chrome con la **extensión de Claude (claude-in-chrome)** instalada y activa.
2. Chrome **logueado en la cuenta de Instagram / Meta Business Suite de XoulTec** (Rubén debe iniciar sesión aquí una vez; el asistente NO ingresa contraseñas).

### ⚠️ El loop es frágil por diseño — y ya murió una vez
El loop **no es una tarea programada**: vive en la memoria de una sesión de Claude Code.
Si se cierra la ventana, se hace `/clear` o se reinicia Claude, **el loop muere y no avisa**.
Que la PC esté encendida no lo sostiene: lo que tiene que seguir viva es la *sesión*.

Pasó el **20-jul-2026 ~12:05pm**: el último latido se programó y ahí se cortó.
**Nadie lo notó hasta el 9-ago** — 20 días sin revisar DMs.

**Hombre muerto (instalado 9-ago-2026):** la tarea programada de Windows
`XoulTec - Monitor campana` (`C:\Data\4Claude\Repositorios\Apify\monitor.js`, cada 20 min)
vigila el latido del monitoreo de IG y **avisa por Telegram si pasan >11h sin chequeo**,
solo entre las 10am y las 10pm (bajado de 24h el 14-ago-2026). Se probó primero con 8h y
sonó en falso el mismo día con el loop vivo: el hueco nocturno legítimo (6pm→9am) son 15
horas, así que cualquier umbral por debajo de 13h dispara todas las mañanas. Con 11h y esa
ventana: un chequeo de las 9am perdido avisa a las 10am (las 11h se cumplen de madrugada,
con la ventana cerrada), y uno de las 6pm perdido avisa a las 8pm — por eso la ventana
cierra a las 10pm y no a las 9pm, que dejaba ese caso sin avisar hasta el otro día.
Recuerda cada 6h mientras siga mudo. Es un centinela de verdad: vive fuera de la sesión
que vigila, igual que `pventa-sentinel` en Fly.

> **Obligación del asistente:** después de CADA chequeo real de @xoultec, sellar el latido:
> ```
> node C:\Data\4Claude\Repositorios\Apify\monitor.js --latido-ig "resumen corto de lo visto"
> ```
> Si no lo sellas, a las 11h Rubén recibe una alarma falsa. Si lo sellas sin haber
> chequeado, apagas el único centinela que hay. Sellar = "lo revisé de verdad".

> ⚠️ **Son DOS latidos, no uno** (se olvidó el 21-ago-2026 y saltó una alarma falsa de
> "@xoultec lleva días sin publicar" con el carrusel `DcTJmXlFk5o` ya publicado esa mañana):
> ```
> node C:\Data\4Claude\Repositorios\Apify\monitor.js --latido-ig   "..."   # tras CHEQUEAR
> node C:\Data\4Claude\Repositorios\Apify\monitor.js --latido-post "..."   # tras PUBLICAR
> ```
> Viven en el mismo `monitor.js` pero cuentan cosas distintas y tienen umbrales distintos
> (IG = 11h; publicación = días). **Un chequeo sella solo el primero; una publicación sella
> los dos.** El sello de publicación estampa la hora en que se ejecuta, no la del post: si
> se sella tarde, aclararlo en la nota.
>
> La misma regla de honestidad aplica: `--latido-post` **solo** se sella si de verdad se
> publicó. El propio código lo advierte — sellarlo para callar la alarma escribe una
> publicación que nunca ocurrió, y el próximo que lea el archivo se lo cree.

**Recordatorio dentro de la sesión (instalado 12-ago-2026):** el hombre muerto tarda 11h en
gritar; el loop muere en el instante en que se hace `/clear` o `/compact`. Para cerrar ese
hueco hay un hook en `.claude/settings.local.json` (`SessionStart` + `PostCompact`) que corre
`.claude/hooks/recordar-monitoreo-ig.js`: si existe la bandera **`.claude/ig-loop.on`**
(local, gitignored), reinyecta las instrucciones del loop + la edad de los dos latidos, y le
muestra a Rubén un aviso de que hay que rearmarlo. Sin la bandera el hook no dice nada, así
que es inofensivo en máquinas que no llevan el monitoreo.
- **Prender el monitoreo en una PC:** crear `.claude/ig-loop.on` (el contenido son las
  instrucciones que se reinyectan) y lanzar el loop.
- **Apagarlo:** borrar `.claude/ig-loop.on`.
- Ojo: el hook trae la ruta absoluta de esta PC; en otra máquina hay que ajustarla.
- Sigue sin ser automático: tras un `/clear` el recordatorio aparece, pero el loop sólo se
  rearma cuando Rubén escribe algo (después de `/compact` sí sigue solo).

**Instrucciones del loop (lo que debe hacer el asistente al despertar):**
> Verifica la hora **con `date`** (esta PC se suspende y los despertares llegan tarde). En el chequeo diario, entra a instagram.com/xoultec y revisa comentarios/DMs nuevos. Si hay actividad nueva, reporta a Rubén con resumen + respuestas listas (usa `banco-respuestas.md`). Si no hay nada nuevo, no envíes reporte vacío: solo reprograma. Si Chrome NO está logueado en Instagram, avisa a Rubén. Cadencia: **una vez al día**. Sigue reprogramando para mantener el monitoreo activo.
> **NO publiques. NO propongas piezas nuevas ni carruseles** — IG está en mantenimiento desde el 22-ago-2026 (ver el aviso de cambio de enfoque al inicio de este documento). Un post en cero likes **no** es diagnóstico de la pieza.

⚠️ **`ScheduleWakeup` no es un reloj fiable en esta PC.** El 22-ago-2026 un despertar puesto
para las 5:57am disparó ~8h tarde y el reloj del sistema saltó (`date` devolvió `22-ago
2:38pm` y minutos después `23-ago 3:25am`, con Instagram marcando el mismo post como "1d").
El chequeo de la mañana se perdió por eso y el hueco del latido fue real. **Verifica la hora
con `date` en cada pasada antes de concluir nada**; si hace falta horario de verdad, esto
pide una tarea programada de Windows (como el propio centinela) o un `/schedule` en la nube.

### Tarea programada `XoulTec - Chequeo IG` (instalada 24-ago-2026)
Ancla el chequeo al Programador de Tareas para que **no dependa de que haya una ventana de
Claude abierta**. Dispara **8:00am y 4:00pm** (esos dos huecos mantienen el latido por debajo
de las 11h del centinela dentro de la ventana 10am–10pm), con `StartWhenAvailable` para que se
recupere si la PC estaba suspendida.

- Wrapper: `.claude/tareas/chequeo-ig.ps1` — lanza una sesión de Claude, la mata a los 12 min
  si se cuelga, y **compara el sello del latido antes y después**. Si no se selló, el chequeo
  NO se hizo: manda `--nota` por Telegram. El fallo nunca es silencioso.
- Prompt de la sesión hija: `.claude/tareas/prompt-chequeo-ig.txt` (no publica, no responde,
  no arma loops — solo mira y reporta).
- Bitácora: `.claude/tareas/chequeo-ig.log` (gitignored), una línea por pasada.

⚠️ **Por qué tiene que ser una sesión interactiva y no `claude -p`:** headless no tiene las
herramientas `mcp__claude-in-chrome__*` (verificado 9-ago-2026). La extensión la inyecta la
sesión interactiva vía el host nativo. Por eso la tarea exige **sesión de Windows iniciada,
Chrome abierto y logueado en @xoultec** — no basta con la PC encendida.

⚠️ **Permisos:** la sesión hija corre con `--permission-mode acceptEdits` y un **allowlist
acotado** en `.claude/settings.local.json` (`mcp__claude-in-chrome__` tabs_context / navigate /
computer / tabs_close, más `Bash(node:*)` y `Bash(date)`). No se usó
`--dangerously-skip-permissions`: fue decisión de Rubén el 24-ago mantenerlo acotado. Si un día
el chequeo empieza a fallar tras una actualización de Claude Code, sospechar primero de un
permiso nuevo que no está en esa lista.

⚠️ **Sin verificar en producción al momento de escribirlo.** Un asistente no puede lanzar la
sesión hija con permisos automáticos (el clasificador lo bloquea, con razón: sería un agente
que se auto-aprueba). La primera corrida la tiene que disparar Rubén a mano
(`Start-ScheduledTask -TaskName 'XoulTec - Chequeo IG'`) y confirmar que el log dice `ok`. Si
dice `fallo`, la vía interactiva-por-Programador no sirve y hay que volver a `/schedule` en la
nube. **La tarea no reemplaza al loop de sesión hasta que esa corrida salga `ok`.**

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
- El monitoreo depende de que **Chrome siga logueado**; si la sesión cae, el asistente lo avisa y hay que reabrirla. (Pasó: al 9-ago Chrome estaba deslogueado de IG y Rubén tuvo que entrar a mano.)
- El asistente solo "vive" mientras esa sesión/loop esté activa en esa PC. **Esto no se arregló** — lo que se arregló es que ahora su muerte **hace ruido** (ver el hombre muerto en la sección 4).
- El asistente **nunca publica, comenta ni envía DMs sin permiso de Rubén**.
