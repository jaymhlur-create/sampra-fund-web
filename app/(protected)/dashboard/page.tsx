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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="spinner h-12 w-12 border-4"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg transition-colors font-semibold"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back! 👋
          </h2>
          <p className="text-gray-600 text-lg">
            You're logged in as <span className="font-semibold text-gray-900">{user.email}</span>
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            Account Information
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Email */}
            <div>
              <p className="text-gray-600 text-sm mb-2 font-semibold">Email Address</p>
              <p className="text-gray-900 font-medium break-all text-lg">{user.email}</p>
            </div>

            {/* Role */}
            <div>
              <p className="text-gray-600 text-sm mb-2 font-semibold">Account Role</p>
              <div className="flex items-center gap-2">
                <span
                  className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                    isAdmin
                      ? "bg-yellow-50 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {isAdmin ? "📌 Admin" : "👤 User"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Actions Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Funding Application Section */}
          <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              💰 Funding Application
            </h3>
            <p className="text-gray-600 mb-6">
              Ready to submit your funding application? Start the multi-step process now.
            </p>
            <button
              onClick={handleStartApplication}
              className="btn-primary"
            >
              Start Application →
            </button>
          </div>

          {/* Application Tracking Section */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              📋 My Applications
            </h3>
            <p className="text-gray-600 mb-6">
              View and track the status of all your submitted funding applications.
            </p>
            <button
              onClick={handleViewApplications}
              className="btn-secondary"
            >
              View Applications →
            </button>
          </div>
        </div>

        {/* Admin Panel Link */}
        {isAdmin && (
          <div className="bg-purple-50 border border-purple-100 rounded-2xl p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              🛡️ Admin Controls
            </h3>
            <p className="text-gray-600 mb-6">
              Access the admin panel to manage users, roles, and system settings.
            </p>
            <button
              onClick={handleGoToAdmin}
              className="btn-primary"
            >
              Go to Admin Panel →
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

