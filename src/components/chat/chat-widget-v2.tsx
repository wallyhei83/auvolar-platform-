'use client'

import { useState, useRef, useEffect } from 'react'
import { 
  MessageCircle, X, Send, Minimize2, User, Bot, 
  Mic, MicOff, Image, Paperclip, Volume2, VolumeX,
  Camera, FileText, Upload, Play, Pause
} from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  type?: 'text' | 'image' | 'voice' | 'document'
  attachments?: {
    type: 'image' | 'audio' | 'pdf'
    url?: string
    name?: string
  }[]
  voiceResponse?: string // base64 audio data
  sentiment?: 'positive' | 'neutral' | 'negative'
  engagement?: number
}

interface ClientProfile {
  interestLevel?: 'low' | 'medium' | 'high'
  communicationStyle?: string
  estimatedBudget?: string
  industry?: string
}

interface LeadData {
  name?: string
  email?: string
  phone?: string
  company?: string
  position?: string
  website?: string
  industry?: string
  conversationSummary?: string
  interestLevel?: string
  estimatedValue?: string
}

export function ChatWidgetV2() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  
  // Multi-modal states
  const [isRecording, setIsRecording] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isPlayingVoice, setIsPlayingVoice] = useState<string | null>(null)
  
  // Client intelligence
  const [clientProfile, setClientProfile] = useState<ClientProfile>({})
  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '', 
    phone: '',
    company: '',
    website: '',
    position: ''
  })
  const [showClientForm, setShowClientForm] = useState(false)
  
  // UI states
  const [showNotification, setShowNotification] = useState(false)
  const [leadCollected, setLeadCollected] = useState(false)
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  // Welcome message with client info collection
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: "Hey! 👋 I'm Alex from Auvolar - your AI lighting specialist. I can help you with technical specs, pricing, ROI calculations, and more. To give you the best recommendations, could you share:\\n\\n• Your company name and website\\n• Your role/position\\n• What lighting challenge you're facing\\n\\nOr just dive right in with your questions!",
          timestamp: new Date(),
        },
      ])
    }
  }, [isOpen, messages.length])

  // Show notification bubble
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowNotification(true)
      }
    }, 5000)
    return () => clearTimeout(timer)
  }, [isOpen])

  // Initialize audio recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      const chunks: BlobPart[] = []

      recorder.ondataavailable = (e) => chunks.push(e.data)
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' })
        setAudioBlob(blob)
        setIsRecording(false)
        stream.getTracks().forEach(track => track.stop())
      }

      recorder.start()
      setMediaRecorder(recorder)
      setIsRecording(true)
    } catch (error) {
      console.error('Could not start recording:', error)
      alert('Microphone access denied. Please allow microphone access to use voice messages.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop()
      setMediaRecorder(null)
    }
  }

  const playVoiceResponse = async (voiceData: string, messageId: string) => {
    try {
      const audioBuffer = Uint8Array.from(atob(voiceData), c => c.charCodeAt(0))
      const blob = new Blob([audioBuffer], { type: 'audio/mpeg' })
      const audioUrl = URL.createObjectURL(blob)
      
      const audio = new Audio(audioUrl)
      setIsPlayingVoice(messageId)
      
      audio.onended = () => {
        setIsPlayingVoice(null)
        URL.revokeObjectURL(audioUrl)
      }
      
      await audio.play()
    } catch (error) {
      console.error('Could not play voice response:', error)
      setIsPlayingVoice(null)
    }
  }

  const handleFileSelect = (files: FileList) => {
    const validFiles = Array.from(files).filter(file => {
      const isImage = file.type.startsWith('image/')
      const isPDF = file.type === 'application/pdf'
      const isAudio = file.type.startsWith('audio/')
      return isImage || isPDF || isAudio
    })
    
    if (validFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...validFiles])
    }
  }

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const processAttachments = async (): Promise<any[]> => {
    const attachments = []
    
    // Process voice recording
    if (audioBlob) {
      const audioBuffer = await audioBlob.arrayBuffer()
      attachments.push({
        type: 'audio',
        data: Array.from(new Uint8Array(audioBuffer))
      })
    }
    
    // Process selected files
    for (const file of selectedFiles) {
      if (file.type.startsWith('image/')) {
        // For images, create URL for vision analysis
        const imageUrl = URL.createObjectURL(file)
        attachments.push({
          type: 'image',
          url: imageUrl
        })
      } else if (file.type === 'application/pdf') {
        // For PDFs, send file data
        const pdfBuffer = await file.arrayBuffer()
        attachments.push({
          type: 'pdf',
          data: Array.from(new Uint8Array(pdfBuffer))
        })
      }
    }
    
    return attachments
  }

  const sendMessage = async () => {
    if ((!input.trim() && !audioBlob && selectedFiles.length === 0) || isLoading) return

    const userContent = input.trim() || '[Voice/Media message]'
    setInput('')
    
    const attachments = await processAttachments()
    
    const newUserMessage: Message = { 
      role: 'user', 
      content: userContent,
      timestamp: new Date(),
      attachments: attachments.map(att => ({
        type: att.type,
        url: att.url,
        name: att.name
      }))
    }
    
    const updatedMessages = [...messages, newUserMessage]
    setMessages(updatedMessages)
    setIsLoading(true)
    
    // Clear inputs
    setAudioBlob(null)
    setSelectedFiles([])

    try {
      const requestBody = {
        messages: updatedMessages.map(m => ({ 
          role: m.role, 
          content: m.content,
          attachments: attachments.length > 0 ? attachments : undefined
        })),
        sessionId,
        visitorInfo: {
          page: typeof window !== 'undefined' ? window.location.pathname : undefined,
          userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
        },
        clientInfo: Object.keys(clientInfo).some(key => clientInfo[key as keyof typeof clientInfo]) 
          ? clientInfo 
          : undefined
      }

      const res = await fetch('/api/chat-v2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const data = await res.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.reply,
        timestamp: new Date(),
        voiceResponse: data.voiceResponse,
        sentiment: data.sentiment,
        engagement: data.engagement
      }
      
      const allMessages = [...updatedMessages, assistantMessage]
      setMessages(allMessages)
      
      if (data.sessionId) setSessionId(data.sessionId)
      if (data.clientProfile) setClientProfile(data.clientProfile)

      // Handle lead collection
      if (data.leadCollected && data.leadData) {
        setLeadCollected(true)
        await saveLead(data.leadData, allMessages)
      }

      // Handle escalation
      if (data.escalate) {
        await notifyHuman(data.escalateReason, data.escalateData)
      }

      // Auto-play voice response if available
      if (data.voiceResponse) {
        setTimeout(() => {
          playVoiceResponse(data.voiceResponse, assistantMessage.timestamp.toISOString())
        }, 500)
      }

    } catch (error) {
      console.error('Chat error:', error)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm experiencing a technical issue. Let me connect you with our team immediately. Please email sales@auvolar.com or call (626) 342-8856.",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const saveLead = async (leadData: LeadData, conversation: Message[]) => {
    try {
      await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'advanced-chat-lead',
          ...leadData,
          conversation: conversation.map(m => ({
            role: m.role,
            content: m.content,
            time: m.timestamp.toISOString(),
            sentiment: m.sentiment,
            engagement: m.engagement
          })),
          sessionId,
          clientProfile
        }),
      })
    } catch (error) {
      console.error('Failed to save lead:', error)
    }
  }

  const notifyHuman = async (reason: string, escalateData: any) => {
    try {
      await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'chat-escalation-v2',
          reason,
          escalateData,
          sessionId,
        }),
      })
    } catch (error) {
      console.error('Failed to notify human:', error)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const updateClientInfo = (field: string, value: string) => {
    setClientInfo(prev => ({ ...prev, [field]: value }))
  }

  // Render client intelligence indicator
  const renderClientIntelligence = () => {
    if (!Object.values(clientProfile).some(v => v)) return null
    
    return (
      <div className="px-3 py-2 bg-blue-50 border-b border-blue-200">
        <div className="flex items-center gap-2 text-xs">
          <Bot className="h-3 w-3 text-blue-600" />
          <span className="text-blue-800">
            {clientProfile.industry && `${clientProfile.industry} • `}
            {clientProfile.interestLevel && `${clientProfile.interestLevel} interest • `}
            {clientProfile.estimatedBudget && `${clientProfile.estimatedBudget} budget`}
          </span>
        </div>
      </div>
    )
  }

  // Chat bubble (closed state)  
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        {showNotification && (
          <div className="absolute bottom-16 right-0 mb-2 animate-bounce">
            <div className="bg-white rounded-lg shadow-lg p-3 max-w-[240px] border border-gray-200">
              <p className="text-sm text-gray-800">🤖 New AI Sales Rep! I can analyze your lighting needs from photos, voice messages, and documents!</p>
              <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white border-r border-b border-gray-200"></div>
            </div>
          </div>
        )}
        <button
          onClick={() => {
            setIsOpen(true)
            setShowNotification(false)
          }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-brand shadow-lg hover:bg-brand-dark transition-all hover:scale-105 relative"
          aria-label="Open AI Sales Assistant"
        >
          <MessageCircle className="h-6 w-6 text-black" />
          <span className="absolute -top-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500 items-center justify-center">
              <Bot className="h-2.5 w-2.5 text-white" />
            </span>
          </span>
        </button>
      </div>
    )
  }

  // Minimized state
  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-brand px-4 py-3 shadow-lg hover:bg-brand-dark transition-all"
      >
        <Bot className="h-5 w-5 text-black" />
        <span className="font-medium text-black">AI Sales Assistant</span>
        {messages.length > 1 && (
          <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
            {messages.length}
          </span>
        )}
      </button>
    )
  }

  // Full chat window
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col w-[400px] h-[600px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between bg-brand px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/10">
              <Bot className="h-5 w-5 text-black" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-brand rounded-full"></span>
          </div>
          <div>
            <h3 className="font-semibold text-black">Alex - AI Sales Pro</h3>
            <p className="text-xs text-gray-700">Multi-Modal • Learning AI</p>
          </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setShowClientForm(!showClientForm)}
            className="p-2 hover:bg-black/10 rounded-lg transition-colors"
            aria-label="Client Info"
          >
            <User className="h-4 w-4 text-black" />
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            className="p-2 hover:bg-black/10 rounded-lg transition-colors"
            aria-label="Minimize"
          >
            <Minimize2 className="h-4 w-4 text-black" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-black/10 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4 text-black" />
          </button>
        </div>
      </div>

      {/* Client Intelligence Indicator */}
      {renderClientIntelligence()}

      {/* Client Info Form */}
      {showClientForm && (
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Your name"
                value={clientInfo.name}
                onChange={(e) => updateClientInfo('name', e.target.value)}
                className="text-xs border rounded px-2 py-1"
              />
              <input
                type="email"
                placeholder="Email"
                value={clientInfo.email}
                onChange={(e) => updateClientInfo('email', e.target.value)}
                className="text-xs border rounded px-2 py-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Company"
                value={clientInfo.company}
                onChange={(e) => updateClientInfo('company', e.target.value)}
                className="text-xs border rounded px-2 py-1"
              />
              <input
                type="text"
                placeholder="Website"
                value={clientInfo.website}
                onChange={(e) => updateClientInfo('website', e.target.value)}
                className="text-xs border rounded px-2 py-1"
              />
            </div>
            <input
              type="text"
              placeholder="Your role/position"
              value={clientInfo.position}
              onChange={(e) => updateClientInfo('position', e.target.value)}
              className="w-full text-xs border rounded px-2 py-1"
            />
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-brand flex items-center justify-center">
                <Bot className="h-4 w-4 text-black" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                msg.role === 'user'
                  ? 'bg-brand text-black rounded-br-md'
                  : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              
              {/* Attachments Display */}
              {msg.attachments && msg.attachments.length > 0 && (
                <div className="mt-2 space-y-1">
                  {msg.attachments.map((att, idx) => (
                    <div key={idx} className="text-xs bg-gray-100 rounded px-2 py-1 flex items-center gap-1">
                      {att.type === 'image' && <Image className="h-3 w-3" />}
                      {att.type === 'audio' && <Mic className="h-3 w-3" />}
                      {att.type === 'pdf' && <FileText className="h-3 w-3" />}
                      {att.name || `${att.type} attachment`}
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between mt-1">
                <p className={`text-[10px] ${msg.role === 'user' ? 'text-black/50' : 'text-gray-400'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                
                {/* Voice Response Button */}
                {msg.voiceResponse && msg.role === 'assistant' && (
                  <button
                    onClick={() => playVoiceResponse(msg.voiceResponse!, msg.timestamp.toISOString())}
                    className="text-blue-500 hover:text-blue-700 ml-2"
                    disabled={isPlayingVoice === msg.timestamp.toISOString()}
                  >
                    {isPlayingVoice === msg.timestamp.toISOString() ? (
                      <VolumeX className="h-3 w-3" />
                    ) : (
                      <Volume2 className="h-3 w-3" />
                    )}
                  </button>
                )}
              </div>
            </div>
            {msg.role === 'user' && (
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-4 w-4 text-gray-600" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-end gap-2 justify-start">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-brand flex items-center justify-center">
              <Bot className="h-4 w-4 text-black" />
            </div>
            <div className="bg-white text-gray-800 shadow-sm border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* File Preview */}
      {(selectedFiles.length > 0 || audioBlob) && (
        <div className="px-4 py-2 bg-gray-100 border-t border-gray-200">
          <div className="flex gap-2 flex-wrap">
            {audioBlob && (
              <div className="flex items-center gap-2 bg-blue-100 rounded px-2 py-1 text-xs">
                <Mic className="h-3 w-3 text-blue-600" />
                Voice message
                <button onClick={() => setAudioBlob(null)} className="text-red-500 hover:text-red-700">×</button>
              </div>
            )}
            {selectedFiles.map((file, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-gray-200 rounded px-2 py-1 text-xs">
                {file.type.startsWith('image/') && <Image className="h-3 w-3" />}
                {file.type === 'application/pdf' && <FileText className="h-3 w-3" />}
                {file.name}
                <button onClick={() => removeFile(idx)} className="text-red-500 hover:text-red-700">×</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-200 p-3 bg-white">
        <div className="flex items-end gap-2">
          {/* File Input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,audio/*"
            onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
            className="hidden"
          />
          
          {/* Attachment Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <Paperclip className="h-4 w-4" />
          </button>

          {/* Voice Recording Button */}
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
              isRecording 
                ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </button>

          {/* Text Input */}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type, speak, or attach files..."
            className="flex-1 rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />

          {/* Send Button */}
          <button
            onClick={sendMessage}
            disabled={(!input.trim() && !audioBlob && selectedFiles.length === 0) || isLoading}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-black hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-[10px] text-gray-400">🤖 Multi-Modal AI Sales Pro</span>
          <span className="text-gray-300">•</span>
          <a href="mailto:sales@auvolar.com" className="text-[10px] text-gray-400 hover:text-gray-600">
            sales@auvolar.com
          </a>
          <span className="text-gray-300">•</span>
          <a href="tel:+16263428856" className="text-[10px] text-gray-400 hover:text-gray-600">
            (626) 342-8856
          </a>
        </div>
      </div>
    </div>
  )
}