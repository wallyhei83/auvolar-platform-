import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { 
  Zap, 
  LayoutDashboard, 
  FileText, 
  Package, 
  Users, 
  FileCheck, 
  Settings,
  Link2,
  Bot,
  BarChart3,
  LogOut,
  ChevronRight,
  Trophy,
  HandCoins,
  Shield,
} from 'lucide-react'

// Map navigation items to required permissions
const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, permissions: [] }, // Everyone can see dashboard
  { name: 'Orders', href: '/admin/orders', icon: Package, permissions: ['orders.view'] },
  { name: 'Support Tickets', href: '/admin/cases', icon: FileText, permissions: ['tickets.view'] },
  { name: 'Quotes', href: '/admin/quotes', icon: Package, permissions: ['orders.view'] },
  { name: 'Users', href: '/admin/users', icon: Users, permissions: ['users.view'] },
  { name: 'Partners', href: '/admin/partners', icon: Users, permissions: ['partners.view'] },
  { name: 'Commission', href: '/admin/commission', icon: HandCoins, permissions: ['commission.view'] },
  { name: 'Tax Exempt', href: '/admin/tax-exempt', icon: FileCheck, permissions: ['orders.view'] },
  { name: 'Case Studies', href: '/admin/case-studies', icon: Trophy, permissions: ['cases.view'] },
  { name: 'Products & Docs', href: '/admin/products', icon: FileText, permissions: ['products.view', 'documents.view'] },
  { name: 'Integrations', href: '/admin/integrations', icon: Link2, permissions: ['settings.manage'] },
  { name: 'AI Console', href: '/admin/ai', icon: Bot, permissions: ['settings.manage'] },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3, permissions: ['analytics.view'] },
  { name: 'Settings', href: '/admin/settings', icon: Settings, permissions: ['settings.manage'] },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login?callbackUrl=/admin')
  }

  // Allow ADMIN, SUPER_ADMIN, and STAFF with permissions
  const role = session.user.role
  if (role !== 'ADMIN' && role !== 'SUPER_ADMIN' && role !== 'STAFF') {
    redirect('/portal')
  }

  // Get user permissions from DB (JWT might be stale)
  let userPermissions: string[] = []
  if (role === 'SUPER_ADMIN') {
    userPermissions = ['*'] // All permissions
  } else {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { permissions: true },
    })
    userPermissions = user?.permissions || []
  }

  const isSuperAdmin = role === 'SUPER_ADMIN'

  // Filter navigation based on permissions
  const visibleNav = navigation.filter(item => {
    if (isSuperAdmin) return true
    if (item.permissions.length === 0) return true // No permission required (Dashboard)
    return item.permissions.some(p => userPermissions.includes(p))
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-gray-900 text-white">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand">
                <Zap className="h-5 w-5 text-black" />
              </div>
              <span className="text-lg font-bold">Auvolar</span>
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-400">Admin Console</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-right">
              <div className="font-medium">{session.user.name}</div>
              <div className="flex items-center gap-1 text-gray-400 text-xs">
                {isSuperAdmin && <Shield className="h-3 w-3 text-yellow-400" />}
                {role}
              </div>
            </div>
            <Link
              href="/api/auth/signout"
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar — filtered by permissions */}
        <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 border-r border-gray-200 bg-white overflow-y-auto">
          <nav className="flex flex-col gap-1 p-4">
            {visibleNav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
