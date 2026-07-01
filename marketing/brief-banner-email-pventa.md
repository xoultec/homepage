# Brief: banner de campaña para el pie de los correos de PVenta

**Contexto:** PVenta (el ERP de XoulTec) envía correos a los clientes (facturas, cotizaciones, estados de cuenta). Cada correo lleva al pie una firma discreta y queremos sumarle un banner pequeño de la campaña de marketing. **Es un banner, no un post completo.**

## Formato y tamaño (lo más importante)

- **Proporción apaisada 4:1** (ancho ≫ alto). En el correo se muestra a máximo **384 px de ancho × 96 px de alto** (equivale a 1" × 4").
- **Exportar a 2x para pantallas retina:** **1200 × 300 px** (mantiene el 4:1). Se verá reducido dentro del correo.
- Formato **PNG**. Peso **< 150 KB** (importante para no caer en spam). **Sin animación.**

## Contenido (clave: se verá chiquito)

- A ese tamaño **NO caben los bullets largos** del post original — serían ilegibles. Reducir a lo esencial: **logo XoulTec + un solo gancho corto + una llamada** (ej. "Síguenos @xoultec" o "xoultec.com").
- Texto grande, legible al escalar a 384 px de ancho. Márgenes de seguridad: nada pegado a los bordes.
- Fondo sólido (el azul marino de marca) para que combine con el cuerpo del correo.
- Base de contenido: el post `instagram/xoultec-ig-nifarmed.png` (en edición), adaptado a formato banner.

## Ubicación fija (IMPORTANTE — así se desacopla de PVenta)

Los banners viven en una **carpeta y nombres fijos** dentro de este mismo repo (`xoultec-website`, Next.js). `public/` se sirve en la raíz del dominio, así que:

| Archivo en el repo | URL pública fija |
|---|---|
| `public/email/campana-es.png` | `https://xoultec.com/email/campana-es.png` |
| `public/email/campana-en.png` | `https://xoultec.com/email/campana-en.png` |

**Los nombres NO cambian entre campañas.** Para actualizar el creativo, se **sobrescriben** esos mismos archivos y se hace push (auto-deploy en Vercel). PVenta siempre apunta a esas dos URLs fijas → no hay que re-desplegar PVenta ni cambiar nada de su lado al rotar la campaña.

> Crear la carpeta `public/email/` si no existe.

## Entregables (todo esto lo produce el agente)

1. **`public/email/campana-es.png`** — versión en **español**, 1200 × 300, < 150 KB.
2. **`public/email/campana-en.png`** — misma pieza en **inglés** (PVenta es multipaís; el correo sale en el idioma del vendedor, ES o EN).
3. **Texto alternativo (alt)** para cada versión — el texto que se muestra si el cliente bloquea imágenes (uno en ES, uno en EN).
4. **Destino del clic** — definir a dónde lleva el banner al hacer clic: Instagram `@xoultec` o un landing de la campaña (entregar la URL exacta).
5. Commitear y pushear al sitio siguiendo el workflow del `CLAUDE.md` de este repo (auto-deploy en Vercel).

## Qué hace el equipo de PVenta (integración)

Una vez las dos URLs estén vivas + alt + URL de destino: se cablean al footer HTML del correo (clickeables, escaladas a máx 96 px de alto). Banner ES en correos en español, banner EN en inglés. **Este agente NO toca el repo de PVenta** — solo entrega los archivos en la ubicación fija de arriba.
