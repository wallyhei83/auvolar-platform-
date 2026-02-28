// Application/Industry data for SEO pages

export interface ApplicationData {
  slug: string
  title: string
  subtitle: string
  description: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  iconName: string // lucide icon name for client rendering
  challenges: string[]
  solutions: string[]
  lightLevels: { area: string; minFc: string; recommendedFc: string }[]
  recommendedProducts: {
    name: string
    sku: string
    wattage: string
    description: string
    slug: string // /p/[slug] link
  }[]
  caseStudy?: {
    title: string
    savings: string
    payback: string
    description: string
  }
  seoContent: string // Extra SEO paragraph
}

export const applications: ApplicationData[] = [
  {
    slug: 'warehouse',
    title: 'Warehouse Lighting',
    subtitle: 'High-performance LED solutions for distribution centers and warehouses',
    description: 'Reduce energy costs by up to 70% while improving visibility and safety in your warehouse operations.',
    metaTitle: 'LED Warehouse Lighting | High Bay Lights for Warehouses | Auvolar',
    metaDescription: 'Commercial LED warehouse lighting solutions. UFO & linear high bay lights for 15-50ft ceilings. DLC certified, 150+ lm/W, from $69. Free photometric layouts.',
    keywords: ['warehouse lighting', 'LED high bay', 'warehouse LED lights', 'distribution center lighting', 'UFO high bay warehouse', 'warehouse ceiling lights', 'industrial warehouse lighting', 'high bay LED retrofit'],
    iconName: 'Warehouse',
    challenges: [
      'High ceilings (15-50ft) requiring powerful, efficient fixtures',
      'Long operating hours (12-24 hrs/day) driving up energy costs',
      'Need for uniform light distribution across picking aisles',
      'Maintenance costs for hard-to-reach fixtures at height',
      'OSHA compliance requiring minimum 20-30 foot-candles',
    ],
    solutions: [
      'UFO and Linear High Bay LEDs with 150+ lumens/watt efficiency',
      'Motion sensors for 30-50% additional savings in low-traffic areas',
      '100,000+ hour rated life (22+ years at 12 hrs/day) eliminating re-lamping',
      'DLC Premium qualified for utility rebates of $30-$100 per fixture',
      'Instant-on operation — no warm-up delay like metal halide',
    ],
    lightLevels: [
      { area: 'General storage', minFc: '10 fc', recommendedFc: '20-30 fc' },
      { area: 'Picking/packing', minFc: '20 fc', recommendedFc: '30-50 fc' },
      { area: 'Loading dock', minFc: '20 fc', recommendedFc: '30 fc' },
      { area: 'Quality inspection', minFc: '50 fc', recommendedFc: '75-100 fc' },
      { area: 'Office areas', minFc: '30 fc', recommendedFc: '40-50 fc' },
    ],
    recommendedProducts: [
      { name: 'UFO High Bay 100W', sku: 'HB-UFO-100W', wattage: '100W', description: 'Best for 15-20ft ceilings, small warehouses', slug: 'ufo-high-bay-light-hba-series' },
      { name: 'UFO High Bay 150W', sku: 'HB-UFO-150W', wattage: '150W', description: 'Best for 20-25ft ceilings, most warehouses', slug: 'ufo-high-bay-light-hba-series' },
      { name: 'UFO High Bay 200W', sku: 'HB-UFO-200W', wattage: '200W', description: 'Best for 25-30ft ceilings, large facilities', slug: 'ufo-high-bay-light-hba-series' },
      { name: 'Linear High Bay 220W', sku: 'LHB-220W', wattage: '220W', description: 'Best for racking aisles and narrow spaces', slug: 'linear-high-bay-light-ihl-series' },
      { name: 'Motion Sensor', sku: 'SENS-HB-MS', wattage: 'N/A', description: 'Occupancy sensor for high bays — 30-50% additional savings', slug: 'motion-sensor-for-high-bay' },
    ],
    caseStudy: {
      title: '200,000 sq ft Distribution Center — Los Angeles, CA',
      savings: '$48,000/year',
      payback: '3.5 months',
      description: 'Replaced 120 × 400W metal halide fixtures with Auvolar 150W UFO High Bays. Energy consumption reduced by 65%. DLC rebates from SCE covered 60% of fixture costs.',
    },
    seoContent: 'Warehouse lighting is one of the highest-impact LED upgrade opportunities in commercial buildings. With ceilings ranging from 15 to 50 feet and fixtures running 12-24 hours daily, the energy savings from switching to LED high bays are dramatic. Auvolar warehouse lighting solutions include UFO high bays (100W-240W) for open floor areas and linear high bays (165W-220W) for racking aisles. All fixtures are DLC Premium certified, qualifying for utility rebates that can cover 30-70% of fixture costs. Our free photometric layout service ensures optimal fixture placement for uniform illumination meeting IES and OSHA standards.',
  },
  {
    slug: 'manufacturing',
    title: 'Manufacturing Lighting',
    subtitle: 'Industrial-grade LED lighting for production facilities',
    description: 'Improve worker safety and productivity with high-CRI, flicker-free lighting designed for manufacturing environments.',
    metaTitle: 'LED Manufacturing & Factory Lighting | Industrial LED Lights | Auvolar',
    metaDescription: 'Industrial LED lighting for manufacturing facilities. High-CRI, vibration-rated fixtures for production floors. DLC certified high bays from $69. Free layouts.',
    keywords: ['manufacturing lighting', 'factory lighting', 'industrial LED lights', 'production floor lighting', 'assembly line lighting', 'CRI lighting manufacturing', 'vibration rated LED'],
    iconName: 'Factory',
    challenges: [
      'High vibration environments affecting fixture longevity',
      'Need for high CRI (80+) for quality inspection tasks',
      'Heat from production equipment affecting lighting performance',
      'Multiple mounting heights across different production zones',
      'Flicker-free requirements for machinery safety',
    ],
    solutions: [
      'Vibration-rated fixtures with reinforced housings and sealed drivers',
      '80+ CRI standard — 90+ CRI available for color-critical inspection',
      'High ambient temperature rated drivers (up to 65°C / 149°F)',
      'Flexible wattage options from 100W to 400W covering 15-50ft ceilings',
      'Flicker-free drivers (<1%) meeting IEEE 1789 standards',
    ],
    lightLevels: [
      { area: 'General production', minFc: '30 fc', recommendedFc: '50-75 fc' },
      { area: 'Assembly line', minFc: '50 fc', recommendedFc: '75-100 fc' },
      { area: 'Quality inspection', minFc: '75 fc', recommendedFc: '100-200 fc' },
      { area: 'Machine shop', minFc: '50 fc', recommendedFc: '75-100 fc' },
      { area: 'Storage area', minFc: '10 fc', recommendedFc: '20-30 fc' },
    ],
    recommendedProducts: [
      { name: 'UFO High Bay 200W', sku: 'HB-UFO-200W', wattage: '200W', description: 'General production areas', slug: 'ufo-high-bay-light-hba-series' },
      { name: 'Linear High Bay 220W', sku: 'LHB-220W', wattage: '220W', description: 'Assembly lines — superior aisle uniformity', slug: 'linear-high-bay-light-ihl-series' },
      { name: 'Vapor Tight 4ft 40W', sku: 'VT-4FT-40W', wattage: '40W', description: 'Harsh/wet environments, wash-down areas', slug: 'an-vf4ft-vapor-tight-strip' },
    ],
    caseStudy: {
      title: '85,000 sq ft Manufacturing Plant — Houston, TX',
      savings: '$32,000/year',
      payback: '4 months',
      description: 'Replaced 400W metal halide fixtures with Auvolar 200W UFO High Bays and linear high bays. Improved CRI from 65 to 82, reducing inspection errors by 15%.',
    },
    seoContent: 'Manufacturing facilities demand lighting that supports both productivity and safety. High CRI (Color Rendering Index) is essential for quality inspection, while flicker-free operation prevents stroboscopic effects on rotating machinery. Auvolar industrial LED fixtures are rated for high-vibration environments and elevated ambient temperatures found on production floors. Our DLC-certified fixtures qualify for utility rebates while delivering 50-70% energy savings over metal halide and fluorescent systems.',
  },
  {
    slug: 'retail',
    title: 'Retail Lighting',
    subtitle: 'Enhance merchandise appeal and customer experience',
    description: 'Create inviting retail spaces with high-quality LED lighting that showcases products and reduces operating costs.',
    metaTitle: 'LED Retail Store Lighting | Troffers & Panels for Retail | Auvolar',
    metaDescription: 'LED lighting for retail stores. High-CRI troffers, panels, and downlights that make merchandise look great. DLC certified, from $12. Volume pricing available.',
    keywords: ['retail lighting', 'store lighting', 'LED troffer retail', 'retail LED lights', 'shop lighting', 'merchandise lighting', 'grocery store lighting', 'clothing store lighting'],
    iconName: 'ShoppingCart',
    challenges: [
      'Need for excellent color rendering (CRI 90+) to showcase products accurately',
      'Multiple fixture types needed for different zones (sales floor, fitting rooms, storage)',
      'Energy efficiency requirements for large retail footprints',
      'Dimming capability for ambiance control and energy management',
    ],
    solutions: [
      '90+ CRI options for true color representation of merchandise',
      'Complete fixture lineup: troffers, panels, downlights, track lighting',
      'DLC Premium fixtures reducing energy costs by 50-70%',
      '0-10V dimming standard — TRIAC compatible options available',
    ],
    lightLevels: [
      { area: 'General retail floor', minFc: '30 fc', recommendedFc: '50-75 fc' },
      { area: 'Featured displays', minFc: '75 fc', recommendedFc: '100-200 fc' },
      { area: 'Fitting rooms', minFc: '30 fc', recommendedFc: '50-75 fc' },
      { area: 'Checkout area', minFc: '30 fc', recommendedFc: '50 fc' },
      { area: 'Grocery/pharmacy', minFc: '50 fc', recommendedFc: '75-100 fc' },
    ],
    recommendedProducts: [
      { name: 'LED Troffer 2x4 50W', sku: 'TRF-2X4-50W', wattage: '50W', description: 'General retail areas — drop ceiling', slug: 'panel-light-a-sfpl' },
      { name: 'LED Troffer 2x2 40W', sku: 'TRF-2X2-40W', wattage: '40W', description: 'Checkout areas, smaller spaces', slug: 'panel-light-a-sfpl' },
      { name: 'Flat Panel LED 1x4 40W', sku: 'FPL-1X4-40W', wattage: '40W', description: 'Modern aesthetic, edge-lit', slug: 'panel-light-a-sfpl' },
      { name: '6" LED Downlight 15W', sku: 'DL-6IN-15W', wattage: '15W', description: 'Accent and aisle lighting', slug: 'led-slim-down-light-4-6inch-in-9-10-12w' },
    ],
    seoContent: 'Retail lighting directly impacts sales — studies show that well-lit stores with high-CRI lighting increase customer dwell time and purchasing. Auvolar retail lighting solutions combine energy efficiency with superior color rendering, making merchandise look its best while cutting electricity costs. Our troffers, panels, and downlights provide the flexibility needed for different retail zones, from bright grocery aisles to intimate boutique settings.',
  },
  {
    slug: 'office',
    title: 'Office Lighting',
    subtitle: 'Productive, comfortable lighting for modern workspaces',
    description: 'Create a productive work environment with glare-free, energy-efficient LED lighting that supports employee wellbeing.',
    metaTitle: 'LED Office Lighting | Troffers & Panels for Offices | Auvolar',
    metaDescription: 'LED office lighting solutions. Low-glare troffers and panels for productive workspaces. 4000K neutral white, DLC certified. From $45. Free lighting design.',
    keywords: ['office lighting', 'LED office lights', 'commercial office lighting', 'office troffer', 'office panel light', 'workspace lighting', 'glare-free LED', 'open office lighting'],
    iconName: 'Building2',
    challenges: [
      'Glare on computer screens reducing productivity and causing eye strain',
      'Compliance with building energy codes (Title 24, ASHRAE 90.1)',
      'Open plan offices with varied lighting needs across zones',
      'Employee wellbeing and circadian rhythm support',
    ],
    solutions: [
      'Low-glare UGR<19 fixtures optimized for computer work',
      'Title 24 and ASHRAE 90.1 compliant, DLC Premium listed',
      'Zoned control with 0-10V dimming for different work areas',
      'CCT selectable (3000K-5000K) for tunable circadian lighting',
    ],
    lightLevels: [
      { area: 'Open office', minFc: '30 fc', recommendedFc: '40-50 fc' },
      { area: 'Private office', minFc: '30 fc', recommendedFc: '40 fc' },
      { area: 'Conference room', minFc: '20 fc', recommendedFc: '30-50 fc' },
      { area: 'Lobby/reception', minFc: '10 fc', recommendedFc: '20-30 fc' },
      { area: 'Corridor', minFc: '5 fc', recommendedFc: '10-20 fc' },
    ],
    recommendedProducts: [
      { name: 'LED Troffer 2x4 50W', sku: 'TRF-2X4-50W', wattage: '50W', description: 'Open offices — uniform, low-glare', slug: 'panel-light-a-sfpl' },
      { name: 'Flat Panel LED 1x4 40W', sku: 'FPL-1X4-40W', wattage: '40W', description: 'Conference rooms, modern aesthetic', slug: 'panel-light-a-sfpl' },
      { name: '6" LED Downlight 15W', sku: 'DL-6IN-15W', wattage: '15W', description: 'Lobbies, corridors, break rooms', slug: 'led-slim-down-light-4-6inch-in-9-10-12w' },
    ],
    seoContent: 'Office lighting affects employee productivity, comfort, and health. Poor lighting causes eye strain, headaches, and reduced focus. Auvolar LED troffers and panels are designed with low UGR (Unified Glare Rating) for comfortable computer work, while offering CCT selectability to support natural circadian rhythms. All office fixtures are DLC certified for maximum utility rebates and meet ASHRAE 90.1 energy efficiency requirements.',
  },
  {
    slug: 'parking',
    title: 'Parking Lot & Garage Lighting',
    subtitle: 'Safe, efficient lighting for parking facilities',
    description: 'Enhance safety and reduce energy costs with LED parking lot lights featuring excellent uniformity and dark sky compliance.',
    metaTitle: 'LED Parking Lot Lighting | Area Lights & Shoebox Lights | Auvolar',
    metaDescription: 'LED parking lot and garage lighting. Area lights 100W-420W, Type III/V distribution, Dark Sky compliant. DLC certified, from $106. Free photometric design.',
    keywords: ['parking lot lighting', 'LED parking lot lights', 'shoebox light', 'parking garage lighting', 'area light LED', 'pole mounted light', 'parking lot LED retrofit', 'Dark Sky parking light'],
    iconName: 'Car',
    challenges: [
      'Large areas requiring uniform illumination for safety',
      'Security concerns in poorly lit sections',
      'High energy costs from dusk-to-dawn operation',
      'Dark sky ordinance compliance in many municipalities',
      'Liability from slip-and-fall in dark areas',
    ],
    solutions: [
      'Type III and Type V distributions for optimal, uniform coverage',
      'High lumen output up to 63,000 lumens for large lots',
      'Photocell and timer controls for automatic dusk-to-dawn operation',
      'Full cutoff optics with BUG U0 rating for Dark Sky compliance',
      'IES-standard uniformity ratios (4:1) reducing dark spots',
    ],
    lightLevels: [
      { area: 'Open parking (basic)', minFc: '0.5 fc', recommendedFc: '1-2 fc' },
      { area: 'Open parking (enhanced)', minFc: '1 fc', recommendedFc: '2-5 fc' },
      { area: 'Covered garage', minFc: '5 fc', recommendedFc: '10-20 fc' },
      { area: 'Garage ramp', minFc: '10 fc', recommendedFc: '20 fc' },
      { area: 'Entrances/exits', minFc: '5 fc', recommendedFc: '10-20 fc' },
    ],
    recommendedProducts: [
      { name: 'LED Area Light 150W', sku: 'AL-150W-T3', wattage: '150W', description: 'Small-medium parking lots, 20ft poles', slug: '75w-145w-aera-lighting-shoebox-ot-series-s' },
      { name: 'LED Area Light 300W', sku: 'AL-300W-T3', wattage: '300W', description: 'Large parking lots, 30ft poles', slug: '300w-420w-aera-lighting-shoebox-ot-series-l' },
      { name: 'LED Garage Light 100W', sku: 'GAR-100W', wattage: '100W', description: 'Parking garages, covered areas', slug: 'garage-canopy-light-an-cn' },
      { name: 'Photocell', sku: 'SENS-WP-PC', wattage: 'N/A', description: 'Dusk-to-dawn automatic control', slug: 'photocell-for-wall-pack-area-light' },
    ],
    caseStudy: {
      title: '300-Space Commercial Parking Lot — Phoenix, AZ',
      savings: '$12,600/year',
      payback: '4 months',
      description: 'Replaced 20 × 400W metal halide shoebox lights with Auvolar 200W LED area lights. Uniformity improved from 8:1 to 3.5:1. Dark Sky compliant installation.',
    },
    seoContent: 'Parking lot lighting is critical for safety, security, and liability management. LED area lights deliver 50-70% energy savings over metal halide while providing superior uniformity and color rendering for security cameras. Auvolar parking lot lights feature Type III distribution for perimeter poles and Type V for interior poles, with full cutoff optics meeting Dark Sky ordinance requirements. Photocell-equipped fixtures operate automatically from dusk to dawn.',
  },
  {
    slug: 'gas-station',
    title: 'Gas Station & Canopy Lighting',
    subtitle: 'Bright, reliable canopy lighting for fuel stations',
    description: 'Attract customers with bright, uniform canopy lighting while meeting petroleum industry safety standards.',
    metaTitle: 'LED Gas Station Lighting | Canopy Lights for Fuel Stations | Auvolar',
    metaDescription: 'LED gas station and canopy lighting. Slim-profile canopy lights 40W-75W, IP65 rated. Bright 5000K daylight, from $42. Complete gas station lighting packages.',
    keywords: ['gas station lighting', 'canopy light LED', 'fuel station lighting', 'petrol station lights', 'gas pump lighting', 'LED canopy light', 'gas station canopy', 'convenience store lighting'],
    iconName: 'Fuel',
    challenges: [
      'Harsh outdoor environment with temperature extremes and vehicle exhaust',
      'High brightness needed for customer safety and attraction',
      'Uniform lighting across canopy without hot spots or dark areas',
      '24/7 operation driving high energy costs',
    ],
    solutions: [
      'IP65 rated slim-profile canopy fixtures for weather protection',
      'Up to 150 lumens/watt for bright, efficient pump island illumination',
      'Edge-lit design providing uniform distribution across the canopy',
      'LED instant-on — no 15-minute MH warm-up after power interruptions',
    ],
    lightLevels: [
      { area: 'Pump island (under canopy)', minFc: '20 fc', recommendedFc: '30-50 fc' },
      { area: 'Drive area', minFc: '10 fc', recommendedFc: '20-30 fc' },
      { area: 'Convenience store', minFc: '30 fc', recommendedFc: '50-75 fc' },
      { area: 'Parking area', minFc: '1 fc', recommendedFc: '2-5 fc' },
    ],
    recommendedProducts: [
      { name: 'LED Canopy Light 40W', sku: 'CN-40W', wattage: '40W', description: 'Small canopies, 2-pump stations', slug: 'garage-canopy-light-an-cn' },
      { name: 'LED Canopy Light 75W', sku: 'CN-75W', wattage: '75W', description: 'Large canopies, 4-8 pump stations', slug: 'garage-canopy-light-an-cn' },
      { name: 'LED Wall Pack 50W', sku: 'WP-50W-5K', wattage: '50W', description: 'Building perimeter and signage', slug: 'small-wall-pack-scone-an-wsn-series' },
    ],
    seoContent: 'Well-lit gas stations attract 20-30% more nighttime customers than dimly lit competitors. LED canopy lights provide bright, uniform illumination across pump islands while consuming 60-70% less energy than metal halide. Auvolar canopy fixtures feature slim profiles for clean aesthetics, IP65 weather protection, and instant-on operation — critical for immediate full brightness after power interruptions.',
  },
  {
    slug: 'education',
    title: 'School & Education Lighting',
    subtitle: 'Healthy, efficient lighting for learning environments',
    description: 'Support student focus and wellbeing with flicker-free, tunable LED lighting designed for educational facilities.',
    metaTitle: 'LED School Lighting | Classroom & Gym LED Lights | Auvolar',
    metaDescription: 'LED lighting for schools and universities. Flicker-free troffers for classrooms, high bays for gyms. DLC certified, budget-friendly. From $45.',
    keywords: ['school lighting', 'classroom lighting', 'education lighting', 'university lighting', 'gymnasium lighting LED', 'school LED upgrade', 'flicker-free classroom', 'campus lighting'],
    iconName: 'GraduationCap',
    challenges: [
      'Tight budgets requiring cost-effective, rebate-eligible solutions',
      'Varied spaces from classrooms to gymnasiums to corridors',
      'Flicker-free lighting essential for student concentration',
      'Energy code compliance for renovation and new construction',
    ],
    solutions: [
      'Competitive pricing plus DLC rebates reducing net cost by 30-70%',
      'Complete fixture lineup for every educational space type',
      '<1% flicker meeting IEEE 1789 standards for visual comfort',
      'DLC Premium and Title 24 compliant for code compliance',
    ],
    lightLevels: [
      { area: 'Classroom', minFc: '30 fc', recommendedFc: '40-75 fc' },
      { area: 'Library', minFc: '30 fc', recommendedFc: '50-75 fc' },
      { area: 'Gymnasium', minFc: '30 fc', recommendedFc: '50-75 fc' },
      { area: 'Cafeteria', minFc: '15 fc', recommendedFc: '30-40 fc' },
      { area: 'Hallway', minFc: '10 fc', recommendedFc: '15-20 fc' },
    ],
    recommendedProducts: [
      { name: 'LED Troffer 2x4 50W', sku: 'TRF-2X4-50W', wattage: '50W', description: 'Classrooms — uniform, flicker-free', slug: 'panel-light-a-sfpl' },
      { name: 'UFO High Bay 150W', sku: 'HB-UFO-150W', wattage: '150W', description: 'Gymnasiums and cafeterias', slug: 'ufo-high-bay-light-hba-series' },
      { name: 'LED Wrap Light 4ft 40W', sku: 'WRP-4FT-40W', wattage: '40W', description: 'Corridors and stairwells', slug: 'an-wr4ft-led-wraparound' },
    ],
    seoContent: 'Quality lighting in educational facilities directly impacts student performance and wellbeing. Research shows that proper lighting increases test scores and reduces behavioral issues. Auvolar school lighting solutions provide flicker-free, uniform illumination across classrooms, libraries, and gymnasiums. Our DLC-certified fixtures qualify for utility rebates that help stretch school district budgets further.',
  },
  {
    slug: 'sports',
    title: 'Sports & Recreation Lighting',
    subtitle: 'High-performance lighting for athletic facilities',
    description: 'Deliver broadcast-quality lighting for sports venues with high-output LED fixtures designed for athletic applications.',
    metaTitle: 'LED Sports Facility Lighting | Gym & Court LED Lights | Auvolar',
    metaDescription: 'LED lighting for sports facilities, gyms, and recreation centers. High-output fixtures for courts and fields. Instant-on, flicker-free, DLC certified.',
    keywords: ['sports lighting', 'gymnasium lighting', 'gym LED lights', 'recreation center lighting', 'basketball court lighting', 'indoor sports lighting', 'fitness center lighting'],
    iconName: 'Dumbbell',
    challenges: [
      'High mounting heights (30-50ft+) in gymnasiums',
      'Need for uniform, glare-free lighting for player safety',
      'Instant-on required for events (no warm-up time)',
      'High CRI for accurate color perception during sports',
    ],
    solutions: [
      'High-output UFO high bays (200W-240W) for tall ceilings',
      'Anti-glare optics reducing direct glare on players and spectators',
      'Instant full brightness — no 15-minute warm-up like metal halide',
      '80+ CRI standard for excellent color rendering on courts',
    ],
    lightLevels: [
      { area: 'Recreational play', minFc: '30 fc', recommendedFc: '50-75 fc' },
      { area: 'Competitive sports', minFc: '50 fc', recommendedFc: '75-100 fc' },
      { area: 'Fitness center', minFc: '30 fc', recommendedFc: '50 fc' },
      { area: 'Swimming pool', minFc: '30 fc', recommendedFc: '50 fc' },
    ],
    recommendedProducts: [
      { name: 'UFO High Bay 240W', sku: 'HB-UFO-240W', wattage: '240W', description: 'Large gymnasiums, 35-50ft ceilings', slug: 'ufo-high-bay-light-oh-series' },
      { name: 'UFO High Bay 200W', sku: 'HB-UFO-200W', wattage: '200W', description: 'Fitness centers, 25-35ft ceilings', slug: 'ufo-high-bay-light-hba-series' },
      { name: 'LED Flood Light 400W', sku: 'FL-400W', wattage: '400W', description: 'Outdoor fields and courts', slug: 'flood-light-a-fl-adjustable' },
    ],
    seoContent: 'Sports facilities require specialized lighting that delivers uniform, glare-free illumination for player safety and spectator comfort. LED technology offers instant-on capability critical for events, eliminating the 15-minute warm-up delay of metal halide systems. Auvolar high bay and flood light fixtures provide the lumen output and distribution needed for gymnasiums, recreation centers, and outdoor courts.',
  },
  {
    slug: 'cold-storage',
    title: 'Cold Storage & Freezer Lighting',
    subtitle: 'Extreme-temperature rated LED lighting for cold facilities',
    description: 'Purpose-built LED fixtures that perform reliably in freezers and cold storage facilities down to -40°F (-40°C).',
    metaTitle: 'LED Cold Storage Lighting | Freezer & Cooler LED Lights | Auvolar',
    metaDescription: 'LED lighting for cold storage, freezers, and coolers. Rated to -40°F, IP65 sealed, vapor tight fixtures. Instant-on in extreme cold. From $45.',
    keywords: ['cold storage lighting', 'freezer lighting', 'LED freezer light', 'cold warehouse lighting', 'IP65 cold storage', 'vapor tight freezer', 'low temperature LED', 'refrigerated warehouse lighting'],
    iconName: 'Snowflake',
    challenges: [
      'Extreme cold (-40°F to 40°F) affecting standard fixture performance',
      'Condensation and ice buildup on fixtures during temperature cycling',
      'High ceilings (25-40ft) with limited maintenance access in cold',
      'Energy efficiency critical — lighting heat adds to refrigeration load',
    ],
    solutions: [
      'Fixtures rated -40°F to +131°F — actually MORE efficient in cold',
      'IP65/IP66 sealed vapor tight housing preventing moisture intrusion',
      '100,000+ hour life eliminating maintenance in hard-to-access cold areas',
      'LED generates 60-70% less heat than HID, reducing refrigeration costs',
    ],
    lightLevels: [
      { area: 'Cooler (34-40°F)', minFc: '10 fc', recommendedFc: '20-30 fc' },
      { area: 'Freezer (0 to -10°F)', minFc: '10 fc', recommendedFc: '20-30 fc' },
      { area: 'Blast freezer', minFc: '5 fc', recommendedFc: '10-20 fc' },
      { area: 'Loading dock', minFc: '20 fc', recommendedFc: '30 fc' },
    ],
    recommendedProducts: [
      { name: 'LED Vapor Tight 4ft 40W', sku: 'VT-4FT-40W', wattage: '40W', description: 'Walk-in coolers and freezers', slug: 'an-vf4ft-vapor-tight-strip' },
      { name: 'LED Vapor Tight 8ft 80W', sku: 'VT-8FT-80W', wattage: '80W', description: 'Large cold storage aisles', slug: 'an-vf4ft-vapor-tight-strip' },
      { name: 'UFO High Bay 150W', sku: 'HB-UFO-150W', wattage: '150W', description: 'High-ceiling cold storage (IP65)', slug: 'ufo-high-bay-light-hba-series' },
    ],
    seoContent: 'Cold storage facilities present unique lighting challenges that destroy standard fixtures. Fluorescent tubes dim by 50%+ below freezing and may not start at all. Metal halide requires 15+ minutes to warm up in cold. LED fixtures actually become more efficient at lower temperatures, providing instant full brightness even at -40°F. Auvolar vapor tight and high bay fixtures are sealed IP65/IP66, preventing moisture and ice intrusion. The reduced heat output of LED also lowers refrigeration costs — a hidden benefit that can double the energy savings calculation.',
  },
  {
    slug: 'healthcare',
    title: 'Healthcare & Medical Lighting',
    subtitle: 'Healing-focused lighting for medical facilities',
    description: 'Support patient recovery and staff performance with human-centric LED lighting designed for healthcare environments.',
    metaTitle: 'LED Healthcare Lighting | Hospital & Medical Facility LED Lights | Auvolar',
    metaDescription: 'LED lighting for hospitals and medical facilities. High-CRI for diagnosis, cleanable IP65 fixtures, tunable white for patient comfort. DLC certified.',
    keywords: ['healthcare lighting', 'hospital lighting', 'medical facility lighting', 'patient room lighting', 'exam room LED', 'healthcare LED', 'circadian lighting hospital'],
    iconName: 'Heart',
    challenges: [
      'High CRI (90+) needed for accurate diagnosis and treatment',
      'Infection control requiring sealed, cleanable fixture surfaces',
      'Patient comfort — tunable lighting for circadian rhythm support',
      'Compliance with IES RP-29 healthcare lighting standards',
    ],
    solutions: [
      '90+ CRI fixtures for accurate color rendering in exam rooms',
      'IP65 rated cleanable fixtures with sealed housing for infection control',
      'Tunable white (2700K-6500K) for patient circadian rhythm support',
      'IES RP-29 compliant lighting levels and uniformity specifications',
    ],
    lightLevels: [
      { area: 'Patient room (general)', minFc: '10 fc', recommendedFc: '20-30 fc' },
      { area: 'Exam/procedure room', minFc: '50 fc', recommendedFc: '75-100 fc' },
      { area: 'Nurse station', minFc: '30 fc', recommendedFc: '50 fc' },
      { area: 'Corridor', minFc: '10 fc', recommendedFc: '15-20 fc' },
      { area: 'Waiting room', minFc: '15 fc', recommendedFc: '20-30 fc' },
    ],
    recommendedProducts: [
      { name: 'LED Troffer 2x4 50W', sku: 'TRF-2X4-50W', wattage: '50W', description: 'Patient rooms, nurse stations', slug: 'panel-light-a-sfpl' },
      { name: 'Flat Panel LED 1x4 40W', sku: 'FPL-1X4-40W', wattage: '40W', description: 'Exam rooms, modern aesthetic', slug: 'panel-light-a-sfpl' },
      { name: '6" LED Downlight 15W', sku: 'DL-6IN-15W', wattage: '15W', description: 'Corridors, waiting rooms', slug: 'led-slim-down-light-4-6inch-in-9-10-12w' },
    ],
    seoContent: 'Healthcare lighting must balance clinical requirements with patient comfort. High CRI (90+) is essential in exam rooms for accurate diagnosis, while tunable white lighting in patient rooms supports natural circadian rhythms that aid recovery. Auvolar healthcare lighting solutions include cleanable, sealed fixtures for infection control and flicker-free operation for patient comfort.',
  },
  // === NEW APPLICATIONS (8 additional) ===
  {
    slug: 'church',
    title: 'Church & Worship Lighting',
    subtitle: 'Inspiring lighting for houses of worship',
    description: 'Create meaningful worship experiences with versatile LED lighting that supports services, events, and daily operations.',
    metaTitle: 'LED Church Lighting | Worship & Sanctuary LED Lights | Auvolar',
    metaDescription: 'LED lighting for churches and worship spaces. Dimmable fixtures for services, high bays for sanctuaries. Energy savings for non-profit budgets. From $12.',
    keywords: ['church lighting', 'worship lighting', 'sanctuary lighting', 'LED church lights', 'house of worship lighting', 'religious facility lighting'],
    iconName: 'Building2',
    challenges: [
      'High ceilings in sanctuaries requiring powerful fixtures',
      'Dimming needed for different service moods and events',
      'Limited budgets typical of non-profit organizations',
      'Historic building aesthetics requiring discreet fixtures',
    ],
    solutions: [
      'UFO high bays and downlights for varied ceiling heights',
      '0-10V dimming from 10-100% for services, events, and meetings',
      'DLC rebates and wholesale pricing to stretch non-profit budgets',
      'Compact, low-profile fixtures that complement architectural elements',
    ],
    lightLevels: [
      { area: 'Sanctuary (worship)', minFc: '15 fc', recommendedFc: '30-50 fc' },
      { area: 'Stage/pulpit', minFc: '50 fc', recommendedFc: '75-100 fc' },
      { area: 'Fellowship hall', minFc: '20 fc', recommendedFc: '30-50 fc' },
      { area: 'Classrooms', minFc: '30 fc', recommendedFc: '40-50 fc' },
    ],
    recommendedProducts: [
      { name: 'UFO High Bay 150W', sku: 'HB-UFO-150W', wattage: '150W', description: 'High-ceiling sanctuaries', slug: 'ufo-high-bay-light-hba-series' },
      { name: '6" LED Downlight 15W', sku: 'DL-6IN-15W', wattage: '15W', description: 'Fellowship halls, lobbies', slug: 'led-slim-down-light-4-6inch-in-9-10-12w' },
      { name: 'LED Troffer 2x4 50W', sku: 'TRF-2X4-50W', wattage: '50W', description: 'Classrooms, offices', slug: 'panel-light-a-sfpl' },
    ],
    seoContent: 'Churches and worship facilities face unique lighting challenges: high ceilings in sanctuaries, the need for dimmable lighting for different service types, and tight budgets. LED upgrades can reduce church electricity bills by 50-70%, freeing funds for ministry. Auvolar offers wholesale pricing and DLC-certified fixtures that qualify for utility rebates, making LED upgrades affordable for non-profit budgets.',
  },
  {
    slug: 'restaurant',
    title: 'Restaurant & Hospitality Lighting',
    subtitle: 'Ambiance-focused lighting for dining experiences',
    description: 'Create the perfect dining atmosphere with warm, dimmable LED lighting that enhances food presentation and guest comfort.',
    metaTitle: 'LED Restaurant Lighting | Dimmable Dining LED Lights | Auvolar',
    metaDescription: 'LED lighting for restaurants and hospitality. Warm 3000K dimmable fixtures, high-CRI for food presentation. Downlights from $12. Volume pricing.',
    keywords: ['restaurant lighting', 'hospitality lighting', 'dining lighting', 'LED restaurant lights', 'bar lighting', 'cafe lighting', 'warm LED commercial'],
    iconName: 'Building2',
    challenges: [
      'Ambiance critical — lighting directly affects dining experience',
      'Need for warm color temperature (2700K-3000K) for inviting atmosphere',
      'High CRI required for appetizing food presentation',
      'Multiple zones with different lighting needs (dining, bar, kitchen)',
    ],
    solutions: [
      'Warm white (2700K-3000K) fixtures for comfortable dining ambiance',
      '90+ CRI options making food and décor look their best',
      'TRIAC and 0-10V dimming for scene control throughout the day',
      'Downlights, pendants, and troffers for different restaurant zones',
    ],
    lightLevels: [
      { area: 'Fine dining', minFc: '5 fc', recommendedFc: '10-20 fc' },
      { area: 'Casual dining', minFc: '15 fc', recommendedFc: '20-30 fc' },
      { area: 'Fast casual', minFc: '20 fc', recommendedFc: '30-50 fc' },
      { area: 'Bar area', minFc: '5 fc', recommendedFc: '10-15 fc' },
      { area: 'Kitchen', minFc: '50 fc', recommendedFc: '75-100 fc' },
    ],
    recommendedProducts: [
      { name: '4" LED Downlight 10W', sku: 'DL-4IN-10W', wattage: '10W', description: 'Table accent lighting, intimate dining', slug: '4inch-6-inch-12w-fire-rated-downlight' },
      { name: '6" LED Downlight 15W', sku: 'DL-6IN-15W', wattage: '15W', description: 'General dining areas', slug: 'led-slim-down-light-4-6inch-in-9-10-12w' },
      { name: 'LED Strip Light 4ft 32W', sku: 'STR-4FT-32W', wattage: '32W', description: 'Kitchen task lighting', slug: 'strip-light-a-ls' },
    ],
    seoContent: 'Restaurant lighting is more than illumination — it sets the mood, influences how long guests stay, and affects food presentation. Warm color temperatures (2700K-3000K) create inviting atmospheres, while high CRI ensures food looks appetizing under artificial light. Auvolar offers dimmable LED fixtures that transition from bright lunch service to intimate dinner ambiance.',
  },
  {
    slug: 'auto-dealership',
    title: 'Auto Dealership Lighting',
    subtitle: 'Showcase vehicles with premium LED lighting',
    description: 'Make every car shine with bright, high-CRI LED lighting designed for showrooms, service bays, and outdoor lots.',
    metaTitle: 'LED Auto Dealership Lighting | Car Showroom & Lot Lights | Auvolar',
    metaDescription: 'LED lighting for auto dealerships. High-CRI showroom lights, service bay high bays, parking lot area lights. Make vehicles shine. DLC certified.',
    keywords: ['auto dealership lighting', 'car showroom lighting', 'dealership lot lighting', 'service bay lighting', 'automotive lighting commercial', 'car lot LED lights'],
    iconName: 'Car',
    challenges: [
      'Showroom requires high CRI (90+) to display true vehicle colors',
      'Service bays need bright, shadow-free task lighting',
      'Large outdoor lots require uniform, high-output area lights',
      'Extended operating hours driving up energy costs',
    ],
    solutions: [
      '90+ CRI troffers and downlights for color-accurate showroom displays',
      'LED high bays with 150+ lm/W efficiency for bright service bays',
      'Type III/V area lights providing uniform lot coverage for nighttime sales',
      'LED reduces energy costs 50-70% vs HID across all dealership areas',
    ],
    lightLevels: [
      { area: 'Showroom floor', minFc: '50 fc', recommendedFc: '100-150 fc' },
      { area: 'Service bay', minFc: '50 fc', recommendedFc: '75-100 fc' },
      { area: 'Outdoor display lot', minFc: '5 fc', recommendedFc: '10-20 fc' },
      { area: 'Parts department', minFc: '30 fc', recommendedFc: '50 fc' },
    ],
    recommendedProducts: [
      { name: 'LED Troffer 2x4 50W', sku: 'TRF-2X4-50W', wattage: '50W', description: 'Showroom — high CRI for vehicle display', slug: 'panel-light-a-sfpl' },
      { name: 'UFO High Bay 200W', sku: 'HB-UFO-200W', wattage: '200W', description: 'Service bays — bright, uniform task lighting', slug: 'ufo-high-bay-light-hba-series' },
      { name: 'LED Area Light 300W', sku: 'AL-300W-T3', wattage: '300W', description: 'Outdoor display lots', slug: '300w-420w-aera-lighting-shoebox-ot-series-l' },
    ],
    seoContent: 'Auto dealership lighting directly impacts vehicle sales. High-CRI lighting in showrooms reveals true paint colors and finishes, while bright service bay lighting improves technician accuracy and customer trust. Outdoor lot lighting must be bright enough for nighttime shopping while meeting Dark Sky ordinances. Auvolar provides complete dealership lighting packages covering showrooms, service, and lots.',
  },
  {
    slug: 'agriculture',
    title: 'Agricultural & Greenhouse Lighting',
    subtitle: 'Specialized LED lighting for farming operations',
    description: 'Durable, efficient LED lighting for barns, greenhouses, processing facilities, and outdoor agricultural areas.',
    metaTitle: 'LED Agricultural Lighting | Barn, Greenhouse & Farm LED Lights | Auvolar',
    metaDescription: 'LED lighting for agriculture. Vapor tight barn lights, grow lights for greenhouses, security lights for farms. Weather-resistant, DLC certified.',
    keywords: ['agricultural lighting', 'barn lighting LED', 'greenhouse lighting', 'farm lighting', 'livestock barn LED', 'poultry house lighting', 'agricultural LED'],
    iconName: 'Warehouse',
    challenges: [
      'Dust, moisture, and ammonia in livestock environments',
      'Outdoor exposure requiring weather-resistant fixtures',
      'Large barn and processing facility footprints',
      'Remote locations with limited electrical infrastructure',
    ],
    solutions: [
      'IP65-IP66 vapor tight fixtures sealed against dust, moisture, and chemicals',
      'UV-stabilized polycarbonate housing for outdoor durability',
      'High-efficiency fixtures reducing energy costs on large facilities',
      'Solar LED options for remote areas without grid power',
    ],
    lightLevels: [
      { area: 'General barn', minFc: '10 fc', recommendedFc: '20-30 fc' },
      { area: 'Milking parlor', minFc: '30 fc', recommendedFc: '50 fc' },
      { area: 'Processing facility', minFc: '30 fc', recommendedFc: '50-75 fc' },
      { area: 'Equipment storage', minFc: '5 fc', recommendedFc: '10-20 fc' },
    ],
    recommendedProducts: [
      { name: 'LED Vapor Tight 4ft 40W', sku: 'VT-4FT-40W', wattage: '40W', description: 'Barns, livestock housing — IP65 sealed', slug: 'an-vf4ft-vapor-tight-strip' },
      { name: 'LED Barn Light 70W', sku: 'AN-BL70W', wattage: '70W', description: 'Barn doors, entrances — dusk to dawn', slug: 'barn-light-an-bl-series' },
      { name: 'Solar Street Light 60W', sku: 'SOL-ST-60W', wattage: '60W', description: 'Remote areas without power', slug: 'solar-led-light-an-ssl' },
    ],
    seoContent: 'Agricultural lighting must withstand dust, moisture, chemicals, and extreme temperatures. Standard fixtures fail quickly in barn environments. Auvolar vapor tight fixtures are IP65/IP66 sealed, designed for the harsh conditions found in livestock barns, processing facilities, and greenhouses. Solar LED options provide lighting for remote agricultural areas without electrical infrastructure.',
  },
  {
    slug: 'government',
    title: 'Government & Municipal Lighting',
    subtitle: 'Efficient, compliant lighting for public facilities',
    description: 'Meet government energy mandates with DLC-certified LED fixtures designed for public buildings, streets, and facilities.',
    metaTitle: 'LED Government Lighting | Municipal & Public Facility LED Lights | Auvolar',
    metaDescription: 'LED lighting for government buildings and municipal facilities. DLC certified, Buy American compliant, Dark Sky ready. Meets federal energy mandates.',
    keywords: ['government lighting', 'municipal lighting', 'public facility lighting', 'street lighting LED', 'government building LED', 'Buy American LED', 'federal energy mandate lighting'],
    iconName: 'Building2',
    challenges: [
      'Federal and state energy mandates requiring LED upgrades',
      'Buy American / Made in USA procurement requirements',
      'Dark Sky compliance for street and outdoor lighting',
      'Budget constraints requiring maximum rebate utilization',
    ],
    solutions: [
      'DLC Premium certified meeting all government energy procurement standards',
      'Assembled in USA options available for Buy American compliance',
      'Full cutoff optics meeting Dark Sky and IESNA standards',
      'Utility rebate assistance to maximize taxpayer value',
    ],
    lightLevels: [
      { area: 'Office space', minFc: '30 fc', recommendedFc: '40-50 fc' },
      { area: 'Public corridors', minFc: '10 fc', recommendedFc: '15-20 fc' },
      { area: 'Street lighting', minFc: '0.5 fc', recommendedFc: '1-2 fc' },
      { area: 'Parking facilities', minFc: '1 fc', recommendedFc: '2-5 fc' },
    ],
    recommendedProducts: [
      { name: 'LED Troffer 2x4 50W', sku: 'TRF-2X4-50W', wattage: '50W', description: 'Government offices', slug: 'panel-light-a-sfpl' },
      { name: 'LED Area Light 200W', sku: 'AL-200W-T3', wattage: '200W', description: 'Municipal parking and streets', slug: '300w-420w-aera-lighting-shoebox-ot-series-l' },
      { name: 'LED Wall Pack 80W', sku: 'WP-80W-5K', wattage: '80W', description: 'Building perimeters', slug: 'wall-pack-light-wp-series' },
    ],
    seoContent: 'Government facilities face unique procurement requirements including Buy American provisions, Davis-Bacon compliance, and federal energy mandates. LED lighting upgrades help municipalities meet energy reduction targets while lowering taxpayer-funded utility costs. Auvolar provides DLC-certified fixtures that qualify for government procurement and utility rebate programs.',
  },
  {
    slug: 'car-wash',
    title: 'Car Wash Lighting',
    subtitle: 'Waterproof LED lighting for car wash environments',
    description: 'IP66-rated LED fixtures designed to withstand constant water, chemicals, and high humidity in car wash facilities.',
    metaTitle: 'LED Car Wash Lighting | Waterproof IP66 LED Fixtures | Auvolar',
    metaDescription: 'Waterproof LED lighting for car washes. IP66 vapor tight fixtures, chemical resistant, instant-on. Reduce energy costs 60%. From $45.',
    keywords: ['car wash lighting', 'waterproof LED light', 'IP66 LED fixture', 'car wash LED', 'tunnel wash lighting', 'self-serve car wash light', 'chemical resistant LED'],
    iconName: 'Zap',
    challenges: [
      'Constant water spray and high-pressure cleaning exposure',
      'Chemical exposure from soaps, degreasers, and waxes',
      'High humidity causing corrosion and electrical failures',
      'Bright illumination needed for customer safety and satisfaction',
    ],
    solutions: [
      'IP66 rated vapor tight fixtures sealed against powerful water jets',
      'Chemical-resistant polycarbonate housing and stainless steel clips',
      'Sealed electrical connections preventing moisture intrusion',
      '5000K daylight fixtures making vehicles look clean and bright',
    ],
    lightLevels: [
      { area: 'Wash tunnel', minFc: '20 fc', recommendedFc: '30-50 fc' },
      { area: 'Self-serve bay', minFc: '20 fc', recommendedFc: '30 fc' },
      { area: 'Vacuum area', minFc: '10 fc', recommendedFc: '20-30 fc' },
      { area: 'Drying area', minFc: '15 fc', recommendedFc: '20-30 fc' },
    ],
    recommendedProducts: [
      { name: 'LED Vapor Tight 4ft 40W', sku: 'VT-4FT-40W', wattage: '40W', description: 'Self-serve bays, vacuum areas', slug: 'an-vf4ft-vapor-tight-strip' },
      { name: 'LED Vapor Tight 8ft 80W', sku: 'VT-8FT-80W', wattage: '80W', description: 'Wash tunnels, long bays', slug: 'an-vf4ft-vapor-tight-strip' },
      { name: 'LED Canopy Light 75W', sku: 'CN-75W', wattage: '75W', description: 'Covered entrance/exit canopies', slug: 'garage-canopy-light-an-cn' },
    ],
    seoContent: 'Car wash environments destroy standard lighting fixtures within months. Water spray, chemical exposure, and constant humidity require IP66-rated fixtures with sealed housing and corrosion-resistant hardware. Auvolar vapor tight fixtures are specifically designed for wet environments, featuring sealed polycarbonate housing, stainless steel clips, and silicone gaskets that withstand car wash chemicals and high-pressure water.',
  },
  {
    slug: 'loading-dock',
    title: 'Loading Dock Lighting',
    subtitle: 'Safety-focused lighting for shipping and receiving areas',
    description: 'Reduce accidents and improve efficiency at loading docks with bright, instant-on LED fixtures rated for outdoor exposure.',
    metaTitle: 'LED Loading Dock Lighting | Dock & Receiving Area LED Lights | Auvolar',
    metaDescription: 'LED lighting for loading docks and shipping areas. Vapor tight and wall pack fixtures, IP65 rated. Improve safety and efficiency. From $38.',
    keywords: ['loading dock lighting', 'dock light LED', 'shipping area lighting', 'receiving dock lighting', 'warehouse dock light', 'forklift safety lighting'],
    iconName: 'Warehouse',
    challenges: [
      'Transition zone between indoor and outdoor creating glare/dark adaptation issues',
      'Exposure to rain, snow, and temperature extremes at open dock doors',
      'Forklift traffic requiring bright, uniform lighting for safety',
      'Overhead door operation area needing impact-resistant fixtures',
    ],
    solutions: [
      'High-output fixtures reducing indoor/outdoor brightness contrast',
      'IP65 rated fixtures for weather-exposed dock positions',
      'Bright 30+ fc illumination meeting OSHA requirements for forklift areas',
      'Impact-resistant polycarbonate lenses rated IK08+',
    ],
    lightLevels: [
      { area: 'Dock platform (interior)', minFc: '20 fc', recommendedFc: '30-50 fc' },
      { area: 'Dock apron (exterior)', minFc: '5 fc', recommendedFc: '10-20 fc' },
      { area: 'Inside trailer', minFc: '10 fc', recommendedFc: '20-30 fc' },
      { area: 'Dock door area', minFc: '20 fc', recommendedFc: '30 fc' },
    ],
    recommendedProducts: [
      { name: 'LED Vapor Tight 4ft 40W', sku: 'VT-4FT-40W', wattage: '40W', description: 'Interior dock ceiling — weather resistant', slug: 'an-vf4ft-vapor-tight-strip' },
      { name: 'LED Wall Pack 80W', sku: 'WP-80W-5K', wattage: '80W', description: 'Exterior dock face — bright perimeter lighting', slug: 'wall-pack-light-wp-series' },
      { name: 'LED Flood Light 100W', sku: 'FL-100W', wattage: '100W', description: 'Dock yard — truck maneuvering area', slug: 'flood-light-an-fly' },
    ],
    seoContent: 'Loading docks are high-accident zones where forklift traffic, pedestrians, and vehicles intersect. Proper lighting is essential for OSHA compliance and worker safety. The transition between bright indoor warehouse lighting and dark outdoor dock areas creates dangerous glare and dark adaptation problems. Auvolar dock lighting solutions provide consistent illumination across the indoor-outdoor transition zone with weather-resistant IP65 fixtures.',
  },
  {
    slug: 'security',
    title: 'Security & Perimeter Lighting',
    subtitle: 'Deter crime and improve safety with LED security lighting',
    description: 'Protect your property with bright, motion-activated LED security lighting covering building perimeters, fences, and vulnerable areas.',
    metaTitle: 'LED Security Lighting | Perimeter & Motion Sensor LED Lights | Auvolar',
    metaDescription: 'LED security lighting for commercial properties. Wall packs, flood lights, motion sensors. Dusk-to-dawn operation, IP65 rated. From $38.',
    keywords: ['security lighting', 'perimeter lighting', 'commercial security lights', 'motion sensor LED', 'dusk to dawn LED', 'property security lighting', 'fence line lighting'],
    iconName: 'Shield',
    challenges: [
      'Dark areas around buildings creating security vulnerabilities',
      'High energy costs from running security lights all night',
      'Need for motion detection to alert to intrusions',
      'Vandal-resistant fixtures in public-facing locations',
    ],
    solutions: [
      'High-output wall packs and flood lights eliminating dark spots',
      'Photocell + motion sensor combination for maximum energy savings',
      'Integrated motion sensors dimming to 20% when unoccupied, 100% on motion',
      'IK08+ impact-rated housings for vandal resistance',
    ],
    lightLevels: [
      { area: 'Building perimeter', minFc: '1 fc', recommendedFc: '2-5 fc' },
      { area: 'Entrance/exit', minFc: '5 fc', recommendedFc: '10-20 fc' },
      { area: 'Fence line', minFc: '0.5 fc', recommendedFc: '1-2 fc' },
      { area: 'Parking area', minFc: '1 fc', recommendedFc: '2-5 fc' },
    ],
    recommendedProducts: [
      { name: 'LED Wall Pack 80W', sku: 'WP-80W-5K', wattage: '80W', description: 'Building perimeter — bright, wide coverage', slug: 'wall-pack-light-wp-series' },
      { name: 'LED Flood Light 200W', sku: 'FL-200W', wattage: '200W', description: 'Large area security — fences, yards', slug: 'flood-light-an-fly' },
      { name: 'LED Wall Pack 30W', sku: 'WP-30W-5K', wattage: '30W', description: 'Doorways, emergency exits', slug: 'small-wall-pack-scone-an-wsn-series' },
      { name: 'Photocell', sku: 'SENS-WP-PC', wattage: 'N/A', description: 'Dusk-to-dawn automatic operation', slug: 'photocell-for-wall-pack-area-light' },
    ],
    seoContent: 'Effective security lighting is the most cost-efficient crime deterrent for commercial properties. Well-lit perimeters, entrances, and parking areas deter criminal activity and improve surveillance camera image quality. Auvolar security lighting solutions combine photocell operation (dusk-to-dawn) with optional motion sensors that dim to 20% when no activity is detected, saving 40-60% energy while maintaining base security illumination.',
  },
]

// Helper functions
export function getApplication(slug: string): ApplicationData | undefined {
  return applications.find(a => a.slug === slug)
}

export function getAllApplicationSlugs(): string[] {
  return applications.map(a => a.slug)
}

export function getAllApplications(): ApplicationData[] {
  return applications
}
