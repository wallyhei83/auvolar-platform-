import Link from 'next/link'
import { 
  ChevronRight, ArrowRight, Warehouse, Factory, ShoppingCart, Building2,
  Car, Fuel, GraduationCap, Dumbbell, Theater, Thermometer
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const applications = [
  {
    name: 'Warehouse & Distribution',
    description: 'High bay lighting for storage, picking, and shipping areas. DLC-listed for rebates.',
    icon: Warehouse,
    href: '/applications/warehouse',
    products: ['UFO High Bay', 'Linear High Bay', 'Motion Sensors'],
    featured: true,
  },
  {
    name: 'Manufacturing & Industrial',
    description: 'Durable fixtures for production floors, assembly lines, and machine shops.',
    icon: Factory,
    href: '/applications/manufacturing',
    products: ['High Bay', 'Vapor Tight', 'Task Lighting'],
    featured: true,
  },
  {
    name: 'Retail & Grocery',
    description: 'Display lighting for stores, supermarkets, and shopping centers.',
    icon: ShoppingCart,
    href: '/applications/retail',
    products: ['Troffers', 'Track Lights', 'Refrigeration'],
    featured: false,
  },
  {
    name: 'Office & Corporate',
    description: 'Energy-efficient solutions for offices, lobbies, and conference rooms.',
    icon: Building2,
    href: '/applications/office',
    products: ['Troffers', 'Panels', 'Downlights'],
    featured: false,
  },
  {
    name: 'Parking & Garage',
    description: 'Area and canopy lights for parking lots, garages, and carports.',
    icon: Car,
    href: '/applications/parking',
    products: ['Area Lights', 'Canopy Lights', 'Wall Packs'],
    featured: true,
  },
  {
    name: 'Gas Station & Canopy',
    description: 'High-output canopy lights for fuel stations and drive-throughs.',
    icon: Fuel,
    href: '/applications/gas-station',
    products: ['Canopy Lights', 'Wall Packs', 'Bollards'],
    featured: false,
  },
  {
    name: 'Education',
    description: 'Classroom and campus lighting for schools, colleges, and universities.',
    icon: GraduationCap,
    href: '/applications/education',
    products: ['Troffers', 'Panels', 'Area Lights'],
    featured: false,
  },
  {
    name: 'Sports & Recreation',
    description: 'High-power fixtures for gyms, fields, and recreational facilities.',
    icon: Dumbbell,
    href: '/applications/sports',
    products: ['Sports Lights', 'High Bay', 'Flood Lights'],
    featured: false,
  },
  {
    name: 'Hospitality & Entertainment',
    description: 'Lighting for hotels, restaurants, theaters, and event spaces.',
    icon: Theater,
    href: '/applications/hospitality',
    products: ['Downlights', 'Decorative', 'Track'],
    featured: false,
  },
  {
    name: 'Cold Storage & Freezer',
    description: 'Rated fixtures for refrigerated warehouses and freezer rooms.',
    icon: Thermometer,
    href: '/applications/cold-storage',
    products: ['Vapor Tight', 'Cold-Rated High Bay'],
    featured: false,
  },
]

export default function ApplicationsPage() {
  const featuredApps = applications.filter(a => a.featured)
  const otherApps = applications.filter(a => !a.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-gray-900">Applications</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-900">Shop by Application</h1>
            <p className="mt-4 text-lg text-gray-600">
              Find the right LED lighting solution for your specific application. 
              Each guide includes recommended products, specifications, and project support tools.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Applications */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900">Popular Applications</h2>
          
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {featuredApps.map((app) => (
              <Link
                key={app.name}
                href={app.href}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black p-6 transition-all hover:shadow-xl"
              >
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand/10 transition-transform group-hover:scale-150" />
                <div className="relative">
                  <app.icon className="h-10 w-10 text-brand" />
                  <h3 className="mt-4 text-xl font-bold text-white">{app.name}</h3>
                  <p className="mt-2 text-sm text-gray-400">{app.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {app.products.map((product) => (
                      <span key={product} className="rounded-full bg-white/10 px-2 py-1 text-xs text-gray-300">
                        {product}
                      </span>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-brand group-hover:underline">
                    Explore {app.name.split(' ')[0]}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Applications */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900">All Applications</h2>
          
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {applications.map((app) => (
              <Link
                key={app.name}
                href={app.href}
                className="group flex items-start gap-4 rounded-xl border border-gray-200 p-5 transition-all hover:border-brand hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 group-hover:bg-brand/10">
                  <app.icon className="h-6 w-6 text-gray-600 group-hover:text-brand" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-brand">{app.name}</h3>
                  <p className="mt-1 text-xs text-gray-500">{app.products.join(' • ')}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="bg-brand py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-black">Not Sure Which Product is Right for You?</h2>
          <p className="mt-2 text-gray-800">
            Our lighting specialists can help you select the best solution for your application.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/tools/replacement"
              className="inline-flex items-center gap-2 rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
            >
              Replacement Finder
            </Link>
            <Link
              href="/support"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-black px-6 py-3 font-semibold text-black hover:bg-black/10"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
