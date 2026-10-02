import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import SpotlightCard, { SpotlightAccent } from "@/components/SpotlightCard";
import AmbientBackground from "@/components/AmbientBackground";
import { TEAM, VALUES } from "@/lib/data";

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
          <div className="max-w-4xl">
            <Reveal>
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] dark:bg-white/[0.06] border border-cyan-400/25 backdrop-blur-md mb-8 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                </span>
                <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-cyan-500 dark:text-cyan-300 font-semibold">
                  ABOUT NADSCA
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ink dark:text-white leading-[1.08] tracking-tight font-extrabold">
                We engineer software for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">
                  what&apos;s next.
                </span>
              </h1>

              {/* Lead Statement */}
              <p className="mt-8 text-xl sm:text-2xl text-ink/90 dark:text-white/90 font-normal leading-relaxed">
                Founded in <span className="text-cyan-500 dark:text-cyan-400 font-semibold">2026</span>, NADSCA is a software engineering company focused on building intelligent, scalable, and practical software solutions for modern businesses.
              </p>

              {/* Subtle accent divider */}
              <div className="my-8 h-px w-20 bg-gradient-to-r from-cyan-400/60 to-transparent" />

              {/* Narrative Paragraphs */}
              <div className="space-y-5 text-base sm:text-lg text-ink/70 dark:text-white/70 leading-relaxed max-w-3xl">
                <p>
                  From custom business applications and enterprise systems to AI-driven solutions and automation, we turn complex business challenges into technology that works.
                </p>
                <p>
                  We believe great software should not only be well-built, it should create measurable value for the people and businesses that use it.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Track Record Section (Seamless World-Class Editorial Flow) */}
          <Reveal delay={0.15} className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-ink/10 dark:border-white/10 max-w-3xl">
            {/* Header */}
            <div className="mb-10 sm:mb-12">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase font-bold text-cyan-500 dark:text-cyan-400 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                OUR TRACK RECORD
              </div>
              <h2 className="text-2xl sm:text-3xl text-ink dark:text-white font-bold tracking-tight">
                Built with purpose.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">
                  Designed for real-world use.
                </span>
              </h2>
            </div>

            {/* Vertical list of metrics (pahalata) */}
            <div className="space-y-8 sm:space-y-9">
              <div>
                <div className="font-display text-5xl sm:text-6xl text-ink dark:text-white font-extrabold tracking-tight">
                  <Counter to={2} />
                </div>
                <div className="text-sm sm:text-base text-ink/70 dark:text-white/70 mt-1.5 font-medium">
                  Software solutions built
                </div>
              </div>

              <div className="h-px w-28 bg-gradient-to-r from-cyan-400/60 via-sky-400/30 to-transparent" />

              <div>
                <div className="font-display text-5xl sm:text-6xl text-ink dark:text-white font-extrabold tracking-tight">
                  <Counter to={2} suffix="+" />
                </div>
                <div className="text-sm sm:text-base text-ink/70 dark:text-white/70 mt-1.5 font-medium">
                  Organizations served
                </div>
              </div>

              <div className="h-px w-28 bg-gradient-to-r from-cyan-400/60 via-sky-400/30 to-transparent" />

              <div>
                <div className="font-display text-3xl sm:text-4xl text-ink dark:text-white font-extrabold tracking-tight">
                  AI-DRIVEN
                </div>
                <div className="text-sm sm:text-base text-ink/70 dark:text-white/70 mt-1.5 font-medium">
                  Engineering approach
                </div>
              </div>
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
