'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ChevronRight, Search, ArrowRight, Zap, CheckCircle2, 
  DollarSign, Clock, Leaf, ShoppingCart, Info, ChevronDown
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { useCart } from '@/lib/cart-context'

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
  bcProductId: number
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
  image?: string
}

// Mock recommendations
const getRecommendations = (fixture: LegacyFixture): Recommendation[] => {
  // Simulate different recommendations based on fixture type
  if (fixture.type === 'metal-halide' && fixture.wattage === '400') {
    return [
      {
        id: '201',
        bcProductId: 201,
        name: 'UFO High Bay LED Light 150W',
        sku: 'HB-UFO-150W',
        wattage: 150,
        lumens: 22500,
        price: 89,
        stock: 'In Stock',
        dlc: true,
        warranty: '5 Year',
        energySavings: 63,
        payback: 0.8,
        badge: 'Best Value',
        image: 'https://cdn11.bigcommerce.com/s-hhcdvxqxzq/products/156/images/453/Highbay_Light_OH60W-240W_01__39759.1770882597.386.513.jpg?c=1',
      },
      {
        id: '202',
        bcProductId: 202,
        name: 'UFO High Bay LED Light 200W',
        sku: 'HB-UFO-200W',
        wattage: 200,
        lumens: 30000,
        price: 109,
        stock: 'In Stock',
        dlc: true,
        warranty: '5 Year',
        energySavings: 50,
        payback: 1.1,
        badge: 'Best Output',
        image: 'https://cdn11.bigcommerce.com/s-hhcdvxqxzq/products/182/images/488/Highbay_Light_HBA100W-200W_03__99308.1770887179.386.513.jpg?c=1',
      },
      {
        id: '204',
        bcProductId: 204,
        name: 'Linear High Bay LED 165W',
        sku: 'LHB-165W',
        wattage: 165,
        lumens: 24750,
        price: 99,
        stock: 'In Stock',
        dlc: true,
        warranty: '5 Year',
        energySavings: 59,
        payback: 1.0,
        image: 'https://cdn11.bigcommerce.com/s-hhcdvxqxzq/products/165/images/467/WPS20260212160345__76337.1770884624.386.513.png?c=1',
      }
    ]
  }
  
  if (fixture.type === 'hps' && fixture.wattage === '250') {
    return [
      {
        id: '130',
        bcProductId: 130,
        name: 'Wall Pack Light WP Series',
        sku: 'AN-WP26W',
        wattage: 80,
        lumens: 11200,
        price: 42,
        stock: 'In Stock',
        dlc: true,
        warranty: '5 Year',
        energySavings: 68,
        payback: 0.6,
        badge: 'Best Value',
        image: 'https://cdn11.bigcommerce.com/s-hhcdvxqxzq/products/130/images/405/QQ20260212-142924__81406.1770878366.386.513.png?c=1',
      },
      {
        id: '147',
        bcProductId: 147,
        name: 'Wall Pack Light SCWP Series',
        sku: 'AN-SCWP',
        wattage: 100,
        lumens: 14000,
        price: 110,
        stock: 'In Stock',
        dlc: true,
        warranty: '5 Year',
        energySavings: 60,
        payback: 0.8,
        badge: 'Best Output',
        image: 'https://cdn11.bigcommerce.com/s-hhcdvxqxzq/products/147/images/437/Application____40269.png',
      }
    ]
  }

  // Default recommendations
  return [
    {
      id: '201',
      bcProductId: 201,
      name: 'UFO High Bay LED Light 150W',
      sku: 'HB-UFO-150W',
      wattage: 150,
      lumens: 22500,
      price: 89,
      stock: 'In Stock',
      dlc: true,
      warranty: '5 Year',
      energySavings: 60,
      payback: 0.9,
      badge: 'Recommended',
      image: 'https://cdn11.bigcommerce.com/s-hhcdvxqxzq/products/156/images/453/Highbay_Light_OH60W-240W_01__39759.1770882597.386.513.jpg?c=1',
    }
  ]
}

export default function ReplacementFinderPage() {
  const { addToCart } = useCart()
  const [addedToCart, setAddedToCart] = useState<Record<string, boolean>>({})
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

                    {/* Product Image */}
                    <Link
                      href={`/bc-products?id=${reco.bcProductId}`}
                      onClick={(e) => e.stopPropagation()}
                      className="block h-32 rounded-lg bg-gray-100 overflow-hidden hover:opacity-80 transition-opacity"
                    >
                      {reco.image ? (
                        <img src={reco.image} alt={reco.name} className="h-full w-full object-contain p-2" />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Zap className="h-12 w-12 text-gray-300" />
                        </div>
                      )}
                    </Link>

                    {/* Product Info */}
                    <div className="mt-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <Link
                            href={`/bc-products?id=${reco.bcProductId}`}
                            onClick={(e) => e.stopPropagation()}
                            className="font-semibold text-gray-900 hover:text-brand transition-colors"
                          >
                            {reco.name}
                          </Link>
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

                      {/* Add to Cart */}
                      <button
                        onClick={async (e) => {
                          e.stopPropagation()
                          const qty = quantities[reco.id] || fixture.quantity || 1
                          await addToCart({
                            productId: reco.bcProductId,
                            name: reco.name,
                            sku: reco.sku,
                            price: reco.price,
                            quantity: qty,
                          })
                          setAddedToCart(prev => ({ ...prev, [reco.id]: true }))
                          setTimeout(() => setAddedToCart(prev => ({ ...prev, [reco.id]: false })), 2000)
                        }}
                        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 font-semibold ${
                          addedToCart[reco.id] 
                            ? 'bg-green-500 text-white' 
                            : 'bg-brand text-black hover:bg-brand-dark'
                        }`}
                      >
                        {addedToCart[reco.id] ? (
                          <>
                            <CheckCircle2 className="h-4 w-4" />
                            Added!
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="h-4 w-4" />
                            Add to Cart
                          </>
                        )}
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
                    onClick={async () => {
                      for (const reco of recommendations) {
                        const qty = quantities[reco.id] || fixture.quantity || 1
                        await addToCart({
                          productId: reco.bcProductId,
                          name: reco.name,
                          sku: reco.sku,
                          price: reco.price,
                          quantity: qty,
                        })
                      }
                      const allAdded: Record<string, boolean> = {}
                      recommendations.forEach(r => allAdded[r.id] = true)
                      setAddedToCart(allAdded)
                      setTimeout(() => setAddedToCart({}), 2000)
                    }}
                    className="flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-semibold text-black hover:bg-brand-dark"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add All to Cart
                  </button>
                  <button
                    onClick={() => {
                      const reco = recommendations.find(r => r.id === selectedReco)
                      if (reco) {
                        const savings = calculateSavings(reco)
                        window.location.href = `/contact?subject=${encodeURIComponent(`Project Quote: ${reco.name}`)}&message=${encodeURIComponent(`Product: ${reco.name} (${reco.sku})\nQty: ${fixture.quantity || 1}\nUnit Price: $${reco.price}\nAnnual Savings: $${savings.annualSavings.toFixed(0)}\nPayback: ${reco.payback} yr\n\nPlease send me a detailed project quote.`)}`
                      }
                    }}
                    className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:border-brand hover:text-brand"
                  >
                    Request Project Quote
                  </button>
                  <button
                    onClick={() => {
                      const selected = recommendations.find(r => r.id === selectedReco)
                      const rows = recommendations.map(reco => {
                        const s = calculateSavings(reco)
                        const qty = quantities[reco.id] || fixture.quantity || 1
                        return `<tr>
                          <td style="padding:8px;border:1px solid #ddd;">${reco.name}</td>
                          <td style="padding:8px;border:1px solid #ddd;">${reco.sku}</td>
                          <td style="padding:8px;border:1px solid #ddd;text-align:center;">${reco.wattage}W</td>
                          <td style="padding:8px;border:1px solid #ddd;text-align:center;">${reco.lumens.toLocaleString()} lm</td>
                          <td style="padding:8px;border:1px solid #ddd;text-align:center;">${qty}</td>
                          <td style="padding:8px;border:1px solid #ddd;text-align:right;">$${reco.price}</td>
                          <td style="padding:8px;border:1px solid #ddd;text-align:right;">$${(reco.price * qty).toFixed(0)}</td>
                          <td style="padding:8px;border:1px solid #ddd;text-align:center;">${reco.energySavings}%</td>
                          <td style="padding:8px;border:1px solid #ddd;text-align:right;">$${s.annualSavings.toFixed(0)}/yr</td>
                          <td style="padding:8px;border:1px solid #ddd;text-align:center;">${reco.payback} yr</td>
                          <td style="padding:8px;border:1px solid #ddd;text-align:center;">${reco.dlc ? 'Yes' : 'No'}</td>
                          <td style="padding:8px;border:1px solid #ddd;">${reco.warranty}</td>
                        </tr>`
                      }).join('')
                      const totalCost = recommendations.reduce((sum, r) => sum + r.price * (quantities[r.id] || fixture.quantity || 1), 0)
                      const totalSavings = recommendations.reduce((sum, r) => sum + calculateSavings(r).annualSavings, 0)
                      const w = window.open('', '_blank')
                      if (w) {
                        w.document.write(`<!DOCTYPE html><html><head><title>Auvolar Replacement Finder Summary</title>
                          <style>body{font-family:Arial,sans-serif;padding:40px;color:#333}table{border-collapse:collapse;width:100%}th{background:#FFD60A;padding:10px;border:1px solid #ddd;text-align:left;font-size:12px}td{font-size:12px}h1{color:#000}h2{color:#555;margin-top:30px}.footer{margin-top:40px;padding-top:20px;border-top:2px solid #FFD60A;font-size:11px;color:#888}.logo{font-size:28px;font-weight:bold;color:#000}.highlight{background:#f0fdf4;font-weight:bold}</style></head><body>
                          <div class="logo">AUVOLAR</div>
                          <h1>LED Replacement Summary</h1>
                          <p><strong>Current Fixture:</strong> ${fixture.type.replace('-', ' ').toUpperCase()} ${fixture.wattage}W × ${fixture.quantity} units | ${fixture.hoursPerDay} hrs/day</p>
                          <h2>Recommended LED Replacements</h2>
                          <table><thead><tr><th>Product</th><th>SKU</th><th>Watts</th><th>Lumens</th><th>Qty</th><th>Unit $</th><th>Total $</th><th>Savings</th><th>Annual</th><th>Payback</th><th>DLC</th><th>Warranty</th></tr></thead><tbody>${rows}</tbody>
                          <tfoot><tr class="highlight"><td colspan="6" style="padding:8px;border:1px solid #ddd;"><strong>Total</strong></td><td style="padding:8px;border:1px solid #ddd;text-align:right;"><strong>$${totalCost.toFixed(0)}</strong></td><td colspan="2" style="padding:8px;border:1px solid #ddd;text-align:right;"><strong>$${totalSavings.toFixed(0)}/yr</strong></td><td colspan="3" style="padding:8px;border:1px solid #ddd;"></td></tr></tfoot></table>
                          <div class="footer"><p>Generated by Auvolar Replacement Finder | www.auvolar.com | sales@auvolar.com</p><p>* Savings based on $0.12/kWh. Actual savings may vary.</p></div>
                          <script>setTimeout(()=>window.print(),500)<\/script></body></html>`)
                        w.document.close()
                      }
                    }}
                    className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:border-brand hover:text-brand"
                  >
                    Download Summary PDF
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
