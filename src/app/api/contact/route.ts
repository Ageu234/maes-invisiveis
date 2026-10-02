import { NextResponse, type NextRequest } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, contact, subject, message, hp_website } = body;

    // 1. Protecção contra spam básico (Honeypot)
    if (hp_website && String(hp_website).trim() !== "") {
      // É um bot — responder com sucesso simulado silenciosamente
      return NextResponse.json({ success: true });
    }

    // 2. Validação rigorosa dos campos obrigatórios
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof contact === "string" ? contact.trim() : "";
    const trimmedSubject = typeof subject === "string" ? subject.trim() : "Geral";
    const trimmedMessage = typeof message === "string" ? message.trim() : "";

    if (!trimmedName || trimmedName.length < 2) {
      return NextResponse.json(
        { error: "Por favor, indique o seu nome completo." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { error: "Por favor, indique um endereço de e-mail válido." },
        { status: 400 }
      );
    }

    if (!trimmedMessage || trimmedMessage.length < 5) {
      return NextResponse.json(
        { error: "A mensagem deve conter pelo menos 5 caracteres." },
        { status: 400 }
      );
    }

    // Limite de segurança para tamanho da mensagem
    if (trimmedMessage.length > 5000) {
      return NextResponse.json(
        { error: "A mensagem excede o limite máximo permitido." },
        { status: 400 }
      );
    }

    // 3. Inserção no Supabase
    const supabase = await createServerSupabaseClient();

    if (supabase) {
      const { error: insertError } = await supabase
        .from("contact_messages")
        .insert({
          name: trimmedName,
          email: trimmedEmail,
          subject: trimmedSubject,
          message: trimmedMessage,
          status: "unread",
        });

      if (insertError) {
        console.error("Erro ao guardar mensagem no Supabase:", insertError);
        return NextResponse.json(
          { error: "Não foi possível guardar a sua mensagem. Tente novamente mais tarde." },
          { status: 500 }
        );
      }
    } else {
      // Modo local / Supabase não configurado nesta sessão
      console.log("[Contacto Local] Mensagem recebida:", {
        name: trimmedName,
        email: trimmedEmail,
        subject: trimmedSubject,
        messageLength: trimmedMessage.length,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Mensagem recebida com sucesso.",
    });
  } catch (error) {
    console.error("Erro interno no endpoint de contacto:", error);
    return NextResponse.json(
      { error: "Ocorreu um erro inesperado ao processar o seu pedido." },
      { status: 500 }
    );
  }
}
