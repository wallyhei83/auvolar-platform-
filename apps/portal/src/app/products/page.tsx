'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { 
  ChevronRight, Sun, Building2, Lightbulb, Leaf, Zap, Check,
  Filter, Grid, List, Loader2
} from 'lucide-react'
import { productCategories, type MainCategory, type ProductCategory } from '@/lib/product-categories'

// Category icons
const categoryIcons: Record<string, any> = {
  indoor: Building2,
  outdoor: Sun,
  solar: Leaf,
  specialty: Zap,
}

export default function ProductsPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<{ total: number; categories: number }>({ total: 0, categories: 0 })

  useEffect(() => {
    // Fetch product stats from BC
    async function fetchStats() {
      try {
        const res = await fetch('/api/bigcommerce/test')
        const data = await res.json()
        if (data.stats) {
          setStats({
            total: data.stats.total_products || 0,
            categories: data.stats.total_categories || 0,
          })
        }
      } catch (err) {
        console.error('Failed to fetch stats:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

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
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">LED Lighting Products</h1>
              <p className="mt-2 text-gray-600 max-w-2xl">
                Commercial & industrial LED lighting solutions • DLC & UL Listed • Ships in 24h
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
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
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Live from BigCommerce
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Categories Grid */}
        <div className="space-y-12">
          {productCategories.map((mainCat) => {
            const Icon = categoryIcons[mainCat.slug] || Lightbulb
            
            return (
              <section key={mainCat.id} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-brand/10 rounded-lg">
                    <Icon className="w-7 h-7 text-brand" />
                  </div>
                  <div>
                    <Link 
                      href={`/products/${mainCat.slug}`}
                      className="text-2xl font-bold text-gray-900 hover:text-brand transition-colors"
                    >
                      {mainCat.name}
                    </Link>
                    <p className="text-gray-500">{mainCat.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {mainCat.subcategories.map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/products/${mainCat.slug}/${sub.slug}`}
                      className="group bg-white border hover:border-brand rounded-xl overflow-hidden transition-all hover:shadow-lg"
                    >
                      <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                        {sub.image ? (
                          <img 
                            src={sub.image} 
                            alt={sub.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Lightbulb className="w-12 h-12 text-gray-300" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 group-hover:text-brand transition-colors">
                          {sub.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {sub.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t">
                  <Link 
                    href={`/products/${mainCat.slug}`}
                    className="text-brand hover:underline font-medium text-sm"
                  >
                    View all {mainCat.name} →
                  </Link>
                </div>
              </section>
            )
          })}
        </div>

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-white rounded-xl shadow-sm">
          <div className="text-center">
            <p className="text-3xl font-bold text-brand">5-10</p>
            <p className="text-sm text-gray-600">Year Warranty</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-brand">24h</p>
            <p className="text-sm text-gray-600">In-Stock Shipping</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-brand">DLC/UL</p>
            <p className="text-sm text-gray-600">Certified Products</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-brand">Net 30</p>
            <p className="text-sm text-gray-600">Terms Available</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
