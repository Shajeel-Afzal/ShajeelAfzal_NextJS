"use client";

import { ComponentPropsWithoutRef, CSSProperties, FC } from "react";
import { cn } from "@/lib/utils";

export interface AnimatedGradientTextProps
  extends ComponentPropsWithoutRef<"span"> {
  speed?: number;
  colorFrom?: string;
  colorTo?: string;
}

export const AnimatedGradientText: FC<AnimatedGradientTextProps> = ({
  children,
  className,
  speed = 1,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  ...props
}) => {
  return (
    <span
      style={
        {
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--bg-size": "300%",
          "--animation-duration": `${8 / speed}s`,
        } as CSSProperties
      }
      className={cn(
        "inline-block bg-gradient-to-r from-[var(--color-from)] via-[var(--color-to)] to-[var(--color-from)]",
        "bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent",
        "animate-gradient bg-gradient-to-r",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};
