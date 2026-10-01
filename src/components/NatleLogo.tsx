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
      className={`group relative inline-flex items-center gap-3 select-none cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient Bioluminescent Glow Aura */}
      <motion.div 
        className="pointer-events-none absolute -inset-2 rounded-2xl bg-gradient-to-r from-blue-600/20 via-cyan-400/20 to-emerald-400/20 blur-xl"
        animate={{
          opacity: isHovered ? 0.9 : 0.3,
          scale: isHovered ? 1.08 : 0.96,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* 3D NADSCA Emblem */}
      <div className="relative h-9 w-9 md:h-10 md:w-10 shrink-0">
        <Image
          src="/logo.png"
          alt="NADSCA Logo"
          fill
          sizes="40px"
          className="object-contain drop-shadow-[0_0_15px_rgba(0,196,255,0.35)]"
          priority
        />
      </div>

      {/* Wordmark & Tagline */}
      {showTagline ? (
        <div className="flex flex-col justify-center">
          <span className="font-display font-extrabold text-lg md:text-xl tracking-tight text-white leading-none group-hover:text-white/85 transition-colors">
            NADSCA
          </span>
          <span className="text-[8px] md:text-[9px] font-mono tracking-[0.2em] text-cyan-400 font-semibold uppercase mt-0.5">
            INNOVATE • BUILD • TRANSFORM
          </span>
        </div>
      ) : null}
    </div>
  );
}
