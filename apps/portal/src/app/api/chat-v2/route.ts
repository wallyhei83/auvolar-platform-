/**
 * Advanced Chat API v2 - Multi-Modal AI Sales Agent
 * Features: Client Intelligence, Adaptive Learning, Multi-Modal Processing
 */

import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { 
  ClientProfile, 
  AIClientAnalyzer, 
  AdaptiveSalesStrategy,
  MultiModalProcessor 
} from '@/lib/ai-sales-system'
import { AlexPersona } from '@/lib/alex-ai-persona'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// In-memory client profiles (in production, use Redis/Database)
const clientProfiles: Map<string, ClientProfile> = new Map()

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  type?: 'text' | 'image' | 'voice' | 'document'
  attachments?: {
    type: 'image' | 'audio' | 'pdf'
    url?: string
    data?: Buffer
  }[]
  sentiment?: 'positive' | 'neutral' | 'negative'
  engagement?: number
}

interface ChatRequest {
  messages: ChatMessage[]
  sessionId?: string
  visitorInfo?: {
    page?: string
    referrer?: string
    userAgent?: string
  }
  clientInfo?: {
    name?: string
    email?: string
    phone?: string
    company?: string
    website?: string
    position?: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json()
    const { messages, sessionId, visitorInfo, clientInfo } = body

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    const currentSessionId = sessionId || crypto.randomUUID()
    
    // Initialize AI components
    const clientAnalyzer = new AIClientAnalyzer(process.env.OPENAI_API_KEY)
    const multiModalProcessor = new MultiModalProcessor(process.env.OPENAI_API_KEY)
    const alexPersona = new AlexPersona()

    // Get or create client profile
    let clientProfile = clientProfiles.get(currentSessionId) || {
      sessionId: currentSessionId,
      conversationHistory: [],
      lastUpdated: new Date()
    } as ClientProfile

    // Update client profile with new info
    if (clientInfo) {
      clientProfile = { ...clientProfile, ...clientInfo }
    }

    // Process multi-modal input
    const latestMessage = messages[messages.length - 1]
    let processedContent = latestMessage.content
    
    if (latestMessage.attachments) {
      for (const attachment of latestMessage.attachments) {
        try {
          switch (attachment.type) {
            case 'audio':
              if (attachment.data) {
                const transcription = await multiModalProcessor.processVoice(attachment.data)
                processedContent += `\\n[Voice message transcribed]: ${transcription}`
              }
              break
            case 'image':
              if (attachment.url) {
                const imageAnalysis = await multiModalProcessor.processImage(attachment.url)
                processedContent += `\\n[Image analysis]: ${imageAnalysis}`
              }
              break
            case 'pdf':
              if (attachment.data) {
                const pdfContent = await multiModalProcessor.processPDF(attachment.data)
                processedContent += `\\n[Document content]: ${pdfContent}`
              }
              break
          }
        } catch (error) {
          console.error(`Failed to process ${attachment.type}:`, error)
        }
      }
    }

    // Analyze message sentiment and engagement
    const messageAnalysis = await clientAnalyzer.analyzeMessageSentiment(processedContent)
    
    // Update client profile with conversation data
    clientProfile.conversationHistory.push({
      role: latestMessage.role,
      content: processedContent,
      timestamp: new Date(),
      sentiment: messageAnalysis.sentiment,
      engagement: messageAnalysis.engagement
    })

    // Analyze company if provided
    let companyIntel = undefined
    if (clientProfile.company && clientProfile.website) {
      try {
        companyIntel = await clientAnalyzer.analyzeCompany(
          clientProfile.company, 
          clientProfile.website
        )
        
        // Update profile with company intelligence
        clientProfile.industry = companyIntel.industry
        clientProfile.companySize = companyIntel.size as any
        
        // Infer communication style and other attributes
        if (clientProfile.position) {
          const roleAnalysis = clientAnalyzer.analyzeJobRole(clientProfile.position)
          clientProfile.communicationStyle = roleAnalysis.communicationStyle as any
        }
      } catch (error) {
        console.error('Company analysis failed:', error)
      }
    }

    // Analyze behavioral patterns
    if (clientProfile.conversationHistory.length > 1) {
      const avgResponseLength = clientProfile.conversationHistory
        .filter(m => m.role === 'user')
        .reduce((sum, m) => sum + m.content.length, 0) / clientProfile.conversationHistory.length

      clientProfile.messageLength = avgResponseLength < 50 ? 'short' : avgResponseLength < 200 ? 'medium' : 'long'
      
      const avgEngagement = clientProfile.conversationHistory
        .filter(m => m.engagement)
        .reduce((sum, m) => sum + (m.engagement || 50), 0) / clientProfile.conversationHistory.length

      clientProfile.interestLevel = avgEngagement < 40 ? 'low' : avgEngagement < 70 ? 'medium' : 'high'
    }

    // Generate personalized system prompt
    const conversationContext = clientProfile.conversationHistory
      .slice(-4) // Last 4 messages for context
      .map(m => `${m.role}: ${m.content}`)
      .join('\\n')

    const systemPrompt = alexPersona.generatePersonalizedPrompt(
      clientProfile,
      companyIntel,
      conversationContext
    )

    // Prepare messages for AI
    const conversationMessages = [
      { role: 'system' as const, content: systemPrompt },
      ...messages.slice(-8).map((m, index) => ({ // Keep last 8 messages
        role: m.role,
        content: index === messages.length - 1 ? processedContent : m.content
      }))
    ]

    // Generate AI response
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o', // Using latest model for best performance
      messages: conversationMessages,
      temperature: 0.7,
      max_tokens: 800,
    })

    let reply = completion.choices[0]?.message?.content || 
      "I apologize, I'm having a technical issue. Let me connect you with our team for immediate assistance."

    // Process special commands in reply
    const leadMatch = reply.match(/\[COLLECT_LEAD:\s*([^\]]+)\]/)
    const escalateMatch = reply.match(/\[ESCALATE:\s*([^\]]+)\]/)
    const analyzeMatch = reply.match(/\[ANALYZE_COMPANY:\s*([^\]]+)\]/)
    const voiceMatch = reply.match(/\[VOICE_RESPONSE\]/)

    // Clean reply of internal markers
    reply = reply
      .replace(/\[COLLECT_LEAD:[^\]]+\]/g, '')
      .replace(/\[ESCALATE:[^\]]+\]/g, '')
      .replace(/\[ANALYZE_COMPANY:[^\]]+\]/g, '')
      .replace(/\[VOICE_RESPONSE\]/g, '')
      .trim()

    // Update client profile
    clientProfile.lastUpdated = new Date()
    clientProfiles.set(currentSessionId, clientProfile)

    // Prepare response
    const response: any = {
      reply,
      sessionId: currentSessionId,
      clientProfile: {
        interestLevel: clientProfile.interestLevel,
        communicationStyle: clientProfile.communicationStyle,
        estimatedBudget: companyIntel?.budgetEstimate,
        industry: clientProfile.industry
      }
    }

    // Handle lead collection
    if (leadMatch && clientProfile.email) {
      response.leadCollected = true
      response.leadData = {
        name: clientProfile.name,
        email: clientProfile.email,
        phone: clientProfile.phone,
        company: clientProfile.company,
        position: clientProfile.position,
        website: clientProfile.website,
        industry: clientProfile.industry,
        conversationSummary: generateConversationSummary(clientProfile.conversationHistory),
        interestLevel: clientProfile.interestLevel,
        estimatedValue: estimateOpportunityValue(clientProfile, companyIntel)
      }
    }

    // Handle escalation
    if (escalateMatch) {
      response.escalate = true
      response.escalateReason = escalateMatch[1]
      response.escalateData = {
        clientProfile,
        urgency: messageAnalysis.urgency,
        conversationSummary: generateConversationSummary(clientProfile.conversationHistory)
      }
    }

    // Handle company analysis request
    if (analyzeMatch && !companyIntel) {
      const [companyName, website] = analyzeMatch[1].split(',').map(s => s.trim())
      if (companyName) {
        try {
          companyIntel = await clientAnalyzer.analyzeCompany(companyName, website)
          response.companyAnalysis = companyIntel
        } catch (error) {
          console.error('Real-time company analysis failed:', error)
        }
      }
    }

    // Generate voice response if requested
    if (voiceMatch) {
      try {
        const voiceBuffer = await multiModalProcessor.generateVoice(reply)
        response.voiceResponse = voiceBuffer.toString('base64')
      } catch (error) {
        console.error('Voice generation failed:', error)
      }
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Advanced chat API error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { 
        error: `Failed to process message: ${errorMessage}`,
        reply: "I apologize for the technical issue. Please email sales@auvolar.com or call (626) 342-8856 for immediate assistance."
      },
      { status: 500 }
    )
  }
}

/**
 * Generate conversation summary for lead data
 */
function generateConversationSummary(history: ClientProfile['conversationHistory']): string {
  const userMessages = history.filter(m => m.role === 'user').slice(-5)
  const keyTopics = userMessages.map(m => {
    if (m.content.toLowerCase().includes('parking')) return 'parking lot lighting'
    if (m.content.toLowerCase().includes('warehouse')) return 'warehouse lighting'  
    if (m.content.toLowerCase().includes('stadium')) return 'stadium lighting'
    if (m.content.toLowerCase().includes('price')) return 'pricing inquiry'
    if (m.content.toLowerCase().includes('quote')) return 'quote request'
    return 'general inquiry'
  })
  
  return keyTopics.join(', ')
}

/**
 * Estimate opportunity value based on profile and conversation
 */
function estimateOpportunityValue(profile: ClientProfile, companyIntel?: any): string {
  let value = '$1,000 - $5,000' // Default small project
  
  if (companyIntel?.size === 'enterprise' || companyIntel?.size === 'fortune500') {
    value = '$50,000 - $200,000+'
  } else if (companyIntel?.size === 'smb') {
    value = '$5,000 - $50,000'
  }
  
  // Adjust based on conversation content
  const conversationText = profile.conversationHistory.map(m => m.content).join(' ').toLowerCase()
  if (conversationText.includes('stadium') || conversationText.includes('sports')) {
    value = '$100,000 - $500,000+'
  } else if (conversationText.includes('warehouse') || conversationText.includes('industrial')) {
    value = '$25,000 - $100,000'
  }
  
  return value
}

/**
 * Smart client info collection - extract info from conversation
 */
function extractClientInfo(messages: ChatMessage[]): Partial<ClientProfile> {
  const info: Partial<ClientProfile> = {}
  const conversationText = messages.map(m => m.content).join(' ')
  
  // Email extraction
  const emailMatch = conversationText.match(/[\\w.-]+@[\\w.-]+\\.[\\w]+/)
  if (emailMatch) info.email = emailMatch[0]
  
  // Phone extraction  
  const phoneMatch = conversationText.match(/\\b\\d{3}[.-]?\\d{3}[.-]?\\d{4}\\b/)
  if (phoneMatch) info.phone = phoneMatch[0]
  
  // Company extraction (basic - could be enhanced)
  const companyMatch = conversationText.match(/(?:work at|company is|from|at)\\s+([A-Z][\\w\\s&]+(?:Inc|LLC|Corp|Company|Ltd))/i)
  if (companyMatch) info.company = companyMatch[1]
  
  return info
}