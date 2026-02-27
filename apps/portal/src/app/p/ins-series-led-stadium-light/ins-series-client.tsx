'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ChevronLeft, ChevronRight, Check, CheckCircle2, Clock,
  ShoppingCart, Plus, Minus, Phone, Mail, FileText, Download,
  Award, Truck, Shield, Zap, Sun
} from 'lucide-react'

const wattageOptions = [
  { watt: 300, lumens: '42,000', replaces: '750W MH', price: 399, sku: 'INS-300W' },
  { watt: 500, lumens: '75,000', replaces: '1250W MH', price: 599, sku: 'INS-500W' },
  { watt: 600, lumens: '90,000', replaces: '1500W MH', price: 699, sku: 'INS-600W' },
  { watt: 800, lumens: '120,000', replaces: '2000W MH', price: 899, sku: 'INS-800W' },
  { watt: 1000, lumens: '150,000', replaces: '2500W MH', price: 1099, sku: 'INS-1000W' },
  { watt: 1200, lumens: '180,000', replaces: '3000W MH', price: 1399, sku: 'INS-1200W' },
  { watt: 1500, lumens: '225,000', replaces: '4000W MH', price: 1699, sku: 'INS-1500W' },
  { watt: 1800, lumens: '270,000', replaces: '5000W MH', price: 1899, sku: 'INS-1800W' },
]

const cctOptions = ['4000K', '5000K', '5700K']

const beamOptions = [
  { value: '15°', use: 'Long-throw, 100ft+ poles' },
  { value: '30°', use: 'High-mast focused' },
  { value: '45°', use: 'General stadium' },
  { value: '60°', use: 'Area coverage' },
  { value: '90°', use: 'Maximum spread' },
  { value: '15°×45°', use: 'Asymmetric sideline' },
  { value: '30°×60°', use: 'Asymmetric field' },
]

export function INSSeriesClient() {
  const [selectedWatt, setSelectedWatt] = useState(wattageOptions[2]) // 600W default
  const [selectedCCT, setSelectedCCT] = useState('5000K')
  const [selectedBeam, setSelectedBeam] = useState(beamOptions[2]) // 45°
  const [quantity, setQuantity] = useState(1)

  const sku = `${selectedWatt.sku}-${selectedCCT}-${selectedBeam.value.replace('°', 'D').replace('×', 'x')}`

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-yellow-600">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-yellow-600">Products</Link>
        <span>/</span>
        <Link href="/products/outdoor/stadium-light" className="hover:text-yellow-600">Stadium Lights</Link>
        <span>/</span>
        <span className="text-gray-900">INS Series</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="relative aspect-[4/3] bg-white rounded-2xl border overflow-hidden">
            <div className="w-full h-full flex items-center justify-center p-8">
              <div className="text-center">
                <Sun className="mx-auto h-32 w-32 text-gray-300" />
                <p className="mt-4 text-lg text-gray-400">INS Series Stadium Light</p>
                <p className="text-gray-400">{selectedWatt.watt}W | {selectedBeam.value}</p>
              </div>
            </div>
            <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              New Series
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">INS Series LED Stadium Light</h1>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm text-gray-500">SKU: {sku}</span>
            <span className="text-sm text-gray-300">|</span>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600 font-medium">In Stock</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-bold text-gray-900">${selectedWatt.price.toFixed(2)}</span>
            <span className="text-xl text-gray-400 line-through">${(selectedWatt.price * 1.5).toFixed(2)}</span>
            <span className="text-sm text-red-500 font-semibold bg-red-50 px-2 py-1 rounded">
              -33%
            </span>
          </div>

          {/* Description Card — same style as OT */}
          <div className="mb-6 border rounded-xl overflow-hidden">
            <div className="p-4 bg-gray-50">
              <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-500" />
                Industrial Grade — Built for the Most Demanding Environments
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Heavy-duty construction with IP67 rating, 20kV surge protection, and stainless steel hardware. Designed for professional stadiums, ports, airports, and industrial yards. Replaces {selectedWatt.replaces} — {selectedWatt.lumens} lumens.
              </p>
            </div>
            <details className="group">
              <summary className="cursor-pointer px-4 py-2 text-yellow-600 hover:text-yellow-700 font-medium text-xs flex items-center gap-1 bg-white border-t">
                Learn more
                <svg className="w-3 h-3 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-4 pb-4 pt-2 space-y-3 text-sm text-gray-600 bg-white">
                <div className="flex gap-2"><span className="text-yellow-500 font-bold">•</span><div><strong className="text-gray-900">Asymmetric Optics</strong> — Precision beam control for field-side and end-zone coverage without spillage.</div></div>
                <div className="flex gap-2"><span className="text-yellow-500 font-bold">•</span><div><strong className="text-gray-900">Heavy-Duty Housing</strong> — 3mm die-cast aluminum with stainless steel 304 hardware. IK10 impact rated.</div></div>
                <div className="flex gap-2"><span className="text-yellow-500 font-bold">•</span><div><strong className="text-gray-900">IP67 Fully Sealed</strong> — Complete dust and water ingress protection. Built for coastal, industrial, and extreme weather environments.</div></div>
                <div className="flex gap-2"><span className="text-yellow-500 font-bold">•</span><div><strong className="text-gray-900">20kV/20kA Surge Protection</strong> — Industrial-grade surge protection exceeds standard requirements.</div></div>
                <div className="flex gap-2"><span className="text-yellow-500 font-bold">•</span><div><strong className="text-gray-900">Smart Controls Ready</strong> — 0-10V, DALI, DMX dimming. Optional Zigbee/Bluetooth wireless controls.</div></div>
                <div className="flex gap-2"><span className="text-yellow-500 font-bold">•</span><div><strong className="text-gray-900">Field-Serviceable Modules</strong> — Independent module design allows on-site replacement without removing the entire fixture.</div></div>
              </div>
            </details>
          </div>

          {/* Variant Selection */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Wattage: <span className="text-gray-900">{selectedWatt.watt}W ({selectedWatt.lumens} lm, replaces {selectedWatt.replaces})</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {wattageOptions.map(w => (
                  <button
                    key={w.watt}
                    onClick={() => setSelectedWatt(w)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                      selectedWatt.watt === w.watt
                        ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                        : 'border-gray-200 hover:border-gray-400 text-gray-700'
                    }`}
                  >
                    {w.watt}W
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Color Temperature: <span className="text-gray-900">{selectedCCT}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {cctOptions.map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedCCT(c)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                      selectedCCT === c
                        ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                        : 'border-gray-200 hover:border-gray-400 text-gray-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Beam Angle: <span className="text-gray-900">{selectedBeam.value} — {selectedBeam.use}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {beamOptions.map(b => (
                  <button
                    key={b.value}
                    onClick={() => setSelectedBeam(b)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                      selectedBeam.value === b.value
                        ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                        : 'border-gray-200 hover:border-gray-400 text-gray-700'
                    }`}
                  >
                    {b.value}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-gray-400">SKU: {sku}</p>
          </div>

          {/* Quantity + Request Quote */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-50"><Minus className="w-4 h-4" /></button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-50"><Plus className="w-4 h-4" /></button>
            </div>
            <Link
              href={`/contact?subject=Quote: INS Series ${selectedWatt.watt}W&message=${encodeURIComponent(`I'd like a quote for INS Series ${selectedWatt.watt}W Stadium Light.\n\nConfig: ${selectedCCT}, ${selectedBeam.value}\nSKU: ${sku}\nQuantity: ${quantity}`)}`}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold bg-yellow-400 hover:bg-yellow-500 text-black transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              Request Quote
            </Link>
          </div>

          <Link
            href="tel:+16263428856"
            className="block text-center py-3 px-6 border-2 border-gray-900 rounded-lg font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition-all mb-8"
          >
            Call for Volume Pricing: (626) 342-8856
          </Link>

          {/* Downloads */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Downloads &amp; Resources</h3>
            <div className="grid grid-cols-2 gap-2">
              <a href="/contact?subject=INS+Series+Spec+Sheet+Request" className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 text-sm">
                <FileText className="w-4 h-4 text-yellow-600" /><span>Spec Sheet</span>
              </a>
              <a href="/contact?subject=INS+Series+IES+Files+Request" className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 text-sm">
                <Download className="w-4 h-4 text-yellow-600" /><span>IES Files</span>
              </a>
              <a href="/contact?subject=INS+Series+Install+Guide+Request" className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 text-sm">
                <FileText className="w-4 h-4 text-yellow-600" /><span>Install Guide</span>
              </a>
              <a href="/support/returns" className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 text-sm">
                <Shield className="w-4 h-4 text-yellow-600" /><span>Warranty Info</span>
              </a>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Truck className="w-5 h-5 text-gray-600 flex-shrink-0" />
              <span className="text-sm text-gray-600">Free Shipping on $500+</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Shield className="w-5 h-5 text-gray-600 flex-shrink-0" />
              <span className="text-sm text-gray-600">5-Year Warranty (10yr avail)</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Zap className="w-5 h-5 text-gray-600 flex-shrink-0" />
              <span className="text-sm text-gray-600">DLC Premium Certified</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-gray-600 flex-shrink-0" />
              <span className="text-sm text-gray-600">UL/cUL Listed</span>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Need a photometric layout for your project?</p>
            <div className="flex items-center gap-4">
              <a href="mailto:sales@auvolar.com" className="flex items-center gap-1 text-sm text-yellow-600 hover:underline">
                <Mail className="w-4 h-4" /> sales@auvolar.com
              </a>
              <a href="tel:+16263428856" className="flex items-center gap-1 text-sm text-yellow-600 hover:underline">
                <Phone className="w-4 h-4" /> (626) 342-8856
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specs */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full">
            <tbody>
              {[
                ['Input Voltage', '100-277V / 347V / 480V (universal)'],
                ['Efficacy', '140-150 lm/W'],
                ['CRI', '> 70 (> 80 optional)'],
                ['Power Factor', '> 0.96'],
                ['THD', '< 10%'],
                ['IP Rating', 'IP67'],
                ['IK Rating', 'IK10'],
                ['Surge Protection', '20kV / 20kA'],
                ['Operating Temp', '-40°F to 149°F (-40°C to 65°C)'],
                ['Housing', 'Heavy-duty die-cast aluminum (3mm), powder coated'],
                ['Lens', 'Tempered glass 4mm, anti-reflective coated'],
                ['Hardware', 'Stainless steel 304'],
                ['Mounting', 'Heavy-duty yoke bracket, slip fitter, pole top'],
                ['Dimming', '0-10V, DALI, DMX optional'],
                ['Controls', 'Zigbee/Bluetooth wireless optional'],
                ['Rated Life', 'L80 &gt; 100,000 hours'],
                ['Certification', 'UL/cUL, DLC Premium, FCC, CE, RoHS'],
                ['Warranty', '5 years (10-year extended available)'],
              ].map(([key, val], i) => (
                <tr key={key} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 w-1/3">{key}</td>
                  <td className="px-4 py-3 text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: val }} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mt-8 text-lg font-semibold text-gray-900">Output by Wattage</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm border rounded-lg overflow-hidden">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-4 py-3 text-left font-medium text-gray-700">Wattage</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Lumens</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Replaces</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">SKU</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Price</th>
              </tr>
            </thead>
            <tbody>
              {wattageOptions.map((w, i) => (
                <tr key={w.watt} className={`border-b ${i % 2 === 0 ? '' : 'bg-gray-50'}`}>
                  <td className="px-4 py-2 font-medium">{w.watt}W</td>
                  <td className="px-4 py-2">{w.lumens} lm</td>
                  <td className="px-4 py-2">{w.replaces}</td>
                  <td className="px-4 py-2 text-gray-500">{w.sku}</td>
                  <td className="px-4 py-2 font-semibold text-yellow-600">${w.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Also in Stadium Lights */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Also in Stadium Lights</h2>
        <Link
          href="/p/isf-series-led-stadium-light"
          className="inline-flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 hover:border-yellow-500 hover:shadow-sm transition-all"
        >
          <Sun className="h-16 w-16 text-gray-300 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-900">ISF Series LED Stadium Light</h3>
            <p className="text-sm text-gray-500">400W-1800W | Anti-glare optics, 110 IES files, tool-free aiming | From $499</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
