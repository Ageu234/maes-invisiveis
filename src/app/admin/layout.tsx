import React from "react";
import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "CMS Administrativo | Mães Invisíveis",
  description: "Painel de gestão de conteúdos do Projecto Mães-Invisíveis",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
