"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/nav";
import NadscaLogo from "./NadscaLogo";
import Magnetic from "./Magnetic";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Filter links for the main desktop nav
  const desktopLinks = NAV_LINKS.filter(
    (link) => link.href !== "/" && link.href !== "/contact"
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-2xl border-b border-white/[0.08] py-4 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.8)]"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="relative z-[101] flex items-center group outline-none"
            aria-label="NADSCA Home"
          >
            <NadscaLogo showTagline={true} />
          </Link>

          {/* Desktop Navigation Links (Title Case) */}
          <nav className="hidden lg:flex items-center gap-8">
            {desktopLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors hover:text-white py-1 ${
                    isActive ? "text-white font-semibold" : "text-white/65"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4 relative z-[101]">
            <div className="hidden sm:block">
              <Magnetic>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-2.5 text-sm font-bold whitespace-nowrap shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
                >
                  <span>Start a project</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Magnetic>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2.5 rounded-xl border border-white/10 bg-white/[0.04] text-white/80 hover:text-white transition-colors outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Menu */}
      <div
        className={`fixed inset-0 z-[95] bg-black/98 backdrop-blur-3xl transition-all duration-500 lg:hidden flex flex-col justify-between p-8 pt-28 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-6 text-left max-w-sm mx-auto w-full">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-cyan-400">
            NAVIGATION
          </span>
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-display text-3xl font-bold tracking-tight transition-colors flex items-center justify-between ${
                  isActive ? "text-cyan-400" : "text-white/60 hover:text-white"
                }`}
              >
                <span>{link.label}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-cyan-400" />}
              </Link>
            );
          })}
        </nav>

        <div className="max-w-sm mx-auto w-full pt-8 border-t border-white/10 flex flex-col gap-4">
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-8 py-4 text-base font-bold w-full shadow-lg"
          >
            <span>Start a project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <div className="flex items-center justify-between text-xs font-mono text-white/40 pt-1">
            <span>COLOMBO / GLOBAL REMOTE</span>
            <span className="text-emerald-400">STATUS: ONLINE</span>
          </div>
        </div>
      </div>
    </>
  );
}
