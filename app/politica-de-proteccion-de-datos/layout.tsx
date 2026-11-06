import type { Metadata } from 'next'

// La página es un Client Component (useLanguage), así que la metadata vive aquí.
export const metadata: Metadata = {
  title: 'Política de Protección de Datos',
  description: 'Cómo XoulTec recopila, usa y protege los datos personales de sus clientes y usuarios.',
  alternates: { canonical: '/politica-de-proteccion-de-datos' },
}

export default function PoliticaLayout({ children }: { children: React.ReactNode }) {
  return children
}
