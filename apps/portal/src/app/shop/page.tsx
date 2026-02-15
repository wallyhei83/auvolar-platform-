'use client'

import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { 
  Sun, Building2, Lightbulb, Zap, Leaf, ChevronRight,
  Factory, Car, ShoppingBag, Building, Warehouse, GasStation
} from 'lucide-react'
import { mainCategories, getCategoriesByParent } from '@/lib/bc-categories'

// Category icons
const categoryIcons: Record<string, any> = {
  outdoor: Sun,
  indoor: Building2,
  solar: Leaf,
  specialty: Zap,
}

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Shop LED Lighting</h1>
            <p className="text-gray-300 max-w-2xl text-lg">
              Browse our complete catalog of commercial and industrial LED lighting products.
              All products ship from our Houston, TX warehouse.
            </p>
          </div>
        </div>
        
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">Shop</span>
            </nav>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Main Categories */}
          {mainCategories.map((mainCat) => {
            const Icon = categoryIcons[mainCat.slug] || Lightbulb
            const subcategories = getCategoriesByParent(mainCat.slug)
            
            return (
              <div key={mainCat.slug} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-brand/10 rounded-lg">
                    <Icon className="w-6 h-6 text-brand" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{mainCat.name}</h2>
                    <p className="text-gray-500">{mainCat.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {subcategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/shop/${cat.slug}`}
                      className="group bg-gray-50 hover:bg-brand/5 border hover:border-brand rounded-lg p-6 transition-all"
                    >
                      <div className="w-14 h-14 bg-gray-200 rounded-lg mb-4 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                        <Lightbulb className="w-7 h-7 text-gray-400 group-hover:text-brand transition-colors" />
                      </div>
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-brand transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {cat.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
          
          {/* Shop by Application */}
          <div className="mt-16 pt-12 border-t">
            <h2 className="text-2xl font-bold mb-6">Shop by Application</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'Warehouse', icon: Warehouse, href: '/applications/warehouse' },
                { name: 'Parking', icon: Car, href: '/applications/parking' },
                { name: 'Retail', icon: ShoppingBag, href: '/applications/retail' },
                { name: 'Office', icon: Building, href: '/applications/office' },
                { name: 'Manufacturing', icon: Factory, href: '/applications/manufacturing' },
                { name: 'Gas Station', icon: Zap, href: '/applications/gas-station' },
              ].map((app) => (
                <Link
                  key={app.name}
                  href={app.href}
                  className="group text-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-12 h-12 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-brand/10 transition-colors">
                    <app.icon className="w-6 h-6 text-gray-500 group-hover:text-brand transition-colors" />
                  </div>
                  <p className="font-medium text-sm">{app.name}</p>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-gray-50 rounded-2xl">
            <div className="text-center">
              <p className="text-3xl font-bold text-brand">5-10</p>
              <p className="text-sm text-gray-600">Year Warranty</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-brand">24h</p>
              <p className="text-sm text-gray-600">In-Stock Shipping</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-brand">DLC/UL</p>
              <p className="text-sm text-gray-600">Certified Products</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-brand">Net 30</p>
              <p className="text-sm text-gray-600">Terms Available</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
