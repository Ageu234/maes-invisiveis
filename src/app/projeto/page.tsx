import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, ShieldCheck, Users, Camera, Sparkles } from "lucide-react";
import { INSTITUTIONAL_INFO } from "@/lib/content";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "O Projeto",
  description:
    "Conheça o movimento Mães Invisíveis, fundado por Adalgiza Baptista para combater o isolamento e devolver dignidade a mães de filhos atípicos.",
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
          title="O Projeto Mães Invisíveis"
          subtitle="Uma iniciativa documental e humana que desafia a indiferença social, dando voz, dignidade e rede a quem cuida todos os dias sem descanso."
        />
      </div>

      {/* =========================================================================
          ORIGINS & PURPOSE SECTION
          ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Full-body Portrait of Adalgiza Baptista */}
        <div className="lg:col-span-5 space-y-4">
          <div className="border border-gray-dark bg-charcoal-deep p-4">
            <div className="relative aspect-[3/4] overflow-hidden bg-primary-black">
              <Image
                src="/media/adalgiza-corpo-inteiro.jpg"
                alt="Adalgiza Baptista, Fundadora do projeto Mães Invisíveis"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover contrast-105"
              />
              <div className="absolute top-4 left-4 bg-primary-black/90 px-3 py-1.5 border border-gray-dark">
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-red font-semibold">
                  Adalgiza Baptista / Fundadora
                </span>
              </div>
            </div>
            <div className="pt-3 text-center font-mono text-[11px] text-brand-gray">
              Liderança e representação pública do projeto Mães Invisíveis
            </div>
          </div>
        </div>

        {/* Right Column: Narrative of Purpose */}
        <div className="lg:col-span-7 space-y-8 font-sans text-brand-gray text-base sm:text-lg leading-relaxed">
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-red block">
              Génese & Propósito
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary-white font-semibold">
              Por que nasceu o Mães Invisíveis?
            </h2>
            <p className="text-white-soft/90">
              Na maioria das sociedades, o nascimento de um filho atípico ou com deficiência desencadeia um processo silencioso de afastamento. As mães assumem, frequentemente sozinhas, uma rotina de dedicação total que as afasta do mercado de trabalho, da vida social e dos espaços de lazer.
            </p>
            <p>
              Ao enfrentar essa vivência diária, <strong className="text-primary-white">Adalgiza Baptista</strong> recusou a ideia de que o silêncio e o isolamento devessem ser o destino inevitável destas famílias. O projeto Mães Invisíveis surge precisamente dessa recusa: para afirmar que ignorar não faz desaparecer a realidade.
            </p>
          </div>

          {/* Core Institutional Statement */}
          <div className="p-8 border border-gray-dark bg-charcoal-deep space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-red block">
              O Nosso Compromisso
            </span>
            <blockquote className="font-serif text-2xl text-white-soft italic border-l-2 border-brand-red pl-4 py-1 leading-snug">
              &ldquo;{INSTITUTIONAL_INFO.brandStatement}&rdquo;
            </blockquote>
            <p className="font-sans text-sm text-brand-gray pt-1">
              Mães de filhos atípicos: ignoradas, sozinhas, mas presentes. Damos voz ao que o mundo finge não ver.
            </p>
          </div>

          <p>
            Mais do que documentar a dor, o projeto celebra a força extraordinária de quem cuida. Queremos que cada mãe olhe para a sua própria história com orgulho, sabendo que a sua dedicação é um ato inestimável de humanidade.
          </p>
        </div>
      </section>

      {/* =========================================================================
          STRATEGIC PILLARS / EIXOS DE ATUAÇÃO
          ========================================================================= */}
      <section className="space-y-12">
        <SectionHeading
          badge="Linhas de Ação"
          title="Os Eixos Estruturais do Movimento"
          subtitle="A nossa atuação divide-se em quatro pilares fundamentais para transformar a perceção social sobre a maternidade atípica."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 border border-gray-dark bg-charcoal-deep space-y-4 hover:border-gray-dark/80 transition-colors">
            <div className="w-10 h-10 bg-primary-black border border-gray-dark flex items-center justify-center text-brand-red">
              <Camera className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs text-brand-red block">Eixo 01</span>
            <h3 className="font-serif text-2xl text-primary-white font-semibold">
              Registo Documental
            </h3>
            <p className="font-sans text-sm text-brand-gray leading-relaxed">
              Captar a realidade sem filtros, através de fotografia e vídeo documental que retratam a ternura, o cansaço e a verdade diária das famílias.
            </p>
          </div>

          <div className="p-6 border border-gray-dark bg-charcoal-deep space-y-4 hover:border-gray-dark/80 transition-colors">
            <div className="w-10 h-10 bg-primary-black border border-gray-dark flex items-center justify-center text-brand-red">
              <Users className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs text-brand-red block">Eixo 02</span>
            <h3 className="font-serif text-2xl text-primary-white font-semibold">
              Rede de Acolhimento
            </h3>
            <p className="font-sans text-sm text-brand-gray leading-relaxed">
              Proporcionar um espaço seguro e comunitário onde mães possam partilhar desafios, recursos e apoio emocional sem medo de julgamentos.
            </p>
          </div>

          <div className="p-6 border border-gray-dark bg-charcoal-deep space-y-4 hover:border-gray-dark/80 transition-colors">
            <div className="w-10 h-10 bg-primary-black border border-gray-dark flex items-center justify-center text-brand-red">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs text-brand-red block">Eixo 03</span>
            <h3 className="font-serif text-2xl text-primary-white font-semibold">
              Sensibilização Pública
            </h3>
            <p className="font-sans text-sm text-brand-gray leading-relaxed">
              Desafiar o estigma social e confrontar a sociedade com a urgência de inclusão e respeito para com as mães de crianças atípicas.
            </p>
          </div>

          <div className="p-6 border border-gray-dark bg-charcoal-deep space-y-4 hover:border-brand-red transition-colors">
            <div className="w-10 h-10 bg-primary-black border border-gray-dark flex items-center justify-center text-brand-red">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs text-brand-red block">Eixo 04</span>
            <h3 className="font-serif text-2xl text-primary-white font-semibold">
              Defesa da Dignidade
            </h3>
            <p className="font-sans text-sm text-brand-gray leading-relaxed">
              Afirmar que cuidar não é apenas um encargo doméstico, mas uma contribuição social vital que merece reconhecimento cívico e institucional.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          EDITORIAL DIALOGUE & HORIZONS
          ========================================================================= */}
      <section className="border border-gray-dark bg-charcoal-deep p-8 sm:p-12 space-y-8">
        <div className="max-w-3xl space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-red block">
            Construção Contínua
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-primary-white">
            Uma Plataforma Viva ao Serviço das Mães
          </h2>
          <p className="font-sans text-base text-brand-gray leading-relaxed">
            O Mães Invisíveis está a estruturar novas frentes de documentação e articulação comunitária. Sob a coordenação contínua de <strong className="text-white-soft">Adalgiza Baptista</strong>, a plataforma continuará a expandir as suas histórias, estudos e diálogos institucionais.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap items-center gap-4">
          <Button
            href={INSTITUTIONAL_INFO.communityLinks.whatsappCommunity}
            isExternal
            variant="danger"
          >
            Fazer Parte da Comunidade WhatsApp
          </Button>
          <Button href="/historias" variant="secondary">
            Ver Relatos do Arquivo
          </Button>
          <Button
            href={INSTITUTIONAL_INFO.communityLinks.instagram}
            isExternal
            variant="ghost"
          >
            Instagram Oficial <ArrowUpRight className="w-4 h-4 ml-1 inline" />
          </Button>
        </div>
      </section>
    </div>
  );
}
