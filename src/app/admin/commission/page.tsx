'use client'

import { useState, useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Plus, Trash2, Save, Loader2, Settings, Percent } from 'lucide-react'

interface CommissionRule {
  id: string
  tier: string | null
  bcProductId: string | null
  bcCategoryId: string | null
  partnerId: string | null
  rate: number
  description: string | null
  isActive: boolean
}

const tierOptions = [
  { value: '', label: 'All Tiers (Global)' },
  { value: 'BASIC', label: 'Basic (初级分销)' },
  { value: 'ADVANCED', label: 'Advanced (高级分销)' },
  { value: 'PARTNER', label: 'Partner (合伙人)' },
  { value: 'STRATEGIC', label: 'Strategic (战略合伙人)' },
]

export default function CommissionSettingsPage() {
  const [rules, setRules] = useState<CommissionRule[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  // New rule form
  const [newRule, setNewRule] = useState({
    tier: '',
    bcProductId: '',
    bcCategoryId: '',
    partnerId: '',
    rate: 5,
    description: '',
  })

  const fetchRules = async () => {
    const res = await fetch('/api/admin/commission')
    if (res.ok) setRules(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchRules() }, [])

  const addRule = async () => {
    setSaving(true)
    const res = await fetch('/api/admin/commission', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tier: newRule.tier || null,
        bcProductId: newRule.bcProductId || null,
        bcCategoryId: newRule.bcCategoryId || null,
        partnerId: newRule.partnerId || null,
        rate: newRule.rate,
        description: newRule.description || null,
      }),
    })
    if (res.ok) {
      toast({ title: 'Rule created' })
      setNewRule({ tier: '', bcProductId: '', bcCategoryId: '', partnerId: '', rate: 5, description: '' })
      fetchRules()
    } else {
      toast({ title: 'Error creating rule', variant: 'destructive' })
    }
    setSaving(false)
  }

  const toggleRule = async (rule: CommissionRule) => {
    await fetch('/api/admin/commission', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: rule.id, isActive: !rule.isActive }),
    })
    fetchRules()
  }

  const deleteRule = async (id: string) => {
    if (!confirm('Delete this rule?')) return
    await fetch(`/api/admin/commission?id=${id}`, { method: 'DELETE' })
    toast({ title: 'Rule deleted' })
    fetchRules()
  }

  const getRuleScope = (r: CommissionRule) => {
    if (r.partnerId) return '🎯 Partner-specific'
    if (r.bcProductId) return '📦 Product-specific'
    if (r.bcCategoryId) return '📁 Category-specific'
    if (r.tier) return `⭐ ${r.tier} tier`
    return '🌐 Global default'
  }

  if (loading) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-gray-400" /></div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Commission Settings</h1>
        <p className="text-gray-600">Configure commission rates by tier, product, category, or individual partner</p>
      </div>

      {/* Default Tiers Overview */}
      <div className="rounded-lg border bg-white p-6">
        <h2 className="flex items-center gap-2 font-semibold text-gray-900"><Settings className="h-4 w-4" /> Default Tier Rates</h2>
        <p className="mt-1 text-sm text-gray-500">These apply when no specific rule overrides them. Create rules below to customize.</p>
        <div className="mt-4 grid grid-cols-4 gap-3">
          {[
            { tier: 'BASIC', rate: 5, sales: '$0+' },
            { tier: 'ADVANCED', rate: 8, sales: '$10K+' },
            { tier: 'PARTNER', rate: 12, sales: '$50K+' },
            { tier: 'STRATEGIC', rate: 15, sales: '$200K+' },
          ].map(t => (
            <div key={t.tier} className="rounded-lg border-2 border-gray-100 p-4 text-center">
              <div className="text-2xl font-bold">{t.rate}%</div>
              <div className="text-sm font-medium text-gray-600">{t.tier}</div>
              <div className="text-xs text-gray-400">{t.sales}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Rule */}
      <div className="rounded-lg border bg-white p-6">
        <h2 className="flex items-center gap-2 font-semibold text-gray-900"><Plus className="h-4 w-4" /> Add Commission Rule</h2>
        <p className="mt-1 text-sm text-gray-500">
          Priority: Partner-specific &gt; Product &gt; Category &gt; Tier &gt; Global default
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
          <div>
            <label className="block text-xs font-medium text-gray-500">Tier</label>
            <select
              value={newRule.tier}
              onChange={e => setNewRule(r => ({ ...r, tier: e.target.value }))}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            >
              {tierOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Rate (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.5"
              value={newRule.rate}
              onChange={e => setNewRule(r => ({ ...r, rate: parseFloat(e.target.value) || 0 }))}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Description</label>
            <input
              type="text"
              value={newRule.description}
              onChange={e => setNewRule(r => ({ ...r, description: e.target.value }))}
              placeholder="e.g. Stadium light bonus"
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Product ID (optional)</label>
            <input
              type="text"
              value={newRule.bcProductId}
              onChange={e => setNewRule(r => ({ ...r, bcProductId: e.target.value }))}
              placeholder="BC Product ID"
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Category ID (optional)</label>
            <input
              type="text"
              value={newRule.bcCategoryId}
              onChange={e => setNewRule(r => ({ ...r, bcCategoryId: e.target.value }))}
              placeholder="BC Category ID"
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Partner ID (optional)</label>
            <input
              type="text"
              value={newRule.partnerId}
              onChange={e => setNewRule(r => ({ ...r, partnerId: e.target.value }))}
              placeholder="Specific partner"
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>
        </div>
        <button
          onClick={addRule}
          disabled={saving}
          className="mt-4 flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          Add Rule
        </button>
      </div>

      {/* Existing Rules */}
      <div className="rounded-lg border bg-white">
        <div className="border-b px-6 py-4">
          <h2 className="font-semibold text-gray-900">Active Rules ({rules.filter(r => r.isActive).length})</h2>
        </div>
        <div className="divide-y">
          {rules.length === 0 ? (
            <div className="p-8 text-center text-gray-400">No custom rules. Default tier rates apply.</div>
          ) : (
            rules.map(r => (
              <div key={r.id} className={`flex items-center justify-between px-6 py-4 ${!r.isActive ? 'opacity-50' : ''}`}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{getRuleScope(r)}</span>
                    <span className="flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-bold text-green-700">
                      <Percent className="h-3 w-3" />{Number(r.rate)}
                    </span>
                  </div>
                  {r.description && <p className="mt-0.5 text-xs text-gray-500">{r.description}</p>}
                  <div className="mt-1 flex gap-3 text-xs text-gray-400">
                    {r.bcProductId && <span>Product: {r.bcProductId}</span>}
                    {r.bcCategoryId && <span>Category: {r.bcCategoryId}</span>}
                    {r.partnerId && <span>Partner: {r.partnerId}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleRule(r)}
                    className={`rounded px-3 py-1 text-xs font-medium ${
                      r.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {r.isActive ? 'Active' : 'Disabled'}
                  </button>
                  <button
                    onClick={() => deleteRule(r.id)}
                    className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
