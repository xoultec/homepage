// Dibuja el flyer de facturación electrónica (e-CF) en un <canvas> de 1080×1350 (4:5: sirve para
// estado de WhatsApp, Instagram e impresión en media carta). Va en el navegador para que cada
// promotora baje el suyo con SU QR, sin servidor de por medio.
//
// Contenido: lo que XoulTec INCLUYE en el servicio e-CF (alcance definido por Rubén, 10-nov-2026),
// dicho corto. ⛔ Sin precios ni condiciones de pago: lo comercial lo confirma Rubén antes de
// imprimir (ver `aprobado` en src/lib/promotora-flyers.ts).

const W = 1080
const H = 1350

const C = {
  primary: '#1e3a5f',
  primaryLight: '#2d5a8e',
  secondary: '#f59e0b',
  dark: '#0f172a',
  white: '#ffffff',
  soft: 'rgba(255,255,255,0.82)',
}

const FONT = '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'

const PUNTOS = [
  'Te inscribimos como emisor electrónico ante la DGII',
  'Hacemos la certificación completa por ti',
  'Cada factura se firma y se envía sola a la DGII',
  'Factura impresa con su código QR',
  'Si la DGII rechaza algo, lo corregimos contigo',
]

export type FlyerEcfDatos = {
  qr: HTMLCanvasElement | HTMLImageElement
  promotora: string
  whatsapp: string
  borrador: boolean
}

function cargarImagen(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = src
  })
}

function partir(ctx: CanvasRenderingContext2D, texto: string, ancho: number): string[] {
  const palabras = texto.split(' ')
  const lineas: string[] = []
  let linea = ''
  for (const p of palabras) {
    const prueba = linea ? `${linea} ${p}` : p
    if (ctx.measureText(prueba).width > ancho && linea) {
      lineas.push(linea)
      linea = p
    } else {
      linea = prueba
    }
  }
  if (linea) lineas.push(linea)
  return lineas
}

function rect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

export async function dibujarFlyerEcf(canvas: HTMLCanvasElement, d: FlyerEcfDatos) {
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Fondo
  const g = ctx.createLinearGradient(0, 0, W, H)
  g.addColorStop(0, C.primary)
  g.addColorStop(0.55, C.primaryLight)
  g.addColorStop(1, C.dark)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)

  // Encabezado: logo + sello DGII
  const logo = await cargarImagen('/icon-192.png')
  if (logo) ctx.drawImage(logo, 72, 64, 88, 88)
  ctx.fillStyle = C.white
  ctx.font = `800 48px ${FONT}`
  ctx.textBaseline = 'middle'
  ctx.fillText('XoulTec', 180, 108)

  const sello = 'Proveedor autorizado por la DGII'
  ctx.font = `700 28px ${FONT}`
  const sw = ctx.measureText(sello).width + 48
  rect(ctx, W - 72 - sw, 80, sw, 56, 28)
  ctx.fillStyle = C.secondary
  ctx.fill()
  ctx.fillStyle = C.dark
  ctx.fillText(sello, W - 72 - sw + 24, 109)

  // Titular
  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = C.white
  ctx.font = `900 92px ${FONT}`
  let y = 300
  for (const l of partir(ctx, 'Factura electrónica sin complicarte', W - 144)) {
    ctx.fillText(l, 72, y)
    y += 100
  }
  ctx.fillStyle = C.secondary
  ctx.font = `700 40px ${FONT}`
  ctx.fillText('Cumple con la DGII. El trámite lo hacemos nosotros.', 72, y + 6)
  y += 90

  // Lo que incluye
  ctx.font = `500 34px ${FONT}`
  for (const p of PUNTOS) {
    ctx.fillStyle = C.secondary
    ctx.beginPath()
    ctx.arc(92, y - 11, 14, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = C.dark
    ctx.font = `900 20px ${FONT}`
    ctx.fillText('✓', 84, y - 4)
    ctx.fillStyle = C.soft
    ctx.font = `500 34px ${FONT}`
    ctx.fillText(p, 128, y)
    y += 60
  }

  // Tarjeta del QR
  const ty = 960
  rect(ctx, 72, ty, W - 144, 300, 32)
  ctx.fillStyle = C.white
  ctx.fill()
  const qs = 252
  ctx.imageSmoothingEnabled = false
  ctx.drawImage(d.qr, 96, ty + 24, qs, qs)
  ctx.imageSmoothingEnabled = true

  const tx = 96 + qs + 40
  const tw = W - 144 - (tx - 72) - 24
  ctx.fillStyle = C.dark
  ctx.font = `800 44px ${FONT}`
  ctx.fillText('Escanea y escríbenos', tx, ty + 82)
  ctx.fillStyle = '#334155'
  ctx.font = `500 30px ${FONT}`
  let yy = ty + 130
  for (const l of partir(ctx, `Te atiende ${d.promotora}, de XoulTec.`, tw)) {
    ctx.fillText(l, tx, yy)
    yy += 40
  }
  ctx.fillStyle = C.primary
  ctx.font = `700 32px ${FONT}`
  ctx.fillText(`WhatsApp ${d.whatsapp}`, tx, ty + 236)
  ctx.fillStyle = '#64748b'
  ctx.font = `500 26px ${FONT}`
  ctx.fillText('xoultec.com', tx, ty + 274)

  ctx.fillStyle = 'rgba(255,255,255,0.6)'
  ctx.font = `500 24px ${FONT}`
  ctx.fillText('Facturar sin papel también es cuidar 🌱', 72, H - 40)

  if (d.borrador) {
    ctx.save()
    ctx.translate(W / 2, H / 2)
    ctx.rotate(-Math.PI / 6)
    ctx.textAlign = 'center'
    ctx.fillStyle = 'rgba(220,38,38,0.55)'
    ctx.font = `900 150px ${FONT}`
    ctx.fillText('BORRADOR', 0, 0)
    ctx.font = `800 40px ${FONT}`
    ctx.fillText('Pendiente de aprobación de XoulTec · no imprimir', 0, 70)
    ctx.restore()
  }
}
