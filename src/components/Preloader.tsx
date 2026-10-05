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
      const isPreview =
        typeof window !== "undefined" &&
        new URLSearchParams(window.location.search).has("preloader");
      if (
        !isPreview &&
        (sessionStorage.getItem("nadsca_preloader_seen") ||
          sessionStorage.getItem("natle_preloader_seen"))
      ) {
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
      const progress = Math.min(
        100,
        Math.floor(100 * (1 - Math.pow(1 - currentStep / steps, 3)))
      );
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
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#05070B] text-white overflow-hidden select-none"
          style={{ position: "fixed", inset: 0, zIndex: 99999 }}
        >
          {/* Subtle Ambient Vignette & Cyber Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,153,255,0.08)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

          {/* ─── MAIN STAGE: UNIFIED 3D EMBLEM WITH DUAL COAXIAL ORBITAL SWOOSH ANIMATION ─── */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative flex flex-col items-center justify-center px-4"
          >
            {/* Center Stage Container precisely sized to fit the emblem assembly (aspect ratio 839/663 ≈ 1.265) */}
            <div className="relative w-64 h-[202px] sm:w-80 sm:h-[253px] md:w-96 md:h-[303px] flex items-center justify-center select-none">
              {/* Ambient Core Radial Glow behind the N */}
              <div
                className="absolute inset-0 m-auto w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full bg-gradient-to-tr from-[#0099FF]/30 via-[#00F0FF]/25 to-[#22C55E]/30 blur-3xl pointer-events-none"
                style={{ animation: "orbital-pulse-glow 3s ease-in-out infinite" }}
              />

              {/* ── 1. THE 3D "N" EMBLEM CORE (Centered & Floating) ── */}
              <motion.div
                animate={{
                  y: [0, -6, 0],
                  scale: counter === 100 ? [1, 1.05, 1] : 1,
                }}
                transition={{
                  y: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 0.4, ease: "easeOut" },
                }}
                className="relative z-10 w-full h-full flex items-center justify-center select-none"
              >
                <Image
                  src="/logo-n-core.png"
                  alt="NADSCA Emblem"
                  fill
                  sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 384px"
                  className="object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)] drop-shadow-[0_0_35px_rgba(0,153,255,0.3)]"
                  priority
                />

                {/* Floating Cybernetic Data Cubes (Rising from top-right of the N) */}
                <div className="absolute top-2 right-8 sm:top-3 sm:right-12 md:top-4 md:right-16 pointer-events-none">
                  <motion.div
                    animate={{ y: [-2, -14, -2], opacity: [0.3, 0.95, 0.3] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 bg-cyan-400 shadow-[0_0_10px_#00F0FF] rounded-[1px]"
                  />
                  <motion.div
                    animate={{ y: [-4, -20, -4], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute left-3 -top-3 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#22C55E] shadow-[0_0_10px_#22C55E] rounded-[1px]"
                  />
                  <motion.div
                    animate={{ y: [-1, -16, -1], opacity: [0.2, 0.85, 0.2] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
                    className="absolute left-6 -top-1 w-2 h-2 bg-[#0099FF] shadow-[0_0_10px_#0099FF] rounded-[1px]"
                  />
                </div>
              </motion.div>

              {/* ── 2. THE EXACT TWO 3D CURVED SWOOSH LINES ROTATING 360° AROUND THE "N" ── */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 z-20 pointer-events-none select-none"
                style={{
                  transformOrigin: "49.65% 60.4%", // Exact mathematical center (416.6, 400.5) of the swooshes
                }}
              >
                <Image
                  src="/logo-swooshes-ring.png"
                  alt="NADSCA Orbital Swooshes"
                  fill
                  sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 384px"
                  className="object-contain filter drop-shadow-[0_0_20px_rgba(0,240,255,0.65)] drop-shadow-[0_0_35px_rgba(34,197,94,0.45)]"
                  priority
                />
              </motion.div>
            </div>

            {/* ─── WORDMARK & TAGLINE SECTION (Clean Dark Wordmark with Zero Bounding Box) ─── */}
            <div className="mt-3 sm:mt-4 flex flex-col items-center">
              <div className="relative w-44 h-7 sm:w-56 sm:h-9 md:w-64 md:h-10 mb-2">
                <Image
                  src="/logo-wordmark-dark.png"
                  alt="NADSCA"
                  fill
                  sizes="256px"
                  className="object-contain drop-shadow-[0_0_20px_rgba(0,163,255,0.35)]"
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
