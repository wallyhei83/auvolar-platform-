import Link from 'next/link'
import { 
  ArrowRight, Search, Shield, Truck, Clock, HeadphonesIcon, FileText, 
  Package, Upload, Calculator, MapPin, Zap, CheckCircle2, Star,
  Building2, Factory, ShoppingCart, Warehouse, Car, Fuel, GraduationCap, Dumbbell
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FeaturedProducts } from '@/components/home/featured-products'

// Product categories with matching BC product images
const categories = [
  { 
    name: 'High Bay Lights', 
    description: 'Warehouses, manufacturing, gyms',
    image: 'https://cdn11.bigcommerce.com/s-hhcdvxqxzq/products/156/images/452/Highbay_Light_OH60W-240W__96466.1770882596.386.513.jpg?c=1', // BC: UFO High Bay (30)
    href: '/products/indoor/high-bay',
    badge: 'Best Seller'
  },
  { 
    name: 'Wall Packs', 
    description: 'Building perimeter, security',
    image: 'https://cdn11.bigcommerce.com/s-hhcdvxqxzq/products/123/images/571/Minni_Wallpack_AN-WPA26W_-5KP-BZ_Application_reference__40018.1771055698.386.513.jpg?c=1', // BC: Wall Pack (27)
    href: '/products/outdoor/wall-pack',
    badge: null
  },
  { 
    name: 'Area Lights', 
    description: 'Parking lots, pathways',
    image: 'https://cdn11.bigcommerce.com/s-hhcdvxqxzq/products/113/images/412/Area_Light_OT75W-420W_Black__19697.1770976359.386.513.jpg?c=1', // BC: Area Light (26)
    href: '/products/outdoor/area-light',
    badge: null
  },
  { 
    name: 'Troffers & Panels', 
    description: 'Office, retail, education',
    image: 'https://cdn11.bigcommerce.com/s-hhcdvxqxzq/products/178/images/484/image__12842.1770886820.386.513.png?c=1', // BC: Panel Light (33)
    href: '/products/indoor/troffer',
    badge: null
  },
  { 
    name: 'Solar Lights', 
    description: 'Off-grid street & area lights',
    image: 'https://cdn11.bigcommerce.com/s-hhcdvxqxzq/products/197/images/535/04BB1E37-4E58-4b31-8B76-2EFFD4AE7AE6__86041.1770891195.386.513.png?c=1', // BC: Solar Area (59)
    href: '/products/solar',
    badge: 'New'
  },
  { 
    name: 'LED Tubes', 
    description: 'T8/T5 retrofit replacements',
    image: 'https://cdn11.bigcommerce.com/s-hhcdvxqxzq/products/138/images/421/WPS20260212144030__14594.1770879720.386.513.png?c=1', // BC: LED Tube (36)
    href: '/products/indoor/led-tube',
    badge: null
  },
]

// Applications
const applications = [
  { name: 'Warehouse', icon: Warehouse, href: '/applications/warehouse' },
  { name: 'Manufacturing', icon: Factory, href: '/applications/manufacturing' },
  { name: 'Retail', icon: ShoppingCart, href: '/applications/retail' },
  { name: 'Office', icon: Building2, href: '/applications/office' },
  { name: 'Parking', icon: Car, href: '/applications/parking' },
  { name: 'Gas Station', icon: Fuel, href: '/applications/gas-station' },
  { name: 'Education', icon: GraduationCap, href: '/applications/education' },
  { name: 'Sports', icon: Dumbbell, href: '/applications/sports' },
]

// Tools
const tools = [
  {
    name: 'Quick Order',
    description: 'Paste SKU + Qty for fast reordering',
    icon: Package,
    href: '/tools/quick-order',
    time: '< 1 min'
  },
  {
    name: 'Upload BOM',
    description: 'Get a quote from your bill of materials',
    icon: Upload,
    href: '/tools/bom-upload',
    time: '24h response'
  },
  {
    name: 'Replacement Finder',
    description: 'Find LED replacement for legacy fixtures',
    icon: Search,
    href: '/tools/replacement',
    time: '2 min'
  },
  {
    name: 'ROI Calculator',
    description: 'Calculate energy savings & payback period',
    icon: Calculator,
    href: '/tools/roi-calculator',
    time: '3 min'
  },
  {
    name: 'Rebate Finder',
    description: 'Find utility rebates in your area',
    icon: MapPin,
    href: '/tools/rebate-finder',
    time: '2 min'
  },
  {
    name: 'Request Quote',
    description: 'Get custom pricing for your project',
    icon: FileText,
    href: '/tools/rfq',
    time: '24h response'
  },
]

// Trust points
const trustPoints = [
  { icon: Shield, title: 'DLC & UL Listed', description: 'Certified products for rebates & compliance' },
  { icon: Truck, title: 'Ships in 24h', description: 'In-stock items ship same/next day' },
  { icon: Clock, title: '5-10 Year Warranty', description: 'Industry-leading warranty coverage' },
  { icon: HeadphonesIcon, title: 'Expert Support', description: 'Lighting specialists Mon-Fri 8am-6pm' },
]

// Featured products (placeholder)
const featuredProducts = [
  { name: 'UFO High Bay 150W', sku: 'HB-UFO-150W', price: '$89', stock: 'In Stock', dlc: true },
  { name: 'UFO High Bay 200W', sku: 'HB-UFO-200W', price: '$109', stock: 'In Stock', dlc: true },
  { name: 'Wall Pack 50W', sku: 'WP-50W-5K', price: '$59', stock: 'In Stock', dlc: true },
  { name: 'Area Light 150W', sku: 'AL-150W-T3', price: '$149', stock: 'Ships in 3 days', dlc: true },
  { name: 'Linear High Bay 220W', sku: 'LHB-220W', price: '$129', stock: 'In Stock', dlc: true },
  { name: '4ft LED Tube T8', sku: 'T8-4FT-18W', price: '$8', stock: 'In Stock', dlc: false },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Truck className="h-4 w-4 text-brand" />
                <span>In-stock ships in 24h</span>
                <span className="mx-2">•</span>
                <Shield className="h-4 w-4 text-brand" />
                <span>DLC & UL Listed</span>
              </div>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Commercial LED
                <span className="block text-brand">Light Done Right</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg text-gray-300">
                Quality LED lighting for contractors, electricians, and facility managers. 
                Competitive pricing, expert support, fast shipping.
              </p>
              
              {/* Hero Search */}
              <div className="mt-8">
                <div className="relative max-w-xl">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by SKU, product name, wattage, or application..."
                    className="h-14 w-full rounded-xl bg-white pl-12 pr-4 text-gray-900 shadow-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-400">
                  <span>Popular:</span>
                  <Link href="/products/indoor/high-bay" className="text-brand hover:underline">High Bay</Link>
                  <Link href="/tools/replacement?q=400w+mh" className="text-brand hover:underline">400W MH Replacement</Link>
                  <Link href="/products?filter=dlc" className="text-brand hover:underline">DLC Eligible</Link>
                </div>
              </div>

              {/* Hero CTAs */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-semibold text-black transition-colors hover:bg-brand-dark"
                >
                  Shop Products
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-600 px-6 py-3 font-semibold text-white transition-colors hover:border-brand hover:text-brand"
                >
                  Get Contractor Pricing
                </Link>
              </div>
            </div>

            {/* Quick Actions Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/tools/quick-order"
                className="group rounded-xl border border-gray-700 bg-gray-800/50 p-6 backdrop-blur transition-all hover:border-brand hover:bg-gray-800"
              >
                <Package className="h-8 w-8 text-brand" />
                <h3 className="mt-4 text-lg font-semibold text-white">Quick Order</h3>
                <p className="mt-2 text-sm text-gray-400">
                  Paste SKU + quantity for fast reordering
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-brand group-hover:underline">
                  Start ordering <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
              
              <Link
                href="/tools/bom-upload"
                className="group rounded-xl border border-gray-700 bg-gray-800/50 p-6 backdrop-blur transition-all hover:border-brand hover:bg-gray-800"
              >
                <Upload className="h-8 w-8 text-brand" />
                <h3 className="mt-4 text-lg font-semibold text-white">Upload BOM</h3>
                <p className="mt-2 text-sm text-gray-400">
                  Get a quote from your bill of materials
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-brand group-hover:underline">
                  Upload file <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
              
              <Link
                href="/tools/replacement"
                className="group rounded-xl border border-gray-700 bg-gray-800/50 p-6 backdrop-blur transition-all hover:border-brand hover:bg-gray-800"
              >
                <Search className="h-8 w-8 text-brand" />
                <h3 className="mt-4 text-lg font-semibold text-white">Replacement Finder</h3>
                <p className="mt-2 text-sm text-gray-400">
                  Find LED replacement for legacy fixtures
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-brand group-hover:underline">
                  Find replacement <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
              
              <Link
                href="/track-order"
                className="group rounded-xl border border-gray-700 bg-gray-800/50 p-6 backdrop-blur transition-all hover:border-brand hover:bg-gray-800"
              >
                <Truck className="h-8 w-8 text-brand" />
                <h3 className="mt-4 text-lg font-semibold text-white">Track Order</h3>
                <p className="mt-2 text-sm text-gray-400">
                  Check order status and tracking info
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-brand group-hover:underline">
                  Track now <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {trustPoints.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/10">
                  <Icon className="h-5 w-5 text-brand-dark" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-600">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
              <p className="mt-2 text-gray-600">Find the right lighting for your application</p>
            </div>
            <Link href="/products" className="hidden text-sm font-medium text-brand hover:underline sm:block">
              View All Products →
            </Link>
          </div>
          
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-brand hover:shadow-lg"
              >
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {category.badge && (
                  <span className="absolute right-3 top-3 rounded-full bg-brand px-2.5 py-1 text-xs font-semibold text-black">
                    {category.badge}
                  </span>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 group-hover:text-brand">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-6 text-center sm:hidden">
            <Link href="/products" className="text-sm font-medium text-brand hover:underline">
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by Application */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Shop by Application</h2>
            <p className="mt-2 text-gray-600">Get lighting recommendations for your specific space</p>
          </div>
          
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {applications.map(({ name, icon: Icon, href }) => (
              <Link
                key={name}
                href={href}
                className="group flex flex-col items-center rounded-xl bg-white p-4 text-center shadow-sm transition-all hover:shadow-md hover:ring-2 hover:ring-brand"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 transition-colors group-hover:bg-brand/10">
                  <Icon className="h-6 w-6 text-gray-600 group-hover:text-brand" />
                </div>
                <span className="mt-3 text-sm font-medium text-gray-900">{name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - In Stock */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">In Stock & Ready to Ship</h2>
              <p className="mt-2 text-gray-600">Ships within 24 hours • Fast delivery</p>
            </div>
            <Link href="/products?filter=in-stock" className="hidden text-sm font-medium text-brand hover:underline sm:block">
              View All In-Stock →
            </Link>
          </div>
          
          <FeaturedProducts />
        </div>
      </section>

      {/* Contractor Tools */}
      <section className="bg-black py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">Contractor Tools</h2>
            <p className="mt-2 text-gray-400">
              Everything you need to quote, order, and manage your lighting projects
            </p>
          </div>
          
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="group flex items-start gap-4 rounded-xl border border-gray-800 bg-gray-900 p-5 transition-all hover:border-brand"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand/10">
                  <tool.icon className="h-6 w-6 text-brand" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white group-hover:text-brand">{tool.name}</h3>
                    <span className="rounded bg-gray-800 px-2 py-0.5 text-xs text-gray-400">{tool.time}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-400">{tool.description}</p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-brand hover:underline"
            >
              View All Tools & Resources
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Why Contractors Choose Auvolar</h2>
              <p className="mt-4 text-gray-600">
                We understand the demands of commercial lighting projects. That's why we offer
                competitive pricing, fast shipping, and the technical support you need to get the job done right.
              </p>
              
              <ul className="mt-8 space-y-4">
                {[
                  'Contractor pricing with volume discounts',
                  'Same-day shipping on in-stock items (before 2pm CST)',
                  'Net 30 terms for qualified accounts',
                  'Complete documentation: Cut sheets, IES files, DLC certificates',
                  'Technical support from lighting specialists',
                  'Easy RMA process with prepaid return labels',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-semibold text-black hover:bg-brand-dark"
                >
                  Apply for Contractor Pricing
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:border-brand hover:text-brand"
                >
                  Learn More About Us
                </Link>
              </div>
            </div>
            
            {/* Testimonial */}
            <div className="flex items-center">
              <div className="rounded-2xl bg-gray-50 p-8">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-5 w-5 fill-brand text-brand" />
                  ))}
                </div>
                <blockquote className="mt-4 text-lg text-gray-700">
                  "Auvolar has been our go-to supplier for the past two years. Fast shipping,
                  quality products, and their technical team actually knows lighting. Can't ask for more."
                </blockquote>
                <div className="mt-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gray-300" />
                  <div>
                    <div className="font-semibold text-gray-900">Mike Thompson</div>
                    <div className="text-sm text-gray-600">Thompson Electric, Houston TX</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black">Ready to Get Started?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-800">
            Apply for a contractor account to unlock exclusive pricing, Net 30 terms, and priority support.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-black px-8 py-4 font-semibold text-white hover:bg-gray-800"
            >
              Apply for Pricing
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-black px-8 py-4 font-semibold text-black hover:bg-black/10"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
