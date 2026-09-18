import { buildSystemPrompt } from '~/lib/chat-prompt'
import { allowRequest, clientIp, readJsonLimited, tooManyRequests } from '~/lib/api-guard'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

type ChatInput = {
  messages: ChatMessage[]
  lang: 'es' | 'en'
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders })
}

const MAX_BODY_BYTES = 64_000
const MAX_MESSAGES = 20
const MAX_MESSAGE_CHARS = 4000

// The client is untrusted: accept only user/assistant turns of bounded size so
// nobody can inject a `system` role or send an unbounded prompt at our quota.
function parseChatInput(raw: unknown): ChatInput | null {
  if (!raw || typeof raw !== 'object') return null
  const { messages, lang } = raw as { messages?: unknown; lang?: unknown }
  if (!Array.isArray(messages) || messages.length === 0) return null

  const clean: ChatMessage[] = []
  for (const m of messages.slice(-MAX_MESSAGES)) {
    if (!m || typeof m !== 'object') return null
    const { role, content } = m as { role?: unknown; content?: unknown }
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') return null
    if (content.length > MAX_MESSAGE_CHARS) return null
    clean.push({ role, content })
  }
  return { messages: clean, lang: lang === 'en' ? 'en' : 'es' }
}

export async function POST(request: Request) {
  if (!allowRequest(`chat:${clientIp(request)}`, 20, 60_000)) {
    return tooManyRequests()
  }

  const data = parseChatInput(await readJsonLimited(request, MAX_BODY_BYTES))
  if (!data) {
    return Response.json({ error: 'Invalid request' }, { status: 400, headers: corsHeaders })
  }

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey || apiKey === 'your-groq-api-key-here') {
    return Response.json({
      reply: data.lang === 'es'
        ? 'El asistente no esta configurado todavia. Contacta a sales@xoultec.com para ayuda.'
        : 'The assistant is not configured yet. Contact sales@xoultec.com for help.',
    }, { headers: corsHeaders })
  }

  try {
    const systemPrompt = buildSystemPrompt(data.lang)

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1024,
        messages: [
          { role: 'system', content: systemPrompt },
          ...data.messages.map(m => ({ role: m.role, content: m.content })),
        ],
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      throw new Error(`Groq API ${response.status}: ${err}`)
    }

    const result = await response.json()
    return Response.json({ reply: result.choices?.[0]?.message?.content ?? '' }, { headers: corsHeaders })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Chat API error:', message)
    return Response.json({
      reply: data.lang === 'es'
        ? 'Lo siento, hubo un error al procesar tu mensaje. Intenta de nuevo.'
        : 'Sorry, there was an error processing your message. Please try again.',
    }, { headers: corsHeaders })
  }
}
