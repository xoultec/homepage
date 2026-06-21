import type { Metadata } from 'next'

// SEO/Open Graph for the Nómina (payroll) campaign landing. The page is a Client
// Component (uses useLanguage), so metadata lives in this server layout.
export const metadata: Metadata = {
  title: 'Nómina RD + USA | XoulTec',
  description:
    'Procesa tu nómina en República Dominicana y Estados Unidos desde un solo sistema. Cálculo automático de ISR, TSS e INFOTEP, liquidaciones, deducciones y multi-moneda (DOP/USD). US$4 por empleado, sin cuota base.',
  alternates: { canonical: '/nomina' },
  openGraph: {
    type: 'website',
    locale: 'es_DO',
    siteName: 'XoulTec',
    title: 'Nómina RD + USA en un solo sistema | XoulTec',
    description:
      'Nómina para RD y USA: ISR, TSS, INFOTEP, liquidaciones y multi-moneda. Precio simple: US$4 por empleado, sin cuota base.',
  },
}

export default function NominaLayout({ children }: { children: React.ReactNode }) {
  return children
}
