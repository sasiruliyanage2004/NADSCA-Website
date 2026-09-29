"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import Magnetic from "./Magnetic";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroContent() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        "[data-hero='eyebrow']",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, clearProps: "all" }
      )
        .fromTo(
          "[data-hero='line']",
          { y: 44, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, stagger: 0.09, clearProps: "all" },
          "-=0.3"
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
          "[data-hero='stat']",
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, clearProps: "all" },
          "-=0.35"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  const openAI = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-natle-ai", {
          detail: { prompt: "How can NATLE help architect our next software product?" },
        })
      );
    }
  };

  return (
    <div ref={rootRef} className="relative z-10">
      {/* Eyebrow Label */}
      <div data-hero="eyebrow" className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-6">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
        </span>
        <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-white/80 font-medium">
          NATLE TECHNOLOGY • SOFTWARE STUDIO
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold text-white max-w-5xl tracking-tight leading-[0.98]">
        <span data-hero="line" className="block overflow-hidden">
          We engineer
        </span>
        <span data-hero="line" className="block overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-teal-400">
          what&apos;s next.
        </span>
      </h1>

      {/* Supporting Copy */}
      <p data-hero="sub" className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
        NATLE partners with ambitious founders and global enterprise teams to architect,
        build, and deploy high-throughput software systems, distributed cloud platforms, and production AI.
      </p>

      {/* Dual CTAs */}
      <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
        <div data-hero="cta">
          <Magnetic>
            <Link
              href="/projects"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-white text-black px-8 py-4 text-[15px] font-bold shadow-[0_0_35px_-5px_rgba(255,255,255,0.3)] hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
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
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] text-white px-7 py-3.5 text-[15px] font-medium hover:border-cyan-400/40 hover:bg-white/[0.08] backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              data-cursor="ask"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Ask NATLE AI</span>
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Social Proof & Performance Telemetry Metrics */}
      <div className="mt-14 sm:mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center gap-x-12 gap-y-6">
        <div data-hero="stat" className="flex flex-col">
          <div className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            99.99<span className="text-cyan-400">%</span>
          </div>
          <div className="text-xs font-mono uppercase tracking-wider text-white/45 mt-1">
            Production SLA Uptime
          </div>
        </div>

        <div data-hero="stat" className="flex flex-col">
          <div className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            120<span className="text-teal-400">+</span>
          </div>
          <div className="text-xs font-mono uppercase tracking-wider text-white/45 mt-1">
            Enterprise Platforms Shipped
          </div>
        </div>

        <div data-hero="stat" className="flex flex-col">
          <div className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            &lt; 14<span className="text-emerald-400">ms</span>
          </div>
          <div className="text-xs font-mono uppercase tracking-wider text-white/45 mt-1">
            Global P99 Edge Latency
          </div>
        </div>

        <div data-hero="stat" className="flex flex-col">
          <div className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Zero
          </div>
          <div className="text-xs font-mono uppercase tracking-wider text-white/45 mt-1">
            Technical Debt Handover
          </div>
        </div>
      </div>
    </div>
  );
}
