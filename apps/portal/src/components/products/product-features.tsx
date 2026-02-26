'use client'

import { Zap, Eye, RotateCw, Wrench, Grid3X3, Thermometer, Wifi, Link2 } from 'lucide-react'

interface Feature {
  icon: string
  title: string
  description: string
}

const ICON_MAP: Record<string, React.ReactNode> = {
  zap: <Zap className="w-6 h-6" />,
  eye: <Eye className="w-6 h-6" />,
  rotate: <RotateCw className="w-6 h-6" />,
  wrench: <Wrench className="w-6 h-6" />,
  grid: <Grid3X3 className="w-6 h-6" />,
  thermometer: <Thermometer className="w-6 h-6" />,
  wifi: <Wifi className="w-6 h-6" />,
  link: <Link2 className="w-6 h-6" />,
}

// Product-specific feature data
const PRODUCT_FEATURES: Record<string, Feature[]> = {
  'ot-series': [
    { icon: 'zap', title: 'Superior Luminous Performance', description: 'High-efficiency LED system delivering up to 175 lm/W for maximum energy savings and illumination output.' },
    { icon: 'eye', title: 'Professional Optical Distribution', description: 'Engineered for parking lots and tennis courts, ensuring outstanding uniformity with a BUG rating of 0.' },
    { icon: 'rotate', title: 'Innovative Rotatable Lens', description: 'Adjust beam direction easily by rotating the lens — no need to reposition the entire fixture.' },
    { icon: 'wrench', title: 'Tool-Free Maintenance', description: 'Simplified tool-less design enables fast servicing while reducing maintenance time and labor costs.' },
    { icon: 'grid', title: 'Seven Mounting Bracket Options', description: 'Multiple installation brackets to accommodate diverse mounting requirements with enhanced flexibility.' },
    { icon: 'thermometer', title: 'Adjustable CCT & Power', description: 'Selectable color temperature (3000K-6500K) and wattage settings to adapt to various project specifications.' },
    { icon: 'wifi', title: 'Smart Sensor Integration', description: 'Spacious internal design with dedicated sensor positions, compatible with Zhaga, LoRa, and intelligent control systems.' },
    { icon: 'link', title: 'Dual Fixture Splicing', description: 'Supports combined configuration up to 800W, with optional short-circuit caps and 3-pin/7-pin smart control receptacles.' },
  ],
}

// Map product slugs to feature sets
function getFeatureSet(slug: string): Feature[] | null {
  if (slug.includes('ot-series') || slug.includes('aera-lighting-shoebox-ot') || slug.includes('area-light')) {
    return PRODUCT_FEATURES['ot-series']
  }
  return null
}

export function ProductFeatures({ slug, features: propFeatures }: { slug: string; features?: Feature[] }) {
  const features = propFeatures || getFeatureSet(slug)
  if (!features || features.length === 0) return null

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Features & Benefits</h2>
        <p className="text-gray-500 mt-2">Engineered for performance, built for reliability</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, i) => (
          <div
            key={i}
            className="bg-white border rounded-xl p-5 hover:shadow-md hover:border-yellow-300 transition-all group"
          >
            <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center text-yellow-600 group-hover:bg-yellow-100 transition-colors mb-3">
              {ICON_MAP[feature.icon] || <Zap className="w-6 h-6" />}
            </div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1.5">{feature.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
