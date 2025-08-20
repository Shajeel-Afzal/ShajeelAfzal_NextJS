'use client';

import { useEffect } from 'react';
import { reportWebVitals, getRating, type WebVitalsMetric } from '@/lib/performance';

export function WebVitals() {
    useEffect(() => {
        // Dynamically import web-vitals only on client side
        import('web-vitals').then((webVitals) => {
            const handleMetric = (metric: any) => {
                const webVitalsMetric: WebVitalsMetric = {
                    ...metric,
                    rating: getRating(metric.name, metric.value),
                };
                reportWebVitals(webVitalsMetric);
            };

            // Use the correct API for web-vitals v5.x
            webVitals.onCLS(handleMetric);
            webVitals.onINP(handleMetric); // INP replaces FID in v5
            webVitals.onFCP(handleMetric);
            webVitals.onLCP(handleMetric);
            webVitals.onTTFB(handleMetric);
        }).catch(error => {
            console.warn('Failed to load web-vitals:', error);
        });
    }, []);

    return null;
}
