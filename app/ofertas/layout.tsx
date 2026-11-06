import type { Metadata } from 'next'

// La página es un Client Component (useLanguage), así que la metadata vive aquí.
export const metadata: Metadata = {
  title: 'Productos y ofertas',
  description: 'Conoce los sistemas de XoulTec para empresas de República Dominicana y Estados Unidos: facturación, nómina, clínicas, escuelas, préstamos y más.',
  alternates: { canonical: '/ofertas' },
}

export default function OfertasLayout({ children }: { children: React.ReactNode }) {
  return children
}
