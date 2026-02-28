// Case Studies — unified data layer
// All case study data comes from PostgreSQL via Prisma

import { prisma } from '@/lib/db'

export interface CaseStudyStat {
  label: string
  value: string
}

export interface CaseStudyData {
  id: string
  slug: string
  category: string
  title: string
  subtitle: string | null
  description: string
  highlights: string[]
  product: string | null
  productSlug: string | null
  clients: string[]
  location: string | null
  images: string[]
  youtubeId: string | null
  stats: CaseStudyStat[]
  sortOrder: number
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

function transformCaseStudy(cs: any): CaseStudyData {
  return {
    ...cs,
    stats: (cs.stats as CaseStudyStat[]) || [],
  }
}

// Public: get all published case studies
export async function getAllCaseStudies(): Promise<CaseStudyData[]> {
  const data = await prisma.caseStudy.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  })
  return data.map(transformCaseStudy)
}

// Public: get by category
export async function getCaseStudiesByCategory(category: string): Promise<CaseStudyData[]> {
  const data = await prisma.caseStudy.findMany({
    where: { isPublished: true, category },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  })
  return data.map(transformCaseStudy)
}

// Public: get by slug
export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyData | null> {
  const cs = await prisma.caseStudy.findUnique({ where: { slug } })
  return cs ? transformCaseStudy(cs) : null
}

// Public: get case studies related to a product
export async function getCaseStudiesForProduct(productSlug: string): Promise<CaseStudyData[]> {
  const data = await prisma.caseStudy.findMany({
    where: {
      isPublished: true,
      productSlug: { not: null },
    },
    orderBy: [{ sortOrder: 'asc' }],
  })
  // Match by productSlug or by partial slug match (e.g. "ot-series" matches multiple OT products)
  return data
    .filter(cs => {
      if (!cs.productSlug) return false
      // Exact match
      if (cs.productSlug === productSlug) return true
      // Partial match: if case study references "ot-series" and product slug contains "ot-series"
      if (productSlug.includes('ot-series') && cs.productSlug.includes('ot-series')) return true
      if (productSlug.includes('plb-series') && cs.productSlug.includes('plb-series')) return true
      if (productSlug.includes('isf') && cs.productSlug.includes('isf')) return true
      if (productSlug.includes('ins') && cs.productSlug.includes('ins')) return true
      return false
    })
    .map(transformCaseStudy)
}

// Admin: get all (including unpublished)
export async function getAllCaseStudiesAdmin(): Promise<CaseStudyData[]> {
  const data = await prisma.caseStudy.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  })
  return data.map(transformCaseStudy)
}
