"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

export function PostHogClientProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only initialize PostHog in the browser and not in development
    if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
        loaded: (posthog) => {
          if (process.env.NODE_ENV === "development") posthog.debug();
        },
        capture_pageview: false, // Disable automatic pageview capture
        capture_pageleave: true,
        // Enable session recordings
        session_recording: {
          enabled: true,
        },
        // Privacy settings
        opt_out_capturing_by_default: false,
        respect_dnt: true,
        // Feature flags
        bootstrap: {
          distinctId: undefined,
        },
      });
    }
  }, []);

  if (typeof window === "undefined") {
    return <>{children}</>;
  }

  return (
    <PostHogProvider client={posthog}>
      {children}
    </PostHogProvider>
  );
}

// Analytics helper functions
export const analytics = {
  // Page tracking
  page: (pageName: string, properties?: Record<string, any>) => {
    if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
      posthog.capture("$pageview", {
        $current_url: window.location.href,
        page_name: pageName,
        ...properties,
      });
    }
  },

  // Event tracking
  track: (eventName: string, properties?: Record<string, any>) => {
    if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
      posthog.capture(eventName, properties);
    }
  },

  // User identification
  identify: (userId: string, traits?: Record<string, any>) => {
    if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
      posthog.identify(userId, traits);
    }
  },

  // Contact form events
  contactForm: {
    started: () => analytics.track("Contact Form Started"),
    fieldFocused: (field: string) => analytics.track("Contact Form Field Focused", { field }),
    validationError: (field: string, error: string) => analytics.track("Contact Form Validation Error", { field, error }),
    submitted: (projectType?: string, budget?: string) => analytics.track("Contact Form Submitted", { 
      project_type: projectType,
      budget_range: budget 
    }),
    success: () => analytics.track("Contact Form Success"),
    error: (error: string) => analytics.track("Contact Form Error", { error }),
  },

  // Download events
  download: {
    resume: () => analytics.track("Resume Downloaded"),
    resource: (resourceName: string) => analytics.track("Resource Downloaded", { resource_name: resourceName }),
  },

  // Navigation events
  navigation: {
    headerClick: (destination: string) => analytics.track("Header Navigation Click", { destination }),
    footerClick: (destination: string) => analytics.track("Footer Navigation Click", { destination }),
    ctaClick: (cta: string, location: string) => analytics.track("CTA Click", { cta_text: cta, page_location: location }),
  },

  // Consultation booking events
  consultation: {
    started: () => analytics.track("Consultation Booking Started"),
    completed: (type: string) => analytics.track("Consultation Booking Completed", { consultation_type: type }),
  },

  // WhatsApp events
  whatsapp: {
    clicked: (location: string) => analytics.track("WhatsApp Contact Clicked", { page_location: location }),
  },

  // Social media events
  social: {
    clicked: (platform: string, location: string) => analytics.track("Social Media Click", { 
      platform, 
      page_location: location 
    }),
  },
};