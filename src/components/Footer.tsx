"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FOOTER_SERVICES, FOOTER_COMPANY } from "@/lib/nav";
import NatleLogo from "./NatleLogo";
import Magnetic from "./Magnetic";
import { ArrowUpRight, Mail, Phone, MapPin, Check } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>Enterprise Architecture</span> <span className="text-white/20">•</span>
    <span>Distributed Systems</span> <span className="text-white/20">•</span>
    <span>Applied AI & Machine Learning</span> <span className="text-white/20">•</span>
    <span>Cloud & DevOps Automation</span> <span className="text-white/20">•</span>
    <span>Custom Software Engineering</span> <span className="text-white/20">•</span>
  </div>
);

export default function Footer() {
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const directoryRef = useRef<HTMLDivElement>(null);
  const landscapeRef = useRef<HTMLDivElement>(null);

  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (typeof window === "undefined" || !wrapperRef.current) return;

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    const ctx = gsap.context(() => {
      if (window.innerWidth >= 1024) {
        if (giantTextRef.current) {
          gsap.fromTo(
            giantTextRef.current,
            { y: 60, opacity: 0.2 },
            {
              y: 0,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top 95%",
                end: "bottom bottom",
                scrub: 1.2,
              },
            }
          );
        }
        if (directoryRef.current) {
          gsap.fromTo(
            directoryRef.current,
            { y: 25 },
            {
              y: 0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top 95%",
                end: "bottom bottom",
                scrub: 1,
              },
            }
          );
        }
        if (landscapeRef.current) {
          gsap.fromTo(
            landscapeRef.current,
            { y: 30 },
            {
              y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top 95%",
                end: "bottom bottom",
                scrub: 1,
              },
            }
          );
        }
      }
    }, wrapperRef);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [pathname]);

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
    }, 4000);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative min-h-screen lg:h-screen w-full"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <footer
        ref={footerRef}
        className="relative lg:fixed bottom-0 left-0 flex min-h-screen lg:h-screen w-full flex-col justify-between overflow-hidden bg-black text-white"
      >
        {/* 1. ARTWORK MURAL & AMBIENT AURORA */}
        <div
          ref={landscapeRef}
          className="absolute inset-x-0 bottom-0 h-[65%] pointer-events-none overflow-hidden select-none z-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/footer-landscape-dark.jpg"
            alt="AI Data Neural Network Map"
            className="w-full h-full object-cover object-top opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-transparent" />
        </div>

        <div className="absolute left-1/2 top-1/3 h-[450px] w-[850px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_50%_50%,rgba(30,127,232,0.12)_0%,rgba(18,184,166,0.06)_40%,transparent_70%)] rounded-full blur-[120px] pointer-events-none z-0" />

        {/* 2. GIANT NATLE WATERMARK */}
        <div className="absolute inset-x-0 bottom-12 sm:bottom-16 lg:bottom-20 z-[1] flex justify-center pointer-events-none overflow-hidden">
          <div
            ref={giantTextRef}
            className="whitespace-nowrap text-[18vw] sm:text-[20vw] lg:text-[22vw] tracking-[0.12em] font-black leading-none text-center select-none"
            style={{
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.07)",
            }}
            aria-hidden="true"
          >
            NATLE
          </div>
        </div>

        {/* 3. MARQUEE STRIP (Placed directly below Navbar on scroll) */}
        <div className="relative lg:absolute top-0 lg:top-[68px] left-0 w-full overflow-hidden border-y border-white/5 bg-black/75 backdrop-blur-xl py-2.5 z-20 shadow-xs">
          <div className="flex w-max animate-marquee-fast text-[11px] font-mono font-semibold tracking-[0.3em] text-white/50 uppercase">
            <MarqueeItem />
            <MarqueeItem />
            <MarqueeItem />
          </div>
        </div>

        {/* 4. DIRECTORY GRID */}
        <div
          ref={directoryRef}
          className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 sm:pt-32 lg:pt-36 pb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start pb-10 border-b border-white/10">
            {/* Column 1: Brand & Contact Info (lg:col-span-4) */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full">
              <div>
                <div className="inline-block mb-4">
                  <NatleLogo className="h-8 w-auto" showTagline={false} />
                </div>
                <p className="text-white/65 text-xs sm:text-sm leading-relaxed max-w-sm mb-6">
                  Empowering ambitious founders and enterprise teams with scalable, production-ready software systems, high-velocity cloud architecture, and production AI.
                </p>
              </div>

              <div className="space-y-2.5 text-xs font-mono text-white/70">
                <a
                  href="mailto:info@natle.dev"
                  className="flex items-center gap-2.5 hover:text-cyan-400 transition-colors group"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="group-hover:translate-x-0.5 transition-transform">info@natle.dev</span>
                </a>

                <div className="flex flex-wrap items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <a href="tel:+94112507601" className="hover:text-cyan-400 transition-colors">
                    +94 11 250 7601
                  </a>
                  <span className="text-white/30">•</span>
                  <a href="tel:+94704659847" className="hover:text-cyan-400 transition-colors">
                    +94 70 465 9847
                  </a>
                </div>

                <div className="flex items-start gap-2.5 text-white/50 text-[11px] pt-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>No. 283 1/1, Ruwan Mawatha, Colombo 05, Sri Lanka</span>
                </div>
              </div>
            </div>

            {/* Column 2: Capabilities (lg:col-span-3) */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-white/50 mb-4">
                Capabilities
              </h4>
              <ul className="space-y-2.5">
                {FOOTER_SERVICES.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-xs sm:text-sm text-white/70 hover:text-cyan-400 transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="text-cyan-400 text-xs opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                        »
                      </span>
                      <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Studio (lg:col-span-2) */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-white/50 mb-4">
                Studio
              </h4>
              <ul className="space-y-2.5">
                {FOOTER_COMPANY.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-xs sm:text-sm text-white/70 hover:text-cyan-400 transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="text-cyan-400 text-xs opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                        »
                      </span>
                      <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Newsletter (lg:col-span-3) */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-white/50 mb-4">
                The Letter
              </h4>
              <p className="text-white/60 text-xs leading-relaxed mb-4">
                Monthly technical briefings on AI systems, scalable infrastructure, and product engineering.
              </p>

              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <div className="flex items-center rounded-xl bg-white/[0.05] border border-white/10 p-1 focus-within:border-cyan-400/50 transition-colors">
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
                  Zero spam. Unsubscribe anytime.
                </span>
              </form>
            </div>
          </div>
        </div>

        {/* 5. BOTTOM COPYRIGHT BAR (Engineered to prevent overlap with floating AI button) */}
        <div className="relative z-20 w-full py-4 px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 bg-black/80 backdrop-blur-md">
          {/* Left: Copyright & System Status */}
          <div className="flex items-center gap-3 order-2 sm:order-1">
            <span className="text-white/40 text-[11px] font-mono tracking-wider uppercase">
              © {new Date().getFullYear()} NATLE STUDIO. ALL RIGHTS RESERVED.
            </span>
            <span className="text-white/20 hidden md:inline">•</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEMS 100% OPERATIONAL
            </span>
          </div>

          {/* Center / Right: Legal Links (With right padding so it never collides with floating AI button) */}
          <div className="order-1 sm:order-2 flex items-center gap-6 text-white/40 text-[11px] font-mono uppercase tracking-wider pr-0 sm:pr-36">
            <Link href="/about" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>

          {/* Scroll to Top Magnetic Button */}
          <div className="hidden sm:block absolute right-6 sm:right-32 top-1/2 -translate-y-1/2">
            <Magnetic>
              <button
                onClick={scrollToTop}
                className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all group shadow-sm"
                aria-label="Scroll to top"
              >
                <svg
                  className="w-3.5 h-3.5 transform group-hover:-translate-y-0.5 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </Magnetic>
          </div>
        </div>
      </footer>
    </div>
  );
}
