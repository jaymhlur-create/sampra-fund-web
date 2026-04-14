"use client";

import { useState, useEffect } from "react";
import { signUp } from "@/src/lib/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, loading } = useAuth();
  const router = useRouter();

  // ✅ Prevent logged-in users from seeing signup
  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  const handleSignup = async () => {
    try {
      await signUp(email, password);

      alert("Check your email for confirmation!");

      // ⚠️ Only redirect if email confirmation is OFF
      // router.replace("/dashboard");

    } catch (error) {
      alert(error instanceof Error ? error.message : "Signup failed");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (user) return null;

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-80">
        <h1 className="text-xl font-bold mb-4">Sign Up</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}