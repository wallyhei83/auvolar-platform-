'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Lightbulb, ShoppingCart, Loader2, Plus, Minus, CheckCircle2, Clock, Check } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

interface BCProduct {
  id: number
  name: string
  sku: string
  price: number
  salePrice?: number
  msrp?: number
  description: string
  inventory: number
  inStock: boolean
  categories: number[]
  images: {
    url: string
    thumbnail: string
    zoom: string
    isPrimary: boolean
  }[]
  variants: {
    id: number
    sku: string
    price?: number
    inventory: number
    options: { name: string; value: string }[]
  }[]
  customFields: Record<string, string>
}

interface BCCategory {
  id: number
  name: string
  slug: string
  children?: BCCategory[]
}

interface BCProductGridProps {
  categoryFilter?: string  // Can be single ID or comma-separated IDs
  limit?: number
  showCategories?: boolean
}

export function BCProductGrid({ categoryFilter, limit = 20, showCategories = true }: BCProductGridProps) {
  const { addToCart, loading: cartLoading } = useCart()
  const [products, setProducts] = useState<BCProduct[]>([])
  const [categories, setCategories] = useState<BCCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [quantities, setQuantities] = useState<Record<number, number>>({})
  const [addedProducts, setAddedProducts] = useState<Record<number, boolean>>({})

  useEffect(() => {
    fetchProducts()
  }, [page, categoryFilter])

  const fetchProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      })
      if (categoryFilter) {
        params.set('category', categoryFilter)
      }

      const response = await fetch(`/api/bigcommerce/products?${params}`)
      const data = await response.json()

      if (data.error) {
        setError(data.error)
        return
      }

      setProducts(data.products || [])
      setCategories(data.categories || [])
      setTotalPages(data.pagination?.totalPages || 1)
    } catch (err) {
      setError('Failed to load products')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = (productId: number, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + delta),
    }))
  }

  const getPrimaryImage = (product: BCProduct) => {
    const primary = product.images.find(img => img.isPrimary)
    return primary?.url || product.images[0]?.url || null
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-brand" />
        <span className="ml-2 text-gray-600">Loading products from BigCommerce...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <button
          onClick={fetchProducts}
          className="mt-4 px-4 py-2 bg-brand text-black rounded-lg font-medium"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Category Sidebar (optional) */}
      {showCategories && categories.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          <Link
            href="/products"
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${
              !categoryFilter ? 'bg-brand text-black' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            All Products
          </Link>
          {categories.slice(0, 8).map(cat => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.id}`}
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                categoryFilter === String(cat.id) ? 'bg-brand text-black' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <Lightbulb className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-600">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div
              key={product.id}
              className="group border rounded-xl overflow-hidden hover:shadow-lg transition-all bg-white"
            >
              {/* Product Image */}
              <Link href={`/products/bc/${product.id}`}>
                <div className="aspect-square bg-gray-100 relative">
                  {getPrimaryImage(product) ? (
                    <img
                      src={getPrimaryImage(product)!}
                      alt={product.name}
                      className="w-full h-full object-contain p-4"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Lightbulb className="w-16 h-16 text-gray-300" />
                    </div>
                  )}
                  {/* Stock Badge */}
                  <div className="absolute top-2 left-2">
                    {product.inStock ? (
                      <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded">
                        IN STOCK
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded">
                        PRE-ORDER
                      </span>
                    )}
                  </div>
                  {/* Sale Badge */}
                  {product.salePrice && product.salePrice < product.price && (
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
                        SALE
                      </span>
                    </div>
                  )}
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-4">
                <Link href={`/products/bc/${product.id}`}>
                  <p className="text-xs text-gray-500 mb-1">{product.sku}</p>
                  <h3 className="font-semibold text-gray-900 group-hover:text-brand transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>

                {/* Custom Fields (specs preview) */}
                {product.customFields && Object.keys(product.customFields).length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1 text-xs text-gray-500">
                    {Object.entries(product.customFields).slice(0, 3).map(([key, value]) => (
                      <span key={key}>{value}</span>
                    ))}
                  </div>
                )}

                {/* Price */}
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    {product.salePrice && product.salePrice < product.price ? (
                      <>
                        <span className="text-lg font-bold text-red-600">${product.salePrice.toFixed(2)}</span>
                        <span className="ml-2 text-sm text-gray-400 line-through">${product.price.toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    )}
                    {product.msrp && product.msrp > product.price && (
                      <div className="text-xs text-gray-500">MSRP ${product.msrp.toFixed(2)}</div>
                    )}
                  </div>
                </div>

                {/* Quick Add */}
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => updateQuantity(product.id, -1)}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm">{quantities[product.id] || 1}</span>
                    <button
                      onClick={() => updateQuantity(product.id, 1)}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={async () => {
                      await addToCart({
                        productId: product.id,
                        name: product.name,
                        sku: product.sku,
                        price: product.salePrice && product.salePrice < product.price ? product.salePrice : product.price,
                        quantity: quantities[product.id] || 1,
                        image: getPrimaryImage(product) || undefined,
                      })
                      setAddedProducts(prev => ({ ...prev, [product.id]: true }))
                      setTimeout(() => setAddedProducts(prev => ({ ...prev, [product.id]: false })), 2000)
                    }}
                    disabled={cartLoading}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-1 transition-colors ${
                      addedProducts[product.id]
                        ? 'bg-green-500 text-white'
                        : 'bg-brand hover:bg-yellow-400 text-black'
                    }`}
                  >
                    {addedProducts[product.id] ? (
                      <>
                        <Check className="w-4 h-4" />
                        Added!
                      </>
                    ) : cartLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        Add
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded-lg font-medium disabled:opacity-50 hover:bg-gray-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 border rounded-lg font-medium disabled:opacity-50 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default BCProductGrid
