import { Suspense } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Bot, Users, TrendingUp, MessageCircle, Target, 
  Brain, ChevronRight, Star, Activity, Globe,
  Clock, DollarSign, Award, AlertCircle
} from 'lucide-react'

// Mock data - in production this would come from database
const mockData = {
  overview: {
    totalSessions: 156,
    activeProfiles: 89,
    avgEngagement: 73.5,
    conversionRate: 12.8,
    topIndustries: ['Manufacturing', 'Retail', 'Healthcare', 'Warehouse'],
    recentGrowth: '+23% this week'
  },
  clients: [
    {
      id: '1',
      name: 'John Smith',
      company: 'ABC Manufacturing',
      industry: 'Manufacturing',
      interestLevel: 'high',
      communicationStyle: 'analytical',
      estimatedValue: '$25K-50K',
      leadScore: 85,
      lastActive: '2 hours ago',
      totalMessages: 12,
      avgEngagement: 89
    },
    {
      id: '2', 
      name: 'Sarah Johnson',
      company: 'RetailCorp',
      industry: 'Retail',
      interestLevel: 'medium',
      communicationStyle: 'relationship',
      estimatedValue: '$5K-25K',
      leadScore: 68,
      lastActive: '1 day ago',
      totalMessages: 8,
      avgEngagement: 76
    },
    {
      id: '3',
      name: 'Mike Davis',
      company: 'TechStart Inc',
      industry: 'Technology',
      interestLevel: 'high',
      communicationStyle: 'direct',
      estimatedValue: '$10K-25K', 
      leadScore: 92,
      lastActive: '30 minutes ago',
      totalMessages: 18,
      avgEngagement: 94
    }
  ],
  strategies: [
    {
      strategy: 'Technical Deep-Dive',
      industry: 'Manufacturing',
      effectiveness: 0.87,
      timesUsed: 24,
      conversionRate: 0.23,
      bestFor: 'Engineers, Technical Managers'
    },
    {
      strategy: 'ROI-Focused',
      industry: 'Retail',
      effectiveness: 0.79,
      timesUsed: 18,
      conversionRate: 0.19,
      bestFor: 'CFOs, Finance Directors'
    },
    {
      strategy: 'Relationship Building',
      industry: 'Healthcare',
      effectiveness: 0.72,
      timesUsed: 15,
      conversionRate: 0.15,
      bestFor: 'Facilities Managers, Directors'
    }
  ],
  learning: {
    totalInteractions: 1247,
    modelAccuracy: 0.89,
    predictionConfidence: 0.82,
    learningRate: '+5.2% improvement this month',
    recentInsights: [
      'Clients mentioning "energy savings" convert 34% more often',
      'Technical documentation sharing increases engagement by 28%',
      'Voice messages lead to 42% longer conversations',
      'Images of current lighting problems boost response rate by 67%'
    ]
  }
}

export default function AIAnalyticsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Bot className="h-8 w-8 text-blue-600" />
            AI Sales Analytics
          </h1>
          <p className="text-gray-600 mt-1">
            Monitor Alex's learning progress and client intelligence
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Brain className="h-4 w-4" />
          Retrain Model
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.overview.totalSessions}</div>
            <p className="text-xs text-muted-foreground">
              {mockData.overview.recentGrowth}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Profiles</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.overview.activeProfiles}</div>
            <p className="text-xs text-muted-foreground">
              Qualified leads
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.overview.avgEngagement}%</div>
            <p className="text-xs text-muted-foreground">
              Client interest score
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.overview.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              Lead to opportunity
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="clients" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="clients">Client Profiles</TabsTrigger>
          <TabsTrigger value="strategies">AI Strategies</TabsTrigger>
          <TabsTrigger value="learning">Learning Insights</TabsTrigger>
          <TabsTrigger value="industry">Industry Intel</TabsTrigger>
        </TabsList>

        {/* Client Profiles Tab */}
        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Recent Client Interactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.clients.map((client) => (
                  <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="font-medium text-blue-700">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">{client.name}</h3>
                        <p className="text-sm text-gray-600">{client.company} • {client.industry}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={client.interestLevel === 'high' ? 'default' : 'secondary'}>
                            {client.interestLevel} interest
                          </Badge>
                          <Badge variant="outline">{client.communicationStyle}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{client.estimatedValue}</div>
                      <div className="text-sm text-gray-500">Score: {client.leadScore}</div>
                      <div className="text-xs text-gray-400">{client.lastActive}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <MessageCircle className="h-3 w-3" />
                        <span className="text-xs">{client.totalMessages} msgs</span>
                        <span className="text-xs">• {client.avgEngagement}% engaged</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Strategies Tab */}
        <TabsContent value="strategies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Strategy Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.strategies.map((strategy, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{strategy.strategy}</h3>
                      <Badge variant="outline">{strategy.industry}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Effectiveness</span>
                        <div className="flex items-center gap-2">
                          <div className="text-lg font-bold">{Math.round(strategy.effectiveness * 100)}%</div>
                          <div className="flex">
                            {[1,2,3,4,5].map(i => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${i <= strategy.effectiveness * 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Usage</span>
                        <div className="text-lg font-bold">{strategy.timesUsed}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Conversion</span>
                        <div className="text-lg font-bold">{Math.round(strategy.conversionRate * 100)}%</div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-xs text-gray-500">Best for: </span>
                      <span className="text-xs">{strategy.bestFor}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Learning Insights Tab */}
        <TabsContent value="learning" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Learning Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Model Accuracy</span>
                  <span className="font-bold">{Math.round(mockData.learning.modelAccuracy * 100)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Prediction Confidence</span>
                  <span className="font-bold">{Math.round(mockData.learning.predictionConfidence * 100)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total Interactions</span>
                  <span className="font-bold">{mockData.learning.totalInteractions.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t">
                  <Badge variant="outline" className="text-green-700 bg-green-50">
                    {mockData.learning.learningRate}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Recent Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockData.learning.recentInsights.map((insight, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{insight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Industry Intelligence Tab */}
        <TabsContent value="industry" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Industry Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockData.overview.topIndustries.map((industry, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">{industry}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Active Clients</span>
                        <span className="font-medium">{12 + idx * 3}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg Deal Size</span>
                        <span className="font-medium">${(25 + idx * 10)}K</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conversion Rate</span>
                        <span className="font-medium">{18 - idx * 2}%</span>
                      </div>
                      <div className="pt-2 border-t">
                        <span className="text-xs text-gray-500">Key Pain Points:</span>
                        <div className="text-xs mt-1">Energy costs, maintenance, compliance</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Clock className="h-4 w-4 mr-2" />
              Schedule Follow-ups
            </Button>
            <Button variant="outline" size="sm">
              <DollarSign className="h-4 w-4 mr-2" />
              Generate Revenue Report
            </Button>
            <Button variant="outline" size="sm">
              <Bot className="h-4 w-4 mr-2" />
              Update AI Training
            </Button>
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Export Client Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}