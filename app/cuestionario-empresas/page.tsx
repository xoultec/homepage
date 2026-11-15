'use client'

import { Store } from 'lucide-react'
import { Questionnaire } from '~/components/questionnaire/Questionnaire'
import { INTRO_EN, INTRO_ES, SECTIONS, THANKS_EN, THANKS_ES } from './questions'

// Cuestionario para empresas (todas las que no son constructoras): se llena por RNC y se
// guarda en PVenta como kind "business" (ver app/api/cuestionario-empresas/route.ts).
export default function CuestionarioEmpresasPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Questionnaire
        store="xoultec-cuestionario-empresas"
        apiPath="/api/cuestionario-empresas"
        icon={Store}
        badge={{ es: 'Empresas', en: 'Businesses' }}
        title={{ es: 'Cuestionario para empresas', en: 'Questionnaire for businesses' }}
        intro={{ es: INTRO_ES, en: INTRO_EN }}
        thanks={{ es: THANKS_ES, en: THANKS_EN }}
        sections={SECTIONS}
      />
    </main>
  )
}
