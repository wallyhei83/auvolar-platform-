'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { 
  ChevronRight, Upload, FileSpreadsheet, FileText, X, CheckCircle2,
  AlertCircle, Download, ArrowRight, Clock, Building2, MapPin
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

type UploadStep = 'upload' | 'details' | 'confirm'

interface ProjectDetails {
  projectName: string
  company: string
  contactName: string
  email: string
  phone: string
  projectAddress: string
  city: string
  state: string
  zip: string
  projectType: string
  timeline: string
  taxExempt: boolean
  notes: string
}

export default function BOMUploadPage() {
  const [step, setStep] = useState<UploadStep>('upload')
  const [file, setFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [details, setDetails] = useState<ProjectDetails>({
    projectName: '',
    company: '',
    contactName: '',
    email: '',
    phone: '',
    projectAddress: '',
    city: '',
    state: '',
    zip: '',
    projectType: '',
    timeline: '',
    taxExempt: false,
    notes: '',
  })

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'bom-upload',
          data: {
            name: details.contactName,
            email: details.email,
            phone: details.phone,
            company: details.company,
            projectName: details.projectName,
            projectAddress: `${details.projectAddress}, ${details.city}, ${details.state} ${details.zip}`,
            projectType: details.projectType,
            timeline: details.timeline,
            taxExempt: details.taxExempt,
            notes: details.notes,
            fileName: file?.name,
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send request')
      }

      setStep('confirm')
    } catch {
      setError('Failed to submit request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/tools" className="hover:text-gray-700">Tools</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-gray-900">Upload BOM</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500">
              <Upload className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Upload Bill of Materials</h1>
              <p className="mt-1 text-gray-600">
                Upload your BOM and get a custom quote within 24 hours. We'll match SKUs and provide project pricing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {[
              { key: 'upload', label: 'Upload File' },
              { key: 'details', label: 'Project Details' },
              { key: 'confirm', label: 'Confirmation' },
            ].map((s, i) => (
              <div key={s.key} className="flex items-center">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                  step === s.key ? 'bg-brand text-black' :
                  ['upload'].includes(step) && i > 0 ? 'bg-gray-200 text-gray-500' :
                  'bg-green-500 text-white'
                }`}>
                  {step === 'confirm' || (step === 'details' && i === 0) ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    i + 1
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${step === s.key ? 'text-gray-900' : 'text-gray-500'}`}>
                  {s.label}
                </span>
                {i < 2 && (
                  <div className="mx-4 h-px w-16 bg-gray-300 sm:w-24" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Step 1: Upload */}
        {step === 'upload' && (
          <div className="space-y-6">
            {/* Upload Area */}
            <div
              className={`relative rounded-xl border-2 border-dashed p-12 text-center transition-colors ${
                dragActive ? 'border-brand bg-brand/5' : 'border-gray-300 bg-white'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {file ? (
                <div className="flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-green-100">
                    {file.name.endsWith('.xlsx') || file.name.endsWith('.xls') ? (
                      <FileSpreadsheet className="h-8 w-8 text-green-600" />
                    ) : (
                      <FileText className="h-8 w-8 text-green-600" />
                    )}
                  </div>
                  <p className="mt-4 font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                  <button
                    onClick={() => setFile(null)}
                    className="mt-4 flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                    Remove file
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-4 text-lg font-medium text-gray-900">
                    Drag and drop your BOM file here
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    or click to browse from your computer
                  </p>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".xlsx,.xls,.csv,.pdf"
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </>
              )}
            </div>

            {/* Supported Formats */}
            <div className="rounded-lg bg-gray-100 p-4">
              <p className="text-sm font-medium text-gray-700">Supported formats:</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {['Excel (.xlsx, .xls)', 'CSV (.csv)', 'PDF (.pdf)'].map((format) => (
                  <span key={format} className="rounded bg-white px-2 py-1 text-xs text-gray-600">
                    {format}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs text-gray-500">
                Your BOM should include: SKU/Part Number, Description, and Quantity. 
                We'll match your items to our catalog and provide alternatives where needed.
              </p>
            </div>

            {/* Download Template */}
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4">
              <div>
                <p className="font-medium text-gray-900">Need a template?</p>
                <p className="text-sm text-gray-500">Download our BOM template to get started</p>
              </div>
              <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-brand hover:text-brand">
                <Download className="h-4 w-4" />
                Download Template
              </button>
            </div>

            {/* Continue Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setStep('details')}
                disabled={!file}
                className="flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-semibold text-black hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Project Details */}
        {step === 'details' && (
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-900">Project Information</h2>
              <p className="mt-1 text-sm text-gray-500">Tell us about your project so we can provide accurate pricing.</p>
              
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Project Name *</label>
                  <input
                    type="text"
                    value={details.projectName}
                    onChange={(e) => setDetails({ ...details, projectName: e.target.value })}
                    placeholder="e.g., ABC Warehouse Retrofit"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company *</label>
                  <input
                    type="text"
                    value={details.company}
                    onChange={(e) => setDetails({ ...details, company: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Name *</label>
                  <input
                    type="text"
                    value={details.contactName}
                    onChange={(e) => setDetails({ ...details, contactName: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email *</label>
                  <input
                    type="email"
                    value={details.email}
                    onChange={(e) => setDetails({ ...details, email: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    value={details.phone}
                    onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-900">Project Location</h2>
              
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Street Address</label>
                  <input
                    type="text"
                    value={details.projectAddress}
                    onChange={(e) => setDetails({ ...details, projectAddress: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    value={details.city}
                    onChange={(e) => setDetails({ ...details, city: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <select
                      value={details.state}
                      onChange={(e) => setDetails({ ...details, state: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                    >
                      <option value="">Select</option>
                      <option value="TX">Texas</option>
                      <option value="CA">California</option>
                      <option value="FL">Florida</option>
                      <option value="NY">New York</option>
                      {/* Add more states */}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ZIP</label>
                    <input
                      type="text"
                      value={details.zip}
                      onChange={(e) => setDetails({ ...details, zip: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-900">Project Requirements</h2>
              
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Project Type</label>
                  <select
                    value={details.projectType}
                    onChange={(e) => setDetails({ ...details, projectType: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  >
                    <option value="">Select</option>
                    <option value="retrofit">Retrofit / Replacement</option>
                    <option value="new-construction">New Construction</option>
                    <option value="expansion">Expansion</option>
                    <option value="maintenance">Maintenance / Repair</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Timeline</label>
                  <select
                    value={details.timeline}
                    onChange={(e) => setDetails({ ...details, timeline: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  >
                    <option value="">Select</option>
                    <option value="asap">ASAP (Within 1 week)</option>
                    <option value="2-4-weeks">2-4 weeks</option>
                    <option value="1-2-months">1-2 months</option>
                    <option value="3-months">3+ months</option>
                    <option value="planning">Planning / Budgetary</option>
                  </select>
                </div>
                
                <div className="sm:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={details.taxExempt}
                      onChange={(e) => setDetails({ ...details, taxExempt: e.target.checked })}
                      className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
                    />
                    <span className="text-sm text-gray-700">This project is tax exempt (certificate required)</span>
                  </label>
                </div>
                
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
                  <textarea
                    value={details.notes}
                    onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                    rows={4}
                    placeholder="Special requirements, DLC needed, installation timing, etc."
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={() => setStep('upload')}
                className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:border-gray-400"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-semibold text-black hover:bg-brand-dark"
              >
                Submit RFQ
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 'confirm' && (
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-gray-900">RFQ Submitted Successfully!</h2>
            <p className="mt-2 text-gray-600">
              Your request has been received. Our team will review your BOM and send you a quote within 24 hours.
            </p>
            
            <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 text-left">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-brand" />
                <div>
                  <p className="font-medium text-gray-900">RFQ Reference: #RFQ-2024-00142</p>
                  <p className="text-sm text-gray-500">Expected response within 24 business hours</p>
                </div>
              </div>
              
              <div className="mt-4 flex items-center gap-3">
                <Building2 className="h-5 w-5 text-brand" />
                <div>
                  <p className="font-medium text-gray-900">{details.projectName || 'Your Project'}</p>
                  <p className="text-sm text-gray-500">{file?.name}</p>
                </div>
              </div>
              
              {details.city && (
                <div className="mt-4 flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-brand" />
                  <div>
                    <p className="font-medium text-gray-900">{details.city}, {details.state} {details.zip}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/portal/quotes"
                className="rounded-lg bg-brand px-6 py-3 font-semibold text-black hover:bg-brand-dark"
              >
                View My Quotes
              </Link>
              <Link
                href="/products"
                className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:border-brand hover:text-brand"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
