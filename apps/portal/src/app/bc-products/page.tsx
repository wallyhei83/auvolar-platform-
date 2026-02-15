'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { 
  ChevronRight, Loader2, Check, Filter, Lightbulb,
  Plus, Minus, ShoppingCart, Heart, Share2, CheckCircle2,
  Phone, Download, FileText, Truck, Shield, Clock, Mail
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { BCProductGrid } from '@/components/products/bc-product-grid'

// Merged category definitions
const mergedCategories = [
  { id: 'area-parking', name: 'Area Lights', bcIds: [26, 43], description: 'LED area lights for parking lots and outdoor spaces' },
  { id: 'high-bay', name: 'High Bay Lights', bcIds: [30, 31], description: 'UFO and linear high bay for warehouses' },
  { id: 'wall-pack', name: 'Wall Packs', bcIds: [27], description: 'Building perimeter and security lighting' },
  { id: 'flood', name: 'Flood Lights', bcIds: [28], description: 'High-output outdoor flood lighting' },
  { id: 'troffer-panel', name: 'Troffers & Panels', bcIds: [33], description: 'Office and commercial ceiling fixtures' },
  { id: 'led-tube', name: 'LED Tubes', bcIds: [36], description: 'T8/T5 fluorescent replacement tubes' },
  { id: 'canopy', name: 'Canopy Lights', bcIds: [53], description: 'Gas station and garage canopy fixtures' },
  { id: 'landscape', name: 'Landscape Lighting', bcIds: [45, 46], description: 'Bollards and post top lights' },
  { id: 'solar', name: 'Solar Lighting', bcIds: [29, 47, 59], description: 'Off-grid solar LED solutions' },
  { id: 'vapor-tight', name: 'Vapor Tight', bcIds: [35], description: 'IP65+ for harsh environments' },
]

// Product Detail Component
function ProductDetail({ productId }: { productId: string }) {
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        const res = await fetch(`/api/bigcommerce/products?id=${productId}`)
        const data = await res.json()
        
        if (data.error) {
          setError(data.error)
        } else if (data.product) {
          setProduct(data.product)
          // Set default options
          if (data.product.variants?.[0]?.options) {
            const defaults: Record<string, string> = {}
            data.product.variants[0].options.forEach((opt: any) => {
              defaults[opt.name] = opt.value
            })
            setSelectedOptions(defaults)
          }
        } else {
          setError('Product not found')
        }
      } catch (err) {
        setError('Failed to load product')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [productId])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <Loader2 className="w-12 h-12 mx-auto animate-spin text-brand" />
        <p className="mt-4 text-gray-500">Loading product...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <Lightbulb className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">{error || 'The product could not be found.'}</p>
        <Link href="/bc-products" className="text-brand hover:underline">← Browse All Products</Link>
      </div>
    )
  }

  // Get unique option groups
  const optionGroups: Record<string, string[]> = {}
  product.variants?.forEach((v: any) => {
    v.options?.forEach((opt: any) => {
      if (!optionGroups[opt.name]) optionGroups[opt.name] = []
      if (!optionGroups[opt.name].includes(opt.value)) optionGroups[opt.name].push(opt.value)
    })
  })

  const currentPrice = product.price
  const totalPrice = currentPrice * quantity
  const primaryImage = product.images?.find((img: any) => img.isPrimary) || product.images?.[0]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/bc-products" className="hover:text-gray-700">Products</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
            {product.images?.[activeImage] ? (
              <img
                src={product.images[activeImage].zoom || product.images[activeImage].url}
                alt={product.name}
                className="w-full h-full object-contain p-8"
              />
            ) : (
              <Lightbulb className="w-40 h-40 text-gray-300" />
            )}
          </div>
          {product.images?.length > 1 && (
            <div className="grid grid-cols-5 gap-2 mt-4">
              {product.images.slice(0, 5).map((img: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden ${
                    activeImage === i ? 'ring-2 ring-brand' : 'hover:ring-1 ring-gray-300'
                  }`}
                >
                  <img src={img.thumbnail} alt="" className="w-full h-full object-contain p-2" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
              <CheckCircle2 className="w-3 h-3" /> UL Listed
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded">
              <CheckCircle2 className="w-3 h-3" /> DLC Listed
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-sm text-gray-500 mb-6">SKU: <span className="font-mono">{product.sku}</span></p>

          {/* Options */}
          {Object.keys(optionGroups).length > 0 && (
            <div className="space-y-4 mb-6">
              {Object.entries(optionGroups).map(([name, values]) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {name}: <span className="text-brand">{selectedOptions[name]}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {values.map((value) => (
                      <button
                        key={value}
                        onClick={() => setSelectedOptions({ ...selectedOptions, [name]: value })}
                        className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all ${
                          selectedOptions[name] === value
                            ? 'border-brand bg-brand/10 text-brand'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pricing */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl font-bold text-gray-900">${currentPrice.toFixed(2)}</span>
              {product.msrp > currentPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">MSRP ${product.msrp.toFixed(2)}</span>
                  <span className="text-green-600 font-medium text-sm">
                    Save {Math.round((1 - currentPrice / product.msrp) * 100)}%
                  </span>
                </>
              )}
            </div>
            <p className="text-sm text-gray-500 mb-4">Per unit • Volume discounts available</p>

            <div className="flex items-center gap-2 mb-4">
              {product.inStock ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-green-600 font-medium">In Stock</span>
                  {product.inventory > 0 && <span className="text-gray-500">• {product.inventory} units</span>}
                </>
              ) : (
                <>
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span className="text-orange-600 font-medium">Ships in 5-7 days</span>
                </>
              )}
            </div>

            <div className="flex gap-3">
              <div className="flex items-center border rounded-lg bg-white">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-100 rounded-l-lg">
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center py-3 border-x focus:outline-none"
                />
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-100 rounded-r-lg">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button className="flex-1 bg-brand hover:bg-yellow-400 text-black font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart • ${totalPrice.toFixed(2)}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-6">
            <Link href="/tools/rfq" className="flex-1 border border-gray-300 py-3 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" /> Request Quote
            </Link>
            <button className="flex-1 border border-gray-300 py-3 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
              <Heart className="w-4 h-4" /> Save to List
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="text-center">
              <Truck className="w-6 h-6 mx-auto mb-1 text-brand" />
              <p className="text-xs font-medium">Free Shipping</p>
              <p className="text-xs text-gray-500">Orders $500+</p>
            </div>
            <div className="text-center">
              <Shield className="w-6 h-6 mx-auto mb-1 text-brand" />
              <p className="text-xs font-medium">5 Year Warranty</p>
              <p className="text-xs text-gray-500">Full Coverage</p>
            </div>
            <div className="text-center">
              <Phone className="w-6 h-6 mx-auto mb-1 text-brand" />
              <p className="text-xs font-medium">Expert Support</p>
              <p className="text-xs text-gray-500">Mon-Fri 8am-6pm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-xl font-semibold mb-4">Product Details</h2>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product.description || '' }} />
      </div>
    </div>
  )
}

// Products List Component
function ProductsList() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('id')
  const categoryParam = searchParams.get('category')
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam)
  const [sortBy, setSortBy] = useState('featured')

  // If product ID is provided, show product detail
  if (productId) {
    return <ProductDetail productId={productId} />
  }

  const getActiveBcIds = (): number[] | undefined => {
    if (!selectedCategory) return undefined
    const cat = mergedCategories.find(c => c.id === selectedCategory)
    return cat?.bcIds
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0 hidden md:block">
          <div className="bg-white rounded-lg p-4 sticky top-4">
            <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
            <div className="space-y-2">
              {mergedCategories.map(cat => (
                <label key={cat.id} className="flex items-center gap-2 cursor-pointer hover:text-brand">
                  <input
                    type="checkbox"
                    checked={selectedCategory === cat.id}
                    onChange={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                    className="w-4 h-4 rounded border-gray-300 text-brand focus:ring-brand"
                  />
                  <span className="text-sm">{cat.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="flex-1">
          {/* Category Tabs */}
          <div className="bg-white rounded-lg p-2 mb-6 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !selectedCategory ? 'bg-brand text-black' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Products
            </button>
            {mergedCategories.slice(0, 6).map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat.id ? 'bg-brand text-black' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort & Status */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-sm text-green-600">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Live from BigCommerce
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <BCProductGrid 
            categoryFilter={getActiveBcIds()?.join(',') || undefined}
            limit={20} 
            showCategories={false} 
          />
        </div>
      </div>
    </div>
  )
}

// Main Page
function ProductsContent() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('id')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Header - only show for list view */}
      {!productId && (
        <>
          <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <nav className="flex items-center gap-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-gray-700">Home</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="font-medium text-gray-900">All Products</span>
              </nav>
            </div>
          </div>
          <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <h1 className="text-2xl font-bold text-gray-900">LED Lighting Products</h1>
              <p className="mt-1 text-gray-600">Commercial & industrial LED lighting • DLC & UL Listed • Ships in 24h</p>
              <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-600">
                <span className="flex items-center gap-1"><Check className="w-4 h-4 text-brand" /> DLC & UL Listed</span>
                <span className="flex items-center gap-1"><Check className="w-4 h-4 text-brand" /> 5-10 Year Warranty</span>
                <span className="flex items-center gap-1"><Check className="w-4 h-4 text-brand" /> Free Shipping $500+</span>
              </div>
            </div>
          </div>
        </>
      )}

      <ProductsList />
      <Footer />
    </div>
  )
}

export default function BCProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}
