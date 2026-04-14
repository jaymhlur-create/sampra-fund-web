'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react'
import { signIn } from '@/src/lib/auth'
import { useAuth } from '@/src/context/AuthContext'

/**
 * Login Page
 * Route: /login
 *
 * CLEAN SAAS FLOW:
 * - Users land here from landing page
 * - Users manually sign in
 * - No auto-redirect loop
 */

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { user, loading } = useAuth()
  const router = useRouter()

  // NOTE: Removed auto-redirect to /dashboard to fix landing page flow

  const handleLogin = async () => {
    try {
      await signIn(email, password)
      router.replace('/dashboard')
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Login failed')
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // If already logged in, show redirect state (no auto push)
  if (user) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white">You're already signed in...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 overflow-y-auto min-h-screen">

      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md">

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-8 space-y-6">

          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Welcome Back
            </h1>
            <p className="text-slate-400 text-sm">
              Sign in to your SAMPRA FUND account
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          {/* Login button */}
          <button
            onClick={handleLogin}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800/50 text-slate-400">
                New to SAMPRA FUND?
              </span>
            </div>
          </div>

          {/* Signup link */}
          <div className="text-center">
            <a
              href="/signup"
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              Create an account
            </a>
          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-xs mt-6">
          By signing in, you agree to our terms of service
        </p>

      </div>
    </div>
  )
}