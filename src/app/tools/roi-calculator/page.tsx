'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { 
  ChevronRight, Calculator, DollarSign, Clock, Leaf, Zap,
  Download, ArrowRight, Info, TrendingUp
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

interface CalculatorInputs {
  currentFixtureType: string
  currentWattage: number
  numberOfFixtures: number
  hoursPerDay: number
  daysPerYear: number
  electricityRate: number
  ledWattage: number
  ledCost: number
  installationCost: number
  maintenanceSavings: number
}

const defaultInputs: CalculatorInputs = {
  currentFixtureType: 'metal-halide',
  currentWattage: 400,
  numberOfFixtures: 50,
  hoursPerDay: 12,
  daysPerYear: 260,
  electricityRate: 0.12,
  ledWattage: 150,
  ledCost: 89,
  installationCost: 50,
  maintenanceSavings: 25,
}

const fixtureTypes = [
  { value: 'metal-halide', label: 'Metal Halide', typicalWattage: [175, 250, 400, 1000] },
  { value: 'hps', label: 'High Pressure Sodium', typicalWattage: [70, 100, 150, 250, 400] },
  { value: 'fluorescent', label: 'Fluorescent', typicalWattage: [32, 54, 59, 86] },
  { value: 't12', label: 'T12 Fluorescent', typicalWattage: [34, 40, 75] },
  { value: 'incandescent', label: 'Incandescent', typicalWattage: [60, 75, 100, 150] },
]

export default function ROICalculatorPage() {
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const updateInput = (key: keyof CalculatorInputs, value: number | string) => {
    setInputs(prev => ({ ...prev, [key]: value }))
  }

  const results = useMemo(() => {
    const hoursPerYear = inputs.hoursPerDay * inputs.daysPerYear
    const currentKwhPerYear = (inputs.currentWattage / 1000) * hoursPerYear * inputs.numberOfFixtures
    const ledKwhPerYear = (inputs.ledWattage / 1000) * hoursPerYear * inputs.numberOfFixtures
    const kwhSaved = currentKwhPerYear - ledKwhPerYear
    
    const currentEnergyCost = currentKwhPerYear * inputs.electricityRate
    const ledEnergyCost = ledKwhPerYear * inputs.electricityRate
    const annualEnergySavings = currentEnergyCost - ledEnergyCost
    
    const annualMaintenanceSavings = inputs.maintenanceSavings * inputs.numberOfFixtures
    const totalAnnualSavings = annualEnergySavings + annualMaintenanceSavings
    
    const totalProjectCost = (inputs.ledCost + inputs.installationCost) * inputs.numberOfFixtures
    const simplePayback = totalProjectCost / totalAnnualSavings
    
    const fiveYearSavings = (totalAnnualSavings * 5) - totalProjectCost
    const tenYearSavings = (totalAnnualSavings * 10) - totalProjectCost
    
    const energyReduction = ((currentKwhPerYear - ledKwhPerYear) / currentKwhPerYear) * 100
    const co2Saved = kwhSaved * 0.0004 // kg per kWh average
    
    return {
      currentKwhPerYear,
      ledKwhPerYear,
      kwhSaved,
      currentEnergyCost,
      ledEnergyCost,
      annualEnergySavings,
      annualMaintenanceSavings,
      totalAnnualSavings,
      totalProjectCost,
      simplePayback,
      fiveYearSavings,
      tenYearSavings,
      energyReduction,
      co2Saved,
    }
  }, [inputs])

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
            <span className="font-medium text-gray-900">ROI Calculator</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">LED ROI Calculator</h1>
              <p className="mt-1 text-gray-600">
                Calculate energy savings, payback period, and total return on investment for LED upgrades
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Calculator Inputs */}
          <div className="space-y-6">
            {/* Current Lighting */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Current Lighting</h2>
              
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fixture Type</label>
                  <select
                    value={inputs.currentFixtureType}
                    onChange={(e) => updateInput('currentFixtureType', e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  >
                    {fixtureTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Current Wattage per Fixture
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <input
                      type="number"
                      value={inputs.currentWattage}
                      onChange={(e) => updateInput('currentWattage', parseInt(e.target.value) || 0)}
                      className="w-32 rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                    />
                    <span className="text-gray-500">watts</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {fixtureTypes.find(t => t.value === inputs.currentFixtureType)?.typicalWattage.map((w) => (
                      <button
                        key={w}
                        onClick={() => updateInput('currentWattage', w)}
                        className={`rounded px-2 py-1 text-xs ${
                          inputs.currentWattage === w
                            ? 'bg-brand text-black font-semibold'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {w}W
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Number of Fixtures
                  </label>
                  <input
                    type="number"
                    value={inputs.numberOfFixtures}
                    onChange={(e) => updateInput('numberOfFixtures', parseInt(e.target.value) || 0)}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Operating Hours</h2>
              
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Hours per Day</label>
                  <input
                    type="number"
                    value={inputs.hoursPerDay}
                    onChange={(e) => updateInput('hoursPerDay', parseInt(e.target.value) || 0)}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Days per Year</label>
                  <input
                    type="number"
                    value={inputs.daysPerYear}
                    onChange={(e) => updateInput('daysPerYear', parseInt(e.target.value) || 0)}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>
              </div>
              
              <p className="mt-3 text-sm text-gray-500">
                Total: {(inputs.hoursPerDay * inputs.daysPerYear).toLocaleString()} hours/year
              </p>
            </div>

            {/* LED Replacement */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">LED Replacement</h2>
              
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">LED Wattage</label>
                  <input
                    type="number"
                    value={inputs.ledWattage}
                    onChange={(e) => updateInput('ledWattage', parseInt(e.target.value) || 0)}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">LED Cost per Unit ($)</label>
                  <input
                    type="number"
                    value={inputs.ledCost}
                    onChange={(e) => updateInput('ledCost', parseInt(e.target.value) || 0)}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>
              </div>
              
              <Link href="/tools/replacement" className="mt-3 inline-flex items-center gap-1 text-sm text-brand hover:underline">
                Find recommended LED replacement →
              </Link>
            </div>

            {/* Advanced Settings */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex w-full items-center justify-between p-6"
              >
                <span className="font-semibold text-gray-900">Advanced Settings</span>
                <ChevronRight className={`h-5 w-5 transition-transform ${showAdvanced ? 'rotate-90' : ''}`} />
              </button>
              
              {showAdvanced && (
                <div className="border-t border-gray-200 p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Electricity Rate ($/kWh)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={inputs.electricityRate}
                        onChange={(e) => updateInput('electricityRate', parseFloat(e.target.value) || 0)}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Installation Cost ($/unit)</label>
                      <input
                        type="number"
                        value={inputs.installationCost}
                        onChange={(e) => updateInput('installationCost', parseInt(e.target.value) || 0)}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Annual Maintenance Savings ($/fixture)</label>
                      <input
                        type="number"
                        value={inputs.maintenanceSavings}
                        onChange={(e) => updateInput('maintenanceSavings', parseInt(e.target.value) || 0)}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                      />
                      <p className="mt-1 text-xs text-gray-500">Includes lamp/ballast replacements, labor, lift rentals, etc.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-green-500 p-6 text-white">
                <DollarSign className="h-8 w-8" />
                <p className="mt-2 text-3xl font-bold">${results.totalAnnualSavings.toLocaleString()}</p>
                <p className="text-green-100">Annual Savings</p>
              </div>
              
              <div className="rounded-xl bg-blue-500 p-6 text-white">
                <Clock className="h-8 w-8" />
                <p className="mt-2 text-3xl font-bold">{results.simplePayback.toFixed(1)} years</p>
                <p className="text-blue-100">Simple Payback</p>
              </div>
              
              <div className="rounded-xl bg-purple-500 p-6 text-white">
                <TrendingUp className="h-8 w-8" />
                <p className="mt-2 text-3xl font-bold">${results.fiveYearSavings.toLocaleString()}</p>
                <p className="text-purple-100">5-Year Net Savings</p>
              </div>
              
              <div className="rounded-xl bg-emerald-500 p-6 text-white">
                <Leaf className="h-8 w-8" />
                <p className="mt-2 text-3xl font-bold">{results.energyReduction.toFixed(0)}%</p>
                <p className="text-emerald-100">Energy Reduction</p>
              </div>
            </div>

            {/* Detailed Results */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900">Detailed Analysis</h3>
              
              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Energy Consumption</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Current annual consumption</span>
                      <span className="font-medium">{results.currentKwhPerYear.toLocaleString()} kWh</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">LED annual consumption</span>
                      <span className="font-medium">{results.ledKwhPerYear.toLocaleString()} kWh</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Annual kWh saved</span>
                      <span className="font-semibold">{results.kwhSaved.toLocaleString()} kWh</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h4 className="text-sm font-medium text-gray-700">Cost Analysis</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Current annual energy cost</span>
                      <span className="font-medium">${results.currentEnergyCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">LED annual energy cost</span>
                      <span className="font-medium">${results.ledEnergyCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Annual energy savings</span>
                      <span className="font-semibold">${results.annualEnergySavings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Annual maintenance savings</span>
                      <span className="font-semibold">${results.annualMaintenanceSavings.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h4 className="text-sm font-medium text-gray-700">Project Investment</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">LED fixtures ({inputs.numberOfFixtures} × ${inputs.ledCost})</span>
                      <span className="font-medium">${(inputs.numberOfFixtures * inputs.ledCost).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Installation ({inputs.numberOfFixtures} × ${inputs.installationCost})</span>
                      <span className="font-medium">${(inputs.numberOfFixtures * inputs.installationCost).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold">
                      <span>Total project cost</span>
                      <span>${results.totalProjectCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h4 className="text-sm font-medium text-gray-700">Long-Term Savings</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">5-year net savings</span>
                      <span className="font-semibold text-green-600">${results.fiveYearSavings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">10-year net savings</span>
                      <span className="font-semibold text-green-600">${results.tenYearSavings.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-semibold text-black hover:bg-brand-dark">
                <Download className="h-4 w-4" />
                Download PDF Report
              </button>
              <Link
                href="/tools/rfq"
                className="flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:border-brand hover:text-brand"
              >
                Request Project Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Disclaimer */}
            <div className="rounded-lg bg-blue-50 p-4">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 text-blue-600" />
                <p className="text-xs text-blue-800">
                  <strong>Disclaimer:</strong> This calculator provides estimates based on the inputs provided. 
                  Actual savings may vary based on local utility rates, rebates, maintenance practices, and 
                  other factors. Contact us for a detailed project analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
