import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import {
  ClipboardList, Cpu, ShieldCheck, Factory, Lightbulb, Users, Award, ArrowRight, Sparkles
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Product Design Lab | Custom LED Fixture Design | Auvolar',
  description: 'Design your own LED fixture with AI-powered 3D rendering. From concept to manufacturing — Auvolar brings your lighting vision to life.',
}

const steps = [
  {
    step: '01',
    icon: ClipboardList,
    title: 'Define Requirements',
    desc: 'Specify your market needs, application requirements, performance targets, and design preferences. Our AI understands industry standards and regulatory requirements.',
  },
  {
    step: '02',
    icon: Cpu,
    title: 'AI-Powered 3D Design',
    desc: 'Our industrial design AI generates photorealistic 3D renderings of your custom fixture. Iterate on thermal management, optical design, and aesthetics in real-time.',
  },
  {
    step: '03',
    icon: ShieldCheck,
    title: 'Professional Review',
    desc: 'Auvolar\'s engineering team evaluates feasibility, thermal performance, optical efficiency, and manufacturing cost. We provide a detailed assessment report.',
  },
  {
    step: '04',
    icon: Factory,
    title: 'Tooling & Manufacturing',
    desc: 'Upon approval, we handle mold creation, prototyping, certification (UL/DLC), and mass production. Your product, manufactured at scale.',
  },
]

const benefits = [
  { icon: Award, title: 'Patent Ownership', desc: 'You retain design patents and intellectual property rights for your custom fixtures.' },
  { icon: Lightbulb, title: 'Revenue Sharing', desc: 'If your product enters our catalog, earn ongoing royalties from every unit sold.' },
  { icon: Users, title: 'Co-Development', desc: 'Work alongside our R&D team to refine optics, thermal design, and electronics.' },
]

export default function ProductDesignPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, #facc15 0%, transparent 50%)' }} />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-yellow-400/10 px-4 py-1.5 text-sm font-medium text-yellow-400">
            <Sparkles className="h-4 w-4" />
            AI-Powered Industrial Design
          </div>
          <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Product Design <span className="text-yellow-400">Lab</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Turn your lighting vision into reality. Whether you&apos;re a product manager, engineer, or entrepreneur — design your own LED fixture with AI-generated 3D renderings, and we&apos;ll manufacture it.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">From Concept to Production</h2>
          <p className="text-gray-500">A seamless 4-step process powered by AI and expert engineering</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.step} className="relative rounded-2xl border border-gray-200 bg-white p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-3xl font-black text-yellow-400">{s.step}</span>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden h-5 w-5 text-gray-300 lg:absolute lg:-right-5 lg:top-1/2 lg:block" />
                )}
              </div>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">{s.title}</h3>
              <p className="text-sm text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Co-Development Partnership */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-900">Co-Development Partnership</h2>
            <p className="mx-auto max-w-2xl text-gray-500">
              We believe the best products come from collaboration. Join forces with Auvolar&apos;s engineering team to create innovative lighting solutions — and share in the success.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl border border-gray-200 p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
                  <b.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 font-bold text-gray-900">{b.title}</h3>
                <p className="text-sm text-gray-500">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-black p-12">
          <h2 className="mb-4 text-3xl font-bold text-white">Ready to Design Your Product?</h2>
          <p className="mb-8 text-gray-400">Submit your requirements and our AI + engineering team will get started on your custom fixture.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?subject=Product+Design+Lab"
              className="rounded-lg bg-yellow-400 px-8 py-3 font-semibold text-black hover:bg-yellow-500"
            >
              Submit Your Idea
            </Link>
            <Link
              href="/contact?subject=Co-Development+Partnership"
              className="rounded-lg border border-gray-600 px-8 py-3 font-semibold text-white hover:bg-gray-800"
            >
              Explore Partnership
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
