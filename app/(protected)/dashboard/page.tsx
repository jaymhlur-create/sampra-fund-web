"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import { signOut } from "@/src/lib/auth";

/**
 * Dashboard Page
 * Route: /dashboard
 * Protected route: Requires authentication
 * 
 * Features:
 * - Redirects unauthenticated users to /login
 * - Shows loading state while auth context initializes
 * - Displays user information, role, and welcome message
 * - Provides logout functionality
 * - Admin users can access admin panel
 * - Logs out user and redirects to /login on logout
 */
export default function DashboardPage() {
  const { user, role, isAdmin, loading } = useAuth();
  const router = useRouter();

  // Redirect unauthenticated users to login page
  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoToAdmin = () => {
    router.push("/admin");
  };

  const handleStartApplication = () => {
    router.push("/apply");
  };

  const handleViewApplications = () => {
    router.push("/dashboard/applications");
  };

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Dashboard</h1>
            <p className="text-slate-400 mt-2">Welcome back to your account</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        {/* User Info Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-8 mb-8">
          <h2 className="text-lg font-semibold text-slate-200 mb-6">
            Account Information
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Email */}
            <div>
              <p className="text-slate-400 text-sm mb-2">Email Address</p>
              <p className="text-white font-medium break-all">{user.email}</p>
            </div>

            {/* Role */}
            <div>
              <p className="text-slate-400 text-sm mb-2">Account Role</p>
              <div className="flex items-center gap-2">
                <span
                  className={`px-4 py-2 rounded-lg font-medium ${
                    isAdmin
                      ? "bg-blue-500/30 text-blue-300"
                      : "bg-slate-600/50 text-slate-300"
                  }`}
                >
                  {isAdmin ? "📌 Admin" : "👤 User"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-3">
            Welcome back! 👋
          </h2>
          <p className="text-slate-300">
            You're logged in as <span className="font-semibold">{user.email}</span>
          </p>
          {isAdmin && (
            <p className="text-slate-300 mt-2">
              As an admin, you have access to the admin panel to manage users and
              roles.
            </p>
          )}
        </div>

        {/* Funding Application Section */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 mb-8">
          <h3 className="text-lg font-semibold text-green-300 mb-2">
            💰 Funding Application
          </h3>
          <p className="text-slate-300 mb-4 text-sm">
            Ready to submit your funding application? Start the multi-step application process now.
          </p>
          <button
            onClick={handleStartApplication}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg"
          >
            Start Application →
          </button>
        </div>

        {/* Application Tracking Section */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-8 mb-8">
          <h3 className="text-lg font-semibold text-blue-300 mb-2">
            📋 My Applications
          </h3>
          <p className="text-slate-300 mb-4 text-sm">
            View and track the status of all your submitted funding applications.
          </p>
          <button
            onClick={handleViewApplications}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg"
          >
            View Applications →
          </button>
        </div>

        {/* Admin Panel Link */}
        {isAdmin && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-blue-300 mb-4">
              Admin Controls
            </h3>
            <button
              onClick={handleGoToAdmin}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg"
            >
              Go to Admin Panel →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

