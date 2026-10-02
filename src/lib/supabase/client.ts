/**
 * Supabase Client Initializer (Client-side)
 * Ready for Phase 3 environment variables:
 * NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
 */

export function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // Graceful fallback during Phase 1 (static & local dataset mode)
    return null;
  }

  // Once Supabase SDK is installed in Phase 3:
  // return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
  return null;
}
