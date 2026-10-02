"use client";

import React, { useEffect, useState } from "react";
import {
  Mail,
  Search,
  CheckCircle2,
  Clock,
  Archive,
  Trash2,
  Eye,
  X,
  Calendar,
  User,
  AtSign,
  Tag,
  AlertCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: "unread" | "read" | "archived";
  created_at: string;
}

export default function AdminContactosPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "unread" | "read" | "archived">("all");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadMessages = async () => {
    setLoading(true);
    const supabase = createClient();

    if (!supabase) {
      setMessages([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (err: unknown) {
      console.error("Erro ao carregar mensagens:", err);
      setNotification({
        type: "error",
        text: "Não foi possível carregar as mensagens do Supabase. Verifique a configuração.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleUpdateStatus = async (
    msg: ContactMessage,
    newStatus: "unread" | "read" | "archived"
  ) => {
    const supabase = createClient();
    if (!supabase) {
      setNotification({
        type: "error",
        text: "Supabase não configurado.",
      });
      return;
    }

    setActionLoading(msg.id);

    try {
      const { error } = await supabase
        .from("contact_messages")
        .update({ status: newStatus })
        .eq("id", msg.id);

      if (error) throw error;

      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, status: newStatus } : m))
      );

      if (selectedMessage && selectedMessage.id === msg.id) {
        setSelectedMessage({ ...selectedMessage, status: newStatus });
      }

      setNotification({
        type: "success",
        text: `Mensagem de ${msg.name} marcada como ${
          newStatus === "read" ? "lida" : newStatus === "unread" ? "não lida" : "arquivada"
        }.`,
      });
    } catch (err: unknown) {
      const errText = err instanceof Error ? err.message : "Erro ao alterar estado.";
      setNotification({ type: "error", text: errText });
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (msg: ContactMessage) => {
    if (!window.confirm(`Eliminar definitivamente a mensagem de "${msg.name}"?`)) {
      return;
    }

    const supabase = createClient();
    if (!supabase) return;

    setActionLoading(msg.id);

    try {
      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", msg.id);

      if (error) throw error;

      setMessages((prev) => prev.filter((m) => m.id !== msg.id));
      if (selectedMessage?.id === msg.id) {
        setSelectedMessage(null);
      }
      setNotification({
        type: "success",
        text: "Mensagem eliminada com sucesso.",
      });
    } catch (err: unknown) {
      const errText = err instanceof Error ? err.message : "Erro ao eliminar mensagem.";
      setNotification({ type: "error", text: errText });
    } finally {
      setActionLoading(null);
    }
  };

  const handleOpenMessage = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    // Se a mensagem for 'unread', marca-a automaticamente como 'read'
    if (msg.status === "unread") {
      handleUpdateStatus(msg, "read");
    }
  };

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (msg.subject && msg.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ? true : msg.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-dark pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-brand-red block mb-1">
            Comunicação &amp; Acolhimento
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary-white">
            Mensagens de Contacto
          </h1>
          <p className="font-sans text-xs text-brand-gray mt-1">
            Pedidos de apoio, partilha de relatos e contactos institucionais
          </p>
        </div>

        <button
          onClick={loadMessages}
          className="self-start sm:self-auto py-2 px-4 border border-gray-dark hover:border-brand-gray text-primary-white font-mono text-xs uppercase tracking-wider transition-colors"
        >
          Actualizar Lista
        </button>
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
          <button onClick={() => setNotification(null)} className="hover:underline ml-4">
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
            placeholder="Pesquisar por nome, email ou conteúdo..."
            className="w-full bg-charcoal-deep border border-gray-dark pl-10 pr-4 py-2 text-xs text-primary-white placeholder-brand-gray/50 focus:border-brand-red focus:outline-none transition-colors"
          />
          <Search className="w-4 h-4 text-brand-gray absolute left-3.5 top-2.5" />
        </div>

        {/* Status Filters */}
        <div className="flex items-center space-x-1 border border-gray-dark bg-charcoal-deep p-1 font-mono text-xs">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-3 py-1 transition-colors ${
              filterStatus === "all"
                ? "bg-primary-black text-brand-red font-semibold"
                : "text-brand-gray hover:text-primary-white"
            }`}
          >
            Todas ({messages.length})
          </button>
          <button
            onClick={() => setFilterStatus("unread")}
            className={`px-3 py-1 transition-colors ${
              filterStatus === "unread"
                ? "bg-primary-black text-brand-red font-semibold"
                : "text-brand-gray hover:text-primary-white"
            }`}
          >
            Novas ({messages.filter((m) => m.status === "unread").length})
          </button>
          <button
            onClick={() => setFilterStatus("read")}
            className={`px-3 py-1 transition-colors ${
              filterStatus === "read"
                ? "bg-primary-black text-brand-red font-semibold"
                : "text-brand-gray hover:text-primary-white"
            }`}
          >
            Lidas ({messages.filter((m) => m.status === "read").length})
          </button>
          <button
            onClick={() => setFilterStatus("archived")}
            className={`px-3 py-1 transition-colors ${
              filterStatus === "archived"
                ? "bg-primary-black text-brand-red font-semibold"
                : "text-brand-gray hover:text-primary-white"
            }`}
          >
            Arquivadas ({messages.filter((m) => m.status === "archived").length})
          </button>
        </div>
      </div>

      {/* Messages Table */}
      <div className="border border-gray-dark bg-charcoal-deep overflow-x-auto">
        <table className="w-full text-left text-xs font-sans">
          <thead className="border-b border-gray-dark bg-primary-black font-mono text-[11px] text-brand-gray uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-4 sm:px-6">Remetente</th>
              <th className="py-3.5 px-4">Assunto / Motivo</th>
              <th className="py-3.5 px-4">Estado</th>
              <th className="py-3.5 px-4 hidden md:table-cell">Data</th>
              <th className="py-3.5 px-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-dark/50">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-12 text-center font-mono text-xs text-brand-gray">
                  A carregar mensagens...
                </td>
              </tr>
            ) : filteredMessages.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-16 text-center font-mono text-xs text-brand-gray space-y-2">
                  <Mail className="w-8 h-8 text-gray-dark mx-auto mb-2" />
                  <p>Nenhuma mensagem encontrada.</p>
                  <p className="text-[11px] text-brand-gray/60">
                    As mensagens submetidas no formulário de contacto surgirão aqui em tempo real.
                  </p>
                </td>
              </tr>
            ) : (
              filteredMessages.map((msg) => (
                <tr
                  key={msg.id}
                  className={`hover:bg-primary-black/30 transition-colors cursor-pointer ${
                    msg.status === "unread" ? "bg-primary-black/40 font-medium" : ""
                  }`}
                  onClick={() => handleOpenMessage(msg)}
                >
                  {/* Sender Info */}
                  <td className="py-4 px-4 sm:px-6">
                    <div className="space-y-0.5">
                      <span className="font-serif text-sm font-semibold text-primary-white block">
                        {msg.name}
                      </span>
                      <span className="font-mono text-[11px] text-brand-gray block">
                        {msg.email}
                      </span>
                    </div>
                  </td>

                  {/* Subject & Preview */}
                  <td className="py-4 px-4 max-w-xs">
                    <div className="space-y-0.5">
                      <span className="font-medium text-white-soft block truncate">
                        {msg.subject || "Sem assunto"}
                      </span>
                      <span className="text-brand-gray text-[11px] block truncate">
                        {msg.message}
                      </span>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center space-x-1 font-mono text-[10px] uppercase px-2 py-0.5 border ${
                        msg.status === "unread"
                          ? "border-brand-red text-brand-red bg-brand-red/10"
                          : msg.status === "read"
                          ? "border-gray-dark text-brand-gray"
                          : "border-gray-dark/50 text-brand-gray/60"
                      }`}
                    >
                      {msg.status === "unread" ? "Nova" : msg.status === "read" ? "Lida" : "Arquivada"}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="py-4 px-4 whitespace-nowrap font-mono text-[11px] text-brand-gray hidden md:table-cell">
                    {new Date(msg.created_at).toLocaleDateString("pt-PT", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end space-x-1.5">
                      <button
                        onClick={() => handleOpenMessage(msg)}
                        title="Ver mensagem completa"
                        className="p-1.5 border border-gray-dark text-brand-gray hover:text-primary-white transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {msg.status === "read" ? (
                        <button
                          onClick={() => handleUpdateStatus(msg, "unread")}
                          disabled={actionLoading === msg.id}
                          title="Marcar como não lida"
                          className="p-1.5 border border-gray-dark text-brand-gray hover:text-brand-red transition-colors"
                        >
                          <Clock className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUpdateStatus(msg, "read")}
                          disabled={actionLoading === msg.id}
                          title="Marcar como lida"
                          className="p-1.5 border border-gray-dark text-brand-gray hover:text-emerald-400 transition-colors"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() => handleUpdateStatus(msg, msg.status === "archived" ? "read" : "archived")}
                        disabled={actionLoading === msg.id}
                        title={msg.status === "archived" ? "Desarquivar" : "Arquivar"}
                        className="p-1.5 border border-gray-dark text-brand-gray hover:text-primary-white transition-colors"
                      >
                        <Archive className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(msg)}
                        disabled={actionLoading === msg.id}
                        title="Eliminar"
                        className="p-1.5 border border-gray-dark text-brand-gray hover:text-brand-red hover:border-brand-red transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div
          className="fixed inset-0 z-50 bg-primary-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="w-full max-w-2xl bg-charcoal-deep border border-gray-dark p-6 sm:p-8 space-y-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-dark pb-4">
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-widest text-brand-red block">
                  Registo de Contacto
                </span>
                <h2 className="font-serif text-2xl font-bold text-primary-white">
                  {selectedMessage.subject || "Mensagem Directa"}
                </h2>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-2 text-brand-gray hover:text-primary-white border border-gray-dark"
                aria-label="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sender Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-primary-black border border-gray-dark text-xs font-mono">
              <div className="flex items-center space-x-2 text-brand-gray">
                <User className="w-4 h-4 text-brand-red shrink-0" />
                <span className="text-white-soft">{selectedMessage.name}</span>
              </div>
              <div className="flex items-center space-x-2 text-brand-gray">
                <AtSign className="w-4 h-4 text-brand-red shrink-0" />
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="text-white-soft hover:text-brand-red underline"
                >
                  {selectedMessage.email}
                </a>
              </div>
              <div className="flex items-center space-x-2 text-brand-gray">
                <Calendar className="w-4 h-4 text-brand-red shrink-0" />
                <span>
                  {new Date(selectedMessage.created_at).toLocaleString("pt-PT")}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-brand-gray">
                <Tag className="w-4 h-4 text-brand-red shrink-0" />
                <span className="uppercase text-brand-red">
                  Estado: {selectedMessage.status}
                </span>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-brand-gray block">
                Conteúdo da Mensagem:
              </span>
              <div className="p-4 bg-primary-black border border-gray-dark font-sans text-sm text-white-soft leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto">
                {selectedMessage.message}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-dark font-mono text-xs">
              <div className="flex items-center space-x-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                    selectedMessage.subject || "Projecto Mães-Invisíveis"
                  )}`}
                  className="py-2 px-4 bg-brand-red hover:bg-brand-red/90 text-primary-white uppercase tracking-wider transition-colors inline-block font-semibold"
                >
                  Responder por E-mail
                </a>
                <button
                  onClick={() =>
                    handleUpdateStatus(
                      selectedMessage,
                      selectedMessage.status === "archived" ? "read" : "archived"
                    )
                  }
                  className="py-2 px-3 border border-gray-dark hover:border-brand-gray text-brand-gray hover:text-primary-white uppercase tracking-wider transition-colors"
                >
                  {selectedMessage.status === "archived" ? "Desarquivar" : "Arquivar"}
                </button>
              </div>

              <button
                onClick={() => handleDelete(selectedMessage)}
                className="py-2 px-3 border border-brand-red/30 text-brand-red hover:border-brand-red uppercase tracking-wider transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
