"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Mail,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
  PlusCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Não renderiza o painel de navegação na página de login
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleSignOut = async () => {
    setLoggingOut(true);
    try {
      const supabase = createClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Erro ao terminar sessão:", err);
      window.location.href = "/api/auth/signout";
    } finally {
      setLoggingOut(false);
    }
  };

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/admin/dashboard",
    },
    {
      label: "Histórias",
      href: "/admin/historias",
      icon: BookOpen,
      active: pathname.startsWith("/admin/historias"),
    },
    {
      label: "Contactos",
      href: "/admin/contactos",
      icon: Mail,
      active: pathname === "/admin/contactos",
    },
    {
      label: "Definições",
      href: "/admin/configuracoes",
      icon: Settings,
      active: pathname === "/admin/configuracoes",
    },
  ];

  return (
    <div className="min-h-screen bg-primary-black text-primary-white flex flex-col md:flex-row">
      {/* =====================================================================
          SIDEBAR DESKTOP
          ===================================================================== */}
      <aside className="hidden md:flex flex-col w-64 bg-charcoal-deep border-r border-gray-dark shrink-0 justify-between">
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="p-6 border-b border-gray-dark">
            <Link href="/admin/dashboard" className="flex items-center space-x-3 group">
              <div className="relative w-8 h-8 shrink-0">
                <Image
                  src="/brand/logo.svg"
                  alt="Mães Invisíveis"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-serif text-sm font-bold text-primary-white tracking-wide block">
                  Mães Invisíveis
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-red">
                  CMS Administrativo
                </span>
              </div>
            </Link>
          </div>

          {/* Quick Action: Nova História */}
          <div className="px-4">
            <Link
              href="/admin/historias/nova"
              className="flex items-center justify-center space-x-2 w-full py-2.5 px-4 bg-brand-red hover:bg-brand-red/90 text-primary-white font-mono text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Nova História</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1" aria-label="Navegação administrativa">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-none font-mono text-xs uppercase tracking-wider transition-colors ${
                    item.active
                      ? "bg-primary-black text-brand-red border-l-2 border-brand-red font-semibold"
                      : "text-brand-gray hover:text-primary-white hover:bg-primary-black/50"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-dark space-y-2 font-mono text-xs">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 text-brand-gray hover:text-primary-white hover:bg-primary-black/50 transition-colors"
          >
            <span className="flex items-center space-x-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Ver Site Público</span>
            </span>
            <span className="text-[10px] text-gray-dark">↗</span>
          </Link>

          <button
            onClick={handleSignOut}
            disabled={loggingOut}
            className="flex items-center space-x-2 w-full px-3 py-2 text-brand-gray hover:text-brand-red hover:bg-primary-black/50 transition-colors text-left"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{loggingOut ? "A sair..." : "Terminar Sessão"}</span>
          </button>
        </div>
      </aside>

      {/* =====================================================================
          MOBILE HEADER
          ===================================================================== */}
      <header className="md:hidden flex items-center justify-between p-4 bg-charcoal-deep border-b border-gray-dark sticky top-0 z-40">
        <Link href="/admin/dashboard" className="flex items-center space-x-2">
          <div className="relative w-6 h-6 shrink-0">
            <Image
              src="/brand/logo.svg"
              alt="Mães Invisíveis"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-serif text-sm font-bold text-primary-white">
            CMS Admin
          </span>
        </Link>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-brand-gray hover:text-primary-white"
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-charcoal-deep border-b border-gray-dark p-4 space-y-4">
          <Link
            href="/admin/historias/nova"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center space-x-2 w-full py-2.5 px-4 bg-brand-red text-primary-white font-mono text-xs uppercase tracking-wider"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Nova História</span>
          </Link>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2.5 font-mono text-xs uppercase tracking-wider ${
                    item.active
                      ? "bg-primary-black text-brand-red font-semibold"
                      : "text-brand-gray hover:text-primary-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-gray-dark flex items-center justify-between font-mono text-xs text-brand-gray">
            <Link href="/" target="_blank" className="flex items-center space-x-1 hover:text-primary-white">
              <span>Site Público</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={handleSignOut}
              className="text-brand-red hover:underline"
            >
              Terminar Sessão
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          MAIN CONTENT AREA
          ===================================================================== */}
      <main className="flex-1 overflow-x-hidden p-6 sm:p-8 lg:p-10 bg-primary-black">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
