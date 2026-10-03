"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Ignorar bots ou ambientes de teste automatizados
    if (typeof window === "undefined" || navigator.webdriver) return;

    // Ignorar painel administrativo e rotas privadas
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) return;

    // Evitar registo duplicado se o pathname não mudou
    if (lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;

    // Enviar registo de visualização com keepalive
    try {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: pathname }),
        keepalive: true,
      }).catch(() => {
        // Falha silenciosa
      });
    } catch {
      // Ignorar erros de rede
    }
  }, [pathname]);

  return null;
}
