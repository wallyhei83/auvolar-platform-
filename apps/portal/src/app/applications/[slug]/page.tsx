'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { 
  ChevronRight, Lightbulb, CheckCircle, ArrowRight, Download,
  Warehouse, Factory, ShoppingCart, Building2, Car, Fuel, 
  GraduationCap, Dumbbell, Snowflake, Heart
} from 'lucide-react'

// Application configuration
const applicationConfig: Record<string, {
  title: string
  subtitle: string
  description: string
  icon: any
  heroImage: string
  challenges: string[]
  solutions: string[]
  recommendedProducts: {
    name: string
    sku: string
    wattage: string
    description: string
    href: string
  }[]
  caseStudy?: {
    title: string
    savings: string
    payback: string
    description: string
  }
}> = {
  warehouse: {
    title: 'Warehouse Lighting',
    subtitle: 'High-performance LED solutions for distribution centers and warehouses',
    description: 'Reduce energy costs by up to 70% while improving visibility and safety in your warehouse operations.',
    icon: Warehouse,
    heroImage: '/images/applications/warehouse.jpg',
    challenges: [
      'High ceilings requiring powerful, efficient fixtures',
      'Long operating hours increasing energy costs',
      'Need for uniform light distribution across aisles',
      'Maintenance costs for hard-to-reach fixtures',
    ],
    solutions: [
      'UFO and Linear High Bay LEDs with 150+ lumens/watt efficiency',
      'Motion sensors for automatic dimming in low-traffic areas',
      '100,000+ hour rated life reducing maintenance frequency',
      'DLC Premium qualified for maximum utility rebates',
    ],
    recommendedProducts: [
      { name: 'UFO High Bay 150W', sku: 'HB-UFO-150W', wattage: '150W', description: 'Best for 20-25ft mounting height', href: '/products/HB-UFO-150W' },
      { name: 'UFO High Bay 200W', sku: 'HB-UFO-200W', wattage: '200W', description: 'Best for 25-30ft mounting height', href: '/products/HB-UFO-200W' },
      { name: 'Linear High Bay 220W', sku: 'LHB-220W', wattage: '220W', description: 'Best for aisle lighting', href: '/products/LHB-220W' },
      { name: 'Motion Sensor', sku: 'SENS-HB-MS', wattage: 'N/A', description: 'Occupancy sensing for high bays', href: '/products/SENS-HB-MS' },
    ],
    caseStudy: {
      title: 'ABC Distribution Center',
      savings: '$48,000/year',
      payback: '1.8 years',
      description: '200,000 sq ft warehouse reduced energy consumption by 65% after upgrading from metal halide to LED high bays.',
    },
  },
  manufacturing: {
    title: 'Manufacturing Lighting',
    subtitle: 'Industrial-grade LED lighting for production facilities',
    description: 'Improve worker safety and productivity with high-CRI, flicker-free lighting designed for manufacturing environments.',
    icon: Factory,
    heroImage: '/images/applications/manufacturing.jpg',
    challenges: [
      'High vibration environments affecting fixture life',
      'Need for high CRI for quality inspection tasks',
      'Heat from production equipment affecting lighting',
      'Multiple mounting heights across facility',
    ],
    solutions: [
      'Vibration-rated fixtures with reinforced housings',
      '80+ CRI options for accurate color rendering',
      'High ambient temperature rated drivers (up to 65°C)',
      'Flexible wattage options from 100W to 400W',
    ],
    recommendedProducts: [
      { name: 'UFO High Bay 200W', sku: 'HB-UFO-200W', wattage: '200W', description: 'General production areas', href: '/products/HB-UFO-200W' },
      { name: 'Linear High Bay 220W', sku: 'LHB-220W', wattage: '220W', description: 'Assembly lines', href: '/products/LHB-220W' },
      { name: 'Vapor Tight 4ft', sku: 'VT-4FT-40W', wattage: '40W', description: 'Harsh environments', href: '/products/VT-4FT-40W' },
    ],
  },
  retail: {
    title: 'Retail Lighting',
    subtitle: 'Enhance merchandise appeal and customer experience',
    description: 'Create inviting retail spaces with high-quality LED lighting that showcases products and reduces operating costs.',
    icon: ShoppingCart,
    heroImage: '/images/applications/retail.jpg',
    challenges: [
      'Need for excellent color rendering to showcase products',
      'Multiple fixture types for different areas',
      'Energy efficiency requirements for large retail spaces',
      'Dimming capability for ambiance control',
    ],
    solutions: [
      '90+ CRI options for true color representation',
      'Troffers, track lights, and accent lighting options',
      'DLC Premium fixtures for utility rebates',
      '0-10V dimming standard on all fixtures',
    ],
    recommendedProducts: [
      { name: '2x4 LED Troffer', sku: 'TR-2X4-50W', wattage: '50W', description: 'General retail areas', href: '/products/TR-2X4-50W' },
      { name: '2x2 LED Troffer', sku: 'TR-2X2-40W', wattage: '40W', description: 'Checkout areas', href: '/products/TR-2X2-40W' },
      { name: 'LED Flat Panel', sku: 'FP-2X4-40W', wattage: '40W', description: 'Modern retail aesthetic', href: '/products/FP-2X4-40W' },
    ],
  },
  office: {
    title: 'Office Lighting',
    subtitle: 'Productive, comfortable lighting for modern workspaces',
    description: 'Create a productive work environment with glare-free, energy-efficient LED lighting that supports employee wellbeing.',
    icon: Building2,
    heroImage: '/images/applications/office.jpg',
    challenges: [
      'Glare on computer screens reducing productivity',
      'Compliance with building energy codes',
      'Need for tunable white for circadian support',
      'Open plan offices with varied lighting needs',
    ],
    solutions: [
      'Low-glare UGR<19 fixtures for computer tasks',
      'Title 24 and ASHRAE 90.1 compliant options',
      'Tunable white 2700K-6500K available',
      'Multiple control options including DALI and 0-10V',
    ],
    recommendedProducts: [
      { name: '2x4 LED Troffer', sku: 'TR-2X4-40W', wattage: '40W', description: 'Open offices', href: '/products/TR-2X4-40W' },
      { name: 'LED Flat Panel', sku: 'FP-2X4-40W', wattage: '40W', description: 'Conference rooms', href: '/products/FP-2X4-40W' },
      { name: '6" Downlight', sku: 'DL-6IN-15W', wattage: '15W', description: 'Lobbies and corridors', href: '/products/DL-6IN-15W' },
    ],
  },
  parking: {
    title: 'Parking Lot Lighting',
    subtitle: 'Safe, efficient lighting for parking facilities',
    description: 'Enhance safety and reduce energy costs with LED parking lot lights featuring excellent uniformity and dark sky compliance.',
    icon: Car,
    heroImage: '/images/applications/parking.jpg',
    challenges: [
      'Large areas requiring uniform illumination',
      'Security concerns in poorly lit areas',
      'High energy costs from overnight operation',
      'Dark sky ordinance compliance',
    ],
    solutions: [
      'Type III and Type V distributions for optimal coverage',
      'High lumen output up to 40,000 lumens',
      'Photocell and timer controls for automatic operation',
      'BUG ratings meeting dark sky requirements',
    ],
    recommendedProducts: [
      { name: 'Area Light 150W', sku: 'AL-150W-T3', wattage: '150W', description: 'Small parking lots', href: '/products/AL-150W-T3' },
      { name: 'Area Light 300W', sku: 'AL-300W-T3', wattage: '300W', description: 'Large parking lots', href: '/products/AL-300W-T3' },
      { name: 'Shoe Box 200W', sku: 'SB-200W-T3', wattage: '200W', description: 'Pole mounted', href: '/products/SB-200W-T3' },
    ],
  },
  'gas-station': {
    title: 'Gas Station Lighting',
    subtitle: 'Bright, reliable canopy lighting for fuel stations',
    description: 'Attract customers with bright, uniform canopy lighting while meeting petroleum industry safety standards.',
    icon: Fuel,
    heroImage: '/images/applications/gas-station.jpg',
    challenges: [
      'Harsh outdoor environment with temperature extremes',
      'High brightness needed for customer safety',
      'Compliance with petroleum industry standards',
      'Uniform lighting across canopy without hot spots',
    ],
    solutions: [
      'IP65 rated for outdoor weather protection',
      'Up to 150 lumens/watt for bright, efficient lighting',
      'UL listed for wet locations',
      'Edge-lit design for uniform light distribution',
    ],
    recommendedProducts: [
      { name: 'Canopy Light 100W', sku: 'CL-100W-5K', wattage: '100W', description: 'Standard canopies', href: '/products/CL-100W-5K' },
      { name: 'Canopy Light 150W', sku: 'CL-150W-5K', wattage: '150W', description: 'Large canopies', href: '/products/CL-150W-5K' },
      { name: 'Wall Pack 50W', sku: 'WP-50W-5K', wattage: '50W', description: 'Building walls', href: '/products/WP-50W-5K' },
    ],
  },
  education: {
    title: 'Education Lighting',
    subtitle: 'Healthy, efficient lighting for schools and universities',
    description: 'Support student focus and wellbeing with flicker-free, tunable LED lighting designed for educational environments.',
    icon: GraduationCap,
    heroImage: '/images/applications/education.jpg',
    challenges: [
      'Budget constraints requiring cost-effective solutions',
      'Varied spaces from classrooms to gyms',
      'Need for flicker-free lighting to support learning',
      'Energy code compliance for new construction',
    ],
    solutions: [
      'Competitive pricing with utility rebates available',
      'Complete fixture lineup for all educational spaces',
      '<1% flicker meeting IEEE standards',
      'DLC and Title 24 compliant options',
    ],
    recommendedProducts: [
      { name: '2x4 LED Troffer', sku: 'TR-2X4-40W', wattage: '40W', description: 'Classrooms', href: '/products/TR-2X4-40W' },
      { name: 'UFO High Bay 150W', sku: 'HB-UFO-150W', wattage: '150W', description: 'Gymnasiums', href: '/products/HB-UFO-150W' },
      { name: 'Wrap Light 4ft', sku: 'WR-4FT-40W', wattage: '40W', description: 'Corridors', href: '/products/WR-4FT-40W' },
    ],
  },
  sports: {
    title: 'Sports Facility Lighting',
    subtitle: 'High-performance lighting for athletic facilities',
    description: 'Deliver broadcast-quality lighting for sports venues with high-output LED fixtures designed for athletic applications.',
    icon: Dumbbell,
    heroImage: '/images/applications/sports.jpg',
    challenges: [
      'Very high mounting heights (50ft+)',
      'Broadcast lighting requirements for events',
      'Glare control for players and spectators',
      'Instant-on capability (no warm-up time)',
    ],
    solutions: [
      'High-output fixtures up to 1000W / 150,000 lumens',
      'High CRI (80+) for accurate color on camera',
      'Precision optics with anti-glare shields',
      'Instant full brightness with LED technology',
    ],
    recommendedProducts: [
      { name: 'Sports Flood 500W', sku: 'SF-500W', wattage: '500W', description: 'Indoor courts', href: '/products/SF-500W' },
      { name: 'Sports Flood 1000W', sku: 'SF-1000W', wattage: '1000W', description: 'Outdoor fields', href: '/products/SF-1000W' },
      { name: 'UFO High Bay 240W', sku: 'HB-UFO-240W', wattage: '240W', description: 'Fitness centers', href: '/products/HB-UFO-240W' },
    ],
  },
  'cold-storage': {
    title: 'Cold Storage Lighting',
    subtitle: 'Extreme-temperature rated LED lighting',
    description: 'Purpose-built LED fixtures that perform reliably in freezers and cold storage facilities down to -40°F.',
    icon: Snowflake,
    heroImage: '/images/applications/cold-storage.jpg',
    challenges: [
      'Extreme cold affecting fixture performance',
      'Condensation and ice buildup on fixtures',
      'High ceilings with limited maintenance access',
      'Energy efficiency critical due to refrigeration costs',
    ],
    solutions: [
      'Rated for -40°F to +131°F ambient temperatures',
      'IP66 rated with sealed housing',
      '100,000+ hour life minimizing maintenance',
      '150+ lumens/watt maximizing efficiency',
    ],
    recommendedProducts: [
      { name: 'Cold Storage High Bay 150W', sku: 'CS-HB-150W', wattage: '150W', description: 'Freezer high bay', href: '/products/CS-HB-150W' },
      { name: 'Cold Storage Vapor Tight', sku: 'CS-VT-60W', wattage: '60W', description: 'Walk-in coolers', href: '/products/CS-VT-60W' },
    ],
  },
  healthcare: {
    title: 'Healthcare Lighting',
    subtitle: 'Healing-focused lighting for medical facilities',
    description: 'Support patient recovery and staff performance with human-centric LED lighting designed for healthcare environments.',
    icon: Heart,
    heroImage: '/images/applications/healthcare.jpg',
    challenges: [
      'Need for high CRI for accurate diagnosis',
      'Infection control requiring cleanable fixtures',
      'Patient comfort and circadian support',
      'Compliance with healthcare lighting standards',
    ],
    solutions: [
      '90+ CRI for accurate color rendering',
      'IP65 rated cleanable fixtures available',
      'Tunable white for circadian lighting',
      'IES RP-29 healthcare lighting compliance',
    ],
    recommendedProducts: [
      { name: '2x4 Clean Room Troffer', sku: 'CR-TR-2X4', wattage: '50W', description: 'Patient rooms', href: '/products/CR-TR-2X4' },
      { name: 'Tunable Panel', sku: 'TW-FP-2X4', wattage: '40W', description: 'Exam rooms', href: '/products/TW-FP-2X4' },
      { name: 'LED Downlight 6"', sku: 'DL-6IN-15W', wattage: '15W', description: 'Corridors', href: '/products/DL-6IN-15W' },
    ],
  },
}

export default function ApplicationPage() {
  const params = useParams()
  const slug = params.slug as string
  const config = applicationConfig[slug]

  if (!config) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Application Not Found</h1>
          <p className="text-gray-600 mb-8">The application "{slug}" does not exist.</p>
          <Link href="/applications" className="text-brand hover:underline">
            ← Back to Applications
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const Icon = config.icon

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href="/applications" className="text-gray-500 hover:text-gray-700">Applications</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">{config.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-brand/20 rounded-lg">
                <Icon className="w-10 h-10 text-brand" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{config.title}</h1>
                <p className="text-gray-400 mt-1">{config.subtitle}</p>
              </div>
            </div>
            <p className="text-xl text-gray-300 mt-6 max-w-3xl">{config.description}</p>
            <div className="flex gap-4 mt-8">
              <Link 
                href="/tools/roi-calculator" 
                className="px-6 py-3 bg-brand text-black font-medium rounded-lg hover:bg-yellow-400 transition-colors"
              >
                Calculate Your Savings
              </Link>
              <Link 
                href="/contact" 
                className="px-6 py-3 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Challenges & Solutions */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Challenges */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Common Challenges</h2>
              <ul className="space-y-4">
                {config.challenges.map((challenge, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-600 text-sm font-medium">{i + 1}</span>
                    </div>
                    <span className="text-gray-700">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Our Solutions</h2>
              <ul className="space-y-4">
                {config.solutions.map((solution, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Recommended Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {config.recommendedProducts.map((product) => (
                <Link
                  key={product.sku}
                  href={product.href}
                  className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow group"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <Lightbulb className="w-8 h-8 text-gray-400 group-hover:text-brand transition-colors" />
                  </div>
                  <h3 className="font-semibold group-hover:text-brand transition-colors">{product.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{product.sku} • {product.wattage}</p>
                  <p className="text-sm text-gray-600 mt-2">{product.description}</p>
                  <div className="flex items-center gap-1 mt-4 text-brand text-sm font-medium">
                    View Product <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Case Study */}
        {config.caseStudy && (
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white">
              <div className="flex items-center gap-2 text-brand mb-4">
                <span className="text-sm font-medium uppercase tracking-wider">Case Study</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">{config.caseStudy.title}</h3>
              <p className="text-gray-300 mb-6">{config.caseStudy.description}</p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-3xl font-bold text-brand">{config.caseStudy.savings}</p>
                  <p className="text-gray-400 text-sm">Annual Savings</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-brand">{config.caseStudy.payback}</p>
                  <p className="text-gray-400 text-sm">Payback Period</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-brand py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Upgrade Your {config.title.replace(' Lighting', '')} Lighting?</h2>
            <p className="text-gray-800 mb-6">Get a free lighting assessment and custom quote for your project.</p>
            <div className="flex justify-center gap-4">
              <Link 
                href="/contact" 
                className="px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                Request a Quote
              </Link>
              <Link 
                href="/tools/bom-upload" 
                className="px-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Upload Your BOM
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
