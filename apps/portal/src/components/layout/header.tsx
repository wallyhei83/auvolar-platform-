'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { 
  Search, ShoppingCart, User, Menu, X, Phone, Truck, Clock,
  ChevronDown, Zap, FileText, Upload, Calculator, Package,
  Headphones, MapPin
} from 'lucide-react'

// Product categories for mega menu
const productCategories = {
  indoor: {
    title: 'Indoor Lighting',
    items: [
      { name: 'High Bay Lights', href: '/products/high-bay', description: 'Warehouse & industrial' },
      { name: 'Linear High Bay', href: '/products/linear-high-bay', description: 'Aisle & open spaces' },
      { name: 'Troffers & Panels', href: '/products/troffer', description: 'Office & commercial' },
      { name: 'Garage & Canopy', href: '/products/garage', description: 'Parking structures' },
      { name: 'Strip Lights', href: '/products/strip', description: 'Task & accent' },
      { name: 'Vapor Tight', href: '/products/vapor-tight', description: 'Wet & dusty locations' },
    ]
  },
  outdoor: {
    title: 'Outdoor Lighting',
    items: [
      { name: 'Wall Packs', href: '/products/wall-pack', description: 'Building perimeter' },
      { name: 'Area Lights', href: '/products/area-light', description: 'Parking & pathways' },
      { name: 'Flood Lights', href: '/products/flood', description: 'Security & sports' },
      { name: 'Canopy Lights', href: '/products/canopy', description: 'Gas stations & covered' },
      { name: 'Street Lights', href: '/products/street', description: 'Roads & pathways' },
      { name: 'Bollards', href: '/products/bollard', description: 'Landscape & walkways' },
    ]
  },
  specialty: {
    title: 'Specialty & Accessories',
    items: [
      { name: 'LED Tubes', href: '/products/tubes', description: 'T8/T5 replacements' },
      { name: 'Sports Lighting', href: '/products/sports', description: 'Fields & courts' },
      { name: 'Emergency & Exit', href: '/products/emergency', description: 'Safety lighting' },
      { name: 'Sensors & Controls', href: '/products/controls', description: 'Motion & daylight' },
      { name: 'Mounting & Accessories', href: '/products/accessories', description: 'Hardware & parts' },
    ]
  }
}

const applications = [
  { name: 'Warehouse', href: '/applications/warehouse', icon: '🏭' },
  { name: 'Manufacturing', href: '/applications/manufacturing', icon: '⚙️' },
  { name: 'Retail & Grocery', href: '/applications/retail', icon: '🛒' },
  { name: 'Office & Corporate', href: '/applications/office', icon: '🏢' },
  { name: 'Parking & Garage', href: '/applications/parking', icon: '🅿️' },
  { name: 'Gas Station & Canopy', href: '/applications/gas-station', icon: '⛽' },
  { name: 'Sports & Recreation', href: '/applications/sports', icon: '🏟️' },
  { name: 'Education', href: '/applications/education', icon: '🏫' },
]

const tools = [
  { name: 'Quick Order', href: '/tools/quick-order', description: 'Paste SKU + Qty to order fast', icon: Package },
  { name: 'Upload BOM', href: '/tools/bom-upload', description: 'Get quote from your bill of materials', icon: Upload },
  { name: 'Replacement Finder', href: '/tools/replacement', description: 'Find LED replacement for old fixtures', icon: Search },
  { name: 'ROI Calculator', href: '/tools/roi-calculator', description: 'Calculate energy savings & payback', icon: Calculator },
  { name: 'Rebate Finder', href: '/tools/rebate', description: 'Find utility rebates in your area', icon: MapPin },
  { name: 'IES Library', href: '/resources/ies', description: 'Download photometric data files', icon: FileText },
]

export function Header() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

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
            <Link href="/support" className="hover:text-brand">Get Support</Link>
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
            <Link
              href="/tools/bom-upload"
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:border-brand hover:text-brand"
            >
              <Upload className="h-4 w-4" />
              Upload BOM
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
            <Link
              href="/cart"
              className="relative flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-brand"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-black">
                0
              </span>
            </Link>
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
          {/* Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu('products')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className="flex items-center gap-1 px-4 py-3 text-sm font-medium text-gray-700 hover:text-brand">
              Products
              <ChevronDown className="h-4 w-4" />
            </button>
            {activeMenu === 'products' && (
              <div className="absolute left-0 top-full z-50 w-[800px] rounded-b-xl border border-t-0 border-gray-200 bg-white p-6 shadow-xl">
                <div className="grid grid-cols-3 gap-8">
                  {Object.entries(productCategories).map(([key, category]) => (
                    <div key={key}>
                      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {category.title}
                      </h3>
                      <ul className="space-y-2">
                        {category.items.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className="group block rounded-lg p-2 hover:bg-gray-50"
                            >
                              <span className="font-medium text-gray-900 group-hover:text-brand">
                                {item.name}
                              </span>
                              <span className="block text-xs text-gray-500">
                                {item.description}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                  <Link href="/products" className="text-sm font-medium text-brand hover:underline">
                    View All Products →
                  </Link>
                  <Link href="/products?filter=dlc" className="text-sm text-gray-600 hover:text-brand">
                    DLC Eligible Products
                  </Link>
                </div>
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
              <div className="absolute left-0 top-full z-50 w-[500px] rounded-b-xl border border-t-0 border-gray-200 bg-white p-6 shadow-xl">
                <div className="grid grid-cols-2 gap-2">
                  {applications.map((app) => (
                    <Link
                      key={app.name}
                      href={app.href}
                      className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50"
                    >
                      <span className="text-2xl">{app.icon}</span>
                      <span className="font-medium text-gray-900">{app.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tools Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu('tools')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className="flex items-center gap-1 px-4 py-3 text-sm font-medium text-gray-700 hover:text-brand">
              Tools & Resources
              <ChevronDown className="h-4 w-4" />
            </button>
            {activeMenu === 'tools' && (
              <div className="absolute left-0 top-full z-50 w-[400px] rounded-b-xl border border-t-0 border-gray-200 bg-white p-4 shadow-xl">
                <div className="space-y-1">
                  {tools.map((tool) => (
                    <Link
                      key={tool.name}
                      href={tool.href}
                      className="group flex items-start gap-3 rounded-lg p-3 hover:bg-gray-50"
                    >
                      <tool.icon className="mt-0.5 h-5 w-5 text-gray-400 group-hover:text-brand" />
                      <div>
                        <span className="font-medium text-gray-900 group-hover:text-brand">
                          {tool.name}
                        </span>
                        <span className="block text-xs text-gray-500">
                          {tool.description}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Simple Links */}
          <Link href="/support" className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-brand">
            Support
          </Link>
          <Link href="/about" className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-brand">
            About
          </Link>

          {/* Right Side - Contact */}
          <div className="ml-auto flex items-center gap-4">
            <a
              href="tel:1-888-555-0123"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand"
            >
              <Headphones className="h-4 w-4" />
              Talk to a Specialist
            </a>
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

            {/* Mobile Quick Actions */}
            <div className="mb-6 grid grid-cols-2 gap-2">
              <Link
                href="/tools/quick-order"
                className="flex items-center justify-center gap-2 rounded-lg bg-gray-100 p-3 text-sm font-medium"
              >
                <Package className="h-4 w-4" />
                Quick Order
              </Link>
              <Link
                href="/tools/bom-upload"
                className="flex items-center justify-center gap-2 rounded-lg bg-gray-100 p-3 text-sm font-medium"
              >
                <Upload className="h-4 w-4" />
                Upload BOM
              </Link>
            </div>

            {/* Mobile Navigation */}
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase text-gray-500">Products</h3>
                <div className="space-y-1">
                  {Object.values(productCategories).flatMap(cat => cat.items.slice(0, 3)).map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block rounded-lg p-2 text-gray-700 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link href="/products" className="block p-2 text-sm font-medium text-brand">
                    View All Products →
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase text-gray-500">Applications</h3>
                <div className="grid grid-cols-2 gap-1">
                  {applications.slice(0, 6).map((app) => (
                    <Link
                      key={app.name}
                      href={app.href}
                      className="flex items-center gap-2 rounded-lg p-2 text-gray-700 hover:bg-gray-50"
                    >
                      <span>{app.icon}</span>
                      <span className="text-sm">{app.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase text-gray-500">Tools</h3>
                <div className="space-y-1">
                  {tools.slice(0, 4).map((tool) => (
                    <Link
                      key={tool.name}
                      href={tool.href}
                      className="block rounded-lg p-2 text-gray-700 hover:bg-gray-50"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <Link href="/support" className="block p-2 text-gray-700">Support</Link>
                <Link href="/about" className="block p-2 text-gray-700">About Us</Link>
                <Link href="/track-order" className="block p-2 text-gray-700">Track Order</Link>
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
    </header>
  )
}
