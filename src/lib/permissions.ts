import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

/**
 * Fine-grained permission system for Auvolar Admin.
 * 
 * SUPER_ADMIN: Has ALL permissions implicitly (no need to assign).
 * ADMIN/STAFF: Must have specific permissions assigned.
 * CUSTOMER/PARTNER: No admin permissions.
 */

// All available permissions
export const ALL_PERMISSIONS = {
  // Products
  'products.view': 'View products',
  'products.edit': 'Edit products',
  'products.create': 'Create products',
  'products.delete': 'Delete products',

  // Documents (spec sheets, IES, install guides)
  'documents.view': 'View product documents',
  'documents.upload': 'Upload documents',
  'documents.delete': 'Delete documents',

  // Orders
  'orders.view': 'View orders',
  'orders.manage': 'Manage orders (status, refund)',

  // Partners & Distributors
  'partners.view': 'View partners',
  'partners.manage': 'Approve/reject/edit partners',

  // Commission & Payouts
  'commission.view': 'View commission settings',
  'commission.manage': 'Edit commission rules',
  'payouts.view': 'View payouts',
  'payouts.manage': 'Process payouts',

  // Users
  'users.view': 'View user list',
  'users.manage': 'Create/edit/delete users',

  // Case Studies
  'cases.view': 'View case studies',
  'cases.manage': 'Create/edit/delete case studies',

  // Support Tickets
  'tickets.view': 'View support tickets',
  'tickets.manage': 'Respond to tickets',

  // Analytics
  'analytics.view': 'View analytics & dashboard',

  // Settings
  'settings.manage': 'Manage site settings',
} as const

export type Permission = keyof typeof ALL_PERMISSIONS

// Permission groups for quick assignment in UI
export const PERMISSION_GROUPS = {
  'Product Manager': [
    'products.view', 'products.edit', 'products.create',
    'documents.view', 'documents.upload', 'documents.delete',
    'cases.view', 'cases.manage',
  ],
  'Sales Manager': [
    'products.view', 'documents.view',
    'orders.view', 'orders.manage',
    'partners.view', 'partners.manage',
    'commission.view', 'commission.manage',
    'payouts.view', 'payouts.manage',
    'analytics.view',
  ],
  'Support Agent': [
    'products.view', 'documents.view',
    'orders.view',
    'tickets.view', 'tickets.manage',
    'cases.view',
  ],
  'Content Editor': [
    'products.view', 'products.edit',
    'documents.view', 'documents.upload',
    'cases.view', 'cases.manage',
  ],
  'Full Admin': Object.keys(ALL_PERMISSIONS),
} as const

/**
 * Check if the current session user has a specific permission.
 * SUPER_ADMIN always returns true.
 * Returns the session if authorized, null if not.
 */
export async function checkPermission(
  permission: Permission | Permission[]
): Promise<{ authorized: boolean; session: any; reason?: string }> {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return { authorized: false, session: null, reason: 'Not authenticated' }
  }

  const { role } = session.user

  // SUPER_ADMIN has all permissions
  if (role === 'SUPER_ADMIN') {
    return { authorized: true, session }
  }

  // Only ADMIN and STAFF can have admin permissions
  if (role !== 'ADMIN' && role !== 'STAFF') {
    return { authorized: false, session, reason: 'Insufficient role' }
  }

  // Fetch user's permissions from DB
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { permissions: true },
  })

  if (!user) {
    return { authorized: false, session, reason: 'User not found' }
  }

  const userPerms = user.permissions || []
  const required = Array.isArray(permission) ? permission : [permission]

  // Check if user has ANY of the required permissions
  const hasPermission = required.some(p => userPerms.includes(p))

  if (!hasPermission) {
    return { authorized: false, session, reason: `Missing permission: ${required.join(' or ')}` }
  }

  return { authorized: true, session }
}

/**
 * Simple admin check (ADMIN or SUPER_ADMIN with any access).
 * Use this for basic "is this an admin?" checks.
 * For specific permissions, use checkPermission() instead.
 */
export async function requireAdmin(): Promise<{ authorized: boolean; session: any }> {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return { authorized: false, session: null }
  const { role } = session.user
  if (role !== 'ADMIN' && role !== 'SUPER_ADMIN' && role !== 'STAFF') {
    return { authorized: false, session }
  }
  return { authorized: true, session }
}

/**
 * Get user permissions for display in UI.
 */
export async function getUserPermissions(userId: string): Promise<string[]> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { permissions: true, role: true },
  })
  if (!user) return []
  if (user.role === 'SUPER_ADMIN') return Object.keys(ALL_PERMISSIONS)
  return user.permissions || []
}
