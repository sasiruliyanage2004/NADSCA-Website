"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
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
import { Backlight } from "@/registry/magicui/backlight";

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

  const videoStructuredData = FEATURED_PRODUCTS.filter((p) => p.videoUrl).map((p) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `${p.title} — ${p.headline}`,
    description: p.description,
    thumbnailUrl: p.thumbnailImage ? `https://nadsca.dev${p.thumbnailImage}` : "https://nadsca.dev/og-image.png",
    uploadDate: "2026-10-01T00:00:00Z",
    duration: p.slug === "ohrms" ? "PT1M50S" : "PT2M00S",
    contentUrl: `https://nadsca.dev${p.videoUrl}`,
  }));

  return (
    <>
      {/* VideoObject Structured Data for Googlebot & Video Search Indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }}
      />
      <section
        id="featured-products"
        className="py-20 lg:py-28 bg-paper dark:bg-[#07090E] border-t border-ink/5 dark:border-white/10 relative scroll-mt-20"
      >
        <div className="container-content">
          {/* Section Header */}
          <Reveal className="max-w-3xl mb-12 lg:mb-16">
            <p className="text-azure dark:text-azure-light font-semibold text-sm mb-3">
              Featured Products
            </p>

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
                    className="h-full rounded-[28px] border border-ink/8 dark:border-white/[0.08] bg-white dark:bg-[#0B0F17] hover:border-ink/20 dark:hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col group shadow-sm hover:shadow-card"
                  >
                    {/* VIDEO / DASHBOARD THUMBNAIL CONTAINER */}
                    <div
                      onClick={() => setActiveModalProduct(prod)}
                      className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-950 cursor-pointer border-b border-ink/8 dark:border-white/10 group/preview"
                    >
                      {/* Real Video Thumbnail Image if available */}
                      {prod.thumbnailImage ? (
                        <>
                          <Image
                            src={prod.thumbnailImage}
                            alt={prod.headline}
                            fill
                            className="object-cover object-top opacity-90 group-hover/preview:opacity-100 group-hover:scale-[1.02] transition-all duration-700 relative z-[1]"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent z-[2]" />
                        </>
                      ) : prod.videoUrl ? (
                        <>
                          <video
                            src={`${prod.videoUrl}#t=2`}
                            muted
                            playsInline
                            preload="metadata"
                            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover/preview:opacity-95 group-hover:scale-[1.02] transition-all duration-700 relative z-[1]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent z-[2]" />
                        </>
                      ) : null}

                      {/* Subtle Vignette Overlay */}
                      <div className="absolute inset-0 bg-black/20 group-hover/preview:bg-black/10 transition-colors z-[2]" />

                      {/* Top-Left Category Tag */}
                      <div className="absolute top-4 left-4 z-[4] pointer-events-none">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-medium text-white/90 shadow-sm">
                          <Icon className="w-3.5 h-3.5 text-white/70" />
                          <span>{prod.categoryTag}</span>
                        </span>
                      </div>

                      {/* Bottom-Right Video Duration Badge */}
                      <div className="absolute bottom-4 right-4 z-[4] pointer-events-none">
                        <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white/80 shadow-sm">
                          {prod.videoDuration}
                        </span>
                      </div>

                      {/* Bottom-Left Highlight Pill */}
                      <div className="absolute bottom-4 left-4 z-[4] pointer-events-none">
                        <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-white/70">
                          {prod.mockupContent.highlightPill}
                        </span>
                      </div>

                      {/* Sleek Centered Glassmorphic Play Pill */}
                      <div className="absolute inset-0 flex items-center justify-center p-6 z-[4]">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 dark:bg-black/65 text-ink dark:text-white border border-black/10 dark:border-white/20 backdrop-blur-md group-hover:scale-105 transition-all duration-300 shadow-md">
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                          <span className="text-xs font-semibold tracking-wide">
                            Watch Demo
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* CARD CONTENT BODY */}
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Number Index */}
                        <div className="text-xs font-mono font-medium text-azure dark:text-azure-light tracking-wider uppercase mb-2">
                          {prod.number}
                        </div>

                        {/* Headline */}
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-ink dark:text-white tracking-tight leading-snug mb-3">
                          {prod.headline}
                        </h3>

                        {/* Description */}
                        <p className="text-ink/70 dark:text-white/70 text-sm sm:text-[15px] leading-relaxed mb-6">
                          {prod.description}
                        </p>

                        {/* Key Performance Metrics */}
                        <div className="grid grid-cols-2 gap-3 py-3 px-4 rounded-2xl bg-ink/[0.02] dark:bg-white/[0.02] border border-ink/5 dark:border-white/5 mb-6">
                          <div>
                            <div className="font-display font-bold text-base sm:text-lg text-ink dark:text-white">
                              {prod.mockupContent.stat1}
                            </div>
                            <div className="text-[11px] text-ink/50 dark:text-white/50 truncate">
                              {prod.mockupContent.stat1Label}
                            </div>
                          </div>
                          <div>
                            <div className="font-display font-bold text-base sm:text-lg text-ink dark:text-white">
                              {prod.mockupContent.stat2}
                            </div>
                            <div className="text-[11px] text-ink/50 dark:text-white/50 truncate">
                              {prod.mockupContent.stat2Label}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Action Area */}
                      <div className="pt-5 border-t border-ink/8 dark:border-white/10 flex items-center justify-between gap-4">
                        <button
                          type="button"
                          onClick={() => setActiveModalProduct(prod)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink text-white dark:bg-white dark:text-black font-semibold text-xs tracking-wide hover:opacity-90 transition-opacity"
                        >
                          <Play className="w-3 h-3 fill-current ml-0.5" />
                          <span>Watch Demo</span>
                        </button>

                        <Link
                          href={`/products#${prod.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-medium text-ink/60 dark:text-white/60 hover:text-azure dark:hover:text-azure-light transition-colors group/link"
                        >
                          <span>Full Specs</span>
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
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
            className="relative w-full max-w-3xl rounded-2xl sm:rounded-3xl bg-[#0B0F17] border border-white/15 text-white p-5 sm:p-6 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-auto overscroll-contain"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-4 pb-3 sm:pb-4 border-b border-white/10 relative z-10 shrink-0">
              <div>
                <span className="font-mono text-[11px] font-semibold text-azure-light tracking-wider uppercase mb-0.5 block">
                  {activeModalProduct.number} &middot; VIDEO DEMO
                </span>
                <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">
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
                <div className="relative rounded-2xl overflow-hidden bg-black border border-white/15 aspect-video max-h-[46vh] w-full mx-auto shadow-2xl flex items-center justify-center my-2">
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
                <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-white/10 aspect-video max-h-[46vh] w-full mx-auto flex flex-col justify-between shadow-xl group/player my-2">
                  {/* Background visualizer */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${activeModalProduct.thumbnailGradient} opacity-80`}
                  />
                  <div className="absolute inset-0 bg-black/40" />

                  {/* Top Video Overlay Bar */}
                  <div className="relative z-10 p-4 flex items-center justify-between text-xs font-mono bg-gradient-to-b from-black/80 to-transparent">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="font-semibold text-white">INTERACTIVE DEMO</span>
                      <span className="text-white/40">&middot;</span>
                      <span className="text-white/80">{activeModalProduct.title}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-white/10 text-white/70 font-medium">1080P</span>
                  </div>

                  {/* Center Big Play / Walkthrough Trigger */}
                  <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-16 h-16 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 fill-current" />
                      ) : (
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      )}
                    </button>
                    <p className="mt-4 text-xs sm:text-sm font-medium text-white/80 max-w-md">
                      {isPlaying
                        ? "Demo walkthrough active. Reviewing system architecture."
                        : "Click to preview interactive stream."}
                    </p>
                  </div>

                  {/* Bottom Video Controls Bar */}
                  <div className="relative z-10 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent space-y-2">
                    {/* Progress bar */}
                    <div className="w-full h-1 rounded-full bg-white/20 overflow-hidden relative cursor-pointer">
                      <div className="absolute left-0 top-0 bottom-0 w-2/5 bg-white/80 rounded-full" />
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono text-white/70 pt-1">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="text-white hover:text-white/80 transition-colors"
                        >
                          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        </button>
                        <Volume2 className="w-3.5 h-3.5 text-white/60" />
                        <span>01:28 / {activeModalProduct.videoDuration}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-white/70">{activeModalProduct.categoryTag}</span>
                        <Maximize2 className="w-3.5 h-3.5 text-white/60" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Product Description */}
              <p className="text-white/75 text-sm sm:text-base leading-relaxed">
                {activeModalProduct.description}
              </p>

              {/* Key System Highlights */}
              <div>
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-white/60 mb-3 flex items-center gap-2">
                  <MonitorPlay className="w-4 h-4 text-azure-light" />
                  Key System Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {activeModalProduct.demoHighlights.map((hl) => (
                    <div
                      key={hl.title}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/6 hover:border-white/12 transition-colors"
                    >
                      <div className="flex items-center gap-2 font-semibold text-sm text-white mb-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{hl.title}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-white/60 leading-relaxed pl-6">
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
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] text-white px-4 py-2.5 text-xs sm:text-sm font-semibold hover:border-white/30 hover:bg-white/[0.08] transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-azure-light" />
                    <span>Explore with Awora AI</span>
                  </button>
                </Magnetic>
              </div>

              <Link
                href={`/products#${activeModalProduct.slug}`}
                onClick={() => setActiveModalProduct(null)}
                className="text-xs sm:text-sm font-medium text-white/70 hover:text-white hover:underline flex items-center gap-1.5 transition-colors"
              >
                <span>View Architecture Specs</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
