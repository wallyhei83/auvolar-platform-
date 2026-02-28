import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LED Replacement Finder | Free LED Tool | Auvolar',
  description: 'Find LED replacements for existing HID, fluorescent, and metal halide fixtures. Enter your current fixture type to get matching LED options with energy savings.',
  alternates: { canonical: 'https://www.auvolar.com/tools/replacement' },
}

const toolJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'LED Replacement Finder',
  url: 'https://www.auvolar.com/tools/replacement',
  description: 'Find LED replacements for existing HID, fluorescent, and metal halide fixtures. Enter your current fixture type to get matching LED options with energy savings.',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Web browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  provider: { '@type': 'Organization', name: 'Auvolar', url: 'https://www.auvolar.com' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.auvolar.com' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.auvolar.com/tools' },
      { '@type': 'ListItem', position: 3, name: 'LED Replacement Finder', item: 'https://www.auvolar.com/tools/replacement' },
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
