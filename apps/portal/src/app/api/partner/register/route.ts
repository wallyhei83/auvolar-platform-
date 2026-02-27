import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { syncContactToHubSpot } from '@/lib/hubspot'
import { rateLimit, getClientIP } from '@/lib/rate-limit'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 3 partner registration attempts per IP per 30 minutes
    const ip = getClientIP(request)
    const limiter = rateLimit(`partner-register:${ip}`, { maxRequests: 3, windowMs: 30 * 60 * 1000 })
    if (!limiter.success) {
      return NextResponse.json(
        { message: 'Too many registration attempts. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const {
      email, password, name, companyName, phone,
      partnerType, // CONTRACTOR | ENGINEER | ELECTRICIAN | PROPERTY_OWNER | PRODUCT_MANAGER | DISTRIBUTOR | SUPPLIER
      website, serviceArea, licenseNumber, description
    } = body

    // Validate required fields
    if (!email || !password || !name || !companyName || !partnerType) {
      return NextResponse.json(
        { message: 'Missing required fields: email, password, name, companyName, partnerType' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // Validate partner type
    const validTypes = ['REP', 'INSTALLER', 'DISTRIBUTOR', 'CONTRACTOR', 'ENGINEER', 'ELECTRICIAN', 'PROPERTY_OWNER', 'PRODUCT_MANAGER', 'SUPPLIER']
    if (!validTypes.includes(partnerType)) {
      return NextResponse.json(
        { message: `Invalid partner type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      )
    }

    // Map extended types to DB enum (PartnerType has REP, INSTALLER, DISTRIBUTOR)
    const typeMap: Record<string, string> = {
      'CONTRACTOR': 'INSTALLER',
      'ENGINEER': 'REP',
      'ELECTRICIAN': 'INSTALLER',
      'PROPERTY_OWNER': 'REP',
      'PRODUCT_MANAGER': 'REP',
      'SUPPLIER': 'DISTRIBUTOR',
      'REP': 'REP',
      'INSTALLER': 'INSTALLER',
      'DISTRIBUTOR': 'DISTRIBUTOR',
    }
    const dbPartnerType = typeMap[partnerType] || 'REP'

    // Check if user already exists
    const existingUser = await db.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json(
        { message: 'An account with this email already exists. Please log in and apply for partner status.' },
        { status: 409 }
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)

    // Generate unique referral code: AUV-XXXX-XXXX
    const referralCode = `AUV-${crypto.randomBytes(2).toString('hex').toUpperCase()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`

    // Create user + partner in a transaction
    const result = await db.$transaction(async (tx) => {
      // Create user with PARTNER role
      const user = await tx.user.create({
        data: {
          email,
          passwordHash,
          name,
          companyName,
          phone: phone || '',
          role: 'PARTNER',
        },
      })

      // Create partner record
      const partner = await tx.partner.create({
        data: {
          userId: user.id,
          partnerType: dbPartnerType as any,
          companyName,
          referralCode,
          status: 'PENDING',
        },
      })

      return { user, partner }
    })

    // Sync to HubSpot (non-blocking)
    syncContactToHubSpot({
      email,
      firstname: name,
      phone: phone || undefined,
      company: companyName,
      lead_source: `partner_registration_${partnerType.toLowerCase()}`,
    }).catch(err => {
      console.error('HubSpot sync error on partner registration:', err)
    })

    return NextResponse.json({
      message: 'Partner application submitted successfully! Your application is under review.',
      partner: {
        id: result.partner.id,
        referralCode: result.partner.referralCode,
        status: result.partner.status,
        partnerType: partnerType,
      },
    }, { status: 201 })

  } catch (error) {
    console.error('Partner registration error:', error)
    return NextResponse.json(
      { message: 'An error occurred during registration' },
      { status: 500 }
    )
  }
}
