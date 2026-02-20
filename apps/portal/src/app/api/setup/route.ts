import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'

// One-time setup endpoint to create the first SUPER_ADMIN
// DELETE this route after creating your admin account!
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, setupKey } = body

    // Simple protection: require a setup key matching NEXTAUTH_SECRET
    if (setupKey !== process.env.NEXTAUTH_SECRET) {
      return NextResponse.json({ message: 'Invalid setup key' }, { status: 403 })
    }

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password required' }, { status: 400 })
    }

    // Check if any SUPER_ADMIN exists
    const existingAdmin = await db.user.findFirst({
      where: { role: 'SUPER_ADMIN' },
    })

    if (existingAdmin) {
      return NextResponse.json({ message: 'SUPER_ADMIN already exists. Setup not allowed.' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const user = await db.user.create({
      data: {
        email,
        passwordHash,
        name: name || 'Super Admin',
        role: 'SUPER_ADMIN',
      },
    })

    return NextResponse.json({
      message: 'SUPER_ADMIN created successfully!',
      user: { id: user.id, email: user.email, role: user.role },
    })
  } catch (error: any) {
    console.error('Setup error:', error)
    // If table doesn't exist, hint to run prisma db push
    if (error.code === 'P2021' || error.message?.includes('does not exist')) {
      return NextResponse.json({
        message: 'Database tables not found. Need to run: prisma db push',
        error: error.message,
      }, { status: 500 })
    }
    return NextResponse.json({ message: error.message || 'Setup failed' }, { status: 500 })
  }
}
