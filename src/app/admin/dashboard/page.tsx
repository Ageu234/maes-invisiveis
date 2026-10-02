"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Mail,
  CheckCircle,
  Clock,
  PlusCircle,
  ArrowRight,
  ExternalLink,
  Settings,
  Eye,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { INITIAL_STORIES } from "@/lib/content";

interface DashboardStats {
  totalStories: number;
  publishedStories: number;
  draftStories: number;
  totalMessages: number;
  unreadMessages: number;
}

interface RecentStory {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
}

interface RecentMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  status: "unread" | "read" | "archived";
  created_at: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalStories: INITIAL_STORIES.length,
    publishedStories: INITIAL_STORIES.length,
    draftStories: 0,
    totalMessages: 0,
    unreadMessages: 0,
  });

  const [recentStories, setRecentStories] = useState<RecentStory[]>([]);
  const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      const supabase = createClient();
      if (!supabase) {
        // Fallback para estado inicial estático
        setRecentStories(
          INITIAL_STORIES.map((s) => ({
            id: s.id,
            title: s.title,
            slug: s.slug,
            status: "published",
            published_at: "2026-01-01",
            created_at: "2026-01-01",
          }))
        );
        setLoading(false);
        return;
      }

      try {
        // 1. Obter histórias
        const { data: storiesData } = await supabase
          .from("stories")
          .select("id, title, slug, status, published_at, created_at")
          .order("created_at", { ascending: false });

        if (storiesData && storiesData.length > 0) {
          const published = storiesData.filter((s) => s.status === "published").length;
          const drafts = storiesData.filter((s) => s.status === "draft").length;

          setStats((prev) => ({
            ...prev,
            totalStories: storiesData.length,
            publishedStories: published,
            draftStories: drafts,
          }));

          setRecentStories(storiesData.slice(0, 5));
        } else {
          // Fallback se tabela stories estiver vazia
          setRecentStories(
            INITIAL_STORIES.map((s) => ({
              id: s.id,
              title: s.title,
              slug: s.slug,
              status: "published",
              published_at: "2026-01-01",
              created_at: "2026-01-01",
            }))
          );
        }

        // 2. Obter mensagens de contacto
        const { data: messagesData } = await supabase
          .from("contact_messages")
          .select("id, name, email, subject, status, created_at")
          .order("created_at", { ascending: false });

        if (messagesData) {
          const unread = messagesData.filter((m) => m.status === "unread").length;
          setStats((prev) => ({
            ...prev,
            totalMessages: messagesData.length,
            unreadMessages: unread,
          }));
          setRecentMessages(messagesData.slice(0, 5));
        }
      } catch (err) {
        console.error("Erro ao carregar dados do dashboard:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-dark pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-brand-red block mb-1">
            Painel Geral
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary-white">
            Dashboard
          </h1>
          <p className="font-sans text-xs text-brand-gray mt-1">
            Gestão editorial e acompanhamento de contactos do Projecto Mães-Invisíveis
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/historias/nova"
            className="flex items-center space-x-2 py-2 px-4 bg-brand-red hover:bg-brand-red/90 text-primary-white font-mono text-xs uppercase tracking-wider transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Nova História</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="flex items-center space-x-2 py-2 px-4 border border-gray-dark hover:border-brand-gray text-primary-white font-mono text-xs uppercase tracking-wider transition-colors"
          >
            <span>Ver Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Histórias Publicadas */}
        <div className="p-6 border border-gray-dark bg-charcoal-deep space-y-3">
          <div className="flex items-center justify-between text-brand-gray">
            <span className="font-mono text-xs uppercase tracking-wider">Publicadas</span>
            <CheckCircle className="w-4 h-4 text-brand-red" />
          </div>
          <div className="font-serif text-3xl font-bold text-primary-white">
            {stats.publishedStories}
          </div>
          <p className="font-sans text-xs text-brand-gray">
            Histórias visíveis no website público
          </p>
        </div>

        {/* Rascunhos */}
        <div className="p-6 border border-gray-dark bg-charcoal-deep space-y-3">
          <div className="flex items-center justify-between text-brand-gray">
            <span className="font-mono text-xs uppercase tracking-wider">Rascunhos</span>
            <Clock className="w-4 h-4 text-brand-gray" />
          </div>
          <div className="font-serif text-3xl font-bold text-primary-white">
            {stats.draftStories}
          </div>
          <p className="font-sans text-xs text-brand-gray">
            Em edição, não visíveis ao público
          </p>
        </div>

        {/* Mensagens Não Lidas */}
        <div className="p-6 border border-gray-dark bg-charcoal-deep space-y-3">
          <div className="flex items-center justify-between text-brand-gray">
            <span className="font-mono text-xs uppercase tracking-wider">Mensagens Novas</span>
            <Mail className="w-4 h-4 text-brand-red" />
          </div>
          <div className="font-serif text-3xl font-bold text-primary-white">
            {stats.unreadMessages}
          </div>
          <p className="font-sans text-xs text-brand-gray">
            Pedidos de acolhimento e contacto pendentes
          </p>
        </div>

        {/* Total de Histórias */}
        <div className="p-6 border border-gray-dark bg-charcoal-deep space-y-3">
          <div className="flex items-center justify-between text-brand-gray">
            <span className="font-mono text-xs uppercase tracking-wider">Total Acervo</span>
            <BookOpen className="w-4 h-4 text-brand-gray" />
          </div>
          <div className="font-serif text-3xl font-bold text-primary-white">
            {stats.totalStories}
          </div>
          <p className="font-sans text-xs text-brand-gray">
            Registos fotográficos no arquivo
          </p>
        </div>
      </div>

      {/* Content Grid: Recent Stories & Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Stories (Left 7 Cols) */}
        <div className="lg:col-span-7 border border-gray-dark bg-charcoal-deep p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-dark pb-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-brand-red" />
              <h2 className="font-serif text-xl font-semibold text-primary-white">
                Histórias Recentes
              </h2>
            </div>
            <Link
              href="/admin/historias"
              className="font-mono text-xs uppercase text-brand-gray hover:text-brand-red transition-colors flex items-center space-x-1"
            >
              <span>Ver todas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-gray-dark/50">
            {recentStories.map((story) => (
              <div
                key={story.id}
                className="py-4 flex items-center justify-between gap-4 group"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        story.status === "published" ? "bg-emerald-500" : "bg-amber-500"
                      }`}
                    />
                    <h3 className="font-serif text-base text-primary-white truncate group-hover:text-brand-red transition-colors">
                      {story.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] text-brand-gray block">
                    /{story.slug}
                  </span>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <span
                    className={`font-mono text-[10px] uppercase px-2 py-0.5 border ${
                      story.status === "published"
                        ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                        : "border-amber-500/30 text-amber-400 bg-amber-500/10"
                    }`}
                  >
                    {story.status === "published" ? "Publicado" : "Rascunho"}
                  </span>
                  <Link
                    href={`/admin/historias/${story.id}`}
                    className="p-1.5 text-brand-gray hover:text-primary-white border border-transparent hover:border-gray-dark transition-colors"
                    title="Editar história"
                  >
                    <Settings className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Contact Messages (Right 5 Cols) */}
        <div className="lg:col-span-5 border border-gray-dark bg-charcoal-deep p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-dark pb-4">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-brand-red" />
              <h2 className="font-serif text-xl font-semibold text-primary-white">
                Mensagens de Contacto
              </h2>
            </div>
            <Link
              href="/admin/contactos"
              className="font-mono text-xs uppercase text-brand-gray hover:text-brand-red transition-colors flex items-center space-x-1"
            >
              <span>Ver todas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentMessages.length === 0 ? (
            <div className="py-10 text-center font-mono text-xs text-brand-gray space-y-2">
              <Mail className="w-8 h-8 text-gray-dark mx-auto" />
              <p>Nenhuma mensagem recebida ainda.</p>
              <p className="text-[11px] text-brand-gray/60">
                As mensagens enviadas pelo formulário público surgirão aqui.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-dark/50">
              {recentMessages.map((msg) => (
                <div key={msg.id} className="py-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm text-primary-white font-medium">
                      {msg.name}
                    </span>
                    <span
                      className={`font-mono text-[9px] uppercase px-1.5 py-0.5 border ${
                        msg.status === "unread"
                          ? "border-brand-red text-brand-red bg-brand-red/10"
                          : "border-gray-dark text-brand-gray"
                      }`}
                    >
                      {msg.status === "unread" ? "Nova" : "Lida"}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-brand-gray truncate">
                    {msg.subject || "Sem assunto"} • {msg.email}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
