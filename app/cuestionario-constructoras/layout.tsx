import type { Metadata } from 'next'

// SEO/Open Graph for /cuestionario-constructoras. The page is a Client Component (uses
// useLanguage), so metadata lives in this server layout.
export const metadata: Metadata = {
  title: { absolute: 'Cuestionario para constructoras | XoulTec' },
  description:
    'Cuéntenos cómo trabaja su constructora (obras, presupuestos, compras, nómina, contabilidad) y le preparamos una propuesta a la medida de su operación. Toma unos 15 minutos.',
  alternates: { canonical: '/cuestionario-constructoras' },
  openGraph: {
    type: 'website',
    locale: 'es_DO',
    siteName: 'XoulTec',
    title: 'Cuestionario para constructoras | XoulTec',
    description: 'Con sus respuestas le preparamos una propuesta a la medida de su operación.',
    url: '/cuestionario-constructoras',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'XoulTec' }],
  },
}

export default function CuestionarioConstructorasLayout({ children }: { children: React.ReactNode }) {
  return children
}
