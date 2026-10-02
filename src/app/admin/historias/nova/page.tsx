"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Upload,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function NovaHistoriaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    subtitle: "",
    summary: "",
    content: "",
    cover_image: "/media/adalgiza-e-filho-documental.jpg",
    cover_image_alt: "",
    status: "draft" as "draft" | "published",
    location: "",
    document_ref: "",
    photographer_credit: "",
    tags: "",
    seo_title: "",
    seo_description: "",
  });

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev.slug === "" || prev.slug === generateSlug(prev.title) ? generateSlug(val) : prev.slug,
      seo_title: prev.seo_title === "" ? `${val} | Mães Invisíveis` : prev.seo_title,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const supabase = createClient();
    if (!supabase) {
      setError("Supabase não configurado. Não é possível enviar imagens para o Storage.");
      return;
    }

    setUploadingImage(true);
    setError(null);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${generateSlug(file.name.replace(/\.[^/.]+$/, ""))}.${fileExt}`;
      const filePath = `historias/${fileName}`;

      // 1. Enviar para o bucket 'media'
      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file, { cacheControl: "3600", upsert: true });

      if (uploadError) throw uploadError;

      // 2. Obter URL pública
      const { data: urlData } = supabase.storage
        .from("media")
        .getPublicUrl(filePath);

      setFormData((prev) => ({
        ...prev,
        cover_image: urlData.publicUrl,
        cover_image_alt: prev.cover_image_alt || prev.title,
      }));

      // 3. Registar na tabela media
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

  const handleSubmit = async (targetStatus?: "draft" | "published") => {
    setError(null);
    setLoading(true);

    const finalStatus = targetStatus || formData.status;

    if (!formData.title.trim()) {
      setError("O título da história é obrigatório.");
      setLoading(false);
      return;
    }

    if (!formData.slug.trim()) {
      setError("O identificador (slug) é obrigatório.");
      setLoading(false);
      return;
    }

    if (!formData.summary.trim()) {
      setError("O resumo da história é obrigatório.");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      setError(
        "O Supabase não está configurado no ficheiro .env.local. Configure o projecto para poder guardar na base de dados."
      );
      setLoading(false);
      return;
    }

    const tagArray = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      const { error: insertError } = await supabase.from("stories").insert({
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        subtitle: formData.subtitle.trim() || null,
        summary: formData.summary.trim(),
        content: formData.content.trim() || formData.summary.trim(),
        cover_image: formData.cover_image,
        cover_image_alt: formData.cover_image_alt.trim() || formData.title.trim(),
        status: finalStatus,
        published_at: finalStatus === "published" ? new Date().toISOString() : null,
        seo_title: formData.seo_title.trim() || `${formData.title} | Mães Invisíveis`,
        seo_description: formData.seo_description.trim() || formData.summary.trim(),
        location: formData.location.trim() || null,
        document_ref: formData.document_ref.trim() || null,
        photographer_credit: formData.photographer_credit.trim() || null,
        tags: tagArray,
        is_featured: false,
      });

      if (insertError) {
        if (insertError.code === "23505") {
          throw new Error("Já existe uma história com este slug. Por favor altere o slug.");
        }
        throw insertError;
      }

      router.push("/admin/historias");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao guardar história.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-gray-dark pb-6">
        <Link
          href="/admin/historias"
          className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-wider text-brand-gray hover:text-primary-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar à lista de histórias</span>
        </Link>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => handleSubmit("draft")}
            disabled={loading}
            className="py-2 px-4 border border-gray-dark hover:border-brand-gray text-primary-white font-mono text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
          >
            Guardar Rascunho
          </button>
          <button
            type="button"
            onClick={() => handleSubmit("published")}
            disabled={loading}
            className="flex items-center space-x-2 py-2 px-4 bg-brand-red hover:bg-brand-red/90 text-primary-white font-mono text-xs uppercase tracking-wider transition-colors disabled:opacity-50 font-semibold"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? "A guardar..." : "Publicar"}</span>
          </button>
        </div>
      </div>

      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-brand-red block mb-1">
          Novo Registo
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary-white">
          Criar Nova História
        </h1>
        <p className="font-sans text-xs text-brand-gray mt-1">
          Registe uma nova narrativa com respeito editorial pela verdade documental
        </p>
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

      {/* Form Grid */}
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-8">
        {/* Bloco Editorial Principal */}
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
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="ex.: O Poder do Acolhimento"
                className="w-full bg-primary-black border border-gray-dark px-4 py-2.5 text-sm text-primary-white placeholder-brand-gray/40 focus:border-brand-red focus:outline-none"
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
                  placeholder="ex.: Uma jornada marcada pela presença"
                  className="w-full bg-primary-black border border-gray-dark px-4 py-2.5 text-sm text-primary-white placeholder-brand-gray/40 focus:border-brand-red focus:outline-none"
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
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    summary: val,
                    seo_description: prev.seo_description || val,
                  }));
                }}
                placeholder="Breve resumo que surge nas listas de histórias e na introdução..."
                className="w-full bg-primary-black border border-gray-dark px-4 py-2.5 text-sm text-primary-white placeholder-brand-gray/40 focus:border-brand-red focus:outline-none resize-none"
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
                placeholder="Escreva aqui a narrativa completa..."
                className="w-full bg-primary-black border border-gray-dark px-4 py-2.5 text-sm text-primary-white placeholder-brand-gray/40 focus:border-brand-red focus:outline-none font-sans leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Bloco Fotográfico / Media & Storage */}
        <div className="border border-gray-dark bg-charcoal-deep p-6 sm:p-8 space-y-6">
          <h2 className="font-serif text-xl font-semibold text-primary-white border-b border-gray-dark pb-3">
            2. Fotografia &amp; Documento Visual
          </h2>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-brand-gray block mb-1.5">
                Fotografia Principal (URL ou Carregamento para o Supabase Storage)
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={formData.cover_image}
                  onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                  placeholder="/media/exemplo.jpg ou https://..."
                  className="flex-1 bg-primary-black border border-gray-dark px-4 py-2.5 text-xs text-primary-white focus:border-brand-red focus:outline-none font-mono"
                />

                <label className="flex items-center justify-center space-x-2 py-2.5 px-4 border border-gray-dark hover:border-brand-gray bg-primary-black cursor-pointer font-mono text-xs uppercase text-primary-white transition-colors shrink-0">
                  <Upload className="w-4 h-4 text-brand-red" />
                  <span>{uploadingImage ? "A carregar..." : "Carregar Ficheiro"}</span>
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
                Texto Alternativo da Imagem (Acessibilidade e SEO)
              </label>
              <input
                type="text"
                value={formData.cover_image_alt}
                onChange={(e) => setFormData({ ...formData, cover_image_alt: e.target.value })}
                placeholder="Descrição fiel do que está retratado na imagem..."
                className="w-full bg-primary-black border border-gray-dark px-4 py-2.5 text-sm text-primary-white placeholder-brand-gray/40 focus:border-brand-red focus:outline-none"
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
                  placeholder="Registo Fotográfico"
                  className="w-full bg-primary-black border border-gray-dark px-4 py-2.5 text-xs text-primary-white focus:border-brand-red focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-wider text-brand-gray block mb-1.5">
                  Localização / Identificação
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Projecto Mães-Invisíveis"
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
                  placeholder="Acervo Mães Invisíveis"
                  className="w-full bg-primary-black border border-gray-dark px-4 py-2.5 text-xs text-primary-white focus:border-brand-red focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-brand-gray block mb-1.5">
                Etiquetas / Tags (separadas por vírgula)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Maternidade Atípica, Acolhimento, Voz"
                className="w-full bg-primary-black border border-gray-dark px-4 py-2.5 text-xs text-primary-white focus:border-brand-red focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Bloco SEO & Metadados */}
        <div className="border border-gray-dark bg-charcoal-deep p-6 sm:p-8 space-y-6">
          <h2 className="font-serif text-xl font-semibold text-primary-white border-b border-gray-dark pb-3">
            3. Metadados SEO (Google &amp; Redes Sociais)
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
                placeholder="Título optimizado para motores de busca | Mães Invisíveis"
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
                placeholder="Resumo conciso para resultados de pesquisa no Google..."
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
            Cancelar
          </Link>
          <button
            type="button"
            onClick={() => handleSubmit("draft")}
            disabled={loading}
            className="py-2.5 px-6 border border-gray-dark hover:border-brand-gray text-primary-white font-mono text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
          >
            Guardar Rascunho
          </button>
          <button
            type="button"
            onClick={() => handleSubmit("published")}
            disabled={loading}
            className="py-2.5 px-6 bg-brand-red hover:bg-brand-red/90 text-primary-white font-mono text-xs uppercase tracking-widest font-semibold transition-colors disabled:opacity-50"
          >
            {loading ? "A guardar..." : "Publicar História"}
          </button>
        </div>
      </form>
    </div>
  );
}
