'use client'

import { useState, useEffect, useMemo } from 'react'
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

// Category keywords for smart matching
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'high-bay': ['high-bay', 'high bay', 'ufo', 'hba', 'oh-series', 'ihl'],
  'linear': ['linear', 'lhb', 'lb2ft', 'hbl'],
  'troffer': ['troffer', 'panel', 'sfpl', 'bp-35', 'flat'],
  'downlight': ['downlight', 'down-light', 'down light', 'dlr', 'slim'],
  'vapor-tight': ['vapor', 'vf4ft', 'vf-series'],
  'wall-pack': ['wall-pack', 'wall pack', 'wsn', 'wss', 'wp-series', 'wpa', 'fwp', 'scwp', 'twp', 'emwp'],
  'flood': ['flood', 'fl-', '-fl', 'tsfl', 'fly'],
  'area-light': ['area', 'shoebox', 'ot-series', 'plb', 'parking'],
  'canopy': ['canopy', 'garage', 'cn-', '-cn', 'ida', 'idb'],
  'tube': ['tube', 't8', 't5', 'rf4ft'],
  'strip-wrap': ['strip', 'wrap', 'wr4ft', 'a-ls', 'tf24'],
  'exit-emergency': ['exit', 'emergency', 'em03', 'ex-'],
  'outdoor': ['solar', 'barn', 'bollard', 'garden', 'post-top', 'security-light'],
  'sensor': ['sensor', 'motion', 'photocell'],
  'ceiling': ['ceiling'],
  'corn': ['corn'],
  'grow': ['grow'],
}

// Map application slugs to relevant product categories
const APP_CATEGORY_MAP: Record<string, string[]> = {
  'warehouse': ['high-bay', 'linear', 'sensor', 'vapor-tight', 'strip-wrap'],
  'manufacturing': ['high-bay', 'linear', 'vapor-tight', 'flood', 'strip-wrap'],
  'retail': ['troffer', 'downlight', 'strip-wrap', 'ceiling', 'exit-emergency'],
  'office': ['troffer', 'downlight', 'strip-wrap', 'ceiling', 'exit-emergency'],
  'parking': ['area-light', 'canopy', 'wall-pack', 'sensor', 'flood'],
  'gas-station': ['canopy', 'wall-pack', 'flood', 'sensor', 'area-light'],
  'education': ['troffer', 'high-bay', 'strip-wrap', 'downlight', 'exit-emergency'],
  'sports': ['high-bay', 'flood', 'area-light', 'wall-pack'],
  'cold-storage': ['vapor-tight', 'high-bay', 'strip-wrap', 'sensor'],
  'healthcare': ['troffer', 'downlight', 'strip-wrap', 'exit-emergency', 'ceiling'],
  'church': ['high-bay', 'downlight', 'troffer', 'strip-wrap', 'ceiling'],
  'restaurant': ['downlight', 'strip-wrap', 'troffer', 'ceiling'],
  'auto-dealership': ['troffer', 'high-bay', 'area-light', 'flood', 'downlight'],
  'agriculture': ['vapor-tight', 'outdoor', 'flood', 'high-bay'],
  'government': ['troffer', 'area-light', 'wall-pack', 'downlight', 'exit-emergency'],
  'car-wash': ['vapor-tight', 'canopy', 'wall-pack', 'flood'],
  'loading-dock': ['vapor-tight', 'wall-pack', 'flood', 'high-bay', 'sensor'],
  'security': ['wall-pack', 'flood', 'sensor', 'area-light', 'outdoor'],
}

function classifyProduct(slug: string, name: string): string[] {
  const text = `${slug} ${name}`.toLowerCase()
  const cats: string[] = []
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(kw => text.includes(kw))) {
      cats.push(cat)
    }
  }
  return cats
}

export function RecommendedProducts({
  title,
  products,
  appSlug,
}: {
  title: string
  products: AppProduct[]
  appSlug?: string
}) {
  const [allBCProducts, setAllBCProducts] = useState<BCProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/bigcommerce/products?limit=250')
        if (!res.ok) throw new Error('fetch failed')
        const data = await res.json()
        setAllBCProducts(data.products || [])
      } catch {
        // silently fail
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // Build slug map
  const bcMap = useMemo(() => {
    const map = new Map<string, BCProduct>()
    allBCProducts.forEach(p => { if (p.slug) map.set(p.slug, p) })
    return map
  }, [allBCProducts])

  // Smart recommendations: curated + auto-fill from relevant categories
  const displayProducts = useMemo(() => {
    const TARGET_COUNT = 6
    const usedSlugs = new Set<string>()

    // Step 1: Start with curated products (that exist in BC with images)
    type DisplayItem = { appProduct: AppProduct; bc: BCProduct | undefined }
    const result: DisplayItem[] = []

    for (const p of products) {
      const bc = bcMap.get(p.slug)
      // Only include if BC product has images
      if (bc && bc.images && bc.images.length > 0) {
        result.push({ appProduct: p, bc })
        usedSlugs.add(p.slug)
      }
    }

    // Step 2: If we need more, auto-fill from relevant categories
    if (result.length < TARGET_COUNT && appSlug && allBCProducts.length > 0) {
      const relevantCats = APP_CATEGORY_MAP[appSlug] || []

      // Score all BC products by relevance
      const candidates: { product: BCProduct; score: number }[] = []
      for (const bc of allBCProducts) {
        if (usedSlugs.has(bc.slug)) continue
        if (!bc.images || bc.images.length === 0) continue
        if (!bc.inStock) continue

        const cats = classifyProduct(bc.slug, bc.name)
        let score = 0
        for (const cat of cats) {
          const idx = relevantCats.indexOf(cat)
          if (idx !== -1) {
            score += (relevantCats.length - idx) * 10 // Higher score for more relevant categories
          }
        }
        // Boost products with more images (better listings)
        score += Math.min(bc.images.length, 5)
        // Boost products with inventory
        if (bc.inventory > 100) score += 3
        if (bc.inventory > 500) score += 2

        if (score > 0) {
          candidates.push({ product: bc, score })
        }
      }

      // Sort by score descending, then by price ascending for variety
      candidates.sort((a, b) => b.score - a.score || a.product.price - b.product.price)

      // Fill remaining slots
      for (const c of candidates) {
        if (result.length >= TARGET_COUNT) break
        if (usedSlugs.has(c.product.slug)) continue
        usedSlugs.add(c.product.slug)
        result.push({
          appProduct: {
            name: c.product.name,
            sku: c.product.sku,
            wattage: '',
            description: '',
            slug: c.product.slug,
          },
          bc: c.product,
        })
      }
    }

    return result
  }, [products, bcMap, allBCProducts, appSlug])

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {displayProducts.map(({ appProduct, bc }) => {
          const img = bc?.images?.find(i => i.isPrimary)?.thumbnail
            || bc?.images?.[0]?.thumbnail
            || bc?.images?.find(i => i.isPrimary)?.url
            || bc?.images?.[0]?.url
          const price = bc?.price

          return (
            <Link
              key={appProduct.sku || appProduct.slug}
              href={`/p/${appProduct.slug}`}
              className="bg-white border rounded-lg overflow-hidden hover:shadow-md hover:border-yellow-400 transition-all group"
            >
              {/* Image */}
              <div className="aspect-square bg-gray-50 p-2">
                {loading ? (
                  <div className="w-full h-full animate-pulse bg-gray-100 rounded" />
                ) : img ? (
                  <img src={img} alt={appProduct.name} className="w-full h-full object-contain" loading="lazy" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="px-2 pb-2">
                <h3 className="font-medium text-gray-900 group-hover:text-yellow-600 transition-colors text-xs leading-tight line-clamp-2 min-h-[2rem]">
                  {appProduct.name}
                </h3>
                {appProduct.description && (
                  <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">{appProduct.description}</p>
                )}
                <div className="flex items-center justify-between mt-1">
                  {price !== undefined ? (
                    <span className="text-sm font-bold text-gray-900">
                      {price >= 1000 ? `$${(price/1000).toFixed(1)}k` : `$${price.toFixed(0)}`}
                    </span>
                  ) : (
                    <span className="text-[10px] text-gray-400">View price</span>
                  )}
                  <span className="text-[10px] text-yellow-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    View →
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
