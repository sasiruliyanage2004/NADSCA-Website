import { ReactElement, useId } from "react";

export interface BacklightProps {
  children?: ReactElement;
  className?: string;
  blur?: number;
}

export function Backlight({ blur = 20, children, className }: BacklightProps) {
  const id = useId();
  // Sanitize React 18+ useId colons (e.g., :r1:) for safe SVG ID reference across all browsers
  const filterId = `backlight-${id.replace(/[^a-zA-Z0-9-_]/g, "")}`;

  return (
    <div className={className}>
      <svg width="0" height="0" className="absolute -z-10 opacity-0 pointer-events-none" aria-hidden="true">
        <filter id={filterId} y="-50%" x="-50%" width="200%" height="200%">
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={blur}
            result="blurred"
          />
          <feColorMatrix
            type="saturate"
            in="blurred"
            values="4"
          />
          <feComposite in="SourceGraphic" operator="over" />
        </filter>
      </svg>

      <div style={{ filter: `url(#${filterId})` }}>{children}</div>
    </div>
  );
}
