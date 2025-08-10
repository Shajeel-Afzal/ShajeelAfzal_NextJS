// ## Usage

//   ```tsx
// import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
// ```

//   ```tsx
// <AnimatedGridPattern />
// ```

// ## Props

// ### GridPattern

//   | Prop | Type | Default | Description |
// | ----------------- | -------- | ------- | --------------------------------------------- |
// | `className` | `string` | `-` | Additional classes to be added to the pattern |
// | `width` | `number` | `40` | Width of the pattern |
// | `height` | `number` | `40` | Height of the pattern |
// | `x` | `number` | `-1` | X offset of the pattern |
// | `y` | `number` | `-1` | Y offset of the pattern |
// | `strokeDasharray` | `number` | `0` | Stroke dash array of the pattern |
// | `numSquares` | `number` | `200` | Number of squares in the pattern |
// | `maxOpacity` | `number` | `0.5` | Maximum opacity of the pattern |
// | `duration` | `number` | `1` | Duration of the animation |
// | `repeatDelay` | `number` | `0.5` | Repeat delay of the animation |

import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-auto cursor-pointer overflow-hidden rounded-full border bg-background p-2 px-6 text-center font-semibold",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-primary transition-all duration-300 group-hover:scale-[100.8]"></div>
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
        <span>{children}</span>
        <ArrowRight />
      </div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";
