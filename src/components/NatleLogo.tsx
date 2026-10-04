"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function NatleLogo({ 
  className = "",
  showTagline = true 
}: { 
  className?: string;
  showTagline?: boolean;
}) {
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
            src="/logo-wordmark-illuminated.png"
            alt="NADSCA"
            fill
            sizes="(max-width: 768px) 130px, 138px"
            className="object-contain"
            priority
          />
        </div>

        {/* 3 Core Tagline Parts: INNOVATE • BUILD • TRANSFORM */}
        {showTagline && (
          <div className="flex items-center gap-1 sm:gap-1.5 text-[6.5px] sm:text-[7.5px] md:text-[8px] font-mono tracking-[0.16em] sm:tracking-[0.18em] font-bold uppercase text-white/85 group-hover:text-white transition-colors mt-0.5">
            <span>INNOVATE</span>
            <span className="w-1 h-1 rounded-full bg-[#0099FF] shrink-0 shadow-[0_0_6px_#0099FF]" />
            <span>BUILD</span>
            <span className="w-1 h-1 rounded-full bg-[#22C55E] shrink-0 shadow-[0_0_6px_#22C55E]" />
            <span>TRANSFORM</span>
          </div>
        )}
      </div>
    </div>
  );
}
