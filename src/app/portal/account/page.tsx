'use client'

import { useState, useEffect } from 'react'
import { Loader2, Award, TrendingUp, Gift, Shield, Truck, Users, CreditCard, Star, ChevronRight } from 'lucide-react'

interface AccountData {
  tier: { current: string; label: string; color: string; discount: number; rewardRate: number }
  progress: { percent: number; totalSpent: number; amountToNext: number; nextTier: string | null }
  rewards: { balance: number; history: { id: string; type: string; amount: number; description: string; date: string }[] }
  benefits: { discount: string; rewardRate: string; freeShipping: string; prioritySupport: boolean; dedicatedRep: boolean; netTerms: string | null }
}

const TIER_ICONS: Record<string, string> = { BRONZE: '🥉', SILVER: '🥈', GOLD: '🥇', PLATINUM: '💎' }
const TIER_GRADIENT: Record<string, string> = {
  BRONZE: 'from-amber-600 to-amber-800',
  SILVER: 'from-gray-400 to-gray-600',
  GOLD: 'from-yellow-400 to-yellow-600',
  PLATINUM: 'from-gray-200 to-gray-400',
}

export default function AccountPage() {
  const [data, setData] = useState<AccountData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/portal/account')
      .then(r => r.json())
      .then(d => { if (!d.error) setData(d) })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-6 w-6 animate-spin text-brand" /><span className="ml-2 text-gray-500">Loading account...</span>
    </div>
  )

  if (!data) return (
    <div className="text-center py-20">
      <Award className="h-16 w-16 mx-auto mb-4 text-gray-300" />
      <p className="text-gray-500">Unable to load account information.</p>
    </div>
  )

  const { tier, progress, rewards, benefits } = data

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold">My Account</h1>
        <p className="text-gray-500 text-sm mt-1">Your tier status, rewards, and benefits</p>
      </div>

      {/* Tier Card */}
      <div className={`rounded-2xl bg-gradient-to-br ${TIER_GRADIENT[tier.current] || TIER_GRADIENT.BRONZE} p-6 text-white relative overflow-hidden`}>
        <div className="absolute top-4 right-4 text-6xl opacity-20">{TIER_ICONS[tier.current]}</div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{TIER_ICONS[tier.current]}</span>
            <div>
              <h2 className="text-3xl font-bold">{tier.label} Member</h2>
              <p className="text-white/80 text-sm">{tier.discount}% discount on all orders</p>
            </div>
          </div>

          {/* Progress Bar */}
          {progress.nextTier && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/80">Progress to {progress.nextTier}</span>
                <span className="font-semibold">{progress.percent}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div className="bg-white rounded-full h-3 transition-all duration-500" style={{ width: `${progress.percent}%` }} />
              </div>
              <p className="text-white/70 text-xs mt-2">
                Spend ${progress.amountToNext.toLocaleString()} more to reach {progress.nextTier}
              </p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold">${progress.totalSpent.toLocaleString()}</p>
              <p className="text-xs text-white/70">Total Spent</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold">{tier.discount}%</p>
              <p className="text-xs text-white/70">Your Discount</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold">${rewards.balance.toFixed(2)}</p>
              <p className="text-xs text-white/70">Reward Balance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Star className="h-5 w-5 text-brand" /> Your Benefits</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <BenefitItem icon={CreditCard} title="Order Discount" desc={benefits.discount} active />
          <BenefitItem icon={Gift} title="Cashback Rewards" desc={benefits.rewardRate} active />
          <BenefitItem icon={Truck} title="Shipping" desc={benefits.freeShipping} active />
          <BenefitItem icon={Shield} title="Priority Support" desc="Faster response times" active={benefits.prioritySupport} />
          <BenefitItem icon={Users} title="Dedicated Rep" desc="Personal account manager" active={benefits.dedicatedRep} />
          <BenefitItem icon={TrendingUp} title="Net Terms" desc={benefits.netTerms || 'Prepay / Credit Card'} active={!!benefits.netTerms} />
        </div>
      </div>

      {/* Tier Comparison */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="font-bold text-lg mb-4">Tier Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">Benefit</th>
                <th className="text-center py-2 px-3">🥉 Bronze</th>
                <th className="text-center py-2 px-3">🥈 Silver</th>
                <th className="text-center py-2 px-3">🥇 Gold</th>
                <th className="text-center py-2 px-3">💎 Platinum</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b"><td className="py-2 pr-4 text-gray-600">Annual Spend</td><td className="text-center">$0+</td><td className="text-center">$5K+</td><td className="text-center">$25K+</td><td className="text-center">$100K+</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 text-gray-600">Discount</td><td className="text-center">0%</td><td className="text-center">5%</td><td className="text-center">10%</td><td className="text-center">15%</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 text-gray-600">Cashback</td><td className="text-center">1%</td><td className="text-center">1.5%</td><td className="text-center">2%</td><td className="text-center">2.5%</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 text-gray-600">Free Shipping</td><td className="text-center">$500+</td><td className="text-center">$500+</td><td className="text-center">All</td><td className="text-center">All</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 text-gray-600">Priority Support</td><td className="text-center text-gray-300">—</td><td className="text-center text-gray-300">—</td><td className="text-center text-green-600">✓</td><td className="text-center text-green-600">✓</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 text-gray-600">Dedicated Rep</td><td className="text-center text-gray-300">—</td><td className="text-center text-gray-300">—</td><td className="text-center text-gray-300">—</td><td className="text-center text-green-600">✓</td></tr>
              <tr><td className="py-2 pr-4 text-gray-600">Net Terms</td><td className="text-center text-gray-300">—</td><td className="text-center text-gray-300">—</td><td className="text-center">Net 30</td><td className="text-center">Net 60</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Rewards History */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Gift className="h-5 w-5 text-brand" /> Rewards History</h3>
        {rewards.history.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No rewards activity yet. Rewards are earned on every order.</p>
        ) : (
          <div className="divide-y">
            {rewards.history.map(r => (
              <div key={r.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{r.description}</p>
                  <p className="text-xs text-gray-400">{new Date(r.date).toLocaleDateString()}</p>
                </div>
                <span className={`font-bold text-sm ${r.type === 'EARNED' ? 'text-green-600' : r.type === 'REDEEMED' ? 'text-red-600' : 'text-gray-500'}`}>
                  {r.type === 'EARNED' ? '+' : '-'}${Math.abs(r.amount).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function BenefitItem({ icon: Icon, title, desc, active }: { icon: any; title: string; desc: string; active: boolean }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border ${active ? 'border-green-200 bg-green-50' : 'border-gray-100 bg-gray-50 opacity-50'}`}>
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${active ? 'bg-green-100' : 'bg-gray-200'}`}>
        <Icon className={`h-4 w-4 ${active ? 'text-green-600' : 'text-gray-400'}`} />
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>
    </div>
  )
}
