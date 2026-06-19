// Server-side proxy for the public lead form on /ofertas. Keeps the shared
// secret (LEADS_API_KEY) off the browser and forwards the lead to the pventa
// API, which stores it in the master DB and emails the discount code.

const PVENTA_LEADS_URL =
  process.env.PVENTA_LEADS_URL || 'https://pventa.xoultec.com/api/leads/capture'
const LEADS_API_KEY = process.env.LEADS_API_KEY || ''

export async function POST(request: Request) {
  if (!LEADS_API_KEY) {
    return Response.json({ error: 'Lead capture not configured' }, { status: 503 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
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
