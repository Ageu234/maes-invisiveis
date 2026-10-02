"use client";

import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Upload,
  AlertCircle,
  Trash2,
  ExternalLink,
  Eye,
  EyeOff,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { INITIAL_STORIES } from "@/lib/content";

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditarHistoriaPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const storyId = resolvedParams.id;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    subtitle: "",
    summary: "",
    content: "",
    cover_image: "",
    cover_image_alt: "",
    status: "draft" as "draft" | "published",
    published_at: null as string | null,
    location: "",
    document_ref: "",
    photographer_credit: "",
    tags: "",
    seo_title: "",
    seo_description: "",
  });

  useEffect(() => {
    async function loadStory() {
      setLoading(true);
      const supabase = createClient();

      if (!supabase) {
        // Fallback para as histórias iniciais
        const local = INITIAL_STORIES.find((s) => s.id === storyId || s.slug === storyId);
        if (local) {
          setFormData({
            title: local.title,
            slug: local.slug,
            subtitle: local.subtitle || "",
            summary: local.excerpt,
            content: local.content.join("\n\n"),
            cover_image: local.featuredImage,
            cover_image_alt: local.featuredImageAlt,
            status: "published",
            published_at: "2026-01-01",
            location: local.location,
            document_ref: local.documentRef,
            photographer_credit: local.photographerCredit || "Acervo Mães Invisíveis",
            tags: local.tags.join(", "),
            seo_title: `${local.title} | Mães Invisíveis`,
            seo_description: local.excerpt,
          });
        } else {
          setError("História não encontrada.");
        }
        setLoading(false);
        return;
      }

      try {
        const { data, error: fetchError } = await supabase
          .from("stories")
          .select("*")
          .eq("id", storyId)
          .maybeSingle();

        if (fetchError) throw fetchError;

        if (!data) {
          // Tentar por slug se id for slug
          const { data: bySlugData } = await supabase
            .from("stories")
            .select("*")
            .eq("slug", storyId)
            .maybeSingle();

          if (bySlugData) {
            populateForm(bySlugData);
          } else {
            // Fallback se não estiver ainda no Supabase
            const local = INITIAL_STORIES.find((s) => s.id === storyId || s.slug === storyId);
            if (local) {
              setFormData({
                title: local.title,
                slug: local.slug,
                subtitle: local.subtitle || "",
                summary: local.excerpt,
                content: local.content.join("\n\n"),
                cover_image: local.featuredImage,
                cover_image_alt: local.featuredImageAlt,
                status: "published",
                published_at: "2026-01-01",
                location: local.location,
                document_ref: local.documentRef,
                photographer_credit: local.photographerCredit || "Acervo Mães Invisíveis",
                tags: local.tags.join(", "),
                seo_title: `${local.title} | Mães Invisíveis`,
                seo_description: local.excerpt,
              });
            } else {
              setError("História não encontrada no Supabase.");
            }
          }
        } else {
          populateForm(data);
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Erro ao carregar história.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    function populateForm(data: any) {
      setFormData({
        title: data.title || "",
        slug: data.slug || "",
        subtitle: data.subtitle || "",
        summary: data.summary || "",
        content: data.content || "",
        cover_image: data.cover_image || "",
        cover_image_alt: data.cover_image_alt || "",
        status: data.status || "draft",
        published_at: data.published_at,
        location: data.location || "Projecto Mães-Invisíveis",
        document_ref: data.document_ref || "Registo Fotográfico",
        photographer_credit: data.photographer_credit || "Acervo Mães Invisíveis",
        tags: Array.isArray(data.tags) ? data.tags.join(", ") : "",
        seo_title: data.seo_title || "",
        seo_description: data.seo_description || "",
      });
    }

    loadStory();
  }, [storyId]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const supabase = createClient();
    if (!supabase) {
      setError("Supabase não configurado. Não é possível enviar ficheiros.");
      return;
    }

    setUploadingImage(true);
    setError(null);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${generateSlug(file.name.replace(/\.[^/.]+$/, ""))}.${fileExt}`;
      const filePath = `historias/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file, { cacheControl: "3600", upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("media")
        .getPublicUrl(filePath);

      setFormData((prev) => ({
        ...prev,
        cover_image: urlData.publicUrl,
        cover_image_alt: prev.cover_image_alt || prev.title,
      }));

      await supabase.from("media").insert({
        file_name: fileName,
        file_path: filePath,
        public_url: urlData.publicUrl,
        mime_type: file.type,
        size_bytes: file.size,
        alt_text: formData.title || fileName,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro no envio da fotografia.";
      setError(msg);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (targetStatus?: "draft" | "published") => {
    setError(null);
    setSuccess(null);
    setSaving(true);

    const finalStatus = targetStatus || formData.status;

    if (!formData.title.trim()) {
      setError("O título da história é obrigatório.");
      setSaving(false);
      return;
    }

    if (!formData.slug.trim()) {
      setError("O identificador (slug) é obrigatório.");
      setSaving(false);
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      setError("Supabase não configurado. Não é possível persistir alterações.");
      setSaving(false);
      return;
    }

    const tagArray = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      const { error: updateError } = await supabase
        .from("stories")
        .update({
          title: formData.title.trim(),
          slug: formData.slug.trim(),
          subtitle: formData.subtitle.trim() || null,
          summary: formData.summary.trim(),
          content: formData.content.trim() || formData.summary.trim(),
          cover_image: formData.cover_image,
          cover_image_alt: formData.cover_image_alt.trim() || formData.title.trim(),
          status: finalStatus,
          published_at:
            finalStatus === "published"
              ? formData.published_at || new Date().toISOString()
              : formData.published_at,
          seo_title: formData.seo_title.trim() || `${formData.title} | Mães Invisíveis`,
          seo_description: formData.seo_description.trim() || formData.summary.trim(),
          location: formData.location.trim() || null,
          document_ref: formData.document_ref.trim() || null,
          photographer_credit: formData.photographer_credit.trim() || null,
          tags: tagArray,
        })
        .or(`id.eq.${storyId},slug.eq.${storyId}`);

      if (updateError) throw updateError;

      setFormData((prev) => ({ ...prev, status: finalStatus }));
      setSuccess(`História guardada com sucesso como ${finalStatus === "published" ? "publicada" : "rascunho"}.`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao actualizar história.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Tem a certeza absoluta que deseja eliminar "${formData.title}"?`)) {
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      setError("Supabase não configurado.");
      return;
    }

    try {
      const { error: deleteError } = await supabase
        .from("stories")
        .delete()
        .or(`id.eq.${storyId},slug.eq.${storyId}`);

      if (deleteError) throw deleteError;

      router.push("/admin/historias");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao eliminar história.";
      setError(msg);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center font-mono text-xs text-brand-gray">
        A carregar dados da história...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-dark pb-6">
        <Link
          href="/admin/historias"
          className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-wider text-brand-gray hover:text-primary-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar à lista de histórias</span>
        </Link>

        <div className="flex items-center space-x-3">
          {formData.status === "published" && (
            <Link
              href={`/historias/${formData.slug}`}
              target="_blank"
              className="flex items-center space-x-1.5 py-2 px-3 border border-gray-dark hover:border-brand-gray text-brand-gray hover:text-primary-white font-mono text-xs uppercase tracking-wider transition-colors"
            >
              <span>Ver no Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}

          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center space-x-1.5 py-2 px-3 border border-brand-red/30 hover:border-brand-red text-brand-red font-mono text-xs uppercase tracking-wider transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Eliminar</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave(formData.status === "published" ? "draft" : "published")}
            disabled={saving}
            className="flex items-center space-x-1.5 py-2 px-3 border border-gray-dark hover:border-brand-gray text-primary-white font-mono text-xs uppercase tracking-wider transition-colors"
          >
            {formData.status === "published" ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{formData.status === "published" ? "Despublicar" : "Publicar"}</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saving}
            className="flex items-center space-x-2 py-2 px-4 bg-brand-red hover:bg-brand-red/90 text-primary-white font-mono text-xs uppercase tracking-wider transition-colors disabled:opacity-50 font-semibold"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "A guardar..." : "Guardar Alterações"}</span>
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-center space-x-3 mb-1">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-red">
            Edição Editorial
          </span>
          <span
            className={`font-mono text-[10px] uppercase px-2 py-0.5 border ${
              formData.status === "published"
                ? "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
                : "border-amber-500/40 text-amber-400 bg-amber-500/10"
            }`}
          >
            {formData.status === "published" ? "Publicada" : "Rascunho"}
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary-white">
          {formData.title || "Editar História"}
        </h1>
      </div>

      {error && (
        <div
          role="alert"
          className="p-4 border border-brand-red bg-charcoal-deep text-brand-red font-mono text-xs flex items-center space-x-2"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div
          role="alert"
          className="p-4 border border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-mono text-xs flex items-center space-x-2"
        >
          <span>{success}</span>
        </div>
      )}

      {/* Form Grid */}
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-8">
        {/* Bloco Editorial */}
        <div className="border border-gray-dark bg-charcoal-deep p-6 sm:p-8 space-y-6">
          <h2 className="font-serif text-xl font-semibold text-primary-white border-b border-gray-dark pb-3">
            1. Conteúdo Editorial
          </h2>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-brand-gray block mb-1.5">
                Título da História *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-primary-black border border-gray-dark px-4 py-2.5 text-sm text-primary-white focus:border-brand-red focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-xs uppercase tracking-wider text-brand-gray block mb-1.5">
                  Slug / URL Amigável *
                </label>
                <div className="flex items-center bg-primary-black border border-gray-dark px-3 text-brand-gray text-xs font-mono">
                  <span>/historias/</span>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: generateSlug(e.target.value) })}
                    className="flex-1 bg-transparent py-2.5 px-1 text-primary-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-wider text-brand-gray block mb-1.5">
                  Subtítulo / Linha de Apoio
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full bg-primary-black border border-gray-dark px-4 py-2.5 text-sm text-primary-white focus:border-brand-red focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-brand-gray block mb-1.5">
                Resumo Editorial (Excerto) *
              </label>
              <textarea
                rows={3}
                required
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                className="w-full bg-primary-black border border-gray-dark px-4 py-2.5 text-sm text-primary-white focus:border-brand-red focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-brand-gray block mb-1.5">
                Texto Completo da História *
              </label>
              <p className="font-mono text-[11px] text-brand-gray/70 mb-2">
                Separe os parágrafos com uma linha em branco (Enter duplo).
              </p>
              <textarea
                rows={10}
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full bg-primary-black border border-gray-dark px-4 py-2.5 text-sm text-primary-white focus:border-brand-red focus:outline-none font-sans leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Bloco Fotográfico / Media & Storage */}
        <div className="border border-gray-dark bg-charcoal-deep p-6 sm:p-8 space-y-6">
          <h2 className="font-serif text-xl font-semibold text-primary-white border-b border-gray-dark pb-3">
            2. Fotografia &amp; Registo Visual
          </h2>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-brand-gray block mb-1.5">
                Fotografia Principal (URL ou Carregamento para Storage Supabase)
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={formData.cover_image}
                  onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                  className="flex-1 bg-primary-black border border-gray-dark px-4 py-2.5 text-xs text-primary-white focus:border-brand-red focus:outline-none font-mono"
                />

                <label className="flex items-center justify-center space-x-2 py-2.5 px-4 border border-gray-dark hover:border-brand-gray bg-primary-black cursor-pointer font-mono text-xs uppercase text-primary-white transition-colors shrink-0">
                  <Upload className="w-4 h-4 text-brand-red" />
                  <span>{uploadingImage ? "A carregar..." : "Substituir Ficheiro"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-brand-gray block mb-1.5">
                Texto Alternativo da Imagem
              </label>
              <input
                type="text"
                value={formData.cover_image_alt}
                onChange={(e) => setFormData({ ...formData, cover_image_alt: e.target.value })}
                className="w-full bg-primary-black border border-gray-dark px-4 py-2.5 text-sm text-primary-white focus:border-brand-red focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-mono text-xs uppercase tracking-wider text-brand-gray block mb-1.5">
                  Referência Documental
                </label>
                <input
                  type="text"
                  value={formData.document_ref}
                  onChange={(e) => setFormData({ ...formData, document_ref: e.target.value })}
                  className="w-full bg-primary-black border border-gray-dark px-4 py-2.5 text-xs text-primary-white focus:border-brand-red focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-wider text-brand-gray block mb-1.5">
                  Localização
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-primary-black border border-gray-dark px-4 py-2.5 text-xs text-primary-white focus:border-brand-red focus:outline-none"
                />
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-wider text-brand-gray block mb-1.5">
                  Crédito da Fotografia
                </label>
                <input
                  type="text"
                  value={formData.photographer_credit}
                  onChange={(e) => setFormData({ ...formData, photographer_credit: e.target.value })}
                  className="w-full bg-primary-black border border-gray-dark px-4 py-2.5 text-xs text-primary-white focus:border-brand-red focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-brand-gray block mb-1.5">
                Etiquetas / Tags
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full bg-primary-black border border-gray-dark px-4 py-2.5 text-xs text-primary-white focus:border-brand-red focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Bloco SEO */}
        <div className="border border-gray-dark bg-charcoal-deep p-6 sm:p-8 space-y-6">
          <h2 className="font-serif text-xl font-semibold text-primary-white border-b border-gray-dark pb-3">
            3. Metadados SEO
          </h2>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-brand-gray block mb-1.5">
                Título SEO
              </label>
              <input
                type="text"
                value={formData.seo_title}
                onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                className="w-full bg-primary-black border border-gray-dark px-4 py-2.5 text-xs text-primary-white focus:border-brand-red focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-brand-gray block mb-1.5">
                Descrição SEO (Meta Description)
              </label>
              <textarea
                rows={2}
                value={formData.seo_description}
                onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                className="w-full bg-primary-black border border-gray-dark px-4 py-2.5 text-xs text-primary-white focus:border-brand-red focus:outline-none font-mono resize-none"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-dark">
          <Link
            href="/admin/historias"
            className="py-2.5 px-6 border border-gray-dark hover:border-brand-gray text-brand-gray hover:text-primary-white font-mono text-xs uppercase tracking-wider transition-colors"
          >
            Voltar
          </Link>
          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saving}
            className="py-2.5 px-6 bg-brand-red hover:bg-brand-red/90 text-primary-white font-mono text-xs uppercase tracking-widest font-semibold transition-colors disabled:opacity-50"
          >
            {saving ? "A guardar..." : "Guardar Alterações"}
          </button>
        </div>
      </form>
    </div>
  );
}
