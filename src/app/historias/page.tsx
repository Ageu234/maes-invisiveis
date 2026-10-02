import React from "react";
import type { Metadata } from "next";
import { INITIAL_STORIES } from "@/lib/content";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { StoryCard } from "@/components/editorial/StoryCard";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Histórias & Registos Documentais",
  description:
    "Arquivo documental de vivências reais de mães de filhos atípicos, preservando a verdade, a luta e o afeto de cada família.",
};

export default function HistoriasPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-16 sm:space-y-24">
      {/* =========================================================================
          PAGE HEADER
          ========================================================================= */}
      <div className="border-b border-gray-dark pb-12 space-y-4">
        <SectionHeading
          badge="Arquivo Documental"
          title="Histórias & Vivências Reais"
          subtitle="Cada fotografia e cada relato é um testemunho de resistência. Damos nome, rosto e voz a quem a indiferença tentou silenciar."
        />
      </div>

      {/* =========================================================================
          ARCHIVE FILTER / METADATA SUMMARY BAR
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-gray-dark bg-charcoal-deep font-mono text-xs text-brand-gray">
        <div className="flex items-center space-x-3">
          <span className="w-2 h-2 bg-brand-red inline-block" />
          <span className="text-white-soft uppercase tracking-wider">
            Total de Registos Catalogados: 0{INITIAL_STORIES.length}
          </span>
        </div>
        <div className="flex items-center space-x-4 uppercase tracking-widest text-[11px]">
          <span>Acervo Oficial</span>
          <span className="text-gray-dark">•</span>
          <span>Curadoria: Adalgiza Baptista</span>
        </div>
      </div>

      {/* =========================================================================
          STORIES GRID (All 3 authentic stories with real photography)
          ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {INITIAL_STORIES.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>

      {/* =========================================================================
          CALLOUT: PARTICIPATION IN THE DOCUMENTARY ARCHIVE
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
            O projeto Mães Invisíveis está aberto a ouvir e acolher mães que desejem partilhar a sua caminhada. Cada relato preservado é uma semente de consciencialização para toda a sociedade.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap gap-4">
          <Button href="/contacto" variant="danger">
            Entrar em Contacto Connosco
          </Button>
          <Button href="/apoiar" variant="secondary">
            Como Fazer Parte da Rede
          </Button>
        </div>
      </div>
    </div>
  );
}
