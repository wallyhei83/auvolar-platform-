'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { 
  ChevronRight, Filter, Grid, List, SlidersHorizontal,
  Sun, Building2, Lightbulb, Zap
} from 'lucide-react'

// Category configuration
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
      { name: 'Strip Lights', slug: 'strip', count: 20 },
      { name: 'Wrap Fixtures', slug: 'wrap', count: 12 },
      { name: 'Vapor Tight', slug: 'vapor-tight', count: 8 },
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

// Sample products for category
const sampleProducts = [
  { sku: 'HB-UFO-150W', name: 'UFO High Bay 150W', price: 89, image: '/images/products/high-bay-1.jpg', badge: 'Best Seller' },
  { sku: 'HB-UFO-200W', name: 'UFO High Bay 200W', price: 109, image: '/images/products/high-bay-2.jpg', badge: 'DLC' },
  { sku: 'WP-50W-5K', name: 'Wall Pack 50W', price: 59, image: '/images/products/wall-pack-1.jpg', badge: 'DLC' },
  { sku: 'AL-150W-T3', name: 'Area Light 150W', price: 149, image: '/images/products/area-light-1.jpg', badge: 'New' },
  { sku: 'SL-100W-AIO', name: 'Solar Street Light 100W', price: 299, image: '/images/products/solar-1.jpg', badge: 'DLC' },
  { sku: 'SL-60W-AIO', name: 'Solar Street Light 60W', price: 199, image: '/images/products/solar-2.jpg', badge: null },
  { sku: 'FL-200W', name: 'LED Flood Light 200W', price: 129, image: '/images/products/flood-1.jpg', badge: 'DLC' },
  { sku: 'CL-100W', name: 'Canopy Light 100W', price: 89, image: '/images/products/canopy-1.jpg', badge: null },
]

export default function CategoryPage() {
  const params = useParams()
  const category = params.category as string
  const config = categoryConfig[category]

  if (!config) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-8">The category "{category}" does not exist.</p>
          <Link href="/products" className="text-brand hover:underline">
            ← Back to All Products
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const Icon = config.icon

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
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
            {config.subcategories.map((sub) => (
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
                <option>Newest</option>
              </select>
              <div className="flex border rounded-lg overflow-hidden">
                <button className="p-2 bg-gray-100">
                  <Grid className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-gray-50">
                  <List className="w-4 h-4" />
                </button>
              </div>
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
                      product.badge === 'New' ? 'bg-green-500 text-white' :
                      'bg-blue-500 text-white'
                    }`}>
                      {product.badge}
                    </span>
                  )}
                  <div className="w-full h-full flex items-center justify-center">
                    <Lightbulb className="w-16 h-16 text-gray-300" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-1">{product.sku}</p>
                  <h3 className="font-medium group-hover:text-brand transition-colors">{product.name}</h3>
                  <p className="text-lg font-bold mt-2">${product.price}</p>
                  <button className="w-full mt-3 bg-gray-900 hover:bg-brand text-white hover:text-black py-2 rounded-lg text-sm font-medium transition-colors">
                    View Details
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
