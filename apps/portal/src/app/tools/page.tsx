import Link from 'next/link'
import { 
  Zap, 
  FileSpreadsheet, 
  FileText, 
  Lightbulb, 
  DollarSign, 
  Package, 
  RotateCcw,
  HeadphonesIcon,
  ArrowRight
} from 'lucide-react'

const tools = [
  {
    name: 'Quick Order',
    description: 'Enter SKUs and quantities for fast reordering. Perfect for repeat purchases.',
    icon: Zap,
    href: '/tools/quick-order',
    sla: null,
  },
  {
    name: 'Upload BOM',
    description: 'Upload your bill of materials spreadsheet and get a complete quote.',
    icon: FileSpreadsheet,
    href: '/tools/bom-upload',
    sla: '1 business day',
  },
  {
    name: 'Request Quote',
    description: 'Get custom pricing for your project with volume discounts.',
    icon: FileText,
    href: '/tools/rfq',
    sla: '1 business day',
  },
  {
    name: 'Photometric Request',
    description: 'Get a lighting layout and photometric analysis for your space.',
    icon: Lightbulb,
    href: '/tools/photometric',
    sla: '3 business days',
    disclaimer: 'Preliminary estimate only',
  },
  {
    name: 'Rebate Finder',
    description: 'Find available utility rebates for LED upgrades in your area.',
    icon: DollarSign,
    href: '/tools/rebate',
    sla: '5 business days',
    disclaimer: 'No guarantee of rebate approval',
  },
  {
    name: 'Track Order',
    description: 'Check the status and tracking information for your orders.',
    icon: Package,
    href: '/portal/orders',
    sla: null,
  },
  {
    name: 'Submit RMA',
    description: 'Request a return or replacement for defective products.',
    icon: RotateCcw,
    href: '/tools/rma',
    sla: '2 business days',
  },
  {
    name: 'Contact Support',
    description: 'Get help with technical questions, orders, or general inquiries.',
    icon: HeadphonesIcon,
    href: '/tools/support',
    sla: '1 business day',
  },
]

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Contractor Tools</h1>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to quote, order, and manage your lighting projects
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="card p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand/10 group-hover:bg-brand/20 transition-colors">
                  <tool.icon className="h-6 w-6 text-brand-dark" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-gray-900 group-hover:text-brand-dark transition-colors">
                      {tool.name}
                    </h2>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-brand-dark group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{tool.description}</p>
                  {tool.sla && (
                    <p className="mt-2 text-xs text-gray-500">
                      Response time: <span className="font-medium">{tool.sla}</span>
                    </p>
                  )}
                  {tool.disclaimer && (
                    <p className="mt-1 text-xs text-orange-600">{tool.disclaimer}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 card p-8 text-center bg-gray-900 text-white">
          <h2 className="text-xl font-semibold">Need Something Else?</h2>
          <p className="mt-2 text-gray-400">
            Our team is ready to help with custom requirements, bulk orders, or technical questions.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/tools/support" className="btn-primary btn-md">
              Contact Support
            </Link>
            <a href="tel:+18005551234" className="btn bg-white/10 hover:bg-white/20 btn-md text-white">
              Call 1-800-555-1234
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
