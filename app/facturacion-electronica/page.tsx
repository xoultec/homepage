'use client'

import { EcfLanding } from './EcfLanding'

// Campaign URL for ads (utm tracking). Renders the same e-CF landing that also
// leads the home page.
export default function FacturacionElectronicaPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <EcfLanding />
    </main>
  )
}
