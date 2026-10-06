import { ReactElement, useId } from "react";

export interface BacklightProps {
  children?: ReactElement;
  className?: string;
  blur?: number;
}

export function Backlight({ blur = 24, children, className }: BacklightProps) {
  const id = useId();
  // Sanitize React 18+ useId colons for safe cross-browser SVG ID reference
  const filterId = `backlight-${id.replace(/[^a-zA-Z0-9-_]/g, "")}`;

  return (
    <div className={className}>
      <svg width="0" height="0" className="absolute -z-10 opacity-0 pointer-events-none" aria-hidden="true">
        <filter id={filterId} y="-40%" x="-40%" width="180%" height="180%">
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={blur}
            result="blurred"
          />
          {/* Subtle natural color saturation (1.1x instead of hyper-saturated 4x) for a calm, realistic ambient glow */}
          <feColorMatrix
            type="saturate"
            in="blurred"
            values="1.15"
          />
          <feComposite in="SourceGraphic" operator="over" />
        </filter>
      </svg>

      <div style={{ filter: `url(#${filterId})` }}>{children}</div>
    </div>
  );
}
