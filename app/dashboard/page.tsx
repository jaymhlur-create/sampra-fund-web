"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import { signOut } from "@/src/lib/auth";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/login");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* ✅ ADD IT HERE */}
      <p className="text-gray-600 mt-2">
        Logged in as {user.email}
      </p>

      <p className="mt-4">Welcome 👋 {user.email}</p>

      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}