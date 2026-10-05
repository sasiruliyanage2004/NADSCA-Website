"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Play, X, Sparkles, CheckCircle2, MonitorPlay } from "lucide-react";
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

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalProduct(null);
      }
    };
    if (activeModalProduct) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
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

          {/* 4 Featured Products 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {FEATURED_PRODUCTS.map((prod, idx) => (
              <Reveal key={prod.id} delay={(idx % 2) * 0.08}>
                <SpotlightCard
                  accent={prod.accent}
                  className="h-full rounded-3xl border border-ink/8 dark:border-white/10 bg-white dark:bg-[#0D1118] hover:border-cyan-400/30 transition-all duration-300"
                >
                  <div className="p-8 sm:p-10 flex flex-col h-full justify-between">
                    <div>
                      {/* Number badge */}
                      <div className="font-mono text-sm sm:text-base font-bold text-azure dark:text-cyan-400 tracking-wider mb-3">
                        {prod.number}
                      </div>

                      {/* Main Title / Headline */}
                      <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-ink dark:text-white tracking-tight leading-snug mb-4">
                        {prod.headline}
                      </h3>

                      {/* Description */}
                      <p className="text-ink/70 dark:text-white/75 text-[15px] sm:text-base leading-relaxed mb-8">
                        {prod.description}
                      </p>
                    </div>

                    {/* Bottom Action Area */}
                    <div className="pt-6 border-t border-ink/8 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => setActiveModalProduct(prod)}
                        className="group inline-flex items-center gap-2.5 font-bold text-[15px] sm:text-base text-ink dark:text-white hover:text-azure dark:hover:text-cyan-400 transition-colors"
                      >
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-cyan-400/10 text-cyan-500 dark:text-cyan-400 group-hover:bg-cyan-400/20 group-hover:scale-110 transition-all">
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </span>
                        <span>Watch Demo</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1 font-mono text-lg">
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
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Walkthrough Modal */}
      {activeModalProduct && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md transition-all duration-300 animate-in fade-in"
          onClick={() => setActiveModalProduct(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl bg-[#0B0F17] border border-white/15 text-white p-6 sm:p-10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-500/15 blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/10 relative z-10 shrink-0">
              <div>
                <span className="font-mono text-xs font-bold text-cyan-400 tracking-wider uppercase mb-1 block">
                  {activeModalProduct.number} &middot; INTERACTIVE DEMO PREVIEW
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {activeModalProduct.headline}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalProduct(null)}
                className="rounded-full p-2 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close demo modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-6 overflow-y-auto space-y-6 relative z-10 pr-2">
              <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                {activeModalProduct.description}
              </p>

              {/* Stats pill row */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/8 text-center">
                {activeModalProduct.demoStats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-xs font-mono text-cyan-400 font-semibold uppercase">
                      {stat.label}
                    </div>
                    <div className="text-sm sm:text-base font-bold text-white mt-0.5">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Demo Capabilities */}
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
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 relative z-10 shrink-0">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <Magnetic>
                  <Link
                    href={`/contact?product=${activeModalProduct.slug}&type=demo`}
                    onClick={() => setActiveModalProduct(null)}
                    className="inline-flex items-center gap-2 rounded-full bg-white text-slate-950 font-bold px-6 py-3 text-sm shadow-md hover:bg-slate-100 transition-all"
                  >
                    <span>Schedule Live Demo</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Magnetic>

                <Magnetic>
                  <button
                    type="button"
                    onClick={() => handleLaunchAIDemo(activeModalProduct)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] text-white px-5 py-3 text-sm font-semibold hover:border-cyan-400/40 hover:bg-white/[0.1] transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-400" />
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
