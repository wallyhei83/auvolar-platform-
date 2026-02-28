import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BOM Upload Tool | Free LED Tool | Auvolar',
  description: 'Upload your Bill of Materials spreadsheet for instant LED bulk quoting. Supports Excel and CSV. Get volume pricing within 24 hours.',
  alternates: { canonical: 'https://www.auvolar.com/tools/bom-upload' },
}

const toolJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'BOM Upload Tool',
  url: 'https://www.auvolar.com/tools/bom-upload',
  description: 'Upload your Bill of Materials spreadsheet for instant LED bulk quoting. Supports Excel and CSV. Get volume pricing within 24 hours.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  provider: { '@type': 'Organization', name: 'Auvolar', url: 'https://www.auvolar.com' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.auvolar.com' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.auvolar.com/tools' },
      { '@type': 'ListItem', position: 3, name: 'BOM Upload Tool', item: 'https://www.auvolar.com/tools/bom-upload' },
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
