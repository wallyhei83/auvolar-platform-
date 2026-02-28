import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Request for Quote (RFQ) | Free LED Tool | Auvolar',
  description: 'Submit a request for quote on commercial LED lighting projects. Get custom pricing for large or specialized orders.',
  alternates: { canonical: 'https://www.auvolar.com/tools/rfq' },
}

const toolJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Request for Quote (RFQ)',
  url: 'https://www.auvolar.com/tools/rfq',
  description: 'Submit a request for quote on commercial LED lighting projects. Get custom pricing for large or specialized orders.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  provider: { '@type': 'Organization', name: 'Auvolar', url: 'https://www.auvolar.com' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.auvolar.com' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.auvolar.com/tools' },
      { '@type': 'ListItem', position: 3, name: 'Request for Quote (RFQ)', item: 'https://www.auvolar.com/tools/rfq' },
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
