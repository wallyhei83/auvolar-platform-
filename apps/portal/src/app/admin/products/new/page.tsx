'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { Loader2, UploadCloud, X, FileText, CheckCircle2 } from 'lucide-react'

type DocType = 'CUT_SHEET' | 'IES' | 'INSTALL_GUIDE' | 'DIMENSIONS' | 'DLC_CERT' | 'WARRANTY' | 'OTHER'

interface FileEntry {
  file: File
  docType: DocType
  title: string
  status: 'pending' | 'uploading' | 'done' | 'error'
}

// Auto-detect doc type from filename
function detectDocType(filename: string): DocType {
  const name = filename.toLowerCase()
  if (name.includes('spec') || name.includes('cut') || name.includes('datasheet') || name.includes('data-sheet')) return 'CUT_SHEET'
  if (name.includes('.ies') || name.includes('ies') || name.includes('photometric')) return 'IES'
  if (name.includes('install') || name.includes('guide') || name.includes('instruction') || name.includes('manual')) return 'INSTALL_GUIDE'
  if (name.includes('dimension') || name.includes('drawing') || name.includes('dim')) return 'DIMENSIONS'
  if (name.includes('dlc') || name.includes('cert') || name.includes('certificate')) return 'DLC_CERT'
  if (name.includes('warranty') || name.includes('warr')) return 'WARRANTY'
  return 'OTHER'
}

function docTypeLabel(type: DocType): string {
  const labels: Record<DocType, string> = {
    CUT_SHEET: 'Spec/Cut Sheet',
    IES: 'IES File',
    INSTALL_GUIDE: 'Installation Guide',
    DIMENSIONS: 'Dimensions',
    DLC_CERT: 'DLC Certificate',
    WARRANTY: 'Warranty',
    OTHER: 'Other',
  }
  return labels[type]
}

export default function AdminUploadProductDocsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [bcProductId, setBcProductId] = useState('')
  const [sku, setSku] = useState('')
  const [files, setFiles] = useState<FileEntry[]>([])
  const [uploading, setUploading] = useState(false)

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const newFiles: FileEntry[] = Array.from(e.target.files).map(file => ({
      file,
      docType: detectDocType(file.name),
      title: file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
      status: 'pending',
    }))
    setFiles(prev => [...prev, ...newFiles])
    // Reset input so same files can be selected again
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const updateFileType = (index: number, docType: DocType) => {
    setFiles(prev => prev.map((f, i) => i === index ? { ...f, docType } : f))
  }

  const updateFileTitle = (index: number, title: string) => {
    setFiles(prev => prev.map((f, i) => i === index ? { ...f, title } : f))
  }

  const handleUploadAll = async () => {
    if (!bcProductId || !sku) {
      toast({ title: 'Please enter Product ID and SKU', variant: 'destructive' })
      return
    }
    if (files.length === 0) {
      toast({ title: 'Please add files', variant: 'destructive' })
      return
    }

    setUploading(true)

    for (let i = 0; i < files.length; i++) {
      setFiles(prev => prev.map((f, idx) => idx === i ? { ...f, status: 'uploading' } : f))

      try {
        const formData = new FormData()
        formData.append('file', files[i].file)
        formData.append('bcProductId', bcProductId)
        formData.append('sku', sku)
        formData.append('title', files[i].title)
        formData.append('docType', files[i].docType)

        const res = await fetch('/api/documents/upload', {
          method: 'POST',
          body: formData,
        })

        if (res.ok) {
          setFiles(prev => prev.map((f, idx) => idx === i ? { ...f, status: 'done' } : f))
        } else {
          setFiles(prev => prev.map((f, idx) => idx === i ? { ...f, status: 'error' } : f))
        }
      } catch {
        setFiles(prev => prev.map((f, idx) => idx === i ? { ...f, status: 'error' } : f))
      }
    }

    setUploading(false)
    const successCount = files.filter(f => f.status === 'done').length
    toast({ title: `Uploaded ${successCount}/${files.length} files` })

    if (successCount === files.length) {
      setTimeout(() => router.push('/admin/products'), 1500)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Upload Product Documents</h1>
          <p className="text-gray-600">Upload multiple files — auto-classified by filename</p>
        </div>
        <Link href="/admin/products">
          <Button variant="outline">Back to List</Button>
        </Link>
      </div>

      {/* Product Info */}
      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
          <CardDescription>All files below will be linked to this product</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label>BigCommerce Product ID *</Label>
            <Input value={bcProductId} onChange={e => setBcProductId(e.target.value)} placeholder="e.g. 12345" />
          </div>
          <div>
            <Label>SKU *</Label>
            <Input value={sku} onChange={e => setSku(e.target.value)} placeholder="e.g. AV-HB150W-50K" />
          </div>
        </CardContent>
      </Card>

      {/* File Drop Zone */}
      <Card>
        <CardHeader>
          <CardTitle>Files</CardTitle>
          <CardDescription>Drag & drop or click to add files. Type is auto-detected from filename.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadCloud className="h-10 w-10 mx-auto text-gray-400 mb-3" />
            <p className="text-sm font-medium text-gray-700">Click to select files or drag & drop</p>
            <p className="text-xs text-gray-400 mt-1">PDF, IES, images — multiple files allowed</p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFilesSelected}
              accept=".pdf,.ies,.jpg,.jpeg,.png,.doc,.docx"
            />
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-3">
              {files.map((entry, index) => (
                <div key={index} className={`flex items-center gap-3 p-3 rounded-lg border ${
                  entry.status === 'done' ? 'bg-green-50 border-green-200' :
                  entry.status === 'error' ? 'bg-red-50 border-red-200' :
                  entry.status === 'uploading' ? 'bg-blue-50 border-blue-200' :
                  'bg-white border-gray-200'
                }`}>
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    {entry.status === 'done' ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : entry.status === 'uploading' ? (
                      <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                    ) : (
                      <FileText className="h-5 w-5 text-gray-400" />
                    )}
                  </div>

                  {/* File name */}
                  <div className="flex-1 min-w-0">
                    <Input
                      value={entry.title}
                      onChange={e => updateFileTitle(index, e.target.value)}
                      className="text-sm h-8"
                      disabled={entry.status !== 'pending'}
                    />
                    <p className="text-xs text-gray-400 mt-1 truncate">{entry.file.name} ({(entry.file.size / 1024 / 1024).toFixed(2)} MB)</p>
                  </div>

                  {/* Type selector */}
                  <div className="flex-shrink-0 w-44">
                    <Select
                      value={entry.docType}
                      onValueChange={(v: DocType) => updateFileType(index, v)}
                      disabled={entry.status !== 'pending'}
                    >
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CUT_SHEET">Spec/Cut Sheet</SelectItem>
                        <SelectItem value="IES">IES File</SelectItem>
                        <SelectItem value="INSTALL_GUIDE">Installation Guide</SelectItem>
                        <SelectItem value="DIMENSIONS">Dimensions</SelectItem>
                        <SelectItem value="DLC_CERT">DLC Certificate</SelectItem>
                        <SelectItem value="WARRANTY">Warranty</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Remove */}
                  {entry.status === 'pending' && (
                    <Button variant="ghost" size="icon" onClick={() => removeFile(index)} className="flex-shrink-0">
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Upload Button */}
          {files.length > 0 && (
            <div className="flex items-center justify-between pt-4 border-t">
              <p className="text-sm text-gray-500">{files.length} file(s) ready</p>
              <Button onClick={handleUploadAll} disabled={uploading}>
                {uploading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...</>
                ) : (
                  <><UploadCloud className="mr-2 h-4 w-4" /> Upload All</>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Auto-classification hint */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Auto-Classification Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-gray-500">
            <div><span className="font-medium text-gray-700">Spec Sheet:</span> spec, cut, datasheet</div>
            <div><span className="font-medium text-gray-700">IES File:</span> .ies, photometric</div>
            <div><span className="font-medium text-gray-700">Install Guide:</span> install, guide, manual</div>
            <div><span className="font-medium text-gray-700">Warranty:</span> warranty, warr</div>
            <div><span className="font-medium text-gray-700">DLC Cert:</span> dlc, cert</div>
            <div><span className="font-medium text-gray-700">Dimensions:</span> dimension, drawing</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
