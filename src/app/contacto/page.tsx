import React from "react";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { ContactoForm } from "./ContactoPage";

const SITE_URL = "https://www.maesinvesiveis.com";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Entre em contacto com o Projecto Mães-Invisíveis. Estamos disponíveis para acolher novas famílias, voluntários e parceiros.",
  alternates: {
    canonical: `${SITE_URL}/contacto`,
  },
  openGraph: {
    title: "Contacto | Mães Invisíveis",
    description:
      "Entre em contacto com o Projecto Mães-Invisíveis.",
    url: `${SITE_URL}/contacto`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Mães Invisíveis — Contacto" }],
  },
};

export default function ContactoPage() {
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

      {/* Client form component */}
      <ContactoForm />
    </div>
  );
}
