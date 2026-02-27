import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CaseStudyCard } from './case-study-card'
import {
  Car, ShoppingCart, Plane, Building2, Factory, Warehouse, ParkingCircle,
  Trophy, ArrowRight, Play, MapPin, Zap, CheckCircle2, ExternalLink
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Case Studies | Real-World LED Lighting Projects | Auvolar',
  description: 'See how our LED fixtures are lighting up CarMax, Home Depot, Ontario Airport, and major commercial facilities nationwide. Real projects, real results.',
}

interface CaseStudy {
  id: string
  category: string
  categoryIcon: React.ElementType
  title: string
  subtitle: string
  description: string
  highlights: string[]
  product: string
  productSlug: string
  clients: string[]
  location: string
  images: string[]
  youtubeId?: string
  stats: { label: string; value: string }[]
}

const caseStudies: CaseStudy[] = [
  // ===== OT Series — Parking Lot Lights =====
  {
    id: 'carmax-nationwide',
    category: 'Parking Lot Lighting',
    categoryIcon: ParkingCircle,
    title: 'CarMax — Nationwide Parking Lot Retrofit',
    subtitle: 'All U.S. CarMax locations powered by our OT Series',
    description: 'CarMax, the nation\'s largest retailer of used cars with 240+ locations, selected our OT Series LED Parking Lot Lights for a complete nationwide retrofit. Originally installed in 2017–2018, these fixtures have been operating flawlessly for over 7 years with near-zero failure rates — a testament to the exceptional build quality and long-term reliability of our OT Series. The project replaced aging HID fixtures across all locations, delivering dramatically improved light uniformity, reduced energy costs, and enhanced nighttime security for customers and inventory.',
    highlights: [
      'All 240+ CarMax locations nationwide',
      'Installed in 2017–2018 — still performing flawlessly after 7+ years',
      'Near-zero failure rate across all locations',
      'Replaced 1000W Metal Halide with 300W OT Series',
      '70% energy reduction per fixture',
      'Improved light uniformity from 3:1 to 2:1 max/min ratio',
      'Enhanced security camera visibility at night',
    ],
    product: 'OT Series LED Parking Lot Light',
    productSlug: 'aera-lighting-shoebox-ot-series-led-parking-lot-light-75w-420w',
    clients: ['CarMax'],
    location: 'Nationwide, USA',
    images: [
      '/images/case-studies/carmax/carmax-2-lot-overview.jpg',
      '/images/case-studies/carmax/carmax-3-lot-wide.jpg',
      '/images/case-studies/carmax/carmax-5-lot-building.jpg',
      '/images/case-studies/carmax/carmax-1-pole-closeup.jpg',
      '/images/case-studies/carmax/carmax-6-fixture-closeup.jpg',
      '/images/case-studies/carmax/carmax-4-pole-detail.jpg',
    ],
    stats: [
      { label: 'Locations', value: '240+' },
      { label: 'In Service', value: '7+ Years' },
      { label: 'Energy Savings', value: '70%' },
      { label: 'Failure Rate', value: '~0%' },
    ],
  },
  {
    id: 'homedepot-parking',
    category: 'Parking Lot Lighting',
    categoryIcon: ParkingCircle,
    title: 'The Home Depot — Parking Lot LED Upgrade',
    subtitle: 'Major Home Depot locations upgraded to our OT Series',
    description: 'The Home Depot partnered with us to upgrade parking lot lighting at locations across the United States. The OT Series fixtures provide superior illumination for the massive parking areas typical of Home Depot stores, enhancing customer safety during evening hours and early morning contractor visits.',
    highlights: [
      'Multiple Home Depot locations across the U.S.',
      'Type III and Type V distributions for full-coverage layouts',
      'DLC Premium qualified for maximum utility rebates',
      'Dusk-to-dawn photocell integration',
      'Withstands extreme weather conditions',
      'Reduced light pollution with precise beam control',
    ],
    product: 'OT Series LED Parking Lot Light',
    productSlug: 'aera-lighting-shoebox-ot-series-led-parking-lot-light-75w-420w',
    clients: ['The Home Depot'],
    location: 'Multiple U.S. Locations',
    images: [],
    stats: [
      { label: 'Stores', value: '50+' },
      { label: 'Energy Savings', value: '65%' },
      { label: 'Rebate', value: '$50K+' },
      { label: 'ROI', value: '18 mo' },
    ],
  },
  {
    id: 'ontario-airport',
    category: 'Parking Lot Lighting',
    categoryIcon: Plane,
    title: 'Ontario International Airport (ONT)',
    subtitle: 'Airport parking facility lit by our OT Series',
    description: 'Ontario International Airport in Southern California — one of the fastest-growing airports in the U.S. — chose our OT Series for its parking facility lighting upgrade. The project demanded fixtures capable of 24/7 operation, exceptional color rendering for security camera integration, and compliance with FAA lighting standards near active runways.',
    highlights: [
      'Ontario International Airport (ONT), California',
      '24/7 continuous operation, 5000K daylight CCT',
      'FAA-compliant installation near active runways',
      'High CRI (80+) for security camera optimization',
      'Surge protection (10KV/20KV) for lightning-prone areas',
      'Remote monitoring capability',
    ],
    product: 'OT Series LED Parking Lot Light',
    productSlug: 'aera-lighting-shoebox-ot-series-led-parking-lot-light-75w-420w',
    clients: ['Ontario International Airport'],
    location: 'Ontario, California',
    images: [],
    stats: [
      { label: 'Area', value: '500K+ sqft' },
      { label: 'Fixtures', value: '200+' },
      { label: 'Uptime', value: '24/7' },
      { label: 'CRI', value: '80+' },
    ],
  },
  {
    id: 'auto-dealerships',
    category: 'Auto Dealership Lighting',
    categoryIcon: Car,
    title: 'Premium Auto Dealerships',
    subtitle: 'Major auto dealerships trust us for showroom-quality lot lighting',
    description: 'Leading automotive dealerships across the U.S. rely on our OT Series for their outdoor lot lighting. Auto dealers require exceptional color rendering to showcase vehicle finishes, uniform illumination to eliminate dark spots, and energy efficiency to manage large outdoor lighting footprints. Our fixtures deliver all three.',
    highlights: [
      'Castle CDJR, Naperville Chevrolet, Mercedes-Benz of Naperville, and more',
      'High CRI for true vehicle color representation',
      '0-10V dimming for after-hours energy savings',
      'Type V distribution for uniform lot coverage',
      'Bronze housing option to match dealership architecture',
      'Net 30 payment terms for dealer groups',
    ],
    product: 'OT Series LED Parking Lot Light',
    productSlug: 'aera-lighting-shoebox-ot-series-led-parking-lot-light-75w-420w',
    clients: ['Castle CDJR', 'Naperville Chevrolet', 'Mercedes-Benz of Naperville', 'BMW Dealerships', 'Toyota Dealerships'],
    location: 'Nationwide, USA',
    images: [
      '/images/case-studies/auto-dealerships/dealership-1-castle-cdjr.jpg',
      '/images/case-studies/auto-dealerships/dealership-2-chevrolet-naperville.jpg',
    ],
    stats: [
      { label: 'Dealerships', value: '100+' },
      { label: 'Avg Savings', value: '$15K/yr' },
      { label: 'CRI', value: '80+' },
      { label: 'CCT Options', value: '3' },
    ],
  },
  // ===== PLB Series — Area / Shoebox Lights =====
  {
    id: 'retail-plazas',
    category: 'Retail & Commercial',
    categoryIcon: ShoppingCart,
    title: 'Retail Shopping Plazas',
    subtitle: 'PLB Series lighting up retail centers across California',
    description: 'Multiple retail shopping plazas in Southern California upgraded their parking and walkway lighting to our PLB Series. The compact form factor, multiple mounting options, and DLC qualification made the PLB an ideal replacement for aging 250W-400W HID fixtures in retail environments.',
    highlights: [
      'Shopping plazas and strip malls across SoCal',
      'Compact PLB replaces bulky legacy fixtures',
      'Multiple bracket options for diverse mounting needs',
      'Title 24 compliant for California projects',
      'Utility rebates offset 30-50% of project cost',
      'Improved walkway safety ratings',
    ],
    product: 'PLB Series Area Light',
    productSlug: 'area-shoebox-light-plb-series-led-parking-lot-75w-300w',
    clients: ['Various Retail Properties'],
    location: 'Southern California',
    images: [],
    stats: [
      { label: 'Properties', value: '30+' },
      { label: 'Energy Savings', value: '60%' },
      { label: 'Rebate', value: '$0.15/W' },
      { label: 'Warranty', value: '7 Years' },
    ],
  },
  // ===== ISF Series — Stadium Lights =====
  {
    id: 'sports-complexes',
    category: 'Sports & Stadium Lighting',
    categoryIcon: Trophy,
    title: 'Municipal Sports Complexes',
    subtitle: 'ISF Series delivering professional-grade sports field illumination',
    description: 'Municipal sports complexes and private athletic facilities are upgrading to our ISF Series LED Stadium Lights. These high-output fixtures (400W-1800W) deliver the foot-candle levels and uniformity required for competitive sports, with dramatically reduced energy costs compared to legacy metal halide systems.',
    highlights: [
      'Football, soccer, baseball, and multi-use fields',
      'Meets IES RP-6 illumination standards',
      '5 beam angle options for precise aiming',
      'Instant on/off — no restrike delay',
      'Flicker-free for HD broadcast compatibility',
      '80% energy reduction vs 1500W metal halide',
    ],
    product: 'ISF Series LED Stadium Light',
    productSlug: 'isf-series-led-stadium-light',
    clients: ['Municipal Sports Facilities'],
    location: 'Multiple States',
    images: [],
    stats: [
      { label: 'Fields', value: '25+' },
      { label: 'Max Output', value: '270K lm' },
      { label: 'Energy Savings', value: '80%' },
      { label: 'Lifespan', value: '100K hrs' },
    ],
  },
  // ===== Commercial / Industrial =====
  {
    id: 'warehouse-distribution',
    category: 'Warehouse & Distribution',
    categoryIcon: Warehouse,
    title: 'Distribution Centers & Warehouses',
    subtitle: 'High bay LED solutions for logistics and fulfillment operations',
    description: 'Major distribution centers and e-commerce fulfillment warehouses across the U.S. use our high bay fixtures to illuminate massive floor areas. High ceilings (30-45ft), 24/7 operations, and demanding safety requirements make these some of the most challenging lighting environments — and we deliver.',
    highlights: [
      'Ceiling heights from 20ft to 45ft',
      '24/7 operation with occupancy sensor integration',
      'Meets OSHA illumination requirements',
      'Compatible with warehouse management systems',
      'IP65 rated for cold storage applications',
      'Daisy-chain wiring for efficient installation',
    ],
    product: 'High Bay LED Lights',
    productSlug: '',
    clients: ['Logistics Companies'],
    location: 'Nationwide, USA',
    images: [],
    stats: [
      { label: 'Facilities', value: '40+' },
      { label: 'Avg Height', value: '35 ft' },
      { label: 'Energy Savings', value: '75%' },
      { label: 'Payback', value: '<1.5 yr' },
    ],
  },
]

// Group by category
const categories = [...new Set(caseStudies.map(c => c.category))]

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
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
      <section className="border-b border-gray-200 bg-white py-8">
        <div className="mx-auto max-w-5xl px-4">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-400">Trusted by industry leaders</p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-lg font-bold text-gray-300">
            <span>CarMax</span>
            <span>The Home Depot</span>
            <span>Ontario Int&apos;l Airport</span>
            <span>BMW Dealerships</span>
            <span>Mercedes-Benz</span>
            <span>Toyota</span>
          </div>
        </div>
      </section>

      {/* Case Studies by Category */}
      {categories.map(category => {
        const cases = caseStudies.filter(c => c.category === category)
        const Icon = cases[0].categoryIcon
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
                {cases.map(({ categoryIcon, ...cs }) => (
                  <CaseStudyCard key={cs.id} {...cs} />
                ))}
              </div>
            </div>
          </section>
        )
      })}

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
