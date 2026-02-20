'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Bot, Send, Loader2 } from 'lucide-react'

export default function AdminAIPage() {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!prompt.trim()) return
    setLoading(true)
    setResponse('')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt }),
      })
      const data = await res.json()
      setResponse(data.reply || data.message || 'No response')
    } catch {
      setResponse('Error: Failed to connect to AI service')
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Console</h1>
        <p className="text-gray-600">Test and interact with the AI assistant</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Bot className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">GPT-4</p>
            <p className="text-sm text-gray-500">Model</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">Active</p>
            <p className="text-sm text-gray-500">Status</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">Product Q&A</p>
            <p className="text-sm text-gray-500">Use Case</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Test Prompt</CardTitle>
          <CardDescription>Send a message to test the AI assistant</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Ask about products, pricing, specifications..."
            rows={3}
          />
          <Button onClick={handleSend} disabled={loading || !prompt.trim()}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
            Send
          </Button>

          {response && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-500 mb-2">AI Response:</p>
              <p className="text-sm text-gray-900 whitespace-pre-wrap">{response}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
