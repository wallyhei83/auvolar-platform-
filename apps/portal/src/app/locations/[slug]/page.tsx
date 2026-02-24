import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLocation, getAllLocationSlugs, getAllLocations } from '@/lib/locations-data'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export function generateStaticParams() {
  return getAllLocationSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const loc = getLocation(slug)
  if (!loc) return { title: 'Location Not Found | Auvolar' }

  return {
    title: loc.metaTitle,
    description: loc.metaDescription,
    keywords: loc.keywords,
    openGraph: {
      title: loc.metaTitle,
      description: loc.metaDescription,
      type: 'website',
      url: `https://www.auvolar.com/locations/${slug}`,
    },
    alternates: {
      canonical: `https://www.auvolar.com/locations/${slug}`,
    },
  }
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const loc = getLocation(slug)
  if (!loc) notFound()

  const allLocations = getAllLocations()
  const nearby = loc.nearbyLocations
    .map(s => allLocations.find(l => l.slug === s))
    .filter(Boolean)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* JSON-LD: LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: `Auvolar LED Lighting — ${loc.name}`,
            description: loc.metaDescription,
            url: `https://www.auvolar.com/locations/${slug}`,
            telephone: '+1-626-342-8856',
            email: 'sales@auvolar.com',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '17531 Railroad St Ste F',
              addressLocality: 'City of Industry',
              addressRegion: 'CA',
              postalCode: '91748',
              addressCountry: 'US',
            },
            areaServed: {
              '@type': loc.type === 'state' ? 'State' : 'City',
              name: loc.name,
            },
            priceRange: '$$',
          }),
        }}
      />

      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.auvolar.com' },
              { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://www.auvolar.com/locations' },
              { '@type': 'ListItem', position: 3, name: loc.name, item: `https://www.auvolar.com/locations/${slug}` },
            ],
          }),
        }}
      />

      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: `What LED lighting rebates are available in ${loc.name}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: loc.topUtilities.map(u => `${u.name}: ${u.rebateRange}`).join('. ') + '. All Auvolar fixtures are DLC Premium certified to qualify for maximum rebates.',
                },
              },
              {
                '@type': 'Question',
                name: `Does Auvolar ship LED lighting to ${loc.name}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `Yes. Auvolar ships to ${loc.name} from our warehouse in City of Industry, California. ${loc.type === 'state' && loc.slug === 'california' ? 'Same-day shipping and next-day local delivery available.' : 'Standard delivery is 3-5 business days, with expedited options available.'}`,
                },
              },
              {
                '@type': 'Question',
                name: `What is the average electricity cost in ${loc.name}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `Average commercial electricity rates in ${loc.name} are ${loc.electricityCost}. LED lighting typically reduces lighting energy costs by 50-70%, making it one of the highest-ROI upgrades available.`,
                },
              },
            ],
          }),
        }}
      />

      <main>
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm flex-wrap">
              <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              <span className="text-gray-300">›</span>
              <Link href="/locations" className="text-gray-500 hover:text-gray-700">Locations</Link>
              <span className="text-gray-300">›</span>
              <span className="text-gray-900 font-medium">{loc.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-yellow-400 text-sm font-medium uppercase tracking-wider mb-2">
              Commercial LED Lighting in
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {loc.name} LED Lighting Supplier
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              Auvolar provides DLC-certified commercial LED fixtures with wholesale pricing for {loc.name} businesses. 
              {loc.type === 'city' && loc.state ? ` Serving the greater ${loc.name}, ${loc.state} metropolitan area.` : ` Serving all of ${loc.name}.`}
            </p>
            <div className="flex gap-4 mt-8 flex-wrap">
              <Link href="/contact" className="px-6 py-3 bg-yellow-400 text-black font-medium rounded-lg hover:bg-yellow-500 transition-colors">
                Get a {loc.name} Quote
              </Link>
              <Link href="/products" className="px-6 py-3 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
                Browse Products
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content — natural language for AI agents */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Commercial LED Lighting for {loc.name}</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-8">{loc.seoContent}</p>

              <h3 className="text-xl font-bold mb-4">{loc.name} Climate & Lighting Considerations</h3>
              <p className="text-gray-700 leading-relaxed mb-8">{loc.climate}</p>

              <h3 className="text-xl font-bold mb-4">Why LED for {loc.name} Businesses?</h3>
              <p className="text-gray-700 leading-relaxed mb-8">{loc.lightingNeeds}</p>

              {/* Utility Rebates */}
              <h3 className="text-xl font-bold mb-4">LED Rebates Available in {loc.name}</h3>
              <p className="text-gray-600 mb-4">
                Average commercial electricity rate in {loc.name}: <strong>{loc.electricityCost}</strong>. 
                The following utilities offer rebates for DLC-certified LED fixtures:
              </p>
              <div className="bg-gray-50 rounded-xl border overflow-hidden mb-8">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Utility</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Rebate per Fixture</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {loc.topUtilities.map((util, i) => (
                      <tr key={i}>
                        <td className="px-6 py-3 font-medium">{util.name}</td>
                        <td className="px-6 py-3 text-green-700 font-medium">{util.rebateRange}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Popular products for this location */}
              <h3 className="text-xl font-bold mb-4">Popular Products for {loc.name}</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <Link href="/products/indoor/high-bay" className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-semibold">LED High Bay Lights</h4>
                  <p className="text-sm text-gray-600">For warehouses, factories, gyms — from $69</p>
                </Link>
                <Link href="/products/outdoor/wall-pack" className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-semibold">LED Wall Packs</h4>
                  <p className="text-sm text-gray-600">Building perimeter security — from $38</p>
                </Link>
                <Link href="/products/outdoor/area-light" className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-semibold">LED Area Lights</h4>
                  <p className="text-sm text-gray-600">Parking lots and roadways — from $106</p>
                </Link>
                <Link href="/products/indoor/troffer" className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-semibold">LED Troffers & Panels</h4>
                  <p className="text-sm text-gray-600">Offices, retail, schools — from $45</p>
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Contact CTA */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-lg mb-2">Need LED Lighting in {loc.name}?</h3>
                <p className="text-sm text-gray-600 mb-4">Get a free quote with rebate calculations for your {loc.name} project.</p>
                <Link href="/contact" className="block text-center py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors">
                  Request Quote
                </Link>
                <div className="mt-4 space-y-2 text-sm">
                  <a href="mailto:sales@auvolar.com" className="block text-yellow-700 hover:underline">📧 sales@auvolar.com</a>
                  <a href="tel:+16263428856" className="block text-yellow-700 hover:underline">📞 (626) 342-8856</a>
                </div>
              </div>

              {/* Why Auvolar */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="font-bold mb-4">Why Choose Auvolar?</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>DLC Premium certified — maximum rebates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Wholesale contractor pricing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Free photometric lighting design</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>5-year warranty on all fixtures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Ships from City of Industry, CA</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Rebate application assistance</span>
                  </li>
                </ul>
              </div>

              {/* Nearby locations */}
              {nearby.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold mb-4">Nearby Service Areas</h3>
                  <ul className="space-y-2">
                    {nearby.map(n => n && (
                      <li key={n.slug}>
                        <Link href={`/locations/${n.slug}`} className="text-yellow-700 hover:underline text-sm">
                          LED Lighting in {n.name} →
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-yellow-400 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Upgrade Lighting in {loc.name}?</h2>
            <p className="text-gray-800 mb-6">Free quote • Free lighting design • Rebate assistance</p>
            <Link href="/contact" className="px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
              Get Your {loc.name} Quote
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
