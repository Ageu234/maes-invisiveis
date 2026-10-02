import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Heart, Shield, Eye } from "lucide-react";
import { INITIAL_STORIES, INSTITUTIONAL_INFO } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Manifesto } from "@/components/editorial/Manifesto";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { StoryCard } from "@/components/editorial/StoryCard";

export default function HomePage() {
  return (
    <div className="space-y-24 sm:space-y-36">
      {/* =========================================================================
          HERO SECTION: High-impact Editorial Asymmetric Composition
          ========================================================================= */}
      <section className="relative pt-6 sm:pt-14 pb-16 px-4 sm:px-6 lg:px-8 border-b border-gray-dark">
        <div className="max-w-[1280px] mx-auto">
          {/* Top Archival Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-gray-dark text-brand-gray font-mono text-[11px] uppercase tracking-widest">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 bg-brand-red inline-block" />
              <span className="text-white-soft">Arquivo Documental & Plataforma Institucional</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Fundadora: Adalgiza Baptista</span>
              <span className="text-gray-dark">•</span>
              <span>Registo Ativo</span>
            </div>
          </div>

          {/* Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 lg:pt-16 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-widest text-brand-red block">
                  Movimento Mães Invisíveis
                </span>
                <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-primary-white leading-[1.04]">
                  IGNORAR <span className="text-brand-red">NÃO</span> FAZ DESAPARECER.
                </h1>
              </div>

              <div className="max-w-xl space-y-5 text-brand-gray font-sans text-base sm:text-lg leading-relaxed">
                <p className="text-white-soft font-serif text-2xl sm:text-3xl leading-snug font-light">
                  Mães de filhos atípicos. Ignoradas, sozinhas, mas presentes. Damos voz ao que o mundo finge não ver.
                </p>
                <p className="text-brand-gray text-sm sm:text-base leading-relaxed">
                  Um projeto editorial e documental fundado por{" "}
                  <strong className="text-primary-white font-medium">Adalgiza Baptista</strong> para romper o silêncio, documentar a realidade das famílias e construir uma rede viva de acolhimento mútuo.
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
                  href={INSTITUTIONAL_INFO.communityLinks.whatsappCommunity}
                  isExternal
                  variant="danger"
                  size="lg"
                >
                  Junta-te à Comunidade
                </Button>
              </div>

              {/* Scroll Narrative Hint */}
              <div className="pt-8 hidden sm:flex items-center space-x-2 text-brand-gray font-mono text-[11px] uppercase tracking-wider">
                <ArrowDown className="w-3.5 h-3.5 text-brand-red animate-bounce" />
                <span>Explorar arquivo e testemunhos abaixo</span>
              </div>
            </div>

            {/* Right Hero Photographic Composition */}
            <div className="lg:col-span-5">
              <div className="relative border border-gray-dark bg-charcoal-deep p-4 group">
                <div className="relative aspect-[4/5] overflow-hidden bg-primary-black">
                  <Image
                    src="/media/adalgiza-e-filho-documental.jpg"
                    alt="Adalgiza Baptista abraçando ternamente o filho"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover contrast-110 grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                  />

                  {/* Corner Documentary Stamp */}
                  <div className="absolute top-4 left-4 bg-primary-black/90 px-3 py-1.5 border border-gray-dark">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white-soft">
                      DOC. N.º 01 / REGISTO CENTRAL
                    </span>
                  </div>

                  {/* Bottom Vignette Caption */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-primary-black/90 via-primary-black/40 to-transparent p-4 flex items-end justify-between font-mono text-[11px] text-white-soft">
                    <span>Adalgiza Baptista & Filho</span>
                    <span className="text-brand-red font-semibold">2026</span>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between font-mono text-[10px] text-brand-gray">
                  <span>Registo Fotográfico Autêntico</span>
                  <span className="uppercase tracking-wider">Acervo Mães Invisíveis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          THE THREE PILLARS: High-contrast Editorial Statement
          ========================================================================= */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 border border-gray-dark bg-charcoal-deep flex flex-col justify-between space-y-6 hover:border-gray-dark/80 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs text-brand-red">
                <span>01 / PILAR</span>
                <Eye className="w-5 h-5 text-brand-gray" />
              </div>
              <h3 className="font-serif text-3xl font-semibold text-primary-white">
                Ignoradas
              </h3>
              <p className="font-sans text-sm text-brand-gray leading-relaxed">
                Pela sociedade, pelas estruturas urbanas e pelas conversas públicas. Rompemos a barreira da indiferença para tornar visível o que é propositadamente esquecido.
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
                <Shield className="w-5 h-5 text-brand-gray" />
              </div>
              <h3 className="font-serif text-3xl font-semibold text-primary-white">
                Sozinhas
              </h3>
              <p className="font-sans text-sm text-brand-gray leading-relaxed">
                No peso dos cuidados diários, na escassez de recursos e na solidão emocional. Construímos uma rede onde nenhuma mãe atípica precisa de caminhar desamparada.
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
                <Heart className="w-5 h-5 text-brand-red" />
              </div>
              <h3 className="font-serif text-3xl font-semibold text-primary-white">
                Mas Presentes.
              </h3>
              <p className="font-sans text-sm text-brand-gray leading-relaxed">
                Inabaláveis no amor, na resistência diária e na defesa intransigente dos seus filhos. A presença materna atípica é uma força que transforma a realidade.
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
          FEATURED STORIES / DOCUMENTARY ARCHIVE
          ========================================================================= */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-dark">
          <SectionHeading
            badge="02 / Registos & Vivências"
            title="Histórias de Amor e Resistência"
            subtitle="Retratos genuínos de mães que sustentam o cuidado diário e enfrentam a indiferença social com afeto incondicional."
          />
          <Button href="/historias" variant="ghost" size="sm" className="shrink-0">
            Explorar Todo o Arquivo <ArrowUpRight className="w-4 h-4 ml-1 inline" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INITIAL_STORIES.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      {/* =========================================================================
          FOUNDER SPOTLIGHT (Adalgiza Baptista)
          ========================================================================= */}
      <section className="bg-charcoal-deep border-y border-gray-dark py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Founder Portrait */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative border border-gray-dark p-3 bg-primary-black">
                <div className="relative aspect-[4/5] overflow-hidden bg-charcoal-deep">
                  <Image
                    src="/media/adalgiza-retrato.jpg"
                    alt="Retrato oficial de Adalgiza Baptista, Fundadora do projeto Mães Invisíveis"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover contrast-110 grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute bottom-4 left-4 bg-primary-black/90 px-3 py-1.5 border border-gray-dark">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-brand-red font-semibold">
                      Adalgiza Baptista — Fundadora
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
                badge="03 / A Fundadora"
                title="A Voz que Recusou a Invisibilidade"
                subtitle="Transformando uma vivência pessoal numa causa coletiva de visibilidade, dignidade e acolhimento."
              />

              <div className="space-y-4 font-sans text-brand-gray text-base sm:text-lg leading-relaxed">
                <p>
                  O projeto Mães Invisíveis nasceu da coragem e do olhar de{" "}
                  <strong className="text-primary-white">Adalgiza Baptista</strong>. Ao vivenciar a maternidade de um filho atípico, compreendeu que o isolamento que sentia não era uma circunstância rara, mas sim o reflexo de uma sociedade que habitualmente desvia o olhar.
                </p>
                <p>
                  Recusando o silêncio, Adalgiza decidiu dar a cara e a voz por todas as mulheres que cuidam em solidão. O movimento não procura comiseração nem complacência, mas sim o pleno reconhecimento dos direitos, da dignidade e do valor social das mães e dos seus filhos.
                </p>
                <p className="font-serif text-xl sm:text-2xl text-white-soft italic pt-2 border-l-2 border-brand-red pl-4">
                  &ldquo;Dar visibilidade às mães que carregam nos braços os filhos e nos ombros o silêncio do mundo.&rdquo;
                </p>
              </div>

              <div className="pt-6 flex flex-wrap gap-4">
                <Button href="/projeto" variant="primary">
                  Conhecer o Projeto e Visão
                </Button>
                <Button
                  href={INSTITUTIONAL_INFO.communityLinks.instagram}
                  isExternal
                  variant="secondary"
                >
                  Seguir no Instagram Oficial
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CALL TO ACTION / JUNTA-TE À COMUNIDADE
          ========================================================================= */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center space-y-8">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-red block">
            Junta-te à Comunidade
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary-white">
            Não precisas de caminhar sozinha.
          </h2>
          <p className="font-sans text-base sm:text-lg text-brand-gray max-w-2xl mx-auto leading-relaxed">
            Se és mãe de um filho atípico ou desejas apoiar ativamente a nossa causa, entra na nossa comunidade. Juntas, damos voz ao que o mundo finge não ver.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Button
            href={INSTITUTIONAL_INFO.communityLinks.whatsappCommunity}
            isExternal
            variant="danger"
            size="lg"
          >
            Entrar na Comunidade WhatsApp
          </Button>
          <Button href="/contacto" variant="secondary" size="lg">
            Falar Connosco
          </Button>
        </div>
      </section>
    </div>
  );
}
