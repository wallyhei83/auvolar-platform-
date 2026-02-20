import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { BarChart3, Users, FileText, Package, TrendingUp } from 'lucide-react'

export default async function AdminAnalyticsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const [userCount, caseCount, quoteCount, recentUsers] = await Promise.all([
    prisma.user.count(),
    prisma.case.count(),
    prisma.quote.count(),
    prisma.user.count({
      where: {
        createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      },
    }),
  ])

  const casesByStatus = await prisma.case.groupBy({
    by: ['status'],
    _count: true,
  })

  const stats = [
    { label: 'Total Users', value: userCount, icon: Users, color: 'text-blue-600' },
    { label: 'Total Cases', value: caseCount, icon: FileText, color: 'text-purple-600' },
    { label: 'Total Quotes', value: quoteCount, icon: Package, color: 'text-green-600' },
    { label: 'New Users (30d)', value: recentUsers, icon: TrendingUp, color: 'text-orange-600' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Platform overview and metrics</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <div>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" /> Cases by Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          {casesByStatus.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No cases data yet</p>
          ) : (
            <div className="space-y-3">
              {casesByStatus.map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700 w-32">{item.status}</span>
                    <div className="h-4 bg-blue-100 rounded-full" style={{ width: `${Math.max(item._count * 20, 40)}px` }}>
                      <div className="h-4 bg-blue-500 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{item._count}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
