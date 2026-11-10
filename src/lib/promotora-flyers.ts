// Flyers de la estación de promotoras (/promotora). Cada uno se dibuja en el navegador con el QR
// PERSONAL de la promotora, así que el mismo diseño sirve para todas y cada escaneo se le acredita.
//
// ⛔ `aprobado` lo cambia solo Rubén. Lo comercial (qué se promete, si van precios) lo confirma él
// antes de que nada se imprima o se comparta. Mientras esté en false, el panel enseña el flyer con
// la marca BORRADOR y NO deja descargarlo. Sin precios en ningún flyer sin su visto bueno.

export type FlyerId = 'ecf'

export type Flyer = {
  id: FlyerId
  titulo: string
  descripcion: string
  // `tema` viaja en el QR (/r?…&tema=ecf) para que la página de llegada hable del mismo asunto
  // que el flyer que la persona tenía en la mano.
  tema: string
  aprobado: boolean
}

export const FLYERS: Flyer[] = [
  {
    id: 'ecf',
    titulo: 'Facturación electrónica (e-CF)',
    descripcion: 'Cumplir con la DGII sin complicarse. XoulTec, proveedor autorizado por la DGII.',
    tema: 'ecf',
    aprobado: false,
  },
]
