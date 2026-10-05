import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SpotlightCard, { SpotlightAccent } from "@/components/SpotlightCard";
import AmbientBackground from "@/components/AmbientBackground";
import ServicesCTA from "@/components/ServicesCTA";
import { SERVICES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services — NADSCA",
  description:
    "Product engineering, data & AI, product design, cloud & infrastructure, enterprise systems, and technology consulting services from NADSCA.",
};

const ACCENTS: SpotlightAccent[] = [
  "azure",
  "teal",
  "purple",
  "blue",
  "azure",
  "teal",
  "purple",
  "blue",
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Header Section */}
      <section className="pt-40 pb-20 bg-mist dark:bg-[#07090E] relative overflow-hidden">
        <AmbientBackground />
        <div className="container-content relative">
          <Reveal className="max-w-3xl">
            <div className="text-azure dark:text-cyan-400 text-xs font-mono font-semibold tracking-widest uppercase mb-4">
              SERVICES
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-ink dark:text-white leading-[1.08] tracking-tight">
              Technology built around{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">
                your business.
              </span>
            </h1>
            <div className="mt-6 space-y-4 text-base sm:text-lg text-ink/70 dark:text-white/70 leading-relaxed max-w-2xl">
              <p>
                Whether you&apos;re launching a new product, scaling an existing
                platform, modernizing legacy technology, or looking to unlock
                new opportunities with AI we bring the engineering expertise,
                product thinking, and technical leadership to move you forward.
              </p>
              <p>
                We integrate where you need us most from strategy and
                architecture to design, development, cloud, and long-term product
                evolution.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8-Card Services Grid */}
      <section className="py-20 lg:py-24 bg-paper dark:bg-[#07090E] relative overflow-hidden border-t border-ink/5 dark:border-white/10">
        <div className="container-content grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.06}>
              <SpotlightCard
                accent={ACCENTS[i % ACCENTS.length]}
                id={s.slug}
                className="h-full"
              >
                <div className="p-8 md:p-9 flex flex-col h-full">

                  <h2 className="font-display text-2xl font-bold tracking-tight text-ink dark:text-white mb-2 uppercase">
                    {s.name}
                  </h2>

                  {s.subtitle && (
                    <p className="text-[15px] font-semibold text-azure dark:text-cyan-400 mb-4 leading-snug">
                      {s.subtitle}
                    </p>
                  )}

                  <p className="text-ink/65 dark:text-white/70 leading-relaxed text-[15px] mb-6">
                    {s.detail}
                  </p>

                  <ul className="space-y-3 mt-auto pt-6 border-t border-ink/5 dark:border-white/10">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-3 text-ink/75 dark:text-white/80 text-[14px]"
                      >
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Bottom Conversion Banner */}
      <ServicesCTA />
    </>
  );
}
