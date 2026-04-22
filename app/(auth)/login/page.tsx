'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { signIn } from '@/src/lib/auth'
import { useAuth } from '@/src/context/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { user, loading } = useAuth()
  const router = useRouter()

  // ✅ FIX: handle redirect safely
  useEffect(() => {
    if (user) {
      router.replace('/dashboard')
    }
  }, [user, router])

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter email and password')
      return
    }

    setIsLoading(true)

    try {
      await signIn(email, password)
      router.replace('/dashboard')
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="spinner h-12 w-12 border-4"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 flex-shrink-0">
              <img src="/sampra-logo.svg" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900">sampra</h1>
              <p className="text-xs text-gray-500 font-medium">DEVELOPMENT FUND</p>
            </div>
          </Link>

          <Link href="/signup" className="text-sm font-semibold text-black bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-full transition-colors">
            SIGN UP
          </Link>
        </div>
      </header>

      <main className="flex items-center justify-center px-4 py-12 lg:py-20">
        <div className="w-full max-w-md">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-md p-8 space-y-6">

            {/* Header */}
            <div className="space-y-2 text-center">
              <h1 className="text-4xl font-bold text-gray-900">
                Welcome Back
              </h1>
              <p className="text-gray-600 text-base">
                Sign in to your SAMPRA FUND account
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging In...' : 'Log In'}
            </button>

            {/* ✅ FIXED LINK */}
            <Link
              href="/auth/forgot-password"
              className="text-sm text-gray-900 hover:text-yellow-500 font-medium transition-colors block text-center"
            >
              Forgot your password?
            </Link>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-600 font-medium">
                  New to SAMPRA FUND?
                </span>
              </div>
            </div>

            {/* Signup Link */}
            <div className="text-center">
              <Link
                href="/signup"
                className="text-yellow-400 hover:text-yellow-500 font-semibold transition-colors"
              >
                Create an account
              </Link>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-600 text-xs mt-6">
            By signing in, you agree to our terms of service
          </p>
        </div>
      </main>
    </div>
  )
}