"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import NatleLogo from "./NatleLogo";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Check if user already saw preloader in this session (e.g. Page Refresh)
    try {
      if (sessionStorage.getItem("natle_preloader_seen")) {
        setIsLoading(false);
        document.body.style.overflow = "";
        return;
      }
    } catch {
      // Ignore sessionStorage errors in restricted environments
    }

    // Lock scroll while loading on cold start
    document.body.style.overflow = "hidden";
    
    const duration = 1600;
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
            sessionStorage.setItem("natle_preloader_seen", "true");
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
        }, 300);
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
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-paper dark:bg-[#07090E] text-ink dark:text-white overflow-hidden"
          style={{ position: "fixed", inset: 0, zIndex: 99999 }}
        >
          
          {/* Centered Animated Logo */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center justify-center px-4 text-center"
          >
            <div className="relative w-28 h-20 sm:w-36 sm:h-24 mb-4">
              <Image
                src="/logo-mark.png"
                alt="NADSCA"
                fill
                sizes="144px"
                className="object-contain drop-shadow-[0_0_25px_rgba(0,180,255,0.4)]"
                priority
              />
            </div>
            <span className="font-display font-black text-2xl sm:text-3xl tracking-tight text-white">
              NADSCA
            </span>
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-cyan-400 font-semibold uppercase mt-1">
              INNOVATE • BUILD • TRANSFORM
            </span>
          </motion.div>

          <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end text-xs sm:text-sm font-semibold text-ink/40 dark:text-white/40 uppercase tracking-widest">
            <span>NADSCA STUDIO</span>
            <span className="flex flex-col items-end gap-1">
              <span>LOADING...</span>
              <span className="text-ink dark:text-white text-2xl md:text-3xl font-display">{counter}%</span>
            </span>
          </div>
          
        </motion.div>
      )}
    </AnimatePresence>
  );
}
