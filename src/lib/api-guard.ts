// Guards for the public API routes: a best-effort per-IP rate limit and a
// body-size cap. The limiter is in-memory, so on serverless each instance
// counts on its own. It blunts casual abuse (quota burn, form spam), not a
// distributed attack. For that, move it to a shared store.

type Bucket = { count: number; resetAt: number }

const buckets = new Map<string, Bucket>()
const MAX_BUCKETS = 5000

export function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
}

/** True when the caller is still within `limit` requests per `windowMs`. */
export function allowRequest(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()

  if (buckets.size > MAX_BUCKETS) {
    for (const [k, b] of buckets) {
      if (b.resetAt <= now) buckets.delete(k)
    }
    if (buckets.size > MAX_BUCKETS) buckets.clear()
  }

  const bucket = buckets.get(key)
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }
  bucket.count += 1
  return bucket.count <= limit
}

export function tooManyRequests() {
  return Response.json(
    { error: 'Too many requests' },
    { status: 429, headers: { 'Retry-After': '60' } },
  )
}

/**
 * Reads the request body as JSON, refusing anything over `maxBytes`.
 * Returns null when the body is too large or is not valid JSON.
 */
export async function readJsonLimited(request: Request, maxBytes: number): Promise<unknown | null> {
  const declared = Number(request.headers.get('content-length') ?? 0)
  if (declared > maxBytes) return null

  const text = await request.text()
  if (text.length > maxBytes) return null

  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}
