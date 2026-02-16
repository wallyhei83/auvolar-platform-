'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { 
  ChevronRight, Package, FileText, Download, CheckCircle, 
  Plus, Trash2, Send, Loader2, Search
} from 'lucide-react'

// Sample products - in production this would come from BigCommerce API
const sampleProducts = [
  { sku: 'AOK-100UFO-850', name: 'UFO High Bay 100W 5000K', category: 'High Bay' },
  { sku: 'AOK-150UFO-850', name: 'UFO High Bay 150W 5000K', category: 'High Bay' },
  { sku: 'AOK-200UFO-850', name: 'UFO High Bay 200W 5000K', category: 'High Bay' },
  { sku: 'AOK-240UFO-850', name: 'UFO High Bay 240W 5000K', category: 'High Bay' },
  { sku: 'AOK-165LHB-850', name: 'Linear High Bay 165W 5000K', category: 'High Bay' },
  { sku: 'AOK-22FP40-840', name: '2x2 Flat Panel 40W 4000K', category: 'Panel' },
  { sku: 'AOK-24FP50-840', name: '2x4 Flat Panel 50W 4000K', category: 'Panel' },
  { sku: 'AOK-WP30-50K', name: 'Wall Pack 30W 5000K', category: 'Outdoor' },
  { sku: 'AOK-WP60-50K', name: 'Wall Pack 60W 5000K', category: 'Outdoor' },
  { sku: 'AOK-PL150-50K', name: 'Parking Lot Light 150W 5000K', category: 'Outdoor' },
  { sku: 'AOK-T8-4A-18W', name: 'T8 4ft Type A 18W', category: 'LED Tubes' },
  { sku: 'AOK-T8-4B-18W', name: 'T8 4ft Type B 18W', category: 'LED Tubes' },
]

const documentTypes = [
  { id: 'spec-sheet', name: 'Spec Sheet / Cut Sheet', description: 'Product specifications and dimensions', included: true },
  { id: 'ies', name: 'IES File', description: 'Photometric data for lighting design', included: true },
  { id: 'install', name: 'Installation Guide', description: 'Step-by-step installation instructions', included: true },
  { id: 'warranty', name: 'Warranty Certificate', description: '5-year warranty documentation', included: true },
  { id: 'dlc', name: 'DLC Certificate', description: 'DesignLights Consortium listing', included: false },
  { id: 'ul', name: 'UL Certificate', description: 'UL safety certification', included: false },
]

type SelectedProduct = {
  sku: string
  name: string
}

export default function SpecPackagePage() {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDocs, setSelectedDocs] = useState<string[]>(['spec-sheet', 'ies', 'install', 'warranty'])
  const [email, setEmail] = useState('')
  const [projectName, setProjectName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const filteredProducts = sampleProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const addProduct = (product: typeof sampleProducts[0]) => {
    if (!selectedProducts.find(p => p.sku === product.sku)) {
      setSelectedProducts([...selectedProducts, { sku: product.sku, name: product.name }])
    }
    setSearchQuery('')
  }

  const removeProduct = (sku: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.sku !== sku))
  }

  const toggleDoc = (docId: string) => {
    if (selectedDocs.includes(docId)) {
      setSelectedDocs(selectedDocs.filter(d => d !== docId))
    } else {
      setSelectedDocs([...selectedDocs, docId])
    }
  }

  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'spec-package',
          data: { email, projectName, products: selectedProducts, documents: selectedDocs },
        }),
      })

      if (!response.ok) throw new Error('Failed to send')
      setSubmitted(true)
    } catch {
      setError('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="rounded-xl border bg-white p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="mt-6 text-2xl font-bold text-gray-900">Spec Package Requested!</h1>
            <p className="mt-2 text-gray-600">
              Your custom spec package with {selectedProducts.length} product(s) and {selectedDocs.length} document type(s) 
              is being compiled. You&apos;ll receive it at <strong>{email}</strong> within 1 business hour.
            </p>
            <div className="mt-8 rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-600">
                <strong>Project:</strong> {projectName || 'Not specified'}<br />
                <strong>Products:</strong> {selectedProducts.map(p => p.sku).join(', ')}
              </p>
            </div>
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => {
                  setSubmitted(false)
                  setSelectedProducts([])
                  setEmail('')
                  setProjectName('')
                }}
                className="rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-black transition-colors hover:bg-yellow-300"
              >
                Build Another Package
              </button>
              <Link
                href="/tools"
                className="rounded-lg border px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Back to Tools
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/tools" className="hover:text-gray-900">Tools</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">Spec Package Builder</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-black py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-yellow-400 p-3">
              <Package className="h-8 w-8 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Spec Package Builder</h1>
              <p className="mt-1 text-gray-400">Build custom submittal packages with all required documents</p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Product Selection */}
            <div className="lg:col-span-2 space-y-6">
              {/* Search & Add Products */}
              <div className="rounded-xl border bg-white p-6">
                <h2 className="text-lg font-semibold text-gray-900">1. Select Products</h2>
                <p className="mt-1 text-sm text-gray-500">Search and add products to your spec package</p>

                <div className="mt-4 relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by SKU or product name..."
                    className="w-full rounded-lg border py-3 pl-10 pr-4 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  />
                </div>

                {/* Search Results */}
                {searchQuery && (
                  <div className="mt-2 max-h-60 overflow-y-auto rounded-lg border">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <button
                          key={product.sku}
                          type="button"
                          onClick={() => addProduct(product)}
                          disabled={selectedProducts.some(p => p.sku === product.sku)}
                          className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-gray-50 disabled:bg-gray-50 disabled:text-gray-400"
                        >
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-500">{product.sku} • {product.category}</p>
                          </div>
                          {selectedProducts.some(p => p.sku === product.sku) ? (
                            <span className="text-sm text-green-600">Added</span>
                          ) : (
                            <Plus className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      ))
                    ) : (
                      <p className="px-4 py-3 text-sm text-gray-500">No products found</p>
                    )}
                  </div>
                )}

                {/* Selected Products */}
                {selectedProducts.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700">{selectedProducts.length} product(s) selected</p>
                    <div className="mt-2 space-y-2">
                      {selectedProducts.map((product) => (
                        <div
                          key={product.sku}
                          className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3"
                        >
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-500">{product.sku}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeProduct(product.sku)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Document Selection */}
              <div className="rounded-xl border bg-white p-6">
                <h2 className="text-lg font-semibold text-gray-900">2. Select Documents</h2>
                <p className="mt-1 text-sm text-gray-500">Choose which documents to include in your package</p>

                <div className="mt-4 space-y-3">
                  {documentTypes.map((doc) => (
                    <label
                      key={doc.id}
                      className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={selectedDocs.includes(doc.id)}
                        onChange={() => toggleDoc(doc.id)}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-400"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{doc.name}</p>
                        <p className="text-sm text-gray-500">{doc.description}</p>
                      </div>
                      <FileText className="h-5 w-5 text-gray-400" />
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Summary & Submit */}
            <div className="space-y-6">
              <div className="sticky top-4 space-y-6">
                {/* Package Summary */}
                <div className="rounded-xl border bg-white p-6">
                  <h2 className="text-lg font-semibold text-gray-900">Package Summary</h2>
                  
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Products</span>
                      <span className="font-medium">{selectedProducts.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Document Types</span>
                      <span className="font-medium">{selectedDocs.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Total Files</span>
                      <span className="font-medium">{selectedProducts.length * selectedDocs.length}</span>
                    </div>
                  </div>

                  <hr className="my-4" />

                  {/* Contact Info */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="mt-1 w-full rounded-lg border p-3 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Project Name</label>
                      <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="e.g., ABC Warehouse"
                        className="mt-1 w-full rounded-lg border p-3 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={selectedProducts.length === 0 || selectedDocs.length === 0 || !email || isSubmitting}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-black transition-colors hover:bg-yellow-300 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Building Package...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Build & Send Package
                      </>
                    )}
                  </button>

                  <p className="mt-3 text-center text-xs text-gray-500">
                    Package will be emailed within 1 hour
                  </p>
                </div>

                {/* Quick Download Note */}
                <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Need files immediately?</strong> Individual documents are available for 
                    instant download on each product page.
                  </p>
                  <Link
                    href="/bc-products"
                    className="mt-2 inline-block text-sm font-medium text-yellow-700 hover:text-yellow-800"
                  >
                    Browse Products →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}
