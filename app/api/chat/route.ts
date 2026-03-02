import { buildSystemPrompt } from '~/lib/chat-prompt'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

type ChatInput = {
  messages: ChatMessage[]
  lang: 'es' | 'en'
}

export async function POST(request: Request) {
  const data: ChatInput = await request.json()

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey || apiKey === 'your-groq-api-key-here') {
    return Response.json({
      reply: data.lang === 'es'
        ? 'El asistente no esta configurado todavia. Contacta a sales@xoultec.com para ayuda.'
        : 'The assistant is not configured yet. Contact sales@xoultec.com for help.',
    })
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
    return Response.json({ reply: result.choices?.[0]?.message?.content ?? '' })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Chat API error:', message)
    return Response.json({
      reply: data.lang === 'es'
        ? 'Lo siento, hubo un error al procesar tu mensaje. Intenta de nuevo.'
        : 'Sorry, there was an error processing your message. Please try again.',
    })
  }
}
