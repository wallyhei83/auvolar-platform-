import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import {
  Wrench, HardHat, Zap, Building2, Lightbulb, Truck, Package, Users,
  ArrowRight, CheckCircle2, Handshake
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Partner Program | Contractors, Distributors & Suppliers | Auvolar',
  description: 'Join Auvolar\'s partner network. Special pricing, project referrals, co-development opportunities, and revenue sharing for contractors, engineers, distributors, and suppliers.',
}

const partnerTypes = [
  {
    icon: HardHat,
    title: 'Contractors',
    desc: 'General contractors and specialty lighting contractors. Get preferred pricing, dedicated project support, and priority fulfillment.',
    benefits: ['Volume contractor pricing', 'Project referrals from nearby owners', 'Priority order fulfillment', 'Dedicated account manager', 'Co-branded project proposals'],
    cta: 'Apply as Contractor',
  },
  {
    icon: Wrench,
    title: 'Engineers & Designers',
    desc: 'Electrical engineers, lighting designers, and MEP firms. Access our full IES library and design support.',
    benefits: ['Complete IES file library', 'Free photometric layouts', 'Spec-to-order streamlined process', 'CE credit opportunities', 'Project collaboration tools'],
    cta: 'Apply as Engineer',
  },
  {
    icon: Zap,
    title: 'Electricians',
    desc: 'Licensed electricians handling lighting retrofits and new installations. We make your job easier.',
    benefits: ['Electrician-specific pricing', 'Quick-ship inventory access', 'Installation guides & videos', 'Technical support hotline', 'Referral bonuses'],
    cta: 'Apply as Electrician',
  },
  {
    icon: Building2,
    title: 'Property Owners',
    desc: 'Commercial property owners and facility managers. Maximize energy savings and qualify for rebates.',
    benefits: ['Free lighting audit', 'Utility rebate assistance', 'Financing options (LaaS)', 'Maintenance programs', 'Trusted contractor referrals'],
    cta: 'Apply as Property Owner',
  },
  {
    icon: Lightbulb,
    title: 'Product Managers',
    desc: 'Co-develop innovative lighting products with Auvolar. Leverage our manufacturing and global supply chain.',
    benefits: ['Joint product development', 'Patent co-ownership', 'Revenue sharing on sales', 'Access to Auvolar R&D team', 'Go-to-market support'],
    cta: 'Apply as Product Manager',
  },
  {
    icon: Truck,
    title: 'Distributors',
    desc: 'Grow your lighting portfolio with DLC-certified, competitively priced LED fixtures. White-label options available.',
    benefits: ['Distributor-tier pricing', 'Drop-ship capability', 'White-label packaging', 'Marketing materials', 'Territory protection'],
    cta: 'Apply as Distributor',
  },
  {
    icon: Package,
    title: 'Suppliers',
    desc: 'High-quality LED components, drivers, and materials. Become a trusted link in our supply chain.',
    benefits: ['Long-term supply agreements', 'Consistent volume orders', 'Quality partnership program', 'Joint innovation projects', 'Preferred supplier status'],
    cta: 'Apply as Supplier',
  },
]

export default function PartnerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #facc15 0%, transparent 50%)' }} />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-yellow-400/10 px-4 py-1.5 text-sm font-medium text-yellow-400">
            <Handshake className="h-4 w-4" />
            Grow Together
          </div>
          <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Partner <span className="text-yellow-400">Program</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Whether you install, design, distribute, or manufacture — there&apos;s a place for you in the Auvolar ecosystem. Join our network and unlock exclusive benefits.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-yellow-400" /> 500+ partners nationwide</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-yellow-400" /> Free to join</span>
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">Find Your Role</h2>
          <p className="text-gray-500">Select the partner type that best describes your business</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {partnerTypes.map((p) => (
            <div key={p.title} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-yellow-400 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
                <p.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">{p.title}</h3>
              <p className="mb-4 text-sm text-gray-500">{p.desc}</p>
              <ul className="mb-6 flex-1 space-y-2">
                {p.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                href="/partner/register"
                className="flex items-center justify-center gap-2 rounded-lg border border-yellow-400 bg-yellow-50 px-4 py-2.5 text-sm font-semibold text-yellow-700 hover:bg-yellow-100"
              >
                {p.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Investor CTA */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-black p-12">
            <h2 className="mb-4 text-3xl font-bold text-white">Investor Relations</h2>
            <p className="mb-8 text-gray-400">
              We&apos;re building the future of intelligent commercial lighting — from AI-powered design tools to smart manufacturing. If you share our vision, we&apos;d love to talk.
            </p>
            <Link
              href="/investor"
              className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-8 py-3 font-semibold text-black hover:bg-yellow-500"
            >
              Learn More
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
