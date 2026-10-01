import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import SpotlightCard, { SpotlightAccent } from "@/components/SpotlightCard";
import AmbientBackground from "@/components/AmbientBackground";
import Card3DTilt from "@/components/Card3DTilt";
import { TEAM, VALUES } from "@/lib/data";
import { Layers, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "About — NADSCA",
  description: "We engineer software for what's next. Founded in 2026, NADSCA builds intelligent, scalable, and practical software solutions.",
};

const VALUE_ACCENTS: SpotlightAccent[] = ["azure", "teal", "lime", "purple"];

export default function AboutPage() {
  return (
    <>
      <section className="pt-36 sm:pt-40 pb-20 lg:pb-24 bg-mist dark:bg-[#07090E] relative overflow-hidden">
        <AmbientBackground />
        
        <div className="container-content relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Column: Core Narrative (7 cols) */}
            <div className="lg:col-span-7">
              <Reveal>
                {/* Eyebrow Badge */}
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] dark:bg-white/[0.06] border border-cyan-400/25 backdrop-blur-md mb-6 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                  </span>
                  <span className="text-[10.5px] sm:text-xs font-mono tracking-[0.22em] uppercase text-cyan-500 dark:text-cyan-300 font-semibold">
                    ABOUT NADSCA // SOFTWARE STUDIO
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink dark:text-white leading-[1.08] tracking-tight font-extrabold">
                  We engineer software for{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400">
                    what&apos;s next.
                  </span>
                </h1>

                {/* Lead Statement */}
                <p className="mt-7 text-lg sm:text-xl text-ink/85 dark:text-white/85 font-medium leading-relaxed">
                  Founded in <span className="text-cyan-500 dark:text-cyan-300 font-bold">2026</span>, NADSCA is a software engineering company focused on building intelligent, scalable, and practical software solutions for modern businesses.
                </p>
              </Reveal>

              {/* 2 Feature Cards for the Pillars */}
              <div className="mt-8 space-y-4">
                <Reveal delay={0.08}>
                  <div className="group rounded-2xl p-5 sm:p-6 bg-white/70 dark:bg-white/[0.04] border border-ink/8 dark:border-white/10 hover:border-cyan-400/40 hover:bg-white/90 dark:hover:bg-white/[0.07] backdrop-blur-sm transition-all duration-300 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono tracking-wider uppercase text-cyan-500 dark:text-cyan-400 font-semibold block mb-1">
                          Engineered for Scale
                        </span>
                        <p className="text-sm sm:text-base text-ink/70 dark:text-white/70 leading-relaxed">
                          From custom business applications and enterprise systems to AI-driven solutions and automation, we turn complex business challenges into technology that works.
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.14}>
                  <div className="group rounded-2xl p-5 sm:p-6 bg-white/70 dark:bg-white/[0.04] border border-ink/8 dark:border-white/10 hover:border-emerald-400/40 hover:bg-white/90 dark:hover:bg-white/[0.07] backdrop-blur-sm transition-all duration-300 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono tracking-wider uppercase text-emerald-500 dark:text-emerald-400 font-semibold block mb-1">
                          Value Standard
                        </span>
                        <p className="text-sm sm:text-base text-ink/70 dark:text-white/70 leading-relaxed">
                          We believe great software should not only be well-built, it should create measurable value for the people and businesses that use it.
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Right Column: Studio Architecture Spec Card (5 cols) */}
            <div className="lg:col-span-5">
              <Reveal delay={0.16}>
                <Card3DTilt maxTilt={7} scale={1.02} className="w-full">
                  <div className="relative rounded-3xl p-7 sm:p-8 bg-gradient-to-b from-white/90 via-white/80 to-white/70 dark:from-white/[0.07] dark:via-white/[0.04] dark:to-white/[0.02] border border-ink/10 dark:border-white/15 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden">
                    
                    {/* Glowing corner gradients */}
                    <div className="pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full bg-cyan-400/20 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-emerald-400/15 blur-3xl" />

                    {/* Header: 3D Emblem & Studio Badge */}
                    <div className="flex items-center justify-between pb-6 border-b border-ink/8 dark:border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="relative w-11 h-9">
                          <Image
                            src="/logo-mark.png"
                            alt="NADSCA"
                            fill
                            className="object-contain filter drop-shadow-[0_2px_10px_rgba(0,180,255,0.45)]"
                          />
                        </div>
                        <div>
                          <div className="relative w-28 h-5">
                            <Image
                              src="/logo-wordmark-illuminated.png"
                              alt="NADSCA"
                              fill
                              className="object-contain"
                            />
                          </div>
                          <span className="text-[9px] font-mono tracking-widest uppercase text-ink/40 dark:text-white/40">
                            TECHNOLOGY STUDIO
                          </span>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        ACTIVE
                      </span>
                    </div>

                    {/* Spec Sheet Matrix */}
                    <div className="mt-6 space-y-4 text-xs font-mono">
                      <div className="flex items-center justify-between py-2 border-b border-ink/5 dark:border-white/5">
                        <span className="text-ink/50 dark:text-white/40">FOUNDATION</span>
                        <span className="font-semibold text-ink dark:text-white">2026 • Global Delivery</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-ink/5 dark:border-white/5">
                        <span className="text-ink/50 dark:text-white/40">HEADQUARTERS</span>
                        <span className="font-semibold text-ink dark:text-white">Colombo 05, Sri Lanka</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-ink/5 dark:border-white/5">
                        <span className="text-ink/50 dark:text-white/40">CORE STACK</span>
                        <span className="font-semibold text-cyan-400">Next.js • Go • Python • Three.js</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-ink/5 dark:border-white/5">
                        <span className="text-ink/50 dark:text-white/40">DELIVERY SPEED</span>
                        <span className="font-semibold text-emerald-400">~6 Weeks to Production MVP</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-ink/50 dark:text-white/40">IP &amp; SOURCE CODE</span>
                        <span className="font-semibold text-ink dark:text-white">100% Client Owned</span>
                      </div>
                    </div>

                    {/* Card Footer Quote */}
                    <div className="mt-6 pt-5 border-t border-ink/8 dark:border-white/10 rounded-2xl bg-white/40 dark:bg-white/[0.03] p-3.5 text-center">
                      <p className="text-[11px] font-sans italic text-ink/70 dark:text-white/70">
                        &ldquo;Turning complex business challenges into technology that works.&rdquo;
                      </p>
                    </div>

                  </div>
                </Card3DTilt>
              </Reveal>
            </div>

          </div>

          {/* Metrics Row Underneath (Full Width Anchor) */}
          <Reveal delay={0.2} className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 border-t border-ink/10 dark:border-white/10 pt-10">
            <div>
              <div className="font-display text-3xl sm:text-4xl text-ink dark:text-white font-bold">
                <Counter to={120} suffix="+" />
              </div>
              <div className="text-xs sm:text-sm text-ink/50 dark:text-white/50 mt-1">Systems architected</div>
            </div>
            <div>
              <div className="font-display text-3xl sm:text-4xl text-ink dark:text-white font-bold">
                <Counter to={100} suffix="%" />
              </div>
              <div className="text-xs sm:text-sm text-ink/50 dark:text-white/50 mt-1">IP &amp; code ownership</div>
            </div>
            <div>
              <div className="font-display text-3xl sm:text-4xl text-ink dark:text-white font-bold">
                <Counter to={6} suffix=" wks" />
              </div>
              <div className="text-xs sm:text-sm text-ink/50 dark:text-white/50 mt-1">Avg. MVP turnaround</div>
            </div>
            <div>
              <div className="font-display text-3xl sm:text-4xl text-ink dark:text-white font-bold">
                <Counter to={99.9} decimals={1} suffix="%" />
              </div>
              <div className="text-xs sm:text-sm text-ink/50 dark:text-white/50 mt-1">Production SLA</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 lg:py-28 bg-paper dark:bg-[#090C12] border-t border-ink/5 dark:border-white/10">
        <div className="container-content grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Reveal>
            <SpotlightCard accent="azure" className="h-full">
              <div className="p-9">
                <div className="text-azure text-xs font-mono font-semibold tracking-widest uppercase mb-4">
                  MISSION
                </div>
                <h2 className="font-display text-2xl text-ink dark:text-white mb-4">Our mission</h2>
                <p className="text-ink/60 dark:text-white/60 leading-relaxed">
                  To give growing companies access to the same quality of
                  software engineering and design that only large enterprises
                  could previously afford — without the enterprise overhead.
                </p>
              </div>
            </SpotlightCard>
          </Reveal>
          <Reveal delay={0.08}>
            <SpotlightCard accent="lime" className="h-full">
              <div className="p-9">
                <div className="text-lime-600 dark:text-lime-400 text-xs font-mono font-semibold tracking-widest uppercase mb-4">
                  VISION
                </div>
                <h2 className="font-display text-2xl text-ink dark:text-white mb-4">Our vision</h2>
                <p className="text-ink/60 dark:text-white/60 leading-relaxed">
                  A future where every ambitious team, regardless of size or
                  location, can turn a good idea into reliable, well-designed
                  software.
                </p>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </section>

      <section className="py-24 lg:py-28 bg-ink-gradient text-white">
        <div className="container-content grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
          <Reveal>
            <p className="text-lime font-semibold text-sm mb-4">Our story</p>
            <h2 className="font-display text-4xl leading-tight mb-6">
              From one client to a full studio.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-white/70 leading-relaxed">
            <p>
              NADSCA began as a two-person team building a booking system for a
              local retailer. That first project taught us something we still
              hold onto: the best software is built close to the people who
              use it, not designed in the abstract.
            </p>
            <p>
              From that first engagement, we grew one referral at a time —
              into retail, healthcare, agriculture, and financial services.
              Each new industry brought constraints we hadn&apos;t seen
              before, and made the next product better.
            </p>
            <p>
              Today, NADSCA is a full studio of engineers, designers, and
              delivery leads working with founders and enterprise teams alike
              — still holding to the same principle we started with.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 lg:py-28 bg-paper dark:bg-[#090C12]">
        <div className="container-content">
          <Reveal className="max-w-xl mb-14">
            <p className="text-azure font-semibold text-sm mb-3">Leadership</p>
            <h2 className="font-display text-4xl text-ink dark:text-white leading-tight">
              The people steering NADSCA.
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM.map((person, i) => (
              <Reveal key={person.name} delay={i * 0.06}>
                <div className="group rounded-3xl border border-ink/8 dark:border-white/10 bg-white dark:bg-[#0D1118] p-5 hover:shadow-card hover:border-ink/15 dark:hover:border-white/20 transition-all">
                  <div className="aspect-square rounded-2xl bg-brand-gradient-soft mb-4 flex items-center justify-center overflow-hidden relative">
                    <span className="font-display text-3xl text-ink/30 dark:text-white/40 group-hover:scale-110 transition-transform duration-300">
                      {person.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <h3 className="font-display text-base text-ink dark:text-white">{person.name}</h3>
                  <p className="text-ink/50 dark:text-white/50 text-sm">{person.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-28 bg-mist dark:bg-[#07090E] relative overflow-hidden">
        <AmbientBackground variant="reversed" />
        <div className="container-content relative">
          <Reveal className="max-w-xl mb-14">
            <p className="text-azure font-semibold text-sm mb-3">What we stand for</p>
            <h2 className="font-display text-4xl text-ink dark:text-white leading-tight">
              Operating principles, not slogans.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <SpotlightCard accent={VALUE_ACCENTS[i % VALUE_ACCENTS.length]} className="h-full">
                  <div className="p-8 flex gap-5">
                    <div className="w-1.5 shrink-0 rounded-full bg-brand-gradient" />
                    <div>
                      <h3 className="font-display text-lg text-ink dark:text-white mb-1.5">{v.title}</h3>
                      <p className="text-ink/60 dark:text-white/60 text-[15px] leading-relaxed">{v.detail}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
