"use client";

import { motion } from "motion/react";
import { RefObject, useEffect, useId, useState } from "react";

import { cn } from "@/lib/utils";

export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement | null>; // Container ref
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
  /** If true, the beam will start at the boundary edge of the fromRef element toward the toRef element instead of the center. */
  fromEdge?: boolean;
  /** If true, the beam will end at the boundary edge of the toRef element from the fromRef element instead of the center. */
  toEdge?: boolean;
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false, // Include the reverse prop
  duration = Math.random() * 3 + 4,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
  fromEdge = false,
  toEdge = false,
}) => {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  // Calculate the gradient coordinates based on the reverse prop
  const gradientCoordinates = reverse
    ? {
      x1: ["90%", "-10%"],
      x2: ["100%", "0%"],
      y1: ["0%", "0%"],
      y2: ["0%", "0%"],
    }
    : {
      x1: ["10%", "110%"],
      x2: ["0%", "100%"],
      y1: ["0%", "0%"],
      y2: ["0%", "0%"],
    };

  useEffect(() => {
    // Helper: get point on rectangle boundary from its center in direction to a target point
    const getEdgePoint = (
      rect: DOMRect,
      containerRect: DOMRect,
      targetX: number,
      targetY: number,
    ) => {
      const cx = rect.left - containerRect.left + rect.width / 2;
      const cy = rect.top - containerRect.top + rect.height / 2;
      const dx = targetX - cx;
      const dy = targetY - cy;
      // Normalize direction
      const len = Math.hypot(dx, dy) || 1e-6;
      const vx = dx / len;
      const vy = dy / len;
      const hw = rect.width / 2;
      const hh = rect.height / 2;
      const tx = hw / (Math.abs(vx) || 1e-6);
      const ty = hh / (Math.abs(vy) || 1e-6);
      const t = Math.min(tx, ty);
      const ex = cx + vx * t;
      const ey = cy + vy * t;
      return { x: ex, y: ey };
    };

    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const rectA = fromRef.current.getBoundingClientRect();
        const rectB = toRef.current.getBoundingClientRect();

        const svgWidth = containerRect.width;
        const svgHeight = containerRect.height;
        setSvgDimensions({ width: svgWidth, height: svgHeight });

        // Centers by default
        let startX =
          rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
        let startY =
          rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
        let endX =
          rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
        let endY =
          rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

        // If anchoring to edges, project to element boundaries
        if (fromEdge) {
          const edge = getEdgePoint(rectA, containerRect, endX, endY);
          startX = edge.x + startXOffset;
          startY = edge.y + startYOffset;
        }
        if (toEdge) {
          const edge = getEdgePoint(rectB, containerRect, startX, startY);
          endX = edge.x + endXOffset;
          endY = edge.y + endYOffset;
        }

        const controlY = startY - curvature;
        const d = `M ${startX},${startY} Q ${(startX + endX) / 2
          },${controlY} ${endX},${endY}`;
        setPathD(d);
      }
    };

    // Initialize ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      // For all entries, recalculate the path
      for (const entry of entries) {
        // Entry is observed but we just need to update the path
        updatePath();
      }
    });

    // Observe the container element
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Call the updatePath initially to set the initial path
    updatePath();

    // Clean up the observer on component unmount
    return () => {
      resizeObserver.disconnect();
    };
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
    fromEdge,
    toEdge,
  ]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute left-0 top-0 transform-gpu stroke-2",
        className,
      )}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        strokeOpacity="1"
        strokeLinecap="round"
      />
      <defs>
        <motion.linearGradient
          className="transform-gpu"
          id={id}
          gradientUnits={"userSpaceOnUse"}
          initial={{
            x1: "0%",
            x2: "0%",
            y1: "0%",
            y2: "0%",
          }}
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2,
          }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1], // https://easings.net/#easeOutExpo
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0"></stop>
          <stop stopColor={gradientStartColor}></stop>
          <stop offset="32.5%" stopColor={gradientStopColor}></stop>
          <stop
            offset="100%"
            stopColor={gradientStopColor}
            stopOpacity="0"
          ></stop>
        </motion.linearGradient>
      </defs>
    </svg>
  );
};
