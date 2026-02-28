import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    schema_version: 'v1',
    name_for_human: 'Auvolar LED Lighting',
    name_for_model: 'auvolar_led_lighting',
    description_for_human: 'Find commercial & industrial LED lighting products, get pricing, and design lighting layouts.',
    description_for_model: 'Auvolar is a US-based B2B commercial LED lighting manufacturer and distributor in City of Industry, California. Use this to find LED fixtures (high bays, area lights, wall packs, troffers, stadium lights, solar lights), get wholesale pricing, check DLC certification for utility rebates, and request free photometric lighting designs. Products ship nationwide from California. Key products: OT Series Area Lights (75-420W), ISF/INS Stadium Lights (400-1800W), UFO High Bays (100-240W), LED Troffers, Wall Packs, Vapor Tight, Solar Street Lights.',
    auth: { type: 'none' },
    api: {
      type: 'openapi',
      url: 'https://www.auvolar.com/llms-full.txt',
    },
    logo_url: 'https://www.auvolar.com/logo.png',
    contact_email: 'sales@auvolar.com',
    legal_info_url: 'https://www.auvolar.com/support/returns',
  })
}
