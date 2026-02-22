'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ChevronRight, Lightbulb, Upload, CheckCircle, Clock, FileText, Send } from 'lucide-react'

const applicationTypes = [
  'Warehouse / Distribution Center',
  'Manufacturing Facility',
  'Retail Store',
  'Office Space',
  'Parking Lot / Garage',
  'Sports / Recreation',
  'Healthcare Facility',
  'Educational Institution',
  'Other',
]

const mountingHeights = [
  '8-12 ft (Interior Standard)',
  '12-20 ft (High Ceiling)',
  '20-30 ft (Warehouse)',
  '30-40 ft (High Bay)',
  '40+ ft (Industrial)',
  'Pole Mount (Outdoor)',
  'Wall Mount',
]

const lightLevels = [
  '20-30 fc (General/Retail)',
  '30-50 fc (Office/Classroom)',
  '50-75 fc (Manufacturing)',
  '75-100 fc (Detailed Work)',
  '100+ fc (Inspection)',
  'Not Sure - Recommend',
]

export default function PhotometricRequestPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectName: '',
    applicationType: '',
    mountingHeight: '',
    targetLightLevel: '',
    dimensions: '',
    notes: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'photometric',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          projectName: formData.projectName,
          subject: `Photometric Request: ${formData.projectName || 'Lighting Layout'}`,
          message: `Application: ${formData.applicationType}\nMounting Height: ${formData.mountingHeight}\nTarget Light Level: ${formData.targetLightLevel}\nDimensions: ${formData.dimensions}\n\nNotes: ${formData.notes}`,
        }),
      })
    } catch (err) {
      console.error('Failed to send email:', err)
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
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="mt-6 text-2xl font-bold text-gray-900">Request Submitted!</h1>
            <p className="mt-2 text-gray-600">
              Thank you for your photometric layout request. Our lighting engineers will review your 
              project details and send you a preliminary layout within 24 business hours.
            </p>
            <div className="mt-8 rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                <strong>What&apos;s Next:</strong> You&apos;ll receive an email confirmation shortly. 
                Our team may reach out if we need additional information about your project.
              </p>
            </div>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/bc-products"
                className="rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-black transition-colors hover:bg-yellow-300"
              >
                Browse Products
              </Link>
              <Link
                href="/"
                className="rounded-lg border px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/tools" className="hover:text-gray-900">Tools</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">Photometric Request</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-black py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-yellow-400 p-3">
              <Lightbulb className="h-8 w-8 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Request Photometric Layout</h1>
              <p className="mt-1 text-gray-400">Free preliminary lighting design within 24 hours</p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border bg-white p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Info */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 w-full rounded-lg border p-3 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1 w-full rounded-lg border p-3 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1 w-full rounded-lg border p-3 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="mt-1 w-full rounded-lg border p-3 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Project Details</h2>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Project Name</label>
                      <input
                        type="text"
                        value={formData.projectName}
                        onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                        placeholder="e.g., ABC Warehouse Retrofit"
                        className="mt-1 w-full rounded-lg border p-3 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Application Type *</label>
                        <select
                          required
                          value={formData.applicationType}
                          onChange={(e) => setFormData({ ...formData, applicationType: e.target.value })}
                          className="mt-1 w-full rounded-lg border p-3 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                        >
                          <option value="">Select type...</option>
                          {applicationTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Mounting Height *</label>
                        <select
                          required
                          value={formData.mountingHeight}
                          onChange={(e) => setFormData({ ...formData, mountingHeight: e.target.value })}
                          className="mt-1 w-full rounded-lg border p-3 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                        >
                          <option value="">Select height...</option>
                          {mountingHeights.map((height) => (
                            <option key={height} value={height}>{height}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Target Light Level</label>
                        <select
                          value={formData.targetLightLevel}
                          onChange={(e) => setFormData({ ...formData, targetLightLevel: e.target.value })}
                          className="mt-1 w-full rounded-lg border p-3 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                        >
                          <option value="">Select level...</option>
                          {lightLevels.map((level) => (
                            <option key={level} value={level}>{level}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Area Dimensions *</label>
                        <input
                          type="text"
                          required
                          value={formData.dimensions}
                          onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                          placeholder="e.g., 200' x 150' or 30,000 sq ft"
                          className="mt-1 w-full rounded-lg border p-3 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Additional Notes / Special Requirements
                      </label>
                      <textarea
                        rows={4}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Any specific requirements, obstructions, existing fixtures, special codes, etc."
                        className="mt-1 w-full rounded-lg border p-3 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                      />
                    </div>
                  </div>
                </div>

                {/* File Upload Note */}
                <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Have a floor plan? Email it to <a href="mailto:engineering@auvolar.com" className="text-yellow-600 hover:underline">engineering@auvolar.com</a> with your project name.
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Accepted formats: PDF, DWG, DXF, JPG, PNG
                  </p>
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 px-6 py-4 font-semibold text-black transition-colors hover:bg-yellow-300"
                >
                  <Send className="h-5 w-5" />
                  Submit Request
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* What You Get */}
            <div className="rounded-xl border bg-white p-6">
              <h3 className="font-semibold text-gray-900">What You&apos;ll Receive</h3>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3">
                  <FileText className="mt-0.5 h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-medium text-gray-900">Lighting Layout</p>
                    <p className="text-sm text-gray-500">Fixture placement recommendations</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FileText className="mt-0.5 h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-medium text-gray-900">Light Level Calculations</p>
                    <p className="text-sm text-gray-500">Footcandle levels across the space</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FileText className="mt-0.5 h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-medium text-gray-900">Product Recommendations</p>
                    <p className="text-sm text-gray-500">Specific fixtures and quantities</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FileText className="mt-0.5 h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-medium text-gray-900">Budget Estimate</p>
                    <p className="text-sm text-gray-500">Approximate project cost</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Timeline */}
            <div className="rounded-xl border bg-white p-6">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-yellow-500" />
                <h3 className="font-semibold text-gray-900">Turnaround Time</h3>
              </div>
              <p className="mt-2 text-gray-600">
                Preliminary layouts are typically delivered within <strong>24 business hours</strong>. 
                Complex projects may take 2-3 days.
              </p>
            </div>

            {/* Free Service */}
            <div className="rounded-xl bg-yellow-50 p-6">
              <p className="font-semibold text-yellow-800">✨ This Service is Free</p>
              <p className="mt-1 text-sm text-yellow-700">
                Photometric layouts are provided at no cost as part of our commitment to helping 
                contractors specify the right products for their projects.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
