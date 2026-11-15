import type { Metadata } from 'next'

// SEO/Open Graph for /cuestionario-empresas. The page is a Client Component (uses
// useLanguage), so metadata lives in this server layout.
export const metadata: Metadata = {
  title: { absolute: 'Cuestionario para empresas | XoulTec' },
  description:
    'Cuéntenos cómo trabaja su empresa y le recomendamos el plan de PVenta que más le conviene, sin pagar por lo que no necesita. Toma unos 10 minutos.',
  alternates: { canonical: '/cuestionario-empresas' },
  openGraph: {
    type: 'website',
    locale: 'es_DO',
    siteName: 'XoulTec',
    title: 'Cuestionario para empresas | XoulTec',
    description: 'Con sus respuestas le recomendamos el plan de PVenta que más le conviene.',
    url: '/cuestionario-empresas',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'XoulTec' }],
  },
}

export default function CuestionarioEmpresasLayout({ children }: { children: React.ReactNode }) {
  return children
}
