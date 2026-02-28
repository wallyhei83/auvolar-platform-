'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ChevronRight, Search, Package, Truck, CheckCircle2, 
  Clock, MapPin, AlertCircle, ArrowRight
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

interface OrderStatus {
  orderNumber: string
  status: 'processing' | 'shipped' | 'delivered' | 'returned'
  placedDate: string
  items: { name: string; qty: number; sku: string }[]
  shipping: {
    method: string
    carrier: string
    tracking: string
    estimatedDelivery: string
  }
  timeline: { date: string; status: string; description: string; completed: boolean }[]
}

// Mock order data
const mockOrder: OrderStatus = {
  orderNumber: 'ORD-2024-00142',
  status: 'shipped',
  placedDate: '2024-02-10',
  items: [
    { name: 'UFO High Bay 150W 5000K', qty: 20, sku: 'HB-UFO-150W-5K' },
    { name: 'Wall Pack 80W 5000K', qty: 10, sku: 'WP-80W-5K' },
    { name: 'Motion Sensor', qty: 15, sku: 'MS-PIR-HB' },
  ],
  shipping: {
    method: 'UPS Ground',
    carrier: 'UPS',
    tracking: '1Z999AA10123456784',
    estimatedDelivery: '2024-02-15',
  },
  timeline: [
    { date: '2024-02-10 09:30 AM', status: 'Order Placed', description: 'Your order has been received', completed: true },
    { date: '2024-02-10 11:45 AM', status: 'Payment Confirmed', description: 'Payment successfully processed', completed: true },
    { date: '2024-02-11 08:15 AM', status: 'Order Processing', description: 'Your order is being prepared', completed: true },
    { date: '2024-02-11 03:30 PM', status: 'Shipped', description: 'Package handed to carrier', completed: true },
    { date: '2024-02-12 10:00 AM', status: 'In Transit', description: 'Package is on its way to you', completed: true },
    { date: '2024-02-15', status: 'Estimated Delivery', description: 'Expected delivery by end of day', completed: false },
  ],
}

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [order, setOrder] = useState<OrderStatus | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSearch = () => {
    setLoading(true)
    setError('')
    
    // Simulate API call
    setTimeout(() => {
      if (orderNumber.toUpperCase().includes('142') || orderNumber.toLowerCase() === 'demo') {
        setOrder(mockOrder)
      } else {
        setError('Order not found. Please check your order number and try again.')
        setOrder(null)
      }
      setLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-gray-900">Track Order</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500">
              <Truck className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Track Your Order</h1>
              <p className="mt-1 text-gray-600">
                Enter your order number to check the status of your shipment
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Search Form */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Order Number *</label>
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="e.g., ORD-2024-00142"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Billing ZIP Code</label>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="e.g., 77001"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>
          </div>
          
          <button
            onClick={handleSearch}
            disabled={!orderNumber || loading}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-3 font-semibold text-black hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <span className="animate-pulse">Searching...</span>
            ) : (
              <>
                <Search className="h-5 w-5" />
                Track Order
              </>
            )}
          </button>
          
          <p className="mt-4 text-center text-sm text-gray-500">
            Or <Link href="/login" className="text-brand hover:underline">log in</Link> to see all your orders
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Order Details */}
        {order && (
          <div className="mt-8 space-y-6">
            {/* Status Header */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">Order {order.orderNumber}</p>
                  <h2 className="mt-1 text-xl font-bold text-gray-900">
                    {order.status === 'shipped' ? 'In Transit' : 
                     order.status === 'delivered' ? 'Delivered' :
                     order.status === 'processing' ? 'Processing' : 'Returned'}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Estimated delivery: <strong>{order.shipping.estimatedDelivery}</strong>
                  </p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                  order.status === 'delivered' ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  {order.status === 'delivered' ? (
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  ) : (
                    <Truck className="h-6 w-6 text-blue-600" />
                  )}
                </div>
              </div>
              
              {/* Tracking Link */}
              {order.shipping.tracking && (
                <div className="mt-4 flex items-center justify-between rounded-lg bg-gray-50 p-4">
                  <div>
                    <p className="text-sm text-gray-600">
                      {order.shipping.carrier} Tracking: <span className="font-mono font-medium">{order.shipping.tracking}</span>
                    </p>
                  </div>
                  <a
                    href={`https://www.ups.com/track?tracknum=${order.shipping.tracking}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm font-medium text-brand hover:underline"
                  >
                    Track on {order.shipping.carrier}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              )}
            </div>

            {/* Timeline */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900">Shipment Timeline</h3>
              
              <div className="mt-6">
                {order.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        event.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        {event.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-white" />
                        ) : (
                          <Clock className="h-5 w-5 text-white" />
                        )}
                      </div>
                      {index < order.timeline.length - 1 && (
                        <div className={`w-0.5 flex-1 ${event.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                      )}
                    </div>
                    <div className="pb-8">
                      <p className="font-medium text-gray-900">{event.status}</p>
                      <p className="text-sm text-gray-600">{event.description}</p>
                      <p className="mt-1 text-xs text-gray-500">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900">Items in This Order</h3>
              
              <div className="mt-4 divide-y divide-gray-100">
                {order.items.map((item) => (
                  <div key={item.sku} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/support"
                className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:border-brand hover:text-brand"
              >
                Need Help?
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:border-brand hover:text-brand"
              >
                Start a Return
              </Link>
            </div>
          </div>
        )}

        {/* Help Box */}
        {!order && !error && (
          <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-6">
            <h3 className="font-semibold text-blue-900">Can't find your order?</h3>
            <ul className="mt-3 space-y-2 text-sm text-blue-800">
              <li>• Check your order confirmation email for the order number</li>
              <li>• Make sure you're using the same email address you ordered with</li>
              <li>• Orders placed within the last hour may not show tracking yet</li>
            </ul>
            <p className="mt-4 text-sm text-blue-700">
              Still need help? <Link href="/support" className="font-medium underline">Contact support</Link>
            </p>
          </div>
        )}

        {/* Demo Hint */}
        <p className="mt-4 text-center text-xs text-gray-400">
          Demo: Try order number "ORD-2024-00142" or "demo"
        </p>
      </div>

      <Footer />
    </div>
  )
}
