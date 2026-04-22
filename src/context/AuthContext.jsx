"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { getUserProfile, ensureUserProfile, isUserAdmin } from "../lib/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = isUserAdmin(user?.email, role);

  // ✅ FIXED: safe session loading
  useEffect(() => {
    const getSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();

        const authUser = data?.session?.user || null;

        setSession(data?.session || null);
        setUser(authUser);

        if (authUser) {
          try {
            // 🔒 DO NOT let this block login
            await ensureUserProfile(authUser);
          } catch (err) {
            console.error("ensureUserProfile failed:", err);
          }

          try {
            const profile = await getUserProfile(authUser.id);
            setRole(profile?.role || "user");
          } catch (err) {
            console.error("getUserProfile failed:", err);
            setRole("user");
          }
        } else {
          setRole(null);
        }
      } catch (err) {
        console.error("Auth session error:", err);
      } finally {
        // ✅ CRITICAL: always stop loading
        setLoading(false);
      }
    };

    getSession();
  }, []);

  // ✅ FIXED: safe auth listener
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, authSession) => {
        try {
          setSession(authSession || null);

          const authUser = authSession?.user || null;
          setUser(authUser);

          if (authUser) {
            try {
              const profile = await getUserProfile(authUser.id);
              setRole(profile?.role || "user");
            } catch (err) {
              console.error("getUserProfile failed:", err);
              setRole("user");
            }
          } else {
            setRole(null);
          }
        } catch (err) {
          console.error("Auth state change error:", err);
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