"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import Magnetic from "./Magnetic";
import { ArrowRight, Sparkles } from "lucide-react";

const PERFORMANCE_FEATURES = [
  {
    title: "Production-Ready",
    desc: "Engineered for reliability",
  },
  {
    title: "Enterprise-Grade",
    desc: "Built for complex operations",
  },
  {
    title: "High Performance",
    desc: "Optimized for speed and scale",
  },
  {
    title: "Built to Last",
    desc: "Designed for long-term maintainability",
  },
];

export default function HeroContent() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        "[data-hero='line']",
        { y: 44, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.09, clearProps: "all" }
      )
        .fromTo(
          "[data-hero='sub']",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, clearProps: "all" },
          "-=0.35"
        )
        .fromTo(
          "[data-hero='cta']",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, clearProps: "all" },
          "-=0.4"
        )
        .fromTo(
          "[data-hero='tag']",
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, clearProps: "all" },
          "-=0.3"
        )
        .fromTo(
          "[data-hero='card']",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, clearProps: "all" },
          "-=0.3"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  const openAI = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-avora-ai", {
          detail: { prompt: "How can NADSCA partner with us to design, build, and scale high-performance software and AI platforms?" },
        })
      );
    }
  };

  return (
    <div ref={rootRef} className="relative z-10 pt-4 sm:pt-6">
      {/* Main Headline */}
      <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[6.25rem] font-bold text-ink dark:text-white max-w-5xl tracking-tight leading-[1.08] sm:leading-[1.04]">
        <span data-hero="line" className="block pb-1 sm:pb-2">
          We Engineer
        </span>
        <span
          data-hero="line"
          className="block pb-1.5 sm:pb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 via-[#0099FF] via-[#10B981] to-cyan-300 animate-hero-gradient filter drop-shadow-[0_0_25px_rgba(0,210,255,0.25)]"
        >
          What&apos;s Next.
        </span>
      </h1>

      {/* Supporting Copy */}
      <div
        data-hero="sub"
        className="mt-6 sm:mt-8 space-y-4 text-base sm:text-lg md:text-xl text-ink/75 dark:text-white/75 max-w-3xl leading-relaxed"
      >
        <p>
          <strong className="text-ink dark:text-white font-semibold">NADSCA</strong> partners with ambitious founders and enterprise teams to design, build, and scale high-performance software, cloud platforms, and production-ready AI.
        </p>
        <p className="text-ink/70 dark:text-white/70">
          From complex business systems to intelligent digital products, we combine{" "}
          <strong className="text-ink dark:text-white font-semibold">
            engineering, design, cloud, data, and AI
          </strong>{" "}
          to turn ambitious ideas into technology that performs in the real world.
        </p>
      </div>

      {/* Dual CTAs */}
      <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
        <div data-hero="cta">
          <Magnetic>
            <Link
              href="/projects"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-ink text-white dark:bg-white dark:text-black px-8 py-4 text-[15px] font-bold shadow-[0_0_35px_-5px_rgba(0,0,0,0.25)] dark:shadow-[0_0_35px_-5px_rgba(255,255,255,0.3)] hover:bg-slate-850 dark:hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              data-cursor="view"
            >
              <span>Explore Our Work</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Magnetic>
        </div>

        <div data-hero="cta">
          <Magnetic>
            <button
              onClick={openAI}
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-ink/15 dark:border-white/15 bg-black/5 dark:bg-white/[0.04] text-ink dark:text-white px-7 py-3.5 text-[15px] font-medium hover:border-cyan-500/50 dark:hover:border-cyan-400/40 hover:bg-black/10 dark:hover:bg-white/[0.08] backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              data-cursor="ask"
            >
              <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
              <span>Ask AVORA_AI</span>
            </button>
          </Magnetic>
        </div>
      </div>

      {/* BUILT FOR PERFORMANCE & 4 Feature Cards */}
      <div className="mt-14 sm:mt-16">
        <div
          data-hero="tag"
          className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold tracking-[0.25em] uppercase mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
          BUILT FOR PERFORMANCE
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {PERFORMANCE_FEATURES.map((feat) => (
            <div
              key={feat.title}
              data-hero="card"
              className="rounded-2xl p-5 sm:p-6 bg-white/75 dark:bg-white/[0.03] hover:bg-white/95 dark:hover:bg-white/[0.06] border border-ink/10 dark:border-white/10 hover:border-cyan-500/40 dark:hover:border-cyan-400/40 shadow-sm dark:shadow-none transition-all duration-300 backdrop-blur-sm group"
            >
              <h3 className="font-display text-lg sm:text-xl font-bold text-ink dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors mb-1.5">
                {feat.title}
              </h3>
              <p className="text-sm text-ink/65 dark:text-white/65 leading-relaxed font-body">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
