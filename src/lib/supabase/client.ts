import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/database";

let clientInstance: ReturnType<typeof createBrowserClient<Database>> | null = null;

/**
 * Cliente Supabase para uso em Client Components (Browser).
 * Utiliza as variáveis de ambiente públicas NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY.
 * Retorna null graciosamente caso as variáveis não estejam configuradas.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  if (!clientInstance) {
    clientInstance = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
  }

  return clientInstance;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
