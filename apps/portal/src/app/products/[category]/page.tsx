'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { 
  ChevronRight, Filter, Grid, List, Sun, Building2, Lightbulb, Zap,
  Plus, Minus, ShoppingCart, Heart, Share2, CheckCircle2, Phone,
  Download, FileText, Star, Package, Truck, Shield, Clock, Mail,
  Info, ChevronDown, Image as ImageIcon, Play, Award, Ruler, Thermometer
} from 'lucide-react'
import { products, getProductsByCategory, type Product } from '@/lib/product-data'

// Known categories
const categoryConfig: Record<string, {
  title: string
  description: string
  icon: any
  subcategories: { name: string; slug: string; count: number }[]
}> = {
  outdoor: {
    title: 'Outdoor Lighting',
    description: 'Commercial outdoor LED lighting for parking lots, building perimeters, and landscapes.',
    icon: Sun,
    subcategories: [
      { name: 'Area Lights', slug: 'area-light', count: 24 },
      { name: 'Flood Lights', slug: 'flood', count: 18 },
      { name: 'Wall Packs', slug: 'wall-pack', count: 32 },
      { name: 'Canopy Lights', slug: 'canopy', count: 15 },
      { name: 'Bollard Lights', slug: 'bollard', count: 8 },
      { name: 'Post Top Lights', slug: 'post-top', count: 12 },
    ]
  },
  solar: {
    title: 'Solar Lighting',
    description: 'Off-grid solar LED lighting solutions for streets, pathways, and remote areas.',
    icon: Sun,
    subcategories: [
      { name: 'Solar Street Lights', slug: 'street', count: 16 },
      { name: 'Solar Flood Lights', slug: 'flood', count: 10 },
      { name: 'Solar Garden Lights', slug: 'garden', count: 14 },
      { name: 'Solar Wall Lights', slug: 'wall', count: 8 },
    ]
  },
  indoor: {
    title: 'Indoor Lighting',
    description: 'Commercial indoor LED lighting for warehouses, offices, retail, and more.',
    icon: Building2,
    subcategories: [
      { name: 'High Bay Lights', slug: 'high-bay', count: 28 },
      { name: 'Troffers & Panels', slug: 'troffer', count: 36 },
      { name: 'LED Tubes', slug: 'tubes', count: 24 },
      { name: 'Strip Lights', slug: 'strip', count: 20 },
      { name: 'Wrap Fixtures', slug: 'wrap', count: 12 },
      { name: 'Vapor Tight', slug: 'vapor-tight', count: 8 },
      { name: 'Downlights', slug: 'downlight', count: 16 },
      { name: 'Garage Lights', slug: 'garage', count: 10 },
    ]
  },
  retrofit: {
    title: 'Retrofit Solutions',
    description: 'LED retrofit kits and tubes to upgrade existing fixtures without replacement.',
    icon: Lightbulb,
    subcategories: [
      { name: 'LED Tubes', slug: 'tubes', count: 24 },
      { name: 'Retrofit Kits', slug: 'kits', count: 18 },
      { name: 'Corn Bulbs', slug: 'corn-bulb', count: 16 },
      { name: 'PL Lamps', slug: 'pl-lamp', count: 10 },
    ]
  },
  controls: {
    title: 'Lighting Controls',
    description: 'Smart controls, sensors, and dimmers for energy management.',
    icon: Zap,
    subcategories: [
      { name: 'Occupancy Sensors', slug: 'occupancy', count: 12 },
      { name: 'Photocells', slug: 'photocell', count: 8 },
      { name: 'Dimmers', slug: 'dimmer', count: 10 },
      { name: 'Smart Controls', slug: 'smart', count: 6 },
    ]
  }
}

// Category Page Component
function CategoryPage({ config, category }: { config: any; category: string }) {
  const Icon = config.icon
  const categoryProducts = getProductsByCategory(category)

  return (
    <main>
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{config.title}</span>
          </nav>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-brand/20 rounded-lg">
              <Icon className="w-8 h-8 text-brand" />
            </div>
            <h1 className="text-3xl font-bold">{config.title}</h1>
          </div>
          <p className="text-gray-300 max-w-2xl">{config.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-6">Browse by Type</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {config.subcategories.map((sub: any) => (
            <Link
              key={sub.slug}
              href={`/products/${category}/${sub.slug}`}
              className="group bg-gray-50 hover:bg-brand/5 border hover:border-brand rounded-lg p-4 text-center transition-all"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <Lightbulb className="w-8 h-8 text-gray-400 group-hover:text-brand transition-colors" />
              </div>
              <h3 className="font-medium text-sm mb-1">{sub.name}</h3>
              <p className="text-xs text-gray-500">{sub.count} Products</p>
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">All {config.title} ({categoryProducts.length} Products)</h2>
          <select className="border rounded-lg px-3 py-2 text-sm">
            <option>Sort: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <Link
              key={product.sku}
              href={`/products/${product.sku}`}
              className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square bg-gray-100 relative">
                {product.stockQty > 100 && (
                  <span className="absolute top-2 left-2 px-2 py-1 text-xs font-medium rounded bg-brand text-black">Best Seller</span>
                )}
                {product.stockQty === 0 && (
                  <span className="absolute top-2 left-2 px-2 py-1 text-xs font-medium rounded bg-orange-500 text-white">Ships in 3-5 Days</span>
                )}
                <div className="w-full h-full flex items-center justify-center">
                  <Lightbulb className="w-16 h-16 text-gray-300" />
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-500 mb-1">{product.sku}</p>
                <h3 className="font-medium group-hover:text-brand transition-colors line-clamp-2">{product.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{product.shortDescription}</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <p className="text-lg font-bold">${product.price}</p>
                  {product.msrp > product.price && (
                    <p className="text-sm text-gray-400 line-through">${product.msrp}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

// Enhanced Product Detail Page Component
function ProductDetailPage({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('specs')
  const [activeImage, setActiveImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(product.selectedVariant || {})

  const getCurrentPrice = () => {
    const tier = product.tierPricing?.findLast((t) => quantity >= t.min)
    return tier?.price || product.price
  }

  const totalPrice = getCurrentPrice() * quantity

  return (
    <main className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href={`/products/${product.category?.toLowerCase().replace(' ', '-')}`} className="text-gray-500 hover:text-gray-700">
              {product.category}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div>
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center mb-4 relative">
              <Lightbulb className="w-40 h-40 text-gray-300" />
              {/* Image zoom hint */}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <ImageIcon className="w-3 h-3" /> Hover to zoom
              </div>
            </div>
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-5 gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square bg-gray-100 rounded-lg flex items-center justify-center ${
                    activeImage === i ? 'ring-2 ring-brand' : 'hover:ring-1 ring-gray-300'
                  }`}
                >
                  <Lightbulb className="w-8 h-8 text-gray-300" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div>
            {/* Certifications Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              {product.certifications?.map((cert, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                  {cert.verified && <CheckCircle2 className="w-3 h-3" />}
                  {cert.name}
                </span>
              ))}
            </div>

            {/* Title & SKU */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span>SKU: <span className="font-mono text-gray-700">{product.sku}</span></span>
              {product.series && <span>Series: {product.series}</span>}
            </div>

            {/* Short Description */}
            <p className="text-gray-600 mb-6">{product.shortDescription || product.description}</p>

            {/* Quick Specs Grid */}
            {product.quickSpecs && product.quickSpecs.length > 0 && (
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6 p-4 bg-gray-50 rounded-xl">
                {product.quickSpecs.map((spec, i) => {
                  const IconComponent = spec.icon || Zap
                  return (
                    <div key={i} className="text-center">
                      <IconComponent className="w-5 h-5 mx-auto text-brand mb-1" />
                      <p className="font-semibold text-sm">{spec.value}</p>
                      <p className="text-xs text-gray-500">{spec.label}</p>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Variant Selectors */}
            {product.variants && Object.keys(product.variants).length > 0 && (
              <div className="space-y-4 mb-6">
                {Object.entries(product.variants).map(([key, values]) => (
                  values && values.length > 0 && (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{key}</label>
                      <div className="flex flex-wrap gap-2">
                        {values.map((value: string) => (
                          <button
                            key={value}
                            onClick={() => setSelectedVariant({ ...selectedVariant, [key]: value })}
                            className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all ${
                              selectedVariant[key] === value
                                ? 'border-brand bg-brand/10 text-brand'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>
            )}

            {/* Pricing Box */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-gray-900">${getCurrentPrice().toFixed(2)}</span>
                {product.msrp && getCurrentPrice() < product.msrp && (
                  <>
                    <span className="text-lg text-gray-400 line-through">MSRP ${product.msrp}</span>
                    <span className="text-green-600 font-medium text-sm">
                      Save {Math.round((1 - getCurrentPrice() / product.msrp) * 100)}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-4">Per unit • Volume discounts available</p>

              {/* Volume Pricing Table */}
              {product.tierPricing && product.tierPricing.length > 1 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Volume Pricing:</p>
                  <div className="grid grid-cols-5 gap-1">
                    {product.tierPricing.map((tier, i) => (
                      <div
                        key={i}
                        className={`text-center p-2 rounded-lg text-sm ${
                          quantity >= tier.min && (tier.max === null || tier.max === undefined || quantity <= tier.max)
                            ? 'bg-brand text-black font-semibold'
                            : 'bg-white border'
                        }`}
                      >
                        <p className="font-medium">{tier.label || `${tier.min}+`}</p>
                        <p>${tier.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-4">
                {product.stockQty > 0 ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-green-600 font-medium">{product.stock}</span>
                    <span className="text-gray-500">• {product.stockQty} units available</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-5 h-5 text-orange-500" />
                    <span className="text-orange-600 font-medium">{product.stock}</span>
                  </>
                )}
              </div>
              {product.leadTime && (
                <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
                  <Truck className="w-4 h-4" /> {product.leadTime}
                  {product.warehouse && ` from ${product.warehouse}`}
                </p>
              )}

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
              <button className="flex-1 border border-gray-300 py-3 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                Request Quote
              </button>
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
                <p className="text-xs font-medium">{product.warranty?.years || 5} Year Warranty</p>
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
            {['specs', 'downloads', 'applications', 'accessories', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium capitalize whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-brand text-brand'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'specs' ? 'Specifications' : tab}
              </button>
            ))}
          </div>

          {/* Specifications Tab */}
          {activeTab === 'specs' && product.specs && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(product.specs).map(([category, specs]) => (
                specs && Object.keys(specs).length > 0 && (
                  <div key={category}>
                    <h3 className="font-semibold text-gray-900 mb-4 capitalize">{category}</h3>
                    <div className="space-y-2">
                      {Object.entries(specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">{key}</span>
                          <span className="font-medium text-gray-900">{value as string}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          )}

          {/* Downloads Tab */}
          {activeTab === 'downloads' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(product.downloads || [
                { name: 'Cut Sheet / Spec Sheet', type: 'PDF', size: '1.2 MB' },
                { name: 'IES Photometric File', type: 'IES', size: '45 KB' },
                { name: 'Installation Guide', type: 'PDF', size: '2.8 MB' },
              ]).map((doc, i) => (
                <button
                  key={i}
                  className="flex items-center gap-4 p-4 border rounded-xl hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{doc.name}</p>
                    <p className="text-sm text-gray-500">{doc.type} • {doc.size}</p>
                  </div>
                  <Download className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </div>
          )}

          {/* Applications Tab */}
          {activeTab === 'applications' && (
            <div>
              <p className="text-gray-600 mb-6">This product is ideal for the following applications:</p>
              <div className="flex flex-wrap gap-3">
                {(product.applications || ['Warehouse', 'Manufacturing', 'Retail']).map((app) => (
                  <Link
                    key={app}
                    href={`/applications/${app.toLowerCase().replace(' ', '-')}`}
                    className="px-4 py-2 bg-gray-100 hover:bg-brand/10 rounded-lg font-medium transition-colors"
                  >
                    {app}
                  </Link>
                ))}
              </div>
              {product.replaces && product.replaces.length > 0 && (
                <div className="mt-8">
                  <h4 className="font-semibold mb-3">Replaces Traditional Fixtures:</h4>
                  <div className="flex flex-wrap gap-3">
                    {product.replaces.map((item) => (
                      <span key={item} className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Accessories Tab */}
          {activeTab === 'accessories' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {(product.accessories || [
                { sku: 'ACC-001', name: 'Motion Sensor', price: 29 },
                { sku: 'ACC-002', name: 'Power Cord 6ft', price: 15 },
              ]).map((acc) => (
                <div key={acc.sku} className="border rounded-xl p-4">
                  <div className="w-full aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                    <Package className="w-10 h-10 text-gray-300" />
                  </div>
                  <p className="text-xs text-gray-500">{acc.sku}</p>
                  <p className="font-medium">{acc.name}</p>
                  <p className="text-lg font-bold mt-2">${acc.price}</p>
                  <button className="w-full mt-3 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="text-center py-12">
              <Star className="w-16 h-16 mx-auto mb-4 text-gray-200" />
              <h3 className="text-lg font-medium mb-2">No Reviews Yet</h3>
              <p className="text-gray-500 mb-4">Be the first to review this product.</p>
              <button className="px-6 py-2 bg-brand text-black rounded-lg font-medium hover:bg-yellow-400">
                Write a Review
              </button>
            </div>
          )}
        </div>

        {/* Related Products */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <div className="mt-12 border-t pt-8">
            <h2 className="text-xl font-semibold mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {product.relatedProducts.slice(0, 4).map((sku) => {
                const related = products[sku]
                if (!related) return null
                return (
                  <Link
                    key={sku}
                    href={`/products/${sku}`}
                    className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-square bg-gray-100 flex items-center justify-center">
                      <Lightbulb className="w-12 h-12 text-gray-300" />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-500">{related.sku}</p>
                      <h3 className="font-medium group-hover:text-brand transition-colors line-clamp-2">{related.name}</h3>
                      <p className="text-lg font-bold mt-2">${related.price}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

// Main Page Component
export default function DynamicProductPage() {
  const params = useParams()
  const category = params.category as string

  const config = categoryConfig[category]
  const product = products[category]

  if (config) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <CategoryPage config={config} category={category} />
        <Footer />
      </div>
    )
  }

  if (product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <ProductDetailPage product={product} />
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-16 text-center">
        <Lightbulb className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product or category "{category}" could not be found.</p>
        <Link href="/products" className="text-brand hover:underline">
          ← Browse All Products
        </Link>
      </main>
      <Footer />
    </div>
  )
}
