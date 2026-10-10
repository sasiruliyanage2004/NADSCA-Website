import type { Metadata } from "next";
import Link from "next/link";
import Hero3D from "@/components/Hero3D";
import HeroContent from "@/components/HeroContent";
import TechMarquee from "@/components/TechMarquee";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "NADSCA — We Engineer Software for What's Next",
  description:
    "Founded in 2026, NADSCA builds intelligent, scalable, and practical enterprise software platforms, AI automation, and cloud architecture for modern businesses.",
  alternates: {
    canonical: "https://nadsca.dev",
  },
};

import CutoutCard from "@/components/CutoutCard";
import SpotlightBento from "@/components/SpotlightBento";
import ArchitecturePipeline from "@/components/ArchitecturePipeline";
import ArchitectureSimulator from "@/components/ArchitectureSimulator";
import Testimonials from "@/components/Testimonials";
import ScrollBackground from "@/components/ScrollBackground";
import NetworkGlobe3D from "@/components/NetworkGlobe3D";
import { BLOG_POSTS } from "@/lib/data";
import GiantMarquee from "@/components/GiantMarquee";
import PartnersStrip from "@/components/PartnersStrip";
import Magnetic from "@/components/Magnetic";

const WHY_US = [
  {
    title: "Senior teams only",
    detail: "No trainee-led projects. Every engagement is staffed by senior engineers and designers.",
  },
  {
    title: "Fixed communication rhythm",
    detail: "Weekly demos and a shared board, so you always see real, working software — not slide decks.",
  },
  {
    title: "Built for handover",
    detail: "Clean code, documentation, and infrastructure your own team can pick up on day one.",
  },
  {
    title: "Fast, not rushed",
    detail: "We move quickly on the things that matter and slow down on the decisions that are hard to reverse.",
  },
];

export default function Home() {
  return (
    <>
      {/* Scroll-driven fluid ambient background layer */}
      <ScrollBackground />

      {/* Hero */}
      <section className="relative min-h-[100dvh] flex items-center pt-24 pb-16 lg:pt-28 lg:pb-24 overflow-hidden hero-aurora-bg">
        <Hero3D />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent" />
        <div className="container-content relative w-full">
          <HeroContent />
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="py-16 md:py-20 bg-transparent relative z-10">
        <div className="container-content mb-8 relative z-20">
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-xs font-mono tracking-widest uppercase text-azure font-semibold mb-2">
              Technology Stack
            </span>
            <p className="text-xs sm:text-sm font-medium text-ink/50 max-w-lg">
              Powering modern enterprise platforms with industry-leading frameworks &amp; cloud infrastructure
            </p>
          </div>
        </div>
        <div className="relative z-20">
          <TechMarquee />
        </div>
      </section>

        {/* Services - Spotlight Bento */}
        <section className="py-24 lg:py-28 bg-transparent relative z-10">
          <div className="container-content relative z-10">
            <Reveal className="max-w-2xl mb-14">
              <p className="text-azure font-semibold text-sm mb-3 tracking-wide">WHAT WE DO</p>
              <h2 className="font-display text-4xl md:text-5xl text-ink dark:text-white leading-tight">
                One team, from first sketch to production system.
              </h2>
            </Reveal>

            <SpotlightBento />
          </div>
        </section>

      {/* Scroll-Driven Architecture Pipeline */}
      <ArchitecturePipeline />

      {/* Interactive System Simulator */}
      <ArchitectureSimulator />

      {/* Global Distributed Infrastructure 3D Mesh */}
      <section className="py-24 lg:py-28 bg-transparent relative overflow-hidden">
        <div className="container-content relative z-10">
          <Reveal>
            <NetworkGlobe3D />
          </Reveal>
        </div>
      </section>

      {/* Why us + platform panel */}
      <section className="py-28 lg:py-32 bg-ink-gradient text-white relative overflow-hidden">
        <div className="container-content grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <Reveal>
              <p className="text-lime font-semibold text-sm mb-3">Why NADSCA</p>
              <h2 className="font-display text-4xl md:text-5xl leading-tight mb-10">
                We don&apos;t just deliver tickets. We become your engineering partner.
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-9">
              {WHY_US.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.06}>
                  <h3 className="font-display text-lg mb-2">{item.title}</h3>
                  <p className="text-white/60 text-[15px] leading-relaxed">{item.detail}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="lg:sticky lg:top-32">
            <div className="rounded-3xl bg-white/[0.06] border border-white/10 p-8 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-8">
                <span className="font-display text-lg">NADSCA Delivery Metrics</span>
                <span className="flex items-center gap-2 text-xs text-lime">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                  Live
                </span>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="font-display text-3xl">
                    <Counter to={98.4} decimals={1} suffix="%" />
                  </div>
                  <div className="text-white/50 text-sm mt-1">On-time delivery</div>
                </div>
                <div>
                  <div className="font-display text-3xl">
                    <Counter to={99.99} decimals={2} suffix="%" />
                  </div>
                  <div className="text-white/50 text-sm mt-1">Platform uptime SLA</div>
                </div>
                <div>
                  <div className="font-display text-3xl">
                    <Counter to={2} />
                  </div>
                  <div className="text-white/50 text-sm mt-1">Products shipped</div>
                </div>
                <div>
                  <div className="font-display text-3xl">
                    <Counter to={6} suffix=" wks" />
                  </div>
                  <div className="text-white/50 text-sm mt-1">Avg. time to first release</div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap gap-2">
                {["Zero Tech Debt", "Senior Squads Only", "Daily Production Deploys", "Direct Slack Access"].map((b) => (
                  <span key={b} className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-white/80 font-mono">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Blog preview */}
      <section className="py-28 lg:py-32 bg-transparent relative">
        <div className="container-content">
          <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <div className="max-w-xl">
              <p className="text-azure font-semibold text-sm mb-3">From the studio</p>
              <h2 className="font-display text-4xl md:text-5xl text-ink dark:text-white leading-tight">
                Notes on building good software.
              </h2>
            </div>
            <Link href="/blog" className="text-ink dark:text-white font-semibold text-sm border-b-2 border-lime pb-1">
              Read the blog
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.slice(0, 3).map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.08}>
                <CutoutCard
                  href={`/blog/${post.slug}`}
                  badge={i === 0 ? "NEW" : i === 1 ? "POPULAR" : "INSIGHT"}
                  tag={post.category.toUpperCase()}
                  title={post.title}
                  description={post.excerpt}
                  image={post.image}
                  authorName={post.author}
                  metaText={post.readTime}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials Carousel */}
      <Testimonials />

      {/* Trusted Partners */}
      <PartnersStrip />

      <GiantMarquee />
    </>
  );
}
