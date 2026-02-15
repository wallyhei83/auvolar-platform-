import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FileText, Download, ChevronRight, Lightbulb, Info } from 'lucide-react'

const iesCategories = [
  {
    name: 'High Bay Fixtures',
    description: 'UFO and linear high bay photometric files',
    files: [
      { name: 'UFO High Bay 100W', sku: 'AOK-100UFO-850', angle: '120°' },
      { name: 'UFO High Bay 150W', sku: 'AOK-150UFO-850', angle: '120°' },
      { name: 'UFO High Bay 200W', sku: 'AOK-200UFO-850', angle: '120°' },
      { name: 'UFO High Bay 240W', sku: 'AOK-240UFO-850', angle: '120°' },
      { name: 'Linear High Bay 165W', sku: 'AOK-165LHB-850', angle: '110°' },
      { name: 'Linear High Bay 220W', sku: 'AOK-220LHB-850', angle: '110°' },
    ]
  },
  {
    name: 'Outdoor Area Lights',
    description: 'Parking lot, flood, and wall pack photometric files',
    files: [
      { name: 'Parking Lot 150W Type III', sku: 'AOK-PL150-T3', angle: 'Type III' },
      { name: 'Parking Lot 150W Type V', sku: 'AOK-PL150-T5', angle: 'Type V' },
      { name: 'Parking Lot 300W Type III', sku: 'AOK-PL300-T3', angle: 'Type III' },
      { name: 'Flood Light 50W', sku: 'AOK-FL50-50K', angle: '120°' },
      { name: 'Flood Light 100W', sku: 'AOK-FL100-50K', angle: '120°' },
      { name: 'Wall Pack 30W', sku: 'AOK-WP30-50K', angle: 'Forward Throw' },
      { name: 'Wall Pack 60W', sku: 'AOK-WP60-50K', angle: 'Forward Throw' },
    ]
  },
  {
    name: 'Indoor Panel & Troffer',
    description: 'Flat panel and troffer photometric files',
    files: [
      { name: '2x2 Flat Panel 40W', sku: 'AOK-22FP40-840', angle: '110°' },
      { name: '2x4 Flat Panel 50W', sku: 'AOK-24FP50-840', angle: '110°' },
      { name: '2x2 Troffer 30W', sku: 'AOK-22TR30-840', angle: '100°' },
      { name: '2x4 Troffer 50W', sku: 'AOK-24TR50-840', angle: '100°' },
    ]
  },
]

export default function IESLibraryPage() {
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
            <span className="text-gray-900">IES Library</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-black py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-yellow-400 p-3">
              <Lightbulb className="h-8 w-8 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">IES File Library</h1>
              <p className="mt-1 text-gray-400">Photometric data files for lighting design software</p>
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
              <h2 className="font-semibold text-blue-800">What are IES Files?</h2>
              <p className="mt-1 text-sm text-blue-700">
                IES (Illuminating Engineering Society) files contain photometric data that describes how a 
                luminaire distributes light. These files are used in lighting design software like AGi32, 
                DIALux, and Visual to create accurate lighting layouts and calculations.
              </p>
            </div>
          </div>
        </div>

        {/* IES Categories */}
        <div className="space-y-10">
          {iesCategories.map((category) => (
            <div key={category.name}>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
                <p className="text-sm text-gray-500">{category.description}</p>
              </div>
              <div className="overflow-hidden rounded-xl border bg-white">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Product</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">SKU</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Distribution</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Download</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {category.files.map((file) => (
                      <tr key={file.sku} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{file.name}</td>
                        <td className="px-6 py-4 text-sm font-mono text-gray-500">{file.sku}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{file.angle}</td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/docs/ies/${file.sku}`}
                            className="inline-flex items-center gap-1 text-sm font-medium text-yellow-600 hover:text-yellow-700"
                          >
                            <Download className="h-4 w-4" />
                            IES
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Photometric Request */}
        <div className="mt-12 rounded-xl bg-gray-900 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">Need a Photometric Layout?</h2>
          <p className="mx-auto mt-2 max-w-lg text-gray-400">
            Our lighting engineers can create a preliminary photometric layout for your project within 24 hours. 
            Just send us your floor plan and requirements.
          </p>
          <Link
            href="/tools/photometric-request"
            className="mt-6 inline-block rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-black transition-colors hover:bg-yellow-300"
          >
            Request Photometric Layout
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
