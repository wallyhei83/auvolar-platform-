import Link from 'next/link'
import { Zap, Phone, Mail, MapPin, Facebook, Linkedin, Youtube, Twitter } from 'lucide-react'

const footerLinks = {
  products: {
    title: 'Products',
    links: [
      { name: 'High Bay Lights', href: '/products/high-bay' },
      { name: 'Linear High Bay', href: '/products/linear-high-bay' },
      { name: 'Wall Packs', href: '/products/wall-pack' },
      { name: 'Area Lights', href: '/products/area-light' },
      { name: 'Troffers & Panels', href: '/products/troffer' },
      { name: 'LED Tubes', href: '/products/tubes' },
      { name: 'All Products', href: '/products' },
    ]
  },
  tools: {
    title: 'Tools & Resources',
    links: [
      { name: 'Quick Order', href: '/tools/quick-order' },
      { name: 'Upload BOM', href: '/tools/bom-upload' },
      { name: 'Replacement Finder', href: '/tools/replacement' },
      { name: 'ROI Calculator', href: '/tools/roi-calculator' },
      { name: 'Rebate Finder', href: '/tools/rebate' },
      { name: 'IES Library', href: '/resources/ies' },
      { name: 'Cut Sheets', href: '/resources/cut-sheets' },
    ]
  },
  support: {
    title: 'Support',
    links: [
      { name: 'Help Center', href: '/support' },
      { name: 'Installation Guides', href: '/support/installation' },
      { name: 'Warranty Info', href: '/support/warranty' },
      { name: 'Start RMA', href: '/support/rma' },
      { name: 'Track Order', href: '/track-order' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQ', href: '/support/faq' },
    ]
  },
  company: {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Compliance Center', href: '/compliance' },
      { name: 'Vendor Packet', href: '/vendor-packet' },
      { name: 'Partner Program', href: '/partners' },
      { name: 'Case Studies', href: '/projects' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
    ]
  }
}

const certifications = [
  { name: 'DLC', description: 'DesignLights Consortium' },
  { name: 'UL', description: 'UL Listed' },
  { name: 'ETL', description: 'ETL Listed' },
  { name: 'FCC', description: 'FCC Compliant' },
]

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Trust Bar */}
      <div className="border-b border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-brand">5-10 Year</div>
              <div className="text-sm text-gray-400">Warranty Coverage</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-brand">24h</div>
              <div className="text-sm text-gray-400">In-Stock Shipping</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-brand">DLC/UL</div>
              <div className="text-sm text-gray-400">Certified Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-brand">Net 30</div>
              <div className="text-sm text-gray-400">Terms Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand">
                <Zap className="h-6 w-6 text-black" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">LumilinkAI</span>
                <span className="block text-xs text-gray-500">Light Done Right</span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Commercial & industrial LED lighting solutions for contractors, electricians, and facility managers. 
              Quality products, competitive pricing, expert support.
            </p>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <a href="tel:1-888-555-0123" className="flex items-center gap-2 text-sm hover:text-brand">
                <Phone className="h-4 w-4" />
                1-888-555-0123
              </a>
              <a href="mailto:sales@lumilinkai.com" className="flex items-center gap-2 text-sm hover:text-brand">
                <Mail className="h-4 w-4" />
                sales@lumilinkai.com
              </a>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>123 Industrial Blvd, Suite 100<br />Houston, TX 77001</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-gray-400 hover:text-brand">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-brand"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="flex items-center gap-2 rounded border border-gray-700 px-3 py-1.5"
                >
                  <span className="text-sm font-bold text-white">{cert.name}</span>
                  <span className="text-xs text-gray-500">{cert.description}</span>
                </div>
              ))}
            </div>
            <Link
              href="/vendor-packet"
              className="text-sm font-medium text-brand hover:underline"
            >
              Download Vendor Packet →
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 text-xs text-gray-500 sm:flex-row">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} LumilinkAI. All rights reserved.</span>
            <Link href="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-300">Terms of Service</Link>
            <Link href="/accessibility" className="hover:text-gray-300">Accessibility</Link>
          </div>
          <div className="flex items-center gap-2">
            <span>Accepted Payments:</span>
            <span className="font-medium text-gray-400">Visa • Mastercard • AMEX • ACH • PO</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
