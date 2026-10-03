import { NextResponse, type NextRequest } from "next/server";
import { getPublicSupabaseClient } from "@/lib/supabase/public";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const rawPath = typeof body.path === "string" ? body.path.trim() : "/";

    // Ignorar acessos ao painel administrativo e rotas internas de API
    if (rawPath.startsWith("/admin") || rawPath.startsWith("/api") || rawPath.includes(".")) {
      return NextResponse.json({ ignored: true });
    }

    const cleanPath = rawPath.slice(0, 150) || "/";
    const todayStr = new Date().toISOString().split("T")[0];

    const supabase = getPublicSupabaseClient();
    if (supabase) {
      const { error } = await supabase.from("page_views").insert({
        path: cleanPath,
        view_date: todayStr,
      });

      if (error) {
        // Falha silenciosa para não afetar o visitante caso a tabela ainda não exista
        return NextResponse.json({ ok: false, error: error.message }, { status: 200 });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
