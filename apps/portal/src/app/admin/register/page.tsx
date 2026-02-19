'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

export default function AdminRegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, companyName, phone }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: '注册成功',
          description: '管理员账户已创建，请登录。',
          variant: 'success',
        })
        router.push('/admin/login') // 注册成功后跳转到管理员登录页面
      } else {
        toast({
          title: '注册失败',
          description: data.message || '请检查您的信息。',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Registration error:', error)
      toast({
        title: '注册错误',
        description: '发生未知错误，请稍后重试。',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }
return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">管理员注册</CardTitle>
          <CardDescription>创建一个新的管理员账户来管理 Auvolar 后台。</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">姓名</Label>
              <Input
                id="name"
                type="text"
                placeholder="您的姓名"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="companyName">公司名称</Label>
              <Input
                id="companyName"
                type="text"
                placeholder="您的公司名称"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">电话号码</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="您的电话号码"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                placeholder="输入至少8位密码"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? '注册中...' : '创建管理员账户'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500">
          已有账户？
          <Link href="/admin/login" className="ml-1 font-semibold hover:text-blue-600">
            去登录
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
