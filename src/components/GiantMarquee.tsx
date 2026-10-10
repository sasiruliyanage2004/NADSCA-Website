"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function GiantMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    
    // Duplicate the text to make it infinite
    const clone = textRef.current.cloneNode(true);
    containerRef.current?.appendChild(clone);

    gsap.to(containerRef.current?.children as HTMLCollection, {
      xPercent: -100,
      repeat: -1,
      duration: 24,
      ease: "linear",
    });
  }, []);

  return (
    <div className="relative w-full overflow-hidden flex items-center py-20 bg-black border-y border-white/[0.04]">
      <div 
        ref={containerRef}
        className="flex whitespace-nowrap opacity-[0.08] dark:opacity-[0.10] select-none pointer-events-none"
      >
        <div ref={textRef} className="flex shrink-0 items-center">
          <h2 className="text-[10vw] md:text-[6.5vw] font-display font-bold text-white px-8 uppercase tracking-tighter flex items-center gap-6">
            <span>WE SERVE THE BEST TO BE THE BEST</span>
            <span className="text-azure text-[0.5em]">&bull;</span>
          </h2>
          <h2 className="text-[10vw] md:text-[6.5vw] font-display font-bold text-white px-8 uppercase tracking-tighter flex items-center gap-6">
            <span>WE BUILD SYSTEMS THAT SCALE</span>
            <span className="text-teal text-[0.5em]">&bull;</span>
          </h2>
          <h2 className="text-[10vw] md:text-[6.5vw] font-display font-bold text-white px-8 uppercase tracking-tighter flex items-center gap-6">
            <span>ZERO TECH DEBT</span>
            <span className="text-azure text-[0.5em]">&bull;</span>
          </h2>
          <h2 className="text-[10vw] md:text-[6.5vw] font-display font-bold text-white px-8 uppercase tracking-tighter flex items-center gap-6">
            <span>ENGINEERING EXCELLENCE</span>
            <span className="text-teal text-[0.5em]">&bull;</span>
          </h2>
        </div>
      </div>
    </div>
  );
}
