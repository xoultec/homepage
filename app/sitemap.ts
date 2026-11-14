import type { MetadataRoute } from 'next'
import { products } from '~/lib/products'
import { SITE_URL } from '~/lib/site'

// Sin /auth ni /r: no son páginas para buscar. Cada producto nuevo del catálogo entra solo.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/facturacion-electronica', '/nomina', '/servicios', '/ofertas', '/solicitar-apertura', '/politica-de-proteccion-de-datos']
  return [
    ...pages.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...products.map((p) => ({ url: `${SITE_URL}/productos/${p.slug}` })),
  ]
}
