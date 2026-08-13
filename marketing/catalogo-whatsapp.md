# Catálogo de WhatsApp Business — los dos números

XoulTec tiene **dos WhatsApp Business** y **cada uno lleva su propio catálogo**. Desde el 12-ago-2026
los dos tienen **el mismo contenido**, por decisión de Rubén: *"me contactan de ambos países por el
número"* — separar por mercado solo escondía productos que sí se venden.

| | Número | Perfil de Chrome |
|---|---|---|
| RD | **+1 (809) 252-4007** | el que Rubén nombró **"HP Omen"** |
| USA | **+1 (913) 413-6583** | el segundo perfil, enlazado el 12-ago-2026 |

⚠️ **WhatsApp Web solo admite una cuenta por perfil de Chrome**, así que hay dos navegadores
conectados y hay que elegir el correcto antes de tocar nada. Ver más abajo.

## Por qué se rehicieron (12-ago-2026)

Los dos catálogos tenían **los mismos 5 ítems y ninguno era un producto real del sitio**:
"Enterprise ERP", "PVenta Mobile" (que es una función de PVenta, no un producto) y tres servicios.
Faltaban **8 de los 9 productos** de `src/lib/products.ts` — incluidos eDental y eClinic, que son
justo los que la cuenta de IG lleva semanas promocionando. Los 5 compartían la misma hoja de
imágenes genérica.

## Estado actual — 13 ítems en cada número

| Ítem | Imagen | Visible |
|---|---|---|
| PVenta ERP / Gestión Empresarial y e-CF DGII | ✅ **captura real** (`public/img/sicacc.jpg`) | Sí |
| eClinic Dental / Clínicas Dentales | tarjeta de respaldo | **Oculto** |
| EasyPOS / POS para Restaurantes | tarjeta de respaldo | **Oculto** |
| eClinic / Gestión Clínica | tarjeta de respaldo | **Oculto** |
| AutoShop Pro / Talleres y Repuestos | tarjeta de respaldo | **Oculto** |
| Nómina / Payroll RD + USA | tarjeta de respaldo | **Oculto** |
| EduApp / Gestión Escolar | tarjeta de respaldo | **Oculto** |
| FRI / Iglesias y Organizaciones Religiosas | tarjeta de respaldo | **Oculto** |
| eLoan / Préstamos y Cobranzas | tarjeta de respaldo | **Oculto** |
| PVenta Mobile | (la vieja) | **Oculto** — se plegó dentro de PVenta ERP |
| Custom Software · Corporate Email · Security & Antivirus | (las viejas) | Sí — no son de los 9, se dejaron |

**Los 8 nuevos están ocultos a propósito.** WhatsApp **exige una imagen** para crear un ítem (con todo
el texto lleno, "Add to catalog" sigue apagado sin foto), y a Rubén no le gustaron las tarjetas
generadas. Así que el texto quedó cargado y la vitrina cerrada hasta que lleguen las capturas reales.

## Lo que falta: las capturas

Rubén pidió **capturas reales del producto** en vez de tarjetas de diseño. No se pudieron hacer:
- En esta PC solo están los repos de PVenta, Colegio (=EduApp), Payroll (=Nómina), Ads y xoul-gateway.
  **No están** eClinic, eClinic Dental, EasyPOS, AutoShop Pro, FRI ni eLoan.
- En `public/` la única captura real es `img/sicacc.jpg` (Cuentas por Pagar) y `img/pventa-mobile.webp`.
- ⚠️ **Regla de Rubén (9-ago):** nada de datos reales de clientes. Toda captura tiene que salir de un
  tenant de prueba, igual que se hizo con el TV del GPS.

**Siguiente paso:** Rubén manda una captura por producto (la pantalla que mejor lo venda: odontograma
de eDental, KDS de EasyPOS, cartera de eLoan, agenda de eClinic…). Cambiar la imagen es: abrir el ítem
→ Edit → "Remove image number 1" → subir la nueva → destildar **Hide item** → Save. **Hay que hacerlo
en los dos números.**

## Convenciones que se siguieron

- **Nombre:** `<Producto> / <descriptor en español>`, respetando el formato bilingüe que ya tenían los
  ítems viejos.
- **Descripción:** `English: … / Español: …` en dos líneas (shift+Enter), texto tomado de los campos
  `cardDescEn` / `cardDescEs` de `src/lib/products.ts` — si cambian allá, hay que actualizarlos aquí.
- **Link:** `xoultec.com/productos/<slug>` (los viejos apuntaban al home pelado, que no dice nada).
- **Country of origin:** `United States`, igual que tenían los ítems viejos (matriz en EE.UU.).
- **Sin precios.** ⚠️ El formulario del **913 sí trae campos de Price y Sale Price** que el del 809 no
  tiene; se dejaron vacíos a propósito.

Cada alta o edición **pasa por revisión de WhatsApp** antes de mostrarse.

## Trampas de trabajar con dos navegadores

**El 12-ago casi se crea un eDental duplicado en el catálogo de RD.** Tras `select_browser`, abrir una
pestaña nueva con `navigate` standalone **revirtió la selección** al otro navegador sin avisar, y el
formulario ya estaba medio lleno cuando se notó por la lista de ítems de la izquierda.

**Regla:** después de cambiar de navegador, **verificar el número antes de escribir nada** —
Tools → Business profile → bajar hasta *Phone number*. No fiarse de `list_connected_browsers`: los
muestra como "Browser 1 / Browser 2" sin nombre útil.

## Tarjetas de respaldo

`marketing/catalogo-wa/wa-<slug>.png` (1080×1080), generadas con
`marketing/catalogo-wa-src/catalogo-wa.html?p=<slug>`. Rubén las rechazó para uso público; quedan solo
como relleno mientras el ítem está oculto, o para el producto que se quede sin captura.
