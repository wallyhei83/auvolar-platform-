'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Award, Clock, Settings, CheckCircle2 } from 'lucide-react'

interface FeatureSection {
  title: string
  content: string[]
  icon: React.ReactNode
}

// OT Series feature content
const OT_FEATURES: FeatureSection[] = [
  {
    title: 'A Proven Benchmark in Commercial Parking Lot Lighting',
    icon: <Award className="w-5 h-5" />,
    content: [
      'Selected by Leading U.S. Brands — This parking lot lighting system has been deployed nationwide, serving CarMax, The Home Depot, Ontario International Airport (CA), and numerous branded automotive dealerships.',
      'Its adoption by high-visibility commercial facilities demonstrates its capability to meet strict illumination, reliability, and aesthetic standards.',
    ],
  },
  {
    title: '10+ Years of Field Validation',
    icon: <Clock className="w-5 h-5" />,
    content: [
      'Designed for demanding outdoor environments, this product has accumulated over a decade of continuous real-world operation. It delivers:',
      '• High lumen output with uniform light distribution',
      '• Low glare performance for enhanced visual comfort',
      '• Stable thermal management for long lifespan',
      '• Reliable operation in diverse climate conditions',
      'Engineered for commercial-grade durability and long-term ROI.',
    ],
  },
  {
    title: 'Complete Integrated Parking Lot Lighting System',
    icon: <Settings className="w-5 h-5" />,
    content: [
      'This is not just a fixture — it is a fully engineered lighting platform, including:',
      '• Glare shields for dealership-grade visual control',
      '• Motion/occupancy sensors for energy optimization',
      '• Electrical adapters and mounting brackets',
      '• Dedicated light poles',
      '• Intelligent control systems',
      'Every component is designed for seamless compatibility, simplifying installation while maximizing long-term system performance.',
    ],
  },
]

function getFeatureSections(slug: string): FeatureSection[] | null {
  if (slug.includes('ot-series') || slug.includes('aera-lighting-shoebox-ot') || slug.includes('area-light')) {
    return OT_FEATURES
  }
  return null
}

export function ProductFeatures({ slug }: { slug: string }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const sections = getFeatureSections(slug)

  if (!sections || sections.length === 0) return null

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 border-t">
      <div className="flex items-center gap-3 mb-6">
        <CheckCircle2 className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-bold text-gray-900">Why This Product</h2>
      </div>

      <div className="space-y-3">
        {sections.map((section, i) => {
          const isExpanded = expandedIndex === i
          return (
            <div key={i} className="border rounded-xl overflow-hidden transition-all">
              <button
                onClick={() => setExpandedIndex(isExpanded ? null : i)}
                className="w-full flex items-center gap-3 p-5 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center text-yellow-600 flex-shrink-0">
                  {section.icon}
                </div>
                <h3 className="flex-1 font-semibold text-gray-900">{section.title}</h3>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {isExpanded && (
                <div className="px-5 pb-5 pt-0 ml-[52px]">
                  {section.content.map((line, j) => (
                    <p key={j} className={`text-gray-600 text-sm leading-relaxed ${line.startsWith('•') ? 'pl-2' : j > 0 ? 'mt-2' : ''}`}>
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
