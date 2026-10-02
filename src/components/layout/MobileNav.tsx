"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, ArrowRight } from "lucide-react";
import { NAVIGATION_ITEMS, INSTITUTIONAL_INFO } from "@/lib/content";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fechar menu quando a rota muda
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevenir scroll do body quando aberto e fechar com Escape
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "unset";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const menuDrawer = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu de Navegação Móvel"
      className="fixed inset-0 z-[9999] bg-[#000000] text-[#FFFFFF] flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200"
    >
      {/* Top Bar inside Menu Drawer */}
      <div className="h-20 px-4 sm:px-6 flex items-center justify-between border-b border-[#1F1F1F] bg-[#000000] shrink-0">
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center space-x-3 group"
          aria-label="Página Inicial — Mães Invisíveis"
        >
          <div className="relative w-9 h-9 shrink-0">
            <Image
              src="/brand/logo.svg"
              alt="Logótipo Mães Invisíveis"
              width={36}
              height={36}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-base font-bold text-[#FFFFFF] leading-none">
              Mães <span className="strike-red">Invisíveis</span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#737373] mt-1 leading-none">
              Ignorar <strong className="text-[#D91616]">Não</strong> Faz Desaparecer
            </span>
          </div>
        </Link>

        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Fechar menu"
          className="p-2.5 text-[#FFFFFF] hover:text-[#D91616] border border-[#1F1F1F] bg-[#0A0A0A] hover:bg-[#1F1F1F] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 px-6 py-8 flex flex-col justify-center space-y-6 max-w-lg mx-auto w-full">
        <span className="font-mono text-[11px] text-[#D91616] uppercase tracking-widest block font-semibold">
          // Índice de Navegação
        </span>

        <nav className="flex flex-col divide-y divide-[#1F1F1F]" aria-label="Navegação móvel principal">
          {NAVIGATION_ITEMS.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-4 group transition-colors"
              >
                <div className="flex items-baseline space-x-4">
                  <span className="font-mono text-xs text-[#D91616] font-semibold">
                    0{index + 1}
                  </span>
                  <span
                    className={`font-serif text-3xl font-semibold tracking-tight transition-colors ${
                      isActive
                        ? "text-[#D91616] italic"
                        : "text-[#FFFFFF] group-hover:text-[#D91616]"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                <ArrowRight
                  className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                    isActive ? "text-[#D91616]" : "text-[#737373] group-hover:text-[#D91616]"
                  }`}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>

        {/* Quick Action Button */}
        <div className="pt-4">
          <Link
            href="/contacto"
            onClick={() => setIsOpen(false)}
            className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 bg-[#D91616] hover:bg-[#D91616]/90 text-[#FFFFFF] font-mono text-xs uppercase tracking-widest font-semibold transition-colors shadow-lg"
          >
            <span>Apoiar a Causa / Contacto</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Footer Info inside Menu Drawer */}
      <div className="p-6 border-t border-[#1F1F1F] bg-[#0A0A0A] shrink-0 space-y-4 max-w-lg mx-auto w-full">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#737373] uppercase tracking-wider">Canal Oficial:</span>
          <a
            href={INSTITUTIONAL_INFO.communityLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 text-[#FFFFFF] hover:text-[#D91616] transition-colors"
          >
            <span>@_maes.invisiveis_</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#D91616]" />
          </a>
        </div>

        <div className="text-center pt-2 border-t border-[#1F1F1F]/60">
          <p className="font-mono text-[10px] text-[#737373] uppercase tracking-widest">
            {INSTITUTIONAL_INFO.brandStatement} — Projecto Mães-Invisíveis
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="md:hidden">
      {/* Trigger Button in Header */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-label="Abrir menu de navegação móvel"
        className="p-2 text-[#FFFFFF] hover:text-[#D91616] focus-visible:outline-[#D91616] transition-colors flex items-center justify-center border border-transparent hover:border-[#1F1F1F]"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Render via Portal so it is detached from header stacking context */}
      {isOpen && mounted ? createPortal(menuDrawer, document.body) : null}
    </div>
  );
}
