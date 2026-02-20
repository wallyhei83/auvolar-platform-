'use client'

import { useState, useEffect } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion' // 假设有Accordion组件
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator' // 假设有Separator组件
import { Download, FileText, ExternalLink, Loader2 } from 'lucide-react'
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

interface ProductDocumentManagerProps {
  bcProductId: string // BigCommerce 产品ID
  sku?: string // 产品SKU
}

export default function ProductDocumentManager({
  bcProductId,
  sku,
}: ProductDocumentManagerProps) {
  const [documents, setDocuments] = useState<ProductDocAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProductDocuments()
  }, [bcProductId, sku])

  const fetchProductDocuments = async () => {
    setLoading(true)
    setError(null)
    try {
      // 假设 /api/products/[bcProductId]/documents 是你的后端API
      // 用于获取特定产品的附件
      const response = await fetch(`/api/products/${bcProductId}/documents`)
      const data = await response.json()

      if (response.ok) {
        setDocuments(data.documents)
      } else {
        setError(data.message || '无法加载产品附件。')
      }
    } catch (err) {
      console.error('Fetch product documents error:', err)
      setError('加载产品附件时发生网络错误。')
    } finally {
      setLoading(false)
    }
  }

  const getDocTypeLabel = (type: DocType) => {
    return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
  };

  const categorizedDocuments = documents.reduce((acc, doc) => {
    const category = getDocTypeLabel(doc.docType);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(doc);
    return acc;
  }, {} as Record<string, ProductDocAsset[]>);


  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6 text-gray-500">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          正在加载产品附件...
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-red-600">
          <p>错误: {error}</p>
        </CardContent>
      </Card>
    )
  }

  if (documents.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-gray-500">
          <p>目前没有可用的产品附件。</p>
        </CardContent>
      </Card>
    )
  }
return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>产品附件与资源</CardTitle>
        <CardDescription>
          下载产品的规格表、安装指南、IES 文件和更多资源。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {Object.entries(categorizedDocuments).map(([category, docs]) => (
            <AccordionItem key={category} value={category}>
              <AccordionTrigger className="text-lg font-semibold">
                {category} ({docs.length})
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 mt-4">
                  {docs.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 border rounded-md bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-600" />
                        <div>
                          <p className="font-medium">{doc.title}</p>
                          <p className="text-sm text-gray-500">
                            版本: {doc.version || 'N/A'} | 大小: {doc.fileSize ? `${(doc.fileSize / 1024 / 1024).toFixed(2)} MB` : 'N/A'}
                          </p>
                        </div>
                      </div>
                      <Button asChild variant="ghost" size="icon">
                        <a href={doc.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">下载 {doc.title}</span>
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
