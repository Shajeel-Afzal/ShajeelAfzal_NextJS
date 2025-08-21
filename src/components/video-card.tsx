"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Clock, Eye, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { YouTubeVideo } from "@/types/youtube";
import { MagicCard } from "@/components/magicui/magic-card";

interface VideoCardProps {
  video: YouTubeVideo;
  onPlay: (video: YouTubeVideo) => void;
  className?: string;
}

export function VideoCard({ video, onPlay, className }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <MagicCard
      className={cn(
        "rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg",
        className
      )}
      gradientSize={300}
      gradientColor="rgba(59, 130, 246, 0.15)"
      gradientOpacity={0.8}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "relative cursor-pointer overflow-hidden rounded-lg text-card-foreground",
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onPlay(video)}
      >
      {/* Thumbnail Container */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={video.thumbnail.url}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs font-medium text-white">
          {video.duration}
        </div>

        {/* Play Button Overlay */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: isHovered ? 1 : 0.8, 
              opacity: isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.2 }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 backdrop-blur-sm"
          >
            <Play className="h-6 w-6 fill-white text-white" />
          </motion.div>
        </div>

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold leading-tight">
          {video.title}
        </h3>
        
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
          {video.description}
        </p>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{video.viewCount}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(video.publishedAt)}</span>
          </div>

          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{video.duration}</span>
          </div>
        </div>
      </div>
      </motion.div>
    </MagicCard>
  );
}