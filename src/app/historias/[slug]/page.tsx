import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { INITIAL_STORIES } from "@/lib/content";
import { Button } from "@/components/ui/Button";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return INITIAL_STORIES.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = INITIAL_STORIES.find((s) => s.slug === slug);

  if (!story) {
    return {
      title: "História Não Encontrada",
    };
  }

  return {
    title: `${story.title} | Mães Invisíveis`,
    description: story.excerpt,
    openGraph: {
      title: `${story.title} | Mães Invisíveis`,
      description: story.excerpt,
      images: [{ url: story.featuredImage }],
    },
  };
}

export default async function StoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const story = INITIAL_STORIES.find((s) => s.slug === slug);

  if (!story) {
    notFound();
  }

  const otherStories = INITIAL_STORIES.filter((s) => s.slug !== slug);

  return (
    <article className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-16 sm:space-y-24">
      {/* Top Breadcrumb & Return Link */}
      <div className="flex items-center justify-between border-b border-gray-dark pb-6">
        <Link
          href="/historias"
          className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-wider text-brand-gray hover:text-brand-red transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Arquivo de Histórias</span>
        </Link>
        <span className="font-mono text-xs uppercase tracking-widest text-brand-red font-semibold">
          {story.documentRef}
        </span>
      </div>

      {/* Editorial Header */}
      <header className="max-w-4xl mx-auto space-y-6 text-center">
        <div className="flex items-center justify-center space-x-4 font-mono text-xs uppercase tracking-widest text-brand-gray">
          <span>{story.location}</span>
          <span className="text-gray-dark">•</span>
          <span>{story.date}</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary-white leading-[1.1]">
          {story.title}
        </h1>

        <p className="font-serif text-xl sm:text-2xl text-white-soft/80 italic font-light max-w-2xl mx-auto leading-relaxed">
          &ldquo;{story.subtitle}&rdquo;
        </p>
      </header>

      {/* Main Photographic Document */}
      <div className="max-w-4xl mx-auto border border-gray-dark p-3 sm:p-4 bg-charcoal-deep">
        <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-primary-black">
          <Image
            src={story.featuredImage}
            alt={story.featuredImageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover contrast-110"
          />
        </div>
        <div className="pt-3 flex flex-col sm:flex-row items-baseline justify-between gap-1 font-mono text-[11px] text-brand-gray">
          <span>{story.featuredImageAlt}</span>
          <span className="uppercase tracking-widest text-[10px]">
            {story.photographerCredit}
          </span>
        </div>
      </div>

      {/* Article Body Content */}
      <div className="max-w-3xl mx-auto space-y-8 font-sans text-brand-gray text-lg leading-relaxed">
        {story.content.map((paragraph, index) => (
          <p key={index} className="text-white-soft/90">
            {index === 0 ? (
              <span className="font-serif text-2xl text-primary-white block mb-4 leading-relaxed font-normal">
                {paragraph}
              </span>
            ) : (
              paragraph
            )}
          </p>
        ))}

        {/* Editorial Pull Quote */}
        <div className="my-14 p-8 sm:p-10 border-y-2 border-brand-red bg-charcoal-deep text-center space-y-3">
          <p className="font-serif text-2xl sm:text-3xl text-primary-white italic leading-snug">
            &ldquo;Ignorar não faz desaparecer.&rdquo;
          </p>
          <span className="font-mono text-xs uppercase tracking-widest text-brand-red block font-semibold">
            Mães Invisíveis — Adalgiza Baptista
          </span>
        </div>

        {/* Tags & Action Bar */}
        <div className="pt-8 border-t border-gray-dark flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap gap-2">
            {story.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs uppercase tracking-wider text-brand-gray bg-charcoal-deep px-3 py-1 border border-gray-dark"
              >
                #{tag}
              </span>
            ))}
          </div>

          <Button href="/contacto" variant="danger">
            Apoiar Esta Causa
          </Button>
        </div>
      </div>

      {/* Related Stories from the Archive */}
      {otherStories.length > 0 && (
        <section className="pt-16 border-t border-gray-dark space-y-8">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-red">
              Outros Registos do Arquivo
            </span>
            <Link
              href="/historias"
              className="font-mono text-xs text-brand-gray hover:text-primary-white uppercase tracking-wider"
            >
              Ver Todas →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherStories.map((s) => (
              <Link
                key={s.id}
                href={`/historias/${s.slug}`}
                className="group border border-gray-dark bg-charcoal-deep p-6 hover:border-brand-red transition-colors flex flex-col sm:flex-row gap-6"
              >
                <div className="relative w-full sm:w-36 aspect-square shrink-0 overflow-hidden bg-primary-black border border-gray-dark">
                  <Image
                    src={s.featuredImage}
                    alt={s.featuredImageAlt}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    sizes="144px"
                  />
                </div>
                <div className="space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-brand-gray uppercase tracking-widest block mb-1">
                      {s.documentRef}
                    </span>
                    <h4 className="font-serif text-xl font-semibold text-primary-white group-hover:text-brand-red transition-colors leading-snug">
                      {s.title}
                    </h4>
                  </div>
                  <span className="inline-flex items-center font-mono text-xs text-white-soft group-hover:text-brand-red transition-colors pt-2">
                    <span>Ler relato</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
