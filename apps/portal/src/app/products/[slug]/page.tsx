'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface Product {
  id: number
  name: string
  sku: string
  price: number
  sale_price?: number
  description: string
  inventory_level: number
  images: Array<{ url_standard: string; url_thumbnail: string }>
}

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [categoryName, setCategoryName] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [slug])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      // Try to fetch products with keyword matching the slug
      const keyword = slug.replace(/-/g, ' ')
      setCategoryName(keyword.charAt(0).toUpperCase() + keyword.slice(1))
      
      const res = await fetch(`/api/products?keyword=${encodeURIComponent(keyword)}`)
      const data = await res.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            <span className="text-[#FFD60A]">Lumi</span>linkAI
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/products" className="hover:text-[#FFD60A]">Products</Link>
            <Link href="/tools" className="hover:text-[#FFD60A]">Tools</Link>
            <Link href="/login" className="bg-[#FFD60A] text-black px-4 py-2 rounded font-medium">
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-[#FFD60A]">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/products" className="text-gray-500 hover:text-[#FFD60A]">Products</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{categoryName}</span>
        </nav>

        <h1 className="text-3xl font-bold mb-8">{categoryName}</h1>

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFD60A]"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg mb-4">No {categoryName} products found</p>
            <p className="text-gray-400 mb-6">
              Products will appear here once BigCommerce is configured with inventory.
            </p>
            <Link 
              href="/products" 
              className="inline-block bg-[#FFD60A] text-black px-6 py-2 rounded-lg font-medium hover:bg-yellow-400"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden group"
              >
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0].url_standard}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  {product.sale_price && product.sale_price < product.price && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      Sale
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-1">{product.sku}</p>
                  <h3 className="font-medium text-gray-900 line-clamp-2 mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      {product.sale_price && product.sale_price < product.price ? (
                        <>
                          <span className="text-lg font-bold text-[#FFD60A]">
                            ${product.sale_price.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-400 line-through ml-2">
                            ${product.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      product.inventory_level > 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.inventory_level > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
