import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Shield, CheckCircle, XCircle, Clock, Award, FileText } from 'lucide-react'

const warrantyTerms = [
  {
    category: 'Commercial Indoor',
    products: ['High Bay Lights', 'Troffers & Panels', 'LED Tubes', 'Strip Lights', 'Downlights'],
    years: 5,
    color: 'bg-blue-500',
  },
  {
    category: 'Commercial Outdoor',
    products: ['Area Lights', 'Flood Lights', 'Wall Packs', 'Canopy Lights', 'Bollards'],
    years: 5,
    color: 'bg-green-500',
  },
  {
    category: 'Industrial',
    products: ['Vapor Tight', 'Explosion Proof', 'High Temperature', 'Hazardous Location'],
    years: 3,
    color: 'bg-orange-500',
  },
  {
    category: 'Solar Products',
    products: ['Solar Street Lights', 'Solar Flood Lights', 'Solar Wall Packs'],
    years: 2,
    color: 'bg-purple-500',
  },
]

const covered = [
  'LED chip or driver failure',
  'Lumen depreciation greater than 30%',
  'Manufacturing defects in materials',
  'Color shift exceeding 7 SDCM',
  'Housing or lens defects',
  'Electrical component failure under normal use',
]

const notCovered = [
  'Improper installation or wiring',
  'Power surge or electrical damage',
  'Physical damage, abuse, or misuse',
  'Unauthorized modifications or repairs',
  'Use in incompatible environments',
  'Normal wear and tear',
  'Acts of nature (lightning, floods, etc.)',
]

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Warranty Information</h1>
          <p className="mx-auto mt-4 max-w-xl text-green-100">
            All Auvolar products are backed by our comprehensive manufacturer warranty.
          </p>
        </div>
      </section>

      {/* Warranty Terms */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Warranty Periods by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {warrantyTerms.map((term) => (
              <div key={term.category} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className={`${term.color} py-4 px-6`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white">{term.category}</h3>
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {term.years} YR
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-2">
                    {term.products.map((product) => (
                      <li key={product} className="flex items-center gap-2 text-gray-600 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {product}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What&apos;s Covered?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-green-800 mb-6 flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                Covered Under Warranty
              </h3>
              <ul className="space-y-3">
                {covered.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-green-700">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-red-800 mb-6 flex items-center gap-2">
                <XCircle className="w-6 h-6" />
                Not Covered
              </h3>
              <ul className="space-y-3">
                {notCovered.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-red-700">
                    <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Claim Process */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How to File a Warranty Claim</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                { step: 1, title: 'Gather Documentation', desc: 'Have your proof of purchase (invoice, order confirmation) and product SKU ready.' },
                { step: 2, title: 'Document the Defect', desc: 'Take clear photos or videos showing the issue. Include the product label with SKU visible.' },
                { step: 3, title: 'Submit RMA Request', desc: 'Fill out our RMA form online or contact our support team via phone or email.' },
                { step: 4, title: 'Receive RMA Number', desc: 'Our team will review your claim and issue an RMA number within 2 business days.' },
                { step: 5, title: 'Ship the Product', desc: 'Pack the product securely and ship to our facility. Prepaid label provided for approved claims.' },
                { step: 6, title: 'Replacement Shipped', desc: 'Once received and inspected, replacement ships within 5-7 business days.' },
              ].map((item) => (
                <div key={item.step} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                  <div className="flex-1 bg-white rounded-xl p-6 shadow-sm border">
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to File a Claim?</h2>
          <p className="text-green-100 mb-8">Our support team is here to help you every step of the way.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/support/rma" className="px-8 py-4 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100">
              Start RMA Request
            </Link>
            <Link href="/support" className="px-8 py-4 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800">
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
