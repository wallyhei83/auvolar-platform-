'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ChevronRight, Lightbulb, Calculator, Info, ArrowRight } from 'lucide-react'

const spaceTypes = [
  { name: 'Warehouse / Storage', fcRequired: 30, description: 'General storage, aisles' },
  { name: 'Manufacturing - General', fcRequired: 50, description: 'Assembly, packaging' },
  { name: 'Manufacturing - Detailed', fcRequired: 75, description: 'Inspection, fine assembly' },
  { name: 'Office - Open Plan', fcRequired: 40, description: 'Cubicles, open workspace' },
  { name: 'Office - Private', fcRequired: 50, description: 'Private offices, conference rooms' },
  { name: 'Retail - General', fcRequired: 50, description: 'Sales floor, aisles' },
  { name: 'Retail - Highlight', fcRequired: 100, description: 'Display areas, featured merchandise' },
  { name: 'Parking Garage', fcRequired: 10, description: 'Covered parking areas' },
  { name: 'Parking Lot', fcRequired: 5, description: 'Outdoor parking' },
  { name: 'Gymnasium', fcRequired: 50, description: 'Recreation, general sports' },
  { name: 'Classroom', fcRequired: 50, description: 'Educational spaces' },
  { name: 'Healthcare - Exam Room', fcRequired: 75, description: 'Patient examination' },
  { name: 'Kitchen - Commercial', fcRequired: 75, description: 'Food preparation areas' },
]

const fixtureTypes = [
  { name: 'UFO High Bay 100W', lumens: 15000, watts: 100, type: 'highbay' },
  { name: 'UFO High Bay 150W', lumens: 22500, watts: 150, type: 'highbay' },
  { name: 'UFO High Bay 200W', lumens: 30000, watts: 200, type: 'highbay' },
  { name: 'UFO High Bay 240W', lumens: 36000, watts: 240, type: 'highbay' },
  { name: 'Linear High Bay 165W', lumens: 24000, watts: 165, type: 'linear' },
  { name: 'Linear High Bay 220W', lumens: 33000, watts: 220, type: 'linear' },
  { name: '2x4 Flat Panel 50W', lumens: 6500, watts: 50, type: 'panel' },
  { name: '2x2 Flat Panel 40W', lumens: 5000, watts: 40, type: 'panel' },
  { name: '2x4 Troffer 50W', lumens: 6000, watts: 50, type: 'troffer' },
  { name: 'Wall Pack 60W', lumens: 7800, watts: 60, type: 'outdoor' },
  { name: 'Parking Lot 150W', lumens: 21000, watts: 150, type: 'outdoor' },
  { name: 'Parking Lot 300W', lumens: 42000, watts: 300, type: 'outdoor' },
]

const mountingHeights = [
  { label: '8-10 ft (Office/Retail)', value: 9, cu: 0.65 },
  { label: '10-15 ft (Retail/Light Industrial)', value: 12, cu: 0.55 },
  { label: '15-20 ft (Small Warehouse)', value: 17, cu: 0.50 },
  { label: '20-25 ft (Medium Warehouse)', value: 22, cu: 0.45 },
  { label: '25-30 ft (Large Warehouse)', value: 27, cu: 0.40 },
  { label: '30-40 ft (High Bay)', value: 35, cu: 0.35 },
  { label: '40+ ft (Very High Bay)', value: 45, cu: 0.30 },
]

export default function LightingCalculatorPage() {
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [spaceType, setSpaceType] = useState('')
  const [mountingHeight, setMountingHeight] = useState('')
  const [selectedFixture, setSelectedFixture] = useState('')

  const selectedSpace = spaceTypes.find(s => s.name === spaceType)
  const selectedMount = mountingHeights.find(m => m.label === mountingHeight)
  const selectedFixtureData = fixtureTypes.find(f => f.name === selectedFixture)

  const calculation = useMemo(() => {
    if (!length || !width || !selectedSpace || !selectedMount || !selectedFixtureData) {
      return null
    }

    const area = parseFloat(length) * parseFloat(width)
    const targetFC = selectedSpace.fcRequired
    const cu = selectedMount.cu
    const lf = 0.85 // Light loss factor (maintenance)
    
    // Lumen method: Fixtures = (Area × Target FC) / (Lumens per fixture × CU × LF)
    const lumensRequired = (area * targetFC) / (cu * lf)
    const fixturesNeeded = Math.ceil(lumensRequired / selectedFixtureData.lumens)
    const totalWatts = fixturesNeeded * selectedFixtureData.watts
    const wattsPerSqFt = totalWatts / area
    const actualFC = (fixturesNeeded * selectedFixtureData.lumens * cu * lf) / area

    // Spacing calculation
    const aspectRatio = parseFloat(length) / parseFloat(width)
    let rows, cols
    if (aspectRatio > 1.5) {
      cols = Math.ceil(Math.sqrt(fixturesNeeded / aspectRatio))
      rows = Math.ceil(fixturesNeeded / cols)
    } else if (aspectRatio < 0.67) {
      rows = Math.ceil(Math.sqrt(fixturesNeeded * aspectRatio))
      cols = Math.ceil(fixturesNeeded / rows)
    } else {
      rows = Math.ceil(Math.sqrt(fixturesNeeded))
      cols = Math.ceil(fixturesNeeded / rows)
    }
    const rowSpacing = parseFloat(length) / rows
    const colSpacing = parseFloat(width) / cols

    return {
      area,
      targetFC,
      fixturesNeeded,
      totalWatts,
      wattsPerSqFt: wattsPerSqFt.toFixed(2),
      actualFC: actualFC.toFixed(1),
      rows,
      cols,
      rowSpacing: rowSpacing.toFixed(1),
      colSpacing: colSpacing.toFixed(1),
    }
  }, [length, width, selectedSpace, selectedMount, selectedFixtureData])

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
            <span className="text-gray-900">Lighting Calculator</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-black py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-yellow-400 p-3">
              <Calculator className="h-8 w-8 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Lighting Calculator</h1>
              <p className="mt-1 text-gray-400">Estimate fixtures needed for your space</p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Form */}
          <div className="rounded-xl border bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">Room Details</h2>
            <p className="mt-1 text-sm text-gray-500">Enter your space dimensions and requirements</p>

            <div className="mt-6 space-y-4">
              {/* Dimensions */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Length (ft) *</label>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="e.g., 100"
                    className="mt-1 w-full rounded-lg border p-3 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Width (ft) *</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="e.g., 80"
                    className="mt-1 w-full rounded-lg border p-3 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  />
                </div>
              </div>

              {/* Space Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Space Type *</label>
                <select
                  value={spaceType}
                  onChange={(e) => setSpaceType(e.target.value)}
                  className="mt-1 w-full rounded-lg border p-3 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                >
                  <option value="">Select space type...</option>
                  {spaceTypes.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name} ({s.fcRequired} fc)
                    </option>
                  ))}
                </select>
                {selectedSpace && (
                  <p className="mt-1 text-sm text-gray-500">{selectedSpace.description}</p>
                )}
              </div>

              {/* Mounting Height */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Mounting Height *</label>
                <select
                  value={mountingHeight}
                  onChange={(e) => setMountingHeight(e.target.value)}
                  className="mt-1 w-full rounded-lg border p-3 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                >
                  <option value="">Select mounting height...</option>
                  {mountingHeights.map((h) => (
                    <option key={h.label} value={h.label}>{h.label}</option>
                  ))}
                </select>
              </div>

              {/* Fixture Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Fixture Type *</label>
                <select
                  value={selectedFixture}
                  onChange={(e) => setSelectedFixture(e.target.value)}
                  className="mt-1 w-full rounded-lg border p-3 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                >
                  <option value="">Select fixture...</option>
                  {fixtureTypes.map((f) => (
                    <option key={f.name} value={f.name}>
                      {f.name} - {f.lumens.toLocaleString()} lumens
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-6 rounded-lg bg-blue-50 p-4">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                <div className="text-sm text-blue-700">
                  <strong>About This Calculator</strong>
                  <p className="mt-1">
                    This uses the lumen method with standard coefficients of utilization. 
                    For accurate results, request a professional photometric layout.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {calculation ? (
              <>
                {/* Main Result */}
                <div className="rounded-xl border bg-white p-6">
                  <h2 className="text-lg font-semibold text-gray-900">Recommended Fixtures</h2>
                  
                  <div className="mt-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-yellow-500">{calculation.fixturesNeeded}</div>
                      <p className="mt-2 text-gray-600">{selectedFixture}</p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-gray-50 p-4 text-center">
                      <p className="text-2xl font-bold text-gray-900">{calculation.actualFC}</p>
                      <p className="text-sm text-gray-500">Footcandles (avg)</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4 text-center">
                      <p className="text-2xl font-bold text-gray-900">{calculation.totalWatts.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">Total Watts</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4 text-center">
                      <p className="text-2xl font-bold text-gray-900">{calculation.wattsPerSqFt}</p>
                      <p className="text-sm text-gray-500">Watts/sq ft</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4 text-center">
                      <p className="text-2xl font-bold text-gray-900">{calculation.area.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">Total sq ft</p>
                    </div>
                  </div>
                </div>

                {/* Layout Suggestion */}
                <div className="rounded-xl border bg-white p-6">
                  <h3 className="font-semibold text-gray-900">Suggested Layout</h3>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Arrangement</p>
                      <p className="text-lg font-semibold">{calculation.rows} rows × {calculation.cols} columns</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Spacing</p>
                      <p className="text-lg font-semibold">{calculation.rowSpacing}&apos; × {calculation.colSpacing}&apos;</p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="rounded-xl bg-gray-900 p-6 text-center">
                  <h3 className="text-lg font-semibold text-white">Ready to Order?</h3>
                  <p className="mt-2 text-gray-400">
                    Get accurate pricing for {calculation.fixturesNeeded} fixtures
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-3">
                    <Link
                      href="/bc-products"
                      className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-black transition-colors hover:bg-yellow-300"
                    >
                      View Products
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/tools/rfq"
                      className="rounded-lg border border-gray-600 px-6 py-3 font-semibold text-white transition-colors hover:border-gray-500"
                    >
                      Request Quote
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-xl border bg-white p-12 text-center">
                <Lightbulb className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">Enter Room Details</h3>
                <p className="mt-2 text-gray-500">
                  Fill in the room dimensions, space type, and fixture selection to see recommendations.
                </p>
              </div>
            )}

            {/* Professional Layout CTA */}
            <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6">
              <h3 className="font-semibold text-yellow-800">Need a Professional Layout?</h3>
              <p className="mt-2 text-sm text-yellow-700">
                For complex spaces or precise requirements, our lighting engineers can create a detailed 
                photometric layout within 24 hours - free of charge.
              </p>
              <Link
                href="/tools/photometric-request"
                className="mt-4 inline-block text-sm font-medium text-yellow-700 hover:text-yellow-800"
              >
                Request Photometric Layout →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
