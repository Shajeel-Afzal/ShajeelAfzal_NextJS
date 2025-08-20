"use client";

import { useEffect } from "react";
import { analytics } from "./analytics";

interface PageTrackerProps {
  pageName: string;
  properties?: Record<string, any>;
}

export function PageTracker({ pageName, properties }: PageTrackerProps) {
  useEffect(() => {
    // Track page view
    analytics.page(pageName, properties);
  }, [pageName, properties]);

  return null;
}