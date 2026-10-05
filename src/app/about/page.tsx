import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import SpotlightCard, { SpotlightAccent } from "@/components/SpotlightCard";
import AmbientBackground from "@/components/AmbientBackground";
import { TEAM, PARTNERS, VALUES } from "@/lib/data";

export const metadata: Metadata = {
  title: "About — NADSCA",
  description: "We engineer software for what's next. Founded in 2026, NADSCA builds intelligent, scalable, and practical software solutions.",
};

const VALUE_ACCENTS: SpotlightAccent[] = ["azure", "teal", "lime", "purple", "blue", "azure"];

export default function AboutPage() {
  return (
    <>
      <section className="pt-36 sm:pt-40 pb-20 lg:pb-24 bg-mist dark:bg-[#07090E] relative overflow-hidden">
        <AmbientBackground />
        
        <div className="container-content relative">
          <div className="max-w-4xl">
            <Reveal>
              {/* Eyebrow Label */}
              <div className="text-azure dark:text-cyan-400 text-xs font-mono font-semibold tracking-widest uppercase mb-4">
                ABOUT NADSCA
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
        <div className="container-content grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <Reveal>
            <SpotlightCard accent="azure" className="h-full">
              <div className="p-8 sm:p-10 flex flex-col h-full">
                <div className="text-cyan-500 dark:text-cyan-400 text-xs font-mono font-bold tracking-[0.25em] uppercase mb-3">
                  MISSION
                </div>
                <h2 className="font-display text-2xl sm:text-3xl text-ink dark:text-white mb-6 font-bold tracking-tight">
                  Our mission
                </h2>
                <div className="space-y-4 text-ink/70 dark:text-white/70 leading-relaxed text-base">
                  <p>
                    To engineer intelligent and reliable software solutions that help businesses operate smarter, automate better, and grow with confidence.
                  </p>
                  <p>
                    We combine strong software engineering with modern technologies and artificial intelligence to turn real business challenges into practical digital solutions.
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
          <Reveal delay={0.08}>
            <SpotlightCard accent="teal" className="h-full">
              <div className="p-8 sm:p-10 flex flex-col h-full">
                <div className="text-emerald-500 dark:text-emerald-400 text-xs font-mono font-bold tracking-[0.25em] uppercase mb-3">
                  VISION
                </div>
                <h2 className="font-display text-2xl sm:text-3xl text-ink dark:text-white mb-6 font-bold tracking-tight">
                  Our vision
                </h2>
                <div className="space-y-4 text-ink/70 dark:text-white/70 leading-relaxed text-base">
                  <p>
                    To become a trusted technology partner for businesses seeking to transform ideas, processes, and challenges into intelligent software solutions.
                  </p>
                  <p>
                    We envision a future where businesses of every size can access thoughtfully engineered technology that is scalable, adaptable, and built for what comes next.
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </section>

      <section className="py-24 lg:py-28 bg-ink-gradient text-white relative overflow-hidden">
        <div className="container-content grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-12 lg:gap-16 items-start">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase font-bold text-cyan-400 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              OUR STORY
            </div>
            <h2 className="font-display text-4xl sm:text-5xl leading-tight font-extrabold mb-4">
              Built from real{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">
                business challenges.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-white/75 leading-relaxed text-base sm:text-lg">
            <p>
              NADSCA was founded in <strong className="text-white font-semibold">2026</strong> with a clear belief: businesses deserve software that is not only functional, but thoughtfully engineered, intelligent, and built around the way they actually work.
            </p>
            <p>
              Our journey began by building solutions for real operational needs including <strong className="text-cyan-300 font-semibold">OHRMS</strong>, our human resource management solution, and a <strong className="text-cyan-300 font-semibold">Security Patrolling Solution</strong> designed to bring greater visibility, control, and efficiency to security operations.
            </p>
            <p>
              These solutions shaped the way we approach software: <strong className="text-white font-semibold">start with the problem, understand the people, and engineer the technology around the business.</strong>
            </p>
            <p>
              Today, NADSCA focuses on building <strong className="text-white font-semibold">custom software, enterprise systems, AI-driven applications, and intelligent automation</strong> for organizations looking to improve how they operate and grow.
            </p>
            <p>
              We are building NADSCA with a long-term vision to become a trusted technology partner for businesses that want to turn ambitious ideas and complex challenges into reliable digital solutions.
            </p>
            <p className="text-white font-semibold text-lg sm:text-xl pt-4 border-t border-white/10">
              We may be at the beginning of our journey, but we are building for what comes next.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 lg:py-28 bg-paper dark:bg-[#090C12]">
        <div className="container-content">
          {/* Leadership Header */}
          <Reveal className="max-w-xl mb-14">
            <p className="text-cyan-500 dark:text-cyan-400 font-semibold text-xs font-mono tracking-widest uppercase mb-3">
              LEADERSHIP
            </p>
            <h2 className="font-display text-4xl text-ink dark:text-white leading-tight font-extrabold">
              The people steering NADSCA.
            </h2>
          </Reveal>

          {/* Row 1: Executive Directors (4 cols) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.slice(0, 4).map((person, i) => (
              <Reveal key={person.name} delay={i * 0.06}>
                <div className="group rounded-3xl border border-ink/8 dark:border-white/10 bg-white dark:bg-[#0D1118] p-6 hover:shadow-card hover:border-cyan-400/30 transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="aspect-square rounded-2xl bg-brand-gradient-soft mb-4 flex items-center justify-center overflow-hidden relative">
                      <span className="font-display text-3xl text-ink/30 dark:text-white/40 group-hover:scale-110 transition-transform duration-300 font-bold">
                        {person.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <h3 className="font-display text-base sm:text-lg text-ink dark:text-white font-bold">
                      {person.name}
                    </h3>
                  </div>
                  <p className="text-cyan-600 dark:text-cyan-400 text-xs sm:text-sm font-medium mt-2">
                    {person.role}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Row 2: Chief Solution Architect (Centered) */}
          {TEAM[4] && (
            <div className="mt-6 flex justify-center">
              <Reveal delay={0.24} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
                <div className="group rounded-3xl border border-ink/8 dark:border-white/10 bg-white dark:bg-[#0D1118] p-6 hover:shadow-card hover:border-cyan-400/30 transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="aspect-square rounded-2xl bg-brand-gradient-soft mb-4 flex items-center justify-center overflow-hidden relative">
                      <span className="font-display text-3xl text-ink/30 dark:text-white/40 group-hover:scale-110 transition-transform duration-300 font-bold">
                        {TEAM[4].name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <h3 className="font-display text-base sm:text-lg text-ink dark:text-white font-bold">
                      {TEAM[4].name}
                    </h3>
                  </div>
                  <p className="text-cyan-600 dark:text-cyan-400 text-xs sm:text-sm font-medium mt-2">
                    {TEAM[4].role}
                  </p>
                </div>
              </Reveal>
            </div>
          )}

          {/* Partners Section */}
          <div className="mt-20 pt-16 border-t border-ink/8 dark:border-white/10">
            <Reveal className="max-w-xl mb-12">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase font-bold text-cyan-500 dark:text-cyan-400 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                OUR PARTNERS
              </div>
              <h2 className="font-display text-3xl sm:text-4xl text-ink dark:text-white leading-tight font-extrabold">
                Strategic partners &amp; advisors.
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PARTNERS.map((person, i) => (
                <Reveal key={person.name} delay={i * 0.08}>
                  <div className="group rounded-3xl border border-ink/8 dark:border-white/10 bg-white dark:bg-[#0D1118] p-6 hover:shadow-card hover:border-cyan-400/30 transition-all duration-300 h-full flex flex-col justify-between">
                    <div>
                      <div className="aspect-square rounded-2xl bg-brand-gradient-soft mb-4 flex items-center justify-center overflow-hidden relative">
                        <span className="font-display text-3xl text-ink/30 dark:text-white/40 group-hover:scale-110 transition-transform duration-300 font-bold">
                          {person.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <h3 className="font-display text-base sm:text-lg text-ink dark:text-white font-bold">
                        {person.name}
                      </h3>
                    </div>
                    <p className="text-cyan-600 dark:text-cyan-400 text-xs sm:text-sm font-medium mt-2">
                      {person.role}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-28 bg-mist dark:bg-[#07090E] relative overflow-hidden">
        <AmbientBackground variant="reversed" />
        <div className="container-content relative">
          <Reveal className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase font-bold text-azure dark:text-cyan-400 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              WHAT WE STAND FOR
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink dark:text-white leading-[1.12] font-extrabold tracking-tight mb-4">
              Technology built around your business.
            </h2>
            <p className="text-ink/70 dark:text-white/70 text-base sm:text-lg leading-relaxed">
              Great software is more than code. It requires understanding the business, solving the right problems, communicating clearly, and building technology that can grow with you.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VALUES.map((v, i) => (
              <Reveal 
                key={v.title} 
                delay={i * 0.05}
                className={i === VALUES.length - 1 ? "md:col-span-2" : ""}
              >
                <SpotlightCard accent={VALUE_ACCENTS[i % VALUE_ACCENTS.length]} className="h-full">
                  <div className="p-7 sm:p-8 flex gap-5 h-full">
                    <div className="w-1.5 shrink-0 rounded-full bg-brand-gradient" />
                    <div className="flex flex-col">
                      <h3 className="font-display text-lg sm:text-xl text-ink dark:text-white mb-2 font-bold tracking-tight">
                        {v.title}
                      </h3>
                      <p className="text-ink/65 dark:text-white/65 text-[15px] leading-relaxed">
                        {v.detail}
                      </p>
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
