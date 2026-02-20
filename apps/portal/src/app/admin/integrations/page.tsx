import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Link2, ShoppingCart, CreditCard, Truck, Bot, Mail } from 'lucide-react'

export default function AdminIntegrationsPage() {
  const integrations = [
    {
      name: 'BigCommerce',
      description: 'Product catalog, orders, and inventory management',
      icon: ShoppingCart,
      status: 'Connected',
      statusColor: 'text-green-600 bg-green-100',
    },
    {
      name: 'OpenAI',
      description: 'AI-powered chat assistant and product recommendations',
      icon: Bot,
      status: 'Connected',
      statusColor: 'text-green-600 bg-green-100',
    },
    {
      name: 'Resend',
      description: 'Transactional emails and notifications',
      icon: Mail,
      status: 'Connected',
      statusColor: 'text-green-600 bg-green-100',
    },
    {
      name: 'Stripe',
      description: 'Payment processing and invoicing',
      icon: CreditCard,
      status: 'Not configured',
      statusColor: 'text-gray-500 bg-gray-100',
    },
    {
      name: 'ShipStation',
      description: 'Shipping labels and tracking',
      icon: Truck,
      status: 'Not configured',
      statusColor: 'text-gray-500 bg-gray-100',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
        <p className="text-gray-600">Manage third-party service connections</p>
      </div>

      <div className="grid gap-4">
        {integrations.map((integration) => (
          <Card key={integration.name}>
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                  <integration.icon className="h-6 w-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                  <p className="text-sm text-gray-500">{integration.description}</p>
                </div>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${integration.statusColor}`}>
                {integration.status}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
