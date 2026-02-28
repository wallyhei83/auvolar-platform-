import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LED Lighting Calculator | Free LED Tool | Auvolar',
  description: 'Calculate how many LED fixtures you need. Input room dimensions, ceiling height, and desired light level.',
  alternates: { canonical: 'https://www.auvolar.com/tools/lighting-calculator' },
}

const toolJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'LED Lighting Calculator',
  url: 'https://www.auvolar.com/tools/lighting-calculator',
  description: 'Calculate how many LED fixtures you need. Input room dimensions, ceiling height, and desired light level.',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Web browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  provider: { '@type': 'Organization', name: 'Auvolar', url: 'https://www.auvolar.com' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.auvolar.com' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.auvolar.com/tools' },
      { '@type': 'ListItem', position: 3, name: 'LED Lighting Calculator', item: 'https://www.auvolar.com/tools/lighting-calculator' },
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
