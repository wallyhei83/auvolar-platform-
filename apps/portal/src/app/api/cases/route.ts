import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { generateCaseNumber, calculateSLA } from '@/lib/utils'

// POST /api/cases - Create a new case
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { type, subject, message, relatedSkus, relatedOrderIds, attachments } = body

    // Validate required fields
    if (!type || !subject || !message) {
      return NextResponse.json(
        { message: 'Missing required fields: type, subject, message' },
        { status: 400 }
      )
    }

    // Validate case type
    const validTypes = ['RFQ', 'BOM', 'RMA', 'SHIPPING_DAMAGE', 'PHOTOMETRIC', 'REBATE', 'NET_TERMS', 'SUPPORT']
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { message: `Invalid case type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      )
    }

    // Get user details
    const user = await db.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    // Create case
    const caseRecord = await db.case.create({
      data: {
        caseNumber: generateCaseNumber(),
        type,
        status: 'RECEIVED',
        customerId: session.user.id,
        contactEmail: user.email,
        companyName: user.companyName,
        subject,
        customerMessage: message,
        relatedSkus: relatedSkus || [],
        relatedOrderIds: relatedOrderIds || [],
        slaDueAt: calculateSLA(type),
      },
    })

    // Create attachments if provided
    if (attachments && attachments.length > 0) {
      await db.caseAttachment.createMany({
        data: attachments.map((att: { filename: string; url: string; mimeType?: string; fileSize?: number }) => ({
          caseId: caseRecord.id,
          filename: att.filename,
          url: att.url,
          mimeType: att.mimeType,
          fileSize: att.fileSize,
          uploadedBy: session.user.id,
        })),
      })
    }

    // TODO: Send confirmation email

    return NextResponse.json({
      message: 'Case created successfully',
      case: {
        id: caseRecord.id,
        caseNumber: caseRecord.caseNumber,
        type: caseRecord.type,
        status: caseRecord.status,
        slaDueAt: caseRecord.slaDueAt,
      },
    })
  } catch (error) {
    console.error('Create case error:', error)
    return NextResponse.json(
      { message: 'An error occurred while creating the case' },
      { status: 500 }
    )
  }
}

// GET /api/cases - List user's cases
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where: Record<string, unknown> = { customerId: session.user.id }
    if (type) where.type = type
    if (status) where.status = status

    const [cases, total] = await Promise.all([
      db.case.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          attachments: true,
          _count: { select: { messages: true } },
        },
      }),
      db.case.count({ where }),
    ])

    return NextResponse.json({
      cases,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('List cases error:', error)
    return NextResponse.json(
      { message: 'An error occurred while fetching cases' },
      { status: 500 }
    )
  }
}
