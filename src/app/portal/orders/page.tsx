'use client'

import { useState, useEffect } from 'react'
import { Loader2, Package, Truck, Clock, CheckCircle2, XCircle, Search, RefreshCw, FileDown, ExternalLink } from 'lucide-react'

interface Order {
  id: number
  orderNumber: string
  status: string
  statusId: number
  dateCreated: string
  dateShipped?: string
  subtotal: number
  total: number
  itemCount: number
  paymentMethod: string
  shippingMethod: string
  currency: string
  billingAddress?: { name: string; company: string; city: string; state: string }
}

const STATUS_FILTERS = [
  { value: 'all', label: 'All Orders' },
  { value: 'awaiting_fulfillment', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'completed', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
]

function getStatusStyle(status: string) {
  const s = status.toLowerCase()
  if (s.includes('complete') || s.includes('deliver')) return { bg: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle2 }
  if (s.includes('ship')) return { bg: 'bg-blue-50 text-blue-700 border-blue-200', icon: Truck }
  if (s.includes('cancel') || s.includes('refund') || s.includes('declined')) return { bg: 'bg-red-50 text-red-700 border-red-200', icon: XCircle }
  return { bg: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock }
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [noAccount, setNoAccount] = useState(false)

  useEffect(() => { fetchOrders() }, [filter])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/portal/orders?status=${filter}`)
      const data = await res.json()
      if (data.message?.includes('No BigCommerce')) {
        setNoAccount(true)
      }
      setOrders(data.orders || [])
    } catch { setOrders([]) }
    finally { setLoading(false) }
  }

  const filtered = orders.filter(o =>
    o.orderNumber.includes(search) ||
    o.status.toLowerCase().includes(search.toLowerCase())
  )

  if (noAccount) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <Package className="h-16 w-16 mx-auto mb-4 text-gray-300" />
        <h2 className="text-xl font-bold mb-2">No Orders Yet</h2>
        <p className="text-gray-500 mb-4">Your account is not yet linked to our ordering system.</p>
        <p className="text-gray-500">Please contact <a href="mailto:sales@auvolar.com" className="text-brand hover:underline">sales@auvolar.com</a> to link your account, or place your first order on our website.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Orders</h1>
          <p className="text-gray-500 text-sm mt-1">View and track your orders</p>
        </div>
        <button onClick={fetchOrders} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900">
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex bg-gray-100 rounded-lg p-1">
          {STATUS_FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === f.value ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search order #..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm"
          />
        </div>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-brand" />
          <span className="ml-2 text-gray-500">Loading orders...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg border">
          <Package className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p className="text-gray-500">No orders found</p>
          <a href="/products" className="text-sm text-brand hover:underline mt-2 inline-block">Browse Products →</a>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(order => {
            const statusStyle = getStatusStyle(order.status)
            const StatusIcon = statusStyle.icon
            return (
              <div key={order.id} className="bg-white rounded-lg border hover:shadow-md transition-shadow">
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${statusStyle.bg} border`}>
                        <StatusIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-gray-900">{order.orderNumber}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${statusStyle.bg}`}>
                            {order.status.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                          <span>{new Date(order.dateCreated).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                          <span>·</span>
                          <span>{order.itemCount} item{order.itemCount !== 1 ? 's' : ''}</span>
                          <span>·</span>
                          <span>{order.paymentMethod}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">${order.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                      <p className="text-xs text-gray-400">{order.shippingMethod}</p>
                    </div>
                  </div>

                  {order.billingAddress && (
                    <div className="mt-3 pt-3 border-t flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        Ship to: {order.billingAddress.name}{order.billingAddress.company ? ` · ${order.billingAddress.company}` : ''} · {order.billingAddress.city}, {order.billingAddress.state}
                      </span>
                      <div className="flex items-center gap-3">
                        {order.dateShipped && (
                          <button className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                            <Truck className="h-3 w-3" /> Track
                          </button>
                        )}
                        <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
                          <FileDown className="h-3 w-3" /> Invoice
                        </button>
                        <button className="text-xs text-brand hover:underline flex items-center gap-1">
                          <RefreshCw className="h-3 w-3" /> Reorder
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
