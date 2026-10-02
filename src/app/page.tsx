import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowDown, ArrowUpRight, Heart, Shield, Eye } from "lucide-react";
import { getPublishedStories } from "@/lib/data/stories";
import { INSTITUTIONAL_INFO } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Manifesto } from "@/components/editorial/Manifesto";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { StoryCard } from "@/components/editorial/StoryCard";
import { HeroVideo } from "@/components/editorial/HeroVideo";

const SITE_URL = "https://www.maesinvesiveis.com";

export const metadata: Metadata = {
  title: "Mães Invisíveis | Voz às Mães de Crianças Atípicas",
  description:
    "Projecto Mães-Invisíveis dedicado a dar visibilidade às mães de crianças atípicas, promovendo inclusão, apoio e capacitação de famílias.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Mães Invisíveis | Voz às Mães de Crianças Atípicas",
    description:
      "Projecto Mães-Invisíveis dedicado a dar visibilidade às mães de crianças atípicas, promovendo inclusão, apoio e capacitação de famílias.",
    url: SITE_URL,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Mães Invisíveis — Ignorar Não Faz Desaparecer" }],
  },
};

export default async function HomePage() {
  const stories = await getPublishedStories();
  return (
    <div className="space-y-20 sm:space-y-32">
      {/* =========================================================================
          HERO DE VÍDEO OFICIAL (Registo Audiovisual & Editorial)
          ========================================================================= */}
      <HeroVideo />

      {/* =========================================================================
          APRESENTAÇÃO DO PROJECTO MÃES-INVISÍVEIS
          ========================================================================= */}
      <section
        id="apresentacao-projeto"
        className="relative pt-4 sm:pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b border-gray-dark scroll-mt-24"
        aria-label="Apresentação do Projecto Mães-Invisíveis"
      >
        <div className="max-w-[1280px] mx-auto">
          {/* Top Identification Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-gray-dark text-brand-gray font-mono text-[11px] uppercase tracking-widest">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 bg-brand-red inline-block" aria-hidden="true" />
              <span className="text-white-soft">Projecto Mães-Invisíveis</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>CEO: Adalgiza Baptista</span>
            </div>
          </div>

          {/* Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 lg:pt-16 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-widest text-brand-red block">
                  Projecto Mães-Invisíveis
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-primary-white leading-[1.06]">
                  Acolhimento, Voz e Dignidade.
                </h2>
              </div>

              <div className="max-w-xl space-y-5 text-brand-gray font-sans text-base sm:text-lg leading-relaxed">
                <p className="text-white-soft font-serif text-2xl sm:text-3xl leading-snug font-light">
                  Ignoradas. Sozinhas. Mas presentes.
                </p>
                <p className="text-brand-gray text-sm sm:text-base leading-relaxed">
                  {INSTITUTIONAL_INFO.mission}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button href="#manifesto" variant="primary" size="lg">
                  Ler o Manifesto
                </Button>
                <Button href="/historias" variant="secondary" size="lg">
                  Explorar Histórias
                </Button>
                <Button
                  href={INSTITUTIONAL_INFO.communityLinks.instagram}
                  isExternal
                  variant="danger"
                  size="lg"
                >
                  Seguir no Instagram
                </Button>
              </div>

              {/* Scroll Hint */}
              <div className="pt-8 hidden sm:flex items-center space-x-2 text-brand-gray font-mono text-[11px] uppercase tracking-wider">
                <ArrowDown className="w-3.5 h-3.5 text-brand-red animate-bounce" aria-hidden="true" />
                <span>Conhecer o projecto</span>
              </div>
            </div>

            {/* Right Hero Photographic Composition */}
            <div className="lg:col-span-5">
              <div className="relative border border-gray-dark bg-charcoal-deep p-4 group">
                <div className="relative aspect-[4/5] overflow-hidden bg-primary-black">
                  <Image
                    src="/media/adalgiza-e-filho-documental.jpg"
                    alt="Adalgiza Baptista abraçando o filho — registo fotográfico do Projecto Mães-Invisíveis"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover contrast-110 grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                  />

                  {/* Bottom Caption */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-primary-black/90 via-primary-black/40 to-transparent p-4 flex items-end justify-between font-mono text-[11px] text-white-soft">
                    <span>Adalgiza Baptista &amp; Filho</span>
                    <span className="text-brand-red font-semibold">Projecto Mães-Invisíveis</span>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between font-mono text-[10px] text-brand-gray">
                  <span>Registo Fotográfico Autêntico</span>
                  <span className="uppercase tracking-wider">Acervo Mães-Invisíveis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          THE THREE PILLARS
          ========================================================================= */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8" aria-label="Os três pilares do projecto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 border border-gray-dark bg-charcoal-deep flex flex-col justify-between space-y-6 hover:border-gray-dark/80 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs text-brand-red">
                <span>01 / PILAR</span>
                <Eye className="w-5 h-5 text-brand-gray" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-3xl font-semibold text-primary-white">
                Ignoradas
              </h3>
              <p className="font-sans text-sm text-brand-gray leading-relaxed">
                Pela sociedade, pelas estruturas e pelas conversas públicas. Damos visibilidade ao que é propositadamente esquecido.
              </p>
            </div>
            <div className="pt-4 border-t border-gray-dark/60 font-mono text-[11px] text-brand-gray uppercase">
              Voz e Representação
            </div>
          </div>

          <div className="p-8 border border-gray-dark bg-charcoal-deep flex flex-col justify-between space-y-6 hover:border-gray-dark/80 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs text-brand-red">
                <span>02 / PILAR</span>
                <Shield className="w-5 h-5 text-brand-gray" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-3xl font-semibold text-primary-white">
                Sozinhas
              </h3>
              <p className="font-sans text-sm text-brand-gray leading-relaxed">
                No peso dos cuidados diários e na solidão emocional. Criamos um espaço real de acolhimento onde nenhuma mãe precisa de caminhar desamparada.
              </p>
            </div>
            <div className="pt-4 border-t border-gray-dark/60 font-mono text-[11px] text-brand-gray uppercase">
              Comunidade e Acolhimento
            </div>
          </div>

          <div className="p-8 border border-gray-dark bg-charcoal-deep flex flex-col justify-between space-y-6 hover:border-brand-red transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs text-brand-red">
                <span>03 / PILAR</span>
                <Heart className="w-5 h-5 text-brand-red" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-3xl font-semibold text-primary-white">
                Mas Presentes.
              </h3>
              <p className="font-sans text-sm text-brand-gray leading-relaxed">
                Inabaláveis no amor e na defesa dos seus filhos. A presença materna atípica é uma força que merece reconhecimento cívico e social.
              </p>
            </div>
            <div className="pt-4 border-t border-gray-dark/60 font-mono text-[11px] text-brand-red uppercase font-semibold">
              Afirmação e Dignidade
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MANIFESTO SECTION
          ========================================================================= */}
      <Manifesto />

      {/* =========================================================================
          STORIES / DOCUMENTARY ARCHIVE
          ========================================================================= */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12" aria-label="Histórias e registos">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-dark">
          <SectionHeading
            badge="Registos & Vivências"
            title="Histórias de Amor e Resistência"
            subtitle="Retratos genuínos de mães que enfrentam a maternidade atípica com afeto incondicional."
          />
          <Button href="/historias" variant="ghost" size="sm" className="shrink-0">
            Ver todos os registos <ArrowUpRight className="w-4 h-4 ml-1 inline" aria-hidden="true" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      {/* =========================================================================
          FOUNDER SPOTLIGHT (Adalgiza Baptista)
          ========================================================================= */}
      <section className="bg-charcoal-deep border-y border-gray-dark py-24 px-4 sm:px-6 lg:px-8" aria-label="A fundadora">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Founder Portrait */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative border border-gray-dark p-3 bg-primary-black">
                <div className="relative aspect-[4/5] overflow-hidden bg-charcoal-deep">
                  <Image
                    src="/media/adalgiza-retrato.jpg"
                    alt="Retrato de Adalgiza Baptista, CEO e Fundadora do Projecto Mães-Invisíveis"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover contrast-110 grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute bottom-4 left-4 bg-primary-black/90 px-3 py-1.5 border border-gray-dark">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-brand-red font-semibold">
                      Adalgiza Baptista — CEO & Fundadora
                    </span>
                  </div>
                </div>
                <div className="pt-3 flex items-center justify-between font-mono text-[11px] text-brand-gray">
                  <span>Liderança Institucional</span>
                  <span>Mães Invisíveis</span>
                </div>
              </div>
            </div>

            {/* Founder Editorial Narrative */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <SectionHeading
                badge="A Fundadora"
                title="A Voz que Recusou a Invisibilidade"
                subtitle="Transformando uma vivência pessoal numa causa coletiva de visibilidade, dignidade e acolhimento."
              />

              <div className="space-y-4 font-sans text-brand-gray text-base sm:text-lg leading-relaxed">
                <p>
                  O Projecto Mães Invisíveis é fundado e liderado por{" "}
                  <strong className="text-primary-white">Adalgiza Baptista</strong>, que assumiu a missão de criar uma plataforma de acolhimento e escuta para mães de filhos atípicos.
                </p>
                <p>
                  O objectivo não é vitimizar, mas mobilizar: dar visibilidade a quem cuida, unir famílias em situações semelhantes e promover a inclusão nas áreas escolares, educacionais, jurídicas e sociais.
                </p>
                <p className="font-serif text-xl sm:text-2xl text-white-soft italic pt-2 border-l-2 border-brand-red pl-4">
                  &ldquo;Ignorar não faz desaparecer.&rdquo;
                </p>
              </div>

              <div className="pt-6 flex flex-wrap gap-4">
                <Button href="/projeto" variant="primary">
                  Conhecer o Projeto
                </Button>
                <Button
                  href={INSTITUTIONAL_INFO.communityLinks.instagram}
                  isExternal
                  variant="secondary"
                >
                  Seguir no Instagram
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CALL TO ACTION
          ========================================================================= */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center space-y-8" aria-label="Junta-te ao projecto">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-red block">
            Junta-te ao Projecto
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary-white">
            Não precisas de caminhar sozinha.
          </h2>
          <p className="font-sans text-base sm:text-lg text-brand-gray max-w-2xl mx-auto leading-relaxed">
            {INSTITUTIONAL_INFO.objective}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Button
            href={INSTITUTIONAL_INFO.communityLinks.instagram}
            isExternal
            variant="danger"
            size="lg"
          >
            Seguir no Instagram
          </Button>
          <Button href="/contacto" variant="secondary" size="lg">
            Falar Connosco
          </Button>
        </div>
      </section>
    </div>
  );
}
