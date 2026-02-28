import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    redirect('/login')
  }

  // Check if user is admin
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user || (user.role !== 'ADMIN' && user.role !== 'STAFF' && user.role !== 'SUPER_ADMIN')) {
    redirect('/portal')
  }

  // Get stats
  const [
    totalUsers,
    totalCases,
    totalQuotes,
    openCases,
    pendingQuotes,
    recentCases,
    recentUsers,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.case.count(),
    prisma.quote.count(),
    prisma.case.count({ where: { status: { in: ['RECEIVED', 'IN_REVIEW', 'NEED_INFO'] } } }),
    prisma.quote.count({ where: { status: { in: ['DRAFT', 'SENT'] } } }),
    prisma.case.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        customer: { select: { name: true, companyName: true } },
      },
    }),
    prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, companyName: true, createdAt: true },
    }),
  ])

  // Calculate cases needing attention (past SLA or urgent)
  const urgentCases = await prisma.case.count({
    where: {
      OR: [
        { priority: 'URGENT', status: { notIn: ['COMPLETED', 'CLOSED'] } },
        { slaDueAt: { lt: new Date() }, status: { notIn: ['COMPLETED', 'CLOSED'] } },
      ],
    },
  })

  const stats = [
    { label: 'Total Users', value: totalUsers, icon: '👥', href: '/admin/users' },
    { label: 'Total Cases', value: totalCases, icon: '📋', href: '/admin/cases' },
    { label: 'Open Cases', value: openCases, icon: '🔔', href: '/admin/cases?status=open', alert: openCases > 0 },
    { label: 'Urgent/Overdue', value: urgentCases, icon: '🚨', href: '/admin/cases?urgent=true', alert: urgentCases > 0 },
    { label: 'Total Quotes', value: totalQuotes, icon: '💰', href: '/admin/quotes' },
    { label: 'Pending Quotes', value: pendingQuotes, icon: '⏳', href: '/admin/quotes?status=pending' },
  ]

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      RECEIVED: 'bg-blue-100 text-blue-800',
      IN_REVIEW: 'bg-yellow-100 text-yellow-800',
      NEED_INFO: 'bg-orange-100 text-orange-800',
      COMPLETED: 'bg-green-100 text-green-800',
      CLOSED: 'bg-gray-100 text-gray-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.name || user.email}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow ${
              stat.alert ? 'ring-2 ring-red-500' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
              {stat.alert && <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>}
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Cases */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-semibold">Recent Cases</h2>
            <Link href="/admin/cases" className="text-sm text-[#FFD60A] hover:underline">
              View all →
            </Link>
          </div>
          <div className="divide-y">
            {recentCases.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No cases yet</div>
            ) : (
              recentCases.map((caseItem) => (
                <Link
                  key={caseItem.id}
                  href={`/admin/cases/${caseItem.id}`}
                  className="p-4 hover:bg-gray-50 block"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{caseItem.subject}</p>
                      <p className="text-sm text-gray-500">
                        {caseItem.caseNumber} • {caseItem.customer?.companyName || caseItem.customer?.name || 'Unknown'}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(caseItem.status)}`}>
                      {caseItem.status.replace('_', ' ')}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-semibold">Recent Registrations</h2>
            <Link href="/admin/users" className="text-sm text-[#FFD60A] hover:underline">
              View all →
            </Link>
          </div>
          <div className="divide-y">
            {recentUsers.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No users yet</div>
            ) : (
              recentUsers.map((regUser) => (
                <div key={regUser.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{regUser.name || regUser.email}</p>
                      <p className="text-sm text-gray-500">
                        {regUser.companyName || regUser.email}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(regUser.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/cases"
            className="flex flex-col items-center p-4 border rounded-lg hover:border-[#FFD60A] hover:bg-yellow-50 transition-colors"
          >
            <span className="text-2xl mb-2">📋</span>
            <span className="text-sm font-medium">Manage Cases</span>
          </Link>
          <Link
            href="/admin/quotes"
            className="flex flex-col items-center p-4 border rounded-lg hover:border-[#FFD60A] hover:bg-yellow-50 transition-colors"
          >
            <span className="text-2xl mb-2">💰</span>
            <span className="text-sm font-medium">Manage Quotes</span>
          </Link>
          <Link
            href="/admin/users"
            className="flex flex-col items-center p-4 border rounded-lg hover:border-[#FFD60A] hover:bg-yellow-50 transition-colors"
          >
            <span className="text-2xl mb-2">👥</span>
            <span className="text-sm font-medium">Manage Users</span>
          </Link>
          <Link
            href="/products"
            className="flex flex-col items-center p-4 border rounded-lg hover:border-[#FFD60A] hover:bg-yellow-50 transition-colors"
          >
            <span className="text-2xl mb-2">📦</span>
            <span className="text-sm font-medium">View Products</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
