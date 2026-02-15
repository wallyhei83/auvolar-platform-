'use client'

import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { 
  ChevronRight, Building2, Warehouse, Factory, ShoppingCart, 
  MapPin, DollarSign, Lightbulb, ArrowRight
} from 'lucide-react'

// Case studies / project showcase
const caseStudies = [
  {
    id: '1',
    title: 'ABC Distribution Center',
    location: 'Houston, TX',
    category: 'Warehouse',
    icon: Warehouse,
    image: '/images/projects/warehouse.jpg',
    savings: '$48,000/year',
    payback: '1.8 years',
    sqft: '200,000',
    description: 'Replaced 400W metal halide high bays with 150W LED UFO high bays, achieving 65% energy reduction.',
    products: ['UFO High Bay 150W', 'Occupancy Sensors'],
  },
  {
    id: '2',
    title: 'Metro Office Tower',
    location: 'Dallas, TX',
    category: 'Office',
    icon: Building2,
    image: '/images/projects/office.jpg',
    savings: '$32,000/year',
    payback: '2.1 years',
    sqft: '150,000',
    description: 'Complete troffer and panel retrofit across 12 floors, with daylight harvesting controls.',
    products: ['2x4 LED Troffer', '2x2 LED Troffer', 'Daylight Sensors'],
  },
  {
    id: '3',
    title: 'Sunrise Manufacturing',
    location: 'Phoenix, AZ',
    category: 'Manufacturing',
    icon: Factory,
    image: '/images/projects/manufacturing.jpg',
    savings: '$72,000/year',
    payback: '1.5 years',
    sqft: '350,000',
    description: 'High-bay LED retrofit with high-CRI fixtures for quality inspection areas.',
    products: ['Linear High Bay 220W', 'UFO High Bay 200W', 'Task Lighting'],
  },
  {
    id: '4',
    title: 'Valley Fresh Grocery',
    location: 'Los Angeles, CA',
    category: 'Retail',
    icon: ShoppingCart,
    image: '/images/projects/retail.jpg',
    savings: '$18,500/year',
    payback: '2.3 years',
    sqft: '45,000',
    description: 'Full store relight with high-CRI troffers and accent lighting for product displays.',
    products: ['LED Troffer 90CRI', 'Track Lighting', 'Refrigerated Case LEDs'],
  },
]

export default function ProjectsPage() {
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
              <span className="text-gray-900 font-medium">Project Case Studies</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Project Case Studies</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              See how businesses are saving energy and money with Auvolar LED lighting solutions.
            </p>
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study) => {
              const Icon = study.icon
              return (
                <div key={study.id} className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gray-100 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="w-16 h-16 text-gray-300" />
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-brand text-black text-sm font-medium rounded-full">
                        {study.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                    <p className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                      <MapPin className="w-4 h-4" />
                      {study.location} • {study.sqft} sq ft
                    </p>
                    <p className="text-gray-600 mb-4">{study.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-green-50 rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-green-600">{study.savings}</p>
                        <p className="text-sm text-gray-600">Annual Savings</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-blue-600">{study.payback}</p>
                        <p className="text-sm text-gray-600">Payback Period</p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-sm text-gray-500 mb-2">Products Used:</p>
                      <div className="flex flex-wrap gap-2">
                        {study.products.map((product) => (
                          <span key={product} className="px-2 py-1 bg-gray-100 rounded text-sm">
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-brand py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-gray-800 mb-6">Get a free lighting assessment and see how much you could save.</p>
            <div className="flex justify-center gap-4">
              <Link 
                href="/tools/roi-calculator" 
                className="px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                Calculate Your Savings
              </Link>
              <Link 
                href="/contact" 
                className="px-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
