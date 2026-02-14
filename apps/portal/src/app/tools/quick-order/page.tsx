'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function QuickOrderPage() {
  const [items, setItems] = useState([{ sku: '', quantity: 1 }])

  const addItem = () => {
    setItems([...items, { sku: '', quantity: 1 }])
  }

  const updateItem = (index: number, field: 'sku' | 'quantity', value: string | number) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            <span className="text-[#FFD60A]">Lumi</span>linkAI
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/products" className="hover:text-[#FFD60A]">Products</Link>
            <Link href="/tools" className="text-[#FFD60A]">Tools</Link>
            <Link href="/login" className="bg-[#FFD60A] text-black px-4 py-2 rounded font-medium">
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <nav className="text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-[#FFD60A]">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/tools" className="text-gray-500 hover:text-[#FFD60A]">Tools</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">Quick Order</span>
        </nav>

        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-2">Quick Order</h1>
          <p className="text-gray-600 mb-6">Enter SKUs and quantities to quickly add items to your order</p>

          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="flex gap-4 items-center">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Enter SKU (e.g., HB-150W-5K)"
                    value={item.sku}
                    onChange={(e) => updateItem(index, 'sku', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                  />
                </div>
                <div className="w-24">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                  />
                </div>
                {items.length > 1 && (
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={addItem}
            className="mt-4 text-[#FFD60A] hover:underline"
          >
            + Add Another Item
          </button>

          <div className="mt-8 flex gap-4">
            <button className="flex-1 bg-[#FFD60A] text-black py-3 rounded-lg font-medium hover:bg-yellow-400">
              Add to Cart
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              Clear All
            </button>
          </div>

          <p className="mt-4 text-sm text-gray-500 text-center">
            Need help finding SKUs? <Link href="/products" className="text-[#FFD60A] hover:underline">Browse Products</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
