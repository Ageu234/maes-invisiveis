import React from "react";
import type { Metadata } from "next";
import { ArrowUpRight, MessageCircle, Share2, Handshake, HeartHandshake } from "lucide-react";
import { INSTITUTIONAL_INFO } from "@/lib/content";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Apoiar a Causa",
  description:
    "Descubra as formas de apoiar o movimento Mães Invisíveis: comunidade, partilha e diálogo com a liderança de Adalgiza Baptista.",
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
          subtitle="A invisibilidade combate-se com presença diária, escuta atenta e envolvimento cívico. Existem várias formas concretas de fazer a diferença."
        />
      </div>

      {/* =========================================================================
          THREE CONCRETE ACTION PATHS
          ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1: For Mothers (Community) */}
        <div className="border border-gray-dark bg-charcoal-deep p-8 flex flex-col justify-between space-y-8 group hover:border-brand-red transition-colors">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary-black border border-gray-dark flex items-center justify-center text-brand-red group-hover:border-brand-red transition-colors">
              <MessageCircle className="w-6 h-6" />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-brand-red block">
              Para Mães & Cuidadores
            </span>
            <h3 className="font-serif text-3xl font-semibold text-primary-white">
              Entrar na Comunidade
            </h3>
            <p className="font-sans text-sm text-brand-gray leading-relaxed">
              Se és mãe de uma criança atípica, junta-te ao nosso grupo de WhatsApp. Um espaço seguro de partilha, acolhimento mútuo e esclarecimento de dúvidas do quotidiano.
            </p>
          </div>

          <Button
            href={INSTITUTIONAL_INFO.communityLinks.whatsappCommunity}
            isExternal
            variant="danger"
            size="md"
            className="w-full"
          >
            Aceder ao Grupo WhatsApp
          </Button>
        </div>

        {/* Card 2: For Supporters / Amplification */}
        <div className="border border-gray-dark bg-charcoal-deep p-8 flex flex-col justify-between space-y-8 group hover:border-brand-red transition-colors">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary-black border border-gray-dark flex items-center justify-center text-brand-red group-hover:border-brand-red transition-colors">
              <Share2 className="w-6 h-6" />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-brand-red block">
              Sensibilização Pública
            </span>
            <h3 className="font-serif text-3xl font-semibold text-primary-white">
              Amplificar a Mensagem
            </h3>
            <p className="font-sans text-sm text-brand-gray leading-relaxed">
              O silêncio quebra-se conversando. Partilha as publicações, fala sobre a realidade da maternidade atípica nos teus círculos e ajuda-nos a tornar o invisível visível.
            </p>
          </div>

          <Button
            href={INSTITUTIONAL_INFO.communityLinks.instagram}
            isExternal
            variant="secondary"
            size="md"
            className="w-full"
          >
            Seguir no Instagram <ArrowUpRight className="w-4 h-4 ml-1 inline" />
          </Button>
        </div>

        {/* Card 3: Institutional & Professionals */}
        <div className="border border-gray-dark bg-charcoal-deep p-8 flex flex-col justify-between space-y-8 group hover:border-brand-red transition-colors">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary-black border border-gray-dark flex items-center justify-center text-brand-red group-hover:border-brand-red transition-colors">
              <Handshake className="w-6 h-6" />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-brand-red block">
              Parcerias & Voluntariado
            </span>
            <h3 className="font-serif text-3xl font-semibold text-primary-white">
              Colaboração Direta
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
          DIGNIFIED TRANSPARENCY NOTE (Financial channels pending formalization)
          ========================================================================= */}
      <div className="border border-gray-dark bg-primary-black p-8 sm:p-12 space-y-6">
        <div className="flex items-center space-x-3 text-brand-red">
          <HeartHandshake className="w-6 h-6" />
          <span className="font-mono text-xs uppercase tracking-widest font-semibold">
            Transparência & Canais de Apoio
          </span>
        </div>

        <div className="max-w-3xl space-y-4 font-sans text-brand-gray text-base leading-relaxed">
          <h3 className="font-serif text-2xl sm:text-3xl text-primary-white font-semibold">
            Estruturação e Responsabilidade
          </h3>
          <p>
            O projeto Mães Invisíveis preza pelo rigor e pela transparência absoluta em todas as suas iniciativas. De momento, os mecanismos formais de doação financeira direta encontram-se em processo de consolidação institucional e jurídica sob a liderança de <strong className="text-white-soft">Adalgiza Baptista</strong>.
          </p>
          <p>
            Qualquer proposta de apoio em bens, serviços especializados ou patrocínio de eventos de acolhimento deve ser remetida diretamente através da nossa página de contacto para análise individualizada.
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
