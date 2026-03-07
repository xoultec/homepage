import { getPromosForApp, promos } from '~/lib/promos'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders })
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const context = url.searchParams.get('context') || ''
  const limit = parseInt(url.searchParams.get('limit') || '5', 10)

  const filtered = context ? getPromosForApp(context) : promos
  const result = filtered.slice(0, limit)

  return Response.json({ promos: result }, { headers: corsHeaders })
}
