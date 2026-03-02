'use client'

import Link from 'next/link'
import { useLanguage } from '~/lib/i18n'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer-gradient text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-dark font-bold text-lg">X</span>
              </div>
              <span className="text-white font-bold text-xl">Xoul<span className="text-secondary">Tec</span></span>
            </div>
            <p className="text-sm max-w-sm">
              {t(
                'Soluciones de software empresarial para Republica Dominicana y Estados Unidos.',
                'Enterprise software solutions for the Dominican Republic and the United States.'
              )}
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t('Productos', 'Products')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/productos/pventa" className="hover:text-white transition">PVenta</Link></li>
              <li><Link href="/productos/easypos" className="hover:text-white transition">EasyPOS</Link></li>
              <li><Link href="/productos/eclinic" className="hover:text-white transition">eClinic</Link></li>
              <li><Link href="/productos/dental" className="hover:text-white transition">eClinic Dental</Link></li>
              <li><Link href="/productos/autoshop" className="hover:text-white transition">AutoShop Pro</Link></li>
              <li><Link href="/productos/nomina" className="hover:text-white transition">{t('Nómina', 'Payroll')}</Link></li>
              <li><Link href="/productos/eloan" className="hover:text-white transition">eLoan</Link></li>
              <li><Link href="/productos/eduapp" className="hover:text-white transition">EduApp</Link></li>
              <li><Link href="/productos/fri" className="hover:text-white transition">FRI</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t('Contacto', 'Contact')}</h4>
            <ul className="space-y-2 text-sm">
              <li>sales@xoultec.com</li>
              <li><img src="https://flagcdn.com/16x12/us.png" alt="USA" className="inline align-middle mr-1" />+1 (816) 919-3349</li>
              <li><img src="https://flagcdn.com/16x12/do.png" alt="RD" className="inline align-middle mr-1" />+1 (809) 252-4007</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 XoulTec. {t('Todos los derechos reservados.', 'All rights reserved.')}</p>
        </div>
      </div>
    </footer>
  )
}
