import type { Metadata } from 'next'
import { Providers } from './providers'
import { Navbar } from '~/components/Navbar'
import { Footer } from '~/components/Footer'
import { ChatWidget } from '~/components/ChatWidget'
import '~/styles.css'

export const metadata: Metadata = {
  title: {
    default: 'XoulTec - Software Solutions',
    template: '%s | XoulTec',
  },
  description: 'XoulTec desarrolla soluciones de software empresarial para Rep. Dominicana y USA. POS, Nomina, Facturacion, Escuelas y mas.',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    type: 'website',
    locale: 'es_DO',
    siteName: 'XoulTec',
    title: 'XoulTec - Software Solutions',
    description: 'Soluciones de software empresarial para Rep. Dominicana y USA.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-white text-gray-800">
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <ChatWidget />
        </Providers>
      </body>
    </html>
  )
}
