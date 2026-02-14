'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { 
  ChevronRight, Filter, Grid3X3, List, SlidersHorizontal, X,
  Zap, Shield, Truck, ChevronDown, Search, Plus, Minus
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

// Filter options based on planning document
const filterOptions = {
  category: {
    label: 'Category',
    options: [
      { value: 'high-bay', label: 'High Bay Lights' },
      { value: 'linear-high-bay', label: 'Linear High Bay' },
      { value: 'wall-pack', label: 'Wall Packs' },
      { value: 'area-light', label: 'Area Lights' },
      { value: 'flood', label: 'Flood Lights' },
      { value: 'troffer', label: 'Troffers & Panels' },
      { value: 'tubes', label: 'LED Tubes' },
      { value: 'vapor-tight', label: 'Vapor Tight' },
      { value: 'canopy', label: 'Canopy Lights' },
    ]
  },
  wattage: {
    label: 'Wattage',
    options: [
      { value: '0-50', label: 'Under 50W' },
      { value: '50-100', label: '50W - 100W' },
      { value: '100-150', label: '100W - 150W' },
      { value: '150-200', label: '150W - 200W' },
      { value: '200-300', label: '200W - 300W' },
      { value: '300+', label: '300W+' },
    ]
  },
  cct: {
    label: 'Color Temperature',
    options: [
      { value: '3000', label: '3000K (Warm)' },
      { value: '4000', label: '4000K (Neutral)' },
      { value: '5000', label: '5000K (Daylight)' },
      { value: 'selectable', label: 'CCT Selectable' },
    ]
  },
  voltage: {
    label: 'Voltage',
    options: [
      { value: '120-277', label: '120-277V' },
      { value: '277-480', label: '277-480V' },
      { value: '347-480', label: '347-480V' },
    ]
  },
  certification: {
    label: 'Certification',
    options: [
      { value: 'dlc', label: 'DLC Listed' },
      { value: 'ul', label: 'UL Listed' },
      { value: 'etl', label: 'ETL Listed' },
    ]
  },
  mounting: {
    label: 'Mounting',
    options: [
      { value: 'hook', label: 'Hook Mount' },
      { value: 'chain', label: 'Chain Mount' },
      { value: 'pendant', label: 'Pendant Mount' },
      { value: 'surface', label: 'Surface Mount' },
      { value: 'arm', label: 'Arm Mount' },
    ]
  },
  stock: {
    label: 'Availability',
    options: [
      { value: 'in-stock', label: 'In Stock' },
      { value: 'ships-soon', label: 'Ships in 3-5 days' },
    ]
  }
}

// Sort options
const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'best-seller', label: 'Best Sellers' },
  { value: 'wattage', label: 'Wattage' },
]

// Mock products data
const mockProducts = [
  {
    id: '1',
    name: 'UFO High Bay Light',
    sku: 'HB-UFO-150W-5K',
    category: 'High Bay',
    wattage: 150,
    lumens: 22500,
    cct: '5000K',
    voltage: '120-277V',
    price: 89,
    msrp: 129,
    stock: 'In Stock',
    stockQty: 245,
    dlc: true,
    ul: true,
    warranty: '5 Year',
    description: 'Commercial UFO high bay for warehouses, gyms, and manufacturing',
    beam: '120°',
  },
  {
    id: '2',
    name: 'UFO High Bay Light',
    sku: 'HB-UFO-200W-5K',
    category: 'High Bay',
    wattage: 200,
    lumens: 30000,
    cct: '5000K',
    voltage: '120-277V',
    price: 109,
    msrp: 159,
    stock: 'In Stock',
    stockQty: 180,
    dlc: true,
    ul: true,
    warranty: '5 Year',
    description: 'Commercial UFO high bay for large warehouses and industrial',
    beam: '120°',
  },
  {
    id: '3',
    name: 'UFO High Bay Light',
    sku: 'HB-UFO-240W-5K',
    category: 'High Bay',
    wattage: 240,
    lumens: 36000,
    cct: '5000K',
    voltage: '120-277V',
    price: 139,
    msrp: 199,
    stock: 'In Stock',
    stockQty: 92,
    dlc: true,
    ul: true,
    warranty: '5 Year',
    description: 'High output UFO for very high ceilings',
    beam: '90°',
  },
  {
    id: '4',
    name: 'Linear High Bay',
    sku: 'LHB-220W-5K',
    category: 'Linear High Bay',
    wattage: 220,
    lumens: 33000,
    cct: '5000K',
    voltage: '120-277V',
    price: 129,
    msrp: 179,
    stock: 'In Stock',
    stockQty: 156,
    dlc: true,
    ul: true,
    warranty: '5 Year',
    description: 'Linear high bay for aisles and open floor plans',
    beam: '120°',
  },
  {
    id: '5',
    name: 'Wall Pack',
    sku: 'WP-50W-5K',
    category: 'Wall Pack',
    wattage: 50,
    lumens: 7000,
    cct: '5000K',
    voltage: '120-277V',
    price: 59,
    msrp: 89,
    stock: 'In Stock',
    stockQty: 320,
    dlc: true,
    ul: true,
    warranty: '5 Year',
    description: 'Full cutoff wall pack for building perimeter',
    beam: 'Full Cutoff',
  },
  {
    id: '6',
    name: 'Wall Pack',
    sku: 'WP-80W-5K',
    category: 'Wall Pack',
    wattage: 80,
    lumens: 11200,
    cct: '5000K',
    voltage: '120-277V',
    price: 79,
    msrp: 119,
    stock: 'In Stock',
    stockQty: 210,
    dlc: true,
    ul: true,
    warranty: '5 Year',
    description: 'Full cutoff wall pack for larger areas',
    beam: 'Full Cutoff',
  },
  {
    id: '7',
    name: 'Area Light Type III',
    sku: 'AL-150W-T3-5K',
    category: 'Area Light',
    wattage: 150,
    lumens: 21000,
    cct: '5000K',
    voltage: '120-277V',
    price: 149,
    msrp: 229,
    stock: 'Ships in 3 days',
    stockQty: 0,
    dlc: true,
    ul: true,
    warranty: '10 Year',
    description: 'Parking lot area light with Type III distribution',
    beam: 'Type III',
  },
  {
    id: '8',
    name: 'Area Light Type V',
    sku: 'AL-200W-T5-5K',
    category: 'Area Light',
    wattage: 200,
    lumens: 28000,
    cct: '5000K',
    voltage: '120-277V',
    price: 179,
    msrp: 269,
    stock: 'In Stock',
    stockQty: 45,
    dlc: true,
    ul: true,
    warranty: '10 Year',
    description: 'Parking lot area light with Type V distribution',
    beam: 'Type V',
  },
  {
    id: '9',
    name: '4ft LED Tube T8',
    sku: 'T8-4FT-18W-5K',
    category: 'LED Tubes',
    wattage: 18,
    lumens: 2200,
    cct: '5000K',
    voltage: '120-277V',
    price: 8,
    msrp: 15,
    stock: 'In Stock',
    stockQty: 2500,
    dlc: false,
    ul: true,
    warranty: '5 Year',
    description: 'Type A+B T8 LED tube, ballast bypass compatible',
    beam: '220°',
  },
  {
    id: '10',
    name: '2x4 LED Troffer',
    sku: 'TF-2x4-40W-4K',
    category: 'Troffer',
    wattage: 40,
    lumens: 5000,
    cct: '4000K',
    voltage: '120-277V',
    price: 69,
    msrp: 99,
    stock: 'In Stock',
    stockQty: 180,
    dlc: true,
    ul: true,
    warranty: '5 Year',
    description: 'Drop ceiling troffer for office and commercial',
    beam: 'Wide',
  },
  {
    id: '11',
    name: 'Vapor Tight 4ft',
    sku: 'VT-4FT-40W-5K',
    category: 'Vapor Tight',
    wattage: 40,
    lumens: 5200,
    cct: '5000K',
    voltage: '120-277V',
    price: 49,
    msrp: 79,
    stock: 'In Stock',
    stockQty: 290,
    dlc: true,
    ul: true,
    warranty: '5 Year',
    description: 'IP65 vapor tight for wet and dusty locations',
    beam: '120°',
  },
  {
    id: '12',
    name: 'Canopy Light',
    sku: 'CN-75W-5K',
    category: 'Canopy',
    wattage: 75,
    lumens: 9750,
    cct: '5000K',
    voltage: '120-277V',
    price: 89,
    msrp: 139,
    stock: 'In Stock',
    stockQty: 125,
    dlc: true,
    ul: true,
    warranty: '5 Year',
    description: 'Surface mount canopy for gas stations and covered areas',
    beam: '120°',
  },
]

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState(mockProducts)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [sortBy, setSortBy] = useState('relevance')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [expandedFilters, setExpandedFilters] = useState<string[]>(['category', 'wattage', 'certification'])
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  const toggleFilter = (category: string, value: string) => {
    setSelectedFilters(prev => {
      const current = prev[category] || []
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter(v => v !== value) }
      }
      return { ...prev, [category]: [...current, value] }
    })
  }

  const clearFilters = () => {
    setSelectedFilters({})
  }

  const toggleFilterSection = (section: string) => {
    setExpandedFilters(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  const updateQuantity = (productId: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + delta)
    }))
  }

  const activeFilterCount = Object.values(selectedFilters).flat().length

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-gray-900">All Products</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">LED Lighting Products</h1>
              <p className="mt-1 text-gray-600">
                Commercial & industrial LED lighting solutions • DLC & UL Listed • Ships in 24h
              </p>
            </div>
            <div className="hidden items-center gap-4 sm:flex">
              <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-1.5 text-sm text-green-700">
                <Truck className="h-4 w-4" />
                In-stock ships in 24h
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-gray-600">
              <Shield className="h-4 w-4 text-brand" />
              DLC & UL Listed
            </span>
            <span className="flex items-center gap-1.5 text-gray-600">
              <Zap className="h-4 w-4 text-brand" />
              5-10 Year Warranty
            </span>
            <Link href="/login" className="font-medium text-brand hover:underline">
              Log in for Contractor Pricing →
            </Link>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-[104px] z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile filter toggle */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium lg:hidden"
              >
                <Filter className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-xs font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Results count */}
              <span className="text-sm text-gray-600">
                {products.length} products
              </span>

              {/* Active filters */}
              {activeFilterCount > 0 && (
                <div className="hidden items-center gap-2 lg:flex">
                  {Object.entries(selectedFilters).flatMap(([category, values]) =>
                    values.map(value => (
                      <button
                        key={`${category}-${value}`}
                        onClick={() => toggleFilter(category, value)}
                        className="flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200"
                      >
                        {filterOptions[category as keyof typeof filterOptions]?.options.find(o => o.value === value)?.label}
                        <X className="h-3 w-3" />
                      </button>
                    ))
                  )}
                  <button
                    onClick={clearFilters}
                    className="text-xs font-medium text-brand hover:underline"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <div className="flex items-center gap-2">
                <label className="hidden text-sm text-gray-600 sm:block">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              {/* View mode */}
              <div className="hidden items-center gap-1 rounded-lg border border-gray-300 p-1 sm:flex">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`rounded p-1.5 ${viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`rounded p-1.5 ${viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-[160px] space-y-4">
              {Object.entries(filterOptions).map(([key, filter]) => (
                <div key={key} className="rounded-lg border border-gray-200 bg-white">
                  <button
                    onClick={() => toggleFilterSection(key)}
                    className="flex w-full items-center justify-between p-4 text-left"
                  >
                    <span className="font-medium text-gray-900">{filter.label}</span>
                    {expandedFilters.includes(key) ? (
                      <Minus className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Plus className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                  {expandedFilters.includes(key) && (
                    <div className="border-t border-gray-100 p-4 pt-0">
                      <div className="space-y-2 pt-3">
                        {filter.options.map(option => (
                          <label
                            key={option.value}
                            className="flex cursor-pointer items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              checked={selectedFilters[key]?.includes(option.value) || false}
                              onChange={() => toggleFilter(key, option.value)}
                              className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
                            />
                            <span className="text-sm text-gray-700">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className={`grid gap-4 ${viewMode === 'grid' ? 'sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`group rounded-xl border border-gray-200 bg-white transition-all hover:border-brand hover:shadow-lg ${
                    viewMode === 'list' ? 'flex gap-4' : ''
                  }`}
                >
                  {/* Product Image */}
                  <Link
                    href={`/products/${product.sku}`}
                    className={`block ${viewMode === 'list' ? 'w-48 shrink-0' : ''}`}
                  >
                    <div className={`relative ${viewMode === 'list' ? 'h-full' : 'aspect-square'} rounded-t-xl bg-gradient-to-br from-gray-100 to-gray-50 ${viewMode === 'list' ? 'rounded-l-xl rounded-tr-none' : ''}`}>
                      <div className="flex h-full items-center justify-center">
                        <Zap className="h-16 w-16 text-gray-300" />
                      </div>
                      {/* Badges */}
                      <div className="absolute left-3 top-3 flex flex-col gap-1">
                        {product.dlc && (
                          <span className="rounded bg-green-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                            DLC
                          </span>
                        )}
                        {product.stock === 'In Stock' && (
                          <span className="rounded bg-blue-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                            IN STOCK
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className={`flex flex-col p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <Link href={`/products/${product.sku}`}>
                      <h3 className="font-semibold text-gray-900 group-hover:text-brand">
                        {product.name} {product.wattage}W
                      </h3>
                      <p className="mt-0.5 text-xs text-gray-500">{product.sku}</p>
                    </Link>

                    {/* Key Specs */}
                    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-600">
                      <span>{product.lumens.toLocaleString()} lm</span>
                      <span>{product.cct}</span>
                      <span>{product.voltage}</span>
                      <span>{product.beam}</span>
                    </div>

                    {/* Price & Stock */}
                    <div className="mt-3 flex items-end justify-between">
                      <div>
                        <div className="text-lg font-bold text-gray-900">
                          ${product.price}
                        </div>
                        <div className="text-xs text-gray-500 line-through">
                          MSRP ${product.msrp}
                        </div>
                      </div>
                      <div className={`text-xs font-medium ${product.stock === 'In Stock' ? 'text-green-600' : 'text-amber-600'}`}>
                        {product.stock}
                      </div>
                    </div>

                    {/* Quick Add */}
                    <div className="mt-4 flex items-center gap-2">
                      <div className="flex items-center rounded border border-gray-300">
                        <button
                          onClick={() => updateQuantity(product.id, -1)}
                          className="px-2 py-1.5 text-gray-600 hover:bg-gray-50"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm">
                          {quantities[product.id] || 1}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          className="px-2 py-1.5 text-gray-600 hover:bg-gray-50"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button className="flex-1 rounded-lg bg-brand py-2 text-sm font-semibold text-black hover:bg-brand-dark">
                        Add to Cart
                      </button>
                    </div>

                    {/* Secondary Actions */}
                    <div className="mt-2 flex gap-2 text-xs">
                      <button className="text-gray-500 hover:text-brand">
                        + Compare
                      </button>
                      <button className="text-gray-500 hover:text-brand">
                        Request Quote
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination placeholder */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
                Previous
              </button>
              <button className="rounded-lg bg-brand px-4 py-2 text-sm font-bold text-black">1</button>
              <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">2</button>
              <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">3</button>
              <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
          <div className="fixed bottom-0 left-0 right-0 top-0 w-full max-w-sm bg-white">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-gray-200 p-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {Object.entries(filterOptions).map(([key, filter]) => (
                  <div key={key} className="border-b border-gray-100 py-4">
                    <button
                      onClick={() => toggleFilterSection(key)}
                      className="flex w-full items-center justify-between text-left"
                    >
                      <span className="font-medium text-gray-900">{filter.label}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${expandedFilters.includes(key) ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedFilters.includes(key) && (
                      <div className="mt-3 space-y-2">
                        {filter.options.map(option => (
                          <label
                            key={option.value}
                            className="flex cursor-pointer items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              checked={selectedFilters[key]?.includes(option.value) || false}
                              onChange={() => toggleFilter(key, option.value)}
                              className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
                            />
                            <span className="text-sm text-gray-700">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 p-4">
                <div className="flex gap-3">
                  <button
                    onClick={clearFilters}
                    className="flex-1 rounded-lg border border-gray-300 py-3 font-medium"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="flex-1 rounded-lg bg-brand py-3 font-semibold text-black"
                  >
                    Show Results
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
