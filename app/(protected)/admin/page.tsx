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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-slate-400">Manage users and applications</p>
          </div>
          <Link
            href="/dashboard"
            className="text-sm text-slate-400 hover:text-slate-300 transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 border-b border-slate-700/50">
          <div className="px-4 py-3 border-b-2 border-blue-500 text-blue-300 font-medium text-sm">
            Users & Roles
          </div>
          <Link
            href="/admin/applications"
            className="px-4 py-3 text-slate-400 hover:text-slate-300 font-medium text-sm transition-colors"
          >
            Applications
          </Link>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="max-w-6xl mx-auto mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {/* Users Table */}
      <div className="max-w-6xl mx-auto bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
        {isLoadingProfiles ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="text-slate-400 mt-4">Loading users...</p>
          </div>
        ) : profiles.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-slate-400">No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-700/50 bg-slate-700/30">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Created
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {profiles.map((profile) => {
                  const isGodAdmin = profile.email === GOD_ADMIN_EMAIL;
                  const isAlreadyAdmin = profile.role === "admin";

                  return (
                    <tr
                      key={profile.id}
                      className={`${
                        isGodAdmin ? "bg-blue-500/10" : ""
                      } hover:bg-slate-700/30 transition-colors`}
                    >
                      <td className="px-6 py-4 text-sm text-slate-100">
                        {profile.email}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              isAlreadyAdmin
                                ? "bg-blue-500/30 text-blue-300"
                                : "bg-slate-600/50 text-slate-300"
                            }`}
                          >
                            {isAlreadyAdmin ? "Admin" : "User"}
                          </span>
                          {isGodAdmin && (
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-500/30 text-yellow-300">
                              GOD ADMIN
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">
                        {new Date(profile.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {isGodAdmin ? (
                          <span className="text-slate-500 text-xs">
                            Protected
                          </span>
                        ) : isAlreadyAdmin ? (
                          <span className="text-slate-500 text-xs">
                            Already admin
                          </span>
                        ) : (
                          <button
                            onClick={() =>
                              handleMakeAdmin(profile.id, profile.email)
                            }
                            disabled={actionLoading === profile.id}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <p className="text-slate-400 text-sm">Total Users</p>
          <p className="text-2xl font-bold text-white mt-2">{profiles.length}</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <p className="text-slate-400 text-sm">Admins</p>
          <p className="text-2xl font-bold text-blue-400 mt-2">
            {profiles.filter((p) => p.role === "admin").length}
          </p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <p className="text-slate-400 text-sm">Regular Users</p>
          <p className="text-2xl font-bold text-slate-300 mt-2">
            {profiles.filter((p) => p.role === "user").length}
          </p>
        </div>
      </div>
    </div>
  );
}
