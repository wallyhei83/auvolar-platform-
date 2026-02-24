import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllLocations } from '@/lib/locations-data'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'LED Lighting Service Areas | Nationwide Commercial LED Supplier | Auvolar',
  description: 'Auvolar ships commercial LED lighting nationwide from City of Industry, CA. Find local utility rebates and service information for your state or city.',
  keywords: ['LED lighting near me', 'commercial LED supplier', 'LED lighting service areas', 'nationwide LED supplier', 'LED lighting by state'],
  alternates: {
    canonical: 'https://www.auvolar.com/locations',
  },
}

export default function LocationsIndexPage() {
  const allLocations = getAllLocations()
  const states = allLocations.filter(l => l.type === 'state')
  const cities = allLocations.filter(l => l.type === 'city')

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Auvolar',
            url: 'https://www.auvolar.com',
            areaServed: states.map(s => ({
              '@type': 'State',
              name: s.name,
            })),
          }),
        }}
      />

      <main className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">LED Lighting Service Areas</h1>
        <p className="text-gray-600 text-lg mb-12 max-w-3xl">
          Auvolar ships commercial LED lighting nationwide from our warehouse in City of Industry, California. 
          Browse your state or city below for local utility rebate information, climate-specific fixture recommendations, and shipping details.
        </p>

        <h2 className="text-2xl font-bold mb-6">States We Serve</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {states.map(s => (
            <Link
              key={s.slug}
              href={`/locations/${s.slug}`}
              className="p-4 border rounded-lg hover:shadow-md hover:border-yellow-400 transition-all group"
            >
              <h3 className="font-semibold group-hover:text-yellow-600 transition-colors">{s.name}</h3>
              <p className="text-sm text-gray-500 mt-1">Avg: {s.electricityCost}</p>
              <p className="text-xs text-gray-400 mt-1">{s.topUtilities.length} rebate program{s.topUtilities.length > 1 ? 's' : ''}</p>
            </Link>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6">Major Cities</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {cities.map(c => (
            <Link
              key={c.slug}
              href={`/locations/${c.slug}`}
              className="p-4 border rounded-lg hover:shadow-md hover:border-yellow-400 transition-all group"
            >
              <h3 className="font-semibold group-hover:text-yellow-600 transition-colors">{c.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{c.state}</p>
              <p className="text-xs text-gray-400 mt-1">Avg: {c.electricityCost}</p>
            </Link>
          ))}
        </div>

        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Don&apos;t See Your Location?</h2>
          <p className="text-gray-600 mb-4">We ship nationwide! Contact us for rebate information and shipping details for your area.</p>
          <Link href="/contact" className="inline-block px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors">
            Contact Us
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
