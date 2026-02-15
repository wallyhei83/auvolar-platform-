'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { 
  ChevronRight, Filter, Grid3X3, List, Zap, Shield, Truck, 
  ChevronDown, X, Plus, Minus, Loader2
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { BCProductGrid } from '@/components/products/bc-product-grid'

// Filter options
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
      { value: '200+', label: '200W+' },
    ]
  },
}

function ProductsContent() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [expandedFilters, setExpandedFilters] = useState<string[]>(['category', 'wattage'])

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
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Live from BigCommerce
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
            <span className="flex items-center gap-1.5 text-gray-600">
              <Truck className="h-4 w-4 text-brand" />
              Free Shipping $500+
            </span>
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

              {/* Active filters */}
              {activeFilterCount > 0 && (
                <div className="hidden items-center gap-2 lg:flex">
                  {Object.entries(selectedFilters).flatMap(([cat, values]) =>
                    values.map(value => (
                      <button
                        key={`${cat}-${value}`}
                        onClick={() => toggleFilter(cat, value)}
                        className="flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200"
                      >
                        {filterOptions[cat as keyof typeof filterOptions]?.options.find(o => o.value === value)?.label}
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
              <select className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand">
                <option>Sort: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
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
            <BCProductGrid categoryFilter={category || undefined} limit={20} showCategories={true} />
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

export default function ProductsPage() {
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
