import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { Database } from "@/types/database";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  // Se o Supabase não estiver configurado nas variáveis de ambiente:
  if (!supabaseUrl || !supabaseAnonKey) {
    if (isAdminRoute && !isLoginPage) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("error", "unconfigured");
      return NextResponse.redirect(url);
    }
    return response;
  }

  const supabase = createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  // Obter o utilizador actual de forma segura através de auth.getUser()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // DISTINÇÃO CRÍTICA: AUTENTICAÇÃO ≠ AUTORIZAÇÃO (LOGIN ≠ ADMIN)
  if (isAdminRoute) {
    if (!user) {
      if (!isLoginPage) {
        // Visitante não autenticado tentando aceder ao CMS -> redireciona para login
        const url = request.nextUrl.clone();
        url.pathname = "/admin/login";
        url.searchParams.set("redirectTo", pathname);
        return NextResponse.redirect(url);
      }
      return response;
    }

    // Utilizador está autenticado. Verificar se tem perfil na tabela admin_users:
    const { data: adminRecord } = await supabase
      .from("admin_users")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    const isAdmin = Boolean(adminRecord);

    if (!isAdmin) {
      // O utilizador está autenticado, mas NÃO É ADMINISTRADOR!
      // Encerra a sessão ou bloqueia o acesso ao CMS:
      if (!isLoginPage) {
        const url = request.nextUrl.clone();
        url.pathname = "/admin/login";
        url.searchParams.set("error", "unauthorized");
        return NextResponse.redirect(url);
      }
      return response;
    }

    // O utilizador É administrador confirmado
    if (isLoginPage) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return response;
}
