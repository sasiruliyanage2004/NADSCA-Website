"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Reveal({
  children,
  className = "",
  y = 20,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Ensure search crawlers, Googlebot, and reduced-motion users always see content immediately
    const isBot =
      typeof navigator !== "undefined" &&
      /bot|googlebot|crawler|spider|robot|crawling|lighthouse/i.test(
        navigator.userAgent
      );
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isBot || prefersReducedMotion) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          y: y + 4,
          opacity: 0,
          scale: 0.995,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            once: true, // Keep content permanently visible for smooth reading and crawlers
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [y, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
