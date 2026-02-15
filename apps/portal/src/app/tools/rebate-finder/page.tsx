'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ChevronRight, MapPin, DollarSign, Zap, ExternalLink, Search, CheckCircle, Info } from 'lucide-react'

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 
  'Wisconsin', 'Wyoming'
]

const utilityTypes = [
  'Electric Utility',
  'Gas & Electric Utility',
  'Municipal Utility',
  'Electric Cooperative',
  'Not Sure'
]

// Sample rebate programs (in production, this would come from an API)
const sampleRebates = [
  {
    id: 1,
    utility: 'Pacific Gas & Electric (PG&E)',
    state: 'California',
    program: 'Commercial LED Lighting Rebates',
    amount: '$0.08 - $0.15 per kWh saved',
    products: ['High Bay', 'Troffer', 'Panel', 'Outdoor'],
    requirements: ['DLC Listed', 'Minimum 50,000 hour rated life'],
    link: 'https://www.pge.com/rebates',
    expires: '12/31/2026'
  },
  {
    id: 2,
    utility: 'Southern California Edison (SCE)',
    state: 'California',
    program: 'Express Solutions Lighting',
    amount: '$25 - $150 per fixture',
    products: ['High Bay', 'Linear', 'Troffer'],
    requirements: ['DLC Premium', 'Installed by licensed contractor'],
    link: 'https://www.sce.com/rebates',
    expires: '06/30/2026'
  },
  {
    id: 3,
    utility: 'CenterPoint Energy',
    state: 'Texas',
    program: 'Commercial Standard Offer Program',
    amount: '$0.06 per kWh saved',
    products: ['All LED fixtures'],
    requirements: ['DLC Listed', 'Pre-approval required'],
    link: 'https://www.centerpointenergy.com',
    expires: '12/31/2026'
  },
  {
    id: 4,
    utility: 'ComEd',
    state: 'Illinois',
    program: 'Instant Discounts',
    amount: 'Up to 70% off qualified products',
    products: ['LED Tubes', 'Troffer', 'High Bay'],
    requirements: ['Purchase from participating distributor'],
    link: 'https://www.comed.com/rebates',
    expires: 'Ongoing'
  },
  {
    id: 5,
    utility: 'Duke Energy',
    state: 'North Carolina',
    program: 'Smart $aver Prescriptive',
    amount: '$20 - $200 per fixture',
    products: ['High Bay', 'Outdoor', 'Retrofit Kit'],
    requirements: ['DLC Listed', 'Pre-approval for projects over $5,000'],
    link: 'https://www.duke-energy.com',
    expires: '12/31/2026'
  },
  {
    id: 6,
    utility: 'Xcel Energy',
    state: 'Colorado',
    program: 'Lighting Efficiency',
    amount: '$0.04 - $0.08 per kWh',
    products: ['All commercial LED'],
    requirements: ['DLC Listed'],
    link: 'https://www.xcelenergy.com',
    expires: '12/31/2026'
  },
]

export default function RebateFinderPage() {
  const [state, setState] = useState('')
  const [utilityType, setUtilityType] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [searched, setSearched] = useState(false)
  const [results, setResults] = useState<typeof sampleRebates>([])

  const handleSearch = () => {
    // Filter rebates by state (in production, this would be an API call)
    const filtered = state 
      ? sampleRebates.filter(r => r.state === state)
      : sampleRebates
    setResults(filtered.length > 0 ? filtered : sampleRebates.slice(0, 3))
    setSearched(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/tools" className="hover:text-gray-900">Tools</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">Rebate Finder</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-black py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-yellow-400 p-3">
              <DollarSign className="h-8 w-8 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Rebate Finder</h1>
              <p className="mt-1 text-gray-400">Find utility rebates and incentives in your area</p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Search Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 rounded-xl border bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-900">Find Rebates</h2>
              <p className="mt-1 text-sm text-gray-500">Enter your location to find available incentives</p>
              
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">State *</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="mt-1 w-full rounded-lg border p-3 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  >
                    <option value="">Select state...</option>
                    {states.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="e.g., 90210"
                    className="mt-1 w-full rounded-lg border p-3 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Utility Type</label>
                  <select
                    value={utilityType}
                    onChange={(e) => setUtilityType(e.target.value)}
                    className="mt-1 w-full rounded-lg border p-3 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  >
                    <option value="">Select type...</option>
                    {utilityTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleSearch}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-black transition-colors hover:bg-yellow-300"
                >
                  <Search className="h-5 w-5" />
                  Find Rebates
                </button>
              </div>

              {/* DLC Info */}
              <div className="mt-6 rounded-lg bg-blue-50 p-4">
                <div className="flex items-start gap-2">
                  <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                  <div className="text-sm text-blue-700">
                    <strong>DLC Listed Products</strong>
                    <p className="mt-1">Most rebates require DLC (DesignLights Consortium) certification. All Auvolar commercial products are DLC Listed.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            {!searched ? (
              <div className="rounded-xl border bg-white p-12 text-center">
                <MapPin className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">Enter Your Location</h3>
                <p className="mt-2 text-gray-500">
                  Select your state to see available utility rebates and incentives for LED lighting upgrades.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">
                    Available Rebates {state && `in ${state}`}
                  </h2>
                  <span className="text-sm text-gray-500">{results.length} programs found</span>
                </div>

                {results.map((rebate) => (
                  <div key={rebate.id} className="rounded-xl border bg-white p-6 transition-all hover:shadow-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{rebate.utility}</h3>
                        <p className="text-sm text-gray-500">{rebate.program}</p>
                      </div>
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                        {rebate.amount}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Eligible Products</p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {rebate.products.map((p) => (
                            <span key={p} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Requirements</p>
                        <ul className="mt-1 space-y-1">
                          {rebate.requirements.map((r, i) => (
                            <li key={i} className="flex items-center gap-1 text-sm text-gray-600">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t pt-4">
                      <span className="text-sm text-gray-500">
                        Expires: {rebate.expires}
                      </span>
                      <a
                        href={rebate.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-yellow-600 hover:text-yellow-700"
                      >
                        View Program Details
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))}

                {/* Disclaimer */}
                <div className="rounded-lg bg-gray-100 p-4 text-sm text-gray-600">
                  <strong>Disclaimer:</strong> Rebate programs change frequently. Always verify current availability 
                  and requirements directly with your utility provider before making purchasing decisions. 
                  Auvolar is not responsible for rebate eligibility or approval.
                </div>

                {/* Need Help */}
                <div className="rounded-xl bg-gray-900 p-6 text-center">
                  <h3 className="text-lg font-semibold text-white">Need Help with Rebates?</h3>
                  <p className="mt-2 text-gray-400">
                    Our team can help you navigate the rebate process and ensure your products qualify.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-block rounded-lg bg-yellow-400 px-6 py-2 font-semibold text-black transition-colors hover:bg-yellow-300"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
