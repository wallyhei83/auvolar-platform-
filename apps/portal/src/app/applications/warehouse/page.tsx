import Link from 'next/link'
import { 
  ChevronRight, Zap, CheckCircle2, ArrowRight, Calculator, FileText,
  Shield, Truck, Lightbulb, HelpCircle
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const recommendedProducts = [
  {
    name: 'UFO High Bay 150W',
    sku: 'HB-UFO-150W-5K',
    description: 'Best for 15-25ft ceiling heights',
    wattage: '150W',
    lumens: '22,500 lm',
    price: 89,
    stock: 'In Stock',
    dlc: true,
    recommended: true,
  },
  {
    name: 'UFO High Bay 200W',
    sku: 'HB-UFO-200W-5K',
    description: 'Best for 20-30ft ceiling heights',
    wattage: '200W',
    lumens: '30,000 lm',
    price: 109,
    stock: 'In Stock',
    dlc: true,
    recommended: false,
  },
  {
    name: 'Linear High Bay 220W',
    sku: 'LHB-220W-5K',
    description: 'Best for aisles and rack areas',
    wattage: '220W',
    lumens: '33,000 lm',
    price: 129,
    stock: 'In Stock',
    dlc: true,
    recommended: false,
  },
]

const specs = {
  targetIllumination: '30-50 fc (general) / 50-75 fc (task areas)',
  recommendedCCT: '4000K-5000K',
  commonMountingHeights: '15-35 ft',
  typicalSpacing: '20-30 ft center-to-center',
  commonCertifications: 'DLC, UL, IP65 (if dusty)',
}

const faqs = [
  {
    q: 'How many high bays do I need for my warehouse?',
    a: 'It depends on ceiling height, target foot-candles, and fixture spacing. Use our Quick Calculator below or request a free photometric layout.'
  },
  {
    q: 'What CCT is best for warehouse lighting?',
    a: '5000K (daylight) is most common for warehouses as it provides high visibility and alertness. 4000K (neutral) works well for offices areas within the warehouse.'
  },
  {
    q: 'Should I use UFO or Linear high bays?',
    a: 'UFO high bays are great for general open areas. Linear high bays work better over aisles and between racking where you need directional light.'
  },
  {
    q: 'How much can I save switching from Metal Halide to LED?',
    a: 'Typically 50-70% in energy costs. A 400W MH can be replaced with a 150W LED. Use our ROI Calculator to estimate your specific savings.'
  },
]

export default function WarehouseLightingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/applications" className="hover:text-gray-700">Applications</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-gray-900">Warehouse Lighting</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black py-16">
        <div className="absolute inset-0 opacity-20">
          {/* Background pattern */}
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand/20 px-3 py-1 text-sm text-brand">
              <Lightbulb className="h-4 w-4" />
              Application Guide
            </span>
            <h1 className="mt-4 text-4xl font-bold text-white">
              Warehouse & Distribution Center Lighting
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              High-performance LED solutions for warehouses, fulfillment centers, and distribution facilities. 
              Improve visibility, reduce energy costs, and meet safety standards.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#products"
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-semibold text-black hover:bg-brand-dark"
              >
                View Recommended Products
              </Link>
              <Link
                href="/tools/photometric-request"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-600 px-6 py-3 font-semibold text-white hover:border-brand hover:text-brand"
              >
                Request Free Layout
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Calculator */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand">
                <Calculator className="h-6 w-6 text-black" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">Quick Estimate Calculator</h2>
                <p className="mt-1 text-gray-600">Get a quick estimate of fixtures needed for your warehouse</p>
              </div>
            </div>
            
            <div className="mt-6 grid gap-6 md:grid-cols-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Length (ft)</label>
                <input
                  type="number"
                  placeholder="200"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Width (ft)</label>
                <input
                  type="number"
                  placeholder="150"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ceiling Height (ft)</label>
                <select className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none">
                  <option>15-20 ft</option>
                  <option>20-25 ft</option>
                  <option>25-30 ft</option>
                  <option>30+ ft</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full rounded-lg bg-brand px-6 py-2 font-semibold text-black hover:bg-brand-dark">
                  Calculate
                </button>
              </div>
            </div>
            
            <p className="mt-4 text-xs text-gray-500">
              * This is a rough estimate. For accurate results, <Link href="/tools/photometric-request" className="text-brand hover:underline">request a photometric layout</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Recommended Products */}
      <section id="products" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">Recommended Products for Warehouses</h2>
          <p className="mt-2 text-gray-600">Our most popular fixtures for warehouse applications</p>
          
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {recommendedProducts.map((product) => (
              <div
                key={product.sku}
                className={`relative rounded-xl border bg-white p-6 transition-all hover:shadow-lg ${
                  product.recommended ? 'border-brand shadow-md' : 'border-gray-200'
                }`}
              >
                {product.recommended && (
                  <span className="absolute -top-3 left-4 rounded-full bg-brand px-3 py-1 text-xs font-bold text-black">
                    Best Seller
                  </span>
                )}
                
                <div className="aspect-square rounded-lg bg-gray-100">
                  <div className="flex h-full items-center justify-center">
                    <Zap className="h-16 w-16 text-gray-300" />
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-xs text-gray-500">{product.sku}</p>
                    </div>
                    {product.dlc && (
                      <span className="rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-bold text-green-700">
                        DLC
                      </span>
                    )}
                  </div>
                  
                  <p className="mt-2 text-sm text-gray-600">{product.description}</p>
                  
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500">
                    <span className="rounded bg-gray-100 px-2 py-0.5">{product.wattage}</span>
                    <span className="rounded bg-gray-100 px-2 py-0.5">{product.lumens}</span>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">${product.price}</span>
                    <span className={`text-xs ${product.stock === 'In Stock' ? 'text-green-600' : 'text-amber-600'}`}>
                      {product.stock}
                    </span>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/products/${product.sku}`}
                      className="flex-1 rounded-lg border border-gray-300 py-2 text-center text-sm font-medium hover:border-brand hover:text-brand"
                    >
                      View Details
                    </Link>
                    <button className="flex-1 rounded-lg bg-brand py-2 text-sm font-semibold text-black hover:bg-brand-dark">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Link
              href="/products?category=high-bay"
              className="inline-flex items-center gap-2 text-brand hover:underline"
            >
              View All High Bay Lights
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">Warehouse Lighting Specifications</h2>
          
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(specs).map(([key, value]) => (
              <div key={key} className="rounded-lg bg-white p-5 shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h3>
                <p className="mt-1 text-lg font-semibold text-gray-900">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">Why LED for Warehouses?</h2>
          
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Zap, title: '50-70% Energy Savings', description: 'Compared to Metal Halide and HPS' },
              { icon: Shield, title: 'Long Lifespan', description: '100,000+ hours reduces replacement costs' },
              { icon: Truck, title: 'Instant On', description: 'No warm-up time unlike traditional HID' },
              { icon: FileText, title: 'Rebate Eligible', description: 'DLC-listed for utility incentives' },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand/10">
                  <item.icon className="h-6 w-6 text-brand" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900">{faq.q}</h3>
                <p className="mt-2 text-sm text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-black">Need Help with Your Warehouse Project?</h2>
          <p className="mt-2 text-gray-800">
            Our lighting specialists can create a custom photometric layout and project quote for your facility.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/tools/photometric-request"
              className="inline-flex items-center gap-2 rounded-lg bg-black px-8 py-3 font-semibold text-white hover:bg-gray-800"
            >
              Request Free Layout
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tools/roi-calculator"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-black px-8 py-3 font-semibold text-black hover:bg-black/10"
            >
              Calculate ROI
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
