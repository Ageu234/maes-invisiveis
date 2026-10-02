import React from "react";
import { INSTITUTIONAL_INFO } from "@/lib/content";
import { Button } from "@/components/ui/Button";

interface ManifestoProps {
  id?: string;
  className?: string;
}

export function Manifesto({ id = "manifesto", className = "" }: ManifestoProps) {
  return (
    <section
      id={id}
      className={`relative py-24 sm:py-32 bg-primary-black border-y border-gray-dark ${className}`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Index & Primary Statement */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-[2px] bg-brand-red inline-block" />
              <span className="font-mono text-xs uppercase tracking-widest text-brand-red font-semibold">
                Manifesto Oficial
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary-white leading-[1.05]">
              IGNORAR{" "}
              <span className="text-brand-red underline decoration-brand-red/40 decoration-wavy underline-offset-8">
                NÃO
              </span>{" "}
              FAZ DESAPARECER.
            </h2>

            <div className="pt-2">
              <span className="font-mono text-xs text-brand-gray uppercase tracking-widest block mb-1">
                Liderança do Movimento
              </span>
              <p className="font-sans text-sm text-white-soft">
                Iniciativa fundada e conduzida por{" "}
                <strong className="text-primary-white font-medium">Adalgiza Baptista</strong>.
              </p>
            </div>
          </div>

          {/* Right Column: Three Pillars and Institutional Declaration */}
          <div className="lg:col-span-7 space-y-10 lg:pl-8 lg:border-l lg:border-gray-dark">
            {/* The 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              {INSTITUTIONAL_INFO.publicPositioning.pillars.map((pillar, idx) => (
                <div
                  key={pillar}
                  className="p-5 border border-gray-dark bg-charcoal-deep/70 space-y-2 hover:border-gray-dark/80 transition-colors"
                >
                  <span className="font-mono text-xs text-brand-red block font-semibold">
                    0{idx + 1} /
                  </span>
                  <p className="font-serif text-xl sm:text-2xl text-primary-white font-medium">
                    {pillar}
                  </p>
                </div>
              ))}
            </div>

            {/* Core Narrative Text */}
            <div className="space-y-6 text-brand-gray font-sans text-base sm:text-lg leading-relaxed">
              <p className="text-primary-white font-serif text-2xl sm:text-3xl leading-snug">
                &ldquo;Damos voz ao que o mundo finge não ver.&rdquo;
              </p>
              <p>
                Ser mãe de uma criança atípica é enfrentar barreiras diárias que vão muito além dos cuidados médicos: é o isolamento imposto pelo preconceito, a escassez de apoios e a invisibilidade institucional.
              </p>
              <p>
                Este espaço existe para documentar a realidade sem artifícios, registrar a dignidade das famílias e reunir mães que recusam a solidão. Não pedimos complacência: exigimos visibilidade e respeito.
              </p>
            </div>

            {/* Action Bar */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                href={INSTITUTIONAL_INFO.communityLinks.whatsappCommunity}
                isExternal
                variant="danger"
                size="md"
              >
                Junta-te à Comunidade
              </Button>
              <Button href="/projeto" variant="secondary" size="md">
                Conhecer a Visão do Projeto
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
