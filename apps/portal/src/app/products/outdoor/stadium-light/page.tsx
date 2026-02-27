import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ChevronRight, Zap, Shield, Sun, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'LED Stadium Lights | High-Output Sports Lighting | Auvolar',
  description: 'Professional LED stadium lights for sports fields, arenas, and large venues. ISF Series & INS Series. 200W-1800W, 140+ lm/W, DLC certified. Ships from California.',
  keywords: ['LED stadium lights', 'sports field lighting', 'arena lights', 'stadium LED', 'high mast lights', 'sports lighting LED', 'football field lights', 'baseball field lights', 'soccer field lights'],
  alternates: { canonical: 'https://www.auvolar.com/products/outdoor/stadium-light' },
}

const series = [
  {
    name: 'ISF Series',
    slug: 'isf-series-led-stadium-light',
    tagline: 'Professional Grade Stadium Flood',
    wattageRange: '400W - 1800W',
    lumensRange: '56,000 - 252,000 lm',
    priceRange: '$499 - $1,899',
    features: ['Anti-glare optics', 'Tool-free aiming', '15° to 85° beam angles', 'IP66 rated', '110 IES files available'],
    image: '/images/products/isf-series-stadium-light.jpg',
    badge: 'Best Seller',
  },
  {
    name: 'INS Series',
    slug: 'ins-series-led-stadium-light',
    tagline: 'Industrial Grade High Output',
    wattageRange: '300W - 1800W',
    lumensRange: '42,000 - 270,000 lm',
    priceRange: '$399 - $1,899',
    features: ['Asymmetric optics', 'Built-in surge protection', '15° to 90° beam angles', 'IP67 rated', 'Heavy-duty housing'],
    image: '/images/products/ins-series-stadium-light.jpg',
    badge: 'New',
  },
]

export default function StadiumLightPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-brand">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/products" className="hover:text-brand">Products</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/products/outdoor" className="hover:text-brand">Outdoor</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">Stadium Lights</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand/20 px-4 py-1 text-sm font-medium text-brand">
              <Zap className="h-4 w-4" />
              Professional Sports & Venue Lighting
            </div>
            <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
              LED Stadium Lights
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              High-output LED stadium and sports field lighting. From community fields to professional arenas.
              200W to 1800W, 140+ lm/W efficiency, DLC certified for utility rebates.
            </p>
          </div>
        </div>
      </section>

      {/* Product Series */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {series.map((s) => (
              <Link
                key={s.slug}
                href={`/p/${s.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg hover:border-brand"
              >
                {s.badge && (
                  <div className="absolute top-4 right-4 z-10 rounded-full bg-brand px-3 py-1 text-xs font-bold text-black">
                    {s.badge}
                  </div>
                )}
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-8">
                  <div className="text-center">
                    <Sun className="mx-auto h-24 w-24 text-gray-300" />
                    <p className="mt-2 text-sm text-gray-400">{s.name}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 group-hover:text-brand">{s.name}</h2>
                  <p className="mt-1 text-gray-500">{s.tagline}</p>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">Wattage:</span>
                      <p className="font-semibold text-gray-900">{s.wattageRange}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Lumens:</span>
                      <p className="font-semibold text-gray-900">{s.lumensRange}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Price:</span>
                      <p className="font-semibold text-brand">{s.priceRange}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Efficiency:</span>
                      <p className="font-semibold text-gray-900">140+ lm/W</p>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-1">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                        <Shield className="h-3.5 w-3.5 text-brand" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center gap-2 text-brand font-semibold">
                    View Details <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">Stadium Light Applications</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Football Fields', desc: 'High school, college, and recreational football field lighting' },
              { name: 'Baseball/Softball', desc: 'Diamond lighting with precise beam control to minimize glare' },
              { name: 'Soccer Fields', desc: 'Uniform coverage for full-size and training pitches' },
              { name: 'Tennis Courts', desc: 'Anti-glare optics for player comfort and visibility' },
              { name: 'Parking Lots', desc: 'High-mast area lighting for large commercial lots' },
              { name: 'Arenas & Stadiums', desc: 'Professional-grade lighting for spectator venues' },
              { name: 'Industrial Yards', desc: 'Port terminals, rail yards, and storage facilities' },
              { name: 'Airport Aprons', desc: 'High-output lighting for aircraft service areas' },
            ].map((app) => (
              <div key={app.name} className="rounded-lg border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900">{app.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
