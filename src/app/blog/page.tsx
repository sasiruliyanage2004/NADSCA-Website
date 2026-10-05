import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import CutoutCard from "@/components/CutoutCard";
import AmbientBackground from "@/components/AmbientBackground";
import BlogCTA from "@/components/BlogCTA";
import { BLOG_POSTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog & Insights — NADSCA",
  description:
    "Ideas, lessons, and technology shaping what's next. Practical insights from the people building real software, AI systems, and digital products at NADSCA.",
};

const BADGES = ["FEATURED", "TRENDING", "AI INSIGHT", "SYSTEMS", "DEEP DIVE", "STRATEGY", "ARCHITECTURE", "ANALYTICS"];

export default function BlogPage() {
  return (
    <>
      {/* Hero Section from User Image */}
      <section className="pt-36 sm:pt-44 pb-20 lg:pb-28 bg-mist dark:bg-[#07090E] relative overflow-hidden">
        <AmbientBackground />
        <div className="container-content relative">
          <Reveal className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-azure dark:text-cyan-400 text-xs font-mono font-bold tracking-[0.25em] uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              BLOG &amp; INSIGHTS
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-ink dark:text-white leading-[1.08] tracking-tight">
              Ideas, lessons, and technology{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">
                shaping what&apos;s next.
              </span>
            </h1>

            <div className="mt-8 space-y-5 text-base sm:text-lg text-ink/75 dark:text-white/75 leading-relaxed max-w-3xl">
              <p className="font-semibold text-ink dark:text-white text-lg sm:text-xl">
                Practical insights from the people building real software, AI systems, and digital products at NADSCA.
              </p>

              <p>
                Explore what we&apos;re learning across{" "}
                <strong className="text-ink dark:text-white font-semibold">
                  AI, cloud, product engineering, enterprise technology, and digital transformation
                </strong>{" "}
                and how these ideas can create real value for your business.
              </p>

              <div className="pt-3">
                <a
                  href="#insights"
                  className="inline-flex items-center gap-2 font-bold text-azure dark:text-cyan-400 hover:underline group text-base"
                >
                  <span>Explore our insights</span>
                  <span className="transition-transform group-hover:translate-x-1 font-mono">→</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8 Insights Grid Section */}
      <section
        id="insights"
        className="py-20 lg:py-28 bg-paper dark:bg-[#07090E] border-t border-ink/5 dark:border-white/10 relative scroll-mt-20"
      >
        <div className="container-content">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
            {BLOG_POSTS.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 4) * 0.05}>
                <CutoutCard
                  href={`/contact?subject=${encodeURIComponent(post.title)}`}
                  badge={BADGES[i % BADGES.length]}
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

      {/* Unified Ambient Bottom CTA */}
      <BlogCTA />
    </>
  );
}
