import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SpotlightCard, { SpotlightAccent } from "@/components/SpotlightCard";
import AmbientBackground from "@/components/AmbientBackground";
import FeaturedProductsList from "@/components/FeaturedProductsList";
import ProjectsCTA from "@/components/ProjectsCTA";
import { PROJECTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects & Featured Products — NADSCA",
  description:
    "Explore platforms NADSCA has designed, engineered, and brought to life across industries. Real products, real systems, real engineering.",
};

const ACCENTS: SpotlightAccent[] = ["azure", "teal", "lime", "purple", "blue", "azure"];

export default function ProjectsPage() {
  return (
    <>
      {/* Hero Section from Image 1 */}
      <section className="pt-36 sm:pt-44 pb-20 lg:pb-28 bg-mist dark:bg-[#07090E] relative overflow-hidden">
        <AmbientBackground />
        <div className="container-content relative">
          <Reveal className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-azure dark:text-cyan-400 text-xs font-mono font-bold tracking-[0.25em] uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              PROJECTS
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-ink dark:text-white leading-[1.08] tracking-tight">
              Don&apos;t just take our word for it.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">
                See what we&apos;ve built.
              </span>
            </h1>

            <div className="mt-8 space-y-6 text-base sm:text-lg text-ink/75 dark:text-white/75 leading-relaxed max-w-3xl">
              <div>
                <p className="font-bold text-ink dark:text-white text-xl sm:text-2xl mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-emerald-400">
                  Real products. Real systems. Real engineering.
                </p>
                <p>
                  Explore a selection of platforms NADSCA has designed, engineered, and brought to life across industries from intelligent HR and enterprise systems to AI-powered security, retail, and operational platforms.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-ink/[0.03] dark:bg-white/[0.03] border border-ink/8 dark:border-white/10 space-y-1">
                <p className="font-semibold text-ink/80 dark:text-white/80 text-base sm:text-lg">
                  These aren&apos;t concepts or prototypes.
                </p>
                <p className="font-bold text-azure dark:text-cyan-400 text-lg sm:text-xl">
                  They&apos;re working products, built to solve real business problems.
                </p>
              </div>

              <div className="pt-2">
                <p className="font-bold text-ink dark:text-white text-lg sm:text-xl mb-1">
                  See the technology in action.
                </p>
                <p className="text-ink/70 dark:text-white/70">
                  Explore our product demos and discover how NADSCA turns complex business challenges into practical production-ready technology.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <a
                  href="#featured-products"
                  className="inline-flex items-center gap-2 font-bold text-sm sm:text-base text-azure dark:text-cyan-400 hover:underline group"
                >
                  <span>Explore featured products &amp; demos</span>
                  <span className="transition-transform group-hover:translate-y-0.5">↓</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured Products 2x2 Showcase from Image 2 */}
      <FeaturedProductsList />

      {/* Client Deployments & Case Studies */}
      <section className="py-20 lg:py-28 bg-mist/50 dark:bg-[#07090E] border-t border-ink/5 dark:border-white/10 relative">
        <div className="container-content">
          <Reveal className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 text-azure dark:text-cyan-400 text-xs font-mono font-bold tracking-[0.25em] uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              CLIENT DEPLOYMENTS
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink dark:text-white leading-tight">
              Selected systems engineered for enterprise clients.
            </h2>
            <p className="mt-3 text-ink/65 dark:text-white/70 text-base sm:text-lg">
              Custom software platforms delivered and operating in production environments.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.name} delay={(i % 3) * 0.06}>
                <SpotlightCard accent={ACCENTS[i % ACCENTS.length]} className="h-full">
                  <div className="flex flex-col h-full">
                    <div className="h-44 relative bg-ink-gradient overflow-hidden rounded-t-[23px]">
                      <div
                        className="absolute -inset-6 opacity-70 blur-2xl bg-brand-gradient group-hover:scale-110 transition-transform duration-500"
                        style={{ mixBlendMode: "screen" }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                        <span className="font-display text-2xl text-white font-bold">{p.name}</span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-xs font-semibold text-teal mb-2 font-mono uppercase tracking-wider">
                          {p.category}
                        </p>
                        <p className="text-ink/75 dark:text-white/75 text-[15px] leading-relaxed">
                          {p.result}
                        </p>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Conversion Section with Unified Ambient Background */}
      <ProjectsCTA />
    </>
  );
}
