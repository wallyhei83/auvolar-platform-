import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { checkPermission } from '@/lib/permissions'

// GET /api/admin/case-studies/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { authorized } = await checkPermission('cases.view')
  if (!authorized) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const { id } = await params
  const caseStudy = await prisma.caseStudy.findUnique({ where: { id } })
  if (!caseStudy) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ caseStudy })
}

// PUT /api/admin/case-studies/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { authorized } = await checkPermission('cases.manage')
  if (!authorized) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const { id } = await params
  const body = await request.json()

  try {
    const caseStudy = await prisma.caseStudy.update({
      where: { id },
      data: {
        ...(body.slug !== undefined && { slug: body.slug }),
        ...(body.category !== undefined && { category: body.category }),
        ...(body.title !== undefined && { title: body.title }),
        ...(body.subtitle !== undefined && { subtitle: body.subtitle }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.highlights !== undefined && { highlights: body.highlights }),
        ...(body.product !== undefined && { product: body.product }),
        ...(body.productSlug !== undefined && { productSlug: body.productSlug }),
        ...(body.clients !== undefined && { clients: body.clients }),
        ...(body.location !== undefined && { location: body.location }),
        ...(body.images !== undefined && { images: body.images }),
        ...(body.youtubeId !== undefined && { youtubeId: body.youtubeId }),
        ...(body.stats !== undefined && { stats: body.stats }),
        ...(body.sortOrder !== undefined && { sortOrder: body.sortOrder }),
        ...(body.isPublished !== undefined && { isPublished: body.isPublished }),
      },
    })
    return NextResponse.json({ caseStudy })
  } catch (error: any) {
    if (error?.code === 'P2025') return NextResponse.json({ error: 'Not found' }, { status: 404 })
    console.error('Update case study error:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

// DELETE /api/admin/case-studies/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { authorized } = await checkPermission('cases.manage')
  if (!authorized) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const { id } = await params
  try {
    await prisma.caseStudy.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error?.code === 'P2025') return NextResponse.json({ error: 'Not found' }, { status: 404 })
    console.error('Delete case study error:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
