import { supabase } from './supabaseClient';
import type { User } from '@supabase/supabase-js';

// ==================================================
// CONFIGURATION
// ==================================================

export const GOD_ADMIN_EMAIL = "jaymhlurb@sampra.org.za".toLowerCase();

// ==================================================
// AUTH
// ==================================================

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  if (data?.user) {
    await ensureUserProfile(data.user);
  }

  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  if (data?.user) {
    await ensureUserProfile(data.user);
  }

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function getCurrentUser(): Promise<User | null> {
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user || null;
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) throw new Error(error.message);
  return data.session;
}

// ==================================================
// PROFILE HELPERS
// ==================================================

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  // ✅ FIX: Handle "no row found" silently
  if (error) {
    if (error.code === 'PGRST116') {
      return null; // normal case → profile not created yet
    }

    console.error('getUserProfile error:', error);
    return null;
  }

  return data;
}

// -------------------------------
// CREATE PROFILE (ROBUST)
// -------------------------------
export async function createUserProfile(user: User) {
  const email = user.email?.toLowerCase();
  const isGodAdmin = email === GOD_ADMIN_EMAIL;

  const { data, error } = await supabase
    .from('profiles')
    .upsert(
      {
        id: user.id,
        email,
        role: isGodAdmin ? 'admin' : 'user',
        created_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    );

  if (error) {
    console.error('createUserProfile error:', error);
    return null;
  }

  return data;
}

// -------------------------------
// ENSURE PROFILE (FINAL FIX)
// -------------------------------
export async function ensureUserProfile(user: User) {
  if (!user?.id) return null;

  const email = user.email?.toLowerCase();
  const isGodAdmin = email === GOD_ADMIN_EMAIL;

  let profile = await getUserProfile(user.id);

  // ✅ If profile doesn't exist → create it
  if (!profile) {
    await createUserProfile(user);
    profile = await getUserProfile(user.id);
  }

  // 🔥 Always enforce correct role
  if (profile) {
    if (isGodAdmin && profile.role !== 'admin') {
      await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', user.id);
    }

    if (!isGodAdmin && profile.role === 'admin') {
      await supabase
        .from('profiles')
        .update({ role: 'user' })
        .eq('id', user.id);
    }
  }

  return profile;
}

// ==================================================
// ADMIN FUNCTIONS
// ==================================================

export async function getAllProfiles() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Supabase error:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('❌ Unexpected error in getAllProfiles:', err);
    return [];
  }
}

// -------------------------------
// UPDATE ROLE (SAFE)
// -------------------------------
export async function updateUserRole(userId: string, newRole: 'user' | 'admin') {
  const profile = await getUserProfile(userId);

  if (!profile) throw new Error('Profile not found');

  if (profile.email?.toLowerCase() === GOD_ADMIN_EMAIL && newRole === 'user') {
    throw new Error('Cannot demote God Admin');
  }

  const { data, error } = await supabase
    .from('profiles')
    .update({ role: newRole })
    .eq('id', userId)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

// ==================================================
// ROLE HELPERS
// ==================================================

export function isUserAdmin(email?: string, role?: string): boolean {
  if (!email || !role) return false;

  return (
    role === 'admin' ||
    email.toLowerCase() === GOD_ADMIN_EMAIL
  );
}