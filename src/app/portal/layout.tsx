import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { 
  Zap, LayoutDashboard, FileText, Package, Folder, FileCheck, Settings,
  LogOut, ChevronRight, ShoppingCart, Award, Truck, RefreshCw
} from 'lucide-react'

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login?callbackUrl=/portal')

  const navigation = [
    { name: 'Dashboard', href: '/portal', icon: LayoutDashboard },
    { name: 'My Orders', href: '/portal/orders', icon: ShoppingCart },
    { name: 'My Cases', href: '/portal/cases', icon: FileText },
    { name: 'My Quotes', href: '/portal/quotes', icon: Package },
    { name: 'My Projects', href: '/portal/projects', icon: Folder },
    { name: 'My Account', href: '/portal/account', icon: Award },
    { name: 'Tax Exempt', href: '/portal/tax-exempt', icon: FileCheck },
    { name: 'Settings', href: '/portal/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand">
                <Zap className="h-5 w-5 text-black" />
              </div>
              <span className="text-lg font-bold">Auvolar</span>
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">Customer Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-right">
              <div className="font-medium text-gray-900">{session.user.name}</div>
              <div className="text-gray-500 text-xs">{session.user.companyName}</div>
            </div>
            <Link href="/api/auth/signout" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900">
              <LogOut className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="sticky top-16 h-[calc(100vh-4rem)] w-56 border-r border-gray-200 bg-white flex flex-col">
          <nav className="flex-1 flex flex-col gap-0.5 p-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <item.icon className="h-4 w-4 text-gray-400" />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="border-t border-gray-200 p-3 space-y-2">
            <p className="text-[10px] font-semibold uppercase text-gray-400 px-3">Quick Actions</p>
            <Link href="/tools/rfq" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium bg-brand/10 text-gray-900 hover:bg-brand/20 transition-colors">
              <FileText className="h-4 w-4" /> Request Quote
            </Link>
            <Link href="/portal/orders" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 transition-colors">
              <Truck className="h-4 w-4" /> Track Order
            </Link>
            <Link href="/tools/rma" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 transition-colors">
              <RefreshCw className="h-4 w-4" /> Submit RMA
            </Link>
          </div>
        </aside>

        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
