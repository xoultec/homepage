// Server-side proxy for the public "solicitar apertura" form. Forwards the
// onboarding request to the XoulTec operator portal, which stores it in the
// master `signup_requests` table for review/approval. Kept same-origin so the
// browser never talks to the operator portal directly (CORS + future spam
// control). Set OPERATOR_SIGNUP_URL to the deployed portal's /api/signup.

import { allowRequest, clientIp, readJsonLimited, tooManyRequests } from '~/lib/api-guard'

const OPERATOR_SIGNUP_URL = process.env.OPERATOR_SIGNUP_URL || ''

const MAX_BODY_BYTES = 16_000

export async function POST(request: Request) {
  if (!OPERATOR_SIGNUP_URL) {
    return Response.json({ error: 'Signup not configured' }, { status: 503 })
  }

  if (!allowRequest(`signup:${clientIp(request)}`, 5, 60_000)) {
    return tooManyRequests()
  }

  const body = await readJsonLimited(request, MAX_BODY_BYTES)
  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  try {
    const resp = await fetch(OPERATOR_SIGNUP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await resp.json().catch(() => ({}))
    return Response.json(data, { status: resp.status })
  } catch {
    return Response.json({ error: 'Upstream error' }, { status: 502 })
  }
}
