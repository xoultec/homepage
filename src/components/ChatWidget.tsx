'use client'

import { useState, useRef, useEffect, useCallback, type FormEvent } from 'react'
import { MessageCircle, X, Send, Bot, Loader2, RotateCcw, Headset, ShoppingBag, Wrench } from 'lucide-react'
import { useLanguage } from '~/lib/i18n'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

type TransferType = 'sales' | 'support' | null

const WHATSAPP_SALES = 'https://wa.me/18169193349'
const WHATSAPP_SUPPORT = 'https://wa.me/18092524007'

export function ChatWidget() {
  const { lang, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [transferring, setTransferring] = useState<TransferType>(null)
  const [suggested, setSuggested] = useState<TransferType>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading, transferring, suggested])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const startTransfer = useCallback((type: TransferType) => {
    setSuggested(null)
    setTransferring(type)

    setTimeout(() => {
      const waUrl = type === 'sales' ? WHATSAPP_SALES : WHATSAPP_SUPPORT
      const waText = type === 'sales'
        ? (lang === 'es' ? 'Hola, me interesa conocer más sobre sus productos.' : 'Hi, I\'m interested in learning more about your products.')
        : (lang === 'es' ? 'Hola, necesito soporte técnico.' : 'Hi, I need technical support.')

      const agentName = type === 'sales'
        ? t('Equipo de Ventas', 'Sales Team')
        : t('Soporte Técnico', 'Technical Support')

      const agentMessage = type === 'sales'
        ? t(
            `Hola! Soy del equipo de ventas de XoulTec. Para atenderte de forma personalizada, continuemos por WhatsApp.\n\n📱 [Abrir WhatsApp](${waUrl}?text=${encodeURIComponent(waText)})`,
            `Hi! I'm from the XoulTec sales team. For personalized attention, let's continue on WhatsApp.\n\n📱 [Open WhatsApp](${waUrl}?text=${encodeURIComponent(waText)})`
          )
        : t(
            `Hola! Soy del equipo de soporte de XoulTec. Para ayudarte con tu caso, continuemos por WhatsApp.\n\n📱 [Abrir WhatsApp](${waUrl}?text=${encodeURIComponent(waText)})`,
            `Hi! I'm from the XoulTec support team. To help you with your case, let's continue on WhatsApp.\n\n📱 [Open WhatsApp](${waUrl}?text=${encodeURIComponent(waText)})`
          )

      setMessages(prev => [...prev, { role: 'assistant', content: `[AGENT:${agentName}]${agentMessage}` }])
      setTransferring(null)
    }, 2500)
  }, [lang, t])

  const sendMessage = async (text: string) => {
    setSuggested(null)
    const userMessage: ChatMessage = { role: 'user', content: text }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages, lang }),
      })
      const result = await res.json()

      let reply = result.reply
      let transfer: TransferType = null

      if (reply.includes('[CONNECT_SALES]')) {
        reply = reply.replace('[CONNECT_SALES]', '').trim()
        transfer = 'sales'
      } else if (reply.includes('[CONNECT_SUPPORT]')) {
        reply = reply.replace('[CONNECT_SUPPORT]', '').trim()
        transfer = 'support'
      }

      setMessages([...updatedMessages, { role: 'assistant', content: reply }])

      if (transfer) {
        setSuggested(transfer)
      }
    } catch {
      setMessages([
        ...updatedMessages,
        {
          role: 'assistant',
          content: t(
            'Lo siento, hubo un error. Por favor intenta de nuevo o contactanos por WhatsApp.',
            'Sorry, there was an error. Please try again or contact us via WhatsApp.'
          ),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    sendMessage(text)
  }

  const renderMessage = (msg: ChatMessage, i: number) => {
    const isAgent = msg.content.startsWith('[AGENT:')
    let agentName = ''
    let content = msg.content

    if (isAgent) {
      const match = msg.content.match(/^\[AGENT:(.+?)\]/)
      if (match) {
        agentName = match[1]
        content = msg.content.slice(match[0].length)
      }
    }

    const renderContent = (text: string) => {
      const parts = text.split(/(\[.+?\]\(.+?\))/)
      return parts.map((part, j) => {
        const linkMatch = part.match(/^\[(.+?)\]\((.+?)\)$/)
        if (linkMatch) {
          return (
            <a key={j} href={linkMatch[2]} target="_blank" rel="noopener noreferrer"
               className="text-secondary font-semibold underline hover:text-yellow-400">
              {linkMatch[1]}
            </a>
          )
        }
        return part
      })
    }

    if (isAgent) {
      return (
        <div key={i} className="flex justify-start">
          <div className="max-w-[85%]">
            <div className="flex items-center gap-1 mb-1">
              <Headset className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-semibold text-accent">{agentName}</span>
            </div>
            <div className="bg-accent/10 border border-accent/20 text-gray-800 rounded-xl rounded-bl-sm px-3 py-2 text-sm whitespace-pre-wrap">
              {renderContent(content)}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
        <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm whitespace-pre-wrap ${
          msg.role === 'user'
            ? 'bg-primary text-white rounded-br-sm'
            : 'bg-gray-100 text-gray-800 rounded-bl-sm'
        }`}>
          {renderContent(content)}
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Floating chat button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-secondary text-dark w-14 h-14 rounded-full shadow-lg
                     flex items-center justify-center hover:bg-yellow-400 transition cta-pulse"
          aria-label={t('Abrir chat', 'Open chat')}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-6rem)]
                        bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-primary text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">XoulBot</span>
              <span className="text-xs text-gray-300">
                {t('Asistente virtual', 'Virtual assistant')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button onClick={() => { setMessages([]); setTransferring(null); setSuggested(null) }} className="text-gray-300 hover:text-white transition" title={t('Reiniciar chat', 'Reset chat')}>
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
              <button onClick={() => setOpen(false)} className="text-gray-300 hover:text-white transition">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 text-sm mt-8">
                <Bot className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                <p>{t(
                  'Hola! Soy XoulBot. Preguntame sobre nuestros productos y servicios.',
                  "Hi! I'm XoulBot. Ask me about our products and services."
                )}</p>
              </div>
            )}
            {messages.map((msg, i) => renderMessage(msg, i))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-xl px-3 py-2 text-sm text-gray-500 rounded-bl-sm flex items-center gap-1">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t('Pensando...', 'Thinking...')}</span>
                </div>
              </div>
            )}
            {suggested && (
              <div className="flex justify-start">
                <button
                  onClick={() => startTransfer(suggested)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition ${
                    suggested === 'sales'
                      ? 'bg-secondary/10 text-secondary border border-secondary/30 hover:bg-secondary/20'
                      : 'bg-accent/10 text-accent border border-accent/30 hover:bg-accent/20'
                  }`}
                >
                  {suggested === 'sales' ? <ShoppingBag className="w-4 h-4" /> : <Wrench className="w-4 h-4" />}
                  {suggested === 'sales'
                    ? t('Conectar con Ventas', 'Connect to Sales')
                    : t('Conectar con Soporte', 'Connect to Support')
                  }
                </button>
              </div>
            )}
            {transferring && (
              <div className="flex justify-start">
                <div className="bg-accent/10 border border-accent/20 rounded-xl px-3 py-2 text-sm text-accent rounded-bl-sm flex items-center gap-1.5">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{transferring === 'sales'
                    ? t('Conectando con equipo de ventas...', 'Connecting to sales team...')
                    : t('Conectando con soporte técnico...', 'Connecting to technical support...')
                  }</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 flex gap-2 flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={t('Escribe tu mensaje...', 'Type your message...')}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm
                         focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
              disabled={loading || !!transferring}
            />
            <button
              type="submit"
              disabled={loading || !input.trim() || !!transferring}
              className="bg-secondary text-dark px-3 py-2 rounded-lg hover:bg-yellow-400
                         transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
