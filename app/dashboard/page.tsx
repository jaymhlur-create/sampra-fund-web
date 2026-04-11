"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;

  if (!user) return null; // prevents flicker

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <p>Welcome 👋 {user.email}</p>
    </div>
  );
}