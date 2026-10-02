import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SkipToContent } from "@/components/layout/SkipToContent";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://maesinvisiveis.org"),
  title: {
    default: "Mães Invisíveis — Ignorar Não Faz Desaparecer",
    template: "%s | Mães Invisíveis",
  },
  description:
    "Projeto documental e institucional fundado por Adalgiza Baptista. Mães de filhos atípicos: ignoradas, sozinhas, mas presentes. Damos voz ao que o mundo finge não ver.",
  keywords: [
    "Mães Invisíveis",
    "Adalgiza Baptista",
    "Maternidade Atípica",
    "Filhos Atípicos",
    "Documentário",
    "Inclusão",
    "Apoio Social",
  ],
  authors: [{ name: "Adalgiza Baptista" }],
  creator: "Adalgiza Baptista",
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "https://maesinvisiveis.org",
    title: "Mães Invisíveis — Ignorar Não Faz Desaparecer",
    description:
      "Damos voz ao que o mundo finge não ver. Projeto documental e institucional fundado por Adalgiza Baptista.",
    siteName: "Mães Invisíveis",
    images: [
      {
        url: "/brand/identidade-visual-maes-invisiveis.jpg",
        width: 1200,
        height: 1200,
        alt: "Identidade Visual Mães Invisíveis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mães Invisíveis — Ignorar Não Faz Desaparecer",
    description:
      "Damos voz ao que o mundo finge não ver. Projeto documental liderado por Adalgiza Baptista.",
    images: ["/brand/identidade-visual-maes-invisiveis.jpg"],
  },
  robots: {
    index: true,
    follow: true,
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
