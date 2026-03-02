'use client'

import { Play, Smartphone } from 'lucide-react'
import { useLanguage } from '~/lib/i18n'

export function ScreenshotSection() {
  const { t } = useLanguage()

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-dark mb-4 text-center fade-in visible">
          {t('Plataforma Web y Movil', 'Web & Mobile Platform')}
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12 fade-in visible">
          {t(
            'PVenta ERP disponible en tu navegador y en tu celular. Gestiona tu negocio desde cualquier lugar.',
            'PVenta ERP available in your browser and on your phone. Manage your business from anywhere.'
          )}
        </p>
        <div className="grid md:grid-cols-3 gap-8 items-center fade-in visible">
          {/* Web Screenshot */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-gray-100 px-4 py-2 flex items-center gap-2 border-b border-gray-200">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="text-gray-400 text-xs ml-2 font-mono">PVenta ERP</span>
              </div>
              <img src="/img/sicacc.jpg" alt="PVenta ERP - Accounts Payable Module" className="w-full" />
            </div>
            <p className="text-center text-gray-500 text-sm mt-3">
              {t('Modulo de Cuentas por Pagar — Interfaz web', 'Accounts Payable Module — Web interface')}
            </p>
          </div>

          {/* Mobile Screenshot */}
          <div className="flex justify-center">
            <div>
              <div className="bg-gray-900 rounded-[2.5rem] p-3 shadow-xl max-w-[220px]">
                <div className="bg-white rounded-[2rem] overflow-hidden">
                  <img src="/img/pventa-mobile.webp" alt="PVenta Mobile App" className="w-full" />
                </div>
              </div>
              <p className="text-center text-gray-500 text-sm mt-3">PVenta Mobile — Android & iOS</p>
              <div className="flex justify-center gap-2 mt-2">
                <a href="https://play.google.com/store/apps/details?id=sim.cliente.pventa" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-700 transition">
                  <Play className="w-3 h-3" /> Google Play
                </a>
                <a href="https://apps.apple.com/us/app/pventa-mobile/id6449156165" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-700 transition">
                  <Smartphone className="w-3 h-3" /> App Store
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
