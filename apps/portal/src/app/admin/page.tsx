import Link from 'next/link'
import { db } from '@/lib/db'
import { 
  FileText, 
  Package, 
  Users, 
  AlertTriangle,
  ArrowRight,
  Clock,
  CheckCircle2,
  TrendingUp
} from 'lucide-react'

export default async function AdminDashboard() {
  // Fetch dashboard stats
  const [
    totalCases,
    openCases,
    slaBreach,
    totalQuotes,
    pendingQuotes,
    totalCustomers,
    recentCases,
    recentQuotes,
  ] = await Promise.all([
    db.case.count(),
    db.case.count({ where: { status: { notIn: ['COMPLETED', 'CLOSED'] } } }),
    db.case.count({ where: { slaBreached: true, status: { notIn: ['COMPLETED', 'CLOSED'] } } }),
    db.quote.count(),
    db.quote.count({ where: { status: 'SENT' } }),
    db.user.count({ where: { role: 'CUSTOMER' } }),
    db.case.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { customer: true },
    }),
    db.quote.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { customer: true },
    }),
  ])

  const stats = [
    {
      name: 'Open Cases',
      value: openCases,
      total: totalCases,
      icon: FileText,
      color: 'blue',
      href: '/admin/cases',
    },
    {
      name: 'SLA Breaches',
      value: slaBreach,
      icon: AlertTriangle,
      color: slaBreach > 0 ? 'red' : 'green',
      href: '/admin/cases?filter=breached',
    },
    {
      name: 'Pending Quotes',
      value: pendingQuotes,
      total: totalQuotes,
      icon: Package,
      color: 'yellow',
      href: '/admin/quotes',
    },
    {
      name: 'Customers',
      value: totalCustomers,
      icon: Users,
      color: 'green',
      href: '/admin/customers',
    },
  ]

  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    red: 'bg-red-100 text-red-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    green: 'bg-green-100 text-green-600',
  }

  return (
    <div className="max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-gray-600">Overview of operations</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="card p-6 transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${colorClasses[stat.color]}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {stat.value}
                  {stat.total !== undefined && (
                    <span className="text-sm font-normal text-gray-500">/{stat.total}</span>
                  )}
                </p>
                <p className="text-sm text-gray-600">{stat.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Cases */}
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Recent Cases</h2>
            <Link href="/admin/cases" className="text-sm text-brand-dark hover:text-brand flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentCases.length === 0 ? (
              <p className="p-6 text-center text-sm text-gray-500">No cases yet</p>
            ) : (
              recentCases.map((c) => (
                <Link
                  key={c.id}
                  href={`/admin/cases/${c.id}`}
                  className="flex items-center justify-between p-4 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    {c.slaBreached ? (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    ) : c.status === 'COMPLETED' ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-blue-500" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{c.caseNumber}</p>
                      <p className="text-sm text-gray-600">{c.customer.companyName || c.customer.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`status-${c.status.toLowerCase().replace('_', '-')}`}>
                      {c.status.replace('_', ' ')}
                    </span>
                    <p className="mt-1 text-xs text-gray-500">{c.type}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent Quotes */}
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Recent Quotes</h2>
            <Link href="/admin/quotes" className="text-sm text-brand-dark hover:text-brand flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentQuotes.length === 0 ? (
              <p className="p-6 text-center text-sm text-gray-500">No quotes yet</p>
            ) : (
              recentQuotes.map((q) => (
                <Link
                  key={q.id}
                  href={`/admin/quotes/${q.id}`}
                  className="flex items-center justify-between p-4 hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium text-gray-900">{q.quoteNumber}</p>
                    <p className="text-sm text-gray-600">{q.customer.companyName || q.customer.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ${Number(q.totalAmount).toLocaleString()}
                    </p>
                    <span className={`badge-${q.status === 'SENT' ? 'yellow' : q.status === 'ACCEPTED' ? 'green' : 'gray'}`}>
                      {q.status}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Link
          href="/admin/cases?filter=need-info"
          className="card p-4 flex items-center gap-4 hover:shadow-md transition-all"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">Cases Needing Info</p>
            <p className="text-sm text-gray-600">Review and respond</p>
          </div>
        </Link>

        <Link
          href="/admin/tax-exempt?filter=pending"
          className="card p-4 flex items-center gap-4 hover:shadow-md transition-all"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">Tax Exempt Review</p>
            <p className="text-sm text-gray-600">Pending approvals</p>
          </div>
        </Link>

        <Link
          href="/admin/integrations"
          className="card p-4 flex items-center gap-4 hover:shadow-md transition-all"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">Integration Status</p>
            <p className="text-sm text-gray-600">QBO, Tax, Shipping</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
