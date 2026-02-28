import Link from 'next/link'
import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'Return & Refund Policy | Auvolar LED Lighting',
  description: 'Auvolar return and refund policy. 30-day returns on unused products, 5-year warranty on defects. Free return shipping on defective items. Easy RMA process.',
  keywords: ['return policy', 'refund policy', 'LED light returns', 'Auvolar returns', 'warranty claim', 'RMA'],
  alternates: {
    canonical: 'https://www.auvolar.com/support/returns',
  },
}

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Return & Refund Policy',
            description: 'Auvolar LED Lighting return, exchange, and refund policy.',
            url: 'https://www.auvolar.com/support/returns',
            publisher: {
              '@type': 'Organization',
              name: 'Auvolar',
            },
          }),
        }}
      />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="text-gray-300">›</span>
            <Link href="/support" className="text-gray-500 hover:text-gray-700">Support</Link>
            <span className="text-gray-300">›</span>
            <span className="text-gray-900 font-medium">Return & Refund Policy</span>
          </nav>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Return & Refund Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: February 24, 2026</p>

        <div className="prose prose-gray max-w-none">
          {/* Quick Summary Box */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8 not-prose">
            <h2 className="text-lg font-bold text-gray-900 mb-3">📋 Quick Summary</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> <strong>30-day return window</strong> for unused, unopened products</li>
              <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> <strong>5-year warranty</strong> on all commercial LED fixtures</li>
              <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> <strong>Free return shipping</strong> on defective or wrong items</li>
              <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> <strong>Full refund or exchange</strong> — your choice</li>
              <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> <strong>Refund within 5-7 business days</strong> after inspection</li>
            </ul>
          </div>

          {/* Section 1 */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">1. Standard Returns (30-Day Window)</h2>
          <p className="text-gray-700 mb-4">
            You may return most new, unused, and unopened products within <strong>30 days of delivery</strong> for a full refund or exchange. Products must be in their original packaging with all accessories, manuals, and mounting hardware included.
          </p>
          <div className="bg-gray-50 rounded-lg p-5 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Conditions for Standard Returns:</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Product must be unused, uninstalled, and in original packaging</li>
              <li>• Return request must be submitted within 30 days of delivery date</li>
              <li>• All original accessories, manuals, and hardware must be included</li>
              <li>• Products must not be damaged by the customer (physical damage, water damage, etc.)</li>
              <li>• A valid order number or proof of purchase is required</li>
            </ul>
          </div>
          <p className="text-gray-700 mb-4">
            <strong>Return shipping costs:</strong> For standard returns (change of mind, no longer needed, ordered wrong product), the customer is responsible for return shipping costs. We recommend using a trackable shipping method and purchasing shipping insurance for items over $100.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Restocking fee:</strong> A 15% restocking fee may apply to orders over $500 that are returned for non-defective reasons. Custom orders and special-order items are subject to a 25% restocking fee. We will notify you of any applicable fees before processing the return.
          </p>

          {/* Section 2 */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">2. Defective Product Returns (Warranty Claims)</h2>
          <p className="text-gray-700 mb-4">
            All Auvolar commercial LED fixtures are covered by our <strong>5-year limited warranty</strong>. If your product is defective or stops working within the warranty period, we will repair, replace, or refund at our discretion — at no cost to you.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-5 mb-6">
            <h3 className="font-semibold text-green-800 mb-3">Warranty Coverage Includes:</h3>
            <ul className="space-y-2 text-green-700 text-sm">
              <li>✅ LED module failure (dead LEDs, color shifting)</li>
              <li>✅ Driver/power supply failure</li>
              <li>✅ Manufacturing defects (housing, lens, connectors)</li>
              <li>✅ Premature lumen depreciation below L70 specification</li>
              <li>✅ Electrical component failure under normal use</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-5 mb-6">
            <h3 className="font-semibold text-red-800 mb-3">Warranty Does NOT Cover:</h3>
            <ul className="space-y-2 text-red-700 text-sm">
              <li>✗ Damage from improper installation or wiring</li>
              <li>✗ Damage from power surges, lightning, or incorrect voltage</li>
              <li>✗ Physical damage (drops, impacts, vandalism)</li>
              <li>✗ Use outside rated specifications (temperature, IP rating)</li>
              <li>✗ Normal wear and cosmetic changes (housing discoloration from UV)</li>
              <li>✗ Products modified or repaired by unauthorized parties</li>
            </ul>
          </div>
          <p className="text-gray-700 mb-4">
            <strong>Free return shipping:</strong> For warranty claims, Auvolar provides a prepaid return shipping label. You do not pay for return shipping on defective products.
          </p>

          {/* Section 3 */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">3. Damaged in Shipping</h2>
          <p className="text-gray-700 mb-4">
            If your order arrives damaged, please follow these steps:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>Document the damage</strong> — Take photos of the packaging and damaged product(s) before discarding any packaging materials.</li>
            <li><strong>Report within 48 hours</strong> — Contact us at <a href="mailto:sales@auvolar.com" className="text-yellow-600 hover:underline">sales@auvolar.com</a> with your order number and photos within 48 hours of delivery.</li>
            <li><strong>We'll handle the rest</strong> — We will file a shipping claim and send a replacement at no cost to you, or issue a full refund.</li>
          </ol>
          <p className="text-gray-700 mb-4">
            <strong>Important:</strong> Please retain all original packaging materials until the claim is resolved. The shipping carrier may require inspection of the packaging.
          </p>

          {/* Section 4 */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">4. Wrong Product Received</h2>
          <p className="text-gray-700 mb-4">
            If we shipped the wrong product, we sincerely apologize. Contact us and we will:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Ship the correct product immediately (often same-day)</li>
            <li>Provide a prepaid return label for the incorrect item</li>
            <li>You may keep the incorrect item in some cases (we'll let you know)</li>
          </ul>
          <p className="text-gray-700 mb-4">
            There is absolutely no cost to you when we make a shipping error.
          </p>

          {/* Section 5 */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">5. How to Start a Return</h2>
          <div className="bg-white border rounded-xl overflow-hidden mb-6">
            <div className="grid md:grid-cols-4 divide-y md:divide-y-0 md:divide-x">
              <div className="p-5 text-center">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="font-bold text-yellow-700">1</span>
                </div>
                <h4 className="font-semibold text-sm">Contact Us</h4>
                <p className="text-xs text-gray-500 mt-1">Email or submit RMA form</p>
              </div>
              <div className="p-5 text-center">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="font-bold text-yellow-700">2</span>
                </div>
                <h4 className="font-semibold text-sm">Get RMA Number</h4>
                <p className="text-xs text-gray-500 mt-1">We'll respond in 1-2 business days</p>
              </div>
              <div className="p-5 text-center">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="font-bold text-yellow-700">3</span>
                </div>
                <h4 className="font-semibold text-sm">Ship Product</h4>
                <p className="text-xs text-gray-500 mt-1">Use prepaid or your own label</p>
              </div>
              <div className="p-5 text-center">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="font-bold text-yellow-700">4</span>
                </div>
                <h4 className="font-semibold text-sm">Receive Refund</h4>
                <p className="text-xs text-gray-500 mt-1">5-7 business days after inspection</p>
              </div>
            </div>
          </div>
          <p className="text-gray-700 mb-4">
            <strong>To start your return:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Email <a href="mailto:sales@auvolar.com" className="text-yellow-600 hover:underline">sales@auvolar.com</a> with your order number, product SKU, and reason for return</li>
            <li>Or submit an <Link href="/support/rma" className="text-yellow-600 hover:underline">online RMA request form</Link></li>
            <li>Or call us at <a href="tel:+16263428856" className="text-yellow-600 hover:underline">(626) 342-8856</a> during business hours</li>
          </ul>
          <p className="text-gray-700 mb-4">
            <strong>Do not ship returns without an RMA number.</strong> Returns sent without authorization may be refused or delayed.
          </p>

          {/* Section 6 */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">6. Refund Details</h2>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border px-4 py-3 text-left text-sm font-semibold">Return Type</th>
                  <th className="border px-4 py-3 text-left text-sm font-semibold">Refund Amount</th>
                  <th className="border px-4 py-3 text-left text-sm font-semibold">Return Shipping</th>
                  <th className="border px-4 py-3 text-left text-sm font-semibold">Timeframe</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-3 text-sm">Defective (warranty)</td>
                  <td className="border px-4 py-3 text-sm font-medium text-green-700">100% refund or replacement</td>
                  <td className="border px-4 py-3 text-sm text-green-700">Prepaid by Auvolar</td>
                  <td className="border px-4 py-3 text-sm">5-7 business days</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-4 py-3 text-sm">Wrong product shipped</td>
                  <td className="border px-4 py-3 text-sm font-medium text-green-700">100% refund or correct item</td>
                  <td className="border px-4 py-3 text-sm text-green-700">Prepaid by Auvolar</td>
                  <td className="border px-4 py-3 text-sm">5-7 business days</td>
                </tr>
                <tr>
                  <td className="border px-4 py-3 text-sm">Damaged in shipping</td>
                  <td className="border px-4 py-3 text-sm font-medium text-green-700">100% refund or replacement</td>
                  <td className="border px-4 py-3 text-sm text-green-700">Prepaid by Auvolar</td>
                  <td className="border px-4 py-3 text-sm">5-7 business days</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-4 py-3 text-sm">Change of mind (unused)</td>
                  <td className="border px-4 py-3 text-sm">100% minus return shipping</td>
                  <td className="border px-4 py-3 text-sm">Customer pays</td>
                  <td className="border px-4 py-3 text-sm">5-7 business days</td>
                </tr>
                <tr>
                  <td className="border px-4 py-3 text-sm">Change of mind (&gt;$500)</td>
                  <td className="border px-4 py-3 text-sm">85% (15% restocking fee)</td>
                  <td className="border px-4 py-3 text-sm">Customer pays</td>
                  <td className="border px-4 py-3 text-sm">5-7 business days</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 mb-4">
            Refunds are issued to the original payment method. Credit card refunds typically appear within 5-10 business days depending on your bank. Store credit is available as an alternative and is issued instantly.
          </p>

          {/* Section 7 */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">7. Exchanges</h2>
          <p className="text-gray-700 mb-4">
            Need a different wattage, color temperature, or fixture type? We offer direct exchanges:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>Same-value exchange:</strong> No additional charges. Ship back the original, we ship the replacement.</li>
            <li><strong>Different-value exchange:</strong> We'll charge or refund the price difference.</li>
            <li><strong>Cross-ship option:</strong> For urgent needs, we can ship the replacement before receiving your return (credit card hold required).</li>
          </ul>

          {/* Section 8 */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">8. Non-Returnable Items</h2>
          <p className="text-gray-700 mb-4">The following items cannot be returned for a refund:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Products that have been installed, wired, or used</li>
            <li>Custom-configured or special-order products</li>
            <li>Products returned after the 30-day return window</li>
            <li>Products without original packaging</li>
            <li>Products damaged by the customer</li>
            <li>Clearance/final sale items (if marked as such at time of purchase)</li>
          </ul>
          <p className="text-gray-700 mb-4">
            <strong>Note:</strong> Installed products that are defective are covered under our warranty — they are not returnable for a standard refund, but ARE eligible for warranty replacement. See Section 2 above.
          </p>

          {/* Section 9 */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">9. Large / Bulk Order Returns</h2>
          <p className="text-gray-700 mb-4">
            For orders exceeding $2,000 or 50+ units, please contact our sales team directly to arrange returns. Large order returns may require:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Prior authorization from your account manager</li>
            <li>Freight shipping arrangement (we'll coordinate)</li>
            <li>Inspection upon receipt at our warehouse</li>
          </ul>
          <p className="text-gray-700 mb-4">
            We work with our wholesale and contractor customers to find the best resolution, including exchanges to different products, store credit, or partial returns.
          </p>

          {/* Section 10 */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">10. Return Shipping Address</h2>
          <div className="bg-gray-50 rounded-lg p-5 mb-6">
            <p className="font-semibold text-gray-900">Auvolar — Returns Department</p>
            <p className="text-gray-700">17531 Railroad St Ste F</p>
            <p className="text-gray-700">City of Industry, CA 91748</p>
            <p className="text-gray-700 mt-2">RMA #: <em>(include your RMA number on the outside of the package)</em></p>
          </div>

          {/* Contact */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Questions?</h2>
          <p className="text-gray-700 mb-4">
            Our support team is happy to help with any return or warranty questions:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
            <li>📧 Email: <a href="mailto:sales@auvolar.com" className="text-yellow-600 hover:underline">sales@auvolar.com</a></li>
            <li>📞 Phone: <a href="tel:+16263428856" className="text-yellow-600 hover:underline">(626) 342-8856</a></li>
            <li>💬 Online: <Link href="/support/rma" className="text-yellow-600 hover:underline">Submit an RMA Request</Link></li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  )
}
