import type { Metadata } from 'next'

// Panel privado de las promotoras externas de XoulTec. No se indexa: se entra solo con el
// enlace personal que XoulTec le envía a cada una.
export const metadata: Metadata = {
  title: { absolute: 'Mi estación de promoción | XoulTec' },
  robots: { index: false, follow: false },
}

export default function PromotoraLayout({ children }: { children: React.ReactNode }) {
  return children
}
