// Proxy del panel de promotoras externas (/promotora) hacia la API de PVenta, donde viven sus
// prospectos, clientes cerrados y comisiones (base master). La llave privada de la promotora
// viaja en el encabezado X-Promotora-Llave, nunca en la URL, para que no quede en ningún log de
// acceso. Este proxy no guarda nada: solo reenvía.

import { allowRequest, clientIp, readJsonLimited, tooManyRequests } from '~/lib/api-guard'

const PVENTA_API = (process.env.PVENTA_API_URL || 'https://pventa.xoultec.com').replace(/\/$/, '')
const HEADER = 'X-Promotora-Llave'

// Solo estas dos acciones existen; cualquier otra ruta es 404 sin tocar PVenta.
const ACCIONES: Record<string, 'GET' | 'POST'> = {
  panel: 'GET',
  prospectos: 'POST',
}

async function reenviar(request: Request, accion: string, method: 'GET' | 'POST') {
  if (ACCIONES[accion] !== method) {
    return Response.json({ error: 'No encontrado' }, { status: 404 })
  }
  if (!allowRequest(`promotora:${clientIp(request)}`, 60, 60_000)) {
    return tooManyRequests()
  }
  const llave = (request.headers.get(HEADER) || '').trim()
  if (!/^[0-9a-f]{64}$/.test(llave)) {
    return Response.json({ error: { message: 'Enlace de acceso no válido.' } }, { status: 401 })
  }

  let body: string | undefined
  if (method === 'POST') {
    const json = await readJsonLimited(request, 8_000)
    if (json === null || typeof json !== 'object' || Array.isArray(json)) {
      return Response.json({ error: { message: 'Datos inválidos.' } }, { status: 400 })
    }
    body = JSON.stringify(json)
  }

  try {
    const resp = await fetch(`${PVENTA_API}/api/promotora/${accion}`, {
      method,
      headers: { [HEADER]: llave, ...(body ? { 'Content-Type': 'application/json' } : {}) },
      body,
      cache: 'no-store',
    })
    const data = await resp.json().catch(() => ({}))
    return Response.json(data, { status: resp.status, headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return Response.json({ error: { message: 'No pudimos conectar. Intenta otra vez.' } }, { status: 502 })
  }
}

type Ctx = { params: Promise<{ accion: string }> }

export async function GET(request: Request, { params }: Ctx) {
  return reenviar(request, (await params).accion, 'GET')
}

export async function POST(request: Request, { params }: Ctx) {
  return reenviar(request, (await params).accion, 'POST')
}
