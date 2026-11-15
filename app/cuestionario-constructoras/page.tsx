'use client'

import { Building2 } from 'lucide-react'
import { Questionnaire } from '~/components/questionnaire/Questionnaire'
import { INTRO_EN, INTRO_ES, SECTIONS, THANKS_EN, THANKS_ES } from './questions'

// Cuestionario para constructoras: se llena por RNC y se guarda en PVenta (ver
// app/api/cuestionario-constructoras/route.ts).
export default function CuestionarioConstructorasPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Questionnaire
        store="xoultec-cuestionario-constructoras"
        apiPath="/api/cuestionario-constructoras"
        icon={Building2}
        badge={{ es: 'Constructoras', en: 'Construction companies' }}
        title={{ es: 'Cuestionario para constructoras', en: 'Questionnaire for construction companies' }}
        intro={{ es: INTRO_ES, en: INTRO_EN }}
        thanks={{ es: THANKS_ES, en: THANKS_EN }}
        sections={SECTIONS}
      />
    </main>
  )
}
