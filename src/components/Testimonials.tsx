"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";

interface TestimonialItem {
  tag: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
  projectTitle: string;
  projectSubtitle: string;
  clientName: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    tag: "HR SOLUTION • OHRM",
    quote:
      "Professional solution providers with super leading Engineers, we got our paper work of HR solution resolved by OHRMS and in-time support",
    author: "Andrey Perera",
    role: "Managing Director",
    company: "SAVI",
    initials: "AP",
    projectTitle: "OHRM",
    projectSubtitle: "HR Solution",
    clientName: "SAVI Group of Companies",
  },
  {
    tag: "POS SOLUTION • BLADE RAY",
    quote:
      "The best ever POS solution my business has received. They shipped my POS solution, Blade Ray, three weeks ahead of schedule with zero tech debt.",
    author: "Aruna Dissanayake",
    role: "Managing Director",
    company: "I-Fix PC Solutions",
    initials: "AD",
    projectTitle: "3 Wks",
    projectSubtitle: "Ahead of schedule, Blade Ray POS",
    clientName: "I-Fix PC Solutions",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance carousel every 7 seconds unless user hovers
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const current = TESTIMONIALS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="py-28 lg:py-32 bg-transparent relative overflow-hidden">
      <div className="container-content relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <Reveal className="max-w-xl">
            <span className="text-azure font-mono font-semibold text-xs tracking-widest uppercase mb-3 block">
              CLIENT FEEDBACK
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-ink dark:text-white leading-tight">
              Real feedback from the clients we build for.
            </h2>
          </Reveal>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-12 h-12 rounded-full border border-ink/10 dark:border-white/15 flex items-center justify-center text-ink dark:text-white hover:bg-ink dark:hover:bg-white hover:text-white dark:hover:text-ink transition-all shadow-sm cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-12 h-12 rounded-full border border-ink/10 dark:border-white/15 flex items-center justify-center text-ink dark:text-white hover:bg-ink dark:hover:bg-white hover:text-white dark:hover:text-ink transition-all shadow-sm cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Testimonial Stage Card */}
        <Reveal>
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="rounded-3xl bg-ink-gradient text-white p-8 md:p-14 lg:p-16 border border-white/10 relative overflow-hidden shadow-2xl transition-all"
          >
            {/* Ambient inner glow */}
            <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-azure/15 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-teal/15 blur-[100px]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10"
              >
                {/* Left: Quote & Author (Col 8) */}
                <div className="lg:col-span-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-white/10 text-teal border border-teal/20">
                        {current.tag}
                      </span>
                      <span className="text-xs font-mono text-white/40">
                        0{currentIndex + 1} / 0{TESTIMONIALS.length}
                      </span>
                    </div>

                    <blockquote className="text-xl sm:text-2xl md:text-3xl font-display leading-relaxed text-white/95 mb-8">
                      &ldquo;{current.quote}&rdquo;
                    </blockquote>
                  </div>

                  {/* Author Details */}
                  <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white font-mono text-sm font-bold shrink-0">
                      {current.initials}
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg text-white">
                        {current.author}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {current.role}, <span className="text-white/80 font-medium">{current.company}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Project Delivered Callout (Col 4) */}
                <div className="lg:col-span-4 flex flex-col justify-center">
                  <div className="p-8 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md text-center flex flex-col items-center justify-center">
                    <span className="text-[11px] font-mono tracking-widest uppercase text-emerald-400 font-semibold mb-3 block">
                      PROJECT DELIVERED
                    </span>
                    <div className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-2">
                      {current.projectTitle}
                    </div>
                    <div className="text-sm font-medium text-teal-300/90 mb-6">
                      {current.projectSubtitle}
                    </div>
                    <div className="pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-xs font-mono text-white/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Client: {current.clientName}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-10 relative z-10">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === i ? "w-8 bg-azure" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}
