import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { NAVIGATION_ITEMS, INSTITUTIONAL_INFO } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-charcoal-deep border-t border-gray-dark mt-28 text-primary-white">
      {/* Top Banner: Brand Manifesto Statement */}
      <div className="border-b border-gray-dark py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-brand-red block mb-2">
              Declaração de Princípios
            </span>
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white-soft">
              Ignorar <strong className="text-brand-red font-bold">não</strong> faz desaparecer.
            </p>
          </div>
          <div className="max-w-md">
            <p className="font-sans text-sm sm:text-base text-brand-gray leading-relaxed">
              {INSTITUTIONAL_INFO.mission}
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Col 1: Brand & Founder */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
                <Image
                  src="/brand/logo.svg"
                  alt="Mães Invisíveis — Logótipo Oficial"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight">
                Mães <span className="strike-red">Invisíveis</span>
              </span>
            </div>

            <p className="font-sans text-sm text-brand-gray leading-relaxed">
              Um projecto de visibilidade, dignidade e apoio fundado e liderado por{" "}
              <strong className="text-white-soft font-medium">Adalgiza Baptista</strong>,{" "}
              CEO do Projecto Mães-Invisíveis.
            </p>

            <div className="pt-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-brand-red block mb-1">
                Objetivo
              </span>
              <p className="font-sans text-xs text-brand-gray leading-relaxed">
                {INSTITUTIONAL_INFO.objective}
              </p>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-brand-red">
              Navegação
            </h3>
            <ul className="space-y-2.5">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-mono text-xs text-brand-gray hover:text-primary-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Community & Channels */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-brand-red">
              Comunidade Oficial
            </h3>
            <p className="font-sans text-sm text-brand-gray">
              Acompanha as publicações e junta-te à rede de apoio mútuo:
            </p>
            <div className="space-y-2.5 pt-2">
              <a
                href={INSTITUTIONAL_INFO.communityLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 border border-gray-dark bg-primary-black hover:border-brand-red transition-colors group"
                aria-label="Instagram oficial do Projecto Mães-Invisíveis"
              >
                <span className="font-mono text-xs text-white-soft group-hover:text-brand-red">
                  Instagram @_maes.invisiveis_
                </span>
                <ArrowUpRight className="w-4 h-4 text-brand-gray group-hover:text-brand-red transition-colors" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="border-t border-gray-dark mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-brand-gray">
          <div>
            © {new Date().getFullYear()} Projecto Mães-Invisíveis. Todos os direitos reservados.
          </div>
          <div className="flex items-center space-x-6">
            <span>CEO: Adalgiza Baptista</span>
            <span className="text-gray-dark">•</span>
            <a
              href={INSTITUTIONAL_INFO.communityLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-red transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
