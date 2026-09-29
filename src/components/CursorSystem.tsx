"use client";

import React, { useEffect, useState } from "react";

export default function CursorSystem() {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === "undefined") return;

    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasPointer || prefersReducedMotion) {
      return;
    }

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest<HTMLElement>("[data-cursor]");
      if (cursorTarget) {
        setIsHovered(true);
        const mode = cursorTarget.getAttribute("data-cursor");
        if (mode === "view") setCursorText("VIEW");
        else if (mode === "ask") setCursorText("ASK");
        else setCursorText("");
        return;
      }

      const interactive = target.closest("a, button, input, [role='button']");
      if (interactive) {
        setIsHovered(true);
        setCursorText("");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  if (!enabled || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden lg:block">
      {/* Smooth outer ring / pill */}
      <div
        className={`fixed top-0 left-0 rounded-full transition-transform duration-150 ease-out flex items-center justify-center font-mono font-bold tracking-widest text-[9px] uppercase ${
          cursorText
            ? "w-14 h-14 bg-cyan-400 text-black shadow-[0_0_25px_rgba(34,211,238,0.5)] -translate-x-1/2 -translate-y-1/2"
            : isHovered
            ? "w-10 h-10 border border-cyan-400/80 bg-cyan-400/10 backdrop-blur-xs -translate-x-1/2 -translate-y-1/2"
            : "w-2.5 h-2.5 bg-white -translate-x-1/2 -translate-y-1/2"
        }`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        {cursorText}
      </div>
    </div>
  );
}
