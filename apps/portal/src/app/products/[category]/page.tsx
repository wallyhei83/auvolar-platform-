'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { 
  ChevronRight, Sun, Building2, Lightbulb, Leaf, Zap,
  Loader2, ShoppingCart, Plus, Minus, Check, CheckCircle2, Clock
} from 'lucide-react'
import { productCategories, getMainCategory, getBcCategoryIds, type MainCategory } from '@/lib/product-categories'
import { products, getProductsByCategory } from '@/lib/product-data'

// Category icons
const categoryIcons: Record<string, any> = {
  indoor: Building2,
  outdoor: Sun,
  solar: Leaf,
  specialty: Zap,
}

interface BCProduct {
  id: number
  name: string
  sku: string
  price: number
  salePrice?: number
  inventory: number
  inStock: boolean
  images: { url: string; thumbnail: string; isPrimary: boolean }[]
}

export default function CategoryPage() {
  const params = useParams()
  const categorySlug = params.category as string
  
  // Check if this is a main category or a product SKU
  const mainCategory = getMainCategory(categorySlug)
  const localProduct = products[categorySlug]
  
  // If it's a local product SKU, render the PDP
  if (localProduct && !mainCategory) {
    return <LocalProductPage product={localProduct} />
  }
  
  // If it's not a recognized main category, show 404
  if (!mainCategory) {
    return <NotFoundPage slug={categorySlug} />
  }
  
  // Render the main category page
  return <MainCategoryPage mainCategory={mainCategory} />
}

// Main Category Page Component
function MainCategoryPage({ mainCategory }: { mainCategory: MainCategory }) {
  const [bcProducts, setBcProducts] = useState<BCProduct[]>([])
  const [loading, setLoading] = useState(true)
  
  const Icon = categoryIcons[mainCategory.slug] || Lightbulb
  const bcCategoryIds = getBcCategoryIds(mainCategory.slug)
  
  useEffect(() => {
    async function fetchProducts() {
      if (bcCategoryIds.length === 0) {
        setLoading(false)
        return
      }
      
      try {
        const res = await fetch(`/api/bigcommerce/products?category=${bcCategoryIds.join(',')}&limit=12`)
        const data = await res.json()
        setBcProducts(data.products || [])
      } catch (err) {
        console.error('Failed to fetch products:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [mainCategory.slug])
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/products" className="hover:text-gray-700">Products</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium text-gray-900">{mainCategory.name}</span>
          </nav>
        </div>
      </div>
      
      {/* Hero */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-brand/20 rounded-lg">
              <Icon className="w-8 h-8 text-brand" />
            </div>
            <h1 className="text-3xl font-bold">{mainCategory.name}</h1>
          </div>
          <p className="text-gray-300 max-w-2xl">{mainCategory.description}</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Subcategories Grid */}
        <h2 className="text-xl font-semibold mb-6">Browse by Type</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {mainCategory.subcategories.map((sub) => (
            <Link
              key={sub.id}
              href={`/products/${mainCategory.slug}/${sub.slug}`}
              className="group bg-white hover:bg-brand/5 border hover:border-brand rounded-lg p-5 transition-all"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg mb-3 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                <Lightbulb className="w-6 h-6 text-gray-400 group-hover:text-brand transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-brand transition-colors">
                {sub.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {sub.description}
              </p>
            </Link>
          ))}
        </div>
        
        {/* Featured Products from BigCommerce */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Featured {mainCategory.name}</h2>
          <div className="flex items-center gap-2 text-sm text-green-600">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Live from BigCommerce
          </div>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-brand" />
            <span className="ml-2 text-gray-600">Loading products...</span>
          </div>
        ) : bcProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bcProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <Lightbulb className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">Browse subcategories above to find products</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  )
}

// Product Card Component
function ProductCard({ product }: { product: BCProduct }) {
  const primaryImage = product.images.find(img => img.isPrimary)?.url || product.images[0]?.url
  
  return (
    <Link
      href={`/bc-products/${product.id}`}
      className="group bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-all"
    >
      <div className="aspect-square bg-gray-100 relative">
        {primaryImage ? (
          <img src={primaryImage} alt={product.name} className="w-full h-full object-contain p-4" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Lightbulb className="w-16 h-16 text-gray-300" />
          </div>
        )}
        <div className="absolute top-2 left-2">
          {product.inStock ? (
            <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded">IN STOCK</span>
          ) : (
            <span className="px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded">PRE-ORDER</span>
          )}
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{product.sku}</p>
        <h3 className="font-semibold text-gray-900 group-hover:text-brand transition-colors line-clamp-2">
          {product.name}
        </h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          {product.salePrice && product.salePrice < product.price && (
            <span className="text-sm text-gray-400 line-through">${product.salePrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  )
}

// Local Product Page (for existing mock products)
function LocalProductPage({ product }: { product: any }) {
  // Import the existing PDP component logic
  const [quantity, setQuantity] = useState(1)
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Simplified PDP - redirect to full implementation */}
        <div className="text-center py-12">
          <Lightbulb className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">SKU: {product.sku}</p>
          <p className="text-3xl font-bold text-brand mb-4">${product.price}</p>
          <p className="text-gray-500">This product uses mock data. BigCommerce integration coming soon.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

// Not Found Page
function NotFoundPage({ slug }: { slug: string }) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-16 text-center">
        <Lightbulb className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
        <p className="text-gray-600 mb-8">The category "{slug}" does not exist.</p>
        <Link href="/products" className="text-brand hover:underline">
          ← Browse All Products
        </Link>
      </main>
      <Footer />
    </div>
  )
}

// Required for useState
import { useState } from 'react'
