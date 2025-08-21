"use client";

import { Star, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Gig } from "@/types/gigs";
import Link from "next/link";
import Image from "next/image";

interface GigCardV2Props {
  gig: Gig;
}

export function GigCardV2({ gig }: GigCardV2Props) {
  return (
    <Link href={`/gigs/${gig.category}/${gig.slug}`}>
      <div className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
        {/* Header Image/Thumbnail */}
        <div className="relative h-40 bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden">
          {/* Service Icon as main visual */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-6 bg-primary/10 rounded-full">
              <gig.icon className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          {/* Featured Badge */}
          {gig.featured && (
            <Badge 
              variant="secondary" 
              className="absolute top-2 left-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1"
            >
              Featured
            </Badge>
          )}
          
          {/* Heart/Favorite Icon */}
          <div className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Heart className="h-3.5 w-3.5 text-gray-600 hover:text-red-500 transition-colors" />
          </div>
        </div>

        {/* Content */}
        <div className="p-3">
          {/* Profile Section */}
          <div className="flex items-center gap-2 mb-2">
            <div className="relative">
              <Image
                src="/images/shajeel_afzal.png"
                alt="Shajeel Afzal"
                width={24}
                height={24}
                className="rounded-full border border-primary/20 object-cover"
                style={{ width: '24px', height: '24px' }}
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">Shajeel Afzal</p>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-sm font-medium text-foreground mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {gig.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold text-foreground">{gig.averageRating}</span>
            <span className="text-xs text-muted-foreground">({gig.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="border-t border-border/50 pt-3">
            <div className="text-xs text-muted-foreground mb-1">
              From <span className="text-sm font-bold text-foreground">PKR {gig.startingPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Video Consultation Badge - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/5 to-transparent p-3 pt-6">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 w-fit">
            <div className="w-3 h-3 rounded bg-primary/20 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
            </div>
            <span>Offers video consultations</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
