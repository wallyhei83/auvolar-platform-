'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Zap, Loader2 } from 'lucide-react'

interface BCProduct {
  id: number
  name: string
  sku: string
  price: number
  inventory: number
  inStock: boolean
  images: Array<{
    url: string
    thumbnail: string
  }>
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<BCProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/bigcommerce/products')
        const data = await res.json()
        if (data.products) {
          // Get first 6 products with images
          const withImages = data.products
            .filter((p: BCProduct) => p.images && p.images.length > 0)
            .slice(0, 6)
          setProducts(withImages)
        }
      } catch (err) {
        console.error('Failed to fetch products:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white p-4 animate-pulse">
            <div className="aspect-square rounded-lg bg-gray-200" />
            <div className="mt-3 h-4 bg-gray-200 rounded w-3/4" />
            <div className="mt-2 h-3 bg-gray-200 rounded w-1/2" />
            <div className="mt-2 h-4 bg-gray-200 rounded w-1/4" />
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/bc-products/${product.id}`}
          className="group rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-brand hover:shadow-md"
        >
          <div className="aspect-square rounded-lg bg-gray-50 overflow-hidden">
            {product.images?.[0]?.url ? (
              <Image
                src={product.images[0].url}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                unoptimized
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Zap className="h-10 w-10 text-gray-300" />
              </div>
            )}
          </div>
          <div className="mt-3">
            <span className="inline-block rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-semibold text-green-700">
              DLC
            </span>
            <h3 className="mt-1 text-sm font-medium text-gray-900 group-hover:text-brand line-clamp-2">
              {product.name}
            </h3>
            <p className="text-xs text-gray-500">{product.sku}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="font-semibold text-gray-900">${product.price.toFixed(2)}</span>
              <span className={`text-xs ${product.inStock ? 'text-green-600' : 'text-amber-600'}`}>
                {product.inStock ? 'In Stock' : 'Ships in 3 days'}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
