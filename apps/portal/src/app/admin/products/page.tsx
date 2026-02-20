'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Loader2, MoreHorizontal, PlusCircle } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
// date formatting handled inline

interface ProductDocAsset {
  id: string
  bcProductId: string
  sku: string
  docType: string
  title: string
  url: string
  version?: string
  fileSize?: number
  mimeType?: string
  createdAt: string
  updatedAt: string
}

export default function AdminProductAttachmentsPage() {
  const [documents, setDocuments] = useState<ProductDocAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDoc, setSelectedDoc] = useState<ProductDocAsset | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    setLoading(true)
    try {
      // 假设 /api/documents 是你的后端API，用于获取所有产品附件
      const response = await fetch('/api/documents') 
      const data = await response.json()
      if (response.ok) {
        setDocuments(data.documents)
      } else {
        toast({
          title: '加载失败',
          description: data.message || '无法加载产品附件。',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Fetch documents error:', error)
      toast({
        title: '错误',
        description: '加载产品附件时发生网络错误。',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (docId: string) => {
    setLoading(true) 
    try {
      // 假设 /api/documents/[id] 是你的后端API，用于删除单个附件
      const response = await fetch(`/api/documents/${docId}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        toast({
          title: '删除成功',
          description: '产品附件已删除。',
          variant: 'default',
        })
        fetchDocuments() // 重新加载列表
        setIsDeleteDialogOpen(false)
        setSelectedDoc(null)
      } else {
        const data = await response.json()
        toast({
          title: '删除失败',
          description: data.message || '无法删除产品附件。',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Delete document error:', error)
      toast({
        title: '错误',
        description: '删除产品附件时发生网络错误。',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.bcProductId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.docType.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading && documents.length === 0) {
return (
      <div className="flex items-center justify-center min-h-[500px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-lg text-gray-600">正在加载附件...</span>
      </div>
    )
  }
return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">产品附件管理</h1>
        <div className="flex items-center space-x-2">
          <Link href="/admin/products/new"> {/* 链接到新的上传页面 */}
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              上传新附件
            </Button>
          </Link>
        </div>
      </div>

      <p className="text-gray-600">管理所有产品的规格表、IES 文件、安装指南等数字资产。</p>

      <Input
        placeholder="搜索附件 (标题, SKU, 产品ID, 类型...)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />

      {filteredDocuments.length === 0 && !loading ? (
        <div className="text-center text-gray-500 py-10">
          <p>没有找到任何产品附件。</p>
          <Link href="/admin/products/new" className="text-blue-600 hover:underline mt-4 inline-block">
            点击这里上传第一个附件 →
          </Link>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>产品ID</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>标题</TableHead>
              <TableHead>类型</TableHead>
              <TableHead>版本</TableHead>
              <TableHead>文件大小</TableHead>
              <TableHead>上传日期</TableHead>
              <TableHead className="w-[100px] text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium">
                  <Link href={`https://www.bigcommerce.com/products/${doc.bcProductId}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">
                    {doc.bcProductId}
                  </Link>
                </TableCell>
                <TableCell>{doc.sku}</TableCell>
                <TableCell>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {doc.title}
                  </a>
                </TableCell>
                <TableCell>{doc.docType}</TableCell>
                <TableCell>{doc.version || '-'}</TableCell>
                <TableCell>{doc.fileSize ? `${(doc.fileSize / 1024 / 1024).toFixed(2)} MB` : '-'}</TableCell>
                <TableCell>{new Date(doc.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">打开菜单</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/products/${doc.id}/edit`}>
                          编辑
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedDoc(doc)
                          setIsDeleteDialogOpen(true)
                        }}
                        className="text-red-600"
                      >
                        删除
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* 删除确认对话框 */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除附件</DialogTitle>
            <DialogDescription>
              您确定要删除产品附件 "{selectedDoc?.title}" 吗？此操作不可撤销。
            </DialogDescription>
</DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              取消
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedDoc && handleDelete(selectedDoc.id)}
              disabled={loading}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {loading ? '删除中...' : '确认删除'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
