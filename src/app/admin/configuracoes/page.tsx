"use client";

import React, { useEffect, useState } from "react";
import {
  Save,
  CheckCircle2,
  AlertCircle,
  Database,
  HardDrive,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { INSTITUTIONAL_INFO } from "@/lib/content";

export default function AdminConfiguracoesPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [supabaseConnected, setSupabaseConnected] = useState(false);

  const [formData, setFormData] = useState({
    projectName: INSTITUTIONAL_INFO.projectName,
    founderName: INSTITUTIONAL_INFO.founderName,
    founderTitle: INSTITUTIONAL_INFO.founderTitle,
    brandStatement: INSTITUTIONAL_INFO.brandStatement,
    tagline: INSTITUTIONAL_INFO.tagline,
    siteUrl: INSTITUTIONAL_INFO.siteUrl,
    mission: INSTITUTIONAL_INFO.mission || "",
    objective: INSTITUTIONAL_INFO.objective || "",
    values: (INSTITUTIONAL_INFO.values || []).join(", "),
    instagram: INSTITUTIONAL_INFO.communityLinks.instagram,
  });

  useEffect(() => {
    async function loadSettings() {
      setFetching(true);
      const configured = isSupabaseConfigured();
      setSupabaseConnected(configured);

      if (!configured) {
        setFetching(false);
        return;
      }

      const supabase = createClient();
      if (!supabase) {
        setFetching(false);
        return;
      }

      try {
        const { data, error: fetchError } = await supabase
          .from("site_settings")
          .select("value")
          .eq("key", "institutional")
          .maybeSingle();

        if (fetchError) throw fetchError;

        if (data && data.value && typeof data.value === "object") {
          const val = data.value as any;
          setFormData({
            projectName: val.projectName || INSTITUTIONAL_INFO.projectName,
            founderName: val.founderName || INSTITUTIONAL_INFO.founderName,
            founderTitle: val.founderTitle || INSTITUTIONAL_INFO.founderTitle,
            brandStatement: val.brandStatement || INSTITUTIONAL_INFO.brandStatement,
            tagline: val.tagline || INSTITUTIONAL_INFO.tagline,
            siteUrl: val.siteUrl || INSTITUTIONAL_INFO.siteUrl,
            mission: val.mission || INSTITUTIONAL_INFO.mission || "",
            objective: val.objective || INSTITUTIONAL_INFO.objective || "",
            values: Array.isArray(val.values) ? val.values.join(", ") : val.values || (INSTITUTIONAL_INFO.values || []).join(", "),
            instagram: val.instagram || INSTITUTIONAL_INFO.communityLinks.instagram,
          });
        }
      } catch (err) {
        console.warn("Aviso ao carregar definições do Supabase:", err);
      } finally {
        setFetching(false);
      }
    }

    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const supabase = createClient();
    if (!supabase) {
      setError(
        "Supabase não configurado. Adicione as variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no ficheiro .env.local para persistir as definições."
      );
      setLoading(false);
      return;
    }

    const valuesArray = formData.values
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

    try {
      const payload = {
        projectName: formData.projectName.trim(),
        founderName: formData.founderName.trim(),
        founderTitle: formData.founderTitle.trim(),
        brandStatement: formData.brandStatement.trim(),
        tagline: formData.tagline.trim(),
        siteUrl: formData.siteUrl.trim(),
        mission: formData.mission.trim(),
        objective: formData.objective.trim(),
        values: valuesArray,
        instagram: formData.instagram.trim(),
      };

      const { error: upsertError } = await supabase.from("site_settings").upsert({
        key: "institutional",
        value: payload,
        description: "Informações institucionais oficiais do Projecto Mães-Invisíveis",
      });

      if (upsertError) throw upsertError;

      setSuccess("Definições institucionais guardadas com sucesso no Supabase.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao guardar definições.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="border-b border-gray-dark pb-6">
        <span className="font-mono text-xs uppercase tracking-widest text-brand-red block mb-1">
          Configuração do Sistema
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary-white">
          Definições Institucionais &amp; Sistema
        </h1>
        <p className="font-sans text-xs text-brand-gray mt-1">
          Gestão centralizada dos dados institucionais, redes sociais e integridade do Supabase
        </p>
      </div>

      {/* System Health Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Supabase Connection */}
        <div className="border border-gray-dark bg-charcoal-deep p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-brand-gray flex items-center space-x-1.5">
              <Database className="w-3.5 h-3.5 text-brand-red" />
              <span>Base de Dados</span>
            </span>
            <span
              className={`px-1.5 py-0.5 uppercase text-[10px] ${
                supabaseConnected
                  ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/30"
                  : "text-amber-400 bg-amber-500/10 border border-amber-500/30"
              }`}
            >
              {supabaseConnected ? "Ligado" : "Local / Pendente"}
            </span>
          </div>
          <p className="text-[11px] font-mono text-brand-gray">
            PostgreSQL + Row Level Security (RLS)
          </p>
        </div>

        {/* Supabase Storage */}
        <div className="border border-gray-dark bg-charcoal-deep p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-brand-gray flex items-center space-x-1.5">
              <HardDrive className="w-3.5 h-3.5 text-brand-red" />
              <span>Storage Bucket</span>
            </span>
            <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 uppercase text-[10px]">
              &apos;media&apos;
            </span>
          </div>
          <p className="text-[11px] font-mono text-brand-gray">
            Bucket público para imagens &amp; documentos
          </p>
        </div>

        {/* Auth & Security */}
        <div className="border border-gray-dark bg-charcoal-deep p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-brand-gray flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-red" />
              <span>Segurança RLS</span>
            </span>
            <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 uppercase text-[10px]">
              Activo
            </span>
          </div>
          <p className="text-[11px] font-mono text-brand-gray">
            Políticas ativas em stories, contact, settings
          </p>
        </div>
      </div>

      {/* Notifications */}
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
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Institutional Form */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="border border-gray-dark bg-charcoal-deep p-6 sm:p-8 space-y-6">
          <h2 className="font-serif text-xl font-semibold text-primary-white border-b border-gray-dark pb-3">
            Dados Institucionais Oficiais
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-brand-gray block mb-1.5">
                Nome do Projecto
              </label>
              <input
                type="text"
                required
                value={formData.projectName}
                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                className="w-full bg-primary-black border border-gray-dark px-4 py-2.5 text-sm text-primary-white focus:border-brand-red focus:outline-none"
              />
            </div>

            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-brand-gray block mb-1.5">
                Domínio Canónico Oficial
              </label>
              <input
                type="url"
                required
                value={formData.siteUrl}
                onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
                className="w-full bg-primary-black border border-gray-dark px-4 py-2.5 text-xs text-primary-white focus:border-brand-red focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-brand-gray block mb-1.5">
                Nome da Fundadora / CEO
              </label>
              <input
                type="text"
                required
                value={formData.founderName}
                onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                className="w-full bg-primary-black border border-gray-dark px-4 py-2.5 text-sm text-primary-white focus:border-brand-red focus:outline-none"
              />
            </div>

            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-brand-gray block mb-1.5">
                Título Oficial
              </label>
              <input
                type="text"
                required
                value={formData.founderTitle}
                onChange={(e) => setFormData({ ...formData, founderTitle: e.target.value })}
                className="w-full bg-primary-black border border-gray-dark px-4 py-2.5 text-sm text-primary-white focus:border-brand-red focus:outline-none"
              />
            </div>

            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-brand-gray block mb-1.5">
                Posicionamento / Frase de Marca
              </label>
              <input
                type="text"
                value={formData.brandStatement}
                onChange={(e) => setFormData({ ...formData, brandStatement: e.target.value })}
                className="w-full bg-primary-black border border-gray-dark px-4 py-2.5 text-sm text-primary-white focus:border-brand-red focus:outline-none"
              />
            </div>

            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-brand-gray block mb-1.5">
                Instagram Oficial
              </label>
              <input
                type="url"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full bg-primary-black border border-gray-dark px-4 py-2.5 text-xs text-primary-white focus:border-brand-red focus:outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="font-mono text-xs uppercase tracking-wider text-brand-gray block mb-1.5">
              Missão Oficial
            </label>
            <textarea
              rows={2}
              value={formData.mission}
              onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
              className="w-full bg-primary-black border border-gray-dark px-4 py-2.5 text-sm text-primary-white focus:border-brand-red focus:outline-none resize-none font-sans"
            />
          </div>

          <div>
            <label className="font-mono text-xs uppercase tracking-wider text-brand-gray block mb-1.5">
              Objectivo Oficial
            </label>
            <textarea
              rows={2}
              value={formData.objective}
              onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
              className="w-full bg-primary-black border border-gray-dark px-4 py-2.5 text-sm text-primary-white focus:border-brand-red focus:outline-none resize-none font-sans"
            />
          </div>

          <div>
            <label className="font-mono text-xs uppercase tracking-wider text-brand-gray block mb-1.5">
              Valores (separados por vírgula)
            </label>
            <input
              type="text"
              value={formData.values}
              onChange={(e) => setFormData({ ...formData, values: e.target.value })}
              className="w-full bg-primary-black border border-gray-dark px-4 py-2.5 text-sm text-primary-white focus:border-brand-red focus:outline-none font-mono"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 py-3 px-6 bg-brand-red hover:bg-brand-red/90 text-primary-white font-mono text-xs uppercase tracking-widest font-semibold transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? "A guardar definições..." : "Guardar Definições"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
