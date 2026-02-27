'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import {
  Search, MapPin, Phone, Building2, Users, HardHat, Wrench, Truck,
  CheckCircle2, ArrowRight, Loader2
} from 'lucide-react'

interface Contractor {
  id: string
  companyName: string
  partnerType: string
  contactName: string
  phone: string
  approvedSince: string
}

const typeConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  INSTALLER: { label: 'Contractor / Electrician', icon: HardHat, color: 'bg-orange-100 text-orange-700' },
  REP: { label: 'Engineer / Designer', icon: Wrench, color: 'bg-blue-100 text-blue-700' },
  DISTRIBUTOR: { label: 'Distributor', icon: Truck, color: 'bg-purple-100 text-purple-700' },
}

export default function ContractorNetworkPage() {
  const [contractors, setContractors] = useState<Contractor[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('')
  const [total, setTotal] = useState(0)

  const fetchContractors = async (type?: string) => {
    setLoading(true)
    const params = new URLSearchParams()
    if (type) params.set('type', type)
    const res = await fetch(`/api/contractors?${params}`)
    if (res.ok) {
      const data = await res.json()
      setContractors(data.partners)
      setTotal(data.total)
    }
    setLoading(false)
  }

  useEffect(() => { fetchContractors(filter || undefined) }, [filter])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-black py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">
            Find a Certified <span className="text-yellow-400">Contractor</span>
          </h1>
          <p className="mx-auto max-w-2xl text-gray-400">
            Our vetted network of contractors, electricians, and engineers are experienced with Auvolar products and ready to help with your lighting project.
          </p>
        </div>
      </section>

      {/* Filters + Results */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        {/* Filter buttons */}
        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => setFilter('')}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${!filter ? 'bg-yellow-400 text-black' : 'bg-white text-gray-600 border hover:bg-gray-50'}`}
          >
            All ({total})
          </button>
          <button
            onClick={() => setFilter('INSTALLER')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${filter === 'INSTALLER' ? 'bg-yellow-400 text-black' : 'bg-white text-gray-600 border hover:bg-gray-50'}`}
          >
            <HardHat className="h-4 w-4" /> Contractors & Electricians
          </button>
          <button
            onClick={() => setFilter('REP')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${filter === 'REP' ? 'bg-yellow-400 text-black' : 'bg-white text-gray-600 border hover:bg-gray-50'}`}
          >
            <Wrench className="h-4 w-4" /> Engineers & Designers
          </button>
          <button
            onClick={() => setFilter('DISTRIBUTOR')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${filter === 'DISTRIBUTOR' ? 'bg-yellow-400 text-black' : 'bg-white text-gray-600 border hover:bg-gray-50'}`}
          >
            <Truck className="h-4 w-4" /> Distributors
          </button>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : contractors.length === 0 ? (
          <div className="rounded-2xl border bg-white p-12 text-center">
            <Users className="mx-auto mb-4 h-12 w-12 text-gray-300" />
            <h3 className="mb-2 text-xl font-bold text-gray-900">No contractors found yet</h3>
            <p className="mb-6 text-gray-500">Our partner network is growing. Be the first in your area!</p>
            <Link
              href="/partner/register"
              className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-black hover:bg-yellow-500"
            >
              Join as a Partner
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {contractors.map(c => {
              const config = typeConfig[c.partnerType] || typeConfig.INSTALLER
              const Icon = config.icon
              return (
                <div key={c.id} className="rounded-xl border bg-white p-6 transition-shadow hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{c.companyName}</h3>
                      <div className="mt-1 flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${config.color}`}>
                          <Icon className="h-3 w-3" /> {config.label}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-green-600">
                          <CheckCircle2 className="h-3 w-3" /> Verified
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                    {c.contactName && (
                      <span className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5" /> {c.contactName}</span>
                    )}
                    {c.phone && (
                      <a href={`tel:${c.phone}`} className="flex items-center gap-1 text-yellow-600 hover:underline">
                        <Phone className="h-3.5 w-3.5" /> {c.phone}
                      </a>
                    )}
                  </div>
                  {c.approvedSince && (
                    <p className="mt-2 text-xs text-gray-400">Partner since {new Date(c.approvedSince).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* CTA to become a partner */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Are You a Contractor or Electrician?</h2>
          <p className="mb-6 text-gray-500">
            Join our partner network to receive project referrals, contractor pricing, and dedicated support.
          </p>
          <Link
            href="/partner/register"
            className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-8 py-3 font-semibold text-black hover:bg-yellow-500"
          >
            Apply Now
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
