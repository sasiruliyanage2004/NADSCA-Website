"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Check if user already saw preloader in this session, unless forced via ?preloader=1
    try {
      const isPreview = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("preloader");
      if (!isPreview && (sessionStorage.getItem("nadsca_preloader_seen") || sessionStorage.getItem("natle_preloader_seen"))) {
        setIsLoading(false);
        document.body.style.overflow = "";
        return;
      }
    } catch {
      // Ignore sessionStorage errors in restricted environments
    }

    // Lock scroll while loading on cold start
    document.body.style.overflow = "hidden";
    
    const duration = 1800;
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    let timeoutId: NodeJS.Timeout;

    const interval = setInterval(() => {
      currentStep++;
      const progress = Math.min(100, Math.floor(100 * (1 - Math.pow(1 - currentStep / steps, 3))));
      setCounter(progress);

      if (currentStep >= steps) {
        clearInterval(interval);
        timeoutId = setTimeout(() => {
          try {
            sessionStorage.setItem("nadsca_preloader_seen", "true");
          } catch {}
          setIsLoading(false);
          document.body.style.overflow = "";

          // Notify Lenis, GSAP, and ScrollBackground that layout is unlocked
          setTimeout(() => {
            window.dispatchEvent(new Event("resize"));
            window.dispatchEvent(new Event("scroll"));
            if (typeof window !== "undefined" && (window as any).__lenis) {
              (window as any).__lenis.resize();
            }
          }, 100);
        }, 400);
      }
    }, intervalTime);

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutId);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          id="preloader-wrapper"
          key="preloader"
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#05070B] text-white overflow-hidden select-none"
          style={{ position: "fixed", inset: 0, zIndex: 99999 }}
        >
          {/* Subtle Cybernetic Background Grid & Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,153,255,0.06)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

          {/* ─── MAIN STAGE: 3D ROTATING ORBITAL SYSTEM ─── */}
          <motion.div 
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative flex flex-col items-center justify-center px-4"
          >
            {/* 3D Perspective Orbital Container */}
            <div 
              className="relative flex items-center justify-center w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
              style={{ perspective: "1000px" }}
            >
              {/* Ambient Core Radial Glow */}
              <div 
                className="absolute inset-0 m-auto w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-gradient-to-tr from-[#0099FF]/25 via-[#00F0FF]/20 to-[#22C55E]/25 blur-3xl pointer-events-none"
                style={{ animation: "orbital-pulse-glow 3s ease-in-out infinite" }}
              />

              {/* 1. Outer Circular Loading Gauge (Synced directly with Counter 0-100%) */}
              <svg 
                className="absolute inset-2 sm:inset-4 w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] h-[calc(100%-1rem)] sm:h-[calc(100%-2rem)] -rotate-90 pointer-events-none"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="47"
                  className="stroke-white/[0.07]"
                  strokeWidth="1.2"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="47"
                  className="stroke-url(#nadsca-orbit-gradient)"
                  strokeWidth="1.8"
                  fill="transparent"
                  strokeDasharray={295.3}
                  strokeDashoffset={295.3 - (295.3 * counter) / 100}
                  strokeLinecap="round"
                  style={{
                    transition: "stroke-dashoffset 0.1s ease-out",
                    filter: "drop-shadow(0 0 8px rgba(0, 240, 255, 0.7))",
                  }}
                />
                <defs>
                  <linearGradient id="nadsca-orbit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0099FF" />
                    <stop offset="50%" stopColor="#00F0FF" />
                    <stop offset="100%" stopColor="#22C55E" />
                  </linearGradient>
                </defs>
              </svg>

              {/* 2. Counter-Rotating Gyroscopic Secondary Ring (Tilted at complementary angle) */}
              <div 
                className="absolute inset-6 sm:inset-8 m-auto rounded-full border border-dashed border-cyan-400/20 pointer-events-none"
                style={{
                  transform: "rotateX(68deg) rotateZ(32deg)",
                  transformStyle: "preserve-3d",
                  animation: "orbital-spin-ccw 9s linear infinite",
                }}
              >
                {/* 4 Cardinal Cybernetic Node Pips */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-cyan-400 shadow-[0_0_6px_#00F0FF]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-cyan-400 shadow-[0_0_6px_#00F0FF]" />
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-emerald-400 shadow-[0_0_6px_#22C55E]" />
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-azure shadow-[0_0_6px_#0099FF]" />
              </div>

              {/* 3. Concentric Inner Resonance Ring (Co-axial with swoosh plane) */}
              <div 
                className="absolute inset-10 sm:inset-12 m-auto rounded-full border border-white/10 pointer-events-none"
                style={{
                  transform: "rotateX(72deg) rotateZ(-18deg)",
                  transformStyle: "preserve-3d",
                  animation: "orbital-spin-cw 4.5s linear infinite",
                }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-400/80 shadow-[0_0_8px_#22C55E]" />
              </div>

              {/* 4. PRIMARY 3D ORBITAL RING (Tilted at -18deg / 72deg to EXACTLY match the 'N' swoosh!) */}
              <div
                className="absolute inset-2 sm:inset-3 m-auto pointer-events-none"
                style={{
                  transform: "rotateX(72deg) rotateZ(-18deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* The Rotating Luminous Ring Container */}
                <div
                  className="relative w-full h-full rounded-full"
                  style={{
                    animation: "orbital-spin-cw 2.4s linear infinite",
                  }}
                >
                  {/* Glowing Conic Ribbon Ring */}
                  <div 
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "conic-gradient(from 0deg, transparent 0%, rgba(0,153,255,0.2) 20%, #0099FF 45%, #00F0FF 75%, #22C55E 96%, transparent 100%)",
                      WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 3.5px), #fff calc(100% - 3px))",
                      mask: "radial-gradient(farthest-side, transparent calc(100% - 3.5px), #fff calc(100% - 3px))",
                      filter: "drop-shadow(0 0 10px rgba(0, 240, 255, 0.85)) drop-shadow(0 0 22px rgba(34, 197, 94, 0.6))",
                    }}
                  />

                  {/* High-Intensity Orbiting Photon Beacon (The Head) */}
                  <div 
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white flex items-center justify-center shadow-[0_0_15px_#fff,0_0_25px_#00F0FF,0_0_45px_#22C55E]"
                    style={{ animation: "photon-flare 1.2s ease-in-out infinite" }}
                  >
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-cyan-300 animate-ping" />
                  </div>

                  {/* Trailing Comet Spark 1 */}
                  <div 
                    className="absolute -top-1.5 left-[46%] w-3 h-3 rounded-full bg-cyan-400 opacity-90 blur-[0.5px] shadow-[0_0_10px_#00F0FF]"
                  />
                  {/* Trailing Comet Spark 2 */}
                  <div 
                    className="absolute -top-1 left-[41%] w-2 h-2 rounded-full bg-[#0099FF] opacity-75 blur-[0.5px] shadow-[0_0_8px_#0099FF]"
                  />
                  {/* Trailing Comet Spark 3 */}
                  <div 
                    className="absolute -top-0.5 left-[36%] w-1.5 h-1.5 rounded-full bg-blue-500 opacity-60 blur-[0.5px]"
                  />
                </div>
              </div>

              {/* 5. Centered 3D NADSCA 'N' Emblem (Levitating in True 3D Center) */}
              <motion.div
                animate={{ 
                  y: [0, -5, 0],
                  scale: counter === 100 ? [1, 1.06, 1] : 1,
                }}
                transition={{ 
                  y: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 0.4, ease: "easeOut" }
                }}
                className="relative z-10 w-28 h-22 sm:w-36 sm:h-28 md:w-44 md:h-34 flex items-center justify-center select-none"
              >
                <Image
                  src="/logo-mark.png"
                  alt="NADSCA Emblem"
                  fill
                  sizes="(max-width: 640px) 144px, 176px"
                  className="object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)] filter contrast-105"
                  priority
                />
              </motion.div>
            </div>

            {/* ─── WORDMARK & TAGLINE SECTION ─── */}
            <div className="mt-2 flex flex-col items-center">
              <div className="relative w-44 h-8 sm:w-56 sm:h-10 mb-2">
                <Image
                  src="/logo-wordmark-illuminated.png"
                  alt="NADSCA"
                  fill
                  sizes="224px"
                  className="object-contain drop-shadow-[0_0_20px_rgba(0,163,255,0.4)]"
                  priority
                />
              </div>

              {/* 3 Core Pillars */}
              <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono tracking-[0.22em] text-white/90 font-bold uppercase mt-1">
                <span>INNOVATE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF] shrink-0 shadow-[0_0_8px_#0099FF]" />
                <span>BUILD</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shrink-0 shadow-[0_0_8px_#22C55E]" />
                <span>TRANSFORM</span>
              </div>

              {/* Gradient Accent Bar */}
              <div className="mt-2 h-[2px] w-24 sm:w-32 rounded-full bg-gradient-to-r from-[#0099FF] via-[#00F0FF] to-[#22C55E] shadow-[0_0_8px_#00F0FF]" />
            </div>
          </motion.div>

          {/* ─── BOTTOM DOCKED STATUS & TELEMETRY BAR ─── */}
          <div className="absolute bottom-8 left-8 right-8 sm:bottom-10 sm:left-12 sm:right-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono uppercase tracking-widest text-white/50 border-t border-white/[0.08] pt-4">
            {/* System Identifier */}
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-white/70 font-semibold tracking-wider">
                NADSCA // CORE OS
              </span>
            </div>

            {/* Central Linear Progress Bar */}
            <div className="w-full sm:w-48 md:w-64 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#0099FF] via-[#00F0FF] to-[#22C55E] transition-all duration-100 ease-out shadow-[0_0_10px_#00F0FF]"
                style={{ width: `${counter}%` }}
              />
            </div>

            {/* Counter Readout */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/40">SYSTEM INITIALIZING</span>
              <span className="text-white font-display text-lg sm:text-xl font-bold tracking-tight text-right min-w-[3.5rem] tabular-nums">
                {counter}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
