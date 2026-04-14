"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { getUserProfile, ensureUserProfile, isUserAdmin } from "../lib/auth";

const AuthContext = createContext();

/**
 * AuthProvider - Manages authentication state and user role
 * 
 * Provides:
 * - user: Supabase auth user object
 * - session: Supabase session object
 * - role: User's role ("user" or "admin")
 * - isAdmin: Boolean flag for admin access
 * - loading: Loading state while fetching auth data
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Determine if user is admin based on role and email
  const isAdmin = isUserAdmin(user?.email, role);

  // Get session and user profile on mount
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      const authUser = data?.session?.user || null;
      
      setSession(data?.session || null);
      setUser(authUser);

      if (authUser) {
        // Ensure profile exists and fetch role
        await ensureUserProfile(authUser);
        const profile = await getUserProfile(authUser.id);
        setRole(profile?.role || "user");
      } else {
        setRole(null);
      }

      setLoading(false);
    };

    getSession();
  }, []);

  // Listen for auth changes
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, authSession) => {
        setSession(authSession || null);
        const authUser = authSession?.user || null;
        setUser(authUser);

        if (authUser) {
          // Fetch user profile on auth state change
          const profile = await getUserProfile(authUser.id);
          setRole(profile?.role || "user");
        } else {
          setRole(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, role, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
