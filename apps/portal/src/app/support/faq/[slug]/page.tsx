import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ArrowLeft, HelpCircle } from 'lucide-react'
import { notFound } from 'next/navigation'

// FAQ content database
const faqContent: Record<string, { title: string; category: string; content: string }> = {
  'track-order': {
    title: 'How do I track my order?',
    category: 'Orders & Shipping',
    content: `
      <p>Tracking your order is easy! Here's how:</p>
      <ol>
        <li><strong>Check your email:</strong> A tracking number is sent to your email within 24 hours of shipment.</li>
        <li><strong>Use our Track Order page:</strong> Visit <a href="/track-order">Track Order</a> and enter your order number and email.</li>
        <li><strong>Log into your account:</strong> If you have an account, go to your order history to see real-time tracking.</li>
      </ol>
      <p>Tracking updates typically appear within 24-48 hours after the label is created.</p>
    `,
  },
  'shipping-options': {
    title: 'What are the shipping options?',
    category: 'Orders & Shipping',
    content: `
      <p>We offer several shipping methods to meet your needs:</p>
      <ul>
        <li><strong>Standard Ground (5-7 days):</strong> FREE on orders over $500. UPS or FedEx Ground.</li>
        <li><strong>Expedited (2-3 days):</strong> UPS or FedEx Express. Rates calculated at checkout.</li>
        <li><strong>LTL Freight:</strong> For large/pallet orders. Includes liftgate and inside delivery options.</li>
      </ul>
      <p>Orders placed before 2:00 PM CST (Mon-Fri) ship the same day.</p>
    `,
  },
  'shipping-time': {
    title: 'How long does shipping take?',
    category: 'Orders & Shipping',
    content: `
      <p>Shipping times depend on your location and chosen method:</p>
      <ul>
        <li><strong>CA, AZ, NV:</strong> 1-2 business days</li>
        <li><strong>CA, AZ, NM, CO, KS, MO:</strong> 2-3 business days</li>
        <li><strong>Most of the US:</strong> 3-5 business days</li>
        <li><strong>Northeast, AK, HI:</strong> 5-7 business days</li>
      </ul>
      <p>These are estimates for ground shipping from our City of Industry, CA warehouse. Expedited options are available for faster delivery.</p>
    `,
  },
  'international': {
    title: 'Do you ship internationally?',
    category: 'Orders & Shipping',
    content: `
      <p>Yes! We ship to Canada and Mexico regularly.</p>
      <p>For international orders:</p>
      <ul>
        <li>Contact us for a shipping quote</li>
        <li>Customer is responsible for duties, taxes, and customs fees</li>
        <li>We provide all necessary export documentation</li>
        <li>Transit times vary by destination (typically 7-14 business days)</li>
      </ul>
      <p>For other countries, please <a href="/support">contact our team</a> for options.</p>
    `,
  },
  'ltl-freight': {
    title: 'What is the LTL freight process?',
    category: 'Orders & Shipping',
    content: `
      <p>LTL (Less Than Truckload) freight is used for large orders shipping on pallets.</p>
      <h3>How it works:</h3>
      <ol>
        <li>Your order is palletized and picked up by a freight carrier</li>
        <li>You'll receive tracking information via email</li>
        <li>The carrier will call to schedule delivery</li>
        <li>Standard delivery is to a loading dock</li>
      </ol>
      <h3>Additional services:</h3>
      <ul>
        <li><strong>Liftgate ($75):</strong> For locations without a loading dock</li>
        <li><strong>Inside Delivery ($150):</strong> Freight delivered inside your building</li>
        <li><strong>Appointment ($50):</strong> Schedule a specific delivery window</li>
      </ul>
    `,
  },
  'returns': {
    title: 'What is your return policy?',
    category: 'Returns & Warranty',
    content: `
      <p>We want you to be completely satisfied with your purchase.</p>
      <h3>Standard Returns:</h3>
      <ul>
        <li>30-day return window from delivery date</li>
        <li>Products must be unused and in original packaging</li>
        <li>15% restocking fee may apply</li>
        <li>Customer pays return shipping (unless our error)</li>
      </ul>
      <h3>Non-Returnable Items:</h3>
      <ul>
        <li>Custom or special-order products</li>
        <li>Products that have been installed</li>
        <li>Items without original packaging</li>
      </ul>
      <p>To start a return, visit our <a href="/support/rma">RMA page</a>.</p>
    `,
  },
  'rma-process': {
    title: 'How do I start an RMA?',
    category: 'Returns & Warranty',
    content: `
      <p>Starting an RMA is simple:</p>
      <ol>
        <li>Go to our <a href="/support/rma">RMA page</a></li>
        <li>Fill out the form with your order number and reason</li>
        <li>Upload photos if applicable (for defects/damage)</li>
        <li>Submit the request</li>
        <li>Receive RMA number within 2 business days</li>
        <li>Ship the product with the RMA number visible</li>
      </ol>
      <p>For warranty claims, we provide prepaid return shipping labels.</p>
    `,
  },
  'warranty-coverage': {
    title: 'What does the warranty cover?',
    category: 'Returns & Warranty',
    content: `
      <h3>Warranty Periods:</h3>
      <ul>
        <li><strong>Commercial Indoor:</strong> 5 years</li>
        <li><strong>Commercial Outdoor:</strong> 5 years</li>
        <li><strong>Industrial:</strong> 3 years</li>
        <li><strong>Solar:</strong> 2 years</li>
      </ul>
      <h3>Covered:</h3>
      <ul>
        <li>LED chip or driver failure</li>
        <li>Manufacturing defects</li>
        <li>Lumen depreciation &gt; 30%</li>
        <li>Color shift &gt; 7 SDCM</li>
      </ul>
      <h3>Not Covered:</h3>
      <ul>
        <li>Improper installation</li>
        <li>Power surge damage</li>
        <li>Physical damage or abuse</li>
        <li>Unauthorized modifications</li>
      </ul>
      <p>See our full <a href="/support/warranty">warranty page</a> for details.</p>
    `,
  },
  'warranty-claim': {
    title: 'How do I make a warranty claim?',
    category: 'Returns & Warranty',
    content: `
      <p>To file a warranty claim:</p>
      <ol>
        <li><strong>Gather documentation:</strong> Proof of purchase, product SKU, photos of defect</li>
        <li><strong>Submit RMA request:</strong> Use our <a href="/support/rma">RMA form</a></li>
        <li><strong>Receive RMA number:</strong> We'll review and respond within 2 business days</li>
        <li><strong>Ship the product:</strong> Prepaid label provided for approved claims</li>
        <li><strong>Get replacement:</strong> Ships within 5-7 days of inspection</li>
      </ol>
      <p>Questions? Contact <a href="mailto:support@auvolar.com">support@auvolar.com</a></p>
    `,
  },
  'damaged-shipment': {
    title: 'What if my shipment is damaged?',
    category: 'Returns & Warranty',
    content: `
      <h3>Immediate Steps:</h3>
      <ol>
        <li><strong>Document the damage:</strong> Take photos of packaging and products</li>
        <li><strong>Note on delivery receipt:</strong> Write "damaged" before signing</li>
        <li><strong>Contact us within 48 hours:</strong> Email photos to support@auvolar.com</li>
      </ol>
      <h3>What happens next:</h3>
      <ul>
        <li>We'll file a claim with the carrier</li>
        <li>Replacement ships immediately (no waiting for claim resolution)</li>
        <li>We'll provide return instructions for damaged items</li>
      </ul>
      <p>Important: Do not refuse the delivery - accept it and document the damage.</p>
    `,
  },
  'find-replacement': {
    title: 'How do I find the right replacement?',
    category: 'Products & Technical',
    content: `
      <p>Finding the right LED replacement is easy with our tools:</p>
      <h3>Option 1: Replacement Finder Tool</h3>
      <p>Use our <a href="/tools/replacement">Replacement Finder</a> - enter your existing fixture details and we'll recommend the best LED replacement.</p>
      <h3>Option 2: Contact Us</h3>
      <p>Send us:</p>
      <ul>
        <li>Photos of your current fixture</li>
        <li>Nameplate info (wattage, voltage)</li>
        <li>Mounting height and application</li>
      </ul>
      <p>We'll recommend the best options for your project.</p>
    `,
  },
  'dlc-certification': {
    title: 'What is DLC certification?',
    category: 'Products & Technical',
    content: `
      <p><strong>DLC (DesignLights Consortium)</strong> is an independent organization that certifies LED products for quality and efficiency.</p>
      <h3>Why DLC matters:</h3>
      <ul>
        <li><strong>Utility rebates:</strong> DLC-listed products qualify for utility rebates</li>
        <li><strong>Quality assurance:</strong> Products meet strict performance standards</li>
        <li><strong>Energy efficiency:</strong> Verified efficacy (lumens per watt)</li>
        <li><strong>Long lifespan:</strong> Tested for reliability and longevity</li>
      </ul>
      <h3>DLC Premium vs Standard:</h3>
      <p>DLC Premium products have higher efficacy requirements and may qualify for larger rebates.</p>
      <p>Check our <a href="/tools/rfq">Rebate Finder</a> to see available rebates in your area.</p>
    `,
  },
  'ies-files': {
    title: 'How do I download IES files?',
    category: 'Products & Technical',
    content: `
      <p><strong>IES (Illuminating Engineering Society)</strong> files contain photometric data for lighting design software.</p>
      <h3>How to get IES files:</h3>
      <ol>
        <li>Go to the product page</li>
        <li>Click "IES File" in the Downloads section</li>
        <li>If not available, click "Request IES File"</li>
      </ol>
      <h3>What IES files are used for:</h3>
      <ul>
        <li>AGi32, DIALux, Visual lighting design software</li>
        <li>Photometric calculations and layouts</li>
        <li>Code compliance verification</li>
      </ul>
      <p>Need IES files for a project? <a href="/tools/rfq">Submit an RFQ</a> and we'll provide them.</p>
    `,
  },
  'dimming': {
    title: 'What does 0-10V dimming mean?',
    category: 'Products & Technical',
    content: `
      <p><strong>0-10V dimming</strong> is an industry-standard method for controlling LED brightness.</p>
      <h3>How it works:</h3>
      <ul>
        <li>10V signal = 100% brightness</li>
        <li>5V signal = 50% brightness</li>
        <li>0V signal = minimum brightness (typically 10%)</li>
      </ul>
      <h3>Wiring:</h3>
      <p>Two additional low-voltage wires (purple/gray) connect to a compatible dimmer or building automation system.</p>
      <h3>Compatible dimmers:</h3>
      <ul>
        <li>Lutron, Leviton, Eaton 0-10V dimmers</li>
        <li>Building automation systems (BMS)</li>
        <li>Lighting control panels</li>
      </ul>
      <p>Note: Most of our fixtures also support simple on/off switching without dimming.</p>
    `,
  },
  'wiring': {
    title: 'How do I wire my fixtures?',
    category: 'Products & Technical',
    content: `
      <h3>Standard Wiring (120-277V):</h3>
      <ul>
        <li><strong>Black:</strong> Line (Hot)</li>
        <li><strong>White:</strong> Neutral</li>
        <li><strong>Green/Bare:</strong> Ground</li>
      </ul>
      <h3>With 0-10V Dimming:</h3>
      <ul>
        <li><strong>Purple:</strong> Dim + (positive)</li>
        <li><strong>Gray:</strong> Dim - (negative)</li>
      </ul>
      <h3>Important:</h3>
      <ul>
        <li>Always turn off power before wiring</li>
        <li>Verify voltage matches fixture rating</li>
        <li>Use appropriate wire nuts and connectors</li>
        <li>Follow local electrical codes</li>
      </ul>
      <p>Detailed wiring diagrams are included with each product or available in the Install Guide.</p>
    `,
  },
  'contractor-pricing': {
    title: 'How do I get contractor pricing?',
    category: 'Account & Pricing',
    content: `
      <p>Contractors and electrical professionals qualify for special pricing.</p>
      <h3>To apply:</h3>
      <ol>
        <li><a href="/register">Create an account</a></li>
        <li>Select "Contractor/Electrician" as your business type</li>
        <li>Provide your contractor license number</li>
        <li>Submit for approval</li>
      </ol>
      <h3>Benefits:</h3>
      <ul>
        <li>Volume-based discounts</li>
        <li>Net terms available (upon approval)</li>
        <li>Dedicated account manager</li>
        <li>Priority technical support</li>
      </ul>
      <p>Approval typically takes 1-2 business days.</p>
    `,
  },
  'net-terms': {
    title: 'How do I apply for Net Terms?',
    category: 'Account & Pricing',
    content: `
      <p><strong>Net 30 terms</strong> are available for qualified businesses.</p>
      <h3>Requirements:</h3>
      <ul>
        <li>Established business (2+ years preferred)</li>
        <li>Good credit standing</li>
        <li>Initial orders paid by credit card</li>
        <li>Complete credit application</li>
      </ul>
      <h3>To apply:</h3>
      <ol>
        <li>Create a business account</li>
        <li>Contact us to request a credit application</li>
        <li>Submit completed application with references</li>
        <li>Approval within 3-5 business days</li>
      </ol>
      <p>Contact <a href="mailto:accounting@auvolar.com">accounting@auvolar.com</a> for details.</p>
    `,
  },
  'tax-exempt': {
    title: 'How do I upload a tax exemption?',
    category: 'Account & Pricing',
    content: `
      <p>To make tax-exempt purchases:</p>
      <ol>
        <li>Log into your account</li>
        <li>Go to Account Settings → Tax Exemption</li>
        <li>Upload your tax exemption certificate</li>
        <li>Wait for verification (1-2 business days)</li>
      </ol>
      <h3>Accepted documents:</h3>
      <ul>
        <li>State resale certificate</li>
        <li>501(c)(3) exemption letter</li>
        <li>Government purchase exemption</li>
      </ul>
      <p>Once approved, tax will be automatically removed from future orders.</p>
      <p>Questions? Email <a href="mailto:accounting@auvolar.com">accounting@auvolar.com</a></p>
    `,
  },
  'project-quote': {
    title: 'Can I get a project quote?',
    category: 'Account & Pricing',
    content: `
      <p>Yes! We provide custom quotes for projects of all sizes.</p>
      <h3>To request a quote:</h3>
      <ol>
        <li>Use our <a href="/tools/rfq">RFQ Tool</a></li>
        <li>Upload your BOM, spec sheet, or lighting schedule</li>
        <li>Add project details (timeline, quantities, etc.)</li>
        <li>Submit for quote</li>
      </ol>
      <h3>What we'll provide:</h3>
      <ul>
        <li>Itemized pricing</li>
        <li>Volume discounts</li>
        <li>Lead times and availability</li>
        <li>Shipping estimates</li>
        <li>Alternative product options</li>
      </ul>
      <p>Quotes typically delivered within 24-48 hours.</p>
    `,
  },
  'po-checkout': {
    title: 'How do I pay with a PO?',
    category: 'Account & Pricing',
    content: `
      <p>Approved accounts can pay via Purchase Order.</p>
      <h3>Requirements:</h3>
      <ul>
        <li>Approved Net Terms account</li>
        <li>Valid PO number</li>
        <li>Authorized signatory</li>
      </ul>
      <h3>To place a PO order:</h3>
      <ol>
        <li>Add items to cart</li>
        <li>At checkout, select "Purchase Order" as payment</li>
        <li>Enter your PO number</li>
        <li>Complete the order</li>
      </ol>
      <p>Alternatively, email your PO to <a href="mailto:orders@auvolar.com">orders@auvolar.com</a></p>
      <p>Need Net Terms? See <a href="/support/faq/net-terms">How to apply for Net Terms</a>.</p>
    `,
  },
}

export default async function FAQPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const faq = faqContent[slug]

  if (!faq) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/support" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Back to Support
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <HelpCircle className="w-4 h-4" />
              <span>{faq.category}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{faq.title}</h1>
            <div 
              className="prose prose-gray max-w-none prose-headings:font-semibold prose-headings:text-gray-900 prose-a:text-yellow-600 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: faq.content }}
            />
          </div>

          {/* Related Help */}
          <div className="mt-8 bg-gray-100 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Still need help?</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/support" className="px-6 py-3 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 text-center border">
                Browse All FAQs
              </Link>
              <a href="mailto:support@auvolar.com" className="px-6 py-3 bg-yellow-400 text-black font-medium rounded-lg hover:bg-yellow-500 text-center">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
