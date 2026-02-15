'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { 
  Search, ShoppingCart, User, Menu, X, Phone, Truck, Clock,
  ChevronDown, ChevronRight, Zap, Package, Upload
} from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { CartDrawer } from '@/components/cart/cart-drawer'

// 产品分类 - 简化结构，链接到BC产品页面
const productCategories = {
  outdoor: {
    title: 'Outdoor Lighting',
    href: '/products/outdoor',
    subcategories: [
      {
        title: 'Area Lights',  // 合并了 Parking Lot, Street, Shoe Box
        href: '/bc-products?category=area-parking',
        items: []  // 不再有子分类
      },
      {
        title: 'Flood Lights',
        href: '/bc-products?category=flood',
        items: []
      },
      {
        title: 'Wall Packs',
        href: '/bc-products?category=wall-pack',
        items: []
      },
      {
        title: 'Canopy Lights',
        href: '/bc-products?category=canopy',
        items: []
      },
      {
        title: 'Bollard Lights',
        href: '/bc-products?category=landscape',
        items: []
      },
      {
        title: 'Post Top Lights',
        href: '/bc-products?category=landscape',
        items: []
      },
    ]
  },
  solar: {
    title: 'Solar Lighting',
    href: '/products/solar',
    subcategories: [
      {
        title: 'Solar Area Lights',
        href: '/bc-products?category=solar',
        items: []
      },
      {
        title: 'Solar Wall Packs',
        href: '/bc-products?category=solar',
        items: []
      },
    ]
  },
  indoor: {
    title: 'Indoor Lighting',
    href: '/products/indoor',
    subcategories: [
      {
        title: 'High Bay Lights',
        href: '/bc-products?category=high-bay',
        items: []
      },
      {
        title: 'Troffers & Panels',
        href: '/bc-products?category=troffer-panel',
        items: []
      },
      {
        title: 'LED Tubes',
        href: '/bc-products?category=led-tube',
        items: []
      },
      {
        title: 'Strip Lights',
        href: '/bc-products?category=strip',
        items: []
      },
      {
        title: 'Vapor Tight',
        href: '/bc-products?category=vapor-tight',
        items: []
      },
      {
        title: 'Canopy & Garage',
        href: '/bc-products?category=canopy',
        items: []
      },
      {
        title: 'Downlights',
        href: '/bc-products?category=downlight',
        items: []
      },
    ]
  },
}

// 应用场景
const applications = [
  { name: 'Warehouse Lighting', href: '/applications/warehouse' },
  { name: 'Manufacturing Lighting', href: '/applications/manufacturing' },
  { name: 'Retail & Grocery', href: '/applications/retail' },
  { name: 'Office Lighting', href: '/applications/office' },
  { name: 'Parking Lot Lighting', href: '/applications/parking' },
  { name: 'Gas Station Lighting', href: '/applications/gas-station' },
  { name: 'Sports Lighting', href: '/applications/sports' },
  { name: 'Education Lighting', href: '/applications/education' },
  { name: 'Cold Storage Lighting', href: '/applications/cold-storage' },
  { name: 'Hospital & Healthcare', href: '/applications/healthcare' },
]

// 服务
const services = [
  { name: 'Lighting Design', href: '/services/lighting-design', description: 'Custom photometric layouts' },
  { name: 'Lighting Installation Guide', href: '/services/installation-guide', description: 'Step-by-step installation support' },
  { name: 'Rebate Assistance', href: '/services/rebate-assistance', description: 'Utility rebate application help' },
  { name: 'ROI Assistance', href: '/services/roi-assistance', description: 'Energy savings calculation' },
  { name: 'Contractor Network', href: '/services/contractor-network', description: 'Find certified installers' },
  { name: 'LaaS (Lighting as a Service)', href: '/services/laas', description: 'Zero upfront cost lighting' },
]

export function Header() {
  const { data: session } = useSession()
  const { itemCount } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Utility Bar */}
      <div className="bg-black text-white">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 text-xs sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Truck className="h-3.5 w-3.5 text-brand" />
              <span>In-stock ships in 24h</span>
            </span>
            <span className="hidden items-center gap-1.5 sm:flex">
              <Clock className="h-3.5 w-3.5 text-brand" />
              <span>Mon-Fri 8am-6pm CST</span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/track-order" className="hover:text-brand">Track Order</Link>
            <Link href="/support" className="hover:text-brand">Support</Link>
            <a href="tel:1-888-555-0123" className="flex items-center gap-1.5 hover:text-brand">
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">1-888-555-0123</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-gray-200">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand">
              <Zap className="h-5 w-5 text-black" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold tracking-tight">LumilinkAI</span>
              <span className="ml-2 text-xs text-gray-500">Light Done Right</span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="relative mx-4 flex-1 max-w-2xl">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search SKU, product, wattage, application..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-lg border border-gray-300 bg-gray-50 pl-10 pr-4 text-sm placeholder:text-gray-400 focus:border-brand focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>
          </div>

          {/* Quick Actions - Desktop */}
          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/tools/quick-order"
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:border-brand hover:text-brand"
            >
              <Package className="h-4 w-4" />
              Quick Order
            </Link>
          </div>

          {/* Account & Cart */}
          <div className="flex items-center gap-3">
            {session ? (
              <Link
                href="/portal"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-brand"
              >
                <User className="h-5 w-5" />
                <span className="hidden lg:inline">My Account</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-brand"
              >
                <User className="h-5 w-5" />
                <span className="hidden lg:inline">Sign In</span>
              </Link>
            )}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-brand"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-black">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>
            <Link
              href={session ? "/portal" : "/register"}
              className="hidden rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-black hover:bg-brand-dark sm:block"
            >
              Get Pricing
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation - Desktop */}
      <nav className="hidden border-b border-gray-100 bg-white lg:block">
        <div className="mx-auto flex max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          {/* Home */}
          <Link href="/" className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-brand">
            Home
          </Link>

          {/* Products Mega Menu */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu('products')}
            onMouseLeave={() => { setActiveMenu(null); setActiveSubMenu(null); }}
          >
            <button className="flex items-center gap-1 px-4 py-3 text-sm font-medium text-gray-700 hover:text-brand">
              Products
              <ChevronDown className="h-4 w-4" />
            </button>
            {activeMenu === 'products' && (
              <div className="absolute left-0 top-full z-50 flex w-[900px] rounded-b-xl border border-t-0 border-gray-200 bg-white shadow-xl">
                {/* Level 2 - Category List */}
                <div className="w-56 border-r border-gray-100 bg-gray-50 py-4">
                  <div className="px-4 pb-2 text-xs font-semibold uppercase text-gray-500">Categories</div>
                  {Object.entries(productCategories).map(([key, category]) => (
                    <div
                      key={key}
                      onMouseEnter={() => setActiveSubMenu(key)}
                      className={`flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm ${
                        activeSubMenu === key ? 'bg-white text-brand' : 'text-gray-700 hover:bg-white'
                      }`}
                    >
                      <span className="font-medium">{category.title}</span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  ))}
                  <div className="mt-4 border-t border-gray-200 px-4 pt-4">
                    <Link href="/products" className="text-sm font-medium text-brand hover:underline">
                      View All Products →
                    </Link>
                  </div>
                </div>

                {/* Level 3 - Subcategories */}
                {activeSubMenu && (
                  <div className="flex-1 p-6">
                    <div className="mb-4">
                      <Link 
                        href={productCategories[activeSubMenu as keyof typeof productCategories].href}
                        className="text-lg font-semibold text-gray-900 hover:text-brand"
                      >
                        {productCategories[activeSubMenu as keyof typeof productCategories].title}
                      </Link>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      {productCategories[activeSubMenu as keyof typeof productCategories].subcategories.map((sub) => (
                        <div key={sub.title}>
                          <Link
                            href={sub.href}
                            className="font-medium text-gray-900 hover:text-brand"
                          >
                            {sub.title}
                          </Link>
                          {/* Level 4 - Items */}
                          {sub.items.length > 0 && (
                            <ul className="mt-2 space-y-1">
                              {sub.items.map((item) => (
                                <li key={item.name}>
                                  <Link
                                    href={item.href}
                                    className="text-sm text-gray-600 hover:text-brand"
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!activeSubMenu && (
                  <div className="flex flex-1 items-center justify-center p-6 text-gray-400">
                    <span>Hover over a category to see subcategories</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Applications Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu('applications')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className="flex items-center gap-1 px-4 py-3 text-sm font-medium text-gray-700 hover:text-brand">
              Applications
              <ChevronDown className="h-4 w-4" />
            </button>
            {activeMenu === 'applications' && (
              <div className="absolute left-0 top-full z-50 w-72 rounded-b-xl border border-t-0 border-gray-200 bg-white p-4 shadow-xl">
                <div className="space-y-1">
                  {applications.map((app) => (
                    <Link
                      key={app.name}
                      href={app.href}
                      className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand"
                    >
                      {app.name}
                    </Link>
                  ))}
                </div>
                <div className="mt-3 border-t border-gray-100 pt-3">
                  <Link href="/applications" className="text-sm font-medium text-brand hover:underline">
                    View All Applications →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Tailor Purchasing */}
          <Link href="/tailor-purchasing" className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-brand">
            Tailor Purchasing
          </Link>

          {/* Service Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu('service')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className="flex items-center gap-1 px-4 py-3 text-sm font-medium text-gray-700 hover:text-brand">
              Service
              <ChevronDown className="h-4 w-4" />
            </button>
            {activeMenu === 'service' && (
              <div className="absolute left-0 top-full z-50 w-80 rounded-b-xl border border-t-0 border-gray-200 bg-white p-4 shadow-xl">
                <div className="space-y-1">
                  {services.map((service) => (
                    <Link
                      key={service.name}
                      href={service.href}
                      className="block rounded-lg px-3 py-2 hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900 group-hover:text-brand">{service.name}</span>
                      <span className="block text-xs text-gray-500">{service.description}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[104px] z-40 bg-white lg:hidden">
          <div className="h-full overflow-y-auto p-4">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 pl-10 pr-4 text-sm"
                />
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="space-y-4">
              {/* Home */}
              <Link href="/" className="block py-2 font-medium text-gray-900">
                Home
              </Link>

              {/* Products */}
              <div>
                <div className="mb-2 flex items-center justify-between py-2 font-medium text-gray-900">
                  <span>Products</span>
                </div>
                <div className="ml-4 space-y-2">
                  {Object.entries(productCategories).map(([key, category]) => (
                    <details key={key} className="group">
                      <summary className="flex cursor-pointer items-center justify-between py-1 text-sm text-gray-700">
                        {category.title}
                        <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                      </summary>
                      <div className="ml-4 mt-1 space-y-1">
                        {category.subcategories.map((sub) => (
                          <Link
                            key={sub.title}
                            href={sub.href}
                            className="block py-1 text-sm text-gray-600"
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </div>

              {/* Applications */}
              <div>
                <div className="mb-2 py-2 font-medium text-gray-900">Applications</div>
                <div className="ml-4 space-y-1">
                  {applications.slice(0, 6).map((app) => (
                    <Link
                      key={app.name}
                      href={app.href}
                      className="block py-1 text-sm text-gray-600"
                    >
                      {app.name}
                    </Link>
                  ))}
                  <Link href="/applications" className="block py-1 text-sm text-brand">
                    View All →
                  </Link>
                </div>
              </div>

              {/* Tailor Purchasing */}
              <Link href="/tailor-purchasing" className="block py-2 font-medium text-gray-900">
                Tailor Purchasing
              </Link>

              {/* Service */}
              <div>
                <div className="mb-2 py-2 font-medium text-gray-900">Service</div>
                <div className="ml-4 space-y-1">
                  {services.map((service) => (
                    <Link
                      key={service.name}
                      href={service.href}
                      className="block py-1 text-sm text-gray-600"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <Link href="/support" className="block py-2 text-gray-700">Support</Link>
                <Link href="/track-order" className="block py-2 text-gray-700">Track Order</Link>
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="mt-6">
              <Link
                href={session ? "/portal" : "/register"}
                className="block w-full rounded-lg bg-brand py-3 text-center font-semibold text-black"
              >
                {session ? "Go to Portal" : "Get Contractor Pricing"}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  )
}
