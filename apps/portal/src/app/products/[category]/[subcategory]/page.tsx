'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { 
  ChevronRight, ChevronDown, Filter, Grid, List, X,
  Lightbulb, Check, ShoppingCart
} from 'lucide-react'

// Subcategory configuration
const subcategoryConfig: Record<string, Record<string, {
  title: string
  description: string
  types?: { name: string; slug: string; count: number }[]
}>> = {
  solar: {
    street: {
      title: 'Solar Street Lights',
      description: 'All-in-one and split-type solar street lights for roadways, pathways, and parking areas.',
      types: [
        { name: 'All-in-One Solar', slug: 'all-in-one', count: 8 },
        { name: 'Split Type Solar', slug: 'split', count: 6 },
      ]
    },
    flood: {
      title: 'Solar Flood Lights',
      description: 'Solar-powered flood lights for security, landscape, and area lighting.',
    },
    garden: {
      title: 'Solar Garden Lights',
      description: 'Decorative solar lights for gardens, pathways, and landscape features.',
    },
    wall: {
      title: 'Solar Wall Lights',
      description: 'Solar wall-mounted lights for building perimeters and entrances.',
    },
  },
  outdoor: {
    'area-light': {
      title: 'Area Lights',
      description: 'LED area lights for parking lots, streets, and commercial properties.',
      types: [
        { name: 'Parking Lot Lights', slug: 'parking-lot', count: 12 },
        { name: 'Street Lights', slug: 'street', count: 8 },
        { name: 'Shoe Box Lights', slug: 'shoe-box', count: 6 },
      ]
    },
    flood: {
      title: 'Flood Lights',
      description: 'High-power LED flood lights for sports, security, and landscape.',
      types: [
        { name: 'Sports Flood Lights', slug: 'sports', count: 10 },
        { name: 'Security Flood Lights', slug: 'security', count: 8 },
      ]
    },
    'wall-pack': {
      title: 'Wall Pack Lights',
      description: 'LED wall packs for building perimeter and security lighting.',
      types: [
        { name: 'Full Cutoff', slug: 'full-cutoff', count: 14 },
        { name: 'Semi Cutoff', slug: 'semi-cutoff', count: 10 },
      ]
    },
    canopy: {
      title: 'Canopy Lights',
      description: 'LED canopy lights for gas stations, parking garages, and covered areas.',
      types: [
        { name: 'Gas Station Canopy', slug: 'gas-station', count: 8 },
        { name: 'Parking Garage', slug: 'parking-garage', count: 6 },
      ]
    },
    bollard: {
      title: 'Bollard Lights',
      description: 'LED bollard lights for pathways, landscaping, and architectural accent.',
    },
    'post-top': {
      title: 'Post Top Lights',
      description: 'Decorative LED post top lights for streets, parks, and campuses.',
    },
  },
  indoor: {
    'high-bay': {
      title: 'High Bay Lights',
      description: 'LED high bay lights for warehouses, manufacturing, and gyms.',
      types: [
        { name: 'UFO High Bay', slug: 'ufo', count: 16 },
        { name: 'Linear High Bay', slug: 'linear', count: 12 },
      ]
    },
    troffer: {
      title: 'Troffers & Panels',
      description: 'LED troffers and flat panels for offices, retail, and healthcare.',
      types: [
        { name: '2x2 Troffers', slug: '2x2', count: 10 },
        { name: '2x4 Troffers', slug: '2x4', count: 12 },
        { name: 'Edge-Lit Panels', slug: 'edge-lit', count: 8 },
      ]
    },
    strip: {
      title: 'Strip Lights',
      description: 'LED strip fixtures for industrial and commercial applications.',
    },
    wrap: {
      title: 'Wrap Fixtures',
      description: 'LED wrap-around fixtures for offices, schools, and healthcare.',
    },
    'vapor-tight': {
      title: 'Vapor Tight Lights',
      description: 'Sealed LED fixtures for wet and harsh environments.',
    },
  },
  retrofit: {
    tubes: {
      title: 'LED Tubes',
      description: 'T8 and T5 LED tubes to replace fluorescent lamps.',
      types: [
        { name: 'Type A (Ballast Compatible)', slug: 'type-a', count: 8 },
        { name: 'Type B (Direct Wire)', slug: 'type-b', count: 10 },
        { name: 'Type A+B (Hybrid)', slug: 'type-ab', count: 6 },
      ]
    },
    kits: {
      title: 'Retrofit Kits',
      description: 'LED retrofit kits to upgrade existing fixtures.',
    },
    'corn-bulb': {
      title: 'Corn Bulbs',
      description: 'LED corn bulbs for HID fixture replacement.',
    },
    'pl-lamp': {
      title: 'PL Lamps',
      description: 'LED PL lamps for CFL replacement.',
    },
  },
  controls: {
    occupancy: {
      title: 'Occupancy Sensors',
      description: 'Motion and occupancy sensors for automatic lighting control.',
    },
    photocell: {
      title: 'Photocells',
      description: 'Dusk-to-dawn photocells for outdoor lighting.',
    },
    dimmer: {
      title: 'Dimmers',
      description: '0-10V and TRIAC dimmers for LED lighting.',
    },
    smart: {
      title: 'Smart Controls',
      description: 'IoT and smart building lighting controls.',
    },
  },
}

// Sample products
const sampleProducts = [
  { sku: 'SL-100W-AIO', name: 'Solar Street Light 100W All-in-One', price: 299, wattage: '100W', lumens: '12000lm', cct: '5000K', badge: 'Best Seller', inStock: true },
  { sku: 'SL-80W-AIO', name: 'Solar Street Light 80W All-in-One', price: 249, wattage: '80W', lumens: '9600lm', cct: '5000K', badge: 'DLC', inStock: true },
  { sku: 'SL-60W-AIO', name: 'Solar Street Light 60W All-in-One', price: 199, wattage: '60W', lumens: '7200lm', cct: '4000K', badge: null, inStock: true },
  { sku: 'SL-40W-AIO', name: 'Solar Street Light 40W All-in-One', price: 159, wattage: '40W', lumens: '4800lm', cct: '4000K', badge: 'New', inStock: true },
  { sku: 'SL-120W-SP', name: 'Solar Street Light 120W Split', price: 349, wattage: '120W', lumens: '14400lm', cct: '5000K', badge: 'DLC', inStock: false },
  { sku: 'SL-80W-SP', name: 'Solar Street Light 80W Split', price: 279, wattage: '80W', lumens: '9600lm', cct: '5000K', badge: null, inStock: true },
]

// Filter options
const filterOptions = {
  wattage: ['20W', '40W', '60W', '80W', '100W', '120W', '150W', '200W'],
  cct: ['3000K', '4000K', '5000K'],
  mounting: ['Pole Mount', 'Wall Mount', 'Ground Mount'],
  certification: ['DLC', 'UL', 'ETL', 'Energy Star'],
}

export default function SubcategoryPage() {
  const params = useParams()
  const category = params.category as string
  const subcategory = params.subcategory as string
  
  const [showFilters, setShowFilters] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1)
  const config = subcategoryConfig[category]?.[subcategory]

  if (!config) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Subcategory Not Found</h1>
          <p className="text-gray-600 mb-8">The subcategory "{subcategory}" does not exist in {categoryTitle}.</p>
          <Link href={`/products/${category}`} className="text-brand hover:underline">
            ← Back to {categoryTitle}
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

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
              <span className="text-gray-900 font-medium">{config.title}</span>
            </nav>
          </div>
        </div>

        {/* Category Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-10">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{config.title}</h1>
            <p className="text-gray-300">{config.description}</p>
          </div>
        </div>

        {/* Types Grid (if available) */}
        {config.types && config.types.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 py-6 border-b">
            <div className="flex gap-3 overflow-x-auto pb-2">
              <Link
                href={`/products/${category}/${subcategory}`}
                className="px-4 py-2 bg-brand text-black rounded-full text-sm font-medium whitespace-nowrap"
              >
                All ({config.types.reduce((a, b) => a + b.count, 0)})
              </Link>
              {config.types.map((type) => (
                <Link
                  key={type.slug}
                  href={`/products/${category}/${subcategory}/${type.slug}`}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
                >
                  {type.name} ({type.count})
                </Link>
              ))}
            </div>
          </div>
        )}

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
                    <option>Best Selling</option>
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
