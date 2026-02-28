import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photometric Design Request | Free LED Tool | Auvolar',
  description: 'Request a free professional photometric lighting layout for your project. AGi32 and DIALux designs with foot-candle calculations.',
  alternates: { canonical: 'https://www.auvolar.com/tools/photometric-request' },
}

const toolJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Photometric Design Request',
  url: 'https://www.auvolar.com/tools/photometric-request',
  description: 'Request a free professional photometric lighting layout for your project. AGi32 and DIALux designs with foot-candle calculations.',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Web browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  provider: { '@type': 'Organization', name: 'Auvolar', url: 'https://www.auvolar.com' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.auvolar.com' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.auvolar.com/tools' },
      { '@type': 'ListItem', position: 3, name: 'Photometric Design Request', item: 'https://www.auvolar.com/tools/photometric-request' },
    ],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      {children}
    </>
  )
}
