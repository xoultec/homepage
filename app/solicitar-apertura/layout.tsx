import type { Metadata } from 'next'

// SEO/Open Graph for the public onboarding-request page. The page itself is a
// Client Component (it uses useLanguage), so the metadata lives in this server
// layout.
export const metadata: Metadata = {
  title: 'Solicitar apertura de empresa | PVenta',
  description:
    'Solicita la apertura de tu empresa en PVenta y empieza a facturar, listo ante la DGII. Comercial o clínica, República Dominicana o Estados Unidos.',
  alternates: { canonical: '/solicitar-apertura' },
  openGraph: {
    type: 'website',
    locale: 'es_DO',
    siteName: 'XoulTec',
    title: 'Solicitar apertura de empresa | PVenta',
    description:
      'Empieza a facturar con PVenta. Te activamos y te dejamos listo ante la DGII.',
  },
}

export default function SolicitarAperturaLayout({ children }: { children: React.ReactNode }) {
  return children
}
