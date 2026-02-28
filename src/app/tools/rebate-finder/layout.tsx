import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Utility Rebate Finder | Free LED Tool | Auvolar',
  description: 'Look up available LED lighting utility rebates by state, utility company, or fixture type. Find DLC rebate programs near you.',
  alternates: { canonical: 'https://www.auvolar.com/tools/rebate-finder' },
}

const toolJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Utility Rebate Finder',
  url: 'https://www.auvolar.com/tools/rebate-finder',
  description: 'Look up available LED lighting utility rebates by state, utility company, or fixture type. Find DLC rebate programs near you.',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Web browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  provider: { '@type': 'Organization', name: 'Auvolar', url: 'https://www.auvolar.com' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.auvolar.com' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.auvolar.com/tools' },
      { '@type': 'ListItem', position: 3, name: 'Utility Rebate Finder', item: 'https://www.auvolar.com/tools/rebate-finder' },
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
