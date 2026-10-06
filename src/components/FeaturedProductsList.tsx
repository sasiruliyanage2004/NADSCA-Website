"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Play,
  Pause,
  X,
  Sparkles,
  CheckCircle2,
  MonitorPlay,
  Maximize2,
  Volume2,
  Activity,
  ShieldCheck,
  TrendingUp,
  Boxes,
} from "lucide-react";
import SpotlightCard, { SpotlightAccent } from "@/components/SpotlightCard";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";

interface FeaturedProduct {
  id: string;
  number: string;
  title: string;
  headline: string;
  description: string;
  slug: string;
  accent: SpotlightAccent;
  videoDuration: string;
  videoUrl?: string;
  thumbnailImage?: string;
  categoryTag: string;
  thumbnailGradient: string;
  icon: React.ElementType;
  mockupContent: {
    stat1: string;
    stat1Label: string;
    stat2: string;
    stat2Label: string;
    highlightPill: string;
  };
  demoHighlights: {
    title: string;
    description: string;
  }[];
  demoStats: {
    label: string;
    value: string;
  }[];
}

const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    id: "01",
    number: "01 - OHRMS",
    title: "01 - OHRMS",
    headline: "Intelligent HR & Workforce Management",
    description:
      "An end-to-end HR platform covering payroll, attendance, employee management, and AI-powered performance insights.",
    slug: "ohrms",
    accent: "azure",
    videoDuration: "01:50",
    videoUrl: "/videos/ohrms-demo.mp4",
    thumbnailImage: "/images/ohrms-thumbnail.jpg",
    categoryTag: "ENTERPRISE HR",
    thumbnailGradient: "from-sky-950/80 via-[#0A1628] to-[#040914]",
    icon: Activity,
    mockupContent: {
      stat1: "99.4%",
      stat1Label: "Attendance Accuracy",
      stat2: "1-Click",
      stat2Label: "Payroll Execution",
      highlightPill: "Biometric & Shift Sync Active",
    },
    demoHighlights: [
      {
        title: "Unified Workforce Directory",
        description: "Complete employee records, biometric attendance sync, and multi-location shift scheduling.",
      },
      {
        title: "Automated Payroll Engine",
        description: "Statutory deductions, multi-tier tax computations, and one-click bank-ready payslip exports.",
      },
      {
        title: "AI Performance Insights",
        description: "Real-time attrition indicators, team velocity tracking, and objective KPI evaluation.",
      },
      {
        title: "Self-Service Portal",
        description: "Instant mobile leave approvals, overtime tracking, and digital document vaults.",
      },
    ],
    demoStats: [
      { label: "Deployment", value: "Production-ready" },
      { label: "Supported", value: "Cloud & On-Prem" },
      { label: "AI Engine", value: "Predictive Analytics" },
    ],
  },
  {
    id: "02",
    number: "02 - AI Security Patrolling",
    title: "02 - AI Security Patrolling",
    headline: "Intelligent Security. Proactive Protection.",
    description:
      "AI-powered camera intelligence that detects potential risks and helps security teams respond with greater awareness.",
    slug: "ai-security-patrolling",
    accent: "teal",
    videoDuration: "02:00",
    videoUrl: "/videos/nadsca-aethra.mp4",
    categoryTag: "COMPUTER VISION",
    thumbnailGradient: "from-teal-950/80 via-[#081B1E] to-[#030B0D]",
    icon: ShieldCheck,
    mockupContent: {
      stat1: "< 200ms",
      stat1Label: "Threat Detection Latency",
      stat2: "24/7",
      stat2Label: "Autonomous Perimeter Guard",
      highlightPill: "Live Edge Vision Stream",
    },
    demoHighlights: [
      {
        title: "Computer Vision Stream Analytics",
        description: "Real-time edge analysis of live CCTV streams detecting perimeter breaches and unauthorized access.",
      },
      {
        title: "Proactive Incident Alerts",
        description: "Instant push notifications dispatched to patrolling security personnel with precise coordinates.",
      },
      {
        title: "Forensic Timeline Reconstruction",
        description: "Synchronized multi-camera video playback with tagged event timestamps for rapid audits.",
      },
      {
        title: "Edge Node Processing",
        description: "Local inference appliances ensure uninterrupted threat detection with sub-200ms latency.",
      },
    ],
    demoStats: [
      { label: "Detection Latency", value: "< 200ms" },
      { label: "Stream Support", value: "RTSP / ONVIF" },
      { label: "Model Architecture", value: "Edge AI Vision" },
    ],
  },
  {
    id: "03",
    number: "03 - AI-Powered POS",
    title: "03 - AI-Powered POS",
    headline: "Smarter Retail. Better Decisions.",
    description:
      "A modern POS with AI-powered sales prediction and real-time profitability forecasting.",
    slug: "ai-powered-pos",
    accent: "lime",
    videoDuration: "03:10",
    categoryTag: "RETAIL INTELLIGENCE",
    thumbnailGradient: "from-emerald-950/80 via-[#0A1A14] to-[#030B07]",
    icon: TrendingUp,
    mockupContent: {
      stat1: "+28.4%",
      stat1Label: "Forecast Accuracy",
      stat2: "Real-time",
      stat2Label: "Profitability Margin Tracking",
      highlightPill: "Offline-First Sync Ready",
    },
    demoHighlights: [
      {
        title: "Predictive Sales & Demand Forecast",
        description: "AI analyzes historical patterns and seasonality to predict hourly store traffic and reorder triggers.",
      },
      {
        title: "Live Margin & Profit Analytics",
        description: "Real-time margin calculation at checkout taking batch purchase costs into account.",
      },
      {
        title: "Offline-First Terminal Sync",
        description: "Reliable counter operation during network outages with conflict-free cloud replication.",
      },
      {
        title: "Basket Intelligence",
        description: "Smart cross-sell and upsell recommendations presented dynamically to cashiers.",
      },
    ],
    demoStats: [
      { label: "Offline Resilience", value: "100% Offline Capable" },
      { label: "Sync Engine", value: "Sub-second CDC" },
      { label: "Intelligence", value: "Real-time Forecast" },
    ],
  },
  {
    id: "04",
    number: "04 - Inventory & Distribution",
    title: "04 - Inventory & Distribution",
    headline: "Simplify Operations. Control Inventory.",
    description:
      "A smart platform for inventory, wholesale distribution, and streamlined day-to-day operations.",
    slug: "smart-inventory-distribution",
    accent: "purple",
    videoDuration: "04:30",
    categoryTag: "SUPPLY CHAIN",
    thumbnailGradient: "from-indigo-950/80 via-[#101026] to-[#060612]",
    icon: Boxes,
    mockupContent: {
      stat1: "Multi-Hub",
      stat1Label: "Warehouse Visibility",
      stat2: "Automated",
      stat2Label: "Purchase Reorder Triggers",
      highlightPill: "B2B Wholesale Portal Active",
    },
    demoHighlights: [
      {
        title: "Multi-Warehouse Stock Ledger",
        description: "Real-time visibility into physical inventory, goods in transit, and customer allocations.",
      },
      {
        title: "Automated Reordering System",
        description: "Dynamic safety-stock alerts and automatic purchase order generation based on lead times.",
      },
      {
        title: "Wholesale & B2B Portal",
        description: "Tiered wholesale pricing, customer credit management, and bulk invoice workflows.",
      },
      {
        title: "Logistics & Dispatch Manifest",
        description: "Route-optimized picking lists and dispatch manifests with live driver handover confirmations.",
      },
    ],
    demoStats: [
      { label: "Scalability", value: "Multi-Warehouse" },
      { label: "Integration", value: "ERP / Accounting" },
      { label: "Architecture", value: "Event-driven" },
    ],
  },
];

export default function FeaturedProductsList() {
  const [activeModalProduct, setActiveModalProduct] = useState<FeaturedProduct | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Close modal on escape key and lock all background scrolling (including Lenis)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalProduct(null);
      }
    };

    if (activeModalProduct) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.stop();
      }
      setIsPlaying(true);
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.start();
      }
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.start();
      }
    };
  }, [activeModalProduct]);

  const handleLaunchAIDemo = (product: FeaturedProduct) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-awora-ai", {
          detail: {
            initialMessage: `Hi Awora, can you walk me through an interactive walkthrough and technical demo of ${product.headline} (${product.number})?`,
          },
        })
      );
      setActiveModalProduct(null);
    }
  };

  return (
    <>
      <section
        id="featured-products"
        className="py-20 lg:py-28 bg-paper dark:bg-[#07090E] border-t border-ink/5 dark:border-white/10 relative scroll-mt-20"
      >
        <div className="container-content">
          {/* Section Header */}
          <Reveal className="max-w-3xl mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 text-azure dark:text-cyan-400 text-xs font-mono font-bold tracking-[0.25em] uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              FEATURED PRODUCTS
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink dark:text-white leading-[1.12] tracking-tight">
              See what we&apos;ve built.
            </h2>

            <p className="mt-4 text-base sm:text-lg text-ink/70 dark:text-white/70 leading-relaxed max-w-2xl">
              Real products. Real systems. Built by NADSCA to solve real business challenges.
            </p>
          </Reveal>

          {/* 4 Featured Products 2x2 Grid with Video Thumbnails */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {FEATURED_PRODUCTS.map((prod, idx) => {
              const Icon = prod.icon;
              return (
                <Reveal key={prod.id} delay={(idx % 2) * 0.08}>
                  <SpotlightCard
                    accent={prod.accent}
                    className="h-full rounded-3xl border border-ink/8 dark:border-white/10 bg-white dark:bg-[#0D1118] hover:border-cyan-400/40 transition-all duration-300 overflow-hidden flex flex-col group shadow-md hover:shadow-2xl"
                  >
                    {/* VIDEO / DASHBOARD THUMBNAIL TOP CONTAINER */}
                    <div
                      onClick={() => setActiveModalProduct(prod)}
                      className={`relative h-52 sm:h-60 w-full overflow-hidden bg-gradient-to-br ${prod.thumbnailGradient} cursor-pointer border-b border-ink/8 dark:border-white/10`}
                    >
                      {/* Real Video Thumbnail Image if available */}
                      {prod.thumbnailImage ? (
                        <>
                          <Image
                            src={prod.thumbnailImage}
                            alt={prod.headline}
                            fill
                            className="object-cover object-top opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
                        </>
                      ) : prod.videoUrl ? (
                        <video
                          src={`${prod.videoUrl}#t=2`}
                          muted
                          playsInline
                          preload="metadata"
                          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500"
                        />
                      ) : null}

                      {/* Ambient Radial Glow */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(14,165,233,0.25),transparent_70%)] pointer-events-none" />

                      {/* Tech Grid Lines */}
                      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:1.75rem_1.75rem]" />

                      {/* Top Badges (Category & Video Duration) */}
                      <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/70 border border-white/15 text-[11px] font-mono font-bold text-cyan-400 backdrop-blur-md">
                          <Icon className="w-3 h-3 text-cyan-400" />
                          <span>{prod.categoryTag}</span>
                        </div>

                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/70 border border-white/15 text-[11px] font-mono font-medium text-white/90 backdrop-blur-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>{prod.videoDuration}</span>
                        </div>
                      </div>

                      {/* Mockup Interactive Dashboard Visual */}
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        {/* Central Play Button */}
                        <div className="relative z-10 flex flex-col items-center">
                          <div className="w-16 h-16 rounded-full bg-cyan-400/20 border-2 border-cyan-400/70 backdrop-blur-md flex items-center justify-center text-cyan-300 shadow-[0_0_35px_rgba(14,165,233,0.45)] group-hover:scale-110 group-hover:bg-cyan-400 group-hover:text-slate-950 group-hover:border-cyan-300 transition-all duration-300">
                            <Play className="w-6 h-6 fill-current ml-1" />
                          </div>
                          <span className="mt-2 text-xs font-mono font-bold text-white/90 uppercase tracking-widest drop-shadow group-hover:text-cyan-300 transition-colors">
                            Watch Video Demo
                          </span>
                        </div>
                      </div>

                      {/* Bottom Thumbnail Telemetry Pill */}
                      <div className="absolute bottom-3 inset-x-4 flex items-center justify-between text-xs text-white/60 font-mono z-10 pointer-events-none">
                        <span className="px-2.5 py-0.5 rounded bg-black/40 backdrop-blur-sm border border-white/10 text-[10px]">
                          {prod.mockupContent.highlightPill}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm border border-white/10 text-[10px] text-cyan-400 font-bold">
                          HD 1080P
                        </span>
                      </div>
                    </div>

                    {/* CARD CONTENT BODY */}
                    <div className="p-7 sm:p-9 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Number badge */}
                        <div className="font-mono text-sm sm:text-base font-bold text-azure dark:text-cyan-400 tracking-wider mb-2.5">
                          {prod.number}
                        </div>

                        {/* Headline */}
                        <h3 className="font-display text-2xl sm:text-[26px] font-extrabold text-ink dark:text-white tracking-tight leading-snug mb-3">
                          {prod.headline}
                        </h3>

                        {/* Description */}
                        <p className="text-ink/70 dark:text-white/75 text-[15px] leading-relaxed mb-6">
                          {prod.description}
                        </p>
                      </div>

                      {/* Bottom Action Area */}
                      <div className="pt-6 border-t border-ink/8 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                        <button
                          type="button"
                          onClick={() => setActiveModalProduct(prod)}
                          className="group/btn inline-flex items-center gap-2 font-bold text-[15px] sm:text-base text-ink dark:text-white hover:text-azure dark:hover:text-cyan-400 transition-colors"
                        >
                          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-cyan-400/15 text-cyan-500 dark:text-cyan-400 group-hover/btn:bg-cyan-400 group-hover/btn:text-slate-950 transition-all">
                            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                          </span>
                          <span>Watch Demo</span>
                          <span className="transition-transform duration-300 group-hover/btn:translate-x-1 font-mono text-lg">
                            →
                          </span>
                        </button>

                        <Link
                          href={`/products#${prod.slug}`}
                          className="text-xs font-mono font-medium text-ink/40 dark:text-white/40 hover:text-ink dark:hover:text-white transition-colors"
                        >
                          View Full Specs
                        </Link>
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Demo Video Player Modal */}
      {activeModalProduct && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/90 backdrop-blur-xl transition-all duration-300 animate-in fade-in overscroll-contain"
          onClick={() => setActiveModalProduct(null)}
          onWheel={(e) => e.stopPropagation()}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl sm:rounded-3xl bg-[#0B0F17] border border-white/20 text-white p-5 sm:p-6 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-auto overscroll-contain"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Top Radial Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-cyan-500/15 blur-3xl pointer-events-none" />

            {/* Modal Header */}
            <div className="flex items-center justify-between gap-4 pb-3 sm:pb-4 border-b border-white/10 relative z-10 shrink-0">
              <div>
                <span className="font-mono text-[11px] font-bold text-cyan-400 tracking-wider uppercase mb-0.5 block">
                  {activeModalProduct.number} &middot; VIDEO DEMO
                </span>
                <h3 className="font-display text-lg sm:text-xl md:text-2xl font-extrabold text-white tracking-tight">
                  {activeModalProduct.headline}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalProduct(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors shrink-0"
                aria-label="Close demo modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-4 overflow-y-auto space-y-4 relative z-10 pr-1">
              {/* VIDEO PLAYER SCREEN */}
              {activeModalProduct.videoUrl ? (
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-black border border-white/15 aspect-video max-h-[46vh] w-full mx-auto shadow-xl flex items-center justify-center">
                  <video
                    src={activeModalProduct.videoUrl}
                    poster={activeModalProduct.thumbnailImage}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain bg-black"
                  />
                </div>
              ) : (
                /* VIDEO PLAYER SCREEN SIMULATOR */
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950 border border-white/15 aspect-video max-h-[46vh] w-full mx-auto flex flex-col justify-between shadow-xl group/player">
                  {/* Background visualizer */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${activeModalProduct.thumbnailGradient} opacity-90`}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.2),transparent_70%)]" />
                  <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:2rem_2rem]" />

                  {/* Top Video Overlay Bar */}
                  <div className="relative z-10 p-4 flex items-center justify-between text-xs font-mono bg-gradient-to-b from-black/80 to-transparent">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-bold text-white">LIVE DEMO STREAM</span>
                      <span className="text-white/40">&middot;</span>
                      <span className="text-cyan-400">{activeModalProduct.title}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-white/10 text-white/80 font-bold">1080P 60FPS</span>
                  </div>

                  {/* Center Big Play / Walkthrough Trigger */}
                  <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-20 h-20 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-[0_0_40px_rgba(14,165,233,0.6)] hover:scale-110 active:scale-95 transition-all duration-300"
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8 fill-current" />
                      ) : (
                        <Play className="w-8 h-8 fill-current ml-1" />
                      )}
                    </button>
                    <p className="mt-4 text-sm font-medium text-white/90 max-w-md">
                      {isPlaying
                        ? "Demo walkthrough active. Reviewing system architecture and modules."
                        : "Walkthrough paused. Click to resume video stream."}
                    </p>
                  </div>

                  {/* Bottom Video Controls Bar */}
                  <div className="relative z-10 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent space-y-2">
                    {/* Progress bar */}
                    <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden relative cursor-pointer">
                      <div className="absolute left-0 top-0 bottom-0 w-2/5 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full" />
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono text-white/70 pt-1">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="text-white hover:text-cyan-400 transition-colors"
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <Volume2 className="w-4 h-4 text-white/60" />
                        <span>01:28 / {activeModalProduct.videoDuration}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-cyan-400 font-bold">{activeModalProduct.categoryTag}</span>
                        <Maximize2 className="w-4 h-4 text-white/60" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Product Description */}
              <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                {activeModalProduct.description}
              </p>

              {/* Key System Highlights */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-3 flex items-center gap-2">
                  <MonitorPlay className="w-4 h-4" />
                  Key System Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {activeModalProduct.demoHighlights.map((hl) => (
                    <div
                      key={hl.title}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/6 hover:border-white/15 transition-colors"
                    >
                      <div className="flex items-center gap-2 font-bold text-sm text-white mb-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{hl.title}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-white/65 leading-relaxed pl-6">
                        {hl.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer / CTAs */}
            <div className="pt-3.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 relative z-10 shrink-0">
              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                <Magnetic>
                  <Link
                    href={`/contact?product=${activeModalProduct.slug}&type=demo`}
                    onClick={() => setActiveModalProduct(null)}
                    className="inline-flex items-center gap-2 rounded-full bg-white text-slate-950 font-bold px-5 py-2.5 text-xs sm:text-sm shadow-md hover:bg-slate-100 transition-all"
                  >
                    <span>Schedule Live Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Magnetic>

                <Magnetic>
                  <button
                    type="button"
                    onClick={() => handleLaunchAIDemo(activeModalProduct)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] text-white px-4 py-2.5 text-xs sm:text-sm font-semibold hover:border-cyan-400/40 hover:bg-white/[0.1] transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Explore with Awora AI</span>
                  </button>
                </Magnetic>
              </div>

              <Link
                href={`/products#${activeModalProduct.slug}`}
                onClick={() => setActiveModalProduct(null)}
                className="text-xs sm:text-sm font-semibold text-cyan-400 hover:underline flex items-center gap-1.5"
              >
                <span>View Full Architecture Specs</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
