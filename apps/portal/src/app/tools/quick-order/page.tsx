'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ChevronRight, Package, Trash2, Plus, ShoppingCart, 
  AlertCircle, CheckCircle2, Info, Upload
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

interface OrderLine {
  id: string
  sku: string
  quantity: number
  status: 'pending' | 'valid' | 'invalid' | 'checking'
  product?: {
    name: string
    price: number
    stock: string
    stockQty: number
  }
  error?: string
}

// Mock product lookup
const mockProducts: Record<string, { name: string; price: number; stock: string; stockQty: number }> = {
  'HB-UFO-150W-5K': { name: 'UFO High Bay 150W 5000K', price: 89, stock: 'In Stock', stockQty: 245 },
  'HB-UFO-200W-5K': { name: 'UFO High Bay 200W 5000K', price: 109, stock: 'In Stock', stockQty: 180 },
  'WP-50W-5K': { name: 'Wall Pack 50W 5000K', price: 59, stock: 'In Stock', stockQty: 320 },
  'WP-80W-5K': { name: 'Wall Pack 80W 5000K', price: 79, stock: 'In Stock', stockQty: 210 },
  'LHB-220W-5K': { name: 'Linear High Bay 220W', price: 129, stock: 'In Stock', stockQty: 156 },
  'T8-4FT-18W-5K': { name: '4ft LED Tube T8 18W', price: 8, stock: 'In Stock', stockQty: 2500 },
  'AL-150W-T3-5K': { name: 'Area Light 150W Type III', price: 149, stock: 'Ships in 3 days', stockQty: 0 },
}

export default function QuickOrderPage() {
  const [lines, setLines] = useState<OrderLine[]>([
    { id: '1', sku: '', quantity: 1, status: 'pending' }
  ])
  const [bulkInput, setBulkInput] = useState('')
  const [showBulkInput, setShowBulkInput] = useState(false)

  const addLine = () => {
    setLines([...lines, { 
      id: Date.now().toString(), 
      sku: '', 
      quantity: 1, 
      status: 'pending' 
    }])
  }

  const removeLine = (id: string) => {
    if (lines.length > 1) {
      setLines(lines.filter(l => l.id !== id))
    }
  }

  const updateLine = (id: string, field: 'sku' | 'quantity', value: string | number) => {
    setLines(lines.map(line => {
      if (line.id !== id) return line
      
      if (field === 'sku') {
        const sku = (value as string).toUpperCase().trim()
        const product = mockProducts[sku]
        
        if (!sku) {
          return { ...line, sku: '', status: 'pending', product: undefined, error: undefined }
        }
        
        if (product) {
          return { ...line, sku, status: 'valid', product, error: undefined }
        } else {
          return { ...line, sku, status: 'invalid', product: undefined, error: 'SKU not found' }
        }
      }
      
      return { ...line, [field]: value }
    }))
  }

  const processBulkInput = () => {
    const inputLines = bulkInput.trim().split('\n').filter(l => l.trim())
    const newLines: OrderLine[] = inputLines.map((line, index) => {
      // Parse "SKU, QTY" or "SKU QTY" or "SKU\tQTY"
      const parts = line.split(/[\t,\s]+/).filter(p => p.trim())
      const sku = parts[0]?.toUpperCase().trim() || ''
      const quantity = parseInt(parts[1]) || 1
      const product = mockProducts[sku]
      
      return {
        id: `bulk-${Date.now()}-${index}`,
        sku,
        quantity,
        status: product ? 'valid' : (sku ? 'invalid' : 'pending'),
        product,
        error: sku && !product ? 'SKU not found' : undefined
      }
    })
    
    setLines(prev => [...prev.filter(l => l.sku), ...newLines])
    setBulkInput('')
    setShowBulkInput(false)
  }

  const validLines = lines.filter(l => l.status === 'valid')
  const invalidLines = lines.filter(l => l.status === 'invalid')
  
  const subtotal = validLines.reduce((sum, line) => {
    return sum + (line.product?.price || 0) * line.quantity
  }, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/tools" className="hover:text-gray-700">Tools</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-gray-900">Quick Order</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quick Order</h1>
              <p className="mt-1 text-gray-600">
                Enter SKUs and quantities for fast ordering. Perfect for repeat orders and large lists.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
              {/* Bulk Input Toggle */}
              <div className="flex items-center justify-between border-b border-gray-200 p-4">
                <h2 className="font-semibold text-gray-900">Order Lines</h2>
                <button
                  onClick={() => setShowBulkInput(!showBulkInput)}
                  className="flex items-center gap-2 text-sm font-medium text-brand hover:underline"
                >
                  <Upload className="h-4 w-4" />
                  {showBulkInput ? 'Hide' : 'Paste Multiple SKUs'}
                </button>
              </div>

              {/* Bulk Input Area */}
              {showBulkInput && (
                <div className="border-b border-gray-200 bg-gray-50 p-4">
                  <label className="text-sm font-medium text-gray-700">
                    Paste SKUs (one per line, format: SKU, QTY)
                  </label>
                  <textarea
                    value={bulkInput}
                    onChange={(e) => setBulkInput(e.target.value)}
                    placeholder={`HB-UFO-150W-5K, 10\nWP-50W-5K, 25\nLHB-220W-5K, 5`}
                    rows={5}
                    className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-sm font-mono placeholder:text-gray-400 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Supports: SKU,QTY or SKU QTY (tab/space separated)
                    </span>
                    <button
                      onClick={processBulkInput}
                      className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-black hover:bg-brand-dark"
                    >
                      Add to Order
                    </button>
                  </div>
                </div>
              )}

              {/* Order Lines */}
              <div className="p-4">
                {/* Header Row */}
                <div className="mb-2 hidden grid-cols-12 gap-4 px-2 text-xs font-medium uppercase text-gray-500 sm:grid">
                  <div className="col-span-3">SKU</div>
                  <div className="col-span-4">Product</div>
                  <div className="col-span-2">Qty</div>
                  <div className="col-span-2 text-right">Price</div>
                  <div className="col-span-1"></div>
                </div>

                {/* Lines */}
                <div className="space-y-3">
                  {lines.map((line) => (
                    <div
                      key={line.id}
                      className={`grid grid-cols-12 items-center gap-4 rounded-lg border p-3 ${
                        line.status === 'valid' ? 'border-green-200 bg-green-50/50' :
                        line.status === 'invalid' ? 'border-red-200 bg-red-50/50' :
                        'border-gray-200 bg-white'
                      }`}
                    >
                      {/* SKU Input */}
                      <div className="col-span-12 sm:col-span-3">
                        <input
                          type="text"
                          value={line.sku}
                          onChange={(e) => updateLine(line.id, 'sku', e.target.value)}
                          placeholder="Enter SKU"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-mono uppercase placeholder:text-gray-400 placeholder:normal-case focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="col-span-8 sm:col-span-4">
                        {line.status === 'valid' && line.product ? (
                          <div>
                            <div className="text-sm font-medium text-gray-900">{line.product.name}</div>
                            <div className={`text-xs ${line.product.stock === 'In Stock' ? 'text-green-600' : 'text-amber-600'}`}>
                              {line.product.stock}
                            </div>
                          </div>
                        ) : line.status === 'invalid' ? (
                          <div className="flex items-center gap-1 text-sm text-red-600">
                            <AlertCircle className="h-4 w-4" />
                            {line.error}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-400">Enter SKU to verify</div>
                        )}
                      </div>

                      {/* Quantity */}
                      <div className="col-span-4 sm:col-span-2">
                        <input
                          type="number"
                          min="1"
                          value={line.quantity}
                          onChange={(e) => updateLine(line.id, 'quantity', parseInt(e.target.value) || 1)}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-center focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                        />
                      </div>

                      {/* Price */}
                      <div className="col-span-6 text-right sm:col-span-2">
                        {line.status === 'valid' && line.product ? (
                          <div className="text-sm font-semibold text-gray-900">
                            ${(line.product.price * line.quantity).toFixed(2)}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-400">—</div>
                        )}
                      </div>

                      {/* Remove */}
                      <div className="col-span-2 flex justify-end sm:col-span-1">
                        <button
                          onClick={() => removeLine(line.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500"
                          disabled={lines.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Line Button */}
                <button
                  onClick={addLine}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 py-3 text-sm font-medium text-gray-600 hover:border-brand hover:text-brand"
                >
                  <Plus className="h-4 w-4" />
                  Add Another Line
                </button>
              </div>
            </div>

            {/* Help Text */}
            <div className="mt-6 rounded-lg bg-blue-50 p-4">
              <div className="flex gap-3">
                <Info className="h-5 w-5 shrink-0 text-blue-500" />
                <div className="text-sm text-blue-800">
                  <strong>Tips:</strong>
                  <ul className="mt-1 list-inside list-disc space-y-1 text-blue-700">
                    <li>Use the bulk paste feature to add multiple SKUs at once</li>
                    <li>SKU format: Category-Model-Wattage-CCT (e.g., HB-UFO-150W-5K)</li>
                    <li>Need help finding SKUs? <Link href="/products" className="underline">Browse products</Link> or use <Link href="/tools/replacement" className="underline">Replacement Finder</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-[160px] rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 p-4">
                <h2 className="font-semibold text-gray-900">Order Summary</h2>
              </div>
              
              <div className="p-4">
                {/* Valid Items */}
                {validLines.length > 0 && (
                  <div className="space-y-3">
                    {validLines.map((line) => (
                      <div key={line.id} className="flex items-start justify-between text-sm">
                        <div>
                          <div className="font-medium text-gray-900">{line.product?.name}</div>
                          <div className="text-gray-500">Qty: {line.quantity}</div>
                        </div>
                        <div className="font-semibold">
                          ${((line.product?.price || 0) * line.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {validLines.length === 0 && (
                  <div className="py-8 text-center text-sm text-gray-500">
                    Add valid SKUs to see your order
                  </div>
                )}

                {/* Totals */}
                {validLines.length > 0 && (
                  <>
                    <div className="my-4 border-t border-gray-200" />
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal ({validLines.length} items)</span>
                        <span className="font-semibold">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Shipping</span>
                        <span className="text-gray-500">Calculated at checkout</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax</span>
                        <span className="text-gray-500">Calculated at checkout</span>
                      </div>
                    </div>
                    <div className="my-4 border-t border-gray-200" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Estimated Total</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                  </>
                )}

                {/* Warnings */}
                {invalidLines.length > 0 && (
                  <div className="mt-4 rounded-lg bg-amber-50 p-3">
                    <div className="flex items-center gap-2 text-sm text-amber-800">
                      <AlertCircle className="h-4 w-4" />
                      {invalidLines.length} SKU(s) not found
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-6 space-y-3">
                  <button
                    disabled={validLines.length === 0}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-3 font-semibold text-black hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </button>
                  <button
                    disabled={validLines.length === 0}
                    className="w-full rounded-lg border border-gray-300 py-3 font-medium text-gray-700 hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Request Quote
                  </button>
                </div>

                {/* Login prompt */}
                <div className="mt-4 text-center text-sm text-gray-500">
                  <Link href="/login" className="font-medium text-brand hover:underline">
                    Log in
                  </Link>
                  {' '}for contractor pricing
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
