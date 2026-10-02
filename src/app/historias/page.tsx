import React from "react";
import type { Metadata } from "next";
import { INITIAL_STORIES } from "@/lib/content";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { StoryCard } from "@/components/editorial/StoryCard";
import { Button } from "@/components/ui/Button";

const SITE_URL = "https://www.maesinvesiveis.com";

export const metadata: Metadata = {
  title: "Histórias & Registos",
  description:
    "Registos fotográficos do Projecto Mães-Invisíveis: vivências reais de mães de filhos atípicos, preservando a verdade e o afeto de cada família.",
  alternates: {
    canonical: `${SITE_URL}/historias`,
  },
  openGraph: {
    title: "Histórias & Registos | Mães Invisíveis",
    description:
      "Registos fotográficos do Projecto Mães-Invisíveis: vivências reais de mães de filhos atípicos.",
    url: `${SITE_URL}/historias`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Mães Invisíveis — Histórias e Registos" }],
  },
};

export default function HistoriasPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-16 sm:space-y-24">
      {/* =========================================================================
          PAGE HEADER
          ========================================================================= */}
      <div className="border-b border-gray-dark pb-12 space-y-4">
        <SectionHeading
          badge="Registos Fotográficos"
          title="Histórias & Vivências"
          subtitle="Cada fotografia é um testemunho de presença. Damos nome, rosto e voz a quem a indiferença tentou silenciar."
        />
      </div>

      {/* =========================================================================
          ARCHIVE INFO BAR
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-gray-dark bg-charcoal-deep font-mono text-xs text-brand-gray">
        <div className="flex items-center space-x-3">
          <span className="w-2 h-2 bg-brand-red inline-block" aria-hidden="true" />
          <span className="text-white-soft uppercase tracking-wider">
            Registos disponíveis: {INITIAL_STORIES.length}
          </span>
        </div>
        <div className="flex items-center space-x-4 uppercase tracking-widest text-[11px]">
          <span>Acervo Fotográfico</span>
          <span className="text-gray-dark">•</span>
          <span>Curadoria: Adalgiza Baptista</span>
        </div>
      </div>

      {/* =========================================================================
          STORIES GRID
          ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {INITIAL_STORIES.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>

      {/* =========================================================================
          CALLOUT: PARTICIPATION
          ========================================================================= */}
      <div className="border border-gray-dark bg-charcoal-deep p-8 sm:p-12 space-y-6">
        <div className="max-w-3xl space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-red block">
            Voz & Participação
          </span>
          <h3 className="font-serif text-3xl font-semibold text-primary-white">
            És mãe de uma criança atípica? A tua história importa.
          </h3>
          <p className="font-sans text-base text-brand-gray leading-relaxed">
            O Projecto Mães-Invisíveis está aberto a ouvir e acolher mães que desejem partilhar a sua caminhada. Cada relato preservado é uma semente de consciencialização para toda a sociedade.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap gap-4">
          <Button href="/contacto" variant="danger">
            Entrar em Contacto
          </Button>
          <Button href="/apoiar" variant="secondary">
            Como Fazer Parte
          </Button>
        </div>
      </div>
    </div>
  );
}
