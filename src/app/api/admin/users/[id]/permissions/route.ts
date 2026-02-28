import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { ALL_PERMISSIONS } from '@/lib/permissions'

// GET - Get user's permissions
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true, role: true, permissions: true },
  })

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      permissions: user.role === 'SUPER_ADMIN' ? Object.keys(ALL_PERMISSIONS) : (user.permissions || []),
      isSuper: user.role === 'SUPER_ADMIN',
    },
    allPermissions: ALL_PERMISSIONS,
  })
}

// PATCH - Update user's permissions
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = await getServerSession(authOptions)

  // Only SUPER_ADMIN can change permissions
  if (!session || session.user.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Only SUPER_ADMIN can manage permissions' }, { status: 403 })
  }

  const { permissions } = await request.json()
  if (!Array.isArray(permissions)) {
    return NextResponse.json({ error: 'permissions must be an array' }, { status: 400 })
  }

  // Validate all permissions are valid
  const validPerms = Object.keys(ALL_PERMISSIONS)
  const invalid = permissions.filter((p: string) => !validPerms.includes(p))
  if (invalid.length > 0) {
    return NextResponse.json({ error: `Invalid permissions: ${invalid.join(', ')}` }, { status: 400 })
  }

  // Can't set permissions on SUPER_ADMIN (they have all)
  const target = await prisma.user.findUnique({ where: { id }, select: { role: true } })
  if (!target) return NextResponse.json({ error: 'User not found' }, { status: 404 })
  if (target.role === 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'SUPER_ADMIN has all permissions by default' }, { status: 400 })
  }

  // Can only set permissions on ADMIN or STAFF
  if (target.role !== 'ADMIN' && target.role !== 'STAFF') {
    return NextResponse.json({ error: 'Permissions can only be set on ADMIN or STAFF users' }, { status: 400 })
  }

  const updated = await prisma.user.update({
    where: { id },
    data: { permissions },
    select: { id: true, email: true, permissions: true },
  })

  return NextResponse.json({ message: 'Permissions updated', user: updated })
}
