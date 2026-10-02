import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Story } from "@/types/content";

interface StoryCardProps {
  story: Story;
  layout?: "vertical" | "horizontal";
  className?: string;
}

export function StoryCard({
  story,
  layout = "vertical",
  className = "",
}: StoryCardProps) {
  const isHorizontal = layout === "horizontal";

  return (
    <article
      className={`group border border-gray-dark bg-primary-black hover:border-brand-red transition-colors duration-300 ${
        isHorizontal
          ? "grid grid-cols-1 md:grid-cols-12 gap-6 p-6"
          : "flex flex-col p-6"
      } ${className}`}
    >
      {/* Visual Asset Container */}
      <div
        className={`relative overflow-hidden bg-charcoal-deep border border-gray-dark shrink-0 ${
          isHorizontal
            ? "md:col-span-5 aspect-[4/3] md:aspect-[4/5]"
            : "w-full aspect-[4/5] mb-6"
        }`}
      >
        <Image
          src={story.featuredImage}
          alt={story.featuredImageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-102 transition-all duration-700 ease-out"
        />

        {/* Archival Reference Tag */}
        <div className="absolute top-3 left-3 bg-primary-black/85 px-2.5 py-1 border border-gray-dark backdrop-blur-sm">
          <span className="font-mono text-[9px] uppercase tracking-widest text-white-soft">
            {story.documentRef}
          </span>
        </div>
      </div>

      {/* Content & Narrative Details */}
      <div
        className={`flex flex-col justify-between ${
          isHorizontal ? "md:col-span-7 py-2" : "flex-1"
        }`}
      >
        <div className="space-y-3">
          {/* Metadata Row */}
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-brand-gray border-b border-gray-dark/50 pb-2">
            <span>{story.location}</span>
            <span>{story.date}</span>
          </div>

          {/* Heading */}
          <h3 className="font-serif text-2xl lg:text-3xl font-semibold tracking-tight text-primary-white group-hover:text-brand-red transition-colors pt-1 leading-snug">
            <Link
              href={`/historias/${story.slug}`}
              className="focus-visible:outline-brand-red"
            >
              {story.title}
            </Link>
          </h3>

          {/* Subtitle / Excerpt */}
          <p className="font-sans text-sm text-brand-gray leading-relaxed line-clamp-3">
            {story.excerpt}
          </p>
        </div>

        {/* Card Footer: Tags & Read Link */}
        <div className="pt-6 mt-4 border-t border-gray-dark/50 flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {story.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] uppercase tracking-wider text-brand-gray bg-charcoal-deep px-2 py-0.5 border border-gray-dark"
              >
                {tag}
              </span>
            ))}
          </div>

          <Link
            href={`/historias/${story.slug}`}
            className="inline-flex items-center space-x-1 font-mono text-xs text-white-soft uppercase tracking-wider group-hover:text-brand-red transition-colors"
          >
            <span>Ler Relato</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
