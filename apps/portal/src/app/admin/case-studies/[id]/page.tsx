'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, Save, Loader2, Plus, X, Upload, GripVertical,
  Eye, Image as ImageIcon, Trash2
} from 'lucide-react'

interface Stat {
  label: string
  value: string
}

interface FormData {
  slug: string
  category: string
  title: string
  subtitle: string
  description: string
  highlights: string[]
  product: string
  productSlug: string
  clients: string[]
  location: string
  images: string[]
  youtubeId: string
  stats: Stat[]
  sortOrder: number
  isPublished: boolean
}

const CATEGORIES = [
  'Parking Lot Lighting',
  'Auto Dealership Lighting',
  'Retail & Commercial',
  'Sports & Stadium Lighting',
  'Warehouse & Distribution',
  'Industrial',
  'Municipal',
  'Other',
]

const emptyForm: FormData = {
  slug: '',
  category: CATEGORIES[0],
  title: '',
  subtitle: '',
  description: '',
  highlights: [''],
  product: '',
  productSlug: '',
  clients: [''],
  location: '',
  images: [],
  youtubeId: '',
  stats: [{ label: '', value: '' }],
  sortOrder: 0,
  isPublished: true,
}

export default function CaseStudyEditPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const isNew = id === 'new'

  const [form, setForm] = useState<FormData>(emptyForm)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/case-studies/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.caseStudy) {
            const cs = data.caseStudy
            setForm({
              slug: cs.slug || '',
              category: cs.category || CATEGORIES[0],
              title: cs.title || '',
              subtitle: cs.subtitle || '',
              description: cs.description || '',
              highlights: cs.highlights?.length > 0 ? cs.highlights : [''],
              product: cs.product || '',
              productSlug: cs.productSlug || '',
              clients: cs.clients?.length > 0 ? cs.clients : [''],
              location: cs.location || '',
              images: cs.images || [],
              youtubeId: cs.youtubeId || '',
              stats: cs.stats?.length > 0 ? cs.stats : [{ label: '', value: '' }],
              sortOrder: cs.sortOrder || 0,
              isPublished: cs.isPublished ?? true,
            })
          }
        })
        .finally(() => setLoading(false))
    }
  }, [id, isNew])

  const generateSlug = (title: string) => {
    return title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setForm(f => ({
      ...f,
      title,
      ...(isNew && { slug: generateSlug(title) }),
    }))
  }

  const handleSave = async () => {
    setError('')
    setSuccess('')
    setSaving(true)

    try {
      // Clean up empty entries
      const cleanHighlights = form.highlights.filter(h => h.trim())
      const cleanClients = form.clients.filter(c => c.trim())
      const cleanStats = form.stats.filter(s => s.label.trim() && s.value.trim())

      const payload = {
        ...form,
        highlights: cleanHighlights,
        clients: cleanClients,
        stats: cleanStats,
        subtitle: form.subtitle || null,
        product: form.product || null,
        productSlug: form.productSlug || null,
        location: form.location || null,
        youtubeId: form.youtubeId || null,
      }

      const url = isNew ? '/api/admin/case-studies' : `/api/admin/case-studies/${id}`
      const method = isNew ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to save')
        return
      }

      setSuccess('Saved successfully!')
      if (isNew && data.caseStudy?.id) {
        router.replace(`/admin/case-studies/${data.caseStudy.id}`)
      }
    } catch (err) {
      setError('Save failed')
    } finally {
      setSaving(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return

    setUploading(true)
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('slug', form.slug || 'unsorted')

        const res = await fetch('/api/admin/case-studies/upload', {
          method: 'POST',
          body: formData,
        })
        const data = await res.json()
        if (res.ok && data.url) {
          setForm(f => ({ ...f, images: [...f.images, data.url] }))
        }
      }
    } catch (err) {
      setError('Image upload failed')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const removeImage = (idx: number) => {
    setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== idx) }))
  }

  const moveImage = (idx: number, direction: 'up' | 'down') => {
    const newImages = [...form.images]
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1
    if (swapIdx < 0 || swapIdx >= newImages.length) return
    ;[newImages[idx], newImages[swapIdx]] = [newImages[swapIdx], newImages[idx]]
    setForm(f => ({ ...f, images: newImages }))
  }

  // Array field helpers
  const addArrayItem = (field: 'highlights' | 'clients') => {
    setForm(f => ({ ...f, [field]: [...f[field], ''] }))
  }
  const removeArrayItem = (field: 'highlights' | 'clients', idx: number) => {
    setForm(f => ({ ...f, [field]: f[field].filter((_, i) => i !== idx) }))
  }
  const updateArrayItem = (field: 'highlights' | 'clients', idx: number, value: string) => {
    setForm(f => ({ ...f, [field]: f[field].map((v, i) => i === idx ? value : v) }))
  }

  const addStat = () => {
    setForm(f => ({ ...f, stats: [...f.stats, { label: '', value: '' }] }))
  }
  const removeStat = (idx: number) => {
    setForm(f => ({ ...f, stats: f.stats.filter((_, i) => i !== idx) }))
  }
  const updateStat = (idx: number, field: 'label' | 'value', value: string) => {
    setForm(f => ({ ...f, stats: f.stats.map((s, i) => i === idx ? { ...s, [field]: value } : s) }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link href="/admin/case-studies" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold">{isNew ? 'New Case Study' : 'Edit Case Study'}</h1>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={e => setForm(f => ({ ...f, isPublished: e.target.checked }))}
              className="rounded border-gray-300"
            />
            <Eye className="w-4 h-4" />
            <span className="text-sm">Published</span>
          </label>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save
          </button>
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">{error}</div>}
      {success && <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">{success}</div>}

      <div className="space-y-6">
        {/* Basic Info */}
        <section className="bg-white rounded-xl border p-6">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={e => handleTitleChange(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="CarMax — Nationwide Parking Lot Retrofit"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
              <input
                type="text"
                value={form.slug}
                onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="carmax-nationwide"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <input
                type="text"
                value={form.subtitle}
                onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="All U.S. CarMax locations powered by our OT Series"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                rows={4}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Detailed project description..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={form.location}
                onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Nationwide, USA"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
              <input
                type="number"
                value={form.sortOrder}
                onChange={e => setForm(f => ({ ...f, sortOrder: parseInt(e.target.value) || 0 }))}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>
        </section>

        {/* Product Link */}
        <section className="bg-white rounded-xl border p-6">
          <h2 className="text-lg font-semibold mb-4">Product Reference</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                value={form.product}
                onChange={e => setForm(f => ({ ...f, product: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="OT Series LED Parking Lot Light"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Slug (for linking)</label>
              <input
                type="text"
                value={form.productSlug}
                onChange={e => setForm(f => ({ ...f, productSlug: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="aera-lighting-shoebox-ot-series-led-parking-lot-light-75w-420w"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Video ID</label>
              <input
                type="text"
                value={form.youtubeId}
                onChange={e => setForm(f => ({ ...f, youtubeId: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="dQw4w9WgXcQ"
              />
            </div>
          </div>
        </section>

        {/* Clients */}
        <section className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Clients</h2>
            <button onClick={() => addArrayItem('clients')} className="flex items-center gap-1 text-sm text-yellow-600 hover:text-yellow-700">
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
          <div className="space-y-2">
            {form.clients.map((client, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={client}
                  onChange={e => updateArrayItem('clients', idx, e.target.value)}
                  className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Client name"
                />
                {form.clients.length > 1 && (
                  <button onClick={() => removeArrayItem('clients', idx)} className="p-2 text-red-400 hover:text-red-600">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Highlights */}
        <section className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Highlights</h2>
            <button onClick={() => addArrayItem('highlights')} className="flex items-center gap-1 text-sm text-yellow-600 hover:text-yellow-700">
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
          <div className="space-y-2">
            {form.highlights.map((h, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={h}
                  onChange={e => updateArrayItem('highlights', idx, e.target.value)}
                  className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Project highlight..."
                />
                {form.highlights.length > 1 && (
                  <button onClick={() => removeArrayItem('highlights', idx)} className="p-2 text-red-400 hover:text-red-600">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Stats</h2>
            <button onClick={addStat} className="flex items-center gap-1 text-sm text-yellow-600 hover:text-yellow-700">
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
          <div className="space-y-2">
            {form.stats.map((stat, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={stat.label}
                  onChange={e => updateStat(idx, 'label', e.target.value)}
                  className="w-1/3 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Label (e.g., Locations)"
                />
                <input
                  type="text"
                  value={stat.value}
                  onChange={e => updateStat(idx, 'value', e.target.value)}
                  className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Value (e.g., 240+)"
                />
                {form.stats.length > 1 && (
                  <button onClick={() => removeStat(idx)} className="p-2 text-red-400 hover:text-red-600">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Images */}
        <section className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Images ({form.images.length})</h2>
            <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer text-sm">
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              Upload Images
              <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>

          {form.images.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed rounded-xl">
              <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p className="text-sm text-gray-500">No images yet. Upload project photos.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {form.images.map((img, idx) => (
                <div key={idx} className="relative group border rounded-lg overflow-hidden">
                  <img src={img} alt={`Image ${idx + 1}`} className="w-full aspect-[4/3] object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    {idx > 0 && (
                      <button onClick={() => moveImage(idx, 'up')} className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100">
                        <GripVertical className="w-4 h-4" />
                      </button>
                    )}
                    <button onClick={() => removeImage(idx)} className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-1 left-1 px-2 py-0.5 bg-black/70 text-white text-xs rounded">
                    #{idx + 1}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Manual URL input */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-500 mb-1">Or add image URL manually:</label>
            <div className="flex gap-2">
              <input
                type="text"
                id="manual-image-url"
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="/images/case-studies/project/photo.jpg or https://..."
              />
              <button
                onClick={() => {
                  const input = document.getElementById('manual-image-url') as HTMLInputElement
                  if (input?.value) {
                    setForm(f => ({ ...f, images: [...f.images, input.value] }))
                    input.value = ''
                  }
                }}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
              >
                Add
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
