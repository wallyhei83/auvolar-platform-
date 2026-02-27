import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import {
  Upload, Brain, FileOutput, FileCheck, ShieldCheck, Package, DollarSign, Zap,
  Camera, ClipboardList, ArrowDown, Sparkles
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'LightSpec AI — Intelligent Product Selection | Auvolar',
  description: 'Upload your project photos or videos, specify requirements, and let LightSpec AI configure the optimal LED lighting solution from Auvolar\'s product catalog.',
}

const workflow = [
  {
    step: '1',
    icon: Upload,
    title: 'Upload & Specify',
    desc: 'Upload site photos, videos, or floor plans. Specify technical requirements: area dimensions, target illuminance (foot-candles/lux), color temperature preferences, mounting heights, and any code requirements.',
    details: ['Photos & video upload', 'Floor plan import', 'Technical specifications', 'Budget parameters'],
  },
  {
    step: '2',
    icon: Brain,
    title: 'AI Analysis',
    desc: 'LightSpec AI analyzes your site conditions and cross-references our complete product database — IES photometric files, DLC/UL certifications, real-time inventory, and pricing — to find the optimal configuration.',
    details: ['IES file matching', 'Certification filtering', 'Inventory verification', 'Cost optimization'],
  },
  {
    step: '3',
    icon: FileOutput,
    title: 'Export & Order',
    desc: 'Receive a detailed product configuration report with fixture specifications, quantities, layouts, and total pricing. Review, adjust, and place your order directly — no back-and-forth with sales reps.',
    details: ['Product spec sheets', 'Quantity takeoffs', 'Layout recommendations', 'One-click ordering'],
  },
]

const features = [
  { icon: FileCheck, title: 'IES Photometric Matching', desc: 'AI selects fixtures based on actual photometric performance data, ensuring code-compliant illumination levels.' },
  { icon: ShieldCheck, title: 'Certification Filtering', desc: 'Automatically filters products by DLC, UL, ETL, and other certifications required for your project.' },
  { icon: Package, title: 'Real-Time Inventory', desc: 'Only recommends in-stock products — no surprise lead times or back-orders.' },
  { icon: DollarSign, title: 'Cost Optimization', desc: 'Balances performance, energy efficiency, and budget to find the best value for your project.' },
  { icon: Zap, title: 'Energy Analysis', desc: 'Calculates energy savings vs. existing fixtures, with payback period and utility rebate eligibility.' },
  { icon: Camera, title: 'Visual Site Analysis', desc: 'Upload photos or videos of your space — AI identifies mounting conditions, ceiling heights, and obstacles.' },
]

export default function LightSpecAIPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(circle at 60% 30%, #facc15 0%, transparent 40%), radial-gradient(circle at 20% 70%, #3b82f6 0%, transparent 40%)' }} />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-yellow-400/10 px-4 py-1.5 text-sm font-medium text-yellow-400">
            <Sparkles className="h-4 w-4" />
            AI-Powered Product Selection
          </div>
          <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Light<span className="text-yellow-400">Spec</span> AI
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Stop guessing which fixtures to spec. Upload your project details and let AI configure the optimal lighting solution — matched to your exact requirements, budget, and timeline.
          </p>
          <div className="mt-8">
            <Link
              href="/contact?subject=LightSpec+AI+Access"
              className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-8 py-3 font-semibold text-black hover:bg-yellow-500"
            >
              <Sparkles className="h-5 w-5" />
              Try LightSpec AI
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="text-gray-500">Three simple steps to your optimized lighting specification</p>
        </div>
        <div className="space-y-8">
          {workflow.map((w, i) => (
            <div key={w.step}>
              <div className="flex gap-6 rounded-2xl border border-gray-200 bg-white p-8">
                <div className="flex shrink-0 flex-col items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400 text-xl font-black text-black">
                    {w.step}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-3">
                    <w.icon className="h-5 w-5 text-yellow-600" />
                    <h3 className="text-xl font-bold text-gray-900">{w.title}</h3>
                  </div>
                  <p className="mb-4 text-gray-500">{w.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {w.details.map((d) => (
                      <span key={d} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">{d}</span>
                    ))}
                  </div>
                </div>
              </div>
              {i < workflow.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowDown className="h-6 w-6 text-gray-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-900">Powered by Intelligence</h2>
            <p className="text-gray-500">Every recommendation is backed by data, not guesswork</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-gray-200 p-6">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-bold text-gray-900">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Placeholder */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-12 text-center">
          <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 text-xl font-bold text-gray-900">Upload Your Project</h3>
          <p className="mb-6 text-gray-500">Drag & drop site photos, videos, or floor plans here</p>
          <div className="mb-4 flex flex-wrap justify-center gap-2 text-xs text-gray-400">
            <span className="rounded bg-gray-100 px-2 py-1">JPG / PNG</span>
            <span className="rounded bg-gray-100 px-2 py-1">PDF</span>
            <span className="rounded bg-gray-100 px-2 py-1">DWG</span>
            <span className="rounded bg-gray-100 px-2 py-1">MP4</span>
          </div>
          <Link
            href="/contact?subject=LightSpec+AI+Access"
            className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-black hover:bg-yellow-500"
          >
            <ClipboardList className="h-5 w-5" />
            Request Early Access
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
