import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'

export const metadata: Metadata = {
  title: 'LED Lighting Glossary — 60+ Industry Terms Explained',
  description: 'Complete glossary of LED lighting terms: lumens, watts, CRI, CCT, DLC, IP rating, beam angle, L70, photometric, foot-candles, and more. Expert definitions from Auvolar.',
  alternates: { canonical: 'https://www.auvolar.com/resources/glossary' },
  keywords: [
    'LED lighting glossary', 'LED terminology', 'what is DLC certification',
    'lumens vs watts', 'CRI meaning', 'CCT color temperature', 'IP rating explained',
    'L70 rating', 'foot candle definition', 'beam angle LED', 'LED driver',
  ],
}

const glossaryTerms = [
  { term: 'Beam Angle', definition: 'The angle between the two directions where light intensity falls to 50% of the maximum. Narrow beam angles (15°-30°) are used for spotlighting, while wide angles (90°-120°) are used for general area lighting.' },
  { term: 'Bollard Light', definition: 'A short, vertical post light (typically 3-4 feet tall) used for pathway, walkway, and landscape illumination. Common in commercial parks, campuses, and retail centers.' },
  { term: 'CCT (Correlated Color Temperature)', definition: 'Measured in Kelvin (K), CCT describes the color appearance of light. 3000K is warm white (yellowish), 4000K is neutral white, and 5000K is daylight/cool white. Commercial applications typically use 4000K-5000K.' },
  { term: 'CRI (Color Rendering Index)', definition: 'A scale from 0-100 measuring how accurately a light source renders colors compared to natural light. CRI 80+ is standard for commercial lighting; CRI 90+ is required for retail, healthcare, and art galleries.' },
  { term: 'Canopy Light', definition: 'A surface-mounted fixture designed for covered outdoor areas like gas station canopies, parking garage ceilings, and building overhangs. Typically rated IP65 for moisture resistance.' },
  { term: 'DLC (DesignLights Consortium)', definition: 'An independent organization that tests and certifies commercial LED products for energy efficiency. DLC-listed products qualify for utility rebates of $20-$150+ per fixture. DLC Premium is the highest efficiency tier.' },
  { term: 'Dark Sky Compliant', definition: 'Lighting designed to minimize light pollution by directing light downward. Required in many municipalities. Full-cutoff fixtures with zero uplight are dark sky compliant.' },
  { term: 'Dimmable / 0-10V Dimming', definition: 'Most commercial LED fixtures use 0-10V dimming protocol, where a low-voltage signal adjusts brightness from 10-100%. Other methods include DALI, TRIAC, and PWM dimming.' },
  { term: 'Driver (LED Driver)', definition: 'The power supply that converts AC line voltage (120V/277V/480V) to the DC voltage/current needed by LEDs. Mean Well and Inventronics are common driver brands. Driver failure is the most common LED fixture issue.' },
  { term: 'Efficacy (Lumens per Watt)', definition: 'The measure of how efficiently a light source converts electricity into visible light. Modern LEDs achieve 130-200+ lumens per watt. DLC Premium requires ≥135 lm/W for most categories.' },
  { term: 'ETL Listed', definition: 'Safety certification from Intertek (ETL) indicating a product meets UL/ANSI safety standards. Equivalent to UL listing and accepted by all US building inspectors and code authorities.' },
  { term: 'Flood Light', definition: 'A high-intensity fixture that projects a broad, even beam of light over a large area. Used for sports fields, security, signage, and building facades. Available from 50W to 1800W.' },
  { term: 'Foot-Candle (FC)', definition: 'A unit measuring the amount of light falling on a surface. One foot-candle equals one lumen per square foot. Warehouses need 30-50 FC, offices 30-50 FC, retail 50-75 FC, and sports fields 30-100+ FC.' },
  { term: 'High Bay Light', definition: 'Fixtures designed for spaces with ceiling heights of 15-45 feet. UFO (round) and linear (rectangular) styles are available. Common in warehouses, manufacturing, gymnasiums, and distribution centers. Typical wattages: 100W-240W.' },
  { term: 'HID (High-Intensity Discharge)', definition: 'Older lighting technology including metal halide (MH), high-pressure sodium (HPS), and mercury vapor. LEDs use 50-70% less energy than HID with better color quality and instant-on capability.' },
  { term: 'IES File', definition: 'A standard data file (.ies) that describes the light distribution pattern of a fixture. Used in photometric design software (AGi32, DIALux) to create accurate lighting layouts.' },
  { term: 'IK Rating', definition: 'A rating measuring impact resistance of a fixture\'s enclosure. IK08 means it can withstand 5 joules of impact; IK10 (the highest) withstands 20 joules. Stadium and sports lights need IK10.' },
  { term: 'IP Rating (Ingress Protection)', definition: 'A two-digit rating for dust and water protection. First digit (0-6) = dust, second digit (0-8) = water. IP65 = dust-tight + water jets. IP66 = dust-tight + powerful jets. IP67 = dust-tight + temporary immersion.' },
  { term: 'L70 Rating', definition: 'The estimated time (in hours) when an LED\'s light output drops to 70% of its initial lumens. Quality commercial LEDs have L70 ratings of 50,000-100,000+ hours (11-22+ years at 12 hrs/day).' },
  { term: 'LED (Light Emitting Diode)', definition: 'A semiconductor device that produces light when electrical current passes through it. LEDs are 50-80% more efficient than traditional lighting, last 5-25x longer, and contain no mercury.' },
  { term: 'LED Corn Bulb', definition: 'A retrofit LED bulb shaped like a corn cob, designed to replace HID bulbs in existing fixtures. Available in mogul (E39) and medium (E26) bases, 36W-150W, replacing 100W-600W HID.' },
  { term: 'LED Troffer', definition: 'A recessed rectangular fixture that fits into drop ceiling grid systems (2x2 or 2x4). Replaces fluorescent troffers in offices, schools, and retail. Typical wattages: 30-50W replacing 64-128W fluorescent.' },
  { term: 'LED Tube', definition: 'A tubular LED lamp replacing fluorescent T8, T5, or T12 tubes. Type A (ballast-compatible), Type B (direct wire/ballast bypass), and Type C (external driver) installation methods available.' },
  { term: 'Light Distribution Type', definition: 'IESNA classification for how an outdoor fixture distributes light. Type I = narrow/linear. Type II = wider roadway. Type III = forward throw (parking lots). Type IV = forward semicircular. Type V = symmetric/square (intersections).' },
  { term: 'Linear High Bay', definition: 'A rectangular high bay fixture offering wide, uniform light distribution. Best for narrow aisles, racking areas, and assembly lines. Available 165W-320W.' },
  { term: 'Lumen', definition: 'The unit measuring total visible light output from a source. More lumens = brighter light. A 100W LED high bay produces ~15,000 lumens; a 200W produces ~30,000 lumens.' },
  { term: 'Lux', definition: 'The metric unit of illuminance. One lux equals one lumen per square meter. 1 foot-candle ≈ 10.764 lux. Used internationally for lighting level specifications.' },
  { term: 'Motion Sensor', definition: 'An occupancy/vacancy sensor that automatically dims or turns off lights when no motion is detected. Reduces energy usage by an additional 30-50% beyond LED savings. Common in warehouses and parking garages.' },
  { term: 'Photocell', definition: 'A light-sensing device that automatically turns fixtures on at dusk and off at dawn. Standard for outdoor wall packs, area lights, and security lighting.' },
  { term: 'Photometric Design', definition: 'A professional lighting layout using software (AGi32, DIALux, Visual) to calculate and visualize light levels, uniformity, and fixture placement for a specific space. Auvolar offers this service free for any project.' },
  { term: 'Power Factor', definition: 'A measure of how efficiently a fixture uses electrical power. Power factor >0.9 is considered good. DLC requires power factor ≥0.9 for most commercial fixtures.' },
  { term: 'Rebate (Utility Rebate)', definition: 'A financial incentive from utility companies for installing energy-efficient lighting. DLC-listed LED fixtures qualify for rebates of $20-$150+ per fixture. Rebates can cover 30-70% of fixture cost.' },
  { term: 'Shoebox Light', definition: 'A rectangular area light fixture mounted on a pole, resembling a shoebox in shape. The standard choice for parking lots, roadways, and large commercial outdoor areas. Also called area light.' },
  { term: 'Strip Light', definition: 'A narrow, linear surface-mounted fixture for utility areas. Available in 4ft and 8ft lengths, 32-80W. Used in workshops, laundry rooms, storage areas, and garages.' },
  { term: 'Surge Protection', definition: 'Built-in protection against voltage spikes from lightning or power grid events. Commercial LED fixtures typically include 6kV-20kV surge protection. Higher ratings are recommended for outdoor fixtures.' },
  { term: 'THD (Total Harmonic Distortion)', definition: 'A measure of power quality. Lower THD means cleaner power draw. DLC requires THD <20% for most fixture categories. Good commercial fixtures achieve THD <10%.' },
  { term: 'Title 24', definition: 'California\'s building energy efficiency standards. Requires specific lighting power densities (LPD) by space type. Most LED fixtures easily meet Title 24 requirements due to high efficacy.' },
  { term: 'UL Listed', definition: 'Safety certification from Underwriters Laboratories indicating a product has been tested and meets safety standards. Required by most US building codes. UL/ETL listing is mandatory for commercial installations.' },
  { term: 'UFO High Bay', definition: 'A round, compact high bay LED fixture shaped like a UFO/flying saucer. Popular for warehouses, gyms, and manufacturing due to compact size, light weight, and easy installation. 100W-240W, replacing 250W-600W HID.' },
  { term: 'Vapor Tight Light', definition: 'A sealed, gasketed fixture rated IP65 or higher for use in wet, dusty, or corrosive environments. Used in car washes, food processing, cold storage, parking garages, and industrial wash-down areas.' },
  { term: 'Wall Pack', definition: 'A fixture mounted on building exterior walls for perimeter and security lighting. Available as full-cutoff (dark sky compliant) or semi-cutoff styles. Typical wattages: 20W-120W.' },
  { term: 'Watt (W)', definition: 'A unit of electrical power consumption. LEDs produce more light per watt than any other commercial lighting technology. A 150W LED replaces a 400W metal halide while producing equal or better illumination.' },
]

// Sort alphabetically
const sortedTerms = [...glossaryTerms].sort((a, b) => a.term.localeCompare(b.term))

// Group by first letter
const grouped = sortedTerms.reduce((acc, item) => {
  const letter = item.term[0].toUpperCase()
  if (!acc[letter]) acc[letter] = []
  acc[letter].push(item)
  return acc
}, {} as Record<string, typeof glossaryTerms>)

const letters = Object.keys(grouped).sort()

// DefinedTermSet JSON-LD
const glossaryJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  name: 'LED Lighting Glossary',
  description: 'Comprehensive glossary of commercial and industrial LED lighting terminology with expert definitions.',
  url: 'https://www.auvolar.com/resources/glossary',
  publisher: { '@type': 'Organization', name: 'Auvolar', url: 'https://www.auvolar.com' },
  hasPart: sortedTerms.map(t => ({
    '@type': 'DefinedTerm',
    name: t.term,
    description: t.definition,
    inDefinedTermSet: 'https://www.auvolar.com/resources/glossary',
  })),
}

export default function GlossaryPage() {
  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.auvolar.com' },
        { name: 'Resources', url: 'https://www.auvolar.com/resources' },
        { name: 'LED Glossary', url: 'https://www.auvolar.com/resources/glossary' },
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossaryJsonLd) }}
      />
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">LED Lighting Glossary</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            {sortedTerms.length}+ essential terms explained by Auvolar&apos;s lighting experts.
            From beam angles to utility rebates, understand every aspect of commercial LED lighting.
          </p>
        </div>
      </section>

      {/* Letter Navigation */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap gap-2">
            {letters.map(letter => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 hover:bg-yellow-400 hover:text-black text-sm font-bold transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Terms */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {letters.map(letter => (
            <div key={letter} id={`letter-${letter}`} className="mb-12">
              <h2 className="text-3xl font-bold text-yellow-500 mb-6 border-b-2 border-yellow-400 pb-2">{letter}</h2>
              <div className="space-y-6">
                {grouped[letter].map(item => (
                  <div key={item.term} id={item.term.toLowerCase().replace(/[\s\/()]+/g, '-')} className="group">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.term}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help Choosing the Right LED Fixture?</h2>
          <p className="text-gray-600 mb-6">Our lighting experts can help you select the perfect fixtures for your project — plus free photometric design.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/contact" className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors">
              Get a Free Quote
            </Link>
            <Link href="/products" className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
