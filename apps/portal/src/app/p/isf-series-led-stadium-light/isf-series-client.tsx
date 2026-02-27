'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ChevronRight, Shield, Zap, Check, Phone, Mail, FileText,
  Download, Sun, Ruler, Thermometer, Eye
} from 'lucide-react'

const wattageOptions = [
  { watt: 200, lumens: '28,000', replaces: '500W MH', price: 299, sku: 'ISF-200W' },
  { watt: 300, lumens: '42,000', replaces: '750W MH', price: 399, sku: 'ISF-300W' },
  { watt: 400, lumens: '56,000', replaces: '1000W MH', price: 499, sku: 'ISF-400W' },
  { watt: 600, lumens: '84,000', replaces: '1500W MH', price: 699, sku: 'ISF-600W' },
  { watt: 800, lumens: '112,000', replaces: '2000W MH', price: 899, sku: 'ISF-800W' },
  { watt: 1000, lumens: '140,000', replaces: '2500W MH', price: 1099, sku: 'ISF-1000W' },
  { watt: 1200, lumens: '192,000', replaces: '3000W MH', price: 1299, sku: 'ISF-1200W' },
]

const cctOptions = [
  { value: '4000K', label: '4000K Neutral White' },
  { value: '5000K', label: '5000K Daylight' },
  { value: '5700K', label: '5700K Cool White' },
]

const beamOptions = [
  { value: '10°', label: '10° Spot', use: 'Long-throw, high mast' },
  { value: '25°', label: '25° Narrow', use: 'Stadium side throw' },
  { value: '40°', label: '40° Medium', use: 'General sports field' },
  { value: '60°', label: '60° Wide', use: 'Area coverage' },
  { value: '90°', label: '90° Very Wide', use: 'Broad area' },
  { value: '120°', label: '120° Flood', use: 'Maximum spread' },
  { value: '10°×40°', label: '10°×40° Asymmetric', use: 'Sideline throw' },
  { value: '25°×60°', label: '25°×60° Asymmetric', use: 'Field edge' },
]

const features = [
  'Anti-glare optics with precision-molded lenses',
  'Tool-free aiming bracket (±15° vertical, 360° horizontal)',
  'Modular design — stackable for higher output',
  'IP66 rated — rain, dust, and hose-proof',
  '10kV surge protection built-in',
  'Die-cast aluminum housing with powder coat finish',
  'Instant on/off — no warm-up time',
  '0-10V dimming standard',
  'Operating temperature: -40°F to 140°F (-40°C to 60°C)',
  'L70 rated life: 100,000+ hours',
  'UL/cUL listed, DLC Premium certified',
  '5-year warranty',
]

const specs = [
  { label: 'Input Voltage', value: '100-277V / 347V / 480V (universal)' },
  { label: 'Power Factor', value: '> 0.95' },
  { label: 'THD', value: '< 15%' },
  { label: 'CRI', value: '> 70 (> 80 optional)' },
  { label: 'Efficacy', value: '140-160 lm/W' },
  { label: 'IP Rating', value: 'IP66' },
  { label: 'IK Rating', value: 'IK10' },
  { label: 'Surge Protection', value: '10kV / 10kA' },
  { label: 'Operating Temp', value: '-40°F to 140°F' },
  { label: 'Housing', value: 'Die-cast aluminum, powder coated' },
  { label: 'Lens', value: 'Tempered glass, anti-glare coated' },
  { label: 'Mounting', value: 'Adjustable yoke bracket, slip fitter' },
  { label: 'Dimming', value: '0-10V, DALI, DMX (optional)' },
  { label: 'Weight', value: '200W: 15 lbs — 1200W: 88 lbs' },
  { label: 'Certification', value: 'UL/cUL, DLC Premium, FCC, RoHS' },
  { label: 'Warranty', value: '5 years' },
]

export function ISFSeriesClient() {
  const [selectedWatt, setSelectedWatt] = useState(wattageOptions[2]) // 400W default
  const [selectedCCT, setSelectedCCT] = useState(cctOptions[1]) // 5000K default
  const [selectedBeam, setSelectedBeam] = useState(beamOptions[2]) // 40° default

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-brand">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/products" className="hover:text-brand">Products</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/products/outdoor/stadium-light" className="hover:text-brand">Stadium Lights</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">ISF Series</span>
          </nav>
        </div>
      </div>

      {/* Product Hero */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image */}
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center">
                <Sun className="mx-auto h-32 w-32 text-gray-300" />
                <p className="mt-4 text-gray-400 text-lg">ISF Series Stadium Light</p>
                <p className="text-gray-400">{selectedWatt.watt}W</p>
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                In Stock — Ships in 24h
              </div>
              <h1 className="mt-3 text-3xl font-bold text-gray-900">
                ISF Series LED Stadium Light
              </h1>
              <p className="mt-2 text-gray-500">
                Professional grade stadium flood light with anti-glare optics and tool-free aiming.
                Perfect for sports fields, arenas, and large venue lighting.
              </p>

              {/* Price */}
              <div className="mt-6">
                <span className="text-4xl font-bold text-brand">${selectedWatt.price}</span>
                <span className="ml-2 text-gray-500">/ fixture</span>
              </div>

              {/* Quick Specs */}
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-brand" />
                  <span>{selectedWatt.lumens} lumens</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4 text-brand" />
                  <span>Replaces {selectedWatt.replaces}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-brand" />
                  <span>Beam: {selectedBeam.value}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-brand" />
                  <span>{selectedCCT.value}</span>
                </div>
              </div>

              {/* Wattage Selection */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-900">Wattage</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {wattageOptions.map((w) => (
                    <button
                      key={w.watt}
                      onClick={() => setSelectedWatt(w)}
                      className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                        selectedWatt.watt === w.watt
                          ? 'border-brand bg-brand/10 text-brand'
                          : 'border-gray-200 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {w.watt}W
                    </button>
                  ))}
                </div>
              </div>

              {/* CCT Selection */}
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-900">Color Temperature</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {cctOptions.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setSelectedCCT(c)}
                      className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                        selectedCCT.value === c.value
                          ? 'border-brand bg-brand/10 text-brand'
                          : 'border-gray-200 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Beam Angle Selection */}
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-900">Beam Angle</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {beamOptions.map((b) => (
                    <button
                      key={b.value}
                      onClick={() => setSelectedBeam(b)}
                      className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                        selectedBeam.value === b.value
                          ? 'border-brand bg-brand/10 text-brand'
                          : 'border-gray-200 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <span>{b.value}</span>
                      <span className="ml-1 text-xs text-gray-400">({b.use})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* SKU */}
              <div className="mt-4 text-sm text-gray-500">
                SKU: {selectedWatt.sku}-{selectedCCT.value}-{selectedBeam.value.replace('°', 'D').replace('×', 'x')}
              </div>

              {/* CTA Buttons */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/tools/rfq?product=ISF+Series+${selectedWatt.watt}W&sku=${selectedWatt.sku}`}
                  className="flex-1 rounded-lg bg-brand px-6 py-3 text-center font-semibold text-black hover:bg-brand-dark"
                >
                  Request Quote
                </Link>
                <Link
                  href="/contact"
                  className="flex-1 rounded-lg border border-gray-300 px-6 py-3 text-center font-semibold text-gray-700 hover:border-brand hover:text-brand"
                >
                  Contact Sales
                </Link>
              </div>

              {/* Contact */}
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                <a href="tel:+16263428856" className="flex items-center gap-1 hover:text-brand">
                  <Phone className="h-4 w-4" /> (626) 342-8856
                </a>
                <a href="mailto:sales@auvolar.com" className="flex items-center gap-1 hover:text-brand">
                  <Mail className="h-4 w-4" /> sales@auvolar.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">ISF Series Features</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f} className="flex items-start gap-2">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                <span className="text-gray-700">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs Table */}
      <section className="border-t bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">Technical Specifications</h2>
          <div className="mt-6 overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full">
              <tbody>
                {specs.map((s, i) => (
                  <tr key={s.label} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 w-1/3">{s.label}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Wattage/Lumen Table */}
          <h3 className="mt-8 text-lg font-semibold text-gray-900">Output by Wattage</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Wattage</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Lumens</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Replaces</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">SKU</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Price</th>
                </tr>
              </thead>
              <tbody>
                {wattageOptions.map((w, i) => (
                  <tr key={w.watt} className={`border-b ${i % 2 === 0 ? '' : 'bg-gray-50'}`}>
                    <td className="px-4 py-2 font-medium">{w.watt}W</td>
                    <td className="px-4 py-2">{w.lumens} lm</td>
                    <td className="px-4 py-2">{w.replaces}</td>
                    <td className="px-4 py-2 text-gray-500">{w.sku}</td>
                    <td className="px-4 py-2 font-semibold text-brand">${w.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Also View */}
      <section className="border-t bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900">Also in Stadium Lights</h2>
          <div className="mt-4">
            <Link
              href="/p/ins-series-led-stadium-light"
              className="inline-flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 hover:border-brand hover:shadow-sm"
            >
              <Sun className="h-12 w-12 text-gray-300" />
              <div>
                <h3 className="font-semibold text-gray-900">INS Series LED Stadium Light</h3>
                <p className="text-sm text-gray-500">300W-1800W | Industrial grade, heavy-duty housing | From $399</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
