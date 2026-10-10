"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Card3DTilt from "@/components/Card3DTilt";

export default function SpotlightBento() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse move handler for smooth cursor-following radial spotlight on cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll<HTMLElement>(".spotlight-card");
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        
        {/* CARD 1: FLAGSHIP - Product Engineering & High-Throughput Architecture (Col-span-7 on lg) */}
        <Card3DTilt className="col-span-1 md:col-span-2 lg:col-span-7 h-full rounded-3xl" maxTilt={6} scale={1.012}>
          <div className="spotlight-card group relative h-full rounded-3xl p-[1px] overflow-hidden transition-all duration-300">
            {/* Spotlight Border illumination */}
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(30, 127, 232, 0.4), rgba(18, 184, 166, 0.2) 35%, transparent 65%)`,
              }}
            />
            {/* Card Body */}
            <div className="relative h-full w-full rounded-[23px] bg-white dark:bg-[#0D1118] border border-ink/8 dark:border-white/10 p-8 md:p-10 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-card transition-shadow">
              {/* Inner spotlight glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(750px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(30, 127, 232, 0.04), transparent 50%)`,
                }}
              />

              <div>
                {/* Header Eyebrow */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <span className="text-azure dark:text-azure-light text-xs font-mono font-semibold tracking-widest uppercase">
                    CORE ARCHITECTURE
                  </span>
                </div>

                <h3 className="font-display text-2xl md:text-3xl text-ink dark:text-white mb-4">
                  Full-Stack Product Engineering & Scalable Systems
                </h3>
                <p className="text-ink/65 dark:text-white/70 text-[15px] md:text-base leading-relaxed max-w-2xl mb-8">
                  We design and build production-grade web and native applications engineered for zero downtime, sub-millisecond edge response, and horizontal scale. From distributed Go/Rust microservices to responsive Next.js architectures.
                </p>

                {/* Architecture Pillars Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
                  <div className="rounded-2xl border border-ink/5 dark:border-white/10 bg-mist/80 dark:bg-white/[0.04] p-5">
                    <div className="font-mono text-xs text-azure dark:text-azure-light font-semibold mb-2">FRONTEND</div>
                    <div className="text-ink dark:text-white text-sm font-semibold mb-1">Modern Web & Mobile</div>
                    <p className="text-ink/60 dark:text-white/60 text-xs leading-relaxed">
                      Next.js App Router, React Server Components, and native iOS/Android with sub-100ms hydration.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-ink/5 dark:border-white/10 bg-mist/80 dark:bg-white/[0.04] p-5">
                    <div className="font-mono text-xs text-teal dark:text-teal-400 font-semibold mb-2">BACKEND</div>
                    <div className="text-ink dark:text-white text-sm font-semibold mb-1">Distributed Microservices</div>
                    <p className="text-ink/60 dark:text-white/60 text-xs leading-relaxed">
                      Go, Rust, and Node.js microservices interconnected via low-latency gRPC and message queues.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-ink/5 dark:border-white/10 bg-mist/80 dark:bg-white/[0.04] p-5">
                    <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold mb-2">PERFORMANCE</div>
                    <div className="text-ink dark:text-white text-sm font-semibold mb-1">Global Edge Delivery</div>
                    <p className="text-ink/60 dark:text-white/60 text-xs leading-relaxed">
                      Anycast routing, automated Redis caching layers, and zero-downtime rolling releases.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom feature tags */}
              <div className="mt-8 pt-6 border-t border-ink/5 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {["Next.js / React 19", "Distributed Go", "gRPC & WebSockets", "PostgreSQL / Redis"].map((t) => (
                    <span key={t} className="text-xs px-3 py-1 rounded-full bg-ink/[0.04] dark:bg-white/[0.06] text-ink/70 dark:text-white/80 border border-ink/5 dark:border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="text-xs font-semibold text-azure hover:text-azure-light dark:text-azure-light transition-colors flex items-center gap-1 group-hover:translate-x-1 duration-200"
                >
                  Discuss Technical Specs →
                </Link>
              </div>
            </div>
          </div>
        </Card3DTilt>

        {/* CARD 2: Applied AI & Neural Pipelines (Col-span-5 on lg) */}
        <Card3DTilt className="col-span-1 md:col-span-2 lg:col-span-5 h-full rounded-3xl" maxTilt={7} scale={1.015}>
          <div className="spotlight-card group relative h-full rounded-3xl p-[1px] overflow-hidden transition-all duration-300">
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(450px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(18, 184, 166, 0.4), transparent 60%)`,
              }}
            />
            <div className="relative h-full w-full rounded-[23px] bg-white dark:bg-[#0D1118] border border-ink/8 dark:border-white/10 p-8 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-card transition-shadow">
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(550px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(18, 184, 166, 0.04), transparent 50%)`,
                }}
              />

              <div>
                <div className="text-teal dark:text-teal-400 text-xs font-mono font-semibold tracking-widest uppercase mb-4">
                  APPLIED AI
                </div>

                <h3 className="font-display text-2xl text-ink dark:text-white mb-3">
                  Applied AI &amp; Autonomous Pipelines
                </h3>
                <p className="text-ink/65 dark:text-white/70 text-[14px] leading-relaxed mb-6">
                  Transform business data into automated intelligence with production RAG architectures, fine-tuned domain models, and high-throughput vector search.
                </p>

                {/* Clean Telemetry Overview */}
                <div className="rounded-2xl border border-ink/5 dark:border-white/10 bg-mist/80 dark:bg-white/[0.04] p-5 font-mono text-xs space-y-3">
                  <div className="flex items-center justify-between text-ink/50 dark:text-white/50 pb-2 border-b border-ink/5 dark:border-white/10">
                    <span className="text-teal dark:text-teal-400 font-semibold">PRODUCTION BENCHMARK</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">OPTIMAL</span>
                  </div>
                  <div className="flex justify-between text-ink/70 dark:text-white/80">
                    <span className="text-ink/40 dark:text-white/45">Inference P99:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">&lt; 12ms</span>
                  </div>
                  <div className="flex justify-between text-ink/70 dark:text-white/80">
                    <span className="text-ink/40 dark:text-white/45">Embedding Dimension:</span>
                    <span className="text-ink dark:text-white">1536 (Cosine HNSW)</span>
                  </div>
                  <div className="flex justify-between text-ink/70 dark:text-white/80">
                    <span className="text-ink/40 dark:text-white/45">Knowledge Base:</span>
                    <span className="text-ink dark:text-white">Multi-Tenant Vector DB</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-ink/5 dark:border-white/10 flex flex-wrap gap-2">
                {["Custom RAG", "Vector Search", "Fine-Tuning", "Autonomous Agents"].map((t) => (
                  <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-ink/[0.04] dark:bg-white/[0.06] text-ink/70 dark:text-white/80 border border-ink/5 dark:border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card3DTilt>

        {/* CARD 3: Cloud & Auto-Scaling DevOps (Col-span-6 on lg) */}
        <Card3DTilt className="col-span-1 md:col-span-1 lg:col-span-6 h-full rounded-3xl" maxTilt={7} scale={1.015}>
          <div className="spotlight-card group relative h-full rounded-3xl p-[1px] overflow-hidden transition-all duration-300">
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(450px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(111, 207, 62, 0.4), transparent 60%)`,
              }}
            />
            <div className="relative h-full w-full rounded-[23px] bg-white dark:bg-[#0D1118] border border-ink/8 dark:border-white/10 p-8 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-card transition-shadow">
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(550px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(111, 207, 62, 0.04), transparent 50%)`,
                }}
              />

              <div>
                <div className="text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold tracking-widest uppercase mb-4">
                  CLOUD &amp; DEVOPS
                </div>

                <h3 className="font-display text-2xl text-ink dark:text-white mb-3">
                  Cloud Architecture &amp; Auto-Scaling DevOps
                </h3>
                <p className="text-ink/65 dark:text-white/70 text-[14px] leading-relaxed mb-6">
                  Zero-downtime rolling deployments, automated multi-cloud failovers, and resilient Kubernetes clusters that scale dynamically without manual intervention.
                </p>

                {/* Multi-Region Availability */}
                <div className="rounded-2xl border border-ink/5 dark:border-white/10 bg-mist/80 dark:bg-white/[0.04] p-5 font-mono text-xs space-y-2.5">
                  <div className="flex items-center justify-between text-ink/50 dark:text-white/50 pb-2 border-b border-ink/5 dark:border-white/10">
                    <span>ACTIVE REGIONS</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">99.99% SLA</span>
                  </div>
                  {[
                    { name: "US-East (N. Virginia)", ping: "12ms" },
                    { name: "EU-West (Frankfurt)", ping: "18ms" },
                    { name: "AP-South (Singapore)", ping: "24ms" },
                  ].map((r) => (
                    <div key={r.name} className="flex items-center justify-between text-ink/70 dark:text-white/80">
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {r.name}
                      </span>
                      <span className="text-ink/40 dark:text-white/45">{r.ping}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-ink/5 dark:border-white/10 flex flex-wrap gap-2">
                {["Kubernetes", "AWS / GCP / Azure", "Terraform", "Zero Downtime"].map((t) => (
                  <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-ink/[0.04] dark:bg-white/[0.06] text-ink/70 dark:text-white/80 border border-ink/5 dark:border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card3DTilt>

        {/* CARD 4: Zero-Trust Enterprise Systems (Col-span-6 on lg) */}
        <Card3DTilt className="col-span-1 md:col-span-1 lg:col-span-6 h-full rounded-3xl" maxTilt={7} scale={1.015}>
          <div className="spotlight-card group relative h-full rounded-3xl p-[1px] overflow-hidden transition-all duration-300">
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(450px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(245, 158, 11, 0.4), transparent 60%)`,
              }}
            />
            <div className="relative h-full w-full rounded-[23px] bg-white dark:bg-[#0D1118] border border-ink/8 dark:border-white/10 p-8 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-card transition-shadow">
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(550px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(245, 158, 11, 0.04), transparent 50%)`,
                }}
              />

              <div>
                <div className="text-amber-600 dark:text-amber-400 text-xs font-mono font-semibold tracking-widest uppercase mb-4">
                  SECURITY &amp; AUDIT
                </div>

                <h3 className="font-display text-2xl text-ink dark:text-white mb-3">
                  Zero-Trust Enterprise Systems &amp; Modernization
                </h3>
                <p className="text-ink/65 dark:text-white/70 text-[14px] leading-relaxed mb-6">
                  Replace brittle legacy tools with secure internal platforms, automated compliance protocols, and cryptographically verified data pipelines.
                </p>

                {/* Compliance - ISO 27001 */}
                <div className="rounded-xl border border-ink/5 dark:border-white/10 bg-mist/80 dark:bg-white/[0.04] p-3.5 font-mono text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-ink dark:text-white font-semibold text-sm">ISO 27001</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-medium">
                      In Progress
                    </span>
                  </div>
                  <div className="text-amber-600 dark:text-amber-400 text-xs flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Under Certification Process
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-ink/5 dark:border-white/10 flex flex-wrap gap-2">
                {["Legacy Migration", "ERP Systems", "Role-Based ACL", "Audit Logging"].map((t) => (
                  <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-ink/[0.04] dark:bg-white/[0.06] text-ink/70 dark:text-white/80 border border-ink/5 dark:border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card3DTilt>

      </div>
    </div>
  );
}
