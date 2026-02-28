import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Auvolar | Get a Free LED Lighting Quote',
  description: 'Contact Auvolar for wholesale LED lighting quotes, free photometric lighting design, and technical support. Call (626) 342-8856 or email sales@auvolar.com.',
  alternates: { canonical: 'https://www.auvolar.com/contact' },
}

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Auvolar',
  url: 'https://www.auvolar.com/contact',
  description: 'Get a free LED lighting quote, request photometric design, or ask technical questions.',
  mainEntity: {
    '@type': 'Organization',
    '@id': 'https://www.auvolar.com/#organization',
    name: 'Auvolar',
    telephone: '(626) 342-8856',
    email: 'sales@auvolar.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '17531 Railroad St Ste F',
      addressLocality: 'City of Industry',
      addressRegion: 'CA',
      postalCode: '91748',
      addressCountry: 'US',
    },
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      {children}
    </>
  )
}
