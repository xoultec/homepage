import type { Metadata } from 'next'

// SEO/Open Graph for the referral landing (/r?t=<rnc>&u=<user>). The page is a Client
// Component (useLanguage + reads the referral query), so metadata lives in this server
// layout. Noindex: these are personalized referral links, not a page to be indexed.
export const metadata: Metadata = {
  title: 'Te recomendaron PVenta | XoulTec',
  description:
    'Un cliente de XoulTec te recomendó PVenta. Solicita la apertura de tu empresa y empieza a facturar, listo ante la DGII.',
  robots: { index: false, follow: true },
  openGraph: {
    type: 'website',
    locale: 'es_DO',
    siteName: 'XoulTec',
    title: 'Te recomendaron PVenta | XoulTec',
    description: 'Empieza a facturar con PVenta. Te activamos y te dejamos listo ante la DGII.',
  },
}

export default function ReferralLayout({ children }: { children: React.ReactNode }) {
  return children
}
