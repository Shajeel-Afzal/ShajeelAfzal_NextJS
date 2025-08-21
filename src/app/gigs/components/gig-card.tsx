"use client";

import { Star, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MagicCard } from "@/components/magicui/magic-card";
import { Gig } from "@/types/gigs";
import Link from "next/link";

interface GigCardProps {
  gig: Gig;
}

export function GigCard({ gig }: GigCardProps) {
  return (
    <Link href={`/gigs/${gig.category}/${gig.slug}`}>
      <MagicCard
        className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-2xl h-full cursor-pointer"
        gradientSize={300}
        gradientColor="rgba(59, 130, 246, 0.15)"
        gradientOpacity={0.8}
      >
        <div className="relative h-full p-0">
          {/* Content */}
          <div className="p-6 rounded-xl h-full bg-transparent relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <gig.icon className="h-6 w-6 text-primary" />
                </div>
                {gig.featured && (
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    Featured
                  </Badge>
                )}
              </div>
            </div>
          
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {gig.title}
            </h3>
            
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4">
              {gig.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {gig.tags.slice(0, 3).map((tag) => (
                <div
                  key={tag}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 hover:scale-105 hover:shadow-md cursor-default backdrop-blur-sm border bg-primary/10 text-primary border-primary/20"
                >
                  <Tag className="w-3 h-3 mr-1 inline" />
                  {tag}
                </div>
              ))}
              {gig.tags.length > 3 && (
                <div className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 hover:scale-105 hover:shadow-md cursor-default backdrop-blur-sm border bg-muted/20 text-muted-foreground border-muted/30">
                  +{gig.tags.length - 3} more
                </div>
              )}
            </div>

            {/* Rating and Stats */}
            <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{gig.averageRating}</span>
                <span>({gig.reviewCount})</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{gig.deliveryTime} days</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-muted-foreground">Starting at</span>
                <div className="text-2xl font-bold">${gig.startingPrice.toLocaleString()}</div>
              </div>
              
              <Button size="sm" className="group-hover:bg-primary/90">
                View Details
              </Button>
            </div>
          </div>
        </div>
      </MagicCard>
    </Link>
  );
}
