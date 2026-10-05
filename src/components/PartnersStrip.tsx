"use client";

import React from "react";
import Image from "next/image";
import Reveal from "./Reveal";

const PARTNERS = [
  {
    name: "Shilpa Advisors",
    logo: "/partners/shilpa-advisors.jpg",
    url: "#",
  },
];

export default function PartnersStrip() {
  return (
    <section className="py-20 lg:py-24 bg-transparent relative overflow-hidden">
      {/* Subtle top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container-content">
        {/* Header */}
        <Reveal className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] text-white/30 uppercase mb-3">
            Trusted Partners
          </p>
          <h2 className="font-display text-2xl md:text-3xl text-white/80 leading-snug">
            Companies we&apos;re proud to work with
          </h2>
        </Reveal>

        {/* Partner logos row */}
        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
            {PARTNERS.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={partner.name}
                className="group relative flex items-center justify-center"
              >
                {/* Glow halo on hover */}
                <span className="absolute inset-0 rounded-2xl bg-white/0 group-hover:bg-white/[0.04] transition-colors duration-500 blur-sm" />

                {/* Logo — grayscale at rest, full color on hover */}
                <div className="relative w-48 h-16 flex items-center justify-center filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 160px, 192px"
                  />
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Subtle bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
