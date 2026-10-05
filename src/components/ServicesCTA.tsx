"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";

export default function ServicesCTA() {
  const triggerAI = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-awora-ai", {
          detail: {
            initialMessage: "Hi Awora, I'd like to learn more about NADSCA's services and how you can help our business.",
          },
        })
      );
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-ink-gradient text-white relative overflow-hidden border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.18),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="container-content text-center relative z-10">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-white/90 font-semibold">
              END-TO-END EXECUTION
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight max-w-4xl mx-auto leading-[1.12]">
            ONE PARTNER. FROM STRATEGY TO SCALE.
          </h2>

          <p className="text-white/75 mt-6 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            You don&apos;t need to assemble five different teams to build and evolve your technology.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 rounded-full bg-white text-slate-950 font-bold px-8 py-4 text-[15px] shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>Start a Conversation</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Magnetic>

            <Magnetic>
              <button
                type="button"
                onClick={triggerAI}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.05] text-white px-7 py-4 text-[15px] font-medium hover:border-cyan-400/40 hover:bg-white/[0.1] backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Ask Awora AI</span>
              </button>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
