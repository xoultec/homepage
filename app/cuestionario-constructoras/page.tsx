'use client'

import { ConstructionQuestionnaire } from './ConstructionQuestionnaire'

// Cuestionario para constructoras: se llena por RNC y se guarda en PVenta (ver
// app/api/cuestionario-constructoras/route.ts).
export default function CuestionarioConstructorasPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <ConstructionQuestionnaire />
    </main>
  )
}
