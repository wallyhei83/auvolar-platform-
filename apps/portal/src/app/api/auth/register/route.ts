import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { syncContactToHubSpot } from '@/lib/hubspot'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, companyName, phone } = body

    // Validate required fields
    if (!email || !password || !name || !companyName) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'An account with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)

    // Create user
    const user = await db.user.create({
      data: {
        email,
        passwordHash,
        name,
        companyName,
        phone,
        role: 'CUSTOMER',
      },
    })

    // Sync new user to HubSpot CRM (non-blocking)
    syncContactToHubSpot({
      email,
      firstname: name,
      phone: phone || undefined,
      company: companyName,
      lead_source: 'registration',
    }).catch(err => {
      console.error('HubSpot sync error on registration:', err)
    })

    return NextResponse.json({
      message: 'Account created successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        companyName: user.companyName,
      },
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'An error occurred during registration' },
      { status: 500 }
    )
  }
}
