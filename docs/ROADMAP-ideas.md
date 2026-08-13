# 🗺️ Roadmap de ideas — Marketing y Producto XoulTec

> Tablero maestro de las ideas y trabajos en curso. Actualizado 2026-07-04.
> Estados: 💡 Idea · 📝 Especificado · 🔄 En progreso · ✅ Hecho · ⏸️ Bloqueado

---

## 🎯 Decisiones tomadas (para no re-discutir)
- **Canal de venta real = boca en boca / referidos.** El email frío se DESCARTA (la gente bloquea, datos sensibles). La prospección "tanteo" en IG es secundaria.
- **A los prospectos NO se les contacta en frío.** Se les llega vía: (a) la feature de Reorden Predictivo (footer legítimo del tenant), (b) contenido de prueba social que sus proveedores comparten.
- **El ICP probado por la data = SALUD** (farmacias, clínicas, hospitales).
- **Reorden Predictivo = add-on con aceptación del cliente** + firma XoulTec multicanal.

---

## D. 🚀 PRODUCTO — Reorden Predictivo (la joya)
| # | Ítem | Estado | Próximo paso |
|---|------|--------|--------------|
| D1 | Concepto + POC (7 tenants, ~470 clientes predecibles) | ✅ | — |
| D2 | Especificación completa | 📝 `docs/spec-reorden-predictivo.md` | Revisar / desglosar Fase 1 |
| D3 | Add-on con pantalla de aceptación (formalidad) | 📝 (sección 2b) | — |
| D4 | Firma multicanal: email (auto ✅) + WhatsApp (nuevo) | 📝 (sección 6b) | Implementar firma WhatsApp |
| D5 | Opción en web **y** app mobile (rutas `m.*`) | 📝 (sección 8) | — |
| D6 | **Fase 1 / MVP como tareas de dev** | 💡 | ← siguiente entregable cuando quieras |
| D7 | **Vista por vendedor** (herramienta para el cuerpo de ventas: lista diaria de clientes por reordenar, por zona/ruta, en mobile) | 📝 (sección 8b) | — |

**Triple win:** tenant vende más · su cliente no se queda sin stock · XoulTec firma en cada mensaje a la cartera.

---

## B. 📣 MARKETING — Contenido y motor de crecimiento
| # | Ítem | Estado | Próximo paso |
|---|------|--------|--------------|
| B1 | **Motor de referidos** (boca en boca) | 💡 | Definir incentivo (mes gratis referidor+referido) + material WhatsApp con link `/r` |
| B2 | **Serie "prueba social"** con clientes fieles (Nifarmed, Osteosíntesis, Diaconia…) | 💡 plan listo | Draft 2 posts (falta 1 línea por cliente: desde cuándo / a qué se dedica) |
| B3 | Enfoque "go green" transversal en posts | 📝 `marketing/instagram/enfoque-verde.md` | Aplicar ligero en cada post + dedicado c/2-3 sem |
| B4 | Carrusel e-CF con lámina verde (Lun 6) | ✅ `ecf-1..6.png` | Rubén arrastra las 6 imágenes en Business Suite |
| B5 | Testimonios existentes (Nifarmed, Don Bululo, Vitral…) | ✅ en `marketing/instagram/` | Reusar en la serie B2 |

---

## A. 📱 OPERACIÓN Instagram (en marcha, loop activo)
| # | Ítem | Estado | Próximo paso |
|---|------|--------|--------------|
| A1 | Monitoreo IG (DMs/comentarios/seguidores) | 🔄 loop activo | Sigue solo |
| A2 | Post Restaurantes → 9am con caption+imagen | ✅ | — |
| A3 | Post 4-Julio Instagram | ✅ publicado | — |
| A4 | Limpieza "Siguiendo" (122→116; meta: negocios+clientes+3 personales) | 🔄 pausado | Seguir unfollows en el loop · `marketing/instagram/limpieza-following.md` |
| A5 | Follow-growth prospectos RD (a discreción) | 🔄 pausado | `marketing/instagram/prospectos-follow.md` |

---

## C. 📊 DATOS — Prospectos y cross-sell
| # | Ítem | Estado | Próximo paso |
|---|------|--------|--------------|
| C1 | Base de ~9K prospectos desde `maeclientes` (ICP salud), validada RNC | ✅ | `data/prospectos-maeclientes.csv` (uso vía feature D, no cold email) |
| C2 | Análisis de tenants + cross-sell (35 de 45 solo usan PVenta) | ✅ `data/tenants-analisis.md` | (baja prio) ofrecer eClinic/Nómina a clientes médicos |

---

## ⏸️ Bloqueos / pendientes de Rubén
| # | Ítem | Acción |
|---|------|--------|
| X1 | **Facebook Page publica FALLA** (2 posts seguidos fallaron: Restaurantes + 4-Jul) | Reconectar la Página de FB en Business Suite (Config → Cuentas vinculadas). Mientras, todo post a FB seguirá fallando. |
| X2 | Form de leads en pausa (falta `LEADS_API_KEY` en Vercel, ~2 sem) | Al volver Vercel: poner la key + revertir `/r` y `/ofertas` a `<LeadForm />` |

---

## ▶️ Próximos pasos sugeridos (prioridad)
1. **(Rubén)** Reconectar la Página de Facebook — desbloquea toda publicación a FB. [X1]
2. **Desglosar Fase 1 del Reorden Predictivo** como tareas de dev. [D6]
3. **Arrancar la serie de prueba social** — dar 1 línea por cliente y arrancamos los posts. [B2]
4. **Definir el incentivo de referidos** — dispara el motor de boca en boca. [B1]

_Sigue soltando ideas — se agregan aquí._
