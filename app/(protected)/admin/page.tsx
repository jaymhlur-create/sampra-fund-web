"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import { getAllProfiles, updateUserRole, GOD_ADMIN_EMAIL } from "@/src/lib/auth";

interface Profile {
  id: string;
  email: string;
  role: "user" | "admin";
  created_at: string;
}

/**
 * Admin Dashboard
 * Route: /admin
 * Protected: Requires isAdmin === true
 * 
 * Features:
 * - List all users and their roles
 * - Promote users to admin
 * - God Admin is highlighted and cannot be demoted
 * - Redirects non-admin users to dashboard
 */
export default function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoadingProfiles, setIsLoadingProfiles] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Redirect non-admin users
  useEffect(() => {
    if (!loading && !isAdmin) {
      router.replace("/dashboard");
    }
  }, [isAdmin, loading, router]);

  // Fetch all profiles
  useEffect(() => {
    if (isAdmin && !loading) {
      const fetchProfiles = async () => {
        try {
          console.log('🔄 Fetching profiles...');
          const data = await getAllProfiles();
          console.log('✅ Profiles fetched successfully:', data?.length || 0, 'profiles');
          setProfiles(data || []);
          setError(null);
        } catch (err) {
          const errorMsg = err instanceof Error ? err.message : 'Failed to load profiles';
          console.error('❌ Error fetching profiles:', err);
          setError(errorMsg);
          setProfiles([]);
        } finally {
          setIsLoadingProfiles(false);
        }
      };

      fetchProfiles();
    }
  }, [isAdmin, loading]);

  const handleMakeAdmin = async (userId: string, email: string) => {
    // Prevent God Admin edit
    if (email === GOD_ADMIN_EMAIL) {
      setError("Cannot modify God Admin");
      return;
    }

    setActionLoading(userId);
    try {
      await updateUserRole(userId, "admin");
      // Refresh profiles list
      const data = await getAllProfiles();
      setProfiles(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update role");
    } finally {
      setActionLoading(null);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Redirect non-admins (this will redirect in useEffect, but show loading for UX)
  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 text-sm mt-1">Manage users and applications</p>
          </div>
          <Link
            href="/dashboard"
            className="text-sm text-yellow-400 hover:text-yellow-500 font-semibold transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-8 border-b border-gray-200 mb-8">
          <div className="px-0 py-3 border-b-2 border-yellow-400 text-gray-900 font-bold text-sm">
            Users & Roles
          </div>
          <Link
            href="/admin/applications"
            className="px-0 py-3 text-gray-600 hover:text-gray-900 font-semibold text-sm transition-colors"
          >
            Applications
          </Link>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm font-semibold">{error}</p>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          {isLoadingProfiles ? (
            <div className="p-8 text-center">
              <div className="spinner h-8 w-8 border-4 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading users...</p>
            </div>
          ) : profiles.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">No users found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-100 bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Created
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {profiles.map((profile) => {
                    const isGodAdmin = profile.email === GOD_ADMIN_EMAIL;
                    const isAlreadyAdmin = profile.role === "admin";

                    return (
                      <tr
                        key={profile.id}
                        className={`${
                          isGodAdmin ? "bg-yellow-50" : ""
                        } hover:bg-gray-50 transition-colors`}
                      >
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {profile.email}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                isAlreadyAdmin
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {isAlreadyAdmin ? "Admin" : "User"}
                            </span>
                            {isGodAdmin && (
                              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-200 text-yellow-900">
                                GOD ADMIN
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(profile.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {isGodAdmin ? (
                            <span className="text-gray-500 text-xs">
                              Protected
                            </span>
                          ) : isAlreadyAdmin ? (
                            <span className="text-gray-500 text-xs">
                              Already admin
                            </span>
                          ) : (
                            <button
                              onClick={() =>
                                handleMakeAdmin(profile.id, profile.email)
                              }
                              disabled={actionLoading === profile.id}
                              className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-xs font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {actionLoading === profile.id
                                ? "Updating..."
                                : "Make Admin"}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
          <p className="text-gray-600 text-sm">Total Users</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{profiles.length}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
          <p className="text-gray-600 text-sm">Admins</p>
          <p className="text-2xl font-bold text-yellow-500 mt-2">
            {profiles.filter((p) => p.role === "admin").length}
          </p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
          <p className="text-gray-600 text-sm">Regular Users</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {profiles.filter((p) => p.role === "user").length}
          </p>
        </div>
      </div>
    </main>
  </div>
  );
}
