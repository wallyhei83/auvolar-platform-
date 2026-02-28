'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Paperclip, Mic, MicOff, Minimize2, Maximize2, User, Bot, Loader2, FileText } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  attachments?: { type: string; name: string }[]
}

export function ChatWidgetV2() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: "Hi! 👋 I'm Alex from Auvolar — your LED lighting expert. I know our entire product catalog and can help with:\n\n• **Product recommendations** for your space\n• **Technical specs** and comparisons\n• **Pricing** and volume discounts\n• **ROI calculations** for LED upgrades\n\nWhat are you working on?",
        timestamp: new Date(),
      }])
    }
  }, [isOpen])

  // Voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      chunksRef.current = []
      
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data) }
      recorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop())
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        // Transcribe using OpenAI Whisper via our API
        await transcribeAndSend(blob)
      }

      recorder.start()
      mediaRecorderRef.current = recorder
      setIsRecording(true)
      setRecordingTime(0)
      timerRef.current = setInterval(() => setRecordingTime(t => t + 1), 1000)
    } catch (err) {
      alert('Please allow microphone access to use voice input.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop()
    }
    setIsRecording(false)
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
  }

  const transcribeAndSend = async (audioBlob: Blob) => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('audio', audioBlob, 'voice.webm')

      const res = await fetch('/api/chat/transcribe', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        const { text } = await res.json()
        if (text?.trim()) {
          await sendMessage(text)
        } else {
          alert('Could not understand the audio. Please try again or type your message.')
        }
      } else {
        alert('Voice transcription failed. Please type your message instead.')
      }
    } catch {
      alert('Voice feature unavailable. Please type your message.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(prev => [...prev, ...Array.from(e.target.files!)])
    }
  }

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const sendMessage = async (overrideText?: string) => {
    const text = overrideText || input.trim()
    if (!text && selectedFiles.length === 0) return

    const attachments = selectedFiles.map(f => ({
      type: f.type.includes('image') ? 'image' : f.type.includes('pdf') ? 'pdf' : 'document',
      name: f.name,
    }))

    const userMessage: Message = {
      role: 'user',
      content: text || `[Sent ${selectedFiles.length} file(s)]`,
      timestamp: new Date(),
      attachments: attachments.length > 0 ? attachments : undefined,
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setSelectedFiles([])
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({
            role: m.role,
            content: m.content,
            attachments: m.attachments,
          })),
          sessionId,
        }),
      })

      const data = await res.json()
      
      setMessages([...updatedMessages, {
        role: 'assistant',
        content: data.reply || "Sorry, I couldn't process that. Please try again.",
        timestamp: new Date(),
      }])
      
      if (data.sessionId) setSessionId(data.sessionId)
    } catch {
      setMessages([...updatedMessages, {
        role: 'assistant',
        content: "I'm having trouble connecting. Please try again or email sales@auvolar.com.",
        timestamp: new Date(),
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#FFD60A] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6 text-black" />
      </button>
    )
  }

  return (
    <div className={`fixed z-50 ${isExpanded ? 'inset-4' : 'bottom-6 right-6 w-[400px] h-[600px]'} flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300`}>
      {/* Header */}
      <div className="bg-[#FFD60A] px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-black/10 rounded-full flex items-center justify-center">
            <Bot className="h-5 w-5 text-black" />
          </div>
          <div>
            <h3 className="font-bold text-black text-sm">Alex — LED Expert</h3>
            <p className="text-black/60 text-[10px]">Auvolar Lighting Specialist</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setIsExpanded(!isExpanded)} className="p-1.5 hover:bg-black/10 rounded-lg transition-colors">
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-black/10 rounded-lg transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 bg-[#FFD60A] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="h-4 w-4 text-black" />
              </div>
            )}
            <div className={`max-w-[80%] ${msg.role === 'user' ? 'bg-[#FFD60A] text-black' : 'bg-white border'} rounded-2xl px-4 py-3 text-sm shadow-sm`}>
              {/* Attachments */}
              {msg.attachments?.map((a, j) => (
                <div key={j} className="flex items-center gap-2 mb-2 text-xs opacity-75">
                  <FileText className="h-3 w-3" />
                  <span>{a.name}</span>
                </div>
              ))}
              {/* Message content with markdown-like formatting */}
              <div className="whitespace-pre-wrap leading-relaxed" dangerouslySetInnerHTML={{
                __html: msg.content
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\[(.*?)\]\((\/p\/.*?)\)/g, '<a href="$2" target="_blank" class="text-blue-600 underline">$1</a>')
                  .replace(/^• /gm, '• ')
              }} />
              <p className="text-[10px] opacity-40 mt-1.5">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            {msg.role === 'user' && (
              <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <User className="h-4 w-4 text-gray-600" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-2">
            <div className="w-7 h-7 bg-[#FFD60A] rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="h-4 w-4 text-black" />
            </div>
            <div className="bg-white border rounded-2xl px-4 py-3 shadow-sm">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="px-4 py-2 bg-gray-50 border-t flex flex-wrap gap-2">
          {selectedFiles.map((f, i) => (
            <div key={i} className="flex items-center gap-1 bg-white border rounded-lg px-2 py-1 text-xs">
              <FileText className="h-3 w-3 text-gray-400" />
              <span className="max-w-[120px] truncate">{f.name}</span>
              <button onClick={() => removeFile(i)} className="text-gray-400 hover:text-red-500">
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Recording indicator */}
      {isRecording && (
        <div className="px-4 py-2 bg-red-50 border-t flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm text-red-700 font-medium">Recording... {formatTime(recordingTime)}</span>
          </div>
          <button onClick={stopRecording} className="text-sm text-red-600 font-semibold hover:underline">
            Stop & Send
          </button>
        </div>
      )}

      {/* Input */}
      <div className="border-t bg-white p-3 flex-shrink-0">
        <div className="flex items-end gap-2">
          <input ref={fileInputRef} type="file" className="hidden" multiple onChange={handleFileSelect} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.ies" />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            title="Attach file"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-2 transition-colors flex-shrink-0 ${isRecording ? 'text-red-500 hover:text-red-700' : 'text-gray-400 hover:text-gray-600'}`}
            title={isRecording ? 'Stop recording' : 'Voice input'}
          >
            {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about our LED products..."
            className="flex-1 resize-none border rounded-xl px-3 py-2 text-sm max-h-24 min-h-[40px] focus:outline-none focus:ring-2 focus:ring-[#FFD60A]/50"
            rows={1}
          />
          <button
            onClick={() => sendMessage()}
            disabled={isLoading || (!input.trim() && selectedFiles.length === 0)}
            className="p-2 bg-[#FFD60A] text-black rounded-xl hover:bg-[#FFD60A]/80 transition-colors disabled:opacity-30 flex-shrink-0"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 mt-2 text-[10px] text-gray-400">
          <span>sales@auvolar.com</span>
          <span>·</span>
          <span>(626) 342-8856</span>
        </div>
      </div>
    </div>
  )
}

export default ChatWidgetV2
