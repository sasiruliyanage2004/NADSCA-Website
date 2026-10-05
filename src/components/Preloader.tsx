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

          {/* ─── MAIN STAGE: THE EXACT 3D "N" WITH THE TWO ANIMATED SWOOSH ARCS ─── */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative flex flex-col items-center justify-center px-4"
          >
            {/* Center Stage Container precisely sized to fit the emblem assembly */}
            <div
              className="relative w-72 h-56 sm:w-84 sm:h-64 md:w-96 md:h-72 flex items-center justify-center select-none"
              style={{ perspective: "1000px" }}
            >
              {/* Ambient Core Radial Glow behind the N */}
              <div
                className="absolute inset-0 m-auto w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-[#0099FF]/30 via-[#00F0FF]/25 to-[#22C55E]/30 blur-3xl pointer-events-none"
                style={{ animation: "orbital-pulse-glow 3s ease-in-out infinite" }}
              />

              {/* ── 1. SWOOSH ARC 1: LEFT BLUE CURVED LINE (Image 2) ── */}
              {/* Positioned on the left, diving behind the left upright pillar */}
              <motion.div
                animate={{
                  x: [0, -3, 0],
                  y: [0, 2, 0],
                  rotateZ: [0, -1.5, 0],
                  filter: [
                    "drop-shadow(0 0 10px rgba(0,153,255,0.5))",
                    "drop-shadow(0 0 22px rgba(0,210,255,0.9))",
                    "drop-shadow(0 0 10px rgba(0,153,255,0.5))",
                  ],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute z-[5] pointer-events-none"
                style={{
                  left: "7.5%",
                  top: "47%",
                  width: "18.5%",
                  height: "46%",
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/swoosh-left.png"
                    alt="Left Blue Arc"
                    fill
                    sizes="80px"
                    className="object-contain"
                    priority
                  />
                  {/* Subtle electric sheen along the curve */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-cyan-400/30 to-transparent opacity-75 blur-[1px] animate-pulse" />
                </div>
              </motion.div>

              {/* ── 2. THE 3D "N" EMBLEM (Center) ── */}
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  scale: counter === 100 ? [1, 1.05, 1] : 1,
                }}
                transition={{
                  y: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 0.4, ease: "easeOut" },
                }}
                className="relative z-10 w-36 h-[162px] sm:w-44 sm:h-[198px] md:w-50 md:h-[225px] flex items-center justify-center select-none"
              >
                <Image
                  src="/logo-n-clean.png"
                  alt="NADSCA Emblem"
                  fill
                  sizes="(max-width: 640px) 180px, 220px"
                  className="object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)] filter contrast-105"
                  priority
                />
              </motion.div>

              {/* ── 3. SWOOSH ARC 2: RIGHT CYAN/GREEN CURVED LINE (Image 3) ── */}
              {/* Positioned on the right, crossing in front of the N diagonal and pillar */}
              <motion.div
                animate={{
                  x: [0, 3, 0],
                  y: [0, -2, 0],
                  rotateZ: [0, 1.5, 0],
                  filter: [
                    "drop-shadow(0 0 12px rgba(34,197,94,0.5))",
                    "drop-shadow(0 0 25px rgba(0,240,255,0.95))",
                    "drop-shadow(0 0 12px rgba(34,197,94,0.5))",
                  ],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute z-[15] pointer-events-none"
                style={{
                  left: "64.5%",
                  top: "36.5%",
                  width: "29%",
                  height: "36%",
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/swoosh-right.png"
                    alt="Right Cyan/Green Arc"
                    fill
                    sizes="120px"
                    className="object-contain"
                    priority
                  />
                  {/* Subtle electric flare on the green curve */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-emerald-400/40 to-cyan-300/40 opacity-80 blur-[1px] animate-pulse" />
                </div>
              </motion.div>

              {/* ── 4. CONTINUOUS ORBITAL PHOTON BEACON RACING THROUGH BOTH LINES ── */}
              {/* Aligned along the exact 3D elliptical plane of the swoosh (72deg / -18deg) */}
              <div
                className="absolute inset-0 m-auto pointer-events-none z-[12]"
                style={{
                  transform: "rotateX(72deg) rotateZ(-18deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 m-auto rounded-full"
                  style={{
                    animation: "orbital-spin-cw 2.4s linear infinite",
                  }}
                >
                  {/* Luminous Photon Spark tracing through the two swoosh curves */}
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-[0_0_15px_#fff,0_0_25px_#00F0FF,0_0_40px_#22C55E]"
                    style={{ animation: "photon-flare 1.2s ease-in-out infinite" }}
                  >
                    <div className="w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
                  </div>
                  <div className="absolute -top-1.5 left-[46%] w-2.5 h-2.5 rounded-full bg-cyan-400 opacity-80 blur-[0.5px] shadow-[0_0_10px_#00F0FF]" />
                  <div className="absolute -top-1 left-[41%] w-1.5 h-1.5 rounded-full bg-[#0099FF] opacity-60" />
                </div>
              </div>
            </div>

            {/* ─── WORDMARK & TAGLINE SECTION ─── */}
            <div className="mt-4 flex flex-col items-center">
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
