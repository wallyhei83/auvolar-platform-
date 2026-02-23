import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Truck, Clock, MapPin, Package, CheckCircle, AlertTriangle } from 'lucide-react'

const shippingMethods = [
  {
    name: 'Standard Ground',
    carrier: 'UPS / FedEx Ground',
    time: '5-7 Business Days',
    price: 'Free on orders $500+',
    description: 'Best for most orders. Reliable tracking included.',
    icon: Truck,
  },
  {
    name: 'Expedited',
    carrier: 'UPS / FedEx Express',
    time: '2-3 Business Days',
    price: 'Calculated at checkout',
    description: 'Faster delivery for urgent projects.',
    icon: Clock,
  },
  {
    name: 'LTL Freight',
    carrier: 'Various Carriers',
    time: '5-10 Business Days',
    price: 'Calculated by weight/distance',
    description: 'For large orders (pallets). Liftgate available.',
    icon: Package,
  },
]

const zones = [
  { zone: 'Zone 1', area: 'CA, AZ, NV', days: '1-2 days' },
  { zone: 'Zone 2', area: 'OR, WA, UT, CO, NM, TX', days: '2-3 days' },
  { zone: 'Zone 3', area: 'Most of the US', days: '3-5 days' },
  { zone: 'Zone 4', area: 'Northeast, Alaska, Hawaii', days: '5-7 days' },
]

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
            <Truck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Shipping Information</h1>
          <p className="mx-auto mt-4 max-w-xl text-purple-100">
            Fast, reliable shipping from our California warehouse. Most in-stock items ship within 24 hours.
          </p>
        </div>
      </section>

      {/* Free Shipping Banner */}
      <section className="bg-yellow-400 py-4">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="font-bold text-black text-lg">
            🚚 FREE SHIPPING on orders over $500!
          </p>
        </div>
      </section>

      {/* Shipping Methods */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Shipping Methods</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {shippingMethods.map((method) => (
              <div key={method.name} className="bg-white rounded-xl shadow-sm border p-6">
                <method.icon className="w-10 h-10 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-1">{method.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{method.carrier}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{method.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 font-medium">{method.price}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transit Times */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Estimated Transit Times</h2>
          <p className="text-center text-gray-600 mb-8">
            Orders ship from our warehouse in City of Industry, CA. Transit times are estimates for ground shipping.
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-xl overflow-hidden">
              <div className="grid grid-cols-3 bg-purple-600 text-white font-semibold text-sm">
                <div className="px-6 py-3">Zone</div>
                <div className="px-6 py-3">Coverage Area</div>
                <div className="px-6 py-3">Transit Time</div>
              </div>
              {zones.map((zone) => (
                <div key={zone.zone} className="grid grid-cols-3 border-b last:border-0">
                  <div className="px-6 py-4 font-medium text-gray-900">{zone.zone}</div>
                  <div className="px-6 py-4 text-gray-600">{zone.area}</div>
                  <div className="px-6 py-4 text-gray-900">{zone.days}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LTL Freight */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">LTL Freight Shipping</h2>
                <p className="text-gray-300 mb-6">
                  For large orders shipping on pallets, we offer competitive LTL freight rates. 
                  Perfect for project orders and bulk purchases.
                </p>
                <ul className="space-y-3">
                  {[
                    'Competitive rates from multiple carriers',
                    'Liftgate delivery available',
                    'Inside delivery upon request',
                    'Appointment scheduling available',
                    'Real-time freight tracking',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-4">LTL Delivery Options</h3>
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="font-medium text-white">Standard Dock Delivery</div>
                    <div className="text-sm text-gray-400">Driver unloads at loading dock</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="font-medium text-white">Liftgate Service (+$75)</div>
                    <div className="text-sm text-gray-400">For locations without a dock</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="font-medium text-white">Inside Delivery (+$150)</div>
                    <div className="text-sm text-gray-400">Delivered inside your facility</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Info */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Important Information</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Order Cutoff Time
              </h3>
              <p className="text-blue-700">
                Orders placed before <strong>2:00 PM CST</strong> Monday-Friday ship the same day 
                (for in-stock items). Orders after cutoff ship next business day.
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order Tracking
              </h3>
              <p className="text-green-700">
                Tracking numbers are emailed within 24 hours of shipment. 
                Track your order anytime at <Link href="/track-order" className="underline">Track Order</Link>.
              </p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-6">
              <h3 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Inspect Upon Delivery
              </h3>
              <p className="text-yellow-700">
                Please inspect all packages upon delivery. Note any damage on the delivery receipt 
                and contact us within 48 hours to report shipping damage.
              </p>
            </div>
            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                International Shipping
              </h3>
              <p className="text-purple-700">
                We ship to Canada and Mexico. Contact us for international quotes. 
                Customer is responsible for duties, taxes, and customs fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-purple-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Questions About Shipping?</h2>
          <p className="text-purple-100 mb-8">Our team is happy to help with shipping quotes and delivery options.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/track-order" className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100">
              Track Your Order
            </Link>
            <Link href="/support" className="px-8 py-4 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-800">
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
