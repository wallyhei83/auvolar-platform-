'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ChevronRight, Upload, FileText, CheckCircle2, ArrowRight, 
  Package, Palette, Wrench, Clock, Shield, Users, Zap
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const services = [
  {
    icon: Package,
    title: 'OEM/ODM Manufacturing',
    description: 'Custom lighting fixtures designed and manufactured to your specifications. From prototyping to mass production.',
    features: ['Custom wattage & lumen options', 'Private labeling', 'Custom packaging', 'MOQ as low as 100 units'],
  },
  {
    icon: Palette,
    title: 'Custom Branding',
    description: 'Add your company logo, brand colors, and custom packaging to our standard products.',
    features: ['Logo printing/engraving', 'Custom color housing', 'Branded packaging', 'Custom documentation'],
  },
  {
    icon: Wrench,
    title: 'Project-Specific Solutions',
    description: 'Tailored lighting solutions for unique project requirements that standard products cannot meet.',
    features: ['Special mounting options', 'Custom beam angles', 'Unique voltage requirements', 'Special certifications'],
  },
]

const process = [
  { step: 1, title: 'Inquiry', description: 'Submit your requirements through our form or contact our team directly.' },
  { step: 2, title: 'Consultation', description: 'Our engineers review your needs and provide recommendations.' },
  { step: 3, title: 'Quotation', description: 'Receive detailed pricing, lead time, and specifications.' },
  { step: 4, title: 'Sampling', description: 'Approve samples before production begins.' },
  { step: 5, title: 'Production', description: 'Manufacturing with quality control at every stage.' },
  { step: 6, title: 'Delivery', description: 'On-time delivery with full documentation.' },
]

export default function TailorPurchasingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    quantity: '',
    description: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(f => f.size <= 10 * 1024 * 1024)
      setFiles(prev => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-gray-900">Tailor Purchasing</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black py-20">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand/20 px-3 py-1 text-sm text-brand">
              <Zap className="h-4 w-4" />
              Custom Solutions
            </span>
            <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
              Tailor Purchasing
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              Can't find exactly what you need? We offer custom OEM/ODM manufacturing, 
              private labeling, and project-specific lighting solutions tailored to your requirements.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#inquiry"
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-semibold text-black hover:bg-brand-dark"
              >
                Start Inquiry
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-600 px-6 py-3 font-semibold text-white hover:border-brand hover:text-brand"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="border-b border-gray-200 bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-brand">500+</div>
              <div className="mt-1 text-sm text-gray-600">Custom Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand">100</div>
              <div className="mt-1 text-sm text-gray-600">Min Order Qty</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand">2-4 Weeks</div>
              <div className="mt-1 text-sm text-gray-600">Sample Lead Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand">98%</div>
              <div className="mt-1 text-sm text-gray-600">On-Time Delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Custom Solutions</h2>
            <p className="mt-4 text-gray-600">Flexible options to meet your specific needs</p>
          </div>
          
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="rounded-2xl border border-gray-200 bg-white p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10">
                  <service.icon className="h-7 w-7 text-brand" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">{service.title}</h3>
                <p className="mt-3 text-gray-600">{service.description}</p>
                <ul className="mt-6 space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-gray-600">From inquiry to delivery, we guide you through every step</p>
          </div>
          
          <div className="mt-12">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {process.map((step, index) => (
                <div key={step.step} className="relative flex gap-4 rounded-xl bg-white p-6 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand font-bold text-black">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{step.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry" className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-gray-900">Inquiry Submitted!</h2>
              <p className="mt-2 text-gray-600">
                Thank you for your interest. Our team will review your requirements and contact you within 24 hours.
              </p>
              <p className="mt-4 text-sm text-gray-500">
                Reference: #TPC-{Date.now().toString().slice(-6)}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 rounded-lg bg-brand px-6 py-2 font-semibold text-black hover:bg-brand-dark"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">Start Your Custom Project</h2>
                <p className="mt-2 text-gray-600">Tell us about your requirements and we'll get back to you within 24 hours</p>
              </div>
              
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company *</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Project Type *</label>
                    <select
                      required
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                    >
                      <option value="">Select type</option>
                      <option value="oem">OEM Manufacturing</option>
                      <option value="odm">ODM / Custom Design</option>
                      <option value="private-label">Private Labeling</option>
                      <option value="custom-spec">Custom Specifications</option>
                      <option value="bulk-order">Bulk Order (Standard Products)</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Estimated Quantity *</label>
                    <select
                      required
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                    >
                      <option value="">Select quantity</option>
                      <option value="100-500">100 - 500 units</option>
                      <option value="500-1000">500 - 1,000 units</option>
                      <option value="1000-5000">1,000 - 5,000 units</option>
                      <option value="5000-10000">5,000 - 10,000 units</option>
                      <option value="10000+">10,000+ units</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Project Description *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your requirements: product type, specifications, special features, timeline, etc."
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Attachments (Optional)</label>
                  <label className="mt-1 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 cursor-pointer hover:border-brand hover:bg-yellow-50/30 transition-colors">
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Drag & drop files or <span className="text-brand font-medium">browse</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, images, drawings (max 10MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png,.gif,.dwg,.dxf,.doc,.docx"
                      onChange={handleFileChange}
                    />
                  </label>
                  {files.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {files.map((file, i) => (
                        <div key={i} className="flex items-center justify-between rounded bg-gray-50 px-3 py-1.5 text-sm">
                          <span className="truncate text-gray-700">{file.name} <span className="text-gray-400">({(file.size / 1024 / 1024).toFixed(2)} MB)</span></span>
                          <button type="button" onClick={() => removeFile(i)} className="ml-2 text-red-500 hover:text-red-700 text-xs font-medium">✕</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <button
                  type="submit"
                  className="w-full rounded-lg bg-brand py-3 font-semibold text-black hover:bg-brand-dark"
                >
                  Submit Inquiry
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-gray-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">Why Choose Us for Custom Projects</h2>
          </div>
          
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Clock, title: 'Fast Turnaround', description: 'Samples in 2-4 weeks, production in 4-8 weeks' },
              { icon: Shield, title: 'Quality Assured', description: 'ISO 9001 certified with strict QC process' },
              { icon: Users, title: 'Dedicated Support', description: 'Project manager assigned to your account' },
              { icon: FileText, title: 'Full Documentation', description: 'Complete specs, certs, and test reports' },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/20">
                  <item.icon className="h-7 w-7 text-brand" />
                </div>
                <h3 className="mt-4 font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
