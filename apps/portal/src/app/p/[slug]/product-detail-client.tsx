'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ShoppingCart, Plus, Minus, Check, CheckCircle2, Clock,
  ChevronLeft, ChevronRight, Share2, Heart, Truck, Shield, Zap,
  Phone, Mail
} from 'lucide-react'
import { useCart } from '@/lib/cart-context'

interface ProductImage {
  url: string
  thumbnail: string
  zoom: string
  isPrimary: boolean
  sortOrder: number
}

interface ProductVariant {
  id: number
  sku: string
  price: number
  inventory: number
  options: { name: string; value: string }[]
}

interface ProductSpec {
  key: string
  value: string
}

interface ProductDetailProps {
  product: {
    id: number
    name: string
    sku: string
    price: number
    salePrice: number
    retailPrice: number
    description: string
    plainDescription: string
    images: ProductImage[]
    variants: ProductVariant[]
    inventoryLevel: number
    inStock: boolean
    weight: number
    condition: string
    customFields: { name: string; value: string }[]
    specs: ProductSpec[]
    slug: string
  }
}

export default function ProductDetailClient({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants.length > 0 ? product.variants[0] : null
  )
  const { addToCart } = useCart()

  const images = product.images.length > 0
    ? product.images
    : [{ url: '', thumbnail: '', zoom: '', isPrimary: true, sortOrder: 0 }]

  const currentPrice = selectedVariant?.price || product.price
  const msrp = product.retailPrice || currentPrice * 1.4
  const savings = msrp > currentPrice ? ((msrp - currentPrice) / msrp * 100).toFixed(0) : null

  const handleAddToCart = async () => {
    await addToCart({
      productId: product.id,
      variantId: selectedVariant?.id || product.id,
      name: product.name,
      sku: selectedVariant?.sku || product.sku,
      price: currentPrice,
      image: images[0]?.url || '',
      quantity,
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  // Group variants by option name for selection UI
  const optionGroups: Record<string, string[]> = {}
  product.variants.forEach(v => {
    v.options.forEach(opt => {
      if (!optionGroups[opt.name]) optionGroups[opt.name] = []
      if (!optionGroups[opt.name].includes(opt.value)) {
        optionGroups[opt.name].push(opt.value)
      }
    })
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          {/* Main Image */}
          <div className="relative aspect-square bg-white rounded-2xl border overflow-hidden mb-4">
            {images[selectedImage]?.url ? (
              <img
                src={images[selectedImage].zoom || images[selectedImage].url}
                alt={`${product.name} - Image ${selectedImage + 1}`}
                className="w-full h-full object-contain p-6"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            )}

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : images.length - 1)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedImage(prev => prev < images.length - 1 ? prev + 1 : 0)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Sale badge */}
            {savings && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                Save {savings}%
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                    selectedImage === i ? 'border-yellow-500 shadow-md' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {img.thumbnail ? (
                    <img src={img.thumbnail} alt={`${product.name} thumbnail ${i + 1}`} className="w-full h-full object-contain p-1" />
                  ) : (
                    <div className="w-full h-full bg-gray-100" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm text-gray-500">SKU: {product.sku}</span>
            <span className="text-sm text-gray-300">|</span>
            <div className="flex items-center gap-1">
              {product.inStock ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">
                    {product.inventoryLevel > 0 ? `${product.inventoryLevel} In Stock` : 'In Stock'}
                  </span>
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-orange-600 font-medium">Ships in 5-7 days</span>
                </>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-bold text-gray-900">${currentPrice.toFixed(2)}</span>
            {msrp > currentPrice && (
              <>
                <span className="text-xl text-gray-400 line-through">${msrp.toFixed(2)}</span>
                <span className="text-sm text-red-500 font-semibold bg-red-50 px-2 py-1 rounded">
                  -{savings}%
                </span>
              </>
            )}
          </div>

          {/* Short Description */}
          {product.plainDescription && (
            <p className="text-gray-600 mb-6 line-clamp-3">
              {product.plainDescription.slice(0, 200)}
              {product.plainDescription.length > 200 ? '...' : ''}
            </p>
          )}

          {/* Variant Selection */}
          {Object.keys(optionGroups).length > 0 && (
            <div className="space-y-4 mb-6">
              {Object.entries(optionGroups).map(([optName, values]) => (
                <div key={optName}>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">{optName}</label>
                  <div className="flex flex-wrap gap-2">
                    {values.map(value => {
                      const variant = product.variants.find(v =>
                        v.options.some(o => o.name === optName && o.value === value)
                      )
                      const isSelected = selectedVariant?.id === variant?.id
                      return (
                        <button
                          key={value}
                          onClick={() => variant && setSelectedVariant(variant)}
                          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                            isSelected
                              ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                              : 'border-gray-200 hover:border-gray-400 text-gray-700'
                          }`}
                        >
                          {value}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-gray-50 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-gray-50 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition-all ${
                addedToCart
                  ? 'bg-green-500 text-white'
                  : 'bg-yellow-400 hover:bg-yellow-500 text-black'
              }`}
            >
              {addedToCart ? (
                <>
                  <Check className="w-5 h-5" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </>
              )}
            </button>
          </div>

          {/* Request Quote */}
          <Link
            href={`/contact?subject=Quote Request: ${encodeURIComponent(product.name)}&message=${encodeURIComponent(`I'd like a quote for ${product.name} (SKU: ${product.sku}). Quantity: ${quantity}.`)}`}
            className="block text-center py-3 px-6 border-2 border-gray-900 rounded-lg font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition-all mb-8"
          >
            Request Volume Quote
          </Link>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Truck className="w-5 h-5 text-gray-600 flex-shrink-0" />
              <span className="text-sm text-gray-600">Free Shipping on $500+</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Shield className="w-5 h-5 text-gray-600 flex-shrink-0" />
              <span className="text-sm text-gray-600">5-Year Warranty</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Zap className="w-5 h-5 text-gray-600 flex-shrink-0" />
              <span className="text-sm text-gray-600">DLC Certified</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-gray-600 flex-shrink-0" />
              <span className="text-sm text-gray-600">UL/ETL Listed</span>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Need help choosing?</p>
            <div className="flex items-center gap-4">
              <a href="mailto:sales@auvolar.com" className="flex items-center gap-1 text-sm text-yellow-600 hover:underline">
                <Mail className="w-4 h-4" /> sales@auvolar.com
              </a>
              <a href="tel:+16268889958" className="flex items-center gap-1 text-sm text-yellow-600 hover:underline">
                <Phone className="w-4 h-4" /> (626) 888-9958
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
