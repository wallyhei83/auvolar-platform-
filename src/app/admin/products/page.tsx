'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Upload, FileText, Trash2, Search, Package, ExternalLink, Image as ImageIcon, CheckCircle2, X } from 'lucide-react'
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

const DOC_TYPES = [
  { value: 'SPEC_SHEET', label: '规格表 Spec Sheet', accept: '.pdf,.doc,.docx', icon: '📋' },
  { value: 'IES_FILE', label: 'IES 文件', accept: '.ies', icon: '💡' },
  { value: 'INSTALL_GUIDE', label: '安装指南 Install Guide', accept: '.pdf,.doc,.docx', icon: '🔧' },
  { value: 'WARRANTY', label: '质保文件 Warranty', accept: '.pdf', icon: '🛡️' },
  { value: 'BROCHURE', label: '产品手册 Brochure', accept: '.pdf', icon: '📖' },
  { value: 'CERTIFICATE', label: '认证文件 Certificate', accept: '.pdf,.jpg,.png', icon: '✅' },
  { value: 'CAD_FILE', label: 'CAD/3D 文件', accept: '.dwg,.step,.stp,.iges,.sat', icon: '📐' },
  { value: 'OTHER', label: '其他文件', accept: '*', icon: '📎' },
]

export default function AdminProductsPage() {
  const [bcProducts, setBcProducts] = useState<BCProduct[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<BCProduct | null>(null)
  const [documents, setDocuments] = useState<ProductDoc[]>([])
  const [loadingDocs, setLoadingDocs] = useState(false)
  const [uploadingType, setUploadingType] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => { fetchBCProducts() }, [])
  useEffect(() => { if (selectedProduct) fetchDocuments(selectedProduct.id.toString()) }, [selectedProduct])

  const fetchBCProducts = async () => {
    setLoadingProducts(true)
    try {
      const res = await fetch('/api/bigcommerce/products?limit=250')
      const data = await res.json()
      setBcProducts(data.products || [])
    } catch {
      toast({ title: '加载失败', description: '无法从BigCommerce加载产品列表', variant: 'destructive' })
    } finally { setLoadingProducts(false) }
  }

  const fetchDocuments = async (productId: string) => {
    setLoadingDocs(true)
    try {
      const res = await fetch(`/api/documents?productId=${productId}`)
      const data = await res.json()
      setDocuments(res.ok ? (data.documents || []) : [])
    } catch { setDocuments([]) }
    finally { setLoadingDocs(false) }
  }

  const handleUpload = async (files: FileList, docType: string) => {
    if (!files.length || !selectedProduct) return
    setUploadingType(docType)
    let successCount = 0
    let failCount = 0

    for (const file of Array.from(files)) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('bcProductId', selectedProduct.id.toString())
        formData.append('sku', selectedProduct.sku)
        formData.append('docType', docType)
        formData.append('title', file.name)
        const res = await fetch('/api/documents', { method: 'POST', body: formData })
        if (res.ok) successCount++
        else failCount++
      } catch { failCount++ }
    }

    if (successCount > 0) {
      toast({ title: '上传成功', description: `${successCount} 个文件已上传${failCount > 0 ? `，${failCount} 个失败` : ''}` })
      fetchDocuments(selectedProduct.id.toString())
    } else {
      toast({ title: '上传失败', description: '所有文件上传失败', variant: 'destructive' })
    }
    setUploadingType(null)
  }

  const handleDelete = async (docId: string) => {
    setDeleting(docId)
    try {
      const res = await fetch(`/api/documents/${docId}`, { method: 'DELETE' })
      if (res.ok) {
        toast({ title: '已删除' })
        if (selectedProduct) fetchDocuments(selectedProduct.id.toString())
      } else {
        toast({ title: '删除失败', variant: 'destructive' })
      }
    } catch {
      toast({ title: '网络错误', variant: 'destructive' })
    } finally { setDeleting(null) }
  }

  const filteredProducts = bcProducts.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toString().includes(searchTerm)
  )

  // Group documents by type
  const docsByType: Record<string, ProductDoc[]> = {}
  documents.forEach(d => {
    if (!docsByType[d.docType]) docsByType[d.docType] = []
    docsByType[d.docType].push(d)
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">产品附件管理</h1>
        <p className="text-gray-600 mt-1">从BigCommerce同步的产品列表 · 选择产品后在右侧按类型上传附件</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Product List */}
        <div className="lg:col-span-1 border rounded-lg bg-white overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <Package className="h-5 w-5 text-brand" />
              <h2 className="font-semibold">BigCommerce 产品</h2>
              <span className="text-xs bg-brand/10 text-brand px-2 py-0.5 rounded-full">{bcProducts.length}</span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="搜索产品名称、SKU..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
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
                    className={`w-full text-left px-4 py-3 border-b hover:bg-gray-50 transition-colors flex items-center gap-3 ${isSelected ? 'bg-brand/5 border-l-4 border-l-brand' : ''}`}
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

        {/* Right: Upload Sections by Doc Type */}
        <div className="lg:col-span-2">
          {!selectedProduct ? (
            <div className="border rounded-lg bg-white flex items-center justify-center min-h-[500px]">
              <div className="text-center text-gray-500">
                <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">← 选择左侧的产品</p>
                <p className="text-sm mt-1">然后在这里按类型上传附件</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Product Header */}
              <div className="border rounded-lg bg-white p-5">
                <div className="flex items-start gap-4">
                  {selectedProduct.images?.[0]?.url ? (
                    <img
                      src={selectedProduct.images.find(i => i.isPrimary)?.url || selectedProduct.images[0].url}
                      alt={selectedProduct.name}
                      className="w-20 h-20 object-contain rounded-lg bg-gray-50 border"
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
                    <div className="flex items-center gap-3 mt-2">
                      <a href={`https://store-hhcdvxqxzq.mybigcommerce.com/manage/products/${selectedProduct.id}/edit`} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" /> BC后台
                      </a>
                      <a href={`/p/${selectedProduct.slug}`} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" /> 前端页面
                      </a>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    共 {documents.length} 个附件
                  </div>
                </div>
              </div>

              {/* Upload sections per doc type */}
              {loadingDocs ? (
                <div className="border rounded-lg bg-white flex items-center justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-brand" />
                  <span className="ml-2 text-gray-500">加载附件...</span>
                </div>
              ) : (
                DOC_TYPES.map(dt => {
                  const typeDocs = docsByType[dt.value] || []
                  const isUploading = uploadingType === dt.value
                  return (
                    <div key={dt.value} className="border rounded-lg bg-white overflow-hidden">
                      <div className="px-5 py-3 bg-gray-50 border-b flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{dt.icon}</span>
                          <h3 className="font-semibold text-sm text-gray-900">{dt.label}</h3>
                          {typeDocs.length > 0 && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{typeDocs.length}</span>
                          )}
                        </div>
                        <UploadButton
                          accept={dt.accept}
                          multiple
                          loading={isUploading}
                          onFiles={(files) => handleUpload(files, dt.value)}
                        />
                      </div>

                      {typeDocs.length > 0 && (
                        <div className="divide-y">
                          {typeDocs.map(doc => (
                            <div key={doc.id} className="px-5 py-2.5 flex items-center gap-3 hover:bg-gray-50">
                              <FileText className="h-4 w-4 text-gray-400 flex-shrink-0" />
                              <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline truncate flex-1">
                                {doc.title}
                              </a>
                              {doc.fileSize && <span className="text-xs text-gray-400">{(doc.fileSize / 1024 / 1024).toFixed(1)}MB</span>}
                              <span className="text-xs text-gray-400">{new Date(doc.createdAt).toLocaleDateString()}</span>
                              <button
                                onClick={() => handleDelete(doc.id)}
                                disabled={deleting === doc.id}
                                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                              >
                                {deleting === doc.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Inline upload button component
function UploadButton({ accept, multiple, loading, onFiles }: {
  accept: string
  multiple?: boolean
  loading?: boolean
  onFiles: (files: FileList) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) {
            onFiles(e.target.files)
            e.target.value = '' // reset for re-upload
          }
        }}
      />
      <Button
        size="sm"
        variant="outline"
        disabled={loading}
        onClick={() => inputRef.current?.click()}
        className="text-xs h-7"
      >
        {loading ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <Upload className="h-3 w-3 mr-1" />}
        {loading ? '上传中...' : '选择文件'}
      </Button>
    </>
  )
}
