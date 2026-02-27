'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ChevronLeft, ChevronRight, Check, CheckCircle2, Clock,
  ShoppingCart, Plus, Minus, Phone, Mail, FileText, Download,
  Award, Truck, Shield, Zap, Sun
} from 'lucide-react'

const wattageOptions = [
  { watt: 400, lumens: '56,000', replaces: '1000W MH', price: 499, sku: 'ISF-400W' },
  { watt: 600, lumens: '84,000', replaces: '1500W MH', price: 699, sku: 'ISF-600W' },
  { watt: 800, lumens: '112,000', replaces: '2000W MH', price: 899, sku: 'ISF-800W' },
  { watt: 1200, lumens: '168,000', replaces: '3000W MH', price: 1299, sku: 'ISF-1200W' },
  { watt: 1500, lumens: '210,000', replaces: '4000W MH', price: 1599, sku: 'ISF-1500W' },
  { watt: 1800, lumens: '252,000', replaces: '5000W MH', price: 1899, sku: 'ISF-1800W' },
]

const cctOptions = ['4000K', '5000K', '5700K']

const beamOptions = [
  { value: '15°', use: 'Long-throw, high mast' },
  { value: '30°', use: 'Stadium focused throw' },
  { value: '20°×30°', use: 'Asymmetric sideline' },
  { value: '35°×85°', use: 'Asymmetric wide field' },
  { value: 'PG60°', use: 'Playground/recreational' },
]

const visorOptions = ['With Visor', 'Without Visor']

export function ISFSeriesClient() {
  const [selectedWatt, setSelectedWatt] = useState(wattageOptions[1]) // 600W default
  const [selectedCCT, setSelectedCCT] = useState('5000K')
  const [selectedBeam, setSelectedBeam] = useState(beamOptions[1]) // 30°
  const [selectedVisor, setSelectedVisor] = useState('With Visor')
  const [quantity, setQuantity] = useState(1)

  const sku = `${selectedWatt.sku}-${selectedCCT}-${selectedBeam.value.replace('°', 'D').replace('×', 'x')}-${selectedVisor === 'With Visor' ? 'V' : 'NV'}`

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
        <span className="text-gray-900">ISF Series</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery — same layout as OT */}
        <div>
          <div className="relative aspect-[4/3] bg-white rounded-2xl border overflow-hidden">
            <div className="w-full h-full flex items-center justify-center p-8">
              <div className="text-center">
                <Sun className="mx-auto h-32 w-32 text-gray-300" />
                <p className="mt-4 text-lg text-gray-400">ISF Series Stadium Light</p>
                <p className="text-gray-400">{selectedWatt.watt}W | {selectedBeam.value}</p>
              </div>
            </div>
            {/* Sale badge */}
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              Save 40%+
            </div>
          </div>
        </div>

        {/* Product Info — same layout as OT */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ISF Series LED Stadium Light</h1>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm text-gray-500">SKU: {sku}</span>
            <span className="text-sm text-gray-300">|</span>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600 font-medium">In Stock — Ships in 24h</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-bold text-gray-900">${selectedWatt.price.toFixed(2)}</span>
            <span className="text-xl text-gray-400 line-through">${(selectedWatt.price * 1.6).toFixed(2)}</span>
            <span className="text-sm text-red-500 font-semibold bg-red-50 px-2 py-1 rounded">
              -38%
            </span>
          </div>

          {/* Description Card — same style as OT */}
          <div className="mb-6 border rounded-xl overflow-hidden">
            <div className="p-4 bg-gray-50">
              <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-500" />
                Professional Grade Stadium &amp; Sports Field Lighting
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Anti-glare optics with precision-molded lenses. Modular design for 400W to 1800W configurations. Replaces {selectedWatt.replaces} metal halide — {selectedWatt.lumens} lumens output.
              </p>
            </div>
            <details className="group">
              <summary className="cursor-pointer px-4 py-2 text-yellow-600 hover:text-yellow-700 font-medium text-xs flex items-center gap-1 bg-white border-t">
                Learn more
                <svg className="w-3 h-3 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-4 pb-4 pt-2 space-y-3 text-sm text-gray-600 bg-white">
                <div className="flex gap-2"><span className="text-yellow-500 font-bold">•</span><div><strong className="text-gray-900">Anti-Glare Optics</strong> — Precision-molded lenses with optional visor for maximum glare control on sports fields.</div></div>
                <div className="flex gap-2"><span className="text-yellow-500 font-bold">•</span><div><strong className="text-gray-900">5 Beam Angle Options</strong> — 15°, 30°, 20°×30°, 35°×85°, PG60° — covering every sports and venue application.</div></div>
                <div className="flex gap-2"><span className="text-yellow-500 font-bold">•</span><div><strong className="text-gray-900">Modular Design</strong> — Stackable modules for 400W to 1800W. Tool-free aiming bracket (±15° vertical, 360° horizontal).</div></div>
                <div className="flex gap-2"><span className="text-yellow-500 font-bold">•</span><div><strong className="text-gray-900">IP66 + 10kV Surge Protection</strong> — Built for outdoor environments. Die-cast aluminum housing with powder coat finish.</div></div>
                <div className="flex gap-2"><span className="text-yellow-500 font-bold">•</span><div><strong className="text-gray-900">110 IES Files Available</strong> — Complete photometric data for professional lighting design (AGi32, Visual, DIALux).</div></div>
              </div>
            </details>
          </div>

          {/* Variant Selection — same style as OT */}
          <div className="space-y-4 mb-6">
            {/* Wattage */}
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

            {/* CCT */}
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

            {/* Beam Angle */}
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

            {/* Visor */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Visor: <span className="text-gray-900">{selectedVisor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {visorOptions.map(v => (
                  <button
                    key={v}
                    onClick={() => setSelectedVisor(v)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                      selectedVisor === v
                        ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                        : 'border-gray-200 hover:border-gray-400 text-gray-700'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-gray-400">SKU: {sku}</p>
          </div>

          {/* Quantity + Request Quote — same as OT but quote-first for stadium lights */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-50"><Minus className="w-4 h-4" /></button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-50"><Plus className="w-4 h-4" /></button>
            </div>
            <Link
              href={`/contact?subject=Quote: ISF Series ${selectedWatt.watt}W&message=${encodeURIComponent(`I'd like a quote for ISF Series ${selectedWatt.watt}W Stadium Light.\n\nConfig: ${selectedCCT}, ${selectedBeam.value}, ${selectedVisor}\nSKU: ${sku}\nQuantity: ${quantity}`)}`}
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

          {/* Downloads & Resources — same grid as OT */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Downloads &amp; Resources</h3>
            <div className="grid grid-cols-2 gap-2">
              {/* IES Files */}
              <details className="group border rounded-lg overflow-hidden">
                <summary className="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-50 text-sm list-none [&::-webkit-details-marker]:hidden">
                  <Download className="w-4 h-4 text-yellow-600" /><span>IES Files <span className="text-[10px] text-gray-400">(110)</span></span>
                </summary>
                <div className="border-t bg-gray-50 p-2 space-y-1 max-h-64 overflow-y-auto">
                  {([
                    { label: '15° Beam', files: [
                      { w: '400W', f: 'ISF-400W-15D-With-Visor-HV-277V.IES' },
                      { w: '600W', f: 'ISF-600W-15D-With-Visor-HV-277V.IES' },
                      { w: '800W', f: 'ISF-800W-15D-With-Visor-HV-277V.IES' },
                      { w: '1200W', f: 'ISF-1200W-15D-With-Visor-HV-NA.IES' },
                    ]},
                    { label: '30° Beam', files: [
                      { w: '400W', f: 'ISF-400W-30D-With-Visor-HV-277V.IES' },
                      { w: '600W', f: 'ISF-600W-30D-With-Visor-HV-480V.IES' },
                      { w: '800W', f: 'ISF-800W-30D-With-Visor-HV-277V.IES' },
                      { w: '1200W', f: 'ISF-1200W-30D-With-Visor-HV-480V.IES' },
                    ]},
                    { label: '20°×30° Beam', files: [
                      { w: '400W', f: 'ISF-400W-2030D-With-Visor-HV-277V.IES' },
                      { w: '600W', f: 'ISF-600W-2030D-With-Visor-HV-277V.IES' },
                      { w: '800W', f: 'ISF-800W-2030D-With-Visor-HV-277V.IES' },
                      { w: '1200W', f: 'ISF-1200W-2030D-With-Visor-NA-480V.IES' },
                    ]},
                    { label: '35°×85° Beam', files: [
                      { w: '400W', f: 'ISF-400W-3585D-With-Visor-HV-277V.IES' },
                      { w: '600W', f: 'ISF-600W-3585D-With-Visor-HV-277V.IES' },
                      { w: '800W', f: 'ISF-800W-3585D-With-Visor-HV-277V.IES' },
                      { w: '1200W', f: 'ISF-1200W-3585D-With-Visor-HV-480V.IES' },
                    ]},
                    { label: 'PG60° Beam', files: [
                      { w: '400W', f: 'ISF-400W-PG60D-AOK-400WiSF-NV-S5-00-5070-PG60D-P_IESNA2002.IES' },
                      { w: '600W', f: 'ISF-600W-PG60D-AOK-600WiSF-NV-S5-00-5070-PG60D-P_IESNA2002.IES' },
                      { w: '800W', f: 'ISF-800W-PG60D-AOK-800WiSF-NV-S5-00-5070-PG60D-P_IESNA2002.IES' },
                      { w: '1200W', f: 'ISF-1200W-PG60D-AOK-1200WiSF-NV-S5-00-5070-PG60D-P_IESNA2002.IES' },
                    ]},
                  ] as const).map(beam => (
                    <div key={beam.label}>
                      <p className="text-[10px] font-semibold text-gray-500 px-2 py-1">{beam.label}</p>
                      <div className="grid grid-cols-2 gap-0.5">
                        {beam.files.map(({ w, f }) => (
                          <a key={f} href={`/docs/isf-series/ies/${f}`} download className="flex items-center gap-1 px-2 py-1 text-xs text-gray-700 hover:text-yellow-600 rounded transition-colors">
                            <Download className="w-3 h-3" /> {w}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                  <p className="text-[10px] text-gray-400 px-2 py-1 mt-1">110 IES files total. Contact sales@auvolar.com for Without Visor or other voltage versions.</p>
                </div>
              </details>

              {/* Spec Sheet */}
              <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50 text-sm text-gray-400 cursor-default">
                <FileText className="w-4 h-4" /><span>Spec Sheet <span className="text-[10px]">(Coming Soon)</span></span>
              </div>

              {/* Install Guide */}
              <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50 text-sm text-gray-400 cursor-default">
                <FileText className="w-4 h-4" /><span>Install Guide <span className="text-[10px]">(Coming Soon)</span></span>
              </div>

              {/* Warranty */}
              <a href="/support/returns" className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 text-sm">
                <Shield className="w-4 h-4 text-yellow-600" /><span>Warranty Info</span>
              </a>
            </div>
          </div>

          {/* Trust Badges — same as OT */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Truck className="w-5 h-5 text-gray-600 flex-shrink-0" />
              <span className="text-sm text-gray-600">Free Shipping on $500+</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Shield className="w-5 h-5 text-gray-600 flex-shrink-0" />
              <span className="text-sm text-gray-600">5-Year Warranty</span>
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

          {/* Contact CTA — same as OT */}
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Need help with sports field lighting design?</p>
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

      {/* Technical Specs Table — below the 2-col layout */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full">
            <tbody>
              {[
                ['Input Voltage', '100-277V / 347V / 480V (universal)'],
                ['Efficacy', '140-160 lm/W'],
                ['CRI', '> 70 (> 80 optional)'],
                ['Power Factor', '> 0.95'],
                ['THD', '< 15%'],
                ['IP Rating', 'IP66'],
                ['IK Rating', 'IK10'],
                ['Surge Protection', '10kV / 10kA'],
                ['Operating Temp', '-40°F to 140°F (-40°C to 60°C)'],
                ['Housing', 'Die-cast aluminum, powder coated'],
                ['Lens', 'Tempered glass, anti-glare coated'],
                ['Mounting', 'Adjustable yoke bracket, slip fitter'],
                ['Dimming', '0-10V, DALI, DMX (optional)'],
                ['Rated Life', 'L70 &gt; 100,000 hours'],
                ['Certification', 'UL/cUL, DLC Premium, FCC, RoHS'],
                ['Warranty', '5 years'],
              ].map(([key, val], i) => (
                <tr key={key} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 w-1/3">{key}</td>
                  <td className="px-4 py-3 text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: val }} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Wattage/Lumen Table */}
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
          href="/p/ins-series-led-stadium-light"
          className="inline-flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 hover:border-yellow-500 hover:shadow-sm transition-all"
        >
          <Sun className="h-16 w-16 text-gray-300 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-900">INS Series LED Stadium Light</h3>
            <p className="text-sm text-gray-500">300W-1800W | Industrial grade, IP67, heavy-duty housing | From $399</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
