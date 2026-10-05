"use client";

import React from "react";
import Image from "next/image";

interface NadscaLogoProps {
  className?: string;
  showTagline?: boolean;
  layout?: "horizontal" | "stacked";
  size?: "sm" | "md" | "lg";
}

export default function NadscaLogo({ 
  className = "",
  showTagline = true,
  layout = "horizontal",
  size = "md",
}: NadscaLogoProps) {
  if (layout === "stacked") {
    const sizeClasses =
      size === "sm"
        ? "w-14 sm:w-16 md:w-[72px]"
        : size === "lg"
        ? "w-52 sm:w-60"
        : "w-44 sm:w-48";

    return (
      <div 
        className={`group relative inline-flex flex-col items-start select-none cursor-pointer ${className}`}
      >
        <div className={`relative ${sizeClasses} aspect-[945/845] transition-transform duration-300 ease-out group-hover:scale-105`}>
          <Image
            src="/logo-stacked-dark.png"
            alt="NADSCA — Innovate • Build • Transform"
            fill
            sizes="(max-width: 768px) 80px, 240px"
            className="object-contain object-left dark:block hidden"
            priority
          />
          <Image
            src="/logo-stacked-light.png"
            alt="NADSCA — Innovate • Build • Transform"
            fill
            sizes="(max-width: 768px) 80px, 240px"
            className="object-contain object-left dark:hidden block"
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`group relative inline-flex items-center gap-2.5 sm:gap-3 select-none cursor-pointer ${className}`}
    >
      {/* 3D NADSCA Emblem — 100% Clean Alpha, Zero Bounding Box */}
      <div className="relative h-8 w-[46px] sm:h-9 sm:w-[52px] md:h-10 md:w-[56px] shrink-0 transition-transform duration-300 ease-out group-hover:scale-105 group-hover:-translate-y-0.5">
        <Image
          src="/logo-mark.png"
          alt="NADSCA"
          fill
          sizes="(max-width: 768px) 52px, 56px"
          className="object-contain"
          priority
        />
      </div>

      {/* Wordmark & Tagline */}
      <div className="flex flex-col justify-center">
        <div className="relative h-[19px] w-[114px] sm:h-[22px] sm:w-[130px] md:h-6 md:w-[138px] shrink-0 transition-transform duration-300 ease-out group-hover:scale-[1.02]">
          <Image
            src="/logo-wordmark-dark.png"
            alt="NADSCA"
            fill
            sizes="(max-width: 768px) 130px, 138px"
            className="object-contain"
            priority
          />
        </div>

        {/* 3 Core Tagline Parts & Gradient Accent Bar */}
        {showTagline && (
          <div className="flex flex-col mt-0.5">
            <div className="flex items-center gap-1 sm:gap-1.5 text-[6.5px] sm:text-[7.5px] md:text-[8px] font-mono tracking-[0.16em] sm:tracking-[0.18em] font-bold uppercase text-white/85 group-hover:text-white transition-colors">
              <span>INNOVATE</span>
              <span className="w-1 h-1 rounded-full bg-[#0099FF] shrink-0 shadow-[0_0_6px_#0099FF]" />
              <span>BUILD</span>
              <span className="w-1 h-1 rounded-full bg-[#22C55E] shrink-0 shadow-[0_0_6px_#22C55E]" />
              <span>TRANSFORM</span>
            </div>
            <div className="mt-1 h-[1.5px] w-16 sm:w-20 rounded-full bg-gradient-to-r from-[#0099FF] to-[#22C55E] opacity-85 group-hover:opacity-100 transition-opacity" />
          </div>
        )}
      </div>
    </div>
  );
}
