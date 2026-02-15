'use client'

import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ChevronRight } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        <div className="bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">Privacy Policy</span>
            </nav>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: February 2026</p>
          
          <div className="prose prose-gray max-w-none">
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              We collect information you provide directly to us, such as when you create an account, 
              make a purchase, request a quote, or contact us for support. This may include your name, 
              email address, phone number, company name, shipping address, and payment information.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">
              We use the information we collect to process your orders, provide customer support, 
              send you technical information about products, and improve our services. We may also 
              use your information to send you marketing communications, which you can opt out of at any time.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Information Sharing</h2>
            <p className="text-gray-600 mb-4">
              We do not sell your personal information. We may share your information with service 
              providers who assist us in operating our business, such as payment processors, shipping 
              carriers, and email service providers. These parties are obligated to protect your information.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Your Rights</h2>
            <p className="text-gray-600 mb-4">
              You have the right to access, correct, or delete your personal information. You may also 
              opt out of marketing communications at any time. To exercise these rights, please contact 
              us at privacy@lumilinkai.com.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-gray-600">
              LumilinkAI<br />
              Email: privacy@lumilinkai.com<br />
              Phone: 1-888-555-0123
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
