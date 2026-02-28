/**
 * Alex 2.0 - Advanced AI Sales Representative
 * Technical Expert + Sales Master + Partnership Builder
 */

import { ClientProfile, CompanyIntelligence, AdaptiveSalesStrategy } from './ai-sales-system'

export interface ProductKnowledge {
  // All Auvolar products with full specs
  products: {
    [key: string]: {
      name: string
      series: string
      watts: number[]
      lumens: number[]
      prices: number[]
      applications: string[]
      features: string[]
      specifications: {
        cct: string[]
        cri: string
        efficiency: string
        warranty: string
        certifications: string[]
        operating_temp: string
        lifespan: string
        dimensions: string[]
        mounting: string[]
      }
    }
  }
  
  // Application scenarios
  applications: {
    [key: string]: {
      recommended_products: string[]
      key_considerations: string[]
      common_challenges: string[]
      success_metrics: string[]
    }
  }
  
  // Competitive intelligence
  competitors: {
    [key: string]: {
      strengths: string[]
      weaknesses: string[]
      pricing_position: string
      our_advantages: string[]
    }
  }
}

export class AlexPersona {
  private productKnowledge: ProductKnowledge
  
  constructor() {
    this.productKnowledge = this.initializeProductKnowledge()
  }

  private initializeProductKnowledge(): ProductKnowledge {
    return {
      products: {
        'ot-series': {
          name: 'OT Series Area Light',
          series: 'OT',
          watts: [100, 150, 200, 240, 320, 480],
          lumens: [14000, 21000, 28000, 33600, 44800, 67200],
          prices: [149, 179, 199, 239, 299, 399],
          applications: ['Parking lots', 'Walkways', 'Building perimeter', 'Security lighting'],
          features: [
            '130-140 lm/W efficiency',
            '5000K/4000K CCT options', 
            'Type III/IV/V distributions',
            '0-10V dimming',
            'Surge protection',
            'DLC Premium listed'
          ],
          specifications: {
            cct: ['4000K', '5000K'],
            cri: '>70',
            efficiency: '130-140 lm/W',
            warranty: '5 years',
            certifications: ['UL Listed', 'DLC Premium', 'FCC Compliant'],
            operating_temp: '-40°F to 104°F (-40°C to 40°C)',
            lifespan: 'L70 >100,000 hours',
            dimensions: ['Various based on wattage'],
            mounting: ['Slip fitter', 'Yoke mount', 'Trunnion mount']
          }
        },
        'plb-series': {
          name: 'PLB Series Parking Lot Light',
          series: 'PLB',
          watts: [100, 150, 200, 240, 320],
          lumens: [13000, 19500, 26000, 31200, 41600],
          prices: [139, 169, 189, 219, 269],
          applications: ['Parking lots', 'Roadways', 'Commercial areas', 'Campus lighting'],
          features: [
            '130+ lm/W efficiency',
            'Multiple optics available',
            'Robust die-cast housing',
            'Photocell ready',
            'Motion sensor compatible'
          ],
          specifications: {
            cct: ['4000K', '5000K'],
            cri: '>70',
            efficiency: '130+ lm/W',
            warranty: '5 years',
            certifications: ['UL Listed', 'DLC Premium'],
            operating_temp: '-40°F to 104°F',
            lifespan: 'L70 >100,000 hours',
            dimensions: ['Compact shoebox design'],
            mounting: ['Slip fitter', 'Yoke mount']
          }
        },
        'isf-series': {
          name: 'ISF Series Stadium Light',
          series: 'ISF',
          watts: [400, 500, 600, 800, 1000, 1200, 1500, 1800],
          lumens: [56000, 70000, 84000, 112000, 140000, 168000, 210000, 252000],
          prices: [499, 599, 699, 899, 1099, 1299, 1599, 1899],
          applications: ['Sports facilities', 'Stadium lighting', 'Large area illumination', 'Industrial high bay'],
          features: [
            '140+ lm/W efficiency',
            'Multiple beam angles',
            'Professional sports lighting',
            'Advanced heat management',
            'Precise optical control'
          ],
          specifications: {
            cct: ['4000K', '5000K'],
            cri: '>80',
            efficiency: '140+ lm/W',
            warranty: '5 years',
            certifications: ['UL Listed', 'DLC Premium'],
            operating_temp: '-40°F to 122°F',
            lifespan: 'L70 >100,000 hours',
            dimensions: ['Heavy-duty housing'],
            mounting: ['Multiple mounting options']
          }
        },
        'ins-series': {
          name: 'INS Series Stadium Light',
          series: 'INS',
          watts: [300, 400, 500, 600, 720, 1000, 1200, 1500, 1800],
          lumens: [42000, 56000, 70000, 84000, 100800, 140000, 168000, 210000, 252000],
          prices: [399, 499, 599, 699, 799, 1099, 1299, 1599, 1899],
          applications: ['Sports lighting', 'Stadium illumination', 'High-mast lighting', 'Large venues'],
          features: [
            '140+ lm/W efficiency',
            'IP67 rating',
            'IK10 impact resistance',
            'Multiple beam distributions',
            'Flicker-free operation'
          ],
          specifications: {
            cct: ['4000K', '5000K'],
            cri: '>80',
            efficiency: '140+ lm/W',
            warranty: '5 years',
            certifications: ['UL Listed', 'DLC Premium', 'IK10', 'IP67'],
            operating_temp: '-40°F to 122°F',
            lifespan: 'L70 >100,000 hours',
            dimensions: ['Rugged design'],
            mounting: ['Yoke mount', 'Slip fitter']
          }
        }
      },
      
      applications: {
        'parking_lot': {
          recommended_products: ['ot-series', 'plb-series'],
          key_considerations: ['Coverage area', 'Pole height', 'Security requirements', 'Energy efficiency'],
          common_challenges: ['Dark spots', 'Over-lighting', 'High energy costs', 'Maintenance access'],
          success_metrics: ['Uniform illumination', 'Energy savings', 'Reduced maintenance', 'Enhanced security']
        },
        'warehouse': {
          recommended_products: ['ins-series', 'isf-series'],
          key_considerations: ['Ceiling height', 'Aisle width', 'Task requirements', 'Operational hours'],
          common_challenges: ['Shadow areas', 'Glare control', 'Energy costs', 'Installation disruption'],
          success_metrics: ['Productivity improvement', 'Safety enhancement', 'Energy reduction', 'ROI achievement']
        },
        'sports_facility': {
          recommended_products: ['isf-series', 'ins-series'],
          key_considerations: ['Sport type', 'Competition level', 'TV broadcasting', 'Spectator comfort'],
          common_challenges: ['Glare control', 'Uniform illumination', 'Light spillage', 'Player performance'],
          success_metrics: ['Lighting uniformity', 'Glare reduction', 'Energy efficiency', 'Broadcast quality']
        }
      },
      
      competitors: {
        'lithonia': {
          strengths: ['Brand recognition', 'Wide distribution', 'Product variety'],
          weaknesses: ['Higher prices', 'Lower efficiency', 'Complex ordering'],
          pricing_position: 'Premium',
          our_advantages: ['Better efficiency', 'Direct pricing', 'Faster delivery', 'Superior warranty']
        },
        'cree': {
          strengths: ['Technology reputation', 'Innovation', 'Quality perception'],
          weaknesses: ['Very high prices', 'Limited availability', 'Long lead times'],
          pricing_position: 'Premium+',
          our_advantages: ['Much better value', 'Immediate availability', 'Same quality', 'Better support']
        },
        'cooper_eaton': {
          strengths: ['Market presence', 'Established channels', 'Product range'],
          weaknesses: ['Legacy thinking', 'Slower innovation', 'Higher costs'],
          pricing_position: 'Premium',
          our_advantages: ['Modern approach', 'Better efficiency', 'Competitive pricing', 'Agile service']
        }
      }
    }
  }

  /**
   * Generate Alex's personalized system prompt based on client profile
   */
  generatePersonalizedPrompt(
    clientProfile: ClientProfile, 
    companyIntel?: CompanyIntelligence,
    conversationContext?: string
  ): string {
    const strategy = AdaptiveSalesStrategy.generateStrategy(clientProfile, companyIntel)
    
    const basePersona = `You are Alex, an elite AI Sales Representative at Auvolar - the most advanced lighting sales AI in the industry. You combine three expert roles:

🔬 **TECHNICAL EXPERT**: Deep lighting engineering knowledge, photometric analysis, energy calculations
💼 **SALES MASTER**: Advanced negotiation, objection handling, relationship building
🤝 **PARTNERSHIP BUILDER**: Long-term relationship focus, consultative approach, trust establishment

═══════════════════════════════════════
CURRENT CLIENT INTELLIGENCE
═══════════════════════════════════════`

    let clientIntel = ''
    if (clientProfile.name) {
      clientIntel += `\n👤 **Client**: ${clientProfile.name}`
    }
    if (clientProfile.position) {
      clientIntel += `\n💼 **Role**: ${clientProfile.position}`
    }
    if (clientProfile.company) {
      clientIntel += `\n🏢 **Company**: ${clientProfile.company}`
    }
    if (companyIntel) {
      clientIntel += `\n🏭 **Industry**: ${companyIntel.industry}`
      clientIntel += `\n📏 **Size**: ${companyIntel.size}`
      if (companyIntel.painPoints.length > 0) {
        clientIntel += `\n⚠️ **Pain Points**: ${companyIntel.painPoints.join(', ')}`
      }
    }

    const strategySection = `
═══════════════════════════════════════
ADAPTIVE STRATEGY FOR THIS CLIENT
═══════════════════════════════════════
🎯 **Communication Style**: ${strategy.tone} (${strategy.approach})
📋 **Priorities**: ${strategy.priorities.join(', ')}
🛠️ **Tactics**: ${strategy.tactics.join(', ')}

**Role-Based Approach**: ${this.getRoleBasedGuidance(clientProfile.position || '')}
`

    const productKnowledgeSection = `
═══════════════════════════════════════
COMPLETE PRODUCT KNOWLEDGE
═══════════════════════════════════════

## OT SERIES AREA LIGHTS (Parking/Walkway/Perimeter)
- **Power Options**: 100W-480W ($149-$399)
- **Efficiency**: 130-140 lm/W 
- **Applications**: Parking lots, walkways, security lighting
- **Key Features**: Type III/IV/V optics, 5-year warranty, DLC Premium
- **Competitive Edge**: 20% more efficient than Lithonia at 30% less cost

## PLB SERIES PARKING LOT LIGHTS  
- **Power Options**: 100W-320W ($139-$269)
- **Efficiency**: 130+ lm/W
- **Applications**: Parking lots, roadways, commercial areas
- **Key Features**: Compact shoebox design, photocell ready
- **Competitive Edge**: Direct replacement for legacy fixtures

## ISF SERIES STADIUM LIGHTS (Professional Sports)
- **Power Options**: 400W-1800W ($499-$1,899)
- **Efficiency**: 140+ lm/W
- **Applications**: Sports facilities, stadium lighting, large areas
- **Key Features**: Professional optics, advanced thermal management
- **Competitive Edge**: Broadcast-quality lighting at 40% less than Cree

## INS SERIES STADIUM LIGHTS (Heavy Duty)
- **Power Options**: 300W-1800W ($399-$1,899) 
- **Efficiency**: 140+ lm/W
- **Applications**: Sports, high-mast, industrial
- **Key Features**: IP67/IK10 rating, multiple beam angles
- **Competitive Edge**: Most rugged fixture in class

## UNIVERSAL ADVANTAGES
✅ **Warranty**: 5 years (industry-leading)
✅ **Efficiency**: 130-140+ lm/W (top-tier performance)
✅ **Certifications**: UL Listed, DLC Premium (rebate eligible)
✅ **Availability**: Ships same day from California
✅ **Support**: Direct technical support, no middleman
✅ **Pricing**: 20-40% less than Cree/Lithonia with same quality
`

    const salesProcessSection = `
═══════════════════════════════════════
INTELLIGENT SALES PROCESS
═══════════════════════════════════════

## DISCOVERY SEQUENCE
1. **Company Intelligence**: "What's your company name and website so I can understand your business better?"
2. **Role Analysis**: "What's your role there?" (Adapt strategy based on position)
3. **Project Scope**: "Tell me about your lighting project - what area and challenges?"
4. **Pain Point Exploration**: Use SPIN methodology to uncover needs

## RECOMMENDATION ENGINE
- Match products to specific applications
- Calculate ROI and payback periods  
- Identify rebate opportunities
- Compare against competitors mentioned
- Suggest complementary products/accessories

## OBJECTION HANDLING MATRIX
**"Too expensive"** → ROI calculator, rebate analysis, TCO comparison
**"Need to compare"** → Competitive analysis, unique value props
**"Not ready yet"** → Timeline exploration, planning assistance
**"Unknown brand"** → Quality certifications, case studies, warranty confidence

## CLOSING STRATEGIES
- **Assumptive**: "For your 50,000 sq ft warehouse, we're looking at 24 of the ISF-800W..."
- **Alternative**: "Would you prefer 4000K or 5000K for this application?"
- **Urgency**: "We have these in stock, shipping today. Cree has 6-week lead times."
- **Summary**: "Let me recap the savings: $12K annually in energy, $8K in rebates, minimal maintenance..."

## PARTNERSHIP DEVELOPMENT
- Focus on long-term relationship value
- Offer ongoing technical support
- Suggest phased implementation approaches
- Position as lighting consultant, not just vendor
`

    const contextSection = conversationContext ? `
═══════════════════════════════════════
CONVERSATION CONTEXT
═══════════════════════════════════════
${conversationContext}
` : ''

    const responseGuidelines = `
═══════════════════════════════════════
RESPONSE GUIDELINES
═══════════════════════════════════════
- **Tone**: ${strategy.tone} - match their communication style
- **Length**: Be concise but thorough - respect their time
- **Value**: Every response should educate or move toward solution
- **Questions**: Always end with engaging question to continue dialogue
- **Confidence**: You're the expert - be authoritative but consultative

**Success Metrics**: Build trust → Identify needs → Present solutions → Handle objections → Close partnership

Remember: You're not just selling lights - you're solving business problems and building lasting partnerships. Every interaction should reinforce your expertise and trustworthiness.`

    return `${basePersona}${clientIntel}${strategySection}${productKnowledgeSection}${salesProcessSection}${contextSection}${responseGuidelines}`
  }

  private getRoleBasedGuidance(position: string): string {
    const role = position.toLowerCase()
    
    if (role.includes('facilities') || role.includes('maintenance')) {
      return "Focus on reliability, maintenance savings, warranty coverage. Emphasize 5-year warranty and 100K+ hour lifespan."
    }
    if (role.includes('procurement') || role.includes('purchasing')) {
      return "Lead with competitive pricing, volume discounts, delivery reliability. Provide detailed specs for comparison."
    }
    if (role.includes('engineer') || role.includes('technical')) {
      return "Deep-dive into technical specs, photometrics, installation details. Share IES files and cut sheets."
    }
    if (role.includes('cfo') || role.includes('finance')) {
      return "ROI analysis, payback calculations, rebate maximization. Frame as investment with measurable returns."
    }
    if (role.includes('manager') || role.includes('director')) {
      return "Business impact focus - productivity, safety, cost reduction. Position as strategic solution."
    }
    
    return "Balanced approach - understand their priorities first, then adapt strategy accordingly."
  }

  /**
   * Generate product recommendations based on application
   */
  getProductRecommendations(application: string, requirements?: any): {
    primary: string[]
    alternative: string[]
    reasoning: string
  } {
    const app = application.toLowerCase()
    
    if (app.includes('parking') || app.includes('lot')) {
      return {
        primary: ['ot-series', 'plb-series'],
        alternative: ['ins-series'],
        reasoning: "OT and PLB series are specifically designed for parking lot applications with optimal Type III/IV/V distributions for uniform coverage and minimal glare."
      }
    }
    
    if (app.includes('warehouse') || app.includes('industrial') || app.includes('manufacturing')) {
      return {
        primary: ['ins-series', 'isf-series'],
        alternative: ['ot-series'],
        reasoning: "High-bay applications require the power and precision optics of ISF/INS series for uniform illumination at height."
      }
    }
    
    if (app.includes('sports') || app.includes('stadium') || app.includes('field')) {
      return {
        primary: ['isf-series'],
        alternative: ['ins-series'],
        reasoning: "ISF series provides broadcast-quality illumination with precise beam control required for professional sports lighting."
      }
    }
    
    return {
      primary: ['ot-series'],
      alternative: ['plb-series', 'ins-series'],
      reasoning: "OT series offers versatile solutions for most outdoor commercial lighting applications."
    }
  }

  /**
   * Calculate ROI and savings for client
   */
  calculateROI(currentWattage: number, newWattage: number, hours: number, rate: number = 0.12): {
    annualSavings: number
    paybackPeriod: number
    tenYearSavings: number
  } {
    const annualKwh = (currentWattage - newWattage) * hours * 365 / 1000
    const annualSavings = annualKwh * rate
    const productCost = this.estimateProductCost(newWattage)
    const paybackPeriod = productCost / annualSavings
    const tenYearSavings = annualSavings * 10 - productCost
    
    return { annualSavings, paybackPeriod, tenYearSavings }
  }

  private estimateProductCost(watts: number): number {
    if (watts <= 150) return 179
    if (watts <= 240) return 239  
    if (watts <= 400) return 499
    if (watts <= 800) return 899
    return 1299
  }
}