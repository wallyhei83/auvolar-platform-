'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea' // 假设你有一个Textarea组件
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select' // 假设你有一个Select组件
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { Loader2, UploadCloud } from 'lucide-react'
import { DocType } from '@prisma/client' // 导入DocType枚举

export default function AdminUploadProductAttachmentPage() {
  const [bcProductId, setBcProductId] = useState('')
  const [sku, setSku] = useState('')
  const [title, setTitle] = useState('')
  const [docType, setDocType] = useState<DocType>(DocType.OTHER)
  const [version, setVersion] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const router = useRouter()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      toast({
        title: '文件缺失',
        description: '请选择一个文件上传。',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    setUploadProgress(0)

    try {
      // Step 1: 获取预签名URL (假设 /api/upload/init 是你的后端API)
      const initResponse = await fetch('/api/upload/init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
          fileSize: file.size,
          // 可以根据需要添加更多文件元数据
        }),
      })

      if (!initResponse.ok) {
        const errorData = await initResponse.json();
        throw new Error(errorData.message || '获取上传URL失败。');
      }
      const { url: uploadUrl, assetUrl } = await initResponse.json();

      // Step 2: 上传文件到预签名URL
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT', // 通常预签名URL使用PUT方法上传文件
        headers: {
          'Content-Type': file.type || 'application/octet-stream',
          'x-ms-blob-type': 'BlockBlob', // For Azure Blob Storage, adjust for other services
        },
        body: file,
        // 如果需要显示上传进度，可以尝试使用XMLHttpRequest或fetch的ReadableStream
        // 但fetch API直接显示进度比较复杂，这里简化处理
      });

      if (!uploadResponse.ok) {
        throw new Error('文件上传到存储服务失败。');
      }

      // Step 3: 将附件信息保存到数据库 (假设 /api/documents 是你的后端API)
      const saveResponse = await fetch('/api/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bcProductId,
          sku,
          title,
          docType,
          version,
          url: assetUrl, // 使用从后端获取的最终文件URL
          fileSize: file.size,
          mimeType: file.type,
          // uploadedBy: session.user.id, // 如果有用户信息，可以添加
        }),
      });

      const data = await saveResponse.json();

      if (saveResponse.ok) {
        toast({
          title: '上传成功',
          description: '产品附件已成功上传并关联。',
          variant: 'default',
        });
router.push('/admin/products'); // 上传成功后跳转到附件列表
      } else {
        throw new Error(data.message || '保存附件信息到数据库失败。');
      }

    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: '上传失败',
        description: error.message || '发生未知错误，请稍后重试。',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const docTypeOptions = Object.values(DocType).map(type => ({
    value: type,
    label: type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, s => s.toUpperCase()) // 格式化为可读性更好的字符串
  }));
return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">上传新产品附件</h1>
        <Link href="/admin/products">
          <Button variant="outline">返回附件列表</Button>
        </Link>
      </div>

      <p className="text-gray-600">上传新的产品规格表、安装指南、IES 文件等，并关联到具体的产品。</p>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>附件详情</CardTitle>
          <CardDescription>填写附件信息并选择要上传的文件。</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
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
              <Label htmlFor="file">文件</Label>
              <Input
                id="file"
                type="file"
                required
                ref={fileInputRef}
                onChange={handleFileChange}
                className="file:text-blue-600 file:bg-blue-50 file:border-none file:hover:bg-blue-100"
              />
              {file && <p className="text-sm text-gray-500">已选择文件: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</p>}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>上传中... ({uploadProgress}%)</span>
                </>
              ) : (
                <>
                  <UploadCloud className="mr-2 h-4 w-4" />
                  <span>上传附件</span>
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
