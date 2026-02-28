import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CaseStudyCard } from './case-study-card'
import {
  Car, ShoppingCart, Plane, Building2, Factory, Warehouse, ParkingCircle,
  Trophy, ArrowRight, Play, MapPin, Zap, CheckCircle2, ExternalLink
} from 'lucide-react'
import { getAllCaseStudies, type CaseStudyData } from '@/lib/case-studies-data'

export const metadata: Metadata = {
  title: 'Case Studies | Real-World LED Lighting Projects | Auvolar',
  description: 'See how our LED fixtures are lighting up CarMax, Home Depot, Ontario Airport, and major commercial facilities nationwide. Real projects, real results.',
}

// Category icon mapping
const categoryIcons: Record<string, any> = {
  'Parking Lot Lighting': ParkingCircle,
  'Auto Dealership Lighting': Car,
  'Retail & Commercial': ShoppingCart,
  'Sports & Stadium Lighting': Trophy,
  'Warehouse & Distribution': Warehouse,
  'Industrial': Factory,
  'Municipal': Building2,
}

export default async function CaseStudiesPage() {
  let caseStudies: CaseStudyData[] = []
  
  try {
    caseStudies = await getAllCaseStudies()
  } catch (error) {
    // DB might not be seeded yet — show empty state
    console.error('Failed to fetch case studies:', error)
  }

  // Group by category
  const categories = [...new Set(caseStudies.map(c => c.category))]

  // Collect all client names for "Trusted By" banner
  const allClients = [...new Set(caseStudies.flatMap(c => c.clients))].filter(c => c && c !== 'Various Retail Properties' && c !== 'Logistics Companies' && c !== 'Municipal Sports Facilities')

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'LED Lighting Case Studies',
          url: 'https://www.auvolar.com/case-studies',
          description: 'Real-world LED lighting projects: CarMax, Home Depot, Ontario Airport, Tesla dealerships, and more. See how Auvolar fixtures deliver energy savings and superior illumination.',
          mainEntity: {
            '@type': 'ItemList',
            name: 'Auvolar LED Lighting Case Studies',
            itemListElement: caseStudies.slice(0, 10).map((cs, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: cs.title,
              url: `https://www.auvolar.com/case-studies#${cs.slug || cs.title.toLowerCase().replace(/\s+/g, '-')}`,
            })),
          },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.auvolar.com' },
              { '@type': 'ListItem', position: 2, name: 'Case Studies', item: 'https://www.auvolar.com/case-studies' },
            ],
          },
        }) }}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black py-20">
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(circle at 40% 50%, #facc15 0%, transparent 50%)' }} />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Proven Results. <span className="text-yellow-400">Real Projects.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            From CarMax to Home Depot, from Ontario Airport to premium auto dealerships — see how our LED fixtures are transforming commercial lighting across the nation.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-gray-400">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-yellow-400" /> 500+ Projects Completed</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-yellow-400" /> All 50 States</span>
            <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-yellow-400" /> Avg 70% Energy Savings</span>
          </div>
        </div>
      </section>

      {/* Trusted By Banner */}
      {allClients.length > 0 && (
        <section className="border-b border-gray-200 bg-white py-8">
          <div className="mx-auto max-w-5xl px-4">
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-400">Trusted by industry leaders</p>
            <div className="flex flex-wrap items-center justify-center gap-8 text-lg font-bold text-gray-300">
              {allClients.slice(0, 8).map(client => (
                <span key={client}>{client}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Case Studies by Category */}
      {caseStudies.length === 0 ? (
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Case Studies Coming Soon</h2>
            <p className="text-gray-500">Our project showcases are being set up. Check back shortly.</p>
          </div>
        </section>
      ) : (
        categories.map(category => {
          const cases = caseStudies.filter(c => c.category === category)
          const Icon = categoryIcons[category] || Trophy
          return (
            <section key={category} className="py-16">
              <div className="mx-auto max-w-6xl px-4">
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                  {cases.map(cs => (
                    <CaseStudyCard
                      key={cs.id}
                      id={cs.slug}
                      category={cs.category}
                      title={cs.title}
                      subtitle={cs.subtitle || ''}
                      description={cs.description}
                      highlights={cs.highlights}
                      product={cs.product || ''}
                      productSlug={cs.productSlug || ''}
                      location={cs.location || ''}
                      images={cs.images}
                      youtubeId={cs.youtubeId || undefined}
                      stats={cs.stats}
                    />
                  ))}
                </div>
              </div>
            </section>
          )
        })
      )}

      {/* CTA */}
      <section className="bg-gradient-to-br from-gray-950 to-black py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Have a Project?</h2>
          <p className="mb-8 text-gray-400">
            Join CarMax, Home Depot, and hundreds of businesses that trust us for their commercial lighting. Let&apos;s discuss your project.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?subject=Project+Inquiry"
              className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-8 py-3 font-semibold text-black hover:bg-yellow-500"
            >
              Start Your Project
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-600 px-8 py-3 font-semibold text-white hover:bg-white/5"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
