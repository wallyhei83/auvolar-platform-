import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FileText, Download, ChevronRight, Wrench, AlertTriangle, CheckCircle } from 'lucide-react'

const categories = [
  {
    name: 'High Bay Fixtures',
    items: [
      { name: 'UFO High Bay Installation', sku: 'UFO-HB', description: 'Round UFO style high bay fixtures' },
      { name: 'Linear High Bay Installation', sku: 'LHB', description: 'Linear/strip high bay fixtures' },
    ]
  },
  {
    name: 'Panel Lights',
    items: [
      { name: 'Flat Panel Installation', sku: 'FP', description: 'Recessed and surface mount panels' },
      { name: 'Troffer Retrofit Installation', sku: 'TR', description: 'Drop ceiling troffer replacements' },
    ]
  },
  {
    name: 'Outdoor Fixtures',
    items: [
      { name: 'Wall Pack Installation', sku: 'WP', description: 'Wall mounted outdoor fixtures' },
      { name: 'Parking Lot Light Installation', sku: 'PL', description: 'Pole mounted area lights' },
      { name: 'Flood Light Installation', sku: 'FL', description: 'Adjustable flood lights' },
    ]
  },
  {
    name: 'Tubes & Retrofits',
    items: [
      { name: 'Type A LED Tube Installation', sku: 'T8-A', description: 'Ballast compatible tubes' },
      { name: 'Type B LED Tube Installation', sku: 'T8-B', description: 'Ballast bypass tubes' },
      { name: 'Type A+B LED Tube Installation', sku: 'T8-AB', description: 'Universal tubes' },
    ]
  },
]

const safetyTips = [
  'Always turn off power at the breaker before installation',
  'Verify voltage compatibility before connecting',
  'Use appropriate wire gauges for the circuit',
  'Follow local electrical codes and regulations',
  'Have a licensed electrician perform installations when required',
]

export default function InstallationGuidesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/support" className="hover:text-gray-900">Support</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">Installation Guides</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-black py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-yellow-400 p-3">
              <Wrench className="h-8 w-8 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Installation Guides</h1>
              <p className="mt-1 text-gray-400">Step-by-step instructions for all fixture types</p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Safety Warning */}
        <div className="mb-8 rounded-xl border border-yellow-200 bg-yellow-50 p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 flex-shrink-0 text-yellow-600" />
            <div>
              <h2 className="font-semibold text-yellow-800">Safety First</h2>
              <ul className="mt-2 space-y-1">
                {safetyTips.map((tip, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-yellow-700">
                    <CheckCircle className="h-4 w-4" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category.name}>
              <h2 className="mb-4 text-xl font-bold text-gray-900">{category.name}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item) => (
                  <Link
                    key={item.sku}
                    href={`/docs/instructions/${item.sku}`}
                    className="group rounded-xl border bg-white p-6 transition-all hover:border-yellow-400 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-yellow-600">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                      </div>
                      <FileText className="h-5 w-5 text-gray-400 group-hover:text-yellow-500" />
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-yellow-600">
                      <Download className="h-4 w-4" />
                      Download PDF
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Need Help */}
        <div className="mt-12 rounded-xl bg-gray-900 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">Need Installation Help?</h2>
          <p className="mx-auto mt-2 max-w-lg text-gray-400">
            Our technical support team is available Mon-Fri 8am-6pm CST to answer your installation questions.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-black transition-colors hover:bg-yellow-300"
            >
              Contact Support
            </Link>
            <Link
              href="/support"
              className="rounded-lg border border-gray-600 px-6 py-3 font-semibold text-white transition-colors hover:border-gray-500"
            >
              View FAQs
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
