'use client'

import { useState, useEffect } from 'react'
import { Loader2, Package, Truck, Clock, CheckCircle2, XCircle, Search, RefreshCw, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface BCOrder {
  id: number
  status: string
  total: number
  customer: string
  company: string
  date: string
}

const STATUS_COLORS: Record<string, string> = {
  'Pending': 'bg-yellow-100 text-yellow-700',
  'Shipped': 'bg-blue-100 text-blue-700',
  'Completed': 'bg-green-100 text-green-700',
  'Cancelled': 'bg-red-100 text-red-700',
  'Awaiting Fulfillment': 'bg-orange-100 text-orange-700',
  'Awaiting Shipment': 'bg-purple-100 text-purple-700',
  'Partially Shipped': 'bg-indigo-100 text-indigo-700',
  'Refunded': 'bg-red-100 text-red-700',
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<BCOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [totalOrders, setTotalOrders] = useState(0)

  useEffect(() => { fetchOrders() }, [])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/bc-stats')
      const data = await res.json()
      setOrders(data.orders?.recent || [])
      setTotalOrders(data.orders?.total || 0)
    } catch {}
    finally { setLoading(false) }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-gray-500 text-sm mt-1">BigCommerce orders · {totalOrders} total orders</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={fetchOrders}>
            <RefreshCw className="h-4 w-4 mr-1" /> Refresh
          </Button>
          <a
            href={`https://store-hhcdvxqxzq.mybigcommerce.com/manage/orders`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm">
              <ExternalLink className="h-4 w-4 mr-1" /> BC Orders Dashboard
            </Button>
          </a>
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2 text-gray-500">Loading from BigCommerce...</span>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <Package className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No orders yet</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Order</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Total</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <a
                      href={`https://store-hhcdvxqxzq.mybigcommerce.com/manage/orders/${order.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      #{order.id}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-sm">{order.customer}</p>
                    {order.company && <p className="text-xs text-gray-400">{order.company}</p>}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-600'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold">${order.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  <td className="px-6 py-4 text-right text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <p className="text-xs text-gray-400 text-center">
        For full order management, use the <a href="https://store-hhcdvxqxzq.mybigcommerce.com/manage/orders" target="_blank" className="text-blue-500 hover:underline">BigCommerce dashboard</a>
      </p>
    </div>
  )
}
