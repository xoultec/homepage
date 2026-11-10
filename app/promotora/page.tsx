'use client'

// Estación de promoción de las promotoras EXTERNAS de XoulTec. Funciona entera desde el
// teléfono, por internet: su link y QR de referido, sus flyers con ese QR, los prospectos que
// anota, los clientes que cerró y su comisión.
//
// Acceso: XoulTec le envía un enlace privado xoultec.com/promotora#k=<llave>. La llave va en el
// fragmento (#), que el navegador nunca manda a ningún servidor ni a la analítica; se guarda en
// este dispositivo para que vuelva a entrar con solo abrir /promotora, y se borra de la barra.
//
// Reusa el sistema de referidos de PVenta: su link es /r?t=XOULTEC&u=<código>. Los datos los
// sirve la API de PVenta (base master) a través de /api/promotora/*.
//
// ⛔ La comisión la define XoulTec. Este panel solo enseña la regla que XoulTec escribió y los
// montos que asentó; si no hay regla, dice "por definir" y no calcula nada.

import { useCallback, useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'
import {
  Copy,
  Check,
  Download,
  MessageCircle,
  Share2,
  UserPlus,
  Users,
  Trophy,
  Wallet,
  QrCode,
  FileImage,
  LogOut,
  RefreshCw,
} from 'lucide-react'
import { SITE_URL } from '~/lib/site'
import { WA_RD_DISPLAY } from '~/lib/contact'
import { FLYERS, type Flyer } from '~/lib/promotora-flyers'
import { dibujarFlyerEcf } from '~/components/promotora/flyer-ecf'

const LLAVE_KEY = 'xoultec.promotora.llave'
const HEADER = 'X-Promotora-Llave'

type Monedas = Record<string, number>

type Panel = {
  promotora: { codigo: string; nombre: string }
  referido: { t: string; u: string }
  comision: {
    regla: string | null
    ganada: Monedas
    pagada: Monedas
    pendiente: Monedas
    movimientos: {
      id: number
      cliente: string
      monto: number
      moneda: string
      estado: string
      nota?: string
      fecha: string
      pagadaEl?: string
    }[]
  }
  prospectos: {
    id: number
    nombre: string
    empresa: string
    telefono: string
    email: string
    interes: string
    estado: string
    origen: 'anotado' | 'link'
    fecha: string
  }[]
  cerrados: { rnc: string; nombre: string; fecha: string }[]
}

function leerLlave(): string {
  try {
    return localStorage.getItem(LLAVE_KEY) || ''
  } catch {
    return ''
  }
}

function guardarLlave(k: string) {
  try {
    if (k) localStorage.setItem(LLAVE_KEY, k)
    else localStorage.removeItem(LLAVE_KEY)
  } catch {
    /* sin almacenamiento: tendrá que abrir su enlace cada vez */
  }
}

function linkReferido(p: Panel, tema?: string) {
  const q = new URLSearchParams({ t: p.referido.t, u: p.referido.u })
  if (tema) q.set('tema', tema)
  return `${SITE_URL}/r?${q.toString()}`
}

function fecha(s: string) {
  try {
    return new Date(s).toLocaleDateString('es-DO', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return s
  }
}

function dinero(v: number, moneda: string) {
  try {
    return new Intl.NumberFormat('es-DO', { style: 'currency', currency: moneda }).format(v)
  } catch {
    return `${moneda} ${v.toFixed(2)}`
  }
}

function descargarCanvas(canvas: HTMLCanvasElement, nombre: string) {
  const a = document.createElement('a')
  a.download = nombre
  a.href = canvas.toDataURL('image/png')
  a.click()
}

const ESTADO_PROSPECTO: Record<string, string> = {
  nuevo: 'Nuevo',
  contactado: 'Contactado',
  canjeado: 'En proceso',
}

export default function PromotoraPage() {
  const [llave, setLlave] = useState('')
  const [listo, setListo] = useState(false)
  const [panel, setPanel] = useState<Panel | null>(null)
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    const m = window.location.hash.match(/k=([0-9a-f]{64})/i)
    let k = leerLlave()
    if (m) {
      k = m[1].toLowerCase()
      guardarLlave(k)
      history.replaceState(null, '', window.location.pathname)
    }
    setLlave(k)
    setListo(true)
  }, [])

  const cargar = useCallback(async () => {
    if (!llave) return
    setCargando(true)
    setError('')
    try {
      const r = await fetch('/api/promotora/panel', { headers: { [HEADER]: llave }, cache: 'no-store' })
      const data = await r.json().catch(() => ({}))
      if (!r.ok) {
        setError(data?.error?.message || 'No pudimos abrir tu panel. Intenta otra vez.')
        if (r.status === 401) {
          guardarLlave('')
        }
        setPanel(null)
      } else {
        setPanel(data as Panel)
      }
    } catch {
      setError('Sin conexión. Revisa tu internet e intenta otra vez.')
    } finally {
      setCargando(false)
    }
  }, [llave])

  useEffect(() => {
    cargar()
  }, [cargar])

  function salir() {
    guardarLlave('')
    setLlave('')
    setPanel(null)
  }

  if (!listo) return <main className="min-h-screen bg-gray-50" />

  if (!llave) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 pt-28 pb-16">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-6 text-center space-y-3">
          <QrCode className="w-10 h-10 text-primary mx-auto" />
          <h1 className="text-xl font-bold text-dark">Estación de promoción XoulTec</h1>
          <p className="text-gray-600 text-sm">
            Para entrar, abre el enlace personal que XoulTec te envió por WhatsApp. Si no lo tienes, escríbenos al{' '}
            {WA_RD_DISPLAY}.
          </p>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="hero-gradient text-white px-4 pt-24 pb-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-white/70 text-sm">Estación de promoción XoulTec</p>
          <h1 className="text-2xl md:text-3xl font-extrabold">
            {panel ? `Hola, ${panel.promotora.nombre.split(' ')[0]} 👋` : 'Tu estación'}
          </h1>
          {panel && (
            <div className="grid grid-cols-3 gap-2 mt-5">
              <Cifra icono={<Users className="w-4 h-4" />} n={panel.prospectos.length} txt="Prospectos" />
              <Cifra icono={<Trophy className="w-4 h-4" />} n={panel.cerrados.length} txt="Clientes cerrados" />
              <Cifra
                icono={<Wallet className="w-4 h-4" />}
                n={panel.comision.movimientos.length}
                txt="Comisiones"
              />
            </div>
          )}
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
            {error}{' '}
            <button onClick={cargar} className="underline font-semibold">
              Reintentar
            </button>
          </div>
        )}
        {cargando && !panel && <p className="text-gray-500 text-sm text-center">Cargando tu panel…</p>}

        {panel && (
          <>
            <MiLink panel={panel} />
            <Flyers panel={panel} />
            <Prospectos panel={panel} llave={llave} onCambio={cargar} />
            <Cerrados panel={panel} />
            <Comision panel={panel} />
            <ComoFunciona />
            <div className="flex justify-between items-center text-xs text-gray-400 pt-2">
              <button onClick={cargar} className="flex items-center gap-1 hover:text-gray-600">
                <RefreshCw className="w-3.5 h-3.5" /> Actualizar
              </button>
              <button onClick={salir} className="flex items-center gap-1 hover:text-gray-600">
                <LogOut className="w-3.5 h-3.5" /> Salir de este dispositivo
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}

function Cifra({ icono, n, txt }: { icono: React.ReactNode; n: number; txt: string }) {
  return (
    <div className="bg-white/10 rounded-xl px-3 py-2">
      <div className="flex items-center gap-1 text-white/70 text-xs">
        {icono}
        {txt}
      </div>
      <div className="text-2xl font-extrabold">{n}</div>
    </div>
  )
}

function Tarjeta({ titulo, icono, children }: { titulo: string; icono: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <h2 className="flex items-center gap-2 font-bold text-dark text-lg mb-3">
        <span className="text-primary">{icono}</span>
        {titulo}
      </h2>
      {children}
    </section>
  )
}

function MiLink({ panel }: { panel: Panel }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const [copiado, setCopiado] = useState(false)
  const link = linkReferido(panel)
  const mensaje = `Hola 👋 Te recomiendo PVenta, el sistema de XoulTec para facturar (con factura electrónica e-CF ante la DGII), inventario y más. Escríbeles desde aquí y diles que vas de mi parte: ${link}`

  useEffect(() => {
    if (canvas.current) {
      QRCode.toCanvas(canvas.current, link, { width: 220, margin: 1, errorCorrectionLevel: 'M' }).catch(() => {})
    }
  }, [link])

  async function copiar() {
    try {
      await navigator.clipboard.writeText(link)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch {
      /* el link se ve abajo para copiarlo a mano */
    }
  }

  async function compartir() {
    try {
      await navigator.share({ title: 'PVenta · XoulTec', text: mensaje })
    } catch {
      /* cancelado o no soportado */
    }
  }

  async function bajarQR() {
    const c = document.createElement('canvas')
    await QRCode.toCanvas(c, link, { width: 1024, margin: 2, errorCorrectionLevel: 'M' })
    descargarCanvas(c, `qr-xoultec-${panel.promotora.codigo}.png`)
  }

  return (
    <Tarjeta titulo="Mi link y mi QR" icono={<QrCode className="w-5 h-5" />}>
      <p className="text-gray-600 text-sm mb-4">
        Cada persona que entre por aquí y escriba a XoulTec queda a tu nombre.
      </p>
      <div className="flex flex-col sm:flex-row gap-5 items-center">
        <canvas ref={canvas} className="rounded-lg border border-gray-200 shrink-0" />
        <div className="w-full space-y-2">
          <p className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2 break-all select-all">{link}</p>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(mensaje)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-600 text-white font-semibold rounded-xl hover:opacity-90"
          >
            <MessageCircle className="w-5 h-5" /> Enviar por WhatsApp
          </a>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={copiar}
              className="flex items-center justify-center gap-1 py-2 border border-gray-300 rounded-xl text-sm font-semibold text-dark hover:bg-gray-50"
            >
              {copiado ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              {copiado ? 'Copiado' : 'Copiar'}
            </button>
            <button
              onClick={compartir}
              className="flex items-center justify-center gap-1 py-2 border border-gray-300 rounded-xl text-sm font-semibold text-dark hover:bg-gray-50"
            >
              <Share2 className="w-4 h-4" /> Compartir
            </button>
            <button
              onClick={bajarQR}
              className="flex items-center justify-center gap-1 py-2 border border-gray-300 rounded-xl text-sm font-semibold text-dark hover:bg-gray-50"
            >
              <Download className="w-4 h-4" /> QR
            </button>
          </div>
        </div>
      </div>
    </Tarjeta>
  )
}

function Flyers({ panel }: { panel: Panel }) {
  return (
    <Tarjeta titulo="Mis flyers" icono={<FileImage className="w-5 h-5" />}>
      <p className="text-gray-600 text-sm mb-4">
        Llevan tu QR personal. Sirven para estados de WhatsApp, redes o para imprimir.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {FLYERS.map((f) => (
          <FlyerCard key={f.id} flyer={f} panel={panel} />
        ))}
      </div>
    </Tarjeta>
  )
}

function FlyerCard({ flyer, panel }: { flyer: Flyer; panel: Panel }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const [listo, setListo] = useState(false)

  useEffect(() => {
    let vivo = true
    ;(async () => {
      const qr = document.createElement('canvas')
      await QRCode.toCanvas(qr, linkReferido(panel, flyer.tema), { width: 504, margin: 1, errorCorrectionLevel: 'M' })
      if (!vivo || !canvas.current) return
      await dibujarFlyerEcf(canvas.current, {
        qr,
        promotora: panel.promotora.nombre,
        whatsapp: WA_RD_DISPLAY,
        borrador: !flyer.aprobado,
      })
      if (vivo) setListo(true)
    })()
    return () => {
      vivo = false
    }
  }, [flyer, panel])

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <canvas ref={canvas} className="w-full h-auto block bg-gray-100" />
      <div className="p-3 space-y-2">
        <p className="font-semibold text-dark text-sm">{flyer.titulo}</p>
        <p className="text-xs text-gray-500">{flyer.descripcion}</p>
        {flyer.aprobado ? (
          <button
            disabled={!listo}
            onClick={() => canvas.current && descargarCanvas(canvas.current, `flyer-${flyer.id}-${panel.promotora.codigo}.png`)}
            className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-white font-semibold rounded-xl hover:opacity-90 disabled:opacity-50"
          >
            <Download className="w-4 h-4" /> Descargar
          </button>
        ) : (
          <p className="text-xs bg-amber-50 text-amber-800 rounded-lg p-2">
            En revisión: XoulTec lo está aprobando. Cuando esté listo podrás descargarlo aquí.
          </p>
        )}
      </div>
    </div>
  )
}

function Prospectos({ panel, llave, onCambio }: { panel: Panel; llave: string; onCambio: () => void }) {
  const [abierto, setAbierto] = useState(false)
  const [form, setForm] = useState({ nombre: '', empresa: '', telefono: '', email: '', interes: 'pventa' })
  const [enviando, setEnviando] = useState(false)
  const [msg, setMsg] = useState('')

  async function guardar(e: React.FormEvent) {
    e.preventDefault()
    setEnviando(true)
    setMsg('')
    try {
      const r = await fetch('/api/promotora/prospectos', {
        method: 'POST',
        headers: { [HEADER]: llave, 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await r.json().catch(() => ({}))
      if (!r.ok) {
        setMsg(data?.error?.message || 'No se pudo guardar. Intenta otra vez.')
      } else {
        setForm({ nombre: '', empresa: '', telefono: '', email: '', interes: form.interes })
        setAbierto(false)
        setMsg('¡Anotado! XoulTec le dará seguimiento.')
        onCambio()
      }
    } catch {
      setMsg('Sin conexión. Intenta otra vez.')
    } finally {
      setEnviando(false)
    }
  }

  const campo = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary'

  return (
    <Tarjeta titulo="Mis prospectos" icono={<Users className="w-5 h-5" />}>
      <p className="text-gray-600 text-sm mb-3">
        Los que anotas tú y los que escriben por tu link. Anótalos para que XoulTec los atienda a tu nombre.
      </p>

      {!abierto ? (
        <button
          onClick={() => setAbierto(true)}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-secondary text-dark font-bold rounded-xl hover:opacity-90 mb-3"
        >
          <UserPlus className="w-5 h-5" /> Anotar un prospecto
        </button>
      ) : (
        <form onSubmit={guardar} className="space-y-2 mb-4 bg-gray-50 rounded-xl p-3">
          <input
            className={campo}
            placeholder="Negocio *"
            value={form.empresa}
            onChange={(e) => setForm({ ...form, empresa: e.target.value })}
          />
          <input
            className={campo}
            placeholder="Persona de contacto"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
          <input
            className={campo}
            placeholder="Teléfono / WhatsApp *"
            inputMode="tel"
            value={form.telefono}
            onChange={(e) => setForm({ ...form, telefono: e.target.value })}
          />
          <input
            className={campo}
            placeholder="Correo (opcional)"
            inputMode="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <select
            className={campo}
            value={form.interes}
            onChange={(e) => setForm({ ...form, interes: e.target.value })}
          >
            <option value="pventa">Le interesa: PVenta (sistema completo)</option>
            <option value="ecf">Le interesa: facturación electrónica (e-CF)</option>
          </select>
          <p className="text-xs text-gray-500">* Pon el negocio o la persona, y un teléfono o correo.</p>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={enviando}
              className="flex-1 py-2 bg-primary text-white font-semibold rounded-xl disabled:opacity-50"
            >
              {enviando ? 'Guardando…' : 'Guardar'}
            </button>
            <button
              type="button"
              onClick={() => setAbierto(false)}
              className="px-4 py-2 border border-gray-300 rounded-xl text-sm"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
      {msg && <p className="text-sm text-gray-700 mb-3">{msg}</p>}

      {panel.prospectos.length === 0 ? (
        <p className="text-sm text-gray-400">Todavía no hay prospectos. ¡El primero cuenta!</p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {panel.prospectos.map((p) => (
            <li key={p.id} className="py-2 flex justify-between gap-3">
              <div className="min-w-0">
                <p className="font-semibold text-sm text-dark truncate">{p.empresa || p.nombre}</p>
                <p className="text-xs text-gray-500 truncate">
                  {[p.empresa && p.nombre !== p.empresa ? p.nombre : '', p.telefono || p.email, p.interes === 'ecf' ? 'e-CF' : '']
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs bg-blue-50 text-primary rounded-full px-2 py-0.5">
                  {ESTADO_PROSPECTO[p.estado] || p.estado}
                </span>
                <p className="text-[11px] text-gray-400 mt-1">
                  {p.origen === 'link' ? 'Por tu link · ' : ''}
                  {fecha(p.fecha)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Tarjeta>
  )
}

function Cerrados({ panel }: { panel: Panel }) {
  return (
    <Tarjeta titulo="Clientes cerrados" icono={<Trophy className="w-5 h-5" />}>
      <p className="text-gray-600 text-sm mb-3">Negocios que ya empezaron con XoulTec gracias a ti.</p>
      {panel.cerrados.length === 0 ? (
        <p className="text-sm text-gray-400">Aquí aparecerá cada negocio cuando XoulTec lo active.</p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {panel.cerrados.map((c) => (
            <li key={c.rnc} className="py-2 flex justify-between gap-3">
              <span className="font-semibold text-sm text-dark">{c.nombre}</span>
              <span className="text-xs text-gray-400 shrink-0">{fecha(c.fecha)}</span>
            </li>
          ))}
        </ul>
      )}
    </Tarjeta>
  )
}

function Totales({ titulo, m }: { titulo: string; m: Monedas }) {
  const filas = Object.entries(m)
  return (
    <div className="bg-gray-50 rounded-xl p-3">
      <p className="text-xs text-gray-500">{titulo}</p>
      {filas.length === 0 ? (
        <p className="font-bold text-dark">—</p>
      ) : (
        filas.map(([mon, v]) => (
          <p key={mon} className="font-bold text-dark">
            {dinero(v, mon)}
          </p>
        ))
      )}
    </div>
  )
}

function Comision({ panel }: { panel: Panel }) {
  const c = panel.comision
  return (
    <Tarjeta titulo="Mi comisión" icono={<Wallet className="w-5 h-5" />}>
      <div className="bg-blue-50 rounded-xl p-3 mb-3">
        <p className="text-xs text-gray-500">Cómo se calcula</p>
        <p className="text-sm text-dark whitespace-pre-line">
          {c.regla ?? 'XoulTec la está definiendo. Te la mostraremos aquí en cuanto esté lista.'}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        <Totales titulo="Ganada" m={c.ganada} />
        <Totales titulo="Pagada" m={c.pagada} />
        <Totales titulo="Por cobrar" m={c.pendiente} />
      </div>
      {c.movimientos.length > 0 && (
        <ul className="divide-y divide-gray-100">
          {c.movimientos.map((m) => (
            <li key={m.id} className="py-2 flex justify-between gap-3">
              <div className="min-w-0">
                <p className="font-semibold text-sm text-dark truncate">{m.cliente}</p>
                <p className="text-xs text-gray-500">
                  {fecha(m.fecha)}
                  {m.nota ? ` · ${m.nota}` : ''}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-sm text-dark">{dinero(m.monto, m.moneda)}</p>
                <p className={`text-xs ${m.estado === 'pagada' ? 'text-green-600' : 'text-amber-600'}`}>
                  {m.estado === 'pagada' ? `Pagada${m.pagadaEl ? ' ' + fecha(m.pagadaEl) : ''}` : 'Por cobrar'}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Tarjeta>
  )
}

function ComoFunciona() {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 p-5 text-sm text-gray-600 space-y-2">
      <h2 className="font-bold text-dark">Cómo funciona</h2>
      <ol className="list-decimal pl-5 space-y-1">
        <li>Comparte tu link, tu QR o tus flyers por WhatsApp, redes o en persona.</li>
        <li>Quien escriba desde tu link llega a XoulTec a tu nombre. Si hablas con alguien en persona, anótalo aquí.</li>
        <li>XoulTec atiende al prospecto. Cuando el negocio empieza con nosotros, aparece en “Clientes cerrados”.</li>
        <li>Tu comisión por cada cliente cerrado aparece en “Mi comisión”.</li>
      </ol>
      <p className="text-xs text-gray-400">¿Dudas? Escríbenos al WhatsApp {WA_RD_DISPLAY}.</p>
    </section>
  )
}
