import { Star } from "lucide-react";
import { MagicCard } from "@/components/magicui/magic-card";
import { Testimonial } from "@/types/testimonial";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className = "" }: TestimonialCardProps) {
  return (
    <MagicCard
      className={`mx-3 max-w-sm rounded-lg p-6 shadow-sm min-h-[200px] flex flex-col ${className}`}
    >
      <div className="space-y-3 sm:space-y-4 flex-1">
        {/* Project Title */}
        <h3 className="font-semibold text-sm text-foreground leading-tight">
          {testimonial.title}
        </h3>

        {/* Rating and Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-sm font-medium">{testimonial.rating.toFixed(1)}</span>
          </div>
          <span className="text-xs text-muted-foreground">{testimonial.dateRange}</span>
        </div>

        {/* Testimonial Content */}
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          &ldquo;{testimonial.content}&rdquo;
        </p>

        {/* Platform Logo */}
        <div className="flex justify-start mt-auto">
          <div className="text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
            {testimonial.platform}
          </div>
        </div>
      </div>
    </MagicCard>
  );
}
