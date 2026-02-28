'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { FileCheck, Upload, Loader2 } from 'lucide-react'

export default function PortalTaxExemptPage() {
  const { toast } = useToast()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tax Exempt Status</h1>
        <p className="text-gray-600">Upload and manage your tax exemption certificates</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5" /> Upload Certificate
          </CardTitle>
          <CardDescription>Submit your tax exemption certificate for review</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>State</Label>
              <Input placeholder="e.g. California" />
            </div>
            <div>
              <Label>Certificate Number</Label>
              <Input placeholder="e.g. 12345-678" />
            </div>
          </div>
          <div>
            <Label>Expiration Date</Label>
            <Input type="date" />
          </div>
          <div>
            <Label>Upload Certificate (PDF)</Label>
            <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
              <p className="text-xs text-gray-400 mt-1">PDF, max 10MB</p>
              <Input type="file" accept=".pdf" className="mt-4" />
            </div>
          </div>
          <Button onClick={() => toast({ title: 'Tax exempt upload coming soon' })}>
            <Upload className="mr-2 h-4 w-4" /> Submit Certificate
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Certificates</CardTitle>
          <CardDescription>Previously submitted tax exemption documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <FileCheck className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No certificates submitted yet</p>
            <p className="text-sm mt-1">Upload your tax exemption certificate above to get started</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
