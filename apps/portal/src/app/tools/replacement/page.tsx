'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ChevronRight, Search, ArrowRight, Zap, CheckCircle2, 
  DollarSign, Clock, Leaf, ShoppingCart, Info, ChevronDown
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

type Step = 'input' | 'results'

interface LegacyFixture {
  type: string
  wattage: string
  quantity: number
  mountingHeight: string
  hoursPerDay: number
}

interface Recommendation {
  id: string
  name: string
  sku: string
  wattage: number
  lumens: number
  price: number
  stock: string
  dlc: boolean
  warranty: string
  energySavings: number
  payback: number
  badge?: string
}

// Mock recommendations
const getRecommendations = (fixture: LegacyFixture): Recommendation[] => {
  // Simulate different recommendations based on fixture type
  if (fixture.type === 'metal-halide' && fixture.wattage === '400') {
    return [
      {
        id: '1',
        name: 'UFO High Bay 150W',
        sku: 'HB-UFO-150W-5K',
        wattage: 150,
        lumens: 22500,
        price: 89,
        stock: 'In Stock',
        dlc: true,
        warranty: '5 Year',
        energySavings: 63,
        payback: 0.8,
        badge: 'Best Value'
      },
      {
        id: '2',
        name: 'UFO High Bay 200W',
        sku: 'HB-UFO-200W-5K',
        wattage: 200,
        lumens: 30000,
        price: 109,
        stock: 'In Stock',
        dlc: true,
        warranty: '5 Year',
        energySavings: 50,
        payback: 1.1,
        badge: 'Best Output'
      },
      {
        id: '3',
        name: 'Linear High Bay 165W',
        sku: 'LHB-165W-5K',
        wattage: 165,
        lumens: 24750,
        price: 119,
        stock: 'In Stock',
        dlc: true,
        warranty: '5 Year',
        energySavings: 59,
        payback: 1.0,
      }
    ]
  }
  
  if (fixture.type === 'hps' && fixture.wattage === '250') {
    return [
      {
        id: '1',
        name: 'Wall Pack 80W',
        sku: 'WP-80W-5K',
        wattage: 80,
        lumens: 11200,
        price: 79,
        stock: 'In Stock',
        dlc: true,
        warranty: '5 Year',
        energySavings: 68,
        payback: 0.6,
        badge: 'Best Value'
      },
      {
        id: '2',
        name: 'Wall Pack 100W',
        sku: 'WP-100W-5K',
        wattage: 100,
        lumens: 14000,
        price: 99,
        stock: 'In Stock',
        dlc: true,
        warranty: '5 Year',
        energySavings: 60,
        payback: 0.8,
        badge: 'Best Output'
      }
    ]
  }

  // Default recommendations
  return [
    {
      id: '1',
      name: 'UFO High Bay 150W',
      sku: 'HB-UFO-150W-5K',
      wattage: 150,
      lumens: 22500,
      price: 89,
      stock: 'In Stock',
      dlc: true,
      warranty: '5 Year',
      energySavings: 60,
      payback: 0.9,
      badge: 'Recommended'
    }
  ]
}

export default function ReplacementFinderPage() {
  const [step, setStep] = useState<Step>('input')
  const [fixture, setFixture] = useState<LegacyFixture>({
    type: '',
    wattage: '',
    quantity: 10,
    mountingHeight: '',
    hoursPerDay: 12,
  })
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [selectedReco, setSelectedReco] = useState<string | null>(null)
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  const fixtureTypes = [
    { value: 'metal-halide', label: 'Metal Halide (MH)', icon: '💡' },
    { value: 'hps', label: 'High Pressure Sodium (HPS)', icon: '🔶' },
    { value: 'fluorescent', label: 'Fluorescent', icon: '📏' },
    { value: 't12', label: 'T12 Fluorescent', icon: '📏' },
    { value: 't8', label: 'T8 Fluorescent', icon: '📏' },
    { value: 'incandescent', label: 'Incandescent', icon: '💡' },
    { value: 'halogen', label: 'Halogen', icon: '💡' },
    { value: 'other', label: 'Other / Not Sure', icon: '❓' },
  ]

  const wattageOptions: Record<string, string[]> = {
    'metal-halide': ['175', '250', '400', '1000'],
    'hps': ['70', '100', '150', '250', '400'],
    'fluorescent': ['32', '54', '59', '86'],
    't12': ['34', '40', '75'],
    't8': ['17', '25', '32'],
    'incandescent': ['60', '75', '100', '150'],
    'halogen': ['150', '250', '300', '500'],
    'other': ['50', '100', '150', '200', '250', '300', '400', '500', '1000'],
  }

  const handleSearch = () => {
    const results = getRecommendations(fixture)
    setRecommendations(results)
    // Initialize quantities
    const initQty: Record<string, number> = {}
    results.forEach(r => { initQty[r.id] = fixture.quantity })
    setQuantities(initQty)
    setSelectedReco(results[0]?.id || null)
    setStep('results')
  }

  const calculateSavings = (reco: Recommendation) => {
    const legacyWattage = parseInt(fixture.wattage) || 400
    const hoursPerYear = fixture.hoursPerDay * 365
    const kWhSavedPerFixture = ((legacyWattage - reco.wattage) * hoursPerYear) / 1000
    const qty = quantities[reco.id] || fixture.quantity
    const totalKwhSaved = kWhSavedPerFixture * qty
    const annualSavings = totalKwhSaved * 0.12 // $0.12/kWh average
    return { kWhSavedPerFixture, totalKwhSaved, annualSavings }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/tools" className="hover:text-gray-700">Tools</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-gray-900">Replacement Finder</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500">
              <Search className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">LED Replacement Finder</h1>
              <p className="mt-1 text-gray-600">
                Find the right LED replacement for your legacy fixtures. Get energy savings estimates and product recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Step 1: Input */}
        {step === 'input' && (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900">What are you replacing?</h2>
                <p className="mt-1 text-sm text-gray-500">Tell us about your current fixtures</p>
                
                <div className="mt-6 space-y-6">
                  {/* Fixture Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fixture Type *</label>
                    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {fixtureTypes.slice(0, 4).map((type) => (
                        <button
                          key={type.value}
                          onClick={() => setFixture({ ...fixture, type: type.value, wattage: '' })}
                          className={`flex flex-col items-center rounded-lg border-2 p-3 text-center transition-all ${
                            fixture.type === type.value
                              ? 'border-brand bg-brand/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <span className="text-2xl">{type.icon}</span>
                          <span className="mt-1 text-xs font-medium">{type.label}</span>
                        </button>
                      ))}
                    </div>
                    <details className="mt-2">
                      <summary className="cursor-pointer text-sm text-brand">More fixture types</summary>
                      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {fixtureTypes.slice(4).map((type) => (
                          <button
                            key={type.value}
                            onClick={() => setFixture({ ...fixture, type: type.value, wattage: '' })}
                            className={`flex flex-col items-center rounded-lg border-2 p-3 text-center transition-all ${
                              fixture.type === type.value
                                ? 'border-brand bg-brand/5'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <span className="text-2xl">{type.icon}</span>
                            <span className="mt-1 text-xs font-medium">{type.label}</span>
                          </button>
                        ))}
                      </div>
                    </details>
                  </div>

                  {/* Wattage */}
                  {fixture.type && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Wattage *</label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {wattageOptions[fixture.type]?.map((w) => (
                          <button
                            key={w}
                            onClick={() => setFixture({ ...fixture, wattage: w })}
                            className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${
                              fixture.wattage === w
                                ? 'border-brand bg-brand/5 text-brand'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {w}W
                          </button>
                        ))}
                        <input
                          type="number"
                          placeholder="Custom"
                          value={!wattageOptions[fixture.type]?.includes(fixture.wattage) ? fixture.wattage : ''}
                          onChange={(e) => setFixture({ ...fixture, wattage: e.target.value })}
                          className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Quantity & Height */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Number of Fixtures</label>
                      <input
                        type="number"
                        min="1"
                        value={fixture.quantity}
                        onChange={(e) => setFixture({ ...fixture, quantity: parseInt(e.target.value) || 1 })}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Mounting Height</label>
                      <select
                        value={fixture.mountingHeight}
                        onChange={(e) => setFixture({ ...fixture, mountingHeight: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                      >
                        <option value="">Select height</option>
                        <option value="10-15">10-15 ft</option>
                        <option value="15-20">15-20 ft</option>
                        <option value="20-25">20-25 ft</option>
                        <option value="25-30">25-30 ft</option>
                        <option value="30+">30+ ft</option>
                      </select>
                    </div>
                  </div>

                  {/* Operating Hours */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Hours of Operation per Day</label>
                    <input
                      type="range"
                      min="1"
                      max="24"
                      value={fixture.hoursPerDay}
                      onChange={(e) => setFixture({ ...fixture, hoursPerDay: parseInt(e.target.value) })}
                      className="mt-2 w-full"
                    />
                    <div className="mt-1 flex justify-between text-sm text-gray-500">
                      <span>1 hr</span>
                      <span className="font-medium text-gray-900">{fixture.hoursPerDay} hours/day</span>
                      <span>24 hr</span>
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  disabled={!fixture.type || !fixture.wattage}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-3 font-semibold text-black hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Search className="h-5 w-5" />
                  Find LED Replacement
                </button>
              </div>
            </div>

            {/* Help Panel */}
            <div className="space-y-4">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="font-semibold text-gray-900">Common Replacements</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>400W MH → 150W LED High Bay</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>250W HPS → 80W LED Wall Pack</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>T12 Tubes → LED Tubes (Type A+B)</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl bg-green-50 p-5">
                <div className="flex items-center gap-2 text-green-800">
                  <Leaf className="h-5 w-5" />
                  <span className="font-semibold">Average Savings</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-green-900">50-75%</p>
                <p className="text-sm text-green-700">energy reduction with LED upgrades</p>
              </div>

              <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
                <div className="flex items-start gap-2">
                  <Info className="mt-0.5 h-5 w-5 text-blue-600" />
                  <div className="text-sm text-blue-800">
                    <strong>Need help?</strong>
                    <p className="mt-1">
                      Not sure about your fixture specs? <Link href="/support" className="underline">Contact our team</Link> for assistance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Results */}
        {step === 'results' && (
          <div className="space-y-6">
            {/* Back & Summary */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep('input')}
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                ← Modify Search
              </button>
              <div className="text-sm text-gray-600">
                Replacing: <span className="font-semibold">{fixture.quantity}x {fixture.wattage}W {fixtureTypes.find(t => t.value === fixture.type)?.label}</span>
              </div>
            </div>

            {/* Recommendations */}
            <div className="grid gap-4 lg:grid-cols-3">
              {recommendations.map((reco) => {
                const savings = calculateSavings(reco)
                const isSelected = selectedReco === reco.id
                
                return (
                  <div
                    key={reco.id}
                    onClick={() => setSelectedReco(reco.id)}
                    className={`relative cursor-pointer rounded-xl border-2 bg-white p-5 transition-all ${
                      isSelected ? 'border-brand shadow-lg' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {reco.badge && (
                      <span className={`absolute -top-3 left-4 rounded-full px-3 py-1 text-xs font-bold ${
                        reco.badge === 'Best Value' ? 'bg-green-500 text-white' :
                        reco.badge === 'Best Output' ? 'bg-blue-500 text-white' :
                        'bg-brand text-black'
                      }`}>
                        {reco.badge}
                      </span>
                    )}

                    {/* Product Image Placeholder */}
                    <div className="flex h-32 items-center justify-center rounded-lg bg-gray-100">
                      <Zap className="h-12 w-12 text-gray-300" />
                    </div>

                    {/* Product Info */}
                    <div className="mt-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{reco.name}</h3>
                          <p className="text-xs text-gray-500">{reco.sku}</p>
                        </div>
                        {reco.dlc && (
                          <span className="rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-bold text-green-700">
                            DLC
                          </span>
                        )}
                      </div>

                      {/* Specs */}
                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-600">
                        <span className="rounded bg-gray-100 px-2 py-0.5">{reco.wattage}W</span>
                        <span className="rounded bg-gray-100 px-2 py-0.5">{reco.lumens.toLocaleString()} lm</span>
                        <span className="rounded bg-gray-100 px-2 py-0.5">{reco.warranty}</span>
                      </div>

                      {/* Savings */}
                      <div className="mt-4 rounded-lg bg-green-50 p-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-green-700">Energy Savings</span>
                          <span className="font-bold text-green-800">{reco.energySavings}%</span>
                        </div>
                        <div className="mt-1 flex items-center justify-between text-sm">
                          <span className="text-green-700">Annual Savings</span>
                          <span className="font-bold text-green-800">${savings.annualSavings.toFixed(0)}/yr</span>
                        </div>
                        <div className="mt-1 flex items-center justify-between text-sm">
                          <span className="text-green-700">Payback</span>
                          <span className="font-bold text-green-800">{reco.payback} years</span>
                        </div>
                      </div>

                      {/* Price & Stock */}
                      <div className="mt-4 flex items-end justify-between">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">${reco.price}</p>
                          <p className={`text-xs ${reco.stock === 'In Stock' ? 'text-green-600' : 'text-amber-600'}`}>
                            {reco.stock}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="1"
                            value={quantities[reco.id] || fixture.quantity}
                            onChange={(e) => setQuantities({ ...quantities, [reco.id]: parseInt(e.target.value) || 1 })}
                            onClick={(e) => e.stopPropagation()}
                            className="w-16 rounded border border-gray-300 px-2 py-1 text-center text-sm"
                          />
                        </div>
                      </div>

                      {/* Request Quote for this product */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          window.location.href = `/contact?subject=${encodeURIComponent(`Quote Request: ${reco.name}`)}&message=${encodeURIComponent(`I'm interested in ${reco.name} (${reco.sku}), Qty: ${fixture.quantity || 1}. Please send me a quote.`)}`
                        }}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-2.5 font-semibold text-black hover:bg-brand-dark"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Request Quote
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Summary Card */}
            {selectedReco && (
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="font-semibold text-gray-900">Project Summary</h3>
                <div className="mt-4 grid gap-6 sm:grid-cols-4">
                  <div className="text-center">
                    <DollarSign className="mx-auto h-8 w-8 text-green-500" />
                    <p className="mt-2 text-2xl font-bold text-gray-900">
                      ${(calculateSavings(recommendations.find(r => r.id === selectedReco)!).annualSavings).toFixed(0)}
                    </p>
                    <p className="text-sm text-gray-500">Annual Savings</p>
                  </div>
                  <div className="text-center">
                    <Clock className="mx-auto h-8 w-8 text-blue-500" />
                    <p className="mt-2 text-2xl font-bold text-gray-900">
                      {recommendations.find(r => r.id === selectedReco)?.payback} yr
                    </p>
                    <p className="text-sm text-gray-500">Payback Period</p>
                  </div>
                  <div className="text-center">
                    <Leaf className="mx-auto h-8 w-8 text-green-500" />
                    <p className="mt-2 text-2xl font-bold text-gray-900">
                      {calculateSavings(recommendations.find(r => r.id === selectedReco)!).totalKwhSaved.toFixed(0)} kWh
                    </p>
                    <p className="text-sm text-gray-500">Annual kWh Saved</p>
                  </div>
                  <div className="text-center">
                    <Zap className="mx-auto h-8 w-8 text-brand" />
                    <p className="mt-2 text-2xl font-bold text-gray-900">
                      {recommendations.find(r => r.id === selectedReco)?.energySavings}%
                    </p>
                    <p className="text-sm text-gray-500">Energy Reduction</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  <button
                    onClick={() => {
                      const reco = recommendations.find(r => r.id === selectedReco)
                      if (reco) {
                        const savings = calculateSavings(reco)
                        window.location.href = `/contact?subject=${encodeURIComponent(`Project Quote: ${reco.name}`)}&message=${encodeURIComponent(`Replacement Finder Results:\n\nProduct: ${reco.name} (${reco.sku})\nQty: ${fixture.quantity || 1}\nUnit Price: $${reco.price}\nAnnual Savings: $${savings.annualSavings.toFixed(0)}\nPayback: ${reco.payback} yr\n\nPlease send me a detailed project quote.`)}`
                      }
                    }}
                    className="flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-semibold text-black hover:bg-brand-dark"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Request Project Quote
                  </button>
                  <button
                    onClick={() => window.location.href = '/contact'}
                    className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:border-brand hover:text-brand"
                  >
                    Contact Sales Team
                  </button>
                </div>

                <p className="mt-4 text-xs text-gray-500">
                  * Savings estimates based on ${0.12}/kWh electricity cost and {fixture.hoursPerDay} hours/day operation. 
                  Actual savings may vary. Contact us for a detailed project analysis.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
