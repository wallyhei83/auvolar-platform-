import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
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
  ChevronRight
} from 'lucide-react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login?callbackUrl=/admin')
  }

  if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
    redirect('/portal')
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Cases', href: '/admin/cases', icon: FileText },
    { name: 'Quotes', href: '/admin/quotes', icon: Package },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Partners', href: '/admin/partners', icon: Users },
    { name: 'Tax Exempt', href: '/admin/tax-exempt', icon: FileCheck },
    { name: 'Products & Docs', href: '/admin/products', icon: FileText },
    { name: 'Integrations', href: '/admin/integrations', icon: Link2 },
    { name: 'AI Console', href: '/admin/ai', icon: Bot },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ]

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
              <div className="text-gray-400 text-xs">{session.user.role}</div>
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
        {/* Sidebar */}
        <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 border-r border-gray-200 bg-white overflow-y-auto">
          <nav className="flex flex-col gap-1 p-4">
            {navigation.map((item) => (
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
