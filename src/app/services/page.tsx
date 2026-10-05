import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SpotlightCard, { SpotlightAccent } from "@/components/SpotlightCard";
import AmbientBackground from "@/components/AmbientBackground";
import ServicesCTA from "@/components/ServicesCTA";
import { SERVICES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services — NADSCA",
  description:
    "Product engineering, data & AI, product design, enterprise systems, and technology consulting services from NADSCA.",
};

const ACCENTS: SpotlightAccent[] = ["azure", "teal", "purple", "blue", "azure"];

function renderBottomNote(note: string) {
  if (note.startsWith("Technology:")) {
    return (
      <p className="text-xs sm:text-[13px] font-mono text-ink/70 dark:text-white/70">
        <span className="font-bold text-ink dark:text-white font-sans">Technology:</span>{" "}
        {note.replace("Technology:", "").trim()}
      </p>
    );
  }
  if (note.startsWith("The focus:")) {
    return (
      <p className="text-xs sm:text-[13.5px] text-ink/75 dark:text-white/75">
        <span className="font-bold text-ink dark:text-white">The focus:</span>{" "}
        {note.replace("The focus:", "").trim()}
      </p>
    );
  }
  if (note.startsWith("One team. One process.")) {
    return (
      <p className="text-xs sm:text-[13.5px] text-ink/75 dark:text-white/75">
        <span className="font-bold text-ink dark:text-white">One team. One process.</span>{" "}
        {note.replace("One team. One process.", "").trim()}
      </p>
    );
  }
  if (note.startsWith("Built around how your people actually work")) {
    return (
      <p className="text-xs sm:text-[13.5px] text-ink/75 dark:text-white/75">
        <span className="font-bold text-ink dark:text-white">
          Built around how your people actually work
        </span>{" "}
        {note.replace("Built around how your people actually work", "").trim()}
      </p>
    );
  }
  if (note.startsWith("Bring us the difficult technical decision.")) {
    return (
      <p className="text-xs sm:text-[13.5px] text-ink/75 dark:text-white/75">
        <span className="font-bold text-ink dark:text-white">
          Bring us the difficult technical decision.
        </span>{" "}
        {note.replace("Bring us the difficult technical decision.", "").trim()}
      </p>
    );
  }
  return <p className="text-xs sm:text-[13.5px] text-ink/75 dark:text-white/75">{note}</p>;
}

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

      {/* 5 Core Engineering Services Grid */}
      <section className="py-20 lg:py-24 bg-paper dark:bg-[#07090E] relative overflow-hidden border-t border-ink/5 dark:border-white/10">
        <div className="container-content grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {SERVICES.map((s, i) => {
            const isLast = i === SERVICES.length - 1; // 5th card spans 2 columns on lg for symmetrical balance
            return (
              <Reveal
                key={s.slug}
                delay={(i % 2) * 0.06}
                className={isLast ? "lg:col-span-2" : ""}
              >
                <SpotlightCard
                  accent={ACCENTS[i % ACCENTS.length]}
                  id={s.slug}
                  className="h-full"
                >
                  <div
                    className={`p-8 sm:p-10 flex flex-col h-full ${
                      isLast ? "lg:grid lg:grid-cols-2 lg:gap-12" : ""
                    }`}
                  >
                    {/* Left Column (or Top on standard cards) */}
                    <div className="flex flex-col">
                      <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink dark:text-white mb-2 uppercase">
                        {s.name}
                      </h2>

                      {s.subtitle && (
                        <p className="text-[15px] sm:text-base font-semibold text-azure dark:text-cyan-400 mb-5 leading-snug">
                          {s.subtitle}
                        </p>
                      )}

                      <div className="space-y-3.5 text-ink/70 dark:text-white/75 leading-relaxed text-[15px] mb-6">
                        {s.narrative.map((para, pIdx) => (
                          <p key={pIdx}>{para}</p>
                        ))}
                      </div>

                      {/* On wide 5th card, bottom note sits on left column */}
                      {isLast && s.bottomNote && (
                        <div className="hidden lg:block mt-auto pt-6 border-t border-ink/8 dark:border-white/10">
                          {renderBottomNote(s.bottomNote)}
                        </div>
                      )}
                    </div>

                    {/* Right Column / Deliverables Section */}
                    <div className="flex flex-col mt-6 lg:mt-0">
                      <div
                        className={`pt-6 border-t border-ink/8 dark:border-white/10 ${
                          isLast ? "lg:pt-0 lg:border-t-0" : ""
                        }`}
                      >
                        <h3 className="font-bold text-ink dark:text-white text-base mb-4 tracking-tight">
                          {s.deliverablesTitle}
                        </h3>

                        <ul
                          className={`space-y-2.5 mb-6 ${
                            isLast ? "sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-2.5 sm:space-y-0" : ""
                          }`}
                        >
                          {s.deliverables.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-ink/80 dark:text-white/85 text-[14px]"
                            >
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Standard card bottom note (or mobile view of 5th card) */}
                      {s.bottomNote && (
                        <div
                          className={`mt-auto pt-6 border-t border-ink/8 dark:border-white/10 ${
                            isLast ? "lg:hidden" : ""
                          }`}
                        >
                          {renderBottomNote(s.bottomNote)}
                        </div>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Bottom Conversion Banner */}
      <ServicesCTA />
    </>
  );
}
