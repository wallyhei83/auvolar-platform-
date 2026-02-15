'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Loader2, Check, Filter } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { BCProductGrid } from '@/components/products/bc-product-grid'

// Merged category definitions
// BC Category IDs:
// 26 = Area Light, 43 = Parking Lighting -> Merged as "Area Lights / Parking Lot"
// 27 = Wall Pack Light
// 28 = Flood Light
// 30 = UFO High Bay, 31 = Linear High Bay -> Merged as "High Bay Lights"
// 32 = Strip Light
// 33 = Panel Light
// 35 = Tri-proof Light (Vapor Tight)
// 36 = LED Tube
// 45 = Bollard Light, 46 = Post Top Light -> Merged as "Landscape Lighting"
// 47 = Solar Wall Pack, 59 = Solar Area Light -> Merged as "Solar Lighting"

const mergedCategories = [
  { 
    id: 'area-parking', 
    name: 'Area Lights', 
    bcIds: [26, 43],
    description: 'LED area lights for parking lots and outdoor spaces'
  },
  { 
    id: 'high-bay', 
    name: 'High Bay Lights', 
    bcIds: [30, 31],
    description: 'UFO and linear high bay for warehouses'
  },
  { 
    id: 'wall-pack', 
    name: 'Wall Packs', 
    bcIds: [27],
    description: 'Building perimeter and security lighting'
  },
  { 
    id: 'flood', 
    name: 'Flood Lights', 
    bcIds: [28],
    description: 'High-output outdoor flood lighting'
  },
  { 
    id: 'troffer-panel', 
    name: 'Troffers & Panels', 
    bcIds: [33],
    description: 'Office and commercial ceiling fixtures'
  },
  { 
    id: 'led-tube', 
    name: 'LED Tubes', 
    bcIds: [36],
    description: 'T8/T5 fluorescent replacement tubes'
  },
  { 
    id: 'canopy', 
    name: 'Canopy Lights', 
    bcIds: [53],
    description: 'Gas station and garage canopy fixtures'
  },
  { 
    id: 'landscape', 
    name: 'Landscape Lighting', 
    bcIds: [45, 46],
    description: 'Bollards and post top lights'
  },
  { 
    id: 'solar', 
    name: 'Solar Lighting', 
    bcIds: [29, 47, 59],
    description: 'Off-grid solar LED solutions'
  },
  { 
    id: 'vapor-tight', 
    name: 'Vapor Tight', 
    bcIds: [35],
    description: 'IP65+ for harsh environments'
  },
]

// Wattage filter options
const wattageFilters = [
  { id: 'under-50', label: 'Under 50W', min: 0, max: 50 },
  { id: '50-100', label: '50W - 100W', min: 50, max: 100 },
  { id: '100-150', label: '100W - 150W', min: 100, max: 150 },
  { id: '150-200', label: '150W - 200W', min: 150, max: 200 },
  { id: '200-plus', label: '200W+', min: 200, max: 9999 },
]

function ProductsContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam)
  const [selectedWattages, setSelectedWattages] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('featured')

  // Get BC category IDs for the selected merged category
  const getActiveBcIds = (): number[] | undefined => {
    if (!selectedCategory) return undefined
    const cat = mergedCategories.find(c => c.id === selectedCategory)
    return cat?.bcIds
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium text-gray-900">All Products</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">LED Lighting Products</h1>
              <p className="mt-1 text-gray-600">
                Commercial & industrial LED lighting solutions • DLC & UL Listed • Ships in 24h
              </p>
              <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-brand" /> DLC & UL Listed
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-brand" /> 5-10 Year Warranty
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-brand" /> Free Shipping $500+
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Live from BigCommerce
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-64 flex-shrink-0">
            {/* Category Filter */}
            <div className="bg-white rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                Category
                <span className="text-xs text-gray-400">—</span>
              </h3>
              <div className="space-y-2">
                {mergedCategories.map(cat => (
                  <label 
                    key={cat.id}
                    className="flex items-center gap-2 cursor-pointer hover:text-brand"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategory === cat.id}
                      onChange={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                      className="w-4 h-4 rounded border-gray-300 text-brand focus:ring-brand"
                    />
                    <span className="text-sm">{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Wattage Filter */}
            <div className="bg-white rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                Wattage
                <span className="text-xs text-gray-400">—</span>
              </h3>
              <div className="space-y-2">
                {wattageFilters.map(w => (
                  <label 
                    key={w.id}
                    className="flex items-center gap-2 cursor-pointer hover:text-brand"
                  >
                    <input
                      type="checkbox"
                      checked={selectedWattages.includes(w.id)}
                      onChange={() => {
                        setSelectedWattages(prev => 
                          prev.includes(w.id) 
                            ? prev.filter(id => id !== w.id)
                            : [...prev, w.id]
                        )
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-brand focus:ring-brand"
                    />
                    <span className="text-sm">{w.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Category Tabs */}
            <div className="bg-white rounded-lg p-2 mb-6 flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !selectedCategory 
                    ? 'bg-brand text-black' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                All Products
              </button>
              {mergedCategories.slice(0, 7).map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === cat.id 
                      ? 'bg-brand text-black' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex justify-end mb-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>

            {/* Products Grid */}
            <BCProductGrid 
              categoryFilter={getActiveBcIds()?.join(',') || undefined}
              limit={20} 
              showCategories={false} 
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function BCProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}
