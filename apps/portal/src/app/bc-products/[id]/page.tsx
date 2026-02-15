'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { 
  ChevronRight, Lightbulb, Plus, Minus, ShoppingCart, Heart, Share2,
  CheckCircle2, Phone, Download, FileText, Star, Package, Truck, Shield,
  Clock, Mail, Zap, Sun
} from 'lucide-react'

interface BCProduct {
  id: number
  name: string
  sku: string
  price: number
  salePrice: number
  msrp: number
  description: string
  inventory: number
  inStock: boolean
  weight: number
  images: {
    url: string
    thumbnail: string
    zoom: string
    isPrimary: boolean
  }[]
  variants: {
    id: number
    sku: string
    price: number | null
    inventory: number
    options: { name: string; value: string }[]
  }[]
}

export default function BCProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  
  const [product, setProduct] = useState<BCProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState('description')
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        const res = await fetch(`/api/bigcommerce/products?id=${productId}`)
        const data = await res.json()
        
        if (data.error) {
          setError(data.error)
        } else {
          setProduct(data.product)
          // Set default options
          if (data.product.variants?.[0]?.options) {
            const defaults: Record<string, string> = {}
            data.product.variants[0].options.forEach((opt: any) => {
              defaults[opt.name] = opt.value
            })
            setSelectedOptions(defaults)
          }
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
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-brand"></div>
          <p className="mt-4 text-gray-500">Loading product...</p>
        </main>
        <Footer />
      </div>
    )
  }
  
  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-16 text-center">
          <Lightbulb className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">{error || 'The product could not be found.'}</p>
          <Link href="/products" className="text-brand hover:underline">
            ← Browse All Products
          </Link>
        </main>
        <Footer />
      </div>
    )
  }
  
  // Get unique option names and values
  const optionGroups: Record<string, string[]> = {}
  product.variants.forEach(v => {
    v.options.forEach(opt => {
      if (!optionGroups[opt.name]) {
        optionGroups[opt.name] = []
      }
      if (!optionGroups[opt.name].includes(opt.value)) {
        optionGroups[opt.name].push(opt.value)
      }
    })
  })
  
  // Find selected variant
  const selectedVariant = product.variants.find(v => 
    v.options.every(opt => selectedOptions[opt.name] === opt.value)
  )
  
  const currentPrice = selectedVariant?.price || product.price
  const totalPrice = currentPrice * quantity
  
  // Primary image
  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0]
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm flex-wrap">
              <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium truncate">{product.name}</span>
            </nav>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Images */}
            <div>
              {/* Main Image */}
              <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden">
                {product.images[activeImage] ? (
                  <img
                    src={product.images[activeImage].zoom || product.images[activeImage].url}
                    alt={product.name}
                    className="w-full h-full object-contain p-8"
                  />
                ) : (
                  <Lightbulb className="w-40 h-40 text-gray-300" />
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {product.images.slice(0, 5).map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`aspect-square bg-gray-100 rounded-lg overflow-hidden ${
                        activeImage === i ? 'ring-2 ring-brand' : 'hover:ring-1 ring-gray-300'
                      }`}
                    >
                      <img
                        src={img.thumbnail}
                        alt={`${product.name} view ${i + 1}`}
                        className="w-full h-full object-contain p-2"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Right Column - Product Info */}
            <div>
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                  <CheckCircle2 className="w-3 h-3" />
                  UL Listed
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded">
                  <CheckCircle2 className="w-3 h-3" />
                  DLC Listed
                </span>
              </div>
              
              {/* Title & SKU */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <span>SKU: <span className="font-mono text-gray-700">{selectedVariant?.sku || product.sku}</span></span>
              </div>
              
              {/* Variant Selectors */}
              {Object.keys(optionGroups).length > 0 && (
                <div className="space-y-4 mb-6">
                  {Object.entries(optionGroups).map(([optionName, values]) => (
                    <div key={optionName}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {optionName}: <span className="text-brand">{selectedOptions[optionName]}</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {values.map((value) => (
                          <button
                            key={value}
                            onClick={() => setSelectedOptions({ ...selectedOptions, [optionName]: value })}
                            className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all ${
                              selectedOptions[optionName] === value
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
              
              {/* Pricing Box */}
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
                
                {/* Stock Status */}
                <div className="flex items-center gap-2 mb-4">
                  {product.inStock ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="text-green-600 font-medium">In Stock</span>
                      {product.inventory > 0 && (
                        <span className="text-gray-500">• {product.inventory} units available</span>
                      )}
                    </>
                  ) : (
                    <>
                      <Clock className="w-5 h-5 text-orange-500" />
                      <span className="text-orange-600 font-medium">Ships in 5-7 days</span>
                    </>
                  )}
                </div>
                
                {/* Quantity & Add to Cart */}
                <div className="flex gap-3">
                  <div className="flex items-center border rounded-lg bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-100 rounded-l-lg"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center py-3 border-x focus:outline-none"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-gray-100 rounded-r-lg"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button className="flex-1 bg-brand hover:bg-yellow-400 text-black font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart • ${totalPrice.toFixed(2)}
                  </button>
                </div>
              </div>
              
              {/* Secondary Actions */}
              <div className="flex gap-3 mb-6">
                <Link
                  href="/tools/rfq"
                  className="flex-1 border border-gray-300 py-3 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Request Quote
                </Link>
                <button className="flex-1 border border-gray-300 py-3 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
                  <Heart className="w-4 h-4" />
                  Save to List
                </button>
                <button className="border border-gray-300 py-3 px-4 rounded-lg text-sm font-medium hover:bg-gray-50">
                  <Share2 className="w-4 h-4" />
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
          
          {/* Tabs Section */}
          <div className="mt-12 border-t pt-8">
            <div className="flex gap-1 border-b mb-6 overflow-x-auto">
              {['description', 'specifications', 'downloads'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-medium capitalize whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'border-brand text-brand'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            {/* Description Tab */}
            {activeTab === 'description' && (
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            )}
            
            {/* Specifications Tab */}
            {activeTab === 'specifications' && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Product Details</h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-500">SKU</dt>
                      <dd className="font-medium font-mono">{product.sku}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Weight</dt>
                      <dd className="font-medium">{product.weight} lbs</dd>
                    </div>
                    {product.variants.length > 0 && (
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Variants</dt>
                        <dd className="font-medium">{product.variants.length} options</dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            )}
            
            {/* Downloads Tab */}
            {activeTab === 'downloads' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button className="flex items-center gap-4 p-4 border rounded-xl hover:bg-gray-50 transition-colors text-left">
                  <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Spec Sheet</p>
                    <p className="text-sm text-gray-500">PDF • 1.2 MB</p>
                  </div>
                  <Download className="w-5 h-5 text-gray-400" />
                </button>
                <button className="flex items-center gap-4 p-4 border rounded-xl hover:bg-gray-50 transition-colors text-left">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">IES File</p>
                    <p className="text-sm text-gray-500">IES • 45 KB</p>
                  </div>
                  <Download className="w-5 h-5 text-gray-400" />
                </button>
                <button className="flex items-center gap-4 p-4 border rounded-xl hover:bg-gray-50 transition-colors text-left">
                  <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Installation Guide</p>
                    <p className="text-sm text-gray-500">PDF • 2.8 MB</p>
                  </div>
                  <Download className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
