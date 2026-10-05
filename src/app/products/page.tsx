import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import SpotlightCard, { SpotlightAccent } from "@/components/SpotlightCard";
import AmbientBackground from "@/components/AmbientBackground";
import { PRODUCTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Products & Solutions — NADSCA",
  description:
    "Production-ready software platforms for enterprise HR, AI security patrolling, intelligent retail POS, and smart inventory distribution.",
};

const ACCENTS: SpotlightAccent[] = ["azure", "teal", "purple", "blue"];

export default function ProductsPage() {
  return (
    <>
      {/* Hero Header Section */}
      <section className="pt-40 pb-20 bg-mist dark:bg-[#07090E] relative overflow-hidden">
        <AmbientBackground variant="reversed" />
        <div className="container-content relative">
          <Reveal className="max-w-4xl">
            <div className="text-azure dark:text-cyan-400 text-xs font-mono font-semibold tracking-widest uppercase mb-4">
              PRODUCTS &amp; SOLUTIONS
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-ink dark:text-white leading-[1.08] tracking-tight">
              Start with proven technology.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">
                Make it yours.
              </span>
            </h1>

            <div className="mt-8 space-y-6 text-base sm:text-lg text-ink/75 dark:text-white/75 leading-relaxed max-w-3xl">
              <div>
                <p className="font-bold text-ink dark:text-white mb-2 text-lg sm:text-xl">
                  Why build everything from scratch?
                </p>
                <p>
                  Our production ready software gives you a proven foundation that can be
                  adapted to your workflows, extended with the capabilities you need, and
                  integrated into the systems you already use.
                </p>
              </div>

              <div className="pt-2">
                <p className="font-bold text-ink dark:text-white text-lg sm:text-xl">
                  Proven foundation. Tailored experience. Built to scale.
                </p>
                <p className="mt-2 text-ink/70 dark:text-white/70">
                  From ready to deploy solutions to deeply customized platforms, we help
                  you launch faster while keeping the flexibility your business demands.
                </p>
              </div>

              <div className="pt-3">
                <a
                  href="#solutions"
                  className="inline-flex items-center gap-2 font-bold text-azure dark:text-cyan-400 hover:underline group text-base"
                >
                  <span>Explore our solutions</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4 Flagship Enterprise Products */}
      <section
        id="solutions"
        className="py-20 lg:py-28 bg-paper dark:bg-[#07090E] border-t border-ink/5 dark:border-white/10 relative scroll-mt-20"
      >
        <div className="container-content grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.08}>
              <SpotlightCard
                accent={ACCENTS[i % ACCENTS.length]}
                id={p.slug}
                className="h-full"
              >
                <div className="p-8 sm:p-10 flex flex-col h-full">
                  {/* Header */}
                  <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink dark:text-white uppercase mb-2">
                    {p.displayTitle}
                  </h2>

                  <p className="text-[15px] sm:text-base font-semibold text-azure dark:text-cyan-400 mb-6 leading-snug">
                    {p.tagline}
                  </p>

                  {/* Narrative Body */}
                  <div className="space-y-3.5 text-ink/70 dark:text-white/75 leading-relaxed text-[15px] mb-8">
                    {p.narrative.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>

                  {/* Capabilities Section */}
                  <div className="pt-6 border-t border-ink/8 dark:border-white/10 mb-8">
                    <h3 className="text-[14px] sm:text-[15px] font-semibold text-azure dark:text-cyan-400 mb-4">
                      {p.capabilitiesTitle}
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {p.capabilities.map((c) => (
                        <li
                          key={c}
                          className="flex items-start gap-2.5 text-[14px] text-ink/80 dark:text-white/85"
                        >
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Intelligence & Value Callout Box */}
                  <div className="rounded-2xl p-6 bg-ink/[0.02] dark:bg-white/[0.03] border border-ink/6 dark:border-white/[0.08] mb-8">
                    <h4 className="text-[14px] font-semibold text-azure dark:text-cyan-400 mb-2">
                      {p.intelligenceTitle}
                    </h4>
                    <p className="text-[14px] text-ink/70 dark:text-white/75 leading-relaxed">
                      {p.intelligenceText}
                    </p>
                    <p className="font-bold text-ink dark:text-white mt-4 text-[14px] sm:text-[15px]">
                      {p.punchline}
                    </p>
                  </div>

                  {/* Bottom Action Link */}
                  <div className="mt-auto pt-4 border-t border-ink/5 dark:border-white/10 flex items-center justify-between">
                    <Link
                      href={`/contact?product=${p.slug}`}
                      className="group inline-flex items-center gap-2 font-bold text-sm sm:text-[15px] text-ink dark:text-white hover:text-azure dark:hover:text-cyan-400 transition-colors"
                    >
                      <span>{p.ctaText}</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                    <span className="font-mono text-xs text-ink/30 dark:text-white/30 uppercase tracking-wider">
                      {p.tag}
                    </span>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Bottom Conversion Section */}
      <section className="py-24 bg-mist dark:bg-[#07090E] border-t border-ink/5 dark:border-white/10">
        <div className="container-content">
          <Reveal className="rounded-3xl bg-brand-gradient-soft border border-ink/8 dark:border-white/10 px-8 py-16 lg:px-16 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ink dark:text-white max-w-xl mx-auto leading-tight">
              Need something none of these quite cover?
            </h2>
            <p className="text-ink/65 dark:text-white/70 mt-4 max-w-lg mx-auto text-base">
              We also engineer bespoke, full-stack software systems — from ground-up
              architecture to production deployment.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-full bg-ink text-white px-8 py-4 text-[15px] font-semibold hover:bg-ink-soft dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 transition-colors shadow-sm"
                >
                  See custom services
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-ink/15 dark:border-white/20 px-8 py-4 text-[15px] font-semibold text-ink dark:text-white hover:bg-ink/5 dark:hover:bg-white/5 transition-colors"
                >
                  Start a conversation
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
