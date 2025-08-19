import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
    className?: string;
    size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({ className, size = "md" }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-8 h-8",
        lg: "w-12 h-12"
    };

    return (
        <div className={cn("animate-spin rounded-full border-2 border-primary border-t-transparent", sizeClasses[size], className)} />
    );
}

interface LoadingSkeletonProps {
    className?: string;
    children?: React.ReactNode;
}

export function LoadingSkeleton({ className, children }: LoadingSkeletonProps) {
    return (
        <div className={cn("animate-pulse bg-muted rounded", className)}>
            {children}
        </div>
    );
}

interface SuspenseWrapperProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export function SuspenseWrapper({ children, fallback }: SuspenseWrapperProps) {
    return (
        <div className="min-h-[200px] flex items-center justify-center">
            {fallback || <LoadingSpinner size="lg" />}
            <div className="sr-only">{children}</div>
        </div>
    );
}
