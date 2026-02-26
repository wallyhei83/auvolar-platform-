'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ShoppingCart, Plus, Minus, Check, CheckCircle2, Clock,
  ChevronLeft, ChevronRight, Share2, Heart, Truck, Shield, Zap,
  Phone, Mail, FileText, Download, Award
} from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { ProductFeatures } from '@/components/products/product-features'
import { ProductVideo } from '@/components/products/product-video'
import { CompatibleAccessories } from '@/components/products/compatible-accessories'

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

// Product video mapping
const PRODUCT_VIDEOS: Record<string, Array<{ url: string; title: string }>> = {
  'ot-series': [
    { url: 'https://www.youtube.com/watch?v=IJiL0PeGotQ', title: 'OT Series Product Overview' },
    { url: 'https://youtu.be/bMVf9FcBRuk', title: 'OT Series Installation Guide' },
  ],
}

function getVideos(slug: string) {
  if (slug.includes('ot-series') || slug.includes('aera-lighting-shoebox-ot')) {
    return PRODUCT_VIDEOS['ot-series'] || []
  }
  return []
}

// Accessory data for products
const PRODUCT_ACCESSORIES: Record<string, Array<{ name: string; sku: string; slug: string; price?: number; image?: string; description: string; category: string }>> = {
  'ot-series': [
    { name: 'Bracket A — Slip Fitter', sku: 'OT-BKT-A', slug: '', price: undefined, image: '/docs/accessories/OT-Bracket-A.jpg', description: 'Standard pole mount slip fitter for round/square poles', category: 'Mounting Brackets' },
    { name: 'Bracket B — Arm Mount with Visor', sku: 'OT-BKT-B', slug: '', price: undefined, image: '/docs/accessories/OT-Bracket-B.jpg', description: 'Adjustable arm mount for 4" round poles, includes visor option', category: 'Mounting Brackets' },
    { name: 'Bracket C — Wall/Ceiling Mount', sku: 'OT-BKT-C', slug: '', price: undefined, image: '/docs/accessories/OT-Bracket-C.jpg', description: 'Direct wall or ceiling mount with expansion anchors', category: 'Mounting Brackets' },
    { name: 'Bracket D — Round/Square Pole Adapter', sku: 'OT-BKT-D', slug: '', price: undefined, image: '/docs/accessories/OT-Bracket-D.jpg', description: 'Universal adapter for round and square light poles', category: 'Mounting Brackets' },
    { name: 'Bracket E — Side-Entry Pole Mount', sku: 'OT-BKT-E', slug: '', price: undefined, image: '/docs/accessories/OT-Bracket-E-1.jpg', description: 'Side-entry mount for 4" round poles with cover', category: 'Mounting Brackets' },
    { name: 'Bracket F — Extended Arm Adapter', sku: 'OT-BKT-F', slug: '', price: undefined, image: '/docs/accessories/OT-Bracket-F.jpg', description: 'Extended arm adapter for offset mounting on poles', category: 'Mounting Brackets' },
    { name: 'Bracket G — Trunnion/Yoke Mount', sku: 'OT-BKT-G', slug: '', price: undefined, image: '/docs/accessories/OT-Bracket-G.jpg', description: 'Adjustable trunnion mount for wall or surface installation', category: 'Mounting Brackets' },
    { name: 'Light Shields (Set)', sku: 'OT-SHIELD', slug: '', price: undefined, image: '/docs/accessories/OT-Light-Shields.jpg', description: 'Glare shields for light control — front, back, left, right', category: 'Shields' },
    { name: 'Photocell Sensor', sku: 'OT-PHOTOCELL', slug: 'photocell-for-wall-pack-area-light', price: 15, image: '', description: 'Dusk-to-dawn automatic on/off, NEMA twist-lock', category: 'Sensors' },
    { name: 'Motion/Occupancy Sensor', sku: 'OT-MOTION', slug: 'motion-sensor-for-high-bay', price: 29, image: '', description: 'PIR motion sensor, waterproof, Zhaga compatible', category: 'Sensors' },
  ],
  'plb-series': [
    { name: 'Photocell Sensor', sku: 'PLB-PHOTOCELL', slug: 'photocell-for-wall-pack-area-light', price: 15, image: '', description: 'Dusk-to-dawn automatic on/off, NEMA twist-lock', category: 'Sensors' },
    { name: 'Motion/Occupancy Sensor', sku: 'PLB-MOTION', slug: 'motion-sensor-for-high-bay', price: 29, image: '', description: 'PIR motion sensor, waterproof, Zhaga compatible', category: 'Sensors' },
  ],
}

function getAccessories(slug: string) {
  if (slug.includes('ot-series') || slug.includes('aera-lighting-shoebox-ot')) {
    return PRODUCT_ACCESSORIES['ot-series'] || []
  }
  if (slug.includes('plb-series') || slug.includes('area-shoebox-light-plb')) {
    return PRODUCT_ACCESSORIES['plb-series'] || []
  }
  return []
}

export default function ProductDetailClient({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addToCart } = useCart()

  // Build option groups: { "Wattage": ["75W","115W","145W"], "AC Input": [...], ... }
  const optionGroups: Record<string, string[]> = {}
  const optionOrder: string[] = [] // preserve option display order
  product.variants.forEach(v => {
    v.options.forEach(opt => {
      if (!optionGroups[opt.name]) {
        optionGroups[opt.name] = []
        optionOrder.push(opt.name)
      }
      if (!optionGroups[opt.name].includes(opt.value)) {
        optionGroups[opt.name].push(opt.value)
      }
    })
  })

  // Track selected value per option independently
  const getInitialSelections = (): Record<string, string> => {
    const sel: Record<string, string> = {}
    if (product.variants.length > 0) {
      // Default to first variant's options
      product.variants[0].options.forEach(opt => {
        sel[opt.name] = opt.value
      })
    }
    return sel
  }
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(getInitialSelections)

  // Find the variant matching all currently selected options
  const findMatchingVariant = (selections: Record<string, string>): ProductVariant | null => {
    return product.variants.find(v =>
      v.options.every(opt => selections[opt.name] === opt.value)
    ) || null
  }

  const selectedVariant = findMatchingVariant(selectedOptions)

  // When user clicks an option value, update that dimension only
  const handleOptionSelect = (optName: string, value: string) => {
    const newSelections = { ...selectedOptions, [optName]: value }
    // Check if this exact combination exists
    const match = findMatchingVariant(newSelections)
    if (match) {
      setSelectedOptions(newSelections)
    } else {
      // Combination doesn't exist — update this option and try to find closest match
      // Keep the newly selected value and try adjusting other options
      setSelectedOptions(newSelections)
    }
  }

  // Determine which option values are available given current selections
  const getAvailableValues = (optName: string): Set<string> => {
    // Filter variants that match all OTHER selected options
    const otherSelections = { ...selectedOptions }
    delete otherSelections[optName]

    const available = new Set<string>()
    product.variants.forEach(v => {
      const matchesOthers = v.options.every(opt => {
        if (opt.name === optName) return true // skip the dimension we're checking
        return otherSelections[opt.name] === undefined || otherSelections[opt.name] === opt.value
      })
      if (matchesOthers) {
        const thisOpt = v.options.find(o => o.name === optName)
        if (thisOpt) available.add(thisOpt.value)
      }
    })
    return available
  }

  const isOTSeries = product.slug.includes('ot-series') || product.slug.includes('aera-lighting-shoebox-ot')
  const isPLBSeries = product.slug.includes('plb-series') || product.slug.includes('area-shoebox-light-plb')

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          {/* Main Image */}
          <div className="relative aspect-[4/3] bg-white rounded-2xl border overflow-hidden">
            {images[selectedImage]?.url ? (
              <img
                src={images[selectedImage].zoom || images[selectedImage].url}
                alt={`${product.name} - Image ${selectedImage + 1}`}
                className="w-full h-full object-contain p-4"
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
            <div className="grid grid-cols-5 gap-2 mt-3">
              {images.slice(0, 5).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square rounded-lg border-2 overflow-hidden transition-all ${
                    selectedImage === i ? 'border-yellow-500 shadow-md' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {img.thumbnail ? (
                    <img src={img.thumbnail} alt={`${product.name} thumbnail ${i + 1}`} className="w-full h-full object-contain p-1.5 bg-gray-50" />
                  ) : (
                    <div className="w-full h-full bg-gray-100" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Product Videos — below thumbnails */}
          <ProductVideo videos={getVideos(product.slug)} />
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
          {isOTSeries ? (
            <div className="mb-6 border rounded-xl overflow-hidden">
              <div className="p-4 bg-gray-50">
                <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-500" />
                  A Proven Benchmark in Commercial Parking Lot Lighting
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Deployed nationwide — serving <strong>CarMax</strong>, <strong>The Home Depot</strong>, <strong>Ontario International Airport (CA)</strong>, and numerous branded automotive dealerships.
                </p>
              </div>
              <details className="group">
                <summary className="cursor-pointer px-4 py-2 text-yellow-600 hover:text-yellow-700 font-medium text-xs flex items-center gap-1 bg-white border-t">
                  Learn more
                  <svg className="w-3 h-3 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="px-4 pb-4 pt-2 space-y-4 text-sm text-gray-600 bg-white">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">10+ Years of Field Validation</h4>
                    <p className="mb-1">Designed for demanding outdoor environments with over a decade of continuous real-world operation:</p>
                    <ul className="list-disc pl-5 space-y-0.5 text-xs">
                      <li>High lumen output with uniform light distribution</li>
                      <li>Low glare for enhanced visual comfort</li>
                      <li>Stable thermal management for long lifespan</li>
                      <li>Reliable in diverse climate conditions</li>
                    </ul>
                    <p className="mt-1 text-xs">Engineered for commercial-grade durability and long-term ROI.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Complete Integrated Lighting System</h4>
                    <p className="mb-1">Not just a fixture — a fully engineered lighting platform:</p>
                    <ul className="list-disc pl-5 space-y-0.5 text-xs">
                      <li>Glare shields for dealership-grade visual control</li>
                      <li>Motion/occupancy sensors for energy optimization</li>
                      <li>7 mounting brackets and electrical adapters</li>
                      <li>Dedicated light poles and intelligent controls</li>
                    </ul>
                    <p className="mt-1 text-xs">Every component designed for seamless compatibility.</p>
                  </div>
                </div>
              </details>
            </div>
          ) : isPLBSeries ? (
            <div className="mb-6 border rounded-xl overflow-hidden">
              <div className="p-4 bg-gray-50">
                <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-500" />
                  Next-Generation Parking Lot Lighting with Tool-Free Maintenance
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Engineered for quick lens replacement, professional optical distribution with BUG rating of 0, and 6 mounting bracket options for maximum installation flexibility.
                </p>
              </div>
              <details className="group">
                <summary className="cursor-pointer px-4 py-2 text-yellow-600 hover:text-yellow-700 font-medium text-xs flex items-center gap-1 bg-white border-t">
                  Learn more
                  <svg className="w-3 h-3 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="px-4 pb-4 pt-2 space-y-3 text-sm text-gray-600 bg-white">
                  <div className="flex gap-2"><span className="text-yellow-500 font-bold">•</span><div><strong className="text-gray-900">Tool-Free Lens Replacement</strong> — Quick and convenient lens replacement for easy maintenance and component recycling.</div></div>
                  <div className="flex gap-2"><span className="text-yellow-500 font-bold">•</span><div><strong className="text-gray-900">Professional Optical Distribution</strong> — Optimized for parking lots with exceptional uniformity and BUG rating of 0.</div></div>
                  <div className="flex gap-2"><span className="text-yellow-500 font-bold">•</span><div><strong className="text-gray-900">Premium LED Chips</strong> — High-performance LED sources ensuring reliable output and long-term stability.</div></div>
                  <div className="flex gap-2"><span className="text-yellow-500 font-bold">•</span><div><strong className="text-gray-900">Pre-Reserved Sensor Positions</strong> — Spacious internal design with dedicated locations for seamless sensor integration.</div></div>
                  <div className="flex gap-2"><span className="text-yellow-500 font-bold">•</span><div><strong className="text-gray-900">Six Mounting Brackets</strong> — Multiple configurations for installation flexibility across various project requirements.</div></div>
                </div>
              </details>
            </div>
          ) : product.plainDescription ? (
            <p className="text-gray-600 mb-6 line-clamp-3">
              {product.plainDescription.slice(0, 200)}
              {product.plainDescription.length > 200 ? '...' : ''}
            </p>
          ) : null}

          {/* Variant Selection — independent per dimension */}
          {optionOrder.length > 0 && (
            <div className="space-y-4 mb-6">
              {optionOrder.map(optName => {
                const values = optionGroups[optName]
                const availableValues = getAvailableValues(optName)
                return (
                  <div key={optName}>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      {optName}: <span className="text-gray-900">{selectedOptions[optName] || ''}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {values.map(value => {
                        const isSelected = selectedOptions[optName] === value
                        const isAvailable = availableValues.has(value)
                        return (
                          <button
                            key={value}
                            onClick={() => isAvailable && handleOptionSelect(optName, value)}
                            disabled={!isAvailable}
                            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                              isSelected
                                ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                                : isAvailable
                                  ? 'border-gray-200 hover:border-gray-400 text-gray-700'
                                  : 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed line-through'
                            }`}
                          >
                            {value}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
              {/* Show selected variant SKU */}
              {selectedVariant && selectedVariant.sku && (
                <p className="text-xs text-gray-400">SKU: {selectedVariant.sku}</p>
              )}
              {!selectedVariant && Object.keys(selectedOptions).length > 0 && (
                <p className="text-xs text-orange-500">This combination is not available. Please adjust your selections.</p>
              )}
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

          {/* Downloads & Resources */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Downloads & Resources</h3>
            {isOTSeries ? (
              <div>
                <div className="grid grid-cols-2 gap-2">
                  {/* Spec Sheet */}
                  <details className="group border rounded-lg overflow-hidden">
                    <summary className="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-50 text-sm list-none [&::-webkit-details-marker]:hidden">
                      <FileText className="w-4 h-4 text-yellow-600" /><span>Spec Sheet (PDF)</span>
                    </summary>
                    <div className="border-t bg-gray-50 p-2">
                      <a href="/docs/spec-sheets/OT-Series-Spec-Sheet.pdf" target="_blank" className="flex items-center gap-2 px-2 py-1 text-xs text-gray-700 hover:text-yellow-600 rounded transition-colors">
                        <Download className="w-3 h-3" /> OT Series Brochure
                      </a>
                    </div>
                  </details>

                  {/* IES Files */}
                  <details className="group border rounded-lg overflow-hidden">
                    <summary className="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-50 text-sm list-none [&::-webkit-details-marker]:hidden">
                      <Download className="w-4 h-4 text-yellow-600" /><span>IES Files <span className="text-[10px] text-gray-400">(8)</span></span>
                    </summary>
                    <div className="border-t bg-gray-50 p-2 grid grid-cols-2 gap-0.5">
                      {['75W','115W','145W','180W','200W','230W','300W','420W'].map(w => (
                        <a key={w} href={`/docs/ies/OT-Series-${w}.ies`} download className="flex items-center gap-1 px-2 py-1 text-xs text-gray-700 hover:text-yellow-600 rounded transition-colors">
                          <Download className="w-3 h-3" /> {w}
                        </a>
                      ))}
                    </div>
                  </details>

                  {/* Install Guides */}
                  <details className="group border rounded-lg overflow-hidden">
                    <summary className="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-50 text-sm list-none [&::-webkit-details-marker]:hidden">
                      <FileText className="w-4 h-4 text-yellow-600" /><span>Install Guides <span className="text-[10px] text-gray-400">(8)</span></span>
                    </summary>
                    <div className="border-t bg-gray-50 p-2 space-y-0.5">
                      {[
                        { label: 'Bracket A — Slip Fitter', file: 'OT-Bracket-A-Install-Guide.pdf' },
                        { label: 'Bracket B — Arm Mount', file: 'OT-Bracket-B-Install-Guide.pdf' },
                        { label: 'Bracket B — With Visor', file: 'OT-Bracket-B-Visor-Install-Guide.pdf' },
                        { label: 'Bracket C — Wall/Ceiling', file: 'OT-Bracket-C-Install-Guide.pdf' },
                        { label: 'Bracket D — Pole Adapter', file: 'OT-Bracket-D-Install-Guide.pdf' },
                        { label: 'Bracket E — Side Entry', file: 'OT-Bracket-E-Install-Guide.pdf' },
                        { label: 'Bracket F — Extended Arm', file: 'OT-Bracket-F-Install-Guide.pdf' },
                        { label: 'Bracket G — Trunnion', file: 'OT-Bracket-G-Install-Guide.pdf' },
                      ].map(g => (
                        <a key={g.file} href={`/docs/install-guides/${g.file}`} target="_blank" className="flex items-center gap-1 px-2 py-1 text-xs text-gray-700 hover:text-yellow-600 rounded transition-colors">
                          <Download className="w-3 h-3" /> {g.label}
                        </a>
                      ))}
                    </div>
                  </details>

                  {/* Warranty */}
                  <a href="/support/returns" className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 text-sm">
                    <Shield className="w-4 h-4 text-yellow-600" /><span>Warranty Info</span>
                  </a>
                </div>
              </div>
            ) : isPLBSeries ? (
              <div>
                <div className="grid grid-cols-2 gap-2">
                  {/* Spec Sheet */}
                  <a href="/docs/spec-sheets/PLB-Series-Spec-Sheet.pdf" target="_blank" className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 text-sm">
                    <FileText className="w-4 h-4 text-yellow-600" /><span>Spec Sheet (PDF)</span>
                  </a>

                  {/* IES Files */}
                  <details className="group border rounded-lg overflow-hidden">
                    <summary className="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-50 text-sm list-none [&::-webkit-details-marker]:hidden">
                      <Download className="w-4 h-4 text-yellow-600" /><span>IES Files <span className="text-[10px] text-gray-400">(18)</span></span>
                    </summary>
                    <div className="border-t bg-gray-50 p-2">
                      {['TypeIII','TypeIV','TypeV'].map(type => (
                        <div key={type}>
                          <p className="text-[10px] font-semibold text-gray-500 px-2 py-1 mt-1 first:mt-0">{type.replace('Type','Type ')}</p>
                          <div className="grid grid-cols-3 gap-0.5">
                            {['75W','100W','150W','200W','240W','300W'].map(w => (
                              <a key={`${type}-${w}`} href={`/docs/ies/PLB-Series-${type}-${w}.ies`} download className="flex items-center gap-1 px-2 py-1 text-xs text-gray-700 hover:text-yellow-600 rounded transition-colors">
                                <Download className="w-3 h-3" /> {w}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </details>

                  {/* Install Guides */}
                  <details className="group border rounded-lg overflow-hidden">
                    <summary className="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-50 text-sm list-none [&::-webkit-details-marker]:hidden">
                      <FileText className="w-4 h-4 text-yellow-600" /><span>Install Guides <span className="text-[10px] text-gray-400">(6)</span></span>
                    </summary>
                    <div className="border-t bg-gray-50 p-2 space-y-0.5">
                      {[
                        { label: 'Bracket A — Slip Fitter', file: 'PLB-Bracket-A-Install-Guide.pdf' },
                        { label: 'Bracket B — Pole Mount', file: 'PLB-Bracket-B-Install-Guide.pdf' },
                        { label: 'Bracket D — Pole Adapter', file: 'PLB-Bracket-D-Install-Guide.pdf' },
                        { label: 'Bracket E — Side Entry', file: 'PLB-Bracket-E-Install-Guide.pdf' },
                        { label: 'Bracket F — Extended Arm', file: 'PLB-Bracket-F-Install-Guide.pdf' },
                        { label: 'Bracket G — Trunnion', file: 'PLB-Bracket-G-Install-Guide.pdf' },
                      ].map(g => (
                        <a key={g.file} href={`/docs/install-guides/${g.file}`} target="_blank" className="flex items-center gap-1 px-2 py-1 text-xs text-gray-700 hover:text-yellow-600 rounded transition-colors">
                          <Download className="w-3 h-3" /> {g.label}
                        </a>
                      ))}
                    </div>
                  </details>

                  {/* Warranty */}
                  <details className="group border rounded-lg overflow-hidden">
                    <summary className="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-50 text-sm list-none [&::-webkit-details-marker]:hidden">
                      <Shield className="w-4 h-4 text-yellow-600" /><span>Warranty Info</span>
                    </summary>
                    <div className="border-t bg-gray-50 p-2">
                      <a href="/docs/install-guides/PLB-Series-Warranty.pdf" target="_blank" className="flex items-center gap-1 px-2 py-1 text-xs text-gray-700 hover:text-yellow-600 rounded transition-colors">
                        <Download className="w-3 h-3" /> PLB Series 5-Year Warranty
                      </a>
                      <a href="/support/returns" className="flex items-center gap-1 px-2 py-1 text-xs text-gray-700 hover:text-yellow-600 rounded transition-colors">
                        <Download className="w-3 h-3" /> Return Policy
                      </a>
                    </div>
                  </details>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <a href={`/api/docs/spec-sheets/${encodeURIComponent(product.sku)}`} target="_blank" className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 text-sm">
                  <FileText className="w-4 h-4 text-yellow-600" /><span>Spec Sheet</span>
                </a>
                <a href={`/api/docs/ies/${encodeURIComponent(product.sku)}`} target="_blank" className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 text-sm">
                  <Download className="w-4 h-4 text-yellow-600" /><span>IES File</span>
                </a>
                <a href={`/api/docs/instructions/${encodeURIComponent(product.sku)}`} target="_blank" className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 text-sm">
                  <FileText className="w-4 h-4 text-yellow-600" /><span>Install Guide</span>
                </a>
                <a href="/support/returns" className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 text-sm">
                  <Shield className="w-4 h-4 text-yellow-600" /><span>Warranty Info</span>
                </a>
              </div>
            )}
          </div>

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
              <a href="tel:+16263428856" className="flex items-center gap-1 text-sm text-yellow-600 hover:underline">
                <Phone className="w-4 h-4" /> (626) 342-8856
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Compatible Accessories Section */}
      <CompatibleAccessories
        accessories={getAccessories(product.slug)}
        productName={product.name}
      />

    </div>
  )
}
