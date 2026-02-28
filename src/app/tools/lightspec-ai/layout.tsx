import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LightSpec AI | Free LED Tool | Auvolar',
  description: 'AI-powered LED lighting specification tool. Describe your project and get instant fixture recommendations with quantities and costs.',
  alternates: { canonical: 'https://www.auvolar.com/tools/lightspec-ai' },
}

const toolJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'LightSpec AI',
  url: 'https://www.auvolar.com/tools/lightspec-ai',
  description: 'AI-powered LED lighting specification tool. Describe your project and get instant fixture recommendations with quantities and costs.',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Web browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  provider: { '@type': 'Organization', name: 'Auvolar', url: 'https://www.auvolar.com' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.auvolar.com' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.auvolar.com/tools' },
      { '@type': 'ListItem', position: 3, name: 'LightSpec AI', item: 'https://www.auvolar.com/tools/lightspec-ai' },
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
