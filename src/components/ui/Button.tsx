import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  isExternal,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-mono uppercase tracking-widest text-xs font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-none cursor-pointer";

  const sizeStyles = {
    sm: "px-4 py-2 text-[11px]",
    md: "px-6 py-3 text-xs",
    lg: "px-8 py-4 text-xs font-semibold",
  };

  const variantStyles = {
    // Primary: Solid white background, black text, inverted hover
    primary:
      "bg-primary-white text-primary-black hover:bg-brand-red hover:text-primary-white border border-primary-white hover:border-brand-red focus-visible:outline-brand-red",
    // Secondary: Pure black background, white border, subtle gray hover
    secondary:
      "bg-primary-black text-primary-white border border-gray-dark hover:border-primary-white hover:bg-gray-dark/50 focus-visible:outline-primary-white",
    // Danger: Brand crimson red
    danger:
      "bg-brand-red text-primary-white hover:bg-brand-red-secondary border border-brand-red focus-visible:outline-brand-red-secondary",
    // Ghost: Transparent with underline on hover
    ghost:
      "bg-transparent text-brand-gray hover:text-primary-white border-transparent underline-offset-4 hover:underline",
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedStyles}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedStyles} {...props}>
      {children}
    </button>
  );
}
