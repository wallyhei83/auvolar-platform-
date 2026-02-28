import { Suspense } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Commercial LED Lighting Products | DLC Certified | Auvolar',
  description: 'Browse 125+ DLC-certified commercial LED fixtures: high bays, wall packs, area lights, flood lights, troffers, LED tubes, and more. Wholesale pricing for contractors.',
  alternates: { canonical: 'https://www.auvolar.com/products' },
}

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Auvolar Commercial LED Lighting Products',
  url: 'https://www.auvolar.com/products',
  description: 'Browse 125+ DLC-certified commercial LED lighting products at wholesale pricing. Indoor, outdoor, solar, and stadium lighting for contractors and businesses.',
  mainEntity: {
    '@type': 'ItemList',
    name: 'LED Lighting Product Categories',
    numberOfItems: 8,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'UFO High Bay LED Lights', url: 'https://www.auvolar.com/products/indoor/high-bay' },
      { '@type': 'ListItem', position: 2, name: 'LED Area & Shoebox Lights', url: 'https://www.auvolar.com/products/outdoor/area-light' },
      { '@type': 'ListItem', position: 3, name: 'LED Wall Pack Lights', url: 'https://www.auvolar.com/products/outdoor/wall-pack' },
      { '@type': 'ListItem', position: 4, name: 'LED Troffer & Panel Lights', url: 'https://www.auvolar.com/products/indoor/troffer' },
      { '@type': 'ListItem', position: 5, name: 'LED Flood Lights', url: 'https://www.auvolar.com/products/outdoor/flood-light' },
      { '@type': 'ListItem', position: 6, name: 'LED Vapor Tight Lights', url: 'https://www.auvolar.com/products/indoor/vapor-tight' },
      { '@type': 'ListItem', position: 7, name: 'LED Stadium Lights', url: 'https://www.auvolar.com/products/outdoor/stadium-light' },
      { '@type': 'ListItem', position: 8, name: 'Solar LED Lights', url: 'https://www.auvolar.com/products/solar' },
    ],
  },
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
    />
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
      </div>
    }>
      {children}
    </Suspense>
    </>
  )
}
