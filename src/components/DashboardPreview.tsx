'use client'

import { DollarSign, TrendingUp, CreditCard, Receipt, HandCoins, BookOpen, Landmark, Settings } from 'lucide-react'
import { useLanguage } from '~/lib/i18n'

function BarChart({ color, bars }: { color: string; bars: string[] }) {
  return (
    <div className="flex items-end gap-1 h-32">
      {bars.map((h, i) => (
        <div key={i} className={`flex-1 bg-${color}-500/${30 + Math.floor((i / bars.length) * 70)} rounded-t`} style={{ height: h }} />
      ))}
    </div>
  )
}

const salesBars = ['45%','55%','40%','65%','50%','70%','60%','75%','55%','80%','65%','50%','85%','70%','90%','60%','75%','55%','85%','95%','70%','80%','65%','90%','75%','85%','60%','92%','78%','100%']
const collectionBars = ['50%','40%','60%','35%','55%','70%','45%','65%','50%','75%','55%','80%','60%','70%','85%','50%','75%','90%','65%','80%','55%','85%','70%','60%','90%','75%','95%','68%','88%','82%']

export function DashboardPreview() {
  const { t } = useLanguage()

  return (
    <section className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 fade-in visible">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('Dashboard en Tiempo Real', 'Real-Time Dashboard')}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t(
              'Visualiza el rendimiento de tu negocio con metricas clave, graficos interactivos y reportes automaticos.',
              'Visualize your business performance with key metrics, interactive charts and automated reports.'
            )}
          </p>
        </div>

        <div className="bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden shadow-2xl fade-in visible">
          <div className="bg-gray-800 px-6 py-3 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <span className="text-gray-400 text-sm font-mono">PVenta ERP — Dashboard</span>
            <div className="text-gray-500 text-xs">admin@empresa.com</div>
          </div>

          <div className="p-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl p-4 border border-green-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center"><DollarSign className="w-4 h-4 text-green-400" /></div>
                  <span className="text-green-400 text-xs font-semibold">{t('Vendido Hoy', 'Sales Today')}</span>
                </div>
                <div className="text-2xl font-bold text-white">{t('RD$ 284,500', '$4,850')}</div>
                <div className="text-green-400 text-xs mt-1">+12.5% {t('vs ayer', 'vs yesterday')}</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl p-4 border border-blue-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center"><TrendingUp className="w-4 h-4 text-blue-400" /></div>
                  <span className="text-blue-400 text-xs font-semibold">{t('Cobrado Hoy', 'Collected Today')}</span>
                </div>
                <div className="text-2xl font-bold text-white">{t('RD$ 198,750', '$3,390')}</div>
                <div className="text-blue-400 text-xs mt-1">+8.3% {t('vs ayer', 'vs yesterday')}</div>
              </div>
              <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-xl p-4 border border-amber-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center"><CreditCard className="w-4 h-4 text-amber-400" /></div>
                  <span className="text-amber-400 text-xs font-semibold">{t('Cuentas x Cobrar', 'Accounts Receivable')}</span>
                </div>
                <div className="text-2xl font-bold text-white">{t('RD$ 1.2M', '$20.5K')}</div>
                <div className="text-amber-400 text-xs mt-1">142 {t('facturas pendientes', 'pending invoices')}</div>
              </div>
              <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-xl p-4 border border-red-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center"><Receipt className="w-4 h-4 text-red-400" /></div>
                  <span className="text-red-400 text-xs font-semibold">{t('Cuentas x Pagar', 'Accounts Payable')}</span>
                </div>
                <div className="text-2xl font-bold text-white">{t('RD$ 856K', '$14.6K')}</div>
                <div className="text-red-400 text-xs mt-1">87 {t('facturas pendientes', 'pending invoices')}</div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <h4 className="text-white text-sm font-semibold mb-4">{t('Ventas - Ultimos 30 dias', 'Sales - Last 30 Days')}</h4>
                <BarChart color="green" bars={salesBars} />
                <div className="flex justify-between mt-2 text-gray-500 text-xs"><span>1</span><span>10</span><span>20</span><span>30</span></div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <h4 className="text-white text-sm font-semibold mb-4">{t('Cobros - Ultimos 30 dias', 'Collections - Last 30 Days')}</h4>
                <BarChart color="blue" bars={collectionBars} />
                <div className="flex justify-between mt-2 text-gray-500 text-xs"><span>1</span><span>10</span><span>20</span><span>30</span></div>
              </div>
            </div>

            {/* Module Navigation */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
              <div className="bg-gradient-to-br from-blue-600/30 to-blue-700/20 rounded-lg p-3 border border-blue-500/20 text-center">
                <HandCoins className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                <span className="text-blue-300 text-xs font-semibold">CxC</span>
              </div>
              <div className="bg-gradient-to-br from-green-600/30 to-green-700/20 rounded-lg p-3 border border-green-500/20 text-center">
                <Receipt className="w-5 h-5 text-green-400 mx-auto mb-1" />
                <span className="text-green-300 text-xs font-semibold">CxP</span>
              </div>
              <div className="bg-gradient-to-br from-purple-600/30 to-purple-700/20 rounded-lg p-3 border border-purple-500/20 text-center">
                <BookOpen className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                <span className="text-purple-300 text-xs font-semibold">{t('Contabilidad', 'Accounting')}</span>
              </div>
              <div className="bg-gradient-to-br from-cyan-600/30 to-cyan-700/20 rounded-lg p-3 border border-cyan-500/20 text-center">
                <Landmark className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                <span className="text-cyan-300 text-xs font-semibold">{t('Bancos', 'Banking')}</span>
              </div>
              <div className="bg-gradient-to-br from-violet-600/30 to-violet-700/20 rounded-lg p-3 border border-violet-500/20 text-center">
                <Settings className="w-5 h-5 text-violet-400 mx-auto mb-1" />
                <span className="text-violet-300 text-xs font-semibold">{t('Utilitarios', 'Utilities')}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-4 italic">
          {t(
            '* Datos ilustrativos. El dashboard se actualiza en tiempo real cada 5 minutos.',
            '* Illustrative data. Dashboard refreshes in real-time every 5 minutes.'
          )}
        </p>
      </div>
    </section>
  )
}
