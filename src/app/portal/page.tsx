import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const TIER_ICONS: Record<string, string> = { BRONZE: '🥉', SILVER: '🥈', GOLD: '🥇', PLATINUM: '💎' }

export default async function PortalDashboard() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      cases: { orderBy: { createdAt: 'desc' }, take: 5 },
      quotes: { orderBy: { createdAt: 'desc' }, take: 5 },
    },
  })
  if (!user) redirect('/login')

  const totalCases = user.cases.length
  const openCases = user.cases.filter(c => c.status !== 'CLOSED' && c.status !== 'COMPLETED').length
  const totalQuotes = user.quotes.length
  const pendingQuotes = user.quotes.filter(q => q.status === 'DRAFT' || q.status === 'SENT').length
  const totalSpent = Number(user.totalSpent || 0)
  const rewardBalance = Number(user.rewardBalance || 0)
  const tierIcon = TIER_ICONS[user.customerTier || 'BRONZE'] || '🥉'
  const tierLabel = (user.customerTier || 'BRONZE').charAt(0) + (user.customerTier || 'BRONZE').slice(1).toLowerCase()

  const getStatusColor = (status: string) => {
    const c: Record<string, string> = {
      RECEIVED: 'bg-blue-100 text-blue-700', IN_REVIEW: 'bg-yellow-100 text-yellow-700',
      NEED_INFO: 'bg-orange-100 text-orange-700', COMPLETED: 'bg-green-100 text-green-700',
      CLOSED: 'bg-gray-100 text-gray-600', DRAFT: 'bg-gray-100 text-gray-600',
      SENT: 'bg-blue-100 text-blue-700', ACCEPTED: 'bg-green-100 text-green-700',
      REJECTED: 'bg-red-100 text-red-700', EXPIRED: 'bg-red-100 text-red-700',
    }
    return c[status] || 'bg-gray-100 text-gray-600'
  }

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Welcome + Tier Badge */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name || user.email}</h1>
          <p className="text-gray-500 text-sm mt-1">{user.companyName ? `${user.companyName} · ` : ''}Here&apos;s your account overview</p>
        </div>
        <Link href="/portal/account" className="flex items-center gap-2 px-4 py-2 bg-white border rounded-xl hover:shadow-md transition-shadow">
          <span className="text-2xl">{tierIcon}</span>
          <div className="text-right">
            <p className="text-sm font-bold">{tierLabel} Member</p>
            <p className="text-[10px] text-gray-400">View benefits →</p>
          </div>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Spent" value={`$${totalSpent.toLocaleString()}`} sub="Lifetime" icon="💰" href="/portal/orders" />
        <StatCard label="Reward Balance" value={`$${rewardBalance.toFixed(2)}`} sub="Available credits" icon="🎁" href="/portal/account" />
        <StatCard label="Open Cases" value={openCases.toString()} sub={`${totalCases} total`} icon="📋" href="/portal/cases" />
        <StatCard label="Pending Quotes" value={pendingQuotes.toString()} sub={`${totalQuotes} total`} icon="📝" href="/portal/quotes" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <QuickAction href="/tools/rfq" icon="📝" label="Request Quote" highlight />
        <QuickAction href="/portal/orders" icon="📦" label="My Orders" />
        <QuickAction href="/portal/cases" icon="📋" label="View Cases" />
        <QuickAction href="/products" icon="🛒" label="Browse Products" />
        <QuickAction href="/portal/account" icon="⭐" label="My Rewards" />
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Cases */}
        <div className="bg-white rounded-xl border">
          <div className="px-5 py-4 border-b flex justify-between items-center">
            <h2 className="font-semibold text-gray-900">Recent Cases</h2>
            <Link href="/portal/cases" className="text-xs text-brand hover:underline">View all →</Link>
          </div>
          <div className="divide-y">
            {user.cases.length === 0 ? (
              <div className="p-6 text-center text-gray-400 text-sm">
                No cases yet. <Link href="/tools/rfq" className="text-brand hover:underline">Create your first request</Link>
              </div>
            ) : user.cases.map(c => (
              <div key={c.id} className="px-5 py-3 hover:bg-gray-50 flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-900">{c.subject}</p>
                  <p className="text-xs text-gray-400">{c.caseNumber} · {c.type.replace('_', ' ')}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getStatusColor(c.status)}`}>{c.status.replace('_', ' ')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Quotes */}
        <div className="bg-white rounded-xl border">
          <div className="px-5 py-4 border-b flex justify-between items-center">
            <h2 className="font-semibold text-gray-900">Recent Quotes</h2>
            <Link href="/portal/quotes" className="text-xs text-brand hover:underline">View all →</Link>
          </div>
          <div className="divide-y">
            {user.quotes.length === 0 ? (
              <div className="p-6 text-center text-gray-400 text-sm">
                No quotes yet. Quotes will appear here when created.
              </div>
            ) : user.quotes.map(q => (
              <div key={q.id} className="px-5 py-3 hover:bg-gray-50 flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-900">{q.quoteNumber}</p>
                  <p className="text-xs text-gray-400">${q.totalAmount.toNumber().toLocaleString()}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getStatusColor(q.status)}`}>{q.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, sub, icon, href }: { label: string; value: string; sub: string; icon: string; href: string }) {
  return (
    <Link href={href} className="bg-white rounded-xl border p-4 hover:shadow-md transition-shadow group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xl">{icon}</span>
        <span className="text-[10px] text-gray-400 group-hover:text-brand transition-colors">View →</span>
      </div>
      <p className="text-xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
      <p className="text-[10px] text-gray-400 mt-1">{label}</p>
    </Link>
  )
}

function QuickAction({ href, icon, label, highlight }: { href: string; icon: string; label: string; highlight?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center p-4 rounded-xl border text-center hover:shadow-md transition-all ${
        highlight ? 'border-brand/30 bg-brand/5 hover:border-brand' : 'hover:border-gray-300'
      }`}
    >
      <span className="text-2xl mb-1.5">{icon}</span>
      <span className="text-xs font-medium text-gray-700">{label}</span>
    </Link>
  )
}
