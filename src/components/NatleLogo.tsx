"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function NatleLogo({ 
  className = "",
  showTagline = true 
}: { 
  className?: string;
  showTagline?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`group relative inline-flex items-center gap-2.5 sm:gap-3 select-none cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient Bioluminescent Glow Aura behind the 3D mark */}
      <motion.div 
        className="pointer-events-none absolute -inset-2 rounded-2xl bg-gradient-to-r from-blue-600/30 via-cyan-400/25 to-emerald-400/20 blur-xl"
        animate={{
          opacity: isHovered ? 0.9 : 0.35,
          scale: isHovered ? 1.1 : 0.95,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* 3D NADSCA Emblem — 100% Transparent, No White Box */}
      <div className="relative h-8 w-[46px] sm:h-9 sm:w-[52px] md:h-10 md:w-[58px] shrink-0 transition-transform duration-300 ease-out group-hover:scale-105 group-hover:-translate-y-0.5">
        <Image
          src="/logo-mark.png"
          alt="NADSCA Emblem"
          fill
          sizes="(max-width: 768px) 52px, 58px"
          className="object-contain filter drop-shadow-[0_2px_12px_rgba(0,180,255,0.45)]"
          priority
        />
      </div>

      {/* Official Stylized Wordmark from the Brand Logo */}
      <div className="relative h-5 w-[114px] sm:h-6 sm:w-[136px] md:h-6 md:w-[144px] shrink-0 transition-transform duration-300 ease-out group-hover:scale-[1.03]">
        <Image
          src="/logo-wordmark-illuminated.png"
          alt="NADSCA"
          fill
          sizes="(max-width: 768px) 136px, 144px"
          className="object-contain filter drop-shadow-[0_0_16px_rgba(0,163,255,0.25)]"
          priority
        />
      </div>

      <span className="hidden sm:inline-flex px-1.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider bg-white/[0.08] text-white/70 border border-white/10 group-hover:border-cyan-400/40 group-hover:text-cyan-300 transition-colors">
        STUDIO
      </span>
    </div>
  );
}
