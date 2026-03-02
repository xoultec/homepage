'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type Lang = 'es' | 'en'

interface LanguageContextValue {
  lang: Lang
  toggleLanguage: () => void
  t: <T,>(es: T, en: T) => T
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('es')

  useEffect(() => {
    const saved = localStorage.getItem('xoultec-lang') as Lang | null
    if (saved === 'en') {
      setLang('en')
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const toggleLanguage = () => {
    setLang(prev => {
      const next = prev === 'es' ? 'en' : 'es'
      localStorage.setItem('xoultec-lang', next)
      return next
    })
  }

  const t = <T,>(es: T, en: T): T => (lang === 'es' ? es : en)

  return (
    <LanguageContext value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
