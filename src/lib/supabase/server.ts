import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "@/types/database";

/**
 * Cliente Supabase para uso em Server Components, Server Actions e Route Handlers.
 * Suporta Next.js com gestão segura de cookies para sessões SSR.
 */
export async function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // O método `setAll` foi chamado a partir de um Server Component.
          // Isto pode ser ignorado caso tenha middleware a refrescar sessões.
        }
      },
    },
  });
}

/**
 * Verifica no servidor se o utilizador actual é um administrador autenticado.
 */
export async function getCurrentUser() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error("Erro ao verificar utilizador autenticado:", error);
    return null;
  }
}
