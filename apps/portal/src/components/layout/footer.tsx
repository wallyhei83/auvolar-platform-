import Link from 'next/link'
import { Zap, Phone, Mail, MapPin, Facebook, Linkedin, Youtube, Twitter } from 'lucide-react'

const footerLinks = {
  products: {
    title: 'Products',
    links: [
      { name: 'High Bay Lights', href: '/products/indoor/high-bay' },
      { name: 'Wall Packs', href: '/products/outdoor/wall-pack' },
      { name: 'Area Lights', href: '/products/outdoor/area-light' },
      { name: 'Troffers & Panels', href: '/products/indoor/troffer' },
      { name: 'Solar Lights', href: '/products/solar' },
      { name: 'LED Tubes', href: '/products/indoor/tubes' },
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
      { name: 'Rebate Finder', href: '/tools/rebate-finder' },
      { name: 'Request Quote', href: '/tools/rfq' },
      { name: 'All Tools', href: '/tools' },
    ]
  },
  support: {
    title: 'Support',
    links: [
      { name: 'Help Center', href: '/support' },
      { name: 'Track Order', href: '/track-order' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Applications', href: '/applications' },
      { name: 'Services', href: '/services' },
      { name: 'About Us', href: '/about' },
    ]
  },
  company: {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Case Studies', href: '/projects' },
      { name: 'Applications', href: '/applications' },
      { name: 'Services', href: '/services' },
      { name: 'Contact', href: '/contact' },
      { name: 'Portal Login', href: '/login' },
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
              Commercial LED lighting for contractors, electricians, and facility managers. 
              Quality products, competitive pricing, expert support.
            </p>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-2 text-sm">
              <a href="tel:1-888-555-0123" className="flex items-center gap-2 hover:text-white">
                <Phone className="h-4 w-4 text-brand" />
                1-888-555-0123
              </a>
              <a href="mailto:sales@lumilinkai.com" className="flex items-center gap-2 hover:text-white">
                <Mail className="h-4 w-4 text-brand" />
                sales@lumilinkai.com
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-brand mt-0.5" />
                <span>Houston, TX 77001</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Youtube className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Twitter className="h-5 w-5" /></a>
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
                    <Link href={link.href} className="text-sm text-gray-400 hover:text-white">
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
          <div className="flex flex-wrap items-center justify-center gap-8">
            {certifications.map((cert) => (
              <div key={cert.name} className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-800 mx-auto">
                  <span className="text-xs font-bold text-brand">{cert.name}</span>
                </div>
                <span className="mt-1 block text-xs text-gray-500">{cert.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} LumilinkAI. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
