import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/case-studies — public, list all published case studies
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const product = searchParams.get('product')
    const category = searchParams.get('category')

    const where: any = { isPublished: true }
    if (category) where.category = category

    const caseStudies = await prisma.caseStudy.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    })

    // If product filter, do fuzzy matching
    let results = caseStudies
    if (product) {
      results = caseStudies.filter(cs => {
        if (!cs.productSlug) return false
        if (cs.productSlug === product) return true
        // Series matching
        if (product.includes('ot-series') && cs.productSlug.includes('ot-series')) return true
        if (product.includes('ot-series') && cs.productSlug.includes('shoebox-ot')) return true
        if (product.includes('shoebox-ot') && cs.productSlug.includes('ot-series')) return true
        if (product.includes('plb-series') && cs.productSlug.includes('plb-series')) return true
        if (product.includes('plb') && cs.productSlug.includes('plb')) return true
        if (product.includes('isf') && cs.productSlug.includes('isf')) return true
        if (product.includes('ins') && cs.productSlug.includes('ins')) return true
        return false
      })
    }

    return NextResponse.json({ caseStudies: results })
  } catch (error) {
    console.error('Case studies API error:', error)
    return NextResponse.json({ error: 'Failed to fetch case studies' }, { status: 500 })
  }
}
