'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function RebateFinderPage() {
  const [zipCode, setZipCode] = useState('')
  const [utilityName, setUtilityName] = useState('')

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
          <span className="text-gray-900">Rebate Finder</span>
        </nav>

        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-2">Utility Rebate Finder</h1>
          <p className="text-gray-600 mb-6">
            Find available rebates and incentives for LED lighting upgrades in your area
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ZIP Code
              </label>
              <input
                type="text"
                placeholder="Enter your ZIP code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                maxLength={5}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Utility Provider (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g., ComEd, PG&E, Duke Energy"
                value={utilityName}
                onChange={(e) => setUtilityName(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
              />
            </div>

            <button className="w-full bg-[#FFD60A] text-black py-3 rounded-lg font-medium hover:bg-yellow-400">
              Search Rebates
            </button>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-800 mb-2">💰 Average Savings</h3>
              <p className="text-sm text-green-700">
                Businesses save an average of $2-5 per lamp through utility rebates
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">📋 Pre-Qualified Products</h3>
              <p className="text-sm text-blue-700">
                All Auvolar products are DLC listed and rebate-eligible
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
