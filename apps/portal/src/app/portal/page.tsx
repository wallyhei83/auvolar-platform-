import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { 
  FileText, 
  Package, 
  Folder, 
  Clock, 
  ArrowRight,
  AlertCircle,
  CheckCircle2
} from 'lucide-react'

export default async function PortalDashboard() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return null
  }

  // Fetch user's data
  const [cases, quotes, projects] = await Promise.all([
    db.case.findMany({
      where: { customerId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    db.quote.findMany({
      where: { customerId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    db.project.findMany({
      where: { customerId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
  ])

  // Calculate stats
  const openCases = cases.filter(c => !['COMPLETED', 'CLOSED'].includes(c.status)).length
  const pendingQuotes = quotes.filter(q => q.status === 'SENT').length
  const activeProjects = projects.length

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {session.user.name?.split(' ')[0] || 'there'}
        </h1>
        <p className="mt-1 text-gray-600">
          Here&apos;s what&apos;s happening with your account
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="card p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{openCases}</p>
              <p className="text-sm text-gray-600">Open Cases</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
              <Package className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{pendingQuotes}</p>
              <p className="text-sm text-gray-600">Pending Quotes</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Folder className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeProjects}</p>
              <p className="text-sm text-gray-600">Active Projects</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Cases */}
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Recent Cases</h2>
            <Link href="/portal/cases" className="text-sm text-brand-dark hover:text-brand flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="card-content">
            {cases.length === 0 ? (
              <p className="text-center text-sm text-gray-500 py-8">
                No cases yet. Need help? <Link href="/tools/rfq" className="text-brand-dark hover:text-brand">Submit a request</Link>
              </p>
            ) : (
              <div className="space-y-4">
                {cases.map((c) => (
                  <Link
                    key={c.id}
                    href={`/portal/cases/${c.id}`}
                    className="flex items-center justify-between rounded-lg border border-gray-100 p-3 hover:border-gray-200 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      {c.status === 'NEED_INFO' ? (
                        <AlertCircle className="h-5 w-5 text-orange-500" />
                      ) : c.status === 'COMPLETED' ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-blue-500" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{c.caseNumber}</p>
                        <p className="text-sm text-gray-600">{c.subject}</p>
                      </div>
                    </div>
                    <span className={`status-${c.status.toLowerCase().replace('_', '-')}`}>
                      {c.status.replace('_', ' ')}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Quotes */}
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Recent Quotes</h2>
            <Link href="/portal/quotes" className="text-sm text-brand-dark hover:text-brand flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="card-content">
            {quotes.length === 0 ? (
              <p className="text-center text-sm text-gray-500 py-8">
                No quotes yet. <Link href="/tools/rfq" className="text-brand-dark hover:text-brand">Request a quote</Link>
              </p>
            ) : (
              <div className="space-y-4">
                {quotes.map((q) => (
                  <Link
                    key={q.id}
                    href={`/portal/quotes/${q.id}`}
                    className="flex items-center justify-between rounded-lg border border-gray-100 p-3 hover:border-gray-200 hover:bg-gray-50"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{q.quoteNumber}</p>
                      <p className="text-sm text-gray-600">
                        Valid until {new Date(q.validUntil).toLocaleDateString()}
                      </p>
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
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick actions footer */}
      <div className="mt-8 rounded-xl bg-gray-900 p-6 text-white">
        <h3 className="text-lg font-semibold">Need Help?</h3>
        <p className="mt-1 text-gray-400">Our team is ready to assist with your lighting projects</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/tools/rfq" className="btn-primary btn-sm">
            Request Quote
          </Link>
          <Link href="/tools/bom-upload" className="btn bg-white/10 hover:bg-white/20 btn-sm text-white">
            Upload BOM
          </Link>
          <Link href="/support" className="btn bg-white/10 hover:bg-white/20 btn-sm text-white">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}
