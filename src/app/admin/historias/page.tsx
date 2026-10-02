"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  PlusCircle,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { INITIAL_STORIES } from "@/lib/content";

interface StoryItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
}

export default function AdminHistoriasPage() {
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadStories = async () => {
    setLoading(true);
    const supabase = createClient();

    if (!supabase) {
      // Fallback para as histórias iniciais
      setStories(
        INITIAL_STORIES.map((s) => ({
          id: s.id,
          title: s.title,
          slug: s.slug,
          summary: s.excerpt,
          status: "published",
          published_at: "2026-01-01",
          created_at: "2026-01-01",
        }))
      );
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("stories")
        .select("id, title, slug, summary, status, published_at, created_at")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setStories(data);
      } else {
        setStories(
          INITIAL_STORIES.map((s) => ({
            id: s.id,
            title: s.title,
            slug: s.slug,
            summary: s.excerpt,
            status: "published",
            published_at: "2026-01-01",
            created_at: "2026-01-01",
          }))
        );
      }
    } catch (err: unknown) {
      console.error("Erro ao carregar histórias:", err);
      setNotification({
        type: "error",
        text: "Não foi possível carregar a lista do Supabase. A apresentar dados locais.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStories();
  }, []);

  const handleToggleStatus = async (story: StoryItem) => {
    const supabase = createClient();
    if (!supabase) {
      setNotification({
        type: "error",
        text: "Supabase não configurado. Configure as credenciais no .env.local para persistir.",
      });
      return;
    }

    const newStatus = story.status === "published" ? "draft" : "published";
    setActionLoading(story.id);

    try {
      const { error } = await supabase
        .from("stories")
        .update({
          status: newStatus,
          published_at: newStatus === "published" ? new Date().toISOString() : story.published_at,
        })
        .eq("id", story.id);

      if (error) throw error;

      setStories((prev) =>
        prev.map((s) => (s.id === story.id ? { ...s, status: newStatus } : s))
      );

      setNotification({
        type: "success",
        text: `História "${story.title}" ${newStatus === "published" ? "publicada" : "movida para rascunho"}.`,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao alterar estado.";
      setNotification({ type: "error", text: msg });
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (story: StoryItem) => {
    if (!window.confirm(`Tem a certeza que deseja eliminar a história "${story.title}"?`)) {
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      setNotification({
        type: "error",
        text: "Supabase não configurado. Não é possível eliminar registos estáticos.",
      });
      return;
    }

    setActionLoading(story.id);

    try {
      const { error } = await supabase.from("stories").delete().eq("id", story.id);
      if (error) throw error;

      setStories((prev) => prev.filter((s) => s.id !== story.id));
      setNotification({
        type: "success",
        text: `História "${story.title}" eliminada com sucesso.`,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao eliminar história.";
      setNotification({ type: "error", text: msg });
    } finally {
      setActionLoading(null);
    }
  };

  const filteredStories = stories.filter((story) => {
    const matchesSearch =
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ? true : story.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-dark pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-brand-red block mb-1">
            Gestão Editorial
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary-white">
            Histórias &amp; Registos
          </h1>
          <p className="font-sans text-xs text-brand-gray mt-1">
            Crie, edite, publique ou despublique relatos e fotografias do acervo
          </p>
        </div>

        <Link
          href="/admin/historias/nova"
          className="flex items-center space-x-2 py-2.5 px-4 bg-brand-red hover:bg-brand-red/90 text-primary-white font-mono text-xs uppercase tracking-wider transition-colors self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Nova História</span>
        </Link>
      </div>

      {/* Notifications */}
      {notification && (
        <div
          role="alert"
          className={`p-4 border font-mono text-xs flex items-center justify-between ${
            notification.type === "success"
              ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
              : "border-brand-red bg-brand-red/10 text-brand-red"
          }`}
        >
          <span>{notification.text}</span>
          <button
            onClick={() => setNotification(null)}
            className="hover:underline ml-4"
          >
            ✕
          </button>
        </div>
      )}

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar por título ou slug..."
            className="w-full bg-charcoal-deep border border-gray-dark pl-10 pr-4 py-2 text-xs text-primary-white placeholder-brand-gray/50 focus:border-brand-red focus:outline-none transition-colors"
          />
          <Search className="w-4 h-4 text-brand-gray absolute left-3.5 top-2.5" />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-1 border border-gray-dark bg-charcoal-deep p-1 font-mono text-xs">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-3 py-1 transition-colors ${
              filterStatus === "all"
                ? "bg-primary-black text-brand-red font-semibold"
                : "text-brand-gray hover:text-primary-white"
            }`}
          >
            Todas ({stories.length})
          </button>
          <button
            onClick={() => setFilterStatus("published")}
            className={`px-3 py-1 transition-colors ${
              filterStatus === "published"
                ? "bg-primary-black text-brand-red font-semibold"
                : "text-brand-gray hover:text-primary-white"
            }`}
          >
            Publicadas ({stories.filter((s) => s.status === "published").length})
          </button>
          <button
            onClick={() => setFilterStatus("draft")}
            className={`px-3 py-1 transition-colors ${
              filterStatus === "draft"
                ? "bg-primary-black text-brand-red font-semibold"
                : "text-brand-gray hover:text-primary-white"
            }`}
          >
            Rascunhos ({stories.filter((s) => s.status === "draft").length})
          </button>
        </div>
      </div>

      {/* Stories Table */}
      <div className="border border-gray-dark bg-charcoal-deep overflow-x-auto">
        <table className="w-full text-left text-xs font-sans">
          <thead className="border-b border-gray-dark bg-primary-black font-mono text-[11px] text-brand-gray uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-4 sm:px-6">Título &amp; Identificador</th>
              <th className="py-3.5 px-4">Estado</th>
              <th className="py-3.5 px-4 hidden md:table-cell">Data</th>
              <th className="py-3.5 px-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-dark/50">
            {loading ? (
              <tr>
                <td colSpan={4} className="py-10 text-center font-mono text-xs text-brand-gray">
                  A carregar registos...
                </td>
              </tr>
            ) : filteredStories.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-12 text-center font-mono text-xs text-brand-gray space-y-2">
                  <p>Nenhuma história encontrada com os filtros selecionados.</p>
                </td>
              </tr>
            ) : (
              filteredStories.map((story) => (
                <tr key={story.id} className="hover:bg-primary-black/30 transition-colors">
                  {/* Title & Slug */}
                  <td className="py-4 px-4 sm:px-6 min-w-[260px]">
                    <div className="space-y-1">
                      <Link
                        href={`/admin/historias/${story.id}`}
                        className="font-serif text-base font-semibold text-primary-white hover:text-brand-red transition-colors block"
                      >
                        {story.title}
                      </Link>
                      <span className="font-mono text-[11px] text-brand-gray block">
                        slug: /{story.slug}
                      </span>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center space-x-1 font-mono text-[10px] uppercase px-2 py-0.5 border ${
                        story.status === "published"
                          ? "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
                          : "border-amber-500/40 text-amber-400 bg-amber-500/10"
                      }`}
                    >
                      {story.status === "published" ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Publicado</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3" />
                          <span>Rascunho</span>
                        </>
                      )}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="py-4 px-4 whitespace-nowrap font-mono text-[11px] text-brand-gray hidden md:table-cell">
                    {story.published_at ? new Date(story.published_at).toLocaleDateString("pt-PT") : "Não publicado"}
                  </td>

                  {/* Action Buttons */}
                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end space-x-2">
                      {/* Toggle Publish */}
                      <button
                        onClick={() => handleToggleStatus(story)}
                        disabled={actionLoading === story.id}
                        title={story.status === "published" ? "Despublicar história" : "Publicar história"}
                        className={`p-1.5 border transition-colors ${
                          story.status === "published"
                            ? "border-gray-dark text-brand-gray hover:text-amber-400 hover:border-amber-400/50"
                            : "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                        }`}
                      >
                        {story.status === "published" ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>

                      {/* View on Public Site (if published) */}
                      {story.status === "published" && (
                        <Link
                          href={`/historias/${story.slug}`}
                          target="_blank"
                          title="Ver no site público"
                          className="p-1.5 border border-gray-dark text-brand-gray hover:text-primary-white transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}

                      {/* Edit */}
                      <Link
                        href={`/admin/historias/${story.id}`}
                        title="Editar história"
                        className="p-1.5 border border-gray-dark text-brand-gray hover:text-brand-red hover:border-brand-red transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(story)}
                        disabled={actionLoading === story.id}
                        title="Eliminar história"
                        className="p-1.5 border border-gray-dark text-brand-gray hover:text-brand-red hover:border-brand-red transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
