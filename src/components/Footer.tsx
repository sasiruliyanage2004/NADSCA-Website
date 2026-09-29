"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FOOTER_SERVICES, FOOTER_COMPANY } from "@/lib/nav";
import NatleLogo from "./NatleLogo";
import Magnetic from "./Magnetic";
import FooterNetworkCanvas from "./FooterNetworkCanvas";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Check,
  ChevronUp,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const pathname = usePathname();
  const footerContainerRef = useRef<HTMLElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const ctaBlockRef = useRef<HTMLDivElement>(null);
  const directoryRef = useRef<HTMLDivElement>(null);

  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // GSAP Parallax & Progressive Reveal
  useEffect(() => {
    if (typeof window === "undefined" || !footerContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax upward float for giant NATLE wordmark
      if (giantTextRef.current) {
        gsap.fromTo(
          giantTextRef.current,
          { y: 80, opacity: 0.3 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerContainerRef.current,
              start: "top 85%",
              end: "bottom bottom",
              scrub: 1.5,
            },
          }
        );
      }

      // Smooth entrance for final CTA
      if (ctaBlockRef.current) {
        gsap.fromTo(
          ctaBlockRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaBlockRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Smooth entrance for directory grid
      if (directoryRef.current) {
        gsap.fromTo(
          directoryRef.current,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: directoryRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, footerContainerRef);

    return () => ctx.revert();
  }, [pathname]);

  // Mouse move handler for luxury light sweep across the giant wordmark
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!footerContainerRef.current) return;
    const rect = footerContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 4500);
  };

  const triggerAI = (promptText?: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-natle-ai", {
          detail: {
            prompt: promptText || "I'd like to discuss an engineering engagement with NATLE.",
          },
        })
      );
    }
  };

  return (
    <footer
      ref={footerContainerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full bg-black text-white overflow-hidden border-t border-white/10 select-none"
    >
      {/* ─── BACKGROUND LAYER: AMBIENT NETWORK & ATMOSPHERE ─── */}
      <FooterNetworkCanvas />

      {/* Atmospheric radial glows */}
      <div className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-azure/15 via-teal/8 to-transparent rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute right-0 bottom-0 w-[500px] h-[400px] bg-gradient-to-tl from-cyan-500/10 via-transparent to-transparent rounded-full blur-[120px] pointer-events-none z-0" />

      {/* ─── MIDGROUND LAYER: GIANT NATLE WORDMARK WITH LIGHT SWEEP ─── */}
      <div className="absolute inset-x-0 bottom-16 sm:bottom-20 lg:bottom-24 z-[1] flex justify-center pointer-events-none overflow-hidden">
        <div
          ref={giantTextRef}
          className="whitespace-nowrap text-[20vw] font-black tracking-[0.14em] leading-none text-center select-none transition-transform duration-300"
          style={{
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.08)",
            backgroundImage: `radial-gradient(circle 350px at ${mousePos.x}% ${mousePos.y}%, rgba(34, 211, 238, 0.25), transparent 70%)`,
            WebkitBackgroundClip: "text",
          }}
          aria-hidden="true"
        >
          NATLE
        </div>
      </div>

      {/* ─── FOREGROUND CONTENT LAYER ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-20 sm:pt-28 pb-12">
        {/* STAGE 00: TECHNICAL TOP DIVIDER */}
        <div className="flex items-center justify-between pb-8 mb-16 border-b border-white/10 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-white/40 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>SYS // CORE 01</span>
          </div>
          <span className="hidden sm:inline">NATLE ARCHITECTURAL STUDIO</span>
          <span className="text-white/60">DISCOVERY // 2026</span>
        </div>

        {/* STAGE 01: FINAL CALL TO ACTION (CTA) */}
        <div ref={ctaBlockRef} className="mb-24 sm:mb-32">
          <div className="max-w-4xl">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-cyan-400 font-semibold block mb-4">
              READY TO SCALE
            </span>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.02] mb-6">
              LET&apos;S BUILD WHAT&apos;S NEXT.
            </h2>
            <p className="text-base sm:text-xl text-white/70 max-w-2xl leading-relaxed font-normal mb-10">
              Have an ambitious product, complex engineering challenge, or transformation initiative? Let&apos;s talk.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Magnetic>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-white text-black px-8 py-4 text-[15px] font-bold shadow-[0_0_35px_rgba(255,255,255,0.25)] hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                  data-cursor="view"
                >
                  <span>Start a project</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Magnetic>

              <Magnetic>
                <button
                  onClick={() => triggerAI()}
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] text-white px-7 py-3.5 text-[15px] font-medium hover:border-cyan-400/40 hover:bg-white/[0.08] backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                  data-cursor="ask"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Ask NATLE AI</span>
                </button>
              </Magnetic>

              <span className="text-xs font-mono text-white/40 pl-2 hidden md:inline">
                Not sure where to start? Click to consult our AI guide.
              </span>
            </div>
          </div>
        </div>

        {/* STAGE 02: MAIN FOOTER DIRECTORY (Asymmetric Editorial Grid) */}
        <div ref={directoryRef} className="pt-16 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-14 items-start pb-16">
            {/* Left Brand Section (Dominant: lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-8">
              <div>
                <Link href="/" className="inline-block mb-4 outline-none group">
                  <NatleLogo className="h-8 w-auto transition-transform duration-300 group-hover:scale-105" showTagline={false} />
                </Link>
                <p className="text-white/65 text-xs sm:text-sm leading-relaxed max-w-md">
                  Empowering ambitious founders and enterprise teams with scalable, production-ready software systems, high-velocity cloud architecture, and production AI.
                </p>
              </div>

              {/* Technical Contact Information */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/40 block">
                  DIRECT CHANNELS
                </span>

                <div className="space-y-2 text-xs font-mono">
                  <p className="flex items-center gap-2.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <a
                      href="mailto:info@natle.dev"
                      className="text-white/80 hover:text-cyan-300 transition-colors underline-offset-4 hover:underline"
                    >
                      info@natle.dev
                    </a>
                  </p>

                  <p className="flex flex-wrap items-center gap-2 text-white/80">
                    <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <a href="tel:+94112507601" className="hover:text-cyan-300 transition-colors">
                      +94 11 250 7601
                    </a>
                    <span className="text-white/20">•</span>
                    <a href="tel:+94704659847" className="hover:text-cyan-300 transition-colors">
                      +94 70 465 9847
                    </a>
                  </p>

                  <p className="flex items-start gap-2.5 text-white/50 text-[11px] pt-1 leading-snug">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>No. 283 1/1, Ruwan Mawatha, Colombo 05, Sri Lanka</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Column 2: Capabilities (lg:col-span-2) */}
            <div className="lg:col-span-2">
              <h4 className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-white/50 mb-5">
                CAPABILITIES
              </h4>
              <ul className="space-y-3">
                {FOOTER_SERVICES.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-xs sm:text-sm text-white/70 hover:text-cyan-300 transition-all inline-flex items-center gap-1.5 group"
                    >
                      <span className="text-cyan-400 text-xs opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                        »
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Studio (lg:col-span-2) */}
            <div className="lg:col-span-2">
              <h4 className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-white/50 mb-5">
                STUDIO
              </h4>
              <ul className="space-y-3">
                {FOOTER_COMPANY.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-xs sm:text-sm text-white/70 hover:text-cyan-300 transition-all inline-flex items-center gap-1.5 group"
                    >
                      <span className="text-cyan-400 text-xs opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                        »
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Newsletter / "The Letter" (lg:col-span-3) */}
            <div className="lg:col-span-3">
              <h4 className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-white/50 mb-4">
                THE LETTER
              </h4>
              <p className="text-white/60 text-xs leading-relaxed mb-4">
                Monthly technical briefings on AI systems, scalable infrastructure, and product engineering.
              </p>

              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <div className="flex items-center rounded-xl bg-white/[0.04] border border-white/10 p-1 focus-within:border-cyan-400/60 focus-within:bg-white/[0.07] transition-all">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter work email..."
                    required
                    className="w-full px-3 py-2 text-xs font-mono bg-transparent text-white placeholder:text-white/35 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={subscribed}
                    className="px-4 py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-slate-100 transition-all shrink-0 flex items-center gap-1 shadow-sm"
                  >
                    {subscribed ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Joined</span>
                      </>
                    ) : (
                      <span>Join</span>
                    )}
                  </button>
                </div>
                <span className="text-[10px] font-mono text-white/35 block">
                  {subscribed ? "You're on the list. Verification link sent." : "Zero spam. Unsubscribe anytime."}
                </span>
              </form>
            </div>
          </div>
        </div>

        {/* STAGE 04: SYSTEM & LEGAL BAR (Safe zone on right for floating AI button) */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left: Copyright */}
          <div className="text-white/40 text-[11px] font-mono tracking-wider uppercase order-2 sm:order-1 text-center sm:text-left">
            © {new Date().getFullYear()} NATLE STUDIO. ALL RIGHTS RESERVED.
          </div>

          {/* Center: Live Breathing Status */}
          <div className="order-1 sm:order-2 flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-mono text-emerald-400 tracking-wider uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>SYSTEMS 100% OPERATIONAL</span>
          </div>

          {/* Right: Legal & Back to Top (With pr-0 sm:pr-36 safe clearance for floating widget) */}
          <div className="order-3 flex items-center gap-6 text-white/40 text-[11px] font-mono uppercase tracking-wider pr-0 sm:pr-36">
            <Link href="/about" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              Terms of Service
            </Link>

            <Magnetic>
              <button
                onClick={scrollToTop}
                className="w-8 h-8 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all group"
                aria-label="Scroll to top"
              >
                <ChevronUp className="w-3.5 h-3.5 transform group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
}
