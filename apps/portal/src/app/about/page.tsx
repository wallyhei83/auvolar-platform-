import Link from 'next/link'
import { 
  Zap, Shield, Truck, Users, Award, Globe, CheckCircle2, ArrowRight,
  Building2, Phone, Mail, MapPin
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const values = [
  {
    icon: Shield,
    title: 'Quality First',
    description: 'We source only DLC and UL-listed products with proven performance and reliability.'
  },
  {
    icon: Users,
    title: 'Contractor-Focused',
    description: 'Built by industry veterans who understand the needs of electrical contractors.'
  },
  {
    icon: Truck,
    title: 'Fast & Reliable',
    description: 'Same-day shipping on in-stock items with accurate inventory visibility.'
  },
  {
    icon: Award,
    title: 'Expert Support',
    description: 'Technical specialists available to help with product selection and project support.'
  },
]

const stats = [
  { value: '10,000+', label: 'Products Shipped Monthly' },
  { value: '5,000+', label: 'Happy Customers' },
  { value: '99.5%', label: 'Order Accuracy' },
  { value: '<24h', label: 'Average Ship Time' },
]

const certifications = [
  { name: 'DLC', description: 'DesignLights Consortium Partner' },
  { name: 'UL', description: 'UL Listed Products' },
  { name: 'ETL', description: 'ETL Listed Products' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black py-24">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Light Done Right
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              Auvolar is your partner for commercial and industrial LED lighting. 
              We combine quality products, competitive pricing, and expert support to help 
              contractors and facility managers complete projects successfully.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-semibold text-black hover:bg-brand-dark"
              >
                Explore Products
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-600 px-6 py-3 font-semibold text-white hover:border-brand hover:text-brand"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-200 bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-brand">{stat.value}</div>
                <div className="mt-1 text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
              <div className="mt-6 space-y-4 text-gray-600">
                <p>
                  Auvolar was founded with a simple mission: make commercial LED lighting 
                  accessible, affordable, and easy to source for the professionals who need it most.
                </p>
                <p>
                  After years of working in the electrical contracting industry, our founders saw 
                  firsthand the challenges of sourcing quality LED products—inconsistent availability, 
                  confusing specifications, and suppliers who didn't understand the realities of 
                  commercial projects.
                </p>
                <p>
                  We built Auvolar to be different. Every product in our catalog is carefully 
                  vetted for quality and performance. Our inventory is accurate and updated in real-time. 
                  And our team includes lighting specialists who can help you find the right solution 
                  for any application.
                </p>
                <p>
                  Today, we serve thousands of contractors, electricians, and facility managers 
                  across the United States, helping them complete projects on time and on budget.
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <Zap className="mx-auto h-16 w-16 text-gray-400" />
                    <p className="mt-4 text-gray-500">Company Photo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
            <p className="mt-4 text-gray-600">What drives us every day</p>
          </div>
          
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="rounded-xl bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10">
                  <value.icon className="h-6 w-6 text-brand" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{value.title}</h3>
                <p className="mt-2 text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Why Choose Auvolar</h2>
              <ul className="mt-8 space-y-4">
                {[
                  'DLC and UL-listed products backed by manufacturer warranties',
                  'Competitive contractor pricing with volume discounts',
                  'Same-day shipping on in-stock items (order by 2pm CST)',
                  'Net 30 payment terms for qualified accounts',
                  'Complete technical documentation (IES, cut sheets, certificates)',
                  'Lighting specialists available for project support',
                  'Easy RMA process with prepaid return labels',
                  'Real-time inventory visibility—no overselling',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex items-center">
              <div className="rounded-2xl bg-gray-900 p-8">
                <h3 className="text-xl font-semibold text-white">Certifications & Compliance</h3>
                <p className="mt-2 text-gray-400">
                  We partner with certified manufacturers and maintain strict quality standards.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  {certifications.map((cert) => (
                    <div key={cert.name} className="rounded-lg border border-gray-700 bg-gray-800 p-4 text-center">
                      <div className="text-2xl font-bold text-brand">{cert.name}</div>
                      <div className="mt-1 text-xs text-gray-400">{cert.description}</div>
                    </div>
                  ))}
                </div>
                <Link
                  href="/about"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
                >
                  View Compliance Center
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-brand py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-xl font-semibold text-black">Get in Touch</h3>
              <p className="mt-2 text-gray-800">
                Have questions? Our team is here to help.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/10">
                <Phone className="h-5 w-5 text-black" />
              </div>
              <div>
                <p className="text-sm text-gray-700">Phone</p>
                <p className="font-semibold text-black">1-888-555-0123</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/10">
                <Mail className="h-5 w-5 text-black" />
              </div>
              <div>
                <p className="text-sm text-gray-700">Email</p>
                <p className="font-semibold text-black">sales@auvolar.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/10">
                <MapPin className="h-5 w-5 text-black" />
              </div>
              <div>
                <p className="text-sm text-gray-700">Location</p>
                <p className="font-semibold text-black">City of Industry, CA</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-black px-8 py-3 font-semibold text-white hover:bg-gray-800"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
