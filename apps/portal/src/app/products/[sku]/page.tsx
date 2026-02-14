'use client'

import { useState } from 'react'
import Link from 'next/link'
import { use } from 'react'
import { 
  ChevronRight, Zap, Shield, Truck, Clock, FileText, Download,
  Plus, Minus, ShoppingCart, Heart, Share2, CheckCircle2, Phone,
  MessageSquare, ChevronDown, Star, Package
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

// Mock product data
const mockProduct = {
  id: '1',
  name: 'UFO High Bay Light',
  sku: 'HB-UFO-150W-5K',
  category: 'High Bay Lights',
  categorySlug: 'high-bay',
  description: 'Commercial-grade UFO high bay LED light for warehouses, manufacturing facilities, gymnasiums, and large retail spaces. Features excellent heat dissipation, wide beam angle, and industry-leading efficacy.',
  
  // Pricing
  price: 89,
  msrp: 129,
  tierPricing: [
    { min: 1, max: 9, price: 89 },
    { min: 10, max: 24, price: 82 },
    { min: 25, max: 49, price: 76 },
    { min: 50, max: null, price: 69 },
  ],
  
  // Inventory
  stock: 'In Stock',
  stockQty: 245,
  leadTime: 'Ships in 24h',
  warehouse: 'Houston, TX',
  
  // Specifications
  specs: {
    wattage: '150W',
    lumens: '22,500 lm',
    efficacy: '150 lm/W',
    cct: '5000K (Daylight)',
    cri: '> 80',
    beamAngle: '120°',
    voltage: '120-277V AC',
    powerFactor: '> 0.95',
    thd: '< 15%',
    dimming: '0-10V Dimmable',
    ip: 'IP65',
    ik: 'IK08',
    operatingTemp: '-40°F to 122°F (-40°C to 50°C)',
    lifespan: '100,000 hours (L70)',
    warranty: '5 Year',
  },
  
  // Physical
  dimensions: {
    diameter: '13.4" (340mm)',
    height: '7.9" (200mm)',
    weight: '8.8 lbs (4 kg)',
  },
  
  // Mounting
  mounting: ['Hook Mount', 'Pendant Mount', 'Surface Mount (with bracket)'],
  
  // Certifications
  certifications: ['DLC 5.1 Premium', 'UL Listed', 'FCC', 'RoHS'],
  dlcId: 'DLC-12345',
  
  // Documents
  documents: [
    { name: 'Cut Sheet / Spec Sheet', type: 'PDF', size: '1.2 MB', url: '#' },
    { name: 'IES File', type: 'IES', size: '45 KB', url: '#' },
    { name: 'Installation Guide', type: 'PDF', size: '890 KB', url: '#' },
    { name: 'DLC Certificate', type: 'PDF', size: '120 KB', url: '#' },
    { name: 'Wiring Diagram', type: 'PDF', size: '340 KB', url: '#' },
    { name: 'UL Certificate', type: 'PDF', size: '95 KB', url: '#' },
  ],
  
  // Images
  images: [
    '/images/products/hb-ufo-150w-1.jpg',
    '/images/products/hb-ufo-150w-2.jpg',
    '/images/products/hb-ufo-150w-3.jpg',
    '/images/products/hb-ufo-150w-4.jpg',
  ],
  
  // Variants
  variants: {
    wattage: ['100W', '150W', '200W', '240W'],
    cct: ['4000K', '5000K'],
  },
  
  // Related
  accessories: [
    { name: 'Motion Sensor', sku: 'MS-PIR-HB', price: 29 },
    { name: 'Emergency Backup', sku: 'EM-90MIN', price: 49 },
    { name: 'Reflector 60°', sku: 'RF-60-HB', price: 19 },
    { name: 'Hook Mount Kit', sku: 'MK-HOOK-HB', price: 12 },
  ],
  
  // Replaces
  replaces: ['400W Metal Halide', '320W HPS', '6-lamp T5HO'],
  
  // Applications
  applications: ['Warehouse', 'Manufacturing', 'Gymnasium', 'Retail', 'Cold Storage'],
}

export default function ProductDetailPage({ params }: { params: Promise<{ sku: string }> }) {
  const { sku } = use(params)
  const product = mockProduct // In real app, fetch by SKU
  
  const [quantity, setQuantity] = useState(1)
  const [selectedWattage, setSelectedWattage] = useState('150W')
  const [selectedCCT, setSelectedCCT] = useState('5000K')
  const [activeTab, setActiveTab] = useState('specs')
  const [selectedImage, setSelectedImage] = useState(0)

  // Calculate tier price
  const getTierPrice = (qty: number) => {
    const tier = product.tierPricing.find(t => qty >= t.min && (t.max === null || qty <= t.max))
    return tier?.price || product.price
  }
  
  const currentPrice = getTierPrice(quantity)
  const totalPrice = currentPrice * quantity

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/products" className="hover:text-gray-700">Products</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/products?category=${product.categorySlug}`} className="hover:text-gray-700">
              {product.category}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Images */}
            <div>
              {/* Main Image */}
              <div className="aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-gray-100 to-gray-50">
                <div className="flex h-full items-center justify-center">
                  <Zap className="h-32 w-32 text-gray-300" />
                </div>
              </div>
              
              {/* Thumbnails */}
              <div className="mt-4 flex gap-3">
                {[0, 1, 2, 3].map((i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square w-20 overflow-hidden rounded-lg border-2 bg-gray-100 ${
                      selectedImage === i ? 'border-brand' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex h-full items-center justify-center">
                      <Zap className="h-8 w-8 text-gray-300" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className="rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                  DLC Premium
                </span>
                <span className="rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                  UL Listed
                </span>
                <span className="rounded bg-purple-100 px-2 py-1 text-xs font-semibold text-purple-700">
                  5 Year Warranty
                </span>
              </div>

              {/* Title */}
              <h1 className="mt-4 text-3xl font-bold text-gray-900">
                {product.name} {selectedWattage}
              </h1>
              <p className="mt-1 text-gray-500">SKU: {product.sku}</p>

              {/* Rating placeholder */}
              <div className="mt-2 flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className={`h-4 w-4 ${i <= 4 ? 'fill-brand text-brand' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm text-gray-500">(42 reviews)</span>
              </div>

              {/* Price */}
              <div className="mt-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-gray-900">${currentPrice}</span>
                  <span className="text-lg text-gray-500 line-through">${product.msrp}</span>
                  <span className="rounded bg-red-100 px-2 py-0.5 text-sm font-semibold text-red-700">
                    Save {Math.round((1 - currentPrice / product.msrp) * 100)}%
                  </span>
                </div>
                
                {/* Tier Pricing */}
                <div className="mt-3 rounded-lg bg-gray-50 p-3">
                  <p className="text-xs font-medium text-gray-700">Volume Pricing:</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.tierPricing.map((tier, i) => (
                      <span
                        key={i}
                        className={`rounded px-2 py-1 text-xs ${
                          quantity >= tier.min && (tier.max === null || quantity <= tier.max)
                            ? 'bg-brand text-black font-semibold'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {tier.min}{tier.max ? `-${tier.max}` : '+'}: ${tier.price}
                      </span>
                    ))}
                  </div>
                </div>
                
                <p className="mt-2 text-sm text-gray-500">
                  <Link href="/login" className="text-brand hover:underline">Log in</Link> for contractor pricing
                </p>
              </div>

              {/* Variants */}
              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Wattage</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.variants.wattage.map((w) => (
                      <button
                        key={w}
                        onClick={() => setSelectedWattage(w)}
                        className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${
                          selectedWattage === w
                            ? 'border-brand bg-brand/10 text-brand'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Color Temperature</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.variants.cct.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedCCT(c)}
                        className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${
                          selectedCCT === c
                            ? 'border-brand bg-brand/10 text-brand'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stock & Shipping */}
              <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-800">{product.stock}</span>
                  <span className="text-green-700">({product.stockQty} available)</span>
                </div>
                <div className="mt-2 flex items-center gap-4 text-sm text-green-700">
                  <span className="flex items-center gap-1">
                    <Truck className="h-4 w-4" />
                    {product.leadTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Package className="h-4 w-4" />
                    Ships from {product.warehouse}
                  </span>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center rounded-lg border border-gray-300">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-gray-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 border-x border-gray-300 py-3 text-center font-semibold"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand py-3 font-semibold text-black hover:bg-brand-dark">
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart — ${totalPrice.toFixed(2)}
                </button>
              </div>

              {/* Secondary Actions */}
              <div className="mt-4 flex gap-4">
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand">
                  <Heart className="h-4 w-4" />
                  Save to List
                </button>
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand">
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
                <Link href="/tools/rfq" className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand">
                  <MessageSquare className="h-4 w-4" />
                  Request Quote
                </Link>
              </div>

              {/* Key Features */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: Zap, label: product.specs.lumens, sublabel: 'Light Output' },
                  { icon: Clock, label: product.specs.lifespan, sublabel: 'Lifespan' },
                  { icon: Shield, label: product.specs.warranty, sublabel: 'Warranty' },
                  { icon: Truck, label: product.leadTime, sublabel: 'Lead Time' },
                ].map(({ icon: Icon, label, sublabel }) => (
                  <div key={sublabel} className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                    <Icon className="h-5 w-5 text-brand" />
                    <div>
                      <p className="font-semibold text-gray-900">{label}</p>
                      <p className="text-xs text-gray-500">{sublabel}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="border-t border-gray-200 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Tab Headers */}
          <div className="flex gap-8 border-b border-gray-200">
            {[
              { key: 'specs', label: 'Specifications' },
              { key: 'downloads', label: 'Downloads' },
              { key: 'accessories', label: 'Accessories' },
              { key: 'reviews', label: 'Reviews (42)' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-4 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'border-b-2 border-brand text-brand'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="py-8">
            {/* Specifications */}
            {activeTab === 'specs' && (
              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="font-semibold text-gray-900">Electrical Specifications</h3>
                  <dl className="mt-4 divide-y divide-gray-100">
                    {[
                      ['Wattage', product.specs.wattage],
                      ['Lumens', product.specs.lumens],
                      ['Efficacy', product.specs.efficacy],
                      ['Input Voltage', product.specs.voltage],
                      ['Power Factor', product.specs.powerFactor],
                      ['THD', product.specs.thd],
                      ['Dimming', product.specs.dimming],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between py-2">
                        <dt className="text-sm text-gray-600">{label}</dt>
                        <dd className="text-sm font-medium text-gray-900">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Physical Specifications</h3>
                  <dl className="mt-4 divide-y divide-gray-100">
                    {[
                      ['Color Temperature', product.specs.cct],
                      ['CRI', product.specs.cri],
                      ['Beam Angle', product.specs.beamAngle],
                      ['IP Rating', product.specs.ip],
                      ['IK Rating', product.specs.ik],
                      ['Operating Temp', product.specs.operatingTemp],
                      ['Lifespan', product.specs.lifespan],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between py-2">
                        <dt className="text-sm text-gray-600">{label}</dt>
                        <dd className="text-sm font-medium text-gray-900">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Dimensions</h3>
                  <dl className="mt-4 divide-y divide-gray-100">
                    {[
                      ['Diameter', product.dimensions.diameter],
                      ['Height', product.dimensions.height],
                      ['Weight', product.dimensions.weight],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between py-2">
                        <dt className="text-sm text-gray-600">{label}</dt>
                        <dd className="text-sm font-medium text-gray-900">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Certifications</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.certifications.map((cert) => (
                      <span key={cert} className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700">
                        {cert}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="mt-6 font-semibold text-gray-900">Replaces</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.replaces.map((item) => (
                      <span key={item} className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Downloads */}
            {activeTab === 'downloads' && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-gray-600">
                    Download product documentation and technical files
                  </p>
                  <button className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-black hover:bg-brand-dark">
                    <Download className="h-4 w-4" />
                    Download All (ZIP)
                  </button>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {product.documents.map((doc) => (
                    <a
                      key={doc.name}
                      href={doc.url}
                      className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition-all hover:border-brand hover:shadow-md"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                        <FileText className="h-6 w-6 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
                      </div>
                      <Download className="h-5 w-5 text-gray-400" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Accessories */}
            {activeTab === 'accessories' && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {product.accessories.map((acc) => (
                  <div key={acc.sku} className="rounded-lg border border-gray-200 p-4">
                    <div className="aspect-square rounded-lg bg-gray-100">
                      <div className="flex h-full items-center justify-center">
                        <Package className="h-10 w-10 text-gray-300" />
                      </div>
                    </div>
                    <h4 className="mt-3 font-medium text-gray-900">{acc.name}</h4>
                    <p className="text-xs text-gray-500">{acc.sku}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-semibold">${acc.price}</span>
                      <button className="rounded bg-brand px-3 py-1 text-sm font-medium text-black hover:bg-brand-dark">
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Reviews placeholder */}
            {activeTab === 'reviews' && (
              <div className="text-center py-12">
                <p className="text-gray-500">Reviews coming soon</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Need Help */}
      <section className="bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-6">
            <div>
              <h3 className="font-semibold text-gray-900">Need Help with This Product?</h3>
              <p className="text-sm text-gray-600">Our lighting specialists are ready to assist you</p>
            </div>
            <div className="flex gap-4">
              <a
                href="tel:1-888-555-0123"
                className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:border-brand hover:text-brand"
              >
                <Phone className="h-4 w-4" />
                Call Us
              </a>
              <Link
                href="/tools/photometric-request"
                className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-black hover:bg-brand-dark"
              >
                Request Photometric Layout
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
