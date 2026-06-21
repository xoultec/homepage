import type { Metadata } from 'next'

// SEO/Open Graph for the e-CF campaign landing. The page itself is a Client
// Component (it uses useLanguage), so the metadata lives in this server layout.
export const metadata: Metadata = {
  title: 'Facturación Electrónica e-CF DGII | PVenta',
  description:
    'Cumple con la facturación electrónica obligatoria (Ley 32-23, e-CF) antes del 15 de noviembre de 2026. PVenta emite e-CF ante la DGII y maneja ventas, inventario y contabilidad en un solo sistema, sin pagar cuatro suscripciones.',
  alternates: { canonical: '/facturacion-electronica' },
  openGraph: {
    type: 'website',
    locale: 'es_DO',
    siteName: 'XoulTec',
    title: 'Facturación Electrónica e-CF lista ante la DGII | PVenta',
    description:
      'Cumple con la Ley 32-23 antes del 15 de noviembre de 2026. e-CF + todo tu negocio en un solo sistema, sin topes de ingresos.',
  },
}

export default function FacturacionElectronicaLayout({ children }: { children: React.ReactNode }) {
  return children
}
