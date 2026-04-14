import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '❌ Missing Supabase environment variables:',
    {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseAnonKey,
    }
  );
  throw new Error(
    'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
  );
}

console.log('✅ Supabase client initialized:', { url: supabaseUrl.substring(0, 20) + '...' });

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
