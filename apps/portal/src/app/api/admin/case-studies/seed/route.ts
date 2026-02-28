import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { SEED_CASE_STUDIES } from '@/lib/case-studies-seed'

// POST /api/admin/case-studies/seed — seed initial case studies from hardcoded data
export async function POST() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Unauthorized — SUPER_ADMIN only' }, { status: 403 })
  }

  try {
    const results = []
    for (const cs of SEED_CASE_STUDIES) {
      const existing = await prisma.caseStudy.findUnique({ where: { slug: cs.slug } })
      if (existing) {
        results.push({ slug: cs.slug, action: 'skipped', reason: 'already exists' })
        continue
      }

      await prisma.caseStudy.create({
        data: {
          slug: cs.slug,
          category: cs.category,
          title: cs.title,
          subtitle: cs.subtitle,
          description: cs.description,
          highlights: cs.highlights,
          product: cs.product,
          productSlug: cs.productSlug,
          clients: cs.clients,
          location: cs.location,
          images: cs.images,
          stats: cs.stats,
          sortOrder: cs.sortOrder,
          isPublished: true,
        },
      })
      results.push({ slug: cs.slug, action: 'created' })
    }

    return NextResponse.json({ message: 'Seed complete', results })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ error: 'Seed failed', details: String(error) }, { status: 500 })
  }
}
