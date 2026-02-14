import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function PortalCasesPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    redirect('/login')
  }

  const cases = await prisma.case.findMany({
    where: { customerId: user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      assignee: {
        select: { name: true, email: true },
      },
    },
  })

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      NEW: 'bg-blue-100 text-blue-800',
      OPEN: 'bg-yellow-100 text-yellow-800',
      IN_PROGRESS: 'bg-purple-100 text-purple-800',
      PENDING_CUSTOMER: 'bg-orange-100 text-orange-800',
      RESOLVED: 'bg-green-100 text-green-800',
      CLOSED: 'bg-gray-100 text-gray-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      LOW: 'text-gray-600',
      MEDIUM: 'text-yellow-600',
      HIGH: 'text-orange-600',
      URGENT: 'text-red-600',
    }
    return colors[priority] || 'text-gray-600'
  }

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      RFQ: '📝',
      BOM_REVIEW: '📋',
      RMA: '🔄',
      PHOTOMETRIC: '💡',
      REBATE: '💰',
      GENERAL: '❓',
    }
    return icons[type] || '📄'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Cases</h1>
          <p className="text-gray-600">Track and manage your support requests</p>
        </div>
        <Link
          href="/portal/cases/new"
          className="bg-[#FFD60A] text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-400"
        >
          + New Case
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-2xl font-bold">{cases.length}</p>
          <p className="text-sm text-gray-600">Total Cases</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-2xl font-bold text-blue-600">
            {cases.filter(c => c.status === 'NEW').length}
          </p>
          <p className="text-sm text-gray-600">New</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-2xl font-bold text-purple-600">
            {cases.filter(c => c.status === 'IN_PROGRESS').length}
          </p>
          <p className="text-sm text-gray-600">In Progress</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-2xl font-bold text-green-600">
            {cases.filter(c => c.status === 'RESOLVED' || c.status === 'CLOSED').length}
          </p>
          <p className="text-sm text-gray-600">Resolved</p>
        </div>
      </div>

      {/* Cases List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {cases.length === 0 ? (
          <div className="p-12 text-center">
            <span className="text-4xl mb-4 block">📭</span>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No cases yet</h3>
            <p className="text-gray-600 mb-4">
              Create your first case to get started with support
            </p>
            <Link
              href="/portal/cases/new"
              className="inline-block bg-[#FFD60A] text-black px-6 py-2 rounded-lg font-medium hover:bg-yellow-400"
            >
              Create Case
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Case</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {cases.map((caseItem) => (
                <tr key={caseItem.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Link href={`/portal/cases/${caseItem.id}`} className="hover:text-[#FFD60A]">
                      <p className="font-medium text-gray-900">{caseItem.subject}</p>
                      <p className="text-sm text-gray-500">{caseItem.caseNumber}</p>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-2">
                      <span>{getTypeIcon(caseItem.type)}</span>
                      <span className="text-sm">{caseItem.type.replace('_', ' ')}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(caseItem.status)}`}>
                      {caseItem.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${getPriorityColor(caseItem.priority)}`}>
                      {caseItem.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {caseItem.assignee?.name || 'Unassigned'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(caseItem.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
