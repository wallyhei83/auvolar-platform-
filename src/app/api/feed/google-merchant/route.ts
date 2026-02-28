import { NextResponse } from 'next/server'

// BigCommerce category → Google product category mapping
const googleCategories: Record<number, string> = {
  26: 'Hardware > Electrical Wiring & Connectors > Light Fixtures > Outdoor Lighting',
  27: 'Hardware > Electrical Wiring & Connectors > Light Fixtures > Outdoor Lighting',
  28: 'Hardware > Electrical Wiring & Connectors > Light Fixtures > Outdoor Lighting',
  29: 'Hardware > Electrical Wiring & Connectors > Light Fixtures > Outdoor Lighting',
  30: 'Hardware > Electrical Wiring & Connectors > Light Fixtures > Indoor Lighting > Ceiling Lighting',
  31: 'Hardware > Electrical Wiring & Connectors > Light Fixtures > Indoor Lighting > Ceiling Lighting',
  32: 'Hardware > Electrical Wiring & Connectors > Light Fixtures > Indoor Lighting > Ceiling Lighting',
  33: 'Hardware > Electrical Wiring & Connectors > Light Fixtures > Indoor Lighting > Ceiling Lighting',
  35: 'Hardware > Electrical Wiring & Connectors > Light Fixtures > Indoor Lighting',
  36: 'Hardware > Electrical Wiring & Connectors > Light Bulbs > LED Light Bulbs',
  43: 'Hardware > Electrical Wiring & Connectors > Light Fixtures > Outdoor Lighting',
  45: 'Hardware > Electrical Wiring & Connectors > Light Fixtures > Outdoor Lighting',
  46: 'Hardware > Electrical Wiring & Connectors > Light Fixtures > Outdoor Lighting',
  47: 'Hardware > Electrical Wiring & Connectors > Light Fixtures > Outdoor Lighting',
  48: 'Hardware > Electrical Wiring & Connectors > Light Fixtures > Emergency Lighting',
  51: 'Hardware > Electrical Wiring & Connectors > Light Fixtures > Indoor Lighting > Recessed Lighting',
  53: 'Hardware > Electrical Wiring & Connectors > Light Fixtures > Outdoor Lighting',
  55: 'Hardware > Electrical Wiring & Connectors > Light Fixtures > Outdoor Lighting',
  57: 'Hardware > Electrical Wiring & Connectors > Light Fixtures > Outdoor Lighting',
  91: 'Hardware > Electrical Wiring & Connectors > Light Bulbs > LED Light Bulbs',
  93: 'Hardware > Electrical Wiring & Connectors > Light Bulbs > LED Light Bulbs',
  95: 'Hardware > Electrical Wiring & Connectors > Light Fixtures > Lighting Accessories',
}

const bcCatNames: Record<number, string> = {
  26: 'Area Light', 27: 'Wall Pack', 28: 'Flood Light', 29: 'Solar',
  30: 'UFO High Bay', 31: 'Linear High Bay', 32: 'Strip Light', 33: 'Panel',
  35: 'Vapor Tight', 36: 'LED Tube', 43: 'Parking', 45: 'Bollard',
  46: 'Post Top', 47: 'Solar Wall Pack', 48: 'Exit Sign', 51: 'Downlight',
  53: 'Canopy', 55: 'Barn Light', 57: 'Security Light', 91: 'LED Bulb',
  93: 'Corn Bulb', 95: 'Accessory',
}

// XML-escape special characters
function xmlEscape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

interface BCProduct {
  id: number
  name: string
  sku: string
  price: number
  description: string
  categories: number[]
  is_visible: boolean
  weight: number
  condition: string
  custom_url: { url: string }
  images?: { url_standard: string; is_thumbnail: boolean }[]
}

export async function GET() {
  try {
    const token = process.env.BIGCOMMERCE_ACCESS_TOKEN
    const storeHash = process.env.BIGCOMMERCE_STORE_HASH || 'hhcdvxqxzq'
    const baseUrl = 'https://www.auvolar.com'

    if (!token) {
      return new NextResponse('Feed temporarily unavailable', { status: 503 })
    }

    // Fetch products with images
    let allProducts: BCProduct[] = []
    let page = 1
    let hasMore = true

    while (hasMore) {
      const res = await fetch(
        `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products?limit=250&page=${page}&include=images&include_fields=id,name,sku,price,description,categories,is_visible,weight,condition,custom_url`,
        {
          headers: {
            'X-Auth-Token': token,
            'Accept': 'application/json',
          },
          next: { revalidate: 3600 },
        }
      )
      const data = await res.json()
      allProducts = [...allProducts, ...(data.data || [])]
      hasMore = data.data?.length === 250
      page++
    }

    const products = allProducts.filter(p => p.is_visible && p.price > 0)

    // Build XML feed
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
<title>Auvolar Commercial LED Lighting</title>
<link>${baseUrl}</link>
<description>B2B Commercial &amp; Industrial LED Lighting - Wholesale Pricing</description>
`

    for (const p of products) {
      // Clean description: strip HTML, decode entities, then XML-escape
      const rawDesc = (p.description || '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#\d+;/g, '')
        .replace(/&bull;/g, '•')
        .replace(/&deg;/g, '°')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 5000)
      const desc = xmlEscape(rawDesc || 'Commercial LED lighting fixture by Auvolar')

      const title = xmlEscape(p.name)

      const primaryCat = p.categories.find(c => ![23, 25, 42, 63, 64, 65].includes(c)) || p.categories[0]
      const googleCat = googleCategories[primaryCat] || 'Hardware > Electrical Wiring & Connectors > Light Fixtures'
      const productType = bcCatNames[primaryCat] || 'LED Lighting'

      // Get thumbnail image
      const thumbnail = p.images?.find(img => img.is_thumbnail)?.url_standard
        || p.images?.[0]?.url_standard
        || ''

      // Use /p/[slug] URL for SEO product pages
      const slug = (p.custom_url?.url || `/${p.id}/`).replace(/^\/|\/$/g, '')
      const productUrl = `${baseUrl}/p/${slug}`

      xml += `
<item>
  <g:id>${p.id}</g:id>
  <g:title>${title}</g:title>
  <g:description>${desc.slice(0, 5000)}</g:description>
  <g:link>${productUrl}</g:link>
  ${thumbnail ? `<g:image_link>${thumbnail}</g:image_link>` : ''}
  <g:availability>in_stock</g:availability>
  <g:price>${p.price.toFixed(2)} USD</g:price>
  <g:brand>Auvolar</g:brand>
  <g:condition>${p.condition === 'Used' ? 'used' : 'new'}</g:condition>
  <g:google_product_category>${googleCat}</g:google_product_category>
  <g:product_type>${productType}</g:product_type>
  ${p.sku ? `<g:mpn>${xmlEscape(p.sku)}</g:mpn>` : ''}
  ${p.weight ? `<g:shipping_weight>${p.weight} lb</g:shipping_weight>` : ''}
  <g:custom_label_0>B2B</g:custom_label_0>
  <g:custom_label_1>DLC Certified</g:custom_label_1>
  <g:custom_label_2>Wholesale</g:custom_label_2>
</item>`
    }

    xml += `
</channel>
</rss>`

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    return new NextResponse('Feed error', { status: 500 })
  }
}
