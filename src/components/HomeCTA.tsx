"use client";

import React from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import { ArrowRight, Sparkles, Clock, ShieldCheck } from "lucide-react";

export default function HomeCTA() {
  const triggerAI = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-natle-ai", {
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/80 font-semibold">
                ENGAGEMENT OPEN FOR Q4
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-white max-w-3xl mx-auto leading-tight">
              Ready to build what&apos;s next?
            </h2>

            <p className="text-white/70 mt-5 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Tell us what you&apos;re trying to build. We&apos;ll tell you honestly whether we&apos;re the right fit, with verified architectures and zero technical debt.
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

            <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-white/40">
              <span className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                Direct response within 24 hours
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Strict NDA on day one
              </span>
              <span>•</span>
              <span>Senior staff architects only</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
