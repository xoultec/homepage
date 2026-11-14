import type { Metadata } from 'next'

// SEO/Open Graph for /soporte-pventa. The page is a Client Component (uses useLanguage),
// so metadata lives in this server layout.
export const metadata: Metadata = {
  title: { absolute: 'Alcance del soporte de PVenta | XoulTec' },
  description:
    'Qué cubre el soporte incluido en su plan de PVenta y qué se ofrece como servicio aparte: planes y precios, servicios adicionales, horario, canales de contacto, tiempos de respuesta y preguntas frecuentes.',
  alternates: { canonical: '/soporte-pventa' },
  openGraph: {
    type: 'website',
    locale: 'es_DO',
    siteName: 'XoulTec',
    title: 'Alcance del soporte de PVenta | XoulTec',
    description:
      'Planes de PVenta, lo que incluye el soporte de cada uno, servicios adicionales, horario y nuestro compromiso con usted.',
    url: '/soporte-pventa',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'XoulTec' }],
  },
}

export default function SoportePVentaLayout({ children }: { children: React.ReactNode }) {
  return children
}
