"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";

export default function BlogCTA() {
  const triggerAI = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-avora-ai", {
          detail: {
            initialMessage:
              "Hi AVORA_AI, I've been reading NADSCA's engineering insights and would like to explore how these technologies can be applied to our business.",
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
          <div className="text-azure-light text-xs font-mono font-medium tracking-widest uppercase mb-4">
            THOUGHT LEADERSHIP TO EXECUTION
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight max-w-4xl mx-auto leading-[1.12]">
            READY TO TURN INSIGHTS INTO PRODUCTION SYSTEMS?
          </h2>

          <p className="text-[17px] sm:text-xl font-medium text-azure-light mt-4 max-w-2xl mx-auto">
            Practical technology built around your business goals.
          </p>

          <div className="mt-8 space-y-4 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed text-white/80">
            <p>
              Great ideas create real value only when engineered into reliable, production-ready systems.
            </p>

            <p className="text-white/70">
              Whether you are evaluating AI implementation, replacing legacy spreadsheets with unified platforms, or scaling enterprise architecture — our engineers are ready to build with you.
            </p>

            <p className="font-bold text-white text-lg sm:text-xl pt-2">
              Let&apos;s start a conversation about what comes next.
            </p>
          </div>

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
                className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.05] text-white px-7 py-4 text-[15px] font-medium hover:border-white/30 hover:bg-white/[0.08] backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 text-azure-light" />
                <span>Ask AVORA_AI</span>
              </button>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
