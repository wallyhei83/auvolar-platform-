import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

// GET /api/admin/case-studies — list all (including unpublished)
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || !['ADMIN', 'SUPER_ADMIN'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const caseStudies = await prisma.caseStudy.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  })

  return NextResponse.json({ caseStudies })
}

// POST /api/admin/case-studies — create new case study
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || !['ADMIN', 'SUPER_ADMIN'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  try {
    const body = await request.json()
    const {
      slug, category, title, subtitle, description, highlights,
      product, productSlug, clients, location, images,
      youtubeId, stats, sortOrder, isPublished,
    } = body

    if (!slug || !category || !title || !description) {
      return NextResponse.json({ error: 'Missing required fields: slug, category, title, description' }, { status: 400 })
    }

    const caseStudy = await prisma.caseStudy.create({
      data: {
        slug,
        category,
        title,
        subtitle: subtitle || null,
        description,
        highlights: highlights || [],
        product: product || null,
        productSlug: productSlug || null,
        clients: clients || [],
        location: location || null,
        images: images || [],
        youtubeId: youtubeId || null,
        stats: stats || [],
        sortOrder: sortOrder ?? 0,
        isPublished: isPublished ?? true,
      },
    })

    return NextResponse.json({ caseStudy }, { status: 201 })
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'A case study with this slug already exists' }, { status: 409 })
    }
    console.error('Create case study error:', error)
    return NextResponse.json({ error: 'Failed to create case study' }, { status: 500 })
  }
}
