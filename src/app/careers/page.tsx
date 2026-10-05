import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SpotlightCard, { SpotlightAccent } from "@/components/SpotlightCard";
import AmbientBackground from "@/components/AmbientBackground";
import CareersCTA from "@/components/CareersCTA";
import { OPEN_ROLES, BENEFITS } from "@/lib/data";
import {
  Clock,
  Sparkles,
  HeartPulse,
  Laptop,
  Users,
  Target,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Careers — NADSCA",
  description:
    "Build technology that matters. Explore open roles and culture at NADSCA.",
};

const BENEFIT_ICONS = [
  Clock,
  Sparkles,
  HeartPulse,
  Laptop,
  Users,
  Target,
];

const BENEFIT_ACCENTS: SpotlightAccent[] = [
  "azure",
  "teal",
  "lime",
  "purple",
  "azure",
  "teal",
];

export default function CareersPage() {
  return (
    <>
      {/* Hero Header Section */}
      <section className="pt-40 pb-20 bg-mist dark:bg-[#07090E] relative overflow-hidden">
        <AmbientBackground />
        <div className="container-content relative">
          <Reveal className="max-w-3xl">
            <div className="text-azure dark:text-cyan-400 text-xs font-mono font-semibold tracking-widest uppercase mb-4">
              CAREERS
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-ink dark:text-white leading-[1.08] tracking-tight">
              Build technology that{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">
                matters.
              </span>
            </h1>

            <div className="mt-8 space-y-4 text-base sm:text-lg text-ink/75 dark:text-white/75 leading-relaxed max-w-2xl">
              <p>
                At{" "}
                <strong className="text-ink dark:text-white font-semibold">
                  NADSCA
                </strong>
                , we build software, AI systems, and digital products that businesses rely on every day.
              </p>

              <p>
                We&apos;re a team of engineers, designers, and problem-solvers who enjoy working on meaningful challenges, taking ownership, and building things we&apos;re genuinely proud of.
              </p>

              <div className="pt-3">
                <a
                  href="#open-roles"
                  className="inline-flex items-center gap-2 font-bold text-azure dark:text-cyan-400 hover:underline group text-base"
                >
                  <span>Explore opportunities at NADSCA</span>
                  <span className="transition-transform group-hover:translate-y-1 font-mono">↓</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Life at NADSCA - 6 Benefits Grid */}
      <section className="py-20 lg:py-28 bg-paper dark:bg-[#090C12] border-t border-ink/5 dark:border-white/10 relative">
        <div className="container-content">
          <Reveal className="max-w-2xl mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 text-azure dark:text-cyan-400 text-xs font-mono font-bold tracking-[0.2em] uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              LIFE AT NADSCA
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink dark:text-white tracking-tight leading-snug">
              Designed for autonomy, craft, and balanced lives.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {BENEFITS.map((b, i) => {
              const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
              return (
                <Reveal key={b.title} delay={(i % 3) * 0.06}>
                  <SpotlightCard
                    accent={BENEFIT_ACCENTS[i % BENEFIT_ACCENTS.length]}
                    className="h-full rounded-3xl"
                  >
                    <div className="p-8 flex flex-col h-full">
                      {/* Gradient Badge / Icon */}
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500/15 via-teal-500/15 to-emerald-500/15 border border-cyan-400/25 flex items-center justify-center text-azure dark:text-cyan-400 mb-6 shadow-sm group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>

                      <h3 className="font-display text-xl font-bold text-ink dark:text-white tracking-tight mb-3">
                        {b.title}
                      </h3>

                      <p className="text-ink/70 dark:text-white/70 text-[15px] leading-relaxed mt-auto">
                        {b.detail}
                      </p>
                    </div>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Roles Section */}
      <section
        id="open-roles"
        className="py-20 lg:py-28 bg-mist dark:bg-[#07090E] relative overflow-hidden border-t border-ink/5 dark:border-white/10 scroll-mt-20"
      >
        <AmbientBackground variant="reversed" />
        <div className="container-content relative">
          <Reveal className="max-w-xl mb-12">
            <div className="inline-flex items-center gap-2 text-azure dark:text-cyan-400 text-xs font-mono font-bold tracking-[0.2em] uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              OPEN ROLES
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink dark:text-white tracking-tight leading-snug">
              Current openings
            </h2>
            <p className="mt-3 text-ink/70 dark:text-white/70 text-base">
              Find your next role building mission-critical enterprise systems.
            </p>
          </Reveal>

          <div className="rounded-3xl border border-ink/8 dark:border-white/10 overflow-hidden bg-white dark:bg-[#0D1118] shadow-sm">
            {OPEN_ROLES.map((role, i) => (
              <Reveal key={role.title} delay={i * 0.04}>
                <Link
                  href={`/contact?role=${encodeURIComponent(role.title)}`}
                  className="group flex flex-wrap items-center justify-between gap-4 px-7 py-6 border-b border-ink/8 dark:border-white/10 last:border-0 hover:bg-mist dark:hover:bg-white/[0.03] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="hidden sm:block w-1.5 h-10 rounded-full bg-brand-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-ink dark:text-white group-hover:text-azure dark:group-hover:text-cyan-400 transition-colors">
                        {role.title}
                      </h3>
                      <p className="text-ink/50 dark:text-white/50 text-sm mt-1 font-mono">
                        {role.team} &middot; {role.location}
                      </p>
                    </div>
                  </div>
                  <span className="text-ink dark:text-white font-semibold text-sm border-b-2 border-lime pb-1 shrink-0 flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    Apply now <span aria-hidden>→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 text-center">
            <p className="text-ink/60 dark:text-white/60 text-sm sm:text-base">
              Don&apos;t see a fit?{" "}
              <Link
                href="/contact?type=general-cv"
                className="text-ink dark:text-white font-semibold border-b-2 border-lime pb-0.5 hover:text-azure dark:hover:text-cyan-400 transition-colors"
              >
                Send us your CV anyway
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* Unified Bottom CTA */}
      <CareersCTA />
    </>
  );
}
