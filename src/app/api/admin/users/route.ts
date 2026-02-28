import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

// GET - List all users
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      email: true,
      name: true,
      companyName: true,
      phone: true,
      role: true,
      permissions: true,
      createdAt: true,
      updatedAt: true,
      _count: { select: { cases: true, quotes: true } },
    },
  })

  return NextResponse.json(users)
}

// POST - Create a new user (sub-account)
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })
  }

  const body = await request.json()
  const { email, password, name, companyName, phone, role } = body

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password required' }, { status: 400 })
  }

  if (password.length < 8) {
    return NextResponse.json({ message: 'Password must be at least 8 characters' }, { status: 400 })
  }

  // Only SUPER_ADMIN can create ADMIN/SUPER_ADMIN
  const allowedRoles = ['CUSTOMER', 'PARTNER', 'STAFF']
  if (session.user.role === 'SUPER_ADMIN') {
    allowedRoles.push('ADMIN')
  }
  if (role && !allowedRoles.includes(role)) {
    return NextResponse.json({ message: `Cannot assign role: ${role}` }, { status: 403 })
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ message: 'Email already exists' }, { status: 409 })
  }

  const passwordHash = await bcrypt.hash(password, 12)
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name: name || '',
      companyName: companyName || '',
      phone: phone || '',
      role: role || 'CUSTOMER',
    },
  })

  return NextResponse.json({
    message: 'User created',
    user: { id: user.id, email: user.email, role: user.role },
  }, { status: 201 })
}
