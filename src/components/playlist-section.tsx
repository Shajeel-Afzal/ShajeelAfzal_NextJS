"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Play, Eye } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { YouTubePlaylist, YouTubeVideo } from "@/types/youtube";
import { VideoCard } from "./video-card";
import { Marquee } from "./magicui/marquee";
import { youtubeAPI } from "@/lib/services/youtube-client.service";
import { playlistCache } from "@/lib/cache/client-cache.service";

interface PlaylistSectionProps {
  playlists: YouTubePlaylist[];
  onVideoPlay: (video: YouTubeVideo) => void;
  className?: string;
}

interface PlaylistWithVideos extends YouTubePlaylist {
  videos: YouTubeVideo[];
  isLoading: boolean;
}

export function PlaylistSection({ playlists, onVideoPlay, className }: PlaylistSectionProps) {
  const [playlistsWithVideos, setPlaylistsWithVideos] = useState<PlaylistWithVideos[]>(() => {
    // Clean expired cache entries on initialization
    playlistCache.cleanExpired();
    
    // Sort initially by video count and check cache immediately
    return playlists
      .sort((a, b) => b.videoCount - a.videoCount)
      .map(playlist => {
        const cacheKey = `playlist-videos-${playlist.id}`;
        const cachedVideos = playlistCache.get<YouTubeVideo[]>(cacheKey);
        
        return {
          ...playlist,
          videos: cachedVideos || [],
          isLoading: !cachedVideos // Only show loading if not cached
        };
      });
  });

  const [hasInitialized, setHasInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCount, setLoadingCount] = useState(0);

  // Fetch videos for each playlist (only if needed)
  useEffect(() => {
    // Skip if already initialized
    if (hasInitialized) {
      return;
    }
    
    // Check if any playlists need fetching
    const needsFetching = playlists.some(playlist => {
      const cacheKey = `playlist-videos-${playlist.id}`;
      return !playlistCache.get<YouTubeVideo[]>(cacheKey);
    });
    
    if (!needsFetching) {
      setHasInitialized(true);
      return;
    }
    
    const fetchPlaylistVideos = async () => {
      // Only fetch playlists that need fetching (not in cache and currently loading)
      const playlistsToFetch = playlists.filter(playlist => {
        const cacheKey = `playlist-videos-${playlist.id}`;
        const cachedVideos = playlistCache.get<YouTubeVideo[]>(cacheKey);
        return !cachedVideos; // Only fetch if not cached
      });

      if (playlistsToFetch.length === 0) {
        setHasInitialized(true);
        return;
      }

      // Show loading indicator after a brief delay (only if operation takes longer than expected)
      const loadingTimeout = setTimeout(() => {
        setIsLoading(true);
        setLoadingCount(playlistsToFetch.length);
      }, 500); // Show loading after 500ms delay

      // Fetch only uncached playlists in parallel
      const playlistPromises = playlistsToFetch.map(async (playlist) => {
        const cacheKey = `playlist-videos-${playlist.id}`;
        
        try {
          const response = await youtubeAPI.getPlaylistVideos(playlist.id, 10);
          const videos = response?.videos || [];
          
          // Cache the result for 10 minutes
          playlistCache.set(cacheKey, videos);
          
          return {
            playlistId: playlist.id,
            videos,
            error: null
          };
        } catch (error) {
          console.error(`Error fetching videos for playlist ${playlist.id}:`, error);
          return {
            playlistId: playlist.id,
            videos: [],
            error
          };
        }
      });

      const fetchResults = await Promise.all(playlistPromises);
      
      // Update only the playlists that were fetched
      setPlaylistsWithVideos(prev => {
        const updated = prev.map(playlist => {
          const fetchResult = fetchResults.find(result => result.playlistId === playlist.id);
          if (fetchResult) {
            return {
              ...playlist,
              videos: fetchResult.videos,
              isLoading: false
            };
          }
          return playlist;
        });
        
        // Sort by video count after updating
        return updated.sort((a, b) => b.videoCount - a.videoCount);
      });
      
      // Clear loading timeout and hide loading indicator
      clearTimeout(loadingTimeout);
      setIsLoading(false);
      setHasInitialized(true);
    };

    fetchPlaylistVideos();
  }, [playlists, hasInitialized]);


  const handleViewAllPlaylist = (playlistId: string) => {
    // Navigate to playlist page or show all videos
    window.open(`https://www.youtube.com/playlist?list=${playlistId}`, '_blank');
  };

  // Calculate marquee duration based on number of videos (very slow animation)
  const getMarqueeDuration = (videoCount: number) => {
    // Base duration of 80s, increased by 15s for each additional video beyond 3
    return Math.max(80, 80 + (videoCount - 3) * 15);
  };

  if (playlistsWithVideos.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-12", className)}>
      {/* Non-blocking loading indicator */}
      {isLoading && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center justify-center py-4"
        >
          <div className="flex items-center gap-3 text-sm text-muted-foreground bg-muted/30 rounded-full px-4 py-2 backdrop-blur-sm">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span>Loading {loadingCount} playlist{loadingCount !== 1 ? 's' : ''}...</span>
          </div>
        </motion.div>
      )}
      
      <div className="space-y-10">
        {playlistsWithVideos.map((playlist, index) => (
          <div key={playlist.id} className="space-y-4">
            {/* Playlist Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted relative">
                    <Image
                      src={playlist.thumbnail.url}
                      alt={playlist.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{playlist.title}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    {playlist.videoCount} videos
                    {playlist.videos.length > 0 && (
                      <>
                        <span>•</span>
                        <Eye className="w-4 h-4" />
                        Total views: {playlist.videos.reduce((sum, video) => sum + (video.rawViewCount || 0), 0).toLocaleString()}
                      </>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                {/* View All Button */}
                <button
                  onClick={() => handleViewAllPlaylist(playlist.id)}
                  className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  View All
                </button>
              </div>
            </div>

            {/* Videos Container */}
            <div className="relative">
              {playlist.isLoading ? (
                <div className="flex space-x-4 overflow-hidden">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-80 h-48 bg-muted rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              ) : playlist.videos.length > 0 ? (
                <div className="overflow-hidden">
                  <Marquee
                    className={`[--duration:${getMarqueeDuration(playlist.videos.length)}s]`}
                    pauseOnHover
                    reverse={index % 2 === 1} // Alternate direction for odd-indexed playlists
                    style={{
                      '--duration': `${getMarqueeDuration(playlist.videos.length)}s`
                    } as React.CSSProperties}
                  >
                    {playlist.videos.map((video) => (
                      <div key={video.id} className="flex-shrink-0 w-80 mr-4">
                        <VideoCard
                          video={video}
                          onPlay={onVideoPlay}
                          className="h-full"
                        />
                      </div>
                    ))}
                  </Marquee>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No videos found in this playlist</p>
                </div>
              )}
            </div>

            {/* Playlist Description */}
            {playlist.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 max-w-4xl">
                {playlist.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}