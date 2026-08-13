# Campaña: "Go Green" 🌱

Campaña dedicada de conservación para XoulTec. **No sustituye** al hilo verde transversal de
`marketing/instagram/enfoque-verde.md` — lo complementa: aquel es el cierre de una línea que va en
*todos* los posts; esta es la capa dedicada, con su propio calendario y su propia conversión.

---

## 1. La gran idea

**Insight:** nadie compra un ERP para salvar el planeta. Pero **todo el que ya digitalizó su negocio
ya está conservando** — y no lo sabe. No hay que pedirle a nadie que cambie nada: hay que **mostrarle
lo que ya está haciendo**.

Eso convierte la campaña en algo que casi ninguna campaña verde puede ser: **honesta y sin pedir
sacrificio**. No decimos "haz esto por el planeta". Decimos "esto que ya haces, cuenta".

**Tagline:** **"Digitalizar también es conservar."**
**EN:** *"Going digital is going green."*

**Hashtag de campaña:** **#DigitalEsVerde** (+ `#MenosPapelMásPlaneta`)

**La afirmación que sostiene todo:** cada e-CF es una factura que **no se imprime**. Es literal,
verificable y propia — no es greenwashing porque no estamos comprando bonos de carbono ni plantando
árboles de utilería: es una consecuencia directa del producto.

> ⚠️ **Regla de honestidad (heredada de `enfoque-verde.md`):** la afirmación fuerte y defendible es
> **"menos papel"** y **"menos kilómetros"**. **Prohibido** prometer impactos de CO₂, equivalencias en
> árboles o cifras de huella sin fuente citable. Una cifra inventada mata la campaña entera y con ella
> la credibilidad de la marca.

---

## 2. Objetivos y métricas

| Objetivo | Métrica a vigilar |
|----------|-------------------|
| Dar a los clientes actuales una razón para hablar de XoulTec | Compartidos, guardados, menciones en stories |
| Alimentar el motor de referidos (el canal que sí convierte) | Visitas a `/r` y `/ofertas`, referidos citados en DM/WhatsApp |
| Diferenciar la marca de la competencia local | Comentarios, seguidores nuevos del sector |
| Sumar un motivo de compra al que ya existe | Leads que mencionan el ángulo verde |

**Ojo con la meta:** esta campaña **no está hecha para generar leads fríos.** Está hecha para que un
cliente contento tenga algo que compartir. Medirla por leads directos es medirla mal — se mide por
**compartidos y referidos**.

---

## 3. Público

- **Primero: los clientes actuales.** Son los que ya pueden decir "yo hago esto". Son el altavoz.
- Segundo: dueños de PYME en RD y NY/NJ que ya sienten la presión del papel (archivo físico, imprenta,
  espacio, tinta) — el dolor operativo entra antes que el ambiental.
- Tercero: público general que premia a las marcas con postura. Alcance, no conversión.

---

## 4. Los 4 pilares de contenido

1. **📄 El papel que no se imprime** — e-CF, expedientes clínicos, recibos, reportes en pantalla,
   comprobantes digitales. El pilar ancla, el más defendible.
2. **🛣️ Los kilómetros que no se manejan** — rutas bien dimensionadas (cierre semanal), app móvil
   (el vendedor no vuelve a la oficina a entregar papeles), **Portal de Autogestión** (el cliente pide,
   paga y consulta sin viajar). Pilar nuevo, habilitado por los features de fuerza de ventas.
3. **💭 Reflexión** — preguntas que invitan a pensar, sin vender. Aquí van las fechas ambientales.
4. **🤝 Referido verde (conversión)** — el CTA go-green del footer de los correos de PVenta ya apunta a
   `/ofertas`. Esta campaña le da contenido a ese banner: recomendar XoulTec es sumar un negocio más
   que deja de imprimir.

> Regla de dosis: **1 post dedicado por semana**, máximo. El hilo verde ligero sigue en todos los demás.
> Una cuenta que solo habla de verde deja de ser creíble como empresa de software.

---

## 5. La serie héroe — "Lo que tu negocio ya dejó de imprimir"

El formato repetible de la campaña. Cada entrega toma **un documento concreto** que antes era papel y
muestra qué pasó con él. Simple, visual, infinito.

| # | El papel de antes | Hoy en XoulTec | Producto |
|---|-------------------|----------------|----------|
| 1 | La factura en talonario | e-CF, validada con la DGII | PVenta |
| 2 | El expediente del paciente en carpeta | Expediente digital | eClinic / eDental |
| 3 | El volante de depósito archivado | Foto leída por el sistema | PVenta (cobros) |
| 4 | El reporte 606/607 impreso para revisar | En pantalla, exportable | PVenta |
| 5 | El recibo de ofrenda en libreta | Registro digital | FRI |
| 6 | El estado de cuenta que se iba por correo físico | Portal de Autogestión, 24/7 | Portal |
| 7 | El pedido escrito en papel, digitado luego en la oficina | El pedido entra desde el celular | PVenta móvil |

> ⚠️ **Precisión de producto (Rubén, 9-ago-2026):** en el móvil **la cotización ya es un pedido/orden** —
> no es un presupuesto que después alguien convierte. El contraste correcto de la entrega 7 es
> *"se anota en papel y alguien lo digita"* vs *"entra directo al sistema"*. No escribir "cotización
> que se convierte en factura": describe mal el flujo real.

**Formato:** carrusel de 2 láminas — lámina 1 el papel, lámina 2 el digital. Cero texto de más: la
comparación se ve sola.

### ✅ PLANTILLA LISTA (9-ago-2026)
Fuente única: `marketing/instagram/post-graphics-src/gogreen-antes-hoy.html`
Salida: `gogreen-ah-<entrega>-<1|2>.png` — **las 14 láminas ya renderizadas** en `marketing/instagram/`.

```
gogreen-antes-hoy.html?e=<1..7>&s=<1|2>      s=1 → ANTES,  s=2 → HOY
```

**Cómo funciona el contraste** (es lo que hace que el swipe golpee): las dos láminas comparten
retícula exacta — chip, ícono, titular y bajada en la misma posición — y **solo cambia la paleta**.
ANTES va en marrón papel apagado (`#3f3a33 → #2b2723`), con el logo atenuado, el ícono desaturado y sin
etiqueta de producto. HOY va en el verde de campaña (`#064e3b → #047857`) con acento menta y el producto
arriba a la derecha. El ojo lee el cambio antes que el texto.

**Para agregar una entrega nueva:** sumar un objeto al array `ENTRIES` del propio HTML. Nada más —
ni CSS ni archivos nuevos.

**Re-render de las 14** (bash, desde `marketing/instagram/`):
```bash
CH="/c/Program Files/Google/Chrome/Application/chrome.exe"
SRC="file:///C:/Data/4Claude/Repositorios/xoultec-website/marketing/instagram/post-graphics-src/gogreen-antes-hoy.html"
OUT="C:\Data\4Claude\Repositorios\xoultec-website\marketing\instagram"
for e in 1 2 3 4 5 6 7; do for s in 1 2; do
  "$CH" --headless=new --disable-gpu --hide-scrollbars \
    --screenshot="$OUT\gogreen-ah-$e-$s.png" --window-size=1080,1350 \
    --virtual-time-budget=2500 "$SRC?e=$e&s=$s"
done; done
```

---

## 6. Calendario (6 semanas · 1 dedicado/semana)

| Sem | Post dedicado | Pilar |
|-----|---------------|-------|
| 1 | **Lanzamiento:** "Digitalizar también es conservar" — la idea madre | Reflexión |
| 2 | Serie #1: la factura en talonario → e-CF | Papel |
| 3 | "¿Cuánto papel imprime tu negocio en un año?" — pregunta abierta, sin cifra nuestra | Reflexión |
| 4 | Serie #2: expediente en carpeta → expediente digital | Papel |
| 5 | **"Los kilómetros que no se manejan"** — rutas + app + portal | Kilómetros |
| 6 | **Cierre + referido:** "Cada negocio que digitalizas es papel que nadie imprime. ¿Conoces uno?" → `/r` | Referido |

**Fechas ambientales para posts dedicados extra** (aprovechar, no forzar): Día de la Tierra (22-abr),
Día del Medio Ambiente (5-jun), Día del Árbol, Día Mundial del Reciclaje (17-may).

---

## 7. La palanca real: el cliente que ya lo hace

La acción de mayor impacto de esta campaña **no es un post**: es que un cliente actual diga
públicamente "nosotros no imprimimos facturas hace X". Eso es prueba social + verde + referido en una
sola pieza, y no lo puede fabricar la marca.

**Cómo se consigue:** al pedir permiso de spotlight (ver `mensaje-cliente-colaboracion.md`), agregar la
pregunta verde. A un cliente le cuesta poco decirlo y le suma a su propia marca — por eso funciona.

⚠️ **Nada de datos de clientes sin permiso explícito** — ni volumen, ni nombre, ni cifras de su
operación. Aplica la misma regla que rige el material de fuerza de ventas.

---

## 8. Formatos y specs
- Dedicados: 1080×1350 (4:5). Reflexión: fondo verde profundo (`#064e3b → #047857`), como la lámina de
  cierre de los carruseles — el verde ya es lenguaje de marca en la cuenta.
- Serie "antes/hoy": carrusel 2 láminas o imagen partida.
- Marca: azul `#1e3a5f`, ámbar `#f59e0b`, verde `#10b981` / `#6ee7b7` para acentos.

## 9. Hashtags
- Campaña: `#DigitalEsVerde #MenosPapelMásPlaneta #XoulTec`
- Verdes: `#NegocioVerde #GoGreenRD #SostenibilidadRD #GoPaperless`
- Cruce con la campaña ancla: `#SeaCualSeaTuNegocio` cuando el post lo permita

## 10. Funnel
**Ver** (reflexión) → **Reconocerse** ("yo ya hago eso") → **Contarlo** (compartir/mencionar) →
**Referir** (`/r` → WhatsApp → cierra Rubén).

El escalón que importa es el tercero. Si nadie comparte, la campaña no está funcionando, por muchos
"me gusta" que junte.

## 11. Lo que hace Claude vs. Rubén
- **Claude:** gráficas (HTML → PNG, pipeline de `post-graphics-src/`), captions ES/EN, calendario,
  guiones, y el registro de lo publicado.
- **Rubén:** permisos de clientes para el testimonio verde, visto bueno final, y el cierre por WhatsApp.

---

### Próximo paso sugerido
1. Producir la **Semana 1** (lanzamiento) — es una sola gráfica y ya está definida la idea.
2. Preparar la **serie "antes/hoy"** como plantilla reutilizable: se hace una vez y sirve para las 7.
3. Meter la pregunta verde en el guion de permisos, para que las respuestas lleguen antes de la Sem. 6.
