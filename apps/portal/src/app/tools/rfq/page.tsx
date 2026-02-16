'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Zap, ArrowLeft, Plus, Trash2, CheckCircle } from 'lucide-react'

interface LineItem {
  sku: string
  description: string
  quantity: number
}

export default function RFQPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<{ message: string; caseNumber?: string } | null>(null)
  const [error, setError] = useState('')
  
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  })
  
  const [formData, setFormData] = useState({
    projectName: '',
    projectAddress: '',
    timeline: '',
    notes: '',
  })
  
  const [items, setItems] = useState<LineItem[]>([
    { sku: '', description: '', quantity: 1 },
  ])

  const addItem = () => {
    setItems([...items, { sku: '', description: '', quantity: 1 }])
    if (error) setError('')
  }

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index))
    }
  }

  const updateItem = (index: number, field: keyof LineItem, value: string | number) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
    if (error) setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validate contact info
    if (!contactInfo.name || !contactInfo.email) {
      setError('Please provide your name and email')
      setLoading(false)
      return
    }

    // Validate at least one item has SKU or description
    const validItems = items.filter(item => item.sku || item.description)
    if (validItems.length === 0) {
      setError('Please add at least one product')
      setLoading(false)
      return
    }

    const productList = validItems.map((item, i) => 
      `${i + 1}. SKU: ${item.sku || 'N/A'}, Description: ${item.description || 'N/A'}, Qty: ${item.quantity}`
    ).join('\n')

    // First try to create a case (for logged-in users)
    try {
      const caseRes = await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'RFQ',
          subject: formData.projectName || 'Quote Request',
          message: `
Contact: ${contactInfo.name}
Email: ${contactInfo.email}
Phone: ${contactInfo.phone || 'N/A'}
Company: ${contactInfo.company || 'N/A'}

Project: ${formData.projectName}
Address: ${formData.projectAddress}
Timeline: ${formData.timeline}

Products Requested:
${productList}

Additional Notes:
${formData.notes || 'None'}
          `.trim(),
          relatedSkus: validItems.map(item => item.sku).filter(Boolean),
        }),
      })

      if (caseRes.ok) {
        const caseData = await caseRes.json()
        setSuccess({ 
          message: 'Your quote request has been submitted and assigned a case number.',
          caseNumber: caseData.case.caseNumber 
        })
        setLoading(false)
        return
      }
    } catch {
      // Case creation failed, continue to email fallback
    }

    // Fallback: Send email for guest users
    try {
      const emailRes = await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'rfq',
          name: contactInfo.name,
          email: contactInfo.email,
          phone: contactInfo.phone,
          company: contactInfo.company,
          projectName: formData.projectName,
          projectAddress: formData.projectAddress,
          timeline: formData.timeline,
          products: validItems,
          notes: formData.notes,
        }),
      })

      if (!emailRes.ok) {
        const errorData = await emailRes.json()
        throw new Error(errorData.error || 'Failed to send request')
      }

      setSuccess({ 
        message: 'Your quote request has been sent. We\'ll respond within 1 business day.' 
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="mx-auto max-w-xl px-4">
          <div className="card p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="mt-6 text-2xl font-bold text-gray-900">Request Submitted!</h1>
            <p className="mt-2 text-gray-600">{success.message}</p>
            {success.caseNumber && (
              <div className="mt-6 rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Case Number</p>
                <p className="text-lg font-semibold text-gray-900">{success.caseNumber}</p>
              </div>
            )}
            <div className="mt-8 flex justify-center gap-4">
              {success.caseNumber && (
                <Link href="/portal/cases" className="btn-primary btn-md">
                  View My Cases
                </Link>
              )}
              <Link href="/tools" className="btn-outline btn-md">
                Back to Tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/tools" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand">
              <Zap className="h-5 w-5 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Request a Quote</h1>
              <p className="text-gray-600">Get custom pricing for your project</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Contact Info */}
          <div className="card p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Contact Information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="form-label">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                  className="input"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="form-label">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  className="input"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                  className="input"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label htmlFor="company" className="form-label">
                  Company
                </label>
                <input
                  id="company"
                  type="text"
                  value={contactInfo.company}
                  onChange={(e) => setContactInfo({ ...contactInfo, company: e.target.value })}
                  className="input"
                  placeholder="Company name"
                />
              </div>
            </div>
          </div>

          {/* Project Info */}
          <div className="card p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Project Information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="projectName" className="form-label">
                  Project Name
                </label>
                <input
                  id="projectName"
                  type="text"
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  className="input"
                  placeholder="e.g., Warehouse Retrofit Phase 1"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="projectAddress" className="form-label">
                  Project Address
                </label>
                <input
                  id="projectAddress"
                  type="text"
                  value={formData.projectAddress}
                  onChange={(e) => setFormData({ ...formData, projectAddress: e.target.value })}
                  className="input"
                  placeholder="123 Industrial Blvd, City, State ZIP"
                />
              </div>
              <div>
                <label htmlFor="timeline" className="form-label">
                  Timeline
                </label>
                <select
                  id="timeline"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="input"
                >
                  <option value="">Select timeline</option>
                  <option value="Immediate (within 1 week)">Immediate (within 1 week)</option>
                  <option value="2-4 weeks">2-4 weeks</option>
                  <option value="1-3 months">1-3 months</option>
                  <option value="Just planning / getting pricing">Just planning / getting pricing</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Products</h2>
              <button
                type="button"
                onClick={addItem}
                className="btn-outline btn-sm"
              >
                <Plus className="mr-1 h-4 w-4" />
                Add Item
              </button>
            </div>
            
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <div className="flex-1 grid gap-3 sm:grid-cols-4">
                    <div>
                      <label className="form-label text-xs">SKU (if known)</label>
                      <input
                        type="text"
                        value={item.sku}
                        onChange={(e) => updateItem(index, 'sku', e.target.value)}
                        className="input"
                        placeholder="HB-200W-5K"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="form-label text-xs">Description</label>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                        className="input"
                        placeholder="200W High Bay 5000K"
                      />
                    </div>
                    <div>
                      <label className="form-label text-xs">Quantity</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                        className="input"
                      />
                    </div>
                  </div>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="mt-6 p-2 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="card p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Additional Notes</h2>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="input min-h-[100px]"
              placeholder="Any additional details about your project, special requirements, or questions..."
            />
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Response time: <span className="font-medium">1 business day</span>
            </p>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary btn-lg"
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
