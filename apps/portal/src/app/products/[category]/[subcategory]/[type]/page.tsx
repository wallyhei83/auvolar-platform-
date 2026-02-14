'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { 
  ChevronRight, Filter, Grid, List, X,
  Lightbulb, ShoppingCart
} from 'lucide-react'

// Type page - most specific product listing
// This handles routes like /products/solar/street/all-in-one

// Title mapping for types
const typeConfig: Record<string, Record<string, Record<string, string>>> = {
  solar: {
    street: {
      'all-in-one': 'All-in-One Solar Street Lights',
      'split': 'Split Type Solar Street Lights',
    },
    flood: {},
    garden: {},
    wall: {},
  },
  outdoor: {
    'area-light': {
      'parking-lot': 'Parking Lot Lights',
      'street': 'Street Lights',
      'shoe-box': 'Shoe Box Lights',
    },
    flood: {
      'sports': 'Sports Flood Lights',
      'security': 'Security Flood Lights',
    },
    'wall-pack': {
      'full-cutoff': 'Full Cutoff Wall Packs',
      'semi-cutoff': 'Semi Cutoff Wall Packs',
    },
    canopy: {
      'gas-station': 'Gas Station Canopy Lights',
      'parking-garage': 'Parking Garage Lights',
    },
  },
  indoor: {
    'high-bay': {
      'ufo': 'UFO High Bay Lights',
      'linear': 'Linear High Bay Lights',
    },
    troffer: {
      '2x2': '2x2 LED Troffers',
      '2x4': '2x4 LED Troffers',
      'edge-lit': 'Edge-Lit LED Panels',
    },
  },
  retrofit: {
    tubes: {
      'type-a': 'Type A LED Tubes (Ballast Compatible)',
      'type-b': 'Type B LED Tubes (Direct Wire)',
      'type-ab': 'Type A+B Hybrid LED Tubes',
    },
  },
}

// Sample products
const sampleProducts = [
  { sku: 'SL-100W-AIO', name: 'Solar Street Light 100W All-in-One', price: 299, wattage: '100W', lumens: '12000lm', cct: '5000K', badge: 'Best Seller', inStock: true },
  { sku: 'SL-80W-AIO', name: 'Solar Street Light 80W All-in-One', price: 249, wattage: '80W', lumens: '9600lm', cct: '5000K', badge: 'DLC', inStock: true },
  { sku: 'SL-60W-AIO', name: 'Solar Street Light 60W All-in-One', price: 199, wattage: '60W', lumens: '7200lm', cct: '4000K', badge: null, inStock: true },
  { sku: 'SL-40W-AIO', name: 'Solar Street Light 40W All-in-One', price: 159, wattage: '40W', lumens: '4800lm', cct: '4000K', badge: 'New', inStock: true },
]

const filterOptions = {
  wattage: ['40W', '60W', '80W', '100W', '120W'],
  cct: ['3000K', '4000K', '5000K'],
  certification: ['DLC', 'UL', 'ETL'],
}

export default function TypePage() {
  const params = useParams()
  const category = params.category as string
  const subcategory = params.subcategory as string
  const type = params.type as string
  
  const [showFilters, setShowFilters] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1)
  const subcategoryTitle = subcategory.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  const typeTitle = typeConfig[category]?.[subcategory]?.[type] || type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  const toggleFilter = (group: string, value: string) => {
    setSelectedFilters(prev => {
      const current = prev[group] || []
      if (current.includes(value)) {
        return { ...prev, [group]: current.filter(v => v !== value) }
      }
      return { ...prev, [group]: [...current, value] }
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm flex-wrap">
              <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href={`/products/${category}`} className="text-gray-500 hover:text-gray-700">{categoryTitle}</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href={`/products/${category}/${subcategory}`} className="text-gray-500 hover:text-gray-700">{subcategoryTitle}</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">{typeTitle}</span>
            </nav>
          </div>
        </div>

        {/* Page Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-10">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl md:text-3xl font-bold">{typeTitle}</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Filters Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-4 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Filters</h2>
                  {Object.keys(selectedFilters).length > 0 && (
                    <button 
                      onClick={() => setSelectedFilters({})}
                      className="text-sm text-brand hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {Object.entries(filterOptions).map(([group, options]) => (
                  <div key={group} className="border-t pt-4">
                    <h3 className="font-medium mb-3 capitalize">{group}</h3>
                    <div className="space-y-2">
                      {options.map((option) => (
                        <label key={option} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedFilters[group]?.includes(option) || false}
                            onChange={() => toggleFilter(group, option)}
                            className="w-4 h-4 rounded border-gray-300 text-brand focus:ring-brand"
                          />
                          <span className="text-sm">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowFilters(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 border rounded-lg"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                  </button>
                  <p className="text-sm text-gray-600">{sampleProducts.length} products</p>
                </div>
                <div className="flex items-center gap-4">
                  <select className="border rounded-lg px-3 py-2 text-sm">
                    <option>Sort: Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest</option>
                  </select>
                  <div className="hidden md:flex border rounded-lg overflow-hidden">
                    <button className="p-2 bg-gray-100">
                      <Grid className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-50">
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleProducts.map((product) => (
                  <div key={product.sku} className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <Link href={`/products/${product.sku}`}>
                      <div className="aspect-square bg-gray-100 relative">
                        {product.badge && (
                          <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-medium rounded ${
                            product.badge === 'Best Seller' ? 'bg-brand text-black' :
                            product.badge === 'New' ? 'bg-green-500 text-white' :
                            'bg-blue-500 text-white'
                          }`}>
                            {product.badge}
                          </span>
                        )}
                        <div className="w-full h-full flex items-center justify-center">
                          <Lightbulb className="w-20 h-20 text-gray-300" />
                        </div>
                      </div>
                    </Link>
                    <div className="p-4">
                      <p className="text-xs text-gray-500 mb-1">{product.sku}</p>
                      <Link href={`/products/${product.sku}`}>
                        <h3 className="font-medium group-hover:text-brand transition-colors line-clamp-2">{product.name}</h3>
                      </Link>
                      
                      <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-600">
                        <span className="bg-gray-100 px-2 py-0.5 rounded">{product.wattage}</span>
                        <span className="bg-gray-100 px-2 py-0.5 rounded">{product.lumens}</span>
                        <span className="bg-gray-100 px-2 py-0.5 rounded">{product.cct}</span>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div>
                          <p className="text-xl font-bold">${product.price}</p>
                          <p className={`text-xs ${product.inStock ? 'text-green-600' : 'text-orange-600'}`}>
                            {product.inStock ? '✓ In Stock' : 'Ships in 3-5 days'}
                          </p>
                        </div>
                        <button className="p-2 bg-gray-900 hover:bg-brand text-white hover:text-black rounded-lg transition-colors">
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty state if no products */}
              {sampleProducts.length === 0 && (
                <div className="text-center py-16">
                  <Lightbulb className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters or browse other categories.</p>
                  <Link href={`/products/${category}/${subcategory}`} className="text-brand hover:underline">
                    ← Back to {subcategoryTitle}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {showFilters && (
          <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setShowFilters(false)}>
            <div 
              className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-lg">Filters</h2>
                <button onClick={() => setShowFilters(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {Object.entries(filterOptions).map(([group, options]) => (
                  <div key={group} className="border-t pt-4">
                    <h3 className="font-medium mb-3 capitalize">{group}</h3>
                    <div className="space-y-2">
                      {options.map((option) => (
                        <label key={option} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedFilters[group]?.includes(option) || false}
                            onChange={() => toggleFilter(group, option)}
                            className="w-4 h-4 rounded border-gray-300 text-brand focus:ring-brand"
                          />
                          <span className="text-sm">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-3">
                <button 
                  onClick={() => setShowFilters(false)}
                  className="w-full py-3 bg-brand text-black font-medium rounded-lg"
                >
                  Apply Filters
                </button>
                <button 
                  onClick={() => setSelectedFilters({})}
                  className="w-full py-3 border rounded-lg"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
