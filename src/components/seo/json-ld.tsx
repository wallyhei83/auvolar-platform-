// JSON-LD Structured Data for AI Search and Google Rich Results

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.auvolar.com/#organization',
    name: 'Auvolar',
    legalName: 'Auvolar',
    url: 'https://www.auvolar.com',
    logo: 'https://www.auvolar.com/logo.png',
    description: 'B2B commercial and industrial LED lighting manufacturer and distributor. DLC-certified products for contractors, electricians, and facility managers.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'City of Industry',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    sameAs: [
      'https://www.facebook.com/auvolar',
      'https://www.linkedin.com/company/auvolar',
      'https://www.instagram.com/auvolar_led',
      'https://www.youtube.com/@auvolar',
      'https://www.pinterest.com/auvolar',
      'https://www.tiktok.com/@auvolar',
    ],
    foundingDate: '2020',
    numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 10, maxValue: 50 },
    slogan: 'Quality LED Lighting at Contractor Pricing',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Commercial LED Lighting Products',
      itemListElement: [
        { '@type': 'OfferCatalog', name: 'Indoor Lighting', description: 'High bays, troffers, panels, tubes, strip lights, vapor tight, downlights' },
        { '@type': 'OfferCatalog', name: 'Outdoor Lighting', description: 'Area lights, wall packs, flood lights, bollards, post tops, barn lights' },
        { '@type': 'OfferCatalog', name: 'Solar Lighting', description: 'Solar street lights, solar wall packs, solar flood lights' },
        { '@type': 'OfferCatalog', name: 'Stadium Lighting', description: 'ISF and INS series LED stadium lights, 400W-1800W' },
      ],
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      url: 'https://www.auvolar.com/contact',
    },
    knowsAbout: [
      'LED lighting',
      'Commercial lighting',
      'Industrial lighting',
      'High bay lights',
      'Wall pack lights',
      'Area lights',
      'LED retrofit',
      'DLC certified lighting',
      'Energy efficient lighting',
      'Utility rebates for lighting',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function WebSiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.auvolar.com/#website',
    name: 'Auvolar',
    url: 'https://www.auvolar.com',
    description: 'Commercial LED lighting solutions for contractors and businesses.',
    publisher: { '@id': 'https://www.auvolar.com/#organization' },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.auvolar.com/products?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function LocalBusinessJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.auvolar.com/#localbusiness',
    name: 'Auvolar',
    url: 'https://www.auvolar.com',
    image: 'https://www.auvolar.com/logo.png',
    description: 'Commercial LED lighting manufacturer and wholesale distributor serving contractors and businesses across the United States.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '17531 Railroad St Ste F',
      addressLocality: 'City of Industry',
      addressRegion: 'CA',
      postalCode: '91748',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 34.0197,
      longitude: -117.9587,
    },
    telephone: '(626) 342-8856',
    email: 'sales@auvolar.com',
    priceRange: '$$',
    paymentAccepted: ['Credit Card', 'Wire Transfer', 'Check', 'Net 30'],
    currenciesAccepted: 'USD',
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    hasMap: 'https://maps.google.com/?q=17531+Railroad+St+Ste+F+City+of+Industry+CA+91748',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function ProductJsonLd({
  name,
  description,
  image,
  price,
  sku,
  url,
  category,
  inStock = true,
}: {
  name: string
  description: string
  image?: string
  price: number
  sku?: string
  url: string
  category?: string
  inStock?: boolean
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: image || undefined,
    sku: sku || undefined,
    category: category || 'LED Lighting',
    brand: {
      '@type': 'Brand',
      name: 'Auvolar',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Auvolar',
    },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'USD',
      price: price.toFixed(2),
      availability: inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/PreOrder',
      seller: {
        '@type': 'Organization',
        name: 'Auvolar',
      },
      priceValidUntil: new Date(Date.now() + 90 * 24 * 3600 * 1000).toISOString().split('T')[0],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function SpeakableJsonLd({ name, description, url }: { name: string; description: string; url: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    url,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.product-name', '.product-description', '.product-price'],
    },
    description,
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function HowToJsonLd({ name, description, steps, totalTime }: {
  name: string; description: string; steps: { name: string; text: string }[]; totalTime?: string
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    ...(totalTime && { totalTime }),
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function FAQJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
