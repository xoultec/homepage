// Server-side proxy for the public lead form on /ofertas. Keeps the shared
// secret (LEADS_API_KEY) off the browser and forwards the lead to the pventa
// API, which stores it in the master DB and emails the discount code.

import { allowRequest, clientIp, readJsonLimited, tooManyRequests } from '~/lib/api-guard'

const PVENTA_LEADS_URL =
  process.env.PVENTA_LEADS_URL || 'https://pventa.xoultec.com/api/leads/capture'
const LEADS_API_KEY = process.env.LEADS_API_KEY || ''

const MAX_BODY_BYTES = 16_000

export async function POST(request: Request) {
  if (!LEADS_API_KEY) {
    return Response.json({ error: 'Lead capture not configured' }, { status: 503 })
  }

  if (!allowRequest(`leads:${clientIp(request)}`, 5, 60_000)) {
    return tooManyRequests()
  }

  const body = await readJsonLimited(request, MAX_BODY_BYTES)
  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  try {
    const resp = await fetch(PVENTA_LEADS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Leads-Key': LEADS_API_KEY,
      },
      body: JSON.stringify(body),
    })
    const data = await resp.json().catch(() => ({}))
    return Response.json(data, { status: resp.status })
  } catch {
    return Response.json({ error: 'Upstream error' }, { status: 502 })
  }
}
