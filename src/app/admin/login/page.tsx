"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, AlertCircle, CheckCircle } from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [configured, setConfigured] = useState(true);

  useEffect(() => {
    setConfigured(isSupabaseConfigured());
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("error") === "unauthorized") {
        setError("Acesso recusado: esta conta autenticada não possui privilégios de administrador.");
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    if (!supabase) {
      setError(
        "O Supabase não está configurado. Configure as variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no ficheiro .env.local."
      );
      setLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) {
        setError(
          authError.message === "Invalid login credentials"
            ? "Credenciais inválidas. Verifique o seu e-mail e palavra-passe."
            : authError.message
        );
        return;
      }

      if (data.user) {
        // AUTORIZAÇÃO: Verificar se o utilizador autenticado existe na tabela admin_users
        const { data: adminRecord, error: adminCheckError } = await supabase
          .from("admin_users")
          .select("role")
          .eq("id", data.user.id)
          .maybeSingle();

        if (adminCheckError || !adminRecord) {
          // Utilizador autenticado mas NÃO autorizado como administrador
          await supabase.auth.signOut();
          setError("Acesso recusado: a sua conta autenticada não tem permissão de administrador no CMS.");
          return;
        }

        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao tentar iniciar sessão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-black flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-4">
          <Link href="/" className="inline-block relative w-16 h-16 mx-auto">
            <Image
              src="/brand/logo-symbol.svg"
              alt="Mães Invisíveis"
              fill
              className="object-contain"
              priority
            />
          </Link>
          <div className="space-y-1">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-red block">
              Gestão de Conteúdos
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary-white">
              CMS Administrativo
            </h1>
            <p className="font-sans text-xs text-brand-gray">
              Acesso reservado à equipa do Projecto Mães-Invisíveis
            </p>
          </div>
        </div>

        {/* Configuration Notice if env vars are missing */}
        {!configured && (
          <div
            role="alert"
            className="p-4 border border-brand-red/60 bg-charcoal-deep text-brand-gray text-xs space-y-2"
          >
            <div className="flex items-center space-x-2 text-brand-red font-mono font-semibold uppercase">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Supabase Não Configurado</span>
            </div>
            <p className="font-sans leading-relaxed">
              Para aceder à gestão, adicione as credenciais do Supabase no ficheiro{" "}
              <code className="bg-primary-black px-1.5 py-0.5 text-white-soft">.env.local</code>{" "}
              com base no template{" "}
              <code className="bg-primary-black px-1.5 py-0.5 text-white-soft">.env.example</code>.
            </p>
          </div>
        )}

        {/* Login Box */}
        <div className="border border-gray-dark bg-charcoal-deep p-8 space-y-6">
          {error && (
            <div
              role="alert"
              className="p-4 border border-brand-red bg-primary-black flex items-start space-x-3 text-xs text-brand-red font-mono"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5" noValidate>
            <div className="space-y-2">
              <label
                htmlFor="admin-email"
                className="font-mono text-xs uppercase tracking-wider text-brand-gray block"
              >
                E-mail Administrativo
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="admin-email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@maesinvesiveis.com"
                  className="w-full bg-primary-black border border-gray-dark pl-10 pr-4 py-3 text-sm text-primary-white placeholder-brand-gray/50 focus:border-brand-red focus:outline-none transition-colors"
                />
                <Mail className="w-4 h-4 text-brand-gray absolute left-3.5 top-3.5" aria-hidden="true" />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="admin-password"
                className="font-mono text-xs uppercase tracking-wider text-brand-gray block"
              >
                Palavra-passe
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="admin-password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-primary-black border border-gray-dark pl-10 pr-4 py-3 text-sm text-primary-white placeholder-brand-gray/50 focus:border-brand-red focus:outline-none transition-colors"
                />
                <Lock className="w-4 h-4 text-brand-gray absolute left-3.5 top-3.5" aria-hidden="true" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-brand-red hover:bg-brand-red/90 text-primary-white font-mono text-xs uppercase tracking-widest font-semibold transition-colors disabled:opacity-50"
            >
              <span>{loading ? "A autenticar..." : "Entrar no CMS"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-gray-dark text-center">
            <Link
              href="/"
              className="font-mono text-xs text-brand-gray hover:text-primary-white transition-colors"
            >
              ← Voltar ao website público
            </Link>
          </div>
        </div>

        {/* Security Info */}
        <div className="text-center font-mono text-[11px] text-brand-gray/70 space-y-1">
          <p>Autenticação protegida via Supabase Auth &amp; Row Level Security (RLS)</p>
          <p className="text-brand-gray/50">Projecto Mães-Invisíveis © 2026</p>
        </div>
      </div>
    </div>
  );
}
