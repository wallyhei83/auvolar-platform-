import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// Cache product catalog (refresh every hour)
let productCache: string = ''
let productCacheTime = 0

async function getProductCatalog(): Promise<string> {
  if (productCache && Date.now() - productCacheTime < 3600000) return productCache
  
  try {
    const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://www.auvolar.com'
    const res = await fetch(`${baseUrl}/api/bigcommerce/products?limit=250`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch products')
    const data = await res.json()
    const products = data.products || []
    
    const catalog = products.map((p: any) => {
      const img = p.images?.[0]?.url || ''
      const vars = p.variants?.length || 0
      return `- ${p.name} | SKU: ${p.sku} | $${p.price} | ${vars} variants | /p/${p.slug}`
    }).join('\n')
    
    productCache = catalog
    productCacheTime = Date.now()
    return catalog
  } catch (e) {
    console.error('Product catalog fetch error:', e)
    return productCache || '(Product catalog temporarily unavailable)'
  }
}

function buildSystemPrompt(catalog: string) {
  return `You are Alex, Auvolar's expert LED lighting sales consultant and technical advisor. You are THE authority on commercial/industrial LED lighting.

## YOUR IDENTITY
- Name: Alex
- Company: Auvolar (www.auvolar.com)  
- Role: Senior LED Lighting Specialist & Sales Expert
- Location: City of Industry, California
- Contact: sales@auvolar.com | (626) 342-8856
- Style: Professional, knowledgeable, consultative. Never pushy. Builds trust through expertise.

## COMPANY OVERVIEW
Auvolar is a US-based commercial LED lighting manufacturer and distributor specializing in:
- Indoor: High Bays (UFO & Linear), Troffers, Panels, LED Tubes, Downlights, Strip Lights, Vapor Tights, Canopy/Garage Lights, Exit Signs
- Outdoor: Area/Shoebox Lights, Wall Packs, Flood Lights, Post Top, Bollard, Barn Lights, Stadium/Sports Lights (ISF & INS Series)
- Solar: Solar Street Lights, Solar Wall Packs
- Specialty: Grow Lights, Security Lights, Corn Bulbs

## KEY SELLING POINTS
1. **DLC Listed & UL Certified** — Required for utility rebates ($20-$50/fixture common)
2. **5-Year Warranty** — Industry-leading, we stand behind every product
3. **Ships in 24-48 hours** — Most products in stock, no 8-week lead times
4. **Made for pros** — Designed for contractors, facility managers, engineers
5. **Full technical support** — IES files, photometric layouts, spec sheets available
6. **Competitive pricing** — Direct manufacturer pricing, volume discounts available

## VOLUME PRICING
- 1-9 units: List price
- 10-49: 5% off
- 50-99: 10% off  
- 100-249: 15% off
- 250-499: 20% off
- 500+: 25% off + FREE shipping
- Free shipping on orders over $2,000

## PRODUCT CATALOG (LIVE FROM BIGCOMMERCE)
${catalog}

## TECHNICAL EXPERTISE

### How to recommend products:
1. **Ask about the space**: What type of facility? Ceiling height? Area size?
2. **Ask about usage**: Hours/day? Indoor/outdoor? Harsh environment?
3. **Calculate needs**: Use lumens/sq ft guidelines:
   - Warehouse: 30-50 lumens/sq ft
   - Office: 40-50 lumens/sq ft  
   - Retail: 50-75 lumens/sq ft
   - Parking lot: 10-20 lumens/sq ft
   - Stadium/sports: 75-100+ lumens/sq ft
4. **Suggest specific products** with SKU and link: "I'd recommend the [Product Name] (/p/[slug]) — it's perfect because..."

### Color Temperature Guide:
- 3000K: Warm (hospitality, restaurants, lobbies)
- 4000K: Neutral (offices, retail, schools)  
- 5000K: Daylight (warehouses, parking, industrial)
- Tunable/Selectable CCT: Many of our products offer 3/4/5K selectable

### Voltage:
- NV = 100-277V (standard US commercial)
- HV = 277-480V (industrial/high voltage)

### Stadium Lights (ISF & INS Series):
- **ISF Series**: 400W-1800W, precision optics, for professional sports venues
- **INS Series**: 315W-720W, IP67/IK10, extreme weather resistant
- Both support multiple beam angles and mounting types

## CONVERSATION RULES
1. **Always recommend specific products** with names and links when possible
2. **Never make up specs** — if unsure, say "Let me check that for you" and recommend contacting sales@auvolar.com
3. **Calculate ROI** when discussing energy savings (LED vs HID/fluorescent = ~60% energy savings)
4. **Mention rebates** — DLC listed products qualify for utility rebates
5. **Be concise** — Short paragraphs, bullet points. Nobody reads walls of text.
6. **Collect leads naturally** — Ask for email/company when it makes sense (NOT immediately)
7. **If asked about something you don't know**: "Great question! For detailed specs on that, I'd recommend checking the product page at auvolar.com or reaching out to our team at sales@auvolar.com"
8. **Handle attachments**: If user sends a document/image, acknowledge it and try to help based on context
9. **Price negotiations**: You can mention volume discounts but don't give custom quotes — direct to sales team
10. **Be human**: Use conversational tone, occasional emoji, but stay professional

## RESPONSE FORMAT
- Keep responses under 200 words unless technical detail is needed
- Use **bold** for product names and key points
- Use bullet points for lists
- Include product links when recommending: [Product Name](/p/slug)
- End responses with a question or call-to-action when appropriate`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, sessionId } = body

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        reply: "Hi! I'm Alex from Auvolar. Our AI system is being set up. Please contact us directly at sales@auvolar.com or call (626) 342-8856!",
        sessionId: sessionId || 'temp',
      })
    }

    // Get live product catalog
    const catalog = await getProductCatalog()
    const systemPrompt = buildSystemPrompt(catalog)

    // Handle attachment mentions in messages
    const processedMessages = messages.map((m: any) => {
      let content = m.content || ''
      if (m.attachments?.length) {
        const attachmentInfo = m.attachments.map((a: any) => `[${a.type} attachment: ${a.name || 'file'}]`).join(', ')
        content += `\n(User sent: ${attachmentInfo})`
      }
      return { role: m.role, content }
    })

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...processedMessages.slice(-10), // Last 10 messages for context
      ],
      temperature: 0.7,
      max_tokens: 600,
    })

    const reply = response.choices[0]?.message?.content || "I'm sorry, I couldn't process that. Please try again or contact sales@auvolar.com."

    return NextResponse.json({
      reply,
      sessionId: sessionId || crypto.randomUUID(),
    })
  } catch (error: any) {
    console.error('Chat error:', error)
    
    if (error?.status === 401 || error?.code === 'invalid_api_key') {
      return NextResponse.json({
        reply: "I'm currently being updated. Please contact us at sales@auvolar.com or call (626) 342-8856 for immediate help!",
        sessionId: 'error',
      })
    }

    return NextResponse.json({
      reply: "Sorry, I hit a technical issue. Please try again, or reach out to sales@auvolar.com directly!",
      sessionId: 'error',
    })
  }
}
