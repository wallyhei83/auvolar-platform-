import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import {
  TrendingUp, Globe, Cpu, Lightbulb, BarChart3, Users, ArrowRight, DollarSign,
  Building2, Sparkles
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Investor Relations | Auvolar LED Lighting',
  description: 'Invest in the future of intelligent commercial lighting. Auvolar combines AI technology with LED manufacturing to transform a $100B+ industry.',
}

const highlights = [
  { icon: DollarSign, value: '$100B+', label: 'Global LED lighting market by 2030' },
  { icon: TrendingUp, value: '12%', label: 'Industry CAGR through 2030' },
  { icon: Building2, value: '70%', label: 'Energy savings vs traditional lighting' },
  { icon: Globe, value: '50 States', label: 'Nationwide coverage from CA warehouse' },
]

const pillars = [
  {
    icon: Lightbulb,
    title: 'DLC-Certified Product Portfolio',
    desc: 'A comprehensive catalog of commercial and industrial LED fixtures — all DLC and UL certified, qualifying for utility rebates nationwide.',
  },
  {
    icon: Cpu,
    title: 'AI-Powered Platform',
    desc: 'From photometric simulation to intelligent product selection (LightSpec AI) to AI-assisted product design — we\'re building the operating system for commercial lighting.',
  },
  {
    icon: Users,
    title: 'Partner Ecosystem',
    desc: 'A growing network of contractors, engineers, distributors, and property owners — creating a flywheel of referrals, co-development, and recurring revenue.',
  },
  {
    icon: BarChart3,
    title: 'Vertical Integration',
    desc: 'Direct manufacturing relationships and in-house engineering eliminate middlemen, enabling competitive pricing with healthy margins.',
  },
]

export default function InvestorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, #facc15 0%, transparent 40%)' }} />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Invest in the Future of <span className="text-yellow-400">Intelligent Lighting</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Auvolar is reimagining commercial lighting with AI-powered tools, vertical integration, and a partner-first ecosystem. We&apos;re not just selling fixtures — we&apos;re building a platform.
          </p>
        </div>
      </section>

      {/* Market Highlights */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {highlights.map((h) => (
            <div key={h.label} className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
                <h.icon className="h-6 w-6" />
              </div>
              <div className="text-2xl font-black text-gray-900">{h.value}</div>
              <div className="mt-1 text-xs text-gray-500">{h.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic Pillars */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-900">Strategic Pillars</h2>
            <p className="text-gray-500">Four pillars driving sustainable growth and competitive moats</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {pillars.map((p) => (
              <div key={p.title} className="flex gap-4 rounded-2xl border border-gray-200 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
                  <p.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-2 font-bold text-gray-900">{p.title}</h3>
                  <p className="text-sm text-gray-500">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <Sparkles className="mx-auto mb-4 h-8 w-8 text-yellow-400" />
        <h2 className="mb-4 text-3xl font-bold text-gray-900">Our Vision</h2>
        <p className="mb-6 text-lg text-gray-500">
          To become the leading AI-powered commercial lighting platform — where every project, from a single retrofit to a stadium build-out, is designed, specified, and fulfilled through intelligent software and a world-class product catalog.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-gray-900 to-black py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Interested in Investing?</h2>
          <p className="mb-8 text-gray-400">
            We welcome conversations with investors who share our vision for the future of intelligent lighting. Schedule a meeting with our founding team.
          </p>
          <Link
            href="/contact?subject=Investor+Inquiry"
            className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-8 py-3 font-semibold text-black hover:bg-yellow-500"
          >
            Schedule a Meeting
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
