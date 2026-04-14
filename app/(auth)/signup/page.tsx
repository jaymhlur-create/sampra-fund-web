"use client";

import { useState, useEffect } from "react";
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
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect logged-in users away from signup page
  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  const handleSignup = async () => {
    try {
      await signUp(email, password);

      alert("Check your email for confirmation!");

      // Note: Only redirect if email confirmation is disabled in Supabase settings
      // router.replace("/dashboard");

    } catch (error) {
      alert(error instanceof Error ? error.message : "Signup failed");
    }
  };

  if (loading) return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  if (user) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 overflow-y-auto min-h-screen">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* Signup card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-8 space-y-6">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-white tracking-tight">Create Account</h1>
            <p className="text-slate-400 text-sm">Join us and start exploring</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              />
            </div>
          </div>

          {/* Signup Button */}
          <button
            onClick={handleSignup}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            Create Account
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800/50 text-slate-400">Already a member?</span>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-slate-400 text-sm">
              Already have an account?{' '}
              <a href="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200">
                Sign in
              </a>
            </p>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center text-slate-500 text-xs mt-6">
          By creating an account, you agree to our terms of service
        </p>
      </div>
    </div>
  );
}
