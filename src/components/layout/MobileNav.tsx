"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAVIGATION_ITEMS, INSTITUTIONAL_INFO } from "@/lib/content";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile nav when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Fechar navegação móvel" : "Abrir navegação móvel"}
        className="p-2 text-primary-white hover:text-brand-red focus-visible:outline-brand-red transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 top-20 bg-primary-black z-40 flex flex-col justify-between px-6 py-10 border-t border-gray-dark overflow-y-auto"
        >
          <div className="space-y-6">
            <span className="font-mono text-[10px] text-brand-gray uppercase tracking-widest block">
              Índice de Navegação
            </span>
            <nav className="flex flex-col space-y-4">
              {NAVIGATION_ITEMS.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-baseline justify-between py-2 border-b border-gray-dark/50 group"
                  >
                    <span className="font-mono text-xs text-brand-gray group-hover:text-brand-red transition-colors">
                      0{index + 1}
                    </span>
                    <span
                      className={`font-serif text-2xl tracking-tight transition-colors ${
                        isActive
                          ? "text-brand-red italic"
                          : "text-primary-white group-hover:text-brand-red"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="pt-8 border-t border-gray-dark space-y-4">
            <div className="font-mono text-[10px] text-brand-gray uppercase tracking-widest">
              Comunidade & Voz
            </div>
            <div className="flex flex-col space-y-2">
              <a
                href={INSTITUTIONAL_INFO.communityLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-white-soft flex items-center justify-between py-1 hover:text-brand-red transition-colors"
                aria-label="Instagram oficial do Projecto Mães-Invisíveis"
              >
                <span>@_maes.invisiveis_</span>
                <ArrowUpRight className="w-4 h-4 text-brand-red" aria-hidden="true" />
              </a>
            </div>
            <div className="pt-2 text-center">
              <p className="font-mono text-[11px] text-brand-gray uppercase tracking-wider">
                {INSTITUTIONAL_INFO.brandStatement}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
