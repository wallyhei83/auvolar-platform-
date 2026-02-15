'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { 
  ChevronRight, Lightbulb, FileText, DollarSign, Calculator, 
  Users, Zap, CheckCircle, ArrowRight, Phone, Mail
} from 'lucide-react'

const serviceConfig: Record<string, {
  title: string
  subtitle: string
  icon: any
  description: string
  benefits: string[]
  process: { step: number; title: string; description: string }[]
  cta: { primary: string; secondary: string }
}> = {
  'lighting-design': {
    title: 'Lighting Design Services',
    subtitle: 'Professional photometric layouts for your project',
    icon: Lightbulb,
    description: 'Our lighting design team creates custom photometric layouts using AGI32 software to ensure optimal light levels, uniformity, and energy efficiency for your space.',
    benefits: [
      'Custom photometric calculations tailored to your space',
      'AGI32 lighting layouts with 3D visualization',
      'IES file analysis for accurate performance data',
      'Energy code compliance review (Title 24, ASHRAE 90.1)',
      'Quick turnaround - typically 2-3 business days',
      'Revisions included until you are satisfied',
    ],
    process: [
      { step: 1, title: 'Submit Project Details', description: 'Provide floor plans, ceiling heights, and lighting requirements.' },
      { step: 2, title: 'Design & Calculate', description: 'Our engineers create photometric layouts and calculate light levels.' },
      { step: 3, title: 'Review & Refine', description: 'Review the design and request any adjustments needed.' },
      { step: 4, title: 'Final Delivery', description: 'Receive final layouts, product specs, and installation notes.' },
    ],
    cta: { primary: 'Request Lighting Design', secondary: 'View Sample Layouts' },
  },
  'installation-guide': {
    title: 'Installation Support',
    subtitle: 'Step-by-step guidance for successful installation',
    icon: FileText,
    description: 'We provide comprehensive installation support including detailed manuals, video tutorials, and technical assistance to ensure your lighting project is installed correctly.',
    benefits: [
      'Detailed installation manuals for every product',
      'Video tutorials demonstrating proper installation',
      'Technical phone support from lighting specialists',
      'On-site consultation available for large projects',
      'Wiring diagrams and control integration guides',
      'Post-installation troubleshooting support',
    ],
    process: [
      { step: 1, title: 'Download Manuals', description: 'Access installation guides from product pages or our resource center.' },
      { step: 2, title: 'Watch Tutorials', description: 'View step-by-step video guides for visual reference.' },
      { step: 3, title: 'Call for Support', description: 'Reach our technical team for questions during installation.' },
      { step: 4, title: 'Verify Installation', description: 'Use our checklist to confirm proper installation.' },
    ],
    cta: { primary: 'Access Resources', secondary: 'Call Technical Support' },
  },
  'rebate-assistance': {
    title: 'Rebate Assistance',
    subtitle: 'Maximize your utility rebates and incentives',
    icon: DollarSign,
    description: 'Our rebate specialists help you navigate utility incentive programs to reduce your project costs. We handle the paperwork so you can focus on your project.',
    benefits: [
      'Free rebate qualification check for your project',
      'Complete application preparation and submission',
      'Documentation gathering (invoices, spec sheets, etc.)',
      'Direct communication with utility representatives',
      'Typical rebates of $0.10-$0.30 per watt',
      'Follow-up until rebate check is received',
    ],
    process: [
      { step: 1, title: 'Rebate Check', description: 'We verify available rebates for your utility and project.' },
      { step: 2, title: 'Pre-Approval', description: 'Submit pre-approval application before purchase when required.' },
      { step: 3, title: 'Documentation', description: 'We prepare all required documentation after installation.' },
      { step: 4, title: 'Submission & Follow-up', description: 'Submit application and track until rebate is received.' },
    ],
    cta: { primary: 'Check My Rebates', secondary: 'Learn About Incentives' },
  },
  'roi-assistance': {
    title: 'ROI Analysis',
    subtitle: 'Detailed energy savings and payback calculations',
    icon: Calculator,
    description: 'We provide comprehensive ROI analysis to help you understand the financial benefits of upgrading to LED lighting, including energy savings, maintenance reduction, and payback period.',
    benefits: [
      'Detailed energy savings calculation based on your usage',
      'Payback period analysis with and without rebates',
      'Maintenance cost comparison (lamp replacement, labor)',
      'Custom ROI reports for stakeholder presentations',
      'Utility rate analysis for accurate projections',
      'Carbon footprint reduction calculations',
    ],
    process: [
      { step: 1, title: 'Gather Data', description: 'Provide current fixture types, quantities, and operating hours.' },
      { step: 2, title: 'Utility Analysis', description: 'We analyze your utility rates and calculate current costs.' },
      { step: 3, title: 'LED Comparison', description: 'Calculate energy and maintenance savings with LED upgrade.' },
      { step: 4, title: 'Report Delivery', description: 'Receive detailed ROI report with charts and projections.' },
    ],
    cta: { primary: 'Get ROI Analysis', secondary: 'Try ROI Calculator' },
  },
  'contractor-network': {
    title: 'Contractor Network',
    subtitle: 'Connect with certified installers in your area',
    icon: Users,
    description: 'We partner with vetted electrical contractors nationwide who specialize in commercial LED lighting installation. Get competitive quotes from trusted professionals.',
    benefits: [
      'Vetted contractors with commercial lighting experience',
      'Nationwide coverage in all 50 states',
      'Multiple quotes for competitive pricing',
      'Quality workmanship guarantee',
      'Coordination between supplier and installer',
      'Post-installation support and warranty claims',
    ],
    process: [
      { step: 1, title: 'Submit Request', description: 'Provide your project location and scope.' },
      { step: 2, title: 'Contractor Matching', description: 'We identify qualified contractors in your area.' },
      { step: 3, title: 'Quote Collection', description: 'Receive 2-3 competitive quotes for your review.' },
      { step: 4, title: 'Project Coordination', description: 'We help coordinate product delivery with installation.' },
    ],
    cta: { primary: 'Find Contractors', secondary: 'Become a Partner' },
  },
  'laas': {
    title: 'Lighting as a Service',
    subtitle: 'Zero upfront cost LED upgrade',
    icon: Zap,
    description: 'LaaS (Lighting as a Service) allows you to upgrade to LED lighting with zero upfront cost. Pay a simple monthly fee that is typically less than your current lighting costs.',
    benefits: [
      '$0 upfront cost for products and installation',
      'Simple monthly payment from energy savings',
      'All maintenance and replacements included',
      'Guaranteed energy savings or we pay the difference',
      'Upgrade equipment during contract period',
      'Improves cash flow and preserves capital',
    ],
    process: [
      { step: 1, title: 'Energy Audit', description: 'We assess your current lighting and energy costs.' },
      { step: 2, title: 'Proposal', description: 'Receive a proposal showing monthly payment vs. savings.' },
      { step: 3, title: 'Installation', description: 'We handle procurement, installation, and commissioning.' },
      { step: 4, title: 'Enjoy Savings', description: 'Pay monthly fee while enjoying improved lighting and savings.' },
    ],
    cta: { primary: 'Request LaaS Quote', secondary: 'How LaaS Works' },
  },
}

export default function ServicePage() {
  const params = useParams()
  const slug = params.slug as string
  const config = serviceConfig[slug]

  if (!config) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-8">The service "{slug}" does not exist.</p>
          <Link href="/services" className="text-brand hover:underline">
            ← Back to Services
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const Icon = config.icon

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href="/services" className="text-gray-500 hover:text-gray-700">Services</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">{config.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-brand/20 rounded-lg">
                <Icon className="w-10 h-10 text-brand" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{config.title}</h1>
                <p className="text-gray-400 mt-1">{config.subtitle}</p>
              </div>
            </div>
            <p className="text-xl text-gray-300 mt-6 max-w-3xl">{config.description}</p>
          </div>
        </div>

        {/* Benefits */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold mb-8">What's Included</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {config.benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {config.process.map((step) => (
                <div key={step.step} className="relative">
                  <div className="bg-white border rounded-lg p-6">
                    <div className="w-10 h-10 bg-brand rounded-full flex items-center justify-center text-black font-bold mb-4">
                      {step.step}
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  {step.step < 4 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-gray-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-gray-300 mb-6">
                  Contact our team to learn more about {config.title.toLowerCase()} and how we can help with your project.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href="/contact" 
                    className="px-6 py-3 bg-brand text-black font-medium rounded-lg hover:bg-yellow-400 transition-colors"
                  >
                    {config.cta.primary}
                  </Link>
                  <Link 
                    href="/tools" 
                    className="px-6 py-3 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                  >
                    {config.cta.secondary}
                  </Link>
                </div>
              </div>
              <div className="space-y-4">
                <a href="tel:1-888-555-0123" className="flex items-center gap-3 text-gray-300 hover:text-white">
                  <Phone className="w-5 h-5" />
                  <span>1-888-555-0123</span>
                </a>
                <a href="mailto:services@auvolar.com" className="flex items-center gap-3 text-gray-300 hover:text-white">
                  <Mail className="w-5 h-5" />
                  <span>services@auvolar.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
