'use client';

import { lazy, Suspense } from 'react';
import { LoadingSkeleton } from '@/components/ui/loading';

// Lazy load heavy Magic UI components
const LazyAnimatedGridPattern = lazy(() =>
    import('@/components/magicui/animated-grid-pattern').then(module => ({
        default: module.AnimatedGridPattern
    }))
);

const LazyAnimatedShinyText = lazy(() =>
    import('@/components/magicui/animated-shiny-text').then(module => ({
        default: module.AnimatedShinyText
    }))
);

const LazyAuroraText = lazy(() =>
    import('@/components/magicui/aurora-text').then(module => ({
        default: module.AuroraText
    }))
);

const LazyTextAnimate = lazy(() =>
    import('@/components/magicui/text-animate').then(module => ({
        default: module.TextAnimate
    }))
);

const LazyNumberTicker = lazy(() =>
    import('@/components/magicui/number-ticker').then(module => ({
        default: module.NumberTicker
    }))
);

const LazyMarquee = lazy(() =>
    import('@/components/magicui/marquee').then(module => ({
        default: module.Marquee
    }))
);

const LazyBentoGrid = lazy(() =>
    import('@/components/magicui/bento-grid').then(module => ({
        default: module.BentoGrid
    }))
);

const LazyBentoCard = lazy(() =>
    import('@/components/magicui/bento-grid').then(module => ({
        default: module.BentoCard
    }))
);

// Optimized wrappers with loading states
export function OptimizedAnimatedGridPattern(props: any) {
    return (
        <Suspense fallback={<div className="absolute inset-0 bg-muted/20" />}>
            <LazyAnimatedGridPattern {...props} />
        </Suspense>
    );
}

export function OptimizedAnimatedShinyText(props: any) {
    return (
        <Suspense fallback={<LoadingSkeleton className="h-6 w-32" />}>
            <LazyAnimatedShinyText {...props} />
        </Suspense>
    );
}

export function OptimizedAuroraText(props: any) {
    return (
        <Suspense fallback={<LoadingSkeleton className="h-16 w-full" />}>
            <LazyAuroraText {...props} />
        </Suspense>
    );
}

export function OptimizedTextAnimate(props: any) {
    return (
        <Suspense fallback={<LoadingSkeleton className="h-6 w-24" />}>
            <LazyTextAnimate {...props} />
        </Suspense>
    );
}

export function OptimizedNumberTicker(props: any) {
    return (
        <Suspense fallback={<LoadingSkeleton className="h-8 w-16" />}>
            <LazyNumberTicker {...props} />
        </Suspense>
    );
}

export function OptimizedMarquee(props: any) {
    return (
        <Suspense fallback={<LoadingSkeleton className="h-32 w-full" />}>
            <LazyMarquee {...props} />
        </Suspense>
    );
}

export function OptimizedBentoGrid(props: any) {
    return (
        <Suspense fallback={<LoadingSkeleton className="h-64 w-full" />}>
            <LazyBentoGrid {...props} />
        </Suspense>
    );
}

export function OptimizedBentoCard(props: any) {
    return (
        <Suspense fallback={<LoadingSkeleton className="h-48 w-full" />}>
            <LazyBentoCard {...props} />
        </Suspense>
    );
}
