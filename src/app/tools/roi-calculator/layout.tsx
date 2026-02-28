import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LED ROI Calculator | Free LED Tool | Auvolar',
  description: 'Calculate return on investment for LED lighting upgrades. Input current fixtures, energy costs, and rebates to see payback period and savings.',
  alternates: { canonical: 'https://www.auvolar.com/tools/roi-calculator' },
}

const toolJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'LED ROI Calculator',
  url: 'https://www.auvolar.com/tools/roi-calculator',
  description: 'Calculate return on investment for LED lighting upgrades. Input current fixtures, energy costs, and rebates to see payback period and savings.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  provider: { '@type': 'Organization', name: 'Auvolar', url: 'https://www.auvolar.com' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.auvolar.com' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.auvolar.com/tools' },
      { '@type': 'ListItem', position: 3, name: 'LED ROI Calculator', item: 'https://www.auvolar.com/tools/roi-calculator' },
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
