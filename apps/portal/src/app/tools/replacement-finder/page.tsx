'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ReplacementFinderPage() {
  const [oldSku, setOldSku] = useState('')
  const [brand, setBrand] = useState('')

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
          <span className="text-gray-900">Replacement Finder</span>
        </nav>

        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-2">LED Replacement Finder</h1>
          <p className="text-gray-600 mb-6">
            Find the perfect LED replacement for your existing fixtures
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Product SKU or Model Number
              </label>
              <input
                type="text"
                placeholder="e.g., Philips 32W T8, GE F48T12"
                value={oldSku}
                onChange={(e) => setOldSku(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Brand (Optional)
              </label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FFD60A]"
              >
                <option value="">Select Brand</option>
                <option value="philips">Philips</option>
                <option value="ge">GE</option>
                <option value="sylvania">Sylvania</option>
                <option value="cree">Cree</option>
                <option value="lithonia">Lithonia</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button className="w-full bg-[#FFD60A] text-black py-3 rounded-lg font-medium hover:bg-yellow-400">
              Find Replacement
            </button>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">💡 Pro Tip</h3>
            <p className="text-sm text-gray-600">
              For best results, enter the complete model number from your existing fixture. 
              Our database covers thousands of legacy lighting products.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
