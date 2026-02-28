'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Minimize2, User, Bot } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface LeadData {
  name?: string
  email?: string
  phone?: string
  company?: string
  products?: string
  quantity?: string
  notes?: string
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [leadCollected, setLeadCollected] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: "Hey! 👋 I'm Alex from Auvolar. Looking for commercial LED lighting? I can help you find the right products and get you the best pricing. What kind of project are you working on?",
          timestamp: new Date(),
        },
      ])
    }
  }, [isOpen, messages.length])

  // Show notification bubble after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowNotification(true)
      }
    }, 5000)
    return () => clearTimeout(timer)
  }, [isOpen])

  // Save lead data
  const saveLead = async (leadData: LeadData, conversation: Message[]) => {
    try {
      // Send to email API
      await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'chat-lead',
          ...leadData,
          conversation: conversation.map(m => ({
            role: m.role,
            content: m.content,
            time: m.timestamp.toISOString(),
          })),
          sessionId,
        }),
      })
      setLeadCollected(true)
    } catch (error) {
      console.error('Failed to save lead:', error)
    }
  }

  // Notify human for escalation
  const notifyHuman = async (reason: string, conversation: Message[]) => {
    try {
      await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'chat-escalation',
          reason,
          conversation: conversation.map(m => ({
            role: m.role,
            content: m.content,
            time: m.timestamp.toISOString(),
          })),
          sessionId,
        }),
      })
    } catch (error) {
      console.error('Failed to notify human:', error)
    }
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    const newUserMessage: Message = { 
      role: 'user', 
      content: userMessage,
      timestamp: new Date(),
    }
    const updatedMessages = [...messages, newUserMessage]
    setMessages(updatedMessages)
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
          sessionId,
          visitorInfo: {
            page: typeof window !== 'undefined' ? window.location.pathname : undefined,
          },
        }),
      })

      const data = await res.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.reply,
        timestamp: new Date(),
      }
      const allMessages = [...updatedMessages, assistantMessage]
      setMessages(allMessages)
      
      if (data.sessionId) setSessionId(data.sessionId)

      // Handle lead collection
      if (data.leadCollected && data.leadData) {
        const parts = data.leadData.split(',').map((s: string) => s.trim())
        const leadData: LeadData = {}
        parts.forEach((part: string) => {
          const [key, ...valueParts] = part.split(':')
          const value = valueParts.join(':').trim()
          if (key && value) {
            const cleanKey = key.trim().toLowerCase()
            if (cleanKey === 'name') leadData.name = value
            else if (cleanKey === 'email') leadData.email = value
            else if (cleanKey === 'phone') leadData.phone = value
            else if (cleanKey === 'company') leadData.company = value
            else if (cleanKey === 'products') leadData.products = value
            else if (cleanKey === 'quantity') leadData.quantity = value
            else if (cleanKey === 'notes') leadData.notes = value
          }
        })
        saveLead(leadData, allMessages)
      }

      // Handle escalation
      if (data.escalate && data.escalateReason) {
        notifyHuman(data.escalateReason, allMessages)
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I apologize, I'm having a technical issue. Please email us at sales@auvolar.com or call (626) 342-8856 and we'll help you right away!",
          timestamp: new Date(),
        },
      ])
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

  // Chat bubble (closed state)
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        {/* Notification bubble */}
        {showNotification && (
          <div className="absolute bottom-16 right-0 mb-2 animate-bounce">
            <div className="bg-white rounded-lg shadow-lg p-3 max-w-[200px] border border-gray-200">
              <p className="text-sm text-gray-800">👋 Need help finding the right lights?</p>
              <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white border-r border-b border-gray-200"></div>
            </div>
          </div>
        )}
        <button
          onClick={() => {
            setIsOpen(true)
            setShowNotification(false)
          }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-brand shadow-lg hover:bg-brand-dark transition-all hover:scale-105"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6 text-black" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
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
        <MessageCircle className="h-5 w-5 text-black" />
        <span className="font-medium text-black">Continue Chat</span>
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col w-[380px] h-[520px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
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
            <h3 className="font-semibold text-black">Alex from Auvolar</h3>
            <p className="text-xs text-gray-700">Sales Specialist • Online</p>
          </div>
        </div>
        <div className="flex gap-1">
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
              className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                msg.role === 'user'
                  ? 'bg-brand text-black rounded-br-md'
                  : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              <p className={`text-[10px] mt-1 ${msg.role === 'user' ? 'text-black/50' : 'text-gray-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
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

      {/* Quick Actions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2 bg-gray-50 flex gap-2 flex-wrap">
          <button
            onClick={() => setInput('I need warehouse lighting')}
            className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-50"
          >
            🏭 Warehouse
          </button>
          <button
            onClick={() => setInput('I need parking lot lights')}
            className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-50"
          >
            🅿️ Parking
          </button>
          <button
            onClick={() => setInput('I need office lighting')}
            className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-50"
          >
            🏢 Office
          </button>
          <button
            onClick={() => setInput('Get a quote')}
            className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-50"
          >
            💰 Get Quote
          </button>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-200 p-3 bg-white">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-black hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-[10px] text-gray-400">Powered by AI</span>
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
