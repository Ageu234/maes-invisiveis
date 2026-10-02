import React from "react";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`space-y-4 ${
        isCenter ? "text-center mx-auto max-w-2xl" : "max-w-3xl"
      } ${className}`}
    >
      {badge && (
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-brand-red inline-block" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-brand-gray">
            {badge}
          </span>
        </div>
      )}

      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-primary-white leading-[1.15]">
        {title}
      </h2>

      {subtitle && (
        <p className="font-sans text-base sm:text-lg text-brand-gray leading-relaxed font-light">
          {subtitle}
        </p>
      )}

      <div
        className={`w-16 h-[2px] bg-brand-red ${
          isCenter ? "mx-auto" : ""
        } mt-4`}
      />
    </div>
  );
}
