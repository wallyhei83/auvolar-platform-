import Link from 'next/link'
import { ArrowRight, Shield, Truck, HeadphonesIcon, FileText, Zap, Building2 } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand">
              <Zap className="h-5 w-5 text-black" />
            </div>
            <span className="text-xl font-bold">LumilinkAI</span>
          </Link>
          
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/products" className="text-sm text-gray-600 hover:text-gray-900">Products</Link>
            <Link href="/tools" className="text-sm text-gray-600 hover:text-gray-900">Tools</Link>
            <Link href="/resources" className="text-sm text-gray-600 hover:text-gray-900">Resources</Link>
            <Link href="/support" className="text-sm text-gray-600 hover:text-gray-900">Support</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Sign In
            </Link>
            <Link href="/register" className="btn-primary btn-sm">
              Apply for Pricing
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Light Done Right
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Commercial LED lighting for contractors, electricians, and facility managers. 
              Quality products, competitive pricing, expert support.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/products" className="btn-primary btn-lg">
                Shop Products <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/register" className="btn-outline btn-lg">
                Get Contractor Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-gray-900">Shop by Category</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'High Bay', description: 'Warehouses & industrial', href: '/products/high-bay' },
              { name: 'Wall Pack', description: 'Outdoor perimeter', href: '/products/wall-pack' },
              { name: 'Troffer', description: 'Office & commercial', href: '/products/troffer' },
              { name: 'Area Light', description: 'Parking & pathways', href: '/products/area-light' },
            ].map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-brand hover:shadow-lg"
              >
                <div className="h-32 rounded-lg bg-gray-100" />
                <h3 className="mt-4 font-semibold text-gray-900 group-hover:text-brand">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-gray-900">Why Choose LumilinkAI</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Shield, title: 'Quality Assured', description: 'DLC & UL listed products with industry-leading warranties' },
              { icon: Truck, title: 'Fast Shipping', description: 'Same-day shipping on in-stock items before 2 PM EST' },
              { icon: HeadphonesIcon, title: 'Expert Support', description: 'Technical assistance from lighting specialists' },
              { icon: FileText, title: 'Complete Docs', description: 'Cut sheets, IES files, and photometric data' },
            ].map(({ icon: Icon, title, description }) => (
              <div key={title} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand/10">
                  <Icon className="h-6 w-6 text-brand-dark" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B Tools */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-gray-900">Contractor Tools</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-gray-600">
            Everything you need to quote, order, and manage your lighting projects
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Quick Order', description: 'Enter SKUs and quantities for fast reordering', href: '/tools/quick-order' },
              { title: 'Upload BOM', description: 'Upload your bill of materials for a custom quote', href: '/tools/bom-upload' },
              { title: 'Request Quote', description: 'Get project pricing with volume discounts', href: '/tools/rfq' },
              { title: 'Photometric Request', description: 'Get a lighting layout for your project', href: '/tools/photometric' },
              { title: 'Rebate Finder', description: 'Find utility rebates in your area', href: '/tools/rebate' },
              { title: 'Track Order', description: 'Check order status and tracking info', href: '/portal/orders' },
            ].map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-brand hover:shadow"
              >
                <Building2 className="h-5 w-5 text-gray-400" />
                <div>
                  <h3 className="font-medium text-gray-900">{tool.title}</h3>
                  <p className="text-sm text-gray-600">{tool.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Apply for a contractor account to unlock exclusive pricing and B2B tools.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/register" className="btn-primary btn-lg">
              Apply Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/support" className="btn-ghost btn-lg text-white hover:bg-white/10">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand">
                  <Zap className="h-5 w-5 text-black" />
                </div>
                <span className="text-lg font-bold">LumilinkAI</span>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Light Done Right. Commercial LED lighting for professionals.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900">Products</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li><Link href="/products/high-bay" className="hover:text-gray-900">High Bay</Link></li>
                <li><Link href="/products/wall-pack" className="hover:text-gray-900">Wall Pack</Link></li>
                <li><Link href="/products/troffer" className="hover:text-gray-900">Troffer</Link></li>
                <li><Link href="/products/area-light" className="hover:text-gray-900">Area Light</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900">Resources</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li><Link href="/resources/ies-library" className="hover:text-gray-900">IES Library</Link></li>
                <li><Link href="/resources/cut-sheets" className="hover:text-gray-900">Cut Sheets</Link></li>
                <li><Link href="/resources/warranty" className="hover:text-gray-900">Warranty</Link></li>
                <li><Link href="/resources/faq" className="hover:text-gray-900">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900">Company</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li><Link href="/about" className="hover:text-gray-900">About Us</Link></li>
                <li><Link href="/support" className="hover:text-gray-900">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-gray-900">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} LumilinkAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
