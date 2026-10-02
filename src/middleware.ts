import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Intercepta rotas /admin e rotas de autenticação/API relevantes,
     * ignorando ficheiros estáticos (_next/static, _next/image, favicon.ico, etc.)
     */
    "/admin/:path*",
    "/api/:path*",
  ],
};
