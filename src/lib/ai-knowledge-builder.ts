/**
 * AI Knowledge Builder
 * 
 * Automatically aggregates ALL site content into a single knowledge base
 * that the AI Sales chat can reference. Refreshes every hour.
 * 
 * Sources:
 * 1. llms-full.txt — complete product catalog with descriptions
 * 2. Case studies from database
 * 3. About Us company info
 * 4. Product detail pages (features, specs, descriptions from BC)
 * 5. Blog posts summaries
 * 6. Spec sheet URLs (so AI can direct customers to them)
 * 7. Company policies (warranty, returns, shipping)
 */

import { prisma } from '@/lib/db'

let knowledgeCache: string = ''
let knowledgeCacheTime = 0
const CACHE_TTL = 3600000 // 1 hour

export async function buildKnowledgeBase(): Promise<string> {
  // Return cache if fresh
  if (knowledgeCache && Date.now() - knowledgeCacheTime < CACHE_TTL) {
    return knowledgeCache
  }

  const sections: string[] = []

  // 1. Full product catalog from llms-full.txt (already has descriptions)
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'https://www.auvolar.com'
    const res = await fetch(`${baseUrl}/llms-full.txt`, { cache: 'no-store' })
    if (res.ok) {
      const text = await res.text()
      sections.push(`
═══════════════════════════════════════
COMPLETE PRODUCT CATALOG & DESCRIPTIONS
═══════════════════════════════════════
${text}
`)
    }
  } catch (e) {
    console.error('Knowledge builder: failed to fetch llms-full.txt', e)
  }

  // 2. Detailed product info from BigCommerce (full descriptions with HTML stripped)
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'https://www.auvolar.com'
    const res = await fetch(`${baseUrl}/api/bigcommerce/products?limit=250`, { cache: 'no-store' })
    if (res.ok) {
      const data = await res.json()
      const products = data.products || []
      const productDetails = products.map((p: any) => {
        const desc = (p.description || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
        const features = (p.features || []).join(', ')
        return `### ${p.name}
SKU: ${p.sku} | Price: $${p.price} | URL: /p/${p.slug}
${desc ? `Description: ${desc.substring(0, 500)}` : ''}
${features ? `Features: ${features}` : ''}
Variants: ${p.variants?.map((v: any) => `${v.sku || ''} $${v.price || ''}`).join(', ') || 'N/A'}
`
      }).join('\n')

      sections.push(`
═══════════════════════════════════════
DETAILED PRODUCT DESCRIPTIONS & FEATURES
═══════════════════════════════════════
${productDetails}
`)
    }
  } catch (e) {
    console.error('Knowledge builder: failed to fetch products', e)
  }

  // 3. Case studies from database
  try {
    const caseStudies = await prisma.caseStudy.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
    })

    if (caseStudies.length > 0) {
      const csText = caseStudies.map(cs => {
        const stats = Array.isArray(cs.stats) ? (cs.stats as any[]).map((s: any) => `${s.label}: ${s.value}`).join(', ') : ''
        return `### ${cs.title}
Category: ${cs.category}
Location: ${cs.location || 'N/A'}
${cs.subtitle ? `Summary: ${cs.subtitle}` : ''}
Description: ${cs.description?.substring(0, 500) || 'N/A'}
Product: ${cs.product || 'N/A'} ${cs.productSlug ? `(/p/${cs.productSlug})` : ''}
Clients: ${cs.clients?.join(', ') || 'N/A'}
Key Highlights: ${cs.highlights?.join(' | ') || 'N/A'}
${stats ? `Results: ${stats}` : ''}
`
      }).join('\n')

      sections.push(`
═══════════════════════════════════════
CASE STUDIES & SUCCESS STORIES
(Use these to build credibility with customers)
═══════════════════════════════════════
${csText}
`)
    }
  } catch (e) {
    console.error('Knowledge builder: failed to fetch case studies', e)
  }

  // 4. Product documents (spec sheets, IES files, install guides)
  try {
    const docs = await prisma.productDocAsset.findMany({
      orderBy: { createdAt: 'desc' },
    })

    if (docs.length > 0) {
      const docsByProduct: Record<string, string[]> = {}
      docs.forEach(d => {
        if (!docsByProduct[d.sku]) docsByProduct[d.sku] = []
        docsByProduct[d.sku].push(`- ${d.docType}: ${d.title} → ${d.url}`)
      })

      const docText = Object.entries(docsByProduct).map(([sku, items]) =>
        `**${sku}**:\n${items.join('\n')}`
      ).join('\n\n')

      sections.push(`
═══════════════════════════════════════
DOWNLOADABLE DOCUMENTS
(Direct customers to these for technical details)
═══════════════════════════════════════
${docText}
`)
    }
  } catch (e) {
    console.error('Knowledge builder: failed to fetch docs', e)
  }

  // 5. Company information (hardcoded but comprehensive)
  sections.push(`
═══════════════════════════════════════
ABOUT AUVOLAR — COMPANY INFORMATION
═══════════════════════════════════════

### Who We Are
Auvolar is a B2B commercial and industrial LED lighting manufacturer and distributor headquartered in City of Industry, California. We serve contractors, electricians, facility managers, and businesses across the United States.

### Our Mission
To provide the highest quality commercial LED lighting at contractor-friendly pricing, backed by exceptional technical support and fast shipping.

### Why Customers Choose Auvolar
1. **Manufacturer Direct Pricing** — No middleman markup. We design, source, and sell direct.
2. **In-Stock, Ships Fast** — Most products ship same-day from our California warehouse.
3. **DLC Premium Certified** — Our fixtures qualify for maximum utility rebates ($20-$75/fixture).
4. **Free Lighting Design** — Our engineers create photometric layouts at no charge.
5. **5-Year Warranty** — Every commercial fixture, no questions asked.
6. **Technical Support** — Real lighting experts, not call center scripts.

### Company Details
- **Address**: 17531 Railroad St Ste F, City of Industry, CA 91748
- **Phone**: (626) 342-8856 (Mon-Fri 8am-6pm PST)
- **Email**: sales@auvolar.com
- **Website**: www.auvolar.com

### Customer Tiers & Benefits
- **Bronze** (New customers): Standard pricing
- **Silver** ($5K+ total purchases): 5% discount + 1.5% reward points
- **Gold** ($25K+ total purchases): 10% discount + 2% reward points
- **Platinum** ($100K+ total purchases): 15% discount + 2.5% reward points + dedicated account manager

### Partner/Distributor Program
- Earn 5-15% commission by referring customers
- Dedicated referral link for tracking
- Tiered commissions: Basic (5%) → Advanced (8%) → Partner (12%) → Strategic (15%)
- Apply at: www.auvolar.com/partner

### Policies
- **Warranty**: 5-year on all commercial fixtures, 10-year on select premium
- **Returns**: 30-day return window, original packaging required
- **Shipping**: Free on orders $2,000+, same-day shipping before 2pm PST
- **Payment**: Credit card, ACH, wire transfer, Net 30 for qualified businesses
- **Tax Exempt**: Available for qualifying organizations

### Tools & Resources on Our Website
- **ROI Calculator**: /tools/roi-calculator — calculate energy savings
- **Photometric Simulation**: /tools/photometric-simulation — lighting layout design
- **Replacement Finder**: /tools/replacement — find LED replacement for existing fixtures
- **Rebate Finder**: /tools/rebate-finder — find local utility rebates
- **Quick Order**: /tools/quick-order — bulk order by SKU
- **BOM Upload**: /tools/bom-upload — upload bill of materials for instant quote
- **Product Design Lab**: /tools/product-design — customize fixtures
- **LightSpec AI**: /tools/lightspec-ai — AI-powered lighting specification tool
`)

  knowledgeCache = sections.join('\n\n')
  knowledgeCacheTime = Date.now()

  console.log(`Knowledge base built: ${(knowledgeCache.length / 1024).toFixed(0)}KB from ${sections.length} sources`)
  return knowledgeCache
}
