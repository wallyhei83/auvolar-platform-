import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FileText, Download, ChevronRight, Search } from 'lucide-react'

const productCategories = [
  {
    name: 'High Bay Lights',
    products: [
      { name: 'UFO High Bay 100W', sku: 'AOK-100UFO-850' },
      { name: 'UFO High Bay 150W', sku: 'AOK-150UFO-850' },
      { name: 'UFO High Bay 200W', sku: 'AOK-200UFO-850' },
      { name: 'UFO High Bay 240W', sku: 'AOK-240UFO-850' },
      { name: 'Linear High Bay 165W', sku: 'AOK-165LHB-850' },
      { name: 'Linear High Bay 220W', sku: 'AOK-220LHB-850' },
    ]
  },
  {
    name: 'Panel Lights',
    products: [
      { name: '2x2 Flat Panel 40W', sku: 'AOK-22FP40-840' },
      { name: '2x4 Flat Panel 50W', sku: 'AOK-24FP50-840' },
      { name: '1x4 Flat Panel 40W', sku: 'AOK-14FP40-840' },
    ]
  },
  {
    name: 'LED Tubes',
    products: [
      { name: 'T8 4ft Type A 18W', sku: 'AOK-T8-4A-18W' },
      { name: 'T8 4ft Type B 18W', sku: 'AOK-T8-4B-18W' },
      { name: 'T8 4ft Type A+B 15W', sku: 'AOK-T8-4AB-15W' },
    ]
  },
  {
    name: 'Outdoor Lighting',
    products: [
      { name: 'Wall Pack 30W', sku: 'AOK-WP30-50K' },
      { name: 'Wall Pack 60W', sku: 'AOK-WP60-50K' },
      { name: 'Parking Lot Light 150W', sku: 'AOK-PL150-50K' },
      { name: 'Parking Lot Light 300W', sku: 'AOK-PL300-50K' },
      { name: 'Flood Light 50W', sku: 'AOK-FL50-50K' },
      { name: 'Flood Light 100W', sku: 'AOK-FL100-50K' },
    ]
  },
  {
    name: 'Troffers',
    products: [
      { name: '2x2 Troffer 30W', sku: 'AOK-22TR30-840' },
      { name: '2x4 Troffer 40W', sku: 'AOK-24TR40-840' },
      { name: '2x4 Troffer 50W', sku: 'AOK-24TR50-840' },
    ]
  },
]

export default function CutSheetsPage() {
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
            <span className="text-gray-900">Cut Sheets</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-black py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-yellow-400 p-3">
              <FileText className="h-8 w-8 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Cut Sheets / Spec Sheets</h1>
              <p className="mt-1 text-gray-400">Product specification documents for submittal packages</p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Search Tip */}
        <div className="mb-8 rounded-xl border bg-white p-6">
          <div className="flex items-center gap-3">
            <Search className="h-5 w-5 text-gray-400" />
            <p className="text-gray-600">
              <strong>Tip:</strong> You can also access spec sheets directly from any product page, 
              or use the search bar to find products by SKU.
            </p>
          </div>
        </div>

        {/* Product Categories */}
        <div className="space-y-10">
          {productCategories.map((category) => (
            <div key={category.name}>
              <h2 className="mb-4 text-xl font-bold text-gray-900">{category.name}</h2>
              <div className="overflow-hidden rounded-xl border bg-white">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Product</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">SKU</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Download</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {category.products.map((product) => (
                      <tr key={product.sku} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{product.name}</td>
                        <td className="px-6 py-4 text-sm font-mono text-gray-500">{product.sku}</td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/docs/spec-sheets/${product.sku}`}
                            className="inline-flex items-center gap-1 text-sm font-medium text-yellow-600 hover:text-yellow-700"
                          >
                            <Download className="h-4 w-4" />
                            PDF
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

        {/* Bulk Download */}
        <div className="mt-12 rounded-xl bg-gray-900 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">Need Multiple Spec Sheets?</h2>
          <p className="mx-auto mt-2 max-w-lg text-gray-400">
            Contact us with your product list and we&apos;ll send you a complete submittal package with all spec sheets, 
            certifications, and IES files.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-black transition-colors hover:bg-yellow-300"
          >
            Request Submittal Package
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
