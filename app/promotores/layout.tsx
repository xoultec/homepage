import type { Metadata } from 'next'

// Estación de los promotores externos de XoulTec: solicitud abierta y panel privado. No se
// indexa por ahora: se comparte a mano con quien XoulTec quiera invitar.
export const metadata: Metadata = {
  title: { absolute: 'Promotores XoulTec' },
  robots: { index: false, follow: false },
}

export default function PromotoraLayout({ children }: { children: React.ReactNode }) {
  return children
}
