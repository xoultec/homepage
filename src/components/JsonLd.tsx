// Datos estructurados (schema.org) para buscadores y asistentes de IA.
// `<` se escapa para que un texto del catálogo no pueda cerrar la etiqueta <script>.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
