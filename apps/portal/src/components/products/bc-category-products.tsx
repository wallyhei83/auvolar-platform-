'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Lightbulb, ShoppingCart, Filter, Grid, List, 
  ChevronDown, Package, CheckCircle2, Clock 
} from 'lucide-react'

interface BCProduct {
  id: number
  name: string
  sku: string
  slug: string
  price: number
  salePrice: number
  msrp: number
  shortDescription: string
  inventory: number
  inStock: boolean
  primaryImage: string | null
  images: { url: string; thumbnail: string }[]
  variants: {
    id: number
    sku: string
    options: { name: string; value: string }[]
  }[]
}

interface CategoryProductsProps {
  categorySlug: string
  categoryName?: string
  showFilters?: boolean
}

export function BCCategoryProducts({ 
  categorySlug, 
  categoryName,
  showFilters = true 
}: CategoryProductsProps) {
  const [products, setProducts] = useState<BCProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('featured')
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const res = await fetch(`/api/products/by-category?category=${categorySlug}&limit=100`)
        const data = await res.json()
        
        if (data.error) {
          setError(data.error)
        } else {
          setProducts(data.products || [])
        }
      } catch (err) {
        setError('Failed to load products')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProducts()
  }, [categorySlug])
  
  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })
  
  if (loading) {
    return (
      <div className="py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-brand"></div>
        <p className="mt-4 text-gray-500">Loading products...</p>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="py-12 text-center">
        <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p className="text-gray-500">{error}</p>
      </div>
    )
  }
  
  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <Lightbulb className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p className="text-gray-500">No products found in this category</p>
      </div>
    )
  }
  
  return (
    <div>
      {/* Toolbar */}
      {showFilters && (
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            <span className="font-medium">{products.length}</span> products
          </p>
          
          <div className="flex items-center gap-4">
            {/* Sort */}
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
            
            {/* View Toggle */}
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
      )}
      
      {/* Products Grid */}
      {viewMode === 'grid' ? (
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
    </div>
  )
}

function ProductCard({ product }: { product: BCProduct }) {
  return (
    <Link
      href={`/bc-products/${product.id}`}
      className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white"
    >
      {/* Image */}
      <div className="aspect-square bg-gray-100 relative">
        {/* Stock Badge */}
        {product.inStock && product.inventory > 50 && (
          <span className="absolute top-2 left-2 px-2 py-1 text-xs font-medium rounded bg-brand text-black z-10">
            In Stock
          </span>
        )}
        {!product.inStock && (
          <span className="absolute top-2 left-2 px-2 py-1 text-xs font-medium rounded bg-orange-500 text-white z-10">
            Lead Time
          </span>
        )}
        
        {product.primaryImage ? (
          <img
            src={product.primaryImage}
            alt={product.name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Lightbulb className="w-16 h-16 text-gray-300" />
          </div>
        )}
      </div>
      
      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1 font-mono">{product.sku}</p>
        <h3 className="font-medium group-hover:text-brand transition-colors line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        
        {/* Variants Preview */}
        {product.variants.length > 1 && (
          <p className="text-xs text-gray-500 mt-1">
            {product.variants.length} options available
          </p>
        )}
        
        {/* Price */}
        <div className="flex items-baseline gap-2 mt-2">
          <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
          {product.msrp > product.price && (
            <p className="text-sm text-gray-400 line-through">${product.msrp.toFixed(2)}</p>
          )}
        </div>
        
        {/* Stock Status */}
        <div className="flex items-center gap-1 mt-2 text-xs">
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

function ProductListItem({ product }: { product: BCProduct }) {
  return (
    <Link
      href={`/bc-products/${product.id}`}
      className="group flex border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white"
    >
      {/* Image */}
      <div className="w-48 h-48 bg-gray-100 flex-shrink-0 relative">
        {product.primaryImage ? (
          <img
            src={product.primaryImage}
            alt={product.name}
            className="w-full h-full object-contain p-4"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Lightbulb className="w-12 h-12 text-gray-300" />
          </div>
        )}
      </div>
      
      {/* Info */}
      <div className="flex-1 p-4 flex flex-col">
        <p className="text-xs text-gray-500 font-mono">{product.sku}</p>
        <h3 className="font-medium group-hover:text-brand transition-colors text-lg">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
          {product.shortDescription}
        </p>
        
        {/* Variants */}
        {product.variants.length > 1 && (
          <p className="text-xs text-gray-500 mt-2">
            {product.variants.length} configurations available
          </p>
        )}
        
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
            {product.msrp > product.price && (
              <p className="text-sm text-gray-400 line-through">${product.msrp.toFixed(2)}</p>
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

export default BCCategoryProducts
