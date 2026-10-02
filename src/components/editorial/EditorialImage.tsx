import React from "react";
import Image from "next/image";

interface EditorialImageProps {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  documentRef?: string;
  aspectRatio?: "square" | "portrait" | "landscape" | "video";
  priority?: boolean;
  className?: string;
}

export function EditorialImage({
  src,
  alt,
  caption,
  credit,
  documentRef,
  aspectRatio = "portrait",
  priority = false,
  className = "",
}: EditorialImageProps) {
  const aspectClasses = {
    square: "aspect-square",
    portrait: "aspect-[4/5]",
    landscape: "aspect-[16/10]",
    video: "aspect-[16/9]",
  };

  return (
    <figure className={`group space-y-3 ${className}`}>
      {/* Photo Frame Container */}
      <div
        className={`relative overflow-hidden bg-charcoal-deep border border-gray-dark group-hover:border-gray-dark/80 transition-colors ${aspectClasses[aspectRatio]}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover grayscale contrast-[1.08] group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 ease-out"
        />

        {/* Archival corner tag */}
        {documentRef && (
          <div className="absolute top-3 left-3 bg-primary-black/80 px-2.5 py-1 border border-gray-dark backdrop-blur-sm">
            <span className="font-mono text-[9px] uppercase tracking-wider text-white-soft">
              {documentRef}
            </span>
          </div>
        )}
      </div>

      {/* Caption & Metadata bar */}
      {(caption || credit) && (
        <figcaption className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pt-1 font-mono text-[11px] text-brand-gray border-t border-gray-dark/40">
          {caption && <span className="font-sans text-xs text-brand-gray">{caption}</span>}
          {credit && (
            <span className="uppercase tracking-widest text-[10px] text-brand-gray/70 shrink-0">
              {credit}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
