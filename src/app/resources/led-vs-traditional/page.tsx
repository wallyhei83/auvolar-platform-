import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'LED vs Metal Halide vs Fluorescent vs HPS — Full Comparison',
  description: 'Comprehensive comparison of LED vs metal halide, fluorescent, and HPS lighting. Energy savings, lifespan, cost analysis, and ROI calculations for commercial applications.',
  alternates: { canonical: 'https://www.auvolar.com/resources/led-vs-traditional' },
  keywords: [
    'LED vs metal halide', 'LED vs fluorescent', 'LED vs HPS', 'LED vs HID comparison',
    'LED energy savings', 'LED replacement guide', 'commercial LED upgrade cost',
    'LED payback period', 'LED vs traditional lighting',
  ],
}

const comparisons = [
  {
    title: 'LED vs Metal Halide (MH)',
    slug: 'metal-halide',
    rows: [
      { spec: 'Energy Use', led: '50-70% less', trad: 'Baseline (high)', winner: 'led' },
      { spec: 'Lifespan', led: '50,000-100,000 hours', trad: '6,000-15,000 hours', winner: 'led' },
      { spec: 'Warm-up Time', led: 'Instant on', trad: '5-15 minutes', winner: 'led' },
      { spec: 'CRI', led: '80-90+', trad: '65-70', winner: 'led' },
      { spec: 'Maintenance', led: 'Minimal (no re-lamp)', trad: 'Frequent bulb + ballast changes', winner: 'led' },
      { spec: 'Dimming', led: '0-10V smooth dimming', trad: 'Not dimmable', winner: 'led' },
      { spec: 'Mercury Content', led: 'None', trad: 'Contains mercury', winner: 'led' },
      { spec: 'Upfront Cost', led: 'Higher ($69-$349)', trad: 'Lower ($40-$150)', winner: 'trad' },
      { spec: '5-Year Total Cost', led: '$150-$500', trad: '$500-$2,000+', winner: 'led' },
    ],
    replacement: [
      { from: '175W Metal Halide', to: '60W LED', saves: '115W (66%)', product: 'UFO High Bay 60W' },
      { from: '250W Metal Halide', to: '100W LED', saves: '150W (60%)', product: 'UFO High Bay 100W — $69' },
      { from: '400W Metal Halide', to: '150W LED', saves: '250W (63%)', product: 'UFO High Bay 150W — $89' },
      { from: '1000W Metal Halide', to: '300W LED', saves: '700W (70%)', product: 'Area Light 300W — $229' },
    ],
  },
  {
    title: 'LED vs Fluorescent (T8/T12)',
    slug: 'fluorescent',
    rows: [
      { spec: 'Energy Use', led: '30-50% less', trad: 'Baseline (moderate)', winner: 'led' },
      { spec: 'Lifespan', led: '50,000+ hours', trad: '20,000-30,000 hours', winner: 'led' },
      { spec: 'Warm-up Time', led: 'Instant', trad: '1-3 seconds (flicker)', winner: 'led' },
      { spec: 'CRI', led: '80-90+', trad: '70-85', winner: 'led' },
      { spec: 'Ballast Required', led: 'No (Type B direct wire)', trad: 'Yes (failure point)', winner: 'led' },
      { spec: 'Mercury', led: 'None', trad: 'Contains mercury', winner: 'led' },
      { spec: 'Disposal', led: 'Standard waste', trad: 'Hazardous waste recycling', winner: 'led' },
      { spec: 'Upfront Cost', led: '$5-$15/tube', trad: '$2-$5/tube', winner: 'trad' },
      { spec: '5-Year Total Cost', led: '$15-$25', trad: '$20-$50 (incl. ballast)', winner: 'led' },
    ],
    replacement: [
      { from: '4ft T8 32W Fluorescent', to: '4ft LED Tube 18W', saves: '14W (44%)', product: 'LED T8 Tube 18W — $6' },
      { from: '4ft T12 40W Fluorescent', to: '4ft LED Tube 18W', saves: '22W (55%)', product: 'LED T8 Tube 18W — $6' },
      { from: '8ft T8 59W Fluorescent', to: '8ft LED Tube 42W', saves: '17W (29%)', product: 'LED T8 Tube 8ft 42W — $15' },
      { from: '2x4 Troffer 4×32W (128W)', to: 'LED Troffer 50W', saves: '78W (61%)', product: 'LED Troffer 2x4 50W — $49' },
    ],
  },
  {
    title: 'LED vs High Pressure Sodium (HPS)',
    slug: 'hps',
    rows: [
      { spec: 'Energy Use', led: '50-65% less', trad: 'Baseline (high)', winner: 'led' },
      { spec: 'Lifespan', led: '50,000-100,000 hours', trad: '12,000-24,000 hours', winner: 'led' },
      { spec: 'Color Quality (CRI)', led: '70-90+', trad: '22-25 (orange/yellow)', winner: 'led' },
      { spec: 'Color Temperature', led: '3000K-5000K (white)', trad: '2100K (orange)', winner: 'led' },
      { spec: 'Warm-up Time', led: 'Instant', trad: '3-10 minutes', winner: 'led' },
      { spec: 'Restrike Time', led: 'Instant', trad: '5-15 minutes after power loss', winner: 'led' },
      { spec: 'Light Distribution', led: 'Precise optics (Type III/V)', trad: 'Omni-directional (wasted light)', winner: 'led' },
      { spec: 'Upfront Cost', led: 'Higher', trad: 'Lower', winner: 'trad' },
      { spec: '5-Year Total Cost', led: 'Significantly lower', trad: 'Higher (energy + maintenance)', winner: 'led' },
    ],
    replacement: [
      { from: '150W HPS Street Light', to: '75W LED Area Light', saves: '75W (50%)', product: 'OT Series 75W — $106' },
      { from: '250W HPS Parking Lot', to: '150W LED Area Light', saves: '100W (40%)', product: 'OT Series 150W — $149' },
      { from: '400W HPS Road Light', to: '200W LED Area Light', saves: '200W (50%)', product: 'OT Series 200W — $189' },
      { from: '1000W HPS Stadium', to: '400W LED Stadium Light', saves: '600W (60%)', product: 'ISF Series 400W — $499' },
    ],
  },
]

const allComparisons = comparisons.flatMap(c => c.rows)

const comparisonJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'LED vs Metal Halide vs Fluorescent vs HPS: Complete Commercial Lighting Comparison',
  description: 'Side-by-side comparison of LED lighting versus metal halide, fluorescent, and HPS for commercial applications. Includes energy savings, cost analysis, and replacement guides.',
  url: 'https://www.auvolar.com/resources/led-vs-traditional',
  datePublished: '2025-01-15',
  dateModified: new Date().toISOString().split('T')[0],
  author: { '@type': 'Organization', name: 'Auvolar Lighting Engineers', url: 'https://www.auvolar.com' },
  publisher: { '@type': 'Organization', '@id': 'https://www.auvolar.com/#organization', name: 'Auvolar' },
  about: [
    { '@type': 'Thing', name: 'LED Lighting' },
    { '@type': 'Thing', name: 'Metal Halide Lighting' },
    { '@type': 'Thing', name: 'Fluorescent Lighting' },
    { '@type': 'Thing', name: 'High Pressure Sodium Lighting' },
  ],
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', '.comparison-summary'],
  },
}

export default function LEDvsTraditionalPage() {
  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.auvolar.com' },
        { name: 'Resources', url: 'https://www.auvolar.com/resources' },
        { name: 'LED vs Traditional', url: 'https://www.auvolar.com/resources/led-vs-traditional' },
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonJsonLd) }}
      />
      <Header />

      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">LED vs Traditional Lighting: Complete Comparison</h1>
          <p className="text-xl text-gray-300 max-w-3xl comparison-summary">
            LED lighting saves 50-70% energy, lasts 5-10x longer, and pays for itself in 2-8 months compared to metal halide, fluorescent, and HPS fixtures. Here&apos;s the detailed breakdown.
          </p>
        </div>
      </section>

      <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex flex-wrap gap-2">
            {comparisons.map(c => (
              <a key={c.slug} href={`#${c.slug}`} className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-yellow-400 hover:text-black text-sm font-medium transition-colors">
                {c.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-16">
          {comparisons.map(comp => (
            <div key={comp.slug} id={comp.slug}>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-yellow-400 pb-2">{comp.title}</h2>
              
              {/* Comparison Table */}
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 text-sm font-semibold text-gray-600">Specification</th>
                      <th className="text-left p-3 text-sm font-semibold text-green-700">LED</th>
                      <th className="text-left p-3 text-sm font-semibold text-gray-500">Traditional</th>
                      <th className="text-center p-3 text-sm font-semibold text-gray-600">Winner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comp.rows.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-3 text-sm font-medium text-gray-900">{row.spec}</td>
                        <td className="p-3 text-sm text-gray-700">{row.led}</td>
                        <td className="p-3 text-sm text-gray-500">{row.trad}</td>
                        <td className="p-3 text-center">
                          {row.winner === 'led' ? (
                            <span className="inline-flex items-center text-green-600 text-xs font-semibold"><CheckCircle2 className="w-4 h-4 mr-1" />LED</span>
                          ) : (
                            <span className="inline-flex items-center text-gray-400 text-xs font-semibold">Trad.</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Replacement Guide */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Direct Replacement Guide</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {comp.replacement.map((r, i) => (
                  <div key={i} className="border rounded-lg p-4 hover:border-yellow-400 transition-colors">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <span className="line-through">{r.from}</span>
                      <ArrowRight className="w-4 h-4" />
                      <span className="font-semibold text-green-700">{r.to}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-green-600 font-medium">Saves {r.saves}</span>
                      <span className="text-gray-400 mx-2">•</span>
                      <span className="text-gray-700">{r.product}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* ROI Summary */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Bottom Line: LED Wins on Every Metric</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600">50-70%</div>
                <div className="text-sm text-gray-600 mt-1">Energy savings vs HID/HPS</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600">2-8 mo</div>
                <div className="text-sm text-gray-600 mt-1">Average payback period</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600">5-10x</div>
                <div className="text-sm text-gray-600 mt-1">Longer lifespan</div>
              </div>
            </div>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="/tools/roi-calculator" className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors">
                Calculate Your Savings
              </Link>
              <Link href="/tools/replacement" className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                Find LED Replacements
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
