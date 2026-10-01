"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Zap, Cpu, Network, Layers, Sparkles } from "lucide-react";

interface CardSpec {
  id: string;
  num: string;
  kicker: string;
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  glow: string;
  metrics: { label: string; value: string }[];
  tech: string[];
  imageBg?: string;
  icon: React.ReactNode;
}

const STACK_CARDS: CardSpec[] = [
  {
    id: "ingress",
    num: "01",
    kicker: "STAGE 01 // 04 • GLOBAL ANYCAST",
    title: "Global Anycast Edge Ingress",
    subtitle: "Low-latency TLS 1.3 handshakes terminating at 300+ edge locations",
    description:
      "Incoming requests are intercepted at the nearest metropolitan point of presence via BGP Anycast routing. TLS 1.3 termination, bot verification, and line-rate DDoS scrubbing occur entirely at the network edge before traffic enters our private fiber backbone.",
    accent: "#1E7FE8",
    glow: "rgba(30, 127, 232, 0.25)",
    metrics: [
      { label: "Handshake Overhead", value: "< 1.2ms" },
      { label: "DDoS Capacity", value: "Multi-Tbps" },
      { label: "Edge Proximity", value: "95% < 15ms" },
    ],
    tech: ["BGP Anycast", "TLS 1.3 / QUIC", "Cloudflare Fabric", "eBPF Scrubbing"],
    icon: <Network className="w-5 h-5 text-cyan-400" />,
  },
  {
    id: "gateway",
    num: "02",
    kicker: "STAGE 02 // 04 • SEMANTIC ROUTING",
    title: "Semantic Routing & API Gateway",
    subtitle: "Zero-copy gRPC deserialization and intelligent request dispatching",
    description:
      "The gateway decomposes incoming payloads, validates cryptographic JWT tokens in sub-milliseconds, and dispatches traffic across internal microservices using high-throughput gRPC over HTTP/2 with distributed OpenTelemetry tracing and zero memory allocations.",
    accent: "#00C4B4",
    glow: "rgba(0, 196, 180, 0.25)",
    metrics: [
      { label: "Routing Latency", value: "< 0.6ms" },
      { label: "Throughput", value: "180,000 req/s" },
      { label: "Token Validation", value: "Sub-ms" },
    ],
    tech: ["Go Microservices", "gRPC / Protobuf", "Envoy Proxy", "OpenTelemetry"],
    icon: <Zap className="w-5 h-5 text-teal-400" />,
  },
  {
    id: "state",
    num: "03",
    kicker: "STAGE 03 // 04 • VECTOR & STATE",
    title: "Distributed State & Vector Engine",
    subtitle: "Multi-tenant HNSW vector search with ACID transactional state",
    description:
      "High-dimensional vector embeddings are queried across sharded indices in parallel with transactional relational state. We guarantee strict ACID consistency, sub-5ms cosine similarity indexing, and automated multi-region active-active replication.",
    accent: "#6366F1",
    glow: "rgba(99, 102, 241, 0.25)",
    metrics: [
      { label: "Vector Search P99", value: "4.2ms" },
      { label: "Replication Factor", value: "3x Multi-AZ" },
      { label: "Cache Hit Ratio", value: "97.4%" },
    ],
    tech: ["Milvus / Qdrant", "PostgreSQL / Raft", "Redis Enterprise", "HNSW Indices"],
    icon: <Layers className="w-5 h-5 text-indigo-400" />,
  },
  {
    id: "compute",
    num: "04",
    kicker: "STAGE 04 // 04 • NEURAL COMPUTE",
    title: "Production AI & Neural Execution",
    subtitle: "High-density model execution and distributed streaming compute",
    description:
      "Core algorithmic pipelines and quantized LLMs execute in parallel on dedicated GPU inference clusters. Dynamic continuous batching and speculative decoding maximize token throughput without adding jitter, pushing responses over persistent HTTP/3 streams.",
    accent: "#10B981",
    glow: "rgba(16, 185, 129, 0.25)",
    metrics: [
      { label: "Inference Latency", value: "8.8ms" },
      { label: "Batch Efficiency", value: "99.2%" },
      { label: "GPU Saturation", value: "89% Optimal" },
    ],
    tech: ["vLLM / Triton", "CUDA Kernels", "HTTP/3 Streaming", "Persistent SSE"],
    icon: <Cpu className="w-5 h-5 text-emerald-400" />,
  },
];

export default function ArchitecturePipeline() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const activeLabelRef = useRef<HTMLSpanElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);

  const [activeStageIndex, setActiveStageIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const wrapper = wrapperRef.current;
    const stage = stageRef.current;
    if (!wrapper || !stage) return;

    // Check query param for standalone gallery mode: ?card loads alone and auto-plays
    const isCardMode = window.location.search.includes("card");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const N = STACK_CARDS.length;
    const segment = 1 / N;

    let rafId: number = 0;
    let autoPlayStart: number | null = null;
    let lastActiveIdx = -1;

    // Direct DOM write loop for 120fps butter-smooth transforms without React re-render lag
    const updateDeck = (p: number) => {
      const active = Math.min(Math.floor(p / segment), N - 1);
      const segP = Math.max(0, Math.min(1, (p - active * segment) / segment));

      if (active !== lastActiveIdx) {
        lastActiveIdx = active;
        setActiveStageIndex(active);
        if (activeLabelRef.current) {
          activeLabelRef.current.textContent = `STAGE 0${active + 1} OF 0${N} • ${STACK_CARDS[active].title.toUpperCase()}`;
        }
      }

      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${p * 100}%`;
      }

      // Outro Reveal (appears when deck deals through the final card)
      if (outroRef.current) {
        if (p > 0.88) {
          const outroP = (p - 0.88) / 0.12;
          outroRef.current.style.opacity = `${outroP}`;
          outroRef.current.style.transform = `translate(-50%, -50%) scale(${0.92 + outroP * 0.08})`;
          outroRef.current.style.pointerEvents = "auto";
        } else {
          outroRef.current.style.opacity = "0";
          outroRef.current.style.transform = "translate(-50%, -50%) scale(0.92)";
          outroRef.current.style.pointerEvents = "none";
        }
      }

      for (let i = 0; i < N; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        if (prefersReducedMotion) {
          // Resting stack held stationary
          const y = -50 + i * 5;
          const s = 1 - i * 0.075;
          el.style.transform = `translate3d(-50%, ${y}%, 0) rotateX(0deg) scale(${s})`;
          el.style.opacity = "1";
          el.style.zIndex = `${40 - i * 10}`;
          continue;
        }

        if (i < active) {
          // Parked above
          el.style.transform = "translate3d(-50%, -250%, 0) rotateX(35deg) scale(1)";
          el.style.opacity = "0";
          el.style.zIndex = `${10 + i}`;
          el.style.pointerEvents = "none";
        } else if (i === active) {
          // Active card: lifts up and tilts away on its bottom edge
          // Math: translate(-50%, lerp(−50, −200, segP)%) rotateX(lerp(0, 35, segP)deg) scale(1)
          const y = -50 + (-200 - -50) * segP;
          const rx = 0 + (35 - 0) * segP;
          const opacity = segP > 0.82 ? `${1 - (segP - 0.82) / 0.18}` : "1";

          el.style.transform = `translate3d(-50%, ${y}%, 0) rotateX(${rx}deg) scale(1)`;
          el.style.opacity = opacity;
          el.style.zIndex = "50";
          el.style.pointerEvents = "auto";
        } else {
          // Waiting behind: rises and scales up into place
          // Math: behind = i − active, rises to translate(-50%, (−50 + (behind−segP)·5)%) scale(1 − (behind−segP)·0.075) rotateX(0)
          const behind = i - active;
          const effectiveBehind = behind - segP;
          const y = -50 + effectiveBehind * 5;
          const scale = 1 - effectiveBehind * 0.075;

          el.style.transform = `translate3d(-50%, ${y}%, 0) rotateX(0deg) scale(${scale})`;
          el.style.opacity = "1";
          el.style.zIndex = `${40 - behind * 10}`;
          el.style.pointerEvents = behind === 1 && segP > 0.4 ? "auto" : "none";
        }
      }
    };

    const tick = (now: number) => {
      let p = 0;

      if (isCardMode) {
        // Auto-play on ~7s loop (6s deal + 1s hold)
        if (autoPlayStart === null) autoPlayStart = now;
        const elapsed = (now - autoPlayStart) % 7000;
        if (elapsed < 6000) {
          p = elapsed / 6000;
        } else {
          p = 0;
        }
      } else {
        // Scroll-driven normalised progress p in [0, 1]
        const rect = wrapper.getBoundingClientRect();
        const scrollable = rect.height - window.innerHeight;
        p = scrollable > 0 ? Math.max(0, Math.min(1, -rect.top / scrollable)) : 0;
      }

      updateDeck(p);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={wrapperRef} className="relative w-full deck-scroll-wrapper">
      {/* Self-contained Injected CSS Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .deck-scroll-wrapper {
              height: 750svh;
              background-color: #07090E;
              position: relative;
            }

            .deck-stage {
              position: sticky;
              top: 0;
              height: 100svh;
              width: 100%;
              overflow: hidden;
              perspective: 1200px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: radial-gradient(circle at 50% 45%, #0B111C 0%, #07090E 75%);
            }

            .deck-card {
              position: absolute;
              top: 50%;
              left: 50%;
              width: clamp(320px, 92vw, 1080px);
              min-height: 520px;
              max-height: 86vh;
              transform-origin: center bottom;
              border-radius: 28px;
              border: 1px solid rgba(255, 255, 255, 0.12);
              background: linear-gradient(135deg, rgba(16, 23, 36, 0.94) 0%, rgba(9, 13, 20, 0.98) 100%);
              backdrop-filter: blur(28px);
              box-shadow: 0 35px 90px -20px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.05);
              will-change: transform, opacity;
              display: flex;
              flex-direction: column;
              overflow: hidden;
              transition: border-color 0.3s ease;
            }

            @media (min-width: 860px) {
              .deck-card {
                flex-direction: row;
                height: 520px;
              }
            }

            .deck-copy-col {
              flex: 1.15;
              padding: 2.25rem;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              z-index: 2;
            }

            @media (max-width: 640px) {
              .deck-copy-col {
                padding: 1.5rem;
              }
            }

            .deck-image-col {
              flex: 0.85;
              position: relative;
              border-radius: 20px;
              margin: 1.25rem;
              overflow: hidden;
              background-size: cover;
              background-position: center;
              border: 1px solid rgba(255, 255, 255, 0.08);
              display: flex;
              align-items: center;
              justify-content: center;
            }

            @media (max-width: 859px) {
              .deck-image-col {
                min-height: 220px;
                margin: 0 1.5rem 1.5rem 1.5rem;
              }
            }

            .deck-hud-chrome {
              mix-blend-mode: difference;
              pointer-events: none;
              position: absolute;
              inset: 0;
              z-index: 80;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              padding: 1.75rem 2rem;
            }

            .deck-outro-panel {
              position: absolute;
              top: 50%;
              left: 50%;
              width: clamp(320px, 92vw, 860px);
              transform: translate(-50%, -50%) scale(0.92);
              border-radius: 28px;
              border: 1px solid rgba(255, 255, 255, 0.15);
              background: rgba(11, 17, 28, 0.95);
              backdrop-filter: blur(32px);
              padding: 3rem 2rem;
              text-align: center;
              opacity: 0;
              z-index: 60;
              transition: opacity 0.3s ease, transform 0.3s ease;
            }
          `,
        }}
      />

      {/* Pinned Sticky Stage */}
      <div ref={stageRef} className="deck-stage">
        {/* Ambient Radial Depth Accent */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 transition-colors duration-700"
          style={{
            background: `radial-gradient(circle at 60% 50%, ${STACK_CARDS[activeStageIndex]?.glow || "rgba(30,127,232,0.15)"} 0%, transparent 65%)`,
          }}
        />

        {/* FIXED CHROME (Top & Bottom HUD) */}
        <div className="deck-hud-chrome">
          {/* Top Bar: Section Kicker + Stage Progress */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/90 font-semibold">
                NADSCA® ARCHITECTURE STACK // BUILT IN LAYERS
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-4">
              <span
                ref={activeLabelRef}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/80 font-medium"
              >
                STAGE 01 OF 04 • EDGE INGRESS
              </span>
              <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  ref={progressBarRef}
                  className="h-full bg-gradient-to-r from-cyan-400 to-teal-400 transition-all duration-75"
                  style={{ width: "0%" }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Bar: Interactive Scroll Cue */}
          <div className="flex items-center justify-between w-full text-[11px] font-mono tracking-[0.25em] text-white/70 uppercase">
            <div className="flex items-center gap-2">
              <span className="inline-block animate-bounce">↓</span>
              <span>SCROLL TO DEAL ARCHITECTURE STACK</span>
            </div>
            <span className="hidden md:inline text-white/50">
              PERSPECTIVE: 1200PX // ZERO LATENCY EXECUTION
            </span>
          </div>
        </div>

        {/* ─── THE 4-CARD LEANING DECK ─── */}
        {STACK_CARDS.map((card, idx) => (
          <div
            key={card.id}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            className="deck-card"
            style={{
              // Initial resting styles
              transform: `translate3d(-50%, ${-50 + idx * 5}%, 0) scale(${1 - idx * 0.075})`,
              zIndex: 40 - idx * 10,
            }}
          >
            {/* Copy Column */}
            <div className="deck-copy-col">
              <div>
                {/* Stage Pill & Number Kicker */}
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
                    {card.icon}
                    <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/90 font-medium">
                      {card.kicker}
                    </span>
                  </div>
                  <span className="font-mono text-2xl font-bold text-white/20">
                    {card.num}
                  </span>
                </div>

                {/* Big Title */}
                <h3 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight mb-2">
                  {card.title}
                </h3>

                {/* Subtitle */}
                <p className="text-sm sm:text-[15px] font-medium text-cyan-400/90 mb-4">
                  {card.subtitle}
                </p>

                {/* Architectural Prose Description */}
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal mb-6 line-clamp-3 sm:line-clamp-4">
                  {card.description}
                </p>
              </div>

              {/* Bottom Specs: Concrete Telemetry Grid */}
              <div>
                <div className="grid grid-cols-3 gap-2.5 pt-4 mb-4 border-t border-white/10">
                  {card.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="flex flex-col">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-white/45">
                        {m.label}
                      </span>
                      <span className="font-mono text-sm sm:text-base font-bold text-white tracking-tight mt-0.5">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {card.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Image / Interactive Visual Column */}
            <div
              className="deck-image-col"
              style={{
                backgroundImage: card.imageBg ? `url(${card.imageBg})` : undefined,
                background: "linear-gradient(135deg, rgba(8,12,20,0.95) 0%, rgba(13,20,32,0.95) 100%)",
              }}
            >
              {/* Dynamic Interactive SVG Graphic for each Stage */}
              <div className="relative w-full h-full p-6 flex flex-col justify-between">
                {/* Visual Top Status */}
                <div className="flex items-center justify-between text-[10px] font-mono text-white/60 tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: card.accent }} />
                    TELEMETRY NODE {card.num}
                  </span>
                  <span className="text-emerald-400 font-medium">● 100% OPERATIONAL</span>
                </div>

                {/* Dynamic Center Stage Hologram */}
                <div className="flex-1 flex items-center justify-center my-4">
                  {idx === 0 && (
                    <div className="relative w-44 h-44 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-ping opacity-30" />
                      <div className="absolute inset-4 rounded-full border border-cyan-400/30 animate-spin [animation-duration:14s]" />
                      <div className="absolute inset-10 rounded-full border border-dashed border-cyan-400/40" />
                      <div className="relative p-5 rounded-2xl bg-cyan-500/10 border border-cyan-400/40 backdrop-blur-md text-center">
                        <Network className="w-8 h-8 text-cyan-400 mx-auto mb-1.5" />
                        <span className="text-[11px] font-mono font-bold text-white block">ANYCAST</span>
                        <span className="text-[9px] font-mono text-cyan-400">300+ PoPs</span>
                      </div>
                    </div>
                  )}

                  {idx === 1 && (
                    <div className="w-full max-w-[280px] p-4 rounded-2xl bg-white/[0.02] border border-teal-400/20">
                      <div className="flex items-center justify-between font-mono text-[10px] text-teal-300 pb-2 border-b border-white/10 mb-3">
                        <span>gRPC INGRESS STREAM</span>
                        <span>0.6ms</span>
                      </div>
                      <div className="space-y-2 font-mono text-[10px]">
                        <div className="flex justify-between items-center bg-white/[0.03] p-1.5 rounded">
                          <span className="text-white/60">POST /api/v2/stream</span>
                          <span className="text-teal-400">200 OK</span>
                        </div>
                        <div className="flex justify-between items-center bg-white/[0.03] p-1.5 rounded">
                          <span className="text-white/60">JWT Signature Validate</span>
                          <span className="text-emerald-400">VALID</span>
                        </div>
                        <div className="flex justify-between items-center bg-white/[0.03] p-1.5 rounded">
                          <span className="text-white/60">Dispatch to Go-Mesh</span>
                          <span className="text-teal-400">0.2ms</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {idx === 2 && (
                    <div className="relative w-44 h-44 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-2xl border border-indigo-500/20 rotate-45" />
                      <div className="absolute inset-6 rounded-2xl border border-indigo-400/30 -rotate-12" />
                      <div className="relative p-5 rounded-2xl bg-indigo-500/10 border border-indigo-400/40 backdrop-blur-md text-center">
                        <Layers className="w-8 h-8 text-indigo-400 mx-auto mb-1.5" />
                        <span className="text-[11px] font-mono font-bold text-white block">HNSW VECTOR</span>
                        <span className="text-[9px] font-mono text-indigo-300">Sub-5ms Cosine</span>
                      </div>
                    </div>
                  )}

                  {idx === 3 && (
                    <div className="w-full max-w-[280px] p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                      <div className="flex items-center justify-between font-mono text-[10px] text-emerald-400 pb-2 border-b border-white/10 mb-3">
                        <span>vLLM TENSOR CLUSTER</span>
                        <span>4,800 tok/s</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-center font-mono">
                        <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                          <span className="text-[9px] text-white/40 block">TTFT</span>
                          <span className="text-xs font-bold text-emerald-400">&lt; 42ms</span>
                        </div>
                        <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                          <span className="text-[9px] text-white/40 block">CACHE</span>
                          <span className="text-xs font-bold text-cyan-400">100% RAM</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Visual Bottom Footer */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-white/40">
                  <span>ENGINEERED BY NADSCA</span>
                  <span style={{ color: card.accent }}>SPEC VERIFIED</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* ─── OUTRO PANEL (Reveals after final card deals) ─── */}
        <div ref={outroRef} className="deck-outro-panel">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-6">
            <ShieldCheck className="w-4 h-4" />
            <span>ALL 4 EXECUTION STAGES VERIFIED</span>
          </div>

          <h3 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            LET&apos;S BUILD WHAT&apos;S NEXT.
          </h3>

          <p className="text-sm sm:text-base text-white/70 max-w-lg mx-auto mb-8 leading-relaxed">
            From low-latency edge ingress to distributed vector indexing and quantized neural compute, our senior engineering squads build platforms designed for extreme scale.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-bold text-sm hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.25)]"
            >
              <span>Start an Engineering Sprint</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/15 bg-white/[0.04] text-white text-sm font-medium hover:border-cyan-400/40 hover:bg-white/[0.08] backdrop-blur-md transition-all duration-300"
            >
              <span>Explore All Capabilities</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
