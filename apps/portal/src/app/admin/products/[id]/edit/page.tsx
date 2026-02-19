'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { Loader2, Save } from 'lucide-react'
import { DocType } from '@prisma/client'

interface ProductDocAsset {
  id: string
  bcProductId: string
  sku: string
  docType: DocType
  title: string
  url: string
  version?: string
  fileSize?: number
  mimeType?: string
  createdAt: string
  updatedAt: string
}

export default function AdminEditProductAttachmentPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const [doc, setDoc] = useState<ProductDocAsset | null>(null)
  const [bcProductId, setBcProductId] = useState('')
  const [sku, setSku] = useState('')
  const [title, setTitle] = useState('')
  const [docType, setDocType] = useState<DocType>(DocType.OTHER)
  const [version, setVersion] = useState('')
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (id) {
      fetchDocumentDetails(id)
    }
  }, [id])

  const fetchDocumentDetails = async (docId: string) => {
    setLoading(true)
    try {
      // 假设 /api/documents/[id] 是你的后端API，用于获取单个附件详情
      const response = await fetch(`/api/documents/${docId}`)
      const data = await await response.json()
      if (response.ok) {
        setDoc(data)
        setBcProductId(data.bcProductId)
        setSku(data.sku)
        setTitle(data.title)
        setDocType(data.docType)
        setVersion(data.version || '')
      } else {
        toast({
          title: '加载失败',
          description: data.message || '无法加载附件详情。',
          variant: 'destructive',
        })
        router.push('/admin/products') // 加载失败则返回列表
      }
    } catch (error) {
      console.error('Fetch document details error:', error)
      toast({
        title: '错误',
        description: '加载附件详情时发生网络错误。',
        variant: 'destructive',
      })
      router.push('/admin/products')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // 假设 /api/documents/[id] 是你的后端API，用于更新附件信息
      const response = await fetch(`/api/documents/${id}`, {
        method: 'PUT', // 或 PATCH
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bcProductId,
          sku,
          title,
          docType,
          version,
          // 文件本身不能通过这个API修改，如果需要修改文件，需要单独上传
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: '更新成功',
          description: '产品附件信息已更新。',
          variant: 'success',
        })
        router.push('/admin/products') // 更新成功后跳转到附件列表
      } else {
        throw new Error(data.message || '更新附件信息失败。')
      }
    } catch (error: any) {
      console.error('Update document error:', error)
toast({
        title: '更新失败',
        description: error.message || '发生未知错误，请稍后重试。',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const docTypeOptions = Object.values(DocType).map(type => ({
    value: type,
    label: type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, s => s.toUpperCase())
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-lg text-gray-600">正在加载附件详情...</span>
      </div>
    )
  }

  if (!doc && !loading) {
    return (
      <div className="text-center text-gray-500 py-10">
        <h2 className="text-xl font-bold">附件未找到</h2>
        <p className="mt-2">产品附件 ID: {id} 不存在。</p>
        <Link href="/admin/products" className="text-blue-600 hover:underline mt-4 inline-block">
          返回附件列表 →
        </Link>
      </div>
    )
  }
return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">编辑产品附件</h1>
        <Link href="/admin/products">
          <Button variant="outline">返回附件列表</Button>
        </Link>
      </div>

      <p className="text-gray-600">编辑产品附件 `{doc?.title}` 的详细信息。</p>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>附件信息</CardTitle>
          <CardDescription>修改附件的标题、类型、版本等。</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="id">附件 ID</Label>
              <Input id="id" type="text" value={id} disabled className="bg-gray-100" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bcProductId">BigCommerce 产品ID</Label>
              <Input
                id="bcProductId"
                type="text"
                placeholder="例如: 12345"
                required
                value={bcProductId}
                onChange={(e) => setBcProductId(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                type="text"
                placeholder="例如: AV-HB150W-50K"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">附件标题</Label>
              <Input
                id="title"
                type="text"
                placeholder="例如: AV-HB150W-50K 规格表"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="docType">附件类型</Label>
              <Select value={docType} onValueChange={(value: DocType) => setDocType(value)}>
                <SelectTrigger id="docType">
                  <SelectValue placeholder="选择附件类型" />
                </SelectTrigger>
                <SelectContent>
                  {docTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="version">版本 (可选)</Label>
              <Input
                id="version"
                type="text"
                placeholder="例如: 1.0.0"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="url">文件URL (只读)</Label>
              <Input id="url" type="text" value={doc?.url || ''} disabled className="bg-gray-100" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fileSize">文件大小 (MB, 只读)</Label>
              <Input id="fileSize" type="text" value={doc?.fileSize ? `${(doc.fileSize / 1024 / 1024).toFixed(2)} MB` : '-'} disabled className="bg-gray-100" />
            </div>
            <Button type="submit" className="w-full" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>保存中...</span>
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  <span>保存更改</span>
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
