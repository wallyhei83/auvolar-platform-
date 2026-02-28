import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import {
  TrendingUp, Globe, Cpu, Lightbulb, BarChart3, Users, ArrowRight, DollarSign,
  Building2, Sparkles, Target, ShieldCheck, Zap, Calendar, Mail, ChevronRight,
  Award, Layers, Factory
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Investor Relations | Auvolar LED Lighting',
  description: 'Invest in the future of intelligent commercial lighting. Auvolar combines AI technology with LED manufacturing to transform a $100B+ global industry.',
}

const marketStats = [
  { value: '$130B+', label: 'Global LED Market Size by 2030', icon: Globe },
  { value: '13.2%', label: 'Industry CAGR (2024-2030)', icon: TrendingUp },
  { value: '70%', label: 'Energy Savings vs Legacy Lighting', icon: Zap },
  { value: '$4.5B', label: 'Annual U.S. Utility Rebates for LED', icon: DollarSign },
]

const investmentHighlights = [
  {
    icon: Target,
    title: 'Massive Addressable Market',
    desc: 'The global commercial LED lighting market exceeds $130 billion by 2030, driven by energy regulations, sustainability mandates, and the ongoing transition from legacy fixtures. Less than 40% of U.S. commercial buildings have converted to LED — the retrofit wave is just beginning.',
  },
  {
    icon: Cpu,
    title: 'AI-First Platform Strategy',
    desc: 'We\'re not just a lighting company — we\'re building an AI-powered platform. Photometric simulation, intelligent product selection (LightSpec AI), and generative product design create recurring revenue streams and deep customer lock-in beyond hardware sales.',
  },
  {
    icon: Layers,
    title: 'Vertical Integration & Margins',
    desc: 'Direct relationships with top-tier LED chip and driver manufacturers (Lumileds, Seoul Semi, Inventronics) eliminate middlemen. In-house engineering and quality control enable DLC/UL certified products at 30-50% below competitors with healthy gross margins.',
  },
  {
    icon: Users,
    title: 'Partner-Driven Distribution',
    desc: 'A growing ecosystem of contractors, engineers, distributors, and property owners creates a capital-efficient, referral-driven distribution model. Each partner type amplifies the network — contractors need fixtures, property owners need contractors, engineers spec our products.',
  },
  {
    icon: ShieldCheck,
    title: 'Moats & Competitive Advantages',
    desc: 'DLC & UL certifications (12-18 month process) create barriers to entry. A growing library of 500+ IES photometric files powers our AI tools. Partner relationships and co-development IP build switching costs. AI platform capabilities are compounding assets.',
  },
  {
    icon: Factory,
    title: 'Asset-Light Manufacturing',
    desc: 'Strategic OEM partnerships in Shenzhen and Xiamen provide flexible manufacturing capacity without capital-intensive factory ownership. This allows rapid product expansion while maintaining quality through our engineering oversight and QC protocols.',
  },
]

const milestones = [
  { year: '2024', event: 'Company founded, initial product catalog launched' },
  { year: '2025 Q1', event: 'DLC & UL certification for core product lines' },
  { year: '2025 Q2', event: 'E-commerce platform live, first contractor partnerships' },
  { year: '2025 Q3', event: 'AI Tools platform (Simulation, Design Lab, LightSpec AI) beta launch' },
  { year: '2025 Q4', event: 'Partner program expansion, 100+ active partners' },
  { year: '2026', event: 'Series A fundraising, national distribution rollout' },
]

const teamPlaceholders = [
  { name: 'Founding Team', role: 'Leadership', desc: 'Deep expertise in LED technology, global supply chain, and AI/ML — bridging hardware manufacturing with intelligent software.' },
  { name: 'Engineering', role: 'R&D', desc: 'Optical, thermal, and electrical engineers delivering DLC-certified products that meet or exceed industry performance benchmarks.' },
  { name: 'AI & Software', role: 'Technology', desc: 'Building the AI platform powering photometric simulation, product design, and intelligent selection — the brains behind the brand.' },
]

export default function InvestorPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black py-24">
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, #facc15 0%, transparent 40%)' }} />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/5 px-5 py-2 text-sm font-medium text-yellow-400">
            <Sparkles className="h-4 w-4" />
            Investor Relations
          </div>
          <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl">
            Illuminating the Future of<br />
            <span className="text-yellow-400">Commercial Lighting</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400">
            Auvolar is building the first AI-powered commercial lighting platform — combining certified LED products, intelligent design tools, and a nationwide partner ecosystem to capture a $130B+ global market.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?subject=Investor+Meeting+Request"
              className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-8 py-3.5 font-semibold text-black transition-colors hover:bg-yellow-500"
            >
              Schedule a Meeting
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-600 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-white/5"
            >
              Company Overview
            </Link>
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="border-b border-gray-100 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-yellow-600">Market Opportunity</p>
            <h2 className="text-3xl font-bold text-gray-900">A Massive Market in Transition</h2>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {marketStats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center">
                <s.icon className="mx-auto mb-3 h-6 w-6 text-yellow-500" />
                <div className="text-3xl font-black text-gray-900">{s.value}</div>
                <div className="mt-2 text-xs leading-tight text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Highlights */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-yellow-600">Investment Thesis</p>
            <h2 className="mb-3 text-3xl font-bold text-gray-900">Why Auvolar</h2>
            <p className="mx-auto max-w-2xl text-gray-500">
              Six strategic pillars that position Auvolar for outsized growth in a massive, fragmented market.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {investmentHighlights.map((h) => (
              <div key={h.title} className="rounded-2xl border border-gray-100 p-8 transition-shadow hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
                  <h.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-gray-900">{h.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones / Timeline */}
      <section className="border-t border-gray-100 bg-gray-50 py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-yellow-600">Company Timeline</p>
            <h2 className="text-3xl font-bold text-gray-900">Key Milestones</h2>
          </div>
          <div className="space-y-0">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-black">
                    {i + 1}
                  </div>
                  {i < milestones.length - 1 && <div className="h-full w-px bg-yellow-200" />}
                </div>
                <div className="pb-8">
                  <span className="text-sm font-bold text-yellow-600">{m.year}</span>
                  <p className="mt-1 text-gray-700">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-yellow-600">Our Team</p>
            <h2 className="text-3xl font-bold text-gray-900">Built by Industry Veterans</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {teamPlaceholders.map((t) => (
              <div key={t.name} className="rounded-2xl border border-gray-100 p-8 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="font-bold text-gray-900">{t.name}</h3>
                <p className="mb-3 text-sm text-yellow-600">{t.role}</p>
                <p className="text-sm text-gray-500">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact IR */}
      <section className="border-t border-gray-100 bg-gradient-to-br from-gray-950 to-black py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <Mail className="mx-auto mb-6 h-10 w-10 text-yellow-400" />
          <h2 className="mb-4 text-3xl font-bold text-white">Get in Touch</h2>
          <p className="mb-8 text-lg text-gray-400">
            Interested in learning more about Auvolar&apos;s growth story? We welcome conversations with investors, analysts, and strategic partners who share our vision.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?subject=Investor+Meeting+Request"
              className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-8 py-3.5 font-semibold text-black hover:bg-yellow-500"
            >
              <Calendar className="h-5 w-5" />
              Schedule a Meeting
            </Link>
            <a
              href="mailto:invest@auvolar.com"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-600 px-8 py-3.5 font-semibold text-white hover:bg-white/5"
            >
              <Mail className="h-5 w-5" />
              invest@auvolar.com
            </a>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-gray-600" />
              17531 Railroad St Ste F, City of Industry, CA 91748
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-600" />
              www.auvolar.com
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-gray-50 py-8">
        <div className="mx-auto max-w-4xl px-4">
          <p className="text-center text-xs leading-relaxed text-gray-400">
            <strong>Forward-Looking Statements:</strong> This page contains forward-looking statements regarding Auvolar&apos;s business outlook, market opportunity, product roadmap, and growth strategy. These statements involve risks and uncertainties, and actual results may differ materially. Market data and projections are based on industry research and management estimates. This page does not constitute an offer to sell or a solicitation of an offer to buy any securities.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
