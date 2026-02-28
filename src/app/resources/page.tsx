import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import {
  BookOpen, FileText, Download, Calculator, Lightbulb,
  HelpCircle, ArrowRight, Wrench, GraduationCap, Shield
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free LED Lighting Resources — Guides, Tools & Downloads',
  description: 'Free LED lighting resources: installation guides, IES files, cut sheets, technical specs, ROI calculators, rebate finder, glossary, and educational content for contractors.',
  alternates: { canonical: 'https://www.auvolar.com/resources' },
}

const resourceSections = [
  {
    title: 'Learning Center',
    icon: GraduationCap,
    items: [
      { name: 'LED Lighting Glossary', href: '/resources/glossary', desc: '40+ terms explained — lumens, DLC, CRI, IP ratings, beam angles, and more' },
      { name: 'FAQ Hub', href: '/faq', desc: '26+ frequently asked questions about LED lighting, rebates, and installation' },
      { name: 'Blog & Guides', href: '/blog', desc: '47+ expert articles on product selection, installation, energy savings, and ROI' },
      { name: 'Case Studies', href: '/case-studies', desc: 'Real-world projects: CarMax, Home Depot, Ontario Airport, and more' },
    ],
  },
  {
    title: 'Free Tools',
    icon: Wrench,
    items: [
      { name: 'LED Replacement Finder', href: '/tools/replacement', desc: 'Find LED replacements for existing HID and fluorescent fixtures' },
      { name: 'ROI Calculator', href: '/tools/roi-calculator', desc: 'Calculate payback period and lifetime savings for LED upgrades' },
      { name: 'Rebate Finder', href: '/tools/rebate-finder', desc: 'Look up utility rebates available in your area' },
      { name: 'LightSpec AI', href: '/tools/lightspec-ai', desc: 'AI-powered fixture recommendations for your project' },
      { name: 'Lighting Calculator', href: '/tools/lighting-calculator', desc: 'Calculate fixture count and spacing for your space' },
      { name: 'BOM Upload', href: '/tools/bom-upload', desc: 'Upload your Bill of Materials for instant bulk pricing' },
    ],
  },
  {
    title: 'Technical Documents',
    icon: FileText,
    items: [
      { name: 'Cut Sheets / Spec Sheets', href: '/resources/cut-sheets', desc: 'Downloadable specification sheets for all products' },
      { name: 'IES Files', href: '/resources/ies', desc: 'Photometric data files for lighting design software (AGi32, DIALux)' },
      { name: 'Installation Guides', href: '/resources/installation', desc: 'Step-by-step installation instructions and wiring diagrams' },
      { name: 'Wiring Diagrams', href: '/resources/wiring', desc: 'Electrical wiring diagrams for 120V, 277V, and 480V installations' },
    ],
  },
  {
    title: 'Professional Services',
    icon: Lightbulb,
    items: [
      { name: 'Free Lighting Design', href: '/tools/photometric-request', desc: 'Request a custom photometric layout for your project — completely free' },
      { name: 'Photometric Simulation', href: '/tools/photometric-simulation', desc: 'Interactive 3D lighting simulation tool' },
      { name: 'Rebate Assistance', href: '/services', desc: 'We help with DLC rebate applications and utility paperwork' },
      { name: 'Request for Quote', href: '/tools/rfq', desc: 'Get custom pricing for large or specialized projects' },
    ],
  },
]

const resourcesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Auvolar LED Lighting Resources',
  url: 'https://www.auvolar.com/resources',
  description: 'Comprehensive LED lighting resources for contractors, electricians, and facility managers. Free tools, technical documents, educational content, and professional services.',
  mainEntity: {
    '@type': 'ItemList',
    name: 'LED Lighting Resources',
    numberOfItems: resourceSections.reduce((sum, s) => sum + s.items.length, 0),
    itemListElement: resourceSections.flatMap((section, si) =>
      section.items.map((item, ii) => ({
        '@type': 'ListItem',
        position: si * 10 + ii + 1,
        name: item.name,
        description: item.desc,
        url: `https://www.auvolar.com${item.href}`,
      }))
    ),
  },
}

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.auvolar.com' },
        { name: 'Resources', url: 'https://www.auvolar.com/resources' },
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resourcesJsonLd) }}
      />
      <Header />

      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">LED Lighting Resources</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Everything you need for your LED lighting project — free tools, technical documents, expert guides, and professional services.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {resourceSections.map(section => {
              const Icon = section.icon
              return (
                <div key={section.title}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Icon className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {section.items.map(item => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="group block p-5 border rounded-xl hover:border-yellow-400 hover:shadow-md transition-all"
                      >
                        <h3 className="font-semibold text-gray-900 group-hover:text-yellow-600 flex items-center gap-1">
                          {item.name}
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Personalized Help?</h2>
          <p className="text-gray-600 mb-6">Our lighting engineers are standing by with free project support.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/contact" className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors">
              Contact Our Team
            </Link>
            <a href="tel:+16263428856" className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
              (626) 342-8856
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
