import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'LED Lighting Tools | ROI Calculator, Rebate Finder, BOM Upload | Auvolar',
  description: 'Free LED lighting tools: ROI calculator, energy savings calculator, rebate finder, replacement finder, BOM upload, and photometric request. Plan your LED upgrade with Auvolar.',
  alternates: { canonical: 'https://www.auvolar.com/tools' },
}
import { 
  Package, Upload, Search, Calculator, MapPin, FileText, 
  ArrowRight, Zap, Download, Clock, Lightbulb, HelpCircle
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const quickTools = [
  {
    name: 'Quick Order',
    description: 'Paste SKU + Qty for fast reordering. Perfect for repeat orders.',
    icon: Package,
    href: '/tools/quick-order',
    time: '< 1 min',
    color: 'bg-blue-500',
  },
  {
    name: 'Upload BOM',
    description: 'Upload your bill of materials (Excel/PDF) and get a custom quote within 24 hours.',
    icon: Upload,
    href: '/tools/bom-upload',
    time: '24h response',
    color: 'bg-purple-500',
  },
  {
    name: 'Replacement Finder',
    description: 'Find LED replacements for legacy fixtures like Metal Halide, HPS, and fluorescent.',
    icon: Search,
    href: '/tools/replacement',
    time: '2 min',
    color: 'bg-green-500',
  },
]

const calculators = [
  {
    name: 'ROI Calculator',
    description: 'Calculate energy savings, payback period, and total cost of ownership for LED upgrades.',
    icon: Calculator,
    href: '/tools/roi-calculator',
    time: '3 min',
  },
  {
    name: 'Rebate Finder',
    description: 'Find utility rebates and incentives available in your area for DLC-listed products.',
    icon: MapPin,
    href: '/tools/rebate-finder',
    time: '2 min',
  },
  {
    name: 'Lighting Calculator',
    description: 'Estimate the number of fixtures needed based on room size and target illumination.',
    icon: Lightbulb,
    href: '/tools/lighting-calculator',
    time: '3 min',
  },
]

const resources = [
  {
    name: 'IES Library',
    description: 'Download photometric data files for lighting design software (AGI32, DIALux).',
    icon: FileText,
    href: '/resources/ies',
  },
  {
    name: 'Cut Sheets',
    description: 'Product specification sheets with dimensions, electrical data, and certifications.',
    icon: Download,
    href: '/resources/cut-sheets',
  },
  {
    name: 'Spec Package Builder',
    description: 'Build a custom spec package with Cut Sheet, IES, DLC cert, and install guide.',
    icon: Package,
    href: '/tools/spec-package',
  },
  {
    name: 'Installation Guides',
    description: 'Step-by-step installation instructions and wiring diagrams.',
    icon: HelpCircle,
    href: '/resources/installation',
  },
]

const vendorResources = [
  { name: 'Vendor Packet', description: 'W-9, COI, Policies, Terms', href: '/vendor-packet' },
  { name: 'Warranty Info', description: '5-10 year warranty details', href: '/support/warranty' },
  { name: 'Return Policy', description: 'RMA process and guidelines', href: '/support/returns' },
  { name: 'Shipping Info', description: 'Carriers, lead times, LTL', href: '/support/shipping' },
]

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-black py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Contractor Tools & Resources
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              Everything you need to quote, order, and manage your lighting projects.
              Save time with our calculators, spec builders, and quick order tools.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Tools */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900">Quick Tools</h2>
          <p className="mt-1 text-gray-600">Most-used tools for fast ordering and quoting</p>
          
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {quickTools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-lg"
              >
                <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full ${tool.color} opacity-10 transition-transform group-hover:scale-150`} />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${tool.color}`}>
                      <tool.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                      {tool.time}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-brand">
                    {tool.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{tool.description}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-brand">
                    Get started <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Calculators */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900">Calculators</h2>
          <p className="mt-1 text-gray-600">Estimate savings, find rebates, and plan your project</p>
          
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {calculators.map((calc) => (
              <Link
                key={calc.name}
                href={calc.href}
                className="group flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-brand hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/10">
                  <calc.icon className="h-5 w-5 text-brand" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 group-hover:text-brand">
                      {calc.name}
                    </h3>
                    <span className="text-xs text-gray-500">{calc.time}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{calc.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900">Documentation & Downloads</h2>
          <p className="mt-1 text-gray-600">Technical documents, spec sheets, and installation guides</p>
          
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {resources.map((resource) => (
              <Link
                key={resource.name}
                href={resource.href}
                className="group rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-brand hover:shadow-md"
              >
                <resource.icon className="h-8 w-8 text-gray-400 group-hover:text-brand" />
                <h3 className="mt-3 font-semibold text-gray-900 group-hover:text-brand">
                  {resource.name}
                </h3>
                <p className="mt-1 text-sm text-gray-600">{resource.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Vendor Resources */}
      <section className="bg-gray-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-white">Vendor Resources</h2>
          <p className="mt-1 text-gray-400">Documents for procurement and compliance</p>
          
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {vendorResources.map((resource) => (
              <Link
                key={resource.name}
                href={resource.href}
                className="group rounded-xl border border-gray-700 bg-gray-800 p-5 transition-all hover:border-brand"
              >
                <h3 className="font-semibold text-white group-hover:text-brand">
                  {resource.name}
                </h3>
                <p className="mt-1 text-sm text-gray-400">{resource.description}</p>
                <span className="mt-3 inline-flex items-center text-sm text-brand">
                  Download <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Photometric Request CTA */}
      <section className="bg-brand py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h2 className="text-2xl font-bold text-black">Need a Photometric Layout?</h2>
              <p className="mt-2 text-gray-800">
                Our lighting engineers can create a preliminary layout for your project within 24 hours.
              </p>
            </div>
            <Link
              href="/tools/photometric-request"
              className="inline-flex items-center gap-2 rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
            >
              Request Photometric Layout
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Help */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">Need Help?</h2>
            <p className="mt-2 text-gray-600">
              Our lighting specialists are here to help with product selection, technical questions, and project support.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a
                href="tel:1-888-555-0123"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:border-brand hover:text-brand"
              >
                Call 1-888-555-0123
              </a>
              <Link
                href="/support"
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-semibold text-black hover:bg-brand-dark"
              >
                Contact Support
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-500">Mon-Fri 8am-6pm CST</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
