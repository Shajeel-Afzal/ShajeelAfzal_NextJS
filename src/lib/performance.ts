// Core Web Vitals monitoring utilities

// Extend Window interface for gtag
declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
    }
}

export interface WebVitalsMetric {
    name: string;
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
    delta: number;
    id: string;
}

// Core Web Vitals thresholds
const THRESHOLDS = {
    LCP: { good: 2500, poor: 4000 },
    INP: { good: 200, poor: 500 }, // INP replaces FID in web-vitals v5
    CLS: { good: 0.1, poor: 0.25 },
    FCP: { good: 1800, poor: 3000 },
    TTFB: { good: 800, poor: 1800 },
};

export function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
    if (!threshold) return 'good';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
}

export function reportWebVitals(metric: WebVitalsMetric) {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
        console.log(`[Web Vitals] ${metric.name}:`, {
            value: metric.value,
            rating: metric.rating,
            delta: metric.delta,
        });
    }

    // Send to analytics in production
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
        // Example: Send to Google Analytics
        window.gtag?.('event', metric.name, {
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            metric_id: metric.id,
            metric_value: metric.value,
            metric_delta: metric.delta,
            metric_rating: metric.rating,
        });
    }
}

// Performance monitoring helper
export function measurePerformance(name: string, fn: () => void | Promise<void>) {
    const start = performance.now();

    const measure = () => {
        const duration = performance.now() - start;
        console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
    };

    try {
        const result = fn();
        if (result instanceof Promise) {
            return result.finally(measure);
        }
        measure();
        return result;
    } catch (error) {
        measure();
        throw error;
    }
}

// Preload critical resources
export function preloadCriticalResources() {
    if (typeof window === 'undefined') return;

    // Preload critical images
    const criticalImages = [
        '/images/shajeel_afzal.png',
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Resource hints for better loading
export function addResourceHints() {
    if (typeof window === 'undefined') return;

    const hints = [
        { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
    ];

    hints.forEach(hint => {
        const link = document.createElement('link');
        Object.assign(link, hint);
        document.head.appendChild(link);
    });
}
