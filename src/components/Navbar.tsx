'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, LogIn } from 'lucide-react'
import { useLanguage } from '~/lib/i18n'

export function Navbar() {
  const { lang, toggleLanguage, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 bg-dark/90 backdrop-blur-sm transition-all duration-300 ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center">
              <span className="text-dark font-bold text-lg">X</span>
            </div>
            <span className="text-white font-bold text-xl">Xoul<span className="text-secondary">Tec</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="/#inicio" className="text-gray-300 hover:text-white transition">{t('Inicio', 'Home')}</a>
            <a href="/#productos" className="text-gray-300 hover:text-white transition">{t('Productos', 'Products')}</a>
            <a href="/#nosotros" className="text-gray-300 hover:text-white transition">{t('Nosotros', 'About')}</a>
            <a href="/#contacto" className="text-gray-300 hover:text-white transition">{t('Contacto', 'Contact')}</a>
            <a href="https://pay.xoultec.com/p/login/6oE8xf7s9bKQ1xKaEE" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition flex items-center gap-1">
              <LogIn className="w-4 h-4" />
              {t('Portal Cliente', 'Client Portal')}
            </a>
            <button onClick={toggleLanguage} className="text-secondary border border-secondary px-3 py-1 rounded hover:bg-secondary hover:text-dark transition text-sm font-semibold">
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
            <a href="/#contacto" className="bg-secondary text-dark px-5 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition cta-pulse">
              {t('Cotizar', 'Get Quote')}
            </a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className={`mobile-menu md:hidden pb-4 ${menuOpen ? 'open' : ''}`}>
          <a href="/#inicio" className="block text-gray-300 hover:text-white py-2" onClick={() => setMenuOpen(false)}>{t('Inicio', 'Home')}</a>
          <a href="/#productos" className="block text-gray-300 hover:text-white py-2" onClick={() => setMenuOpen(false)}>{t('Productos', 'Products')}</a>
          <a href="/#nosotros" className="block text-gray-300 hover:text-white py-2" onClick={() => setMenuOpen(false)}>{t('Nosotros', 'About')}</a>
          <a href="/#contacto" className="block text-gray-300 hover:text-white py-2" onClick={() => setMenuOpen(false)}>{t('Contacto', 'Contact')}</a>
          <a href="https://pay.xoultec.com/p/login/6oE8xf7s9bKQ1xKaEE" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-white py-2">
            {t('Portal Cliente', 'Client Portal')}
          </a>
          <div className="flex gap-3 mt-3">
            <button onClick={toggleLanguage} className="text-secondary border border-secondary px-3 py-1 rounded text-sm font-semibold">EN/ES</button>
            <a href="/#contacto" className="bg-secondary text-dark px-4 py-1 rounded font-semibold">{t('Cotizar', 'Get Quote')}</a>
          </div>
        </div>
      </div>
    </nav>
  )
}
