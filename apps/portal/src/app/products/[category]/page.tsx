'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { 
  ChevronRight, Filter, Grid, List, Sun, Building2, Lightbulb, Zap,
  Plus, Minus, ShoppingCart, Heart, Share2, CheckCircle2, Phone,
  Download, FileText, Star, Package, Truck, Shield, Clock
} from 'lucide-react'

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

// Mock product data for product detail page
const mockProducts: Record<string, any> = {
  'HB-UFO-150W': {
    name: 'UFO High Bay 150W',
    sku: 'HB-UFO-150W',
    category: 'Indoor / High Bay',
    price: 89,
    msrp: 129,
    stock: 'In Stock',
    stockQty: 245,
    description: 'Commercial-grade UFO high bay LED for warehouses and manufacturing facilities.',
    specs: { wattage: '150W', lumens: '22,500 lm', cct: '5000K', beam: '120°', voltage: '120-277V' },
    tierPricing: [{ min: 1, price: 89 }, { min: 10, price: 82 }, { min: 25, price: 76 }, { min: 50, price: 69 }],
  },
  'HB-UFO-200W': {
    name: 'UFO High Bay 200W',
    sku: 'HB-UFO-200W',
    category: 'Indoor / High Bay',
    price: 109,
    msrp: 159,
    stock: 'In Stock',
    stockQty: 189,
    description: 'High-output UFO high bay LED for large warehouses and industrial facilities.',
    specs: { wattage: '200W', lumens: '30,000 lm', cct: '5000K', beam: '120°', voltage: '120-277V' },
    tierPricing: [{ min: 1, price: 109 }, { min: 10, price: 99 }, { min: 25, price: 92 }, { min: 50, price: 85 }],
  },
  'WP-50W-5K': {
    name: 'Wall Pack 50W',
    sku: 'WP-50W-5K',
    category: 'Outdoor / Wall Pack',
    price: 59,
    msrp: 89,
    stock: 'In Stock',
    stockQty: 312,
    description: 'LED wall pack for building perimeter and security lighting.',
    specs: { wattage: '50W', lumens: '6,500 lm', cct: '5000K', beam: '110°', voltage: '120-277V' },
    tierPricing: [{ min: 1, price: 59 }, { min: 10, price: 54 }, { min: 25, price: 49 }, { min: 50, price: 45 }],
  },
  'AL-150W-T3': {
    name: 'Area Light 150W',
    sku: 'AL-150W-T3',
    category: 'Outdoor / Area Light',
    price: 149,
    msrp: 219,
    stock: 'Ships in 3 days',
    stockQty: 0,
    description: 'LED area light with Type III distribution for parking lots.',
    specs: { wattage: '150W', lumens: '21,000 lm', cct: '5000K', beam: 'Type III', voltage: '120-277V' },
    tierPricing: [{ min: 1, price: 149 }, { min: 10, price: 139 }, { min: 25, price: 129 }, { min: 50, price: 119 }],
  },
  'LHB-220W': {
    name: 'Linear High Bay 220W',
    sku: 'LHB-220W',
    category: 'Indoor / High Bay',
    price: 129,
    msrp: 189,
    stock: 'In Stock',
    stockQty: 156,
    description: 'Linear LED high bay for aisle lighting in warehouses and retail.',
    specs: { wattage: '220W', lumens: '33,000 lm', cct: '5000K', beam: '120°', voltage: '120-277V' },
    tierPricing: [{ min: 1, price: 129 }, { min: 10, price: 119 }, { min: 25, price: 109 }, { min: 50, price: 99 }],
  },
  'T8-4FT-18W': {
    name: '4ft LED Tube T8 18W',
    sku: 'T8-4FT-18W',
    category: 'Indoor / LED Tubes',
    price: 8,
    msrp: 15,
    stock: 'In Stock',
    stockQty: 2450,
    description: 'Type A+B LED tube, compatible with or without ballast. Direct replacement for fluorescent T8.',
    specs: { wattage: '18W', lumens: '2,200 lm', cct: '5000K', beam: '220°', voltage: '120-277V' },
    tierPricing: [{ min: 1, price: 8 }, { min: 25, price: 7 }, { min: 100, price: 6 }, { min: 500, price: 5 }],
  },
}

// Sample products for category listings
const sampleProducts = [
  { sku: 'HB-UFO-150W', name: 'UFO High Bay 150W', price: 89, badge: 'Best Seller' },
  { sku: 'HB-UFO-200W', name: 'UFO High Bay 200W', price: 109, badge: 'DLC' },
  { sku: 'WP-50W-5K', name: 'Wall Pack 50W', price: 59, badge: 'DLC' },
  { sku: 'AL-150W-T3', name: 'Area Light 150W', price: 149, badge: 'New' },
  { sku: 'SL-100W-AIO', name: 'Solar Street Light 100W', price: 299, badge: 'DLC' },
  { sku: 'SL-60W-AIO', name: 'Solar Street Light 60W', price: 199, badge: null },
  { sku: 'FL-200W', name: 'LED Flood Light 200W', price: 129, badge: 'DLC' },
  { sku: 'CL-100W', name: 'Canopy Light 100W', price: 89, badge: null },
]

// Category Page Component
function CategoryPage({ config, category }: { config: any; category: string }) {
  const Icon = config.icon

  return (
    <main>
      {/* Breadcrumb */}
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

      {/* Category Header */}
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

      {/* Subcategories Grid */}
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

        {/* Products Grid */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">All {config.title}</h2>
          <div className="flex items-center gap-4">
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>Sort: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sampleProducts.map((product) => (
            <Link
              key={product.sku}
              href={`/products/${product.sku}`}
              className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square bg-gray-100 relative">
                {product.badge && (
                  <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-medium rounded ${
                    product.badge === 'Best Seller' ? 'bg-brand text-black' :
                    product.badge === 'New' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                  }`}>{product.badge}</span>
                )}
                <div className="w-full h-full flex items-center justify-center">
                  <Lightbulb className="w-16 h-16 text-gray-300" />
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-500 mb-1">{product.sku}</p>
                <h3 className="font-medium group-hover:text-brand transition-colors">{product.name}</h3>
                <p className="text-lg font-bold mt-2">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

// Product Detail Page Component
function ProductDetailPage({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('specs')

  const getCurrentPrice = () => {
    const tier = product.tierPricing.findLast((t: any) => quantity >= t.min)
    return tier?.price || product.price
  }

  return (
    <main>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-32 h-32 text-gray-300" />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">DLC Listed</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded">UL Listed</span>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-500 mb-4">SKU: {product.sku} | {product.category}</p>
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Pricing */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-4xl font-bold">${getCurrentPrice()}</span>
                <span className="text-gray-400 line-through text-lg">MSRP ${product.msrp}</span>
                <span className="text-green-600 font-medium">Save {Math.round((1 - getCurrentPrice()/product.msrp) * 100)}%</span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">Volume Pricing:</p>
              <div className="grid grid-cols-4 gap-2 text-sm">
                {product.tierPricing.map((tier: any, i: number) => (
                  <div key={i} className={`text-center p-2 rounded ${quantity >= tier.min ? 'bg-brand/20 border-brand' : 'bg-white'} border`}>
                    <p className="font-medium">{tier.min}+</p>
                    <p className="text-gray-600">${tier.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              {product.stockQty > 0 ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-green-600 font-medium">{product.stock}</span>
                  <span className="text-gray-500">({product.stockQty} units)</span>
                </>
              ) : (
                <>
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span className="text-orange-600 font-medium">{product.stock}</span>
                </>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4 mb-6">
              <div className="flex items-center border rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-100">
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-x py-3"
                />
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-100">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button className="flex-1 bg-brand hover:bg-yellow-400 text-black font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart - ${(getCurrentPrice() * quantity).toFixed(2)}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 text-center text-sm border-t pt-6">
              <div>
                <Truck className="w-6 h-6 mx-auto mb-1 text-brand" />
                <p className="font-medium">Ships in 24h</p>
              </div>
              <div>
                <Shield className="w-6 h-6 mx-auto mb-1 text-brand" />
                <p className="font-medium">5 Year Warranty</p>
              </div>
              <div>
                <Phone className="w-6 h-6 mx-auto mb-1 text-brand" />
                <p className="font-medium">Expert Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Specs & Downloads Tabs */}
        <div className="mt-12 border-t pt-8">
          <div className="flex gap-4 border-b mb-6">
            {['specs', 'downloads', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-4 font-medium capitalize ${activeTab === tab ? 'border-b-2 border-brand text-brand' : 'text-gray-500'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'specs' && (
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b">
                  <span className="text-gray-600 capitalize">{key}</span>
                  <span className="font-medium">{value as string}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'downloads' && (
            <div className="grid md:grid-cols-3 gap-4">
              {['Cut Sheet', 'IES File', 'Installation Guide'].map(doc => (
                <button key={doc} className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50">
                  <FileText className="w-6 h-6 text-gray-400" />
                  <span>{doc}</span>
                  <Download className="w-4 h-4 ml-auto" />
                </button>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="text-center py-8 text-gray-500">
              <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No reviews yet. Be the first to review this product.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

// Main Page Component - decides between category and product
export default function DynamicProductPage() {
  const params = useParams()
  const category = params.category as string
  
  // Check if it's a known category
  const config = categoryConfig[category]
  
  // Check if it's a product SKU
  const product = mockProducts[category]
  
  if (config) {
    // It's a category page
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <CategoryPage config={config} category={category} />
        <Footer />
      </div>
    )
  }
  
  if (product) {
    // It's a product detail page
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <ProductDetailPage product={product} />
        <Footer />
      </div>
    )
  }
  
  // Not found
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
