'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { AlertTriangle, Package, Camera, Upload, CheckCircle, ArrowRight } from 'lucide-react'

const steps = [
  {
    step: 1,
    title: 'Check Eligibility',
    description: 'Verify your product is within the return window (30 days for returns, warranty period for defects).',
    icon: CheckCircle,
  },
  {
    step: 2,
    title: 'Gather Information',
    description: 'Have your order number, product SKU, and purchase date ready.',
    icon: Package,
  },
  {
    step: 3,
    title: 'Document Issue',
    description: 'Take clear photos of the product and any defects or damage.',
    icon: Camera,
  },
  {
    step: 4,
    title: 'Submit Request',
    description: 'Fill out the RMA form below or contact our support team.',
    icon: Upload,
  },
]

export default function RMAPage() {
  const [formData, setFormData] = useState({
    orderNumber: '',
    email: '',
    sku: '',
    reason: '',
    description: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          name: formData.orderNumber,
          email: formData.email,
          subject: `RMA Request: Order ${formData.orderNumber} - ${formData.reason}`,
          message: `Order Number: ${formData.orderNumber}\nProduct SKU: ${formData.sku}\nReason: ${formData.reason}\n\nDescription:\n${formData.description}`,
        }),
      })
    } catch (err) {
      console.error('Failed to send RMA email:', err)
    }
    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="rounded-xl border bg-white p-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">RMA Request Submitted</h2>
            <p className="mt-4 text-gray-600">We&apos;ll review your request and respond within 1-2 business days.</p>
            <Link href="/" className="mt-8 inline-block text-brand hover:underline">← Back to Home</Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-red-600 to-red-800 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AlertTriangle className="w-12 h-12 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white">Return & RMA Request</h1>
          <p className="mt-4 text-lg text-red-100 max-w-2xl mx-auto">
            Need to return or exchange a product? We&apos;re here to help. Follow the steps below to submit your RMA request.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <s.icon className="w-6 h-6 text-red-600" />
                </div>
                <div className="text-sm font-bold text-red-600 mb-1">Step {s.step}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RMA Form */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Start Your RMA Request</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order Number *</label>
                  <input type="text" required placeholder="e.g., ORD-12345" value={formData.orderNumber} onChange={e => setFormData({...formData, orderNumber: e.target.value})} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input type="email" required placeholder="your@email.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product SKU *</label>
                <input type="text" required placeholder="e.g., HB-UFO-150W" value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Return *</label>
                <select required value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                  <option value="">Select a reason...</option>
                  <option value="Product Defective">Product Defective</option>
                  <option value="Wrong Product Received">Wrong Product Received</option>
                  <option value="Damaged in Shipping">Damaged in Shipping</option>
                  <option value="Changed Mind">Changed Mind</option>
                  <option value="No Longer Needed">No Longer Needed</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea rows={4} placeholder="Please describe the issue in detail..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                {isSubmitting ? 'Submitting...' : 'Submit RMA Request'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
