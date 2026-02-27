import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import {
  Warehouse, Building2, ShoppingBag, Car, Factory, Dumbbell, Hospital, GraduationCap,
  LandPlot, ParkingCircle, Route, CircleDot, Trophy, Fuel, Building, Sun,
  Lock, Sparkles, BarChart3, Layers
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Photometric Simulation | Indoor & Outdoor Lighting Design | Auvolar',
  description: 'AI-powered photometric simulation for indoor and outdoor lighting projects. Accurate IES-based modeling for warehouses, parking lots, stadiums, and more.',
}

const indoorScenes = [
  { name: 'Warehouse', icon: Warehouse, desc: 'High bay & racking aisles' },
  { name: 'Office', icon: Building2, desc: 'Open plan & private offices' },
  { name: 'Retail Store', icon: ShoppingBag, desc: 'Showroom & display areas' },
  { name: 'Parking Garage', icon: Car, desc: 'Multi-level structures' },
  { name: 'Manufacturing', icon: Factory, desc: 'Production floors & assembly' },
  { name: 'Gym / Arena', icon: Dumbbell, desc: 'Sports & recreation facilities' },
  { name: 'Hospital', icon: Hospital, desc: 'Patient rooms & corridors' },
  { name: 'School', icon: GraduationCap, desc: 'Classrooms & campuses' },
]

const outdoorScenes = [
  { name: 'Stadium / Sports Field', icon: Trophy, desc: 'Professional & recreational fields' },
  { name: 'Parking Lot', icon: ParkingCircle, desc: 'Surface lots & EV charging' },
  { name: 'Street / Roadway', icon: Route, desc: 'Arterial & residential roads' },
  { name: 'Tennis Court', icon: CircleDot, desc: 'Single & multi-court layouts' },
  { name: 'Basketball Court', icon: CircleDot, desc: 'Indoor & outdoor courts' },
  { name: 'Soccer Field', icon: LandPlot, desc: 'Full & half-field designs' },
  { name: 'Baseball Field', icon: LandPlot, desc: 'Infield & outfield coverage' },
  { name: 'Gas Station', icon: Fuel, desc: 'Canopy & forecourt lighting' },
  { name: 'Building Facade', icon: Building, desc: 'Architectural accent lighting' },
]

const plans = [
  {
    name: 'Basic',
    price: '$49',
    period: '/month',
    features: ['5 simulations/month', 'Indoor scenes', 'PDF reports', 'Email support'],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$149',
    period: '/month',
    features: ['Unlimited simulations', 'Indoor & outdoor scenes', 'IES file integration', '3D visualization', 'Priority support', 'Custom scenes'],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    features: ['Everything in Pro', 'API access', 'White-label reports', 'Dedicated account manager', 'Custom integrations', 'Team collaboration'],
    cta: 'Contact Sales',
    popular: false,
  },
]

function SceneCard({ name, icon: Icon, desc }: { name: string; icon: React.ElementType; desc: string }) {
  return (
    <Link
      href="/contact?subject=Photometric+Simulation"
      className="group flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-6 text-center transition-all hover:border-yellow-400 hover:shadow-lg"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600 transition-colors group-hover:bg-yellow-100">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="font-semibold text-gray-900">{name}</h3>
      <p className="text-xs text-gray-500">{desc}</p>
      <span className="mt-auto rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 group-hover:bg-yellow-50 group-hover:text-yellow-700">
        Coming Soon
      </span>
    </Link>
  )
}

export default function PhotometricSimulationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, #facc15 0%, transparent 50%), radial-gradient(circle at 75% 50%, #3b82f6 0%, transparent 50%)' }} />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-yellow-400/10 px-4 py-1.5 text-sm font-medium text-yellow-400">
            <Sparkles className="h-4 w-4" />
            AI-Powered • Subscription Service
          </div>
          <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Photometric <span className="text-yellow-400">Simulation</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Professional-grade lighting simulation powered by AI. Upload your floor plan or site layout, select fixtures, and get accurate photometric analysis in minutes — not hours.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1.5"><BarChart3 className="h-4 w-4 text-yellow-400" /> IES-based calculations</span>
            <span className="flex items-center gap-1.5"><Layers className="h-4 w-4 text-yellow-400" /> 3D visualization</span>
            <span className="flex items-center gap-1.5"><Lock className="h-4 w-4 text-yellow-400" /> Code compliance check</span>
          </div>
        </div>
      </section>

      {/* Indoor Simulation */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">Indoor Simulation</h2>
          <p className="text-gray-500">Select a scene to start your indoor lighting simulation</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {indoorScenes.map((scene) => (
            <SceneCard key={scene.name} {...scene} />
          ))}
        </div>
      </section>

      {/* Outdoor Simulation */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-900">Outdoor Simulation</h2>
            <p className="text-gray-500">Select a scene to start your outdoor lighting simulation</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {outdoorScenes.map((scene) => (
              <SceneCard key={scene.name} {...scene} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">Subscription Plans</h2>
          <p className="text-gray-500">Choose the plan that fits your simulation needs</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 ${
                plan.popular
                  ? 'border-yellow-400 bg-white shadow-xl ring-1 ring-yellow-400'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-yellow-400 px-4 py-1 text-xs font-bold text-black">
                  Most Popular
                </div>
              )}
              <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-500">{plan.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="h-4 w-4 shrink-0 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact?subject=Photometric+Simulation"
                className={`mt-8 block w-full rounded-lg py-3 text-center text-sm font-semibold ${
                  plan.popular
                    ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
