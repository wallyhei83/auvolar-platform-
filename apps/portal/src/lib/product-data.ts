// Comprehensive Product Data for Auvolar
// This file contains all product information for the PDP

import { Sun, Zap, Star, Ruler, Shield, Clock, Thermometer } from 'lucide-react'

export type Product = {
  name: string
  sku: string
  series: string
  category: string
  subcategory: string
  price: number
  msrp: number
  stock: string
  stockQty: number
  leadTime: string
  warehouse?: string
  description: string
  shortDescription: string
  variants?: {
    wattage?: string[]
    cct?: string[]
    voltage?: string[]
    size?: string[]
    distribution?: string[]
    finish?: string[]
  }
  selectedVariant?: Record<string, string>
  specs: {
    electrical?: Record<string, string>
    photometric?: Record<string, string>
    physical?: Record<string, string>
    environmental?: Record<string, string>
    controls?: Record<string, string>
  }
  quickSpecs: { label: string; value: string; icon: any }[]
  certifications: { name: string; number?: string; verified: boolean }[]
  downloads: { name: string; type: string; size: string }[]
  tierPricing: { min: number; max?: number | null; price: number; label?: string }[]
  applications: string[]
  replaces?: string[]
  warranty: { years: number; type: string; description?: string }
  accessories?: { sku: string; name: string; price: number }[]
  relatedProducts?: string[]
}

// Helper function to generate standard product structure
const createProduct = (base: Partial<Product>): Product => ({
  name: base.name || 'Product',
  sku: base.sku || 'SKU-001',
  series: base.series || 'Standard Series',
  category: base.category || 'Indoor Lighting',
  subcategory: base.subcategory || 'General',
  price: base.price || 99,
  msrp: base.msrp || 149,
  stock: base.stockQty && base.stockQty > 0 ? 'In Stock' : 'Ships in 3-5 days',
  stockQty: base.stockQty || 0,
  leadTime: base.stockQty && base.stockQty > 0 ? 'Ships within 24 hours' : '3-5 business days',
  warehouse: base.warehouse || 'Houston, TX',
  description: base.description || '',
  shortDescription: base.shortDescription || '',
  variants: base.variants,
  selectedVariant: base.selectedVariant,
  specs: base.specs || {},
  quickSpecs: base.quickSpecs || [],
  certifications: base.certifications || [
    { name: 'DLC Standard', verified: true },
    { name: 'UL Listed', verified: true },
  ],
  downloads: base.downloads || [
    { name: 'Cut Sheet / Spec Sheet', type: 'PDF', size: '1.2 MB' },
    { name: 'IES Photometric File', type: 'IES', size: '45 KB' },
    { name: 'Installation Guide', type: 'PDF', size: '2.8 MB' },
  ],
  tierPricing: base.tierPricing || [
    { min: 1, max: 9, price: base.price || 99, label: '1-9' },
    { min: 10, max: 24, price: Math.round((base.price || 99) * 0.92), label: '10-24' },
    { min: 25, max: 49, price: Math.round((base.price || 99) * 0.85), label: '25-49' },
    { min: 50, max: 99, price: Math.round((base.price || 99) * 0.78), label: '50-99' },
    { min: 100, max: null, price: Math.round((base.price || 99) * 0.73), label: '100+' },
  ],
  applications: base.applications || ['Commercial', 'Industrial'],
  replaces: base.replaces,
  warranty: base.warranty || { years: 5, type: 'Limited Warranty', description: 'Covers defects in materials and workmanship' },
  accessories: base.accessories,
  relatedProducts: base.relatedProducts,
})

export const products: Record<string, Product> = {
  // ==================== INDOOR - HIGH BAY ====================
  'HB-UFO-100W': createProduct({
    name: 'UFO High Bay LED Light 100W',
    sku: 'HB-UFO-100W',
    series: 'ProBay Series',
    category: 'Indoor Lighting',
    subcategory: 'High Bay Lights',
    price: 69,
    msrp: 99,
    stockQty: 312,
    description: 'Entry-level UFO high bay for smaller facilities with 15-20ft ceiling heights. Perfect for retail spaces, smaller warehouses, and workshops.',
    shortDescription: 'Compact UFO high bay for 15-20ft ceilings',
    variants: {
      wattage: ['100W', '150W', '200W'],
      cct: ['4000K', '5000K'],
      voltage: ['120-277V'],
    },
    selectedVariant: { wattage: '100W', cct: '5000K', voltage: '120-277V' },
    specs: {
      electrical: { 'Wattage': '100W', 'Input Voltage': '100-277V AC', 'Power Factor': '> 0.95', 'THD': '< 15%' },
      photometric: { 'Lumens': '15,000 lm', 'Efficacy': '150 lm/W', 'CRI': '> 80', 'Beam Angle': '120°' },
      physical: { 'Dimensions': '∅11.8" x 6.9" H', 'Weight': '6.5 lbs', 'Housing': 'Die-cast Aluminum' },
      environmental: { 'Operating Temp': '-40°F to 122°F', 'IP Rating': 'IP65', 'Rated Life': '100,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '15,000 lm', icon: Sun },
      { label: 'Efficacy', value: '150 lm/W', icon: Zap },
      { label: 'CRI', value: '> 80', icon: Star },
      { label: 'Beam', value: '120°', icon: Ruler },
      { label: 'IP Rating', value: 'IP65', icon: Shield },
      { label: 'Life', value: '100,000 hrs', icon: Clock },
    ],
    certifications: [
      { name: 'DLC Standard', number: 'QUQMJWDC', verified: true },
      { name: 'UL Listed', number: 'E483386', verified: true },
      { name: 'FCC', verified: true },
      { name: 'RoHS', verified: true },
    ],
    applications: ['Warehouse', 'Retail', 'Workshop', 'Garage'],
    replaces: ['250W Metal Halide', '4-lamp T5HO'],
    accessories: [
      { sku: 'SENS-HB-MS', name: 'Motion Sensor for High Bay', price: 29 },
      { sku: 'CORD-HB-6FT', name: '6ft Power Cord with Plug', price: 15 },
    ],
  }),

  'HB-UFO-150W': createProduct({
    name: 'UFO High Bay LED Light 150W',
    sku: 'HB-UFO-150W',
    series: 'ProBay Series',
    category: 'Indoor Lighting',
    subcategory: 'High Bay Lights',
    price: 89,
    msrp: 129,
    stockQty: 245,
    description: 'Commercial-grade UFO high bay LED light designed for warehouses, manufacturing facilities, gymnasiums, and large retail spaces. Features excellent heat dissipation with die-cast aluminum housing, wide 120° beam angle for uniform coverage, and industry-leading 150 lm/W efficacy.',
    shortDescription: 'High-efficiency UFO high bay for 20-30ft ceilings',
    variants: {
      wattage: ['100W', '150W', '200W', '240W'],
      cct: ['4000K', '5000K'],
      voltage: ['120-277V', '347-480V'],
    },
    selectedVariant: { wattage: '150W', cct: '5000K', voltage: '120-277V' },
    specs: {
      electrical: { 'Wattage': '150W', 'Input Voltage': '100-277V AC', 'Power Factor': '> 0.95', 'THD': '< 15%', 'Frequency': '50/60 Hz' },
      photometric: { 'Lumens': '22,500 lm', 'Efficacy': '150 lm/W', 'CRI': '> 80', 'CCT': '5000K (Daylight)', 'Beam Angle': '120°' },
      physical: { 'Dimensions': '∅13.8" x 7.9" H', 'Weight': '8.8 lbs', 'Housing': 'Die-cast Aluminum', 'Lens': 'PC (Polycarbonate)', 'Finish': 'Black Powder Coat' },
      environmental: { 'Operating Temp': '-40°F to 122°F', 'IP Rating': 'IP65', 'Humidity': '10-90% RH', 'Rated Life': '100,000 hours (L70)' },
      controls: { 'Dimming': '0-10V Dimmable', 'Sensor Ready': 'Yes (Optional)', 'Emergency Backup': 'Optional' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '22,500 lm', icon: Sun },
      { label: 'Efficacy', value: '150 lm/W', icon: Zap },
      { label: 'CRI', value: '> 80', icon: Star },
      { label: 'Beam', value: '120°', icon: Ruler },
      { label: 'IP Rating', value: 'IP65', icon: Shield },
      { label: 'Life', value: '100,000 hrs', icon: Clock },
    ],
    certifications: [
      { name: 'DLC Premium', number: 'QUQMJWDC', verified: true },
      { name: 'UL Listed', number: 'E483386', verified: true },
      { name: 'FCC', verified: true },
      { name: 'RoHS', verified: true },
    ],
    applications: ['Warehouse', 'Manufacturing', 'Gymnasium', 'Retail', 'Cold Storage'],
    replaces: ['400W Metal Halide', '6-lamp T5HO', '250W HPS'],
    accessories: [
      { sku: 'SENS-HB-MS', name: 'Motion Sensor for High Bay', price: 29 },
      { sku: 'CORD-HB-6FT', name: '6ft Power Cord with Plug', price: 15 },
      { sku: 'HOOK-HB-ADJ', name: 'Adjustable Hook Mount', price: 12 },
      { sku: 'EMRG-HB-90', name: '90-min Emergency Backup', price: 89 },
    ],
  }),

  'HB-UFO-200W': createProduct({
    name: 'UFO High Bay LED Light 200W',
    sku: 'HB-UFO-200W',
    series: 'ProBay Series',
    category: 'Indoor Lighting',
    subcategory: 'High Bay Lights',
    price: 109,
    msrp: 159,
    stockQty: 189,
    description: 'High-output UFO high bay LED for large warehouses and industrial facilities with 25-35ft ceiling heights. Ideal replacement for 400W metal halide fixtures.',
    shortDescription: 'High-output UFO for 25-35ft ceilings',
    variants: {
      wattage: ['150W', '200W', '240W'],
      cct: ['4000K', '5000K'],
      voltage: ['120-277V', '347-480V'],
    },
    selectedVariant: { wattage: '200W', cct: '5000K', voltage: '120-277V' },
    specs: {
      electrical: { 'Wattage': '200W', 'Input Voltage': '100-277V AC', 'Power Factor': '> 0.95' },
      photometric: { 'Lumens': '30,000 lm', 'Efficacy': '150 lm/W', 'CRI': '> 80', 'Beam Angle': '120°' },
      physical: { 'Dimensions': '∅15.7" x 8.5" H', 'Weight': '11.2 lbs' },
      environmental: { 'IP Rating': 'IP65', 'Rated Life': '100,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '30,000 lm', icon: Sun },
      { label: 'Efficacy', value: '150 lm/W', icon: Zap },
      { label: 'CRI', value: '> 80', icon: Star },
      { label: 'Beam', value: '120°', icon: Ruler },
      { label: 'IP Rating', value: 'IP65', icon: Shield },
      { label: 'Life', value: '100,000 hrs', icon: Clock },
    ],
    certifications: [
      { name: 'DLC Premium', verified: true },
      { name: 'UL Listed', verified: true },
    ],
    applications: ['Warehouse', 'Manufacturing', 'Distribution Center', 'Arena'],
    replaces: ['400W Metal Halide', '500W HPS'],
  }),

  'HB-UFO-240W': createProduct({
    name: 'UFO High Bay LED Light 240W',
    sku: 'HB-UFO-240W',
    series: 'ProBay Series',
    category: 'Indoor Lighting',
    subcategory: 'High Bay Lights',
    price: 139,
    msrp: 199,
    stockQty: 124,
    description: 'Maximum output UFO high bay for the largest industrial spaces with 30-40ft ceiling heights. Suitable for airports, aircraft hangars, and large manufacturing plants.',
    shortDescription: 'Maximum output UFO for 30-40ft ceilings',
    variants: {
      wattage: ['200W', '240W'],
      cct: ['4000K', '5000K'],
      voltage: ['120-277V', '347-480V'],
    },
    selectedVariant: { wattage: '240W', cct: '5000K', voltage: '120-277V' },
    specs: {
      electrical: { 'Wattage': '240W', 'Input Voltage': '100-277V AC', 'Power Factor': '> 0.95' },
      photometric: { 'Lumens': '36,000 lm', 'Efficacy': '150 lm/W', 'CRI': '> 80', 'Beam Angle': '120°' },
      physical: { 'Dimensions': '∅17.3" x 9.2" H', 'Weight': '13.5 lbs' },
      environmental: { 'IP Rating': 'IP65', 'Rated Life': '100,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '36,000 lm', icon: Sun },
      { label: 'Efficacy', value: '150 lm/W', icon: Zap },
      { label: 'CRI', value: '> 80', icon: Star },
      { label: 'Beam', value: '120°', icon: Ruler },
      { label: 'IP Rating', value: 'IP65', icon: Shield },
      { label: 'Life', value: '100,000 hrs', icon: Clock },
    ],
    certifications: [
      { name: 'DLC Premium', verified: true },
      { name: 'UL Listed', verified: true },
    ],
    applications: ['Aircraft Hangar', 'Airport', 'Manufacturing', 'Arena'],
    replaces: ['600W Metal Halide', '750W HPS'],
  }),

  'LHB-165W': createProduct({
    name: 'Linear High Bay LED 165W',
    sku: 'LHB-165W',
    series: 'ProLine Series',
    category: 'Indoor Lighting',
    subcategory: 'High Bay Lights',
    price: 99,
    msrp: 149,
    stockQty: 178,
    description: '2ft linear LED high bay ideal for aisle lighting in warehouses and retail. Provides directional illumination for rack areas.',
    shortDescription: '2ft linear high bay for aisle lighting',
    variants: {
      wattage: ['165W', '220W'],
      cct: ['4000K', '5000K'],
      voltage: ['120-277V'],
    },
    selectedVariant: { wattage: '165W', cct: '5000K', voltage: '120-277V' },
    specs: {
      electrical: { 'Wattage': '165W', 'Input Voltage': '120-277V AC' },
      photometric: { 'Lumens': '24,750 lm', 'Efficacy': '150 lm/W', 'Distribution': 'Asymmetric' },
      physical: { 'Dimensions': '24" x 12" x 4.5"', 'Weight': '8.2 lbs' },
      environmental: { 'IP Rating': 'IP65', 'Rated Life': '100,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '24,750 lm', icon: Sun },
      { label: 'Efficacy', value: '150 lm/W', icon: Zap },
      { label: 'Length', value: '24"', icon: Ruler },
      { label: 'IP Rating', value: 'IP65', icon: Shield },
    ],
    applications: ['Warehouse Aisles', 'Distribution Center', 'Retail'],
  }),

  'LHB-220W': createProduct({
    name: 'Linear High Bay LED 220W',
    sku: 'LHB-220W',
    series: 'ProLine Series',
    category: 'Indoor Lighting',
    subcategory: 'High Bay Lights',
    price: 129,
    msrp: 189,
    stockQty: 156,
    description: '4ft linear LED high bay for wider aisle coverage and general high-ceiling illumination in warehouses and big-box retail.',
    shortDescription: '4ft linear high bay for wide aisle lighting',
    variants: {
      wattage: ['165W', '220W'],
      cct: ['4000K', '5000K'],
      voltage: ['120-277V'],
    },
    selectedVariant: { wattage: '220W', cct: '5000K', voltage: '120-277V' },
    specs: {
      electrical: { 'Wattage': '220W', 'Input Voltage': '120-277V AC' },
      photometric: { 'Lumens': '33,000 lm', 'Efficacy': '150 lm/W' },
      physical: { 'Dimensions': '48" x 12" x 4.5"', 'Weight': '12.8 lbs' },
      environmental: { 'IP Rating': 'IP65', 'Rated Life': '100,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '33,000 lm', icon: Sun },
      { label: 'Efficacy', value: '150 lm/W', icon: Zap },
      { label: 'Length', value: '48"', icon: Ruler },
      { label: 'IP Rating', value: 'IP65', icon: Shield },
    ],
    certifications: [{ name: 'DLC Premium', verified: true }, { name: 'UL Listed', verified: true }],
    applications: ['Warehouse', 'Big Box Retail', 'Manufacturing'],
    replaces: ['6-lamp T5HO', '400W Metal Halide'],
  }),

  // ==================== INDOOR - TROFFERS & PANELS ====================
  'TRF-2X2-40W': createProduct({
    name: 'LED Troffer 2x2 40W',
    sku: 'TRF-2X2-40W',
    series: 'OfficePro Series',
    category: 'Indoor Lighting',
    subcategory: 'Troffers & Panels',
    price: 49,
    msrp: 79,
    stockQty: 520,
    description: '2x2 LED troffer panel for drop ceiling applications in offices, schools, and healthcare facilities. Features uniform edge-lit design with no visible hotspots.',
    shortDescription: '2x2 edge-lit troffer for office ceilings',
    variants: {
      wattage: ['32W', '40W', '50W'],
      cct: ['3500K', '4000K', '5000K', 'Tunable'],
      voltage: ['120-277V'],
    },
    selectedVariant: { wattage: '40W', cct: '4000K', voltage: '120-277V' },
    specs: {
      electrical: { 'Wattage': '40W', 'Input Voltage': '120-277V AC', 'Power Factor': '> 0.9' },
      photometric: { 'Lumens': '5,000 lm', 'Efficacy': '125 lm/W', 'CRI': '> 90', 'UGR': '< 19' },
      physical: { 'Dimensions': '24" x 24" x 2.5"', 'Weight': '7.5 lbs' },
      environmental: { 'Operating Temp': '32°F to 104°F', 'Rated Life': '50,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '5,000 lm', icon: Sun },
      { label: 'CRI', value: '> 90', icon: Star },
      { label: 'UGR', value: '< 19', icon: Shield },
      { label: 'Life', value: '50,000 hrs', icon: Clock },
    ],
    certifications: [
      { name: 'DLC Standard', verified: true },
      { name: 'UL Listed', verified: true },
    ],
    applications: ['Office', 'School', 'Healthcare', 'Retail'],
    replaces: ['2x2 U-bend Fluorescent', '3-lamp T8'],
    warranty: { years: 5, type: 'Limited Warranty' },
  }),

  'TRF-2X4-50W': createProduct({
    name: 'LED Troffer 2x4 50W',
    sku: 'TRF-2X4-50W',
    series: 'OfficePro Series',
    category: 'Indoor Lighting',
    subcategory: 'Troffers & Panels',
    price: 59,
    msrp: 89,
    stockQty: 445,
    description: '2x4 LED troffer panel for standard drop ceiling grids. High CRI for accurate color rendering in office and educational environments.',
    shortDescription: '2x4 edge-lit troffer for office ceilings',
    variants: {
      wattage: ['40W', '50W', '60W'],
      cct: ['3500K', '4000K', '5000K', 'Tunable'],
      voltage: ['120-277V'],
    },
    selectedVariant: { wattage: '50W', cct: '4000K', voltage: '120-277V' },
    specs: {
      electrical: { 'Wattage': '50W', 'Input Voltage': '120-277V AC' },
      photometric: { 'Lumens': '6,250 lm', 'Efficacy': '125 lm/W', 'CRI': '> 90' },
      physical: { 'Dimensions': '48" x 24" x 2.5"', 'Weight': '11.5 lbs' },
      environmental: { 'Rated Life': '50,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '6,250 lm', icon: Sun },
      { label: 'CRI', value: '> 90', icon: Star },
      { label: 'Size', value: '2x4 ft', icon: Ruler },
      { label: 'Life', value: '50,000 hrs', icon: Clock },
    ],
    applications: ['Office', 'School', 'Conference Room'],
    replaces: ['3-lamp T8 Troffer', '4-lamp T8 Troffer'],
  }),

  'FPL-1X4-40W': createProduct({
    name: 'Flat Panel LED 1x4 40W',
    sku: 'FPL-1X4-40W',
    series: 'SlimLine Series',
    category: 'Indoor Lighting',
    subcategory: 'Troffers & Panels',
    price: 45,
    msrp: 69,
    stockQty: 380,
    description: 'Ultra-slim 1x4 LED flat panel for surface mount or recessed installation. Ideal for corridors, closets, and narrow spaces.',
    shortDescription: '1x4 slim panel for corridors and narrow spaces',
    variants: {
      wattage: ['30W', '40W'],
      cct: ['4000K', '5000K'],
      voltage: ['120-277V'],
    },
    selectedVariant: { wattage: '40W', cct: '4000K', voltage: '120-277V' },
    specs: {
      electrical: { 'Wattage': '40W', 'Input Voltage': '120-277V AC' },
      photometric: { 'Lumens': '4,800 lm', 'Efficacy': '120 lm/W', 'CRI': '> 80' },
      physical: { 'Dimensions': '48" x 12" x 1.5"', 'Weight': '5.5 lbs' },
      environmental: { 'Rated Life': '50,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '4,800 lm', icon: Sun },
      { label: 'CRI', value: '> 80', icon: Star },
      { label: 'Depth', value: '1.5"', icon: Ruler },
    ],
    applications: ['Corridor', 'Closet', 'Break Room'],
  }),

  // ==================== INDOOR - LED TUBES ====================
  'T8-4FT-18W': createProduct({
    name: '4ft LED Tube T8 18W',
    sku: 'T8-4FT-18W',
    series: 'EcoTube Series',
    category: 'Indoor Lighting',
    subcategory: 'LED Tubes',
    price: 8,
    msrp: 15,
    stockQty: 2450,
    description: 'Type A+B hybrid LED tube that works with existing ballast (Type A) or direct wire bypass (Type B). Frosted lens eliminates glare.',
    shortDescription: 'Type A+B hybrid LED tube',
    variants: {
      wattage: ['15W', '18W'],
      cct: ['4000K', '5000K'],
    },
    selectedVariant: { wattage: '18W', cct: '5000K' },
    specs: {
      electrical: { 'Wattage': '18W', 'Input Voltage': '120-277V AC (Type B) or Ballast Compatible (Type A)' },
      photometric: { 'Lumens': '2,200 lm', 'Efficacy': '122 lm/W', 'CRI': '> 82' },
      physical: { 'Dimensions': '47.2" x 1.06" diameter', 'Weight': '0.35 lbs', 'Base': 'G13 Bi-pin' },
      environmental: { 'Rated Life': '50,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '2,200 lm', icon: Sun },
      { label: 'Type', value: 'A+B', icon: Zap },
      { label: 'Life', value: '50,000 hrs', icon: Clock },
    ],
    certifications: [
      { name: 'DLC Standard', verified: true },
      { name: 'UL Type A+B', verified: true },
    ],
    applications: ['Office', 'Retail', 'Warehouse', 'Garage'],
    replaces: ['32W T8 Fluorescent', 'F32T8'],
    tierPricing: [
      { min: 1, max: 24, price: 8, label: '1-24' },
      { min: 25, max: 99, price: 7, label: '25-99' },
      { min: 100, max: 499, price: 6, label: '100-499' },
      { min: 500, max: null, price: 5.50, label: '500+' },
    ],
  }),

  'T8-2FT-9W': createProduct({
    name: '2ft LED Tube T8 9W',
    sku: 'T8-2FT-9W',
    series: 'EcoTube Series',
    category: 'Indoor Lighting',
    subcategory: 'LED Tubes',
    price: 6,
    msrp: 12,
    stockQty: 1850,
    description: '2ft Type A+B LED tube for under-cabinet and compact fixtures. Direct replacement for F17T8 fluorescent tubes.',
    shortDescription: '2ft hybrid LED tube for compact fixtures',
    variants: {
      cct: ['4000K', '5000K'],
    },
    selectedVariant: { cct: '4000K' },
    specs: {
      electrical: { 'Wattage': '9W', 'Input Voltage': '120-277V AC / Ballast' },
      photometric: { 'Lumens': '1,100 lm', 'Efficacy': '122 lm/W' },
      physical: { 'Dimensions': '23.8" x 1.06" diameter', 'Base': 'G13 Bi-pin' },
      environmental: { 'Rated Life': '50,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '1,100 lm', icon: Sun },
      { label: 'Type', value: 'A+B', icon: Zap },
    ],
    applications: ['Under-cabinet', 'Display Case', 'Office'],
    replaces: ['17W T8 Fluorescent', 'F17T8'],
  }),

  'T5-4FT-25W': createProduct({
    name: '4ft LED Tube T5 25W',
    sku: 'T5-4FT-25W',
    series: 'EcoTube Series',
    category: 'Indoor Lighting',
    subcategory: 'LED Tubes',
    price: 12,
    msrp: 22,
    stockQty: 890,
    description: 'T5 form factor LED tube for high-output applications. Replaces T5HO fluorescent in high bay and retail fixtures.',
    shortDescription: 'T5 LED tube for high-output fixtures',
    variants: {
      wattage: ['25W', '28W'],
      cct: ['4000K', '5000K'],
    },
    selectedVariant: { wattage: '25W', cct: '5000K' },
    specs: {
      electrical: { 'Wattage': '25W', 'Input Voltage': '120-277V AC' },
      photometric: { 'Lumens': '3,500 lm', 'Efficacy': '140 lm/W' },
      physical: { 'Dimensions': '45.8" x 0.63" diameter', 'Base': 'G5 Mini Bi-pin' },
      environmental: { 'Rated Life': '50,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '3,500 lm', icon: Sun },
      { label: 'Efficacy', value: '140 lm/W', icon: Zap },
    ],
    applications: ['Retail', 'High Bay Troffer', 'Industrial'],
    replaces: ['54W T5HO', 'F54T5HO'],
  }),

  // ==================== OUTDOOR - WALL PACKS ====================
  'WP-30W-5K': createProduct({
    name: 'LED Wall Pack 30W',
    sku: 'WP-30W-5K',
    series: 'Guardian Series',
    category: 'Outdoor Lighting',
    subcategory: 'Wall Packs',
    price: 45,
    msrp: 69,
    stockQty: 420,
    description: 'Compact full cutoff LED wall pack for entryways, stairwells, and building perimeters. Dark sky compliant design eliminates light trespass.',
    shortDescription: 'Compact wall pack for entryways',
    variants: {
      wattage: ['30W', '50W'],
      cct: ['4000K', '5000K'],
    },
    selectedVariant: { wattage: '30W', cct: '5000K' },
    specs: {
      electrical: { 'Wattage': '30W', 'Input Voltage': '120-277V AC' },
      photometric: { 'Lumens': '3,900 lm', 'Efficacy': '130 lm/W', 'Distribution': 'Full Cutoff' },
      physical: { 'Dimensions': '10" x 8" x 4.5"', 'Weight': '4.8 lbs' },
      environmental: { 'IP Rating': 'IP65', 'Rated Life': '100,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '3,900 lm', icon: Sun },
      { label: 'IP Rating', value: 'IP65', icon: Shield },
      { label: 'Dark Sky', value: 'Compliant', icon: Star },
    ],
    certifications: [
      { name: 'DLC Standard', verified: true },
      { name: 'UL Wet Rated', verified: true },
      { name: 'Dark Sky', verified: true },
    ],
    applications: ['Building Entry', 'Stairwell', 'Perimeter Security'],
    replaces: ['70W HPS', '100W Metal Halide'],
    warranty: { years: 5, type: 'Limited Warranty' },
  }),

  'WP-50W-5K': createProduct({
    name: 'LED Wall Pack 50W',
    sku: 'WP-50W-5K',
    series: 'Guardian Series',
    category: 'Outdoor Lighting',
    subcategory: 'Wall Packs',
    price: 59,
    msrp: 89,
    stockQty: 312,
    description: 'Full cutoff LED wall pack for building perimeter and security lighting. Dark sky compliant with excellent uniformity.',
    shortDescription: 'Full cutoff wall pack for building security',
    variants: {
      wattage: ['30W', '50W', '80W', '120W'],
      cct: ['4000K', '5000K'],
    },
    selectedVariant: { wattage: '50W', cct: '5000K' },
    specs: {
      electrical: { 'Wattage': '50W', 'Input Voltage': '120-277V AC' },
      photometric: { 'Lumens': '6,500 lm', 'Efficacy': '130 lm/W', 'Distribution': 'Full Cutoff' },
      physical: { 'Dimensions': '12" x 10" x 5"', 'Weight': '6.2 lbs' },
      environmental: { 'IP Rating': 'IP65', 'Rated Life': '100,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '6,500 lm', icon: Sun },
      { label: 'IP Rating', value: 'IP65', icon: Shield },
      { label: 'Dark Sky', value: 'Compliant', icon: Star },
    ],
    certifications: [
      { name: 'DLC Standard', verified: true },
      { name: 'UL Wet Rated', verified: true },
    ],
    applications: ['Building Perimeter', 'Loading Dock', 'Security'],
    replaces: ['150W HPS', '175W Metal Halide'],
  }),

  'WP-80W-5K': createProduct({
    name: 'LED Wall Pack 80W',
    sku: 'WP-80W-5K',
    series: 'Guardian Series',
    category: 'Outdoor Lighting',
    subcategory: 'Wall Packs',
    price: 79,
    msrp: 119,
    stockQty: 186,
    description: 'High-output full cutoff wall pack for large building facades and industrial security applications.',
    shortDescription: 'High-output wall pack for large buildings',
    variants: {
      wattage: ['80W', '120W'],
      cct: ['4000K', '5000K'],
    },
    selectedVariant: { wattage: '80W', cct: '5000K' },
    specs: {
      electrical: { 'Wattage': '80W', 'Input Voltage': '120-277V AC' },
      photometric: { 'Lumens': '10,400 lm', 'Efficacy': '130 lm/W' },
      physical: { 'Dimensions': '14" x 11" x 5.5"', 'Weight': '8.5 lbs' },
      environmental: { 'IP Rating': 'IP65', 'Rated Life': '100,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '10,400 lm', icon: Sun },
      { label: 'IP Rating', value: 'IP65', icon: Shield },
    ],
    applications: ['Industrial Building', 'Warehouse Exterior', 'Security'],
    replaces: ['250W HPS', '250W Metal Halide'],
  }),

  'WP-120W-5K': createProduct({
    name: 'LED Wall Pack 120W',
    sku: 'WP-120W-5K',
    series: 'Guardian Series',
    category: 'Outdoor Lighting',
    subcategory: 'Wall Packs',
    price: 99,
    msrp: 149,
    stockQty: 98,
    description: 'Maximum output wall pack for industrial facilities and large commercial buildings requiring maximum perimeter illumination.',
    shortDescription: 'Maximum output wall pack for industrial use',
    variants: {
      wattage: ['100W', '120W'],
      cct: ['4000K', '5000K'],
      voltage: ['120-277V', '347-480V'],
    },
    selectedVariant: { wattage: '120W', cct: '5000K', voltage: '120-277V' },
    specs: {
      electrical: { 'Wattage': '120W', 'Input Voltage': '120-277V AC' },
      photometric: { 'Lumens': '15,600 lm', 'Efficacy': '130 lm/W' },
      physical: { 'Dimensions': '16" x 12" x 6"', 'Weight': '11.2 lbs' },
      environmental: { 'IP Rating': 'IP66', 'Rated Life': '100,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '15,600 lm', icon: Sun },
      { label: 'IP Rating', value: 'IP66', icon: Shield },
    ],
    certifications: [{ name: 'DLC Premium', verified: true }, { name: 'UL Wet Rated', verified: true }],
    applications: ['Industrial', 'Manufacturing', 'Distribution Center'],
    replaces: ['400W HPS', '400W Metal Halide'],
  }),

  // ==================== OUTDOOR - AREA LIGHTS ====================
  'AL-100W-T3': createProduct({
    name: 'LED Area Light 100W Type III',
    sku: 'AL-100W-T3',
    series: 'Sentinel Series',
    category: 'Outdoor Lighting',
    subcategory: 'Area Lights',
    price: 119,
    msrp: 179,
    stockQty: 145,
    description: 'Shoebox-style LED area light with Type III forward throw distribution. Ideal for small parking lots and side streets.',
    shortDescription: 'Type III area light for small parking lots',
    variants: {
      wattage: ['100W', '150W', '200W'],
      cct: ['4000K', '5000K'],
      distribution: ['Type III', 'Type IV', 'Type V'],
    },
    selectedVariant: { wattage: '100W', cct: '5000K', distribution: 'Type III' },
    specs: {
      electrical: { 'Wattage': '100W', 'Input Voltage': '120-277V AC' },
      photometric: { 'Lumens': '14,000 lm', 'Efficacy': '140 lm/W', 'Distribution': 'Type III Medium' },
      physical: { 'Dimensions': '23" x 14" x 3.5"', 'Weight': '12.5 lbs' },
      environmental: { 'IP Rating': 'IP66', 'Rated Life': '100,000 hours', 'Wind Rating': '150 mph' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '14,000 lm', icon: Sun },
      { label: 'Efficacy', value: '140 lm/W', icon: Zap },
      { label: 'Distribution', value: 'Type III', icon: Ruler },
      { label: 'IP Rating', value: 'IP66', icon: Shield },
    ],
    certifications: [
      { name: 'DLC Premium', verified: true },
      { name: 'UL Listed', verified: true },
    ],
    applications: ['Parking Lot', 'Side Street', 'Campus'],
    replaces: ['250W HPS', '250W Metal Halide'],
    warranty: { years: 10, type: 'Limited Warranty' },
  }),

  'AL-150W-T3': createProduct({
    name: 'LED Area Light 150W Type III',
    sku: 'AL-150W-T3',
    series: 'Sentinel Series',
    category: 'Outdoor Lighting',
    subcategory: 'Area Lights',
    price: 149,
    msrp: 219,
    stockQty: 0,
    description: 'LED area light with Type III distribution for parking lots and roadways. Excellent uniformity and glare control.',
    shortDescription: 'Type III area light for parking lots',
    variants: {
      wattage: ['150W', '200W', '300W'],
      cct: ['4000K', '5000K'],
      distribution: ['Type III', 'Type IV', 'Type V'],
    },
    selectedVariant: { wattage: '150W', cct: '5000K', distribution: 'Type III' },
    specs: {
      electrical: { 'Wattage': '150W', 'Input Voltage': '120-277V AC' },
      photometric: { 'Lumens': '21,000 lm', 'Efficacy': '140 lm/W', 'Distribution': 'Type III Medium' },
      physical: { 'Dimensions': '27" x 16" x 4"', 'Weight': '15.5 lbs' },
      environmental: { 'IP Rating': 'IP66', 'Rated Life': '100,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '21,000 lm', icon: Sun },
      { label: 'Efficacy', value: '140 lm/W', icon: Zap },
      { label: 'Distribution', value: 'Type III', icon: Ruler },
      { label: 'IP Rating', value: 'IP66', icon: Shield },
    ],
    certifications: [{ name: 'DLC Premium', verified: true }],
    applications: ['Parking Lot', 'Roadway', 'Commercial'],
    replaces: ['400W HPS', '400W Metal Halide'],
    warranty: { years: 10, type: 'Limited Warranty' },
  }),

  'AL-200W-T3': createProduct({
    name: 'LED Area Light 200W Type III',
    sku: 'AL-200W-T3',
    series: 'Sentinel Series',
    category: 'Outdoor Lighting',
    subcategory: 'Area Lights',
    price: 189,
    msrp: 279,
    stockQty: 78,
    description: 'High-output LED area light for large parking facilities and commercial lots requiring extended coverage.',
    shortDescription: 'High-output area light for large lots',
    variants: {
      wattage: ['200W', '300W'],
      cct: ['4000K', '5000K'],
      distribution: ['Type III', 'Type IV', 'Type V'],
      voltage: ['120-277V', '347-480V'],
    },
    selectedVariant: { wattage: '200W', cct: '5000K', distribution: 'Type III', voltage: '120-277V' },
    specs: {
      electrical: { 'Wattage': '200W', 'Input Voltage': '120-277V AC' },
      photometric: { 'Lumens': '28,000 lm', 'Efficacy': '140 lm/W', 'Distribution': 'Type III' },
      physical: { 'Dimensions': '29" x 17" x 4.5"', 'Weight': '18.5 lbs' },
      environmental: { 'IP Rating': 'IP66', 'Rated Life': '100,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '28,000 lm', icon: Sun },
      { label: 'Efficacy', value: '140 lm/W', icon: Zap },
      { label: 'IP Rating', value: 'IP66', icon: Shield },
      { label: 'Life', value: '100,000 hrs', icon: Clock },
    ],
    applications: ['Large Parking Lot', 'Commercial', 'Sports Field'],
    replaces: ['500W HPS', '500W Metal Halide'],
    warranty: { years: 10, type: 'Limited Warranty' },
  }),

  'AL-300W-T3': createProduct({
    name: 'LED Area Light 300W Type III',
    sku: 'AL-300W-T3',
    series: 'Sentinel Series',
    category: 'Outdoor Lighting',
    subcategory: 'Area Lights',
    price: 249,
    msrp: 369,
    stockQty: 42,
    description: 'Maximum output LED area light for highways, major intersections, and large commercial developments.',
    shortDescription: 'Maximum output for highways and large areas',
    variants: {
      wattage: ['300W'],
      cct: ['4000K', '5000K'],
      distribution: ['Type III', 'Type IV', 'Type V'],
      voltage: ['120-277V', '347-480V'],
    },
    selectedVariant: { wattage: '300W', cct: '5000K', distribution: 'Type III', voltage: '120-277V' },
    specs: {
      electrical: { 'Wattage': '300W', 'Input Voltage': '120-277V AC' },
      photometric: { 'Lumens': '42,000 lm', 'Efficacy': '140 lm/W', 'Distribution': 'Type III' },
      physical: { 'Dimensions': '32" x 18" x 5"', 'Weight': '24 lbs' },
      environmental: { 'IP Rating': 'IP66', 'Rated Life': '100,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '42,000 lm', icon: Sun },
      { label: 'Efficacy', value: '140 lm/W', icon: Zap },
      { label: 'IP Rating', value: 'IP66', icon: Shield },
    ],
    certifications: [{ name: 'DLC Premium', verified: true }, { name: 'UL Listed', verified: true }],
    applications: ['Highway', 'Major Intersection', 'Large Commercial'],
    replaces: ['750W HPS', '1000W Metal Halide'],
    warranty: { years: 10, type: 'Limited Warranty' },
  }),

  // ==================== OUTDOOR - FLOOD LIGHTS ====================
  'FL-50W': createProduct({
    name: 'LED Flood Light 50W',
    sku: 'FL-50W',
    series: 'ProFlood Series',
    category: 'Outdoor Lighting',
    subcategory: 'Flood Lights',
    price: 49,
    msrp: 79,
    stockQty: 285,
    description: 'Compact LED flood light for landscape accent lighting, sign illumination, and small area wash lighting.',
    shortDescription: 'Compact flood for accents and signs',
    variants: {
      wattage: ['30W', '50W'],
      cct: ['3000K', '4000K', '5000K'],
    },
    selectedVariant: { wattage: '50W', cct: '5000K' },
    specs: {
      electrical: { 'Wattage': '50W', 'Input Voltage': '120-277V AC' },
      photometric: { 'Lumens': '6,000 lm', 'Efficacy': '120 lm/W', 'Beam Angle': '120°' },
      physical: { 'Dimensions': '9" x 7" x 3"', 'Weight': '4.2 lbs' },
      environmental: { 'IP Rating': 'IP66', 'Rated Life': '50,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '6,000 lm', icon: Sun },
      { label: 'Beam', value: '120°', icon: Ruler },
      { label: 'IP Rating', value: 'IP66', icon: Shield },
    ],
    applications: ['Landscape', 'Sign Lighting', 'Facade Wash'],
    replaces: ['150W Halogen', '70W HPS'],
  }),

  'FL-100W': createProduct({
    name: 'LED Flood Light 100W',
    sku: 'FL-100W',
    series: 'ProFlood Series',
    category: 'Outdoor Lighting',
    subcategory: 'Flood Lights',
    price: 79,
    msrp: 119,
    stockQty: 198,
    description: 'Versatile LED flood light for building facades, small sports fields, and general area flooding.',
    shortDescription: 'Versatile flood for facades and small fields',
    variants: {
      wattage: ['100W', '150W'],
      cct: ['4000K', '5000K'],
    },
    selectedVariant: { wattage: '100W', cct: '5000K' },
    specs: {
      electrical: { 'Wattage': '100W', 'Input Voltage': '120-277V AC' },
      photometric: { 'Lumens': '13,000 lm', 'Efficacy': '130 lm/W', 'Beam Angle': '120°' },
      physical: { 'Dimensions': '12" x 10" x 4"', 'Weight': '7.5 lbs' },
      environmental: { 'IP Rating': 'IP66', 'Rated Life': '50,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '13,000 lm', icon: Sun },
      { label: 'Beam', value: '120°', icon: Ruler },
      { label: 'IP Rating', value: 'IP66', icon: Shield },
    ],
    applications: ['Building Facade', 'Small Sports Field', 'Yard Lighting'],
    replaces: ['250W Metal Halide', '200W HPS'],
  }),

  'FL-200W': createProduct({
    name: 'LED Flood Light 200W',
    sku: 'FL-200W',
    series: 'ProFlood Series',
    category: 'Outdoor Lighting',
    subcategory: 'Flood Lights',
    price: 129,
    msrp: 189,
    stockQty: 124,
    description: 'High-output LED flood for sports fields, large signage, and commercial area lighting.',
    shortDescription: 'High-output flood for sports and commercial',
    variants: {
      wattage: ['200W', '300W'],
      cct: ['4000K', '5000K'],
    },
    selectedVariant: { wattage: '200W', cct: '5000K' },
    specs: {
      electrical: { 'Wattage': '200W', 'Input Voltage': '120-277V AC' },
      photometric: { 'Lumens': '26,000 lm', 'Efficacy': '130 lm/W', 'Beam Angle': '90°' },
      physical: { 'Dimensions': '16" x 14" x 5"', 'Weight': '13 lbs' },
      environmental: { 'IP Rating': 'IP66', 'Rated Life': '50,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '26,000 lm', icon: Sun },
      { label: 'Beam', value: '90°', icon: Ruler },
      { label: 'IP Rating', value: 'IP66', icon: Shield },
    ],
    applications: ['Sports Field', 'Billboard', 'Commercial Area'],
    replaces: ['400W Metal Halide', '500W HPS'],
  }),

  'FL-400W': createProduct({
    name: 'LED Flood Light 400W',
    sku: 'FL-400W',
    series: 'ProFlood Series',
    category: 'Outdoor Lighting',
    subcategory: 'Flood Lights',
    price: 229,
    msrp: 339,
    stockQty: 56,
    description: 'Stadium-grade LED flood for professional sports fields, large billboards, and industrial applications.',
    shortDescription: 'Stadium-grade flood for professional fields',
    variants: {
      wattage: ['400W', '500W'],
      cct: ['4000K', '5000K'],
      voltage: ['120-277V', '347-480V'],
    },
    selectedVariant: { wattage: '400W', cct: '5000K', voltage: '120-277V' },
    specs: {
      electrical: { 'Wattage': '400W', 'Input Voltage': '120-277V AC' },
      photometric: { 'Lumens': '52,000 lm', 'Efficacy': '130 lm/W', 'Beam Angle': '60°/90°' },
      physical: { 'Dimensions': '22" x 18" x 6"', 'Weight': '24 lbs' },
      environmental: { 'IP Rating': 'IP67', 'Rated Life': '50,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '52,000 lm', icon: Sun },
      { label: 'IP Rating', value: 'IP67', icon: Shield },
    ],
    certifications: [{ name: 'DLC Premium', verified: true }],
    applications: ['Stadium', 'Professional Sports', 'Industrial Yard'],
    replaces: ['1000W Metal Halide'],
  }),

  // ==================== OUTDOOR - CANOPY LIGHTS ====================
  'CN-40W': createProduct({
    name: 'LED Canopy Light 40W',
    sku: 'CN-40W',
    series: 'FuelMaster Series',
    category: 'Outdoor Lighting',
    subcategory: 'Canopy Lights',
    price: 69,
    msrp: 99,
    stockQty: 234,
    description: 'Surface mount LED canopy light for gas station pumps, covered walkways, and parking structures. UL844 hazardous location rated models available.',
    shortDescription: 'Gas station canopy light',
    variants: {
      wattage: ['40W', '60W', '90W'],
      cct: ['4000K', '5000K'],
    },
    selectedVariant: { wattage: '40W', cct: '5000K' },
    specs: {
      electrical: { 'Wattage': '40W', 'Input Voltage': '120-277V AC' },
      photometric: { 'Lumens': '5,200 lm', 'Efficacy': '130 lm/W' },
      physical: { 'Dimensions': '12" x 12" x 3.5"', 'Weight': '6 lbs' },
      environmental: { 'IP Rating': 'IP65', 'Rated Life': '100,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '5,200 lm', icon: Sun },
      { label: 'IP Rating', value: 'IP65', icon: Shield },
    ],
    applications: ['Gas Station', 'Parking Garage', 'Covered Walkway'],
    replaces: ['100W HPS', '150W Metal Halide'],
  }),

  'CN-75W': createProduct({
    name: 'LED Canopy Light 75W',
    sku: 'CN-75W',
    series: 'FuelMaster Series',
    category: 'Outdoor Lighting',
    subcategory: 'Canopy Lights',
    price: 89,
    msrp: 129,
    stockQty: 167,
    description: 'High-output canopy light for larger gas stations and commercial canopy applications.',
    shortDescription: 'High-output gas station canopy',
    variants: {
      wattage: ['60W', '75W', '90W'],
      cct: ['4000K', '5000K'],
    },
    selectedVariant: { wattage: '75W', cct: '5000K' },
    specs: {
      electrical: { 'Wattage': '75W', 'Input Voltage': '120-277V AC' },
      photometric: { 'Lumens': '9,750 lm', 'Efficacy': '130 lm/W' },
      physical: { 'Dimensions': '14" x 14" x 4"', 'Weight': '8.5 lbs' },
      environmental: { 'IP Rating': 'IP65', 'Rated Life': '100,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '9,750 lm', icon: Sun },
      { label: 'IP Rating', value: 'IP65', icon: Shield },
    ],
    applications: ['Large Gas Station', 'Commercial Canopy', 'Parking Structure'],
    replaces: ['175W Metal Halide', '200W HPS'],
  }),

  // ==================== RETROFIT - CORN BULBS ====================
  'CB-36W': createProduct({
    name: 'LED Corn Bulb 36W',
    sku: 'CB-36W',
    series: 'RetroFit Series',
    category: 'Retrofit Solutions',
    subcategory: 'Corn Bulbs',
    price: 29,
    msrp: 49,
    stockQty: 445,
    description: '360° LED corn bulb for post top and acorn fixtures. E26/E39 base options available. Direct replacement for HID bulbs.',
    shortDescription: '360° corn bulb for post top fixtures',
    variants: {
      wattage: ['27W', '36W', '54W'],
      cct: ['4000K', '5000K'],
      size: ['E26', 'E39'],
    },
    selectedVariant: { wattage: '36W', cct: '5000K', size: 'E39' },
    specs: {
      electrical: { 'Wattage': '36W', 'Input Voltage': '100-277V AC', 'Internal Driver': 'Yes' },
      photometric: { 'Lumens': '4,680 lm', 'Efficacy': '130 lm/W', 'Beam Angle': '360°' },
      physical: { 'Dimensions': '3.5" x 8.5"', 'Weight': '0.8 lbs', 'Base': 'E39 Mogul' },
      environmental: { 'Operating Temp': '-40°F to 122°F', 'Rated Life': '50,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '4,680 lm', icon: Sun },
      { label: 'Beam', value: '360°', icon: Ruler },
      { label: 'Base', value: 'E39', icon: Zap },
    ],
    certifications: [
      { name: 'DLC Standard', verified: true },
      { name: 'UL Listed', verified: true },
    ],
    applications: ['Post Top', 'Acorn Fixture', 'Enclosed Fixture'],
    replaces: ['100W HPS', '150W Metal Halide'],
  }),

  'CB-54W': createProduct({
    name: 'LED Corn Bulb 54W',
    sku: 'CB-54W',
    series: 'RetroFit Series',
    category: 'Retrofit Solutions',
    subcategory: 'Corn Bulbs',
    price: 39,
    msrp: 65,
    stockQty: 312,
    description: 'High-output LED corn bulb for wall pack and shoebox retrofits. Eliminates ballast for direct line voltage operation.',
    shortDescription: 'High-output corn bulb for shoebox retrofit',
    variants: {
      wattage: ['54W', '80W'],
      cct: ['4000K', '5000K'],
      size: ['E39'],
    },
    selectedVariant: { wattage: '54W', cct: '5000K', size: 'E39' },
    specs: {
      electrical: { 'Wattage': '54W', 'Input Voltage': '100-277V AC' },
      photometric: { 'Lumens': '7,020 lm', 'Efficacy': '130 lm/W', 'Beam Angle': '360°' },
      physical: { 'Dimensions': '4" x 10"', 'Weight': '1.2 lbs', 'Base': 'E39 Mogul' },
      environmental: { 'Rated Life': '50,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '7,020 lm', icon: Sun },
      { label: 'Beam', value: '360°', icon: Ruler },
    ],
    applications: ['Wall Pack Retrofit', 'Shoebox Retrofit', 'Post Top'],
    replaces: ['175W Metal Halide', '150W HPS'],
  }),

  'CB-80W': createProduct({
    name: 'LED Corn Bulb 80W',
    sku: 'CB-80W',
    series: 'RetroFit Series',
    category: 'Retrofit Solutions',
    subcategory: 'Corn Bulbs',
    price: 55,
    msrp: 89,
    stockQty: 186,
    description: 'Maximum output corn bulb for high bay and large fixture retrofits. Built-in fan for optimal thermal management.',
    shortDescription: 'Maximum output corn bulb with fan cooling',
    variants: {
      wattage: ['80W', '100W', '120W'],
      cct: ['4000K', '5000K'],
      size: ['E39'],
    },
    selectedVariant: { wattage: '80W', cct: '5000K', size: 'E39' },
    specs: {
      electrical: { 'Wattage': '80W', 'Input Voltage': '100-277V AC' },
      photometric: { 'Lumens': '10,400 lm', 'Efficacy': '130 lm/W', 'Beam Angle': '360°' },
      physical: { 'Dimensions': '4.5" x 11.5"', 'Weight': '1.5 lbs', 'Base': 'E39 Mogul' },
      environmental: { 'Rated Life': '50,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '10,400 lm', icon: Sun },
      { label: 'Cooling', value: 'Fan', icon: Thermometer },
    ],
    applications: ['High Bay Retrofit', 'Large Fixture', 'Industrial'],
    replaces: ['250W Metal Halide', '200W HPS'],
  }),

  // ==================== CONTROLS - SENSORS ====================
  'SENS-HB-MS': createProduct({
    name: 'Motion Sensor for High Bay',
    sku: 'SENS-HB-MS',
    series: 'SmartControl Series',
    category: 'Lighting Controls',
    subcategory: 'Occupancy Sensors',
    price: 29,
    msrp: 45,
    stockQty: 520,
    description: 'Microwave motion sensor for high bay fixtures. Adjustable sensitivity, time delay, and daylight hold-off. IP65 rated.',
    shortDescription: 'Microwave sensor for high bay lights',
    variants: {
      size: ['Standard', 'Extended Range'],
    },
    selectedVariant: { size: 'Standard' },
    specs: {
      electrical: { 'Operating Voltage': '12V DC', 'Power Consumption': '0.5W', 'Output': '0-10V Dimming Signal' },
      photometric: { 'Detection Range': '25ft (360°)', 'Detection Angle': '360°' },
      physical: { 'Dimensions': '3" x 3" x 1.5"', 'Weight': '0.2 lbs' },
      environmental: { 'IP Rating': 'IP65', 'Operating Temp': '-4°F to 122°F' },
      controls: { 'Time Delay': '10s - 30min Adjustable', 'Daylight Sensor': 'Yes (Adjustable)', 'Sensitivity': 'High/Medium/Low' },
    },
    quickSpecs: [
      { label: 'Range', value: '25ft', icon: Ruler },
      { label: 'Angle', value: '360°', icon: Sun },
      { label: 'IP Rating', value: 'IP65', icon: Shield },
    ],
    certifications: [
      { name: 'FCC', verified: true },
      { name: 'UL Listed', verified: true },
    ],
    applications: ['High Bay', 'Warehouse', 'Parking Garage'],
    warranty: { years: 3, type: 'Limited Warranty' },
  }),

  'SENS-WP-PC': createProduct({
    name: 'Photocell for Wall Pack/Area Light',
    sku: 'SENS-WP-PC',
    series: 'SmartControl Series',
    category: 'Lighting Controls',
    subcategory: 'Photocells',
    price: 15,
    msrp: 25,
    stockQty: 680,
    description: 'Twist-lock photocell for automatic dusk-to-dawn operation. ANSI C136.10 compliant with adjustable sensitivity.',
    shortDescription: 'Dusk-to-dawn photocell',
    specs: {
      electrical: { 'Voltage Rating': '120-277V AC', 'Load Rating': '1000W Tungsten / 1800VA Ballast' },
      physical: { 'Dimensions': '2.5" x 3"', 'Weight': '0.15 lbs', 'Mount': 'ANSI C136.10 Twist-lock' },
      environmental: { 'IP Rating': 'IP65' },
      controls: { 'Switching Threshold': '1-10 fc Adjustable', 'Time Delay': '15 seconds' },
    },
    quickSpecs: [
      { label: 'Voltage', value: '120-277V', icon: Zap },
      { label: 'Mount', value: 'Twist-lock', icon: Ruler },
      { label: 'IP Rating', value: 'IP65', icon: Shield },
    ],
    applications: ['Wall Pack', 'Area Light', 'Post Top'],
    warranty: { years: 3, type: 'Limited Warranty' },
  }),

  // ==================== VAPOR TIGHT ====================
  'VT-4FT-40W': createProduct({
    name: 'LED Vapor Tight 4ft 40W',
    sku: 'VT-4FT-40W',
    series: 'ToughLight Series',
    category: 'Indoor Lighting',
    subcategory: 'Vapor Tight',
    price: 45,
    msrp: 69,
    stockQty: 312,
    description: 'IP65 rated vapor tight LED fixture for car washes, food processing, parking garages, and other wet or dusty environments.',
    shortDescription: 'IP65 vapor tight for wet/dusty areas',
    variants: {
      wattage: ['40W', '60W'],
      cct: ['4000K', '5000K'],
    },
    selectedVariant: { wattage: '40W', cct: '5000K' },
    specs: {
      electrical: { 'Wattage': '40W', 'Input Voltage': '120-277V AC' },
      photometric: { 'Lumens': '5,200 lm', 'Efficacy': '130 lm/W' },
      physical: { 'Dimensions': '48" x 5" x 3"', 'Weight': '5.5 lbs', 'Housing': 'Fiberglass / PC Lens' },
      environmental: { 'IP Rating': 'IP65', 'IK Rating': 'IK08', 'Rated Life': '50,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '5,200 lm', icon: Sun },
      { label: 'IP Rating', value: 'IP65', icon: Shield },
      { label: 'IK Rating', value: 'IK08', icon: Shield },
    ],
    applications: ['Car Wash', 'Food Processing', 'Parking Garage', 'Cold Storage'],
    replaces: ['2-lamp T8 Fluorescent'],
  }),

  'VT-8FT-80W': createProduct({
    name: 'LED Vapor Tight 8ft 80W',
    sku: 'VT-8FT-80W',
    series: 'ToughLight Series',
    category: 'Indoor Lighting',
    subcategory: 'Vapor Tight',
    price: 79,
    msrp: 119,
    stockQty: 145,
    description: '8ft vapor tight LED for industrial and commercial applications requiring extended coverage in harsh environments.',
    shortDescription: '8ft vapor tight for industrial use',
    variants: {
      wattage: ['60W', '80W'],
      cct: ['4000K', '5000K'],
    },
    selectedVariant: { wattage: '80W', cct: '5000K' },
    specs: {
      electrical: { 'Wattage': '80W', 'Input Voltage': '120-277V AC' },
      photometric: { 'Lumens': '10,400 lm', 'Efficacy': '130 lm/W' },
      physical: { 'Dimensions': '96" x 5" x 3"', 'Weight': '10 lbs' },
      environmental: { 'IP Rating': 'IP65', 'IK Rating': 'IK08', 'Rated Life': '50,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '10,400 lm', icon: Sun },
      { label: 'IP Rating', value: 'IP65', icon: Shield },
      { label: 'Length', value: '8ft', icon: Ruler },
    ],
    applications: ['Industrial Wash Down', 'Parking Garage', 'Processing Plant'],
    replaces: ['4-lamp T8 Fluorescent', '2-lamp T5HO'],
  }),

  // ==================== STRIP LIGHTS ====================
  'STR-4FT-32W': createProduct({
    name: 'LED Strip Light 4ft 32W',
    sku: 'STR-4FT-32W',
    series: 'EcoStrip Series',
    category: 'Indoor Lighting',
    subcategory: 'Strip Lights',
    price: 29,
    msrp: 45,
    stockQty: 680,
    description: 'Basic LED strip fixture for utility areas, storage rooms, and general purpose lighting. Surface or chain mount.',
    shortDescription: 'Basic strip light for utility areas',
    variants: {
      wattage: ['32W', '44W'],
      cct: ['4000K', '5000K'],
    },
    selectedVariant: { wattage: '32W', cct: '5000K' },
    specs: {
      electrical: { 'Wattage': '32W', 'Input Voltage': '120-277V AC' },
      photometric: { 'Lumens': '4,160 lm', 'Efficacy': '130 lm/W' },
      physical: { 'Dimensions': '48" x 4.5" x 2.5"', 'Weight': '3.5 lbs' },
      environmental: { 'Rated Life': '50,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '4,160 lm', icon: Sun },
      { label: 'Length', value: '4ft', icon: Ruler },
    ],
    applications: ['Storage Room', 'Utility Area', 'Basement', 'Workshop'],
    replaces: ['2-lamp T8 Fluorescent Strip'],
  }),

  'STR-8FT-64W': createProduct({
    name: 'LED Strip Light 8ft 64W',
    sku: 'STR-8FT-64W',
    series: 'EcoStrip Series',
    category: 'Indoor Lighting',
    subcategory: 'Strip Lights',
    price: 49,
    msrp: 75,
    stockQty: 345,
    description: '8ft LED strip for warehouses, storerooms, and general industrial applications requiring extended coverage.',
    shortDescription: '8ft strip for warehouse and industrial',
    variants: {
      wattage: ['52W', '64W'],
      cct: ['4000K', '5000K'],
    },
    selectedVariant: { wattage: '64W', cct: '5000K' },
    specs: {
      electrical: { 'Wattage': '64W', 'Input Voltage': '120-277V AC' },
      photometric: { 'Lumens': '8,320 lm', 'Efficacy': '130 lm/W' },
      physical: { 'Dimensions': '96" x 4.5" x 2.5"', 'Weight': '6.5 lbs' },
      environmental: { 'Rated Life': '50,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '8,320 lm', icon: Sun },
      { label: 'Length', value: '8ft', icon: Ruler },
    ],
    applications: ['Warehouse', 'Industrial', 'Storeroom'],
    replaces: ['4-lamp T8 Fluorescent Strip'],
  }),

  // ==================== DOWNLIGHTS ====================
  'DL-4IN-10W': createProduct({
    name: '4" LED Downlight 10W',
    sku: 'DL-4IN-10W',
    series: 'Recessed Series',
    category: 'Indoor Lighting',
    subcategory: 'Downlights',
    price: 15,
    msrp: 25,
    stockQty: 1240,
    description: '4-inch LED downlight retrofit kit with integrated trim. Fits most standard 4" recessed housings.',
    shortDescription: '4" downlight retrofit kit',
    variants: {
      cct: ['2700K', '3000K', '4000K', '5000K'],
      finish: ['White', 'Brushed Nickel', 'Oil Rubbed Bronze'],
    },
    selectedVariant: { cct: '4000K', finish: 'White' },
    specs: {
      electrical: { 'Wattage': '10W', 'Input Voltage': '120V AC' },
      photometric: { 'Lumens': '750 lm', 'Efficacy': '75 lm/W', 'CRI': '> 90', 'Beam Angle': '90°' },
      physical: { 'Dimensions': '4.7" x 3.5"', 'Cutout': '4"', 'Weight': '0.6 lbs' },
      environmental: { 'IC Rated': 'Yes', 'Air Tight': 'Yes', 'Rated Life': '50,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '750 lm', icon: Sun },
      { label: 'CRI', value: '> 90', icon: Star },
      { label: 'Cutout', value: '4"', icon: Ruler },
    ],
    certifications: [
      { name: 'Energy Star', verified: true },
      { name: 'UL Listed', verified: true },
    ],
    applications: ['Residential', 'Office', 'Retail', 'Hospitality'],
    replaces: ['65W BR30 Incandescent'],
    tierPricing: [
      { min: 1, max: 9, price: 15, label: '1-9' },
      { min: 10, max: 49, price: 12, label: '10-49' },
      { min: 50, max: null, price: 10, label: '50+' },
    ],
  }),

  'DL-6IN-15W': createProduct({
    name: '6" LED Downlight 15W',
    sku: 'DL-6IN-15W',
    series: 'Recessed Series',
    category: 'Indoor Lighting',
    subcategory: 'Downlights',
    price: 19,
    msrp: 32,
    stockQty: 986,
    description: '6-inch LED downlight retrofit with smooth white baffle trim. Energy Star certified for utility rebates.',
    shortDescription: '6" downlight retrofit kit',
    variants: {
      cct: ['2700K', '3000K', '4000K', '5000K', 'Tunable'],
      finish: ['White', 'Brushed Nickel'],
    },
    selectedVariant: { cct: '4000K', finish: 'White' },
    specs: {
      electrical: { 'Wattage': '15W', 'Input Voltage': '120V AC' },
      photometric: { 'Lumens': '1,100 lm', 'Efficacy': '73 lm/W', 'CRI': '> 90', 'Beam Angle': '90°' },
      physical: { 'Dimensions': '7.2" x 4"', 'Cutout': '6"', 'Weight': '0.9 lbs' },
      environmental: { 'IC Rated': 'Yes', 'Wet Rated': 'Yes', 'Rated Life': '50,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '1,100 lm', icon: Sun },
      { label: 'CRI', value: '> 90', icon: Star },
      { label: 'Cutout', value: '6"', icon: Ruler },
    ],
    certifications: [
      { name: 'Energy Star', verified: true },
      { name: 'UL Wet Rated', verified: true },
    ],
    applications: ['Residential', 'Office', 'Bathroom', 'Hospitality'],
    replaces: ['75W BR40 Incandescent'],
  }),

  // ==================== GARAGE LIGHTS ====================
  'GAR-60W': createProduct({
    name: 'LED Garage Light 60W',
    sku: 'GAR-60W',
    series: 'GaragePro Series',
    category: 'Indoor Lighting',
    subcategory: 'Garage Lights',
    price: 35,
    msrp: 55,
    stockQty: 412,
    description: 'Deformable LED garage light with adjustable panels. Screws into standard E26 socket for easy installation.',
    shortDescription: 'Deformable garage light with E26 base',
    variants: {
      wattage: ['60W', '80W', '100W'],
    },
    selectedVariant: { wattage: '60W' },
    specs: {
      electrical: { 'Wattage': '60W', 'Input Voltage': '110-277V AC', 'Base': 'E26' },
      photometric: { 'Lumens': '6,000 lm', 'Efficacy': '100 lm/W', 'CRI': '> 80' },
      physical: { 'Dimensions': '12" x 12" (deployed)', 'Weight': '1.2 lbs', 'Panels': '3 Adjustable' },
      environmental: { 'Operating Temp': '-4°F to 104°F', 'Rated Life': '50,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '6,000 lm', icon: Sun },
      { label: 'Base', value: 'E26', icon: Zap },
      { label: 'Panels', value: '3', icon: Ruler },
    ],
    applications: ['Garage', 'Workshop', 'Basement', 'Utility Room'],
    replaces: ['300W Incandescent'],
  }),

  'GAR-100W': createProduct({
    name: 'LED Garage Light 100W',
    sku: 'GAR-100W',
    series: 'GaragePro Series',
    category: 'Indoor Lighting',
    subcategory: 'Garage Lights',
    price: 49,
    msrp: 79,
    stockQty: 256,
    description: 'High-output deformable garage light with 4 adjustable LED panels. Maximum coverage for large garages and workshops.',
    shortDescription: 'High-output 4-panel garage light',
    variants: {
      wattage: ['80W', '100W', '120W'],
    },
    selectedVariant: { wattage: '100W' },
    specs: {
      electrical: { 'Wattage': '100W', 'Input Voltage': '110-277V AC', 'Base': 'E26' },
      photometric: { 'Lumens': '10,000 lm', 'Efficacy': '100 lm/W', 'CRI': '> 80' },
      physical: { 'Dimensions': '14" x 14" (deployed)', 'Weight': '1.8 lbs', 'Panels': '4 Adjustable' },
      environmental: { 'Rated Life': '50,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '10,000 lm', icon: Sun },
      { label: 'Panels', value: '4', icon: Ruler },
    ],
    applications: ['Large Garage', 'Workshop', 'Industrial'],
    replaces: ['500W Incandescent'],
  }),

  // ==================== SOLAR LIGHTS ====================
  'SOL-ST-60W': createProduct({
    name: 'Solar Street Light 60W',
    sku: 'SOL-ST-60W',
    series: 'SunPower Series',
    category: 'Solar Lighting',
    subcategory: 'Solar Street Lights',
    price: 189,
    msrp: 289,
    stockQty: 78,
    description: 'All-in-one solar LED street light with integrated panel and battery. No wiring required. Motion sensor with intelligent dimming.',
    shortDescription: 'All-in-one solar street light',
    variants: {
      wattage: ['40W', '60W', '80W', '120W'],
    },
    selectedVariant: { wattage: '60W' },
    specs: {
      electrical: { 'LED Wattage': '60W', 'Solar Panel': '80W Monocrystalline', 'Battery': '30Ah LiFePO4' },
      photometric: { 'Lumens': '7,200 lm', 'Efficacy': '120 lm/W', 'Backup': '3 Rainy Days' },
      physical: { 'Dimensions': '32" x 14" x 4"', 'Weight': '22 lbs' },
      environmental: { 'IP Rating': 'IP65', 'Operating Temp': '-4°F to 140°F', 'Rated Life': '50,000 hours' },
      controls: { 'Motion Sensor': 'Yes (30% dim → 100%)', 'Time Control': 'Dusk to Dawn / Timer' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '7,200 lm', icon: Sun },
      { label: 'Battery', value: '30Ah', icon: Zap },
      { label: 'Backup', value: '3 Days', icon: Clock },
      { label: 'IP Rating', value: 'IP65', icon: Shield },
    ],
    certifications: [
      { name: 'CE', verified: true },
      { name: 'RoHS', verified: true },
    ],
    applications: ['Street', 'Pathway', 'Parking Lot', 'Remote Area'],
    warranty: { years: 3, type: 'Limited Warranty (5 years for LED)' },
  }),

  'SOL-ST-120W': createProduct({
    name: 'Solar Street Light 120W',
    sku: 'SOL-ST-120W',
    series: 'SunPower Series',
    category: 'Solar Lighting',
    subcategory: 'Solar Street Lights',
    price: 289,
    msrp: 429,
    stockQty: 45,
    description: 'High-output all-in-one solar street light for main roads and large parking areas. Extended battery backup.',
    shortDescription: 'High-output solar street light',
    variants: {
      wattage: ['100W', '120W'],
    },
    selectedVariant: { wattage: '120W' },
    specs: {
      electrical: { 'LED Wattage': '120W', 'Solar Panel': '150W Monocrystalline', 'Battery': '60Ah LiFePO4' },
      photometric: { 'Lumens': '14,400 lm', 'Efficacy': '120 lm/W', 'Backup': '4 Rainy Days' },
      physical: { 'Dimensions': '42" x 18" x 5"', 'Weight': '35 lbs' },
      environmental: { 'IP Rating': 'IP66', 'Rated Life': '50,000 hours' },
      controls: { 'Motion Sensor': 'Yes', 'Smart Control': 'Optional IoT Gateway' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '14,400 lm', icon: Sun },
      { label: 'Battery', value: '60Ah', icon: Zap },
      { label: 'Backup', value: '4 Days', icon: Clock },
    ],
    applications: ['Main Road', 'Large Parking', 'Campus', 'Rural Area'],
    warranty: { years: 5, type: 'Limited Warranty' },
  }),

  'SOL-FL-50W': createProduct({
    name: 'Solar Flood Light 50W',
    sku: 'SOL-FL-50W',
    series: 'SunPower Series',
    category: 'Solar Lighting',
    subcategory: 'Solar Flood Lights',
    price: 89,
    msrp: 139,
    stockQty: 134,
    description: 'Split-type solar flood light with separate panel for flexible installation. PIR motion sensor with adjustable sensitivity.',
    shortDescription: 'Split-type solar flood with motion sensor',
    variants: {
      wattage: ['30W', '50W', '100W'],
    },
    selectedVariant: { wattage: '50W' },
    specs: {
      electrical: { 'LED Wattage': '50W', 'Solar Panel': '25W', 'Battery': '12Ah Lithium' },
      photometric: { 'Lumens': '5,000 lm', 'Efficacy': '100 lm/W', 'Backup': '2 Nights' },
      physical: { 'Fixture': '10" x 8" x 3"', 'Panel': '14" x 10"', 'Cable': '16ft' },
      environmental: { 'IP Rating': 'IP65', 'Rated Life': '30,000 hours' },
      controls: { 'PIR Sensor': 'Yes (30ft range)', 'Mode': '3 Lighting Modes' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '5,000 lm', icon: Sun },
      { label: 'Motion', value: 'PIR', icon: Zap },
      { label: 'Cable', value: '16ft', icon: Ruler },
    ],
    applications: ['Security', 'Yard', 'Billboard', 'Remote Sign'],
    replaces: ['100W Halogen Flood'],
  }),

  // ==================== WRAP FIXTURES ====================
  'WRP-4FT-40W': createProduct({
    name: 'LED Wrap Light 4ft 40W',
    sku: 'WRP-4FT-40W',
    series: 'EcoWrap Series',
    category: 'Indoor Lighting',
    subcategory: 'Wrap Fixtures',
    price: 35,
    msrp: 55,
    stockQty: 445,
    description: 'Surface mount LED wrap fixture for garages, basements, laundry rooms, and utility spaces. Quick connect wiring.',
    shortDescription: 'Surface mount wrap for utility spaces',
    variants: {
      wattage: ['32W', '40W'],
      cct: ['4000K', '5000K'],
    },
    selectedVariant: { wattage: '40W', cct: '5000K' },
    specs: {
      electrical: { 'Wattage': '40W', 'Input Voltage': '120-277V AC' },
      photometric: { 'Lumens': '4,600 lm', 'Efficacy': '115 lm/W' },
      physical: { 'Dimensions': '48" x 5" x 3.2"', 'Weight': '4.5 lbs' },
      environmental: { 'Rated Life': '50,000 hours' },
    },
    quickSpecs: [
      { label: 'Lumens', value: '4,600 lm', icon: Sun },
      { label: 'Length', value: '4ft', icon: Ruler },
    ],
    applications: ['Garage', 'Basement', 'Laundry', 'Utility Room'],
    replaces: ['2-lamp T8 Fluorescent Wrap'],
  }),
}

// Category to products mapping for listings
export const categoryProducts: Record<string, string[]> = {
  'indoor': ['HB-UFO-100W', 'HB-UFO-150W', 'HB-UFO-200W', 'HB-UFO-240W', 'LHB-165W', 'LHB-220W', 'TRF-2X2-40W', 'TRF-2X4-50W', 'FPL-1X4-40W', 'T8-4FT-18W', 'T8-2FT-9W', 'T5-4FT-25W', 'STR-4FT-32W', 'STR-8FT-64W', 'VT-4FT-40W', 'VT-8FT-80W', 'DL-4IN-10W', 'DL-6IN-15W', 'GAR-60W', 'GAR-100W', 'WRP-4FT-40W'],
  'indoor/high-bay': ['HB-UFO-100W', 'HB-UFO-150W', 'HB-UFO-200W', 'HB-UFO-240W', 'LHB-165W', 'LHB-220W'],
  'indoor/troffer': ['TRF-2X2-40W', 'TRF-2X4-50W', 'FPL-1X4-40W'],
  'indoor/tubes': ['T8-4FT-18W', 'T8-2FT-9W', 'T5-4FT-25W'],
  'indoor/strip': ['STR-4FT-32W', 'STR-8FT-64W'],
  'indoor/vapor-tight': ['VT-4FT-40W', 'VT-8FT-80W'],
  'indoor/downlight': ['DL-4IN-10W', 'DL-6IN-15W'],
  'indoor/garage': ['GAR-60W', 'GAR-100W'],
  'indoor/wrap': ['WRP-4FT-40W'],
  'outdoor': ['WP-30W-5K', 'WP-50W-5K', 'WP-80W-5K', 'WP-120W-5K', 'AL-100W-T3', 'AL-150W-T3', 'AL-200W-T3', 'AL-300W-T3', 'FL-50W', 'FL-100W', 'FL-200W', 'FL-400W', 'CN-40W', 'CN-75W'],
  'outdoor/wall-pack': ['WP-30W-5K', 'WP-50W-5K', 'WP-80W-5K', 'WP-120W-5K'],
  'outdoor/area-light': ['AL-100W-T3', 'AL-150W-T3', 'AL-200W-T3', 'AL-300W-T3'],
  'outdoor/flood': ['FL-50W', 'FL-100W', 'FL-200W', 'FL-400W'],
  'outdoor/canopy': ['CN-40W', 'CN-75W'],
  'solar': ['SOL-ST-60W', 'SOL-ST-120W', 'SOL-FL-50W'],
  'solar/street': ['SOL-ST-60W', 'SOL-ST-120W'],
  'solar/flood': ['SOL-FL-50W'],
  'retrofit': ['T8-4FT-18W', 'T8-2FT-9W', 'T5-4FT-25W', 'CB-36W', 'CB-54W', 'CB-80W'],
  'retrofit/tubes': ['T8-4FT-18W', 'T8-2FT-9W', 'T5-4FT-25W'],
  'retrofit/corn-bulb': ['CB-36W', 'CB-54W', 'CB-80W'],
  'controls': ['SENS-HB-MS', 'SENS-WP-PC'],
  'controls/occupancy': ['SENS-HB-MS'],
  'controls/photocell': ['SENS-WP-PC'],
}

// Featured products for homepage
export const featuredProducts = ['HB-UFO-150W', 'WP-50W-5K', 'AL-150W-T3', 'TRF-2X4-50W', 'T8-4FT-18W', 'FL-200W']

// Best sellers
export const bestSellers = ['HB-UFO-150W', 'T8-4FT-18W', 'WP-50W-5K', 'TRF-2X4-50W']

// New arrivals
export const newArrivals = ['SOL-ST-120W', 'GAR-100W', 'AL-300W-T3']

// Helper to get product by SKU
export function getProductBySku(sku: string): Product | undefined {
  return products[sku]
}

// Helper to get products by category
export function getProductsByCategory(category: string): Product[] {
  const skus = categoryProducts[category] || []
  return skus.map(sku => products[sku]).filter(Boolean)
}

// Helper to search products
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase()
  return Object.values(products).filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.sku.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery) ||
    p.subcategory.toLowerCase().includes(lowerQuery)
  )
}
