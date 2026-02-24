import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Support Center | Auvolar LED Lighting',
  description: 'Get help with Auvolar LED lighting products. Find spec sheets, installation guides, warranty information, shipping details, and contact our technical support team.',
  alternates: { canonical: 'https://www.auvolar.com/support' },
}
import { 
  Search, Package, FileText, Wrench, Phone, MessageSquare, Clock,
  ChevronRight, ArrowRight, Shield, HelpCircle, Truck, AlertTriangle
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const quickLinks = [
  {
    icon: Package,
    title: 'Track Order',
    description: 'Check your order status and shipment tracking',
    href: '/track-order',
    color: 'bg-blue-500',
  },
  {
    icon: AlertTriangle,
    title: 'Start RMA',
    description: 'Return or exchange a product',
    href: '/support/rma',
    color: 'bg-red-500',
  },
  {
    icon: Shield,
    title: 'Warranty Info',
    description: 'Learn about our warranty coverage',
    href: '/support/warranty',
    color: 'bg-green-500',
  },
  {
    icon: Truck,
    title: 'Shipping Info',
    description: 'Shipping methods, times, and carriers',
    href: '/support/shipping',
    color: 'bg-purple-500',
  },
]

const categories = [
  {
    title: 'Orders & Shipping',
    items: [
      { q: 'How do I track my order?', href: '/support/faq/track-order' },
      { q: 'What are the shipping options?', href: '/support/faq/shipping-options' },
      { q: 'How long does shipping take?', href: '/support/faq/shipping-time' },
      { q: 'Do you ship internationally?', href: '/support/faq/international' },
      { q: 'What is the LTL freight process?', href: '/support/faq/ltl-freight' },
    ]
  },
  {
    title: 'Returns & Warranty',
    items: [
      { q: 'What is your return policy?', href: '/support/faq/returns' },
      { q: 'How do I start an RMA?', href: '/support/faq/rma-process' },
      { q: 'What does the warranty cover?', href: '/support/faq/warranty-coverage' },
      { q: 'How do I make a warranty claim?', href: '/support/faq/warranty-claim' },
      { q: 'What if my shipment is damaged?', href: '/support/faq/damaged-shipment' },
    ]
  },
  {
    title: 'Products & Technical',
    items: [
      { q: 'How do I find the right replacement?', href: '/support/faq/find-replacement' },
      { q: 'What is DLC certification?', href: '/support/faq/dlc-certification' },
      { q: 'How do I download IES files?', href: '/support/faq/ies-files' },
      { q: 'What does 0-10V dimming mean?', href: '/support/faq/dimming' },
      { q: 'How do I wire my fixtures?', href: '/support/faq/wiring' },
    ]
  },
  {
    title: 'Account & Pricing',
    items: [
      { q: 'How do I get contractor pricing?', href: '/support/faq/contractor-pricing' },
      { q: 'How do I apply for Net Terms?', href: '/support/faq/net-terms' },
      { q: 'How do I upload a tax exemption?', href: '/support/faq/tax-exempt' },
      { q: 'Can I get a project quote?', href: '/support/faq/project-quote' },
      { q: 'How do I pay with a PO?', href: '/support/faq/po-checkout' },
    ]
  },
]

const resources = [
  { name: 'Installation Guides', description: 'Step-by-step installation instructions', href: '/resources/installation', icon: Wrench },
  { name: 'Wiring Diagrams', description: 'Electrical wiring schematics', href: '/resources/wiring', icon: FileText },
  { name: 'Cut Sheets', description: 'Product specification sheets', href: '/resources/cut-sheets', icon: FileText },
  { name: 'IES Library', description: 'Photometric data files', href: '/resources/ies', icon: FileText },
]

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-black py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">How Can We Help?</h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Find answers to common questions, track your order, or get in touch with our support team.
          </p>
          
          {/* Search */}
          <div className="mx-auto mt-8 max-w-2xl">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help articles, FAQs, or product support..."
                className="h-14 w-full rounded-xl bg-white pl-12 pr-4 text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="group flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-brand hover:shadow-md"
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${link.color}`}>
                  <link.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-brand">{link.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{link.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
          
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {categories.map((category) => (
              <div key={category.title} className="rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900">{category.title}</h3>
                <ul className="mt-4 space-y-3">
                  {category.items.map((item) => (
                    <li key={item.q}>
                      <Link
                        href={item.href}
                        className="flex items-center justify-between text-sm text-gray-600 hover:text-brand"
                      >
                        {item.q}
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900">Technical Resources</h2>
          <p className="mt-2 text-gray-600">Documentation and technical files for installation and design</p>
          
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {resources.map((resource) => (
              <Link
                key={resource.name}
                href={resource.href}
                className="group rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-brand hover:shadow-md"
              >
                <resource.icon className="h-8 w-8 text-gray-400 group-hover:text-brand" />
                <h3 className="mt-3 font-semibold text-gray-900 group-hover:text-brand">{resource.name}</h3>
                <p className="mt-1 text-sm text-gray-600">{resource.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-brand py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/10">
                <Phone className="h-6 w-6 text-black" />
              </div>
              <h3 className="mt-4 font-semibold text-black">Call Us</h3>
              <p className="mt-1 text-gray-800">(626) 342-8856</p>
              <p className="text-sm text-gray-700">Mon-Fri 8am-6pm CST</p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/10">
                <MessageSquare className="h-6 w-6 text-black" />
              </div>
              <h3 className="mt-4 font-semibold text-black">Live Chat</h3>
              <p className="mt-1 text-gray-800">Chat with a specialist</p>
              <button className="mt-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
                Start Chat
              </button>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/10">
                <HelpCircle className="h-6 w-6 text-black" />
              </div>
              <h3 className="mt-4 font-semibold text-black">Submit Ticket</h3>
              <p className="mt-1 text-gray-800">Get help via email</p>
              <Link
                href="/contact"
                className="mt-2 inline-block rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Open Ticket
              </Link>
            </div>
          </div>
          
          <p className="mt-8 text-center text-sm text-gray-800">
            Average response time: <strong>Under 4 hours</strong> during business hours
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
