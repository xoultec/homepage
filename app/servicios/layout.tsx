import type { Metadata } from 'next'

// SEO/Open Graph for /servicios. The page is a Client Component (uses useLanguage),
// so metadata lives in this server layout.
export const metadata: Metadata = {
  title: { absolute: 'Soporte técnico remoto y Videojuegos | XoulTec' },
  description:
    'Soporte técnico remoto para empresas en RD y Estados Unidos, y soporte para PC gamer y consolas. Pago por hora por adelantado, con autorización expresa del cliente. Lunes a viernes 8:00 a.m.–6:00 p.m. y sábados 8:00 a.m.–2:00 p.m. (hora RD).',
  alternates: { canonical: '/servicios' },
  openGraph: {
    type: 'website',
    locale: 'es_DO',
    siteName: 'XoulTec',
    title: 'Soporte técnico remoto y Videojuegos | XoulTec',
    description:
      'Soporte remoto para empresas desde US$40/hora y soporte gamer desde US$60/hora. Acceso temporal, autorizado por ti y retirado al terminar.',
  },
}

export default function ServiciosLayout({ children }: { children: React.ReactNode }) {
  return children
}
