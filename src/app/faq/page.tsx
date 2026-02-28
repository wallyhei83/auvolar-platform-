import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'

export const metadata: Metadata = {
  title: 'LED Lighting FAQ | 50+ Common Questions Answered',
  description: 'Frequently asked questions about commercial LED lighting: DLC rebates, installation, warranties, pricing, energy savings, and more. Expert answers from Auvolar.',
  alternates: { canonical: 'https://www.auvolar.com/faq' },
  keywords: [
    'LED lighting FAQ', 'commercial LED questions', 'DLC rebate FAQ',
    'LED installation questions', 'LED warranty', 'LED vs fluorescent',
    'how to choose LED lights', 'LED energy savings',
  ],
}

const faqCategories = [
  {
    title: 'About Auvolar',
    faqs: [
      { q: 'What is Auvolar?', a: 'Auvolar is a B2B commercial and industrial LED lighting manufacturer and distributor based in City of Industry, California. We supply DLC-certified LED fixtures to contractors, electricians, facility managers, and distributors across the United States at wholesale pricing.' },
      { q: 'Where is Auvolar located?', a: 'Our headquarters and warehouse are at 17531 Railroad St Ste F, City of Industry, CA 91748. We ship nationwide from California with most in-stock items going out within 24 hours.' },
      { q: 'Who does Auvolar sell to?', a: 'We primarily serve contractors, electricians, facility managers, property managers, distributors, and businesses. We offer wholesale/contractor pricing with volume discounts for bulk orders.' },
      { q: 'Does Auvolar have a minimum order?', a: 'No minimum order required. Whether you need 1 fixture or 1,000, we offer the same competitive wholesale pricing. Volume discounts are available for larger orders.' },
    ],
  },
  {
    title: 'Products & Pricing',
    faqs: [
      { q: 'What types of LED lights does Auvolar sell?', a: 'We offer 125+ commercial LED products including: UFO & Linear High Bays, LED Troffers & Panels, Wall Packs, Area/Shoebox Lights, Flood Lights, LED Tubes (T8/T5), Strip Lights, Vapor Tight fixtures, Downlights, Canopy & Garage Lights, Stadium Lights (ISF/INS Series 400W-1800W), Solar Lights, and more.' },
      { q: 'What is the price range for Auvolar LED fixtures?', a: 'Prices range from $5 for LED tubes to $1,899 for high-powered stadium lights. Popular items: UFO High Bay 100W from $69, Wall Pack 50W from $55, Area Light 150W from $129, LED Troffer 2x4 from $49. All prices are wholesale/contractor pricing.' },
      { q: 'Are Auvolar products available on Amazon or Home Depot?', a: 'Auvolar sells direct to businesses through auvolar.com. This direct model allows us to offer wholesale pricing significantly below retail. Contact sales@auvolar.com for a quote.' },
      { q: 'Does Auvolar sell LED stadium lights?', a: 'Yes! Our ISF Series (400W-1800W) and INS Series (300W-1800W) are professional-grade LED stadium lights with IP66/IP67 rating, IK10 impact resistance, multiple beam angles (15°-90°), and prices from $399-$1,899.' },
    ],
  },
  {
    title: 'DLC Certification & Rebates',
    faqs: [
      { q: 'What is DLC certification?', a: 'DLC (DesignLights Consortium) is an independent organization that certifies commercial LED products for energy efficiency. DLC-listed products qualify for utility rebates. DLC Premium is the highest tier, requiring ≥135 lumens per watt.' },
      { q: 'Are Auvolar products DLC certified?', a: 'Many Auvolar products are DLC-listed, qualifying for utility rebates of $20-$150+ per fixture. Check individual product pages for DLC certification status, or contact us to verify eligibility.' },
      { q: 'How much can I save with utility rebates?', a: 'Utility rebates for DLC-listed LED fixtures range from $20 to $150+ per fixture depending on your utility company and fixture type. Combined with 50-70% energy savings, most LED upgrades pay for themselves in 2-8 months.' },
      { q: 'Does Auvolar help with rebate applications?', a: 'Yes! We provide DLC certificates, help fill out rebate paperwork, and connect you with local utility representatives — all at no charge. Use our Rebate Finder tool at auvolar.com/tools/rebate-finder.' },
    ],
  },
  {
    title: 'Installation & Technical',
    faqs: [
      { q: 'How do I choose the right LED fixture for my space?', a: 'Consider ceiling height (high bays for 15-45ft, troffers for 8-12ft), application type, required foot-candle levels, and mounting method. Auvolar offers free photometric lighting design — send us your floor plan and we\'ll create an optimized layout.' },
      { q: 'What color temperature should I choose?', a: '3000K (warm white) for hospitality and retail ambiance. 4000K (neutral white) for offices and schools. 5000K (daylight) for warehouses, manufacturing, and outdoor areas. 5000K is the most popular for commercial applications.' },
      { q: 'Can I replace my existing HID/fluorescent with LED?', a: 'Yes! LED retrofits save 50-70% energy. Use our Replacement Finder tool at auvolar.com/tools/replacement to find the right LED replacement. Common swaps: 400W metal halide → 150W LED high bay, 4ft T8 fluorescent → 18W LED tube.' },
      { q: 'What is IP rating and which do I need?', a: 'IP (Ingress Protection) rates dust and water resistance. IP20 for dry indoor, IP40 for damp, IP65 for wet areas and outdoor, IP66 for harsh environments, IP67 for submersible. Choose IP65+ for any outdoor or wet location.' },
      { q: 'What voltage do I need — 120V or 277V?', a: 'Residential and small commercial: 120V. Most commercial buildings: 277V (more efficient for long wire runs). Large industrial: 480V. Most Auvolar fixtures are multi-voltage (120-277V or 277-480V).' },
      { q: 'What is a photometric lighting design?', a: 'A professional layout using AGi32 or DIALux software that calculates exact light levels, uniformity ratios, and fixture placement for your space. It ensures proper illumination and code compliance. Auvolar offers this service free for any project.' },
    ],
  },
  {
    title: 'Shipping & Warranty',
    faqs: [
      { q: 'How fast does Auvolar ship?', a: 'Most in-stock items ship within 1-2 business days from our City of Industry, CA warehouse. Standard shipping takes 3-7 business days. Expedited options are available at checkout.' },
      { q: 'Does Auvolar ship nationwide?', a: 'Yes, we ship to all 50 US states. Shipping from California means West Coast orders arrive in 2-3 days, and East Coast orders in 5-7 days via ground.' },
      { q: 'What is Auvolar\'s warranty policy?', a: 'We provide a 5-year standard warranty on all commercial LED fixtures covering manufacturing defects, LED module failure, and driver failure. Our LED drivers are rated for 100,000+ hours of operation (22+ years at 12 hrs/day).' },
      { q: 'What is Auvolar\'s return policy?', a: '30-day return policy on unused products in original packaging. Contact our support team to initiate a return. See full policy at auvolar.com/support/returns.' },
    ],
  },
  {
    title: 'Energy Savings & ROI',
    faqs: [
      { q: 'How much energy do LEDs save compared to HID?', a: 'LEDs save 50-70% energy compared to metal halide, HPS, and fluorescent. A 150W LED high bay replaces a 400W metal halide while producing equal or better light quality, saving ~250W per fixture.' },
      { q: 'What is the payback period for LED upgrades?', a: 'Typical payback is 2-8 months when factoring in energy savings + utility rebates. A warehouse with 100 fixtures switching from 400W MH to 150W LED saves ~$15,000/year in energy costs alone.' },
      { q: 'Do LEDs qualify for Section 179 tax deduction?', a: 'Yes, commercial LED lighting qualifies for Section 179 tax deduction, allowing businesses to deduct the full purchase price in the year of installation rather than depreciating over time.' },
      { q: 'How long do commercial LEDs last?', a: 'Quality commercial LEDs have L70 ratings of 50,000-100,000+ hours, meaning they maintain 70%+ of initial brightness for 11-22 years at 12 hours/day. This is 5-10x longer than fluorescent and HID.' },
    ],
  },
]

const allFaqs = faqCategories.flatMap(cat => cat.faqs)

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  name: 'Auvolar LED Lighting FAQ',
  url: 'https://www.auvolar.com/faq',
  mainEntity: allFaqs.map(faq => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.auvolar.com' },
        { name: 'FAQ', url: 'https://www.auvolar.com/faq' },
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            {allFaqs.length} questions answered by Auvolar&apos;s LED lighting experts.
            Can&apos;t find what you&apos;re looking for? <Link href="/contact" className="text-yellow-400 hover:underline">Contact us</Link> or call (626) 342-8856.
          </p>
        </div>
      </section>

      {/* Category Navigation */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap gap-2">
            {faqCategories.map(cat => (
              <a
                key={cat.title}
                href={`#${cat.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-yellow-400 hover:text-black text-sm font-medium transition-colors"
              >
                {cat.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Sections */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {faqCategories.map(cat => (
            <div key={cat.title} id={cat.title.toLowerCase().replace(/\s+/g, '-')} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-yellow-400 pb-2">{cat.title}</h2>
              <div className="space-y-4">
                {cat.faqs.map(faq => (
                  <details key={faq.q} className="group border rounded-lg">
                    <summary className="flex items-center justify-between cursor-pointer p-4 font-medium text-gray-900">
                      {faq.q}
                      <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <div className="px-4 pb-4 text-gray-600 leading-relaxed">{faq.a}</div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
          <p className="text-gray-600 mb-6">Our lighting experts are ready to help with product selection, lighting design, and rebate applications.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/contact" className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors">
              Contact Us
            </Link>
            <a href="tel:+16263428856" className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
              Call (626) 342-8856
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
