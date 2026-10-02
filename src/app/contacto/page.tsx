"use client";

import React, { useState } from "react";
import { ArrowUpRight, MessageCircle, CheckCircle2 } from "lucide-react";
import { INSTITUTIONAL_INFO } from "@/lib/content";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { Button } from "@/components/ui/Button";

export default function ContactoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    subject: "Acolhimento / Apoio",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulated responsive feedback for Phase 2 (prior to Phase 3 Supabase integration)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-16 sm:space-y-24">
      {/* =========================================================================
          PAGE HEADER
          ========================================================================= */}
      <div className="border-b border-gray-dark pb-12 space-y-4">
        <SectionHeading
          badge="Canais Oficiais"
          title="Fale com as Mães Invisíveis"
          subtitle="Estamos disponíveis para acolher novas famílias, dialogar com voluntários e cooperar com quem deseja somar forças à nossa causa."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* =========================================================================
            CONTACT FORM
            ========================================================================= */}
        <div className="lg:col-span-7">
          <div className="border border-gray-dark bg-charcoal-deep p-8 sm:p-10 space-y-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-brand-red block mb-2">
                Mensagem Direta
              </span>
              <h3 className="font-serif text-3xl font-semibold text-primary-white">
                Enviar uma Mensagem
              </h3>
              <p className="font-sans text-sm text-brand-gray mt-2">
                Preencha os campos abaixo. A sua mensagem será recebida com a máxima discrição e respeito.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 border border-brand-red bg-primary-black space-y-4 text-center">
                <CheckCircle2 className="w-12 h-12 text-brand-red mx-auto" />
                <h4 className="font-serif text-2xl text-primary-white font-semibold">
                  Mensagem Enviada
                </h4>
                <p className="font-sans text-sm text-brand-gray max-w-md mx-auto">
                  Agradecemos o seu contacto. A equipa do projeto Mães Invisíveis e a coordenação de Adalgiza Baptista darão retorno assim que possível.
                </p>
                <div className="pt-2">
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        contact: "",
                        subject: "Acolhimento / Apoio",
                        message: "",
                      });
                    }}
                    variant="secondary"
                    size="sm"
                  >
                    Enviar Outra Mensagem
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="font-mono text-xs uppercase tracking-wider text-brand-gray block"
                  >
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="O seu nome"
                    className="w-full bg-primary-black border border-gray-dark px-4 py-3 text-sm text-primary-white placeholder-brand-gray/50 focus:border-brand-red focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact"
                    className="font-mono text-xs uppercase tracking-wider text-brand-gray block"
                  >
                    Contacto (WhatsApp ou E-mail) *
                  </label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="Ex: número de WhatsApp ou e-mail de contacto"
                    className="w-full bg-primary-black border border-gray-dark px-4 py-3 text-sm text-primary-white placeholder-brand-gray/50 focus:border-brand-red focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="font-mono text-xs uppercase tracking-wider text-brand-gray block"
                  >
                    Motivo do Contacto
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-primary-black border border-gray-dark px-4 py-3 text-sm text-primary-white focus:border-brand-red focus:outline-none transition-colors"
                  >
                    <option value="Acolhimento / Apoio">Sou mãe de uma criança atípica (Apoio)</option>
                    <option value="Partilha de História">Quero partilhar a minha história</option>
                    <option value="Parceria / Colaboração">Proposta de parceria / Voluntariado</option>
                    <option value="Outro">Outro assunto</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="font-mono text-xs uppercase tracking-wider text-brand-gray block"
                  >
                    A sua Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Escreva aqui a sua mensagem com tranquilidade..."
                    className="w-full bg-primary-black border border-gray-dark px-4 py-3 text-sm text-primary-white placeholder-brand-gray/50 focus:border-brand-red focus:outline-none transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="danger"
                  size="md"
                  disabled={loading}
                  className="w-full sm:w-auto"
                >
                  {loading ? "A enviar..." : "Enviar Mensagem"}
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* =========================================================================
            COMMUNITY & OFFICIAL CHANNELS (Right Column)
            ========================================================================= */}
        <div className="lg:col-span-5 space-y-8">
          <div className="border border-gray-dark bg-charcoal-deep p-8 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-red block">
              Comunidade Ativa
            </span>
            <h3 className="font-serif text-2xl font-semibold text-primary-white">
              Canais Oficiais Imediatos
            </h3>
            <p className="font-sans text-sm text-brand-gray leading-relaxed">
              Para contacto instantâneo ou para te juntares à comunidade de apoio mútuo, utiliza os nossos canais públicos oficiais:
            </p>

            <div className="space-y-4 pt-2">
              <a
                href={INSTITUTIONAL_INFO.communityLinks.whatsappCommunity}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 border border-gray-dark bg-primary-black hover:border-brand-red transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-charcoal-deep border border-gray-dark flex items-center justify-center text-brand-red">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-serif text-lg text-primary-white block group-hover:text-brand-red transition-colors">
                      Comunidade WhatsApp
                    </span>
                    <span className="font-mono text-xs text-brand-gray">
                      Espaço seguro para mães
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-brand-gray group-hover:text-brand-red transition-colors" />
              </a>

              <a
                href={INSTITUTIONAL_INFO.communityLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 border border-gray-dark bg-primary-black hover:border-brand-red transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-charcoal-deep border border-gray-dark flex items-center justify-center text-brand-red">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-serif text-lg text-primary-white block group-hover:text-brand-red transition-colors">
                      Instagram Oficial
                    </span>
                    <span className="font-mono text-xs text-brand-gray">
                      @maes_invisiveis
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-brand-gray group-hover:text-brand-red transition-colors" />
              </a>
            </div>
          </div>

          {/* Institutional Integrity Note */}
          <div className="border border-gray-dark bg-primary-black p-8 space-y-3 font-mono text-xs text-brand-gray">
            <span className="text-brand-red uppercase tracking-wider block font-semibold">
              Coordenação Geral
            </span>
            <p className="font-sans text-sm text-white-soft">
              Liderança executiva do projeto assegurada por{" "}
              <strong>Adalgiza Baptista</strong>.
            </p>
            <p className="font-sans text-xs text-brand-gray leading-relaxed pt-1">
              Todos os relatos e pedidos de apoio remetidos através desta plataforma são tratados com rigor ético e estrita salvaguarda da privacidade de cada família.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
