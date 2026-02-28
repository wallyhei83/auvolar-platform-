'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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
import { Loader2, PlusCircle, Upload, FileText, Trash2, Search, Package, ExternalLink, Image as ImageIcon } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

interface BCProduct {
  id: number
  name: string
  sku: string
  slug: string
  price: number
  images: { url: string; thumbnail: string; isPrimary: boolean }[]
  categories: number[]
}

interface ProductDoc {
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
}

export default function AdminProductsPage() {
  // BC Products
  const [bcProducts, setBcProducts] = useState<BCProduct[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<BCProduct | null>(null)

  // Documents for selected product
  const [documents, setDocuments] = useState<ProductDoc[]>([])
  const [loadingDocs, setLoadingDocs] = useState(false)

  // Upload
  const [uploading, setUploading] = useState(false)
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadDocType, setUploadDocType] = useState('SPEC_SHEET')
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

  // Delete
  const [selectedDoc, setSelectedDoc] = useState<ProductDoc | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const { toast } = useToast()

  // Fetch all BC products on mount
  useEffect(() => {
    fetchBCProducts()
  }, [])

  // Fetch docs when product selected
  useEffect(() => {
    if (selectedProduct) {
      fetchDocuments(selectedProduct.id.toString())
    }
  }, [selectedProduct])

  const fetchBCProducts = async () => {
    setLoadingProducts(true)
    try {
      const res = await fetch('/api/bigcommerce/products?limit=250')
      const data = await res.json()
      setBcProducts(data.products || [])
    } catch (error) {
      console.error('Failed to fetch BC products:', error)
      toast({ title: '加载失败', description: '无法从BigCommerce加载产品列表', variant: 'destructive' })
    } finally {
      setLoadingProducts(false)
    }
  }

  const fetchDocuments = async (productId: string) => {
    setLoadingDocs(true)
    try {
      const res = await fetch(`/api/documents?productId=${productId}`)
      const data = await res.json()
      setDocuments(res.ok ? (data.documents || []) : [])
    } catch {
      setDocuments([])
    } finally {
      setLoadingDocs(false)
    }
  }

  const handleUpload = async () => {
    if (!uploadFile || !selectedProduct) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', uploadFile)
      formData.append('bcProductId', selectedProduct.id.toString())
      formData.append('sku', selectedProduct.sku)
      formData.append('docType', uploadDocType)
      formData.append('title', uploadFile.name)

      const res = await fetch('/api/documents', { method: 'POST', body: formData })
      if (res.ok) {
        toast({ title: '上传成功', description: `${uploadFile.name} 已上传` })
        setIsUploadDialogOpen(false)
        setUploadFile(null)
        fetchDocuments(selectedProduct.id.toString())
      } else {
        const data = await res.json()
        toast({ title: '上传失败', description: data.message || '上传出错', variant: 'destructive' })
      }
    } catch (error) {
      toast({ title: '错误', description: '上传时发生网络错误', variant: 'destructive' })
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedDoc) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/documents/${selectedDoc.id}`, { method: 'DELETE' })
      if (res.ok) {
        toast({ title: '删除成功', description: '附件已删除' })
        setIsDeleteDialogOpen(false)
        setSelectedDoc(null)
        if (selectedProduct) fetchDocuments(selectedProduct.id.toString())
      } else {
        toast({ title: '删除失败', description: '无法删除附件', variant: 'destructive' })
      }
    } catch {
      toast({ title: '错误', description: '删除时发生网络错误', variant: 'destructive' })
    } finally {
      setDeleting(false)
    }
  }

  // Filter products by search
  const filteredProducts = bcProducts.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toString().includes(searchTerm)
  )

  const docTypeLabels: Record<string, string> = {
    SPEC_SHEET: '规格表',
    IES_FILE: 'IES 文件',
    INSTALL_GUIDE: '安装指南',
    WARRANTY: '质保文件',
    BROCHURE: '产品手册',
    CERTIFICATE: '认证文件',
    OTHER: '其他',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">产品附件管理</h1>
          <p className="text-gray-600 mt-1">
            从BigCommerce同步的产品列表 · 选择产品管理其附件（规格表、IES、安装指南等）
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Product List from BC */}
        <div className="lg:col-span-1 border rounded-lg bg-white overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <Package className="h-5 w-5 text-brand" />
              <h2 className="font-semibold">BigCommerce 产品</h2>
              <span className="text-xs bg-brand/10 text-brand px-2 py-0.5 rounded-full">{bcProducts.length}</span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索产品名称、SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="overflow-y-auto max-h-[700px]">
            {loadingProducts ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-6 w-6 animate-spin text-brand" />
                <span className="ml-2 text-gray-500">从BC加载产品...</span>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <Package className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                <p>没有找到匹配的产品</p>
              </div>
            ) : (
              filteredProducts.map(product => {
                const primaryImg = product.images?.find(i => i.isPrimary)?.thumbnail || product.images?.[0]?.thumbnail
                const isSelected = selectedProduct?.id === product.id

                return (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className={`w-full text-left px-4 py-3 border-b hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                      isSelected ? 'bg-brand/5 border-l-4 border-l-brand' : ''
                    }`}
                  >
                    {primaryImg ? (
                      <img src={primaryImg} alt="" className="w-12 h-12 object-contain rounded bg-gray-100 flex-shrink-0" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                        <ImageIcon className="h-5 w-5 text-gray-300" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm text-gray-900 truncate">{product.name}</p>
                      <p className="text-xs text-gray-500">SKU: {product.sku} · ID: {product.id}</p>
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* Right: Product Details + Documents */}
        <div className="lg:col-span-2">
          {!selectedProduct ? (
            <div className="border rounded-lg bg-white flex items-center justify-center min-h-[500px]">
              <div className="text-center text-gray-500">
                <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">选择左侧的产品</p>
                <p className="text-sm mt-1">查看和管理该产品的附件文档</p>
              </div>
            </div>
          ) : (
            <div className="border rounded-lg bg-white overflow-hidden">
              {/* Product Header */}
              <div className="p-6 border-b bg-gray-50">
                <div className="flex items-start gap-4">
                  {selectedProduct.images?.[0]?.url ? (
                    <img
                      src={selectedProduct.images.find(i => i.isPrimary)?.url || selectedProduct.images[0].url}
                      alt={selectedProduct.name}
                      className="w-20 h-20 object-contain rounded-lg bg-white border"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-gray-300" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900">{selectedProduct.name}</h2>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span>SKU: <span className="font-mono">{selectedProduct.sku}</span></span>
                      <span>ID: {selectedProduct.id}</span>
                      <span>${selectedProduct.price.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <a
                        href={`https://store-${process.env.NEXT_PUBLIC_BC_STORE_HASH || 'hhcdvxqxzq'}.mybigcommerce.com/manage/products/${selectedProduct.id}/edit`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" /> 在BC后台编辑
                      </a>
                      <a
                        href={`/p/${selectedProduct.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" /> 查看前端页面
                      </a>
                    </div>
                  </div>
                  <Button onClick={() => setIsUploadDialogOpen(true)}>
                    <Upload className="mr-2 h-4 w-4" /> 上传附件
                  </Button>
                </div>
              </div>

              {/* Documents List */}
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  附件文档
                  {documents.length > 0 && (
                    <span className="ml-2 text-sm font-normal text-gray-500">({documents.length} 个文件)</span>
                  )}
                </h3>

                {loadingDocs ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-6 w-6 animate-spin text-brand" />
                    <span className="ml-2 text-gray-500">加载附件...</span>
                  </div>
                ) : documents.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-gray-500">该产品还没有附件</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => setIsUploadDialogOpen(true)}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" /> 上传第一个附件
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {documents.map(doc => (
                      <div key={doc.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href={doc.url} target="_blank" rel="noopener noreferrer" className="font-medium text-sm text-blue-600 hover:underline truncate block">
                            {doc.title}
                          </a>
                          <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                            <span className="bg-gray-100 px-2 py-0.5 rounded">{docTypeLabels[doc.docType] || doc.docType}</span>
                            {doc.fileSize && <span>{(doc.fileSize / 1024 / 1024).toFixed(1)} MB</span>}
                            <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => { setSelectedDoc(doc); setIsDeleteDialogOpen(true) }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>上传产品附件</DialogTitle>
            <DialogDescription>
              为 <strong>{selectedProduct?.name}</strong> (SKU: {selectedProduct?.sku}) 上传附件
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">文件类型</label>
              <select
                value={uploadDocType}
                onChange={(e) => setUploadDocType(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                {Object.entries(docTypeLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">选择文件</label>
              <input
                type="file"
                onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                className="w-full text-sm"
                accept=".pdf,.ies,.doc,.docx,.xls,.xlsx,.jpg,.png,.dwg,.step,.stp"
              />
              <p className="text-xs text-gray-500 mt-1">支持 PDF, IES, DOC, XLS, JPG, PNG, DWG, STEP 等格式</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>取消</Button>
            <Button onClick={handleUpload} disabled={!uploadFile || uploading}>
              {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
              {uploading ? '上传中...' : '上传'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
            <DialogDescription>
              确定要删除 "{selectedDoc?.title}" 吗？此操作不可撤销。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>取消</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
              {deleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {deleting ? '删除中...' : '确认删除'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
