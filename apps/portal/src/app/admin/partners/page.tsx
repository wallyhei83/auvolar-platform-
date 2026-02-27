'use client'

import { useState, useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'
import {
  CheckCircle2, XCircle, Clock, Users, DollarSign, Loader2,
  Building2, Mail, Phone, Globe, ExternalLink
} from 'lucide-react'

interface PartnerData {
  id: string
  userId: string
  partnerType: string
  companyName: string
  status: string
  referralCode: string
  commissionRate: number | null
  approvedAt: string | null
  createdAt: string
  user: {
    id: string
    email: string
    name: string
    companyName: string
    phone: string
  } | null
  totalCommission: number
  totalOrders: number
}

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<PartnerData[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('ALL')
  const { toast } = useToast()

  const fetchPartners = async () => {
    const res = await fetch('/api/admin/partners')
    if (res.ok) {
      setPartners(await res.json())
    }
    setLoading(false)
  }

  useEffect(() => { fetchPartners() }, [])

  const updatePartner = async (id: string, data: Record<string, unknown>) => {
    const res = await fetch(`/api/admin/partners/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      toast({ title: 'Partner updated' })
      fetchPartners()
    } else {
      toast({ title: 'Error updating partner', variant: 'destructive' })
    }
  }

  const statusColor: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    APPROVED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
    SUSPENDED: 'bg-gray-100 text-gray-800',
  }

  const typeLabel: Record<string, string> = {
    REP: 'Sales Rep / Engineer',
    INSTALLER: 'Contractor / Electrician',
    DISTRIBUTOR: 'Distributor / Supplier',
  }

  const filtered = filter === 'ALL' ? partners : partners.filter(p => p.status === filter)

  const stats = {
    total: partners.length,
    pending: partners.filter(p => p.status === 'PENDING').length,
    approved: partners.filter(p => p.status === 'APPROVED').length,
    totalCommission: partners.reduce((sum, p) => sum + p.totalCommission, 0),
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Partner Management</h1>
        <p className="text-gray-600">Review applications, manage partners, track commissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500"><Users className="h-4 w-4" /> Total Partners</div>
          <div className="mt-1 text-2xl font-bold">{stats.total}</div>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center gap-2 text-sm text-yellow-600"><Clock className="h-4 w-4" /> Pending Review</div>
          <div className="mt-1 text-2xl font-bold text-yellow-600">{stats.pending}</div>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center gap-2 text-sm text-green-600"><CheckCircle2 className="h-4 w-4" /> Approved</div>
          <div className="mt-1 text-2xl font-bold text-green-600">{stats.approved}</div>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500"><DollarSign className="h-4 w-4" /> Total Commission</div>
          <div className="mt-1 text-2xl font-bold">${stats.totalCommission.toFixed(2)}</div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {['ALL', 'PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED'].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
              filter === s ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {s === 'ALL' ? `All (${partners.length})` : `${s} (${partners.filter(p => p.status === s).length})`}
          </button>
        ))}
      </div>

      {/* Partner List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="rounded-lg border bg-white p-8 text-center text-gray-500">
            No partners found
          </div>
        ) : (
          filtered.map(p => (
            <div key={p.id} className="rounded-lg border bg-white p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-gray-900">{p.companyName}</h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[p.status] || 'bg-gray-100'}`}>
                      {p.status}
                    </span>
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                      {typeLabel[p.partnerType] || p.partnerType}
                    </span>
                  </div>
                  {p.user && (
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5" /> {p.user.name}</span>
                      <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> {p.user.email}</span>
                      {p.user.phone && <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> {p.user.phone}</span>}
                    </div>
                  )}
                  <div className="mt-2 flex gap-4 text-xs text-gray-400">
                    <span>Referral: <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono">{p.referralCode}</code></span>
                    <span>Applied: {new Date(p.createdAt).toLocaleDateString()}</span>
                    {p.approvedAt && <span>Approved: {new Date(p.approvedAt).toLocaleDateString()}</span>}
                    <span>Commission: {p.commissionRate ? `${p.commissionRate}%` : 'Not set'}</span>
                    <span>Orders: {p.totalOrders} (${p.totalCommission.toFixed(2)})</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {p.status === 'PENDING' && (
                    <>
                      <button
                        onClick={() => updatePartner(p.id, { status: 'APPROVED', commissionRate: 5 })}
                        className="flex items-center gap-1 rounded-lg bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700 hover:bg-green-200"
                      >
                        <CheckCircle2 className="h-4 w-4" /> Approve
                      </button>
                      <button
                        onClick={() => updatePartner(p.id, { status: 'REJECTED' })}
                        className="flex items-center gap-1 rounded-lg bg-red-100 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-200"
                      >
                        <XCircle className="h-4 w-4" /> Reject
                      </button>
                    </>
                  )}
                  {p.status === 'APPROVED' && (
                    <button
                      onClick={() => updatePartner(p.id, { status: 'SUSPENDED' })}
                      className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-200"
                    >
                      Suspend
                    </button>
                  )}
                  {(p.status === 'REJECTED' || p.status === 'SUSPENDED') && (
                    <button
                      onClick={() => updatePartner(p.id, { status: 'APPROVED' })}
                      className="rounded-lg bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700 hover:bg-green-200"
                    >
                      Re-approve
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
