'use client'

import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { 
  Lightbulb, FileText, DollarSign, Calculator, Users, Zap,
  ArrowRight, CheckCircle
} from 'lucide-react'

const services = [
  {
    name: 'Lighting Design',
    slug: 'lighting-design',
    icon: Lightbulb,
    description: 'Professional photometric layouts and lighting design services for your project.',
    features: ['Custom photometric calculations', 'AGI32 lighting layouts', 'IES file analysis', 'Energy code compliance review'],
  },
  {
    name: 'Installation Guide',
    slug: 'installation-guide',
    icon: FileText,
    description: 'Step-by-step installation support and documentation for all our products.',
    features: ['Detailed installation manuals', 'Video tutorials', 'Technical phone support', 'On-site consultation available'],
  },
  {
    name: 'Rebate Assistance',
    slug: 'rebate-assistance',
    icon: DollarSign,
    description: 'We help you maximize utility rebates and incentives for your LED upgrade.',
    features: ['Rebate qualification check', 'Application assistance', 'Documentation preparation', 'Follow-up with utilities'],
  },
  {
    name: 'ROI Assistance',
    slug: 'roi-assistance',
    icon: Calculator,
    description: 'Detailed energy savings calculations and ROI analysis for your project.',
    features: ['Energy savings calculation', 'Payback period analysis', 'Maintenance cost comparison', 'Custom ROI reports'],
  },
  {
    name: 'Contractor Network',
    slug: 'contractor-network',
    icon: Users,
    description: 'Connect with certified electrical contractors in your area for installation.',
    features: ['Vetted contractor referrals', 'Nationwide coverage', 'Competitive quotes', 'Quality guarantee'],
  },
  {
    name: 'Lighting as a Service',
    slug: 'laas',
    icon: Zap,
    description: 'Zero upfront cost LED upgrade with monthly payments from energy savings.',
    features: ['$0 upfront cost', 'All-inclusive monthly fee', 'Maintenance included', 'Guaranteed savings'],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Beyond great products, we provide comprehensive support to ensure your lighting project is a success.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <div key={service.slug} className="border rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-brand" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href={`/services/${service.slug}`}
                    className="flex items-center gap-1 text-brand font-medium hover:underline"
                  >
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Need Help with Your Project?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our lighting specialists are ready to assist you with product selection, design, and project planning.
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                href="/contact" 
                className="px-8 py-3 bg-brand text-black font-medium rounded-lg hover:bg-yellow-400 transition-colors"
              >
                Contact Us
              </Link>
              <a 
                href="tel:+16263428856" 
                className="px-8 py-3 border border-gray-300 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Call (626) 342-8856
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
