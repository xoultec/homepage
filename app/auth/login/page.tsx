'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useLanguage } from '~/lib/i18n'
import { getAppTheme, defaultTheme } from '~/lib/app-themes'
import { getPromosForApp } from '~/lib/promos'
import { PromoCarousel } from '~/components/PromoCarousel'
import { Eye, EyeOff, LogIn, Globe } from 'lucide-react'

function LoginContent() {
  const searchParams = useSearchParams()
  const appId = searchParams.get('app') || ''
  const theme = getAppTheme(appId) || defaultTheme
  const promos = getPromosForApp(appId)
  const { t, toggleLanguage, lang } = useLanguage()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    document.title = `${t('Iniciar sesion', 'Sign in')} - ${theme.name}`
  }, [t, theme.name])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // TODO: Implement real authentication
    setTimeout(() => {
      setError(t(
        'Autenticacion no configurada aun. Contacte soporte.',
        'Authentication not configured yet. Contact support.'
      ))
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Left side - Login form */}
      <div className="w-full md:w-1/2 lg:w-[45%] bg-white flex flex-col justify-center px-8 sm:px-12 lg:px-16">
        <div className="w-full max-w-md mx-auto">
          {/* App branding */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center`}>
                <span className="text-white font-bold text-sm">
                  {theme.logoText.charAt(0)}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">{theme.logoText}</h1>
            </div>
            <p className="text-gray-500 text-sm">
              {t(theme.descEs, theme.descEn)}
            </p>
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {t('Iniciar sesion', 'Sign in')}
          </h2>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t('Correo electronico', 'Email')}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={t('tu@correo.com', 'you@email.com')}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none transition-shadow"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {t('Contrasena', 'Password')}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="********"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none transition-shadow"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-[#1e3a5f] focus:ring-[#1e3a5f]" />
                <span className="text-gray-600">{t('Recordarme', 'Remember me')}</span>
              </label>
              <a href="#" className="text-[#1e3a5f] hover:underline font-medium">
                {t('Olvide mi contrasena', 'Forgot password')}
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8e] hover:from-[#2d5a8e] hover:to-[#1e3a5f] text-white font-medium py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  {t('Iniciar sesion', 'Sign in')}
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
            <a
              href="https://xoultec.com"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              xoultec.com
            </a>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
          </div>
        </div>
      </div>

      {/* Right side - Promos */}
      <div className={`hidden md:flex md:w-1/2 lg:w-[55%] bg-gradient-to-br ${theme.gradient} flex-col items-center justify-center p-8 lg:p-12 relative overflow-hidden`}>
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-8">
          {/* XoulTec branding */}
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-white mb-2">XoulTec</h2>
            <p className="text-white/60 text-sm">
              {t('Soluciones de software empresarial', 'Enterprise software solutions')}
            </p>
          </div>

          {/* Promo carousel */}
          <PromoCarousel promos={promos} />
        </div>
      </div>

      {/* Mobile promo section */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t ${theme.gradient} p-4 z-50`}>
        <PromoCarousel promos={promos} />
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-[#1e3a5f] rounded-full animate-spin" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}
