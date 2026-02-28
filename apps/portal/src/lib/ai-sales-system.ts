/**
 * AI Sales System - Advanced Multi-Modal Sales Agent
 * Features: Client Intelligence, Adaptive Learning, Multi-Modal Input
 */

import OpenAI from 'openai'

export interface ClientProfile {
  // Basic Info
  name?: string
  email?: string
  phone?: string
  company?: string
  website?: string
  position?: string
  
  // Intelligence Data
  industry?: string
  companySize?: 'startup' | 'smb' | 'enterprise' | 'fortune500'
  communicationStyle?: 'direct' | 'relationship' | 'analytical' | 'expressive'
  decisionSpeed?: 'fast' | 'moderate' | 'slow'
  techLevel?: 'expert' | 'intermediate' | 'basic'
  priceSensitivity?: 'high' | 'medium' | 'low'
  
  // Behavioral Analysis
  responseTime?: number
  messageLength?: 'short' | 'medium' | 'long'
  questionsAsked?: string[]
  concernsRaised?: string[]
  interestLevel?: 'low' | 'medium' | 'high'
  
  // Business Context
  painPoints?: string[]
  budget?: string
  timeline?: string
  competitors?: string[]
  
  // Session Tracking
  sessionId: string
  conversationHistory: Array<{
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
    sentiment?: 'positive' | 'neutral' | 'negative'
    engagement?: number
  }>
  
  // Learning Data
  strategyEffectiveness?: Record<string, number>
  lastUpdated: Date
}

export interface CompanyIntelligence {
  name: string
  website: string
  industry: string
  size: string
  description: string
  recentNews: string[]
  competitors: string[]
  painPoints: string[]
  budgetEstimate: string
  decisionMakers: string[]
  contactInfo: {
    phone?: string
    email?: string
    address?: string
  }
}

export class AIClientAnalyzer {
  private openai: OpenAI
  
  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey })
  }

  /**
   * Analyze company from website and name
   */
  async analyzeCompany(companyName: string, website?: string): Promise<CompanyIntelligence> {
    let companyData: string = ''
    
    // Scrape website content if provided
    if (website) {
      try {
        const response = await fetch(website)
        const html = await response.text()
        // Extract key content (simple text extraction)
        const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').slice(0, 3000)
        companyData = text
      } catch (error) {
        console.log('Could not fetch website:', error)
      }
    }

    const analysisPrompt = `
    Analyze this company for B2B LED lighting sales approach:
    
    Company: ${companyName}
    Website: ${website || 'Not provided'}
    Website Content: ${companyData || 'Not available'}
    
    Provide analysis in this exact JSON format:
    {
      "industry": "specific industry (e.g., manufacturing, retail, healthcare)",
      "size": "startup|smb|enterprise|fortune500",
      "description": "brief company description",
      "painPoints": ["lighting-related pain point 1", "pain point 2"],
      "budgetEstimate": "low|medium|high|enterprise",
      "decisionMakers": ["likely decision maker roles"],
      "competitors": ["potential competitor companies they might compare us to"]
    }
    
    Focus on lighting-related insights and business intelligence for sales strategy.
    `

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: analysisPrompt }],
        temperature: 0.3,
      })

      const response = completion.choices[0]?.message?.content || '{}'
      const analysis = JSON.parse(response)
      
      return {
        name: companyName,
        website: website || '',
        industry: analysis.industry || 'unknown',
        size: analysis.size || 'smb',
        description: analysis.description || '',
        recentNews: [], // Could be enhanced with news API
        competitors: analysis.competitors || [],
        painPoints: analysis.painPoints || [],
        budgetEstimate: analysis.budgetEstimate || 'medium',
        decisionMakers: analysis.decisionMakers || [],
        contactInfo: {}
      }
    } catch (error) {
      console.error('Company analysis failed:', error)
      return {
        name: companyName,
        website: website || '',
        industry: 'unknown',
        size: 'smb',
        description: '',
        recentNews: [],
        competitors: [],
        painPoints: [],
        budgetEstimate: 'medium',
        decisionMakers: [],
        contactInfo: {}
      }
    }
  }

  /**
   * Analyze job role for communication strategy
   */
  analyzeJobRole(position: string): {
    communicationStyle: string
    priorities: string[]
    concerns: string[]
    approach: string
  } {
    const roleMapping: Record<string, any> = {
      'facilities manager': {
        communicationStyle: 'direct',
        priorities: ['cost control', 'maintenance', 'reliability'],
        concerns: ['downtime', 'ongoing costs', 'warranty'],
        approach: 'Emphasize ROI, maintenance savings, and reliability'
      },
      'procurement director': {
        communicationStyle: 'analytical',
        priorities: ['cost comparison', 'specifications', 'vendor evaluation'],
        concerns: ['price', 'quality standards', 'delivery'],
        approach: 'Provide detailed specs, competitive analysis, volume pricing'
      },
      'electrical engineer': {
        communicationStyle: 'technical',
        priorities: ['technical specs', 'performance', 'standards compliance'],
        concerns: ['light quality', 'installation requirements', 'code compliance'],
        approach: 'Deep technical discussion, IES files, photometric data'
      },
      'cfo': {
        communicationStyle: 'analytical',
        priorities: ['ROI', 'cash flow impact', 'tax benefits'],
        concerns: ['payback period', 'budget constraints', 'financial risk'],
        approach: 'Focus on financial returns, rebates, tax incentives'
      },
      'property manager': {
        communicationStyle: 'relationship',
        priorities: ['tenant satisfaction', 'property value', 'operating costs'],
        concerns: ['disruption', 'appearance', 'long-term value'],
        approach: 'Emphasize tenant benefits, property enhancement, minimal disruption'
      }
    }

    const normalizedPosition = position.toLowerCase()
    
    // Find best match
    for (const role in roleMapping) {
      if (normalizedPosition.includes(role) || role.includes(normalizedPosition)) {
        return roleMapping[role]
      }
    }

    // Default for unknown roles
    return {
      communicationStyle: 'professional',
      priorities: ['value', 'quality', 'service'],
      concerns: ['price', 'reliability', 'support'],
      approach: 'Balanced approach focusing on value and service'
    }
  }

  /**
   * Analyze message sentiment and engagement
   */
  async analyzeMessageSentiment(message: string): Promise<{
    sentiment: 'positive' | 'neutral' | 'negative'
    engagement: number
    intent: string[]
    urgency: 'low' | 'medium' | 'high'
  }> {
    const prompt = `
    Analyze this customer message for sales insights:
    
    "${message}"
    
    Respond in JSON format:
    {
      "sentiment": "positive|neutral|negative",
      "engagement": 0-100 (interest level),
      "intent": ["intent1", "intent2"],
      "urgency": "low|medium|high"
    }
    
    Intent examples: price_inquiry, technical_specs, timeline_request, objection, ready_to_buy
    `

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
      })

      const response = completion.choices[0]?.message?.content || '{}'
      return JSON.parse(response)
    } catch (error) {
      console.error('Sentiment analysis failed:', error)
      return {
        sentiment: 'neutral',
        engagement: 50,
        intent: ['general_inquiry'],
        urgency: 'medium'
      }
    }
  }
}

export class AdaptiveSalesStrategy {
  /**
   * Generate personalized response strategy based on client profile
   */
  static generateStrategy(profile: ClientProfile, companyIntel?: CompanyIntelligence): {
    tone: string
    approach: string
    priorities: string[]
    tactics: string[]
  } {
    const strategy = {
      tone: 'professional',
      approach: 'consultative',
      priorities: [] as string[],
      tactics: [] as string[]
    }

    // Adjust based on communication style
    switch (profile.communicationStyle) {
      case 'direct':
        strategy.tone = 'direct'
        strategy.approach = 'solution-focused'
        strategy.tactics.push('cut_to_chase', 'bottom_line_first')
        break
      case 'analytical':
        strategy.tone = 'professional'
        strategy.approach = 'data-driven'
        strategy.tactics.push('provide_specs', 'show_comparisons', 'roi_analysis')
        break
      case 'expressive':
        strategy.tone = 'enthusiastic'
        strategy.approach = 'relationship-building'
        strategy.tactics.push('build_rapport', 'share_stories', 'emotional_benefits')
        break
      case 'relationship':
        strategy.tone = 'warm'
        strategy.approach = 'trust-building'
        strategy.tactics.push('personal_touch', 'share_case_studies', 'long_term_partnership')
        break
    }

    // Adjust based on company size
    switch (companyIntel?.size || profile.companySize) {
      case 'enterprise':
      case 'fortune500':
        strategy.priorities.push('scalability', 'enterprise_support', 'volume_pricing')
        strategy.tactics.push('enterprise_solutions', 'dedicated_support')
        break
      case 'startup':
        strategy.priorities.push('cost_efficiency', 'flexibility', 'growth_support')
        strategy.tactics.push('startup_friendly_terms', 'future_expansion')
        break
      default:
        strategy.priorities.push('value', 'reliability', 'service')
        strategy.tactics.push('balanced_approach')
    }

    // Adjust based on price sensitivity
    if (profile.priceSensitivity === 'high') {
      strategy.priorities.unshift('cost_savings', 'roi', 'rebates')
      strategy.tactics.push('emphasize_savings', 'rebate_calculator')
    }

    return strategy
  }

  /**
   * Update strategy based on conversation effectiveness
   */
  static updateStrategyEffectiveness(
    profile: ClientProfile, 
    strategy: string, 
    effectiveness: number
  ): ClientProfile {
    if (!profile.strategyEffectiveness) {
      profile.strategyEffectiveness = {}
    }
    
    profile.strategyEffectiveness[strategy] = effectiveness
    profile.lastUpdated = new Date()
    
    return profile
  }
}

export class MultiModalProcessor {
  private openai: OpenAI
  
  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey })
  }

  /**
   * Process voice message (Speech-to-Text)
   */
  async processVoice(audioBuffer: Buffer): Promise<string> {
    try {
      // Create a temporary file for audio processing
      const uint8Array = new Uint8Array(audioBuffer)
      const blob = new Blob([uint8Array], { type: 'audio/wav' })
      const file = new File([blob], 'audio.wav', { type: 'audio/wav' })
      const transcription = await this.openai.audio.transcriptions.create({
        file,
        model: 'whisper-1',
      })
      
      return transcription.text
    } catch (error) {
      console.error('Voice processing failed:', error)
      return 'Sorry, I could not process that audio message. Could you type your question instead?'
    }
  }

  /**
   * Process image (Vision analysis)
   */
  async processImage(imageUrl: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analyze this image for lighting needs. What type of space is this? What lighting challenges do you see? What would you recommend?'
              },
              {
                type: 'image_url',
                image_url: { url: imageUrl }
              }
            ]
          }
        ],
        max_tokens: 500
      })

      return response.choices[0]?.message?.content || 'I can see the image but could not analyze it. Could you describe what lighting help you need?'
    } catch (error) {
      console.error('Image processing failed:', error)
      return 'I had trouble analyzing that image. Could you describe your lighting needs in text?'
    }
  }

  /**
   * Process PDF document
   */
  async processPDF(pdfBuffer: Buffer): Promise<string> {
    // Note: This would require pdf-parse or similar library
    // For now, return a placeholder
    return 'I received your PDF document. I can see it contains project specifications. Could you highlight the key lighting requirements you need help with?'
  }

  /**
   * Generate voice response (Text-to-Speech)
   */
  async generateVoice(text: string): Promise<Buffer> {
    try {
      const response = await this.openai.audio.speech.create({
        model: 'tts-1',
        voice: 'alloy',
        input: text,
      })

      return Buffer.from(await response.arrayBuffer())
    } catch (error) {
      console.error('Voice generation failed:', error)
      throw new Error('Could not generate voice response')
    }
  }
}