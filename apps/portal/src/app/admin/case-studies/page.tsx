'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Trophy, Plus, Edit, Trash2, Eye, EyeOff, Image as ImageIcon,
  Loader2, ArrowUp, ArrowDown, Database, ExternalLink
} from 'lucide-react'

interface CaseStudy {
  id: string
  slug: string
  category: string
  title: string
  subtitle: string | null
  images: string[]
  isPublished: boolean
  sortOrder: number
  clients: string[]
  createdAt: string
}

export default function AdminCaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)
  const [seeding, setSeeding] = useState(false)
  const [message, setMessage] = useState('')

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin/case-studies')
      const data = await res.json()
      setCaseStudies(data.caseStudies || [])
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const handleSeed = async () => {
    if (!confirm('This will import the initial 7 case studies. Continue?')) return
    setSeeding(true)
    try {
      const res = await fetch('/api/admin/case-studies/seed', { method: 'POST' })
      const data = await res.json()
      setMessage(`Seed complete: ${data.results?.map((r: any) => `${r.slug}: ${r.action}`).join(', ')}`)
      fetchData()
    } catch (err) {
      setMessage('Seed failed')
    } finally {
      setSeeding(false)
    }
  }

  const handleTogglePublish = async (id: string, current: boolean) => {
    try {
      await fetch(`/api/admin/case-studies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !current }),
      })
      fetchData()
    } catch (err) {
      console.error('Toggle error:', err)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    try {
      await fetch(`/api/admin/case-studies/${id}`, { method: 'DELETE' })
      fetchData()
    } catch (err) {
      console.error('Delete error:', err)
    }
  }

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const idx = caseStudies.findIndex(cs => cs.id === id)
    if (idx === -1) return
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1
    if (swapIdx < 0 || swapIdx >= caseStudies.length) return

    const a = caseStudies[idx]
    const b = caseStudies[swapIdx]

    await Promise.all([
      fetch(`/api/admin/case-studies/${a.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sortOrder: b.sortOrder }),
      }),
      fetch(`/api/admin/case-studies/${b.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sortOrder: a.sortOrder }),
      }),
    ])
    fetchData()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <h1 className="text-2xl font-bold">Case Studies</h1>
          <span className="text-sm text-gray-500">({caseStudies.length})</span>
        </div>
        <div className="flex items-center gap-3">
          {caseStudies.length === 0 && (
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {seeding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
              Seed Initial Data
            </button>
          )}
          <Link
            href="/admin/case-studies/new"
            className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500"
          >
            <Plus className="w-4 h-4" />
            New Case Study
          </Link>
        </div>
      </div>

      {message && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
          {message}
        </div>
      )}

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Order</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Case Study</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Category</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Images</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Status</th>
              <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {caseStudies.map((cs, idx) => (
              <tr key={cs.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleReorder(cs.id, 'up')}
                      disabled={idx === 0}
                      className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <span className="text-sm text-gray-500 w-6 text-center">{cs.sortOrder}</span>
                    <button
                      onClick={() => handleReorder(cs.id, 'down')}
                      disabled={idx === caseStudies.length - 1}
                      className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-gray-900">{cs.title}</p>
                    <p className="text-xs text-gray-500">{cs.clients.join(', ') || 'No clients listed'}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">{cs.category}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 text-sm">
                    <ImageIcon className="w-4 h-4 text-gray-400" />
                    <span className={cs.images.length > 0 ? 'text-green-600' : 'text-gray-400'}>
                      {cs.images.length}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleTogglePublish(cs.id, cs.isPublished)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      cs.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {cs.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {cs.isPublished ? 'Published' : 'Draft'}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/case-studies`}
                      target="_blank"
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600"
                      title="View on site"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/admin/case-studies/${cs.id}`}
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-blue-600"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(cs.id, cs.title)}
                      className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {caseStudies.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-gray-500 mb-2">No case studies yet</p>
            <p className="text-sm text-gray-400">Click "Seed Initial Data" to import the existing 7 case studies, or create a new one.</p>
          </div>
        )}
      </div>
    </div>
  )
}
