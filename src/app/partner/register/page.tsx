'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import {
  HardHat, Wrench, Zap, Building2, Lightbulb, Truck, Package,
  ArrowRight, CheckCircle2, Loader2, Eye, EyeOff
} from 'lucide-react'

const partnerTypes = [
  { value: 'CONTRACTOR', label: 'Contractor', icon: HardHat, desc: 'General or specialty lighting contractor' },
  { value: 'ENGINEER', label: 'Engineer / Designer', icon: Wrench, desc: 'Electrical engineer or lighting designer' },
  { value: 'ELECTRICIAN', label: 'Electrician', icon: Zap, desc: 'Licensed electrician' },
  { value: 'PROPERTY_OWNER', label: 'Property Owner', icon: Building2, desc: 'Commercial property owner or facility manager' },
  { value: 'PRODUCT_MANAGER', label: 'Product Manager', icon: Lightbulb, desc: 'Product development professional' },
  { value: 'DISTRIBUTOR', label: 'Distributor', icon: Truck, desc: 'Lighting product distributor' },
  { value: 'SUPPLIER', label: 'Supplier', icon: Package, desc: 'LED component or materials supplier' },
]

export default function PartnerRegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    phone: '',
    website: '',
    serviceArea: '',
    licenseNumber: '',
    description: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showPw, setShowPw] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/partner/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          partnerType: selectedType,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.message || 'Registration failed')
        return
      }

      setSuccess(true)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="mx-auto max-w-lg px-4 py-20 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900">Application Submitted!</h1>
          <p className="mb-2 text-gray-600">Thank you for applying to the Auvolar Partner Program.</p>
          <p className="mb-8 text-gray-500">Our team will review your application within 1-2 business days. You&apos;ll receive an email once approved.</p>
          <div className="flex justify-center gap-4">
            <Link href="/" className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50">
              Back to Home
            </Link>
            <Link href="/login" className="rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-black hover:bg-yellow-500">
              Sign In
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="mx-auto max-w-3xl px-4 py-12">
        {/* Progress */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${step >= 1 ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-gray-500'}`}>1</div>
          <div className={`h-px w-16 ${step >= 2 ? 'bg-yellow-400' : 'bg-gray-200'}`} />
          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${step >= 2 ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-gray-500'}`}>2</div>
        </div>

        <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">Join the Partner Program</h1>
        <p className="mb-8 text-center text-gray-500">Select your partner type and create your account</p>

        {/* Step 1: Select Partner Type */}
        {step === 1 && (
          <div>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">What best describes your business?</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {partnerTypes.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setSelectedType(t.value)}
                  className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                    selectedType === t.value
                      ? 'border-yellow-400 bg-yellow-50 ring-1 ring-yellow-400'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    selectedType === t.value ? 'bg-yellow-400 text-black' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <t.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{t.label}</div>
                    <div className="text-xs text-gray-500">{t.desc}</div>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => selectedType && setStep(2)}
                disabled={!selectedType}
                className="flex items-center gap-2 rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-black hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Account Details */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <button type="button" onClick={() => setStep(1)} className="text-sm text-yellow-600 hover:underline">
              ← Change partner type ({partnerTypes.find(t => t.value === selectedType)?.label})
            </button>

            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Company Name *</label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Password *</label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 pr-10 text-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Confirm Password *</label>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="mb-3 font-semibold text-gray-900">Business Details (Optional)</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Website</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={e => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Service Area</label>
                  <input
                    type="text"
                    value={formData.serviceArea}
                    onChange={e => setFormData({ ...formData, serviceArea: e.target.value })}
                    placeholder="e.g. Los Angeles, CA"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">License Number</label>
                  <input
                    type="text"
                    value={formData.licenseNumber}
                    onChange={e => setFormData({ ...formData, licenseNumber: e.target.value })}
                    placeholder="Contractor / electrician license"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">Tell us about your business</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  placeholder="Services offered, years in business, typical project types..."
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <p className="text-xs text-gray-500">
                Already have an account? <Link href="/login" className="text-yellow-600 hover:underline">Sign in</Link>
              </p>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-lg bg-yellow-400 px-8 py-3 font-semibold text-black hover:bg-yellow-500 disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                Submit Application
              </button>
            </div>
          </form>
        )}
      </div>

      <Footer />
    </div>
  )
}
