'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Package, Truck, CheckCircle2, Clock, AlertCircle, Loader2, MapPin, CreditCard, FileDown } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

interface OrderData {
  id: number
  status: string
  dateCreated: string
  dateShipped?: string
  total: number
  subtotal: number
  shippingCost: number
  paymentMethod: string
  billingAddress: { name: string; company: string; street: string; city: string; state: string; zip: string; country: string } | null
  items: { name: string; sku: string; quantity: number; price: number; total: number }[]
  shipments: { id: number; trackingNumber: string; trackingLink: string; carrier: string; dateCreated: string; items: { name: string; quantity: number }[] }[]
}

function getStatusInfo(status: string) {
  const s = status.toLowerCase()
  if (s.includes('complete') || s.includes('deliver')) return { icon: CheckCircle2, color: 'text-green-600 bg-green-50', label: 'Completed', step: 4 }
  if (s.includes('ship')) return { icon: Truck, color: 'text-blue-600 bg-blue-50', label: 'Shipped', step: 3 }
  if (s.includes('await') && s.includes('fulfil')) return { icon: Package, color: 'text-yellow-600 bg-yellow-50', label: 'Processing', step: 2 }
  if (s.includes('cancel') || s.includes('refund')) return { icon: AlertCircle, color: 'text-red-600 bg-red-50', label: 'Cancelled', step: 0 }
  return { icon: Clock, color: 'text-yellow-600 bg-yellow-50', label: 'Pending', step: 1 }
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('')
  const [email, setEmail] = useState('')
  const [order, setOrder] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderId || !email) return
    setLoading(true)
    setError('')
    setOrder(null)
    try {
      const res = await fetch(`/api/track-order?orderId=${encodeURIComponent(orderId)}&email=${encodeURIComponent(email)}`)
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Order not found')
      } else {
        setOrder(data.order)
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const statusInfo = order ? getStatusInfo(order.status) : null
  const steps = ['Order Placed', 'Confirmed', 'Processing', 'Shipped', 'Delivered']

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Track Your Order</h1>
          <p className="text-gray-500 mt-2">Enter your order number and email to check the status</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleTrack} className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order Number</label>
              <input
                type="text"
                value={orderId}
                onChange={e => setOrderId(e.target.value)}
                placeholder="e.g. 1001"
                className="w-full border rounded-lg px-4 py-2.5 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email used for the order"
                className="w-full border rounded-lg px-4 py-2.5 text-sm"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand text-black font-semibold py-3 rounded-lg hover:bg-brand/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            {loading ? 'Searching...' : 'Track Order'}
          </button>
        </form>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {order && statusInfo && (
          <div className="space-y-6">
            {/* Status Header */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${statusInfo.color}`}>
                    <statusInfo.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Order #{order.id}</h2>
                    <p className="text-sm text-gray-500">Placed {new Date(order.dateCreated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-semibold ${statusInfo.color}`}>
                  {statusInfo.label}
                </div>
              </div>

              {/* Progress Steps */}
              {statusInfo.step > 0 && (
                <div className="flex items-center justify-between relative">
                  <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200" />
                  <div className="absolute top-4 left-0 h-0.5 bg-green-500 transition-all" style={{ width: `${(statusInfo.step / 4) * 100}%` }} />
                  {steps.map((step, i) => (
                    <div key={step} className="relative flex flex-col items-center z-10">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        i <= statusInfo.step ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                        {i < statusInfo.step ? '✓' : i + 1}
                      </div>
                      <span className="text-[10px] text-gray-500 mt-2 text-center w-20">{step}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Shipment Tracking */}
            {order.shipments.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Truck className="h-5 w-5 text-blue-500" /> Shipment Tracking</h3>
                {order.shipments.map(s => (
                  <div key={s.id} className="border rounded-xl p-4 mb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{s.carrier}</p>
                        <p className="text-sm text-gray-500">Tracking: <span className="font-mono">{s.trackingNumber}</span></p>
                      </div>
                      {s.trackingLink && (
                        <a href={s.trackingLink} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                          Track Package →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Package className="h-5 w-5 text-gray-500" /> Order Items</h3>
              <div className="divide-y">
                {order.items.map((item, i) => (
                  <div key={i} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-400">SKU: {item.sku} · Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">${item.total.toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t mt-3 pt-3 space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>${order.subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span>{order.shippingCost > 0 ? `$${order.shippingCost.toFixed(2)}` : 'Free'}</span></div>
                <div className="flex justify-between font-bold text-base pt-1"><span>Total</span><span>${order.total.toFixed(2)}</span></div>
              </div>
            </div>

            {/* Shipping Address */}
            {order.billingAddress && (
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2"><MapPin className="h-5 w-5 text-gray-500" /> Shipping Address</h3>
                <p className="text-sm text-gray-700">{order.billingAddress.name}</p>
                {order.billingAddress.company && <p className="text-sm text-gray-500">{order.billingAddress.company}</p>}
                <p className="text-sm text-gray-500">{order.billingAddress.street}</p>
                <p className="text-sm text-gray-500">{order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zip}</p>
              </div>
            )}
          </div>
        )}

        {/* Help Section */}
        {!order && !loading && (
          <div className="bg-white rounded-2xl shadow-sm border p-8 text-center">
            <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-sm text-gray-500 mb-4">If you can&apos;t find your order or have questions about shipping, please contact us.</p>
            <div className="flex justify-center gap-4">
              <Link href="/contact" className="text-sm text-brand hover:underline">Contact Support</Link>
              <Link href="/support/returns" className="text-sm text-brand hover:underline">Returns Policy</Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
