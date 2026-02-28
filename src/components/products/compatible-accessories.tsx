'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Check, X, Package, ChevronDown, ChevronUp } from 'lucide-react'
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

const CATEGORY_ORDER = ['Mounting Brackets', 'Shields', 'Sensors', 'Adapters', 'Poles', 'Cables', 'Other']

export function CompatibleAccessories({ accessories, productName }: CompatibleAccessoriesProps) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())
  const [lightboxItem, setLightboxItem] = useState<Accessory | null>(null)
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set(CATEGORY_ORDER))
  const { addToCart } = useCart()

  if (!accessories || accessories.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 border-t">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Compatible Accessories</h2>
          <p className="text-gray-500 mt-2">Build your complete lighting system</p>
        </div>
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-8 text-center">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">Accessories Coming Soon</p>
          <p className="text-gray-400 text-sm mt-1">Mounting brackets, sensors, poles, and more will be available shortly.</p>
          <Link href="/contact?subject=Accessory Inquiry" className="inline-block mt-4 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-lg text-sm transition-colors">
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
    (a, b) => (CATEGORY_ORDER.indexOf(a) === -1 ? 99 : CATEGORY_ORDER.indexOf(a)) - (CATEGORY_ORDER.indexOf(b) === -1 ? 99 : CATEGORY_ORDER.indexOf(b))
  )

  const toggleItem = (sku: string) => {
    const next = new Set(selectedItems)
    next.has(sku) ? next.delete(sku) : next.add(sku)
    setSelectedItems(next)
  }

  const toggleCat = (cat: string) => {
    const next = new Set(expandedCats)
    next.has(cat) ? next.delete(cat) : next.add(cat)
    setExpandedCats(next)
  }

  const handleAddSingle = async (acc: Accessory, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!acc.price) return
    await addToCart({ productId: 0, variantId: 0, name: acc.name, sku: acc.sku, price: acc.price, image: acc.image || '', quantity: 1 })
    setAddedItems(prev => new Set(prev).add(acc.sku))
    setTimeout(() => setAddedItems(prev => { const n = new Set(prev); n.delete(acc.sku); return n }), 2000)
  }

  const handleAddSelected = async () => {
    for (const sku of selectedItems) {
      const acc = accessories.find(a => a.sku === sku)
      if (acc?.price) await addToCart({ productId: 0, variantId: 0, name: acc.name, sku: acc.sku, price: acc.price, image: acc.image || '', quantity: 1 })
    }
    setSelectedItems(new Set())
  }

  const selectedTotal = Array.from(selectedItems).reduce((sum, sku) => {
    const acc = accessories.find(a => a.sku === sku)
    return sum + (acc?.price || 0)
  }, 0)

  return (
    <>
      {/* Lightbox */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setLightboxItem(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="relative">
              {lightboxItem.image ? (
                <img src={lightboxItem.image} alt={lightboxItem.name} className="w-full aspect-square object-contain bg-gray-50 p-8" />
              ) : (
                <div className="w-full aspect-square bg-gray-100 flex items-center justify-center"><Package className="w-16 h-16 text-gray-300" /></div>
              )}
              <button onClick={() => setLightboxItem(null)} className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow hover:bg-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900">{lightboxItem.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{lightboxItem.description}</p>
              <div className="flex items-center justify-between mt-4">
                {lightboxItem.price ? (
                  <span className="text-2xl font-bold text-gray-900">${lightboxItem.price.toFixed(2)}</span>
                ) : (
                  <span className="text-sm text-gray-400">Contact for pricing</span>
                )}
                <div className="flex gap-2">
                  {lightboxItem.slug && (
                    <Link href={`/p/${lightboxItem.slug}`} className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50">View Details</Link>
                  )}
                  {lightboxItem.price && (
                    <button
                      onClick={(e) => handleAddSingle(lightboxItem, e)}
                      className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg text-sm font-semibold flex items-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" /> Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-12 border-t">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Compatible Accessories</h2>
          <p className="text-gray-500 mt-1">Build your complete {productName || 'lighting'} system — order together or separately</p>
        </div>

        <div className="space-y-6">
          {sortedCategories.map(cat => {
            const items = grouped[cat]
            const isExpanded = expandedCats.has(cat)
            return (
              <div key={cat}>
                <button onClick={() => toggleCat(cat)} className="flex items-center gap-2 mb-3 group">
                  <h3 className="font-semibold text-gray-700">{cat}</h3>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{items.length}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>
                {isExpanded && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {items.map(acc => {
                      const isSelected = selectedItems.has(acc.sku)
                      const isAdded = addedItems.has(acc.sku)
                      return (
                        <div
                          key={acc.sku}
                          className={`bg-white border rounded-xl overflow-hidden transition-all cursor-pointer group hover:shadow-md ${
                            isSelected ? 'border-yellow-400 ring-1 ring-yellow-200' : 'border-gray-200'
                          }`}
                        >
                          {/* Image — click to open lightbox */}
                          <div
                            className="aspect-square bg-gray-50 p-3 relative"
                            onClick={() => setLightboxItem(acc)}
                          >
                            {acc.image ? (
                              <img src={acc.image} alt={acc.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <Package className="w-10 h-10" />
                              </div>
                            )}
                            {/* Selection checkbox */}
                            <button
                              onClick={(e) => { e.stopPropagation(); toggleItem(acc.sku) }}
                              className={`absolute top-2 left-2 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                isSelected ? 'bg-yellow-400 border-yellow-400' : 'border-gray-300 bg-white/80 hover:border-gray-400'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 text-white" />}
                            </button>
                          </div>

                          {/* Info */}
                          <div className="p-3">
                            <h4 className="text-xs font-semibold text-gray-900 line-clamp-2 min-h-[2rem] leading-tight">{acc.name}</h4>
                            <div className="flex items-center justify-between mt-2">
                              {acc.price ? (
                                <span className="text-sm font-bold text-gray-900">${acc.price.toFixed(0)}</span>
                              ) : (
                                <span className="text-[10px] text-gray-400">Contact for price</span>
                              )}
                              {acc.price && (
                                <button
                                  onClick={(e) => handleAddSingle(acc, e)}
                                  className={`text-[10px] font-medium px-2 py-1 rounded-full transition-all ${
                                    isAdded ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                  }`}
                                >
                                  {isAdded ? '✓ Added' : '+ Cart'}
                                </button>
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

        {/* Sticky Add Selected Bar */}
        {selectedItems.size > 0 && (
          <div className="sticky bottom-4 mt-6">
            <button
              onClick={handleAddSelected}
              className="w-full flex items-center justify-center gap-3 py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-xl shadow-lg transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              Add {selectedItems.size} Accessories to Cart{selectedTotal > 0 ? ` — $${selectedTotal.toFixed(2)}` : ''}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
