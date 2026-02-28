import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LED Lighting Services | Design, Installation Support | Auvolar',
  description: 'Auvolar offers photometric design, lighting layout, energy audits, rebate assistance, and technical support for commercial LED lighting projects.',
  alternates: { canonical: 'https://www.auvolar.com/services' },
}

const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Auvolar LED Lighting Services',
  url: 'https://www.auvolar.com/services',
  mainEntity: {
    '@type': 'OfferCatalog',
    name: 'LED Lighting Professional Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Free Photometric Lighting Design',
          description: 'Custom photometric layouts using AGi32/DIALux software with foot-candle calculations, fixture placement plans, and energy code compliance review. Available for any commercial or industrial project at no charge.',
          provider: { '@type': 'Organization', name: 'Auvolar' },
          areaServed: { '@type': 'Country', name: 'United States' },
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Free with any project inquiry' },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Utility Rebate Assistance',
          description: 'Help with DLC rebate applications, documentation, and connecting with local utility representatives for LED upgrade incentives of $20-$150+ per fixture.',
          provider: { '@type': 'Organization', name: 'Auvolar' },
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Free rebate assistance' },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'LED Retrofit ROI Analysis',
          description: 'Energy savings calculations, payback period analysis, and total cost of ownership comparison for LED upgrades from HID, fluorescent, or metal halide fixtures.',
          provider: { '@type': 'Organization', name: 'Auvolar' },
        },
      },
    ],
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.auvolar.com' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.auvolar.com/services' },
    ],
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      {children}
    </>
  )
}
