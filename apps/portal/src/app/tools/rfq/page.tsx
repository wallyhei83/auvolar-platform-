'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Zap, ArrowLeft, Plus, Trash2, CheckCircle, Loader2 } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

interface LineItem {
  sku: string
  description: string
  quantity: number
  notes: string
}

export default function RFQPage() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<{ caseNumber?: string; email?: boolean } | null>(null)
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
    { sku: '', description: '', quantity: 1, notes: '' },
  ])

  // Parse URL params for items from cart checkout fallback
  useEffect(() => {
    const itemsParam = searchParams.get('items')
    if (itemsParam) {
      try {
        const parsedItems = JSON.parse(decodeURIComponent(itemsParam))
        if (Array.isArray(parsedItems) && parsedItems.length > 0) {
          setItems(parsedItems.map((item: { sku?: string; name?: string; quantity?: number }) => ({
            sku: item.sku || '',
            description: item.name || '',
            quantity: item.quantity || 1,
            notes: '',
          })))
        }
      } catch {
        // Invalid JSON, ignore
      }
    }
  }, [searchParams])

  const addItem = () => {
    setItems([...items, { sku: '', description: '', quantity: 1, notes: '' }])
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

    try {
      // First try to create a case (for logged-in users)
      const caseRes = await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'RFQ',
          subject: formData.projectName || 'Quote Request',
          description: `
Contact: ${contactInfo.name} (${contactInfo.email})
Company: ${contactInfo.company || 'Not provided'}
Phone: ${contactInfo.phone || 'Not provided'}

Project: ${formData.projectName || 'Not specified'}
Address: ${formData.projectAddress || 'Not provided'}
Timeline: ${formData.timeline || 'Not specified'}

Products Requested:
${validItems.map((item, i) => `${i + 1}. SKU: ${item.sku || 'N/A'}, Description: ${item.description || 'N/A'}, Qty: ${item.quantity}${item.notes ? `, Notes: ${item.notes}` : ''}`).join('\n')}

Additional Notes:
${formData.notes || 'None'}
          `.trim(),
          relatedSkus: validItems.map(item => item.sku).filter(Boolean),
        }),
      })

      if (caseRes.ok) {
        const caseData = await caseRes.json()
        setSuccess({ caseNumber: caseData.case.caseNumber })
        
        // Also send email notification
        await fetch('/api/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'rfq',
            data: {
              ...contactInfo,
              ...formData,
              items: validItems,
            },
          }),
        })
        return
      }

      // If unauthorized (not logged in), just send email
      if (caseRes.status === 401) {
        const emailRes = await fetch('/api/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'rfq',
            data: {
              ...contactInfo,
              ...formData,
              items: validItems,
            },
          }),
        })

        if (!emailRes.ok) {
          throw new Error('Failed to send request')
        }

        setSuccess({ email: true })
        return
      }

      throw new Error('Failed to submit request')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="py-12">
          <div className="mx-auto max-w-xl px-4">
            <div className="rounded-xl border bg-white p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="mt-6 text-2xl font-bold text-gray-900">Request Submitted!</h1>
              <p className="mt-2 text-gray-600">
                Your quote request has been received. We&apos;ll get back to you within 1 business day.
              </p>
              {success.caseNumber && (
                <div className="mt-6 rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Case Number</p>
                  <p className="text-lg font-semibold text-gray-900">{success.caseNumber}</p>
                </div>
              )}
              {success.email && (
                <div className="mt-6 rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">
                    A confirmation email has been sent to <strong>{contactInfo.email}</strong>
                  </p>
                </div>
              )}
              <div className="mt-8 flex justify-center gap-4">
                <Link 
                  href="/bc-products" 
                  className="rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-black hover:bg-yellow-300"
                >
                  Continue Shopping
                </Link>
                <Link 
                  href="/tools" 
                  className="rounded-lg border px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Back to Tools
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="py-12">
        <div className="mx-auto max-w-3xl px-4">
          {/* Header */}
          <div className="mb-8">
            <Link href="/tools" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-400">
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
            <div className="rounded-xl border bg-white p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name *</label>
                  <input
                    type="text"
                    required
                    value={contactInfo.name}
                    onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                    className="mt-1 w-full rounded-lg border p-3 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email *</label>
                  <input
                    type="email"
                    required
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    className="mt-1 w-full rounded-lg border p-3 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    className="mt-1 w-full rounded-lg border p-3 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  <input
                    type="text"
                    value={contactInfo.company}
                    onChange={(e) => setContactInfo({ ...contactInfo, company: e.target.value })}
                    className="mt-1 w-full rounded-lg border p-3 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  />
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="rounded-xl border bg-white p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Project Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Project Name</label>
                  <input
                    type="text"
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    className="mt-1 w-full rounded-lg border p-3 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                    placeholder="e.g., Warehouse Retrofit Phase 1"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Project Address</label>
                  <input
                    type="text"
                    value={formData.projectAddress}
                    onChange={(e) => setFormData({ ...formData, projectAddress: e.target.value })}
                    className="mt-1 w-full rounded-lg border p-3 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                    placeholder="123 Industrial Blvd, City, State ZIP"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Timeline</label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="mt-1 w-full rounded-lg border p-3 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  >
                    <option value="">Select timeline</option>
                    <option value="immediate">Immediate (within 1 week)</option>
                    <option value="2-4-weeks">2-4 weeks</option>
                    <option value="1-3-months">1-3 months</option>
                    <option value="planning">Just planning / getting pricing</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="rounded-xl border bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Products</h2>
                <button
                  type="button"
                  onClick={addItem}
                  className="inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4" />
                  Add Item
                </button>
              </div>
              
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="flex gap-3 items-start rounded-lg bg-gray-50 p-4">
                    <div className="flex-1 grid gap-3 sm:grid-cols-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600">SKU (if known)</label>
                        <input
                          type="text"
                          value={item.sku}
                          onChange={(e) => updateItem(index, 'sku', e.target.value)}
                          className="mt-1 w-full rounded-lg border p-2 text-sm focus:border-yellow-400 focus:outline-none"
                          placeholder="HB-200W-5K"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-gray-600">Description</label>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateItem(index, 'description', e.target.value)}
                          className="mt-1 w-full rounded-lg border p-2 text-sm focus:border-yellow-400 focus:outline-none"
                          placeholder="200W High Bay 5000K"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600">Quantity</label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                          className="mt-1 w-full rounded-lg border p-2 text-sm focus:border-yellow-400 focus:outline-none"
                        />
                      </div>
                    </div>
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="mt-5 p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="rounded-xl border bg-white p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Additional Notes</h2>
              <textarea
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full rounded-lg border p-3 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                placeholder="Any special requirements, certifications needed, installation details, etc."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-yellow-400 px-6 py-4 font-semibold text-black hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5" />
                  Submit Quote Request
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-500">
              We typically respond within 1 business day. For urgent requests, call{' '}
              <a href="tel:1-888-555-0123" className="text-yellow-600 hover:underline">
                1-888-555-0123
              </a>
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}
