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

          {/* ─── MAIN STAGE: 3D "N" EMBLEM WITH 2 ROTATING ORBITAL RING LINES ─── */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative flex flex-col items-center justify-center px-4"
          >
            {/* Center Stage Container holding N and its 2 rotating lines */}
            <div
              className="relative flex items-center justify-center w-72 h-64 sm:w-88 sm:h-76 md:w-96 md:h-84"
              style={{ perspective: "1000px" }}
            >
              {/* Ambient Core Radial Glow behind the N */}
              <div
                className="absolute inset-0 m-auto w-40 h-40 sm:w-52 sm:h-52 rounded-full bg-gradient-to-tr from-[#0099FF]/30 via-[#00F0FF]/25 to-[#22C55E]/30 blur-3xl pointer-events-none"
                style={{ animation: "orbital-pulse-glow 3s ease-in-out infinite" }}
              />

              {/* ── LAYER A: BACK HALF OF THE 2 ORBITAL RING LINES (z-index: 5, BEHIND N) ── */}
              <div
                className="absolute inset-0 m-auto pointer-events-none z-[5]"
                style={{
                  clipPath: "polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)",
                }}
              >
                {/* 3D Tilted Plane (72deg / -18deg to match the swoosh) */}
                <div
                  className="relative w-full h-full flex items-center justify-center"
                  style={{
                    transform: "rotateX(72deg) rotateZ(-18deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Rotating Ring Container */}
                  <div
                    className="relative w-56 h-56 sm:w-68 sm:h-68 md:w-76 md:h-76 rounded-full"
                    style={{
                      animation: "orbital-spin-cw 2.6s linear infinite",
                    }}
                  >
                    {/* Ring Line 1 (Outer Ring Line): Azure -> Cyan -> Emerald */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "conic-gradient(from 0deg, transparent 0%, rgba(0,153,255,0.2) 20%, #0099FF 45%, #00F0FF 75%, #22C55E 96%, transparent 100%)",
                        WebkitMask:
                          "radial-gradient(farthest-side, transparent calc(100% - 3.5px), #fff calc(100% - 3px))",
                        mask:
                          "radial-gradient(farthest-side, transparent calc(100% - 3.5px), #fff calc(100% - 3px))",
                        filter:
                          "drop-shadow(0 0 10px rgba(0, 240, 255, 0.9)) drop-shadow(0 0 20px rgba(34, 197, 94, 0.6))",
                      }}
                    />
                    {/* Glowing Leading Head Node on Line 1 */}
                    <div
                      className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_#fff,0_0_22px_#00F0FF,0_0_35px_#22C55E]"
                      style={{ animation: "photon-flare 1.2s ease-in-out infinite" }}
                    />

                    {/* Ring Line 2 (Inner Ring Line): Nested concentric line creating the dual-line look */}
                    <div
                      className="absolute inset-3 sm:inset-4 rounded-full"
                      style={{
                        background:
                          "conic-gradient(from 180deg, transparent 0%, rgba(0,210,255,0.15) 25%, #00D2FF 60%, #0099FF 92%, transparent 100%)",
                        WebkitMask:
                          "radial-gradient(farthest-side, transparent calc(100% - 2.5px), #fff calc(100% - 2px))",
                        mask:
                          "radial-gradient(farthest-side, transparent calc(100% - 2.5px), #fff calc(100% - 2px))",
                        filter: "drop-shadow(0 0 8px rgba(0, 210, 255, 0.85))",
                      }}
                    />
                    {/* Companion Node on Line 2 */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-cyan-200 shadow-[0_0_10px_#00F0FF]" />
                  </div>
                </div>
              </div>

              {/* ── LAYER B: THE CLEAN 3D "N" EMBLEM (z-index: 10, IN THE CENTER) ── */}
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  scale: counter === 100 ? [1, 1.05, 1] : 1,
                }}
                transition={{
                  y: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 0.4, ease: "easeOut" },
                }}
                className="relative z-10 w-32 h-[146px] sm:w-40 sm:h-[182px] md:w-46 md:h-[210px] flex items-center justify-center select-none"
              >
                <Image
                  src="/logo-n-clean.png"
                  alt="NADSCA Emblem"
                  fill
                  sizes="(max-width: 640px) 160px, 200px"
                  className="object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)] filter contrast-105"
                  priority
                />
              </motion.div>

              {/* ── LAYER C: FRONT HALF OF THE 2 ORBITAL RING LINES (z-index: 15, IN FRONT OF N) ── */}
              <div
                className="absolute inset-0 m-auto pointer-events-none z-[15]"
                style={{
                  clipPath: "polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)",
                }}
              >
                {/* 3D Tilted Plane (72deg / -18deg to match the swoosh) */}
                <div
                  className="relative w-full h-full flex items-center justify-center"
                  style={{
                    transform: "rotateX(72deg) rotateZ(-18deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Rotating Ring Container (Exact identical animation to Layer A for continuous seamless motion) */}
                  <div
                    className="relative w-56 h-56 sm:w-68 sm:h-68 md:w-76 md:h-76 rounded-full"
                    style={{
                      animation: "orbital-spin-cw 2.6s linear infinite",
                    }}
                  >
                    {/* Ring Line 1 (Outer Ring Line): Azure -> Cyan -> Emerald */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "conic-gradient(from 0deg, transparent 0%, rgba(0,153,255,0.2) 20%, #0099FF 45%, #00F0FF 75%, #22C55E 96%, transparent 100%)",
                        WebkitMask:
                          "radial-gradient(farthest-side, transparent calc(100% - 3.5px), #fff calc(100% - 3px))",
                        mask:
                          "radial-gradient(farthest-side, transparent calc(100% - 3.5px), #fff calc(100% - 3px))",
                        filter:
                          "drop-shadow(0 0 10px rgba(0, 240, 255, 0.9)) drop-shadow(0 0 20px rgba(34, 197, 94, 0.6))",
                      }}
                    />
                    {/* Glowing Leading Head Node on Line 1 */}
                    <div
                      className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_#fff,0_0_22px_#00F0FF,0_0_35px_#22C55E]"
                      style={{ animation: "photon-flare 1.2s ease-in-out infinite" }}
                    />

                    {/* Ring Line 2 (Inner Ring Line): Nested concentric line creating the dual-line look */}
                    <div
                      className="absolute inset-3 sm:inset-4 rounded-full"
                      style={{
                        background:
                          "conic-gradient(from 180deg, transparent 0%, rgba(0,210,255,0.15) 25%, #00D2FF 60%, #0099FF 92%, transparent 100%)",
                        WebkitMask:
                          "radial-gradient(farthest-side, transparent calc(100% - 2.5px), #fff calc(100% - 2px))",
                        mask:
                          "radial-gradient(farthest-side, transparent calc(100% - 2.5px), #fff calc(100% - 2px))",
                        filter: "drop-shadow(0 0 8px rgba(0, 210, 255, 0.85))",
                      }}
                    />
                    {/* Companion Node on Line 2 */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-cyan-200 shadow-[0_0_10px_#00F0FF]" />
                  </div>
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
