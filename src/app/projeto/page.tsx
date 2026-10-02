import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, ShieldCheck, Users, Camera, Sparkles } from "lucide-react";
import { INSTITUTIONAL_INFO } from "@/lib/content";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { Button } from "@/components/ui/Button";

const SITE_URL = "https://www.maesinvesiveis.com";

export const metadata: Metadata = {
  title: "O Projeto",
  description:
    "Conheça o Projecto Mães-Invisíveis, liderado por Adalgiza Baptista para promover a inclusão, o apoio e a capacitação de famílias atípicas.",
  alternates: {
    canonical: `${SITE_URL}/projeto`,
  },
  openGraph: {
    title: "O Projeto | Mães Invisíveis",
    description:
      "Conheça o Projecto Mães-Invisíveis, liderado por Adalgiza Baptista para promover a inclusão, o apoio e a capacitação de famílias atípicas.",
    url: `${SITE_URL}/projeto`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Mães Invisíveis — O Projecto" }],
  },
};

export default function ProjetoPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-24 sm:space-y-32">
      {/* =========================================================================
          PAGE HEADER
          ========================================================================= */}
      <div className="border-b border-gray-dark pb-12 space-y-4">
        <SectionHeading
          badge="Institucional / O Movimento"
          title="O Projecto Mães-Invisíveis"
          subtitle="Uma iniciativa de visibilidade, apoio e capacitação que desafia a indiferença social, dando voz e rede a quem cuida todos os dias."
        />
      </div>

      {/* =========================================================================
          ABOUT SECTION
          ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start" aria-label="Sobre o projecto">
        {/* Left Column: Portrait of Adalgiza Baptista */}
        <div className="lg:col-span-5 space-y-4">
          <div className="border border-gray-dark bg-charcoal-deep p-4">
            <div className="relative aspect-[3/4] overflow-hidden bg-primary-black">
              <Image
                src="/media/adalgiza-corpo-inteiro.jpg"
                alt="Adalgiza Baptista, CEO e Fundadora do Projecto Mães-Invisíveis"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover contrast-105"
              />
              <div className="absolute top-4 left-4 bg-primary-black/90 px-3 py-1.5 border border-gray-dark">
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-red font-semibold">
                  Adalgiza Baptista / CEO & Fundadora
                </span>
              </div>
            </div>
            <div className="pt-3 text-center font-mono text-[11px] text-brand-gray">
              Liderança e representação pública do Projecto Mães-Invisíveis
            </div>
          </div>
        </div>

        {/* Right Column: Official About Text */}
        <div className="lg:col-span-7 space-y-8 font-sans text-brand-gray text-base sm:text-lg leading-relaxed">
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-red block">
              Sobre o Projecto
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary-white font-semibold">
              O que é o Projecto Mães-Invisíveis?
            </h2>
            {INSTITUTIONAL_INFO.aboutText?.split("\n\n").map((paragraph, i) => (
              <p key={i} className={i === 0 ? "text-white-soft/90" : "text-brand-gray"}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Mission Statement */}
          <div className="p-8 border border-gray-dark bg-charcoal-deep space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-red block">
              Missão
            </span>
            <blockquote className="font-serif text-2xl text-white-soft italic border-l-2 border-brand-red pl-4 py-1 leading-snug">
              &ldquo;{INSTITUTIONAL_INFO.mission}&rdquo;
            </blockquote>
          </div>

          {/* Objective */}
          <div className="p-6 border border-gray-dark bg-charcoal-deep space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-red block">
              Objectivo
            </span>
            <p className="font-sans text-white-soft/90 leading-relaxed">
              {INSTITUTIONAL_INFO.objective}
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          VALUES
          ========================================================================= */}
      <section className="space-y-12" aria-label="Valores do projecto">
        <SectionHeading
          badge="Valores"
          title="O que nos guia"
          subtitle="Os princípios que orientam cada acção e cada decisão do Projecto Mães-Invisíveis."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {INSTITUTIONAL_INFO.values?.map((value, i) => (
            <div
              key={value}
              className="p-6 border border-gray-dark bg-charcoal-deep flex flex-col items-center justify-center space-y-3 text-center hover:border-brand-red transition-colors"
            >
              <span className="font-mono text-xs text-brand-red">0{i + 1}</span>
              <span className="font-serif text-xl text-primary-white font-semibold">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          STRATEGIC PILLARS / EIXOS DE ATUAÇÃO
          ========================================================================= */}
      <section className="space-y-12" aria-label="Eixos de actuação">
        <SectionHeading
          badge="Linhas de Ação"
          title="Os Eixos Estruturais do Movimento"
          subtitle="A nossa actuação divide-se em quatro pilares fundamentais para transformar a perceção social sobre a maternidade atípica."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 border border-gray-dark bg-charcoal-deep space-y-4 hover:border-gray-dark/80 transition-colors">
            <div className="w-10 h-10 bg-primary-black border border-gray-dark flex items-center justify-center text-brand-red">
              <Camera className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className="font-mono text-xs text-brand-red block">Eixo 01</span>
            <h3 className="font-serif text-2xl text-primary-white font-semibold">
              Registo e Visibilidade
            </h3>
            <p className="font-sans text-sm text-brand-gray leading-relaxed">
              Dar visibilidade à realidade das famílias atípicas, retratando a ternura, o cansaço e a verdade diária de quem cuida.
            </p>
          </div>

          <div className="p-6 border border-gray-dark bg-charcoal-deep space-y-4 hover:border-gray-dark/80 transition-colors">
            <div className="w-10 h-10 bg-primary-black border border-gray-dark flex items-center justify-center text-brand-red">
              <Users className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className="font-mono text-xs text-brand-red block">Eixo 02</span>
            <h3 className="font-serif text-2xl text-primary-white font-semibold">
              Rede de Acolhimento
            </h3>
            <p className="font-sans text-sm text-brand-gray leading-relaxed">
              Criar um espaço seguro e comunitário onde mães possam partilhar desafios, recursos e apoio emocional.
            </p>
          </div>

          <div className="p-6 border border-gray-dark bg-charcoal-deep space-y-4 hover:border-gray-dark/80 transition-colors">
            <div className="w-10 h-10 bg-primary-black border border-gray-dark flex items-center justify-center text-brand-red">
              <Sparkles className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className="font-mono text-xs text-brand-red block">Eixo 03</span>
            <h3 className="font-serif text-2xl text-primary-white font-semibold">
              Capacitação
            </h3>
            <p className="font-sans text-sm text-brand-gray leading-relaxed">
              Promover a capacitação de famílias atípicas nas áreas escolares, educacionais, jurídicas e sociais.
            </p>
          </div>

          <div className="p-6 border border-gray-dark bg-charcoal-deep space-y-4 hover:border-brand-red transition-colors">
            <div className="w-10 h-10 bg-primary-black border border-gray-dark flex items-center justify-center text-brand-red">
              <ShieldCheck className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className="font-mono text-xs text-brand-red block">Eixo 04</span>
            <h3 className="font-serif text-2xl text-primary-white font-semibold">
              Inclusão e Igualdade
            </h3>
            <p className="font-sans text-sm text-brand-gray leading-relaxed">
              Afirmar que cuidar é uma contribuição social vital que merece reconhecimento cívico e institucional.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CTA
          ========================================================================= */}
      <section className="border border-gray-dark bg-charcoal-deep p-8 sm:p-12 space-y-8" aria-label="Junta-te ao projecto">
        <div className="max-w-3xl space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-red block">
            Junta-te ao Projecto
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-primary-white">
            Uma Plataforma ao Serviço das Mães
          </h2>
          <p className="font-sans text-base text-brand-gray leading-relaxed">
            O Projecto Mães-Invisíveis está a estruturar novas frentes de visibilidade e articulação comunitária, sob a coordenação de{" "}
            <strong className="text-white-soft">Adalgiza Baptista</strong>.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap items-center gap-4">
          <Button
            href={INSTITUTIONAL_INFO.communityLinks.instagram}
            isExternal
            variant="danger"
          >
            Instagram Oficial <ArrowUpRight className="w-4 h-4 ml-1 inline" aria-hidden="true" />
          </Button>
          <Button href="/historias" variant="secondary">
            Ver Registos do Projecto
          </Button>
          <Button href="/contacto" variant="ghost">
            Contactar
          </Button>
        </div>
      </section>
    </div>
  );
}
