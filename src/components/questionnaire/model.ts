// Modelo común de los cuestionarios por RNC (/cuestionario-constructoras, /cuestionario-empresas).
// Cada cuestionario define sus secciones con estos tipos; el componente <Questionnaire> las
// dibuja, valida lo obligatorio y arma el resumen legible que llega a ventas.
//
// Las claves (`key`) y los valores de las opciones (`value`) son lo que se guarda en PVenta
// (questionnaire_responses.answers). No cambiarlos en un cuestionario publicado: uno ya enviado
// dejaría de cargar sus respuestas. Una pregunta nueva lleva una clave nueva.

export type Option = { value: string; es: string; en: string }

export type Answers = Record<string, string | string[]>

type Labeled = { key: string; es?: string; en?: string; required?: boolean }

export type Field =
  // `stacked`: la etiqueta va encima de la casilla (etiquetas largas, que son preguntas).
  | (Labeled & { type: 'text' | 'textarea'; stacked?: boolean })
  | (Labeled & {
      type: 'radio' | 'checkbox'
      options: Option[]
      /** Clave del texto "especifique" que se abre al elegir la opción `otro`. */
      otherKey?: string
      /** El "especifique" es obligatorio cuando se elige `otro`. */
      otherRequired?: boolean
      otherEs?: string
      otherEn?: string
      /** Claves que se vacían cuando cambia esta respuesta (dependen de ella). */
      clears?: string[]
    })
  // Texto con enlace, sin respuesta (no entra en el resumen).
  | { key: string; type: 'note'; es: string; en: string; href: string; linkEs: string; linkEn: string }

export type Question = {
  /** Número de la pregunta; los bloques sin número (p. ej. "Su rubro") lo omiten. */
  n?: number
  es: string
  en: string
  fields: Field[]
  /** Si se da, la pregunta solo se muestra (y solo cuenta) cuando devuelve true. */
  showIf?: (answers: Answers) => boolean
}

export type Section = {
  id: string
  es: string
  en: string
  noteEs?: string
  noteEn?: string
  questions: Question[]
}

export const OTHER = 'otro'

export const YES_NO: Option[] = [
  { value: 'si', es: 'Sí', en: 'Yes' },
  { value: 'no', es: 'No', en: 'No' },
]

export const text = (key: string, es?: string, en?: string): Field => ({ key, type: 'text', es, en })
export const area = (key: string): Field => ({ key, type: 'textarea' })
export const yesNo = (key: string, es?: string, en?: string): Field => ({ key, type: 'radio', es, en, options: YES_NO })

export const isVisible = (q: Question, answers: Answers) => !q.showIf || q.showIf(answers)

const filled = (v: Answers[string] | undefined) =>
  Array.isArray(v) ? v.length > 0 : typeof v === 'string' && v.trim() !== ''

const chose = (v: Answers[string] | undefined, value: string) => (Array.isArray(v) ? v.includes(value) : v === value)

/** Visible questions with a required answer missing (including a required "especifique"). */
export function missingRequired(sections: Section[], answers: Answers): Question[] {
  const out: Question[] = []
  for (const s of sections) {
    for (const q of s.questions) {
      if (!isVisible(q, answers)) continue
      const missing = q.fields.some((f) => {
        if (f.type === 'note') return false
        if (f.required && !filled(answers[f.key])) return true
        return (
          (f.type === 'radio' || f.type === 'checkbox') &&
          !!f.otherKey &&
          !!f.otherRequired &&
          chose(answers[f.key], OTHER) &&
          !filled(answers[f.otherKey])
        )
      })
      if (missing) out.push(q)
    }
  }
  return out
}

/** The answers without those of hidden questions (e.g. the rubro block of another type). */
export function withoutHidden(sections: Section[], answers: Answers): Answers {
  const out: Answers = { ...answers }
  for (const s of sections) {
    for (const q of s.questions) {
      if (isVisible(q, answers)) continue
      for (const f of q.fields) {
        delete out[f.key]
        if ((f.type === 'radio' || f.type === 'checkbox') && f.otherKey) delete out[f.otherKey]
      }
    }
  }
  // A key shared by several blocks (rubro_tipo) may belong to a visible one: put it back.
  for (const s of sections) {
    for (const q of s.questions) {
      if (!isVisible(q, answers)) continue
      for (const f of q.fields) {
        if (f.key in answers) out[f.key] = answers[f.key]
        if ((f.type === 'radio' || f.type === 'checkbox') && f.otherKey && f.otherKey in answers) {
          out[f.otherKey] = answers[f.otherKey]
        }
      }
    }
  }
  return out
}

/** Answers as readable Spanish text (question + answer), for the sales email. */
export function buildSummary(sections: Section[], answers: Answers): string {
  const lines: string[] = []
  for (const s of sections) {
    const questions = s.questions.filter((q) => isVisible(q, answers))
    if (questions.length === 0) continue
    lines.push(`== ${s.es} ==`)
    for (const q of questions) {
      const parts: string[] = []
      for (const f of q.fields) {
        if (f.type === 'note') continue
        const v = answers[f.key]
        let shown = ''
        if (f.type === 'radio') {
          const o = f.options.find((o) => o.value === v)
          shown = o ? (o.value === OTHER && f.otherKey ? `${o.es} ${String(answers[f.otherKey] ?? '').trim()}` : o.es) : ''
        } else if (f.type === 'checkbox') {
          const picked = Array.isArray(v) ? v : []
          shown = f.options
            .filter((o) => picked.includes(o.value))
            .map((o) => (o.value === OTHER && f.otherKey ? `${o.es} ${String(answers[f.otherKey] ?? '').trim()}` : o.es))
            .join('; ')
        } else {
          shown = typeof v === 'string' ? v.trim() : ''
        }
        if (shown) parts.push(f.es ? `${f.es} ${shown}` : shown)
      }
      lines.push(q.n ? `${q.n}. ${q.es}` : q.es)
      lines.push(`   ${parts.length ? parts.join(' | ') : '—'}`)
    }
    lines.push('')
  }
  return lines.join('\n')
}
