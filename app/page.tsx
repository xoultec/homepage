import type { Metadata } from 'next'
import { JsonLd } from '~/components/JsonLd'
import { SITE_URL } from '~/lib/site'
import HomePage from './HomePage'

// La portada es un Client Component (useLanguage), así que su metadata vive en este
// envoltorio de servidor. El canonical va aquí y no en el layout raíz: en el raíz lo
// heredaría toda página sin canonical propio y le diría a Google que es la portada.
export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'XoulTec',
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  email: 'sales@xoultec.com',
  contactPoint: [
    { '@type': 'ContactPoint', telephone: '+1-809-252-4007', contactType: 'sales', areaServed: 'DO', availableLanguage: ['es', 'en'] },
    { '@type': 'ContactPoint', telephone: '+1-913-413-6583', contactType: 'sales', areaServed: 'US', availableLanguage: ['es', 'en'] },
  ],
}

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'XoulTec',
  url: SITE_URL,
  inLanguage: ['es', 'en'],
}

export default function Page() {
  return (
    <>
      <JsonLd data={organization} />
      <JsonLd data={website} />
      <HomePage />
    </>
  )
}
