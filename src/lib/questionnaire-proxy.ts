// Server-side proxy for the RNC questionnaires (/cuestionario-constructoras,
// /cuestionario-empresas). Keeps the shared secret (LEADS_API_KEY, the same one lead capture
// uses) off the browser and forwards to the PVenta questionnaire endpoints, which store the
// answers per (kind, RNC) in the master DB.
//
// One route per questionnaire, four actions:
//   lookup  { rnc }                    → GET  /questionnaires/rnc/{rnc}  (DGII name)
//   load    { rnc, token }             → POST /questionnaires/{kind}/load
//   save    { rnc, token?, ... }       → POST /questionnaires/{kind}
//   resend  { rnc, lang }              → POST /questionnaires/{kind}/resend-link

import { allowRequest, clientIp, readJsonLimited, tooManyRequests } from '~/lib/api-guard'

const PVENTA_QUESTIONNAIRES_URL = (
  process.env.PVENTA_QUESTIONNAIRES_URL || 'https://pventa.xoultec.com/api/questionnaires'
).replace(/\/+$/, '')
const LEADS_API_KEY = process.env.LEADS_API_KEY || ''

const MAX_BODY_BYTES = 96_000

/** The kinds PVenta accepts (apps/api/internal/modules/questionnaires/types.go). */
export type QuestionnaireKind = 'construction' | 'business'

export function questionnaireProxy(kind: QuestionnaireKind) {
  return async function POST(request: Request) {
    if (!LEADS_API_KEY) {
      return Response.json({ error: 'Questionnaire not configured' }, { status: 503 })
    }

    const ip = clientIp(request)
    // Shared by every questionnaire: one IP gets 20 calls a minute in total.
    if (!allowRequest(`cuestionario:${ip}`, 20, 60_000)) {
      return tooManyRequests()
    }

    const body = await readJsonLimited(request, MAX_BODY_BYTES)
    if (body === null || typeof body !== 'object' || Array.isArray(body)) {
      return Response.json({ error: 'Invalid JSON' }, { status: 400 })
    }
    const { action, ...payload } = body as Record<string, unknown>
    const rnc = String(payload.rnc ?? '').replace(/\D/g, '')
    if (rnc.length !== 9 && rnc.length !== 11) {
      return Response.json({ error: 'Invalid RNC' }, { status: 400 })
    }

    let url: string
    let method: 'GET' | 'POST' = 'POST'
    switch (action) {
      case 'lookup':
        url = `${PVENTA_QUESTIONNAIRES_URL}/rnc/${rnc}`
        method = 'GET'
        break
      case 'load':
        url = `${PVENTA_QUESTIONNAIRES_URL}/${kind}/load`
        break
      case 'save':
        url = `${PVENTA_QUESTIONNAIRES_URL}/${kind}`
        break
      case 'resend':
        url = `${PVENTA_QUESTIONNAIRES_URL}/${kind}/resend-link`
        break
      default:
        return Response.json({ error: 'Unknown action' }, { status: 400 })
    }

    const headers: Record<string, string> = { 'X-Leads-Key': LEADS_API_KEY }
    if (ip !== 'unknown') headers['X-Client-IP'] = ip
    if (method === 'POST') headers['Content-Type'] = 'application/json'

    try {
      const resp = await fetch(url, {
        method,
        headers,
        body: method === 'POST' ? JSON.stringify({ ...payload, rnc }) : undefined,
        cache: 'no-store',
      })
      const data = await resp.json().catch(() => ({}))
      return Response.json(data, { status: resp.status })
    } catch {
      return Response.json({ error: 'Upstream error' }, { status: 502 })
    }
  }
}
