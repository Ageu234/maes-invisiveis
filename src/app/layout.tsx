import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "700"],
});

const SITE_URL = "https://www.maesinvesiveis.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mães Invisíveis | Voz às Mães de Crianças Atípicas",
    template: "%s | Mães Invisíveis",
  },
  description:
    "Projecto Mães-Invisíveis dedicado a dar visibilidade às mães de crianças atípicas, promovendo inclusão, apoio e capacitação de famílias.",
  keywords: [
    "Mães Invisíveis",
    "Adalgiza Baptista",
    "Maternidade Atípica",
    "Filhos Atípicos",
    "Autismo",
    "TDAH",
    "Inclusão",
    "Apoio Familiar",
    "Neurodivergência",
  ],
  authors: [{ name: "Adalgiza Baptista" }],
  creator: "Adalgiza Baptista",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: SITE_URL,
    title: "Mães Invisíveis | Voz às Mães de Crianças Atípicas",
    description:
      "Projecto Mães-Invisíveis dedicado a dar visibilidade às mães de crianças atípicas, promovendo inclusão, apoio e capacitação de famílias.",
    siteName: "Mães Invisíveis",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mães Invisíveis — Ignorar Não Faz Desaparecer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mães Invisíveis | Voz às Mães de Crianças Atípicas",
    description:
      "Projecto Mães-Invisíveis dedicado a dar visibilidade às mães de crianças atípicas.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-primary-black text-primary-white antialiased flex flex-col min-h-screen">
        {/* Accessibility Skip Link */}
        <SkipToContent />

        {/* Client-side Page Views Analytics Tracker */}
        <AnalyticsTracker />

        {/* Subtle Documentary Texture Overlay */}
        <div className="film-grain" aria-hidden="true" />

        {/* Main Editorial Shell */}
        <Navbar />
        <main id="main-content" className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
