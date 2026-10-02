import React from "react";
import type { Metadata } from "next";
import { ArrowUpRight, Share2, Handshake, HeartHandshake } from "lucide-react";
import { INSTITUTIONAL_INFO } from "@/lib/content";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { Button } from "@/components/ui/Button";

const SITE_URL = "https://www.maesinvesiveis.com";

export const metadata: Metadata = {
  title: "Apoiar a Causa",
  description:
    "Descubra as formas de apoiar o Projecto Mães-Invisíveis: comunidade, partilha e envolvimento na causa das famílias atípicas.",
  alternates: {
    canonical: `${SITE_URL}/apoiar`,
  },
  openGraph: {
    title: "Apoiar a Causa | Mães Invisíveis",
    description:
      "Descubra as formas de apoiar o Projecto Mães-Invisíveis.",
    url: `${SITE_URL}/apoiar`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Mães Invisíveis — Apoiar a Causa" }],
  },
};

export default function ApoiarPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20 sm:space-y-28">
      {/* =========================================================================
          PAGE HEADER
          ========================================================================= */}
      <div className="border-b border-gray-dark pb-12 space-y-4">
        <SectionHeading
          badge="Apoio & Mobilização"
          title="Como Apoiar as Mães Invisíveis"
          subtitle="A invisibilidade combate-se com presença, escuta atenta e envolvimento cívico. Existem formas concretas de fazer a diferença."
        />
      </div>

      {/* =========================================================================
          THREE ACTION PATHS
          ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1: Follow on Instagram */}
        <div className="border border-gray-dark bg-charcoal-deep p-8 flex flex-col justify-between space-y-8 group hover:border-brand-red transition-colors">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary-black border border-gray-dark flex items-center justify-center text-brand-red group-hover:border-brand-red transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-brand-red block">
              Acompanhar o Projecto
            </span>
            <h3 className="font-serif text-3xl font-semibold text-primary-white">
              Seguir no Instagram
            </h3>
            <p className="font-sans text-sm text-brand-gray leading-relaxed">
              Acompanha as publicações do projecto no Instagram oficial. É a forma mais directa de te manteres ligado/a à causa e às histórias que partilhamos.
            </p>
          </div>

          <Button
            href={INSTITUTIONAL_INFO.communityLinks.instagram}
            isExternal
            variant="danger"
            size="md"
            className="w-full"
          >
            @_maes.invisiveis_ <ArrowUpRight className="w-4 h-4 ml-1 inline" aria-hidden="true" />
          </Button>
        </div>

        {/* Card 2: Amplification */}
        <div className="border border-gray-dark bg-charcoal-deep p-8 flex flex-col justify-between space-y-8 group hover:border-brand-red transition-colors">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary-black border border-gray-dark flex items-center justify-center text-brand-red group-hover:border-brand-red transition-colors">
              <Share2 className="w-6 h-6" aria-hidden="true" />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-brand-red block">
              Sensibilização Pública
            </span>
            <h3 className="font-serif text-3xl font-semibold text-primary-white">
              Amplificar a Mensagem
            </h3>
            <p className="font-sans text-sm text-brand-gray leading-relaxed">
              O silêncio quebra-se conversando. Partilha as publicações, fala sobre a realidade da maternidade atípica nos teus círculos e ajuda a tornar o invisível visível.
            </p>
          </div>

          <Button href="/contacto" variant="secondary" size="md" className="w-full">
            Falar Connosco
          </Button>
        </div>

        {/* Card 3: Institutional & Professionals */}
        <div className="border border-gray-dark bg-charcoal-deep p-8 flex flex-col justify-between space-y-8 group hover:border-brand-red transition-colors">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary-black border border-gray-dark flex items-center justify-center text-brand-red group-hover:border-brand-red transition-colors">
              <Handshake className="w-6 h-6" aria-hidden="true" />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-brand-red block">
              Parcerias & Voluntariado
            </span>
            <h3 className="font-serif text-3xl font-semibold text-primary-white">
              Colaboração Directa
            </h3>
            <p className="font-sans text-sm text-brand-gray leading-relaxed">
              Profissionais de saúde, psicólogos, terapeutas, entidades e pessoas que queiram apoiar com o seu tempo ou conhecimento especializado são muito bem-vindos.
            </p>
          </div>

          <Button href="/contacto" variant="primary" size="md" className="w-full">
            Falar com a Coordenação
          </Button>
        </div>
      </div>

      {/* =========================================================================
          TRANSPARENCY NOTE
          ========================================================================= */}
      <div className="border border-gray-dark bg-primary-black p-8 sm:p-12 space-y-6">
        <div className="flex items-center space-x-3 text-brand-red">
          <HeartHandshake className="w-6 h-6" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest font-semibold">
            Transparência & Canais de Apoio
          </span>
        </div>

        <div className="max-w-3xl space-y-4 font-sans text-brand-gray text-base leading-relaxed">
          <h3 className="font-serif text-2xl sm:text-3xl text-primary-white font-semibold">
            Estruturação e Responsabilidade
          </h3>
          <p>
            O Projecto Mães-Invisíveis preza pelo rigor e pela transparência absoluta em todas as suas iniciativas. Os mecanismos formais de apoio financeiro directo encontram-se em processo de consolidação institucional sob a liderança de{" "}
            <strong className="text-white-soft">Adalgiza Baptista</strong>.
          </p>
          <p>
            Qualquer proposta de apoio em bens, serviços especializados ou colaboração deve ser remetida através da nossa página de contacto.
          </p>
        </div>

        <div className="pt-2">
          <Button href="/contacto" variant="secondary" size="md">
            Enviar Mensagem à Organização
          </Button>
        </div>
      </div>
    </div>
  );
}
