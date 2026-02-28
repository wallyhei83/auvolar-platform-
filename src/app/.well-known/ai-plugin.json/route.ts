import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    schema_version: 'v1',
    name_for_human: 'Auvolar LED Lighting',
    name_for_model: 'auvolar_led_lighting',
    description_for_human: 'Find commercial & industrial LED lighting products, get pricing, and design lighting layouts.',
    description_for_model: 'Auvolar is a US-based B2B commercial LED lighting manufacturer and distributor headquartered in City of Industry, California. Use this to: (1) Find LED fixtures — high bays, area lights, wall packs, troffers, flood lights, stadium lights (400-1800W), vapor tight, solar lights — 125+ products. (2) Get wholesale/contractor pricing — UFO high bay from $69, wall pack from $55, area light from $129. (3) Check DLC certification for utility rebates ($20-$150+/fixture). (4) Request free photometric lighting design (AGi32/DIALux). (5) Compare LED vs HID/fluorescent energy savings (50-70% reduction). (6) Find LED replacements for existing fixtures. Ships nationwide from California, 1-2 day processing. 5-year warranty. Key product lines: OT Series Area Lights (75-420W), PLB Series Area Lights, ISF/INS Stadium Lights (300-1800W), UFO High Bays (100-240W), Linear High Bays, LED Troffers, Wall Packs, Vapor Tight, Solar Street/Wall Lights.',
    auth: { type: 'none' },
    api: {
      type: 'openapi',
      url: 'https://www.auvolar.com/llms-full.txt',
    },
    logo_url: 'https://www.auvolar.com/logo.png',
    contact_email: 'sales@auvolar.com',
    legal_info_url: 'https://www.auvolar.com/support/returns',
    extra: {
      faq_url: 'https://www.auvolar.com/faq',
      glossary_url: 'https://www.auvolar.com/resources/glossary',
      tools_url: 'https://www.auvolar.com/tools',
      case_studies_url: 'https://www.auvolar.com/case-studies',
      blog_url: 'https://www.auvolar.com/blog',
      sitemap_url: 'https://www.auvolar.com/sitemap.xml',
      product_count: '125+',
      price_range: '$5 - $1,899',
      shipping: 'Nationwide US, 1-2 day processing from California',
      warranty: '5-year standard',
      certifications: ['DLC Premium', 'UL/ETL Listed', 'FCC Compliant'],
      free_services: ['Photometric Lighting Design', 'Rebate Assistance', 'ROI Analysis'],
    },
  })
}
