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
            {/* Center Stage Container precisely sized to fit the emblem assembly */}
            <div
              className="relative w-72 h-64 sm:w-88 sm:h-72 md:w-[420px] md:h-80 flex items-center justify-center select-none"
              style={{ perspective: "1200px" }}
            >
              {/* Ambient Core Radial Glow behind the N */}
              <div
                className="absolute inset-0 m-auto w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full bg-gradient-to-tr from-[#0099FF]/30 via-[#00F0FF]/25 to-[#22C55E]/30 blur-3xl pointer-events-none"
                style={{ animation: "orbital-pulse-glow 3s ease-in-out infinite" }}
              />

              {/* ── 1. DUAL 3D ORBITAL ENERGY BEAMS (Tracing continuously along the swoosh's elliptical axis) ── */}
              {/* Aligned along the exact 3D elliptical plane of the swoosh lines (72deg / -19deg) */}
              <div
                className="absolute inset-0 m-auto pointer-events-none flex items-center justify-center"
                style={{
                  transform: "rotateX(72deg) rotateZ(-19deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* 1A. Subtle Luminous Orbital Guide Track */}
                <div
                  className="absolute rounded-full border border-cyan-400/20 shadow-[0_0_20px_rgba(0,153,255,0.2)]"
                  style={{
                    width: "92%",
                    height: "92%",
                  }}
                />

                {/* 1B. Rotating Energy Carrier 1 (Neon Cyan & Blue Photon Beam) */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: "92%",
                    height: "92%",
                    animation: "orbital-spin-cw 2.6s linear infinite",
                  }}
                >
                  {/* Photon Head 1 */}
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-[0_0_15px_#ffffff,0_0_30px_#00F0FF,0_0_50px_#0099FF]"
                    style={{ animation: "photon-flare 1.3s ease-in-out infinite" }}
                  >
                    <div className="w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
                  </div>
                  {/* Photon Comet Trail 1 */}
                  <div className="absolute -top-1.5 left-[38%] w-14 h-3 bg-gradient-to-r from-transparent via-[#0099FF] to-[#00F0FF] blur-[1px] rounded-full opacity-80" />
                </div>

                {/* 1C. Rotating Energy Carrier 2 (Neon Emerald & Lime Photon Beam - 180° Offset) */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: "92%",
                    height: "92%",
                    animation: "orbital-spin-cw 2.6s linear infinite",
                    animationDelay: "-1.3s",
                  }}
                >
                  {/* Photon Head 2 */}
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-[0_0_15px_#ffffff,0_0_30px_#22C55E,0_0_50px_#00F0FF]"
                    style={{ animation: "photon-flare 1.3s ease-in-out infinite" }}
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
                  </div>
                  {/* Photon Comet Trail 2 */}
                  <div className="absolute -top-1.5 left-[38%] w-14 h-3 bg-gradient-to-r from-transparent via-[#22C55E] to-[#00F0FF] blur-[1px] rounded-full opacity-80" />
                </div>
              </div>

              {/* ── 2. UNIFIED 3D "N" EMBLEM (100% Intact Original Master Graphic, Zero Seams/Boxes) ── */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotateY: [-4, 4, -4],
                  rotateX: [2, -2, 2],
                  scale: counter === 100 ? [1, 1.05, 1] : 1,
                }}
                transition={{
                  y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
                  rotateY: { duration: 4.8, repeat: Infinity, ease: "easeInOut" },
                  rotateX: { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 0.4, ease: "easeOut" },
                }}
                className="relative z-10 w-64 h-[202px] sm:w-80 sm:h-[253px] md:w-96 md:h-[303px] flex items-center justify-center select-none"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Image
                  src="/logo-mark.png"
                  alt="NADSCA Emblem"
                  fill
                  sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 384px"
                  className="object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)] drop-shadow-[0_0_35px_rgba(0,153,255,0.3)]"
                  priority
                />

                {/* Floating Cybernetic Data Cubes (Complementing the logo's top pixel dissolution) */}
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
