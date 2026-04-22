"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Password updated successfully!");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 flex-shrink-0">
              <img src="/sampra-logo.svg" alt="Sampra Logo" />
            </div>

            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900">sampra</h1>
              <p className="text-xs text-gray-500 font-medium">
                DEVELOPMENT FUND
              </p>
            </div>
          </Link>

          <Link
            href="/signup"
            className="text-sm font-semibold text-black bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-full transition-colors"
          >
            SIGN UP
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex items-center justify-center px-4 py-12 lg:py-20">

        <div className="w-full max-w-md">

          <div className="bg-white border border-gray-100 rounded-2xl shadow-md p-8 space-y-6">

            {/* Header */}
            <div className="space-y-2 text-center">
              <h1 className="text-4xl font-bold text-gray-900">
                Reset Password
              </h1>
              <p className="text-gray-600 text-base">
                Enter your new password below
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleReset} className="space-y-4">

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Updating..." : "Reset Password"}
              </button>
            </form>

            {/* Message */}
            {message && (
              <p className="text-sm text-center text-gray-600">
                {message}
              </p>
            )}

            {/* Back to login */}
            <div className="text-center">
              <Link
                href="/login"
                className="text-sm text-black hover:text-yellow-500 font-medium transition-colors"
              >
                Back to login
              </Link>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}