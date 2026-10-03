"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX, ArrowDown } from "lucide-react";

interface HeroVideoProps {
  videoUrl?: string;
  posterUrl?: string;
}

export function HeroVideo({
  videoUrl = process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "/media/hero-video.mp4",
  posterUrl = "/media/hero-video-poster.jpg",
}: HeroVideoProps) {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasReducedMotion, setHasReducedMotion] = useState(false);

  // Detetar preferência de movimento reduzido (Acessibilidade)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setHasReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setHasReducedMotion(e.matches);
      if (e.matches) {
        desktopVideoRef.current?.pause();
        mobileVideoRef.current?.pause();
        setIsPlaying(false);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Sincronizar reprodução ativa entre Desktop e Mobile
  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncPlayback = () => {
      const isDesktop = window.innerWidth >= 768;
      const active = isDesktop ? desktopVideoRef.current : mobileVideoRef.current;
      const inactive = isDesktop ? mobileVideoRef.current : desktopVideoRef.current;

      // Pausar imediatamente o elemento inativo para evitar consumo de CPU ou conflito de som
      if (inactive && !inactive.paused) {
        inactive.pause();
      }

      if (active) {
        active.muted = isMuted;
        if (!hasReducedMotion && isPlaying) {
          active.play().catch(() => {
            // Autoplay bloqueado pelo browser antes de interação
          });
        }
      }
    };

    syncPlayback();
    window.addEventListener("resize", syncPlayback);
    return () => window.removeEventListener("resize", syncPlayback);
  }, [hasReducedMotion, isPlaying, isMuted]);

  const togglePlay = () => {
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
    const activeVideo = isDesktop ? desktopVideoRef.current : mobileVideoRef.current;
    if (!activeVideo) return;

    if (activeVideo.paused) {
      activeVideo
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      activeVideo.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    if (desktopVideoRef.current) desktopVideoRef.current.muted = nextMuted;
    if (mobileVideoRef.current) mobileVideoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const scrollToContent = () => {
    const target = document.getElementById("apresentacao-projeto");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      aria-label="Vídeo Oficial do Projecto Mães-Invisíveis"
      className="relative w-full bg-[#000000] border-b border-[#1F1F1F] overflow-hidden"
    >
      {/* =========================================================================
          DESKTOP LAYOUT (md e superior): Composição Editorial Cinematográfica
          - Coluna Esquerda: Tipografia editorial pura com o slogan oficial
          - Coluna Direita: Vídeo em proporção documental autêntica (mãe & filho)
          ========================================================================= */}
      <div className="hidden md:block max-w-[1280px] mx-auto px-6 lg:px-8 py-8 lg:py-10">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Coluna Editorial Esquerda */}
          <div className="col-span-7 space-y-5 lg:space-y-6 pr-4">
            <div className="inline-flex items-center space-x-2 bg-[#0A0A0A] px-3.5 py-1.5 border border-[#1F1F1F] font-mono text-[11px] uppercase tracking-widest text-[#A3A3A3]">
              <span className="w-2 h-2 rounded-full bg-[#D91616] animate-pulse" aria-hidden="true" />
              <span className="text-[#FFFFFF]">Registo Oficial</span>
              <span className="text-[#525252]">|</span>
              <span>Projecto Mães-Invisíveis</span>
            </div>

            <div className="space-y-2.5">
              <span className="font-mono text-xs uppercase tracking-widest text-[#D91616] font-semibold block">
                // Mensagem Institucional
              </span>
              <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[#FFFFFF] leading-[1.05]">
                IGNORAR <span className="text-[#D91616]">NÃO</span> FAZ<br />
                DESAPARECER
              </h1>
            </div>

            <p className="font-sans text-sm lg:text-base text-[#D4D4D4] max-w-xl leading-relaxed">
              Damos voz ao que o mundo finge não ver. O acolhimento, a escuta ativa e a dignidade das mães de filhos atípicos começam pelo reconhecimento da sua presença.
            </p>

            <div className="pt-2 flex items-center space-x-4">
              <button
                type="button"
                onClick={scrollToContent}
                className="group inline-flex items-center space-x-3 py-2.5 px-5 bg-[#0A0A0A] hover:bg-[#1F1F1F] border border-[#1F1F1F] text-[#FFFFFF] hover:text-[#D91616] font-mono text-xs uppercase tracking-widest transition-all focus-visible:outline-[#D91616]"
              >
                <span>Conhecer o Projecto</span>
                <ArrowDown className="w-4 h-4 text-[#D91616] group-hover:translate-y-0.5 transition-transform" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Coluna Vídeo Direita */}
          <div className="col-span-5 flex justify-end">
            <div className="relative h-[480px] lg:h-[530px] aspect-[9/16] bg-[#0A0A0A] border border-[#1F1F1F] overflow-hidden shadow-2xl group">
              {/* Fallback de Imagem Poster para Movimento Reduzido */}
              {hasReducedMotion ? (
                <Image
                  src={posterUrl}
                  alt="Adalgiza Baptista com o filho — Imagem oficial do Projecto Mães-Invisíveis"
                  fill
                  priority
                  sizes="320px"
                  className="object-cover object-top"
                />
              ) : (
                <video
                  ref={desktopVideoRef}
                  src={videoUrl}
                  poster={posterUrl}
                  autoPlay={!hasReducedMotion}
                  playsInline
                  muted={isMuted}
                  loop
                  preload="metadata"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  aria-label="Apresentação audiovisual oficial do Projecto Mães-Invisíveis com Adalgiza Baptista e o filho"
                  className="w-full h-full object-cover object-top"
                />
              )}

              {/* Barra Superior de Identificação no Player */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFFFFF] bg-[#000000]/80 backdrop-blur-md px-2.5 py-1 border border-[#1F1F1F]">
                  Adalgiza Baptista &amp; Filho
                </span>

                {/* Controles de Reprodução e Som */}
                {!hasReducedMotion && (
                  <div className="pointer-events-auto flex items-center space-x-1.5">
                    <button
                      type="button"
                      onClick={togglePlay}
                      aria-label={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
                      aria-pressed={isPlaying}
                      className="p-2 bg-[#000000]/80 hover:bg-[#1F1F1F] backdrop-blur-md border border-[#1F1F1F] text-[#FFFFFF] hover:text-[#D91616] transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-3.5 h-3.5 text-[#D91616]" aria-hidden="true" />
                      ) : (
                        <Play className="w-3.5 h-3.5 text-[#D91616]" aria-hidden="true" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={toggleMute}
                      aria-label={isMuted ? "Ativar som do vídeo" : "Desativar som do vídeo"}
                      aria-pressed={!isMuted}
                      className="p-2 bg-[#000000]/80 hover:bg-[#1F1F1F] backdrop-blur-md border border-[#1F1F1F] text-[#FFFFFF] hover:text-[#D91616] transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX className="w-3.5 h-3.5 text-[#A3A3A3]" aria-hidden="true" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5 text-[#D91616]" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Legenda Inferior no Player */}
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent flex items-center justify-between font-mono text-[10px] text-[#A3A3A3] z-20">
                <span>Registo Audiovisual</span>
                <span className="text-[#D91616] uppercase tracking-wider font-semibold">Acervo Oficial</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MOBILE LAYOUT (< md): Ecrã Vertical Imersivo
          ========================================================================= */}
      <div className="md:hidden relative w-full h-[68vh] min-h-[480px] max-h-[600px] flex items-end">
        {/* Camada Estática / Fallback para Reduced Motion */}
        {hasReducedMotion ? (
          <div className="absolute inset-0 z-0">
            <Image
              src={posterUrl}
              alt="Adalgiza Baptista com o filho — Imagem oficial do Projecto Mães-Invisíveis"
              fill
              priority
              sizes="100vw"
              className="object-cover object-top"
            />
          </div>
        ) : (
          <video
            ref={mobileVideoRef}
            src={videoUrl}
            poster={posterUrl}
            autoPlay={!hasReducedMotion}
            playsInline
            muted={isMuted}
            loop
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            aria-label="Apresentação audiovisual oficial do Projecto Mães-Invisíveis com Adalgiza Baptista"
            className="absolute inset-0 w-full h-full object-cover object-top z-0"
          />
        )}

        {/* Gradiente de proteção para legibilidade do texto */}
        <div
          className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-[#000000] via-[#000000]/65 to-[#000000]/25"
          aria-hidden="true"
        />

        {/* Top Controls no Mobile */}
        <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
          <div className="inline-flex items-center space-x-1.5 bg-[#000000]/80 backdrop-blur-md px-2.5 py-1 border border-[#1F1F1F] font-mono text-[9px] uppercase tracking-widest text-[#A3A3A3]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D91616] animate-pulse" aria-hidden="true" />
            <span className="text-[#FFFFFF]">Registo Oficial</span>
          </div>

          {!hasReducedMotion && (
            <div className="pointer-events-auto flex items-center space-x-1.5">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
                className="p-2 bg-[#000000]/80 backdrop-blur-md border border-[#1F1F1F] text-[#FFFFFF]"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#D91616]" /> : <Play className="w-3.5 h-3.5 text-[#D91616]" />}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Ativar som" : "Desativar som"}
                className="p-2 bg-[#000000]/80 backdrop-blur-md border border-[#1F1F1F] text-[#FFFFFF]"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#A3A3A3]" /> : <Volume2 className="w-3.5 h-3.5 text-[#D91616]" />}
              </button>
            </div>
          )}
        </div>

        {/* Texto do Hero no Mobile */}
        <div className="relative z-20 w-full px-4 pb-8 space-y-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#D91616] font-semibold block">
            // Projecto Mães-Invisíveis
          </span>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-[#FFFFFF] leading-[1.08]">
            IGNORAR <span className="text-[#D91616]">NÃO</span> FAZ<br />
            DESAPARECER
          </h1>
          <p className="font-sans text-xs text-[#D4D4D4] leading-relaxed">
            Damos voz ao que o mundo finge não ver. Acolhimento e representação para mães de filhos atípicos.
          </p>
          <div className="pt-1">
            <button
              type="button"
              onClick={scrollToContent}
              className="inline-flex items-center space-x-2 py-2 px-3.5 bg-[#0A0A0A]/90 border border-[#1F1F1F] text-[#FFFFFF] font-mono text-[11px] uppercase tracking-wider"
            >
              <span>Conhecer o Projecto</span>
              <ArrowDown className="w-3 h-3 text-[#D91616]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
