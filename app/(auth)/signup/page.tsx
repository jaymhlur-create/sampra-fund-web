"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { signUp } from "@/src/lib/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";

/**
 * Signup Page
 * Route: /signup
 * 
 * Features:
 * - Allows users to create a new account with email and password
 * - Redirects already logged-in users to /dashboard
 * - Shows confirmation message after signup
 * - Shows loading state while auth context initializes
 * - Note: Email confirmation may be required via Supabase settings
 */
export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect logged-in users away from signup page
  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    setIsLoading(true);
    try {
      await signUp(email, password);
      alert("Check your email for confirmation!");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="spinner h-12 w-12 border-4"></div>
    </div>
  );
  if (user) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 flex-shrink-0">
             <img
              src = "/sampra-logo.svg"
             />
            </div>
             <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-gray-900">sampra</h1>
            <p className="text-xs text-gray-500 font-medium">DEVELOPMENT FUND</p>
          </div>
          </Link>
          <Link href="/login" className="text-sm font-semibold text-gray-900 hover:text-gray-700 transition-colors px-4 py-2">
            LOGIN
          </Link>
        </div>
      </header>

      <main className="flex items-center justify-center px-4 py-12 lg:py-20">
        <div className="w-full max-w-md">
          <div className="bg-white border border-gray-100 rounded-lg p-8 space-y-6 hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="space-y-2 text-center">
              <h1 className="text-4xl font-bold text-gray-900">Create Account</h1>
              <p className="text-gray-600 text-base">Join SAMPRA FUND and start exploring</p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Confirm Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  onKeyPress={(e) => e.key === 'Enter' && handleSignup()}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Signup Button */}
            <button
              onClick={handleSignup}
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-600 font-medium">Already a member?</span>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <Link
                href="/login"
                className="text-yellow-400 hover:text-yellow-500 font-semibold transition-colors"
              >
                Sign in instead
              </Link>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-600 text-xs mt-6">
            By creating an account, you agree to our terms of service
          </p>
        </div>
      </main>
    </div>
  );
}
