import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { AlertTriangle, Package, Camera, Upload, CheckCircle, ArrowRight } from 'lucide-react'

const steps = [
  {
    step: 1,
    title: 'Check Eligibility',
    description: 'Verify your product is within the return window (30 days for returns, warranty period for defects).',
    icon: CheckCircle,
  },
  {
    step: 2,
    title: 'Gather Information',
    description: 'Have your order number, product SKU, and proof of purchase ready.',
    icon: Package,
  },
  {
    step: 3,
    title: 'Document the Issue',
    description: 'Take clear photos of the defect or damage for faster processing.',
    icon: Camera,
  },
  {
    step: 4,
    title: 'Submit Request',
    description: 'Fill out the RMA form below or contact our support team.',
    icon: Upload,
  },
]

export default function RMAPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero */}
      <section className="bg-gradient-to-br from-red-600 to-red-800 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Return Merchandise Authorization</h1>
          <p className="mx-auto mt-4 max-w-xl text-red-100">
            Need to return or exchange a product? We&apos;re here to help make the process easy.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">RMA Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((item) => (
              <div key={item.step} className="bg-white rounded-xl p-6 shadow-sm border relative">
                <div className="absolute -top-4 left-6 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {item.step}
                </div>
                <item.icon className="w-8 h-8 text-red-500 mt-4 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RMA Types */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Standard Returns</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>30-day return window from delivery date</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Products must be unused and in original packaging</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Refund issued within 5-7 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>15% restocking fee may apply</span>
                </li>
              </ul>
            </div>
            <div className="bg-red-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Warranty Claims</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Valid within product warranty period (3-5 years)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Covers manufacturing defects only</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Free replacement or repair</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Prepaid return shipping provided</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Start RMA */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Start Your RMA Request</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order Number *</label>
                  <input type="text" placeholder="e.g., ORD-12345" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input type="email" placeholder="your@email.com" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product SKU *</label>
                <input type="text" placeholder="e.g., HB-UFO-150W" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Return *</label>
                <select className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                  <option value="">Select a reason...</option>
                  <option value="defective">Product Defective</option>
                  <option value="wrong">Wrong Product Received</option>
                  <option value="damaged">Damaged in Shipping</option>
                  <option value="changed-mind">Changed Mind</option>
                  <option value="not-needed">No Longer Needed</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea rows={4} placeholder="Please describe the issue in detail..." className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photos (optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-500 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Drag and drop or click to upload</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB each</p>
                </div>
              </div>
              <button type="submit" className="w-full py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                Submit RMA Request
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Need Help?</h2>
          <p className="text-gray-400 mb-6">Our support team is available Mon-Fri, 8am-6pm CST</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:1-888-555-0123" className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100">
              📞 1-888-555-0123
            </a>
            <a href="mailto:support@lumilinkai.com" className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500">
              ✉️ support@lumilinkai.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
