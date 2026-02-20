'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ChevronRight, MapPin, DollarSign, Zap, ExternalLink, Search, CheckCircle, Info, Loader2, Navigation } from 'lucide-react'

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

interface Rebate {
  id: number
  utility: string
  state: string
  program: string
  amount: string
  products: string[]
  requirements: string[]
  link: string
  expires: string
}

// Rebate programs by state — curated data
const rebateDatabase: Record<string, Rebate[]> = {
  'California': [
    { id: 1, utility: 'Pacific Gas & Electric (PG&E)', state: 'California', program: 'Commercial LED Lighting Rebates', amount: '$0.08 - $0.15 per kWh saved', products: ['High Bay', 'Troffer', 'Panel', 'Outdoor'], requirements: ['DLC Listed', 'Minimum 50,000 hour rated life'], link: 'https://www.pge.com/rebates', expires: '12/31/2026' },
    { id: 2, utility: 'Southern California Edison (SCE)', state: 'California', program: 'Express Solutions Lighting', amount: '$25 - $150 per fixture', products: ['High Bay', 'Linear', 'Troffer'], requirements: ['DLC Premium', 'Installed by licensed contractor'], link: 'https://www.sce.com/rebates', expires: '06/30/2026' },
    { id: 20, utility: 'San Diego Gas & Electric (SDG&E)', state: 'California', program: 'Business Energy Solutions', amount: '$0.06 - $0.12 per kWh saved', products: ['All commercial LED'], requirements: ['DLC Listed', 'Pre-approval required'], link: 'https://www.sdge.com/business/savings-center', expires: '12/31/2026' },
  ],
  'Texas': [
    { id: 3, utility: 'CenterPoint Energy', state: 'Texas', program: 'Commercial Standard Offer Program', amount: '$0.06 per kWh saved', products: ['All LED fixtures'], requirements: ['DLC Listed', 'Pre-approval required'], link: 'https://www.centerpointenergy.com', expires: '12/31/2026' },
    { id: 21, utility: 'Oncor Electric Delivery', state: 'Texas', program: 'Commercial Prescriptive Program', amount: '$20 - $100 per fixture', products: ['High Bay', 'Troffer', 'LED Tube'], requirements: ['DLC Listed'], link: 'https://www.takealoadofftexas.com', expires: '12/31/2026' },
  ],
  'Illinois': [
    { id: 4, utility: 'ComEd', state: 'Illinois', program: 'Instant Discounts', amount: 'Up to 70% off qualified products', products: ['LED Tubes', 'Troffer', 'High Bay'], requirements: ['Purchase from participating distributor'], link: 'https://www.comed.com/rebates', expires: 'Ongoing' },
  ],
  'North Carolina': [
    { id: 5, utility: 'Duke Energy', state: 'North Carolina', program: 'Smart $aver Prescriptive', amount: '$20 - $200 per fixture', products: ['High Bay', 'Outdoor', 'Retrofit Kit'], requirements: ['DLC Listed', 'Pre-approval for projects over $5,000'], link: 'https://www.duke-energy.com', expires: '12/31/2026' },
  ],
  'Colorado': [
    { id: 6, utility: 'Xcel Energy', state: 'Colorado', program: 'Lighting Efficiency', amount: '$0.04 - $0.08 per kWh', products: ['All commercial LED'], requirements: ['DLC Listed'], link: 'https://www.xcelenergy.com', expires: '12/31/2026' },
  ],
  'New York': [
    { id: 7, utility: 'Con Edison', state: 'New York', program: 'Commercial & Industrial Lighting', amount: '$0.12 - $0.16 per kWh saved', products: ['High Bay', 'Troffer', 'Outdoor', 'Retrofit'], requirements: ['DLC Listed', 'Must serve Con Edison territory'], link: 'https://www.coned.com/en/save-money/rebates-incentives-tax-credits', expires: '12/31/2026' },
    { id: 8, utility: 'NYSERDA', state: 'New York', program: 'Commercial New Construction', amount: 'Up to $0.20 per kWh saved', products: ['All LED fixtures'], requirements: ['New construction or major renovation', 'DLC Listed'], link: 'https://www.nyserda.ny.gov', expires: 'Ongoing' },
  ],
  'Florida': [
    { id: 9, utility: 'FPL (Florida Power & Light)', state: 'Florida', program: 'Business Custom Incentive', amount: '$0.05 per kWh saved annually', products: ['All commercial LED'], requirements: ['DLC Listed', 'Energy audit may be required'], link: 'https://www.fpl.com/business/save.html', expires: '12/31/2026' },
    { id: 10, utility: 'Duke Energy Florida', state: 'Florida', program: 'Prescriptive Lighting', amount: '$15 - $125 per fixture', products: ['High Bay', 'Troffer', 'Outdoor'], requirements: ['DLC Listed'], link: 'https://www.duke-energy.com/business/products/smart-saver', expires: '12/31/2026' },
  ],
  'Ohio': [
    { id: 11, utility: 'AEP Ohio', state: 'Ohio', program: 'Commercial Lighting Incentives', amount: '$0.04 - $0.10 per kWh saved', products: ['All commercial LED'], requirements: ['DLC Listed', 'Pre-approval required for projects > $10,000'], link: 'https://www.aepohio.com/save', expires: '12/31/2026' },
  ],
  'Pennsylvania': [
    { id: 12, utility: 'PECO Energy', state: 'Pennsylvania', program: 'Smart Equipment Incentives', amount: '$15 - $100 per fixture', products: ['High Bay', 'Troffer', 'LED Tube', 'Outdoor'], requirements: ['DLC Listed'], link: 'https://www.peco.com/save', expires: '12/31/2026' },
  ],
  'Massachusetts': [
    { id: 13, utility: 'Mass Save (Statewide)', state: 'Massachusetts', program: 'Upstream Lighting', amount: 'Up to 70% instant discount', products: ['All commercial LED'], requirements: ['Purchase from participating distributor'], link: 'https://www.masssave.com', expires: 'Ongoing' },
  ],
  'Washington': [
    { id: 14, utility: 'Puget Sound Energy', state: 'Washington', program: 'Commercial Lighting', amount: '$0.06 - $0.12 per kWh saved', products: ['All commercial LED'], requirements: ['DLC Listed'], link: 'https://www.pse.com/rebates', expires: '12/31/2026' },
  ],
  'Oregon': [
    { id: 15, utility: 'Energy Trust of Oregon', state: 'Oregon', program: 'Standard Lighting', amount: '$15 - $150 per fixture', products: ['High Bay', 'Troffer', 'Outdoor', 'LED Tube'], requirements: ['DLC Listed', 'Portland General Electric or Pacific Power customer'], link: 'https://www.energytrust.org', expires: 'Ongoing' },
  ],
  'New Jersey': [
    { id: 16, utility: 'PSE&G', state: 'New Jersey', program: 'Direct Install Program', amount: 'Up to 70% of project cost', products: ['All commercial LED'], requirements: ['Small business (< 100 kW peak demand)'], link: 'https://www.pseg.com/saveenergy', expires: '12/31/2026' },
  ],
  'Georgia': [
    { id: 17, utility: 'Georgia Power', state: 'Georgia', program: 'Commercial Prescriptive Rebates', amount: '$10 - $80 per fixture', products: ['High Bay', 'Troffer', 'Outdoor'], requirements: ['DLC Listed'], link: 'https://www.georgiapower.com/rebates', expires: '12/31/2026' },
  ],
  'Michigan': [
    { id: 18, utility: 'DTE Energy', state: 'Michigan', program: 'Commercial Lighting', amount: '$0.04 - $0.06 per kWh saved', products: ['All commercial LED'], requirements: ['DLC Listed'], link: 'https://www.dteenergy.com/save', expires: '12/31/2026' },
  ],
  'Arizona': [
    { id: 19, utility: 'Arizona Public Service (APS)', state: 'Arizona', program: 'Commercial Lighting Solutions', amount: '$15 - $120 per fixture', products: ['High Bay', 'Outdoor', 'Troffer'], requirements: ['DLC Listed', 'APS commercial customer'], link: 'https://www.aps.com/rebates', expires: '12/31/2026' },
  ],
}

const sampleRebates: Rebate[] = Object.values(rebateDatabase).flat()

export default function RebateFinderPage() {
  const [state, setState] = useState('')
  const [utilityType, setUtilityType] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [searched, setSearched] = useState(false)
  const [results, setResults] = useState<typeof sampleRebates>([])
  const [locating, setLocating] = useState(false)
  const [locationName, setLocationName] = useState('')

  const handleSearch = () => {
    const filtered = state
      ? (rebateDatabase[state] || [])
      : sampleRebates
    setResults(filtered)
    setSearched(true)
  }

  const handleLocate = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser')
      return
    }

    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          // Reverse geocode using free Nominatim API
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`,
            { headers: { 'Accept-Language': 'en' } }
          )
          const data = await res.json()
          const detectedState = data.address?.state || ''
          const detectedZip = data.address?.postcode || ''
          const detectedCity = data.address?.city || data.address?.town || data.address?.village || ''

          // Match state name
          const matched = states.find(s => s.toLowerCase() === detectedState.toLowerCase())
          if (matched) {
            setState(matched)
            setLocationName(`${detectedCity}, ${matched}`)
          }
          if (detectedZip) {
            setZipCode(detectedZip)
          }

          // Auto-search after location detected
          if (matched) {
            const filtered = rebateDatabase[matched] || []
            setResults(filtered)
            setSearched(true)
          }
        } catch (err) {
          console.error('Geocoding error:', err)
          alert('Could not determine your location. Please select your state manually.')
        }
        setLocating(false)
      },
      (error) => {
        setLocating(false)
        if (error.code === error.PERMISSION_DENIED) {
          alert('Location permission denied. Please select your state manually.')
        } else {
          alert('Could not get your location. Please select your state manually.')
        }
      },
      { enableHighAccuracy: false, timeout: 10000 }
    )
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
              
              {/* Auto-locate button */}
              <button
                onClick={handleLocate}
                disabled={locating}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100 hover:border-blue-400"
              >
                {locating ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Detecting location...</>
                ) : (
                  <><Navigation className="h-4 w-4" /> Use My Current Location</>
                )}
              </button>

              {locationName && (
                <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {locationName}
                </p>
              )}

              <div className="mt-4 relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">or search manually</span></div>
              </div>

              <div className="mt-4 space-y-4">
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
                <div
                  onClick={handleLocate}
                  className="cursor-pointer inline-block"
                >
                  {locating ? (
                    <Loader2 className="mx-auto h-12 w-12 text-blue-400 animate-spin" />
                  ) : (
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 transition-colors">
                      <MapPin className="h-8 w-8 text-blue-600" />
                    </div>
                  )}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {locating ? 'Detecting Your Location...' : 'Enter Your Location'}
                </h3>
                <p className="mt-2 text-gray-500">
                  {locating
                    ? 'Please allow location access when prompted.'
                    : 'Click the pin above or use the form to find available utility rebates and incentives for LED lighting upgrades.'
                  }
                </p>
                {!locating && (
                  <button
                    onClick={handleLocate}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    <Navigation className="h-4 w-4" /> Detect My Location
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">
                    Available Rebates {state && `in ${state}`}
                  </h2>
                  <span className="text-sm text-gray-500">{results.length} program{results.length !== 1 ? 's' : ''} found</span>
                </div>

                {results.length === 0 ? (
                  <div className="rounded-xl border bg-white p-8 text-center">
                    <DollarSign className="mx-auto h-10 w-10 text-gray-300" />
                    <h3 className="mt-3 font-semibold text-gray-900">No Programs Found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      We don&apos;t have rebate data for {state} yet. Contact us and we&apos;ll help you research available incentives.
                    </p>
                    <Link href="/contact" className="mt-4 inline-block text-sm font-medium text-yellow-600 hover:underline">
                      Contact Us for Help →
                    </Link>
                  </div>
                ) : (
                  results.map((rebate) => (
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
                  ))
                )}

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
