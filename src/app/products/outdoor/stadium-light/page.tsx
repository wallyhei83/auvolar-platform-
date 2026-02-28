import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ChevronRight, Zap, Shield, ArrowRight, CheckCircle2, Clock } from 'lucide-react'
import { getAllProducts, type BCProductFull } from '@/lib/bc-products-server'

export const metadata: Metadata = {
  title: 'LED Stadium Lights | High-Output Sports Lighting | Auvolar',
  description: 'Professional LED stadium lights for sports fields, arenas, and large venues. ISF Series & INS Series. 200W-1800W, 140+ lm/W, DLC certified. Ships from California.',
  keywords: ['LED stadium lights', 'sports field lighting', 'arena lights', 'stadium LED', 'high mast lights', 'sports lighting LED', 'football field lights', 'baseball field lights', 'soccer field lights'],
  alternates: { canonical: 'https://www.auvolar.com/products/outdoor/stadium-light' },
}

export default async function StadiumLightPage() {
  // Fetch stadium products from BC (category 100)
  const allProducts = await getAllProducts()
  const stadiumProducts = allProducts.filter(p => p.categories.includes(100))

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-brand">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/products" className="hover:text-brand">Products</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/products/outdoor" className="hover:text-brand">Outdoor</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">Stadium Lights</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand/20 px-4 py-1 text-sm font-medium text-brand">
              <Zap className="h-4 w-4" />
              Professional Sports & Venue Lighting
            </div>
            <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
              LED Stadium Lights
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              High-output LED stadium and sports field lighting. From community fields to professional arenas.
              200W to 1800W, 140+ lm/W efficiency, DLC certified for utility rebates.
            </p>
            <p className="mt-2 text-sm text-gray-400">
              {stadiumProducts.length} products available
            </p>
          </div>
        </div>
      </section>

      {/* Products from BigCommerce */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {stadiumProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <Zap className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h2 className="text-lg font-medium text-gray-900 mb-2">Products Coming Soon</h2>
              <p className="text-gray-500">Stadium light products are being added. Check back shortly.</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {stadiumProducts.map((product) => {
                const primaryImage = product.images.find(img => img.isPrimary)?.url || product.images[0]?.url
                const inStock = product.availability === 'available' || product.inventoryLevel > 0
                const variantCount = product.variants?.length || 0

                return (
                  <Link
                    key={product.id}
                    href={`/p/${product.slug}`}
                    className="group bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-all hover:border-brand"
                  >
                    <div className="aspect-square bg-gray-100 relative">
                      {primaryImage ? (
                        <img src={primaryImage} alt={product.name} className="w-full h-full object-contain p-4" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Zap className="w-16 h-16 text-gray-300" />
                        </div>
                      )}
                      <div className="absolute top-2 left-2">
                        {inStock ? (
                          <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded">IN STOCK</span>
                        ) : (
                          <span className="px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded">PRE-ORDER</span>
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-500 mb-1 font-mono">{product.sku}</p>
                      <h3 className="font-semibold text-gray-900 group-hover:text-brand transition-colors line-clamp-2 min-h-[2.5rem]">
                        {product.name}
                      </h3>
                      {variantCount > 1 && (
                        <p className="text-xs text-gray-500 mt-1">{variantCount} configurations available</p>
                      )}
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-lg font-bold">From ${product.price.toFixed(2)}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-1 text-xs">
                        {inStock ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                            <span className="text-green-600">In Stock</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3 text-orange-500" />
                            <span className="text-orange-600">Ships in 5-7 days</span>
                          </>
                        )}
                      </div>
                      <div className="mt-3 flex items-center gap-2 text-brand font-semibold text-sm">
                        View Details <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Applications */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">Stadium Light Applications</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Football Fields', desc: 'High school, college, and recreational football field lighting' },
              { name: 'Baseball/Softball', desc: 'Diamond lighting with precise beam control to minimize glare' },
              { name: 'Soccer Fields', desc: 'Uniform coverage for full-size and training pitches' },
              { name: 'Tennis Courts', desc: 'Anti-glare optics for player comfort and visibility' },
              { name: 'Parking Lots', desc: 'High-mast area lighting for large commercial lots' },
              { name: 'Arenas & Stadiums', desc: 'Professional-grade lighting for spectator venues' },
              { name: 'Industrial Yards', desc: 'Port terminals, rail yards, and storage facilities' },
              { name: 'Airport Aprons', desc: 'High-output lighting for aircraft service areas' },
            ].map((app) => (
              <div key={app.name} className="rounded-lg border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900">{app.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Why Choose Auvolar Stadium Lights?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '✅', title: 'DLC Certified', desc: 'Qualify for utility rebates of $50-$500+ per fixture' },
              { icon: '💡', title: '140+ lm/W', desc: 'Industry-leading efficiency, save 60-80% on energy' },
              { icon: '🛡️', title: 'IP66/IP67', desc: 'Weather-sealed for outdoor stadium environments' },
              { icon: '📦', title: 'Ships from CA', desc: 'In-stock inventory, fast delivery from City of Industry' },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 bg-white rounded-xl border">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
