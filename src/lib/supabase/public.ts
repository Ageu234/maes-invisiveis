import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database";

let publicClientInstance: ReturnType<typeof createClient<Database>> | null = null;

/**
 * Cliente Supabase leve para leitura pública e tarefas sem cookies (SSG estático).
 * Não acede a cookies(), permitindo que páginas públicas sejam pré-renderizadas estaticamente.
 */
export function getPublicSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  if (!publicClientInstance) {
    publicClientInstance = createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return publicClientInstance;
}
