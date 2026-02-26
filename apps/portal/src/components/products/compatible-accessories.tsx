'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Check, Plus, ChevronDown, ChevronUp, Package } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

interface Accessory {
  name: string
  sku: string
  slug: string
  price?: number
  image?: string
  description: string
  category: string
}

interface CompatibleAccessoriesProps {
  accessories: Accessory[]
  productName?: string
}

const CATEGORY_ORDER = ['Mounting Brackets', 'Sensors', 'Adapters', 'Poles', 'Shields', 'Cables', 'Other']

const CATEGORY_ICONS: Record<string, string> = {
  'Mounting Brackets': '🔩',
  'Sensors': '📡',
  'Adapters': '🔌',
  'Poles': '🏗️',
  'Shields': '🛡️',
  'Cables': '🔗',
  'Other': '📦',
}

export function CompatibleAccessories({ accessories, productName }: CompatibleAccessoriesProps) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(CATEGORY_ORDER))
  const { addToCart } = useCart()

  // Show "Coming Soon" if no accessories
  if (!accessories || accessories.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Compatible Accessories</h2>
          <p className="text-gray-500 mt-2">Build your complete lighting system</p>
        </div>
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-8 text-center">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">Accessories Coming Soon</p>
          <p className="text-gray-400 text-sm mt-1">
            Mounting brackets, sensors, poles, and more will be available shortly.
          </p>
          <Link
            href="/contact?subject=Accessory Inquiry"
            className="inline-block mt-4 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-lg text-sm transition-colors"
          >
            Contact Us for Accessories
          </Link>
        </div>
      </div>
    )
  }

  // Group by category
  const grouped: Record<string, Accessory[]> = {}
  for (const acc of accessories) {
    const cat = acc.category || 'Other'
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(acc)
  }
  const sortedCategories = Object.keys(grouped).sort(
    (a, b) => (CATEGORY_ORDER.indexOf(a) === -1 ? 99 : CATEGORY_ORDER.indexOf(a)) -
              (CATEGORY_ORDER.indexOf(b) === -1 ? 99 : CATEGORY_ORDER.indexOf(b))
  )

  const toggleItem = (sku: string) => {
    const next = new Set(selectedItems)
    next.has(sku) ? next.delete(sku) : next.add(sku)
    setSelectedItems(next)
  }

  const toggleCategory = (cat: string) => {
    const next = new Set(expandedCategories)
    next.has(cat) ? next.delete(cat) : next.add(cat)
    setExpandedCategories(next)
  }

  const handleAddSingle = async (acc: Accessory) => {
    if (!acc.price) return
    await addToCart({
      productId: 0,
      variantId: 0,
      name: acc.name,
      sku: acc.sku,
      price: acc.price,
      image: acc.image || '',
      quantity: 1,
    })
    setAddedItems(prev => new Set(prev).add(acc.sku))
    setTimeout(() => {
      setAddedItems(prev => {
        const next = new Set(prev)
        next.delete(acc.sku)
        return next
      })
    }, 2000)
  }

  const handleAddSelected = async () => {
    for (const sku of selectedItems) {
      const acc = accessories.find(a => a.sku === sku)
      if (acc?.price) {
        await addToCart({
          productId: 0,
          variantId: 0,
          name: acc.name,
          sku: acc.sku,
          price: acc.price,
          image: acc.image || '',
          quantity: 1,
        })
      }
    }
    setSelectedItems(new Set())
  }

  const selectedTotal = Array.from(selectedItems).reduce((sum, sku) => {
    const acc = accessories.find(a => a.sku === sku)
    return sum + (acc?.price || 0)
  }, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Compatible Accessories</h2>
        <p className="text-gray-500 mt-2">
          Build your complete {productName || 'lighting'} system — order together or separately
        </p>
      </div>

      <div className="space-y-4">
        {sortedCategories.map(cat => {
          const items = grouped[cat]
          const isExpanded = expandedCategories.has(cat)
          return (
            <div key={cat} className="border rounded-xl overflow-hidden">
              <button
                onClick={() => toggleCategory(cat)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{CATEGORY_ICONS[cat] || '📦'}</span>
                  <span className="font-semibold text-gray-900">{cat}</span>
                  <span className="text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">{items.length}</span>
                </div>
                {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>
              {isExpanded && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
                  {items.map(acc => {
                    const isSelected = selectedItems.has(acc.sku)
                    const isAdded = addedItems.has(acc.sku)
                    return (
                      <div
                        key={acc.sku}
                        className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                          isSelected ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => toggleItem(acc.sku)}
                      >
                        {/* Checkbox */}
                        <div className={`w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-yellow-400 border-yellow-400' : 'border-gray-300'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>

                        {/* Image */}
                        <div className="w-14 h-14 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                          {acc.image ? (
                            <img src={acc.image} alt={acc.name} className="w-full h-full object-contain p-1" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300 text-xl">
                              {CATEGORY_ICONS[acc.category] || '📦'}
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{acc.name}</h4>
                          <p className="text-xs text-gray-500 line-clamp-1">{acc.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {acc.price ? (
                              <span className="text-sm font-bold text-gray-900">${acc.price.toFixed(0)}</span>
                            ) : (
                              <span className="text-xs text-gray-400">Contact for price</span>
                            )}
                            <button
                              onClick={(e) => { e.stopPropagation(); handleAddSingle(acc) }}
                              className={`text-[10px] font-medium px-2 py-0.5 rounded-full transition-colors ${
                                isAdded
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                              }`}
                            >
                              {isAdded ? '✓ Added' : '+ Cart'}
                            </button>
                            {acc.slug && (
                              <Link
                                href={`/p/${acc.slug}`}
                                onClick={(e) => e.stopPropagation()}
                                className="text-[10px] text-yellow-600 hover:underline"
                              >
                                View →
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Add Selected Button */}
      {selectedItems.size > 0 && (
        <div className="sticky bottom-4 mt-6">
          <button
            onClick={handleAddSelected}
            className="w-full flex items-center justify-center gap-3 py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-xl shadow-lg transition-all"
          >
            <ShoppingCart className="w-5 h-5" />
            Add {selectedItems.size} Accessories to Cart — ${selectedTotal.toFixed(2)}
          </button>
        </div>
      )}
    </div>
  )
}
