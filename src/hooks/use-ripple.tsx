"use client";

import { CSSProperties, MouseEvent, useEffect, useState } from "react";

export function useRipple() {
  const [ripples, setRipples] = useState<CSSProperties[]>([]);

  const onClick = (e: MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const left = e.clientX - rect.left;
    const top = e.clientY - rect.top;
    const diameter = Math.max(
      e.currentTarget.clientWidth,
      e.currentTarget.clientHeight
    );

    setRipples((prev) => [
      ...prev,
      {
        top: top - diameter / 2,
        left: left - diameter / 2,
        height: diameter,
        width: diameter,
      },
    ]);
  };

  useEffect(() => {
    const timeout = setTimeout(() => setRipples([]), 1000);
    return () => clearTimeout(timeout);
  }, [ripples.length]);

  return [
    ripples.map((style, i) => (
      <span
        key={i}
        className="ripple"
        style={{
          ...style,
          position: "absolute",
          opacity: "20%",
          transform: "scale(0)",
          animation: "ripple 800ms linear",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 999,
        }}
      />
    )),
    onClick,
  ] as const;
}
