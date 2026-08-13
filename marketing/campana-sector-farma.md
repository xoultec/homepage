# Campaña: "El sector ya está aquí" 💊

Campaña **sectorial** para farma / médico en RD. Es la primera campaña de XoulTec que no le habla
a "cualquier negocio": le habla a un solo rubro, con datos de ese rubro.

---

## 1. La gran idea

**El hallazgo que la sostiene (10-ago-2026):** al cruzar el censo DGII del nicho farma/médico contra
la base maestra salió que **18 de los 38 clientes reales de XoulTec están en ese nicho**. Casi la
mitad de la cartera vive en un solo rubro, y nadie lo estaba diciendo.

Eso convierte una debilidad aparente —una cuenta chica, sin alcance— en la única ventaja que
importa en un mercado pequeño: **XoulTec ya corre la operación de 18 empresas del sector**, y en
farma/médico dominicano esas empresas se conocen entre ellas.

**Tagline:** **"El sector ya está aquí."**
**Sub:** *"18 empresas de farma y médico ya operan en XoulTec."*

> ⚠️ **Precisión obligatoria.** El número exacto es **18** y hay que decirlo así. El censo tiene 3.471
> empresas del rubro, así que 18 es el **0,5 %**: NO decir "la mitad del sector", "líder del sector"
> ni nada que sugiera cuota de mercado. Lo que es cierto y suficiente: *18 empresas del sector ya
> operan en XoulTec*. En un mercado donde todos se conocen, 18 nombres pesan más que un porcentaje.

**Y nadie se nombra sin permiso.** Mencionar un cliente exige su OK explícito
(`mensaje-cliente-colaboracion.md`). Sin permiso se habla del número, nunca del nombre.

---

## 2. Por qué esta campaña puede funcionar donde las otras no

Las campañas anteriores fallaron por distribución, no por contenido: la cuenta de IG tiene 20
seguidores y el correo frío ya se descartó (`marketing-boca-en-boca`). Esta campaña **no depende de
alcance comprado ni de listas frías**. Depende de que 18 clientes hablen dentro de su propio gremio.

Medición del 9/10-ago que fija la prioridad de canales:

| Canal | Resultado real |
|---|---|
| Estado de WhatsApp | **26 vistas** en 12 h |
| Post de Instagram | 1 like en 12 h |

**WhatsApp es el canal. Instagram es la vitrina.**

---

## 3. Público, con nombre y tamaño

Del censo DGII (`Apify/censo/CENSO-CRUZADO-CLIENTES.csv`, 3.471 empresas):

| Grupo | Empresas | Lectura |
|---|---|---|
| `D-clinico` | 1.656 | El más grande. Clínicas, laboratorios, consultorios. |
| `A-mayorista` | 991 | **Donde están los 18 clientes.** Distribuidoras. |
| `C-retail` | 534 | Farmacias. |
| `B-fabricante` | 131 | Laboratorios productores. |
| `E-otra` | 159 | — |

**El foco es `A-mayorista`.** Ahí está la tracción probada, ahí el producto encaja mejor (lotes,
vencimiento, fuerza de ventas en calle) y ahí los clientes actuales conocen a los demás por nombre.

> ⚠️ **El censo es un mapa, no una lista de correo.** Solo **9 registros de 3.471 tienen correo** y
> 13 tienen alguna red social — el archivo trae enlaces de búsqueda sin ejecutar, no datos de
> contacto. Sirve para saber quién existe, segmentar y reconocer un nombre cuando llegue; **no**
> para mandarle nada a nadie.

---

## 4. El mensaje: producto hecho para este rubro

Aquí XoulTec deja de ser "un ERP" y pasa a ser específico. Todo esto existe y está verificado en
`pventa-repo`:

1. **Lotes con fecha de vencimiento.** Módulo `inventory/lots` con `fecha_vence`, y salida ordenada
   por **vencimiento más próximo primero**. Para una distribuidora farmacéutica esto no es una
   funcionalidad: es la diferencia entre vender y botar mercancía.
2. **e-CF con la DGII**, comprobantes y 606/607 en regla.
3. **Fuerza de ventas en la calle** — mapa GPS en vivo, recorrido del día, y verificación de que la
   visita coincide con lo facturado.
4. **La comisión se gana cuando el dinero entra al banco** — se lee la fecha del volante de depósito,
   no la del recibo. Un cheque a fecha no comisiona hasta que se pueda depositar.
5. **Capacidad de ruta medida**: cuántos clientes le caben a cada vendedor en su jornada.

Los puntos 3, 4 y 5 son el diferenciador duro: **ningún ERP de caja los tiene**, y son exactamente
los dolores de una distribuidora con vendedores en ruta.

---

## 5. Los 3 movimientos (en orden)

### Movimiento 1 — Los 18 (semanas 1-4) 🎯
La acción de mayor impacto, y no es contenido.

Rubén habla con los 18 clientes del sector, **de cinco en cinco por semana**. Dos objetivos por
conversación:
- **Permiso** para nombrarlos o hacer un spotlight.
- **Referido**: quién más del gremio conoce. Su enlace está en la app (`/m/referir`) y **ya viaja en
  cada factura, cotización y estado de cuenta que ellos mandan** — casi ninguno lo sabe.

> Recordatorio incómodo: la tabla `referrals` de la maestra **no existe todavía**, o sea que el
> programa nunca ha acreditado ni un solo referido. No está roto: está sin estrenar.

### Movimiento 2 — Contenido de rubro (continuo)
Posts que solo le hablan a farma/médico. Publicar en IG (vitrina) y replicar a estado de WhatsApp
(alcance). Ideas, en orden de fuerza:
- **"El lote que vence primero, sale primero"** — vencimiento y merma. El más específico de todos.
- **"La comisión se gana cuando el dinero entra al banco"** (`comisiones.png`, ya producido).
- **"¿Cuántos clientes le caben a tu vendedor?"** (carrusel `ruta-1..3`, ya producido).
- **"18 empresas del sector ya operan en XoulTec"** — el post ancla, cuando haya permisos.

### Movimiento 3 — Enriquecer poco y bien (cuando 1 y 2 estén andando)
No enriquecer 3.471. Tomar los **991 mayoristas**, quitar los que ya son clientes, y trabajar un
subconjunto pequeño con nombre y apellido. Sin datos de contacto no hay campaña posible, y con
9 correos en todo el archivo no hay por dónde empezar.

> **Corrección (11-ago):** enriquecer estaba mal planteado. Lo que le hace falta al Movimiento 1 no
> son datos de contacto — es **el nombre**, para poder preguntar *"¿ustedes tienen trato con Lufra,
> con Dinafa?"* en vez de *"¿a quién conoces?"*. Eso ya sale del censo sin buscar nada:
> **`lista-40-mayoristas-conversacion.md`**. La búsqueda dirigida se hace después, y solo para la
> empresa concreta que un cliente mencione.

---

## 6. Métricas honestas

| Qué se mide | Meta |
|---|---|
| Permisos de spotlight conseguidos | 5 de 18 |
| **Referidos citados por un cliente** | ≥1 |
| **Primera fila en la tabla `referrals`** | que exista |
| Vistas de estado de WhatsApp | >26 por publicación |
| Likes de Instagram | *no es meta* — con 20 seguidores no mide nada |

**El indicador que decide si esta campaña sirvió es uno solo: que la tabla `referrals` deje de estar
vacía.** Todo lo demás es actividad.

---

## 7. Lo que hace Claude vs. Rubén
- **Claude:** gráficas y copy del contenido de rubro, publicación en IG + réplica a WhatsApp,
  seguimiento del registro, y el recordatorio semanal por Telegram de a quién toca hablarle.
- **Rubén:** las 18 conversaciones. No son delegables — y son la campaña.

---

## 8. La pieza de apertura y para qué sirve

✅ **`marketing/instagram/lote-vence.png`** — fuente `post-graphics-src/lote-vence.html`.
Tres lotes, el de vencimiento más próximo marcado **1º EN SALIR**, los otros EN ESPERA.

> ⚠️ **No es un post. Es la excusa para escribir.** Publicada sola en una cuenta de 20 seguidores no
> produce nada — ese error ya se cometió el 9-ago. Su trabajo es abrir las 18 conversaciones del
> Movimiento 1: nadie le escribe a un cliente de la nada a pedirle referidos, pero sí se le manda
> algo hecho pensando en su dolor. Quien reacciona se autoidentifica como del rubro y con el problema.

**Mensaje de apertura por WhatsApp** (adjuntar la imagen; ajustar el nombre):

```
Hola [nombre] 👋 Hicimos esta pieza pensando en distribuidoras como la de ustedes.

En PVenta la salida se ordena sola por fecha de vencimiento — el lote que vence primero es
el que sale primero, sin que dependa de quién esté en el almacén ese día.

¿Les está funcionando bien esa parte? Si hay algo que ajustar, dígame y lo vemos.
```

**Por qué así:** no vende nada, no pide nada, y termina en una pregunta sobre **su** operación. El
referido no se pide en este mensaje — se pide en la respuesta, cuando ya hay conversación. Pedirlo
de entrada convierte un gesto en un cobro.

**Segundo mensaje, solo si contestan** (aquí sí):

```
Me alegra 🙌 Una cosa: su enlace de referido está en la app, en "Referir cliente". Va también
en el QR de sus facturas y estados de cuenta, así que ya lo están repartiendo sin saberlo.

Si se le ocurre alguna otra distribuidora a la que esto le sirva, mándeselo — si entra, queda
acreditada a ustedes.
```

---

### Próximo paso
1. **Lista de los 18** con su enlace de referido armado y el nombre de contacto. Rubén manda cinco
   por semana.
2. Publicar `lote-vence.png` en IG + estado de WhatsApp — como vitrina, no como motor.
