'use client'

import { useState, Suspense } from 'react'
import { Eye, EyeOff, ArrowRight, Zap, Building2, Truck, FileText, DollarSign, Shield } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/portal'
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Left side — Branding & Benefits */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 flex-col justify-center px-16 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 border border-yellow-400 rounded-full" />
          <div className="absolute bottom-40 right-10 w-96 h-96 border border-yellow-400 rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 border border-yellow-400 rounded-full" />
        </div>

        <div className="relative z-10 max-w-lg">
          <Link href="/" className="flex items-center gap-3 mb-12">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400">
              <Zap className="h-7 w-7 text-black" />
            </div>
            <span className="text-3xl font-bold text-white tracking-tight">Auvolar</span>
          </Link>

          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            The smarter way to buy<br />
            <span className="text-yellow-400">commercial LED lighting</span>
          </h1>
          <p className="text-gray-400 text-lg mb-12">
            Join thousands of contractors and facility managers who save up to 70% on commercial lighting.
          </p>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-white font-medium">Wholesale Pricing</p>
                <p className="text-gray-500 text-sm">Contractor and distributor volume discounts</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-white font-medium">Same-Day Shipping</p>
                <p className="text-gray-500 text-sm">In-stock orders ship from California warehouse</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-white font-medium">Net 30 Payment Terms</p>
                <p className="text-gray-500 text-sm">Available for qualified business accounts</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-white font-medium">5-Year Warranty</p>
                <p className="text-gray-500 text-sm">DLC Premium certified, UL/ETL listed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side — Sign In Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16 bg-white">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-400">
              <Zap className="h-6 w-6 text-black" />
            </div>
            <span className="text-2xl font-bold">Auvolar</span>
          </Link>

          <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h2>
          <p className="text-gray-500 mb-8">Sign in to access your account and orders</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all text-sm"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all text-sm pr-10"
                  placeholder="••••••••"
                />
                <button type="button" tabIndex={-1} onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-400"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <Link href="/support" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-3 text-gray-400">New to Auvolar?</span>
            </div>
          </div>

          {/* Register CTA */}
          <Link
            href="/register"
            className="block w-full py-3 px-4 border-2 border-gray-900 rounded-lg text-sm font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition-all text-center mb-4"
          >
            Create a Free Account
          </Link>

          {/* Contractor CTA — prominent */}
          <Link
            href="/register?type=contractor"
            className="flex items-center justify-center gap-3 w-full py-3.5 px-4 bg-gray-900 rounded-lg text-white hover:bg-gray-800 transition-all group"
          >
            <Building2 className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-semibold">Apply for a Contractor Account</span>
            <ArrowRight className="w-4 h-4 text-yellow-400 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-xs text-gray-400 text-center mt-3">
            Contractors & electricians get exclusive pricing, Net 30 terms, and dedicated support
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-gray-400">Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
