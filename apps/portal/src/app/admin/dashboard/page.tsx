import { Metadata } from 'next'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Dashboard | Admin | Auvolar',
  description: 'Overview of Auvolar B2B platform administration.',
}

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name || session?.user?.email || 'Admin';

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">欢迎回来，{userName}！</h1>
      <p className="text-gray-600">这是您的 Auvolar 管理后台仪表盘。</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>产品附件管理</CardTitle>
          </CardHeader>
          <CardContent>
            <p>管理所有产品相关的规格表、IES 文件、安装指南等。</p>
            <Link href="/admin/products" className="text-blue-600 hover:underline mt-2 inline-block">
              去管理附件 →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>用户和权限</CardTitle>
          </CardHeader>
          <CardContent>
            <p>查看和管理后台用户及其角色。</p>
            <Link href="/admin/users" className="text-blue-600 hover:underline mt-2 inline-block">
              管理用户 →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>最新活动</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>- 1小时前：新管理员 Jacky 注册</li>
              <li>- 3小时前：产品 ID 1234 添加了安装指南</li>
              <li>- 昨天：更新了 Next.js 配置</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <p className="text-gray-500 text-sm mt-8">
        此仪表盘提供后台功能概览。更多详细功能请访问侧边栏导航。
      </p>
    </div>
  )
}
