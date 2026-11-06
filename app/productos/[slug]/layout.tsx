import type { Metadata } from 'next'
import { JsonLd } from '~/components/JsonLd'
import { getProduct, products } from '~/lib/products'
import { SITE_URL } from '~/lib/site'

type Params = Promise<{ slug: string }>

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

// La página del producto es un Client Component, así que los meta* del catálogo se
// publican desde este layout de servidor. `absolute` porque ya traen la marca: con la
// plantilla del raíz saldría "... | XoulTec | XoulTec".
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return {}
  return {
    title: { absolute: product.metaTitleEs },
    description: product.metaDescEs,
    alternates: { canonical: `/productos/${product.slug}` },
    openGraph: {
      type: 'website',
      locale: 'es_DO',
      siteName: 'XoulTec',
      title: product.metaTitleEs,
      description: product.metaDescEs,
      url: `/productos/${product.slug}`,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: 'XoulTec' }],
    },
  }
}

export default async function ProductLayout({ children, params }: { children: React.ReactNode; params: Params }) {
  const { slug } = await params
  const product = getProduct(slug)
  return (
    <>
      {product && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: product.name,
            description: product.metaDescEs,
            url: `${SITE_URL}/productos/${product.slug}`,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            publisher: { '@type': 'Organization', name: 'XoulTec', url: SITE_URL },
          }}
        />
      )}
      {children}
    </>
  )
}
