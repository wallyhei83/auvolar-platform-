'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface AppProduct {
  name: string
  sku: string
  wattage: string
  description: string
  slug: string
}

interface BCProduct {
  id: number
  name: string
  sku: string
  slug: string
  price: number
  inventory: number
  inStock: boolean
  images: { url: string; thumbnail: string; isPrimary: boolean }[]
}

export function RecommendedProducts({
  title,
  products,
}: {
  title: string
  products: AppProduct[]
}) {
  const [bcProducts, setBcProducts] = useState<Map<string, BCProduct>>(new Map())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/bigcommerce/products?limit=250')
        if (!res.ok) throw new Error('fetch failed')
        const data = await res.json()
        const productList: BCProduct[] = data.products || []

        const map = new Map<string, BCProduct>()
        productList.forEach(p => {
          if (p.slug) map.set(p.slug, p)
        })
        setBcProducts(map)
      } catch {
        // silently fail — fallback to static
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => {
          const bc = bcProducts.get(product.slug)
          const img = bc?.images?.find(i => i.isPrimary)?.thumbnail || bc?.images?.[0]?.thumbnail || bc?.images?.find(i => i.isPrimary)?.url || bc?.images?.[0]?.url
          const price = bc?.price
          const inStock = bc?.inStock
          const inventory = bc?.inventory

          return (
            <Link
              key={product.sku}
              href={`/p/${product.slug}`}
              className="flex items-center gap-4 bg-white border rounded-xl p-3 hover:shadow-md hover:border-yellow-400 transition-all group"
            >
              {/* Thumbnail */}
              <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                {loading ? (
                  <div className="w-full h-full animate-pulse bg-gray-100 rounded-lg" />
                ) : img ? (
                  <img src={img} alt={product.name} className="w-full h-full object-contain p-1" loading="lazy" />
                ) : (
                  <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                )}
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-gray-900 group-hover:text-yellow-600 transition-colors text-sm leading-tight line-clamp-1">
                    {product.name}
                  </h3>
                  {price !== undefined && (
                    <span className="text-sm font-bold text-gray-900 flex-shrink-0">${price.toFixed(0)}</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{product.wattage} · {product.description}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  {inStock !== undefined && (
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                      inStock ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {inStock ? (inventory && inventory > 0 ? `${inventory} in stock` : 'In Stock') : 'Made to Order'}
                    </span>
                  )}
                  <span className="text-[10px] text-yellow-600 font-medium group-hover:underline ml-auto">
                    View Product →
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
