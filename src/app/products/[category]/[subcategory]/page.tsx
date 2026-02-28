'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { 
  ChevronRight, Sun, Building2, Lightbulb, Leaf, Zap,
  Loader2, ShoppingCart, Plus, Minus, Check, CheckCircle2, Clock,
  Grid, List, Filter
} from 'lucide-react'
import { getMainCategory, getSubcategory, type ProductCategory } from '@/lib/product-categories'

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
  slug: string
  price: number
  salePrice?: number
  msrp?: number
  inventory: number
  inStock: boolean
  images: { url: string; thumbnail: string; isPrimary: boolean }[]
  variants?: { id: number; sku: string; options: { name: string; value: string }[] }[]
}

export default function SubcategoryPage() {
  const params = useParams()
  const categorySlug = params.category as string
  const subcategorySlug = params.subcategory as string
  
  const mainCategory = getMainCategory(categorySlug)
  const subcategory = getSubcategory(categorySlug, subcategorySlug)
  
  const [products, setProducts] = useState<BCProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('featured')
  
  useEffect(() => {
    async function fetchProducts() {
      if (!subcategory) {
        setLoading(false)
        return
      }
      
      try {
        const bcIds = subcategory.bcCategoryIds.join(',')
        const res = await fetch(`/api/bigcommerce/products?category=${bcIds}&limit=250`)
        const data = await res.json()
        setProducts(data.products || [])
      } catch (err) {
        console.error('Failed to fetch products:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [categorySlug, subcategorySlug])
  
  // Not found
  if (!mainCategory || !subcategory) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-16 text-center">
          <Lightbulb className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h1 className="text-2xl font-bold mb-4">Subcategory Not Found</h1>
          <p className="text-gray-600 mb-8">The subcategory "{subcategorySlug}" does not exist in {categorySlug}.</p>
          <Link href={`/products/${categorySlug}`} className="text-brand hover:underline">
            ← Back to {mainCategory?.name || 'Products'}
          </Link>
        </main>
        <Footer />
      </div>
    )
  }
  
  const Icon = categoryIcons[categorySlug] || Lightbulb
  
  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price
      case 'price-high': return b.price - a.price
      case 'name': return a.name.localeCompare(b.name)
      default: return 0
    }
  })
  
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
            <Link href={`/products/${categorySlug}`} className="hover:text-gray-700">{mainCategory.name}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium text-gray-900">{subcategory.name}</span>
          </nav>
        </div>
      </div>
      
      {/* Hero */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-brand/20 rounded-lg">
              <Icon className="w-6 h-6 text-brand" />
            </div>
            <h1 className="text-2xl font-bold">{subcategory.name}</h1>
          </div>
          <p className="text-gray-300 max-w-2xl">{subcategory.description}</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Toolbar */}
        <div className="bg-white rounded-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="text-gray-600">
              <span className="font-semibold">{products.length}</span> products
            </p>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Live from BigCommerce
            </div>
          </div>
          
          <div className="flex items-center gap-4">
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
            
            <div className="flex border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-brand text-black' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-brand text-black' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Products */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-brand" />
            <span className="ml-2 text-gray-600">Loading products...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <Lightbulb className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h2 className="text-lg font-medium text-gray-900 mb-2">No Products Found</h2>
            <p className="text-gray-500 mb-4">We're adding more products to this category soon.</p>
            <Link href={`/products/${categorySlug}`} className="text-brand hover:underline">
              ← Back to {mainCategory.name}
            </Link>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedProducts.map((product) => (
              <ProductListItem key={product.id} product={product} />
            ))}
          </div>
        )}
        
        {/* Related Categories */}
        {mainCategory.subcategories.length > 1 && (
          <div className="mt-12 pt-8 border-t">
            <h2 className="text-lg font-semibold mb-4">Related Categories</h2>
            <div className="flex flex-wrap gap-3">
              {mainCategory.subcategories
                .filter(s => s.slug !== subcategorySlug)
                .slice(0, 5)
                .map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/products/${categorySlug}/${sub.slug}`}
                    className="px-4 py-2 bg-white border rounded-lg hover:border-brand hover:text-brand transition-colors"
                  >
                    {sub.name}
                  </Link>
                ))}
            </div>
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
  const hasVariants = product.variants && product.variants.length > 1
  
  return (
    <Link
      href={product.slug ? `/p/${product.slug}` : `/bc-products?id=${product.id}`}
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
        <p className="text-xs text-gray-500 mb-1 font-mono">{product.sku}</p>
        <h3 className="font-semibold text-gray-900 group-hover:text-brand transition-colors line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        {hasVariants && (
          <p className="text-xs text-gray-500 mt-1">{product.variants!.length} options available</p>
        )}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          {product.msrp && product.msrp > product.price && (
            <span className="text-sm text-gray-400 line-through">${product.msrp.toFixed(2)}</span>
          )}
        </div>
        <div className="mt-2 flex items-center gap-1 text-xs">
          {product.inStock ? (
            <>
              <CheckCircle2 className="w-3 h-3 text-green-500" />
              <span className="text-green-600">
                {product.inventory > 0 ? `${product.inventory} in stock` : 'In Stock'}
              </span>
            </>
          ) : (
            <>
              <Clock className="w-3 h-3 text-orange-500" />
              <span className="text-orange-600">Ships in 5-7 days</span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}

// Product List Item Component
function ProductListItem({ product }: { product: BCProduct }) {
  const primaryImage = product.images.find(img => img.isPrimary)?.url || product.images[0]?.url
  
  return (
    <Link
      href={product.slug ? `/p/${product.slug}` : `/bc-products?id=${product.id}`}
      className="group flex bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-all"
    >
      <div className="w-48 h-48 bg-gray-100 flex-shrink-0 relative">
        {primaryImage ? (
          <img src={primaryImage} alt={product.name} className="w-full h-full object-contain p-4" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Lightbulb className="w-12 h-12 text-gray-300" />
          </div>
        )}
      </div>
      <div className="flex-1 p-4 flex flex-col">
        <p className="text-xs text-gray-500 font-mono">{product.sku}</p>
        <h3 className="font-semibold text-gray-900 group-hover:text-brand transition-colors text-lg">
          {product.name}
        </h3>
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
            {product.msrp && product.msrp > product.price && (
              <span className="text-sm text-gray-400 line-through">${product.msrp.toFixed(2)}</span>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm">
            {product.inStock ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-green-600">In Stock</span>
              </>
            ) : (
              <>
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="text-orange-600">5-7 day lead</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
// Deploy trigger 1771147619
