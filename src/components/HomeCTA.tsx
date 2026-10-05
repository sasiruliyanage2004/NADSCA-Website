"use client";

import React from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HomeCTA() {
  const triggerAI = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-awora-ai", {
          detail: { prompt: "I'd like to discuss building a project with NADSCA." },
        })
      );
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal className="rounded-3xl bg-gradient-to-b from-white/[0.05] via-white/[0.02] to-transparent border border-white/10 p-10 sm:p-16 lg:p-20 text-center relative overflow-hidden backdrop-blur-xl shadow-2xl">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-azure/20 via-teal/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10">
            <div className="text-cyan-400 text-xs font-mono font-semibold tracking-widest uppercase mb-4">
              LET&apos;S BUILD SOMETHING THAT MATTERS
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-white max-w-3xl mx-auto leading-tight">
              WHAT&apos;S THE CHALLENGE?
            </h2>

            <p className="text-white/75 mt-5 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Tell us what is slowing your business down, what you want to improve, or what you want to build. We&apos;ll help turn the challenge into a practical software solution.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-white text-black px-8 py-4 text-[15px] font-bold shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <span>Start a Conversation</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Magnetic>

              <Magnetic>
                <button
                  onClick={triggerAI}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] text-white px-7 py-3.5 text-[15px] font-medium hover:border-cyan-400/40 hover:bg-white/[0.08] backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                  data-cursor="ask"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Ask Awora AI</span>
                </button>
              </Magnetic>
            </div>

            <div className="mt-10 pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-white/50 italic font-body">
              <span>Custom software</span>
              <span className="w-1 h-1 rounded-full bg-cyan-400/60 not-italic shrink-0" />
              <span>AI solutions</span>
              <span className="w-1 h-1 rounded-full bg-cyan-400/60 not-italic shrink-0" />
              <span>Automation</span>
              <span className="w-1 h-1 rounded-full bg-cyan-400/60 not-italic shrink-0" />
              <span>Enterprise systems</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
