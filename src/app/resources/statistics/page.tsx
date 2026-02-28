import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'

export const metadata: Metadata = {
  title: 'LED Lighting Industry Statistics 2026 | Market Data & Facts',
  description: 'LED lighting industry statistics, market size, energy savings data, and adoption rates. Sourced data for contractors, engineers, and facility managers.',
  alternates: { canonical: 'https://www.auvolar.com/resources/statistics' },
  keywords: [
    'LED lighting statistics', 'LED market size', 'LED adoption rate',
    'commercial LED statistics', 'LED energy savings data', 'lighting industry data',
    'LED vs HID statistics', 'DLC rebate statistics',
  ],
}

const stats = [
  {
    category: 'Market Size & Growth',
    items: [
      { stat: '$75.8 billion', desc: 'Global LED lighting market size in 2025 (Grand View Research)' },
      { stat: '12.4% CAGR', desc: 'Projected growth rate through 2030' },
      { stat: '61%', desc: 'LED share of global lighting market in 2025, up from 5% in 2012' },
      { stat: '$24.2 billion', desc: 'US LED lighting market size in 2025' },
      { stat: '80%+', desc: 'LED penetration in new commercial construction in the US' },
    ],
  },
  {
    category: 'Energy Savings',
    items: [
      { stat: '50-70%', desc: 'Energy reduction when switching from HID to LED' },
      { stat: '30-50%', desc: 'Energy reduction when switching from fluorescent to LED' },
      { stat: '569 TWh', desc: 'Annual US electricity saved by LEDs vs pre-LED baseline (DOE 2025)' },
      { stat: '$50 billion', desc: 'Annual energy cost savings from LED adoption in the US' },
      { stat: '2-8 months', desc: 'Typical payback period for commercial LED retrofits with utility rebates' },
    ],
  },
  {
    category: 'Product Lifespan & Maintenance',
    items: [
      { stat: '50,000-100,000 hrs', desc: 'LED fixture lifespan (L70 rating) — 11-22 years at 12 hrs/day' },
      { stat: '6,000-15,000 hrs', desc: 'Metal halide bulb lifespan — 2-4 years at 12 hrs/day' },
      { stat: '20,000-30,000 hrs', desc: 'Fluorescent tube lifespan' },
      { stat: '85-95%', desc: 'Reduction in lighting maintenance costs after LED conversion' },
      { stat: '$0', desc: 'Bulb replacement cost for LED fixtures (no consumable lamps)' },
    ],
  },
  {
    category: 'DLC Certification & Rebates',
    items: [
      { stat: '340,000+', desc: 'Products on the DLC Qualified Products List (QPL)' },
      { stat: '$20-$150+', desc: 'Typical utility rebate per DLC-listed LED fixture' },
      { stat: '135+ lm/W', desc: 'Minimum efficacy for DLC Premium certification' },
      { stat: '30-70%', desc: 'Typical project cost offset from utility rebates' },
      { stat: '300+', desc: 'US utility companies offering LED rebate programs' },
    ],
  },
  {
    category: 'Environmental Impact',
    items: [
      { stat: '0 mg', desc: 'Mercury content in LED fixtures (fluorescent contains 3-5mg per tube)' },
      { stat: '200 million tons', desc: 'Annual CO2 reduction from LED adoption in the US' },
      { stat: '100%', desc: 'LED fixtures are recyclable (no hazardous waste)' },
      { stat: '80%', desc: 'Less heat output than incandescent, reducing HVAC load' },
    ],
  },
  {
    category: 'Commercial Adoption',
    items: [
      { stat: '90%+', desc: 'New commercial buildings specify LED as primary lighting' },
      { stat: '55%', desc: 'Existing commercial buildings have completed or started LED retrofits' },
      { stat: '35-40%', desc: 'Remaining commercial buildings still using legacy lighting (opportunity)' },
      { stat: '#1', desc: 'LED is the #1 energy efficiency measure recommended by utility programs' },
      { stat: '3.2 million', desc: 'Commercial buildings in the US (DOE CBECS) — many still need LED upgrades' },
    ],
  },
  {
    category: 'Price Trends',
    items: [
      { stat: '90%+', desc: 'LED price decline since 2010' },
      { stat: '$69', desc: 'Entry price for a commercial 100W UFO high bay (was $300+ in 2015)' },
      { stat: '$6', desc: 'Price of a 4ft LED T8 tube (was $25+ in 2014)' },
      { stat: '< 2 years', desc: 'Average LED price vs HID crossover point (LED now cheaper to own)' },
    ],
  },
]

const statsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'LED Lighting Industry Statistics 2026',
  description: 'Comprehensive LED lighting market data, energy savings statistics, adoption rates, and industry facts sourced from DOE, DLC, and industry research.',
  url: 'https://www.auvolar.com/resources/statistics',
  datePublished: '2026-01-15',
  dateModified: new Date().toISOString().split('T')[0],
  author: { '@type': 'Organization', name: 'Auvolar Lighting Engineers' },
  publisher: { '@type': 'Organization', '@id': 'https://www.auvolar.com/#organization', name: 'Auvolar' },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.stat-value', '.stat-desc'] },
}

export default function StatisticsPage() {
  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.auvolar.com' },
        { name: 'Resources', url: 'https://www.auvolar.com/resources' },
        { name: 'LED Statistics', url: 'https://www.auvolar.com/resources/statistics' },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(statsJsonLd) }} />
      <Header />

      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">LED Lighting Industry Statistics (2026)</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Key data points and market statistics for the commercial LED lighting industry.
            Use these numbers in proposals, presentations, and project justifications.
          </p>
          <p className="text-sm text-gray-400 mt-4">Sources: US DOE, DesignLights Consortium, Grand View Research, IEA, EPA</p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
          {stats.map(cat => (
            <div key={cat.category}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-yellow-400 pb-2">{cat.category}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((item, i) => (
                  <div key={i} className="p-4 border rounded-lg hover:border-yellow-400 transition-colors">
                    <div className="stat-value text-2xl font-bold text-yellow-600">{item.stat}</div>
                    <p className="stat-desc text-sm text-gray-600 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-yellow-50 border-t py-12">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Join the LED Revolution?</h2>
          <p className="text-gray-600 mb-6">Auvolar offers 125+ DLC-certified LED fixtures at wholesale pricing. Free lighting design included.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/tools/roi-calculator" className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500">Calculate Your Savings</Link>
            <Link href="/contact" className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50">Get a Free Quote</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
