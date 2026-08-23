import type { Metadata } from 'next'
import { Providers } from './providers'
import { PrivacyBanner } from '~/components/PrivacyBanner'
import { Navbar } from '~/components/Navbar'
import { Footer } from '~/components/Footer'
import { ChatWidget } from '~/components/ChatWidget'
import { Analytics } from '@vercel/analytics/next'
import '~/styles.css'

export const metadata: Metadata = {
  title: {
    default: 'XoulTec - Software Solutions',
    template: '%s | XoulTec',
  },
  description: 'XoulTec desarrolla soluciones de software empresarial para Rep. Dominicana y USA. POS, Nomina, Facturacion, Escuelas y mas.',
  // Iconos y OG generados desde el MISMO lockup del avatar de Instagram/WhatsApp
  // (marketing/logo-src/avatar-xoultec.html): caja #f59e0b, X #0f172a peso 900.
  // Antes el favicon era un hexágono del 5-mar-2026, sobra de la plantilla con la
  // que se armó el sitio — no tenía nada que ver con la marca. Y no había imagen
  // de OG, así que compartir xoultec.com por WhatsApp salía sin logo.
  metadataBase: new URL('https://xoultec.com'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'es_DO',
    siteName: 'XoulTec',
    title: 'XoulTec - Software Solutions',
    description: 'Soluciones de software empresarial para Rep. Dominicana y USA.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'XoulTec' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XoulTec - Software Solutions',
    description: 'Soluciones de software empresarial para Rep. Dominicana y USA.',
    images: ['/og.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-white text-gray-800">
        <Providers>
          <PrivacyBanner />
          <Navbar />
          <div className="pt-10">{children}</div>
          <Footer />
          <ChatWidget />
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
