import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

// Generate case number
function generateCaseNumber(): string {
  const prefix = 'CS'
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

// Calculate SLA based on case type
function calculateSLA(type: string, priority: string): Date {
  const now = new Date()
  let hoursToAdd = 48 // Default 48 hours

  // Adjust based on type
  const typeHours: Record<string, number> = {
    RFQ: 24,
    BOM_REVIEW: 48,
    RMA: 24,
    PHOTOMETRIC: 72,
    REBATE: 72,
    GENERAL: 48,
  }
  hoursToAdd = typeHours[type] || 48

  // Adjust based on priority
  if (priority === 'URGENT') hoursToAdd = Math.min(hoursToAdd, 8)
  else if (priority === 'HIGH') hoursToAdd = Math.min(hoursToAdd, 24)

  now.setHours(now.getHours() + hoursToAdd)
  return now
}

// POST /api/cases - Create a new case
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { type, subject, description, priority = 'NORMAL' } = body

    // Validate required fields
    if (!type || !subject || !description) {
      return NextResponse.json(
        { message: 'Missing required fields: type, subject, description' },
        { status: 400 }
      )
    }

    // Validate case type
    const validTypes = ['RFQ', 'BOM_REVIEW', 'RMA', 'PHOTOMETRIC', 'REBATE', 'GENERAL']
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { message: `Invalid case type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      )
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    // Create case
    const caseRecord = await prisma.case.create({
      data: {
        caseNumber: generateCaseNumber(),
        type,
        status: 'RECEIVED',
        priority,
        customerId: user.id,
        contactEmail: user.email,
        companyName: user.companyName,
        subject,
        customerMessage: description,
        slaDueAt: calculateSLA(type, priority),
      },
    })

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

    if (!session?.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    // Build where clause based on user role
    const where: Record<string, unknown> = {}
    
    // Admins/staff see all cases, customers see only their own
    if (user.role === 'CUSTOMER') {
      where.customerId = user.id
    }
    
    if (type) where.type = type
    if (status) where.status = status

    const [cases, total] = await Promise.all([
      prisma.case.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          customer: {
            select: { name: true, email: true, companyName: true },
          },
          assignedTo: {
            select: { name: true, email: true },
          },
        },
      }),
      prisma.case.count({ where }),
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
