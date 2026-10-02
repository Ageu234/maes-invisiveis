"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { NAVIGATION_ITEMS, INSTITUTIONAL_INFO } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "@/components/layout/MobileNav";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-primary-black/95 backdrop-blur-sm border-b border-gray-dark transition-all">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo Section */}
        <Link
          href="/"
          className="flex items-center space-x-3 group focus-visible:outline-brand-red py-1"
          aria-label="Mães Invisíveis — Página Inicial"
        >
          {/* Logo visual reference thumbnail */}
          <div className="relative w-9 h-9 bg-charcoal-deep border border-gray-dark flex items-center justify-center overflow-hidden shrink-0 group-hover:border-brand-red transition-colors">
            <Image
              src="/brand/identidade-visual-maes-invisiveis.jpg"
              alt="Mães Invisíveis Símbolo Oficial"
              fill
              className="object-cover scale-150 contrast-125"
              sizes="36px"
              priority
            />
          </div>

          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-tight font-bold text-primary-white leading-none group-hover:text-white-soft transition-colors">
              Mães <span className="strike-red">Invisíveis</span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-brand-gray mt-1 leading-none">
              Ignorar <strong className="text-brand-red font-bold">Não</strong> Faz Desaparecer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center space-x-8"
          aria-label="Navegação Principal"
        >
          {NAVIGATION_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-mono text-xs uppercase tracking-widest transition-colors py-1 relative ${
                  isActive
                    ? "text-primary-white font-semibold"
                    : "text-brand-gray hover:text-primary-white"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-red" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action CTA & Mobile Navigation */}
        <div className="flex items-center space-x-4">
          <Button
            href="/contacto"
            variant="danger"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Apoiar a Causa
          </Button>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
