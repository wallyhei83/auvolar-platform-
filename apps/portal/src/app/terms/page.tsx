'use client'

import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ChevronRight } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        <div className="bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">Terms of Service</span>
            </nav>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          <p className="text-gray-500 mb-8">Last updated: February 2026</p>
          
          <div className="prose prose-gray max-w-none">
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing and using the Auvolar website and services, you agree to be bound by these 
              Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Products and Pricing</h2>
            <p className="text-gray-600 mb-4">
              All prices are listed in USD and are subject to change without notice. We reserve the right 
              to correct any pricing errors. Volume pricing and contractor discounts are available for 
              qualified accounts.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Orders and Payment</h2>
            <p className="text-gray-600 mb-4">
              Orders are subject to acceptance and availability. Payment is due at the time of order unless 
              you have an approved Net 30 account. We accept major credit cards, ACH transfers, and wire transfers.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Shipping and Delivery</h2>
            <p className="text-gray-600 mb-4">
              In-stock items typically ship within 24 hours of order placement (Monday-Friday, before 2 PM CST). 
              Shipping times and costs vary by destination and shipping method selected. Risk of loss transfers 
              to the buyer upon delivery to the carrier.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Returns and Warranty</h2>
            <p className="text-gray-600 mb-4">
              Unopened products may be returned within 30 days for a full refund. Opened products may be 
              subject to a restocking fee. All products carry manufacturer warranties ranging from 5 to 10 years. 
              Warranty claims must be submitted through our RMA process.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              Auvolar shall not be liable for any indirect, incidental, special, or consequential damages 
              arising from the use of our products or services. Our liability is limited to the purchase price 
              of the products in question.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-gray-600">
              Auvolar<br />
              Email: legal@auvolar.com<br />
              Phone: (626) 342-8856
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
