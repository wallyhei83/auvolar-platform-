'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const caseTypes = [
  { value: 'RFQ', label: 'Request for Quote', icon: '📝', description: 'Get pricing for products or projects' },
  { value: 'BOM_REVIEW', label: 'BOM Review', icon: '📋', description: 'Have us review your bill of materials' },
  { value: 'RMA', label: 'Return/RMA', icon: '🔄', description: 'Return or exchange products' },
  { value: 'PHOTOMETRIC', label: 'Photometric Request', icon: '💡', description: 'Request lighting calculations' },
  { value: 'REBATE', label: 'Rebate Assistance', icon: '💰', description: 'Help with utility rebate applications' },
  { value: 'GENERAL', label: 'General Inquiry', icon: '❓', description: 'Other questions or requests' },
]

const priorities = [
  { value: 'LOW', label: 'Low', color: 'text-gray-600' },
  { value: 'NORMAL', label: 'Normal', color: 'text-blue-600' },
  { value: 'HIGH', label: 'High', color: 'text-orange-600' },
  { value: 'URGENT', label: 'Urgent', color: 'text-red-600' },
]

export default function NewCasePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    type: '',
    subject: '',
    description: '',
    priority: 'NORMAL',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Failed to create case')
      }

      router.push('/portal/cases')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/portal/cases" className="text-sm text-gray-600 hover:text-[#FFD60A]">
          ← Back to Cases
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Case</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Case Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What do you need help with?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {caseTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: type.value })}
                  className={`p-4 border rounded-lg text-left transition-all ${
                    formData.type === type.value
                      ? 'border-[#FFD60A] bg-yellow-50 ring-2 ring-[#FFD60A]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-2xl">{type.icon}</span>
                  <p className="font-medium mt-2">{type.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{type.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Brief description of your request"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide as much detail as possible..."
              rows={6}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
              required
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <div className="flex gap-3">
              {priorities.map((priority) => (
                <button
                  key={priority.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, priority: priority.value })}
                  className={`px-4 py-2 border rounded-lg transition-all ${
                    formData.priority === priority.value
                      ? 'border-[#FFD60A] bg-yellow-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className={priority.color}>{priority.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading || !formData.type}
              className="flex-1 bg-[#FFD60A] text-black py-3 rounded-lg font-medium hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Case'}
            </button>
            <Link
              href="/portal/cases"
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
