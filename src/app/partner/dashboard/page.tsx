'use client'

import { useState, useEffect } from 'react'
import {
  DollarSign, Link2, TrendingUp, Users, Copy, CheckCircle,
  Clock, ArrowUpRight, Shield, Star, Loader2, ExternalLink
} from 'lucide-react'

interface DashboardData {
  partner: {
    id: string
    referralCode: string
    referralLink: string
    tier: string
    commissionRate: number | null
    totalSales: number
    totalCommission: number
    pendingPayout: number
    equityEligible: boolean
    equityShares: number | null
    status: string
    createdAt: string
  }
  stats: {
    totalVisits: number
    conversions: number
    conversionRate: string
  }
  tierProgress: {
    current: string
    next: { tier: string; minSales: number; rate: number } | null
    thresholds: { tier: string; minSales: number; rate: number }[]
  }
  attributions: {
    id: string
    bcOrderId: string
    orderTotal: number
    commissionRate: number
    commission: number
    status: string
    customerName: string | null
    createdAt: string
    paidAt: string | null
  }[]
  payouts: {
    id: string
    amount: number
    method: string | null
    status: string
    processedAt: string | null
    createdAt: string
  }[]
  monthlyStats: Record<string, { sales: number; commission: number; orders: number }>
}

const tierColors: Record<string, string> = {
  BASIC: 'bg-gray-100 text-gray-700',
  ADVANCED: 'bg-blue-100 text-blue-700',
  PARTNER: 'bg-purple-100 text-purple-700',
  STRATEGIC: 'bg-amber-100 text-amber-700',
}

const tierLabels: Record<string, string> = {
  BASIC: '初级分销',
  ADVANCED: '高级分销',
  PARTNER: '合伙人',
  STRATEGIC: '战略合伙人',
}

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  APPROVED: 'bg-green-100 text-green-700',
  PAID: 'bg-blue-100 text-blue-700',
  REJECTED: 'bg-red-100 text-red-700',
  CANCELLED: 'bg-gray-100 text-gray-500',
}

export default function PartnerDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [tab, setTab] = useState<'orders' | 'payouts'>('orders')

  useEffect(() => {
    fetch('/api/partner/dashboard')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const copyLink = () => {
    if (!data) return
    navigator.clipboard.writeText(data.partner.referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <Shield className="mx-auto h-16 w-16 text-gray-300" />
        <h2 className="mt-4 text-xl font-bold text-gray-900">Partner Dashboard</h2>
        <p className="mt-2 text-gray-500">You need to be an approved partner to access this page.</p>
        <a href="/partner/register" className="mt-4 inline-block rounded-lg bg-orange-500 px-6 py-2 text-white hover:bg-orange-600">
          Apply Now
        </a>
      </div>
    )
  }

  const { partner, stats, tierProgress, attributions, payouts, monthlyStats } = data

  if (partner.status === 'PENDING') {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <Clock className="mx-auto h-16 w-16 text-yellow-400" />
        <h2 className="mt-4 text-xl font-bold text-gray-900">Application Under Review</h2>
        <p className="mt-2 text-gray-500">We&apos;re reviewing your partner application. You&apos;ll be notified once approved.</p>
      </div>
    )
  }

  const nextTierProgress = tierProgress.next
    ? Math.min(100, (partner.totalSales / tierProgress.next.minSales) * 100)
    : 100

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partner Dashboard</h1>
          <div className="mt-1 flex items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-sm font-medium ${tierColors[partner.tier]}`}>
              <Star className="mr-1 inline h-3.5 w-3.5" />
              {tierLabels[partner.tier] || partner.tier}
            </span>
            {partner.equityEligible && (
              <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
                🏆 Equity Eligible
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Referral Link */}
      <div className="rounded-xl border bg-gradient-to-r from-orange-50 to-amber-50 p-6">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <Link2 className="h-4 w-4" /> Your Referral Link
        </div>
        <div className="mt-2 flex items-center gap-2">
          <code className="flex-1 rounded-lg bg-white px-4 py-2.5 font-mono text-sm text-gray-800 shadow-sm">
            {partner.referralLink}
          </code>
          <button
            onClick={copyLink}
            className="flex items-center gap-1.5 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-orange-600"
          >
            {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Share this link. When someone purchases through it, you earn commission automatically.
          Cookie lasts 90 days.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <div className="rounded-xl border bg-white p-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-500"><DollarSign className="h-3.5 w-3.5" /> Total Sales</div>
          <div className="mt-1 text-2xl font-bold text-gray-900">${partner.totalSales.toLocaleString()}</div>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-500"><TrendingUp className="h-3.5 w-3.5" /> Total Commission</div>
          <div className="mt-1 text-2xl font-bold text-green-600">${partner.totalCommission.toLocaleString()}</div>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-500"><Clock className="h-3.5 w-3.5" /> Pending Payout</div>
          <div className="mt-1 text-2xl font-bold text-orange-500">${partner.pendingPayout.toLocaleString()}</div>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-500"><Users className="h-3.5 w-3.5" /> Clicks</div>
          <div className="mt-1 text-2xl font-bold">{stats.totalVisits}</div>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-500"><ArrowUpRight className="h-3.5 w-3.5" /> Conversion</div>
          <div className="mt-1 text-2xl font-bold">{stats.conversionRate}%</div>
        </div>
      </div>

      {/* Tier Progress */}
      {tierProgress.next && (
        <div className="rounded-xl border bg-white p-6">
          <h3 className="text-sm font-medium text-gray-600">Tier Progress</h3>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className={`rounded px-2 py-0.5 text-xs font-medium ${tierColors[partner.tier]}`}>
              {tierLabels[partner.tier]}
            </span>
            <span className="text-gray-500">
              ${partner.totalSales.toLocaleString()} / ${tierProgress.next.minSales.toLocaleString()}
            </span>
            <span className={`rounded px-2 py-0.5 text-xs font-medium ${tierColors[tierProgress.next.tier]}`}>
              {tierLabels[tierProgress.next.tier]} ({tierProgress.next.rate}%)
            </span>
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-400 to-amber-500 transition-all"
              style={{ width: `${nextTierProgress}%` }}
            />
          </div>
          <p className="mt-1.5 text-xs text-gray-400">
            ${(tierProgress.next.minSales - partner.totalSales).toLocaleString()} more to unlock {tierLabels[tierProgress.next.tier]}
          </p>
        </div>
      )}

      {/* Tier Table */}
      <div className="rounded-xl border bg-white p-6">
        <h3 className="text-sm font-medium text-gray-600">Commission Tiers</h3>
        <div className="mt-3 grid grid-cols-4 gap-3">
          {tierProgress.thresholds.map(t => (
            <div
              key={t.tier}
              className={`rounded-lg border-2 p-4 text-center ${
                partner.tier === t.tier ? 'border-orange-400 bg-orange-50' : 'border-gray-100'
              }`}
            >
              <div className="text-2xl font-bold text-gray-900">{t.rate}%</div>
              <div className="text-xs font-medium text-gray-600">{tierLabels[t.tier]}</div>
              <div className="mt-1 text-xs text-gray-400">
                {t.minSales === 0 ? 'Start' : `$${(t.minSales / 1000).toFixed(0)}K+`}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs: Orders / Payouts */}
      <div className="rounded-xl border bg-white">
        <div className="flex border-b">
          <button
            onClick={() => setTab('orders')}
            className={`px-6 py-3 text-sm font-medium ${tab === 'orders' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'}`}
          >
            Orders ({attributions.length})
          </button>
          <button
            onClick={() => setTab('payouts')}
            className={`px-6 py-3 text-sm font-medium ${tab === 'payouts' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'}`}
          >
            Payouts ({payouts.length})
          </button>
        </div>

        {tab === 'orders' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs text-gray-500">
                <tr>
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Rate</th>
                  <th className="px-4 py-3">Commission</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {attributions.length === 0 ? (
                  <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">No orders yet. Share your referral link to start earning!</td></tr>
                ) : (
                  attributions.map(a => (
                    <tr key={a.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-xs">#{a.bcOrderId}</td>
                      <td className="px-4 py-3">{a.customerName || '—'}</td>
                      <td className="px-4 py-3 font-medium">${Number(a.orderTotal).toLocaleString()}</td>
                      <td className="px-4 py-3">{Number(a.commissionRate)}%</td>
                      <td className="px-4 py-3 font-medium text-green-600">${Number(a.commission).toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[a.status] || ''}`}>
                          {a.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{new Date(a.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'payouts' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs text-gray-500">
                <tr>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Method</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Processed</th>
                  <th className="px-4 py-3">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {payouts.length === 0 ? (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">No payouts yet</td></tr>
                ) : (
                  payouts.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">${Number(p.amount).toLocaleString()}</td>
                      <td className="px-4 py-3">{p.method || '—'}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          p.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                          p.status === 'PROCESSING' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {p.processedAt ? new Date(p.processedAt).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-4 py-3 text-gray-500">{new Date(p.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
