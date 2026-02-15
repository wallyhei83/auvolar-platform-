import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FileText, Download, ChevronRight, Zap, Info } from 'lucide-react'

const wiringDiagrams = [
  {
    category: '0-10V Dimming',
    description: 'Standard analog dimming protocol for commercial fixtures',
    diagrams: [
      { name: '0-10V Basic Wiring', file: '0-10v-basic', description: 'Single fixture to dimmer' },
      { name: '0-10V Multi-Fixture', file: '0-10v-multi', description: 'Multiple fixtures on one dimmer' },
      { name: '0-10V with Occupancy', file: '0-10v-occupancy', description: 'Dimmer with occupancy sensor' },
    ]
  },
  {
    category: 'DALI Dimming',
    description: 'Digital addressable lighting interface for advanced control',
    diagrams: [
      { name: 'DALI Basic Setup', file: 'dali-basic', description: 'Single DALI driver wiring' },
      { name: 'DALI Daisy Chain', file: 'dali-chain', description: 'Multiple fixtures in series' },
      { name: 'DALI Emergency', file: 'dali-emergency', description: 'With emergency backup' },
    ]
  },
  {
    category: 'Emergency Backup',
    description: 'Battery backup wiring for emergency lighting compliance',
    diagrams: [
      { name: 'Internal Battery', file: 'em-internal', description: 'Built-in emergency driver' },
      { name: 'External Battery Pack', file: 'em-external', description: 'Separate battery unit' },
      { name: 'Generator Transfer', file: 'em-generator', description: 'With transfer switch' },
    ]
  },
  {
    category: 'Motion Sensors',
    description: 'Occupancy and vacancy sensor integration',
    diagrams: [
      { name: 'Line Voltage Sensor', file: 'sensor-line', description: '120/277V sensor wiring' },
      { name: 'Low Voltage Sensor', file: 'sensor-low', description: '0-10V sensor integration' },
      { name: 'High Bay Sensor', file: 'sensor-highbay', description: 'Ceiling mount sensor' },
    ]
  },
  {
    category: 'Three-Phase',
    description: '208V/480V commercial and industrial wiring',
    diagrams: [
      { name: '208V Delta', file: '208v-delta', description: 'Three-phase delta configuration' },
      { name: '277V Single Phase', file: '277v-single', description: 'From 480Y/277V panel' },
      { name: '480V High Bay', file: '480v-highbay', description: 'Direct 480V fixtures' },
    ]
  },
]

export default function WiringDiagramsPage() {
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
            <span className="text-gray-900">Wiring Diagrams</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-black py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-yellow-400 p-3">
              <Zap className="h-8 w-8 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Wiring Diagrams</h1>
              <p className="mt-1 text-gray-400">Electrical schematics for all control types</p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Info Box */}
        <div className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-6">
          <div className="flex items-start gap-4">
            <Info className="h-6 w-6 flex-shrink-0 text-blue-600" />
            <div>
              <h2 className="font-semibold text-blue-800">Important Note</h2>
              <p className="mt-1 text-sm text-blue-700">
                These diagrams are for reference only. Always consult the specific installation instructions 
                included with your fixture. Local electrical codes take precedence. When in doubt, 
                consult a licensed electrician.
              </p>
            </div>
          </div>
        </div>

        {/* Wiring Categories */}
        <div className="space-y-10">
          {wiringDiagrams.map((category) => (
            <div key={category.category}>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">{category.category}</h2>
                <p className="text-sm text-gray-500">{category.description}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.diagrams.map((diagram) => (
                  <div
                    key={diagram.file}
                    className="group rounded-xl border bg-white p-6 transition-all hover:border-yellow-400 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {diagram.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{diagram.description}</p>
                      </div>
                      <FileText className="h-5 w-5 text-gray-400 group-hover:text-yellow-500" />
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
                      <Download className="h-4 w-4" />
                      Coming Soon
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Request Custom */}
        <div className="mt-12 rounded-xl bg-gray-900 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">Need a Custom Diagram?</h2>
          <p className="mx-auto mt-2 max-w-lg text-gray-400">
            Have a unique installation scenario? Our engineering team can create custom wiring diagrams for your project.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-black transition-colors hover:bg-yellow-300"
          >
            Request Custom Diagram
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
