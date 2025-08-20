"use client";

import { useEffect } from 'react';
import posthog from 'posthog-js';

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || 'phc_demo_key', {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    // Privacy-focused settings
    capture_pageview: false, // We'll capture manually
    autocapture: true, // Automatically capture clicks, form submissions, etc.
    disable_session_recording: true, // Disable session recording for privacy
  });
}

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}

export function PostHogPageview() {
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      posthog?.capture('$pageview');
    }
  }, []);

  return null;
}